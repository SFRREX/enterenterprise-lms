"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { 
  BookOpen, 
  Award, 
  CheckSquare, 
  LayoutDashboard, 
  LogOut, 
  FileText, 
  HelpCircle, 
  Bell,
  MoreHorizontal,
  ChevronDown,
  Menu,
  X
} from "lucide-react"

export function StudentNavbar() {
  const pathname = usePathname()
  const [isMoreOpen, setIsMoreOpen] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const primaryNavItems = [
    { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
    { label: "Courses", href: "/courses", icon: BookOpen },
    { label: "Assignments", href: "/assignments", icon: CheckSquare },
    { label: "Quizzes", href: "/quizzes", icon: HelpCircle },
  ]

  const secondaryNavItems = [
    { label: "My Batch", href: "/batch", icon: BookOpen, desc: "Cohort schedule & syllabus" },
    { label: "Study Notes", href: "/notes", icon: FileText, desc: "Handouts & digital notes" },
    { label: "Quiz Results", href: "/results", icon: FileText, desc: "Performance & grade cards" },
    { label: "Certificates", href: "/certificates", icon: Award, desc: "Verified credentials" },
    { label: "Announcements", href: "/announcements", icon: Bell, desc: "Campus & batch notices" },
  ]

  const isSecondaryActive = secondaryNavItems.some((item) => pathname?.startsWith(item.href))

  const isItemActive = (href: string) => {
    if (href === "/dashboard") return pathname === "/dashboard"
    return pathname?.startsWith(href)
  }

  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-xl border-b border-[#e5e5e7]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <div className="flex items-center space-x-6 lg:space-x-8">
          <Link href="/dashboard" className="flex items-center space-x-2.5 group">
            <span className="font-bold text-xl tracking-tight text-[#1d1d1f] group-hover:text-[#0066cc] transition-colors">
              ELMS
            </span>
            <span className="text-[11px] uppercase tracking-wider px-2 py-0.5 rounded-full bg-[#0066cc]/10 text-[#0066cc] font-semibold">
              Student
            </span>
          </Link>

          <nav className="hidden md:flex items-center space-x-1 lg:space-x-2">
            {primaryNavItems.map((item) => {
              const Icon = item.icon
              const active = isItemActive(item.href)
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all flex items-center gap-1.5 whitespace-nowrap ${
                    active
                      ? "bg-[#1d1d1f] text-white shadow-sm"
                      : "text-[#6e6e73] hover:text-[#1d1d1f] hover:bg-[#f5f5f7]"
                  }`}
                >
                  <Icon className={`w-4 h-4 ${active ? "text-white" : "text-[#86868b]"}`} />
                  <span>{item.label}</span>
                </Link>
              )
            })}

            <div className="relative">
              <button
                type="button"
                onClick={() => setIsMoreOpen(!isMoreOpen)}
                onBlur={() => setTimeout(() => setIsMoreOpen(false), 200)}
                className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all flex items-center gap-1.5 whitespace-nowrap ${
                  isSecondaryActive
                    ? "bg-[#0066cc]/10 text-[#0066cc]"
                    : "text-[#6e6e73] hover:text-[#1d1d1f] hover:bg-[#f5f5f7]"
                }`}
              >
                <MoreHorizontal className="w-4 h-4" />
                <span>More</span>
                <ChevronDown className={`w-3.5 h-3.5 transition-transform ${isMoreOpen ? "rotate-180" : ""}`} />
              </button>

              {isMoreOpen && (
                <div className="absolute left-0 mt-2 w-64 bg-white rounded-2xl shadow-xl border border-[#e5e5e7] py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                  <div className="px-3 py-1.5 text-[11px] font-semibold uppercase tracking-wider text-[#86868b] border-b border-[#f0f0f2] mb-1">
                    Student Resources
                  </div>
                  {secondaryNavItems.map((item) => {
                    const Icon = item.icon
                    const active = isItemActive(item.href)
                    return (
                      <Link
                        key={item.href}
                        href={item.href}
                        onClick={() => setIsMoreOpen(false)}
                        className={`flex items-start gap-3 px-3.5 py-2 mx-1 rounded-xl transition-colors ${
                          active
                            ? "bg-[#0066cc]/10 text-[#0066cc]"
                            : "hover:bg-[#f5f5f7] text-[#1d1d1f]"
                        }`}
                      >
                        <div className={`p-1.5 rounded-lg mt-0.5 ${active ? "bg-[#0066cc] text-white" : "bg-[#f5f5f7] text-[#6e6e73]"}`}>
                          <Icon className="w-4 h-4" />
                        </div>
                        <div>
                          <div className="text-sm font-medium">{item.label}</div>
                          <div className="text-xs text-[#86868b] leading-tight">{item.desc}</div>
                        </div>
                      </Link>
                    )
                  })}
                </div>
              )}
            </div>
          </nav>
        </div>

        <div className="hidden sm:flex items-center space-x-3">
          <Link
            href="/profile"
            className="flex items-center space-x-2.5 px-2.5 py-1.5 rounded-full hover:bg-[#f5f5f7] transition-colors border border-transparent hover:border-[#e5e5e7]"
          >
            <div className="w-8 h-8 rounded-full bg-[#0066cc] text-white flex items-center justify-center text-xs font-semibold shadow-sm">
              AR
            </div>
            <div className="text-left">
              <span className="block text-xs font-semibold text-[#1d1d1f] leading-none">Alex Rivera</span>
              <span className="block text-[11px] text-[#86868b] leading-none mt-1">Batch 2026</span>
            </div>
          </Link>
          <div className="h-5 w-[1px] bg-[#e5e5e7]" />
          <Link
            href="/login"
            title="Sign Out"
            className="p-2 rounded-full text-[#86868b] hover:text-rose-600 hover:bg-rose-50 transition-colors"
          >
            <LogOut className="w-4 h-4" />
          </Link>
        </div>

        <div className="flex md:hidden items-center space-x-2">
          <Link href="/profile" className="w-8 h-8 rounded-full bg-[#0066cc] text-white flex items-center justify-center text-xs font-semibold">
            AR
          </Link>
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-2 rounded-lg text-[#1d1d1f] hover:bg-[#f5f5f7]"
          >
            {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {isMobileMenuOpen && (
        <div className="md:hidden border-t border-[#e5e5e7] bg-white px-4 pt-3 pb-6 space-y-1 animate-in fade-in duration-150">
          <div className="text-xs font-semibold text-[#86868b] uppercase tracking-wider px-2 py-1">Main Menu</div>
          {primaryNavItems.concat(secondaryNavItems).map((item) => {
            const Icon = item.icon
            const active = isItemActive(item.href)
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                  active
                    ? "bg-[#1d1d1f] text-white"
                    : "text-[#1d1d1f] hover:bg-[#f5f5f7]"
                }`}
              >
                <Icon className={`w-4 h-4 ${active ? "text-white" : "text-[#86868b]"}`} />
                <span>{item.label}</span>
              </Link>
            )
          })}
          <div className="pt-3 border-t border-[#f0f0f2]">
            <Link
              href="/login"
              onClick={() => setIsMobileMenuOpen(false)}
              className="flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-xl text-rose-600 hover:bg-rose-50"
            >
              <LogOut className="w-4 h-4" />
              Sign Out
            </Link>
          </div>
        </div>
      )}
    </header>
  )
}
