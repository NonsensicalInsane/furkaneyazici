// Vite plugin for `astro dev`, used in astro.config.mjs.
// Dev only: mirror Netlify, which redirects /about to /about/ (trailingSlash
// "always"); Astro's dev server would answer 404. Vite's own module requests
// (/@vite, /src/…), Astro internals (/_image…) and files with an extension
// are left alone.
export const devTrailingSlashRedirect = {
  name: "dev-trailing-slash-redirect",
  apply: "serve",
  configureServer(server) {
    server.middlewares.use((req, res, next) => {
      const url = new URL(req.url, "http://localhost");
      // A path like "//evil.org/x" (from "/.//evil.org/x") would become the
      // protocol-relative Location "//evil.org/x/": an open redirect. Leave
      // those to the dev server.
      const path = url.pathname;
      const isPage =
        !path.startsWith("//") &&
        !path.endsWith("/") &&
        !/\.[a-z0-9]+$/i.test(path) &&
        !/^\/(@|_|\.|src\/|node_modules\/)/.test(path);
      if ((req.method === "GET" || req.method === "HEAD") && isPage) {
        res.statusCode = 301;
        res.setHeader("Location", `${path}/${url.search}`);
        res.end();
        return;
      }
      next();
    });
  },
};
