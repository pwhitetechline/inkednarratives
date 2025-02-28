import { defineCollection, z } from 'astro:content';

const blog = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    excerpt: z.string(),
    author: z.string(),
    date: z.string(),
    image: z.string().refine((val) => {
      // Accept both URLs and local paths starting with /
      return val.startsWith('http') || val.startsWith('/');
    }, {
      message: 'Image must be either a URL or a local path starting with /'
    }),
  })
});

const stories = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    excerpt: z.string(),
    author: z.string(),
    date: z.string(),
    image: z.string().refine((val) => {
      // Accept both URLs and local paths starting with /
      return val.startsWith('http') || val.startsWith('/');
    }, {
      message: 'Image must be either a URL or a local path starting with /'
    }),
    membershipRequired: z.boolean().default(false),
    category: z.string(),
    genre: z.array(z.string()),
    tags: z.array(z.string()),
    isMultiPart: z.boolean().default(false),
    totalParts: z.number().optional(),
    storyDir: z.string()
  })
});

// Export a single `collections` object to register your collection(s)
export const collections = {
  'blog': blog,
  'stories': stories,
};