import { Given, When, Then } from "@cucumber/cucumber";
import { chromium, Page, Browser, expect } from "@playwright/test";
import { RegistrationPage } from "../pages/  RegistrationPage"; // ✅ fixed path
import fs from "fs";
import path from "path";

let browser: Browser;
let page: Page;
let registration: RegistrationPage;
let userData: any;

Given("I open the registration page", async function () {
  // ✅ safer path resolution
  const userDataPath = path.resolve(process.cwd(), "fixtures/userData.json"); 
  userData = JSON.parse(fs.readFileSync(userDataPath, "utf-8"));

  browser = await chromium.launch({ headless: true });
  const context = await browser.newContext();
  page = await context.newPage();

  registration = new RegistrationPage(page);
  await registration.goto();
});

When("I fill the registration form with valid data", async function () {
  await registration.fillForm(userData);
});

Then("I should see the password field masked", async function () {
  await registration.assertPasswordField();
});

Then("I toggle the password visibility", async function () {
  await registration.togglePasswordVisibility();
});

Then("I should see password strength {string}", async function (strength: string) {
  await expect(registration.strengthText).toHaveText(strength);
});

Then("I should see the Register button with correct text and color", async function () {
  await registration.assertSubmitButton();
  await browser.close();
});
