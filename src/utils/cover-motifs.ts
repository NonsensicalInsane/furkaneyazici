// Artwork for card covers (src/utils/covers.ts): plain SVG, no text, one motif
// per topic. The motif comes from the post's `cover` frontmatter, else from its
// category/tags (English or Turkish), else a neutral constellation. A seeded
// random generator varies the layout per post, stable across builds.

export const MOTIFS = [
  'bloch', // quantum computing
  'landscape', // quantum optimisation
  'circuit', // quantum information
  'waves', // quantum optics
  'orbits', // physics
  'plot', // mathematics
  'tree', // computer science
  'network', // machine learning
  'scope', // electronics
  'helix', // biology
  'microbes', // microbiology
  'neuron', // neuroscience
  'community', // sociology
  'timeline', // history
  'ripples', // philosophy
  'constellation', // anything else
] as const;
export type Motif = (typeof MOTIFS)[number];

// First match wins, so the specific quantum topics come before "quantum".
const TOPIC_RULES: Array<[RegExp, Motif]> = [
  [/quantum.?(optimi[sz]ation|annealing)|kuantum.?optimizasyon|qaoa|vqe|annealing/, 'landscape'],
  [/quantum.?information|kuantum.?bilgi|entangle|dolanik|information.?theory/, 'circuit'],
  [/optic|optik|photon|foton|laser|lazer/, 'waves'],
  [/quantum|kuantum|qubit|kubit/, 'bloch'],
  [/microbio|mikrobiyo|bacteri|bakteri|virolog|viroloji|microbe|mikrop/, 'microbes'],
  [/neurosci|norobilim|neurobio|norobiyo|brain|beyin|cognitive|bilissel/, 'neuron'],
  [/biolog|biyoloji|genetic|genetik|genom|\bdna\b|molecular|molekuler|bioinformatic|biyoinformatik/, 'helix'],
  [/machine.?learning|makine.?ogrenme|deep.?learning|derin.?ogrenme|neural|sinir.?ag|\bml\b|\bai\b|data.?science|veri.?bilim/, 'network'],
  [/computer.?science|bilgisayar|algorithm|algoritma|programming|programlama|software|yazilim|\bcs\b/, 'tree'],
  [/electronic|elektronik|circuit|devre|embedded|gomulu|hardware|donanim|signal|sinyal/, 'scope'],
  [/physic|fizik|mechanic|mekanik|relativ|thermo|termo|particle|parcacik/, 'orbits'],
  [/math|matematik|algebra|cebir|geometr|calculus|kalkulus|probab|olasilik|statistic|istatistik|topolog/, 'plot'],
  [/sociolog|sosyoloji|society|toplum|politic|siyaset|econom|ekonomi/, 'community'],
  [/history|tarih/, 'timeline'],
  [/philosoph|felsefe|ethic|etik|essay|deneme/, 'ripples'],
];

export function motifFor(post: { cover?: string; category?: string; tags?: string[] }): Motif {
  if (post.cover && (MOTIFS as readonly string[]).includes(post.cover)) return post.cover as Motif;
  const topics = [post.category, ...(post.tags || [])].filter(Boolean).join(' ').toLowerCase();
  return TOPIC_RULES.find(([pattern]) => pattern.test(topics))?.[1] ?? 'constellation';
}

// Small seeded PRNG (mulberry32): same slug → same picture on every build
export function seeded(seed: number) {
  let t = seed >>> 0;
  return () => {
    t = (t + 0x6d2b79f5) >>> 0;
    let r = Math.imul(t ^ (t >>> 15), 1 | t);
    r ^= r + Math.imul(r ^ (r >>> 7), 61 | r);
    return ((r ^ (r >>> 14)) >>> 0) / 4294967296;
  };
}

type Draw = (a: string, b: string, rand: () => number) => string;
const CX = 600;
const CY = 315;
const line = (x1: number, y1: number, x2: number, y2: number, stroke: string, width = 2, opacity = 1) =>
  `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${stroke}" stroke-width="${width}" stroke-opacity="${opacity}" stroke-linecap="round"/>`;
