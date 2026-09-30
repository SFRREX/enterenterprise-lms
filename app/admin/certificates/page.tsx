"use client"

import { useState } from "react"
import Link from "next/link"
import { AdminSidebar } from "@/components/layout/admin-sidebar"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Modal } from "@/components/ui/modal"
import { Award, Plus, CheckCircle, ExternalLink, CheckCircle2 } from "lucide-react"

export default function AdminCertificatesPage() {
  const [certificates, setCertificates] = useState([
    {
      id: "cert-1",
      code: "CERT-2026-8902-AFE",
      recipient: "Alex Rivera",
      course: "Advanced Full-Stack Engineering with Next.js & PostgreSQL",
      batch: "Cohort 2026-Alpha",
      issueDate: "Sep 24, 2026",
      status: "Active & Immutable"
    },
    {
      id: "cert-2",
      code: "CERT-2026-8903-CIS",
      recipient: "Maya Patel",
      course: "Cloud Infrastructure, Distributed Systems & Edge R2",
      batch: "Cohort 2026-Beta",
      issueDate: "Sep 28, 2026",
      status: "Active & Immutable"
    }
  ])

  const [isModalOpen, setIsModalOpen] = useState(false)
  const [notification, setNotification] = useState<string | null>(null)

  const [newCert, setNewCert] = useState({
    recipient: "",
    course: "Advanced Full-Stack Engineering with Next.js & PostgreSQL",
    batch: "Cohort 2026-Alpha"
  })

  const handleIssueCert = (e: React.FormEvent) => {
    e.preventDefault()
    if (!newCert.recipient) return

    const randomCode = `CERT-2026-${Math.floor(1000 + Math.random() * 9000)}-EXP`
    const created = {
      id: `cert-${Date.now()}`,
      code: randomCode,
      recipient: newCert.recipient,
      course: newCert.course,
      batch: newCert.batch,
      issueDate: "Today",
      status: "Active & Immutable"
    }

    setCertificates([created, ...certificates])
    setIsModalOpen(false)
    setNewCert({ recipient: "", course: "Advanced Full-Stack Engineering with Next.js & PostgreSQL", batch: "Cohort 2026-Alpha" })
    setNotification(`Successfully issued credential ${created.code} to ${created.recipient}!`)
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
            <h1 className="text-2xl font-bold tracking-tight text-[#1d1d1f]">Certificate Authority & Ledger</h1>
            <p className="text-sm text-[#7a7a7a] mt-0.5">
              Issue accredited digital credentials, inspect public verification records, and configure templates.
            </p>
          </div>
          <Button
            variant="primary"
            size="md"
            className="gap-2 cursor-pointer"
            onClick={() => setIsModalOpen(true)}
          >
            <Plus className="w-4 h-4" /> Issue Credential
          </Button>
        </div>

        <div className="bg-white rounded-2xl border border-black/[0.06] overflow-hidden shadow-sm">
          <table className="w-full text-left text-sm">
            <thead className="bg-[#fafafc] border-b border-[#e5e5e7] text-[#7a7a7a] text-xs font-medium uppercase tracking-wider">
              <tr>
                <th className="py-3.5 px-6">Certificate Code</th>
                <th className="py-3.5 px-6">Recipient</th>
                <th className="py-3.5 px-6">Course & Batch</th>
                <th className="py-3.5 px-6">Issue Date</th>
                <th className="py-3.5 px-6">Status</th>
                <th className="py-3.5 px-6 text-right">Verification</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#f0f0f2]">
              {certificates.map((c) => (
                <tr key={c.id} className="hover:bg-[#fafafc] transition-colors">
                  <td className="py-4 px-6 font-mono font-bold text-xs text-[#0066cc]">{c.code}</td>
                  <td className="py-4 px-6 font-semibold text-[#1d1d1f]">{c.recipient}</td>
                  <td className="py-4 px-6">
                    <p className="text-[#1d1d1f]">{c.course}</p>
                    <p className="text-xs text-[#7a7a7a]">{c.batch}</p>
                  </td>
                  <td className="py-4 px-6 text-xs text-[#7a7a7a]">{c.issueDate}</td>
                  <td className="py-4 px-6">
                    <Badge variant="success">{c.status}</Badge>
                  </td>
                  <td className="py-4 px-6 text-right">
                    <Link href={`/verify/cert/${c.code}`} target="_blank">
                      <Button variant="secondary" size="sm" className="gap-1">
                        <ExternalLink className="w-3.5 h-3.5" /> Ledger
                      </Button>
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>

      {/* Modal: Issue Credential */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Issue Accredited Certificate"
      >
        <form onSubmit={handleIssueCert} className="space-y-4">
          <div className="space-y-1">
            <label className="text-xs font-semibold text-[#1d1d1f]">Recipient Full Name</label>
            <input
              type="text"
              required
              value={newCert.recipient}
              onChange={(e) => setNewCert({ ...newCert, recipient: e.target.value })}
              placeholder="e.g. Jordan Lee"
              className="w-full px-3.5 py-2 rounded-xl border border-[#e5e5e7] text-sm focus:outline-none focus:ring-2 focus:ring-[#0071e3]/30"
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-semibold text-[#1d1d1f]">Course Program</label>
            <select
              value={newCert.course}
              onChange={(e) => setNewCert({ ...newCert, course: e.target.value })}
              className="w-full px-3.5 py-2 rounded-xl border border-[#e5e5e7] text-sm focus:outline-none focus:ring-2 focus:ring-[#0071e3]/30"
            >
              <option value="Advanced Full-Stack Engineering with Next.js & PostgreSQL">Advanced Full-Stack Engineering with Next.js & PostgreSQL</option>
              <option value="Cloud Infrastructure, Distributed Systems & Edge R2">Cloud Infrastructure, Distributed Systems & Edge R2</option>
              <option value="Secure Authentication, Cryptography & JWT Systems">Secure Authentication, Cryptography & JWT Systems</option>
            </select>
          </div>

          <div className="pt-4 flex justify-end gap-2 border-t border-[#f0f0f2]">
            <Button type="button" variant="secondary" size="md" onClick={() => setIsModalOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" variant="primary" size="md">
              Sign & Issue Credential
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  )
}
