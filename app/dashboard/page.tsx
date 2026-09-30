import Link from "next/link"
import { PlayCircle, Clock, CheckCircle2, ArrowRight } from "lucide-react"
import { StudentNavbar } from "@/components/layout/student-navbar"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

export default function StudentDashboardPage() {
  const currentBatch = {
    name: "Cohort 2026-Alpha",
    code: "BATCH-26A",
    progress: 68,
  }

  const activeCourses = [
    {
      id: "crs-1",
      title: "Advanced Full-Stack Engineering with Next.js & PostgreSQL",
      instructor: "Dr. Evelyn Reed",
      progress: 74,
      totalLessons: 32,
      completedLessons: 24,
      nextLesson: {
        id: "les-12",
        title: "Database Row-Level Security in Practice",
        chapter: "Chapter 3: Security & Authorization",
        type: "video",
        duration: "18 mins"
      }
    },
    {
      id: "crs-2",
      title: "Cloud Infrastructure, Distributed Systems & Edge R2",
      instructor: "Marcus Vance",
      progress: 45,
      totalLessons: 20,
      completedLessons: 9,
      nextLesson: {
        id: "les-5",
        title: "Configuring Presigned URLs with Cloudflare R2",
        chapter: "Chapter 2: Object Storage Architecture",
        type: "notes",
        duration: "12 mins"
      }
    }
  ]

  const upcomingDeadlines = [
    {
      id: "asg-1",
      title: "Assignment 3: Implement Zero-Trust RLS Policies",
      course: "Advanced Full-Stack Engineering",
      dueDate: "Tomorrow at 23:59",
      urgency: "warning",
    },
    {
      id: "qz-1",
      title: "Quiz 2: Distributed Database Replication & Indexes",
      course: "Cloud Infrastructure",
      dueDate: "In 3 days",
      urgency: "default",
    }
  ]

  return (
    <div className="min-h-screen bg-[#f5f5f7]">
      <StudentNavbar />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
        {/* Welcome Section */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-semibold tracking-tight text-[#1d1d1f]">
              Welcome back, Alex
            </h1>
            <p className="text-[#7a7a7a] mt-1 text-sm">
              Enrolled in <span className="font-medium text-[#1d1d1f]">{currentBatch.name}</span> ({currentBatch.code})
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Link href="/courses">
              <Button variant="secondary" size="md">Browse All Courses</Button>
            </Link>
          </div>
        </div>

        {/* Resumption Card (High priority LMS UX Pattern) */}
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-[#1d1d1f] to-[#272729] text-white p-8 sm:p-10 shadow-xl">
          <div className="relative z-10 max-w-2xl space-y-4">
            <Badge variant="default" className="bg-[#0066cc] text-white">
              Pick up where you left off
            </Badge>
            <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight">
              {activeCourses[0].nextLesson.title}
            </h2>
            <p className="text-sm text-[#cccccc]">
              {activeCourses[0].title} &bull; {activeCourses[0].nextLesson.chapter}
            </p>
            <div className="pt-2 flex flex-wrap items-center gap-4">
              <Link href={`/courses/${activeCourses[0].id}/lessons/${activeCourses[0].nextLesson.id}`}>
                <Button variant="primary" size="lg" className="gap-2">
                  <PlayCircle className="w-5 h-5" />
                  Resume Lesson ({activeCourses[0].nextLesson.duration})
                </Button>
              </Link>
            </div>
          </div>
        </div>

        {/* Course Progress & Due Items Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Active Courses (2 Columns) */}
          <div className="lg:col-span-2 space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-semibold text-[#1d1d1f]">My Active Courses</h3>
              <Link href="/courses" className="text-sm font-medium text-[#0066cc] hover:underline flex items-center gap-1">
                View all <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {activeCourses.map((course) => (
                <Card key={course.id} className="flex flex-col justify-between">
                  <CardHeader>
                    <div className="flex justify-between items-start mb-2">
                      <Badge variant="neutral">Active Cohort</Badge>
                      <span className="text-xs font-semibold text-[#0066cc]">{course.progress}%</span>
                    </div>
                    <CardTitle className="line-clamp-2 leading-snug">
                      {course.title}
                    </CardTitle>
                    <p className="text-xs text-[#7a7a7a] mt-1">{course.instructor}</p>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {/* Progress Bar */}
                    <div className="w-full bg-[#f0f0f2] h-2 rounded-full overflow-hidden">
                      <div
                        className="bg-[#0066cc] h-full rounded-full transition-all duration-300"
                        style={{ width: `${course.progress}%` }}
                      />
                    </div>
                    <div className="flex justify-between text-xs text-[#7a7a7a]">
                      <span>{course.completedLessons} of {course.totalLessons} lessons completed</span>
                    </div>

                    <Link href={`/courses/${course.id}`} className="block pt-2">
                      <Button variant="secondary" size="sm" className="w-full">
                        Open Course
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Upcoming Deadlines & Tasks (1 Column) */}
          <div className="space-y-6">
            <h3 className="text-xl font-semibold text-[#1d1d1f]">Deadlines & Tasks</h3>
            <div className="space-y-4">
              {upcomingDeadlines.map((task) => (
                <Card key={task.id} hoverable={false} className="p-4 border-[#e5e5e7]">
                  <div className="flex items-start justify-between gap-2">
                    <div className="space-y-1">
                      <p className="text-xs font-semibold text-[#7a7a7a]">{task.course}</p>
                      <h4 className="text-sm font-semibold text-[#1d1d1f] leading-snug">{task.title}</h4>
                      <div className="flex items-center gap-1.5 text-xs text-amber-600 font-medium pt-1">
                        <Clock className="w-3.5 h-3.5" />
                        Due {task.dueDate}
                      </div>
                    </div>
                    <Badge variant={task.urgency === "warning" ? "warning" : "default"}>
                      Action
                    </Badge>
                  </div>
                </Card>
              ))}

              <div className="p-4 rounded-2xl bg-white border border-[#e5e5e7] flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-emerald-500/10 flex items-center justify-center text-emerald-600">
                    <CheckCircle2 className="w-4 h-4" />
                  </div>
                  <div>
                    <h5 className="text-sm font-semibold text-[#1d1d1f]">All Quizzes Passed</h5>
                    <p className="text-xs text-[#7a7a7a]">100% on Chapter 2 Quiz</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
