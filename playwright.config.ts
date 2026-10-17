import { defineConfig } from "@playwright/test";

// Runs against the built site (npm run build first). Uses the installed Chrome,
// so no browser download is needed.
export default defineConfig({
  testDir: "tests",
  timeout: 60_000,
  fullyParallel: true,
  workers: 4,
  reporter: [["list"]],
  use: {
    baseURL: "http://localhost:4321",
    channel: "chrome",
  },
  webServer: {
    command: "npx astro preview --port 4321",
    url: "http://localhost:4321",
    reuseExistingServer: true,
  },
});
