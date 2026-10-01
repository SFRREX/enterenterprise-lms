export interface UserSession {
  id: string
  name: string
  email: string
  role: "student" | "teacher" | "admin"
  batch?: string
  batchCode?: string
  initials: string
}

export const AUTH_COOKIE_NAME = "elms_session"
