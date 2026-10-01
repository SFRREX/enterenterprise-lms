import Link from "next/link"
import { PlayCircle, Clock, CheckCircle2, ArrowRight } from "lucide-react"
import { StudentNavbar } from "@/components/layout/student-navbar"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

import { cookies } from "next/headers"
import { AUTH_COOKIE_NAME } from "@/lib/auth"

export default async function StudentDashboardPage() {
  const cookieStore = await cookies()
  const sessionCookie = cookieStore.get(AUTH_COOKIE_NAME)
  let studentName = "Student"

  if (sessionCookie?.value) {
    try {
      const decoded = JSON.parse(decodeURIComponent(sessionCookie.value))
      if (decoded.name) studentName = decoded.name
    } catch {
      // fallback
    }
  }

  const currentBatch = {
    name: "Cohort 2026-Alpha",
    code: "BATCH-26A",
    progress: 68,
  }

  const activeCourses: any[] = []
  const upcomingDeadlines: any[] = []

  return (
    <div className="min-h-screen bg-[#f5f5f7]">
      <StudentNavbar />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
        {/* Welcome Section */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-semibold tracking-tight text-[#1d1d1f]">
              Welcome back, {studentName}
            </h1>
            <p className="text-[#7a7a7a] mt-1 text-sm">
              Student Workspace &bull; Track enrolled courses and upcoming coursework.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Link href="/courses">
              <Button variant="secondary" size="md">Browse All Courses</Button>
            </Link>
          </div>
        </div>

        {/* Resumption Banner / Welcome Banner */}
        <div className="relative overflow-hidden rounded-[18px] bg-[#272729] text-white p-8 sm:p-10 border border-white/10 card-elevation-lg">
          <div className="relative z-10 max-w-2xl space-y-4">
            <span className="inline-block text-[11px] font-semibold uppercase tracking-wider px-3 py-1 rounded-full bg-[#0066cc] text-white">
              Academic Dashboard
            </span>
            <h2 className="text-[28px] sm:text-[34px] font-semibold tracking-[-0.374px] leading-tight">
              Start Your Learning Journey
            </h2>
            <p className="text-[17px] text-[#cccccc] leading-relaxed">
              Explore your institution&apos;s accredited curriculum or check in with your faculty advisors.
            </p>
            <div className="pt-2 flex flex-wrap items-center gap-4">
              <Link href="/courses">
                <Button variant="primary" size="lg" className="gap-2">
                  <PlayCircle className="w-5 h-5" />
                  Explore Courses
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

            {activeCourses.length === 0 ? (
              <div className="bg-white rounded-2xl border border-black/[0.06] p-10 text-center shadow-sm">
                <h4 className="text-base font-semibold text-[#1d1d1f]">No Courses Enrolled</h4>
                <p className="text-sm text-[#7a7a7a] mt-1 max-w-sm mx-auto mb-4">
                  You are not currently enrolled in any courses. Browse available courses or contact your administrator.
                </p>
                <Link href="/courses">
                  <Button variant="primary" size="sm">Browse Catalog</Button>
                </Link>
              </div>
            ) : (
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
            )}
          </div>

          {/* Upcoming Deadlines & Tasks (1 Column) */}
          <div className="space-y-6">
            <h3 className="text-xl font-semibold text-[#1d1d1f]">Deadlines & Tasks</h3>
            <div className="space-y-4">
              {upcomingDeadlines.length === 0 ? (
                <div className="bg-white rounded-2xl border border-black/[0.06] p-8 text-center shadow-sm">
                  <div className="w-10 h-10 rounded-full bg-emerald-500/10 flex items-center justify-center text-emerald-600 mx-auto mb-2">
                    <CheckCircle2 className="w-5 h-5" />
                  </div>
                  <h5 className="text-sm font-semibold text-[#1d1d1f]">All Caught Up!</h5>
                  <p className="text-xs text-[#7a7a7a] mt-1">No upcoming deadlines or pending assignments.</p>
                </div>
              ) : (
                upcomingDeadlines.map((task) => (
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
                ))
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
