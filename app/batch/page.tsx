import Link from "next/link"
import { Users } from "lucide-react"
import { StudentNavbar } from "@/components/layout/student-navbar"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

export default function StudentBatchPage() {
  const batch: any = null

  return (
    <div className="min-h-screen bg-[#f5f5f7]">
      <StudentNavbar />

      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight text-[#1d1d1f]">My Cohort & Batch</h1>
          <p className="text-[#7a7a7a] mt-1 text-sm">
            Cohort schedule, fellow learners, and assigned academic instructors.
          </p>
        </div>

        {!batch ? (
          <div className="bg-white rounded-2xl border border-black/[0.06] p-12 text-center shadow-sm">
            <div className="w-12 h-12 rounded-full bg-[#f5f5f7] flex items-center justify-center mx-auto mb-3 text-[#7a7a7a]">
              <Users className="w-6 h-6" />
            </div>
            <h3 className="text-base font-semibold text-[#1d1d1f]">Not Assigned to a Cohort</h3>
            <p className="text-sm text-[#7a7a7a] mt-1 max-w-sm mx-auto mb-4">
              Your student profile has not been assigned to an active cohort or academic batch yet. Contact your department administrator to complete enrollment.
            </p>
            <Link href="/courses">
              <Button variant="primary" size="sm">Browse Course Catalog</Button>
            </Link>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card hoverable={false} className="p-6 md:col-span-2 space-y-6">
                <div className="flex items-center justify-between">
                  <Badge variant="success">Active Enrollment</Badge>
                  <span className="font-mono text-xs text-[#0066cc] font-semibold">{batch.code}</span>
                </div>

                <div className="space-y-1">
                  <h2 className="text-2xl font-bold tracking-tight text-[#1d1d1f]">{batch.name}</h2>
                  <p className="text-xs text-[#7a7a7a]">Faculty Advisor: {batch.leadInstructor}</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs pt-4 border-t border-[#f0f0f2]">
                  <div className="p-3.5 rounded-xl bg-[#fafafc] border border-[#e5e5e7]">
                    <span className="text-[#7a7a7a] block">Term Duration</span>
                    <span className="font-semibold text-sm text-[#1d1d1f] mt-0.5 block">{batch.term}</span>
                  </div>
                  <div className="p-3.5 rounded-xl bg-[#fafafc] border border-[#e5e5e7]">
                    <span className="text-[#7a7a7a] block">Anticipated Graduation</span>
                    <span className="font-semibold text-sm text-[#1d1d1f] mt-0.5 block">{batch.graduationDate}</span>
                  </div>
                </div>
              </Card>

              <Card hoverable={false} className="p-6 flex flex-col justify-between">
                <div className="space-y-4">
                  <p className="text-xs font-semibold uppercase tracking-wider text-[#7a7a7a]">Cohort Progress</p>
                  <div className="text-3xl font-bold text-[#1d1d1f] tracking-tight">{batch.completionRate}</div>
                  <p className="text-xs text-[#7a7a7a] leading-relaxed">
                    Your cohort progress updates as students complete syllabus modules.
                  </p>
                </div>
                <Link href="/courses">
                  <Button variant="primary" size="md" className="w-full">
                    Go to Cohort Curriculum
                  </Button>
                </Link>
              </Card>
            </div>

            <div className="bg-white rounded-2xl border border-black/[0.06] overflow-hidden shadow-sm">
              <div className="p-6 border-b border-[#f0f0f2] flex items-center justify-between">
                <h3 className="text-base font-semibold text-[#1d1d1f] flex items-center gap-2">
                  <Users className="w-4 h-4 text-[#0066cc]" /> Cohort Peers ({batch.activePeersCount} Students)
                </h3>
              </div>
              <div className="divide-y divide-[#f0f0f2]">
                {batch.peers.map((p: any) => (
                  <div key={p.id} className="p-4 px-6 flex items-center justify-between hover:bg-[#fafafc] transition-colors">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-[#f0f0f2] flex items-center justify-center text-xs font-bold text-[#1d1d1f]">
                        {p.name.charAt(0)}
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-[#1d1d1f]">{p.name}</p>
                        <p className="text-xs text-[#7a7a7a]">{p.role}</p>
                      </div>
                    </div>
                    <Badge variant="neutral">{p.status}</Badge>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}
      </main>
    </div>
  )
}
