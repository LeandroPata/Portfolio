import path from 'node:path';
import getRoutes from '@/src/utils/getRoutes';
import { expect, test } from '@/test/E2ETesting/fixtures';

const routes = getRoutes(path.resolve('dist'));

test.describe('CDN links load correctly', () => {
	for (const route of routes) {
		test(`CDN links in: ${route}`, async ({ page }) => {
			const cdnRequests: string[] = [];
			const failedRequests: string[] = [];

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
					cdnRequests.push(`${response.url()} — ${response.status()}`);
					if (!response.ok())
						failedRequests.push(`${response.url()} — ${response.status()}`);
				}
			});

			await page.goto(route, { waitUntil: 'load' });

			const cdnImages = await page
				.locator('img[src*="cdn.jsdelivr.net"]')
				.evaluateAll((imgs) =>
					(imgs as HTMLImageElement[]).map((img) => img.src),
				);

			console.log(cdnImages);
			test.skip(!cdnImages.length, 'No CDN links found');

			console.log(cdnRequests);
			console.log(failedRequests);

			await page
				.locator('img[src*="cdn.jsdelivr.net"]')
				.last()
				.waitFor({ state: 'visible' });

			expect(failedRequests).toEqual([]);
			expect(cdnImages.length).toBe(cdnRequests.length);
		});
	}
});
