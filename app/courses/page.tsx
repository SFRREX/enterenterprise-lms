import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { StudentNavbar } from "@/components/layout/student-navbar"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

export default function CoursesPage() {
  const courses: any[] = []

  return (
    <div className="min-h-screen bg-[#f5f5f7]">
      <StudentNavbar />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight text-[#1d1d1f]">My Courses</h1>
          <p className="text-[#7a7a7a] mt-1 text-sm">
            Curriculum and lecture series assigned to your active cohort.
          </p>
        </div>

        {courses.length === 0 ? (
          <div className="bg-white rounded-2xl border border-black/[0.06] p-12 text-center shadow-sm">
            <h3 className="text-base font-semibold text-[#1d1d1f]">No Courses Available</h3>
            <p className="text-sm text-[#7a7a7a] mt-1 max-w-sm mx-auto">
              There are currently no active courses assigned to your cohort. Contact your institutional administrator to enroll.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {courses.map((course) => (
              <Card key={course.id} className="flex flex-col justify-between">
                <CardHeader>
                  <div className="flex justify-between items-start mb-2">
                    <Badge variant={course.progress > 0 ? "default" : "neutral"}>
                      {course.tag}
                    </Badge>
                    {course.progress > 0 && (
                      <span className="text-xs font-semibold text-[#0066cc]">{course.progress}%</span>
                    )}
                  </div>
                  <CardTitle className="line-clamp-2 leading-snug">
                    {course.title}
                  </CardTitle>
                  <p className="text-xs text-[#7a7a7a] mt-1">Instructor: {course.instructor}</p>
                  <p className="text-xs text-[#333333] mt-3 line-clamp-3 leading-relaxed">
                    {course.description}
                  </p>
                </CardHeader>

                <CardContent className="space-y-4">
                  {course.progress > 0 ? (
                    <div className="space-y-1.5">
                      <div className="w-full bg-[#f0f0f2] h-2 rounded-full overflow-hidden">
                        <div
                          className="bg-[#0066cc] h-full rounded-full"
                          style={{ width: `${course.progress}%` }}
                        />
                      </div>
                      <div className="flex justify-between text-xs text-[#7a7a7a]">
                        <span>{course.completedLessons}/{course.totalLessons} Lessons</span>
                      </div>
                    </div>
                  ) : (
                    <div className="text-xs text-[#7a7a7a]">Not yet started &bull; {course.totalLessons} Lessons</div>
                  )}

                  <Link href={`/courses/${course.id}`} className="block pt-2">
                    <Button variant="secondary" size="md" className="w-full justify-between">
                      <span>{course.progress > 0 ? "Continue Course" : "Start Course"}</span>
                      <ArrowRight className="w-4 h-4" />
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </main>
    </div>
  )
}
