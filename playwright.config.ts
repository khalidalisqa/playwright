import { defineConfig, devices } from "@playwright/test";
import * as dotenv from "dotenv";
dotenv.config();

export default defineConfig({
  testDir: "./tests",
  fullyParallel: true,
  reporter: [["list"]],

  projects: [
    // Local browsers
    { name: "chromium", use: { ...devices["Desktop Chrome"] } },
    { name: "firefox", use: { ...devices["Desktop Firefox"] } },
    { name: "webkit", use: { ...devices["Desktop Safari"] } },

    // BrowserStack project
    {
      name: "BrowserStack-Chrome",
      use: {
        browserName: "chromium",
        connectOptions: {
          wsEndpoint: `wss://cdp.browserstack.com/playwright?caps=${encodeURIComponent(
            JSON.stringify({
              browser: "chrome",
              browser_version: "latest",
              os: "osx",
              os_version: "ventura",
              name: "Playwright test",
              build: "playwright-build-001",
              "browserstack.username": process.env.BROWSERSTACK_USERNAME,
              "browserstack.accessKey": process.env.BROWSERSTACK_ACCESS_KEY,
              "client.playwrightVersion": require("playwright/package.json").version, // ✅ required
            })
          )}`,
        },
        headless: true,
        trace: "on-first-retry",
      },
    },
  ],
});
