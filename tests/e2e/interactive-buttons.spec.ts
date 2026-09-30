import { test, expect } from '@playwright/test';

test.describe('Senior QA Comprehensive Interactive Button Verification', () => {

  // Test 1: Add Faculty Member Button & Modal
  test('Button Action: Add Faculty Member opens modal and adds faculty to table', async ({ page }) => {
    await page.goto('http://localhost:3000/admin/teachers');
    await expect(page.locator('h1')).toContainText('Faculty & Instructors');

    // Click "Add Faculty Member" button
    await page.getByRole('button', { name: 'Add Faculty Member' }).click();

    // Verify modal opened
    await expect(page.getByRole('heading', { name: 'Add Faculty Member' })).toBeVisible();

    // Fill form in modal
    await page.fill('input[placeholder*="Dr. Robert Chen"]', 'Dr. Alan Turing');
    await page.fill('input[placeholder*="robert.chen"]', 'alan.turing@faculty.elms.edu');

    // Submit form
    await page.getByRole('button', { name: 'Save Faculty Member' }).click();

    // Verify notification and new faculty in table
    await expect(page.getByRole('cell', { name: 'Dr. Alan Turing' })).toBeVisible();
    await expect(page.getByRole('cell', { name: 'alan.turing@faculty.elms.edu' })).toBeVisible();
  });

  // Test 2: Create Cohort Button & Modal
  test('Button Action: Create New Cohort opens modal and adds batch to cards', async ({ page }) => {
    await page.goto('http://localhost:3000/admin/batches');
    await expect(page.locator('h1')).toContainText('Cohort & Batch Management');

    // Click "Create New Cohort"
    await page.getByRole('button', { name: 'Create New Cohort' }).click();
    await expect(page.getByRole('heading', { name: 'Create New Academic Cohort' })).toBeVisible();

    // Fill form
    await page.fill('input[placeholder*="Cybersecurity"]', 'Cohort 2027-Alpha (Robotics)');
    await page.fill('input[placeholder*="BATCH-27A"]', 'BATCH-ROBOTICS');

    // Submit
    await page.getByRole('button', { name: 'Create Cohort' }).click();

    // Verify new batch appears
    await expect(page.getByRole('heading', { name: 'Cohort 2027-Alpha (Robotics)' })).toBeVisible();
    await expect(page.getByText('BATCH-ROBOTICS')).toBeVisible();
  });

  // Test 3: Enroll Student Button & Modal
  test('Button Action: Enroll Student opens modal and adds student to table', async ({ page }) => {
    await page.goto('http://localhost:3000/admin/students');
    await expect(page.locator('h1')).toContainText('Student Directory');

    // Click "Enroll Student"
    await page.getByRole('button', { name: 'Enroll Student' }).click();
    await expect(page.getByRole('heading', { name: 'Enroll New Student' })).toBeVisible();

    // Fill form
    await page.fill('input[placeholder*="Cameron Diaz"]', 'Grace Hopper');
    await page.fill('input[placeholder*="cameron@"]', 'grace@student.elms.edu');

    // Submit
    await page.getByRole('button', { name: 'Complete Enrollment' }).click();

    // Verify student added to table
    await expect(page.getByRole('cell', { name: 'Grace Hopper' })).toBeVisible();
    await expect(page.getByRole('cell', { name: 'grace@student.elms.edu' })).toBeVisible();
  });

  // Test 4: Issue Credential Button & Modal
  test('Button Action: Issue Credential opens modal and creates verifiable cert', async ({ page }) => {
    await page.goto('http://localhost:3000/admin/certificates');
    await expect(page.locator('h1')).toContainText('Certificate Authority & Ledger');

    // Click "Issue Credential"
    await page.getByRole('button', { name: 'Issue Credential' }).click();
    await expect(page.getByRole('heading', { name: 'Issue Accredited Certificate' })).toBeVisible();

    // Fill recipient
    await page.fill('input[placeholder*="Jordan Lee"]', 'Ada Lovelace');

    // Submit
    await page.getByRole('button', { name: 'Sign & Issue Credential' }).click();

    // Verify certificate appears in table
    await expect(page.getByRole('cell', { name: 'Ada Lovelace' })).toBeVisible();
  });

  // Test 5: Teacher Grade Submission Button & Modal
  test('Button Action: Teacher Grade & Feedback opens rubric modal and saves grade', async ({ page }) => {
    await page.goto('http://localhost:3000/teacher/assignments');
    await expect(page.locator('h1')).toContainText('Assignment Submissions & Grading');

    // Click "Grade & Feedback" for first student
    await page.getByRole('button', { name: 'Grade & Feedback' }).first().click();
    await expect(page.getByRole('heading', { name: 'Grade Submission: Alex Rivera' })).toBeVisible();

    // Update score
    await page.fill('input[type="number"]', '99');

    // Submit grade
    await page.getByRole('button', { name: 'Submit Authoritative Grade' }).click();

    // Verify updated status
    await expect(page.locator('text=Graded (99/100)')).toBeVisible();
  });

  // Test 6: Student Upload Submission Button & Modal
  test('Button Action: Student Upload Submission opens upload modal and submits file', async ({ page }) => {
    await page.goto('http://localhost:3000/assignments');
    await expect(page.locator('h1')).toContainText('Assignments');

    // Click "Upload Submission"
    await page.getByRole('button', { name: 'Upload Submission' }).click();
    await expect(page.getByRole('heading', { name: 'Upload Submission:' })).toBeVisible();

    // Click "Confirm Direct Upload"
    await page.getByRole('button', { name: 'Confirm Direct Upload' }).click();

    // Verify submission status changed
    await expect(page.locator('text=Under Faculty Review')).toBeVisible();
  });
});
