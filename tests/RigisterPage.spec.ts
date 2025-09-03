import { test, expect } from '@playwright/test';
import * as fs from 'fs';

test('has title', async ({ page }) => {
  await page.goto('/auth/register');

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
  await page.goto('/auth/register');

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

  // State
  const stateInput = page.locator('[data-test="state"]');
  await expect(stateInput).toBeVisible();
  await stateInput.fill(userData.state);
  // Assert the value is correctly filled
  await expect(stateInput).toHaveValue(userData.state);

  // Country
  const countryDropdown = page.locator('[data-test="country"]');
  await expect(countryDropdown).toBeVisible();
  await countryDropdown.selectOption({ value: 'AL' });
  await expect(countryDropdown).toHaveValue(userData.country);  // or 'AL' depending on HTML

// Phone
  const phoneInput = page.locator('[data-test="phone"]');
  await expect(phoneInput).toBeVisible();
  await phoneInput.fill(userData.phone);
  // Assert the value is correctly filled
  await expect(phoneInput).toHaveValue(userData.phone);


// Email
  const emailInput = page.locator('[data-test="email"]');
  await expect(emailInput).toBeVisible();
  await emailInput.fill(userData.email);
  // Assert the value is correctly filled
  await expect(emailInput).toHaveValue(userData.email);

  // Password
  const passwordInput = page.locator('[data-test="password"]');
  await expect(passwordInput).toBeVisible();
  await passwordInput.fill(userData.password);

// Assert input type is "password" (value is hidden in UI)
  await expect(passwordInput).toHaveAttribute('type', 'password');

// Assert it's not empty (instead of showing actual value)
  const passwordValue = await passwordInput.inputValue();
  expect(passwordValue.length).toBeGreaterThan(0);

// icon 
  // Password eye icon (button with no text, just icon)
  const eyeIconButton = page.getByRole('button').filter({ hasText: /^$/ });

// Check if the button is visible
  await expect(eyeIconButton).toBeVisible();

// Check if the button is enabled (clickable)
  await expect(eyeIconButton).toBeEnabled();

// Try clicking it (to confirm functionality)
  await eyeIconButton.click();

  //  Assert that "Strong" text appears
  const strengthText = page.getByText('Strong', { exact: true });
  await expect(strengthText).toBeVisible();


  // Submit button
  const submitButton = page.locator('[data-test="register-submit"]');

// Assert button text
  await expect(submitButton).toHaveText('Register');

// Assert background color
  await expect(submitButton).toHaveCSS('background-color', 'rgb(30, 96, 152)');

});
