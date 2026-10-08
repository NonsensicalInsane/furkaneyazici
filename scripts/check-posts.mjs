#!/usr/bin/env node
// Pre-publish check for blog posts: what the build doesn't catch, or catches
// late. Run it before setting `draft: false`:
//
//   npm run check:posts            all posts
//   npm run check:posts -- my-post only src/content/post/my-post.md(x)
//
// Errors (✗) block publishing: they fail the command for published posts.
// In drafts they're listed too, but don't fail it. Warnings (!) are advice.
// Files starting with "_" (the authoring guide) are skipped.

import fs from 'node:fs';
import path from 'node:path';
import { load } from 'js-yaml';
import { glossary } from '../src/data/glossary.ts';

const ROOT = path.resolve(import.meta.dirname, '..');
const POSTS = path.join(ROOT, 'src/content/post');
const LEVELS = ['intro', 'intermediate', 'advanced'];
const MB = 1024 * 1024;
const LIMITS = [
  // [folder, bytes, what]
  ['src/assets/images/posts', 0.5 * MB, 'image'],
  ['public/figures', 1 * MB, 'chart data'],
  ['public/videos', 15 * MB, 'video'],
];

const only = process.argv[2];
const files = fs
  .readdirSync(POSTS)
  .filter((f) => /\.mdx?$/.test(f) && !f.startsWith('_'))
  .filter((f) => !only || f.replace(/\.mdx?$/, '') === only);
if (only && files.length === 0) {
  console.error(`No post called "${only}" in src/content/post`);
  process.exit(1);
}

// Every post's front matter first: series and prerequisites look across posts
const posts = fs
  .readdirSync(POSTS)
  .filter((f) => /\.mdx?$/.test(f))
  .map((file) => {
    const source = fs.readFileSync(path.join(POSTS, file), 'utf8');
    const match = source.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?/);
    let data = {};
    let yamlError;
    try {
      data = (match && load(match[1])) || {};
    } catch (e) {
      yamlError = e.message.split('\n')[0];
    }
    const slug = file.replace(/\.mdx?$/, '').toLowerCase();
    const bodyStart = match ? match[0].split('\n').length - 1 : 0;
    return { file, slug, source, data, yamlError, body: match ? source.slice(match[0].length) : source, bodyStart };
  });

