// @ts-check
import { defineConfig } from 'astro/config';

import react from '@astrojs/react';

// https://astro.build/config
export default defineConfig({
	vite: {
		resolve: {
			alias: {
				'@': new URL('./', import.meta.url),
			},
		},
	},
	integrations: [react()],
	i18n: {
		locales: ['en', 'pt'],
		defaultLocale: 'en',
	},
});
