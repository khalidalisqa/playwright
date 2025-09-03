import { test, expect } from '@playwright/test';
import * as fs from 'fs';

test('has title', async ({ page }) => {
  await page.goto('https://practicesoftwaretesting.com/auth/register');

  // Expect the exact page title
  // await expect(page).toHaveTitle('Register - Practice Software Testing - Toolshop - v5.0');
  // Assert the heading is visible
  await expect(page.getByRole('heading', { name: 'Customer registration' })).toBeVisible();
  // using css locator
  await expect(page.locator('h3')).toHaveText('Customer registration');
  // More flexible (partial match)
  await expect(page.getByRole('heading', { name: /Customer registration/ })).toBeVisible();


})
test('fill registration form fields', async ({ page }) => {
  // Navigate to page
  await page.goto('https://practicesoftwaretesting.com/auth/register');

  // Load user data from fixture
  const userData = JSON.parse(fs.readFileSync('fixture/userData.json', 'utf-8'));

  // First Name
  const firstNameInput = page.locator('[data-test="first-name"]');
  await expect(firstNameInput).toBeVisible();
  await firstNameInput.fill(userData.firstName);

  // Last Name
  const lastNameInput = page.locator('[data-test="last-name"]');
  await expect(lastNameInput).toBeVisible();
  await lastNameInput.fill(userData.lastName);

  // Date of Birth
  const dobInput = page.locator('[data-test="dob"]');
  await expect(dobInput).toBeVisible();
  await dobInput.fill(userData.dob);

  // Street
  const streetInput = page.locator('[data-test="street"]');
  await expect(streetInput).toBeVisible();
  await streetInput.fill(userData.street);
  // Assert the value is correctly filled
  await expect(streetInput).toHaveValue(userData.street);

  // PostCode
  const postCodeInput = page.locator('[data-test="postal_code"]');
  await expect(postCodeInput).toBeVisible();
  await postCodeInput.fill(userData.postcode);
  // Assert the value is correctly filled
  await expect(postCodeInput).toHaveValue(userData.postcode);

  // City
  const cityInput = page.locator('[data-test="city"]');
  await expect(cityInput).toBeVisible();
  await cityInput.fill(userData.city);
  // Assert the value is correctly filled
  await expect(cityInput).toHaveValue(userData.city);

});
