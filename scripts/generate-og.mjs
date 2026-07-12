// Generates the default Open Graph card (1200×630) from an SVG template.
// Run: node scripts/generate-og.mjs  → src/assets/images/og-default.png
import sharp from 'sharp';

const svg = `
<svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="brand" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="rgb(59,130,246)"/>
      <stop offset="100%" stop-color="rgb(139,92,246)"/>
    </linearGradient>
    <radialGradient id="glowBlue" cx="15%" cy="20%" r="50%">
      <stop offset="0%" stop-color="rgb(37,99,235)" stop-opacity="0.35"/>
      <stop offset="100%" stop-color="rgb(37,99,235)" stop-opacity="0"/>
    </radialGradient>
    <radialGradient id="glowViolet" cx="85%" cy="85%" r="55%">
      <stop offset="0%" stop-color="rgb(124,58,237)" stop-opacity="0.3"/>
      <stop offset="100%" stop-color="rgb(124,58,237)" stop-opacity="0"/>
    </radialGradient>
  </defs>

  <rect width="1200" height="630" fill="rgb(3,6,23)"/>
  <rect width="1200" height="630" fill="url(#glowBlue)"/>
  <rect width="1200" height="630" fill="url(#glowViolet)"/>

  <!-- particle-style dots + connections, echoing the site background -->
  <g stroke="rgb(99,130,246)" stroke-opacity="0.25" stroke-width="1.5">
    <line x1="920" y1="110" x2="1030" y2="170"/>
    <line x1="1030" y1="170" x2="1105" y2="95"/>
    <line x1="150" y1="480" x2="245" y2="540"/>
    <line x1="245" y1="540" x2="330" y2="470"/>
  </g>
  <g fill="rgb(139,150,246)" fill-opacity="0.7">
    <circle cx="920" cy="110" r="5"/>
    <circle cx="1030" cy="170" r="4"/>
    <circle cx="1105" cy="95" r="6"/>
    <circle cx="150" cy="480" r="4"/>
    <circle cx="245" cy="540" r="6"/>
    <circle cx="330" cy="470" r="4"/>
    <circle cx="1120" cy="330" r="3"/>
    <circle cx="80" cy="150" r="3"/>
  </g>

  <!-- brand accent bar -->
  <rect x="100" y="208" width="72" height="8" rx="4" fill="url(#brand)"/>

  <text x="100" y="300" font-family="DejaVu Sans, sans-serif" font-weight="bold"
        font-size="76" fill="white">Furkan Eşref Yazıcı</text>
  <text x="100" y="368" font-family="DejaVu Sans, sans-serif" font-weight="bold"
        font-size="34" fill="url(#brand)">PHYSICIST · MACHINE LEARNING · QUANTUM COMPUTING</text>
  <text x="100" y="430" font-family="DejaVu Sans, sans-serif"
        font-size="26" fill="rgb(148,163,184)">Research turned into software, writing and illustrations.</text>

  <text x="100" y="545" font-family="DejaVu Sans, sans-serif" font-weight="bold"
        font-size="28" fill="rgb(226,232,240)">furkaneyazici.com</text>
</svg>
`;

await sharp(Buffer.from(svg)).png().toFile('src/assets/images/og-default.png');
console.log('✓ src/assets/images/og-default.png written');
