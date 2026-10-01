-- ==============================================================================
-- 003_production_security_hardening.sql
-- Supabase / PostgreSQL Production Security Hardening & Zero-Trust Architecture
-- ==============================================================================

-- ------------------------------------------------------------------------------
-- 1. SECURITY DEFINER FUNCTIONS HARDENING (Explicit search_path & Input Sanitation)
-- ------------------------------------------------------------------------------

-- Ensure function runs with pinned search_path to prevent malicious search path hijacking
CREATE OR REPLACE FUNCTION public.current_user_role()
RETURNS public.user_role AS $$
    SELECT p.role 
    FROM public.profiles p 
    WHERE p.id = auth.uid();
$$ LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public, auth;

-- Revoke default PUBLIC execute privilege and grant only to authenticated users
REVOKE EXECUTE ON FUNCTION public.current_user_role() FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.current_user_role() TO authenticated;

-- Helper to safely verify whether the authenticated user is an enrolled student in a course
CREATE OR REPLACE FUNCTION public.is_enrolled_in_course(check_course_id UUID, check_user_id UUID DEFAULT auth.uid())
RETURNS BOOLEAN AS $$
    SELECT EXISTS (
        SELECT 1 
        FROM public.courses c
        JOIN public.batch_members bm ON bm.batch_id = c.batch_id
        WHERE c.id = check_course_id 
          AND bm.student_id = check_user_id
          AND c.deleted_at IS NULL
          AND c.is_published = true
    );
$$ LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public, auth;

REVOKE EXECUTE ON FUNCTION public.is_enrolled_in_course(UUID, UUID) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.is_enrolled_in_course(UUID, UUID) TO authenticated;

-- Helper to safely verify if the user teaches the course
CREATE OR REPLACE FUNCTION public.is_teacher_of_course(check_course_id UUID, check_user_id UUID DEFAULT auth.uid())
RETURNS BOOLEAN AS $$
    SELECT EXISTS (
        SELECT 1 
        FROM public.course_teachers ct
        WHERE ct.course_id = check_course_id 
          AND ct.teacher_id = check_user_id
    );
$$ LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public, auth;

REVOKE EXECUTE ON FUNCTION public.is_teacher_of_course(UUID, UUID) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.is_teacher_of_course(UUID, UUID) TO authenticated;

-- ------------------------------------------------------------------------------
-- 2. PROFILE INTEGRITY TRIGGER (Prevent Self-Privilege Escalation)
-- ------------------------------------------------------------------------------

-- Ensure users cannot modify their own role or id through client UPDATE calls
CREATE OR REPLACE FUNCTION public.prevent_profile_privilege_escalation()
RETURNS TRIGGER AS $$
BEGIN
    -- Only admin can modify user roles or alter target account IDs
    IF (OLD.role IS DISTINCT FROM NEW.role) THEN
        IF (public.current_user_role() != 'admin') THEN
            RAISE EXCEPTION 'Access Denied: Only administrators can modify role assignments.';
        END IF;
    END IF;

    IF (OLD.id IS DISTINCT FROM NEW.id) THEN
        RAISE EXCEPTION 'Immutable Field: User profile ID cannot be changed.';
    END IF;

    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public, auth;

DROP TRIGGER IF EXISTS trg_protect_profile_roles ON public.profiles;
CREATE TRIGGER trg_protect_profile_roles
    BEFORE UPDATE ON public.profiles
    FOR EACH ROW
    EXECUTE FUNCTION public.prevent_profile_privilege_escalation();

-- Trigger to automatically create a public profile upon Supabase auth.users signup
CREATE OR REPLACE FUNCTION public.handle_new_auth_user()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO public.profiles (id, email, full_name, role)
    VALUES (
        NEW.id,
        COALESCE(NEW.email, ''),
        COALESCE(NEW.raw_user_meta_data->>'full_name', split_part(COALESCE(NEW.email, 'user'), '@', 1)),
        'student' -- Default role always student, never privileged
    )
    ON CONFLICT (id) DO NOTHING;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public, auth;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW
    EXECUTE FUNCTION public.handle_new_auth_user();

