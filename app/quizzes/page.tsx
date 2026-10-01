import Link from "next/link"
import { Clock, ArrowRight } from "lucide-react"
import { StudentNavbar } from "@/components/layout/student-navbar"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

export default function StudentQuizzesPage() {
  const quizzes: any[] = []

  return (
    <div className="min-h-screen bg-[#f5f5f7]">
      <StudentNavbar />

      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight text-[#1d1d1f]">Quizzes & Assessments</h1>
          <p className="text-[#7a7a7a] mt-1 text-sm">
            Timed evaluations designed to test comprehension and grant certification credits.
          </p>
        </div>

        {quizzes.length === 0 ? (
          <div className="bg-white rounded-2xl border border-black/[0.06] p-12 text-center shadow-sm">
            <h3 className="text-base font-semibold text-[#1d1d1f]">No Quizzes Scheduled</h3>
            <p className="text-sm text-[#7a7a7a] mt-1 max-w-sm mx-auto">
              There are no active quiz assessments or tests scheduled for your enrolled courses right now.
            </p>
          </div>
        ) : (
          <div className="space-y-6">
            {quizzes.map((quiz) => (
              <Card key={quiz.id} hoverable={false} className="p-6">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Badge variant={quiz.status === "Passed" ? "success" : "default"}>
                        {quiz.status === "Passed" ? `Passed (${quiz.score})` : quiz.status}
                      </Badge>
                      <span className="text-xs text-[#7a7a7a]">{quiz.course}</span>
                    </div>

                    <h2 className="text-lg font-bold text-[#1d1d1f] tracking-tight">{quiz.title}</h2>

                    <div className="flex flex-wrap items-center gap-4 text-xs text-[#7a7a7a] pt-1">
                      <span className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5 text-[#0066cc]" /> Time Limit: {quiz.timeLimit}
                      </span>
                      <span>Questions: {quiz.questionsCount}</span>
                      <span>Pass Threshold: {quiz.passingScore}</span>
                      <span>Attempts Left: {quiz.attemptsRemaining}</span>
                    </div>
                  </div>

                  <div className="shrink-0">
                    {quiz.status !== "Passed" ? (
                      <Link href={`/quizzes/${quiz.id}`}>
                        <Button variant="primary" size="md" className="gap-2">
                          Start Quiz Attempt <ArrowRight className="w-4 h-4" />
                        </Button>
                      </Link>
                    ) : (
                      <Button variant="secondary" size="md" disabled>
                        Attempt Completed
                      </Button>
                    )}
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}
      </main>
    </div>
  )
}
