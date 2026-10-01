import Link from "next/link"
import { notFound } from "next/navigation"
import { 
  PlayCircle, 
  FileText, 
  CheckCircle2, 
  Clock, 
  BookOpen, 
  ChevronRight, 
  Award, 
  ArrowLeft,
  Users,
  ShieldCheck,
  Download
} from "lucide-react"
import { StudentNavbar } from "@/components/layout/student-navbar"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

interface CourseDetail {
  id: string
  title: string
  subtitle: string
  description: string
  instructor: string
  instructorTitle: string
  cohort: string
  duration: string
  totalLessons: number
  completedLessons: number
  progress: number
  syllabus: {
    id: string
    title: string
    lessons: {
      id: string
      title: string
      duration: string
      completed: boolean
      type: "video" | "notes" | "assignment" | "quiz"
    }[]
  }[]
}

const COURSES_DATA: Record<string, CourseDetail> = {
  "crs-1": {
    id: "crs-1",
    title: "Advanced Full-Stack Engineering with Next.js & PostgreSQL",
    subtitle: "App Router, Zero-Trust RLS Policies, Edge Runtime, and Scalable Schema Modeling",
    description: "Designed for engineering leads and full-stack architects. This curriculum covers Next.js 16 core paradigms, strict relational database integrity, row level security enforcement at the PostgreSQL kernel, and Cloudflare R2 object ingestion.",
    instructor: "Dr. Evelyn Reed",
    instructorTitle: "Principal Systems Architect & Chair of Computing",
    cohort: "Cohort 2026-Alpha",
    duration: "12 Weeks (Self-paced & Cohort Tracks)",
    totalLessons: 32,
    completedLessons: 24,
    progress: 74,
    syllabus: [
      {
        id: "mod-1",
        title: "Module 1: High-Performance Next.js Architecture",
        lessons: [
          { id: "les-1", title: "App Router Server Components & Data Boundaries", duration: "24 mins", completed: true, type: "video" },
          { id: "les-2", title: "Server Actions and Safe Form Mutations", duration: "19 mins", completed: true, type: "video" },
          { id: "les-3", title: "Static Generation & Turbopack In-Memory Optimization", duration: "15 mins", completed: true, type: "notes" }
        ]
      },
      {
        id: "mod-2",
        title: "Module 2: Zero-Trust Database Engineering",
        lessons: [
          { id: "les-10", title: "Session Handling & HttpOnly Cookies", duration: "14 mins", completed: true, type: "video" },
          { id: "les-11", title: "Role-Based Access Control (RBAC) Boundaries", duration: "22 mins", completed: true, type: "video" },
          { id: "les-12", title: "Database Row-Level Security in Practice", duration: "18 mins", completed: true, type: "video" },
          { id: "les-13", title: "Assignment 3: Implement Zero-Trust RLS Policies", duration: "Hands-on", completed: false, type: "assignment" },
          { id: "les-14", title: "Quiz 2: Row Level Security Best Practices", duration: "15 mins", completed: false, type: "quiz" }
        ]
      },
      {
        id: "mod-3",
        title: "Module 3: Edge Streaming & Media Distribution",
        lessons: [
          { id: "les-20", title: "Presigned URL Generation for Direct S3/R2 Ingestion", duration: "26 mins", completed: false, type: "video" },
          { id: "les-21", title: "HLS Adaptive Bitrate Delivery with Video Workers", duration: "31 mins", completed: false, type: "video" }
        ]
      }
    ]
  },
  "crs-2": {
    id: "crs-2",
    title: "Cloud Infrastructure, Distributed Systems & Edge R2",
    subtitle: "Cloudflare Workers, Presigned S3 Tokens, CDN Caching, and Global Latency Tuning",
    description: "An intensive systems course covering edge compute architectures, ephemeral token rotation, presigned direct uploads, and distributed caching topologies.",
    instructor: "Marcus Vance",
    instructorTitle: "Director of Infrastructure Engineering",
    cohort: "Cohort 2026-Alpha",
    duration: "8 Weeks",
    totalLessons: 20,
    completedLessons: 9,
    progress: 45,
    syllabus: [
      {
        id: "mod-1",
        title: "Module 1: Edge Computing & Presigned S3 Architecture",
        lessons: [
          { id: "les-5", title: "Configuring Presigned URLs with Cloudflare R2", duration: "12 mins", completed: true, type: "notes" },
          { id: "les-6", title: "Content-Length & MIME Type Whitelisting", duration: "18 mins", completed: true, type: "video" },
          { id: "les-7", title: "Ephemeral Credential Lifecycles & Expiration", duration: "25 mins", completed: false, type: "video" }
        ]
      }
    ]
  },
  "crs-3": {
    id: "crs-3",
    title: "Secure Authentication, Cryptography & JWT Systems",
    subtitle: "Cryptographic Keys, Public Key Infrastructure, HttpOnly Sessions, and Tamper-Proof Badges",
    description: "Master modern cryptographic foundations, public key verification algorithms, and secure enterprise single sign-on mechanisms.",
    instructor: "Sarah Jenkins",
    instructorTitle: "Senior Cryptography & Security Fellow",
    cohort: "Cohort 2026-Alpha",
    duration: "6 Weeks",
    totalLessons: 18,
    completedLessons: 0,
    progress: 0,
    syllabus: [
      {
        id: "mod-1",
        title: "Module 1: Authentication Primitives",
        lessons: [
          { id: "les-30", title: "Symmetric vs Asymmetric Key Token Signing", duration: "20 mins", completed: false, type: "video" },
          { id: "les-31", title: "Preventing Cross-Site Scripting (XSS) Session Hijacking", duration: "25 mins", completed: false, type: "video" }
        ]
      }
    ]
  }
}