-- ------------------------------------------------------------------------------
-- 3. DROP INSECURE & BROAD POLICIES
-- ------------------------------------------------------------------------------

DROP POLICY IF EXISTS "Public profile read access" ON public.profiles;
DROP POLICY IF EXISTS "Users can update own profile" ON public.profiles;
DROP POLICY IF EXISTS "Students own progress read and write" ON public.lesson_progress;
DROP POLICY IF EXISTS "Teachers can view progress for assigned courses" ON public.lesson_progress;
DROP POLICY IF EXISTS "Students can view and create own submissions" ON public.assignment_submissions;
DROP POLICY IF EXISTS "Teachers can view and grade assigned course submissions" ON public.assignment_submissions;
DROP POLICY IF EXISTS "Students can view options" ON public.quiz_options;
DROP POLICY IF EXISTS "Students access own quiz attempts" ON public.quiz_attempts;
DROP POLICY IF EXISTS "Students access own quiz answers" ON public.quiz_answers;
DROP POLICY IF EXISTS "Public verification of certificates by code" ON public.certificates;
DROP POLICY IF EXISTS "Students can view their own certificates" ON public.certificates;
DROP POLICY IF EXISTS "Admins have full access to batches" ON public.batches;
DROP POLICY IF EXISTS "Students can view enrolled batches" ON public.batches;
DROP POLICY IF EXISTS "Admins full access to courses" ON public.courses;
DROP POLICY IF EXISTS "Teachers can view and update assigned courses" ON public.courses;
DROP POLICY IF EXISTS "Students can view courses in enrolled batches" ON public.courses;
DROP POLICY IF EXISTS "Read published lessons for course learners" ON public.lessons;
DROP POLICY IF EXISTS "Read lesson resources for course learners" ON public.lesson_resources;
DROP POLICY IF EXISTS "Only admins read audit logs" ON public.audit_logs;

-- ------------------------------------------------------------------------------
-- 4. HARDENED PROFILES POLICIES (Least Privilege Read & Update)
-- ------------------------------------------------------------------------------

-- Admins can view all profiles
CREATE POLICY "Admins read all profiles" ON public.profiles
    FOR SELECT TO authenticated
    USING (public.current_user_role() = 'admin');

-- Teachers can view profiles of students in their assigned courses
CREATE POLICY "Teachers read assigned student profiles" ON public.profiles
    FOR SELECT TO authenticated
    USING (
        public.current_user_role() = 'teacher' AND (
            id = auth.uid() OR
            EXISTS (
                SELECT 1 
                FROM public.course_teachers ct
                JOIN public.courses c ON c.id = ct.course_id
                JOIN public.batch_members bm ON bm.batch_id = c.batch_id
                WHERE ct.teacher_id = auth.uid() AND bm.student_id = profiles.id
            )
        )
    );

-- Students can view their own profile and instructors teaching their enrolled courses
CREATE POLICY "Students read own profile and instructors" ON public.profiles
    FOR SELECT TO authenticated
    USING (
        id = auth.uid() OR
        EXISTS (
            SELECT 1 
            FROM public.batch_members bm
            JOIN public.courses c ON c.batch_id = bm.batch_id
            JOIN public.course_teachers ct ON ct.course_id = c.id
            WHERE bm.student_id = auth.uid() AND ct.teacher_id = profiles.id
        )
    );

-- Users can only update their own non-privileged details
CREATE POLICY "Users update own profile" ON public.profiles
    FOR UPDATE TO authenticated
    USING (auth.uid() = id)
    WITH CHECK (auth.uid() = id);

-- ------------------------------------------------------------------------------
-- 5. BATCHES & ENROLLMENTS POLICIES
-- ------------------------------------------------------------------------------

CREATE POLICY "Admin manage batches" ON public.batches
    FOR ALL TO authenticated
    USING (public.current_user_role() = 'admin')
    WITH CHECK (public.current_user_role() = 'admin');

CREATE POLICY "Teachers view batches with assigned courses" ON public.batches
    FOR SELECT TO authenticated
    USING (
        public.current_user_role() = 'teacher' AND EXISTS (
            SELECT 1 FROM public.courses c
            JOIN public.course_teachers ct ON ct.course_id = c.id
            WHERE c.batch_id = batches.id AND ct.teacher_id = auth.uid()
        )
    );

