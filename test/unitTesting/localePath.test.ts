import { expect, test } from 'vitest';
import { ui } from '@/src/i18n/ui';
import { useTranslatedPath } from '@/src/i18n/utils';

for (const lang in ui) {
	//console.log(lang);
	const translatePath = useTranslatedPath(lang);
	test(`Returns correct path for ${lang} locale`, () => {
		expect(translatePath('/about', lang)).toBe(`/${lang}/about`);
	});
}
