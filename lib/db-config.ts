/**
 * Enterprise Database Architecture & Zero-Trust Security Strategy
 * 
 * Strict Security Principles Enforced:
 * 1. Client Security:
 *    - Never expose `SUPABASE_SERVICE_ROLE_KEY` or direct root DB credentials to the browser.
 *    - Client queries only use the anonymous token (`NEXT_PUBLIC_SUPABASE_ANON_KEY`) which
 *      is bounded by PostgreSQL Row Level Security (RLS).
 * 
 * 2. Defense in Depth:
 *    - Service Role Operations are restricted to secure Server Actions and API routes.
 *    - Parameterized SQL / ORM abstractions prevent SQL injection vectors.
 *    - Connection pooling (PgBouncer / Supabase Pooler) with SSL encryption (`sslmode=require`).
 * 
 * 3. Row-Level Security:
 *    - Policies isolate students strictly to their enrolled cohorts and their own submissions.
 *    - Instructors have access bounded to assigned cohorts and course IDs.
 *    - Quiz answer evaluation occurs strictly on the server boundary.
 */

export interface DatabaseConfig {
  provider: 'supabase' | 'postgres' | 'prisma' | 'drizzle'
  connectionString?: string
  supabaseUrl?: string
  supabaseAnonKey?: string
  supabaseServiceKey?: string
  sslRequired: boolean
  maxConnections: number
  idleTimeoutMillis: number
}

// Validates that sensitive keys are never exposed in browser runtime
const isBrowser = typeof window !== 'undefined'

export const dbConfig: DatabaseConfig = {
  provider: (process.env.DATABASE_PROVIDER as DatabaseConfig['provider']) || 'supabase',
  connectionString: isBrowser ? undefined : process.env.DATABASE_URL,
  supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_URL,
  supabaseAnonKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
  // Guarded: Never accessible on client-side renders
  supabaseServiceKey: isBrowser ? undefined : process.env.SUPABASE_SERVICE_ROLE_KEY,
  sslRequired: process.env.NODE_ENV === 'production',
  maxConnections: 20,
  idleTimeoutMillis: 30000,
}

export function validateDatabaseEnvironment(): { valid: boolean; warnings: string[] } {
  const warnings: string[] = []

  if (!dbConfig.supabaseUrl) {
    warnings.push("NEXT_PUBLIC_SUPABASE_URL is not set (mock fallback active).")
  }
  if (!dbConfig.supabaseAnonKey) {
    warnings.push("NEXT_PUBLIC_SUPABASE_ANON_KEY is not set (mock fallback active).")
  }
  if (!isBrowser && !dbConfig.supabaseServiceKey) {
    warnings.push("SUPABASE_SERVICE_ROLE_KEY is not set for privileged backend server actions.")
  }

  return {
    valid: warnings.length === 0,
    warnings,
  }
}
