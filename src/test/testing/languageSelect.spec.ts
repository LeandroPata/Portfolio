import { test, expect } from '@playwright/test';
import { ui } from '@/src/i18n/ui';

const baseUrl = 'http://localhost:4321';
const routes = [
	'/en/about/',
	'/en/',
	'/en/projects/',
	'/en/projects/memberManagementApp/',
	'/en/projects/orderManagementApp/',
	'/en/projects/portfolio/',
	'/',
	'/pt/about/',
	'/pt/',
	'/pt/projects/',
	'/pt/projects/memberManagementApp/',
	'/pt/projects/orderManagementApp/',
	'/pt/projects/portfolio/',
];

for (const locale in ui) {
	for (const route of routes) {
		test(`Language selector navigates to '${locale}' at ${route}`, async ({
			page,
		}) => {
			await page.goto(`${baseUrl}${route}`);

			const splicedRoute = route.split('/');
			const curLocale = splicedRoute[1] === 'pt' ? 'pt' : 'en';
			splicedRoute.splice(1, 1);
			let baseRoute = splicedRoute.join('/');
			if (!baseRoute) baseRoute = '/';

			const menuToggle = await page.locator('#menu-toggle');

			if ((await menuToggle.isEnabled()) && (await menuToggle.isVisible()))
				await page.locator('#menu-toggle').click();

			await expect(page.locator('#language-select')).toHaveValue(
				`/${curLocale}${baseRoute}`
			);

			console.log(`/${locale}${baseRoute}`);
			await page
				.locator('#language-select')
				.selectOption(`/${locale}${baseRoute}`);

			await expect(page).toHaveURL(`${baseUrl}/${locale}${baseRoute}`);
		});
	}
}
