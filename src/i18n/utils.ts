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

export function saveLanguage(locale: string) {
	//console.log('saveLanguage: ' + locale);
	localStorage.setItem('locale', locale);
}

export function getLanguagePreference(saveToStorage = true) {
	if (typeof localStorage !== 'undefined' && localStorage.getItem('locale')) {
		let storedLang = localStorage.getItem('locale');

		if (!(storedLang in ui)) {
			for (const locale in ui) {
				if (storedLang.includes(locale)) {
					storedLang = locale;
					break;
				}
			}
		}

		if (storedLang in ui) return storedLang;
	}
	const lang = document.documentElement.getAttribute('lang');
	//console.log(lang);
	if (saveToStorage) saveLanguage(lang);
	return lang;
}
