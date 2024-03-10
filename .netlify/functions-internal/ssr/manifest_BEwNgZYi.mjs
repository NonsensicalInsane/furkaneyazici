import 'cookie';
import 'kleur/colors';
import './chunks/astro_CDPvs3qL.mjs';
import 'clsx';
import { compile } from 'path-to-regexp';

if (typeof process !== "undefined") {
  let proc = process;
  if ("argv" in proc && Array.isArray(proc.argv)) {
    if (proc.argv.includes("--verbose")) ; else if (proc.argv.includes("--silent")) ; else ;
  }
}

function getRouteGenerator(segments, addTrailingSlash) {
  const template = segments.map((segment) => {
    return "/" + segment.map((part) => {
      if (part.spread) {
        return `:${part.content.slice(3)}(.*)?`;
      } else if (part.dynamic) {
        return `:${part.content}`;
      } else {
        return part.content.normalize().replace(/\?/g, "%3F").replace(/#/g, "%23").replace(/%5B/g, "[").replace(/%5D/g, "]").replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
      }
    }).join("");
  }).join("");
  let trailing = "";
  if (addTrailingSlash === "always" && segments.length) {
    trailing = "/";
  }
  const toPath = compile(template + trailing);
  return toPath;
}

function deserializeRouteData(rawRouteData) {
  return {
    route: rawRouteData.route,
    type: rawRouteData.type,
    pattern: new RegExp(rawRouteData.pattern),
    params: rawRouteData.params,
    component: rawRouteData.component,
    generate: getRouteGenerator(rawRouteData.segments, rawRouteData._meta.trailingSlash),
    pathname: rawRouteData.pathname || void 0,
    segments: rawRouteData.segments,
    prerender: rawRouteData.prerender,
    redirect: rawRouteData.redirect,
    redirectRoute: rawRouteData.redirectRoute ? deserializeRouteData(rawRouteData.redirectRoute) : void 0,
    fallbackRoutes: rawRouteData.fallbackRoutes.map((fallback) => {
      return deserializeRouteData(fallback);
    }),
    isIndex: rawRouteData.isIndex
  };
}

function deserializeManifest(serializedManifest) {
  const routes = [];
  for (const serializedRoute of serializedManifest.routes) {
    routes.push({
      ...serializedRoute,
      routeData: deserializeRouteData(serializedRoute.routeData)
    });
    const route = serializedRoute;
    route.routeData = deserializeRouteData(serializedRoute.routeData);
  }
  const assets = new Set(serializedManifest.assets);
  const componentMetadata = new Map(serializedManifest.componentMetadata);
  const clientDirectives = new Map(serializedManifest.clientDirectives);
  return {
    // in case user middleware exists, this no-op middleware will be reassigned (see plugin-ssr.ts)
    middleware(_, next) {
      return next();
    },
    ...serializedManifest,
    assets,
    componentMetadata,
    clientDirectives,
    routes
  };
}

const manifest = deserializeManifest({"adapterName":"@astrojs/netlify","routes":[{"file":"404.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/404","isIndex":false,"type":"page","pattern":"^\\/404$","segments":[[{"content":"404","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/404.astro","pathname":"/404","prerender":true,"fallbackRoutes":[],"_meta":{"trailingSlash":"never"}}},{"file":"about/index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/about","isIndex":false,"type":"page","pattern":"^\\/about$","segments":[[{"content":"about","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/about.astro","pathname":"/about","prerender":true,"fallbackRoutes":[],"_meta":{"trailingSlash":"never"}}},{"file":"contact/index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/contact","isIndex":false,"type":"page","pattern":"^\\/contact$","segments":[[{"content":"contact","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/contact.astro","pathname":"/contact","prerender":true,"fallbackRoutes":[],"_meta":{"trailingSlash":"never"}}},{"file":"projects/index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/projects","isIndex":false,"type":"page","pattern":"^\\/projects$","segments":[[{"content":"projects","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/projects.astro","pathname":"/projects","prerender":true,"fallbackRoutes":[],"_meta":{"trailingSlash":"never"}}},{"file":"rss.xml","links":[],"scripts":[],"styles":[],"routeData":{"route":"/rss.xml","isIndex":false,"type":"endpoint","pattern":"^\\/rss\\.xml$","segments":[[{"content":"rss.xml","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/rss.xml.ts","pathname":"/rss.xml","prerender":true,"fallbackRoutes":[],"_meta":{"trailingSlash":"never"}}},{"file":"index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/","isIndex":true,"type":"page","pattern":"^\\/$","segments":[],"params":[],"component":"src/pages/index.astro","pathname":"/","prerender":true,"fallbackRoutes":[],"_meta":{"trailingSlash":"never"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/_image","pattern":"^\\/_image$","segments":[[{"content":"_image","dynamic":false,"spread":false}]],"params":[],"component":"node_modules/astro/dist/assets/endpoint/generic.js","pathname":"/_image","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"never"}}}],"site":"https://furkaneyazici.com","base":"/","trailingSlash":"never","compressHTML":true,"componentMetadata":[["/home/themanyface/Projects/personal_website/mywebsite/furkaneyazici/src/pages/[...blog]/[...page].astro",{"propagation":"in-tree","containsHead":true}],["/home/themanyface/Projects/personal_website/mywebsite/furkaneyazici/src/pages/[...blog]/[category]/[...page].astro",{"propagation":"in-tree","containsHead":true}],["/home/themanyface/Projects/personal_website/mywebsite/furkaneyazici/src/pages/[...blog]/[tag]/[...page].astro",{"propagation":"in-tree","containsHead":true}],["/home/themanyface/Projects/personal_website/mywebsite/furkaneyazici/src/pages/[...blog]/index.astro",{"propagation":"in-tree","containsHead":true}],["/home/themanyface/Projects/personal_website/mywebsite/furkaneyazici/src/pages/about.astro",{"propagation":"none","containsHead":true}],["/home/themanyface/Projects/personal_website/mywebsite/furkaneyazici/src/pages/contact.astro",{"propagation":"none","containsHead":true}],["/home/themanyface/Projects/personal_website/mywebsite/furkaneyazici/src/pages/index.astro",{"propagation":"in-tree","containsHead":true}],["/home/themanyface/Projects/personal_website/mywebsite/furkaneyazici/src/pages/projects.astro",{"propagation":"none","containsHead":true}],["/home/themanyface/Projects/personal_website/mywebsite/furkaneyazici/src/pages/404.astro",{"propagation":"none","containsHead":true}],["\u0000astro:content",{"propagation":"in-tree","containsHead":false}],["/home/themanyface/Projects/personal_website/mywebsite/furkaneyazici/src/utils/blog.ts",{"propagation":"in-tree","containsHead":false}],["/home/themanyface/Projects/personal_website/mywebsite/furkaneyazici/src/components/blog/RelatedPosts.astro",{"propagation":"in-tree","containsHead":false}],["\u0000@astro-page:src/pages/[...blog]/index@_@astro",{"propagation":"in-tree","containsHead":false}],["\u0000@astrojs-ssr-virtual-entry",{"propagation":"in-tree","containsHead":false}],["/home/themanyface/Projects/personal_website/mywebsite/furkaneyazici/src/components/widgets/BlogHighlightedPosts.astro",{"propagation":"in-tree","containsHead":false}],["/home/themanyface/Projects/personal_website/mywebsite/furkaneyazici/src/components/widgets/BlogLatestPosts.astro",{"propagation":"in-tree","containsHead":false}],["\u0000@astro-page:src/pages/index@_@astro",{"propagation":"in-tree","containsHead":false}],["\u0000@astro-page:src/pages/[...blog]/[...page]@_@astro",{"propagation":"in-tree","containsHead":false}],["\u0000@astro-page:src/pages/[...blog]/[category]/[...page]@_@astro",{"propagation":"in-tree","containsHead":false}],["\u0000@astro-page:src/pages/[...blog]/[tag]/[...page]@_@astro",{"propagation":"in-tree","containsHead":false}],["/home/themanyface/Projects/personal_website/mywebsite/furkaneyazici/src/pages/rss.xml.ts",{"propagation":"in-tree","containsHead":false}],["\u0000@astro-page:src/pages/rss.xml@_@ts",{"propagation":"in-tree","containsHead":false}]],"renderers":[],"clientDirectives":[["idle","(()=>{var i=t=>{let e=async()=>{await(await t())()};\"requestIdleCallback\"in window?window.requestIdleCallback(e):setTimeout(e,200)};(self.Astro||(self.Astro={})).idle=i;window.dispatchEvent(new Event(\"astro:idle\"));})();"],["load","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).load=e;window.dispatchEvent(new Event(\"astro:load\"));})();"],["media","(()=>{var s=(i,t)=>{let a=async()=>{await(await i())()};if(t.value){let e=matchMedia(t.value);e.matches?a():e.addEventListener(\"change\",a,{once:!0})}};(self.Astro||(self.Astro={})).media=s;window.dispatchEvent(new Event(\"astro:media\"));})();"],["only","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).only=e;window.dispatchEvent(new Event(\"astro:only\"));})();"],["visible","(()=>{var l=(s,i,o)=>{let r=async()=>{await(await s())()},t=typeof i.value==\"object\"?i.value:void 0,c={rootMargin:t==null?void 0:t.rootMargin},n=new IntersectionObserver(e=>{for(let a of e)if(a.isIntersecting){n.disconnect(),r();break}},c);for(let e of o.children)n.observe(e)};(self.Astro||(self.Astro={})).visible=l;window.dispatchEvent(new Event(\"astro:visible\"));})();"]],"entryModules":{"\u0000@astrojs-ssr-virtual-entry":"entry.mjs","\u0000@astro-renderers":"renderers.mjs","\u0000noop-middleware":"_noop-middleware.mjs","\u0000@astrojs-manifest":"manifest_BEwNgZYi.mjs","\u0000@astro-page:node_modules/astro/dist/assets/endpoint/generic@_@js":"chunks/generic_CPzO_OX8.mjs","\u0000@astro-page:src/pages/404@_@astro":"chunks/404_B_fjYBF_.mjs","\u0000@astro-page:src/pages/about@_@astro":"chunks/about_Dm_wvKqB.mjs","\u0000@astro-page:src/pages/contact@_@astro":"chunks/contact_Dhc57NgA.mjs","\u0000@astro-page:src/pages/projects@_@astro":"chunks/projects_thL-dFzC.mjs","\u0000@astro-page:src/pages/rss.xml@_@ts":"chunks/rss_74QtBCiG.mjs","\u0000@astro-page:src/pages/[...blog]/[category]/[...page]@_@astro":"chunks/_.._CsZO6Xcr.mjs","\u0000@astro-page:src/pages/[...blog]/[tag]/[...page]@_@astro":"chunks/_.._DRBy8HvN.mjs","\u0000@astro-page:src/pages/[...blog]/[...page]@_@astro":"chunks/_.._DrI5Zr6b.mjs","\u0000@astro-page:src/pages/index@_@astro":"chunks/index_CgS2u4P1.mjs","\u0000@astro-page:src/pages/[...blog]/index@_@astro":"chunks/index_DisJegI8.mjs","/home/themanyface/Projects/personal_website/mywebsite/furkaneyazici/src/assets/images/icons/logo.png":"chunks/logo_CAjZ1JRc.mjs","/home/themanyface/Projects/personal_website/mywebsite/furkaneyazici/src/assets/images/me.png":"chunks/me_B7HhQisZ.mjs","/home/themanyface/Projects/personal_website/mywebsite/furkaneyazici/src/content/post/markdown-elements-demo-post.mdx?astroContentCollectionEntry=true":"chunks/markdown-elements-demo-post_BHYROJKW.mjs","/home/themanyface/Projects/personal_website/mywebsite/furkaneyazici/src/content/post/markdown-elements-demo-post.mdx?astroPropagatedAssets":"chunks/markdown-elements-demo-post_B1VKS-Pa.mjs","/home/themanyface/Projects/personal_website/mywebsite/furkaneyazici/src/content/post/markdown-elements-demo-post.mdx":"chunks/markdown-elements-demo-post_DCRK4zRs.mjs","@astrojs/preact/client.js":"_astro/client.Bwd9BFQS.js","/home/themanyface/Projects/personal_website/mywebsite/furkaneyazici/node_modules/@preact/signals/dist/signals.module.js":"_astro/signals.module.Cgq9k_Df.js","/astro/hoisted.js?q=0":"_astro/hoisted.DqR2iBSn.js","astro:scripts/before-hydration.js":""},"assets":["/_astro/logo.Bkwyawx_.ico","/_astro/logo.BK6U1qto.png","/_astro/inter-cyrillic-ext-wght-normal.DIEz8p5i.woff2","/_astro/inter-cyrillic-wght-normal.BmJJXa8e.woff2","/_astro/inter-greek-ext-wght-normal.D5AYLNiq.woff2","/_astro/inter-greek-wght-normal.DyIDNIyN.woff2","/_astro/inter-vietnamese-wght-normal._GQuwPVU.woff2","/_astro/inter-latin-ext-wght-normal.CN1pIXkb.woff2","/_astro/inter-latin-wght-normal.BgVq2Tq4.woff2","/_astro/me.B2ic110j.png","/_astro/logo.CyHlYT-2.svg","/_astro/_page_.CfkxdmJA.css","/_headers","/robots.txt","/_astro/client.Bwd9BFQS.js","/_astro/client.EMyOD0P7.js","/_astro/hoisted.DqR2iBSn.js","/_astro/signals.module.Cgq9k_Df.js","/decapcms/config.yml","/decapcms/index.html","/404.html","/about/index.html","/contact/index.html","/projects/index.html","/rss.xml","/index.html"],"buildFormat":"directory"});

export { manifest };
