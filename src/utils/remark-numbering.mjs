// Numbers figures, equations and theorem-like blocks in document order and
// turns <Ref to="…" /> into a link reading "Figure 2", "(3)", "Theorem 1"…
//
// Done here (once per post, at build time) rather than inside components:
// Astro may render components concurrently, so a counter there could count in
// the wrong order. A reference to an unknown label fails the build, instead of
// silently printing "??" like LaTeX.
//
//   <Figure id="fig:loss" …/>              → Figure N, anchor #fig-loss
//   <PlotlyChart id="fig:bloch" …/>         (figures share one counter)
//   <Animation id="fig:gate" …/>
//   <Theorem id="thm:no-cloning" …>         Definition / Theorem / Lemma
//   $$ … \label{eq:schrodinger} $$          only labelled equations are numbered
//   <Ref to="eq:schrodinger" />             → "(1)", linked to the equation

const KIND_BY_COMPONENT = {
  Figure: 'figure',
  PlotlyChart: 'figure',
  Animation: 'figure',
  Definition: 'definition',
  Theorem: 'theorem',
  Lemma: 'lemma',
};
const LABEL = { figure: 'Figure', definition: 'Definition', theorem: 'Theorem', lemma: 'Lemma' };

const isJsx = (node) => node.type === 'mdxJsxFlowElement' || node.type === 'mdxJsxTextElement';
const getAttr = (node, name) => node.attributes?.find((a) => a.type === 'mdxJsxAttribute' && a.name === name)?.value;
const setAttr = (node, name, value) => {
  node.attributes = (node.attributes || []).filter((a) => a.name !== name);
  node.attributes.push({ type: 'mdxJsxAttribute', name, value });
};
// "fig:loss" → "fig-loss": safe in ids and CSS selectors
export const anchorFor = (label) => label.replace(/[^A-Za-z0-9_-]+/g, '-');

// mdast-util-math copies the TeX into data.hChildren while parsing, and that
// copy (not node.value) is what reaches rehype-katex, so update both.
const setMath = (node, value) => {
  node.value = value;
  const code = node.data?.hChildren?.[0];
  if (code?.children?.[0]?.type === 'text') code.children[0].value = value;
};

function walk(node, visit, parent = null, index = null) {
  visit(node, parent, index);
  if (node.children) for (let i = 0; i < node.children.length; i++) walk(node.children[i], visit, node, i);
}

export function numberingRemarkPlugin() {
  return (tree, file) => {
    const where = file.path ? ` in ${file.path}` : '';
    const counters = {};
    const targets = new Map();
    const next = (kind) => (counters[kind] = (counters[kind] || 0) + 1);
    const register = (label, kind, number) => {
      if (targets.has(label)) throw new Error(`Duplicate label "${label}"${where}`);
      targets.set(label, { kind, number });
    };

    walk(tree, (node, parent, index) => {
      if (isJsx(node) && KIND_BY_COMPONENT[node.name]) {
        const kind = KIND_BY_COMPONENT[node.name];
        const number = next(kind);
        setAttr(node, 'number', String(number));
        const label = getAttr(node, 'id');
        if (typeof label === 'string') {
          register(label, kind, number);
          setAttr(node, 'id', anchorFor(label));
        }
      } else if (node.type === 'math') {
        const match = node.value.match(/\\label\{([^}]+)\}/);
        if (!match) return;
        const number = next('equation');
        register(match[1], 'equation', number);
        setMath(node, `${node.value.replace(match[0], '').trimEnd()} \\tag{${number}}`);
        // Wrap the equation in a <div id> so references can link to it
        parent.children[index] = {
          type: 'equationBlock',
          data: { hName: 'div', hProperties: { id: anchorFor(match[1]), className: ['equation'] } },
          children: [node],
        };
      }
    });

    walk(tree, (node, parent, index) => {
      if (!isJsx(node) || node.name !== 'Ref') return;
      const label = getAttr(node, 'to');
      const target = targets.get(label);
      if (!target) {
        const known = [...targets.keys()].join(', ') || 'none';
        throw new Error(`<Ref to="${label}"> doesn't match any label${where} (known: ${known})`);
      }
      const text = target.kind === 'equation' ? `(${target.number})` : `${LABEL[target.kind]} ${target.number}`;
      parent.children[index] = {
        type: 'link',
        url: `#${anchorFor(label)}`,
        children: [{ type: 'text', value: text }],
        data: { hProperties: { className: ['xref'] } },
      };
    });
  };
}
