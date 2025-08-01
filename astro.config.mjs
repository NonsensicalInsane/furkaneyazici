import path from "path";
import { fileURLToPath } from "url";
import { defineConfig } from "astro/config";

import sitemap from "@astrojs/sitemap";
import tailwind from "@astrojs/tailwind";
import mdx from "@astrojs/mdx";
import icon from "astro-icon";
import compress from "@playform/compress";
import preact from "@astrojs/preact";

import tasks from "./src/utils/tasks";
import {
  readingTimeRemarkPlugin,
  responsiveTablesRehypePlugin,
} from "./src/utils/frontmatter.mjs";
import { SITE } from "./src/utils/config.ts";

import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

/**
 * Astro v5 configuration
 */
export default defineConfig({
  // —— Site metadata ——
  site: SITE.site,
  base: SITE.base,
  trailingSlash: SITE.trailingSlash ? "always" : "never",
  output: "static",

  // —— Integrations ——
  integrations: [
    tailwind({ applyBaseStyles: false }),
    sitemap(),
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
    compress({
      CSS: true,
      HTML: { "html-minifier-terser": { removeAttributeQuotes: false } },
      Image: false,
      JavaScript: true,
      SVG: false,
      Logger: 1,
    }),
    tasks(),
    preact(),
  ],



  // —— Markdown ——
  markdown: {
    remarkPlugins: [readingTimeRemarkPlugin, remarkMath],
    rehypePlugins: [responsiveTablesRehypePlugin, rehypeKatex],
  },

  // —— Vite customisation ——
  vite: {
    resolve: {
      alias: {
        "~": path.resolve(__dirname, "./src"),
      },
    },
  },

  // —— Dev server ——
  server: {
    https: true, // Vite 7 built‑in self‑signed cert
  },
});
