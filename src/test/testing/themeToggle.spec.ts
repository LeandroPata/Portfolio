import { test, expect } from '@playwright/test';

const baseUrl = 'http://localhost:4321/';

test('Theme toggle switches between light and dark mode', async ({ page }) => {
	await page.goto(baseUrl);

	const menuToggle = await page.locator('#menu-toggle');

	if ((await menuToggle.isEnabled()) && (await menuToggle.isVisible()))
		await page.locator('#menu-toggle').click();

	const html = page.locator('html');
	const button = page.locator('theme-toggle button');

	const initialHasDark = await html.evaluate((el) =>
		el.classList.contains('theme-dark')
	);

	await button.click();
	const afterClickHasDark = await html.evaluate((el) =>
		el.classList.contains('theme-dark')
	);

	expect(afterClickHasDark).not.toBe(initialHasDark);
});
