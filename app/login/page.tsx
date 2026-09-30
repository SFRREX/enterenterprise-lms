"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Lock, Mail, GraduationCap, CheckCircle } from "lucide-react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export default function LoginPage() {
  const router = useRouter()
  const [selectedRole, setSelectedRole] = useState<"student" | "teacher" | "admin">("student")
  const [email, setEmail] = useState("alex.rivera@student.elms.edu")
  const [password, setPassword] = useState("password123")
  const [isLoading, setIsLoading] = useState(false)

  const handleRoleSelect = (role: "student" | "teacher" | "admin") => {
    setSelectedRole(role)
    if (role === "student") {
      setEmail("alex.rivera@student.elms.edu")
    } else if (role === "teacher") {
      setEmail("evelyn.reed@faculty.elms.edu")
    } else {
      setEmail("admin@institution.elms.edu")
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    setTimeout(() => {
      if (selectedRole === "student") {
        router.push("/dashboard")
      } else if (selectedRole === "teacher") {
        router.push("/teacher/dashboard")
      } else {
        router.push("/admin/dashboard")
      }
    }, 400)
  }

  return (
    <div className="min-h-screen bg-[#f5f5f7] flex flex-col justify-center items-center p-4 sm:p-6 selection:bg-[#0066cc]/20 selection:text-[#0066cc]">
      <div className="w-full max-w-md space-y-6">
        
        <div className="text-center space-y-2">
          <Link href="/" className="inline-flex items-center space-x-2">
            <div className="w-10 h-10 rounded-2xl bg-[#0066cc] flex items-center justify-center text-white shadow-sm">
              <GraduationCap className="w-6 h-6" />
            </div>
            <span className="font-bold text-3xl tracking-tight text-[#1d1d1f]">ELMS</span>
          </Link>
          <p className="text-sm text-[#7a7a7a]">Institutional Identity & Access Management</p>
        </div>

        <Card hoverable={false} className="p-8 border-[#e5e5e7] shadow-xl space-y-6 bg-white rounded-3xl">
          <div className="space-y-1">
            <h1 className="text-xl font-bold tracking-tight text-[#1d1d1f]">Sign In to Your Account</h1>
            <p className="text-xs text-[#7a7a7a]">Select your role to quickly sign in and test the portal</p>
          </div>

          {/* Quick Role Selector */}
          <div className="grid grid-cols-3 gap-2 p-1 bg-[#f5f5f7] rounded-xl border border-[#e5e5e7]">
            <button
              type="button"
              onClick={() => handleRoleSelect("student")}
              className={`py-2 text-xs font-semibold rounded-lg transition-all ${
                selectedRole === "student"
                  ? "bg-white text-[#1d1d1f] shadow-sm"
                  : "text-[#7a7a7a] hover:text-[#1d1d1f]"
              }`}
            >
              Student
            </button>
            <button
              type="button"
              onClick={() => handleRoleSelect("teacher")}
              className={`py-2 text-xs font-semibold rounded-lg transition-all ${
                selectedRole === "teacher"
                  ? "bg-white text-[#1d1d1f] shadow-sm"
                  : "text-[#7a7a7a] hover:text-[#1d1d1f]"
              }`}
            >
              Faculty
            </button>
            <button
              type="button"
              onClick={() => handleRoleSelect("admin")}
              className={`py-2 text-xs font-semibold rounded-lg transition-all ${
                selectedRole === "admin"
                  ? "bg-white text-[#1d1d1f] shadow-sm"
                  : "text-[#7a7a7a] hover:text-[#1d1d1f]"
              }`}
            >
              Admin
            </button>
          </div>

          <form className="space-y-4" onSubmit={handleSubmit}>
            <div className="space-y-1.5 text-left">
              <label className="text-xs font-semibold text-[#1d1d1f]">Institutional Email</label>
              <div className="relative">
                <Mail className="w-4 h-4 text-[#7a7a7a] absolute left-3.5 top-3" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-[#e5e5e7] text-sm focus:outline-none focus:ring-2 focus:ring-[#0071e3]/30"
                  required
                />
              </div>
            </div>

            <div className="space-y-1.5 text-left">
              <label className="text-xs font-semibold text-[#1d1d1f]">Password</label>
              <div className="relative">
                <Lock className="w-4 h-4 text-[#7a7a7a] absolute left-3.5 top-3" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-[#e5e5e7] text-sm focus:outline-none focus:ring-2 focus:ring-[#0071e3]/30"
                  required
                />
              </div>
            </div>

            <div className="pt-2">
              <Button 
                type="submit" 
                variant="primary" 
                size="md" 
                disabled={isLoading}
                className="w-full"
              >
                {isLoading ? "Signing in..." : `Sign In as ${selectedRole.charAt(0).toUpperCase() + selectedRole.slice(1)}`}
              </Button>
            </div>
          </form>

          {/* Quick Direct Access Buttons */}
          <div className="pt-4 border-t border-[#f0f0f2] space-y-2">
            <div className="text-[11px] font-semibold text-[#7a7a7a] uppercase tracking-wider text-center">
              Direct Quick-Links
            </div>
            <div className="flex flex-col gap-1.5 text-xs">
              <Link 
                href="/dashboard" 
                className="p-2 rounded-xl bg-[#f5f5f7] hover:bg-[#ebebed] text-[#1d1d1f] flex items-center justify-between font-medium transition-colors"
              >
                <span>Student Hub (Alex Rivera)</span>
                <span className="text-[#0066cc]">Enter &rarr;</span>
              </Link>
              <Link 
                href="/teacher/dashboard" 
                className="p-2 rounded-xl bg-[#f5f5f7] hover:bg-[#ebebed] text-[#1d1d1f] flex items-center justify-between font-medium transition-colors"
              >
                <span>Faculty Studio (Dr. Evelyn Reed)</span>
                <span className="text-[#0066cc]">Enter &rarr;</span>
              </Link>
              <Link 
                href="/admin/dashboard" 
                className="p-2 rounded-xl bg-[#f5f5f7] hover:bg-[#ebebed] text-[#1d1d1f] flex items-center justify-between font-medium transition-colors"
              >
                <span>Administrator Console</span>
                <span className="text-[#0066cc]">Enter &rarr;</span>
              </Link>
            </div>
          </div>
        </Card>
      </div>
    </div>
  )
}
