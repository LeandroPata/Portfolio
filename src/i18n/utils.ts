import { ui, defaultLang } from '@/src/i18n/ui';

export function getLangFromUrl(path: string) {
	const [, lang] = path.split('/');
	if (lang in ui) return lang as keyof typeof ui;
	return defaultLang;
}

export function getBaseUrl(path: string) {
	const baseUrl = path.split('/');
	baseUrl.splice(1, 1);
	//console.log(`${path}:${baseUrl}:${baseUrl.join('/')}`);
	return baseUrl.join('/') || '/';
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
