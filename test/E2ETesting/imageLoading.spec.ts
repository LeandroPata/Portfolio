import path from 'node:path';
import type { Response } from '@playwright/test';
import {
	countCDNLinks,
	//getCDNImages,
	hasCDNImages,
} from '@/src/utils/cdnUtils';
import getRoutes from '@/src/utils/getRoutes';
import { expect, test } from '@/test/E2ETesting/fixtures';

const routes = getRoutes(path.resolve('dist'));
const cdnRoutes = routes.filter((r) => countCDNLinks(r) > 0);

test.describe('CDN links load correctly', () => {
	for (const route of cdnRoutes) {
		test(`CDN links in: ${route}`, async ({ page }) => {
			const cdnRequests: string[] = [];
			const failedRequests: string[] = [];
			const countCDN = countCDNLinks(route);
			//const requests: string[] = [];

			// Continue all CDN requests
			await page.route('https://cdn.jsdelivr.net/**', async (route) => {
				if (route.request().resourceType() === 'image') {
					const response = await route.fetch({ method: 'HEAD' });
					await route.fulfill({
						status: response.status(),
						headers: Object.fromEntries(
							response.headersArray().map((h) => [h.name, h.value]),
						),
						body: '',
					});
				} else {
					await route.continue();
				}
			});

			const onResponse = (response: Response) => {
				if (response.url().includes('cdn.jsdelivr.net')) {
					if (!cdnRequests.some((r) => r.split(' — ')[0] === response.url()))
						cdnRequests.push(`${response.url()} — ${response.status()}`);
					if (!response.ok())
						failedRequests.push(`${response.url()} — ${response.status()}`);
				}
			};

			// Intercept all network requests before navigating
			page.context().on('response', onResponse);

			//page.on('request', (request) => requests.push(request.url()));

			await page.goto(route, { waitUntil: 'load' });
			//console.log(getCDNImages(route));

			if (hasCDNImages(route)) {
				// Scroll to trigger loading of lazy images
				await page.evaluate(() =>
					window.scrollTo(0, document.body.scrollHeight),
				);
			}
			await page.waitForLoadState('networkidle');

			const cdnLinks = await page
				.locator('a[href*="cdn.jsdelivr.net"]:not(:has(img))')
				.all();

			if (cdnLinks.length > 0) {
				for (const link of cdnLinks) {
					await Promise.all([
						page.context().waitForEvent('page'),
						link.click(),
					]);
				}
			}
			//console.log(requests);
			console.log(cdnRequests);
			console.log(`${cdnRequests.length} : ${countCDN}`);
			//console.log(cdnRequests.some((r) => r.split(' - ')));

			expect(failedRequests).toEqual([]);
			expect(cdnRequests.length).toBe(countCDN);

			page.context().off('response', onResponse);
		});
	}
});
