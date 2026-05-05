import path from 'node:path';
import { getAllLocales, getLangFromUrl } from '@/src/i18n/utils';
import getRoutes from '@/src/utils/getRoutes';
import { expect, test } from '@/test/E2ETesting/fixtures';

const routes = getRoutes(path.resolve('dist'));
const locales = getAllLocales();

test.describe('SEO meta tags', () => {
	for (const route of routes) {
		test(`Meta Tags in: ${route}`, async ({ page }) => {
			await page.goto(route, { waitUntil: 'domcontentloaded' });
			if (route === '/') await page.waitForURL((url) => url.pathname !== route);

			// Title
			const title = await page.title();
			expect(title, '<title> must not be empty').toBeTruthy();
			expect(title, '<title> must not be the Astro default').not.toBe('Astro');

			// Description
			const description = await page
				.locator('meta[name="description"]')
				.getAttribute('content');
			expect(
				description,
				'meta description must be present and non-empty',
			).toBeTruthy();

			// Open Graph
			const ogTitle = await page
				.locator('meta[property="og:title"]')
				.getAttribute('content');
			expect(ogTitle, 'og:title must be present').toBeTruthy();

			const ogType = await page
				.locator('meta[property="og:type"]')
				.getAttribute('content');
			expect(ogType, 'og:type must be present').toBeTruthy();

			const ogURL = await page
				.locator('meta[property="og:url"]')
				.getAttribute('content');
			expect(ogURL, 'og:url must be present').toBeTruthy();

			const ogDescription = await page
				.locator('meta[property="og:description"]')
				.getAttribute('content');
			expect(ogDescription, 'og:description must be present').toBeTruthy();

			const ogImage = await page
				.locator('meta[property="og:image"]')
				.getAttribute('content');
			expect(ogImage, 'og:image must be present').toBeTruthy();

			const ogImageAlt = await page
				.locator('meta[property="og:image:alt"]')
				.getAttribute('content');
			expect(ogImageAlt, 'og:image:alt must be present').toBeTruthy();

			// Canonical
			const canonical = await page
				.locator('link[rel="canonical"]')
				.getAttribute('href');
			expect(canonical, 'canonical link must be present').toBeTruthy();

			expect(ogURL, 'og:url must match canonical link').toBe(canonical);

			// Locale Specific
			const locale = getLangFromUrl(route);
			if (locale) {
				const lang = await page.locator('html').getAttribute('lang');
				expect(lang, 'html[lang] must match route locale');

				for (const loc of locales) {
					const hrefLang = await page
						.locator(`link[rel="alternate"][hreflang="${loc}"]`)
						.getAttribute('href');

					expect(
						hrefLang,
						`hrefLang="${loc}" alternate must be present`,
					).toBeTruthy();
				}
			}
		});
	}
});
