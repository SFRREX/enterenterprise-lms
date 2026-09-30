"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { 
  ShieldCheck, 
  BookOpen, 
  Users, 
  FolderGit2, 
  Settings, 
  FileSpreadsheet, 
  LogOut,
  Bell,
  Award
} from "lucide-react"

export function AdminSidebar() {
  const pathname = usePathname()

  const navItems = [
    { label: "Dashboard", href: "/admin/dashboard", icon: ShieldCheck },
    { label: "Batches", href: "/admin/batches", icon: FolderGit2 },
    { label: "Courses", href: "/admin/courses", icon: BookOpen },
    { label: "Students", href: "/admin/students", icon: Users },
    { label: "Teachers", href: "/admin/teachers", icon: Users },
    { label: "Assignments", href: "/admin/assignments", icon: BookOpen },
    { label: "Quizzes", href: "/admin/quizzes", icon: BookOpen },
    { label: "Results & Audits", href: "/admin/results", icon: FileSpreadsheet },
    { label: "Announcements", href: "/admin/announcements", icon: Bell },
    { label: "Certificates", href: "/admin/certificates", icon: Award },
    { label: "Settings", href: "/admin/settings", icon: Settings },
  ]

  const isItemActive = (href: string) => {
    if (href === "/admin/dashboard") return pathname === "/admin/dashboard"
    return pathname?.startsWith(href)
  }

  return (
    <aside className="w-64 border-r border-[#e5e5e7] bg-white h-screen sticky top-0 flex flex-col justify-between p-4 overflow-y-auto">
      <div>
        <div className="flex items-center space-x-2 px-3 py-4 mb-4 border-b border-[#f0f0f2]">
          <span className="font-bold text-xl tracking-tight text-[#1d1d1f]">ELMS</span>
          <span className="text-[11px] uppercase tracking-wider px-2 py-0.5 rounded-full bg-purple-500/10 text-purple-600 font-semibold">Admin</span>
        </div>

        <nav className="space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon
            const active = isItemActive(item.href)
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-xl transition-all ${
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

      <div className="pt-4 border-t border-[#f0f0f2] mt-4">
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
