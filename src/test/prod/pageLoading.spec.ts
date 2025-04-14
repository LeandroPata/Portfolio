import { test, expect } from '@playwright/test';
import getRoutes from '@/src/utils/getRoutes';
import path from 'node:path';

const baseUrl = 'https://leandropata.pt';

const routes = getRoutes(path.resolve('dist'));

for (const route of routes) {
	test(`Loads ${baseUrl}${route}`, async ({ page }) => {
		await page.goto(baseUrl + route);

		if (route === '/') await expect(page).toHaveURL(new RegExp(`^${baseUrl}`));
		else await expect(page).toHaveURL(baseUrl + route);
	});
}
