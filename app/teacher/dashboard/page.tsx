import Link from "next/link"
import { TeacherSidebar } from "@/components/layout/teacher-sidebar"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { BookOpen, CheckSquare, Clock, Users, ArrowUpRight, HelpCircle } from "lucide-react"

export default function TeacherDashboardPage() {
  const stats = [
    { title: "Assigned Courses", count: "2", note: "Active Cohort 2026-Alpha", icon: BookOpen },
    { title: "Enrolled Students", count: "240", note: "Across 2 courses", icon: Users },
    { title: "Pending Grading", count: "14", note: "Requires rubric review", icon: Clock },
    { title: "Active Quizzes", count: "6", note: "Auto-graded on server", icon: HelpCircle },
  ]

  const pendingGrading = [
    {
      id: "sub-1",
      student: "Alex Rivera",
      assignment: "Assignment 3: Implement Zero-Trust RLS Policies",
      course: "Advanced Full-Stack Engineering",
      submittedAt: "Today at 11:20 AM",
      file: "rls_policies_submission.zip"
    },
    {
      id: "sub-2",
      student: "Jordan Lee",
      assignment: "Assignment 3: Implement Zero-Trust RLS Policies",
      course: "Advanced Full-Stack Engineering",
      submittedAt: "Today at 10:15 AM",
      file: "jordan_rls.sql"
    }
  ]

  return (
    <div className="flex min-h-screen bg-[#f5f5f7]">
      <TeacherSidebar />

      <main className="flex-1 p-8 space-y-8 overflow-y-auto">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-[#1d1d1f]">Faculty Portal</h1>
            <p className="text-sm text-[#7a7a7a] mt-0.5">
              Welcome, Dr. Evelyn Reed &bull; Manage curriculum and grade submissions.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Link href="/teacher/assignments">
              <Button variant="primary" size="md">Review Submissions</Button>
            </Link>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((s, idx) => {
            const Icon = s.icon
            return (
              <Card key={idx} hoverable={false} className="p-6">
                <div className="flex items-start justify-between">
                  <div className="space-y-1">
                    <p className="text-xs font-semibold text-[#7a7a7a]">{s.title}</p>
                    <p className="text-2xl font-bold text-[#1d1d1f] tracking-tight">{s.count}</p>
                    <p className="text-xs text-[#7a7a7a] pt-1">{s.note}</p>
                  </div>
                  <div className="w-10 h-10 rounded-xl bg-[#f5f5f7] flex items-center justify-center text-[#1d1d1f]">
                    <Icon className="w-5 h-5 text-[#1d1d1f]" />
                  </div>
                </div>
              </Card>
            )
          })}
        </div>

        {/* Priority Grading Queue */}
        <div className="bg-white rounded-2xl border border-black/[0.06] overflow-hidden shadow-sm">
          <div className="p-6 border-b border-[#f0f0f2] flex items-center justify-between">
            <div>
              <h2 className="text-base font-semibold text-[#1d1d1f]">Submissions Awaiting Grading</h2>
              <p className="text-xs text-[#7a7a7a]">Student code uploaded to secure Cloudflare R2 bucket</p>
            </div>
            <Link href="/teacher/assignments" className="text-xs font-semibold text-[#0066cc] hover:underline flex items-center gap-1">
              View all 14 <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <table className="w-full text-left text-sm">
            <thead className="bg-[#fafafc] border-b border-[#e5e5e7] text-[#7a7a7a] text-xs font-medium uppercase tracking-wider">
              <tr>
                <th className="py-3.5 px-6">Student</th>
                <th className="py-3.5 px-6">Assignment</th>
                <th className="py-3.5 px-6">Submitted File</th>
                <th className="py-3.5 px-6">Timestamp</th>
                <th className="py-3.5 px-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#f0f0f2]">
              {pendingGrading.map((item) => (
                <tr key={item.id} className="hover:bg-[#fafafc] transition-colors">
                  <td className="py-4 px-6 font-semibold text-[#1d1d1f]">{item.student}</td>
                  <td className="py-4 px-6">
                    <p className="text-[#1d1d1f] font-medium">{item.assignment}</p>
                    <p className="text-xs text-[#7a7a7a]">{item.course}</p>
                  </td>
                  <td className="py-4 px-6 font-mono text-xs text-[#0066cc]">{item.file}</td>
                  <td className="py-4 px-6 text-xs text-[#7a7a7a]">{item.submittedAt}</td>
                  <td className="py-4 px-6 text-right">
                    <Button variant="primary" size="sm">
                      Grade & Feedback
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  )
}
