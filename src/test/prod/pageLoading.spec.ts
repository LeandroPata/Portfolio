import { test, expect } from '@playwright/test';

const baseUrl = 'http://leandropata.pt/';

const routes = [
	'',
	'en/',
	'en/projects',
	'en/about',
	'pt/',
	'pt/projects',
	'pt/about',
];

for (const route of routes) {
	test(`loads ${baseUrl}${route}`, async ({ page }) => {
		await page.goto(baseUrl + route);
		await expect(page).toBeDefined();
	});
}
