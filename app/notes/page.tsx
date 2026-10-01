import { Download } from "lucide-react"
import { StudentNavbar } from "@/components/layout/student-navbar"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

export default function StudentNotesPage() {
  const notes = [
    {
      id: "note-1",
      title: "Zero-Trust Architecture & PostgreSQL RLS Cheat Sheet",
      course: "Advanced Full-Stack Engineering with Next.js & PostgreSQL",
      chapter: "Chapter 3: Security & Authorization",
      lastUpdated: "Sep 28, 2026",
      size: "240 KB",
      preview: "Summary of auth.uid() scoping, security definer functions, and compound primary keys."
    },
    {
      id: "note-2",
      title: "Cloudflare R2 S3-Compatible SDK & Presigned Tokens",
      course: "Cloud Infrastructure, Distributed Systems & Edge R2",
      chapter: "Chapter 2: Object Storage Architecture",
      lastUpdated: "Sep 22, 2026",
      size: "185 KB",
      preview: "Guide on configuring S3Client with Cloudflare endpoints, bucket policies, and 15-minute TTL signatures."
    },
    {
      id: "note-3",
      title: "Next.js App Router Server Component Optimization",
      course: "Advanced Full-Stack Engineering with Next.js & PostgreSQL",
      chapter: "Chapter 1: Foundations & Architecture",
      lastUpdated: "Sep 15, 2026",
      size: "310 KB",
      preview: "Isolating 'use client' boundaries to leaf interactive components to maximize server-side rendering performance."
    }
  ]

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
      </main>
    </div>
  )
}
