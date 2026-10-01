import Link from "next/link"
import { Award, Download, CheckCircle, ExternalLink } from "lucide-react"
import { StudentNavbar } from "@/components/layout/student-navbar"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

export default function CertificatesPage() {
  const certificates = [
    {
      id: "cert-8902",
      code: "CERT-2026-8902-AFE",
      course: "Advanced Full-Stack Engineering with Next.js & PostgreSQL",
      recipient: "Alex Rivera",
      issuedAt: "September 24, 2026",
      grade: "96.4% (Honors Distinction)",
      status: "Verified & Immutable"
    }
  ]

  return (
    <div className="min-h-screen bg-[#f5f5f7]">
      <StudentNavbar />

      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight text-[#1d1d1f]">My Certificates</h1>
          <p className="text-[#7a7a7a] mt-1 text-sm">
            Accredited digital credentials and cryptographically verifiable course certificates.
          </p>
        </div>

        <div className="space-y-6">
          {certificates.map((cert) => (
            <Card key={cert.id} hoverable={false} className="p-8 border-[#e5e5e7]">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div className="flex items-start gap-4">
                  <div className="w-14 h-14 rounded-2xl bg-amber-500/10 flex items-center justify-center text-amber-600 shrink-0">
                    <Award className="w-8 h-8" />
                  </div>
                  <div className="space-y-1">
                    <Badge variant="success" className="gap-1 mb-1">
                      <CheckCircle className="w-3 h-3" /> {cert.status}
                    </Badge>
                    <h2 className="text-xl font-bold text-[#1d1d1f] tracking-tight">{cert.course}</h2>
                    <p className="text-xs text-[#7a7a7a]">
                      Awarded to <span className="font-semibold text-[#1d1d1f]">{cert.recipient}</span> on {cert.issuedAt}
                    </p>
                    <p className="text-xs font-mono text-[#0066cc] pt-1">Code: {cert.code}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 shrink-0">
                  <Link href={`/verify/cert/${cert.code}`} target="_blank">
                    <Button variant="secondary" size="md" className="gap-1.5">
                      <ExternalLink className="w-4 h-4" /> Verify Record
                    </Button>
                  </Link>
                  <Button variant="primary" size="md" className="gap-1.5">
                    <Download className="w-4 h-4" /> Download PDF
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
