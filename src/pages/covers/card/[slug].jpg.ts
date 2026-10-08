import type { APIRoute, GetStaticPaths } from 'astro';
import { fetchAllPosts } from '~/utils/blog';
import { renderCover } from '~/utils/covers';
import { APP_BLOG } from '~/utils/config';

// Title-less covers for blog cards (see src/utils/covers.ts); none when cardCovers is off
export const getStaticPaths = (async () =>
  APP_BLOG.cardCovers
    ? (await fetchAllPosts()).filter((post) => !post.image).map((post) => ({ params: { slug: post.slug }, props: { post } }))
    : []) satisfies GetStaticPaths;

export const GET: APIRoute = async ({ props }) =>
  new Response(new Uint8Array(await renderCover(props.post, 'card')), { headers: { 'Content-Type': 'image/jpeg' } });
