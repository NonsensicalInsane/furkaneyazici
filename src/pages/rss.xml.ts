import { getRssString } from '@astrojs/rss';

import { SITE, METADATA, APP_BLOG, I18N } from '../utils/config';
import { fetchPosts } from '../utils/blog';
import { getPermalink } from '../utils/permalinks';

export const GET = async () => {
  if (!APP_BLOG.isEnabled) {
    return new Response(null, {
      status: 404,
      statusText: 'Not found',
    });
  }

  const posts = await fetchPosts();

  const rss = await getRssString({
    title: `${SITE.name}’s Blog`,
    description: METADATA?.description || '',
    site: import.meta.env.SITE,

    items: posts.map((post) => ({
      link: getPermalink(post.permalink, 'post'),
      title: post.title,
      description: post.excerpt,
      pubDate: post.publishDate,
    })),

    trailingSlash: SITE.trailingSlash,
    xmlns: { atom: 'http://www.w3.org/2005/Atom' },
    customData: [
      `<language>${I18N.language}</language>`,
      `<atom:link href="${new URL('rss.xml', import.meta.env.SITE)}" rel="self" type="application/rss+xml" />`,
    ].join(''),
  });

  return new Response(rss, {
    headers: {
      'Content-Type': 'application/xml',
    },
  });
};
