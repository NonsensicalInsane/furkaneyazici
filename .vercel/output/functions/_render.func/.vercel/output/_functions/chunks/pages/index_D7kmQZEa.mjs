import { A as AstroError, n as UnknownContentCollectionError, e as createComponent, o as renderUniqueStylesheet, p as renderScriptElement, q as createHeadAndContent, r as renderTemplate, i as renderComponent, u as unescapeHTML, d as createAstro, m as maybeRenderHead, j as Fragment, g as addAttribute } from '../astro_Cn1-UY-y.mjs';
import 'kleur/colors';
import { a as $$WidgetWrapper, b as $$Headline, e as $$Image, f as $$ItemGrid, $ as $$Button, g as $$Hero, h as $$Content, i as $$Header, d as $$PageLayout } from './about_ClYjhyIr.mjs';
import { A as APP_BLOG, B as BLOG_BASE, C as CATEGORY_BASE, T as TAG_BASE, h as cleanSlug, P as POST_PERMALINK_PATTERN, t as trimSlash, f as findImage, j as getPermalink, k as getBlogPermalink } from './404_BjS7Eeu0.mjs';
import { p as prependForwardSlash } from '../astro/assets-service_CobtS9Yp.mjs';
import { $ as $$Features2 } from './contact_BV5zDSO5.mjs';

function createCollectionToGlobResultMap({
  globResult,
  contentDir
}) {
  const collectionToGlobResultMap = {};
  for (const key in globResult) {
    const keyRelativeToContentDir = key.replace(new RegExp(`^${contentDir}`), "");
    const segments = keyRelativeToContentDir.split("/");
    if (segments.length <= 1)
      continue;
    const collection = segments[0];
    collectionToGlobResultMap[collection] ??= {};
    collectionToGlobResultMap[collection][key] = globResult[key];
  }
  return collectionToGlobResultMap;
}
const cacheEntriesByCollection = /* @__PURE__ */ new Map();
function createGetCollection({
  contentCollectionToEntryMap,
  dataCollectionToEntryMap,
  getRenderEntryImport
}) {
  return async function getCollection(collection, filter) {
    let type;
    if (collection in contentCollectionToEntryMap) {
      type = "content";
    } else if (collection in dataCollectionToEntryMap) {
      type = "data";
    } else {
      console.warn(
        `The collection ${JSON.stringify(
          collection
        )} does not exist or is empty. Ensure a collection directory with this name exists.`
      );
      return [];
    }
    const lazyImports = Object.values(
      type === "content" ? contentCollectionToEntryMap[collection] : dataCollectionToEntryMap[collection]
    );
    let entries = [];
    if (!Object.assign({"BASE_URL": "/", "MODE": "production", "DEV": false, "PROD": true, "SSR": true, "SITE": "https://furkaneyazici.netlify.app", "ASSETS_PREFIX": undefined}, { _: process.env._ })?.DEV && cacheEntriesByCollection.has(collection)) {
      entries = [...cacheEntriesByCollection.get(collection)];
    } else {
      entries = await Promise.all(
        lazyImports.map(async (lazyImport) => {
          const entry = await lazyImport();
          return type === "content" ? {
            id: entry.id,
            slug: entry.slug,
            body: entry.body,
            collection: entry.collection,
            data: entry.data,
            async render() {
              return render({
                collection: entry.collection,
                id: entry.id,
                renderEntryImport: await getRenderEntryImport(collection, entry.slug)
              });
            }
          } : {
            id: entry.id,
            collection: entry.collection,
            data: entry.data
          };
        })
      );
      cacheEntriesByCollection.set(collection, entries);
    }
    if (typeof filter === "function") {
      return entries.filter(filter);
    } else {
      return entries;
    }
  };
}
async function render({
  collection,
  id,
  renderEntryImport
}) {
  const UnexpectedRenderError = new AstroError({
    ...UnknownContentCollectionError,
    message: `Unexpected error while rendering ${String(collection)} → ${String(id)}.`
  });
  if (typeof renderEntryImport !== "function")
    throw UnexpectedRenderError;
  const baseMod = await renderEntryImport();
  if (baseMod == null || typeof baseMod !== "object")
    throw UnexpectedRenderError;
  const { default: defaultMod } = baseMod;
  if (isPropagatedAssetsModule(defaultMod)) {
    const { collectedStyles, collectedLinks, collectedScripts, getMod } = defaultMod;
    if (typeof getMod !== "function")
      throw UnexpectedRenderError;
    const propagationMod = await getMod();
    if (propagationMod == null || typeof propagationMod !== "object")
      throw UnexpectedRenderError;
    const Content = createComponent({
      factory(result, baseProps, slots) {
        let styles = "", links = "", scripts = "";
        if (Array.isArray(collectedStyles)) {
          styles = collectedStyles.map((style) => {
            return renderUniqueStylesheet(result, {
              type: "inline",
              content: style
            });
          }).join("");
        }
        if (Array.isArray(collectedLinks)) {
          links = collectedLinks.map((link) => {
            return renderUniqueStylesheet(result, {
              type: "external",
              src: prependForwardSlash(link)
            });
          }).join("");
        }
        if (Array.isArray(collectedScripts)) {
          scripts = collectedScripts.map((script) => renderScriptElement(script)).join("");
        }
        let props = baseProps;
        if (id.endsWith("mdx")) {
          props = {
            components: propagationMod.components ?? {},
            ...baseProps
          };
        }
        return createHeadAndContent(
          unescapeHTML(styles + links + scripts),
          renderTemplate`${renderComponent(
            result,
            "Content",
            propagationMod.Content,
            props,
            slots
          )}`
        );
      },
      propagation: "self"
    });
    return {
      Content,
      headings: propagationMod.getHeadings?.() ?? [],
      remarkPluginFrontmatter: propagationMod.frontmatter ?? {}
    };
  } else if (baseMod.Content && typeof baseMod.Content === "function") {
    return {
      Content: baseMod.Content,
      headings: baseMod.getHeadings?.() ?? [],
      remarkPluginFrontmatter: baseMod.frontmatter ?? {}
    };
  } else {
    throw UnexpectedRenderError;
  }
}
function isPropagatedAssetsModule(module) {
  return typeof module === "object" && module != null && "__astroPropagation" in module;
}