// Code (fenced and inline) is the author's to write as they like: blank it out,
// keeping line breaks so line numbers still match
const withoutCode = (text) =>
  text
    .replace(/(^|\n)(```|~~~)[\s\S]*?\n\2[^\n]*/g, (m) => m.replace(/[^\n]/g, ' '))
    .replace(/`[^`\n]+`/g, (m) => ' '.repeat(m.length));

// A tag's attributes; quoted values and {expressions} may contain ">" (alt="|0>")
const ATTRS = `(?:"[^"]*"|'[^']*'|\\{[^}]*\\}|[^>"'{])*?`;
const lineOf = (post, index) => post.bodyStart + post.body.slice(0, index).split('\n').length;
const exists = (relative) => fs.existsSync(path.join(ROOT, relative));
const attr = (tag, name) => {
  const m = tag.match(new RegExp(`\\b${name}=(?:"([^"]*)"|'([^']*)'|\\{([^}]*)\\})`));
  return m ? (m[1] ?? m[2] ?? m[3]) : undefined;
};

let failingErrors = 0;
let totalErrors = 0;
let totalWarnings = 0;

for (const post of posts.filter((p) => files.includes(p.file))) {
  const { data, file } = post;
  const issues = [];
  const error = (message, line) => issues.push({ level: 'error', message, line });
  const warn = (message, line) => issues.push({ level: 'warn', message, line });

  if (post.yamlError) error(`front matter isn't valid YAML: ${post.yamlError}`, 1);
  const frontMatter = post.source.split('\n').slice(0, post.bodyStart);
  frontMatter.forEach((text, i) => {
    if (text.includes('TODO')) error('leftover TODO in the front matter', i + 1);
  });

  // --- front matter
  if (!data.title) error('no title', 1);
  if (!data.excerpt) warn('no excerpt: cards and link previews will have no description');
  else if (data.excerpt.length < 50) warn(`excerpt is short (${data.excerpt.length} characters; 50–200 reads best)`);
  else if (data.excerpt.length > 200) warn(`excerpt is long (${data.excerpt.length} characters; cards cut it at ~200)`);
  if (data.abstract && data.abstract.length > 700) warn(`abstract is long (${data.abstract.length} characters; aim for under 700)`);
  if (data.level && !LEVELS.includes(data.level)) error(`level "${data.level}" isn't one of ${LEVELS.join(', ')}`);
  if (data.publishDate && new Date(data.publishDate) > new Date()) {
    warn(`publishDate ${String(data.publishDate).slice(0, 10)} is in the future: the post still goes live on the next deploy`);
  }
  if (typeof data.image === 'string' && data.image.startsWith('~/') && !exists(data.image.replace('~/', 'src/'))) {
    error(`image ${data.image} doesn't exist`);
  }

  // --- series
  if (data.seriesPart && !data.series) warn('seriesPart without series');
  if (data.series) {
    const others = posts.filter((p) => p !== post && p.data.series === data.series);
    if (others.length === 0) warn(`only post in the series "${data.series}" (check the spelling against the other parts)`);
    const clash = others.find((p) => data.seriesPart && p.data.seriesPart === data.seriesPart);
    if (clash) error(`seriesPart ${data.seriesPart} is also used by ${clash.file}`);
  }

  // --- prerequisites that link to posts
  for (const item of data.prerequisites || []) {
    if (item.startsWith('/') && !posts.some((p) => `/${p.slug}/` === `/${item.replace(/^\/|\/$/g, '').toLowerCase()}/`)) {
      error(`prerequisite ${item} isn't the URL of a post`);
    }
  }

  // --- body
  const body = withoutCode(post.body);
  for (const m of body.matchAll(/TODO/g)) {
    error('leftover TODO (from the notebook converter?)', lineOf(post, m.index));
  }
  for (const m of body.matchAll(/^# .+/gm)) warn('"# " heading: the title is already the page heading; use ## and ###', lineOf(post, m.index));
  for (const m of body.matchAll(/\]\(http:\/\//g)) warn('http:// link: use https:// where the site supports it', lineOf(post, m.index));

  for (const m of body.matchAll(/!\[([^\]]*)\]\(([^)\s]+)/g)) {
    if (!m[1].trim()) error('Markdown image without alt text: ![describe it](…)', lineOf(post, m.index));
  }

  for (const m of body.matchAll(new RegExp(`<(Figure|PlotlyChart|Animation)\\b(${ATTRS})(\\/?)>`, 'g'))) {
    const [tag, name, , selfClosing] = m;
    const line = lineOf(post, m.index);
    const alt = attr(tag, 'alt');
    if (!alt || !alt.trim() || alt.includes('TODO')) error(`<${name}> without alt text (what the figure shows, for screen readers)`, line);
    if (selfClosing) warn(`<${name}> without a caption (the text between the tags)`, line);
    for (const key of ['src', 'poster']) {
      const value = attr(tag, key);
      if (value?.startsWith('/') && !exists(path.join('public', value))) error(`${key}="${value}" isn't in public/`, line);
    }
  }

  for (const m of post.source.matchAll(/^import\s+[\w{}\s,]+\s+from\s+['"]~\/([^'"]+)['"]/gm)) {
    if (!exists(path.join('src', m[1]))) error(`imported file src/${m[1]} doesn't exist`, post.source.slice(0, m.index).split('\n').length);
  }

  for (const m of body.matchAll(new RegExp(`<Term\\b(${ATTRS})>`, 'g'))) {
    const id = attr(m[0], 'id');
    const def = attr(m[0], 'def');
    if (id && !glossary[id]) error(`<Term id="${id}">: not in src/data/glossary.ts`, lineOf(post, m.index));
    if (id && glossary[id] && data.lang && data.lang !== 'en' && !glossary[id].translations?.[data.lang]) {
      warn(`<Term id="${id}">: no "${data.lang}" translation in the glossary, so the English definition is shown`, lineOf(post, m.index));
    }
    if (!id && !def) error('<Term> needs id="…" (glossary) or def="…"', lineOf(post, m.index));
  }

  // --- file sizes of this post's own folders
  for (const [folder, limit, what] of LIMITS) {
    const dir = path.join(ROOT, folder, post.slug);
    if (!fs.existsSync(dir)) continue;
    for (const name of fs.readdirSync(dir)) {
      const size = fs.statSync(path.join(dir, name)).size;
      if (size > limit) warn(`${what} ${folder}/${post.slug}/${name} is ${(size / MB).toFixed(1)} MB (over ${limit / MB} MB slows the page)`);
    }
  }

  // --- report
  const errors = issues.filter((i) => i.level === 'error').length;
  totalErrors += errors;
  totalWarnings += issues.length - errors;
  if (!data.draft) failingErrors += errors;
  const status = errors ? '✗' : issues.length ? '!' : '✓';
  console.log(`${status} ${file}${data.draft ? ' (draft)' : ''}`);
  for (const issue of issues.sort((a, b) => (a.line ?? 0) - (b.line ?? 0))) {
    const where = issue.line ? `line ${issue.line}: ` : '';
    console.log(`    ${issue.level === 'error' ? '✗ error' : '! warn '}  ${where}${issue.message}`);
  }
}

console.log(
  `\n${files.length} post(s): ${totalErrors} error(s), ${totalWarnings} warning(s)` +
    (failingErrors ? ` — ${failingErrors} in published posts, fix before deploying` : '')
);
process.exit(failingErrors ? 1 : 0);
