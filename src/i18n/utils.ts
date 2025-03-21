import { ui, defaultLang } from '@/src/i18n/ui';

export function getLangFromUrl(url: URL) {
	const [, lang] = url.pathname.split('/');
	if (lang in ui) return lang as keyof typeof ui;
	return defaultLang;
}

export function getBaseUrl(url: URL) {
	const baseUrl = url.pathname.split('/');
	baseUrl.splice(1, 1);
	//console.log(`${url.pathname}:${baseUrl}:${baseUrl.join('/')}`);
	return baseUrl.join('/');
}

export function useTranslations(lang: keyof typeof ui) {
	return function t(key: keyof (typeof ui)[typeof defaultLang]) {
		return ui[lang][key] || ui[defaultLang][key];
	};
}

export function useTranslatedPath(lang: keyof typeof ui) {
	return function translatePath(path: string, l: string = lang) {
		//console.log(`/${l}${path}`);
		return `/${l}${path}`;
	};
}
