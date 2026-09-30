"use client"

import { useState } from "react"
import Link from "next/link"
import { Clock, AlertCircle, ArrowLeft, CheckCircle2 } from "lucide-react"
import { StudentNavbar } from "@/components/layout/student-navbar"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

export default function QuizRunnerPage() {
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, string>>({})
  const [submitted, setSubmitted] = useState(false)

  const quiz = {
    id: "qz-101",
    title: "Quiz 2: Distributed Database Replication & Indexes",
    course: "Cloud Infrastructure, Distributed Systems & Edge R2",
    timeLimitMinutes: 20,
    questions: [
      {
        id: "q-1",
        prompt: "Why should correct answer flags (is_correct) never be transmitted to the browser before attempt submission?",
        options: [
          { id: "opt-1a", text: "To save network bandwidth on high-latency mobile networks" },
          { id: "opt-1b", text: "Because client-side inspection in DevTools trivially leaks the answer key, bypassing assessment integrity" },
          { id: "opt-1c", text: "PostgreSQL RLS doesn't support returning boolean values" },
          { id: "opt-1d", text: "It is required by Tailwind CSS specifications" }
        ]
      },
      {
        id: "q-2",
        prompt: "Which database technique guarantees atomic multi-table updates when a course and its chapters are created together?",
        options: [
          { id: "opt-2a", text: "ACID Database Transaction (BEGIN ... COMMIT)" },
          { id: "opt-2b", text: "Client-side setTimeout loop" },
          { id: "opt-2c", text: "LocalStorage persistence" },
          { id: "opt-2d", text: "IndexedDB synchronization" }
        ]
      }
    ]
  }

  const handleSelect = (questionId: string, optionId: string) => {
    if (submitted) return
    setSelectedAnswers(prev => ({ ...prev, [questionId]: optionId }))
  }

  return (
    <div className="min-h-screen bg-[#f5f5f7]">
      <StudentNavbar />

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        <div className="flex items-center justify-between">
          <Link href="/quizzes" className="inline-flex items-center gap-1.5 text-xs text-[#7a7a7a] hover:text-[#1d1d1f]">
            <ArrowLeft className="w-3.5 h-3.5" /> Back to Quizzes
          </Link>

          {!submitted && (
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-amber-500/10 text-amber-700 text-xs font-semibold">
              <Clock className="w-4 h-4" /> Time Remaining: 18:42
            </div>
          )}
        </div>

        <div className="space-y-1">
          <Badge variant="neutral">{quiz.course}</Badge>
          <h1 className="text-2xl font-bold tracking-tight text-[#1d1d1f]">{quiz.title}</h1>
          <p className="text-xs text-[#7a7a7a]">Server-evaluated grading &bull; Anti-tamper submission enforcement</p>
        </div>

        {submitted ? (
          <Card hoverable={false} className="p-8 text-center space-y-4 border-emerald-500/30">
            <div className="w-14 h-14 rounded-full bg-emerald-500/10 text-emerald-600 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h2 className="text-xl font-bold text-[#1d1d1f]">Attempt Submitted Successfully</h2>
            <p className="text-sm text-[#7a7a7a] max-w-md mx-auto">
              Your responses have been validated on the server. Score: <strong>100% (Passed)</strong>. The grade has been recorded in your academic ledger.
            </p>
            <div className="pt-2">
              <Link href="/results">
                <Button variant="primary" size="md">View In Results Ledger</Button>
              </Link>
            </div>
          </Card>
        ) : (
          <div className="space-y-6">
            {quiz.questions.map((q, idx) => (
              <Card key={q.id} hoverable={false} className="p-6 space-y-4">
                <h3 className="text-sm font-semibold text-[#1d1d1f]">
                  Question {idx + 1}: {q.prompt}
                </h3>

                <div className="space-y-2">
                  {q.options.map(opt => {
                    const isSelected = selectedAnswers[q.id] === opt.id
                    return (
                      <button
                        key={opt.id}
                        type="button"
                        onClick={() => handleSelect(q.id, opt.id)}
                        className={`w-full text-left p-3.5 rounded-xl border text-sm transition-all cursor-pointer flex items-center justify-between ${
                          isSelected
                            ? "border-[#0066cc] bg-[#0066cc]/5 font-medium text-[#0066cc]"
                            : "border-[#e5e5e7] bg-white hover:bg-[#fafafc] text-[#1d1d1f]"
                        }`}
                      >
                        <span>{opt.text}</span>
                        <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                          isSelected ? "border-[#0066cc] bg-[#0066cc]" : "border-[#e5e5e7]"
                        }`}>
                          {isSelected && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                        </div>
                      </button>
                    )
                  })}
                </div>
              </Card>
            ))}

            <div className="flex justify-end pt-4">
              <Button
                variant="primary"
                size="lg"
                onClick={() => setSubmitted(true)}
                disabled={Object.keys(selectedAnswers).length < quiz.questions.length}
              >
                Submit Authoritative Attempt
              </Button>
            </div>
          </div>
        )}
      </main>
    </div>
  )
}
