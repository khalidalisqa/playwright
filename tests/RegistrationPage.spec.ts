import { test } from '@playwright/test';
import fs from 'fs';
import {RegistrationPage} from '../pages/  RegistrationPage';


test.describe('Customer Registration', () => {
  let userData: any;

  test.beforeAll(() => {
    userData = JSON.parse(fs.readFileSync('fixture/userData.json', 'utf-8'));
  });

  test('page has correct heading', async ({ page }) => {
    const registration = new RegistrationPage(page);
    await registration.goto();
    await registration.assertHeading();
  });

  test('fill registration form fields', async ({ page }) => {
    const registration = new RegistrationPage(page);
    await registration.goto();
    await registration.fillForm(userData);
    await registration.assertPasswordField();
    await registration.togglePasswordVisibility();
    await registration.assertSubmitButton();
  });
});
