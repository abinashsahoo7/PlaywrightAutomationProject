// @ts-check
import { defineConfig, devices } from '@playwright/test';


/**
 * @see https://playwright.dev/docs/test-configuration
 */
export default defineConfig({
  testDir: './tests',
  //retries : 1,
  workers : 3,
  timeout: 40 *1000,
  expect: {
    timeout: 50000,
  },
  reporter: 'html',
  //reporter: [["line"], ["allure-playwright"]],
  //name: 'Edge',
  use: {
    browserName: 'chromium',
    //channel: 'msedge',
    headless: false,
    screenshot: 'on',
    trace: 'on'

    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */

  },

  
});

