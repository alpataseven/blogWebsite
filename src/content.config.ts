import { glob } from 'astro/loaders';
import { defineCollection, z } from 'astro:content';

const blog = defineCollection({
	// Load Markdown and MDX files in the `src/content/blog/` directory.
	loader: glob({ base: './src/content/blog', pattern: '**/*.{md,mdx}' }),
	// Type-check frontmatter using a schema
	schema: ({ image }) => z.object({
		title: z.string(),
		description: z.string(),
		// Transform string to Date object
		pubDate: z.coerce.date(),
		updatedDate: z.coerce.date().optional(),
		heroImage: z.string().optional(),
		slug: z.string().optional(),
		readTime: z.number().optional(),
		category: z.string().optional(),
		tags: z.array(z.string()).optional(),
		author: z
      .object({
        name: z.string(),
        role: z.string(),
		avatar: z.string().optional(),
      })
      .optional(),
	}),
});

export const collections = { blog };
