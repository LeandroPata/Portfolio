import { test, expect } from '@playwright/test';
import { ui } from '@/src/i18n/ui';

const baseUrl = 'http://localhost:4321';

for (const locale in ui) {
	test(`Load all pages in navbar for the ${locale} locale`, async ({
		page,
	}) => {
		await page.goto(`${baseUrl}/${locale}`);

		await page.waitForSelector('#menu-toggle', {
			state: 'attached',
			timeout: 30 * 1000,
		});

		if (await page.locator('#menu-toggle').isVisible())
			await page.locator('#menu-toggle').click();

		await page.waitForSelector('#navbar', {
			state: 'visible',
			timeout: 30 * 1000,
		});

		const navbar = page.locator('#navbar');
		const navbarContents = await navbar.allInnerTexts();
		const navbarLinks = navbarContents[0].split('\n');
		for (const link of navbarLinks) {
			const linkLocator = page.getByRole('link', { name: link });
			const linkHref = await linkLocator.getAttribute('href');

			await linkLocator.click();

			await expect(page).toHaveURL(`${baseUrl}${linkHref}`, {
				timeout: 30 * 1000,
			});

			await page.waitForSelector('#menu-toggle', {
				state: 'attached',
				timeout: 30 * 1000,
			});

			if (await page.locator('#menu-toggle').isVisible())
				await page.locator('#menu-toggle').click();
		}

		const linkLocator = page.getByRole('link', { name: navbarLinks[0] });
		const linkHref = await linkLocator.getAttribute('href');

		await linkLocator.click();

		await expect(page).toHaveURL(`${baseUrl}${linkHref}`, {
			timeout: 30 * 1000,
		});
	});
}