// astro-head-inject

const contentDir = '/src/content/';

const contentEntryGlob = /* #__PURE__ */ Object.assign({"/src/content/post/HelloandWelcome.md": () => import('../HelloandWelcome_c951gCHZ.mjs')});
const contentCollectionToEntryMap = createCollectionToGlobResultMap({
	globResult: contentEntryGlob,
	contentDir,
});

const dataEntryGlob = /* #__PURE__ */ Object.assign({});
const dataCollectionToEntryMap = createCollectionToGlobResultMap({
	globResult: dataEntryGlob,
	contentDir,
});
createCollectionToGlobResultMap({
	globResult: { ...contentEntryGlob, ...dataEntryGlob },
	contentDir,
});

let lookupMap = {};
lookupMap = {"post":{"type":"content","entries":{"helloandwelcome":"/src/content/post/HelloandWelcome.md"}}};

function createGlobLookup(glob) {
	return async (collection, lookupId) => {
		const filePath = lookupMap[collection]?.entries[lookupId];

		if (!filePath) return undefined;
		return glob[collection][filePath];
	};
}

const renderEntryGlob = /* #__PURE__ */ Object.assign({"/src/content/post/HelloandWelcome.md": () => import('../HelloandWelcome_Db40e-ZE.mjs')});
const collectionToRenderEntryMap = createCollectionToGlobResultMap({
	globResult: renderEntryGlob,
	contentDir,
});

const getCollection = createGetCollection({
	contentCollectionToEntryMap,
	dataCollectionToEntryMap,
	getRenderEntryImport: createGlobLookup(collectionToRenderEntryMap),
});

