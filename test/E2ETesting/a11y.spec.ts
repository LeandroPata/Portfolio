import path from 'node:path';
import AxeBuilder from '@axe-core/playwright';
import getRoutes from '@/src/utils/getRoutes';
import { expect, test } from '@/test/E2ETesting/fixtures';

const routes = getRoutes(path.resolve('dist'));

test.describe('Accessibility Testing', () => {
	for (const route of routes) {
		test(`Accessibility in: ${route} with Light Theme`, async ({ page }) => {
			await page.goto(route, { waitUntil: 'load' });
			if (route === '/') await page.waitForURL((url) => url.pathname !== route);

			await page.waitForSelector('#menu-toggle', {
				state: 'attached',
			});

			if (await page.locator('#menu-toggle').isVisible())
				await page.locator('#menu-toggle').click();

			const html = page.locator('html');
			const button = page.locator('theme-toggle button');

			const hasDark = await html.evaluate((el) =>
				el.classList.contains('dark'),
			);
			if (hasDark) await button.click();

			const confirmDark = await html.evaluate((el) =>
				el.classList.contains('dark'),
			);

			expect(confirmDark).toBeFalsy();

			const accessibilityScanResults = await new AxeBuilder({ page }).analyze();
			expect(accessibilityScanResults.violations).toEqual([]);
		});

		test(`Accessibility in: ${route} with Dark Theme`, async ({ page }) => {
			await page.goto(route, { waitUntil: 'load' });
			if (route === '/') await page.waitForURL((url) => url.pathname !== route);

			await page.waitForSelector('#menu-toggle', {
				state: 'attached',
			});

			if (await page.locator('#menu-toggle').isVisible())
				await page.locator('#menu-toggle').click();

			const html = page.locator('html');
			const button = page.locator('theme-toggle button');

			const hasDark = await html.evaluate((el) =>
				el.classList.contains('dark'),
			);
			if (!hasDark) await button.click();

			const confirmDark = await html.evaluate((el) =>
				el.classList.contains('dark'),
			);

			expect(confirmDark).toBeTruthy();

			const accessibilityScanResults = await new AxeBuilder({ page }).analyze();
			expect(accessibilityScanResults.violations).toEqual([]);
		});
	}
});
