// Database connection and configuration guide
// Supports: Supabase (Default), Raw PostgreSQL (Neon / RDS / Self-hosted), Prisma, Drizzle

export interface DatabaseConfig {
  provider: 'supabase' | 'postgres' | 'prisma' | 'drizzle'
  connectionString?: string
  supabaseUrl?: string
  supabaseAnonKey?: string
  supabaseServiceKey?: string
}

export const dbConfig: DatabaseConfig = {
  provider: (process.env.DATABASE_PROVIDER as any) || 'supabase',
  connectionString: process.env.DATABASE_URL,
  supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_URL,
  supabaseAnonKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
  supabaseServiceKey: process.env.SUPABASE_SERVICE_ROLE_KEY,
}