const generatePermalink = async ({
  id,
  slug,
  publishDate,
  category
}) => {
  const year = String(publishDate.getFullYear()).padStart(4, "0");
  const month = String(publishDate.getMonth() + 1).padStart(2, "0");
  const day = String(publishDate.getDate()).padStart(2, "0");
  const hour = String(publishDate.getHours()).padStart(2, "0");
  const minute = String(publishDate.getMinutes()).padStart(2, "0");
  const second = String(publishDate.getSeconds()).padStart(2, "0");
  const permalink = POST_PERMALINK_PATTERN.replace("%slug%", slug).replace("%id%", id).replace("%category%", category || "").replace("%year%", year).replace("%month%", month).replace("%day%", day).replace("%hour%", hour).replace("%minute%", minute).replace("%second%", second);
  return permalink.split("/").map((el) => trimSlash(el)).filter((el) => !!el).join("/");
};
const getNormalizedPost = async (post) => {
  const {
    id,
    slug: rawSlug = "",
    data
  } = post;
  const {
    Content,
    remarkPluginFrontmatter
  } = await post.render();
  const {
    publishDate: rawPublishDate = /* @__PURE__ */ new Date(),
    updateDate: rawUpdateDate,
    title,
    excerpt,
    image,
    tags: rawTags = [],
    category: rawCategory,
    author,
    draft = false,
    metadata = {}
  } = data;
  const slug = cleanSlug(rawSlug);
  const publishDate = new Date(rawPublishDate);
  const updateDate = rawUpdateDate ? new Date(rawUpdateDate) : void 0;
  const category = rawCategory ? cleanSlug(rawCategory) : void 0;
  const tags = rawTags.map((tag) => cleanSlug(tag));
  return {
    id,
    slug,
    permalink: await generatePermalink({
      id,
      slug,
      publishDate,
      category
    }),
    publishDate,
    updateDate,
    title,
    excerpt,
    image,
    category,
    tags,
    author,
    draft,
    metadata,
    Content,
    // or 'content' in case you consume from API
    readingTime: remarkPluginFrontmatter?.readingTime
  };
};
const getRandomizedPosts = (array, num) => {
  const newArray = [];
  while (newArray.length < num && array.length > 0) {
    const randomIndex = Math.floor(Math.random() * array.length);
    newArray.push(array[randomIndex]);
    array.splice(randomIndex, 1);
  }
  return newArray;
};
const load = async function() {
  const posts = await getCollection("post");
  const normalizedPosts = posts.map(async (post) => await getNormalizedPost(post));
  const results = (await Promise.all(normalizedPosts)).sort((a, b) => b.publishDate.valueOf() - a.publishDate.valueOf()).filter((post) => !post.draft);
  return results;
};
let _posts;
const isBlogEnabled = APP_BLOG.isEnabled;
const isRelatedPostsEnabled = APP_BLOG.isRelatedPostsEnabled;
const isBlogListRouteEnabled = APP_BLOG.list.isEnabled;
const isBlogPostRouteEnabled = APP_BLOG.post.isEnabled;
const isBlogCategoryRouteEnabled = APP_BLOG.category.isEnabled;
const isBlogTagRouteEnabled = APP_BLOG.tag.isEnabled;
const blogListRobots = APP_BLOG.list.robots;
const blogPostRobots = APP_BLOG.post.robots;
const blogCategoryRobots = APP_BLOG.category.robots;
const blogTagRobots = APP_BLOG.tag.robots;
const blogPostsPerPage = APP_BLOG?.postsPerPage;
const fetchPosts = async () => {
  if (!_posts) {
    _posts = await load();
  }
  return _posts;
};
const findPostsByIds = async (ids) => {
  if (!Array.isArray(ids))
    return [];
  const posts = await fetchPosts();
  return ids.reduce(function(r, id) {
    posts.some(function(post) {
      return id === post.id && r.push(post);
    });
    return r;
  }, []);
};
const findLatestPosts = async ({
  count
}) => {
  const _count = count || 4;
  const posts = await fetchPosts();
  return posts ? posts.slice(0, _count) : [];
};
const getStaticPathsBlogList = async ({
  paginate
}) => {
  if (!isBlogEnabled || !isBlogListRouteEnabled)
    return [];
  return paginate(await fetchPosts(), {
    params: {
      blog: BLOG_BASE || void 0
    },
    pageSize: blogPostsPerPage
  });
};
const getStaticPathsBlogPost = async () => {
  if (!isBlogEnabled || !isBlogPostRouteEnabled)
    return [];
  return (await fetchPosts()).flatMap((post) => ({
    params: {
      blog: post.permalink
    },
    props: {
      post
    }
  }));
};
const getStaticPathsBlogCategory = async ({
  paginate
}) => {
  if (!isBlogEnabled || !isBlogCategoryRouteEnabled)
    return [];
  const posts = await fetchPosts();
  const categories = /* @__PURE__ */ new Set();
  posts.map((post) => {
    typeof post.category === "string" && categories.add(post.category.toLowerCase());
  });
  return Array.from(categories).flatMap((category) => paginate(posts.filter((post) => typeof post.category === "string" && category === post.category.toLowerCase()), {
    params: {
      category,
      blog: CATEGORY_BASE || void 0
    },
    pageSize: blogPostsPerPage,
    props: {
      category
    }
  }));
};
const getStaticPathsBlogTag = async ({
  paginate
}) => {
  if (!isBlogEnabled || !isBlogTagRouteEnabled)
    return [];
  const posts = await fetchPosts();
  const tags = /* @__PURE__ */ new Set();
  posts.map((post) => {
    Array.isArray(post.tags) && post.tags.map((tag) => tags.add(tag.toLowerCase()));
  });
  return Array.from(tags).flatMap((tag) => paginate(posts.filter((post) => Array.isArray(post.tags) && post.tags.find((elem) => elem.toLowerCase() === tag)), {
    params: {
      tag,
      blog: TAG_BASE || void 0
    },
    pageSize: blogPostsPerPage,
    props: {
      tag
    }
  }));
};
function getRelatedPosts(allPosts, currentSlug, currentTags) {
  if (!isBlogEnabled || !isRelatedPostsEnabled)
    return [];
  const relatedPosts = getRandomizedPosts(allPosts.filter((post) => post.slug !== currentSlug && post.tags?.some((tag) => currentTags.includes(tag))), APP_BLOG.relatedPostsCount);
  if (relatedPosts.length < APP_BLOG.relatedPostsCount) {
    const morePosts = getRandomizedPosts(allPosts.filter((post) => post.slug !== currentSlug && !post.tags?.some((tag) => currentTags.includes(tag))), APP_BLOG.relatedPostsCount - relatedPosts.length);
    relatedPosts.push(...morePosts);
  }
  return relatedPosts;
}

