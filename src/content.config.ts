import { glob } from 'astro/loaders';
import { defineCollection, z } from 'astro:content';

const projectsEnCollection = defineCollection({
	// Load Markdown files in the src/content/en/projects directory
	loader: glob({ pattern: '**/*.md', base: './src/content/projects/en' }),
	schema: z.object({
		title: z.string(),
		slug: z.string(),
		locale: z.enum(['en', 'pt']),
		description: z.string(),
		publishDate: z.coerce.date(),
		tags: z.array(z.string()),
		img: z.string(),
		img_alt: z.string().optional(),
	}),
});

const projectsPtCollection = defineCollection({
	// Load Markdown files in the src/content/en/projects directory
	loader: glob({ pattern: '**/*.md', base: './src/content/projects/pt' }),
	schema: z.object({
		title: z.string(),
		slug: z.string(),
		locale: z.enum(['en', 'pt']),
		description: z.string(),
		publishDate: z.coerce.date(),
		tags: z.array(z.string()),
		img: z.string(),
		img_alt: z.string().optional(),
	}),
});

const collections = {
	projectsEn: projectsEnCollection,
	projectsPt: projectsPtCollection,
};

export { collections };