const dot = (x: number, y: number, r: number, fill: string, opacity = 1) =>
  `<circle cx="${x}" cy="${y}" r="${r}" fill="${fill}" fill-opacity="${opacity}"/>`;
const ring = (x: number, y: number, r: number, stroke: string, width = 2, opacity = 1) =>
  `<circle cx="${x}" cy="${y}" r="${r}" fill="none" stroke="${stroke}" stroke-width="${width}" stroke-opacity="${opacity}"/>`;
const path = (d: string, stroke: string, width = 3, opacity = 1, extra = '') =>
  `<path d="${d}" fill="none" stroke="${stroke}" stroke-width="${width}" stroke-opacity="${opacity}" stroke-linecap="round" stroke-linejoin="round" ${extra}/>`;
const curve = (f: (x: number) => number, x0: number, x1: number, steps = 120) =>
  Array.from({ length: steps + 1 }, (_, i) => {
    const x = x0 + ((x1 - x0) * i) / steps;
    return `${i ? 'L' : 'M'}${x.toFixed(1)},${f(x).toFixed(1)}`;
  }).join(' ');

const DRAW: Record<Motif, Draw> = {
  bloch: (a, b, rand) => {
    const angle = (150 + rand() * 120) * (Math.PI / 180);
    const [tx, ty] = [CX - 200 * Math.sin(angle), CY + 200 * Math.cos(angle)];
    return (
      ring(CX, CY, 220, a, 3, 0.55) +
      `<ellipse cx="${CX}" cy="${CY}" rx="220" ry="52" fill="none" stroke="${b}" stroke-width="2" stroke-opacity="0.4"/>` +
      line(CX, CY, tx, ty, 'url(#grad)', 4) +
      dot(CX, CY, 7, a) +
      dot(tx, ty, 14, b)
    );
  },
  landscape: (a, b, rand) => {
    const wells = Array.from({ length: 3 }, (_, i) => ({ c: 380 + i * 220 + (rand() - 0.5) * 80, d: 60 + rand() * 110, w: 55 + rand() * 30 }));
    const f = (x: number) => 230 - wells.reduce((s, w) => s + w.d * Math.exp(-(((x - w.c) / w.w) ** 2)), 0) + 0.06 * (x - CX) + 120;
    const best = wells.reduce((m, w) => (f(w.c) > f(m.c) ? w : m));
    return (
      path(curve(f, 280, 920), 'url(#grad)', 4) +
      line(280, f(best.c) + 18, 920, f(best.c) + 18, b, 1.5, 0.25) +
      dot(best.c, f(best.c) - 18, 16, b)
    );
  },
  circuit: (a, b, rand) => {
    const ys = [215, 315, 415];
    let svg = ys.map((y) => line(300, y, 900, y, a, 2.5, 0.6)).join('');
    for (let i = 0; i < 4; i++) {
      const x = 370 + i * 130 + rand() * 20;
      const wire = Math.floor(rand() * 3);
      if (i % 2) {
        const [c, t] = rand() > 0.5 ? [wire, (wire + 1) % 3] : [(wire + 1) % 3, wire];
        svg += line(x, ys[c], x, ys[t], b, 2.5) + dot(x, ys[c], 9, b) + ring(x, ys[t], 18, b, 2.5) + line(x - 18, ys[t], x + 18, ys[t], b, 2.5);
      } else {
        svg += `<rect x="${x - 28}" y="${ys[wire] - 28}" width="56" height="56" rx="10" fill="#030617" stroke="${a}" stroke-width="2.5"/>`;
      }
    }
    // measurement meter on the last wire
    return svg + `<rect x="836" y="387" width="64" height="56" rx="10" fill="#030617" stroke="${b}" stroke-width="2.5"/>` + path('M846,427 A22,22 0 0 1 890,427', b, 2.5) + line(868, 427, 882, 401, b, 2.5);
  },
  waves: (a, b, rand) => {
    const k = 0.025 + rand() * 0.01;
    const p = rand() * 3;
    const w1 = (x: number) => CY - 70 + 45 * Math.sin(k * x);
    const w2 = (x: number) => CY - 70 + 45 * Math.sin(k * x + p);
    const sum = (x: number) => CY + 90 + 45 * (Math.sin(k * x) + Math.sin(k * x + p));
    return path(curve(w1, 280, 920), a, 2.5, 0.55) + path(curve(w2, 280, 920), b, 2.5, 0.55) + path(curve(sum, 280, 920), 'url(#grad)', 4);
  },
  orbits: (a, b, rand) => {
    const tilt = rand() * 60;
    let svg = '';
    for (let i = 0; i < 3; i++) {
      const rot = tilt + i * 60;
      svg += `<ellipse cx="${CX}" cy="${CY}" rx="240" ry="78" fill="none" stroke="${i % 2 ? b : a}" stroke-width="2.5" stroke-opacity="0.6" transform="rotate(${rot} ${CX} ${CY})"/>`;
      const t = rand() * Math.PI * 2;
      const [ex, ey] = [240 * Math.cos(t), 78 * Math.sin(t)];
      const r = (rot * Math.PI) / 180;
      svg += dot(CX + ex * Math.cos(r) - ey * Math.sin(r), CY + ex * Math.sin(r) + ey * Math.cos(r), 9, b);
    }
    return svg + dot(CX, CY, 22, a, 0.9);
  },
  plot: (a, b, rand) => {
    const mu = 520 + rand() * 160;
    const sigma = 70 + rand() * 50;
    const f = (x: number) => 470 - 290 * Math.exp(-(((x - mu) / sigma) ** 2) / 2);
    let svg = '';
    for (let x = 340; x <= 880; x += 60) svg += line(x, 130, x, 470, a, 1, 0.12);
    for (let y = 150; y <= 470; y += 60) svg += line(320, y, 900, y, a, 1, 0.12);
    svg += line(320, 470, 900, 470, a, 2.5, 0.7) + line(340, 490, 340, 120, a, 2.5, 0.7);
    svg += path(curve(f, 340, 900), 'url(#grad)', 4);
    for (let i = 0; i < 6; i++) {
      const x = 380 + i * 95 + rand() * 20;
      svg += dot(x, f(x) + (rand() - 0.5) * 40, 6, b, 0.85);
    }
    return svg;
  },
  tree: (a, b, rand) => {
    let svg = '';
    const levels = [[CX], [470, 730], [400, 540, 660, 800]];
    const nodes: Array<[number, number]> = [];
    levels.forEach((xs, depth) => xs.forEach((x) => nodes.push([x, 150 + depth * 120])));
    levels[1].forEach((x) => (svg += line(CX, 150, x, 270, a, 2.5, 0.6)));
    levels[2].forEach((x, i) => (svg += line(levels[1][i >> 1], 270, x, 390, a, 2.5, 0.6)));
    // Some leaves get one more child, so trees differ per post
    levels[2].forEach((x) => {
      if (rand() > 0.4) svg += line(x, 390, x - 30, 490, a, 2.5, 0.6) + dot(x - 30, 490, 12, b, 0.85);
    });
    return svg + nodes.map(([x, y], i) => ring(x, y, 18, i ? a : b, 3) + dot(x, y, 8, i ? a : b)).join('');
  },
  network: (a, b, rand) => {
    const layers = [3, 5, 5, 2].map((n, i) => Array.from({ length: n }, (_, j) => [380 + i * 145, CY + (j - (n - 1) / 2) * 75] as const));
    let svg = '';
    for (let i = 0; i < layers.length - 1; i++)
      for (const [x1, y1] of layers[i]) for (const [x2, y2] of layers[i + 1]) svg += line(x1, y1, x2, y2, a, 1.5, 0.12 + rand() * 0.3);
    layers.forEach((layer, i) => layer.forEach(([x, y]) => (svg += dot(x, y, 15, '#030617') + ring(x, y, 15, i === layers.length - 1 ? b : a, 3))));
    return svg;
  },
  scope: (a, b, rand) => {
    let svg = `<rect x="300" y="135" width="600" height="360" rx="22" fill="none" stroke="${a}" stroke-width="2.5" stroke-opacity="0.5"/>`;
    for (let x = 360; x < 900; x += 60) svg += line(x, 135, x, 495, a, 1, 0.12);
    for (let y = 195; y < 495; y += 60) svg += line(300, y, 900, y, a, 1, 0.12);
    const period = 90 + Math.round(rand() * 3) * 30;
    let d = 'M320,375';
    for (let x = 320, high = false; x < 880; x += period / 2, high = !high) d += ` L${x},${high ? 255 : 375} L${Math.min(x + period / 2, 880)},${high ? 255 : 375}`;
    return svg + path(d, 'url(#grad)', 4);
  },
  community: (a, b, rand) => {
    const centres = [[450, 240], [760, 260], [600, 440]] as const;
    const groups = centres.map(([cx, cy]) =>
      Array.from({ length: 6 }, (_, i) => {
        const t = (i / 6) * Math.PI * 2 + rand();
        const r = 45 + rand() * 45;
        return [cx + r * Math.cos(t), cy + r * Math.sin(t)] as const;
      })
    );
    let svg = '';
    groups.forEach((g) => g.forEach((p, i) => g.slice(i + 1).forEach((q) => rand() > 0.45 && (svg += line(p[0], p[1], q[0], q[1], a, 1.5, 0.35)))));
    for (let i = 0; i < 3; i++) svg += line(...groups[i][0], ...groups[(i + 1) % 3][1], b, 1.5, 0.5);
    groups.forEach((g, gi) => g.forEach(([x, y]) => (svg += dot(x, y, 10, gi === 1 ? b : a, 0.9))));
    return svg;
  },
  timeline: (a, b, rand) => {
    let svg = line(280, CY, 920, CY, 'url(#grad)', 4);
    const highlight = Math.floor(rand() * 6);
    for (let i = 0; i < 6; i++) {
      const x = 330 + i * 108;
      const up = i % 2 === 0;
      const h = 60 + rand() * 90;
      svg += line(x, CY, x, up ? CY - h : CY + h, a, 2, 0.5) + dot(x, CY, 9, a) + dot(x, up ? CY - h : CY + h, i === highlight ? 16 : 10, i === highlight ? b : a, 0.9);
    }
    return svg;
  },
  ripples: (a, b, rand) => {
    const dx = 70 + rand() * 60;
    let svg = '';
    for (let r = 40; r <= 240; r += 40) svg += ring(CX - dx, CY, r, a, 2, 0.75 - r / 400) + ring(CX + dx, CY, r, b, 2, 0.75 - r / 400);
    return svg + dot(CX - dx, CY, 9, a) + dot(CX + dx, CY, 9, b);
  },
  helix: (a, b, rand) => {
    const k = 0.018 + rand() * 0.008;
    const p = rand() * Math.PI;
    const s1 = (x: number) => CY + 110 * Math.sin(k * x + p);
    const s2 = (x: number) => CY - 110 * Math.sin(k * x + p);
    let svg = '';
    for (let x = 300; x <= 900; x += 30) svg += line(x, s1(x), x, s2(x), a, 2, 0.25 + 0.3 * Math.abs(Math.sin(k * x + p)));
    return svg + path(curve(s1, 300, 900), a, 4) + path(curve(s2, 300, 900), b, 4);
  },
  microbes: (a, b, rand) => {
    let svg = ring(CX, CY, 230, a, 3, 0.5) + ring(CX, CY, 214, a, 1.5, 0.25);
    const inside = () => {
      const t = rand() * Math.PI * 2;
      const r = Math.sqrt(rand()) * 165;
      return [CX + r * Math.cos(t), CY + r * Math.sin(t)] as const;
    };
    for (let i = 0; i < 9; i++) {
      const [x, y] = inside();
      svg += dot(x, y, 7 + rand() * 18, i % 3 ? a : b, 0.35 + rand() * 0.4);
    }
    for (let i = 0; i < 3; i++) {
      const [x, y] = inside();
      svg += `<rect x="${x - 36}" y="${y - 12}" width="72" height="24" rx="12" fill="none" stroke="${b}" stroke-width="2.5" transform="rotate(${rand() * 180} ${x} ${y})"/>`;
    }
    return svg;
  },
  neuron: (a, b, rand) => {
    const [sx, sy] = [480, CY];
    let svg = '';
    // dendrites: branching to the left
    for (let i = 0; i < 5; i++) {
      const t = ((120 + i * 30 + (rand() - 0.5) * 16) * Math.PI) / 180;
      const len = 90 + rand() * 40;
      const [x1, y1] = [sx + len * Math.cos(t), sy - len * Math.sin(t)];
      svg += line(sx, sy, x1, y1, a, 3, 0.8);
      for (const turn of [-0.45, 0.45]) {
        const l2 = 45 + rand() * 30;
        svg += line(x1, y1, x1 + l2 * Math.cos(t + turn), y1 - l2 * Math.sin(t + turn), a, 2, 0.6);
      }
    }
    // axon with myelin sheaths, then terminal branches
    const ax = (x: number) => sy + 18 * Math.sin((x - sx) / 70);
    svg += path(curve(ax, sx, 860), 'url(#grad)', 3);
    for (let x = 560; x < 820; x += 62) svg += `<rect x="${x}" y="${ax(x + 22) - 10}" width="44" height="20" rx="10" fill="#030617" stroke="${b}" stroke-width="2.5"/>`;
    for (const dy of [-40, 0, 40]) svg += line(860, ax(860), 905, ax(860) + dy, b, 2, 0.8) + dot(905, ax(860) + dy, 7, b);
    return svg + dot(sx, sy, 34, a, 0.9);
  },
  constellation: (a, b, rand) => {
    const stars = Array.from({ length: 13 }, () => [330 + rand() * 540, 150 + rand() * 330] as const);
    let svg = '';
    stars.forEach((p, i) => {
      const nearest = stars
        .map((q, j) => [Math.hypot(p[0] - q[0], p[1] - q[1]), j] as const)
        .filter(([, j]) => j > i)
        .sort((m, n) => m[0] - n[0])
        .slice(0, 2);
      nearest.forEach(([, j]) => (svg += line(p[0], p[1], stars[j][0], stars[j][1], a, 1.5, 0.35)));
    });
    return svg + stars.map(([x, y], i) => dot(x, y, 4 + rand() * 6, i % 3 ? a : b, 0.9)).join('');
  },
};

