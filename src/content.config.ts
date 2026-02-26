import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';
import { languages } from './i18n/ui';

const projectsSchema = z.object({
	title: z.string(),
	slug: z.string(),
	locale: z.enum(Object.keys(languages) as [string, ...string[]]),
	github_url: z.string(),
	description: z.string(),
	publishDate: z.coerce.date(),
	tags: z.array(z.string()),
	img: z.string(),
	img_alt: z.string().optional(),
	imgs: z.array(z.array(z.string())).optional(),
});

const collections = Object.fromEntries(
	Object.keys(languages).map((lang) => [
		`projects${lang.charAt(0).toUpperCase() + lang.slice(1)}`,
		defineCollection({
			loader: glob({
				pattern: '**/*.md',
				base: `./src/content/projects/${lang}`,
			}),
			schema: projectsSchema,
		}),
	]),
);

export { collections };
