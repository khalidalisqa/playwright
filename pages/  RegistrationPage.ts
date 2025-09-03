import { Page, Locator, expect } from '@playwright/test';

export class RegistrationPage {
  readonly page: Page;
  readonly heading: Locator;
  readonly firstName: Locator;
  readonly lastName: Locator;
  readonly dob: Locator;
  readonly street: Locator;
  readonly postCode: Locator;
  readonly city: Locator;
  readonly state: Locator;
  readonly country: Locator;
  readonly phone: Locator;
  readonly email: Locator;
  readonly password: Locator;
  readonly eyeIcon: Locator;
  readonly strengthText: Locator;
  readonly submitButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.heading = page.getByRole('heading', { name: /Customer registration/ });
    this.firstName = page.locator('[data-test="first-name"]');
    this.lastName = page.locator('[data-test="last-name"]');
    this.dob = page.locator('[data-test="dob"]');
    this.street = page.locator('[data-test="street"]');
    this.postCode = page.locator('[data-test="postal_code"]');
    this.city = page.locator('[data-test="city"]');
    this.state = page.locator('[data-test="state"]');
    this.country = page.locator('[data-test="country"]');
    this.phone = page.locator('[data-test="phone"]');
    this.email = page.locator('[data-test="email"]');
    this.password = page.locator('[data-test="password"]');
    this.eyeIcon = page.getByRole('button').filter({ hasText: /^$/ });
    this.strengthText = page.getByText('Strong', { exact: true });
    this.submitButton = page.locator('[data-test="register-submit"]');
  }

  async goto() {
    await this.page.goto('/auth/register');
  }

  async assertHeading() {
    await expect(this.heading).toBeVisible();
  }

  // 👉 Field-specific methods
  async fillFirstName(value: string) {
    await expect(this.firstName).toBeVisible();
    await this.firstName.fill(value);
  }

  async fillLastName(value: string) {
    await expect(this.lastName).toBeVisible();
    await this.lastName.fill(value);
  }

  async fillDob(value: string) {
    await expect(this.dob).toBeVisible();
    await this.dob.fill(value);
  }

  async fillStreet(value: string) {
    await expect(this.street).toBeVisible();
    await this.street.fill(value);
  }

  async fillPostCode(value: string) {
    await expect(this.postCode).toBeVisible();
    await this.postCode.fill(value);
  }

  async fillCity(value: string) {
    await expect(this.city).toBeVisible();
    await this.city.fill(value);
  }

  async fillState(value: string) {
    await expect(this.state).toBeVisible();
    await this.state.fill(value);
  }

  async selectCountry(value: string) {
    await expect(this.country).toBeVisible();
    await this.country.selectOption({ value });
  }

  async fillPhone(value: string) {
    await expect(this.phone).toBeVisible();
    await this.phone.fill(value);
  }

  async fillEmail(value: string) {
    await expect(this.email).toBeVisible();
    await this.email.fill(value);
  }

  async fillPassword(value: string) {
    await expect(this.password).toBeVisible();
    await this.password.fill(value);
  }

  // 👉 Full form (calls all individual methods)
  async fillForm(userData: any) {
    await this.fillFirstName(userData.firstName);
    await this.fillLastName(userData.lastName);
    await this.fillDob(userData.dob);
    await this.fillStreet(userData.street);
    await this.fillPostCode(userData.postcode);
    await this.fillCity(userData.city);
    await this.fillState(userData.state);
    await this.selectCountry('AL'); // or userData.country if needed
    await this.fillPhone(userData.phone);
    await this.fillEmail(userData.email);
    await this.fillPassword(userData.password);
  }

  async assertPasswordField() {
    await expect(this.password).toHaveAttribute('type', 'password');
    const passwordValue = await this.password.inputValue();
    expect(passwordValue.length).toBeGreaterThan(0);
  }

  async togglePasswordVisibility() {
    await expect(this.eyeIcon).toBeVisible();
    await expect(this.eyeIcon).toBeEnabled();
    await this.eyeIcon.click();
    await expect(this.strengthText).toBeVisible();
  }

  async assertSubmitButton() {
    await expect(this.submitButton).toHaveText('Register');
    await expect(this.submitButton).toHaveCSS('background-color', 'rgb(30, 96, 152)');
  }
}