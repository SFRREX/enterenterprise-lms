import Link from "next/link"
import { TeacherSidebar } from "@/components/layout/teacher-sidebar"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { BookOpen, Layers, Plus, Eye } from "lucide-react"

export default function TeacherCoursesPage() {
  const courses = [
    {
      id: "crs-1",
      title: "Advanced Full-Stack Engineering with Next.js & PostgreSQL",
      batch: "Cohort 2026-Alpha",
      chaptersCount: 6,
      lessonsCount: 32,
      activeLearners: 142
    },
    {
      id: "crs-4",
      title: "Distributed Systems Design & Microservices Architecture",
      batch: "Cohort 2026-Alpha",
      chaptersCount: 4,
      lessonsCount: 22,
      activeLearners: 98
    }
  ]

  return (
    <div className="flex min-h-screen bg-[#f5f5f7]">
      <TeacherSidebar />

      <main className="flex-1 p-8 space-y-8 overflow-y-auto">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-[#1d1d1f]">My Assigned Courses</h1>
            <p className="text-sm text-[#7a7a7a] mt-0.5">
              Upload video lectures, attach R2 handouts, and structure syllabus chapters.
            </p>
          </div>
          <Button variant="primary" size="md" className="gap-2">
            <Plus className="w-4 h-4" /> Add Chapter / Lesson
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {courses.map((c) => (
            <Card key={c.id} className="p-6 flex flex-col justify-between">
              <div className="space-y-3">
                <Badge variant="default">{c.batch}</Badge>
                <h2 className="text-lg font-bold text-[#1d1d1f] tracking-tight">{c.title}</h2>
                <div className="flex items-center gap-4 text-xs text-[#7a7a7a] pt-2 border-t border-[#f0f0f2]">
                  <span>{c.chaptersCount} Chapters</span>
                  <span>&bull;</span>
                  <span>{c.lessonsCount} Lessons</span>
                  <span>&bull;</span>
                  <span>{c.activeLearners} Active Students</span>
                </div>
              </div>

              <div className="pt-6 flex gap-3">
                <Link href={`/courses/${c.id}`} className="flex-1">
                  <Button variant="secondary" size="sm" className="w-full gap-1">
                    <Eye className="w-3.5 h-3.5" /> View as Student
                  </Button>
                </Link>
                <Button variant="primary" size="sm" className="flex-1">
                  Edit Curriculum
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </main>
    </div>
  )
}
