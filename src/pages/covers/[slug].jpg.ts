import type { APIRoute, GetStaticPaths } from 'astro';
import { fetchAllPosts } from '~/utils/blog';
import { renderCover } from '~/utils/covers';

// One generated cover per post without its own image (see src/utils/covers.ts)
export const getStaticPaths = (async () =>
  (await fetchAllPosts()).filter((post) => !post.image).map((post) => ({ params: { slug: post.slug }, props: { post } }))) satisfies GetStaticPaths;

export const GET: APIRoute = async ({ props }) =>
  new Response(new Uint8Array(await renderCover(props.post)), { headers: { 'Content-Type': 'image/jpeg' } });
