import { getCollection, type CollectionEntry } from 'astro:content';
import { collections } from '@/src/content.config';

async function loadCollection(language = 'en') {
	let projects: CollectionEntry[] = [];
	switch (language) {
		case 'pt':
			projects = await getCollection('projectsPt');
			break;
		default:
			projects = await getCollection('projectsEn');
	}
	return projects;
}

export { loadCollection, collections };
