import { test, expect } from '@playwright/test';
import { ui } from '@/src/i18n/ui';

const baseUrl = 'http://leandropata.pt/';
const routes = [
	'',
	'en/',
	'en/projects',
	'en/about',
	'pt/',
	'pt/projects',
	'pt/about',
];

for (const locale in ui) {
	for (const route of routes) {
		test(`Language selector navigates to '${locale}' at ${route}`, async ({
			page,
		}) => {
			await page.goto(baseUrl);

			const menuToggle = await page.locator('#menu-toggle');

			if ((await menuToggle.isEnabled()) && (await menuToggle.isVisible()))
				await page.locator('#menu-toggle').click();

			const select = page.locator('#language-select');
			await select.selectOption(`/${locale}/`);

			await expect(page).toHaveURL(new RegExp(`/${locale}(/|$)`));
		});
	}
}
