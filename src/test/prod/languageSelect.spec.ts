import { test, expect } from '@playwright/test';
import { ui } from '@/src/i18n/ui';

const baseUrl = 'https://leandropata.pt';
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
			console.log(`Current Locale: ${curLocale}`);
			splicedRoute.splice(1, 1);
			let baseRoute = splicedRoute.join('/');
			if (!baseRoute) baseRoute = '/';

			await page.waitForSelector('#menu-toggle', {
				state: 'attached',
				timeout: 10000,
			});

			if (await page.locator('#menu-toggle').isVisible())
				await page.locator('#menu-toggle').click();

			console.log(`Expected option: /${curLocale}${baseRoute}`);
			await expect(page.locator('#language-select')).toHaveValue(
				`/${curLocale}${baseRoute}`
			);

			console.log(`Expected: /${locale}${baseRoute}`);
			await page
				.locator('#language-select')
				.selectOption(`/${locale}${baseRoute}`);

			await expect(page).toHaveURL(`${baseUrl}/${locale}${baseRoute}`);
		});
	}
}
