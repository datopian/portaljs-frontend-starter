import { defineConfig } from "@playwright/test";

export default defineConfig({
  testDir: "tests",
  timeout: 60_000,
  fullyParallel: true,
  use: {
    baseURL: process.env.BASE_URL || "http://localhost:3000",
    trace: "retain-on-failure",
    headless: true
  },
  reporter: [["html", { outputFolder: "playwright-report", open: "never" }], ["list"]],
});
