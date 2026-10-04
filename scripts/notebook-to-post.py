#!/usr/bin/env python3
"""Turn a Jupyter notebook into a draft blog post (MDX).

    python scripts/notebook-to-post.py path/to/notebook.ipynb [--slug my-post] [--title "…"] [--force]

Writes
    src/content/post/<slug>.mdx                 the post, with `draft: true`
    src/assets/images/posts/<slug>/fig-N.*      SVG/PNG/JPEG figures → <Figure>
    public/figures/<slug>/fig-N.json            Plotly figures → <PlotlyChart>

and lists what still needs a human: every figure gets "TODO" alt text and
caption, and raw HTML in markdown cells is reported for a check.

Markdown cells are made MDX-safe outside code and math ({ } and stray < are
escaped, <br>-style tags self-closed, HTML comments turned into MDX comments).
Code cells honour Jupyter Book's cell tags: remove-cell, remove-input,
remove-output, hide-input (the code goes into a collapsed <details>).

Tips for the notebook
  - matplotlib: plt.style.use("tools/furkaneyazici.mplstyle") and
    %config InlineBackend.figure_formats = ['svg'] → crisp vector figures.
  - Plotly: JupyterLab and VS Code save figures as application/vnd.plotly.v1+json,
    which this script picks up. Otherwise fig.write_json() by hand.
Standard library only.
"""

import argparse
import base64
import datetime
import json
import re
import sys
import unicodedata
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
VOID_TAGS = ('br', 'hr', 'img', 'input', 'source', 'wbr')


def slugify(text):
    text = unicodedata.normalize('NFKD', text).encode('ascii', 'ignore').decode()
    return re.sub(r'[^a-z0-9]+', '-', text.lower()).strip('-') or 'post'


def joined(source):
    return ''.join(source) if isinstance(source, list) else (source or '')


# --- markdown cells ---------------------------------------------------------

# Code fences, inline code and math must reach MDX untouched; everything else
# is escaped. Order matters: fences before inline code, $$ before $.
PROTECTED = re.compile(
    r'(```.*?```|~~~.*?~~~|`[^`\n]+`|\$\$.*?\$\$|(?<![\\$])\$(?!\s)[^$\n]+?(?<!\s)\$)',
    re.S,
)


def mdx_safe(markdown, warnings, where):
    out = []
    for i, part in enumerate(PROTECTED.split(markdown)):
        if i % 2:  # protected: code or math
            out.append(part)
            continue
        part = re.sub(r'<!--(.*?)-->', lambda m: '{/*' + m.group(1).replace('*/', '* /') + '*/}', part, flags=re.S)
        # Hide MDX comments from the brace escaping below
        comments = []
        part = re.sub(r'\{/\*.*?\*/\}', lambda m: comments.append(m.group(0)) or f'\0{len(comments) - 1}\0', part, flags=re.S)
        part = part.replace('{', '\\{').replace('}', '\\}')
        part = re.sub(r'\0(\d+)\0', lambda m: comments[int(m.group(1))], part)
        # "<" that doesn't open a tag (e.g. "x < y", "a<b") would start JSX
        part = re.sub(r'<(?![A-Za-z/!])', '&lt;', part)
        for tag in VOID_TAGS:
            part = re.sub(rf'<({tag}\b[^>]*?)\s*/?>', r'<\1 />', part, flags=re.I)
        tags = sorted({t.lower() for t in re.findall(r'<([A-Za-z][A-Za-z0-9]*)', part)})
        if tags:
            warnings.append(f'{where}: raw HTML <{">, <".join(tags)}> — check it renders as intended in MDX')
        out.append(part)
    return ''.join(out)


# --- outputs ----------------------------------------------------------------


class Post:
    def __init__(self, slug):
        self.slug = slug
        self.figure_count = 0
        self.imports = []
        self.todos = []
        self.files = []
        self.image_dir = ROOT / 'src/assets/images/posts' / slug
        self.data_dir = ROOT / 'public/figures' / slug

    def _next(self):
        self.figure_count += 1
        return self.figure_count

    def _write(self, path, data):
        path.parent.mkdir(parents=True, exist_ok=True)
        path.write_bytes(data if isinstance(data, bytes) else data.encode())
        self.files.append(path.relative_to(ROOT))

    def plotly(self, figure):
        n = self._next()
        self._write(self.data_dir / f'fig-{n}.json', json.dumps({'data': figure.get('data', []), 'layout': figure.get('layout', {})}))
        self.todos.append(f'Figure fig:{n} (Plotly): alt text and caption')
        return (
            f'<PlotlyChart src="/figures/{self.slug}/fig-{n}.json" alt="TODO: describe what the chart shows" id="fig:{n}">\n'
            f'  TODO: caption.\n</PlotlyChart>'
        )

    def image(self, data, ext):
        n = self._next()
        self._write(self.image_dir / f'fig-{n}.{ext}', data)
        var = f'fig{n}'
        self.imports.append(f"import {var} from '~/assets/images/posts/{self.slug}/fig-{n}.{ext}';")
        self.todos.append(f'Figure fig:{n} ({ext.upper()}): alt text and caption')
        return f'<Figure src={{{var}}} alt="TODO: describe what the figure shows" id="fig:{n}">\n  TODO: caption.\n</Figure>'


