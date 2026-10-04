import type { APIRoute, GetStaticPaths } from 'astro';
import sharp from 'sharp';

// Site icons rendered from the 750px logo at build time and served from the
// site root. Palette PNG keeps them about 3x smaller than full-colour PNG.
// (The previous SVG favicon embedded full-size base64 PNGs: 1.7 MB.)
const ICONS: Record<string, { size: number; background?: string }> = {
  // iOS home screen; iOS also probes this exact path on its own. It paints
  // transparent areas black, so the logo sits on the page background instead.
  'apple-touch-icon': { size: 180, background: 'rgb(3, 6, 23)' },
  // High-DPI browser tabs and Android
  'icon-192': { size: 192 },
};

export const getStaticPaths = (() => Object.keys(ICONS).map((icon) => ({ params: { icon } }))) satisfies GetStaticPaths;

export const GET: APIRoute = async ({ params }) => {
  const { size, background } = ICONS[params.icon as string];
  let image = sharp('src/assets/images/icons/logo.png').resize(size, size);
  if (background) image = image.flatten({ background });
  const png = await image.png({ palette: true, quality: 90, compressionLevel: 9 }).toBuffer();

  return new Response(new Uint8Array(png), { headers: { 'Content-Type': 'image/png' } });
};
