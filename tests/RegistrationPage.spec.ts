import { test, expect } from "@playwright/test";
import fs from "fs";
import path from "path";
import { RegistrationPage } from "../pages/  RegistrationPage";

test.describe("Customer Registration", () => {
  let userData: any;

  test.beforeAll(() => {
    const filePath = path.resolve(__dirname, "../fixtures/userData.json");
    userData = JSON.parse(fs.readFileSync(filePath, "utf-8"));
  });

  test("page has correct heading", async ({ page }) => {
    await page.goto("https://practicesoftwaretesting.com/auth/register");
    //await expect(page.locator("h1")).toHaveText("Register"); // ✅ adjust to actual text
  });

  test("fill registration form fields", async ({ page }) => {
    await page.goto("https://practicesoftwaretesting.com/auth/register");
    await page.getByLabel("First name").fill(userData.firstName);
    await page.getByLabel("Last name").fill(userData.lastName);
    await page.getByLabel("Email").fill(userData.email);
    await page.getByLabel("Password").fill(userData.password);
    // ... fill remaining fields here
  });
});
