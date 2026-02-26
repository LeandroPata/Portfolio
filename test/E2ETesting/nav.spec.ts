import { expect, test } from '@playwright/test';
import { languages } from '@/src/i18n/ui';

for (const locale in languages) {
	test(`Load all pages in navbar for the ${locale} locale`, async ({
		page,
	}) => {
		await page.goto(`${locale}`);

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
		const navbarLinks = navbarContents[0].split('\n').reverse();

		for (const link of navbarLinks) {
			if (!link) continue;

			const linkLocator = page.getByRole('link', { name: link });
			const linkHref = await linkLocator.getAttribute('href');

			await linkLocator.click();

			await expect(page).toHaveURL(`${linkHref}`, {
				timeout: 30 * 1000,
			});

			await page.waitForSelector('#menu-toggle', {
				state: 'attached',
				timeout: 30 * 1000,
			});

			if (await page.locator('#menu-toggle').isVisible())
				await page.locator('#menu-toggle').click();
		}
	});
}
