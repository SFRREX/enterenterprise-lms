import { Download } from "lucide-react"
import { StudentNavbar } from "@/components/layout/student-navbar"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

export default function StudentNotesPage() {
  const notes: any[] = []

  return (
    <div className="min-h-screen bg-[#f5f5f7]">
      <StudentNavbar />

      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight text-[#1d1d1f]">Class Notes & Reference Docs</h1>
          <p className="text-[#7a7a7a] mt-1 text-sm">
            Curated lecture summaries, technical cheat sheets, and downloadable course guides.
          </p>
        </div>

        {notes.length === 0 ? (
          <div className="bg-white rounded-2xl border border-black/[0.06] p-12 text-center shadow-sm">
            <h3 className="text-base font-semibold text-[#1d1d1f]">No Reference Notes Available</h3>
            <p className="text-sm text-[#7a7a7a] mt-1 max-w-sm mx-auto">
              Instructors will publish lecture notes, technical guides, and cheat sheets as courses progress.
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {notes.map((note) => (
              <Card key={note.id} hoverable={false} className="p-6">
                <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Badge variant="default">{note.chapter}</Badge>
                      <span className="text-xs text-[#7a7a7a]">{note.course}</span>
                    </div>

                    <h2 className="text-lg font-bold text-[#1d1d1f] tracking-tight">{note.title}</h2>
                    <p className="text-xs text-[#333333] leading-relaxed max-w-3xl">{note.preview}</p>

                    <div className="flex items-center gap-4 text-xs text-[#7a7a7a] pt-2">
                      <span>Updated: {note.lastUpdated}</span>
                      <span>&bull;</span>
                      <span>File Size: {note.size}</span>
                    </div>
                  </div>

                  <div className="shrink-0 pt-2">
                    <Button variant="secondary" size="md" className="gap-2">
                      <Download className="w-4 h-4" /> Download PDF Note
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}
      </main>
    </div>
  )
}
