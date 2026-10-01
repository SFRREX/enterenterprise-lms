import { Pin } from "lucide-react"
import { StudentNavbar } from "@/components/layout/student-navbar"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export default function StudentAnnouncementsPage() {
  const announcements: any[] = []

  return (
    <div className="min-h-screen bg-[#f5f5f7]">
      <StudentNavbar />

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight text-[#1d1d1f]">Institutional Announcements</h1>
          <p className="text-[#7a7a7a] mt-1 text-sm">
            Official cohort notifications, maintenance alerts, and academic schedule updates.
          </p>
        </div>

        {announcements.length === 0 ? (
          <div className="bg-white rounded-2xl border border-black/[0.06] p-12 text-center shadow-sm">
            <h3 className="text-base font-semibold text-[#1d1d1f]">No Announcements Broadcasted</h3>
            <p className="text-sm text-[#7a7a7a] mt-1 max-w-sm mx-auto">
              There are currently no active administrative notices or schedule bulletins published for your cohort.
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {announcements.map((a) => (
              <Card key={a.id} hoverable={false} className="p-6 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    {a.pinned && (
                      <Badge variant="warning" className="gap-1">
                        <Pin className="w-3 h-3" /> Pinned
                      </Badge>
                    )}
                    <span className="text-xs text-[#7a7a7a]">{a.date}</span>
                  </div>
                  <span className="text-xs font-medium text-[#0066cc]">{a.author}</span>
                </div>

                <h2 className="text-lg font-bold text-[#1d1d1f] tracking-tight">{a.title}</h2>
                <p className="text-sm text-[#333333] leading-relaxed">{a.body}</p>
              </Card>
            ))}
          </div>
        )}
      </main>
    </div>
  )
}
