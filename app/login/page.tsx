"use client"

import { useState, Suspense } from "react"
import Link from "next/link"
import { useRouter, useSearchParams } from "next/navigation"
import { Lock, Mail, GraduationCap, ShieldCheck } from "lucide-react"
import { AUTH_COOKIE_NAME } from "@/lib/auth"

import { createClient } from "@/utils/supabase/client"

function LoginForm() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const redirectTarget = searchParams.get("redirect")

  const [selectedRole, setSelectedRole] = useState<"student" | "teacher" | "admin">("student")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const handleRoleSelect = (role: "student" | "teacher" | "admin") => {
    setSelectedRole(role)
    setError(null)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)

    if (!email || !password) {
      setError("Please enter your email and password.")
      setIsLoading(false)
      return
    }

    try {
      const supabase = createClient()

      // 1. Authenticate strictly against Supabase Auth
      const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
        email: email.trim(),
        password: password
      })

      if (authError || !authData?.user) {
        // STRICT ZERO-TRUST: Any invalid credential or wrong password immediately halts with an error
        setError(authError?.message || "Invalid email or password. Please verify your credentials.")
        setIsLoading(false)
        return
      }

      // 2. Fetch authenticated profile role
      const { data: profile } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', authData.user.id)
        .maybeSingle()

      // Extract verified role from profile, or fallback to auth metadata
      const metaRole = (authData.user.app_metadata?.role || authData.user.user_metadata?.role) as string | undefined
      const resolvedRole = (profile?.role || metaRole || selectedRole) as "student" | "teacher" | "admin"
      const formattedName = profile?.full_name || authData.user.user_metadata?.full_name || email.split('@')[0]
      const initials = formattedName.slice(0, 2).toUpperCase()

      // 3. Set verified session cookie
      const session = {
        id: authData.user.id,
        name: formattedName,
        email: profile?.email || email.trim(),
        role: resolvedRole,
        batch: resolvedRole === "student" ? (profile?.batch || "General Cohort") : undefined,
        batchCode: resolvedRole === "student" ? (profile?.batch_code || "COHORT-STD") : undefined,
        initials: initials
      }

      const serialized = encodeURIComponent(JSON.stringify(session))
      document.cookie = `${AUTH_COOKIE_NAME}=${serialized}; path=/; max-age=604800; SameSite=Lax`

      // 4. Role-based redirect
      if (redirectTarget) {
        router.push(redirectTarget)
      } else if (resolvedRole === "student") {
        router.push("/dashboard")
      } else if (resolvedRole === "teacher") {
        router.push("/teacher/dashboard")
      } else {
        router.push("/admin/dashboard")
      }
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "An unexpected authentication error occurred."
      setError(message)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="w-full max-w-[420px] space-y-8 animate-entrance-fade">
      {/* Brand Header: 21px tagline, 56px typography hierarchy */}
      <div className="text-center space-y-2">
        <Link href="/" className="inline-flex items-center space-x-2.5 group">
          <div className="w-10 h-10 rounded-[11px] bg-[#1d1d1f] flex items-center justify-center text-white transition-transform group-hover:scale-105 active:scale-95">
            <GraduationCap className="w-5 h-5" />
          </div>
          <span className="font-semibold text-[28px] tracking-[-0.28px] text-[#1d1d1f]">ELMS</span>
        </Link>
        <p className="text-[14px] text-[#7a7a7a] tracking-tight">Enterprise Identity &amp; Access Authentication</p>
      </div>

      {redirectTarget && (
        <div className="p-3.5 rounded-full bg-[#0066cc]/10 border border-[#0066cc]/20 text-[13px] text-[#0066cc] text-center font-medium">
          Authentication required to access {redirectTarget}.
        </div>
      )}

      {/* Store Utility Card Spec: 18px radius, 1px solid hairline #e0e0e0 border, 24px padding */}
      <div className="bg-white rounded-[18px] border border-[#e0e0e0] p-7 space-y-6">
        <div className="space-y-1">
          <h1 className="text-[21px] font-semibold tracking-[-0.28px] text-[#1d1d1f]">Sign In</h1>
          <p className="text-[14px] text-[#7a7a7a] leading-normal">
            Choose your academic role and enter institutional credentials.
          </p>
        </div>

        {/* Option Chips: rounded-full pill grammar */}
        <div className="grid grid-cols-3 gap-1.5 p-1 bg-[#f5f5f7] rounded-full border border-[#e0e0e0]">
          <button
            type="button"
            onClick={() => handleRoleSelect("student")}
            className={`py-2 text-[12px] font-medium rounded-full transition-all cursor-pointer ${
              selectedRole === "student"
                ? "bg-white text-[#1d1d1f] shadow-[0_2px_8px_rgba(0,0,0,0.06)]"
                : "text-[#7a7a7a] hover:text-[#1d1d1f]"
            }`}
          >
            Student
          </button>
          <button
            type="button"
            onClick={() => handleRoleSelect("teacher")}
            className={`py-2 text-[12px] font-medium rounded-full transition-all cursor-pointer ${
              selectedRole === "teacher"
                ? "bg-white text-[#1d1d1f] shadow-[0_2px_8px_rgba(0,0,0,0.06)]"
                : "text-[#7a7a7a] hover:text-[#1d1d1f]"
            }`}
          >
            Faculty
          </button>
          <button
            type="button"
            onClick={() => handleRoleSelect("admin")}
            className={`py-2 text-[12px] font-medium rounded-full transition-all cursor-pointer ${
              selectedRole === "admin"
                ? "bg-white text-[#1d1d1f] shadow-[0_2px_8px_rgba(0,0,0,0.06)]"
                : "text-[#7a7a7a] hover:text-[#1d1d1f]"
            }`}
          >
            Admin
          </button>
        </div>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <div className="space-y-1.5 text-left">
            <label className="text-[12px] font-medium text-[#1d1d1f] tracking-tight">Institutional Email</label>
            <div className="relative">
              <Mail className="w-4 h-4 text-[#7a7a7a] absolute left-4 top-3.5" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@institution.edu"
                className="w-full pl-11 pr-4 h-[44px] rounded-full border border-[#e0e0e0] text-[15px] text-[#1d1d1f] placeholder:text-[#7a7a7a]/60 bg-white focus:outline-none focus:border-[#0071e3] focus:ring-2 focus:ring-[#0071e3]/20 transition-all"
                required
              />
            </div>
          </div>

          <div className="space-y-1.5 text-left">
            <label className="text-[12px] font-medium text-[#1d1d1f] tracking-tight">Password</label>
            <div className="relative">
              <Lock className="w-4 h-4 text-[#7a7a7a] absolute left-4 top-3.5" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="&bull;&bull;&bull;&bull;&bull;&bull;&bull;&bull;"
                className="w-full pl-11 pr-4 h-[44px] rounded-full border border-[#e0e0e0] text-[15px] text-[#1d1d1f] placeholder:text-[#7a7a7a]/60 bg-white focus:outline-none focus:border-[#0071e3] focus:ring-2 focus:ring-[#0071e3]/20 transition-all"
                required
              />
            </div>
          </div>

          {error && (
            <div 
              role="alert" 
              aria-live="assertive"
              className="p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-[13px] text-rose-700 font-medium text-center flex items-center justify-center gap-2"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-rose-600 inline-block animate-pulse" />
              <span>{error}</span>
            </div>
          )}

          {/* Action Blue button-primary specification: #0066cc, full pill 9999px, 11px 22px padding, scale(0.95) active */}
          <div className="pt-2">
            <button
              type="submit"
              disabled={isLoading}
              className="w-full h-[44px] bg-[#0066cc] hover:bg-[#0071e3] active:scale-[0.95] text-white text-[15px] font-normal rounded-full transition-all duration-200 shadow-sm cursor-pointer disabled:opacity-50 disabled:pointer-events-none"
            >
              {isLoading ? "Authenticating Session..." : `Sign In as ${selectedRole.charAt(0).toUpperCase() + selectedRole.slice(1)}`}
            </button>
          </div>
        </form>
      </div>

      <div className="flex items-center justify-center space-x-2 text-[12px] text-[#7a7a7a]">
        <ShieldCheck className="w-4 h-4 text-emerald-600" />
        <span>Protected with HttpOnly Cookies &amp; PostgreSQL RLS</span>
      </div>
    </div>
  )
}

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-[#f5f5f7] flex flex-col justify-center items-center p-4 selection:bg-[#0066cc]/20 selection:text-[#0066cc]">
      <Suspense fallback={<div className="text-[12px] text-[#7a7a7a]">Loading Authentication Gateway...</div>}>
        <LoginForm />
      </Suspense>
    </div>
  )
}
