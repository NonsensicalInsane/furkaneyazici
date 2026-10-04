import { getImage } from 'astro:assets';
import type { ImageMetadata } from 'astro';
import type { MetaDataOpenGraph } from '~/types';

const load = async function () {
  let images: Record<string, () => Promise<unknown>> | undefined = undefined;
  try {
    images = import.meta.glob('~/assets/images/**/*.{jpeg,jpg,png,tiff,webp,gif,svg,JPEG,JPG,PNG,TIFF,WEBP,GIF,SVG}');
  } catch {
    // continue regardless of error
  }
  return images;
};

let _images: Record<string, () => Promise<unknown>> | undefined = undefined;

/** */
export const fetchLocalImages = async () => {
  _images = _images || (await load());
  return _images;
};

/** */
export const findImage = async (
  imagePath?: string | ImageMetadata | null
): Promise<string | ImageMetadata | undefined | null> => {
  // Not string
  if (typeof imagePath !== 'string') {
    return imagePath;
  }

  // Absolute paths
  if (imagePath.startsWith('http://') || imagePath.startsWith('https://') || imagePath.startsWith('/')) {
    return imagePath;
  }

  // Relative paths or not "~/assets/"
  if (!imagePath.startsWith('~/assets/images')) {
    return imagePath;
  }

  const images = await fetchLocalImages();
  const key = imagePath.replace('~/', '/src/');

  return images && typeof images[key] === 'function'
    ? ((await images[key]()) as { default: ImageMetadata })['default']
    : null;
};

/** */
export const adaptOpenGraphImages = async (
  openGraph: MetaDataOpenGraph = {},
  astroSite: URL | undefined = new URL('')
): Promise<MetaDataOpenGraph> => {
  if (!openGraph?.images?.length) {
    return openGraph;
  }

  const images = openGraph.images;
  const defaultWidth = 1200;
  const defaultHeight = 626;

  const adaptedImages = await Promise.all(
    images.map(async (image) => {
      if (image?.url) {
        const resolvedImage = (await findImage(image.url)) as ImageMetadata | undefined;
        if (!resolvedImage) {
          return {
            url: '',
          };
        }

        // Social platforms render previews at ~1200px wide; larger sources
        // (e.g. a 3456px post image) only add weight. Keep the aspect ratio.
        const sourceWidth = image?.width || defaultWidth;
        const sourceHeight = image?.height || defaultHeight;
        const scale = Math.min(1, defaultWidth / sourceWidth);

        const _image = await getImage({
          src: resolvedImage,
          alt: 'Placeholder alt',
          width: Math.round(sourceWidth * scale),
          height: Math.round(sourceHeight * scale),
          // JPEG, not Astro's default WebP: LinkedIn and some chat apps don't
          // render WebP link previews.
          format: 'jpg',
          quality: 85,
        });

        if (typeof _image === 'object') {
          const { width, height } = _image.options;
          return {
            url: String(new URL(_image.src, astroSite)),
            width: typeof width === 'number' ? width : undefined,
            height: typeof height === 'number' ? height : undefined,
          };
        }
        return {
          url: '',
        };
      }

      return {
        url: '',
      };
    })
  );

  return { ...openGraph, ...(adaptedImages ? { images: adaptedImages } : {}) };
};
