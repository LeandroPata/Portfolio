/// <reference types="vitest" />
import { getViteConfig } from 'astro/config';

export default getViteConfig({
	test: {
		exclude: ['./test/E2ETesting/'],
	},
});
