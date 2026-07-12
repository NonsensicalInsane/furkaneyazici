import path from "path";
import { fileURLToPath } from "url";
import { defineConfig } from "astro/config";

import sitemap from "@astrojs/sitemap";
import tailwindcss from "@tailwindcss/vite";
import mdx from "@astrojs/mdx";
import icon from "astro-icon";
import compress from "@playform/compress";

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

  // Prefetch links on hover/viewport for snappier navigation
  prefetch: true,

  // —— Integrations ——
  integrations: [
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
      // CSS must stay false: Vite already minifies it, and this compressor's
      // parser drops Tailwind 4's range-syntax media queries — i.e. ALL
      // responsive (sm:/md:/lg:) styles — from the output.
      CSS: false,
      HTML: { "html-minifier-terser": { removeAttributeQuotes: false } },
      Image: false,
      JavaScript: true,
      SVG: false,
      Logger: 1,
    }),
    tasks(),
  ],



  // —— Markdown ——
  markdown: {
    remarkPlugins: [readingTimeRemarkPlugin, remarkMath],
    rehypePlugins: [responsiveTablesRehypePlugin, rehypeKatex],
    remarkRehype: {
      // GFM footnotes double as an academic citation system: [^key] in the
      // text becomes a numbered link into this section at the bottom.
      footnoteLabel: "References",
      footnoteLabelProperties: { className: [""] },
      footnoteBackLabel: "Back to text",
    },
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

  // —— Dev server ——
  server: {
    https: true, // Vite 7 built‑in self‑signed cert
  },
});
