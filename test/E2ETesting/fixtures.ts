import { test as base, type Route } from '@playwright/test';

// Block all image requests from external domains
export const test = base.extend({
	page: async ({ page }, use) => {
		const blockExternalImages = (route: Route) => {
			if (route.request().resourceType() === 'image') return route.abort();
			return route.continue();
		};

		await page.route(/^https?:\/\/(?!localhost)/, blockExternalImages);
		await use(page);
	},
});

export { expect } from '@playwright/test';
