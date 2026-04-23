import path from 'node:path';
import { countCDNImages } from '@/src/utils/cdnUtils';
import getRoutes from '@/src/utils/getRoutes';
import { expect, test } from '@/test/E2ETesting/fixtures';

const routes = getRoutes(path.resolve('dist'));

test.describe('CDN links load correctly', () => {
	for (const route of routes) {
		test(`CDN links in: ${route}`, async ({ page }) => {
			test.skip(!countCDNImages(route), 'No CDN links found');

			const cdnRequests: string[] = [];
			const failedRequests: string[] = [];
			const countCDN = countCDNImages(route);

			// Continue all CDN requests
			await page.route('https://cdn.jsdelivr.net/**', (route) =>
				route.continue(),
			);

			// Intercept all network requests before navigating
			page.on('response', (response) => {
				if (
					response.request().resourceType() === 'image' &&
					response.url().includes('cdn.jsdelivr.net')
				) {
					if (!cdnRequests.some((r) => r.startsWith(response.url())))
						cdnRequests.push(`${response.url()} — ${response.status()}`);
					if (!response.ok())
						failedRequests.push(`${response.url()} — ${response.status()}`);
				}
			});

			await page.goto(route, { waitUntil: 'load' });

			await page
				.locator('img[src*="cdn.jsdelivr.net"]')
				.last()
				.waitFor({ state: 'visible' });

			//console.log(cdnRequests);
			//console.log(`${cdnRequests.length} : ${countCDN}`);

			expect(failedRequests).toEqual([]);
			expect(cdnRequests.length).toBe(countCDN);
		});
	}
});
