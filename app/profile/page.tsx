import Link from "next/link"
import { StudentNavbar } from "@/components/layout/student-navbar"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { User, Mail, Shield, BookOpen, Key } from "lucide-react"

export default function StudentProfilePage() {
  const user = {
    name: "Alex Rivera",
    email: "alex.rivera@student.elms.edu",
    role: "student",
    batch: "Cohort 2026-Alpha",
    batchCode: "BATCH-26A",
    studentId: "STD-2026-089",
    joinedDate: "January 15, 2026"
  }

  return (
    <div className="min-h-screen bg-[#f5f5f7]">
      <StudentNavbar />

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight text-[#1d1d1f]">Account Profile</h1>
          <p className="text-[#7a7a7a] mt-1 text-sm">
            Manage your personal details, verified cohort credentials, and security preferences.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card hoverable={false} className="p-6 text-center space-y-4">
            <div className="w-20 h-20 rounded-full bg-[#0066cc]/10 text-[#0066cc] flex items-center justify-center text-2xl font-bold mx-auto">
              AR
            </div>
            <div>
              <h2 className="text-lg font-bold text-[#1d1d1f]">{user.name}</h2>
              <p className="text-xs text-[#7a7a7a]">{user.email}</p>
            </div>
            <Badge variant="default">Verified Student</Badge>
          </Card>

          <Card hoverable={false} className="p-6 md:col-span-2 space-y-6">
            <h3 className="text-base font-semibold text-[#1d1d1f]">Institutional Enrollment</h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div className="p-3.5 rounded-xl bg-[#fafafc] border border-[#e5e5e7]">
                <span className="text-[#7a7a7a] block font-medium">Assigned Cohort</span>
                <span className="font-semibold text-sm text-[#1d1d1f] mt-0.5 block">{user.batch}</span>
              </div>
              <div className="p-3.5 rounded-xl bg-[#fafafc] border border-[#e5e5e7]">
                <span className="text-[#7a7a7a] block font-medium">Cohort Code</span>
                <span className="font-mono text-sm text-[#0066cc] mt-0.5 block">{user.batchCode}</span>
              </div>
              <div className="p-3.5 rounded-xl bg-[#fafafc] border border-[#e5e5e7]">
                <span className="text-[#7a7a7a] block font-medium">Student ID</span>
                <span className="font-mono text-sm text-[#1d1d1f] mt-0.5 block">{user.studentId}</span>
              </div>
              <div className="p-3.5 rounded-xl bg-[#fafafc] border border-[#e5e5e7]">
                <span className="text-[#7a7a7a] block font-medium">Enrolled Date</span>
                <span className="text-sm text-[#1d1d1f] mt-0.5 block">{user.joinedDate}</span>
              </div>
            </div>

            <div className="pt-2 border-t border-[#f0f0f2] flex justify-end">
              <Button variant="secondary" size="md">
                Update Password & Security
              </Button>
            </div>
          </Card>
        </div>
      </main>
    </div>
  )
}
