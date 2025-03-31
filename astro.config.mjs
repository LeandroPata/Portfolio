// @ts-check
import { defineConfig } from 'astro/config';
import umami from '@yeskunall/astro-umami';

// https://astro.build/config
export default defineConfig({
	integrations: [
		umami({
			id: '70d6c3a8-dd33-4c44-aeb3-da69ddfcd2b9',
			trackerScriptName: 'info.js',
		}),
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