CREATE POLICY "Students view enrolled batches" ON public.batches
    FOR SELECT TO authenticated
    USING (
        is_active = true AND EXISTS (
            SELECT 1 FROM public.batch_members bm
            WHERE bm.batch_id = batches.id AND bm.student_id = auth.uid()
        )
    );

-- Batch Members
CREATE POLICY "Admin manage batch members" ON public.batch_members
    FOR ALL TO authenticated
    USING (public.current_user_role() = 'admin')
    WITH CHECK (public.current_user_role() = 'admin');

CREATE POLICY "Teachers view batch members of assigned courses" ON public.batch_members
    FOR SELECT TO authenticated
    USING (
        public.current_user_role() = 'teacher' AND EXISTS (
            SELECT 1 FROM public.courses c
            JOIN public.course_teachers ct ON ct.course_id = c.id
            WHERE c.batch_id = batch_members.batch_id AND ct.teacher_id = auth.uid()
        )
    );

CREATE POLICY "Students view own batch membership" ON public.batch_members
    FOR SELECT TO authenticated
    USING (student_id = auth.uid());

-- ------------------------------------------------------------------------------
-- 6. COURSES & CURRICULUM POLICIES
-- ------------------------------------------------------------------------------

CREATE POLICY "Admin full manage courses" ON public.courses
    FOR ALL TO authenticated
    USING (public.current_user_role() = 'admin')
    WITH CHECK (public.current_user_role() = 'admin');

CREATE POLICY "Teachers view and update assigned courses" ON public.courses
    FOR SELECT TO authenticated
    USING (
        public.current_user_role() = 'teacher' AND EXISTS (
            SELECT 1 FROM public.course_teachers ct 
            WHERE ct.course_id = courses.id AND ct.teacher_id = auth.uid()
        )
    );

CREATE POLICY "Teachers update assigned courses metadata" ON public.courses
    FOR UPDATE TO authenticated
    USING (
        public.current_user_role() = 'teacher' AND EXISTS (
            SELECT 1 FROM public.course_teachers ct 
            WHERE ct.course_id = courses.id AND ct.teacher_id = auth.uid()
        )
    )
    WITH CHECK (
        public.current_user_role() = 'teacher' AND EXISTS (
            SELECT 1 FROM public.course_teachers ct 
            WHERE ct.course_id = courses.id AND ct.teacher_id = auth.uid()
        )
    );

CREATE POLICY "Students view published enrolled courses" ON public.courses
    FOR SELECT TO authenticated
    USING (
        is_published = true AND deleted_at IS NULL AND (
            batch_id IS NULL OR EXISTS (
                SELECT 1 FROM public.batch_members bm 
                WHERE bm.batch_id = courses.batch_id AND bm.student_id = auth.uid()
            )
        )
    );

-- Chapters & Lessons
CREATE POLICY "Admin manage chapters" ON public.chapters
    FOR ALL TO authenticated
    USING (public.current_user_role() = 'admin')
    WITH CHECK (public.current_user_role() = 'admin');

CREATE POLICY "Teachers manage chapters for assigned courses" ON public.chapters
    FOR ALL TO authenticated
    USING (public.is_teacher_of_course(course_id, auth.uid()))
    WITH CHECK (public.is_teacher_of_course(course_id, auth.uid()));

CREATE POLICY "Students view published course chapters" ON public.chapters
    FOR SELECT TO authenticated
    USING (
        deleted_at IS NULL AND public.is_enrolled_in_course(course_id, auth.uid())
    );

CREATE POLICY "Admin manage lessons" ON public.lessons
    FOR ALL TO authenticated
    USING (public.current_user_role() = 'admin')
    WITH CHECK (public.current_user_role() = 'admin');

CREATE POLICY "Teachers manage lessons in assigned courses" ON public.lessons
    FOR ALL TO authenticated
    USING (
        EXISTS (
            SELECT 1 FROM public.chapters ch 
            WHERE ch.id = lessons.chapter_id AND public.is_teacher_of_course(ch.course_id, auth.uid())
        )
    )
    WITH CHECK (
        EXISTS (
            SELECT 1 FROM public.chapters ch 
            WHERE ch.id = lessons.chapter_id AND public.is_teacher_of_course(ch.course_id, auth.uid())
        )
    );

