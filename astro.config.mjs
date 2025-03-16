// @ts-check
import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
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
