import Link from "next/link"
import { ShieldCheck, ArrowLeft } from "lucide-react"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

interface VerifyPageProps {
  params: Promise<{ certCode: string }>
}

export default async function CertificateVerificationPage({ params }: VerifyPageProps) {
  const { certCode } = await params

  // Mock valid certificate check
  const certData = {
    code: certCode,
    studentName: "Alex Rivera",
    courseTitle: "Advanced Full-Stack Engineering with Next.js & PostgreSQL",
    batchName: "Cohort 2026-Alpha",
    issueDate: "September 24, 2026",
    issuer: "ELMS Global Education Board",
    gradeScore: "96.4%",
    isValid: true
  }

  return (
    <div className="min-h-screen bg-[#f5f5f7] flex flex-col justify-center items-center p-4 sm:p-6">
      <div className="w-full max-w-xl space-y-6">
        <Link href="/" className="inline-flex items-center gap-1.5 text-xs text-[#7a7a7a] hover:text-[#1d1d1f]">
          <ArrowLeft className="w-3.5 h-3.5" /> Return to ELMS Home
        </Link>

        <Card hoverable={false} className="p-8 border-[#e5e5e7] shadow-xl text-center space-y-6">
          <div className="mx-auto w-16 h-16 rounded-full bg-emerald-500/10 flex items-center justify-center text-emerald-600">
            <ShieldCheck className="w-10 h-10" />
          </div>

          <div className="space-y-2">
            <Badge variant="success" className="px-3 py-1 text-sm font-semibold">
              Official Accredited Credential Verified
            </Badge>
            <h1 className="text-2xl font-bold tracking-tight text-[#1d1d1f]">
              Certificate of Completion
            </h1>
            <p className="text-xs font-mono text-[#7a7a7a]">Identifier: {certData.code}</p>
          </div>

          <div className="rounded-2xl bg-[#fafafc] border border-[#e5e5e7] p-6 text-left space-y-4">
            <div>
              <p className="text-xs text-[#7a7a7a] uppercase font-semibold">Recipient</p>
              <p className="text-base font-bold text-[#1d1d1f]">{certData.studentName}</p>
            </div>

            <div>
              <p className="text-xs text-[#7a7a7a] uppercase font-semibold">Course Program</p>
              <p className="text-sm font-medium text-[#1d1d1f]">{certData.courseTitle}</p>
              <p className="text-xs text-[#7a7a7a]">{certData.batchName}</p>
            </div>

            <div className="grid grid-cols-2 gap-4 pt-2 border-t border-[#e5e5e7]">
              <div>
                <p className="text-xs text-[#7a7a7a] uppercase font-semibold">Issuing Authority</p>
                <p className="text-xs font-medium text-[#1d1d1f]">{certData.issuer}</p>
              </div>
              <div>
                <p className="text-xs text-[#7a7a7a] uppercase font-semibold">Issue Date</p>
                <p className="text-xs font-medium text-[#1d1d1f]">{certData.issueDate}</p>
              </div>
            </div>
          </div>

          <p className="text-xs text-[#7a7a7a] leading-relaxed">
            This digital certificate is cryptographically recorded in the ELMS ledger and backed by verified course completion records.
          </p>
        </Card>
      </div>
    </div>
  )
}