const $$Astro$5 = createAstro("https://furkaneyazici.netlify.app");
const $$Features3 = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$5, $$props, $$slots);
  Astro2.self = $$Features3;
  const {
    title = await Astro2.slots.render("title"),
    subtitle = await Astro2.slots.render("subtitle"),
    tagline = await Astro2.slots.render("tagline"),
    image,
    items = [],
    columns,
    defaultIcon,
    isBeforeContent,
    isAfterContent,
    id,
    isDark = false,
    classes = {},
    bg = await Astro2.slots.render("bg")
  } = Astro2.props;
  return renderTemplate`${renderComponent($$result, "WidgetWrapper", $$WidgetWrapper, { "id": id, "isDark": isDark, "containerClass": `${isBeforeContent ? "md:pb-8 lg:pb-12" : ""} ${isAfterContent ? "pt-0 md:pt-0 lg:pt-0" : ""} ${classes?.container ?? ""}`, "bg": bg }, { "default": ($$result2) => renderTemplate` ${renderComponent($$result2, "Headline", $$Headline, { "title": title, "subtitle": subtitle, "tagline": tagline, "classes": classes?.headline })} ${maybeRenderHead()}<div aria-hidden="true" class="aspect-w-16 aspect-h-7"> ${image && renderTemplate`<div class="w-full h-80 object-cover rounded-xl mx-auto bg-gray-500 shadow-lg"> ${typeof image === "string" ? renderTemplate`${renderComponent($$result2, "Fragment", Fragment, {}, { "default": ($$result3) => renderTemplate`${unescapeHTML(image)}` })}` : renderTemplate`${renderComponent($$result2, "Image", $$Image, { "class": "w-full h-80 object-cover rounded-xl mx-auto bg-gray-500 shadow-lg", "width": "auto", "height": 320, "widths": [400, 768], "layout": "fullWidth", ...image })}`} </div>`} </div> ${renderComponent($$result2, "ItemGrid", $$ItemGrid, { "items": items, "columns": columns, "defaultIcon": defaultIcon, "classes": {
    container: "mt-12",
    panel: "max-w-full sm:max-w-md",
    title: "text-lg font-semibold",
    description: "mt-0.5",
    icon: "flex-shrink-0 mt-1 text-primary w-6 h-6",
    ...classes?.items ?? {}
  } })} ` })}`;
}, "/home/themanyface/Projects/personal_website/mywebsite/furkaneyazici2/src/components/widgets/Features3.astro", void 0);

