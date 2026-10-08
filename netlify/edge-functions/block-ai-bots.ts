// Enforcement layer for robots.txt's AI-training policy, plus two checks for
// crawlers that don't say who they are. Runs on Netlify's edge, before the
// request reaches the site.
//
// 1. Declared AI *training* crawlers (list below) get a 403.
// 2. Trap: every page carries a hidden, nofollow link to TRAP_PATH, which
//    robots.txt disallows for everyone. People never see it and well-behaved
//    crawlers never fetch it, so whoever does has ignored robots.txt: the hit
//    is kept as evidence (Netlify Blobs, store "bot-guard", keys trap/<date>/…)
//    and that IP gets a 403 on pages for BAN_HOURS.
// 3. Browser check: a request that claims to be a browser but lacks headers
//    every current browser sends (Accept-Language, Sec-Fetch-*, Chromium's
//    client hints) is likely a script with a borrowed user-agent. For now this
//    is only logged (Netlify → Logs → Edge Functions, "suspect" lines) so false
//    positives can be judged first; HEURISTICS = 'block' turns it on.
//
// Deliberately NOT blocked (they cite and link back — that's visibility):
//   OAI-SearchBot, ChatGPT-User, Claude-SearchBot, Claude-User,
//   PerplexityBot, YouBot, regular search engines.
//
// Everything here fails open: if Blobs is unreachable or a check throws, the
// page is served as usual.

import { getStore } from '@netlify/blobs';

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

/** Disallowed in robots.txt and linked, hidden, from every page (Footer.astro) */
export const TRAP_PATH = '/internal/archive/';
export const BAN_HOURS = 24;
/** 'log' records suspects only; 'block' answers 403 from BLOCK_SCORE reasons up */
const HEURISTICS = 'log' as 'log' | 'block';
const BLOCK_SCORE = 2;

// Fetchers that legitimately request pages without a browser's headers: search
// engines, answer engines, link previews, feed readers, uptime checks
const KNOWN_FETCHERS =
  /googlebot|google-inspectiontool|bingbot|duckduckbot|applebot|yandex|baiduspider|petalbot|oai-searchbot|chatgpt-user|perplexity|claude-searchbot|claude-user|youbot|facebookexternalhit|meta-externalfetcher|twitterbot|linkedinbot|slackbot|discordbot|telegrambot|whatsapp|mastodon|bluesky|pinterest|redditbot|embedly|skypeuripreview|feed|rss|inoreader|newsblur|netnewswire|miniflux|uptime|pingdom|lighthouse/;

export const isBlockedCrawler = (ua: string) => BLOCKED_UA_PATTERNS.some((pattern) => ua.includes(pattern));

/** A page, not a file: "/about/", "/" — what a browser navigates to */
export const isPage = (path: string) => path.endsWith('/') || !/\.[a-z0-9]+$/i.test(path);

/** Reasons a request doesn't look like the browser its user-agent claims (lower-case ua) */
export function browserMismatch(headers: Headers, ua: string): string[] {
  if (KNOWN_FETCHERS.test(ua)) return [];
  if (!ua) return ['no user-agent'];
  if (!ua.startsWith('mozilla/5.0')) return ['non-browser user-agent'];
  const reasons: string[] = [];
  if (!headers.get('accept-language')) reasons.push('no accept-language');
  if (!headers.get('sec-fetch-mode')) reasons.push('no sec-fetch headers');
  // Chrome, Edge, Opera, Brave, Samsung Internet send client hints on HTTPS
  if (ua.includes('chrome/') && !ua.includes('firefox/') && !headers.get('sec-ch-ua')) {
    reasons.push('chromium without client hints');
  }
  return reasons;
}

/** Bans are stored under a hash of the IP, not the IP itself */
export async function banKey(ip: string) {
  const digest = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(ip));
  return `ban/${[...new Uint8Array(digest)].map((b) => b.toString(16).padStart(2, '0')).join('')}`;
}

const forbidden = (message: string) =>
  new Response(`403 Forbidden — ${message}`, {
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

// Ban lookups are cached per edge isolate for a minute, so most page views
// don't touch Blobs at all
const banCache = new Map<string, { banned: boolean; until: number }>();
const CACHE_MS = 60_000;

async function isBanned(ip: string) {
  const cached = banCache.get(ip);
  if (cached && cached.until > Date.now()) return cached.banned;
  let banned = false;
  try {
    const entry = (await getStore('bot-guard').get(await banKey(ip), { type: 'json' })) as { until?: number } | null;
    banned = !!entry?.until && entry.until > Date.now();
  } catch {
    // Blobs unavailable: serve the page
  }
  if (banCache.size > 5000) banCache.clear();
  banCache.set(ip, { banned, until: Date.now() + CACHE_MS });
  return banned;
}

async function recordTrap(request: Request, ip: string, ua: string, country?: string) {
  const now = new Date();
  const hit = {
    time: now.toISOString(),
    ip,
    country,
    userAgent: ua,
    path: new URL(request.url).pathname,
    referer: request.headers.get('referer'),
    acceptLanguage: request.headers.get('accept-language'),
  };
  console.log(JSON.stringify({ event: 'trap', ...hit }));
  const until = now.getTime() + BAN_HOURS * 3_600_000;
  // In memory first, so this isolate blocks the IP even if Blobs can't be written
  banCache.set(ip, { banned: true, until });
  try {
    const store = getStore('bot-guard');
    await Promise.all([
      store.setJSON(await banKey(ip), { until, reason: 'trap' }),
      store.setJSON(`trap/${hit.time.slice(0, 10)}/${now.getTime()}-${crypto.randomUUID().slice(0, 8)}`, hit),
    ]);
  } catch {
    // Not stored; the log line above still has it
  }
}

interface EdgeContext {
  next: () => Promise<Response>;
  ip?: string;
  geo?: { country?: { code?: string } };
}

export default async (request: Request, context: EdgeContext) => {
  const ua = (request.headers.get('user-agent') || '').toLowerCase();
  const ip = context.ip || '';

  if (isBlockedCrawler(ua)) return forbidden('AI training crawlers are not permitted on this site.');

  try {
    const { pathname } = new URL(request.url);

    if (pathname === TRAP_PATH || pathname === TRAP_PATH.slice(0, -1)) {
      if (ip) await recordTrap(request, ip, ua, context.geo?.country?.code);
      return forbidden('this path is disallowed in robots.txt.');
    }

    if (ip && (await isBanned(ip))) {
      return forbidden(`this address ignored robots.txt and is blocked for ${BAN_HOURS} hours.`);
    }

    if (request.method === 'GET' && isPage(pathname)) {
      const reasons = browserMismatch(request.headers, ua);
      if (reasons.length > 0) {
        console.log(JSON.stringify({ event: 'suspect', ip, ua, path: pathname, reasons }));
        if (HEURISTICS === 'block' && reasons.length >= BLOCK_SCORE) {
          return forbidden('automated requests are not permitted on this site.');
        }
      }
    }
  } catch {
    // Any failure in the checks: serve the page
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
    '/figures/*', // PlotlyChart data
    '/videos/*', // Animation files
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