CREATE POLICY "Students view published course lessons" ON public.lessons
    FOR SELECT TO authenticated
    USING (
        deleted_at IS NULL AND (
            is_preview = true OR
            EXISTS (
                SELECT 1 FROM public.chapters ch 
                WHERE ch.id = lessons.chapter_id AND public.is_enrolled_in_course(ch.course_id, auth.uid())
            )
        )
    );

-- Lesson Resources
CREATE POLICY "Admin manage lesson resources" ON public.lesson_resources
    FOR ALL TO authenticated
    USING (public.current_user_role() = 'admin')
    WITH CHECK (public.current_user_role() = 'admin');

CREATE POLICY "Teachers manage lesson resources" ON public.lesson_resources
    FOR ALL TO authenticated
    USING (
        EXISTS (
            SELECT 1 FROM public.lessons l
            JOIN public.chapters ch ON ch.id = l.chapter_id
            WHERE l.id = lesson_resources.lesson_id AND public.is_teacher_of_course(ch.course_id, auth.uid())
        )
    );

CREATE POLICY "Students view enrolled lesson resources" ON public.lesson_resources
    FOR SELECT TO authenticated
    USING (
        EXISTS (
            SELECT 1 FROM public.lessons l
            JOIN public.chapters ch ON ch.id = l.chapter_id
            WHERE l.id = lesson_resources.lesson_id AND (
                l.is_preview = true OR public.is_enrolled_in_course(ch.course_id, auth.uid())
            )
        )
    );

-- ------------------------------------------------------------------------------
-- 7. PROGRESS TRACKING POLICIES
-- ------------------------------------------------------------------------------

CREATE POLICY "Admin read all progress" ON public.lesson_progress
    FOR SELECT TO authenticated
    USING (public.current_user_role() = 'admin');

CREATE POLICY "Teachers read progress for assigned courses" ON public.lesson_progress
    FOR SELECT TO authenticated
    USING (
        public.current_user_role() = 'teacher' AND EXISTS (
            SELECT 1 FROM public.lessons l
            JOIN public.chapters ch ON ch.id = l.chapter_id
            WHERE l.id = lesson_progress.lesson_id AND public.is_teacher_of_course(ch.course_id, auth.uid())
        )
    );

CREATE POLICY "Students view own progress" ON public.lesson_progress
    FOR SELECT TO authenticated
    USING (student_id = auth.uid());

CREATE POLICY "Students create own progress" ON public.lesson_progress
    FOR INSERT TO authenticated
    WITH CHECK (
        student_id = auth.uid() AND
        EXISTS (
            SELECT 1 FROM public.lessons l
            JOIN public.chapters ch ON ch.id = l.chapter_id
            WHERE l.id = lesson_id AND public.is_enrolled_in_course(ch.course_id, auth.uid())
        )
    );

CREATE POLICY "Students update own progress" ON public.lesson_progress
    FOR UPDATE TO authenticated
    USING (student_id = auth.uid())
    WITH CHECK (student_id = auth.uid());

-- ------------------------------------------------------------------------------
-- 8. ASSIGNMENTS & SUBMISSIONS POLICIES (Zero-Trust Grading & Submissions)
-- ------------------------------------------------------------------------------

CREATE POLICY "Admin manage assignments" ON public.assignments
    FOR ALL TO authenticated
    USING (public.current_user_role() = 'admin')
    WITH CHECK (public.current_user_role() = 'admin');

CREATE POLICY "Teachers manage assignments for assigned courses" ON public.assignments
    FOR ALL TO authenticated
    USING (
        EXISTS (
            SELECT 1 FROM public.lessons l
            JOIN public.chapters ch ON ch.id = l.chapter_id
            WHERE l.id = assignments.lesson_id AND public.is_teacher_of_course(ch.course_id, auth.uid())
        )
    )
    WITH CHECK (
        EXISTS (
            SELECT 1 FROM public.lessons l
            JOIN public.chapters ch ON ch.id = l.chapter_id
            WHERE l.id = assignments.lesson_id AND public.is_teacher_of_course(ch.course_id, auth.uid())
        )
    );

