import { expect, test } from '@playwright/test';
import { languages } from '@/src/i18n/ui';

test.describe('Navbar navigation', () => {
	for (const locale in languages) {
		test(`Load all pages in navbar for the ${locale} locale`, async ({
			page,
		}) => {
			await page.goto(`${locale}`);

			await page.waitForSelector('#menu-toggle', {
				state: 'attached',
			});

			if (await page.locator('#menu-toggle').isVisible())
				await page.locator('#menu-toggle').click();

			await page.waitForSelector('#navbar', {
				state: 'visible',
			});

			const navbar = page.locator('#navbar');
			const navbarContents = await navbar.allInnerTexts();
			const navbarLinks = navbarContents[0].split('\n').reverse();

			for (const link of navbarLinks) {
				if (!link) continue;

				const linkLocator = page.getByRole('link', { name: link });
				const linkHref = await linkLocator.getAttribute('href');

				await linkLocator.click();

				await expect(page).toHaveURL(`${linkHref}`);

				await page.waitForSelector('#menu-toggle', {
					state: 'attached',
				});

				if (await page.locator('#menu-toggle').isVisible())
					await page.locator('#menu-toggle').click();
			}
		});
	}
});
