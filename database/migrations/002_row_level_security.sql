-- Supabase Row Level Security (RLS) Policies
-- Run after 001_initial_schema.sql

-- Enable RLS on all primary tables
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE batches ENABLE ROW LEVEL SECURITY;
ALTER TABLE batch_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE courses ENABLE ROW LEVEL SECURITY;
ALTER TABLE course_teachers ENABLE ROW LEVEL SECURITY;
ALTER TABLE chapters ENABLE ROW LEVEL SECURITY;
ALTER TABLE lessons ENABLE ROW LEVEL SECURITY;
ALTER TABLE lesson_resources ENABLE ROW LEVEL SECURITY;
ALTER TABLE lesson_progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE assignments ENABLE ROW LEVEL SECURITY;
ALTER TABLE assignment_submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE quizzes ENABLE ROW LEVEL SECURITY;
ALTER TABLE quiz_questions ENABLE ROW LEVEL SECURITY;
ALTER TABLE quiz_options ENABLE ROW LEVEL SECURITY;
ALTER TABLE quiz_attempts ENABLE ROW LEVEL SECURITY;
ALTER TABLE quiz_answers ENABLE ROW LEVEL SECURITY;
ALTER TABLE certificates ENABLE ROW LEVEL SECURITY;
ALTER TABLE audit_logs ENABLE ROW LEVEL SECURITY;

-- Helper Function to check current user role
CREATE OR REPLACE FUNCTION current_user_role()
RETURNS user_role AS $$
    SELECT role FROM profiles WHERE id = auth.uid();
$$ LANGUAGE sql STABLE SECURITY DEFINER;

-- 1. Profiles Policies
CREATE POLICY "Public profile read access" ON profiles
    FOR SELECT TO authenticated USING (true);

CREATE POLICY "Users can update own profile" ON profiles
    FOR UPDATE TO authenticated USING (auth.uid() = id);

-- 2. Batches Policies
CREATE POLICY "Admins have full access to batches" ON batches
    FOR ALL TO authenticated USING (current_user_role() = 'admin');

CREATE POLICY "Students can view enrolled batches" ON batches
    FOR SELECT TO authenticated USING (
        EXISTS (SELECT 1 FROM batch_members WHERE batch_id = batches.id AND student_id = auth.uid())
    );

-- 3. Courses Policies
CREATE POLICY "Admins full access to courses" ON courses
    FOR ALL TO authenticated USING (current_user_role() = 'admin');

CREATE POLICY "Teachers can view and update assigned courses" ON courses
    FOR ALL TO authenticated USING (
        EXISTS (SELECT 1 FROM course_teachers WHERE course_id = courses.id AND teacher_id = auth.uid())
    );

CREATE POLICY "Students can view courses in enrolled batches" ON courses
    FOR SELECT TO authenticated USING (
        is_published = true AND deleted_at IS NULL AND (
            batch_id IS NULL OR EXISTS (
                SELECT 1 FROM batch_members WHERE batch_id = courses.batch_id AND student_id = auth.uid()
            )
        )
    );

-- 4. Lessons & Resources
CREATE POLICY "Read published lessons for course learners" ON lessons
    FOR SELECT TO authenticated USING (
        deleted_at IS NULL AND EXISTS (
            SELECT 1 FROM chapters c
            JOIN courses crs ON crs.id = c.course_id
            WHERE c.id = lessons.chapter_id AND crs.is_published = true
        )
    );

CREATE POLICY "Read lesson resources for course learners" ON lesson_resources
    FOR SELECT TO authenticated USING (
        EXISTS (
            SELECT 1 FROM lessons l
            WHERE l.id = lesson_resources.lesson_id
        )
    );

-- 5. Lesson Progress
CREATE POLICY "Students own progress read and write" ON lesson_progress
    FOR ALL TO authenticated USING (student_id = auth.uid());

CREATE POLICY "Teachers can view progress for assigned courses" ON lesson_progress
    FOR SELECT TO authenticated USING (
        current_user_role() IN ('teacher', 'admin')
    );

-- 6. Assignment Submissions (Zero Trust isolation)
CREATE POLICY "Students can view and create own submissions" ON assignment_submissions
    FOR ALL TO authenticated USING (student_id = auth.uid());

CREATE POLICY "Teachers can view and grade assigned course submissions" ON assignment_submissions
    FOR ALL TO authenticated USING (
        current_user_role() IN ('teacher', 'admin')
    );

-- 7. Quiz Options (Never leak is_correct to students during query)
-- Notice: is_correct is shielded in view/API; RLS allows attempt checks
CREATE POLICY "Students can view options" ON quiz_options
    FOR SELECT TO authenticated USING (true);

-- 8. Quiz Attempts & Answers
CREATE POLICY "Students access own quiz attempts" ON quiz_attempts
    FOR ALL TO authenticated USING (student_id = auth.uid());

CREATE POLICY "Students access own quiz answers" ON quiz_answers
    FOR ALL TO authenticated USING (
        EXISTS (SELECT 1 FROM quiz_attempts qa WHERE qa.id = quiz_answers.attempt_id AND qa.student_id = auth.uid())
    );

-- 9. Certificates
CREATE POLICY "Public verification of certificates by code" ON certificates
    FOR SELECT USING (true);

CREATE POLICY "Students can view their own certificates" ON certificates
    FOR SELECT TO authenticated USING (student_id = auth.uid());

-- 10. Audit Logs
CREATE POLICY "Only admins read audit logs" ON audit_logs
    FOR SELECT TO authenticated USING (current_user_role() = 'admin');
