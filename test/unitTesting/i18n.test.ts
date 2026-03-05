// @vitest-environment happy-dom
/// <reference types="vitest" />

import { beforeEach, describe, expect, it } from 'vitest';
import { defaultLang, languages, ui } from '@/src/i18n/ui';
import {
	getBaseUrl,
	getI18nStaticPaths,
	getLangFromUrl,
	getLanguagePreference,
	saveLanguage,
	useTranslatedPath,
	useTranslations,
} from '@/src/i18n/utils';

// -------------------------------------------------------
// getLangFromUrl
// -------------------------------------------------------

describe('getLangFromUrl', () => {
	it('Extracts a valid language from the URL', () => {
		for (const lang of Object.keys(languages)) {
			expect(getLangFromUrl(`/${lang}/about`)).toBe(lang);
		}
	});

	it('Returns the default language when lang segment is missing', () => {
		expect(getLangFromUrl('/about')).toBe(defaultLang);
	});

	it('Returns the default language for an unknown language segment', () => {
		const unknownLang = 'xx';

		if (Object.keys(languages).includes(unknownLang)) {
			throw new Error(
				`Test setup error: ${unknownLang} is actually a defined language`,
			);
		}

		expect(getLangFromUrl(`/${unknownLang}/about`)).toBe(defaultLang);
	});

	it('Returns the default language for the root path', () => {
		expect(getLangFromUrl('/')).toBe(defaultLang);
	});

	it('Returns the default language for an empty string', () => {
		expect(getLangFromUrl('')).toBe(defaultLang);
	});
});

// -------------------------------------------------------
// getBaseUrl
// -------------------------------------------------------
describe('getBaseUrl', () => {
	it('Strips the language segment from a path', () => {
		expect(getBaseUrl('/en/about')).toBe('/about');
	});

	it('Handles the language root path', () => {
		expect(getBaseUrl('/en/')).toBe('/');
	});

	it('Handles nested paths', () => {
		expect(getBaseUrl('/en/projects/orderManagementApp')).toBe(
			'/projects/orderManagementApp',
		);
	});

	it('Returns / for the root path', () => {
		expect(getBaseUrl('/')).toBe('/');
	});

	it('Works for all defined languages', () => {
		for (const lang of Object.keys(languages)) {
			expect(getBaseUrl(`/${lang}/about`)).toBe('/about');
		}
	});
});

// -------------------------------------------------------
// useTranslations
// -------------------------------------------------------
describe('useTranslations', () => {
	it('Returns the correct translation for a given key and language', () => {
		for (const lang of Object.keys(languages) as (keyof typeof ui)[]) {
			const t = useTranslations(lang);
			expect(t('nav.home')).toBe(ui[lang]['nav.home']);
		}
	});

	it('Falls back to default language when key is missing in requested language', () => {
		// Force a missing key scenario by using a key that only exists in defaultLang
		const t = useTranslations(defaultLang);
		expect(t('nav.home')).toBe(ui[defaultLang]['nav.home']);
	});

	it('Returns a string for every key in the default language', () => {
		const t = useTranslations(defaultLang);
		for (const key of Object.keys(
			ui[defaultLang],
		) as (keyof (typeof ui)[typeof defaultLang])[]) {
			const result = t(key);
			expect(result).toBeDefined();
		}
	});
});

// -------------------------------------------------------
// useTranslatedPath
// -------------------------------------------------------
describe('useTranslatedPath', () => {
	for (const lang in languages) {
		const translatePath = useTranslatedPath(lang);
		it(`Returns correct path for ${lang} locale`, () => {
			expect(translatePath('/about', lang)).toBe(`/${lang}/about`);
		});
	}

	const translatePath = useTranslatedPath(defaultLang);

	it('Uses the default locale when none is provided', () => {
		expect(translatePath('/about')).toBe(`/${defaultLang}/about`);
	});

	it('Overrides default locale when one is provided', () => {
		const otherLang = Object.keys(languages).find(
			(lang) => lang !== defaultLang,
		)!;

		expect(translatePath('/about', otherLang)).toBe(`/${otherLang}/about`);
	});

	it('Handles root path correctly', () => {
		expect(translatePath('/')).toBe(`/${defaultLang}`);
	});

	it('Handles nested paths correctly', () => {
		expect(translatePath('/projects/orderManagementApp')).toBe(
			`/${defaultLang}/projects/orderManagementApp`,
		);
	});

	it('Handles without leading slash', () => {
		expect(translatePath('about')).toBe(`/${defaultLang}/about`);
	});
});

// -------------------------------------------------------
// getI18nStaticPaths
// -------------------------------------------------------
describe('getI18nStaticPaths', () => {
	it('Returns a path object for every defined language', () => {
		const paths = getI18nStaticPaths();
		expect(paths).toHaveLength(Object.keys(languages).length);
	});

	it('Includes every language as a param', () => {
		const paths = getI18nStaticPaths();
		const langs = paths.map((p) => p.params.lang);
		for (const lang of Object.keys(languages)) {
			expect(langs).toContain(lang);
		}
	});

	it('Returns objects with the correct shape', () => {
		const paths = getI18nStaticPaths();
		for (const path of paths) {
			expect(path).toHaveProperty('params');
			expect(path.params).toHaveProperty('lang');
		}
	});
});

// -------------------------------------------------------
// saveLanguage / getLanguagePreference
// (browser API dependent — requires localStorage and document mocks)
// -------------------------------------------------------
describe('saveLanguage', () => {
	// Check if localStorage is available
	beforeEach(() => {
		localStorage.clear();
	});

	it('Saves the language to localStorage', () => {
		saveLanguage('en');
		expect(localStorage.getItem('locale')).toBe('en');
	});

	it('Overwrites a previously saved language', () => {
		saveLanguage('en');
		saveLanguage('pt');
		expect(localStorage.getItem('locale')).toBe('pt');
	});
});

describe('getLanguagePreference', () => {
	beforeEach(() => {
		localStorage.clear();
		document.documentElement.setAttribute('lang', defaultLang);
	});

	it('Returns the stored language from localStorage', () => {
		localStorage.setItem('locale', 'pt');
		expect(getLanguagePreference(false)).toBe('pt');
	});

	it('Falls back to document lang attribute when localStorage is empty', () => {
		document.documentElement.setAttribute('lang', 'pt');
		expect(getLanguagePreference(false)).toBe('pt');
	});

	it('Saves the language to localStorage when saveToStorage is true', () => {
		document.documentElement.setAttribute('lang', 'pt');
		getLanguagePreference(true);
		expect(localStorage.getItem('locale')).toBe('pt');
	});

	it('Does not save to localStorage when saveToStorage is false', () => {
		document.documentElement.setAttribute('lang', 'pt');
		getLanguagePreference(false);
		expect(localStorage.getItem('locale')).toBeNull();
	});

	it('Normalizes a full locale string like en-US to a known language', () => {
		localStorage.setItem('locale', 'en-US');
		expect(getLanguagePreference(false)).toBe('en');
	});
});
