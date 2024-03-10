import { renderers } from './renderers.mjs';
import { manifest } from './manifest_CC2wPB1n.mjs';
import * as serverEntrypointModule from '@astrojs/netlify/ssr-function.js';
import { onRequest } from './_noop-middleware.mjs';

const _page0 = () => import('./chunks/generic_5w0AKXKo.mjs');
const _page1 = () => import('./chunks/404_7emqiwtg.mjs');
const _page2 = () => import('./chunks/about_Br5fNsIu.mjs');
const _page3 = () => import('./chunks/contact_DFOvkpgr.mjs');
const _page4 = () => import('./chunks/projects_DqUrbfkk.mjs');
const _page5 = () => import('./chunks/rss_irDAfyNj.mjs');
const _page6 = () => import('./chunks/_.._ComEh9DK.mjs');
const _page7 = () => import('./chunks/_.._r4tTJR-T.mjs');
const _page8 = () => import('./chunks/_.._Bimbzmuf.mjs');
const _page9 = () => import('./chunks/index_CzVV5fcL.mjs');
const _page10 = () => import('./chunks/index_BphxKQFI.mjs');
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
    "middlewareSecret": "ca6ffb2e-165b-4598-af21-128c5bae951d"
};
const _exports = serverEntrypointModule.createExports(_manifest, _args);
const __astrojsSsrVirtualEntry = _exports.default;
const _start = 'start';
if (_start in serverEntrypointModule) {
	serverEntrypointModule[_start](_manifest, _args);
}

export { __astrojsSsrVirtualEntry as default, pageMap };
