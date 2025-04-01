// @ts-check
import { defineConfig } from 'astro/config';
import yeskunallumami from '@yeskunall/astro-umami';

import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
	site: 'https://leandropata.pt',
	integrations: [
		sitemap({
			i18n: {
				defaultLocale: 'en',
				locales: {
					en: 'en',
					pt: 'pt',
				},
			},
		}),
		yeskunallumami({ id: '70d6c3a8-dd33-4c44-aeb3-da69ddfcd2b9' }),
	],
	vite: {
		resolve: {
			alias: {
				'@': new URL('./', import.meta.url),
			},
		},
	},
	i18n: {
		locales: ['en', 'pt'],
		defaultLocale: 'en',
	},
});
