import { test, expect } from '@playwright/test';

test.describe('ELMS Deep Functionality & Workflow Verification', () => {

  // 1. Navigation Flow Test
  test('Flow 1: Landing -> Login -> Student Dashboard -> Course -> Lesson', async ({ page }) => {
    // Start at Home
    await page.goto('http://localhost:3000');
    await expect(page.locator('h1')).toContainText('Enterprise Education, Refined to Perfection.');

    // Click "Sign In"
    await page.click('text=Sign In');
    await expect(page).toHaveURL('http://localhost:3000/login');
    await expect(page.locator('h1')).toContainText('Sign In to Your Portal');

    // Click "Sign In as Student"
    await page.click('text=Sign In as Student');
    await expect(page).toHaveURL('http://localhost:3000/dashboard');
    await expect(page.locator('h1')).toContainText('Welcome back, Alex');

    // Click "Browse All Courses"
    await page.click('text=Browse All Courses');
    await expect(page).toHaveURL('http://localhost:3000/courses');
    await expect(page.locator('h1')).toContainText('My Courses');

    // Open first course
    await page.click('text=Continue Course');
    await expect(page).toHaveURL(/.*courses\/crs-1/);
  });

  // 2. Interactive Quiz Runner Functionality
  test('Flow 2: Quiz Selection, Answering & Server Evaluation Submission', async ({ page }) => {
    await page.goto('http://localhost:3000/quizzes/qz-101');
    await expect(page.locator('h1')).toContainText('Quiz 2: Distributed Database Replication');

    // Submit button should be disabled initially
    const submitBtn = page.locator('button:has-text("Submit Authoritative Attempt")');
    await expect(submitBtn).toBeDisabled();

    // Answer Question 1
    await page.click('text=Because client-side inspection in DevTools trivially leaks the answer key');

    // Submit button should still be disabled (Q2 not answered)
    await expect(submitBtn).toBeDisabled();

    // Answer Question 2
    await page.click('text=ACID Database Transaction');

    // Submit button should now be enabled
    await expect(submitBtn).toBeEnabled();

    // Submit the attempt
    await submitBtn.click();

    // Verify submission result state
    await expect(page.locator('h2')).toContainText('Attempt Submitted Successfully');
    await expect(page.locator('text=Score: 100% (Passed)')).toBeVisible();

    // Verify link to academic results ledger
    await page.click('text=View In Results Ledger');
    await expect(page).toHaveURL('http://localhost:3000/results');
    await expect(page.locator('h1')).toContainText('Academic Results & Transcripts');
  });

  // 3. Certificate Cryptographic Ledger Verification
  test('Flow 3: Certificate Page -> Public Verification Ledger Check', async ({ page }) => {
    await page.goto('http://localhost:3000/certificates');
    await expect(page.locator('h1')).toContainText('My Certificates');
    await expect(page.locator('text=CERT-2026-8902-AFE')).toBeVisible();

    // Navigate to public verification
    await page.goto('http://localhost:3000/verify/cert/CERT-2026-8902-AFE');
    await expect(page.locator('text=Official Accredited Credential Verified')).toBeVisible();
    await expect(page.locator('text=Alex Rivera')).toBeVisible();
    await expect(page.locator('text=Advanced Full-Stack Engineering with Next.js & PostgreSQL')).toBeVisible();
    await expect(page.locator('text=ELMS Global Education Board')).toBeVisible();
  });

  // 4. Faculty / Teacher Workflow
  test('Flow 4: Teacher Dashboard -> Review Submissions -> Rubric View', async ({ page }) => {
    await page.goto('http://localhost:3000/teacher/dashboard');
    await expect(page.locator('h1')).toContainText('Faculty Portal');

    // Navigate to assignments
    await page.click('text=Review Submissions');
    await expect(page).toHaveURL('http://localhost:3000/teacher/assignments');
    await expect(page.locator('h1')).toContainText('Assignment Submissions & Grading');

    // Check student submissions in table
    await expect(page.locator('text=Alex Rivera')).toBeVisible();
    await expect(page.locator('text=rls_policies_submission.zip')).toBeVisible();
  });

  // 5. Admin Institutional Operations
  test('Flow 5: Admin Navigation across Batches, Courses, Students, Teachers, Settings', async ({ page }) => {
    await page.goto('http://localhost:3000/admin/dashboard');
    await expect(page.locator('h1')).toContainText('Institutional Oversight');

    // Batches
    await page.click('a:has-text("Batches")');
    await expect(page).toHaveURL('http://localhost:3000/admin/batches');
    await expect(page.locator('h1')).toContainText('Cohort & Batch Management');

    // Courses
    await page.click('a:has-text("Courses")');
    await expect(page).toHaveURL('http://localhost:3000/admin/courses');
    await expect(page.locator('h1')).toContainText('Course Management');

    // Students
    await page.click('a:has-text("Students")');
    await expect(page).toHaveURL('http://localhost:3000/admin/students');
    await expect(page.locator('h1')).toContainText('Student Directory');

    // Teachers
    await page.click('a:has-text("Teachers")');
    await expect(page).toHaveURL('http://localhost:3000/admin/teachers');
    await expect(page.locator('h1')).toContainText('Faculty & Instructors');

    // Settings
    await page.click('a:has-text("Settings")');
    await expect(page).toHaveURL('http://localhost:3000/admin/settings');
    await expect(page.locator('h1')).toContainText('Institutional Platform Settings');
    await expect(page.locator('text=Active (18/18 Tables)')).toBeVisible();
  });

  // 6. Responsive Mobile Viewport Test (iPhone 14 standard: 390x844)
  test('Flow 6: Responsive Layout Integrity on Mobile Viewport', async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });

    // Check home page on mobile
    await page.goto('http://localhost:3000');
    await expect(page.locator('h1')).toBeVisible();

    // Check student dashboard on mobile
    await page.goto('http://localhost:3000/dashboard');
    await expect(page.locator('h1')).toContainText('Welcome back, Alex');
    await expect(page.locator('text=Pick up where you left off')).toBeVisible();

    // Take mobile screenshot
    await page.screenshot({ path: 'tests/e2e/screenshots/21_mobile_dashboard.png', fullPage: true });
  });
});
