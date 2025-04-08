// tests/all-pages.spec.ts
import { test, expect } from '@playwright/test';
import fs from 'node:fs';
import path from 'node:path';

// Get all HTML file paths from the Astro build output
function getRoutes(dir: string, base: string = dir): string[] {
	const entries = fs.readdirSync(dir, { withFileTypes: true });
	const routes: string[] = [];

	for (const entry of entries) {
		const fullPath = path.join(dir, entry.name);
		if (entry.isDirectory()) {
			routes.push(...getRoutes(fullPath, base));
		} else if (entry.name.endsWith('.html')) {
			const relPath = path.relative(base, fullPath);
			const url = `/${relPath
				.replace(/index\.html$/, '')
				.replace(/\.html$/, '')
				.replace(/\\/g, '/')}`; // Normalize for Windows
			routes.push(url === '/' ? '/' : url);
		}
	}

	return routes;
}

export default getRoutes;