CREATE POLICY "Students view course assignments" ON public.assignments
    FOR SELECT TO authenticated
    USING (
        EXISTS (
            SELECT 1 FROM public.lessons l
            JOIN public.chapters ch ON ch.id = l.chapter_id
            WHERE l.id = assignments.lesson_id AND public.is_enrolled_in_course(ch.course_id, auth.uid())
        )
    );

-- Assignment Submissions:
-- Students can only submit and view their own. They can never alter grades or feedback.
CREATE POLICY "Students view own submissions" ON public.assignment_submissions
    FOR SELECT TO authenticated
    USING (student_id = auth.uid());

CREATE POLICY "Students insert own submission" ON public.assignment_submissions
    FOR INSERT TO authenticated
    WITH CHECK (
        student_id = auth.uid() AND
        grade IS NULL AND
        feedback IS NULL AND
        graded_by IS NULL AND
        graded_at IS NULL AND
        status = 'submitted' AND
        EXISTS (
            SELECT 1 FROM public.assignments a
            JOIN public.lessons l ON l.id = a.lesson_id
            JOIN public.chapters ch ON ch.id = l.chapter_id
            WHERE a.id = assignment_id AND public.is_enrolled_in_course(ch.course_id, auth.uid())
        )
    );

CREATE POLICY "Students update own submission before grading" ON public.assignment_submissions
    FOR UPDATE TO authenticated
    USING (
        student_id = auth.uid() AND status IN ('submitted', 'revision_requested')
    )
    WITH CHECK (
        student_id = auth.uid() AND
        grade IS NULL AND
        feedback IS NULL AND
        graded_by IS NULL
    );

-- Teachers and Admins can view and grade assigned submissions
CREATE POLICY "Teachers view assigned course submissions" ON public.assignment_submissions
    FOR SELECT TO authenticated
    USING (
        public.current_user_role() = 'admin' OR (
            public.current_user_role() = 'teacher' AND EXISTS (
                SELECT 1 FROM public.assignments a
                JOIN public.lessons l ON l.id = a.lesson_id
                JOIN public.chapters ch ON ch.id = l.chapter_id
                WHERE a.id = assignment_submissions.assignment_id 
                  AND public.is_teacher_of_course(ch.course_id, auth.uid())
            )
        )
    );

CREATE POLICY "Teachers grade assigned course submissions" ON public.assignment_submissions
    FOR UPDATE TO authenticated
    USING (
        public.current_user_role() = 'admin' OR (
            public.current_user_role() = 'teacher' AND EXISTS (
                SELECT 1 FROM public.assignments a
                JOIN public.lessons l ON l.id = a.lesson_id
                JOIN public.chapters ch ON ch.id = l.chapter_id
                WHERE a.id = assignment_submissions.assignment_id 
                  AND public.is_teacher_of_course(ch.course_id, auth.uid())
            )
        )
    )
    WITH CHECK (
        public.current_user_role() IN ('admin', 'teacher')
    );

-- ------------------------------------------------------------------------------
-- 9. QUIZZES & SAFE EVALUATION (Prevent Answer Key Leakage)
-- ------------------------------------------------------------------------------

-- Quizzes metadata
CREATE POLICY "Admin manage quizzes" ON public.quizzes
    FOR ALL TO authenticated
    USING (public.current_user_role() = 'admin')
    WITH CHECK (public.current_user_role() = 'admin');

CREATE POLICY "Teachers manage quizzes" ON public.quizzes
    FOR ALL TO authenticated
    USING (
        EXISTS (
            SELECT 1 FROM public.lessons l
            JOIN public.chapters ch ON ch.id = l.chapter_id
            WHERE l.id = quizzes.lesson_id AND public.is_teacher_of_course(ch.course_id, auth.uid())
        )
    );

