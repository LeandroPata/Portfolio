import { test, expect } from '@playwright/test';

const baseUrl = 'http://leandropata.pt';

const routes = [
	'/404',
	'/en/about/',
	'/en/',
	'/en/projects/',
	'/en/projects/memberManagementApp/',
	'/en/projects/orderManagementApp/',
	'/en/projects/portfolio/',
	'/',
	'/pt/about/',
	'/pt/',
	'/pt/projects/',
	'/pt/projects/memberManagementApp/',
	'/pt/projects/orderManagementApp/',
	'/pt/projects/portfolio/',
];

for (const route of routes) {
	test(`Loads ${baseUrl}${route}`, async ({ page }) => {
		await page.goto(baseUrl + route);
		await expect(page).toBeDefined();
	});
}
