import Link from "next/link"
import { TeacherSidebar } from "@/components/layout/teacher-sidebar"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Plus, Edit, Eye } from "lucide-react"

export default function TeacherQuizzesPage() {
  const quizzes: any[] = []

  return (
    <div className="flex min-h-screen bg-[#f5f5f7]">
      <TeacherSidebar />

      <main className="flex-1 p-8 space-y-8 overflow-y-auto">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-[#1d1d1f]">Quiz & Assessment Authoring</h1>
            <p className="text-sm text-[#7a7a7a] mt-0.5">
              Build question banks, configure passing thresholds, and manage server-evaluated answer keys.
            </p>
          </div>
          <Button variant="primary" size="md" className="gap-2" disabled={quizzes.length === 0}>
            <Plus className="w-4 h-4" /> Create New Quiz
          </Button>
        </div>

        {quizzes.length === 0 ? (
          <div className="bg-white rounded-2xl border border-black/[0.06] p-12 text-center shadow-sm">
            <div className="w-12 h-12 rounded-full bg-[#f5f5f7] flex items-center justify-center mx-auto mb-3 text-[#7a7a7a]">
              <Eye className="w-6 h-6" />
            </div>
            <h3 className="text-base font-semibold text-[#1d1d1f]">No Quiz Assessments Configured</h3>
            <p className="text-sm text-[#7a7a7a] mt-1 max-w-sm mx-auto">
              You haven&apos;t created any quizzes or automated tests yet. Author assessments once curriculum courses are assigned.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {quizzes.map((q) => (
              <Card key={q.id} className="p-6 flex flex-col justify-between">
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <Badge variant="success">Published</Badge>
                    <span className="text-xs font-semibold text-emerald-600">Avg: {q.averageScore}</span>
                  </div>
                  <h2 className="text-lg font-bold text-[#1d1d1f] tracking-tight">{q.title}</h2>
                  <p className="text-xs text-[#7a7a7a]">{q.course}</p>
                  <div className="flex items-center gap-4 text-xs text-[#7a7a7a] pt-2 border-t border-[#f0f0f2]">
                    <span>{q.questionsCount} Questions</span>
                    <span>&bull;</span>
                    <span>{q.submissionsCount} Graded Submissions</span>
                  </div>
                </div>

                <div className="pt-6 flex gap-3">
                  <Link href={`/quizzes/${q.id}`} className="flex-1">
                    <Button variant="secondary" size="sm" className="w-full gap-1">
                      <Eye className="w-3.5 h-3.5" /> Preview Quiz
                    </Button>
                  </Link>
                  <Button variant="primary" size="sm" className="flex-1 gap-1">
                    <Edit className="w-3.5 h-3.5" /> Edit Questions
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        )}
      </main>
    </div>
  )
}