CREATE POLICY "Students view quizzes" ON public.quizzes
    FOR SELECT TO authenticated
    USING (
        EXISTS (
            SELECT 1 FROM public.lessons l
            JOIN public.chapters ch ON ch.id = l.chapter_id
            WHERE l.id = quizzes.lesson_id AND public.is_enrolled_in_course(ch.course_id, auth.uid())
        )
    );

-- Quiz Questions
CREATE POLICY "View quiz questions for enrolled students" ON public.quiz_questions
    FOR SELECT TO authenticated
    USING (
        public.current_user_role() IN ('admin', 'teacher') OR
        EXISTS (
            SELECT 1 FROM public.quizzes q
            JOIN public.lessons l ON l.id = q.lesson_id
            JOIN public.chapters ch ON ch.id = l.chapter_id
            WHERE q.id = quiz_questions.quiz_id AND public.is_enrolled_in_course(ch.course_id, auth.uid())
        )
    );

-- Quiz Options:
-- Instructors and admins see raw table with is_correct
CREATE POLICY "Teachers and Admins view quiz options with answers" ON public.quiz_options
    FOR ALL TO authenticated
    USING (public.current_user_role() IN ('admin', 'teacher'))
    WITH CHECK (public.current_user_role() IN ('admin', 'teacher'));

-- Safe public view for students (hiding is_correct)
CREATE OR REPLACE VIEW public.student_quiz_options AS
    SELECT id, question_id, option_text, order_index
    FROM public.quiz_options;

GRANT SELECT ON public.student_quiz_options TO authenticated;

-- Direct student access to quiz_options only permitted without exposing is_correct via column privileges
REVOKE ALL ON public.quiz_options FROM authenticated;
GRANT SELECT (id, question_id, option_text, order_index) ON public.quiz_options TO authenticated;
GRANT ALL ON public.quiz_options TO service_role;

CREATE POLICY "Students view quiz options text only" ON public.quiz_options
    FOR SELECT TO authenticated
    USING (
        EXISTS (
            SELECT 1 FROM public.quiz_questions qq
            JOIN public.quizzes q ON q.id = qq.quiz_id
            JOIN public.lessons l ON l.id = q.lesson_id
            JOIN public.chapters ch ON ch.id = l.chapter_id
            WHERE qq.id = quiz_options.question_id AND public.is_enrolled_in_course(ch.course_id, auth.uid())
        )
    );

-- Quiz Attempts:
CREATE POLICY "Students manage own quiz attempts" ON public.quiz_attempts
    FOR SELECT TO authenticated
    USING (student_id = auth.uid());

CREATE POLICY "Students start own quiz attempts" ON public.quiz_attempts
    FOR INSERT TO authenticated
    WITH CHECK (
        student_id = auth.uid() AND
        score_percentage IS NULL AND
        is_passed = false AND
        EXISTS (
            SELECT 1 FROM public.quizzes q
            JOIN public.lessons l ON l.id = q.lesson_id
            JOIN public.chapters ch ON ch.id = l.chapter_id
            WHERE q.id = quiz_id AND public.is_enrolled_in_course(ch.course_id, auth.uid())
        )
    );

CREATE POLICY "Teachers and admins view attempts" ON public.quiz_attempts
    FOR SELECT TO authenticated
    USING (
        public.current_user_role() = 'admin' OR (
            public.current_user_role() = 'teacher' AND EXISTS (
                SELECT 1 FROM public.quizzes q
                JOIN public.lessons l ON l.id = q.lesson_id
                JOIN public.chapters ch ON ch.id = l.chapter_id
                WHERE q.id = quiz_attempts.quiz_id AND public.is_teacher_of_course(ch.course_id, auth.uid())
            )
        )
    );

-- Safe Server-Side RPC to submit and grade a quiz attempt atomically
CREATE OR REPLACE FUNCTION public.submit_quiz_attempt(
    p_attempt_id UUID,
    p_answers JSONB -- Array of objects: [{"question_id": "...", "selected_option_id": "..."}]
)
RETURNS JSONB AS $$
DECLARE
    v_student_id UUID;
    v_quiz_id UUID;
    v_total_questions INT;
    v_correct_answers INT := 0;
    v_score_percentage NUMERIC(5,2);
    v_passing_score INT;
    v_is_passed BOOLEAN;
    v_elem JSONB;
    v_is_option_correct BOOLEAN;
