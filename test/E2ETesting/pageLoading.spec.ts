import path from 'node:path';
import { expect, test } from '@playwright/test';
import getRoutes from '@/src/utils/getRoutes';

const routes = getRoutes(path.resolve('dist'));

for (const route of routes) {
	test(`Loads ${route}`, async ({ page }) => {
		await page.goto(route);

		if (route === '/') await expect(page).toHaveURL('/en/');
		else await expect(page).toHaveURL(route);
	});
}
