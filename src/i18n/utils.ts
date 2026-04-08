import { defaultLang, languages, ui } from '@/src/i18n/ui';

export function getLangFromUrl(path: string): keyof typeof languages {
	console.log(`Path: ${path}`);
	const parts = path.split('/');
	if (parts.length < 2 || !parts[1]) {
		console.warn(`Invalid URL path: ${path}`);
		return defaultLang;
	}
	const lang = parts[1];
	if (lang in languages) return lang as keyof typeof languages;
	console.warn(`Unknown language code: ${lang}`);
	return defaultLang;
}

export function getBaseUrl(path: string): string {
	const parts = path.split('/');
	if (parts.length < 2) {
		console.warn(`Invalid URL path: ${path}`);
		return '/';
	}
	parts.splice(1, 1);
	return parts.join('/') || '/';
}

export function useTranslations(lang: keyof typeof languages) {
	return function t(key: keyof (typeof ui)[typeof defaultLang]) {
		return ui[lang][key] || ui[defaultLang][key];
	};
}

export function useTranslatedPath(lang: keyof typeof languages) {
	return function translatePath(path: string, l: string = lang) {
		//console.log(`/${l}${path}`);
		if (!path.startsWith('/')) {
			path = `/${path}`;
		}

		if (!path.endsWith('/')) {
			path = `${path}/`;
		}

		return `/${l}${path}`;
	};
}

export function getI18nStaticPaths() {
	return Object.keys(languages).map((lang) => ({ params: { lang } }));
}
