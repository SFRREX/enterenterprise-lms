export interface UserSession {
  id: string
  name: string
  email: string
  role: "student" | "teacher" | "admin"
  batch?: string
  batchCode?: string
  initials: string
}

export const DEMO_ACCOUNTS: Record<string, UserSession> = {
  student: {
    id: "usr-student-001",
    name: "Alex Rivera",
    email: "alex.rivera@student.elms.edu",
    role: "student",
    batch: "Cohort 2026-Alpha",
    batchCode: "BATCH-26A",
    initials: "AR"
  },
  teacher: {
    id: "usr-teacher-001",
    name: "Dr. Evelyn Reed",
    email: "evelyn.reed@faculty.elms.edu",
    role: "teacher",
    initials: "ER"
  },
  admin: {
    id: "usr-admin-001",
    name: "Platform Administrator",
    email: "admin@institution.elms.edu",
    role: "admin",
    initials: "PA"
  }
}

export const AUTH_COOKIE_NAME = "elms_session"
