"use client"

import { useState } from "react"
import { AdminSidebar } from "@/components/layout/admin-sidebar"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Modal } from "@/components/ui/modal"
import { Plus, CheckCircle2 } from "lucide-react"

export default function AdminQuizzesPage() {
  const [quizzes, setQuizzes] = useState<any[]>([])

  const [isModalOpen, setIsModalOpen] = useState(false)
  const [notification, setNotification] = useState<string | null>(null)

  const [newQuiz, setNewQuiz] = useState({
    title: "",
    course: "General Institutional Curriculum",
    batch: "General Cohort",
    timeLimit: 20
  })

  const handleCreateQuiz = (e: React.FormEvent) => {
    e.preventDefault()
    if (!newQuiz.title) return

    const created = {
      id: `qz-${Date.now()}`,
      title: newQuiz.title,
      course: newQuiz.course,
      batch: newQuiz.batch,
      totalAttempts: 0,
      avgScore: "N/A",
      status: "Published"
    }

    setQuizzes([created, ...quizzes])
    setIsModalOpen(false)
    setNewQuiz({ title: "", course: "General Institutional Curriculum", batch: "General Cohort", timeLimit: 20 })
    setNotification(`Successfully created quiz assessment "${created.title}"!`)
    setTimeout(() => setNotification(null), 4000)
  }

  return (
    <div className="flex min-h-screen bg-[#f5f5f7]">
      <AdminSidebar />

      <main className="flex-1 p-8 space-y-8 overflow-y-auto">
        {notification && (
          <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-800 text-sm flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            {notification}
          </div>
        )}

        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-[#1d1d1f]">Institutional Quizzes & Banks</h1>
            <p className="text-sm text-[#7a7a7a] mt-0.5">
              Review assessment parameters, attempt thresholds, and academic scoring distributions.
            </p>
          </div>
          <Button
            variant="primary"
            size="md"
            className="gap-2 cursor-pointer"
            onClick={() => setIsModalOpen(true)}
          >
            <Plus className="w-4 h-4" /> Create Assessment
          </Button>
        </div>

        <div className="bg-white rounded-2xl border border-black/[0.06] overflow-hidden shadow-sm">
          {quizzes.length === 0 ? (
            <div className="p-12 text-center">
              <div className="w-12 h-12 rounded-full bg-[#f5f5f7] flex items-center justify-center mx-auto mb-3 text-[#7a7a7a]">
                <Plus className="w-6 h-6" />
              </div>
              <h3 className="text-base font-semibold text-[#1d1d1f]">No Quiz Assessments Published</h3>
              <p className="text-sm text-[#7a7a7a] mt-1 max-w-sm mx-auto mb-5">
                Create quizzes with multiple-choice questions, automated scoring criteria, and timed durations.
              </p>
              <Button
                variant="primary"
                size="md"
                className="gap-2 cursor-pointer inline-flex"
                onClick={() => setIsModalOpen(true)}
              >
                <Plus className="w-4 h-4" /> Create Assessment
              </Button>
            </div>
          ) : (
            <table className="w-full text-left text-sm">
              <thead className="bg-[#fafafc] border-b border-[#e5e5e7] text-[#7a7a7a] text-xs font-medium uppercase tracking-wider">
                <tr>
                  <th className="py-3.5 px-6">Quiz Title</th>
                  <th className="py-3.5 px-6">Course & Batch</th>
                  <th className="py-3.5 px-6">Student Attempts</th>
                  <th className="py-3.5 px-6">Average Score</th>
                  <th className="py-3.5 px-6">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#f0f0f2]">
                {quizzes.map((q) => (
                  <tr key={q.id} className="hover:bg-[#fafafc] transition-colors">
                    <td className="py-4 px-6 font-semibold text-[#1d1d1f]">{q.title}</td>
                    <td className="py-4 px-6">
                      <p className="text-[#1d1d1f]">{q.course}</p>
                      <p className="text-xs text-[#7a7a7a]">{q.batch}</p>
                    </td>
                    <td className="py-4 px-6 font-mono text-[#1d1d1f]">{q.totalAttempts}</td>
                    <td className="py-4 px-6 font-mono font-semibold text-emerald-600">{q.avgScore}</td>
                    <td className="py-4 px-6">
                      <Badge variant="success">{q.status}</Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </main>

      {/* Modal: Create Assessment */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Create New Quiz Assessment"
      >
        <form onSubmit={handleCreateQuiz} className="space-y-4">
          <div className="space-y-1">
            <label className="text-xs font-semibold text-[#1d1d1f]">Assessment Title</label>
            <input
              type="text"
              required
              value={newQuiz.title}
              onChange={(e) => setNewQuiz({ ...newQuiz, title: e.target.value })}
              placeholder="e.g. Quiz 3: Asynchronous Node.js & Event Loop"
              className="w-full px-3.5 py-2 rounded-xl border border-[#e5e5e7] text-sm focus:outline-none focus:ring-2 focus:ring-[#0071e3]/30"
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-semibold text-[#1d1d1f]">Course Program</label>
            <select
              value={newQuiz.course}
              onChange={(e) => setNewQuiz({ ...newQuiz, course: e.target.value })}
              className="w-full px-3.5 py-2 rounded-xl border border-[#e5e5e7] text-sm focus:outline-none focus:ring-2 focus:ring-[#0071e3]/30"
            >
              <option value="Advanced Full-Stack Engineering with Next.js & PostgreSQL">Advanced Full-Stack Engineering</option>
              <option value="Cloud Infrastructure, Distributed Systems & Edge R2">Cloud Infrastructure & Edge</option>
              <option value="Secure Authentication, Cryptography & JWT Systems">Secure Authentication Systems</option>
            </select>
          </div>

          <div className="space-y-1">
            <label className="text-xs font-semibold text-[#1d1d1f]">Time Limit (Minutes)</label>
            <input
              type="number"
              value={newQuiz.timeLimit}
              onChange={(e) => setNewQuiz({ ...newQuiz, timeLimit: parseInt(e.target.value) || 20 })}
              className="w-full px-3.5 py-2 rounded-xl border border-[#e5e5e7] text-sm focus:outline-none focus:ring-2 focus:ring-[#0071e3]/30"
            />
          </div>

          <div className="pt-4 flex justify-end gap-2 border-t border-[#f0f0f2]">
            <Button type="button" variant="secondary" size="md" onClick={() => setIsModalOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" variant="primary" size="md">
              Publish Quiz
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  )
}
