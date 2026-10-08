import { defineCollection } from 'astro:content';
import { z } from 'astro/zod';
import { glob } from 'astro/loaders';
import { MOTIFS } from './utils/cover-motifs';

const metadataDefinition = () =>
  z
    .object({
      title: z.string().optional(),
      ignoreTitleTemplate: z.boolean().optional(),

      canonical: z.url().optional(),

      robots: z
        .object({
          index: z.boolean().optional(),
          follow: z.boolean().optional(),
        })
        .optional(),

      description: z.string().optional(),

      openGraph: z
        .object({
          url: z.string().optional(),
          siteName: z.string().optional(),
          images: z
            .array(
              z.object({
                url: z.string(),
                width: z.number().optional(),
                height: z.number().optional(),
              })
            )
            .optional(),
          locale: z.string().optional(),
          type: z.string().optional(),
        })
        .optional(),

      twitter: z
        .object({
          handle: z.string().optional(),
          site: z.string().optional(),
          cardType: z.string().optional(),
        })
        .optional(),
    })
    .optional();

const postCollection = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/post' }),
  schema: z.object({
    publishDate: z.date().optional(),
    updateDate: z.date().optional(),
    draft: z.boolean().optional(),

    title: z.string(),
    excerpt: z.string().optional(),
    // Short academic-style summary shown in a box above the post
    abstract: z.string().optional(),
    // Card-cover motif when the post has no image; picked from the category by default
    cover: z.enum(MOTIFS).optional(),
    image: z.string().optional(),

    category: z.string().optional(),
    tags: z.array(z.string()).optional(),

    // Series: posts with the same series name are linked as parts, in
    // seriesPart order (publish date when it's missing)
    series: z.string().optional(),
    seriesPart: z.number().int().positive().optional(),
    // Who the post is for, shown above it and on its card
    level: z.enum(['intro', 'intermediate', 'advanced']).optional(),
    // What to know first: plain text, or a post's URL ("/what-is-a-qubit/") to link it
    prerequisites: z.array(z.string()).optional(),
    author: z.string().optional(),

    // i18n: BCP-47 code of the post's language (defaults to the site language).
    // Posts sharing the same translationKey are translations of each other.
    lang: z.string().optional(),
    translationKey: z.string().optional(),

    metadata: metadataDefinition(),
  }),
});

export const collections = {
  post: postCollection,
};
