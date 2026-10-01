"use client"

import { useState } from "react"
import { AdminSidebar } from "@/components/layout/admin-sidebar"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Modal } from "@/components/ui/modal"
import { Plus, Video, CheckCircle2, FileText } from "lucide-react"

interface Lecture {
  id: string
  title: string
  course: string
  chapter: string
  duration: string
  type: "video" | "notes"
  videoStreamUid?: string
  isPublished: boolean
}

export default function AdminLecturesPage() {
  const [lectures, setLectures] = useState<Lecture[]>([])
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [notification, setNotification] = useState<string | null>(null)

  const [newLecture, setNewLecture] = useState({
    title: "",
    course: "General Institutional Curriculum",
    chapter: "Chapter 1: Foundations",
    duration: "20 mins",
    type: "video" as "video" | "notes",
    videoStreamUid: "",
    isPublished: true
  })

  const handleCreateLecture = (e: React.FormEvent) => {
    e.preventDefault()
    if (!newLecture.title) return

    const created: Lecture = {
      id: `les-${Date.now()}`,
      title: newLecture.title,
      course: newLecture.course,
      chapter: newLecture.chapter,
      duration: newLecture.duration,
      type: newLecture.type,
      videoStreamUid: newLecture.videoStreamUid || "cf-stream-auto-generated",
      isPublished: newLecture.isPublished
    }

    setLectures([created, ...lectures])
    setIsModalOpen(false)
    setNewLecture({
      title: "",
      course: "General Institutional Curriculum",
      chapter: "Chapter 1: Foundations",
      duration: "20 mins",
      type: "video",
      videoStreamUid: "",
      isPublished: true
    })
    setNotification(`Successfully created lecture "${created.title}"!`)
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
            <h1 className="text-2xl font-bold tracking-tight text-[#1d1d1f]">Lectures & Curriculum Lessons</h1>
            <p className="text-sm text-[#7a7a7a] mt-0.5">
              Create and manage video lectures, curriculum chapters, Cloudflare Stream IDs, and lecture resources.
            </p>
          </div>
          <Button
            variant="primary"
            size="md"
            className="gap-2 cursor-pointer"
            onClick={() => setIsModalOpen(true)}
          >
            <Plus className="w-4 h-4" /> Create Lecture / Lesson
          </Button>
        </div>

        <div className="bg-white rounded-2xl border border-black/[0.06] overflow-hidden shadow-sm">
          {lectures.length === 0 ? (
            <div className="p-12 text-center space-y-4">
              <div className="w-14 h-14 rounded-full bg-[#f5f5f7] flex items-center justify-center mx-auto text-[#7a7a7a]">
                <Video className="w-7 h-7" />
              </div>
              <div className="space-y-1">
                <h2 className="text-base font-semibold text-[#1d1d1f]">No Lectures Created Yet</h2>
                <p className="text-xs text-[#7a7a7a] max-w-sm mx-auto">
                  Author video lessons, lecture handouts, and attach Cloudflare Stream media directly to course curricula.
                </p>
              </div>
              <div className="pt-2">
                <Button variant="primary" size="md" onClick={() => setIsModalOpen(true)}>
                  <Plus className="w-4 h-4 mr-1.5" /> Create First Lecture
                </Button>
              </div>
            </div>
          ) : (
            <table className="w-full text-left text-sm">
              <thead className="bg-[#fafafc] border-b border-[#e5e5e7] text-[#7a7a7a] text-xs font-medium uppercase tracking-wider">
                <tr>
                  <th className="py-3.5 px-6">Lecture Title</th>
                  <th className="py-3.5 px-6">Course & Chapter</th>
                  <th className="py-3.5 px-6">Type & Duration</th>
                  <th className="py-3.5 px-6">Media Stream UID</th>
                  <th className="py-3.5 px-6">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#f0f0f2]">
                {lectures.map((l) => (
                  <tr key={l.id} className="hover:bg-[#fafafc] transition-colors">
                    <td className="py-4 px-6 font-semibold text-[#1d1d1f]">{l.title}</td>
                    <td className="py-4 px-6">
                      <p className="text-[#1d1d1f]">{l.course}</p>
                      <p className="text-xs text-[#7a7a7a]">{l.chapter}</p>
                    </td>
                    <td className="py-4 px-6 text-xs text-[#7a7a7a]">
                      <span className="capitalize font-medium text-[#1d1d1f] flex items-center gap-1">
                        {l.type === "video" ? <Video className="w-3.5 h-3.5 text-[#0066cc]" /> : <FileText className="w-3.5 h-3.5 text-[#7a7a7a]" />}
                        {l.type}
                      </span>
                      {l.duration}
                    </td>
                    <td className="py-4 px-6 font-mono text-xs text-[#0066cc]">{l.videoStreamUid}</td>
                    <td className="py-4 px-6">
                      <Badge variant={l.isPublished ? "success" : "neutral"}>
                        {l.isPublished ? "Published" : "Draft"}
                      </Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </main>

      {/* Modal: Create Lecture / Lesson */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Create Lecture / Curriculum Lesson"
      >
        <form onSubmit={handleCreateLecture} className="space-y-4">
          <div className="space-y-1">
            <label className="text-xs font-semibold text-[#1d1d1f]">Lecture / Lesson Title</label>
            <input
              type="text"
              required
              value={newLecture.title}
              onChange={(e) => setNewLecture({ ...newLecture, title: e.target.value })}
              placeholder="e.g. Row-Level Security in Practice"
              className="w-full px-3.5 py-2 rounded-xl border border-[#e5e5e7] text-sm focus:outline-none focus:ring-2 focus:ring-[#0071e3]/30"
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-semibold text-[#1d1d1f]">Course</label>
            <input
              type="text"
              required
              value={newLecture.course}
              onChange={(e) => setNewLecture({ ...newLecture, course: e.target.value })}
              placeholder="e.g. Advanced Full-Stack Engineering"
              className="w-full px-3.5 py-2 rounded-xl border border-[#e5e5e7] text-sm focus:outline-none focus:ring-2 focus:ring-[#0071e3]/30"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1">
              <label className="text-xs font-semibold text-[#1d1d1f]">Chapter / Module</label>
              <input
                type="text"
                required
                value={newLecture.chapter}
                onChange={(e) => setNewLecture({ ...newLecture, chapter: e.target.value })}
                placeholder="e.g. Chapter 3: Security"
                className="w-full px-3.5 py-2 rounded-xl border border-[#e5e5e7] text-sm focus:outline-none focus:ring-2 focus:ring-[#0071e3]/30"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-semibold text-[#1d1d1f]">Duration</label>
              <input
                type="text"
                required
                value={newLecture.duration}
                onChange={(e) => setNewLecture({ ...newLecture, duration: e.target.value })}
                placeholder="e.g. 18 mins"
                className="w-full px-3.5 py-2 rounded-xl border border-[#e5e5e7] text-sm focus:outline-none focus:ring-2 focus:ring-[#0071e3]/30"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1">
              <label className="text-xs font-semibold text-[#1d1d1f]">Lesson Type</label>
              <select
                value={newLecture.type}
                onChange={(e) => setNewLecture({ ...newLecture, type: e.target.value as "video" | "notes" })}
                className="w-full px-3.5 py-2 rounded-xl border border-[#e5e5e7] text-sm focus:outline-none focus:ring-2 focus:ring-[#0071e3]/30"
              >
                <option value="video">Video Lecture</option>
                <option value="notes">Reading Notes / Handout</option>
              </select>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-semibold text-[#1d1d1f]">Media Stream UID / URL</label>
              <input
                type="text"
                value={newLecture.videoStreamUid}
                onChange={(e) => setNewLecture({ ...newLecture, videoStreamUid: e.target.value })}
                placeholder="e.g. cf-stream-abc1234"
                className="w-full px-3.5 py-2 rounded-xl border border-[#e5e5e7] text-sm focus:outline-none focus:ring-2 focus:ring-[#0071e3]/30"
              />
            </div>
          </div>

          <div className="pt-4 flex justify-end gap-2 border-t border-[#f0f0f2]">
            <Button type="button" variant="secondary" size="md" onClick={() => setIsModalOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" variant="primary" size="md">
              Create Lecture
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  )
}
