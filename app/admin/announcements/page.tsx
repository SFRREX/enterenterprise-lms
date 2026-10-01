"use client"

import { useState } from "react"
import { AdminSidebar } from "@/components/layout/admin-sidebar"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Modal } from "@/components/ui/modal"
import { Plus, CheckCircle2 } from "lucide-react"

export default function AdminAnnouncementsPage() {
  const [announcements, setAnnouncements] = useState<any[]>([])

  const [isModalOpen, setIsModalOpen] = useState(false)
  const [notification, setNotification] = useState<string | null>(null)

  const [newAnn, setNewAnn] = useState({
    title: "",
    target: "All Active Cohorts",
    body: "",
    isPinned: false
  })

  const handleBroadcast = (e: React.FormEvent) => {
    e.preventDefault()
    if (!newAnn.title) return

    const created = {
      id: `ann-${Date.now()}`,
      title: newAnn.title,
      target: newAnn.target,
      author: "Institutional Admin",
      publishedAt: "Just now",
      isPinned: newAnn.isPinned
    }

    setAnnouncements([created, ...announcements])
    setIsModalOpen(false)
    setNewAnn({ title: "", target: "All Active Cohorts", body: "", isPinned: false })
    setNotification(`Broadcast announcement published to ${created.target}!`)
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
            <h1 className="text-2xl font-bold tracking-tight text-[#1d1d1f]">Institutional Announcements</h1>
            <p className="text-sm text-[#7a7a7a] mt-0.5">
              Broadcast cohort-wide notifications, maintenance bulletins, and academic updates.
            </p>
          </div>
          <Button
            variant="primary"
            size="md"
            className="gap-2 cursor-pointer"
            onClick={() => setIsModalOpen(true)}
          >
            <Plus className="w-4 h-4" /> Broadcast Announcement
          </Button>
        </div>

        <div className="bg-white rounded-2xl border border-black/[0.06] overflow-hidden shadow-sm">
          {announcements.length === 0 ? (
            <div className="p-12 text-center">
              <div className="w-12 h-12 rounded-full bg-[#f5f5f7] flex items-center justify-center mx-auto mb-3 text-[#7a7a7a]">
                <Plus className="w-6 h-6" />
              </div>
              <h3 className="text-base font-semibold text-[#1d1d1f]">No Announcements Broadcasted</h3>
              <p className="text-sm text-[#7a7a7a] mt-1 max-w-sm mx-auto mb-5">
                Send campus-wide announcements or cohort-specific notifications that appear on student dashboards.
              </p>
              <Button
                variant="primary"
                size="md"
                className="gap-2 cursor-pointer inline-flex"
                onClick={() => setIsModalOpen(true)}
              >
                <Plus className="w-4 h-4" /> Broadcast Announcement
              </Button>
            </div>
          ) : (
            <table className="w-full text-left text-sm">
              <thead className="bg-[#fafafc] border-b border-[#e5e5e7] text-[#7a7a7a] text-xs font-medium uppercase tracking-wider">
                <tr>
                  <th className="py-3.5 px-6">Announcement</th>
                  <th className="py-3.5 px-6">Target Audience</th>
                  <th className="py-3.5 px-6">Author</th>
                  <th className="py-3.5 px-6">Date</th>
                  <th className="py-3.5 px-6">State</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#f0f0f2]">
                {announcements.map((a) => (
                  <tr key={a.id} className="hover:bg-[#fafafc] transition-colors">
                    <td className="py-4 px-6 font-semibold text-[#1d1d1f]">{a.title}</td>
                    <td className="py-4 px-6 text-[#0066cc] text-xs font-medium">{a.target}</td>
                    <td className="py-4 px-6 text-[#7a7a7a] text-xs">{a.author}</td>
                    <td className="py-4 px-6 text-[#7a7a7a] text-xs">{a.publishedAt}</td>
                    <td className="py-4 px-6">
                      {a.isPinned ? (
                        <Badge variant="warning">Pinned</Badge>
                      ) : (
                        <Badge variant="neutral">Standard</Badge>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </main>

      {/* Modal: Broadcast Announcement */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Broadcast New Announcement"
      >
        <form onSubmit={handleBroadcast} className="space-y-4">
          <div className="space-y-1">
            <label className="text-xs font-semibold text-[#1d1d1f]">Subject / Headline</label>
            <input
              type="text"
              required
              value={newAnn.title}
              onChange={(e) => setNewAnn({ ...newAnn, title: e.target.value })}
              placeholder="e.g. Schedule Change: Guest Lecture on Thursday"
              className="w-full px-3.5 py-2 rounded-xl border border-[#e5e5e7] text-sm focus:outline-none focus:ring-2 focus:ring-[#0071e3]/30"
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-semibold text-[#1d1d1f]">Target Audience</label>
            <input
              type="text"
              required
              value={newAnn.target}
              onChange={(e) => setNewAnn({ ...newAnn, target: e.target.value })}
              placeholder="e.g. All Active Cohorts, or Cohort 2026-Alpha"
              className="w-full px-3.5 py-2 rounded-xl border border-[#e5e5e7] text-sm focus:outline-none focus:ring-2 focus:ring-[#0071e3]/30"
            />
          </div>

          <div className="flex items-center gap-2 pt-1">
            <input
              type="checkbox"
              id="pinned"
              checked={newAnn.isPinned}
              onChange={(e) => setNewAnn({ ...newAnn, isPinned: e.target.checked })}
              className="rounded text-[#0066cc]"
            />
            <label htmlFor="pinned" className="text-xs text-[#1d1d1f] font-medium cursor-pointer">
              Pin to top of student portal
            </label>
          </div>

          <div className="pt-4 flex justify-end gap-2 border-t border-[#f0f0f2]">
            <Button type="button" variant="secondary" size="md" onClick={() => setIsModalOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" variant="primary" size="md">
              Publish Broadcast
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  )
}
