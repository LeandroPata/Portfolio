import fs from 'node:fs';
import path from 'node:path';

const hasCDNLinks = (route: string): boolean => {
	const stripped = route.replace(/^\//, '').replace(/\/$/, '');

	const candidates = [
		path.resolve('dist', stripped, 'index.html'),
		path.resolve('dist', `${stripped}.html`),
	];

	for (const filePath of candidates) {
		if (fs.existsSync(filePath)) {
			return fs.readFileSync(filePath, 'utf-8').includes('cdn.jsdelivr.net');
		}
	}

	return false;
};

const hasCDNImages = (route: string): boolean => {
	const stripped = route.replace(/^\//, '').replace(/\/$/, '');

	const candidates = [
		path.resolve('dist', stripped, 'index.html'),
		path.resolve('dist', `${stripped}.html`),
	];

	for (const filePath of candidates) {
		if (fs.existsSync(filePath)) {
			const html = fs.readFileSync(filePath, 'utf-8');
			return /<img[^>]+src="[^"]*cdn\.jsdelivr\.net[^"]*"/.test(html);
		}
	}

	return false;
};

const countCDNImages = (route: string): number => {
	const stripped = route.replace(/^\//, '').replace(/\/$/, '');

	const candidates = [
		path.resolve('dist', stripped, 'index.html'),
		path.resolve('dist', `${stripped}.html`),
	];

	for (const filePath of candidates) {
		if (fs.existsSync(filePath)) {
			const html = fs.readFileSync(filePath, 'utf-8');
			const count =
				html.match(/<img[^>]+src="[^"]*cdn\.jsdelivr\.net[^"]*"/g)?.length || 0;
			return count;
		}
	}

	return 0;
};

export { hasCDNLinks, hasCDNImages, countCDNImages };
