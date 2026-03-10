import path from 'node:path';
import { expect, test } from '@playwright/test';
import getRoutes from '@/src/utils/getRoutes';

const routes = getRoutes(path.resolve('dist'));

test('Umami script is present and reachable', async ({ page }) => {
	await page.goto('/');

	const umamiScript = await page.locator('script[src*="umami"]').first();
	const scriptSrc = await umamiScript.getAttribute('src');

	expect(scriptSrc).toBeTruthy();

	const response = await page.request.get(scriptSrc!);
	expect(response.status()).toBe(200);
});

test.describe(`Umami events are reachable`, () => {
	for (const route of routes) {
		if (route.includes('/projects/') || route.includes('/about')) {
			test(`Events in ${route}`, async ({ page }) => {
				await page.goto(route);

				const githubLink = await page.locator('a[data-umami-event]').first();

				if (!(await githubLink.count()))
					throw new Error('No GitHub link found');

				await page.waitForLoadState('networkidle');

				const umamiRequests: string[] = [];
				page.on('request', (request) => {
					if (request.url().includes('umami') && request.method() === 'POST') {
						umamiRequests.push(request.url());
					}
				});

				await githubLink.click();
				await page.waitForTimeout(500);

				expect(umamiRequests.length).toBeGreaterThan(0);
			});
		}
	}
});
