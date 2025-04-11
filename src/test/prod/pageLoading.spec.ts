import { test, expect } from '@playwright/test';
import getRoutes from '@/src/utils/getRoutes';
import path from 'node:path';

const baseUrl = 'https://leandropata.pt';

/* const routes = [
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
]; */

const routes = getRoutes(path.resolve('dist'));
console.log(routes);

for (const route of routes) {
	test(`Loads ${baseUrl}${route}`, async ({ page }) => {
		await page.goto(baseUrl + route);
		await expect(page).toBeDefined();
	});
}
