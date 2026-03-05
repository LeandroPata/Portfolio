import { getViteConfig } from 'astro/config';

export default getViteConfig({
	test: {
		environment: 'happy-dom',
		globals: true,
		exclude: ['./test/E2ETesting/', 'node_modules/'],
	},
});
