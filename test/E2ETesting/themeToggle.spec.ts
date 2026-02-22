import { expect, test } from '@playwright/test';

test('Theme toggle switches between light and dark mode', async ({ page }) => {
	await page.goto('/');

	await page.waitForSelector('#menu-toggle', {
		state: 'attached',
		timeout: 30 * 1000,
	});

	if (await page.locator('#menu-toggle').isVisible())
		await page.locator('#menu-toggle').click();

	const html = page.locator('html');
	const button = page.locator('theme-toggle button');

	const initialHasDark = await html.evaluate((el) =>
		el.classList.contains('theme-dark'),
	);

	await button.click();
	const afterClickHasDark = await html.evaluate((el) =>
		el.classList.contains('theme-dark'),
	);

	expect(afterClickHasDark).not.toBe(initialHasDark);

	await button.click();
	const endHasDark = await html.evaluate((el) =>
		el.classList.contains('theme-dark'),
	);

	expect(endHasDark).toBe(initialHasDark);
});
