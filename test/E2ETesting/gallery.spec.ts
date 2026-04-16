import path from 'node:path';
import getRoutes from '@/src/utils/getRoutes';
import { expect, test } from '@/test/E2ETesting/fixtures';

const routes = getRoutes(path.resolve('dist'));

test.describe('PhotoSwipe Gallery', () => {
	for (const route of routes) {
		test.describe(route, () => {
			test.beforeEach(async ({ page }) => {
				// Continue all CDN requests
				/* await page.route('https://cdn.jsdelivr.net/**', (route) =>
					route.continue(),
				); */

				/* page.on('console', (msg) => console.log('BROWSER: ', msg.text()));

				await page.evaluate(() => {
					window.addEventListener('load', () => console.log('LOAD FIRED'));
				});

				page.on('request', (req) => {
					if (
						!req.url().includes('localhost') &&
						!req.url().includes('jsdelivr')
					)
						console.log('EXTERNAL REQUEST: ', req.resourceType(), req.url());
				});

				page.on('requestfailed', (req) =>
					console.log('REQUEST FAILED: ', req.url(), req.failure()?.errorText),
				); */

				await page.goto(route, { waitUntil: 'load' });

				if (route === '/')
					await page.waitForURL((url) => url.pathname !== route);

				const galleryLinks = page.locator('#project-gallery a');
				test.skip(
					!(await galleryLinks.count()),
					'No gallery images on this page',
				);
			});

			test('Gallery images load correctly', async ({ page }) => {
				const failedRequests: string[] = [];

				// Continue all CDN requests
				await page.route('https://cdn.jsdelivr.net/**', (route) =>
					route.continue(),
				);

				page.on('response', (response) => {
					if (
						response.request().resourceType() === 'image' &&
						response.status() >= 400 &&
						response.url().includes('cdn.jsdelivr.net')
					) {
						failedRequests.push(`${response.url()} — ${response.status()}`);
					}
				});
				await page.goto(route, { waitUntil: 'domcontentloaded' });

				expect(failedRequests).toEqual([]);
			});

			test('Lightbox opens on image click', async ({ page }) => {
				await page.locator('#project-gallery a').first().click();
				await expect(page.locator('.pswp')).toBeVisible();
			});

			test('Lightbox closes with X button', async ({ page }) => {
				await page.locator('#project-gallery a').first().click();
				await expect(page.locator('.pswp')).toBeVisible();

				// Wait for the transition to end
				await page.waitForFunction(() => {
					const bg = document.querySelector('.pswp__bg') as HTMLElement;
					return bg?.style.transition === 'none';
				});

				await page.locator('.pswp__button--close').click();
				await expect(page.locator('.pswp')).not.toBeVisible();
			});

			test('Lightbox navigates to next image', async ({ page, isMobile }) => {
				// Continue all CDN requests
				await page.route('https://cdn.jsdelivr.net/**', (route) =>
					route.continue(),
				);

				await page.locator('#project-gallery a').first().click();
				await expect(page.locator('.pswp')).toBeVisible();

				const firstSrc = await page
					.locator('.pswp__img[src]')
					.first()
					.getAttribute('src');

				expect(firstSrc).not.toBe(null);

				// Wait for the transition to end
				await page.waitForFunction(() => {
					const bg = document.querySelector('.pswp__bg') as HTMLElement;
					return bg?.style.transition === 'none';
				});

				if (isMobile) {
					await page.keyboard.press('ArrowRight');
				} else {
					await page.locator('.pswp__button--arrow--next').click();
				}

				// Wait for the image to change
				await page.waitForFunction((src) => {
					const img = document.querySelector(
						'.pswp__img[src]',
					) as HTMLImageElement;
					return img?.src !== src;
				}, firstSrc);

				const secondSrc = await page
					.locator('.pswp__img[src]')
					.first()
					.getAttribute('src');

				expect(secondSrc).not.toBe(null);
				expect(firstSrc).not.toBe(secondSrc);
			});

			test('Lightbox closes with Escape key', async ({ page }) => {
				await page.locator('#project-gallery a').first().click();
				await expect(page.locator('.pswp')).toBeVisible();

				// Wait for the transition to end
				await page.waitForFunction(() => {
					const bg = document.querySelector('.pswp__bg') as HTMLElement;
					return bg?.style.transition === 'none';
				});

				await page.keyboard.press('Escape');
				await expect(page.locator('.pswp')).not.toBeVisible();
			});
		});
	}
});
