import getReadingTime from 'reading-time';
import { toString } from 'mdast-util-to-string';

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
