import { test, expect } from '@playwright/test';

test.describe('ELMS Full Application Suite - Student, Teacher, Admin', () => {
  test('Landing Page & Public Entry', async ({ page }) => {
    await page.goto('http://localhost:3000');
    await expect(page.locator('h1')).toContainText('Enterprise Education, Refined to Perfection.');
  });

  test('Institutional Login Screen', async ({ page }) => {
    await page.goto('http://localhost:3000/login');
    await expect(page.locator('h1')).toContainText('Sign In to Your Portal');
  });

  test('Student Dashboard & Progression', async ({ page }) => {
    await page.goto('http://localhost:3000/dashboard');
    await expect(page.locator('h1')).toContainText('Welcome back, Alex');
  });

  test('Student Course & Lesson Viewer', async ({ page }) => {
    await page.goto('http://localhost:3000/courses/crs-1/lessons/les-12');
    await expect(page.locator('h1')).toContainText('Database Row-Level Security in Practice');
  });

  test('Student Assignments View', async ({ page }) => {
    await page.goto('http://localhost:3000/assignments');
    await expect(page.locator('h1')).toContainText('Assignments');
  });

  test('Student Quizzes & Assessment Runner', async ({ page }) => {
    await page.goto('http://localhost:3000/quizzes/qz-101');
    await expect(page.locator('h1')).toContainText('Quiz 2: Distributed Database Replication');
  });

  test('Student Academic Results Ledger', async ({ page }) => {
    await page.goto('http://localhost:3000/results');
    await expect(page.locator('h1')).toContainText('Academic Results & Transcripts');
  });

  test('Student Profile & Enrollment', async ({ page }) => {
    await page.goto('http://localhost:3000/profile');
    await expect(page.locator('h1')).toContainText('Account Profile');
  });

  test('Teacher Portal Dashboard', async ({ page }) => {
    await page.goto('http://localhost:3000/teacher/dashboard');
    await expect(page.locator('h1')).toContainText('Faculty Portal');
    await page.screenshot({ path: 'tests/e2e/screenshots/10_teacher_dashboard.png', fullPage: true });
  });

  test('Teacher Assignments & Submissions Grading', async ({ page }) => {
    await page.goto('http://localhost:3000/teacher/assignments');
    await expect(page.locator('h1')).toContainText('Assignment Submissions & Grading');
    await page.screenshot({ path: 'tests/e2e/screenshots/11_teacher_grading.png', fullPage: true });
  });

  test('Teacher Quizzes Authoring', async ({ page }) => {
    await page.goto('http://localhost:3000/teacher/quizzes');
    await expect(page.locator('h1')).toContainText('Quiz & Assessment Authoring');
    await page.screenshot({ path: 'tests/e2e/screenshots/12_teacher_quizzes.png', fullPage: true });
  });

  test('Teacher Student Roster', async ({ page }) => {
    await page.goto('http://localhost:3000/teacher/students');
    await expect(page.locator('h1')).toContainText('Course Student Rosters');
    await page.screenshot({ path: 'tests/e2e/screenshots/13_teacher_students.png', fullPage: true });
  });

  test('Admin Oversight & Batches Management', async ({ page }) => {
    await page.goto('http://localhost:3000/admin/batches');
    await expect(page.locator('h1')).toContainText('Cohort & Batch Management');
  });

  test('Admin System Results & Audits', async ({ page }) => {
    await page.goto('http://localhost:3000/admin/results');
    await expect(page.locator('h1')).toContainText('Institutional Results & Audit Logs');
  });

  test('Admin Platform Settings', async ({ page }) => {
    await page.goto('http://localhost:3000/admin/settings');
    await expect(page.locator('h1')).toContainText('Institutional Platform Settings');
  });

  test('Public Certificate Verification Ledger', async ({ page }) => {
    await page.goto('http://localhost:3000/verify/cert/CERT-2026-8902-AFE');
    await expect(page.locator('text=Official Accredited Credential Verified')).toBeVisible();
  });
});
