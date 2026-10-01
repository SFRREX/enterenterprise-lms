"use client"

import { useState } from "react"
import Link from "next/link"
import { AdminSidebar } from "@/components/layout/admin-sidebar"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Modal } from "@/components/ui/modal"
import { Plus, Users, BookOpen, Calendar, CheckCircle2 } from "lucide-react"

export default function AdminBatchesPage() {
  const [batches, setBatches] = useState<Array<{
    id: string
    name: string
    code: string
    studentsCount: number
    coursesCount: number
    startDate: string
    endDate: string
    status: string
  }>>([])

  const [isModalOpen, setIsModalOpen] = useState(false)
  const [rosterModal, setRosterModal] = useState<string | null>(null)
  const [notification, setNotification] = useState<string | null>(null)

  const [newBatch, setNewBatch] = useState({
    name: "",
    code: "",
    startDate: "",
    endDate: ""
  })

  const handleCreateBatch = (e: React.FormEvent) => {
    e.preventDefault()
    if (!newBatch.name || !newBatch.code) return

    const created = {
      id: `b-${Date.now()}`,
      name: newBatch.name,
      code: newBatch.code.toUpperCase(),
      studentsCount: 0,
      coursesCount: 0,
      startDate: newBatch.startDate || "Oct 01, 2026",
      endDate: newBatch.endDate || "Aug 15, 2027",
      status: "Active"
    }

    setBatches([created, ...batches])
    setIsModalOpen(false)
    setNewBatch({ name: "", code: "", startDate: "", endDate: "" })
    setNotification(`Successfully created cohort "${created.name}"!`)
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
            <h1 className="text-2xl font-bold tracking-tight text-[#1d1d1f]">Cohort & Batch Management</h1>
            <p className="text-sm text-[#7a7a7a] mt-0.5">
              Organize academic programs, manage student rosters, and assign course curricula.
            </p>
          </div>
          <Button
            variant="primary"
            size="md"
            className="gap-2 cursor-pointer"
            onClick={() => setIsModalOpen(true)}
          >
            <Plus className="w-4 h-4" /> Create New Cohort
          </Button>
        </div>

        {batches.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {batches.map((batch) => (
              <Card key={batch.id} className="flex flex-col justify-between p-6">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <Badge variant="success">{batch.status}</Badge>
                    <span className="font-mono text-xs text-[#7a7a7a]">{batch.code}</span>
                  </div>
                  <h2 className="text-base font-bold text-[#1d1d1f] tracking-tight leading-snug">{batch.name}</h2>

                  <div className="space-y-1.5 text-xs text-[#7a7a7a] pt-2 border-t border-[#f0f0f2]">
                    <div className="flex items-center gap-2">
                      <Users className="w-3.5 h-3.5 text-[#0066cc]" />
                      <span>{batch.studentsCount} Students Enrolled</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <BookOpen className="w-3.5 h-3.5 text-[#0066cc]" />
                      <span>{batch.coursesCount} Active Courses</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar className="w-3.5 h-3.5 text-[#7a7a7a]" />
                      <span>{batch.startDate} &ndash; {batch.endDate}</span>
                    </div>
                  </div>
                </div>

                <div className="pt-6">
                  <Button
                    variant="secondary"
                    size="sm"
                    className="w-full"
                    onClick={() => setRosterModal(batch.name)}
                  >
                    Manage Roster & Courses
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        ) : (
          <div className="rounded-[18px] bg-white border border-[#e0e0e0] p-12 text-center space-y-4">
            <div className="w-14 h-14 rounded-full bg-[#f5f5f7] flex items-center justify-center mx-auto text-[#7a7a7a]">
              <Users className="w-7 h-7" />
            </div>
            <div className="space-y-1">
              <h2 className="text-base font-semibold text-[#1d1d1f]">No Cohorts Initialized</h2>
              <p className="text-xs text-[#7a7a7a] max-w-md mx-auto">
                No academic cohorts have been configured yet. Click below to establish your initial student batch.
              </p>
            </div>
            <div className="pt-2">
              <Button variant="primary" size="md" onClick={() => setIsModalOpen(true)}>
                <Plus className="w-4 h-4 mr-1.5" /> Initialize First Cohort
              </Button>
            </div>
          </div>
        )}
      </main>

      {/* Modal: Create Cohort */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Create New Academic Cohort"
      >
        <form onSubmit={handleCreateBatch} className="space-y-4">
          <div className="space-y-1">
            <label className="text-xs font-semibold text-[#1d1d1f]">Cohort Program Title</label>
            <input
              type="text"
              required
              value={newBatch.name}
              onChange={(e) => setNewBatch({ ...newBatch, name: e.target.value })}
              placeholder="e.g. Cohort 2027-Alpha (Cybersecurity)"
              className="w-full px-3.5 py-2 rounded-xl border border-[#e5e5e7] text-sm focus:outline-none focus:ring-2 focus:ring-[#0071e3]/30"
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-semibold text-[#1d1d1f]">Unique Cohort Code</label>
            <input
              type="text"
              required
              value={newBatch.code}
              onChange={(e) => setNewBatch({ ...newBatch, code: e.target.value })}
              placeholder="e.g. BATCH-27A"
              className="w-full px-3.5 py-2 rounded-xl border border-[#e5e5e7] text-sm font-mono focus:outline-none focus:ring-2 focus:ring-[#0071e3]/30"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-xs font-semibold text-[#1d1d1f]">Start Date</label>
              <input
                type="date"
                value={newBatch.startDate}
                onChange={(e) => setNewBatch({ ...newBatch, startDate: e.target.value })}
                className="w-full px-3 py-2 rounded-xl border border-[#e5e5e7] text-xs focus:outline-none focus:ring-2 focus:ring-[#0071e3]/30"
              />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-semibold text-[#1d1d1f]">Graduation Date</label>
              <input
                type="date"
                value={newBatch.endDate}
                onChange={(e) => setNewBatch({ ...newBatch, endDate: e.target.value })}
                className="w-full px-3 py-2 rounded-xl border border-[#e5e5e7] text-xs focus:outline-none focus:ring-2 focus:ring-[#0071e3]/30"
              />
            </div>
          </div>

          <div className="pt-4 flex justify-end gap-2 border-t border-[#f0f0f2]">
            <Button type="button" variant="secondary" size="md" onClick={() => setIsModalOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" variant="primary" size="md">
              Create Cohort
            </Button>
          </div>
        </form>
      </Modal>

      {/* Modal: Manage Roster */}
      <Modal
        isOpen={!!rosterModal}
        onClose={() => setRosterModal(null)}
        title={`Roster Management: ${rosterModal}`}
      >
        <div className="space-y-4">
          <p className="text-xs text-[#7a7a7a]">
            Active student roster and allocated courses for this cohort:
          </p>
          <div className="p-3 rounded-xl bg-[#fafafc] border border-[#e5e5e7] text-xs space-y-1">
            <p className="font-semibold text-[#1d1d1f]">Roster Capacity: 150 students</p>
            <p className="text-[#7a7a7a]">Enrolled: 142 &bull; Available Seats: 8</p>
          </div>
          <div className="flex justify-end gap-2 pt-2 border-t border-[#f0f0f2]">
            <Button variant="secondary" size="sm" onClick={() => setRosterModal(null)}>
              Close
            </Button>
            <Link href="/admin/students">
              <Button variant="primary" size="sm">
                Open Student Directory
              </Button>
            </Link>
          </div>
        </div>
      </Modal>
    </div>
  )
}
