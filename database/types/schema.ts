export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type UserRole = 'student' | 'teacher' | 'admin'
export type LessonType = 'video' | 'notes' | 'document' | 'assignment' | 'quiz'
export type ProgressStatus = 'not_started' | 'in_progress' | 'completed'
export type SubmissionStatus = 'submitted' | 'graded' | 'revision_requested'

export interface Profile {
  id: string
  email: string
  full_name: string
  avatar_url?: string | null
  role: UserRole
  created_at: string
  updated_at: string
}

export interface Batch {
  id: string
  name: string
  code: string
  start_date?: string | null
  end_date?: string | null
  is_active: boolean
  created_at: string
  updated_at: string
  deleted_at?: string | null
}

export interface BatchMember {
  id: string
  batch_id: string
  student_id: string
  enrolled_at: string
}

export interface Course {
  id: string
  batch_id?: string | null
  title: string
  slug: string
  description?: string | null
  thumbnail_url?: string | null
  is_published: boolean
  order_index: number
  created_at: string
  updated_at: string
  deleted_at?: string | null
}

export interface Chapter {
  id: string
  course_id: string
  title: string
  description?: string | null
  order_index: number
  created_at: string
  updated_at: string
  deleted_at?: string | null
}

export interface Lesson {
  id: string
  chapter_id: string
  title: string
  type: LessonType
  order_index: number
  duration_seconds: number
  is_preview: boolean
  created_at: string
  updated_at: string
  deleted_at?: string | null
}

export interface LessonResource {
  id: string
  lesson_id: string
  title: string
  cloudflare_stream_uid?: string | null
  r2_storage_key?: string | null
  file_size_bytes?: number | null
  mime_type?: string | null
  content_markdown?: string | null
  created_at: string
  updated_at: string
}

export interface LessonProgress {
  id: string
  student_id: string
  lesson_id: string
  status: ProgressStatus
  last_position_seconds: number
  completed_at?: string | null
  updated_at: string
}

export interface Assignment {
  id: string
  lesson_id: string
  title: string
  instructions: string
  due_date?: string | null
  max_points: number
  allowed_file_types: string[]
  max_file_size_bytes: number
  created_at: string
  updated_at: string
}

export interface AssignmentSubmission {
  id: string
  assignment_id: string
  student_id: string
  r2_storage_key: string
  file_name: string
  file_size_bytes: number
  grade?: number | null
  feedback?: string | null
  graded_by?: string | null
  graded_at?: string | null
  status: SubmissionStatus
  submitted_at: string
  updated_at: string
}

export interface Quiz {
  id: string
  lesson_id: string
  title: string
  time_limit_minutes?: number | null
  passing_score_percentage: number
  max_attempts: number
  created_at: string
  updated_at: string
}

export interface QuizQuestion {
  id: string
  quiz_id: string
  prompt: string
  order_index: number
  points: number
  created_at: string
}

export interface QuizOption {
  id: string
  question_id: string
  option_text: string
  order_index: number
  // Notice: is_correct is intentionally excluded from client-facing types
}

export interface QuizOptionAdmin extends QuizOption {
  is_correct: boolean
}

export interface QuizAttempt {
  id: string
  quiz_id: string
  student_id: string
  started_at: string
  submitted_at?: string | null
  score_percentage?: number | null
  is_passed: boolean
}

export interface Certificate {
  id: string
  certificate_code: string
  student_id: string
  course_id: string
  issued_at: string
  pdf_r2_key?: string | null
}

export interface AuditLog {
  id: string
  actor_id?: string | null
  action: string
  resource_type: string
  resource_id: string
  details?: Record<string, unknown> | null
  ip_address?: string | null
  created_at: string
}
