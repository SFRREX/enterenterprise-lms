import Link from "next/link"
import { 
  ShieldCheck, 
  Users, 
  Award, 
  ChevronRight, 
  GraduationCap,
  Database,
  Lock,
  Cpu
} from "lucide-react"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-[#f5f5f7] flex flex-col justify-between selection:bg-[#0066cc]/20 selection:text-[#0066cc]">
      <nav className="site-global-nav sticky top-0 flex items-center">
        <div className="max-w-[1024px] mx-auto w-full px-4 flex items-center justify-between text-xs text-[#d2d2d7]">
          <Link href="/" className="hover:text-white transition-colors flex items-center gap-1.5" title="ELMS">
            <GraduationCap className="w-4 h-4 text-white" />
            <span className="font-semibold text-white tracking-tight">ELMS</span>
          </Link>

          <div className="hidden md:flex items-center space-x-7 text-[#cccccc] text-[12px]">
            <Link href="/courses" className="hover:text-white transition-colors">Courses</Link>
            <Link href="/batch" className="hover:text-white transition-colors">Batches</Link>
            <Link href="/assignments" className="hover:text-white transition-colors">Assignments</Link>
            <Link href="/quizzes" className="hover:text-white transition-colors">Assessments</Link>
            <Link href="/certificates" className="hover:text-white transition-colors">Credentials</Link>
            <Link href="/dashboard" className="hover:text-white transition-colors">Portal</Link>
          </div>

          <div className="flex items-center space-x-5">
            <Link href="/login" className="hover:text-white transition-colors">
              Sign In
            </Link>
          </div>
        </div>
      </nav>

      <header className="site-subnav-frosted sticky top-11 flex items-center">
        <div className="max-w-[1024px] mx-auto w-full px-4 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <span className="font-semibold text-[21px] tracking-[0.231px] text-[#1d1d1f]">
              ELMS
            </span>
            <span className="text-xs text-[#7a7a7a] font-normal hidden sm:inline">Enterprise Learning Platform</span>
          </div>

          <div className="flex items-center space-x-3">
            <Link href="/dashboard" className="pill-btn-primary text-xs py-1.5 px-4 h-7">
              Student Portal
            </Link>
            <Link href="/admin/dashboard" className="btn-utility-dark text-xs py-1.5 px-3 h-7 flex items-center gap-1">
              Admin Console
            </Link>
          </div>
        </div>
      </header>

      <section className="section-tile-light text-center flex flex-col items-center justify-center animate-entrance-fade">
        <div className="max-w-[980px] mx-auto space-y-4">
          <p className="text-xs uppercase font-semibold tracking-wider text-[#0066cc]">
            Architected for Institutions
          </p>
          <h1 className="text-5xl sm:text-7xl font-semibold tracking-[-0.28px] text-[#1d1d1f] leading-[1.07]">
            Enterprise Education, Refined to Perfection.
          </h1>
          <p className="text-2xl sm:text-3xl font-normal text-[#7a7a7a] tracking-[0.196px] max-w-2xl mx-auto leading-[1.14]">
            Pro education systems. Supercharged by PostgreSQL 18.6 &amp; Cloudflare Edge.
          </p>

          <div className="flex items-center justify-center gap-4 pt-4">
            <Link href="/dashboard" className="pill-btn-primary">
              Launch Student Portal
            </Link>
            <Link href="/courses" className="pill-btn-secondary flex items-center gap-1 group">
              Explore Courses <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
          </div>

          <div className="pt-12 max-w-4xl mx-auto">
            <div className="rounded-3xl bg-white p-6 border border-black/[0.08] card-elevation-lg text-left">
              <div className="flex items-center justify-between pb-4 border-b border-[#f0f0f2]">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 rounded-full bg-[#ff5f56]" />
                  <div className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
                  <div className="w-3 h-3 rounded-full bg-[#27c93f]" />
                  <span className="text-xs font-mono text-[#7a7a7a] ml-2">elms.institution.internal</span>
                </div>
                <span className="text-xs px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-600 font-medium">
                  Verified Production Node
                </span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6">
                <div className="space-y-1">
                  <div className="text-xs text-[#7a7a7a]">Active Batch</div>
                  <div className="text-lg font-semibold text-[#1d1d1f]">Cohort 2026-Alpha</div>
                  <div className="text-xs text-[#0066cc]">120 Students Enrolled</div>
                </div>
                <div className="space-y-1">
                  <div className="text-xs text-[#7a7a7a]">Security Engine</div>
                  <div className="text-lg font-semibold text-[#1d1d1f]">PostgreSQL 18.6 RLS</div>
                  <div className="text-xs text-emerald-600">Zero-Trust Active</div>
                </div>
                <div className="space-y-1">
                  <div className="text-xs text-[#7a7a7a]">Edge Storage</div>
                  <div className="text-lg font-semibold text-[#1d1d1f]">Cloudflare R2</div>
                  <div className="text-xs text-purple-600">Direct Presigned URL Tokens</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section-tile-dark text-center">
        <div className="max-w-[980px] mx-auto space-y-4">
          <p className="text-xs uppercase font-semibold tracking-wider text-[#2997ff]">
            Zero-Trust Authorization
          </p>
          <h2 className="text-4xl sm:text-6xl font-semibold tracking-[-0.28px] text-white leading-[1.07]">
            Row Level Security.
          </h2>
          <p className="text-xl sm:text-2xl font-normal text-[#cccccc] max-w-2xl mx-auto leading-[1.2]">
            Data isolation at the database kernel. Students and instructors never see unauthorized rows.
          </p>

          <div className="flex items-center justify-center gap-4 pt-4">
            <Link href="/admin/dashboard" className="pill-btn-primary">
              Admin Console
            </Link>
            <Link href="/admin/settings" className="text-[#2997ff] text-base hover:underline flex items-center gap-1">
              Platform Controls <ChevronRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-12 text-left max-w-4xl mx-auto">
            <div className="bg-[#1d1d1f] p-6 rounded-2xl border border-white/10 space-y-3">
              <Database className="w-6 h-6 text-[#2997ff]" />
              <div className="text-base font-semibold text-white">Kernel Isolation</div>
              <div className="text-xs text-[#cccccc] leading-relaxed">
                PostgreSQL policies enforce tenant boundaries without requiring brittle application-layer filters.
              </div>
            </div>
            <div className="bg-[#1d1d1f] p-6 rounded-2xl border border-white/10 space-y-3">
              <Lock className="w-6 h-6 text-purple-400" />
              <div className="text-base font-semibold text-white">Ephemeral Tokens</div>
              <div className="text-xs text-[#cccccc] leading-relaxed">
                Direct-to-R2 presigned upload URLs expire in 15 minutes, safeguarding server compute from heavy media.
              </div>
            </div>
            <div className="bg-[#1d1d1f] p-6 rounded-2xl border border-white/10 space-y-3">
              <Cpu className="w-6 h-6 text-emerald-400" />
              <div className="text-base font-semibold text-white">Server-Side Evaluation</div>
              <div className="text-xs text-[#cccccc] leading-relaxed">
                Quiz answer keys remain locked on the server. Tamper-proof automated grading with instant feedback.
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section-tile-parchment">
        <div className="max-w-[1024px] mx-auto space-y-8">
          <div className="text-center space-y-2">
            <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight text-[#1d1d1f]">
              Designed for every stakeholder.
            </h2>
            <p className="text-base text-[#7a7a7a]">
              Three dedicated portals tailored to distinct operational workflows.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
            <div className="product-utility-card space-y-4">
              <div className="w-12 h-12 rounded-xl bg-[#0066cc]/10 flex items-center justify-center text-[#0066cc]">
                <Users className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-semibold text-[#1d1d1f]">Student Learning</h3>
              <p className="text-sm text-[#7a7a7a] leading-relaxed">
                Cohort curriculum, video lecture streaming, instant assessment runner, digital notebook, and verifiable certificates.
              </p>
              <Link href="/dashboard" className="text-[#0066cc] text-sm font-medium hover:underline flex items-center gap-1 pt-2">
                Open Student Portal <ChevronRight className="w-4 h-4" />
              </Link>
            </div>

            <div className="product-utility-card space-y-4">
              <div className="w-12 h-12 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-600">
                <Award className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-semibold text-[#1d1d1f]">Faculty Studio</h3>
              <p className="text-sm text-[#7a7a7a] leading-relaxed">
                Interactive rubric grading, quiz creation engine, student roster monitoring, and class announcement dispatch.
              </p>
              <Link href="/teacher/dashboard" className="text-[#0066cc] text-sm font-medium hover:underline flex items-center gap-1 pt-2">
                Open Faculty Console <ChevronRight className="w-4 h-4" />
              </Link>
            </div>

            <div className="product-utility-card space-y-4">
              <div className="w-12 h-12 rounded-xl bg-purple-500/10 flex items-center justify-center text-purple-600">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-semibold text-[#1d1d1f]">Institutional Admin</h3>
              <p className="text-sm text-[#7a7a7a] leading-relaxed">
                Cohort creation, course catalog governance, instructor allocation, system audit ledgers, and credential issuance.
              </p>
              <Link href="/admin/dashboard" className="text-[#0066cc] text-sm font-medium hover:underline flex items-center gap-1 pt-2">
                Open Admin Console <ChevronRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <footer className="bg-[#f5f5f7] border-t border-[#e0e0e0] py-12 text-[#7a7a7a]">
        <div className="max-w-[1024px] mx-auto px-4 space-y-6">
          <div className="text-[12px] leading-[1.33] border-b border-[#e0e0e0] pb-6 space-y-2">
            <p>
              1. PostgreSQL 18.6 with Row Level Security guarantees data isolation across academic cohorts and roles.
            </p>
            <p>
              2. Cloudflare R2 presigned URLs provide tamper-proof object upload verification directly from the student browser.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 text-[12px]">
            <div>
              <h4 className="font-semibold text-[#1d1d1f] mb-3">Academic Services</h4>
              <ul className="space-y-2 leading-relaxed">
                <li><Link href="/dashboard" className="hover:text-[#1d1d1f]">Student Dashboard</Link></li>
                <li><Link href="/courses" className="hover:text-[#1d1d1f]">Course Catalog</Link></li>
                <li><Link href="/assignments" className="hover:text-[#1d1d1f]">Assignments</Link></li>
                <li><Link href="/quizzes" className="hover:text-[#1d1d1f]">Quizzes &amp; Tests</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-[#1d1d1f] mb-3">Faculty</h4>
              <ul className="space-y-2 leading-relaxed">
                <li><Link href="/teacher/dashboard" className="hover:text-[#1d1d1f]">Faculty Dashboard</Link></li>
                <li><Link href="/teacher/assignments" className="hover:text-[#1d1d1f]">Grade Submissions</Link></li>
                <li><Link href="/teacher/quizzes" className="hover:text-[#1d1d1f]">Manage Quizzes</Link></li>
                <li><Link href="/teacher/students" className="hover:text-[#1d1d1f]">Student Roster</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-[#1d1d1f] mb-3">Administration</h4>
              <ul className="space-y-2 leading-relaxed">
                <li><Link href="/admin/dashboard" className="hover:text-[#1d1d1f]">Admin Overview</Link></li>
                <li><Link href="/admin/batches" className="hover:text-[#1d1d1f]">Cohort Management</Link></li>
                <li><Link href="/admin/certificates" className="hover:text-[#1d1d1f]">Issue Credentials</Link></li>
                <li><Link href="/admin/settings" className="hover:text-[#1d1d1f]">Platform Settings</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-[#1d1d1f] mb-3">Platform</h4>
              <ul className="space-y-2 leading-relaxed">
                <li><Link href="/dashboard" className="hover:text-[#1d1d1f]">Student Portal</Link></li>
                <li><Link href="/admin/dashboard" className="hover:text-[#1d1d1f]">Admin Console</Link></li>
                <li><Link href="/verify/cert/CERT-2026-8902-AFE" className="hover:text-[#1d1d1f]">Verify Certificate</Link></li>
                <li><Link href="/login" className="hover:text-[#1d1d1f]">Institutional Sign In</Link></li>
              </ul>
            </div>
          </div>

          <div className="pt-6 border-t border-[#e0e0e0] flex flex-col sm:flex-row items-center justify-between text-[11px] gap-2">
            <span>Copyright &copy; 2026 Enterprise LMS Architecture. All rights reserved.</span>
            <div className="flex space-x-6">
              <span className="hover:text-[#1d1d1f] cursor-pointer">Privacy Policy</span>
              <span className="hover:text-[#1d1d1f] cursor-pointer">Terms of Use</span>
              <span className="hover:text-[#1d1d1f] cursor-pointer">Platform Security</span>
              <span className="hover:text-[#1d1d1f] cursor-pointer">Site Map</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
