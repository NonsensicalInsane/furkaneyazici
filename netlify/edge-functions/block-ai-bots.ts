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
      headers: { 'content-type': 'text/plain', 'x-robots-tag': 'noai, noimageai' },
    });
  }

  return context.next();
};

export const config = {
  path: '/*',
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
