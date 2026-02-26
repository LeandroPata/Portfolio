import { getCollection } from 'astro:content';
import { collections } from '@/src/content.config';

async function loadCollection(language = 'en') {
	const projects = await getCollection(
		`projects${language.charAt(0).toUpperCase() + language.slice(1)}`,
	);

	return projects;
}

export { loadCollection, collections };
