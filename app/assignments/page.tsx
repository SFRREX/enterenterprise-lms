"use client"

import { useState } from "react"
import Link from "next/link"
import { CheckSquare, Clock, Upload, FileText, CheckCircle2 } from "lucide-react"
import { StudentNavbar } from "@/components/layout/student-navbar"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Modal } from "@/components/ui/modal"

interface Assignment {
  id: string
  title: string
  course: string
  dueDate: string
  points: number
  status: string
  grade: number | null
  allowedTypes: string
  description: string
  feedback?: string
}

export default function StudentAssignmentsPage() {
  const [assignments, setAssignments] = useState<Assignment[]>([
    {
      id: "asg-1",
      title: "Assignment 3: Implement Zero-Trust RLS Policies",
      course: "Advanced Full-Stack Engineering with Next.js & PostgreSQL",
      dueDate: "Tomorrow at 23:59",
      points: 100,
      status: "pending",
      grade: null,
      allowedTypes: "PDF, ZIP (max 25MB)",
      description: "Write and apply SQL policies to ensure multi-tenant batch isolation and protect student privacy."
    },
    {
      id: "asg-2",
      title: "Assignment 2: Cloudflare R2 Presigned Upload Worker",
      course: "Cloud Infrastructure, Distributed Systems & Edge R2",
      dueDate: "Submitted 2 days ago",
      points: 100,
      pointsTotal: 100,
      pointsEarned: 95,
      status: "graded",
      grade: 95,
      allowedTypes: "ZIP, TypeScript file",
      description: "Build an edge handler creating 15-minute signed PUT URLs with content-length restrictions.",
      feedback: "Clean architecture, presigned URLs appropriately time-bounded to 15 minutes."
    } as Assignment
  ])

  const [activeUpload, setActiveUpload] = useState<Assignment | null>(null)
  const [selectedFileName, setSelectedFileName] = useState<string>("rls_submission_v1.zip")
  const [notification, setNotification] = useState<string | null>(null)

  const handleUploadSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!activeUpload) return

    setAssignments(assignments.map(a => {
      if (a.id === activeUpload.id) {
        return {
          ...a,
          status: "submitted",
          dueDate: "Submitted just now"
        }
      }
      return a
    }))

    setNotification(`Successfully uploaded ${selectedFileName} via presigned Cloudflare R2 URL!`)
    setActiveUpload(null)
    setTimeout(() => setNotification(null), 4000)
  }

  return (
    <div className="min-h-screen bg-[#f5f5f7]">
      <StudentNavbar />

      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
        {notification && (
          <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-800 text-sm flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            {notification}
          </div>
        )}

        <div>
          <h1 className="text-3xl font-semibold tracking-tight text-[#1d1d1f]">Assignments</h1>
          <p className="text-[#7a7a7a] mt-1 text-sm">
            Practical projects, code submissions, and rubric-graded coursework.
          </p>
        </div>

        <div className="space-y-6">
          {assignments.map((item) => (
            <Card key={item.id} hoverable={false} className="p-6">
              <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Badge variant={item.status === "graded" ? "success" : item.status === "submitted" ? "default" : "warning"}>
                      {item.status === "graded" ? `Graded: ${item.grade}/${item.points}` : item.status === "submitted" ? "Under Faculty Review" : "Action Required"}
                    </Badge>
                    <span className="text-xs text-[#7a7a7a]">{item.course}</span>
                  </div>

                  <h2 className="text-lg font-bold text-[#1d1d1f] tracking-tight">{item.title}</h2>
                  <p className="text-xs text-[#7a7a7a] max-w-2xl leading-relaxed">{item.description}</p>

                  <div className="flex items-center gap-4 text-xs text-[#7a7a7a] pt-2">
                    <span className="flex items-center gap-1 font-medium text-[#1d1d1f]">
                      <Clock className="w-3.5 h-3.5 text-amber-600" /> {item.dueDate}
                    </span>
                    <span>Max Points: {item.points}</span>
                    {item.allowedTypes && <span>Format: {item.allowedTypes}</span>}
                  </div>

                  {item.feedback && (
                    <div className="mt-3 p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-xs text-emerald-800">
                      <strong>Instructor Feedback:</strong> {item.feedback}
                    </div>
                  )}
                </div>

                <div className="shrink-0 pt-2">
                  {item.status === "pending" ? (
                    <Button
                      variant="primary"
                      size="md"
                      className="gap-2"
                      onClick={() => setActiveUpload(item)}
                    >
                      <Upload className="w-4 h-4" /> Upload Submission
                    </Button>
                  ) : (
                    <Button
                      variant="secondary"
                      size="md"
                      className="gap-2"
                      onClick={() => {
                        setNotification(`Fetching graded submission archive from Cloudflare R2...`)
                        setTimeout(() => setNotification(null), 4000)
                      }}
                    >
                      <FileText className="w-4 h-4" /> View Graded File
                    </Button>
                  )}
                </div>
              </div>
            </Card>
          ))}
        </div>
      </main>

      {/* Modal: Upload Submission */}
      <Modal
        isOpen={!!activeUpload}
        onClose={() => setActiveUpload(null)}
        title={`Upload Submission: ${activeUpload?.title}`}
      >
        <form onSubmit={handleUploadSubmit} className="space-y-4">
          <p className="text-xs text-[#7a7a7a]">
            Select your archive or PDF report to upload directly to Cloudflare R2:
          </p>

          <div className="p-6 border-2 border-dashed border-[#e5e5e7] rounded-2xl text-center space-y-2 hover:bg-[#fafafc] cursor-pointer">
            <Upload className="w-8 h-8 text-[#0066cc] mx-auto" />
            <p className="text-sm font-semibold text-[#1d1d1f]">Choose file or drag & drop</p>
            <p className="text-xs text-[#7a7a7a]">Allowed formats: ZIP, PDF (Max 25MB)</p>
            <input
              type="text"
              value={selectedFileName}
              onChange={(e) => setSelectedFileName(e.target.value)}
              className="mt-2 w-full text-center px-3 py-1.5 rounded-lg border border-[#e5e5e7] text-xs font-mono"
            />
          </div>

          <div className="pt-4 flex justify-end gap-2 border-t border-[#f0f0f2]">
            <Button type="button" variant="secondary" size="md" onClick={() => setActiveUpload(null)}>
              Cancel
            </Button>
            <Button type="submit" variant="primary" size="md">
              Confirm Direct Upload
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  )
}
