import { test, expect } from '@playwright/test';

test.describe('ELMS Complete Platform - All Routes', () => {
  // Public
  test('Landing Page (/)', async ({ page }) => {
    await page.goto('http://localhost:3000');
    await expect(page.locator('h1')).toContainText('Enterprise Education, Refined to Perfection.');
  });

  test('Login Page (/login)', async ({ page }) => {
    await page.goto('http://localhost:3000/login');
    await expect(page.locator('h1')).toContainText('Sign In to Your Portal');
  });

  // Student Navigation Full Verification
  test('Student My Batch (/batch)', async ({ page }) => {
    await page.goto('http://localhost:3000/batch');
    await expect(page.locator('h1')).toContainText('My Cohort & Batch');
    await page.screenshot({ path: 'tests/e2e/screenshots/14_student_batch.png', fullPage: true });
  });

  test('Student Notes (/notes)', async ({ page }) => {
    await page.goto('http://localhost:3000/notes');
    await expect(page.locator('h1')).toContainText('Class Notes & Reference Docs');
    await page.screenshot({ path: 'tests/e2e/screenshots/15_student_notes.png', fullPage: true });
  });

  test('Student Announcements (/announcements)', async ({ page }) => {
    await page.goto('http://localhost:3000/announcements');
    await expect(page.locator('h1')).toContainText('Institutional Announcements');
    await page.screenshot({ path: 'tests/e2e/screenshots/16_student_announcements.png', fullPage: true });
  });

  // Admin Navigation Missing Routes Verification
  test('Admin Assignments (/admin/assignments)', async ({ page }) => {
    await page.goto('http://localhost:3000/admin/assignments');
    await expect(page.locator('h1')).toContainText('Institutional Assignments');
    await page.screenshot({ path: 'tests/e2e/screenshots/17_admin_assignments.png', fullPage: true });
  });

  test('Admin Quizzes (/admin/quizzes)', async ({ page }) => {
    await page.goto('http://localhost:3000/admin/quizzes');
    await expect(page.locator('h1')).toContainText('Institutional Quizzes & Banks');
    await page.screenshot({ path: 'tests/e2e/screenshots/18_admin_quizzes.png', fullPage: true });
  });

  test('Admin Certificates (/admin/certificates)', async ({ page }) => {
    await page.goto('http://localhost:3000/admin/certificates');
    await expect(page.locator('h1')).toContainText('Certificate Authority & Ledger');
    await page.screenshot({ path: 'tests/e2e/screenshots/19_admin_certificates.png', fullPage: true });
  });

  test('Admin Announcements (/admin/announcements)', async ({ page }) => {
    await page.goto('http://localhost:3000/admin/announcements');
    await expect(page.locator('h1')).toContainText('Institutional Announcements');
    await page.screenshot({ path: 'tests/e2e/screenshots/20_admin_announcements.png', fullPage: true });
  });
});
