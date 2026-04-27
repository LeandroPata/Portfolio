import path from 'node:path';
import type { Response } from '@playwright/test';
import {
	countCDNLinks,
	getCDNImages,
	hasCDNImages,
} from '@/src/utils/cdnUtils';
import getRoutes from '@/src/utils/getRoutes';
import { expect, test } from '@/test/E2ETesting/fixtures';

const routes = getRoutes(path.resolve('dist'));

test.describe('CDN links load correctly', () => {
	for (const route of routes) {
		test(`CDN links in: ${route}`, async ({ page }) => {
			test.skip(!countCDNLinks(route), 'No CDN links found');

			const cdnRequests: string[] = [];
			const failedRequests: string[] = [];
			const countCDN = countCDNLinks(route);

			// Continue all CDN requests
			await page.route('https://cdn.jsdelivr.net/**', async (route) => {
				if (route.request().resourceType() === 'image') {
					const response = await route.fetch();
					await route.fulfill({ response });
				} else {
					await route.continue();
				}
			});

			const onResponse = (response: Response) => {
				if (response.url().includes('cdn.jsdelivr.net')) {
					if (!cdnRequests.some((r) => r.startsWith(response.url())))
						cdnRequests.push(`${response.url()} — ${response.status()}`);
					if (!response.ok())
						failedRequests.push(`${response.url()} — ${response.status()}`);
				}
			};

			// Intercept all network requests before navigating
			page.context().on('response', onResponse);

			await page.goto(route, { waitUntil: 'load' });
			console.log(getCDNImages(route));

			if (hasCDNImages(route)) {
				await page
					.locator('img[src*="cdn.jsdelivr.net"]')
					.last()
					.waitFor({ state: 'visible' });
			}

			const cdnLinks = await page
				.locator('a[href*="cdn.jsdelivr.net"]:not(:has(img))')
				.all();

			if (cdnLinks.length > 0) {
				for (const link of cdnLinks) {
					const href = await link.getAttribute('href');
					console.log(href);
					await link.click();
					await page.waitForTimeout(500);
				}
			}
			console.log(cdnRequests);
			console.log(`${cdnRequests.length} : ${countCDN}`);

			expect(failedRequests).toEqual([]);
			expect(cdnRequests.length).toBe(countCDN);

			page.context().off('response', onResponse);
		});
	}
});
