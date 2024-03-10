import { renderers } from './renderers.mjs';
import { manifest } from './manifest_CDdlPaiO.mjs';
import * as serverEntrypointModule from '@astrojs/netlify/ssr-function.js';
import { onRequest } from './_noop-middleware.mjs';

const _page0 = () => import('./chunks/generic_CdokJGtw.mjs');
const _page1 = () => import('./chunks/404_owsD6q43.mjs');
const _page2 = () => import('./chunks/about_r7fcdwuZ.mjs');
const _page3 = () => import('./chunks/contact_-5q7i0aP.mjs');
const _page4 = () => import('./chunks/projects_BS8e1w_z.mjs');
const _page5 = () => import('./chunks/rss_ClIiBBTl.mjs');
const _page6 = () => import('./chunks/_.._CK6_jqw7.mjs');
const _page7 = () => import('./chunks/_.._Dp7Tujad.mjs');
const _page8 = () => import('./chunks/_.._DIP1tj1l.mjs');
const _page9 = () => import('./chunks/index_XcPDlaaD.mjs');
const _page10 = () => import('./chunks/index_C0VKnrQv.mjs');
const pageMap = new Map([
    ["node_modules/astro/dist/assets/endpoint/generic.js", _page0],
    ["src/pages/404.astro", _page1],
    ["src/pages/about.astro", _page2],
    ["src/pages/contact.astro", _page3],
    ["src/pages/projects.astro", _page4],
    ["src/pages/rss.xml.ts", _page5],
    ["src/pages/[...blog]/[category]/[...page].astro", _page6],
    ["src/pages/[...blog]/[tag]/[...page].astro", _page7],
    ["src/pages/[...blog]/[...page].astro", _page8],
    ["src/pages/index.astro", _page9],
    ["src/pages/[...blog]/index.astro", _page10]
]);

const _manifest = Object.assign(manifest, {
    pageMap,
    renderers,
    middleware: onRequest
});
const _args = {
    "middlewareSecret": "d5a9dd91-d119-4ebb-9a8a-bcfc3f94aed4"
};
const _exports = serverEntrypointModule.createExports(_manifest, _args);
const __astrojsSsrVirtualEntry = _exports.default;
const _start = 'start';
if (_start in serverEntrypointModule) {
	serverEntrypointModule[_start](_manifest, _args);
}

export { __astrojsSsrVirtualEntry as default, pageMap };
