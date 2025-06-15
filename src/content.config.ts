import { glob } from 'astro/loaders';
import { defineCollection, z } from 'astro:content';

// Blog koleksiyonu
const blog = defineCollection({
  loader: glob({ base: './src/content/blog', pattern: '**/*.{md,mdx}' }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      description: z.string(),
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

// Fotoğraf koleksiyonu (1 fotoğraf için)
const photo = defineCollection({
  loader: glob({ base: './src/content/photo', pattern: '**/*.{md,mdx}' }),
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
    image: z.string().optional(), // sadece 1 fotoğraf
    date: z.coerce.date(),
    slug: z.string().optional(),
  }),
});

export const collections = {
  blog,
  photo, // ✅ sadeleştirilmiş tek görsel koleksiyonu
};