export default async function CourseDetailPage({
  params,
}: {
  params: Promise<{ courseId: string }>
}) {
  const { courseId } = await params
  const course = COURSES_DATA[courseId]

  if (!course) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-[#f5f5f7]">
      <StudentNavbar />

      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
        {/* Breadcrumb Navigation */}
        <div className="flex items-center space-x-2 text-xs text-[#7a7a7a]">
          <Link href="/courses" className="hover:text-[#1d1d1f] flex items-center gap-1 transition-colors">
            <ArrowLeft className="w-3.5 h-3.5" /> All Courses
          </Link>
          <span>/</span>
          <span className="text-[#1d1d1f] font-medium truncate max-w-sm">{course.title}</span>
        </div>

        {/* Hero Section */}
        <div className="bg-white rounded-3xl p-8 border border-black/[0.06] shadow-[0_4px_24px_rgba(0,0,0,0.03)] space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <Badge variant={course.progress > 0 ? "default" : "neutral"}>
                {course.cohort}
              </Badge>
              <Badge variant="outline">{course.duration}</Badge>
            </div>
            {course.progress > 0 && (
              <span className="text-xs font-semibold text-[#0066cc]">
                {course.progress}% Completed ({course.completedLessons}/{course.totalLessons} Lessons)
              </span>
            )}
          </div>

          <div className="space-y-3">
            <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight text-[#1d1d1f] leading-tight">
              {course.title}
            </h1>
            <p className="text-base sm:text-lg text-[#7a7a7a] font-normal leading-relaxed">
              {course.subtitle}
            </p>
          </div>

          {/* Progress bar */}
          {course.progress > 0 && (
            <div className="w-full bg-[#f0f0f2] h-2 rounded-full overflow-hidden">
              <div 
                className="bg-[#0066cc] h-full rounded-full transition-all duration-500" 
                style={{ width: `${course.progress}%` }} 
              />
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 border-t border-[#f0f0f2] text-xs">
            <div>
              <span className="text-[#7a7a7a] block">Instructor</span>
              <span className="font-semibold text-[#1d1d1f] text-sm mt-0.5 block">{course.instructor}</span>
              <span className="text-[#86868b]">{course.instructorTitle}</span>
            </div>
            <div>
              <span className="text-[#7a7a7a] block">Curriculum Depth</span>
              <span className="font-semibold text-[#1d1d1f] text-sm mt-0.5 block">{course.totalLessons} Core Units</span>
              <span className="text-[#86868b]">Hands-on Labs &amp; Quizzes</span>
            </div>
            <div className="flex items-center md:justify-end">
              <Link href={`/courses/${course.id}/lessons/les-12`} className="w-full md:w-auto">
                <Button variant="primary" size="md" className="w-full md:w-auto">
                  <span>Resume Curriculum</span>
                  <ChevronRight className="w-4 h-4 ml-1" />
                </Button>
              </Link>
            </div>
          </div>
        </div>

        {/* Course Overview & Syllabus Breakdown */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <h2 className="text-xl font-bold tracking-tight text-[#1d1d1f]">Course Syllabus &amp; Modules</h2>

            <div className="space-y-4">
              {course.syllabus.map((mod) => (
                <Card key={mod.id} hoverable={false} className="p-6 space-y-4">
                  <h3 className="text-base font-semibold text-[#1d1d1f]">{mod.title}</h3>
                  <div className="divide-y divide-[#f0f0f2]">
                    {mod.lessons.map((les) => (
                      <div key={les.id} className="py-3 flex items-center justify-between text-sm group">
                        <div className="flex items-center space-x-3">
                          {les.completed ? (
                            <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                          ) : (
                            <PlayCircle className="w-4 h-4 text-[#86868b] group-hover:text-[#0066cc] flex-shrink-0 transition-colors" />
                          )}
                          <Link 
                            href={`/courses/${course.id}/lessons/${les.id}`} 
                            className="font-medium text-[#1d1d1f] hover:text-[#0066cc] transition-colors"
                          >
                            {les.title}
                          </Link>
                        </div>
                        <div className="flex items-center space-x-3 text-xs text-[#86868b]">
                          <span>{les.duration}</span>
                          <Link 
                            href={`/courses/${course.id}/lessons/${les.id}`}
                            className="text-[#0066cc] hover:underline flex items-center"
                          >
                            Start <ChevronRight className="w-3.5 h-3.5" />
                          </Link>
                        </div>
                      </div>
                    ))}
                  </div>
                </Card>
              ))}
            </div>
          </div>

          {/* Sidebar Info */}
          <div className="space-y-6">
            <Card hoverable={false} className="p-6 space-y-4">
              <h3 className="text-base font-semibold text-[#1d1d1f]">About This Course</h3>
              <p className="text-xs text-[#7a7a7a] leading-relaxed">
                {course.description}
              </p>
              <div className="pt-2 border-t border-[#f0f0f2] space-y-2 text-xs">
                <div className="flex justify-between text-[#7a7a7a]">
                  <span>Format</span>
                  <span className="font-semibold text-[#1d1d1f]">Recorded + Live Q&amp;A</span>
                </div>
                <div className="flex justify-between text-[#7a7a7a]">
                  <span>Credential</span>
                  <span className="font-semibold text-[#1d1d1f]">Verifiable Certificate</span>
                </div>
                <div className="flex justify-between text-[#7a7a7a]">
                  <span>Batch Sync</span>
                  <span className="font-semibold text-emerald-600">Active</span>
                </div>
              </div>
            </Card>

            <Card hoverable={false} className="p-6 space-y-3 bg-[#fafafc] border-[#e0e0e0]">
              <div className="flex items-center space-x-2 text-emerald-600">
                <ShieldCheck className="w-5 h-5" />
                <span className="font-semibold text-xs uppercase tracking-wide">Kernel Verified</span>
              </div>
              <p className="text-xs text-[#7a7a7a] leading-relaxed">
                Course progress and quiz submissions are authenticated with PostgreSQL Row Level Security.
              </p>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}
