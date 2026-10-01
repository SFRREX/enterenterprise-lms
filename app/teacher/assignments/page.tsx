"use client"

import { useState } from "react"
import { TeacherSidebar } from "@/components/layout/teacher-sidebar"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Modal } from "@/components/ui/modal"
import { Download, CheckCircle2 } from "lucide-react"

interface Submission {
  id: string
  student: string
  assignment: string
  course: string
  submittedAt: string
  file: string
  fileSize: string
  status: string
  grade: string | null
  feedback: string
}

export default function TeacherAssignmentsPage() {
  const [submissions, setSubmissions] = useState<Submission[]>([])

  const [activeSubmission, setActiveSubmission] = useState<Submission | null>(null)
  const [scoreInput, setScoreInput] = useState<string>("95")
  const [feedbackInput, setFeedbackInput] = useState<string>("Good implementation of row-level security constraints.")
  const [notification, setNotification] = useState<string | null>(null)

  const handleSaveGrade = (e: React.FormEvent) => {
    e.preventDefault()
    if (!activeSubmission) return

    setSubmissions(submissions.map(s => {
      if (s.id === activeSubmission.id) {
        return {
          ...s,
          status: "Graded",
          grade: `${scoreInput}/100`,
          feedback: feedbackInput
        }
      }
      return s
    }))

    setNotification(`Successfully recorded grade (${scoreInput}/100) for ${activeSubmission.student}!`)
    setActiveSubmission(null)
    setTimeout(() => setNotification(null), 4000)
  }

  return (
    <div className="flex min-h-screen bg-[#f5f5f7]">
      <TeacherSidebar />

      <main className="flex-1 p-8 space-y-8 overflow-y-auto">
        {notification && (
          <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-800 text-sm flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            {notification}
          </div>
        )}

        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-[#1d1d1f]">Assignment Submissions & Grading</h1>
            <p className="text-sm text-[#7a7a7a] mt-0.5">
              Review student code, download uploaded archives from secure storage, and submit rubric scores.
            </p>
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-black/[0.06] overflow-hidden shadow-sm">
          {submissions.length === 0 ? (
            <div className="p-12 text-center">
              <div className="w-12 h-12 rounded-full bg-[#f5f5f7] flex items-center justify-center mx-auto mb-3 text-[#7a7a7a]">
                <Download className="w-6 h-6" />
              </div>
              <h3 className="text-base font-semibold text-[#1d1d1f]">No Submissions Received</h3>
              <p className="text-sm text-[#7a7a7a] mt-1 max-w-sm mx-auto">
                Student submissions will appear here once learners complete problem sets and upload coursework artifacts.
              </p>
            </div>
          ) : (
            <table className="w-full text-left text-sm">
              <thead className="bg-[#fafafc] border-b border-[#e5e5e7] text-[#7a7a7a] text-xs font-medium uppercase tracking-wider">
                <tr>
                  <th className="py-3.5 px-6">Student</th>
                  <th className="py-3.5 px-6">Assignment / Course</th>
                  <th className="py-3.5 px-6">Submitted Object</th>
                  <th className="py-3.5 px-6">Status</th>
                  <th className="py-3.5 px-6 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#f0f0f2]">
                {submissions.map((sub) => (
                  <tr key={sub.id} className="hover:bg-[#fafafc] transition-colors">
                    <td className="py-4 px-6 font-semibold text-[#1d1d1f]">{sub.student}</td>
                    <td className="py-4 px-6">
                      <p className="text-[#1d1d1f] font-medium">{sub.assignment}</p>
                      <p className="text-xs text-[#7a7a7a]">{sub.course}</p>
                    </td>
                    <td className="py-4 px-6">
                      <button
                        onClick={() => {
                          setNotification(`Triggered signed download link for "${sub.file}" (TTL 15 mins).`)
                          setTimeout(() => setNotification(null), 4000)
                        }}
                        className="font-mono text-xs text-[#0066cc] flex items-center gap-1 hover:underline cursor-pointer"
                      >
                        <Download className="w-3.5 h-3.5" /> {sub.file}
                      </button>
                      <span className="text-xs text-[#7a7a7a]">{sub.fileSize}</span>
                    </td>
                    <td className="py-4 px-6">
                      <Badge variant={sub.status === "Graded" ? "success" : "warning"}>
                        {sub.status === "Graded" ? `Graded (${sub.grade})` : "Pending Grade"}
                      </Badge>
                    </td>
                    <td className="py-4 px-6 text-right">
                      <Button
                        variant={sub.status === "Submitted" ? "primary" : "secondary"}
                        size="sm"
                        onClick={() => {
                          setActiveSubmission(sub)
                          setScoreInput(sub.grade ? sub.grade.split("/")[0] : "95")
                          setFeedbackInput(sub.feedback || "Well implemented structure and clean tests.")
                        }}
                      >
                        {sub.status === "Submitted" ? "Grade & Feedback" : "Edit Grade"}
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </main>

      {/* Modal: Grade & Feedback */}
      <Modal
        isOpen={!!activeSubmission}
        onClose={() => setActiveSubmission(null)}
        title={`Grade Submission: ${activeSubmission?.student}`}
      >
        <form onSubmit={handleSaveGrade} className="space-y-4">
          <div>
            <p className="text-xs text-[#7a7a7a]">Course Assignment:</p>
            <p className="text-sm font-semibold text-[#1d1d1f]">{activeSubmission?.assignment}</p>
          </div>

          <div className="space-y-1">
            <label className="text-xs font-semibold text-[#1d1d1f]">Score (out of 100)</label>
            <input
              type="number"
              min="0"
              max="100"
              required
              value={scoreInput}
              onChange={(e) => setScoreInput(e.target.value)}
              className="w-full px-3.5 py-2 rounded-xl border border-[#e5e5e7] text-sm focus:outline-none focus:ring-2 focus:ring-[#0071e3]/30 font-mono"
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-semibold text-[#1d1d1f]">Rubric Notes & Feedback</label>
            <textarea
              rows={3}
              value={feedbackInput}
              onChange={(e) => setFeedbackInput(e.target.value)}
              className="w-full px-3.5 py-2 rounded-xl border border-[#e5e5e7] text-sm focus:outline-none focus:ring-2 focus:ring-[#0071e3]/30"
            />
          </div>

          <div className="pt-4 flex justify-end gap-2 border-t border-[#f0f0f2]">
            <Button type="button" variant="secondary" size="md" onClick={() => setActiveSubmission(null)}>
              Cancel
            </Button>
            <Button type="submit" variant="primary" size="md">
              Submit Authoritative Grade
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  )
}
