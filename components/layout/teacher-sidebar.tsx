"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { BookOpen, CheckSquare, HelpCircle, Users, LayoutDashboard, LogOut } from "lucide-react"

export function TeacherSidebar() {
  const pathname = usePathname()

  const navItems = [
    { label: "Dashboard", href: "/teacher/dashboard", icon: LayoutDashboard },
    { label: "My Courses", href: "/teacher/courses", icon: BookOpen },
    { label: "Grade Assignments", href: "/teacher/assignments", icon: CheckSquare },
    { label: "Manage Quizzes", href: "/teacher/quizzes", icon: HelpCircle },
    { label: "Student Roster", href: "/teacher/students", icon: Users },
  ]

  const isItemActive = (href: string) => {
    if (href === "/teacher/dashboard") return pathname === "/teacher/dashboard"
    return pathname?.startsWith(href)
  }

  return (
    <aside className="w-64 border-r border-[#e5e5e7] bg-white h-screen sticky top-0 flex flex-col justify-between p-4">
      <div>
        <div className="flex items-center space-x-2 px-3 py-4 mb-6 border-b border-[#f0f0f2]">
          <span className="font-bold text-xl tracking-tight text-[#1d1d1f]">ELMS</span>
          <span className="text-[11px] uppercase tracking-wider px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 font-semibold">Faculty</span>
        </div>

        <nav className="space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon
            const active = isItemActive(item.href)
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-3 py-2.5 text-sm font-medium rounded-xl transition-all ${
                  active
                    ? "bg-[#1d1d1f] text-white shadow-sm"
                    : "text-[#6e6e73] hover:text-[#1d1d1f] hover:bg-[#f5f5f7]"
                }`}
              >
                <Icon className={`w-4 h-4 ${active ? "text-white" : "text-[#86868b]"}`} />
                {item.label}
              </Link>
            )
          })}
        </nav>
      </div>

      <div className="pt-4 border-t border-[#f0f0f2]">
        <Link
          href="/login"
          className="flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-xl text-rose-600 hover:bg-rose-50 transition-all"
        >
          <LogOut className="w-4 h-4" />
          Sign Out
        </Link>
      </div>
    </aside>
  )
}
