import { expect, test } from '@/test/E2ETesting/fixtures';

test.describe('Theme toggle switches between light and dark mode', () => {
	test('Theme toggles correctly', async ({ page }) => {
		await page.goto('/', { waitUntil: 'domcontentloaded' });

		await page.waitForSelector('#menu-toggle', {
			state: 'attached',
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
	test('Theme persists when navigating', async ({ page }) => {
		await page.goto('/', { waitUntil: 'domcontentloaded' });

		await page.waitForSelector('#menu-toggle', {
			state: 'attached',
		});

		if (await page.locator('#menu-toggle').isVisible())
			await page.locator('#menu-toggle').click();

		const html = page.locator('html');
		const button = page.locator('theme-toggle button');

		const initialHasDark = await html.evaluate((el) =>
			el.classList.contains('theme-dark'),
		);
		console.log(initialHasDark);

		await button.click();

		const afterClickHasDark = await html.evaluate((el) =>
			el.classList.contains('theme-dark'),
		);
		console.log(afterClickHasDark);

		expect(afterClickHasDark).not.toBe(initialHasDark);

		await page.waitForSelector('#navbar', {
			state: 'visible',
		});

		const linkLocator = page.getByRole('link', { name: 'Projects' });
		const linkHref = await linkLocator.getAttribute('href');

		await linkLocator.click();
		await page.waitForURL(linkHref, { waitUntil: 'domcontentloaded' });

		const afterNavHasDark = await html.evaluate((el) =>
			el.classList.contains('theme-dark'),
		);
		console.log(afterNavHasDark);

		expect(afterNavHasDark).toBe(afterClickHasDark);
	});
});
