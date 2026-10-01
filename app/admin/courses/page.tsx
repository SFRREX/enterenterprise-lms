"use client"

import { useState } from "react"
import Link from "next/link"
import { AdminSidebar } from "@/components/layout/admin-sidebar"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Modal } from "@/components/ui/modal"
import { Plus, Edit, CheckCircle2 } from "lucide-react"

interface Course {
  id: string
  title: string
  batch: string
  instructor: string
  chaptersCount: number
  lessonsCount: number
  isPublished: boolean
}

export default function AdminCoursesPage() {
  const [courses, setCourses] = useState<Course[]>([])

  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingCourse, setEditingCourse] = useState<Course | null>(null)
  const [notification, setNotification] = useState<string | null>(null)

  const [newCourse, setNewCourse] = useState({
    title: "",
    batch: "Unassigned",
    instructor: "Unassigned",
    isPublished: true
  })

  const handleCreateCourse = (e: React.FormEvent) => {
    e.preventDefault()
    if (!newCourse.title) return

    const created = {
      id: `crs-${Date.now()}`,
      title: newCourse.title,
      batch: newCourse.batch,
      instructor: newCourse.instructor,
      chaptersCount: 1,
      lessonsCount: 4,
      isPublished: newCourse.isPublished
    }

    setCourses([created, ...courses])
    setIsModalOpen(false)
    setNewCourse({ title: "", batch: "Cohort 2026-Alpha", instructor: "Dr. Evelyn Reed", isPublished: true })
    setNotification(`Successfully created course "${created.title}"!`)
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
            <h1 className="text-2xl font-bold tracking-tight text-[#1d1d1f]">Course Management</h1>
            <p className="text-sm text-[#7a7a7a] mt-0.5">
              Author curricula, structure chapters and lessons, and assign instructor privileges.
            </p>
          </div>
          <Button
            variant="primary"
            size="md"
            className="gap-2 cursor-pointer"
            onClick={() => setIsModalOpen(true)}
          >
            <Plus className="w-4 h-4" /> Create Course
          </Button>
        </div>

        <div className="bg-white rounded-2xl border border-black/[0.06] overflow-hidden shadow-sm">
          {courses.length > 0 ? (
            <table className="w-full text-left text-sm">
              <thead className="bg-[#fafafc] border-b border-[#e5e5e7] text-[#7a7a7a] text-xs font-medium uppercase tracking-wider">
                <tr>
                  <th className="py-3.5 px-6">Course</th>
                  <th className="py-3.5 px-6">Assigned Batch</th>
                  <th className="py-3.5 px-6">Instructor</th>
                  <th className="py-3.5 px-6">Structure</th>
                  <th className="py-3.5 px-6">Status</th>
                  <th className="py-3.5 px-6 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#f0f0f2]">
                {courses.map((c) => (
                  <tr key={c.id} className="hover:bg-[#fafafc] transition-colors">
                    <td className="py-4 px-6">
                      <p className="font-semibold text-[#1d1d1f]">{c.title}</p>
                    </td>
                    <td className="py-4 px-6 text-[#7a7a7a]">{c.batch}</td>
                    <td className="py-4 px-6 text-[#1d1d1f]">{c.instructor}</td>
                    <td className="py-4 px-6 text-xs text-[#7a7a7a]">
                      {c.chaptersCount} Chapters &bull; {c.lessonsCount} Lessons
                    </td>
                    <td className="py-4 px-6">
                      <Badge variant={c.isPublished ? "success" : "neutral"}>
                        {c.isPublished ? "Published" : "Draft"}
                      </Badge>
                    </td>
                    <td className="py-4 px-6 text-right space-x-2">
                      <Link href="/admin/lectures">
                        <Button variant="secondary" size="sm" className="mr-1">
                          + Add Lecture
                        </Button>
                      </Link>
                      <Button
                        variant="secondary"
                        size="sm"
                        onClick={() => setEditingCourse(c)}
                      >
                        <Edit className="w-3.5 h-3.5 mr-1" /> Edit
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <div className="p-12 text-center space-y-4">
              <div className="w-14 h-14 rounded-full bg-[#f5f5f7] flex items-center justify-center mx-auto text-[#7a7a7a]">
                <Edit className="w-7 h-7" />
              </div>
              <div className="space-y-1">
                <h2 className="text-base font-semibold text-[#1d1d1f]">No Courses Created Yet</h2>
                <p className="text-xs text-[#7a7a7a] max-w-sm mx-auto">
                  The curriculum catalog is currently empty. Author your first syllabus module or lesson series.
                </p>
              </div>
              <div className="pt-2">
                <Button variant="primary" size="md" onClick={() => setIsModalOpen(true)}>
                  <Plus className="w-4 h-4 mr-1.5" /> Create First Course
                </Button>
              </div>
            </div>
          )}
        </div>
      </main>

      {/* Modal: Create Course */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Create New Course"
      >
        <form onSubmit={handleCreateCourse} className="space-y-4">
          <div className="space-y-1">
            <label className="text-xs font-semibold text-[#1d1d1f]">Course Title</label>
            <input
              type="text"
              required
              value={newCourse.title}
              onChange={(e) => setNewCourse({ ...newCourse, title: e.target.value })}
              placeholder="e.g. Distributed Database Engineering"
              className="w-full px-3.5 py-2 rounded-xl border border-[#e5e5e7] text-sm focus:outline-none focus:ring-2 focus:ring-[#0071e3]/30"
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-semibold text-[#1d1d1f]">Assign to Cohort</label>
            <select
              value={newCourse.batch}
              onChange={(e) => setNewCourse({ ...newCourse, batch: e.target.value })}
              className="w-full px-3.5 py-2 rounded-xl border border-[#e5e5e7] text-sm focus:outline-none focus:ring-2 focus:ring-[#0071e3]/30"
            >
              <option value="Cohort 2026-Alpha">Cohort 2026-Alpha</option>
              <option value="Cohort 2026-Beta">Cohort 2026-Beta</option>
              <option value="AI Systems Engineering 2026">AI Systems Engineering 2026</option>
            </select>
          </div>

          <div className="space-y-1">
            <label className="text-xs font-semibold text-[#1d1d1f]">Lead Faculty Instructor</label>
            <select
              value={newCourse.instructor}
              onChange={(e) => setNewCourse({ ...newCourse, instructor: e.target.value })}
              className="w-full px-3.5 py-2 rounded-xl border border-[#e5e5e7] text-sm focus:outline-none focus:ring-2 focus:ring-[#0071e3]/30"
            >
              <option value="Dr. Evelyn Reed">Dr. Evelyn Reed</option>
              <option value="Marcus Vance">Marcus Vance</option>
              <option value="Sarah Jenkins">Sarah Jenkins</option>
            </select>
          </div>

          <div className="pt-4 flex justify-end gap-2 border-t border-[#f0f0f2]">
            <Button type="button" variant="secondary" size="md" onClick={() => setIsModalOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" variant="primary" size="md">
              Create Course
            </Button>
          </div>
        </form>
      </Modal>

      {/* Modal: Edit Course */}
      <Modal
        isOpen={!!editingCourse}
        onClose={() => setEditingCourse(null)}
        title={`Edit Course: ${editingCourse?.title}`}
      >
        <div className="space-y-4">
          <p className="text-xs text-[#7a7a7a]">Configure visibility and curriculum properties:</p>
          <div className="flex items-center justify-between p-3 rounded-xl border border-[#e5e5e7]">
            <span className="text-xs font-semibold text-[#1d1d1f]">Publication Status</span>
            <Button
              variant={editingCourse?.isPublished ? "destructive" : "primary"}
              size="sm"
              onClick={() => {
                if (!editingCourse) return
                const courseToUpdate = editingCourse
                setCourses(courses.map(c => c.id === courseToUpdate.id ? { ...c, isPublished: !c.isPublished } : c))
                setEditingCourse(null)
                setNotification(`Toggled publication state for ${courseToUpdate.title}!`)
                setTimeout(() => setNotification(null), 4000)
              }}
            >
              {editingCourse?.isPublished ? "Unpublish Course" : "Publish Course"}
            </Button>
          </div>
          <div className="flex justify-end pt-2 border-t border-[#f0f0f2]">
            <Button variant="secondary" size="sm" onClick={() => setEditingCourse(null)}>
              Close
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  )
}
