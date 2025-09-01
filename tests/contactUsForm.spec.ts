import { test, expect } from '@playwright/test';
import * as fs from 'fs';

test('has title', async ({ page }) => {
  await page.goto('https://practicesoftwaretesting.com/auth/register');

  // Expect the exact page title
  await expect(page).toHaveTitle('Register - Practice Software Testing - Toolshop - v5.0');
  // Assert the heading is visible
  await expect(page.getByRole('heading', { name: 'Customer registration' })).toBeVisible();
  // using css locator
  await expect(page.locator('h3')).toHaveText('Customer registration');
  // More flexible (partial match)
  await expect(page.getByRole('heading', { name: /Customer registration/ })).toBeVisible();


})
test('fill first name field', async ({ page }) => {
  await page.goto('https://practicesoftwaretesting.com/auth/register');
  const userData = JSON.parse(fs.readFileSync('fixture/userData.json', 'utf-8'));
  const firstNameInput = page.locator('[data-test="first-name"]');
  await expect(firstNameInput).toBeVisible();
  await firstNameInput.fill(userData.firstName);
  const lastNameInput = page.locator('[data-test="last-name"]');
  await expect(lastNameInput).toBeVisible();
  await lastNameInput.fill(userData.lastName);
  const dobInput = page.locator('[data-test="dob"]');
  await expect(dobInput).toBeVisible();
  await dobInput.fill(userData.dob);
});
