import path from 'path';
import { fileURLToPath } from 'url';
import { defineConfig, squooshImageService } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import tailwind from '@astrojs/tailwind';
import mdx from '@astrojs/mdx';
// import partytown from '@astrojs/partytown';
import icon from 'astro-icon';
import compress from 'astro-compress';
import tasks from './src/utils/tasks';
import { readingTimeRemarkPlugin, responsiveTablesRehypePlugin } from './src/utils/frontmatter.mjs';
import { SITE } from './src/utils/config.ts';
import vercel from "@astrojs/vercel/serverless";
import preact from "@astrojs/preact";
import storyblok from "@storyblok/astro";
import netlify from "@astrojs/netlify";
const __dirname = path.dirname(fileURLToPath(import.meta.url));

// https://astro.build/config
export default defineConfig({
  site: SITE.site,
  base: SITE.base,
  trailingSlash: SITE.trailingSlash ? 'always' : 'never',
  output: 'hybrid',
  adapter: vercel(),
  integrations: [tailwind({
    applyBaseStyles: false
  }), sitemap(), mdx(), icon({
    include: {
      tabler: ['*'],
      'flat-color-icons': ['template', 'gallery', 'approval', 'document', 'advertising', 'currency-exchange', 'voice-presentation', 'business-contact', 'database']
    }
  }), compress({
    CSS: true,
    HTML: {
      'html-minifier-terser': {
        removeAttributeQuotes: false
      }
    },
    Image: false,
    JavaScript: true,
    SVG: false,
    Logger: 1
  }), 
  tasks(), 
  preact(),
  storyblok({
    accessToken: "Ctj1eeLrOkGfJ7X1YBWLIgtt",
    components: {
      page: "storyblok/Page",
      feature: "storyblok/Feature",
      grid: "storyblok/Grid",
      teaser: "storyblok/Teaser",
    },
  }),

],
  image: {
    service: squooshImageService()
  },
  markdown: {
    remarkPlugins: [readingTimeRemarkPlugin],
    rehypePlugins: [responsiveTablesRehypePlugin]
  },
  vite: {
    resolve: {
      alias: {
        '~': path.resolve(__dirname, './src')
      }
    }
  },
});