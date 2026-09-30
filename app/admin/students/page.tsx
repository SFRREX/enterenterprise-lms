"use client"

import { useState } from "react"
import Link from "next/link"
import { AdminSidebar } from "@/components/layout/admin-sidebar"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Modal } from "@/components/ui/modal"
import { Users, Mail, UserCheck, Shield, Plus, CheckCircle2 } from "lucide-react"

export default function AdminStudentsPage() {
  const [students, setStudents] = useState([
    {
      id: "std-1",
      name: "Alex Rivera",
      email: "alex.rivera@student.elms.edu",
      batch: "Cohort 2026-Alpha",
      enrolledAt: "Jan 15, 2026",
      status: "Active",
      gpa: "3.92"
    },
    {
      id: "std-2",
      name: "Jordan Lee",
      email: "jordan.lee@student.elms.edu",
      batch: "Cohort 2026-Alpha",
      enrolledAt: "Jan 16, 2026",
      status: "Active",
      gpa: "3.85"
    },
    {
      id: "std-3",
      name: "Maya Patel",
      email: "maya.patel@student.elms.edu",
      batch: "Cohort 2026-Beta",
      enrolledAt: "Mar 01, 2026",
      status: "Active",
      gpa: "4.00"
    }
  ])

  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedStudent, setSelectedStudent] = useState<string | null>(null)
  const [notification, setNotification] = useState<string | null>(null)

  const [newStudent, setNewStudent] = useState({
    name: "",
    email: "",
    batch: "Cohort 2026-Alpha"
  })

  const handleEnrollStudent = (e: React.FormEvent) => {
    e.preventDefault()
    if (!newStudent.name || !newStudent.email) return

    const created = {
      id: `std-${Date.now()}`,
      name: newStudent.name,
      email: newStudent.email,
      batch: newStudent.batch,
      enrolledAt: "Today",
      status: "Active",
      gpa: "N/A"
    }

    setStudents([created, ...students])
    setIsModalOpen(false)
    setNewStudent({ name: "", email: "", batch: "Cohort 2026-Alpha" })
    setNotification(`Successfully enrolled ${created.name} into ${created.batch}!`)
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
            <h1 className="text-2xl font-bold tracking-tight text-[#1d1d1f]">Student Directory</h1>
            <p className="text-sm text-[#7a7a7a] mt-0.5">
              Manage student profiles, monitor academic standing, and allocate batch memberships.
            </p>
          </div>
          <Button
            variant="primary"
            size="md"
            className="gap-2 cursor-pointer"
            onClick={() => setIsModalOpen(true)}
          >
            <Plus className="w-4 h-4" /> Enroll Student
          </Button>
        </div>

        <div className="bg-white rounded-2xl border border-black/[0.06] overflow-hidden shadow-sm">
          <table className="w-full text-left text-sm">
            <thead className="bg-[#fafafc] border-b border-[#e5e5e7] text-[#7a7a7a] text-xs font-medium uppercase tracking-wider">
              <tr>
                <th className="py-3.5 px-6">Student</th>
                <th className="py-3.5 px-6">Assigned Batch</th>
                <th className="py-3.5 px-6">Enrolled Date</th>
                <th className="py-3.5 px-6">GPA</th>
                <th className="py-3.5 px-6">Status</th>
                <th className="py-3.5 px-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#f0f0f2]">
              {students.map((s) => (
                <tr key={s.id} className="hover:bg-[#fafafc] transition-colors">
                  <td className="py-4 px-6">
                    <p className="font-semibold text-[#1d1d1f]">{s.name}</p>
                    <p className="text-xs text-[#7a7a7a] flex items-center gap-1">
                      <Mail className="w-3 h-3" /> {s.email}
                    </p>
                  </td>
                  <td className="py-4 px-6 text-[#1d1d1f]">{s.batch}</td>
                  <td className="py-4 px-6 text-[#7a7a7a]">{s.enrolledAt}</td>
                  <td className="py-4 px-6 font-mono font-semibold text-[#0066cc]">{s.gpa}</td>
                  <td className="py-4 px-6">
                    <Badge variant="success">{s.status}</Badge>
                  </td>
                  <td className="py-4 px-6 text-right">
                    <Button
                      variant="secondary"
                      size="sm"
                      onClick={() => setSelectedStudent(s.name)}
                    >
                      Manage
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>

      {/* Modal: Enroll Student */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Enroll New Student"
      >
        <form onSubmit={handleEnrollStudent} className="space-y-4">
          <div className="space-y-1">
            <label className="text-xs font-semibold text-[#1d1d1f]">Student Full Name</label>
            <input
              type="text"
              required
              value={newStudent.name}
              onChange={(e) => setNewStudent({ ...newStudent, name: e.target.value })}
              placeholder="e.g. Cameron Diaz"
              className="w-full px-3.5 py-2 rounded-xl border border-[#e5e5e7] text-sm focus:outline-none focus:ring-2 focus:ring-[#0071e3]/30"
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-semibold text-[#1d1d1f]">Institutional Email</label>
            <input
              type="email"
              required
              value={newStudent.email}
              onChange={(e) => setNewStudent({ ...newStudent, email: e.target.value })}
              placeholder="e.g. cameron@student.elms.edu"
              className="w-full px-3.5 py-2 rounded-xl border border-[#e5e5e7] text-sm focus:outline-none focus:ring-2 focus:ring-[#0071e3]/30"
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-semibold text-[#1d1d1f]">Assign to Cohort</label>
            <select
              value={newStudent.batch}
              onChange={(e) => setNewStudent({ ...newStudent, batch: e.target.value })}
              className="w-full px-3.5 py-2 rounded-xl border border-[#e5e5e7] text-sm focus:outline-none focus:ring-2 focus:ring-[#0071e3]/30"
            >
              <option value="Cohort 2026-Alpha">Cohort 2026-Alpha (Full-Stack Engineering)</option>
              <option value="Cohort 2026-Beta">Cohort 2026-Beta (Cloud Systems)</option>
              <option value="AI Systems Engineering 2026">AI Systems Engineering 2026</option>
            </select>
          </div>

          <div className="pt-4 flex justify-end gap-2 border-t border-[#f0f0f2]">
            <Button type="button" variant="secondary" size="md" onClick={() => setIsModalOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" variant="primary" size="md">
              Complete Enrollment
            </Button>
          </div>
        </form>
      </Modal>

      {/* Modal: Manage Student */}
      <Modal
        isOpen={!!selectedStudent}
        onClose={() => setSelectedStudent(null)}
        title={`Student Profile: ${selectedStudent}`}
      >
        <div className="space-y-4">
          <p className="text-xs text-[#7a7a7a]">
            Manage status, reset credentials, or reassign cohort membership:
          </p>
          <div className="space-y-2">
            <Button
              variant="secondary"
              size="sm"
              className="w-full justify-start"
              onClick={() => {
                setSelectedStudent(null)
                setNotification(`Password reset instructions dispatched to ${selectedStudent}!`)
                setTimeout(() => setNotification(null), 4000)
              }}
            >
              Send Password Reset Link
            </Button>
            <Button
              variant="secondary"
              size="sm"
              className="w-full justify-start text-amber-700"
              onClick={() => {
                setSelectedStudent(null)
                setNotification(`Academic warning flagged for ${selectedStudent}!`)
                setTimeout(() => setNotification(null), 4000)
              }}
            >
              Issue Academic Warning
            </Button>
          </div>
          <div className="flex justify-end pt-2 border-t border-[#f0f0f2]">
            <Button variant="secondary" size="sm" onClick={() => setSelectedStudent(null)}>
              Close
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  )
}
