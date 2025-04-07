/// <reference types="vitest" />
import { getViteConfig } from 'astro/config';

export default getViteConfig({
	test: {
		exclude: ['./src/test/', '**/tests-examples/**'],
	},
});
