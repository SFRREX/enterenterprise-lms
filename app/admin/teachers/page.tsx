"use client"

import { useState } from "react"
import { AdminSidebar } from "@/components/layout/admin-sidebar"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Modal } from "@/components/ui/modal"
import { Mail, Plus, CheckCircle2 } from "lucide-react"

export default function AdminTeachersPage() {
  const [teachers, setTeachers] = useState<any[]>([])

  const [isModalOpen, setIsModalOpen] = useState(false)
  const [assignModalOpen, setAssignModalOpen] = useState(false)
  const [selectedTeacher, setSelectedTeacher] = useState<string | null>(null)
  const [notification, setNotification] = useState<string | null>(null)

  const [newFaculty, setNewFaculty] = useState({
    name: "",
    email: "",
    department: "Computer Science & Systems"
  })

  const handleAddFaculty = (e: React.FormEvent) => {
    e.preventDefault()
    if (!newFaculty.name || !newFaculty.email) return

    const created = {
      id: `tch-${Date.now()}`,
      name: newFaculty.name,
      email: newFaculty.email,
      department: newFaculty.department,
      assignedCoursesCount: 0,
      activeStudentsCount: 0,
      status: "Active Faculty"
    }

    setTeachers([created, ...teachers])
    setIsModalOpen(false)
    setNewFaculty({ name: "", email: "", department: "Computer Science & Systems" })
    setNotification(`Successfully added ${created.name} to Faculty Directory!`)
    setTimeout(() => setNotification(null), 4000)
  }

  const handleAssignCourses = (teacherName: string) => {
    setSelectedTeacher(teacherName)
    setAssignModalOpen(true)
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
            <h1 className="text-2xl font-bold tracking-tight text-[#1d1d1f]">Faculty & Instructors</h1>
            <p className="text-sm text-[#7a7a7a] mt-0.5">
              Manage teacher accounts, assign course responsibilities, and monitor grading queues.
            </p>
          </div>
          <Button
            variant="primary"
            size="md"
            className="gap-2 cursor-pointer"
            onClick={() => setIsModalOpen(true)}
          >
            <Plus className="w-4 h-4" /> Add Faculty Member
          </Button>
        </div>

        <div className="bg-white rounded-2xl border border-black/[0.06] overflow-hidden shadow-sm">
          {teachers.length === 0 ? (
            <div className="p-12 text-center">
              <div className="w-12 h-12 rounded-full bg-[#f5f5f7] flex items-center justify-center mx-auto mb-3 text-[#7a7a7a]">
                <Mail className="w-6 h-6" />
              </div>
              <h3 className="text-base font-semibold text-[#1d1d1f]">No Faculty Members Added</h3>
              <p className="text-sm text-[#7a7a7a] mt-1 max-w-sm mx-auto mb-5">
                Register instructors and curriculum authors to oversee courses, grade student assignments, and conduct live cohorts.
              </p>
              <Button
                variant="primary"
                size="md"
                className="gap-2 cursor-pointer inline-flex"
                onClick={() => setIsModalOpen(true)}
              >
                <Plus className="w-4 h-4" /> Add Faculty Member
              </Button>
            </div>
          ) : (
            <table className="w-full text-left text-sm">
              <thead className="bg-[#fafafc] border-b border-[#e5e5e7] text-[#7a7a7a] text-xs font-medium uppercase tracking-wider">
                <tr>
                  <th className="py-3.5 px-6">Faculty Name</th>
                  <th className="py-3.5 px-6">Department</th>
                  <th className="py-3.5 px-6">Assigned Courses</th>
                  <th className="py-3.5 px-6">Active Learners</th>
                  <th className="py-3.5 px-6">Status</th>
                  <th className="py-3.5 px-6 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#f0f0f2]">
                {teachers.map((t) => (
                  <tr key={t.id} className="hover:bg-[#fafafc] transition-colors">
                    <td className="py-4 px-6">
                      <p className="font-semibold text-[#1d1d1f]">{t.name}</p>
                      <p className="text-xs text-[#7a7a7a] flex items-center gap-1">
                        <Mail className="w-3 h-3" /> {t.email}
                      </p>
                    </td>
                    <td className="py-4 px-6 text-[#1d1d1f]">{t.department}</td>
                    <td className="py-4 px-6 text-[#0066cc] font-medium">{t.assignedCoursesCount} Courses</td>
                    <td className="py-4 px-6 text-[#7a7a7a]">{t.activeStudentsCount} Students</td>
                    <td className="py-4 px-6">
                      <Badge variant="success">{t.status}</Badge>
                    </td>
                    <td className="py-4 px-6 text-right">
                      <Button
                        variant="secondary"
                        size="sm"
                        onClick={() => handleAssignCourses(t.name)}
                      >
                        Assign Courses
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </main>

      {/* Modal: Add Faculty Member */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Add Faculty Member"
      >
        <form onSubmit={handleAddFaculty} className="space-y-4">
          <div className="space-y-1">
            <label className="text-xs font-semibold text-[#1d1d1f]">Full Name</label>
            <input
              type="text"
              required
              value={newFaculty.name}
              onChange={(e) => setNewFaculty({ ...newFaculty, name: e.target.value })}
              placeholder="e.g. Dr. Robert Chen"
              className="w-full px-3.5 py-2 rounded-xl border border-[#e5e5e7] text-sm focus:outline-none focus:ring-2 focus:ring-[#0071e3]/30"
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-semibold text-[#1d1d1f]">Institutional Email</label>
            <input
              type="email"
              required
              value={newFaculty.email}
              onChange={(e) => setNewFaculty({ ...newFaculty, email: e.target.value })}
              placeholder="e.g. robert.chen@faculty.elms.edu"
              className="w-full px-3.5 py-2 rounded-xl border border-[#e5e5e7] text-sm focus:outline-none focus:ring-2 focus:ring-[#0071e3]/30"
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-semibold text-[#1d1d1f]">Department</label>
            <select
              value={newFaculty.department}
              onChange={(e) => setNewFaculty({ ...newFaculty, department: e.target.value })}
              className="w-full px-3.5 py-2 rounded-xl border border-[#e5e5e7] text-sm focus:outline-none focus:ring-2 focus:ring-[#0071e3]/30"
            >
              <option value="Computer Science & Systems">Computer Science & Systems</option>
              <option value="Cloud & Distributed Computing">Cloud & Distributed Computing</option>
              <option value="Cybersecurity & Cryptography">Cybersecurity & Cryptography</option>
              <option value="Artificial Intelligence">Artificial Intelligence</option>
            </select>
          </div>

          <div className="pt-4 flex justify-end gap-2 border-t border-[#f0f0f2]">
            <Button
              type="button"
              variant="secondary"
              size="md"
              onClick={() => setIsModalOpen(false)}
            >
              Cancel
            </Button>
            <Button type="submit" variant="primary" size="md">
              Save Faculty Member
            </Button>
          </div>
        </form>
      </Modal>

      {/* Modal: Assign Courses */}
      <Modal
        isOpen={assignModalOpen}
        onClose={() => setAssignModalOpen(false)}
        title={`Assign Courses to ${selectedTeacher}`}
      >
        <div className="space-y-4">
          <p className="text-xs text-[#7a7a7a]">
            Select courses from active cohorts to assign to this faculty member:
          </p>
          <div className="space-y-2">
            <label className="flex items-center gap-2 p-3 rounded-xl border border-[#e5e5e7] hover:bg-[#fafafc] cursor-pointer text-xs">
              <input type="checkbox" defaultChecked className="rounded text-[#0066cc]" />
              <span>Advanced Full-Stack Engineering (Cohort 2026-Alpha)</span>
            </label>
            <label className="flex items-center gap-2 p-3 rounded-xl border border-[#e5e5e7] hover:bg-[#fafafc] cursor-pointer text-xs">
              <input type="checkbox" className="rounded text-[#0066cc]" />
              <span>Distributed Systems Architecture (Cohort 2026-Beta)</span>
            </label>
            <label className="flex items-center gap-2 p-3 rounded-xl border border-[#e5e5e7] hover:bg-[#fafafc] cursor-pointer text-xs">
              <input type="checkbox" className="rounded text-[#0066cc]" />
              <span>Cryptographic Security Systems (Unassigned)</span>
            </label>
          </div>
          <div className="pt-4 flex justify-end gap-2 border-t border-[#f0f0f2]">
            <Button
              type="button"
              variant="primary"
              size="md"
              onClick={() => {
                setAssignModalOpen(false)
                setNotification(`Updated course assignments for ${selectedTeacher}!`)
                setTimeout(() => setNotification(null), 4000)
              }}
            >
              Confirm Assignments
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  )
}
