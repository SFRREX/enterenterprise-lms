"use client"

import Link from "next/link"
import { 
  ShieldCheck, 
  Users, 
  Award, 
  ChevronRight, 
  GraduationCap,
  Database,
  Lock,
  Cpu,
  Layers,
  ArrowRight,
  Server,
  KeyRound,
  FileCheck,
  Play,
  BookOpen,
  CheckCircle2,
  Clock,
  ExternalLink,
  Zap,
  Globe2,
  Terminal,
  Shield,
  Sparkles,
  BarChart3,
  Video
} from "lucide-react"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-[#ffffff] flex flex-col justify-between selection:bg-[#0066cc]/20 selection:text-[#0066cc] antialiased">
      
      {/* 1. Global Navigation: 44px, #000000, 12px text, pure brand showcase */}
      <nav className="site-global-nav sticky top-0 flex items-center z-50">
        <div className="max-w-[1024px] mx-auto w-full px-4 flex items-center justify-between text-xs text-[#d2d2d7]">
          <Link href="/" className="hover:text-white transition-colors flex items-center gap-2 group" title="ELMS Platform">
            <div className="w-5 h-5 rounded-md bg-white/10 flex items-center justify-center group-hover:bg-[#0066cc] transition-colors">
              <GraduationCap className="w-3.5 h-3.5 text-white" />
            </div>
            <span className="font-semibold text-white tracking-[-0.12px]">ELMS</span>
          </Link>

          <div className="hidden md:flex items-center space-x-8 text-[#cccccc] text-[12px] tracking-[-0.12px]">
            <a href="#overview" className="hover:text-white transition-colors">Overview</a>
            <a href="#architecture" className="hover:text-white transition-colors">Architecture</a>
            <a href="#security" className="hover:text-white transition-colors">Security</a>
            <a href="#experience" className="hover:text-white transition-colors">Experience</a>
            <a href="#specs" className="hover:text-white transition-colors">Specifications</a>
          </div>

          <div className="flex items-center">
            {/* BUTTON 1 of 2: Clean, single Sign In link in nav bar */}
            <Link 
              href="/login" 
              className="text-xs text-[#cccccc] hover:text-white transition-colors flex items-center gap-1 font-medium"
            >
              Sign In &rarr;
            </Link>
          </div>
        </div>
      </nav>

      {/* 2. Sub-Nav Frosted: 52px, frosted parchment, 21px tagline, clean showcase */}
      <header className="site-subnav-frosted sticky top-11 flex items-center z-40">
        <div className="max-w-[1024px] mx-auto w-full px-4 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <span className="font-semibold text-[21px] tracking-[0.231px] text-[#1d1d1f]">
              ELMS
            </span>
            <span className="text-xs text-[#7a7a7a] font-normal hidden sm:inline">
              Enterprise Learning Platform
            </span>
          </div>

          <div className="flex items-center space-x-6 text-xs text-[#1d1d1f]">
            <span className="text-[#86868b] hidden md:inline">Institutional Grade &bull; 2026 Edition</span>
            <a href="#security" className="text-[#0066cc] hover:underline font-medium">
              Explore RLS &rarr;
            </a>
          </div>
        </div>
      </header>

      {/* 3. Hero Product Tile: Light Canvas 80px padding, 56px hero-display, -0.28px letter-spacing */}
      <section id="overview" className="section-tile-light text-center relative flex flex-col items-center justify-center pt-24 pb-20 overflow-hidden">
        
        {/* Subtle atmospheric ambient glow */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[350px] bg-gradient-to-tr from-[#0066cc]/10 via-[#2997ff]/15 to-transparent rounded-full blur-3xl pointer-events-none -z-10 animate-glow-pulse" />

        <div className="max-w-[980px] mx-auto space-y-6 px-4 animate-entrance-fade">
          
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#f5f5f7] border border-[#e0e0e0] text-[#0066cc] text-[12px] font-medium tracking-tight mx-auto transition-transform duration-300 hover:scale-105 cursor-default">
            <span className="w-2 h-2 rounded-full bg-[#0066cc] animate-ping" />
            <span>Introducing ELMS 2026 Architecture</span>
          </div>

          <h1 className="text-[44px] sm:text-[56px] font-semibold tracking-[-0.28px] text-[#1d1d1f] leading-[1.07] max-w-4xl mx-auto">
            Enterprise Education.<br />Refined to Perfection.
          </h1>

          <p className="text-[20px] sm:text-[24px] font-normal text-[#7a7a7a] tracking-[0.196px] max-w-2xl mx-auto leading-[1.38] pt-1">
            Engineered for premier institutions and training academies. Powered by PostgreSQL 18.6 with Row-Level Security and Cloudflare Edge.
          </p>

          {/* BUTTON 2 of 2: The ONLY button on the website body (button-primary spec: 11px 22px, #0066cc, full pill) */}
          <div className="flex items-center justify-center pt-4">
            <Link 
              href="/login" 
              className="pill-btn-primary spring-btn text-[17px] font-normal px-8 py-3.5 shadow-none"
            >
              Sign In to Platform
            </Link>
          </div>

          {/* Signature Product Surface Showcase with Gentle Float and Single System Drop-Shadow */}
          <div id="architecture" className="pt-16 max-w-4xl mx-auto w-full animate-float-soft">
            <div className="rounded-[18px] bg-white border border-[#e0e0e0] card-elevation-lg text-left overflow-hidden spring-card">
              <div className="bg-[#fafafc] px-6 py-4 border-b border-[#f0f0f2] flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 rounded-full bg-[#ff5f56] transition-transform duration-200 hover:scale-125" />
                  <div className="w-3 h-3 rounded-full bg-[#ffbd2e] transition-transform duration-200 hover:scale-125" />
                  <div className="w-3 h-3 rounded-full bg-[#27c93f] transition-transform duration-200 hover:scale-125" />
                  <span className="text-[12px] font-mono text-[#7a7a7a] ml-2">elms.institution.internal &bull; production-node</span>
                </div>
                <span className="text-[12px] px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-600 font-medium flex items-center gap-1 border border-emerald-100">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  Active Cluster
                </span>
              </div>

              <div className="p-8 grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-1.5 p-5 rounded-[18px] bg-[#f5f5f7] border border-[#e0e0e0] hover:border-[#0066cc]/40 transition-all duration-300 hover:bg-white group cursor-default">
                  <div className="text-[14px] text-[#7a7a7a] font-medium group-hover:text-[#0066cc] transition-colors">Batch Infrastructure</div>
                  <div className="text-[21px] font-semibold text-[#1d1d1f] tracking-tight">Cohort 2026-Alpha</div>
                  <div className="text-[14px] text-[#0066cc]">Strict Tenant Boundary Isolation</div>
                </div>

                <div className="space-y-1.5 p-5 rounded-[18px] bg-[#f5f5f7] border border-[#e0e0e0] hover:border-emerald-500/40 transition-all duration-300 hover:bg-white group cursor-default">
                  <div className="text-[14px] text-[#7a7a7a] font-medium group-hover:text-emerald-600 transition-colors">Database Security</div>
                  <div className="text-[21px] font-semibold text-[#1d1d1f] tracking-tight">PostgreSQL 18.6 RLS</div>
                  <div className="text-[14px] text-emerald-600">Zero-Trust Kernel Rules</div>
                </div>

                <div className="space-y-1.5 p-5 rounded-[18px] bg-[#f5f5f7] border border-[#e0e0e0] hover:border-[#0066cc]/40 transition-all duration-300 hover:bg-white group cursor-default">
                  <div className="text-[14px] text-[#7a7a7a] font-medium group-hover:text-[#0066cc] transition-colors">Media Storage</div>
                  <div className="text-[21px] font-semibold text-[#1d1d1f] tracking-tight">Cloudflare R2</div>
                  <div className="text-[14px] text-[#0066cc]">15-Min Ephemeral Put Tokens</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Alternating Dark Tile: Zero-Trust Security Deep-Dive (#272729 surface-tile-1) */}
      <section id="security" className="section-tile-dark text-center py-28 relative overflow-hidden">
        {/* Subtle dark ambient glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-[#2997ff]/10 rounded-full blur-[100px] pointer-events-none -z-10" />

        <div className="max-w-[980px] mx-auto space-y-5 px-4">
          <p className="text-xs uppercase font-semibold tracking-wider text-[#2997ff]">
            Zero-Trust Authorization
          </p>
          <h2 className="text-4xl sm:text-6xl font-semibold tracking-[-0.28px] text-white leading-[1.07]">
            Row Level Security.
          </h2>
          <p className="text-lg sm:text-xl font-normal text-[#cccccc] max-w-2xl mx-auto leading-[1.4]">
            Data isolation at the database kernel. Students and instructors only access authorized records.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-14 text-left max-w-4xl mx-auto">
            <div className="bg-[#1d1d1f] p-8 rounded-3xl border border-white/10 space-y-4 spring-card-dark cursor-default">
              <div className="w-10 h-10 rounded-xl bg-[#2997ff]/10 flex items-center justify-center text-[#2997ff] transition-transform duration-300 hover:scale-110">
                <Database className="w-5 h-5" />
              </div>
              <div className="text-base font-semibold text-white">Kernel Isolation</div>
              <div className="text-xs text-[#cccccc] leading-relaxed">
                PostgreSQL RLS policies guarantee students cannot harvest peer submissions or unauthorized lesson batches.
              </div>
            </div>

            <div className="bg-[#1d1d1f] p-8 rounded-3xl border border-white/10 space-y-4 spring-card-dark cursor-default">
              <div className="w-10 h-10 rounded-xl bg-purple-500/10 flex items-center justify-center text-purple-400 transition-transform duration-300 hover:scale-110">
                <KeyRound className="w-5 h-5" />
              </div>
              <div className="text-base font-semibold text-white">HttpOnly Cookie Tokens</div>
              <div className="text-xs text-[#cccccc] leading-relaxed">
                Secure session tokens prevent cross-site scripting session hijacking, verified at the edge proxy boundary.
              </div>
            </div>

            <div className="bg-[#1d1d1f] p-8 rounded-3xl border border-white/10 space-y-4 spring-card-dark cursor-default">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-400 transition-transform duration-300 hover:scale-110">
                <Cpu className="w-5 h-5" />
              </div>
              <div className="text-base font-semibold text-white">Server-Side Evaluation</div>
              <div className="text-xs text-[#cccccc] leading-relaxed">
                Quiz answer keys remain locked on the server. Tamper-proof automated grading with instant feedback.
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Alternating Parchment Tile: Stakeholder Experience (#f5f5f7 canvas-parchment) */}
      <section id="experience" className="section-tile-parchment py-28">
        <div className="max-w-[1024px] mx-auto space-y-12 px-4">
          <div className="text-center space-y-3">
            <h2 className="text-3xl sm:text-5xl font-semibold tracking-tight text-[#1d1d1f]">
              Designed for every stakeholder.
            </h2>
            <p className="text-base sm:text-lg text-[#7a7a7a] max-w-xl mx-auto">
              Three dedicated workspaces tailored to distinct academic and operational workflows.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
            
            {/* Student Card */}
            <div className="product-utility-card spring-card space-y-4 p-8 cursor-default">
              <div className="w-12 h-12 rounded-2xl bg-[#0066cc]/10 flex items-center justify-center text-[#0066cc] transition-transform duration-300 hover:scale-110">
                <Users className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-semibold text-[#1d1d1f]">Student Learning</h3>
              <p className="text-xs text-[#7a7a7a] leading-relaxed">
                Distraction-free video lecture player, digital notebook, self-paced quizzes, file submissions, and verifiable digital certificates.
              </p>
              <div className="text-xs text-[#0066cc] font-medium pt-2">
                Personalized Learner Dashboard
              </div>
            </div>

            {/* Faculty Card */}
            <div className="product-utility-card spring-card space-y-4 p-8 cursor-default">
              <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 flex items-center justify-center text-emerald-600 transition-transform duration-300 hover:scale-110">
                <Award className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-semibold text-[#1d1d1f]">Faculty Studio</h3>
              <p className="text-xs text-[#7a7a7a] leading-relaxed">
                Centralized submission inbox, rubric-driven scoring, direct student feedback, and cohort attendance overviews.
              </p>
              <div className="text-xs text-emerald-600 font-medium pt-2">
                Interactive Rubric Grading
              </div>
            </div>

            {/* Admin Card */}
            <div className="product-utility-card spring-card space-y-4 p-8 cursor-default">
              <div className="w-12 h-12 rounded-2xl bg-purple-500/10 flex items-center justify-center text-purple-600 transition-transform duration-300 hover:scale-110">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-semibold text-[#1d1d1f]">Institutional Admin</h3>
              <p className="text-xs text-[#7a7a7a] leading-relaxed">
                Batch provisioning, course catalog publishing, faculty allocation, system audit ledgers, and credential signing.
              </p>
              <div className="text-xs text-purple-600 font-medium pt-2">
                Campus-Wide Governance
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Technical Specifications Section (#ffffff canvas) */}
      <section id="specs" className="section-tile-light py-24 border-t border-[#f0f0f2]">
        <div className="max-w-[980px] mx-auto space-y-8 px-4 text-left">
          <div className="space-y-2">
            <p className="text-xs uppercase font-semibold tracking-wider text-[#0066cc]">System Architecture</p>
            <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight text-[#1d1d1f]">
              Specifications at a glance.
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 pt-4 text-xs">
            <div className="p-5 rounded-2xl bg-[#f5f5f7] border border-[#e5e5e7] space-y-1">
              <span className="text-[#7a7a7a] block">Runtime Engine</span>
              <span className="font-semibold text-sm text-[#1d1d1f] block">Next.js 16 (App Router)</span>
              <span className="text-[#86868b]">Turbopack &bull; React 19</span>
            </div>
            <div className="p-5 rounded-2xl bg-[#f5f5f7] border border-[#e5e5e7] space-y-1">
              <span className="text-[#7a7a7a] block">Database Kernel</span>
              <span className="font-semibold text-sm text-[#1d1d1f] block">PostgreSQL 18.6</span>
              <span className="text-[#86868b]">Row-Level Security (RLS)</span>
            </div>
            <div className="p-5 rounded-2xl bg-[#f5f5f7] border border-[#e5e5e7] space-y-1">
              <span className="text-[#7a7a7a] block">Object Storage</span>
              <span className="font-semibold text-sm text-[#1d1d1f] block">Cloudflare R2</span>
              <span className="text-[#86868b]">Signed Ephemeral PUT URLs</span>
            </div>
            <div className="p-5 rounded-2xl bg-[#f5f5f7] border border-[#e5e5e7] space-y-1">
              <span className="text-[#7a7a7a] block">Access Model</span>
              <span className="font-semibold text-sm text-[#1d1d1f] block">Zero-Trust RBAC</span>
              <span className="text-[#86868b]">Student &bull; Teacher &bull; Admin</span>
            </div>
          </div>
        </div>
      </section>

      {/* 7. Footer (Parchment background, 17px dense-link columns with 2.41 leading) */}
      <footer className="bg-[#f5f5f7] border-t border-[#e0e0e0] py-14 text-[#7a7a7a]">
        <div className="max-w-[1024px] mx-auto px-4 space-y-8">
          <div className="text-[12px] leading-[1.33] border-b border-[#e0e0e0] pb-6 space-y-2">
            <p>
              1. PostgreSQL 18.6 with Row Level Security guarantees cryptographically and relationally enforced data isolation across cohorts.
            </p>
            <p>
              2. Protected workspace routes require active authentication via secure session cookies; unauthorized requests redirect to the identity sign-in portal.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 text-[12px]">
            <div>
              <h4 className="font-semibold text-[#1d1d1f] mb-3">Architecture</h4>
              <ul className="space-y-2 leading-relaxed">
                <li><a href="#overview" className="hover:text-[#1d1d1f]">Overview</a></li>
                <li><a href="#architecture" className="hover:text-[#1d1d1f]">Cluster State</a></li>
                <li><a href="#security" className="hover:text-[#1d1d1f]">Row Level Security</a></li>
                <li><a href="#specs" className="hover:text-[#1d1d1f]">Tech Specifications</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-[#1d1d1f] mb-3">Workspaces</h4>
              <ul className="space-y-2 leading-relaxed">
                <li><Link href="/login" className="hover:text-[#1d1d1f]">Student Learning</Link></li>
                <li><Link href="/login" className="hover:text-[#1d1d1f]">Faculty Studio</Link></li>
                <li><Link href="/login" className="hover:text-[#1d1d1f]">Institutional Admin</Link></li>
                <li><Link href="/login" className="hover:text-[#1d1d1f]">Access Identity</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-[#1d1d1f] mb-3">Credentials</h4>
              <ul className="space-y-2 leading-relaxed">
                <li><Link href="/verify/cert/CERT-2026-8902-AFE" className="hover:text-[#1d1d1f]">Verify Certificate</Link></li>
                <li><span className="text-[#86868b]">Tamper-Proof Ledger</span></li>
                <li><span className="text-[#86868b]">Public Audit Engine</span></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-[#1d1d1f] mb-3">Platform</h4>
              <ul className="space-y-2 leading-relaxed">
                <li><Link href="/login" className="hover:text-[#1d1d1f]">Institutional Sign In</Link></li>
                <li><span className="text-[#86868b]">Cloudflare Edge</span></li>
                <li><span className="text-[#86868b]">PostgreSQL 18.6 RLS</span></li>
              </ul>
            </div>
          </div>

          <div className="pt-6 border-t border-[#e0e0e0] flex flex-col sm:flex-row items-center justify-between text-[11px] gap-2">
            <span>Copyright &copy; 2026 Enterprise LMS Architecture. All rights reserved.</span>
            <div className="flex space-x-6">
              <span className="hover:text-[#1d1d1f] cursor-pointer">Privacy Policy</span>
              <span className="hover:text-[#1d1d1f] cursor-pointer">Terms of Service</span>
              <span className="hover:text-[#1d1d1f] cursor-pointer">Security Center</span>
              <span className="hover:text-[#1d1d1f] cursor-pointer">Site Map</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
