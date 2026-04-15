import path from 'node:path';
import getRoutes from '@/src/utils/getRoutes';
import { expect, test } from '@/test/E2ETesting/fixtures';

const routes = getRoutes(path.resolve('dist'));

test.describe('All pages exist and load correctly', () => {
	for (const route of routes) {
		test(`Loads '${route}'`, async ({ page }) => {
			await page.goto(route, { waitUntil: 'domcontentloaded' });

			if (route === '/') await expect(page).toHaveURL('/en/');
			else await expect(page).toHaveURL(route);
		});
	}
});
