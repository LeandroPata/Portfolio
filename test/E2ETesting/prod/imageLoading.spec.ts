import path from 'node:path';
import { expect, test } from '@playwright/test';
import getRoutes from '@/src/utils/getRoutes';

const baseUrl = 'https://leandropata.pt';

const routes = getRoutes(path.resolve('dist'));

for (const route of routes) {
	test(`Links to CDN links in ${route} load correctly`, async ({ page }) => {
		const failedRequests: string[] = [];

		// Intercept all network requests before navigating
		page.on('response', (response) => {
			if (response.request().resourceType() === 'image' && !response.ok()) {
				failedRequests.push(`${response.url()} — ${response.status()}`);
			}
		});

		await page.goto(`${baseUrl}${route}`);
		// Wait for network to be idle so all images have had a chance to load
		await page.waitForLoadState('networkidle');

		expect(failedRequests).toEqual([]);
	});
}
