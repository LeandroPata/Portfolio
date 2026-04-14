import path from 'node:path';
import getRoutes from '@/src/utils/getRoutes';
import { expect, test } from '@/test/E2ETesting/fixtures';

const routes = getRoutes(path.resolve('dist'));

test.describe('CDN links load correctly', () => {
	for (const route of routes) {
		test(`CDN links in ${route}`, async ({ page }) => {
			const failedRequests: string[] = [];

			// Continue all CDN requests
			await page.route('https://cdn.jsdelivr.net/**', (route) =>
				route.continue(),
			);

			// Intercept all network requests before navigating
			page.on('response', (response) => {
				if (
					response.request().resourceType() === 'image' &&
					response.url().includes('cdn.jsdelivr.net') &&
					!response.ok()
				) {
					failedRequests.push(`${response.url()} — ${response.status()}`);
				}
			});

			await page.goto(route, { waitUntil: 'domcontentloaded' });

			expect(failedRequests).toEqual([]);
		});
	}
});
