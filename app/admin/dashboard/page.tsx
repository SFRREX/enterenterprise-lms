import Link from "next/link"
import { AdminSidebar } from "@/components/layout/admin-sidebar"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Users, BookOpen, FolderGit2, AlertTriangle, ArrowUpRight, TrendingUp } from "lucide-react"

export default function AdminDashboardPage() {
  const stats = [
    { title: "Total Active Students", count: "1,248", delta: "+12% this month", icon: Users, variant: "default" as const },
    { title: "Batches Running", count: "8", delta: "2 cohorts graduating", icon: FolderGit2, variant: "neutral" as const },
    { title: "Active Courses", count: "24", delta: "4 ready for publish", icon: BookOpen, variant: "neutral" as const },
    { title: "Submissions Pending Review", count: "37", delta: "Requires instructor attention", icon: AlertTriangle, variant: "warning" as const },
  ]

  const recentBatches = [
    { id: "b-1", name: "Cohort 2026-Alpha (Full-Stack)", code: "BATCH-26A", students: 142, courses: 4, status: "Active" },
    { id: "b-2", name: "Cohort 2026-Beta (Cloud Systems)", code: "BATCH-26B", students: 98, courses: 3, status: "Active" },
    { id: "b-3", name: "AI Systems Engineering 2026", code: "BATCH-AI1", students: 85, courses: 5, status: "Active" },
  ]

  const recentAudits = [
    { id: "aud-1", actor: "Marcus Vance (Instructor)", action: "Published Lesson 14: RLS Defense", time: "12 mins ago" },
    { id: "aud-2", actor: "System Auth", action: "Issued Certificate #CERT-8902 to Alex Rivera", time: "45 mins ago" },
    { id: "aud-3", actor: "Dr. Evelyn Reed", action: "Graded 18 submissions for Assignment 2", time: "2 hours ago" },
  ]

  return (
    <div className="flex min-h-screen bg-[#f5f5f7]">
      <AdminSidebar />

      <main className="flex-1 p-8 space-y-8 overflow-y-auto">
        {/* Top Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-[#1d1d1f]">Institutional Oversight</h1>
            <p className="text-sm text-[#7a7a7a] mt-0.5">High-level administrative health and active cohort management.</p>
          </div>
          <div className="flex items-center gap-3">
            <Link href="/admin/batches">
              <Button variant="secondary" size="md">Manage Batches</Button>
            </Link>
            <Link href="/admin/courses">
              <Button variant="primary" size="md">+ Create Course</Button>
            </Link>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((s, idx) => {
            const Icon = s.icon
            return (
              <Card key={idx} hoverable={false}>
                <div className="flex items-start justify-between">
                  <div className="space-y-1">
                    <p className="text-xs font-semibold text-[#7a7a7a]">{s.title}</p>
                    <p className="text-2xl font-bold text-[#1d1d1f] tracking-tight">{s.count}</p>
                    <p className="text-xs text-[#7a7a7a] flex items-center gap-1 pt-1">
                      <TrendingUp className="w-3 h-3 text-emerald-600" />
                      {s.delta}
                    </p>
                  </div>
                  <div className="w-10 h-10 rounded-xl bg-[#f5f5f7] flex items-center justify-center text-[#1d1d1f]">
                    <Icon className="w-5 h-5 text-[#1d1d1f]" />
                  </div>
                </div>
              </Card>
            )
          })}
        </div>

        {/* Operational Queues */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Batches Overview (2 Cols) */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-[#1d1d1f]">Current Cohort Rosters</h2>
              <Link href="/admin/batches" className="text-xs font-semibold text-[#0066cc] hover:underline flex items-center gap-1">
                View all rosters <ArrowUpRight className="w-3 h-3" />
              </Link>
            </div>

            <div className="bg-white rounded-2xl border border-black/[0.06] overflow-hidden shadow-sm">
              <table className="w-full text-left text-sm">
                <thead className="bg-[#fafafc] border-b border-[#e5e5e7] text-[#7a7a7a] text-xs font-medium uppercase tracking-wider">
                  <tr>
                    <th className="py-3 px-4">Batch Name</th>
                    <th className="py-3 px-4">Code</th>
                    <th className="py-3 px-4">Enrollment</th>
                    <th className="py-3 px-4">Courses</th>
                    <th className="py-3 px-4">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#f0f0f2]">
                  {recentBatches.map((b) => (
                    <tr key={b.id} className="hover:bg-[#fafafc] transition-colors">
                      <td className="py-3.5 px-4 font-medium text-[#1d1d1f]">{b.name}</td>
                      <td className="py-3.5 px-4 text-[#7a7a7a] font-mono text-xs">{b.code}</td>
                      <td className="py-3.5 px-4 text-[#1d1d1f]">{b.students} students</td>
                      <td className="py-3.5 px-4 text-[#7a7a7a]">{b.courses}</td>
                      <td className="py-3.5 px-4">
                        <Badge variant="success">{b.status}</Badge>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Real-time Audit Trail (1 Col) */}
          <div className="space-y-4">
            <h2 className="text-lg font-semibold text-[#1d1d1f]">Audit Log Stream</h2>
            <div className="bg-white rounded-2xl border border-black/[0.06] p-5 shadow-sm space-y-4">
              {recentAudits.map((a) => (
                <div key={a.id} className="border-b border-[#f0f0f2] pb-3 last:border-b-0 last:pb-0 space-y-1">
                  <div className="flex items-center justify-between text-xs text-[#7a7a7a]">
                    <span className="font-medium text-[#1d1d1f]">{a.actor}</span>
                    <span>{a.time}</span>
                  </div>
                  <p className="text-xs text-[#333333] leading-relaxed">{a.action}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