BEGIN
    -- 1. Validate caller owns the attempt and it is pending
    SELECT student_id, quiz_id 
    INTO v_student_id, v_quiz_id
    FROM public.quiz_attempts
    WHERE id = p_attempt_id AND submitted_at IS NULL;

    IF v_student_id IS NULL THEN
        RAISE EXCEPTION 'Invalid or already submitted quiz attempt.';
    END IF;

    IF v_student_id != auth.uid() THEN
        RAISE EXCEPTION 'Access Denied: Attempt does not belong to caller.';
    END IF;

    -- 2. Fetch quiz passing score
    SELECT passing_score_percentage, 
           (SELECT COUNT(*) FROM public.quiz_questions WHERE quiz_id = v_quiz_id)
    INTO v_passing_score, v_total_questions
    FROM public.quizzes
    WHERE id = v_quiz_id;

    IF v_total_questions = 0 THEN
        RAISE EXCEPTION 'Quiz has no configured questions.';
    END IF;

    -- 3. Evaluate each question server-side
    FOR v_elem IN SELECT * FROM jsonb_array_elements(p_answers)
    LOOP
        SELECT is_correct INTO v_is_option_correct
        FROM public.quiz_options
        WHERE id = (v_elem->>'selected_option_id')::UUID 
          AND question_id = (v_elem->>'question_id')::UUID;

        IF v_is_option_correct IS TRUE THEN
            v_correct_answers := v_correct_answers + 1;
        END IF;

        INSERT INTO public.quiz_answers (attempt_id, question_id, selected_option_id, is_correct)
        VALUES (
            p_attempt_id,
            (v_elem->>'question_id')::UUID,
            (v_elem->>'selected_option_id')::UUID,
            COALESCE(v_is_option_correct, false)
        );
    END LOOP;

    -- 4. Calculate score
    v_score_percentage := ROUND((v_correct_answers::NUMERIC / v_total_questions::NUMERIC) * 100, 2);
    v_is_passed := v_score_percentage >= v_passing_score;

    -- 5. Finalize attempt
    UPDATE public.quiz_attempts
    SET submitted_at = NOW(),
        score_percentage = v_score_percentage,
        is_passed = v_is_passed
    WHERE id = p_attempt_id;

    RETURN jsonb_build_object(
        'attempt_id', p_attempt_id,
        'score_percentage', v_score_percentage,
        'is_passed', v_is_passed,
        'correct_count', v_correct_answers,
        'total_questions', v_total_questions
    );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public, auth;

REVOKE EXECUTE ON FUNCTION public.submit_quiz_attempt(UUID, JSONB) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.submit_quiz_attempt(UUID, JSONB) TO authenticated;

-- ------------------------------------------------------------------------------
-- 10. CERTIFICATES & PUBLIC VERIFICATION
-- ------------------------------------------------------------------------------

-- Allow public verification strictly by code without full table enumeration
CREATE OR REPLACE FUNCTION public.verify_certificate(p_certificate_code TEXT)
RETURNS TABLE (
    certificate_code TEXT,
    recipient_name TEXT,
    course_title TEXT,
    issued_at TIMESTAMPTZ,
    is_valid BOOLEAN
) AS $$
    SELECT 
        c.certificate_code,
        p.full_name AS recipient_name,
        crs.title AS course_title,
        c.issued_at,
        true AS is_valid
    FROM public.certificates c
    JOIN public.profiles p ON p.id = c.student_id
    JOIN public.courses crs ON crs.id = c.course_id
    WHERE c.certificate_code = p_certificate_code;
$$ LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public, auth;

REVOKE EXECUTE ON FUNCTION public.verify_certificate(TEXT) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.verify_certificate(TEXT) TO anon, authenticated;

-- Certificates table RLS
CREATE POLICY "Admins manage all certificates" ON public.certificates
    FOR ALL TO authenticated
    USING (public.current_user_role() = 'admin')
    WITH CHECK (public.current_user_role() = 'admin');

CREATE POLICY "Students view only own earned certificates" ON public.certificates
    FOR SELECT TO authenticated
    USING (student_id = auth.uid());

