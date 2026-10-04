import path from "path";
import { fileURLToPath } from "url";
import { defineConfig } from "astro/config";

import sitemap from "@astrojs/sitemap";
import tailwindcss from "@tailwindcss/vite";
import mdx from "@astrojs/mdx";
import icon from "astro-icon";

import tasks from "./src/utils/tasks";
import {
  readingTimeRemarkPlugin,
  responsiveTablesRehypePlugin,
} from "./src/utils/frontmatter.mjs";
import { SITE, APP_BLOG } from "./src/utils/config.ts";

import { unified } from "@astrojs/markdown-remark";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Keep the sitemap consistent with each page's robots meta: pages marked
// noindex (tags by default, page 2+ of the blog list) don't belong in it.
const NOINDEX_PREFIXES = [APP_BLOG.tag, APP_BLOG.category]
  .filter((route) => route.robots?.index === false)
  .map((route) => `/${route.pathname}/`);
const BLOG_LIST_PAGE_N = new RegExp(`^/${APP_BLOG.list.pathname}/\\d+/?$`);

const isIndexable = (page) => {
  const { pathname } = new URL(page);
  return !NOINDEX_PREFIXES.some((prefix) => pathname.startsWith(prefix)) && !BLOG_LIST_PAGE_N.test(pathname);
};

/**
 * Astro configuration
 */
export default defineConfig({
  // —— Site metadata ——
  site: SITE.site,
  base: SITE.base,
  trailingSlash: SITE.trailingSlash ? "always" : "never",
  output: "static",

  // Prefetch links on hover/viewport for snappier navigation
  prefetch: true,

  // —— Integrations ——
  integrations: [
    sitemap({ filter: isIndexable }),
    mdx(),
    icon({
      include: {
        tabler: ["*"],
        "flat-color-icons": [
          "template",
          "gallery",
          "approval",
          "document",
          "advertising",
          "currency-exchange",
          "voice-presentation",
          "business-contact",
          "database",
        ],
      },
    }),
    tasks(),
  ],



  // —— Markdown ——
  // remark/rehype pipeline (Astro 7.3+ defaults to Sätteri, which doesn't run
  // these plugins). @astrojs/mdx picks the same plugins up from here.
  markdown: {
    processor: unified({
      remarkPlugins: [readingTimeRemarkPlugin, remarkMath],
      rehypePlugins: [responsiveTablesRehypePlugin, rehypeKatex],
      remarkRehype: {
        // GFM footnotes double as an academic citation system: [^key] in the
        // text becomes a numbered link into this section at the bottom.
        footnoteLabel: "References",
        footnoteLabelProperties: { className: [""] },
        footnoteBackLabel: "Back to text",
      },
    }),
  },

  // —— Vite customisation ——
  vite: {
    plugins: [tailwindcss()],
    resolve: {
      alias: {
        "~": path.resolve(__dirname, "./src"),
      },
    },
  },
});
