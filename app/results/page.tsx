import Link from "next/link"
import { Award, FileText, CheckCircle2, ChevronRight, Download } from "lucide-react"
import { StudentNavbar } from "@/components/layout/student-navbar"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

export default function StudentResultsPage() {
  const gpa = "3.92"
  const completedCredits = 48

  const records = [
    {
      course: "Advanced Full-Stack Engineering with Next.js & PostgreSQL",
      code: "CS-401",
      quizzesAverage: "94%",
      assignmentsAverage: "98%",
      overallGrade: "96.4%",
      letter: "A+",
      status: "Completed & Certified"
    },
    {
      course: "Cloud Infrastructure, Distributed Systems & Edge R2",
      code: "CS-408",
      quizzesAverage: "90%",
      assignmentsAverage: "95%",
      overallGrade: "92.5%",
      letter: "A",
      status: "In Progress"
    }
  ]

  return (
    <div className="min-h-screen bg-[#f5f5f7]">
      <StudentNavbar />

      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight text-[#1d1d1f]">Academic Results & Transcripts</h1>
          <p className="text-[#7a7a7a] mt-1 text-sm">
            Cumulative evaluation ledger, assessment breakdowns, and course credits.
          </p>
        </div>

        {/* High-level stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <Card hoverable={false} className="p-6">
            <p className="text-xs font-semibold uppercase tracking-wider text-[#7a7a7a]">Cumulative GPA</p>
            <p className="text-3xl font-bold text-[#1d1d1f] tracking-tight mt-1">{gpa}</p>
            <p className="text-xs text-emerald-600 mt-1">Honors Standing</p>
          </Card>

          <Card hoverable={false} className="p-6">
            <p className="text-xs font-semibold uppercase tracking-wider text-[#7a7a7a]">Completed Credits</p>
            <p className="text-3xl font-bold text-[#1d1d1f] tracking-tight mt-1">{completedCredits} hrs</p>
            <p className="text-xs text-[#7a7a7a] mt-1">Cohort Requirement: 60 hrs</p>
          </Card>

          <Card hoverable={false} className="p-6">
            <p className="text-xs font-semibold uppercase tracking-wider text-[#7a7a7a]">Accredited Credentials</p>
            <p className="text-3xl font-bold text-[#1d1d1f] tracking-tight mt-1">1 Verified</p>
            <Link href="/certificates" className="text-xs text-[#0066cc] hover:underline mt-1 block">
              View Certificates &rarr;
            </Link>
          </Card>
        </div>

        {/* Detailed Course Breakdown Table */}
        <div className="bg-white rounded-2xl border border-black/[0.06] overflow-hidden shadow-sm">
          <div className="p-6 border-b border-[#f0f0f2]">
            <h2 className="text-lg font-semibold text-[#1d1d1f]">Course Performance Breakdown</h2>
          </div>
          <table className="w-full text-left text-sm">
            <thead className="bg-[#fafafc] border-b border-[#e5e5e7] text-[#7a7a7a] text-xs font-medium uppercase tracking-wider">
              <tr>
                <th className="py-3.5 px-6">Course Name</th>
                <th className="py-3.5 px-6">Quizzes</th>
                <th className="py-3.5 px-6">Assignments</th>
                <th className="py-3.5 px-6">Overall Grade</th>
                <th className="py-3.5 px-6">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#f0f0f2]">
              {records.map((r, idx) => (
                <tr key={idx} className="hover:bg-[#fafafc] transition-colors">
                  <td className="py-4 px-6">
                    <p className="font-semibold text-[#1d1d1f]">{r.course}</p>
                    <span className="text-xs text-[#7a7a7a] font-mono">{r.code}</span>
                  </td>
                  <td className="py-4 px-6 text-[#1d1d1f]">{r.quizzesAverage}</td>
                  <td className="py-4 px-6 text-[#1d1d1f]">{r.assignmentsAverage}</td>
                  <td className="py-4 px-6">
                    <span className="font-bold text-[#0066cc]">{r.overallGrade}</span>{" "}
                    <span className="text-xs text-[#7a7a7a]">({r.letter})</span>
                  </td>
                  <td className="py-4 px-6">
                    <Badge variant={r.status.startsWith("Completed") ? "success" : "default"}>
                      {r.status}
                    </Badge>
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
