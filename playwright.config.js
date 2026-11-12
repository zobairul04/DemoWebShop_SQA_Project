import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './tests',

  timeout: 90000,

  expect: {
    timeout: 15000,
  },

  fullyParallel: false,
  workers: 1,
  retries: 0,

  reporter: [
    ['list'],

    ['html', {
      outputFolder: 'playwright-report',
      open: 'never',
    }],

    ['allure-playwright', {
      resultsDir: 'allure-results',
    }],
  ],

  use: {
    baseURL: 'https://demowebshop.tricentis.com',

    browserName: 'chromium',
    headless: false,

    viewport: {
      width: 1366,
      height: 768,
    },

    screenshot: 'on',
    trace: 'retain-on-failure',

    actionTimeout: 15000,
    navigationTimeout: 45000,
  },
});