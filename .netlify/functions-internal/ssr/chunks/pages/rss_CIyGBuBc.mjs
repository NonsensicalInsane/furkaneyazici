import { getRssString } from '@astrojs/rss';
import { A as APP_BLOG, S as SITE, M as METADATA, h as getPermalink } from './404_h05DomhS.mjs';
import { f as fetchPosts } from './index_BeB_6Ptl.mjs';

const GET = async () => {
  if (!APP_BLOG.isEnabled) {
    return new Response(null, {
      status: 404,
      statusText: "Not found"
    });
  }
  const posts = await fetchPosts();
  const rss = await getRssString({
    title: `${SITE.name}’s Blog`,
    description: METADATA?.description || "",
    site: "https://furkaneyazici.com",
    items: posts.map((post) => ({
      link: getPermalink(post.permalink, "post"),
      title: post.title,
      description: post.excerpt,
      pubDate: post.publishDate
    })),
    trailingSlash: SITE.trailingSlash
  });
  return new Response(rss, {
    headers: {
      "Content-Type": "application/xml"
    }
  });
};

export { GET };
