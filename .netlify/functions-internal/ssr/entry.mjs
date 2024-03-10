import { renderers } from './renderers.mjs';
import { manifest } from './manifest_C7otSBGf.mjs';
import * as serverEntrypointModule from '@astrojs/netlify/ssr-function.js';
import { onRequest } from './_noop-middleware.mjs';

const _page0 = () => import('./chunks/generic_BeaDiffT.mjs');
const _page1 = () => import('./chunks/404_D3KdtMnt.mjs');
const _page2 = () => import('./chunks/about_DWLFn1lW.mjs');
const _page3 = () => import('./chunks/contact_DQ2X1kN9.mjs');
const _page4 = () => import('./chunks/projects_BvTmZWnu.mjs');
const _page5 = () => import('./chunks/rss_rTVnXAhL.mjs');
const _page6 = () => import('./chunks/_.._4VNDMaMS.mjs');
const _page7 = () => import('./chunks/_.._D7FScwF5.mjs');
const _page8 = () => import('./chunks/_.._CJKYJPGl.mjs');
const _page9 = () => import('./chunks/index_Cvzqznov.mjs');
const _page10 = () => import('./chunks/index_DblYojOf.mjs');
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
    "middlewareSecret": "69ed80d5-e33b-4c4b-8ffd-4045f993deae"
};
const _exports = serverEntrypointModule.createExports(_manifest, _args);
const __astrojsSsrVirtualEntry = _exports.default;
const _start = 'start';
if (_start in serverEntrypointModule) {
	serverEntrypointModule[_start](_manifest, _args);
}

export { __astrojsSsrVirtualEntry as default, pageMap };
