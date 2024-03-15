import 'cookie';
import { bold, red, yellow, dim, blue } from 'kleur/colors';
import './chunks/astro_Cn1-UY-y.mjs';
import 'clsx';
import { compile } from 'path-to-regexp';

const dateTimeFormat = new Intl.DateTimeFormat([], {
  hour: "2-digit",
  minute: "2-digit",
  second: "2-digit",
  hour12: false
});
const levels = {
  debug: 20,
  info: 30,
  warn: 40,
  error: 50,
  silent: 90
};
function log(opts, level, label, message, newLine = true) {
  const logLevel = opts.level;
  const dest = opts.dest;
  const event = {
    label,
    level,
    message,
    newLine
  };
  if (!isLogLevelEnabled(logLevel, level)) {
    return;
  }
  dest.write(event);
}
function isLogLevelEnabled(configuredLogLevel, level) {
  return levels[configuredLogLevel] <= levels[level];
}
function info(opts, label, message, newLine = true) {
  return log(opts, "info", label, message, newLine);
}
function warn(opts, label, message, newLine = true) {
  return log(opts, "warn", label, message, newLine);
}
function error(opts, label, message, newLine = true) {
  return log(opts, "error", label, message, newLine);
}
function debug(...args) {
  if ("_astroGlobalDebug" in globalThis) {
    globalThis._astroGlobalDebug(...args);
  }
}
function getEventPrefix({ level, label }) {
  const timestamp = `${dateTimeFormat.format(/* @__PURE__ */ new Date())}`;
  const prefix = [];
  if (level === "error" || level === "warn") {
    prefix.push(bold(timestamp));
    prefix.push(`[${level.toUpperCase()}]`);
  } else {
    prefix.push(timestamp);
  }
  if (label) {
    prefix.push(`[${label}]`);
  }
  if (level === "error") {
    return red(prefix.join(" "));
  }
  if (level === "warn") {
    return yellow(prefix.join(" "));
  }
  if (prefix.length === 1) {
    return dim(prefix[0]);
  }
  return dim(prefix[0]) + " " + blue(prefix.splice(1).join(" "));
}
if (typeof process !== "undefined") {
  let proc = process;
  if ("argv" in proc && Array.isArray(proc.argv)) {
    if (proc.argv.includes("--verbose")) ; else if (proc.argv.includes("--silent")) ; else ;
  }
}
class Logger {
  options;
  constructor(options) {
    this.options = options;
  }
  info(label, message, newLine = true) {
    info(this.options, label, message, newLine);
  }
  warn(label, message, newLine = true) {
    warn(this.options, label, message, newLine);
  }
  error(label, message, newLine = true) {
    error(this.options, label, message, newLine);
  }
  debug(label, ...messages) {
    debug(label, ...messages);
  }
  level() {
    return this.options.level;
  }
  forkIntegrationLogger(label) {
    return new AstroIntegrationLogger(this.options, label);
  }
}
class AstroIntegrationLogger {
  options;
  label;
  constructor(logging, label) {
    this.options = logging;
    this.label = label;
  }
  /**
   * Creates a new logger instance with a new label, but the same log options.
   */
  fork(label) {
    return new AstroIntegrationLogger(this.options, label);
  }
  info(message) {
    info(this.options, this.label, message);
  }
  warn(message) {
    warn(this.options, this.label, message);
  }
  error(message) {
    error(this.options, this.label, message);
  }
  debug(message) {
    debug(this.label, message);
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
  return (params) => {
    const path = toPath(params);
    return path || "/";
  };
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
  const inlinedScripts = new Map(serializedManifest.inlinedScripts);
  const clientDirectives = new Map(serializedManifest.clientDirectives);
  return {
    // in case user middleware exists, this no-op middleware will be reassigned (see plugin-ssr.ts)
    middleware(_, next) {
      return next();
    },
    ...serializedManifest,
    assets,
    componentMetadata,
    inlinedScripts,
    clientDirectives,
    routes
  };
}

const manifest = deserializeManifest({"adapterName":"@astrojs/vercel/serverless","routes":[{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/_image","pattern":"^\\/_image$","segments":[[{"content":"_image","dynamic":false,"spread":false}]],"params":[],"component":"node_modules/astro/dist/assets/endpoint/generic.js","pathname":"/_image","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"never"}}},{"file":"","links":[],"scripts":[{"type":"external","value":"/_astro/hoisted.D9HCc-z0.js"}],"styles":[{"type":"external","src":"/_astro/_page_.BXIG5uYx.css"}],"routeData":{"route":"/404","isIndex":false,"type":"page","pattern":"^\\/404$","segments":[[{"content":"404","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/404.astro","pathname":"/404","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"never"}}},{"file":"","links":[],"scripts":[{"type":"external","value":"/_astro/hoisted.D9HCc-z0.js"}],"styles":[{"type":"external","src":"/_astro/_page_.BXIG5uYx.css"}],"routeData":{"route":"/about","isIndex":false,"type":"page","pattern":"^\\/about$","segments":[[{"content":"about","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/about.astro","pathname":"/about","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"never"}}},{"file":"","links":[],"scripts":[{"type":"external","value":"/_astro/hoisted.D9HCc-z0.js"}],"styles":[{"type":"external","src":"/_astro/_page_.BXIG5uYx.css"}],"routeData":{"route":"/contact","isIndex":false,"type":"page","pattern":"^\\/contact$","segments":[[{"content":"contact","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/contact.astro","pathname":"/contact","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"never"}}},{"file":"","links":[],"scripts":[{"type":"external","value":"/_astro/hoisted.D9HCc-z0.js"}],"styles":[{"type":"external","src":"/_astro/_page_.BXIG5uYx.css"}],"routeData":{"route":"/projects","isIndex":false,"type":"page","pattern":"^\\/projects$","segments":[[{"content":"projects","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/projects.astro","pathname":"/projects","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"never"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"route":"/rss.xml","isIndex":false,"type":"endpoint","pattern":"^\\/rss\\.xml$","segments":[[{"content":"rss.xml","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/rss.xml.ts","pathname":"/rss.xml","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"never"}}},{"file":"","links":[],"scripts":[{"type":"external","value":"/_astro/hoisted.D9HCc-z0.js"}],"styles":[{"type":"external","src":"/_astro/_page_.BXIG5uYx.css"}],"routeData":{"route":"/","isIndex":true,"type":"page","pattern":"^\\/$","segments":[],"params":[],"component":"src/pages/index.astro","pathname":"/","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"never"}}}],"site":"https://furkaneyazici.netlify.app","base":"/","trailingSlash":"never","compressHTML":true,"componentMetadata":[["/home/themanyface/Projects/personal_website/mywebsite/furkaneyazici2/src/pages/[...blog]/[...page].astro",{"propagation":"in-tree","containsHead":true}],["/home/themanyface/Projects/personal_website/mywebsite/furkaneyazici2/src/pages/[...blog]/[category]/[...page].astro",{"propagation":"in-tree","containsHead":true}],["/home/themanyface/Projects/personal_website/mywebsite/furkaneyazici2/src/pages/[...blog]/[tag]/[...page].astro",{"propagation":"in-tree","containsHead":true}],["/home/themanyface/Projects/personal_website/mywebsite/furkaneyazici2/src/pages/[...blog]/index.astro",{"propagation":"in-tree","containsHead":true}],["/home/themanyface/Projects/personal_website/mywebsite/furkaneyazici2/src/pages/about.astro",{"propagation":"none","containsHead":true}],["/home/themanyface/Projects/personal_website/mywebsite/furkaneyazici2/src/pages/contact.astro",{"propagation":"none","containsHead":true}],["/home/themanyface/Projects/personal_website/mywebsite/furkaneyazici2/src/pages/index.astro",{"propagation":"in-tree","containsHead":true}],["/home/themanyface/Projects/personal_website/mywebsite/furkaneyazici2/src/pages/projects.astro",{"propagation":"none","containsHead":true}],["/home/themanyface/Projects/personal_website/mywebsite/furkaneyazici2/src/pages/404.astro",{"propagation":"none","containsHead":true}],["\u0000astro:content",{"propagation":"in-tree","containsHead":false}],["/home/themanyface/Projects/personal_website/mywebsite/furkaneyazici2/src/utils/blog.ts",{"propagation":"in-tree","containsHead":false}],["/home/themanyface/Projects/personal_website/mywebsite/furkaneyazici2/src/components/blog/RelatedPosts.astro",{"propagation":"in-tree","containsHead":false}],["\u0000@astro-page:src/pages/[...blog]/index@_@astro",{"propagation":"in-tree","containsHead":false}],["\u0000@astrojs-ssr-virtual-entry",{"propagation":"in-tree","containsHead":false}],["/home/themanyface/Projects/personal_website/mywebsite/furkaneyazici2/src/components/widgets/BlogHighlightedPosts.astro",{"propagation":"in-tree","containsHead":false}],["/home/themanyface/Projects/personal_website/mywebsite/furkaneyazici2/src/components/widgets/BlogLatestPosts.astro",{"propagation":"in-tree","containsHead":false}],["\u0000@astro-page:src/pages/index@_@astro",{"propagation":"in-tree","containsHead":false}],["\u0000@astro-page:src/pages/[...blog]/[...page]@_@astro",{"propagation":"in-tree","containsHead":false}],["\u0000@astro-page:src/pages/[...blog]/[category]/[...page]@_@astro",{"propagation":"in-tree","containsHead":false}],["\u0000@astro-page:src/pages/[...blog]/[tag]/[...page]@_@astro",{"propagation":"in-tree","containsHead":false}],["/home/themanyface/Projects/personal_website/mywebsite/furkaneyazici2/src/pages/rss.xml.ts",{"propagation":"in-tree","containsHead":false}],["\u0000@astro-page:src/pages/rss.xml@_@ts",{"propagation":"in-tree","containsHead":false}]],"renderers":[],"clientDirectives":[["idle","(()=>{var i=t=>{let e=async()=>{await(await t())()};\"requestIdleCallback\"in window?window.requestIdleCallback(e):setTimeout(e,200)};(self.Astro||(self.Astro={})).idle=i;window.dispatchEvent(new Event(\"astro:idle\"));})();"],["load","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).load=e;window.dispatchEvent(new Event(\"astro:load\"));})();"],["media","(()=>{var s=(i,t)=>{let a=async()=>{await(await i())()};if(t.value){let e=matchMedia(t.value);e.matches?a():e.addEventListener(\"change\",a,{once:!0})}};(self.Astro||(self.Astro={})).media=s;window.dispatchEvent(new Event(\"astro:media\"));})();"],["only","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).only=e;window.dispatchEvent(new Event(\"astro:only\"));})();"],["visible","(()=>{var l=(s,i,o)=>{let r=async()=>{await(await s())()},t=typeof i.value==\"object\"?i.value:void 0,c={rootMargin:t==null?void 0:t.rootMargin},n=new IntersectionObserver(e=>{for(let a of e)if(a.isIntersecting){n.disconnect(),r();break}},c);for(let e of o.children)n.observe(e)};(self.Astro||(self.Astro={})).visible=l;window.dispatchEvent(new Event(\"astro:visible\"));})();"]],"entryModules":{"\u0000@astrojs-ssr-virtual-entry":"entry.mjs","\u0000@astro-renderers":"renderers.mjs","\u0000noop-middleware":"_noop-middleware.mjs","/node_modules/astro/dist/assets/endpoint/generic.js":"chunks/pages/generic_BORM1WIP.mjs","/src/pages/projects.astro":"chunks/pages/projects_CLXdppH9.mjs","/src/pages/rss.xml.ts":"chunks/pages/rss_BvmqFITl.mjs","\u0000@astrojs-manifest":"manifest_I6ylFV7o.mjs","\u0000@astro-page:node_modules/astro/dist/assets/endpoint/generic@_@js":"chunks/generic_DXQSkwFk.mjs","\u0000@astro-page:src/pages/404@_@astro":"chunks/404_CykZM-nj.mjs","\u0000@astro-page:src/pages/about@_@astro":"chunks/about_D00_LJKs.mjs","\u0000@astro-page:src/pages/contact@_@astro":"chunks/contact_D7NiZGMe.mjs","\u0000@astro-page:src/pages/projects@_@astro":"chunks/projects_CiAn13x5.mjs","\u0000@astro-page:src/pages/rss.xml@_@ts":"chunks/rss_Dhm8Nt6D.mjs","\u0000@astro-page:src/pages/[...blog]/[category]/[...page]@_@astro":"chunks/_.._DTiVSD8G.mjs","\u0000@astro-page:src/pages/[...blog]/[tag]/[...page]@_@astro":"chunks/_.._D_wXSOz8.mjs","\u0000@astro-page:src/pages/[...blog]/[...page]@_@astro":"chunks/_.._DCr1JGrN.mjs","\u0000@astro-page:src/pages/index@_@astro":"chunks/index_C8RoUl2l.mjs","\u0000@astro-page:src/pages/[...blog]/index@_@astro":"chunks/index_DgkCHX58.mjs","/home/themanyface/Projects/personal_website/mywebsite/furkaneyazici2/src/assets/images/icons/patreon.png":"chunks/patreon_Bo0KQA5b.mjs","/home/themanyface/Projects/personal_website/mywebsite/furkaneyazici2/src/assets/images/icons/patreon.svg":"chunks/patreon_dLW1SFkL.mjs","/home/themanyface/Projects/personal_website/mywebsite/furkaneyazici2/src/assets/images/me.png":"chunks/me_DGdkgyfR.mjs","/home/themanyface/Projects/personal_website/mywebsite/furkaneyazici2/src/content/post/HelloandWelcome.md?astroContentCollectionEntry=true":"chunks/HelloandWelcome_c951gCHZ.mjs","/home/themanyface/Projects/personal_website/mywebsite/furkaneyazici2/src/content/post/HelloandWelcome.md?astroPropagatedAssets":"chunks/HelloandWelcome_Db40e-ZE.mjs","/home/themanyface/Projects/personal_website/mywebsite/furkaneyazici2/src/content/post/HelloandWelcome.md":"chunks/HelloandWelcome_9lB5sWk6.mjs","@astrojs/preact/client.js":"_astro/client.Bwd9BFQS.js","/home/themanyface/Projects/personal_website/mywebsite/furkaneyazici2/node_modules/@preact/signals/dist/signals.module.js":"_astro/signals.module.Cgq9k_Df.js","/astro/hoisted.js?q=0":"_astro/hoisted.D9HCc-z0.js","astro:scripts/before-hydration.js":""},"inlinedScripts":[],"assets":["/_astro/logo.Bkwyawx_.ico","/_astro/patreon.BZLyOYfZ.png","/_astro/patreon.Dmhom81c.svg","/_astro/logo.BK6U1qto.png","/_astro/inter-cyrillic-ext-wght-normal.DIEz8p5i.woff2","/_astro/inter-cyrillic-wght-normal.BmJJXa8e.woff2","/_astro/inter-greek-ext-wght-normal.D5AYLNiq.woff2","/_astro/inter-greek-wght-normal.DyIDNIyN.woff2","/_astro/inter-latin-wght-normal.BgVq2Tq4.woff2","/_astro/inter-latin-ext-wght-normal.CN1pIXkb.woff2","/_astro/inter-vietnamese-wght-normal._GQuwPVU.woff2","/_astro/me.B2ic110j.png","/_astro/logo.CyHlYT-2.svg","/_astro/_page_.BXIG5uYx.css","/_headers","/robots.txt","/_astro/client.Bwd9BFQS.js","/_astro/client.EMyOD0P7.js","/_astro/hoisted.D9HCc-z0.js","/_astro/signals.module.Cgq9k_Df.js","/decapcms/config.yml","/decapcms/index.html"],"buildFormat":"directory"});

export { AstroIntegrationLogger as A, Logger as L, getEventPrefix as g, levels as l, manifest };