const $$Astro$4 = createAstro("https://furkaneyazici.netlify.app");
const $$GridItem = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$4, $$props, $$slots);
  Astro2.self = $$GridItem;
  const { post } = Astro2.props;
  const image = await findImage(post.image);
  return renderTemplate`${maybeRenderHead()}<article class="mb-6 transition"> <div class="relative md:h-64 bg-gray-400 dark:bg-slate-700 rounded shadow-lg mb-6"> ${image && renderTemplate`<a${addAttribute(getPermalink(post.permalink, "post"), "href")}> ${renderComponent($$result, "Image", $$Image, { "src": image, "class": "w-full md:h-full rounded shadow-lg bg-gray-400 dark:bg-slate-700", "widths": [400, 900], "width": 400, "sizes": "(max-width: 900px) 400px, 900px", "alt": post.title, "aspectRatio": "16:9", "layout": "cover", "loading": "lazy", "decoding": "async" })} </a>`} </div> <h3 class="mb-2 text-xl font-bold leading-tight sm:text-2xl font-heading"> ${!APP_BLOG?.post?.isEnabled ? post.title : renderTemplate`<a${addAttribute(getPermalink(post.permalink, "post"), "href")} class="hover:text-primary dark:hover:text-blue-700  transition ease-in duration-200"> ${post.title} </a>`} </h3> <p class="text-muted dark:text-slate-400 text-lg">${post.excerpt}</p> </article>`;
}, "/home/themanyface/Projects/personal_website/mywebsite/furkaneyazici2/src/components/blog/GridItem.astro", void 0);

const $$Astro$3 = createAstro("https://furkaneyazici.netlify.app");
const $$Grid = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$3, $$props, $$slots);
  Astro2.self = $$Grid;
  const { posts } = Astro2.props;
  return renderTemplate`${maybeRenderHead()}<div class="grid gap-6 row-gap-5 md:grid-cols-2 lg:grid-cols-4 -mb-6"> ${posts.map((post) => renderTemplate`${renderComponent($$result, "Item", $$GridItem, { "post": post })}`)} </div>`;
}, "/home/themanyface/Projects/personal_website/mywebsite/furkaneyazici2/src/components/blog/Grid.astro", void 0);

