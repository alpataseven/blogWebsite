import { defineCollection, z } from "astro:content";

const blogCollection = defineCollection({
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.date(),
    updatedDate: z.date().optional(),
    slug: z.string().optional(),
    readTime: z.number().optional(),
    heroImage: z.string().optional(), // ← sadece string olacak şekilde değiştirildi
    category: z.string().optional(),
    tags: z.array(z.string()).optional(),
    author: z
      .object({
        name: z.string(),
        role: z.string(),
        avatar: z.string(),
      })
      .optional(),
  }),
});

export const collections = {
  blog: blogCollection,
};
