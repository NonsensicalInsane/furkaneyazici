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
  mathFlagRemarkPlugin,
  responsiveTablesRehypePlugin,
  bibliographyRehypePlugin,
} from "./src/utils/frontmatter.mjs";
import { numberingRemarkPlugin } from "./src/utils/remark-numbering.mjs";
import { SITE, APP_BLOG } from "./src/utils/config.ts";

import { unified } from "@astrojs/markdown-remark";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import rehypeCitation from "rehype-citation";

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

  // Prefetch every internal link on hover for snappy full-page navigation.
  // (prefetchAll used to be implied by <ClientRouter />, which is gone.)
  prefetch: { prefetchAll: true, defaultStrategy: "hover" },

  // —— Security ——
  // Hash-based CSP: Astro adds a <meta http-equiv="content-security-policy">
  // to every page whose script-src lists 'self' plus a hash of each inline
  // script on that page — injected scripts don't match, so they don't run.
  // It combines with the CSP header from netlify.toml (both must pass), which
  // keeps every other directive. Styles keep 'unsafe-inline' because Shiki
  // code blocks use inline style attributes.
  security: {
    csp: {
      styleDirective: { resources: ["'self'", "'unsafe-inline'"] },
    },
  },

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
      remarkPlugins: [readingTimeRemarkPlugin, remarkMath, mathFlagRemarkPlugin, numberingRemarkPlugin],
      rehypePlugins: [
        responsiveTablesRehypePlugin,
        // [@key] cites an entry of the shared BibTeX file; only cited entries
        // are listed at the end of the post. IEEE style ("[1]", as in physics
        // journals) keeps citations distinct from equation references "(1)".
        [
          rehypeCitation,
          { bibliography: "src/content/references.bib", csl: "src/content/ieee.csl", linkCitations: true },
        ],
        bibliographyRehypePlugin,
        rehypeKatex,
      ],
      remarkRehype: {
        // GFM footnotes ([^key]) are for side remarks; sources go through
        // BibTeX citations above, which own the "References" heading.
        footnoteLabel: "Notes",
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
