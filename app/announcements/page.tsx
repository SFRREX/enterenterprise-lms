import { Pin } from "lucide-react"
import { StudentNavbar } from "@/components/layout/student-navbar"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export default function StudentAnnouncementsPage() {
  const announcements = [
    {
      id: "ann-1",
      title: "Upcoming Maintenance: PostgreSQL Read Replica Optimization",
      date: "Sep 29, 2026",
      author: "ELMS Infrastructure Operations",
      pinned: true,
      body: "A scheduled performance upgrade on database indexes will take place on Saturday from 02:00 UTC to 03:00 UTC. Live quizzes and lesson progress tracking will remain uninterrupted."
    },
    {
      id: "ann-2",
      title: "Assignment 3 Deadline Extended by 24 Hours",
      date: "Sep 27, 2026",
      author: "Dr. Evelyn Reed (Faculty Lead)",
      pinned: false,
      body: "Due to the depth of the Row-Level Security policy implementation, the deadline for Assignment 3 is extended to tomorrow at 23:59 UTC. Be sure to test your test suites thoroughly."
    },
    {
      id: "ann-3",
      title: "Guest Lecture: Edge Storage & Cloudflare Workers Architecture",
      date: "Sep 20, 2026",
      author: "Marcus Vance (Instructor)",
      pinned: false,
      body: "Join us this Thursday at 16:00 UTC for an interactive session on low-latency asset streaming directly from global edge caches."
    }
  ]

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
      </main>
    </div>
  )
}
