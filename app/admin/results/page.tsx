import Link from "next/link"
import { AdminSidebar } from "@/components/layout/admin-sidebar"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ShieldCheck, FileSpreadsheet, Download, Activity } from "lucide-react"

export default function AdminResultsAndAuditsPage() {
  const auditLogs = [
    {
      id: "aud-101",
      actor: "Marcus Vance (Instructor)",
      action: "Updated rubric score for Alex Rivera (95/100)",
      resource: "Assignment 2: Cloudflare R2",
      timestamp: "Today at 15:42",
      ip: "192.168.1.45"
    },
    {
      id: "aud-102",
      actor: "System Automation",
      action: "Issued Certificate CERT-2026-8902-AFE",
      resource: "Course CS-401",
      timestamp: "Sep 24, 2026",
      ip: "127.0.0.1"
    },
    {
      id: "aud-103",
      actor: "Admin (Dean of Engineering)",
      action: "Enrolled Maya Patel into Cohort 2026-Beta",
      resource: "Batch BATCH-26B",
      timestamp: "Mar 01, 2026",
      ip: "10.0.4.12"
    }
  ]

  return (
    <div className="flex min-h-screen bg-[#f5f5f7]">
      <AdminSidebar />

      <main className="flex-1 p-8 space-y-8 overflow-y-auto">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-[#1d1d1f]">Institutional Results & Audit Logs</h1>
            <p className="text-sm text-[#7a7a7a] mt-0.5">
              Immutable system-level audit logs, grading ledgers, and academic compliance records.
            </p>
          </div>
          <Button variant="secondary" size="md" className="gap-2">
            <Download className="w-4 h-4" /> Export CSV Ledger
          </Button>
        </div>

        <div className="bg-white rounded-2xl border border-black/[0.06] overflow-hidden shadow-sm">
          <div className="p-6 border-b border-[#f0f0f2] flex items-center justify-between">
            <h2 className="text-base font-semibold text-[#1d1d1f] flex items-center gap-2">
              <Activity className="w-4 h-4 text-[#0066cc]" /> Audit Trail History
            </h2>
            <Badge variant="neutral">Retention: 7 Years (Regulated)</Badge>
          </div>

          <table className="w-full text-left text-sm">
            <thead className="bg-[#fafafc] border-b border-[#e5e5e7] text-[#7a7a7a] text-xs font-medium uppercase tracking-wider">
              <tr>
                <th className="py-3.5 px-6">Actor</th>
                <th className="py-3.5 px-6">Action / Event</th>
                <th className="py-3.5 px-6">Target Resource</th>
                <th className="py-3.5 px-6">Timestamp</th>
                <th className="py-3.5 px-6 font-mono text-xs">Origin IP</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#f0f0f2]">
              {auditLogs.map((log) => (
                <tr key={log.id} className="hover:bg-[#fafafc] transition-colors">
                  <td className="py-4 px-6 font-semibold text-[#1d1d1f]">{log.actor}</td>
                  <td className="py-4 px-6 text-[#333333]">{log.action}</td>
                  <td className="py-4 px-6 text-xs text-[#7a7a7a] font-medium">{log.resource}</td>
                  <td className="py-4 px-6 text-[#7a7a7a] text-xs">{log.timestamp}</td>
                  <td className="py-4 px-6 font-mono text-xs text-[#7a7a7a]">{log.ip}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  )
}
