import { test, expect } from '@playwright/test';

const baseUrl = 'http://localhost:4321/';

test('Umami script is present and reachable', async ({ page }) => {
	await page.goto(baseUrl);

	const umamiScript = await page.locator('script[src*="umami"]').first();
	const scriptSrc = await umamiScript.getAttribute('src');

	expect(scriptSrc).toBeTruthy();

	const response = await page.request.get(scriptSrc!);
	expect(response.status()).toBe(200);
});