const $$Astro$2 = createAstro("https://furkaneyazici.netlify.app");
const $$BlogLatestPosts = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$2, $$props, $$slots);
  Astro2.self = $$BlogLatestPosts;
  const {
    title = await Astro2.slots.render("title"),
    linkText = "View all posts",
    linkUrl = getBlogPermalink(),
    information = await Astro2.slots.render("information"),
    count = 4,
    id,
    isDark = false,
    classes = {},
    bg = await Astro2.slots.render("bg")
  } = Astro2.props;
  const posts = APP_BLOG.isEnabled ? await findLatestPosts({ count }) : [];
  return renderTemplate`${APP_BLOG.isEnabled ? renderTemplate`${renderComponent($$result, "WidgetWrapper", $$WidgetWrapper, { "id": id, "isDark": isDark, "containerClass": classes?.container, "bg": bg }, { "default": ($$result2) => renderTemplate`${maybeRenderHead()}<div class="flex flex-col lg:justify-between mb-8">${title && renderTemplate`<div class="md:max-w-sm"><h2 class="text-3xl font-bold tracking-tight sm:text-4xl sm:leading-none group font-heading mb-2">${unescapeHTML(title)}</h2></div>`}${information && renderTemplate`<p class="text-muted dark:text-slate-400 lg:text-lg lg:max-w-md mb-4">${unescapeHTML(information)}</p>`}${APP_BLOG.list.isEnabled && linkText && linkUrl && renderTemplate`${renderComponent($$result2, "Button", $$Button, { "variant": "link", "href": linkUrl }, { "default": ($$result3) => renderTemplate`${linkText} »` })}`}</div>${renderComponent($$result2, "Grid", $$Grid, { "posts": posts })}` })}` : renderTemplate`${renderComponent($$result, "Fragment", Fragment, {})}`}`;
}, "/home/themanyface/Projects/personal_website/mywebsite/furkaneyazici2/src/components/widgets/BlogLatestPosts.astro", void 0);

