import Link from "next/link"
import { PlayCircle, FileText, CheckCircle2, ChevronRight, Download, ArrowLeft } from "lucide-react"
import { StudentNavbar } from "@/components/layout/student-navbar"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

export default function LessonViewerPage() {
  const lesson = {
    id: "les-12",
    title: "Database Row-Level Security in Practice",
    chapter: "Chapter 3: Security & Authorization",
    course: "Advanced Full-Stack Engineering with Next.js & PostgreSQL",
    duration: "18 minutes",
    status: "completed",
    videoStreamUid: "cloudflare-stream-mock-uid-789",
    resources: [
      { id: "res-1", title: "RLS Architecture Handout.pdf", size: "2.4 MB", type: "pdf" },
      { id: "res-2", title: "PostgreSQL Migration Template.sql", size: "18 KB", type: "sql" }
    ],
    notes: `### Essential Takeaways

1. **Defense in Depth**: Always enforce authentication and authorization both at the API boundary and at the PostgreSQL database layer using Row Level Security (RLS).
2. **Never Trust Client Inputs**: Input IDs supplied by client requests must always be authorized against the authenticated user ID obtained securely from \`supabase.auth.getUser()\`.
3. **Prevent Service Role Key Leaks**: Service role keys have root bypass privileges and must **never** be exposed in client code or public environment variables.
`
  }

  const syllabus = [
    { id: "les-10", title: "Session Handling & HttpOnly Cookies", duration: "14 mins", completed: true },
    { id: "les-11", title: "Role-Based Access Control Boundaries", duration: "22 mins", completed: true },
    { id: "les-12", title: "Database Row-Level Security in Practice", duration: "18 mins", completed: true, active: true },
    { id: "les-13", title: "Assignment 3: Implement Zero-Trust RLS Policies", duration: "Hands-on", completed: false, isAssignment: true },
    { id: "les-14", title: "Quiz 2: Row Level Security Best Practices", duration: "15 mins", completed: false, isQuiz: true },
  ]

  return (
    <div className="min-h-screen bg-[#f5f5f7]">
      <StudentNavbar />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
        {/* Breadcrumb Header */}
        <div className="flex items-center space-x-2 text-xs text-[#7a7a7a]">
          <Link href="/courses" className="hover:text-[#1d1d1f] flex items-center gap-1">
            <ArrowLeft className="w-3.5 h-3.5" /> Back to Course
          </Link>
          <span>/</span>
          <span>{lesson.chapter}</span>
          <span>/</span>
          <span className="text-[#1d1d1f] font-medium">{lesson.title}</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Media & Content Area (2 Cols) */}
          <div className="lg:col-span-2 space-y-6">
            {/* Video Player Container */}
            <div className="relative aspect-video w-full rounded-2xl bg-black overflow-hidden shadow-lg flex items-center justify-center text-white">
              <div className="text-center space-y-3 p-6">
                <PlayCircle className="w-16 h-16 mx-auto text-[#0066cc] cursor-pointer hover:scale-105 transition-transform" />
                <p className="text-sm font-medium">Cloudflare Stream Player Ready</p>
                <p className="text-xs text-[#7a7a7a]">Stream UID: {lesson.videoStreamUid} &bull; 1080p HLS Signed Delivery</p>
              </div>
            </div>

            {/* Lesson Title & Action Bar */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-4 border-b border-[#e5e5e7]">
              <div>
                <h1 className="text-2xl font-bold tracking-tight text-[#1d1d1f]">{lesson.title}</h1>
                <p className="text-xs text-[#7a7a7a] mt-1">{lesson.course} &bull; {lesson.duration}</p>
              </div>
              <Button variant="primary" size="md" className="gap-2">
                <CheckCircle2 className="w-4 h-4" />
                Mark Completed
              </Button>
            </div>

            {/* Notes & Rich Documentation */}
            <Card hoverable={false} className="p-6">
              <h2 className="text-lg font-semibold text-[#1d1d1f] mb-3">Lesson Notes & Summary</h2>
              <div className="prose prose-sm max-w-none text-[#333333] space-y-2 leading-relaxed">
                <div dangerouslySetInnerHTML={{ __html: lesson.notes.replace(/\n/g, '<br/>') }} />
              </div>
            </Card>

            {/* Downloadable Resources from Cloudflare R2 */}
            <Card hoverable={false} className="p-6">
              <h3 className="text-sm font-semibold text-[#1d1d1f] mb-3">Class Handouts & Files (Secure R2)</h3>
              <div className="space-y-3">
                {lesson.resources.map((res) => (
                  <div key={res.id} className="flex items-center justify-between p-3 rounded-xl bg-[#f5f5f7] border border-[#e5e5e7]">
                    <div className="flex items-center gap-3">
                      <FileText className="w-5 h-5 text-[#0066cc]" />
                      <div>
                        <p className="text-sm font-medium text-[#1d1d1f]">{res.title}</p>
                        <p className="text-xs text-[#7a7a7a]">{res.size}</p>
                      </div>
                    </div>
                    <Button variant="secondary" size="sm" className="gap-1.5">
                      <Download className="w-3.5 h-3.5" /> Download
                    </Button>
                  </div>
                ))}
              </div>
            </Card>
          </div>

          {/* Curriculum Sidebar Navigation (1 Col) */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-[#7a7a7a]">Chapter Lessons</h3>
            <div className="bg-white rounded-2xl border border-black/[0.06] overflow-hidden shadow-sm">
              <div className="divide-y divide-[#f0f0f2]">
                {syllabus.map((item) => (
                  <Link
                    key={item.id}
                    href="#"
                    className={`block p-4 transition-colors ${
                      item.active ? "bg-[#0066cc]/5 border-l-4 border-[#0066cc]" : "hover:bg-[#fafafc]"
                    }`}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div className="space-y-1">
                        <p className={`text-sm font-medium leading-snug ${item.active ? "text-[#0066cc]" : "text-[#1d1d1f]"}`}>
                          {item.title}
                        </p>
                        <span className="text-xs text-[#7a7a7a]">{item.duration}</span>
                      </div>
                      {item.completed ? (
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      ) : (
                        <div className="w-4 h-4 rounded-full border border-[#e5e5e7] shrink-0 mt-0.5" />
                      )}
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
