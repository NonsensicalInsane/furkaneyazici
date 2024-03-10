import { renderers } from './renderers.mjs';
import { manifest } from './manifest_BEwNgZYi.mjs';
import * as serverEntrypointModule from '@astrojs/netlify/ssr-function.js';
import { onRequest } from './_noop-middleware.mjs';

const _page0 = () => import('./chunks/generic_CPzO_OX8.mjs');
const _page1 = () => import('./chunks/404_B_fjYBF_.mjs');
const _page2 = () => import('./chunks/about_Dm_wvKqB.mjs');
const _page3 = () => import('./chunks/contact_Dhc57NgA.mjs');
const _page4 = () => import('./chunks/projects_thL-dFzC.mjs');
const _page5 = () => import('./chunks/rss_74QtBCiG.mjs');
const _page6 = () => import('./chunks/_.._CsZO6Xcr.mjs');
const _page7 = () => import('./chunks/_.._DRBy8HvN.mjs');
const _page8 = () => import('./chunks/_.._DrI5Zr6b.mjs');
const _page9 = () => import('./chunks/index_CgS2u4P1.mjs');
const _page10 = () => import('./chunks/index_DisJegI8.mjs');
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
    "middlewareSecret": "7994fd4e-f8ec-4137-af38-9771f77fdfd8"
};
const _exports = serverEntrypointModule.createExports(_manifest, _args);
const __astrojsSsrVirtualEntry = _exports.default;
const _start = 'start';
if (_start in serverEntrypointModule) {
	serverEntrypointModule[_start](_manifest, _args);
}

export { __astrojsSsrVirtualEntry as default, pageMap };
