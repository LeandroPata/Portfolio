import { test as base, type Route } from '@playwright/test';

// Block all image requests from external domains
export const test = base.extend({
	page: async ({ page, browserName }, use) => {
		const blockExternalImages = (route: Route) => {
			if (route.request().resourceType() === 'image') return route.abort();
			return route.continue();
		};

		// Throttling CPU to simulate github actions environment
		/* if (browserName === 'chromium') {
			const cdpSession = await page.context().newCDPSession(page);
			await cdpSession.send('Emulation.setCPUThrottlingRate', { rate: 16 });
		} */

		await page.route(/^https?:\/\/(?!localhost)/, blockExternalImages);
		await use(page);
	},
});

export { expect } from '@playwright/test';
