# Enterprise Learning Management System (ELMS)

A modern, fast, and intuitive Learning Management System designed for universities, training academies, and corporate education programs. Built with Next.js 16, React 19, TypeScript, and PostgreSQL.

ELMS provides tailored experiences for each user role:
- **Students** get a distraction-free learning environment with video lessons, quiz assessments, assignment submissions, and verifiable digital certificates.
- **Instructors** gain a focused grading and course management workspace with rubrics and cohort rosters.
- **Administrators** have total operational oversight across cohorts, student enrollments, faculty assignments, system settings, and institutional announcements.

---

## Key Highlights

- **Student Portal**: Interactive video lessons, note-taking, self-paced quizzes with instant feedback, file downloads, and grade tracking.
- **Instructor Studio**: Centralized submission inbox, rubric-driven scoring, direct student feedback, and cohort attendance overviews.
- **Administrative Control**: Batch/cohort provisioning, course and lesson curriculum authoring, teacher/student directory management, and broadcast announcements.
- **Tamper-Proof Certificates**: Public verification links (`/verify/cert/[certCode]`) that allow anyone to confirm certificate validity in real time.
- **Enterprise-Grade Security**: PostgreSQL Row-Level Security (RLS) policies enforcing multi-tenant isolation, protecting private student records and assessment keys.
- **Clean Architecture**: Built on Next.js App Router and Tailwind CSS with a clean, responsive design inspired by modern Apple and enterprise product aesthetics.

---

## Tech Stack

| Layer | Technology |
|---|---|
| **Framework** | [Next.js 16](https://nextjs.org/) (App Router, Turbopack) |
| **UI Library** | [React 19](https://react.dev/) & [TypeScript](https://www.typescriptlang.org/) |
| **Styling** | [Tailwind CSS v4](https://tailwindcss.com/) & Lucide React Icons |
| **Database** | PostgreSQL (Compatible with [Supabase](https://supabase.com/), Neon, AWS RDS) |
| **File Storage** | Cloudflare R2 / AWS S3 (Presigned direct uploads) |
| **Video Streaming** | Cloudflare Stream / HLS video player support |

---

## Getting Started

Follow these steps to get your local environment running in minutes.

### Prerequisites

Ensure you have **Node.js 18.18+** (or Node.js 20+) installed on your machine.
- Verify with: `node -v`

### 1. Clone & Install Dependencies

```bash
git clone https://github.com/SFRREX/enterenterprise-lms.git
cd enterenterprise-lms
npm install
```

### 2. Configure Environment Variables

Duplicate the example environment file:

```bash
cp .env.example .env.local
```

Open `.env.local` in your editor and configure your credentials:

```env
NEXT_PUBLIC_APP_URL="http://localhost:3000"

# PostgreSQL / Supabase
NEXT_PUBLIC_SUPABASE_URL="https://your-project.supabase.co"
NEXT_PUBLIC_SUPABASE_ANON_KEY="your-anon-key"
SUPABASE_SERVICE_ROLE_KEY="your-service-role-key"

# Cloudflare R2 / S3 (For assignment file storage)
R2_ACCOUNT_ID="your-account-id"
R2_ACCESS_KEY_ID="your-access-key-id"
R2_SECRET_ACCESS_KEY="your-secret-access-key"
R2_BUCKET_NAME="elms-storage"
R2_PUBLIC_DOMAIN="https://assets.yourdomain.com"
```

*(You can explore the interface and all mock workflows locally even before connecting live cloud storage.)*

### 3. Initialize the Database (Optional for Mocking / Required for Production)

Run the SQL migration scripts in your PostgreSQL or Supabase SQL Editor:
1. [`database/migrations/001_initial_schema.sql`](file:///database/migrations/001_initial_schema.sql) — Generates core tables (users, courses, chapters, lessons, submissions, certificates).
2. [`database/migrations/002_row_level_security.sql`](file:///database/migrations/002_row_level_security.sql) — Applies foundational role-based access rules.
3. [`database/migrations/003_production_security_hardening.sql`](file:///database/migrations/003_production_security_hardening.sql) — Applies production zero-trust hardening, privilege escalation protection triggers, pinned search_path, and Storage RLS.

### 4. Run the Development Server

```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) in your browser to start exploring.

---

## Application Structure & Navigation

### Student Experience
- `/dashboard` — Personal progress dashboard, recent activities, and enrolled courses.
- `/courses` — Course catalog and syllabus overview.
- `/courses/[courseId]/lessons/[lessonId]` — Interactive video lesson player with notes and resources.
- `/assignments` — Project submissions, presigned file uploads, and instructor feedback.
- `/quizzes` & `/quizzes/[quizId]` — Timed online assessments and instant scoring.
- `/certificates` — Downloadable course completion certificates.
- `/notes` & `/results` — Quick access to study notes and cumulative academic records.

### Instructor Portal
- `/teacher/dashboard` — Course metrics, student enrollment counts, and pending review alerts.
- `/teacher/assignments` — Review student code archives, assign grades, and submit feedback.
- `/teacher/students` — Cohort roster, student progress, and activity status.
- `/teacher/courses` & `/teacher/quizzes` — Course material and quiz management.

### Administrator Console
- `/admin/dashboard` — High-level platform health, active users, and system status.
- `/admin/courses` — Course creation, publication toggling, and instructor assignment.
- `/admin/batches` — Cohort planning and schedule management.
- `/admin/students` & `/admin/teachers` — User directories and access role assignments.
- `/admin/certificates` — Certificate issuance and credential audit logs.
- `/admin/announcements` — Campus-wide broadcasts and notices.

### Public Verification
- `/verify/cert/[certCode]` — Publicly accessible certificate verification engine.

---

## Production Build & Quality Checks

Run the production build to compile static assets and verify type safety:

```bash
# Build the production bundle
npm run build

# Start the production server
npm run start

# Run the linter
npm run lint
```

---

## Deployment

### Deploying to Vercel (Recommended)

1. Push your repository to GitHub.
2. Import the project into [Vercel](https://vercel.com).
3. In the project settings, add the environment variables defined in `.env.example`.
4. Deploy! Next.js will build and deploy your application automatically on edge routes.

---

## License

This project is licensed under the MIT License. Feel free to use and customize it for your institution or commercial projects.
