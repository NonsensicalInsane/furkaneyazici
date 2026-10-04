// Enforcement layer for robots.txt's AI-training policy.
//
// robots.txt is only a request — this edge function actually refuses (403)
// crawlers that identify as AI *training* bots, including the ones known to
// crawl regardless of robots.txt. It runs on Netlify's edge, before the
// request ever reaches the site.
//
// Deliberately NOT blocked (they cite and link back — that's visibility):
//   OAI-SearchBot, ChatGPT-User, Claude-SearchBot, Claude-User,
//   PerplexityBot, YouBot, regular search engines.
//
// Note: a scraper that fakes a browser user-agent slips through any
// UA-based check — full fingerprint-level blocking needs Cloudflare in
// front (see docs/AI-VISIBILITY.md — kept locally, not in the repo).

const BLOCKED_UA_PATTERNS = [
  // OpenAI / Common Crawl training
  'gptbot',
  'ccbot',
  // Anthropic training
  'claudebot',
  'anthropic-ai',
  // Meta training
  'meta-externalagent',
  'facebookbot',
  // Amazon (models/Alexa) and Google Vertex AI (crawls for enterprise AI agents)
  'amazonbot',
  'google-cloudvertexbot',
  // ByteDance — notorious for ignoring robots.txt
  'bytespider',
  // Data brokers & scrapers feeding training sets
  'diffbot',
  'omgilibot',
  'omgili',
  'webzio',
  'imagesiftbot',
  'cohere-ai',
  'cohere-training-data-crawler',
  'ai2bot',
  'timpibot',
  'pangubot',
];

export default async (request: Request, context: { next: () => Promise<Response> }) => {
  const ua = (request.headers.get('user-agent') || '').toLowerCase();

  if (BLOCKED_UA_PATTERNS.some((pattern) => ua.includes(pattern))) {
    return new Response('403 Forbidden — AI training crawlers are not permitted on this site.', {
      status: 403,
      // netlify.toml headers don't apply to responses generated here
      headers: {
        'content-type': 'text/plain; charset=utf-8',
        'x-content-type-options': 'nosniff',
        'content-security-policy': "default-src 'none'; frame-ancestors 'none'",
        'x-robots-tag': 'noai, noimageai',
        'tdm-reservation': '1',
      },
    });
  }

  return context.next();
};

export const config = {
  path: '/*',
  // Per-IP rate limit (a Netlify code-based rule; the free plan allows 2 per
  // project). 120 requests a minute is far above human browsing, hover
  // prefetching included, but slows bulk scraping and form flooding; over the
  // limit Netlify answers 429. It covers what this function runs on: pages
  // and form POSTs, not the static assets excluded below.
  rateLimit: {
    windowLimit: 120,
    windowSize: 60,
    aggregateBy: ['ip', 'domain'],
  },
  // Static assets are skipped: bots want the HTML, and this keeps the
  // edge-invocation count (free-tier quota) low.
  excludedPath: [
    '/robots.txt', // the policy itself stays readable by everyone
    '/_astro/*',
    '/assets/*',
    '/*.css',
    '/*.js',
    '/*.png',
    '/*.jpg',
    '/*.jpeg',
    '/*.webp',
    '/*.svg',
    '/*.ico',
    '/*.woff',
    '/*.woff2',
  ],
};
