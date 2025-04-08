import { test, expect } from '@playwright/test';
import getRoutes from '@/src/utils/getRoutes';
import path from 'node:path';

const baseUrl = 'http://leandropata.pt';

const routes = getRoutes(path.resolve('dist'));

for (const route of routes) {
	test(`loads ${baseUrl}/${route}`, async ({ page }) => {
		await page.goto(baseUrl + route);
		await expect(page).toBeDefined();
	});
}
