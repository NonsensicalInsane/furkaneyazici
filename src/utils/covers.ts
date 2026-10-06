import fs from 'node:fs';
import satori from 'satori';
import sharp from 'sharp';
import type { Post } from '~/types';

// Build-time cover images for posts that have no image of their own: shown on
// blog cards and used as the post's social preview (og:image). Satori turns the
// text into vector paths with the bundled Inter files, so covers look the same
// whatever fonts the build machine has. Served by src/pages/covers/[slug].jpg.ts.

export const COVER_WIDTH = 1200;
export const COVER_HEIGHT = 630;

/**
 * URL of a generated cover, or undefined when the post has its own image.
 * 'social' carries the title, category and tags (og:image, seen on its own);
 * 'card' is artwork only, since a blog card prints all of that around it.
 */
export const coverUrl = (post: Pick<Post, 'slug' | 'image'>, variant: 'social' | 'card' = 'social') =>
  post.image ? undefined : variant === 'card' ? `/covers/card/${post.slug}.jpg` : `/covers/${post.slug}.jpg`;

// Satori reads static WOFF (not WOFF2 or variable fonts). The latin-ext subset
// (ş, ğ, …) needs its own family name: Satori falls back between families, not
// between files of one family, so a shared name rendered "ş" as a blank box.
let fonts: Parameters<typeof satori>[1]['fonts'] | undefined;
const loadFonts = () =>
  (fonts ??= ([500, 700] as const).flatMap((weight) =>
    ['latin', 'latin-ext'].map((subset) => ({
      name: subset === 'latin' ? 'Inter' : 'Inter Ext',
      data: fs.readFileSync(`node_modules/@fontsource/inter/files/inter-${subset}-${weight}-normal.woff`),
      weight,
      style: 'normal' as const,
    }))
  ));

// Brand pairs (blue, violet, emerald, cyan, pink, amber); a post always gets the same one
const PALETTES = [
  ['#3b82f6', '#8b5cf6'],
  ['#8b5cf6', '#22d3ee'],
  ['#34d399', '#3b82f6'],
  ['#22d3ee', '#8b5cf6'],
  ['#f472b6', '#8b5cf6'],
  ['#fbbf24', '#f472b6'],
];
const hash = (text: string) => [...text].reduce((h, c) => (h * 31 + c.charCodeAt(0)) >>> 0, 7);
const alpha = (hex: string, a: number) =>
  `rgba(${parseInt(hex.slice(1, 3), 16)}, ${parseInt(hex.slice(3, 5), 16)}, ${parseInt(hex.slice(5, 7), 16)}, ${a})`;

type Node = { type: string; props: { style?: Record<string, unknown>; children?: unknown } };
const el = (style: Record<string, unknown>, children?: unknown): Node => ({ type: 'div', props: { style, children } });

// Particle-style dots, echoing the site background (positions in px)
const DOTS = [
  [1010, 92, 6],
  [1098, 160, 4],
  [1150, 70, 5],
  [940, 190, 3],
  [1120, 300, 3],
  [70, 560, 4],
];

// Card motif: an abstract Bloch sphere (outline, equator, state vector at a
// per-post angle), drawn with plain boxes, which is what Satori supports.
const blochSphere = (a: string, b: string, angle: number) =>
  // Centred, so it survives the 16:9 crop of narrow cards
  el({ position: 'absolute', left: 380, top: 95, width: 440, height: 440, display: 'flex' }, [
    el({ position: 'absolute', left: 0, top: 0, width: 440, height: 440, borderRadius: 220, border: `3px solid ${alpha(a, 0.55)}` }),
    el({ position: 'absolute', left: 0, top: 170, width: 440, height: 100, borderRadius: '50%', border: `2px solid ${alpha(b, 0.4)}` }),
    // Satori rotates about the box centre (it ignores transform-origin), so the
    // vector is centred halfway between the origin and its tip
    el({
      position: 'absolute',
      left: 220 - 95 * Math.sin((angle * Math.PI) / 180) - 2,
      top: 220 + 95 * Math.cos((angle * Math.PI) / 180) - 95,
      width: 4,
      height: 190,
      transform: `rotate(${angle}deg)`,
      backgroundImage: `linear-gradient(180deg, ${a}, ${b})`,
      borderRadius: 2,
    }),
    // Origin, and the state at the vector's tip on the sphere (CSS rotate is clockwise)
    el({ position: 'absolute', left: 213, top: 213, width: 14, height: 14, borderRadius: 7, backgroundColor: alpha(a, 0.9) }),
    el({
      position: 'absolute',
      left: 220 - 190 * Math.sin((angle * Math.PI) / 180) - 14,
      top: 220 + 190 * Math.cos((angle * Math.PI) / 180) - 14,
      width: 28,
      height: 28,
      borderRadius: 14,
      backgroundColor: b,
    }),
  ]);

export async function renderCover(
  post: Pick<Post, 'slug' | 'title' | 'category' | 'tags'>,
  variant: 'social' | 'card' = 'social'
): Promise<Buffer> {
  const h = hash(post.slug);
  const [a, b] = PALETTES[h % PALETTES.length];
  const title = post.title;
  const titleSize = title.length <= 28 ? 78 : title.length <= 50 ? 66 : title.length <= 80 ? 56 : 48;
  const label = (post.category || 'Blog').replaceAll('-', ' ').toUpperCase();
  const tags = (post.tags || []).slice(0, 3).map((t) => `#${t}`).join('   ');

  const tree = el(
    {
      width: COVER_WIDTH,
      height: COVER_HEIGHT,
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      padding: '64px 72px',
      position: 'relative',
      backgroundColor: '#030617',
      backgroundImage: `radial-gradient(circle at 12% 18%, ${alpha(a, 0.32)} 0%, rgba(3, 6, 23, 0) 45%), radial-gradient(circle at 90% 88%, ${alpha(b, 0.3)} 0%, rgba(3, 6, 23, 0) 50%)`,
      fontFamily: 'Inter, "Inter Ext"',
      color: '#f8fafc',
    },
    [
      ...DOTS.map(([x, y, r]) =>
        el({ position: 'absolute', left: x, top: y, width: r * 2, height: r * 2, borderRadius: r, backgroundColor: alpha(b, 0.7) })
      ),
      ...(variant === 'card'
        ? [blochSphere(a, b, 150 + (h % 120))]
        : [
            el({ display: 'flex', alignItems: 'center', gap: 20 }, [
              el({ width: 72, height: 8, borderRadius: 4, backgroundImage: `linear-gradient(90deg, ${a}, ${b})` }),
              el({ fontSize: 26, fontWeight: 500, letterSpacing: 3, color: '#cbd5e1' }, label),
            ]),
            el({ display: 'flex', fontSize: titleSize, fontWeight: 700, lineHeight: 1.12, letterSpacing: -1, maxWidth: 1020 }, title),
            el({ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', fontSize: 26, fontWeight: 500 }, [
              el({ display: 'flex', flexDirection: 'column', gap: 4 }, [
                el({ color: '#e2e8f0' }, 'Furkan Eşref Yazıcı'),
                el({ color: '#94a3b8', fontSize: 22 }, 'furkaneyazici.com'),
              ]),
              el({ color: alpha(b, 0.95), fontSize: 22 }, tags),
            ]),
          ]),
    ]
  );

  const svg = await satori(tree as Parameters<typeof satori>[0], { width: COVER_WIDTH, height: COVER_HEIGHT, fonts: loadFonts() });
  return sharp(Buffer.from(svg)).jpeg({ quality: 88, mozjpeg: true }).toBuffer();
}