def text_block(text):
    text = text.rstrip('\n')
    fence = '````' if '```' in text else '```'
    return f'{fence}text\n{text}\n{fence}' if text.strip() else ''


def render_output(output, post, warnings, where):
    kind = output.get('output_type')
    if kind == 'stream':
        return text_block(joined(output.get('text')))
    if kind == 'error':
        warnings.append(f'{where}: skipped an error output ({output.get("ename", "error")})')
        return ''
    data = output.get('data', {})
    if 'application/vnd.plotly.v1+json' in data:
        return post.plotly(data['application/vnd.plotly.v1+json'])
    if 'image/svg+xml' in data:
        return post.image(joined(data['image/svg+xml']), 'svg')
    for mime, ext in (('image/png', 'png'), ('image/jpeg', 'jpg')):
        if mime in data:
            return post.image(base64.b64decode(joined(data[mime])), ext)
    if 'text/latex' in data:
        latex = joined(data['text/latex']).strip().strip('$')
        return f'$$\n{latex}\n$$'
    if 'text/markdown' in data:
        return mdx_safe(joined(data['text/markdown']), warnings, where)
    if 'text/plain' in data:
        if 'text/html' in data:
            warnings.append(f'{where}: HTML output (e.g. a table) shown as plain text')
        return text_block(joined(data['text/plain']))
    return ''


# --- main -------------------------------------------------------------------


def convert(nb_path, slug, title, force):
    notebook = json.loads(Path(nb_path).read_text(encoding='utf-8'))
    language = notebook.get('metadata', {}).get('kernelspec', {}).get('language') or 'python'
    post_path = ROOT / 'src/content/post' / f'{slug}.mdx'
    if post_path.exists() and not force:
        sys.exit(f'{post_path.relative_to(ROOT)} already exists (use --force to overwrite)')

    post, warnings, blocks = Post(slug), [], []
    for index, cell in enumerate(notebook.get('cells', []), start=1):
        where = f'cell {index}'
        source = joined(cell.get('source'))
        tags = set(cell.get('metadata', {}).get('tags', []))
        if 'remove-cell' in tags:
            continue
        if cell.get('cell_type') == 'markdown':
            # The first "# Heading" becomes the post title instead of a second <h1>
            if title is None:
                match = re.match(r'\s*#\s+(.+)\n?', source)
                if match:
                    title, source = match.group(1).strip(), source[match.end():]
            if source.strip():
                blocks.append(mdx_safe(source.strip(), warnings, where))
        elif cell.get('cell_type') == 'code':
            if source.strip() and 'remove-input' not in tags:
                code = f'```{language}\n{source.rstrip()}\n```'
                if 'hide-input' in tags:
                    code = f'<details>\n<summary>Show code</summary>\n\n{code}\n\n</details>'
                blocks.append(code)
            if 'remove-output' not in tags:
                for output in cell.get('outputs', []):
                    rendered = render_output(output, post, warnings, where)
                    if rendered:
                        blocks.append(rendered)

    title = title or Path(nb_path).stem.replace('_', ' ').replace('-', ' ').title()
    front = '\n'.join([
        '---',
        f'title: {json.dumps(title, ensure_ascii=False)}',
        'excerpt: "TODO: one or two sentences for listings and link previews"',
        '# abstract: "Optional academic-style summary shown above the post"',
        f'publishDate: {datetime.date.today().isoformat()}',
        'draft: true # set to false (or remove) to publish',
        'tags: []',
        '---',
    ])
    body = '\n\n'.join(blocks)
    imports = ('\n'.join(post.imports) + '\n\n') if post.imports else ''
    post_path.parent.mkdir(parents=True, exist_ok=True)
    post_path.write_text(f'{front}\n\n{imports}{body}\n', encoding='utf-8')

    print(f'✓ {post_path.relative_to(ROOT)}  (draft)')
    for f in post.files:
        print(f'✓ {f}')
    if post.todos or warnings:
        print('\nStill to do:')
        for item in ['Frontmatter: excerpt, tags'] + post.todos + warnings:
            print(f'  - {item}')


if __name__ == '__main__':
    parser = argparse.ArgumentParser(description=__doc__.split('\n\n')[0])
    parser.add_argument('notebook', help='path to the .ipynb file')
    parser.add_argument('--slug', help='post URL slug (default: from the notebook file name)')
    parser.add_argument('--title', help='post title (default: the first "# Heading" in the notebook)')
    parser.add_argument('--force', action='store_true', help='overwrite an existing post')
    args = parser.parse_args()
    convert(args.notebook, args.slug or slugify(Path(args.notebook).stem), args.title, args.force)
