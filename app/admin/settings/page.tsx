import { AdminSidebar } from "@/components/layout/admin-sidebar"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Shield, Cloud, Save } from "lucide-react"

export default function AdminSettingsPage() {
  return (
    <div className="flex min-h-screen bg-[#f5f5f7]">
      <AdminSidebar />

      <main className="flex-1 p-8 space-y-8 overflow-y-auto">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-[#1d1d1f]">Institutional Platform Settings</h1>
          <p className="text-sm text-[#7a7a7a] mt-0.5">
            Configure system parameters, cloud storage thresholds, and security enforcement policies.
          </p>
        </div>

        <div className="max-w-4xl space-y-6">
          {/* Security & RLS */}
          <Card hoverable={false} className="p-6 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-purple-500/10 flex items-center justify-center text-purple-600">
                <Shield className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-base font-semibold text-[#1d1d1f]">Row Level Security & Zero Trust</h2>
                <p className="text-xs text-[#7a7a7a]">Database enforcement status across PostgreSQL 18.6 tables</p>
              </div>
            </div>

            <div className="rounded-xl bg-[#fafafc] border border-[#e5e5e7] p-4 space-y-2 text-xs">
              <div className="flex justify-between items-center py-1 border-b border-[#f0f0f2]">
                <span className="font-medium text-[#1d1d1f]">RLS Defense in Depth:</span>
                <Badge variant="success">Active (18/18 Tables)</Badge>
              </div>
              <div className="flex justify-between items-center py-1 border-b border-[#f0f0f2]">
                <span className="font-medium text-[#1d1d1f]">Service Role Key Isolation:</span>
                <Badge variant="success">Secured (Server-Only)</Badge>
              </div>
              <div className="flex justify-between items-center py-1">
                <span className="font-medium text-[#1d1d1f]">Quiz Answer Privacy Shield:</span>
                <Badge variant="success">Enforced (Zero Leakage)</Badge>
              </div>
            </div>
          </Card>

          {/* Cloudflare Storage & CDN */}
          <Card hoverable={false} className="p-6 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#0066cc]/10 flex items-center justify-center text-[#0066cc]">
                <Cloud className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-base font-semibold text-[#1d1d1f]">Cloudflare R2 & Video Stream Delivery</h2>
                <p className="text-xs text-[#7a7a7a]">Edge storage partitions and signed media tokenization</p>
              </div>
            </div>

            <div className="rounded-xl bg-[#fafafc] border border-[#e5e5e7] p-4 space-y-2 text-xs">
              <div className="flex justify-between items-center py-1 border-b border-[#f0f0f2]">
                <span className="font-medium text-[#1d1d1f]">Presigned URL TTL:</span>
                <span className="font-mono text-[#1d1d1f]">900 seconds (15 mins)</span>
              </div>
              <div className="flex justify-between items-center py-1 border-b border-[#f0f0f2]">
                <span className="font-medium text-[#1d1d1f]">Max Submission Payload:</span>
                <span className="font-mono text-[#1d1d1f]">25 MB (PDF, ZIP)</span>
              </div>
              <div className="flex justify-between items-center py-1">
                <span className="font-medium text-[#1d1d1f]">Video CDN Cache Policy:</span>
                <span className="font-mono text-[#1d1d1f]">HLS Adaptive Bitrate Stream</span>
              </div>
            </div>

            <div className="pt-2 flex justify-end">
              <Button variant="primary" size="md" className="gap-2">
                <Save className="w-4 h-4" /> Save Configuration
              </Button>
            </div>
          </Card>
        </div>
      </main>
    </div>
  )
}
