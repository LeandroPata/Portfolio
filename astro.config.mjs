// @ts-check
import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
	integrations: [umami({ id: '94db1cb1-74f4-4a40-ad6c-962362670409' })],
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
