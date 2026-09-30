# Enterprise Learning Management System (ELMS)

A modern, fast, and easy-to-use Learning Management System built for colleges, training bootcamps, and organizations.

It gives students a clear learning experience, teachers an easy grading workflow, and administrators complete control over classes, certificates, and users.

---

## What's Included

* **Student Portal**: Watch video lessons, download course files, take interactive quizzes, view grades, and get verifiable certificates.
* **Faculty Studio**: Review student homework, grade submissions with rubrics, create quizzes, and manage student rosters.
* **Admin Dashboard**: Create batches/cohorts, manage courses, enroll students, add teachers, issue certificates, and post campus-wide announcements.
* **Built-in Security**: Database-level access rules keep student records, test questions, and grades completely private and isolated.
* **Certificate Verification**: Anyone can verify if a certificate is authentic by visiting its verification link.

---

## Tech Stack

* **Frontend**: Next.js 16 (React 19, TypeScript, App Router)
* **Styling**: Tailwind CSS
* **Database**: PostgreSQL (Supabase compatible)
* **File Storage**: Cloudflare R2 / AWS S3
* **Testing**: Playwright (37 automated tests)

---

## Quick Start Guide

### 1. Requirements
Make sure you have [Node.js](https://nodejs.org/) installed (version 18 or newer).

### 2. Install Dependencies
Open your terminal inside the project folder and run:
```bash
npm install
```

### 3. Setup Your Environment
Create your local environment file:
```bash
cp .env.example .env.local
```
Open `.env.local` and add your database and storage details (see `.env.example` for reference).

### 4. Setup the Database
Run the two SQL scripts found inside the `database/migrations/` folder in your PostgreSQL or Supabase SQL editor:
1. `001_initial_schema.sql` (Creates all tables)
2. `002_row_level_security.sql` (Enables privacy and role rules)

### 5. Run Locally
Start the development server:
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## Main Pages & Features

* **Home & Sign In**: `/` and `/login`
* **Student Dashboard**: `/dashboard`
* **Courses & Lessons**: `/courses`
* **Assignments**: `/assignments`
* **Quizzes & Tests**: `/quizzes`
* **Teacher Portal**: `/teacher/dashboard`
* **Teacher Grading**: `/teacher/assignments`
* **Admin Console**: `/admin/dashboard`
* **Cohort Management**: `/admin/batches`
* **Student & Teacher Management**: `/admin/students` and `/admin/teachers`
* **Certificate Verification**: `/verify/cert/CERT-2026-8902-AFE`

---

## How to Deploy to Vercel

1. Push this code to your GitHub account.
2. Go to [Vercel](https://vercel.com) and click **Add New Project**.
3. Select your repository.
4. Paste your environment variables from `.env.local`.
5. Click **Deploy**. Your site will be live in minutes.

---

## Automated Testing

This project includes 37 automated tests to make sure every button, modal, form, and quiz works properly:

```bash
npx playwright test
```

---

## Need Help or Customizations?

Feel free to reach out if you need additional features, custom database integrations, or assistance deploying to your own server.
