"use client"

import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
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
  const router = useRouter()

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
    <aside className="w-64 border-r border-[#e0e0e0] bg-[#fafafc] h-screen sticky top-0 flex flex-col justify-between p-4 overflow-y-auto">
      <div>
        <div className="flex items-center space-x-2 px-3 py-3 mb-4 border-b border-[#e0e0e0]">
          <span className="font-semibold text-[21px] tracking-tight text-[#1d1d1f]">ELMS</span>
          <span className="text-[11px] uppercase tracking-wider px-2 py-0.5 rounded-full bg-[#1d1d1f] text-white font-medium">Admin</span>
        </div>

        <nav className="space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon
            const active = isItemActive(item.href)
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-3.5 py-2 text-[13px] font-medium rounded-full transition-all active:scale-[0.95] ${
                  active
                    ? "bg-[#1d1d1f] text-white shadow-none"
                    : "text-[#7a7a7a] hover:text-[#1d1d1f] hover:bg-black/5"
                }`}
              >
                <Icon className={`w-4 h-4 ${active ? "text-white" : "text-[#7a7a7a]"}`} />
                {item.label}
              </Link>
            )
          })}
        </nav>
      </div>

      <div className="pt-4 border-t border-[#f0f0f2] mt-4">
        <button
          onClick={() => {
            document.cookie = "elms_session=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT"
            router.push("/login")
          }}
          className="w-full flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-xl text-rose-600 hover:bg-rose-50 transition-all cursor-pointer text-left"
        >
          <LogOut className="w-4 h-4" />
          Sign Out
        </button>
      </div>
    </aside>
  )
}
