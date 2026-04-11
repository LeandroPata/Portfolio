import path from 'node:path';
import { expect, test } from '@playwright/test';
import { languages } from '@/src/i18n/ui';
import getRoutes from '@/src/utils/getRoutes';

const routes = getRoutes(path.resolve('dist'));

test.describe('Language selection works correctly', () => {
	for (const locale in languages) {
		test.describe(`Language selection for locale: ${locale}`, () => {
			for (const route of routes) {
				const splicedRoute = route.split('/');
				const curLocale = splicedRoute[1] === 'pt' ? 'pt' : 'en';
				//console.log(`Current Locale: ${curLocale}`);
				splicedRoute.splice(1, 1);
				let baseRoute = splicedRoute.join('/') || '/';

				//console.log(`${route} : ${baseRoute}`);
				//console.log(`${locale} : ${curLocale}`);

				if (curLocale === locale) {
					continue;
				}

				test(`Language selector navigates to '${locale}' at ${route}`, async ({
					page,
				}) => {
					await page.goto(`${route}`, { waitUntil: 'domcontentloaded' });

					await page.waitForSelector('#menu-toggle', {
						state: 'attached',
					});

					if (await page.locator('#menu-toggle').isVisible())
						await page.locator('#menu-toggle').click();

					//console.log(`Expected option: /${curLocale}`);
					await expect(page.locator('#language-select')).toHaveValue(curLocale);

					//console.log(`Expected: ${locale}${baseRoute}`);
					await page.locator('#language-select').selectOption(locale);

					await expect(page).toHaveURL(`${locale}${baseRoute}`);
				});
			}
		});
	}
});
