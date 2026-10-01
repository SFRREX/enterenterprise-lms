"use client"

import { useState } from "react"
import { AdminSidebar } from "@/components/layout/admin-sidebar"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Modal } from "@/components/ui/modal"
import { Plus, CheckCircle2 } from "lucide-react"

export default function AdminAssignmentsPage() {
  const [assignments, setAssignments] = useState([
    {
      id: "asg-1",
      title: "Assignment 3: Implement Zero-Trust RLS Policies",
      course: "Advanced Full-Stack Engineering with Next.js & PostgreSQL",
      batch: "Cohort 2026-Alpha",
      submissionsCount: 136,
      pendingCount: 14,
      dueDate: "Tomorrow at 23:59"
    },
    {
      id: "asg-2",
      title: "Assignment 2: Cloudflare R2 Presigned Upload Worker",
      course: "Cloud Infrastructure, Distributed Systems & Edge R2",
      batch: "Cohort 2026-Beta",
      submissionsCount: 94,
      pendingCount: 0,
      dueDate: "Sep 28, 2026"
    }
  ])

  const [isModalOpen, setIsModalOpen] = useState(false)
  const [notification, setNotification] = useState<string | null>(null)

  const [newAsg, setNewAsg] = useState({
    title: "",
    course: "Advanced Full-Stack Engineering with Next.js & PostgreSQL",
    batch: "Cohort 2026-Alpha",
    dueDate: "In 7 days"
  })

  const handleCreateCoursework = (e: React.FormEvent) => {
    e.preventDefault()
    if (!newAsg.title) return

    const created = {
      id: `asg-${Date.now()}`,
      title: newAsg.title,
      course: newAsg.course,
      batch: newAsg.batch,
      submissionsCount: 0,
      pendingCount: 0,
      dueDate: newAsg.dueDate
    }

    setAssignments([created, ...assignments])
    setIsModalOpen(false)
    setNewAsg({ title: "", course: "Advanced Full-Stack Engineering with Next.js & PostgreSQL", batch: "Cohort 2026-Alpha", dueDate: "In 7 days" })
    setNotification(`Successfully published coursework "${created.title}"!`)
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
            <h1 className="text-2xl font-bold tracking-tight text-[#1d1d1f]">Institutional Assignments</h1>
            <p className="text-sm text-[#7a7a7a] mt-0.5">
              Oversee coursework, submission quotas, and teacher grading compliance across batches.
            </p>
          </div>
          <Button
            variant="primary"
            size="md"
            className="gap-2 cursor-pointer"
            onClick={() => setIsModalOpen(true)}
          >
            <Plus className="w-4 h-4" /> Create Coursework
          </Button>
        </div>

        <div className="bg-white rounded-2xl border border-black/[0.06] overflow-hidden shadow-sm">
          <table className="w-full text-left text-sm">
            <thead className="bg-[#fafafc] border-b border-[#e5e5e7] text-[#7a7a7a] text-xs font-medium uppercase tracking-wider">
              <tr>
                <th className="py-3.5 px-6">Assignment Title</th>
                <th className="py-3.5 px-6">Course / Batch</th>
                <th className="py-3.5 px-6">Submissions</th>
                <th className="py-3.5 px-6">Pending Review</th>
                <th className="py-3.5 px-6">Deadline</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#f0f0f2]">
              {assignments.map((a) => (
                <tr key={a.id} className="hover:bg-[#fafafc] transition-colors">
                  <td className="py-4 px-6 font-semibold text-[#1d1d1f]">{a.title}</td>
                  <td className="py-4 px-6">
                    <p className="text-[#1d1d1f]">{a.course}</p>
                    <p className="text-xs text-[#7a7a7a]">{a.batch}</p>
                  </td>
                  <td className="py-4 px-6 text-[#1d1d1f] font-mono">{a.submissionsCount}</td>
                  <td className="py-4 px-6">
                    <Badge variant={a.pendingCount > 0 ? "warning" : "success"}>
                      {a.pendingCount} Pending
                    </Badge>
                  </td>
                  <td className="py-4 px-6 text-xs text-[#7a7a7a]">{a.dueDate}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>

      {/* Modal: Create Coursework */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Create New Coursework / Assignment"
      >
        <form onSubmit={handleCreateCoursework} className="space-y-4">
          <div className="space-y-1">
            <label className="text-xs font-semibold text-[#1d1d1f]">Assignment Title</label>
            <input
              type="text"
              required
              value={newAsg.title}
              onChange={(e) => setNewAsg({ ...newAsg, title: e.target.value })}
              placeholder="e.g. Assignment 4: Distributed Caching with Redis"
              className="w-full px-3.5 py-2 rounded-xl border border-[#e5e5e7] text-sm focus:outline-none focus:ring-2 focus:ring-[#0071e3]/30"
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-semibold text-[#1d1d1f]">Target Program & Course</label>
            <select
              value={newAsg.course}
              onChange={(e) => setNewAsg({ ...newAsg, course: e.target.value })}
              className="w-full px-3.5 py-2 rounded-xl border border-[#e5e5e7] text-sm focus:outline-none focus:ring-2 focus:ring-[#0071e3]/30"
            >
              <option value="Advanced Full-Stack Engineering with Next.js & PostgreSQL">Advanced Full-Stack Engineering</option>
              <option value="Cloud Infrastructure, Distributed Systems & Edge R2">Cloud Infrastructure & Edge</option>
              <option value="Secure Authentication, Cryptography & JWT Systems">Secure Authentication Systems</option>
            </select>
          </div>

          <div className="space-y-1">
            <label className="text-xs font-semibold text-[#1d1d1f]">Submission Deadline</label>
            <input
              type="text"
              value={newAsg.dueDate}
              onChange={(e) => setNewAsg({ ...newAsg, dueDate: e.target.value })}
              placeholder="e.g. In 7 days at 23:59 UTC"
              className="w-full px-3.5 py-2 rounded-xl border border-[#e5e5e7] text-sm focus:outline-none focus:ring-2 focus:ring-[#0071e3]/30"
            />
          </div>

          <div className="pt-4 flex justify-end gap-2 border-t border-[#f0f0f2]">
            <Button type="button" variant="secondary" size="md" onClick={() => setIsModalOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" variant="primary" size="md">
              Publish Assignment
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  )
}
