import getReadingTime from 'reading-time';
import { toString } from 'mdast-util-to-string';
import { ui } from '../i18n/ui.ts';

export function readingTimeRemarkPlugin() {
  return function (tree, file) {
    const textOnPage = toString(tree);
    const readingTime = Math.ceil(getReadingTime(textOnPage).minutes);

    file.data.astro.frontmatter.readingTime = readingTime;
  };
}

// Flags posts that contain math (remark-math's `math` / `inlineMath` nodes), so
// the KaTeX stylesheet and its fonts only load on pages that render formulas.
export function mathFlagRemarkPlugin() {
  const hasMath = (node) =>
    node.type === 'math' || node.type === 'inlineMath' || (node.children || []).some(hasMath);

  return function (tree, file) {
    file.data.astro.frontmatter.hasMath = hasMath(tree);
  };
}

// Finishes rehype-citation's bibliography (div#refs): adds a real
// "References" heading, and turns DOIs into links to https://doi.org/.
const DOI = /\b(10\.\d{4,9}\/[^\s]+?)(?=[.,;]?(?:\s|$))/g;

function linkDois(node) {
  if (!node.children) return;
  node.children = node.children.flatMap((child) => {
    if (child.type !== 'text') {
      if (!(child.type === 'element' && child.tagName === 'a')) linkDois(child);
      return [child];
    }
    const parts = [];
    let last = 0;
    for (const match of child.value.matchAll(DOI)) {
      if (match.index > last) parts.push({ type: 'text', value: child.value.slice(last, match.index) });
      parts.push({
        type: 'element',
        tagName: 'a',
        properties: { href: `https://doi.org/${match[1]}`, rel: ['noopener', 'noreferrer'] },
        children: [{ type: 'text', value: match[1] }],
      });
      last = match.index + match[1].length;
    }
    if (!parts.length) return [child];
    if (last < child.value.length) parts.push({ type: 'text', value: child.value.slice(last) });
    return parts;
  });
}

export function bibliographyRehypePlugin() {
  return function (tree, file) {
    const index = tree.children.findIndex((node) => node.type === 'element' && node.properties?.id === 'refs');
    if (index === -1) return;
    linkDois(tree.children[index]);
    tree.children.splice(index, 0, {
      type: 'element',
      tagName: 'h2',
      properties: { id: 'references' },
      children: [{ type: 'text', value: ui(file.data.astro?.frontmatter?.lang).references }],
    });
  };
}

// The footnotes section in the post's language: remark-rehype's label
// ("Notes") and back-link text ("Back to text") are set once for all posts in
// astro.config.mjs.
export function footnotesLanguageRehypePlugin() {
  return function (tree, file) {
    const t = ui(file.data.astro?.frontmatter?.lang);
    const visit = (node) => {
      if (node.type === 'element') {
        if (node.tagName === 'h2' && node.properties?.id === 'footnote-label') {
          node.children = [{ type: 'text', value: t.notes }];
        }
        if (node.properties?.dataFootnoteBackref !== undefined) node.properties.ariaLabel = t.backToText;
      }
      node.children?.forEach(visit);
    };
    visit(tree);
  };
}

export function responsiveTablesRehypePlugin() {
  return function (tree) {
    if (!tree.children) return;

    for (let i = 0; i < tree.children.length; i++) {
      const child = tree.children[i];

      if (child.type === 'element' && child.tagName === 'table') {
        const wrapper = {
          type: 'element',
          tagName: 'div',
          properties: {
            style: 'overflow:auto',
          },
          children: [child],
        };

        tree.children[i] = wrapper;

        i++;
      }
    }
  };
}
