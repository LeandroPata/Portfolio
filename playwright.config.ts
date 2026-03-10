import { defineConfig, devices } from '@playwright/test';

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
//import dotenv from 'dotenv';
//import path from 'path';
//dotenv.config({ path: path.resolve(__dirname, '.env') });

/**
 * See https://playwright.dev/docs/test-configuration.
 */

const isProd = process.env.ENV === 'prod';

export default defineConfig({
	testDir: './test/E2ETesting',
	/* Run tests in files in parallel */
	fullyParallel: true,
	/* Fail the build on CI if you accidentally left test.only in the source code. */
	forbidOnly: !!process.env.CI,
	/* Retry on CI only */
	retries: process.env.CI ? 2 : 0,
	/* Opt out of parallel tests on CI. */
	workers: process.env.CI ? 2 : undefined,
	/* Reporter to use. See https://playwright.dev/docs/test-reporters */
	reporter: 'html',
	timeout: 60 * 1000, // Timeout for each test in milliseconds (1 min)
	expect: {
		timeout: 10 * 1000, // Timeout for each expect statement in milliseconds (10 sec)
	},
	/* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
	use: {
		navigationTimeout: 30 * 1000, // Timeout for navigation operations in milliseconds (30 sec)
		actionTimeout: 15 * 1000, // Timeout for action operations in milliseconds (15 sec)
		trace: 'on-first-retry',
		baseURL: isProd ? 'https://leandropata.pt' : 'http://localhost:4321',
		headless: isProd ? true : !!process.env.CI,
		...(isProd && !process.env.CI
			? { connectOptions: { wsEndpoint: 'ws://127.0.0.1:3000/' } }
			: {}),
	},

	/* Configure projects for major browsers */
	projects: [
		{
			name: 'chromium',
			use: { ...devices['Desktop Chrome'] },
		},

		{
			name: 'firefox',
			use: { ...devices['Desktop Firefox'] },
		},

		{
			name: 'webkit',
			use: { ...devices['Desktop Safari'] },
		},

		/* Test against mobile viewports. */
		{
			name: 'Mobile Chrome',
			use: { ...devices['Pixel 5'] },
		},
		{
			name: 'Mobile Safari',
			use: { ...devices['iPhone 12'] },
		},

		/* Test against branded browsers. */
		// {
		//   name: 'Microsoft Edge',
		//   use: { ...devices['Desktop Edge'], channel: 'msedge' },
		// },
		// {
		//   name: 'Google Chrome',
		//   use: { ...devices['Desktop Chrome'], channel: 'chrome' },
		// },
	],

	/* Run your local dev server before starting the tests */

	...(!isProd
		? {
				webServer: {
					command: 'npx astro preview',
					url: 'http://localhost:4321',
					reuseExistingServer: false,
				},
			}
		: {}),
});