/** The full card artwork (1200×630 SVG): background glows, dots and the motif */
export function cardCoverSvg(motif: Motif, a: string, b: string, seed: number): string {
  const rand = seeded(seed);
  const dots = [[1010, 92, 6], [1098, 160, 4], [1150, 70, 5], [120, 520, 4], [70, 560, 3]]
    .map(([x, y, r]) => dot(x, y, r, b, 0.6))
    .join('');
  return `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <defs>
    <radialGradient id="glowA" cx="12%" cy="18%" r="50%"><stop offset="0%" stop-color="${a}" stop-opacity="0.32"/><stop offset="100%" stop-color="${a}" stop-opacity="0"/></radialGradient>
    <radialGradient id="glowB" cx="90%" cy="88%" r="55%"><stop offset="0%" stop-color="${b}" stop-opacity="0.3"/><stop offset="100%" stop-color="${b}" stop-opacity="0"/></radialGradient>
    <!-- userSpaceOnUse: an objectBoundingBox gradient isn't drawn on straight horizontal/vertical lines -->
    <linearGradient id="grad" x1="280" y1="0" x2="920" y2="0" gradientUnits="userSpaceOnUse"><stop offset="0%" stop-color="${a}"/><stop offset="100%" stop-color="${b}"/></linearGradient>
  </defs>
  <rect width="1200" height="630" fill="#030617"/>
  <rect width="1200" height="630" fill="url(#glowA)"/>
  <rect width="1200" height="630" fill="url(#glowB)"/>
  ${dots}
  ${DRAW[motif](a, b, rand)}
</svg>`;
}
