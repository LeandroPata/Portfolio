import fs from 'node:fs';
import path from 'node:path';

const CDN_HOST = 'cdn.jsdelivr.net';
const CDN_URL_REGEX = /(?:src|href)="(https?:\/\/cdn\.jsdelivr\.net[^"]*)"/g;

const readHTML = (route: string): string | null => {
	const stripped = route.replace(/^\//, '').replace(/\/$/, '');

	const candidates = [
		path.resolve('dist', stripped, 'index.html'),
		path.resolve('dist', `${stripped}.html`),
	];

	for (const filePath of candidates) {
		if (fs.existsSync(filePath)) {
			return fs.readFileSync(filePath, 'utf-8');
		}
	}

	return null;
};

const hasCDNLinks = (route: string): boolean => {
	return readHTML(route)?.includes(CDN_HOST) ?? false;
};

const hasCDNImages = (route: string): boolean => {
	const html = readHTML(route);
	return html
		? /<img[^>]+src="[^"]*cdn\.jsdelivr\.net[^"]*"/.test(html)
		: false;
};

const getCDNLinks = (route: string): string[] => {
	const html = readHTML(route);
	if (!html) return [];
	const matches = [...html.matchAll(CDN_URL_REGEX)];
	const urls = matches
		.map((m) => m[1])
		.filter((u): u is string => u !== undefined);
	return [...new Set(urls)];
};

const getCDNImages = (route: string) => {
	const html = readHTML(route);
	if (!html) return [];

	return [...html.matchAll(/<img[^>]+src="[^"]*cdn\.jsdelivr\.net[^"]*"/g)].map(
		(m) => m[0],
	);
};

const countCDNLinks = (route: string): number => {
	return getCDNLinks(route).length;
};

const countCDNImages = (route: string): number => {
	return getCDNImages(route).length;
};

export {
	hasCDNLinks,
	hasCDNImages,
	getCDNLinks,
	getCDNImages,
	countCDNLinks,
	countCDNImages,
};
