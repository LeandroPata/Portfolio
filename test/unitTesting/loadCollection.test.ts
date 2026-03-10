import { beforeEach, describe, expect, it, vi } from 'vitest';
import { defaultLang, languages } from '@/src/i18n/ui';

const mockGetCollection = vi.fn();

vi.mock('astro:content', () => ({
	getCollection: mockGetCollection,
}));

vi.mock('@/src/content.config.ts', () => ({
	collections: {},
}));

describe('Load collection', () => {
	beforeEach(async () => {
		mockGetCollection.mockClear();
		mockGetCollection.mockResolvedValue([]);
	});

	it('Defaults to english collection when no language is provided', async () => {
		const { loadCollection } = await import('@/src/utils/loadData');
		await loadCollection();

		expect(mockGetCollection).toHaveBeenCalledWith('projectsEn');
	});

	it('Constructs the collection with the correct name for each language', async () => {
		const { loadCollection } = await import('@/src/utils/loadData');

		for (const lang of Object.keys(languages)) {
			mockGetCollection.mockClear();
			await loadCollection(lang);

			const expected = `projects${lang.charAt(0).toUpperCase() + lang.slice(1)}`;
			expect(mockGetCollection).toHaveBeenCalledWith(expected);
		}
	});

	it('Returns the collection data', async () => {
		const mockData = [{ id: 'project-one', data: { title: 'Project One' } }];
		mockGetCollection.mockResolvedValue(mockData);

		const { loadCollection } = await import('@/src/utils/loadData');
		const result = await loadCollection(defaultLang);

		expect(result).toEqual(mockData);
	});

	it('Returns empty array when collection is empty', async () => {
		mockGetCollection.mockResolvedValue([]);

		const { loadCollection } = await import('@/src/utils/loadData');
		const result = await loadCollection(defaultLang);

		expect(result).toEqual([]);
	});
});