const $$Astro$1 = createAstro("https://furkaneyazici.netlify.app");
const $$CallToAction = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$1, $$props, $$slots);
  Astro2.self = $$CallToAction;
  const {
    title = await Astro2.slots.render("title"),
    subtitle = await Astro2.slots.render("subtitle"),
    tagline = await Astro2.slots.render("tagline"),
    actions = await Astro2.slots.render("actions"),
    callPageName = await Astro2.slots.render("callPageName"),
    callPagePath = await Astro2.slots.render("callPagePath"),
    id,
    isDark = false,
    classes = {},
    bg = await Astro2.slots.render("bg"),
    logo = await Astro2.slots.render("logo")
  } = Astro2.props;
  return renderTemplate`${renderComponent($$result, "WidgetWrapper", $$WidgetWrapper, { "id": id, "isDark": isDark, "containerClass": `max-w-6xl mx-auto ${classes?.container ?? ""}`, "bg": bg }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="max-w-3xl mx-auto text-center p-6 rounded-md shadow-xl dark:shadow-none dark:border dark:border-slate-600"> ${renderComponent($$result2, "Headline", $$Headline, { "title": title, "subtitle": subtitle, "tagline": tagline, "classes": {
    container: "mb-0 md:mb-0",
    title: "text-4xl md:text-4xl font-bold leading-tighter tracking-tighter mb-4 font-heading",
    subtitle: "text-xl text-muted dark:text-slate-400"
  }, "callPageName": callPageName, "callPagePath": callPagePath })} ${logo && renderTemplate`<div class="flex justify-center"> <img${addAttribute(logo, "src")} class="w-32 h-32"> </div>`} ${actions && renderTemplate`<div class="max-w-xs sm:max-w-md m-auto flex flex-nowrap flex-col sm:flex-row sm:justify-center gap-4 mt-6"> ${Array.isArray(actions) ? actions.map((action) => renderTemplate`<div class="flex w-full sm:w-auto"> ${renderComponent($$result2, "Button", $$Button, { ...action || {}, "class": "w-full sm:mb-0" })} </div>`) : renderTemplate`${renderComponent($$result2, "Fragment", Fragment, {}, { "default": ($$result3) => renderTemplate`${unescapeHTML(actions)}` })}`} </div>`} </div> ` })}`;
}, "/home/themanyface/Projects/personal_website/mywebsite/furkaneyazici2/src/components/widgets/CallToAction.astro", void 0);

const $$Astro = createAstro("https://furkaneyazici.netlify.app");
const $$Index = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Index;
  const metadata = {
    title: "The FEY Website"
  };
  return renderTemplate`${renderComponent($$result, "Layout", $$PageLayout, { "metadata": metadata }, { "default": ($$result2) => renderTemplate`   ${renderComponent($$result2, "Hero", $$Hero, { "id": "hero", "title": "Furkan E\u015Fref Yaz\u0131c\u0131", "tagline": "Researcher & Developer" }, { "subtitle": ($$result3) => renderTemplate`${renderComponent($$result3, "Fragment", Fragment, { "slot": "subtitle" }, { "default": ($$result4) => renderTemplate`
This website showcases my journey into technology and research, reflecting my passion for innovation. Here, I share insights and project outcomes, aiming to foster dialogue and learning with others in the tech community. My goal is to contribute to the ongoing conversation about technology's impact on our future and to continually deepen my own expertise. Additionally, illustrations in this website are created by me, and I am open to collaborations and commissions for your different projects.
` })}` })}  ${renderComponent($$result2, "Content", $$Content, { "id": "about", "columns": 3, "items": [
    {
      icon: "tabler:brand-github",
      callToAction: {
        target: "_blank",
        text: "Github",
        href: "www.github.com/nonsensicalinsane"
      }
    },
    {
      icon: "tabler:brand-linkedin",
      callToAction: {
        target: "_blank",
        text: "LinkedIn",
        href: "www.linkedin.com/nonsensicalinsane"
      }
    }
  ], "callToAction": {
    text: "More about me and my resume!",
    icon: "tabler:chevron-right",
    href: "/about"
  }, "image": {
    src: "~/assets/images/me.png",
    alt: "Furkan E\u015Fref Yaz\u0131c\u0131",
    loading: "eager"
  } }, { "bg": ($$result3) => renderTemplate`${renderComponent($$result3, "Fragment", Fragment, { "slot": "bg" }, { "default": ($$result4) => renderTemplate` ${maybeRenderHead()}<div class="absolute inset-0 bg-blue-50 dark:bg-transparent"></div> ` })}`, "content": ($$result3) => renderTemplate`${renderComponent($$result3, "Fragment", Fragment, { "slot": "content" }, { "default": ($$result4) => renderTemplate` <h2 class="text-2xl font-bold tracking-tight dark:text-white sm:text-3xl mb-2">About me</h2> <p>
Hello, I'm an interdisciplinary researcher passionate about exploring various fields and turning my research into projects.The areas I specialize in mostly revolve around deep learning and quantum computing, particularly their mathematical and theoretical aspects as well as their applications to various other fields. My other areas of interest include biology, complexity science, sociology, and more. Additionally, if you would like to support me financially in my work, projects, and blog posts, you can support me through the Patreon link below. This would make me extremely happy. In the future, I am also considering producing some content on a YouTube channel to the best of my ability. To learn more, you can click on the link below:
</p> ` })}` })}   ${renderComponent($$result2, "Features3", $$Features3, { "title": "Skills", "subtitle": "I have a diverse skill set that spans across various domains. Here are some of my key areas of expertise.", "columns": 3, "defaultIcon": "tabler:point-filled", "items": [
    {
      title: "Graphic design",
      description: "Proficient in crafting visually appealing designs that convey messages effectively.",
      icon: "tabler:brush"
    },
    {
      title: "Data Science & Deep Learning",
      description: "My work involves utilizing data analysis and deep learning to unearth insights and solve problems in innovative ways.",
      icon: "tabler:brain"
    },
    {
      title: "Quantum Computing",
      description: "I am exploring the potential of quantum computing to address challenges that are currently beyond the scope of classical computing methods.",
      icon: "tabler:atom"
    },
    {
      title: "Research",
      description: "My research interests are broad, spanning across quantum machine learning to other interdisciplinary areas where technology and science converge to offer novel solutions and deeper understanding.",
      icon: "tabler:book"
    },
    {
      title: "Software Development",
      description: "I develop applications and tools that aid in research and projects related to my fields of interest, using a variety of programming languages to create meaningful contributions.",
      icon: "tabler:code"
    },
    {
      title: "Adaptability",
      description: "I am adept at adapting to new technologies, tools, and methodologies, allowing me to stay ahead of the curve and remain agile in the face of change.",
      icon: "tabler:refresh"
    }
  ] })}  ${renderComponent($$result2, "Content", $$Content, { "id": "projects", "title": "Feautured Projects", "subtitle": "Explore my most recent projects and the creative process behind them.", "isReversed": true, "items": [], "callPageName": "More Projects", "callPagePath": "/projects" })}     ${renderComponent($$result2, "BlogLatestPosts", $$BlogLatestPosts, { "id": "blog", "title": "Explore my insightful articles on my <span class='text-blue-600 dark:text-blue-400'>blog</span>", "information": "I share my thoughts, insights, and discoveries on a variety of topics, including quantum computing, machine learning, and more." }, { "bg": ($$result3) => renderTemplate`${renderComponent($$result3, "Fragment", Fragment, { "slot": "bg" }, { "default": ($$result4) => renderTemplate` <div class="absolute inset-0 bg-blue-50 dark:bg-transparent"></div> ` })}` })} ${renderComponent($$result2, "CalltoAction", $$CallToAction, { "id": "patreon", "title": "Help me on my journey!", "subtitle": "If you would like to support me financially in my work, projects, and blog posts, you can support me through the Patreon link below. This would make me extremely happy. In the future, I am also considering producing some content on a YouTube channel to the best of my ability.", "actions": [
    {
      text: "Support me on Patreon",
      href: "https://www.patreon.com/theFEY",
      target: "_blank"
    }
  ], ",": true, "logo": "src/assets/images/icons/patreon.png" })} ${renderComponent($$result2, "Features2", $$Features2, { "title": "I am here to help!", "id": "contact", "subtitle": "Reach out to me for collaborations, inquiries, or to simply say hello!", "items": [
    {
      title: "Email",
      description: '<a href="mailto:yazici.furkan@proton.me"> yazici.furkan@proton.me </a>',
      icon: "tabler:mail"
    },
    {
      title: "Upwork",
      description: '<a href="https://www.upwork.com/freelancers/~01ae41556331664a51" target="_blank">Upwork Profile</a>',
      icon: "tabler:brand-upwork"
    },
    {
      title: "LinkedIn",
      description: '<a href="https://www.linkedin.com/in/nonsensicalinsane/" target="_blank">LinkedIn Profile</a>',
      icon: "tabler:brand-linkedin"
    },
    {
      title: "Github",
      description: '<a href="https://www.github.com/nonsensicalinsane" target="_blank">@nonsensicalinsane</a>',
      icon: "tabler:brand-github"
    },
    {
      title: "Discord",
      description: '<a href="  " target="_blank">@furkaneyazici</a>',
      icon: "tabler:brand-discord"
    },
    {
      title: "Twitter",
      description: '<a href="https://twitter.com/furkaneyazici" target="_blank">@furkaneyazici</a>',
      icon: "tabler:brand-twitter"
    }
  ] })} `, "header": ($$result2) => renderTemplate`${renderComponent($$result2, "Fragment", Fragment, { "slot": "header" }, { "default": ($$result3) => renderTemplate` ${renderComponent($$result3, "Header", $$Header, { "links": [
    { text: "Home", href: "#" },
    { text: "About", href: "#about" },
    { text: "Projects", href: "#projects" },
    { text: "Blog", href: "#blog" }
  ], "actions": [
    {
      text: "Contact me!",
      href: "#contact"
    }
  ], "isSticky": true, "showToggleTheme": true })} ` })}` })}`;
}, "/home/themanyface/Projects/personal_website/mywebsite/furkaneyazici2/src/pages/index.astro", void 0);

const $$file = "/home/themanyface/Projects/personal_website/mywebsite/furkaneyazici2/src/pages/index.astro";
const $$url = "";

const index = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Index,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

export { $$Grid as $, getStaticPathsBlogTag as a, blogCategoryRobots as b, blogTagRobots as c, getStaticPathsBlogList as d, blogListRobots as e, fetchPosts as f, getStaticPathsBlogCategory as g, findPostsByIds as h, getRelatedPosts as i, getStaticPathsBlogPost as j, blogPostRobots as k, index as l };