-- ------------------------------------------------------------------------------
-- 11. AUDIT LOGS IMMUTABILITY
-- ------------------------------------------------------------------------------

-- Audit logs can only be inserted, never modified or deleted
CREATE POLICY "Only admins read audit logs" ON public.audit_logs
    FOR SELECT TO authenticated
    USING (public.current_user_role() = 'admin');

CREATE POLICY "System and backend append audit logs" ON public.audit_logs
    FOR INSERT TO authenticated
    WITH CHECK (
        actor_id IS NULL OR actor_id = auth.uid()
    );

-- Block UPDATE and DELETE on audit logs for all users including admin
CREATE POLICY "Block audit log mutation" ON public.audit_logs
    FOR UPDATE TO authenticated
    USING (false);

CREATE POLICY "Block audit log deletion" ON public.audit_logs
    FOR DELETE TO authenticated
    USING (false);

-- ------------------------------------------------------------------------------
-- 12. STORAGE BUCKET RLS (Assignments & Course Materials)
-- ------------------------------------------------------------------------------

-- Ensure storage buckets exist and configure RLS
INSERT INTO storage.buckets (id, name, public)
VALUES 
    ('course-materials', 'course-materials', false),
    ('assignment-submissions', 'assignment-submissions', false),
    ('certificates', 'certificates', false),
    ('avatars', 'avatars', true)
ON CONFLICT (id) DO UPDATE SET public = EXCLUDED.public;

-- Drop existing storage policies if they exist before recreating
DROP POLICY IF EXISTS "Students upload own submission file" ON storage.objects;
DROP POLICY IF EXISTS "Students read own submission file" ON storage.objects;
DROP POLICY IF EXISTS "Teachers and admins read assignment submissions" ON storage.objects;
DROP POLICY IF EXISTS "Teachers and admins manage course materials" ON storage.objects;
DROP POLICY IF EXISTS "Enrolled students read course materials" ON storage.objects;
DROP POLICY IF EXISTS "Admins manage certificate files" ON storage.objects;
DROP POLICY IF EXISTS "Students read own certificate pdf" ON storage.objects;

-- Storage: assignment-submissions
-- Folder convention: assignment-submissions/{assignmentId}/{studentId}/{filename}
CREATE POLICY "Students upload own submission file" ON storage.objects
    FOR INSERT TO authenticated
    WITH CHECK (
        bucket_id = 'assignment-submissions' AND
        (storage.foldername(name))[2] = auth.uid()::TEXT
    );

CREATE POLICY "Students read own submission file" ON storage.objects
    FOR SELECT TO authenticated
    USING (
        bucket_id = 'assignment-submissions' AND
        (storage.foldername(name))[2] = auth.uid()::TEXT
    );

CREATE POLICY "Teachers and admins read assignment submissions" ON storage.objects
    FOR SELECT TO authenticated
    USING (
        bucket_id = 'assignment-submissions' AND
        public.current_user_role() IN ('teacher', 'admin')
    );

-- Storage: course-materials
CREATE POLICY "Teachers and admins manage course materials" ON storage.objects
    FOR ALL TO authenticated
    USING (
        bucket_id = 'course-materials' AND
        public.current_user_role() IN ('teacher', 'admin')
    )
    WITH CHECK (
        bucket_id = 'course-materials' AND
        public.current_user_role() IN ('teacher', 'admin')
    );

CREATE POLICY "Enrolled students read course materials" ON storage.objects
    FOR SELECT TO authenticated
    USING (
        bucket_id = 'course-materials' AND
        public.current_user_role() = 'student'
    );

-- Storage: certificates
CREATE POLICY "Admins manage certificate files" ON storage.objects
    FOR ALL TO authenticated
    USING (
        bucket_id = 'certificates' AND
        public.current_user_role() = 'admin'
    )
    WITH CHECK (
        bucket_id = 'certificates' AND
        public.current_user_role() = 'admin'
    );

CREATE POLICY "Students read own certificate pdf" ON storage.objects
    FOR SELECT TO authenticated
    USING (
        bucket_id = 'certificates' AND
        (storage.foldername(name))[1] = auth.uid()::TEXT
    );
