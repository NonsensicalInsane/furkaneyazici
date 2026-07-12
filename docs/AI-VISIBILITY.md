# AI crawlers & visibility — strategy and setup

The problem: AI training crawlers take content without sending readers back
(Cloudflare's 2025 data: Google refers 1 visitor per 14 crawls; OpenAI 1 per
1,700; Anthropic 1 per 73,000). Total blocking is impossible — anything a
browser renders, a headless scraper reads — so the strategy is layered:
**raise the cost of taking, and capture the value when it happens anyway.**

## What is already in place (this repo)

| Layer | What | Where |
|---|---|---|
| Policy | Training bots disallowed, citing search bots welcomed | `public/robots.txt` |
| Enforcement | 403 for known training-bot user agents at the edge | `netlify/edge-functions/block-ai-bots.ts` |
| Signals | `noai, noimageai` meta + `X-Robots-Tag` header | `Layout.astro`, `netlify.toml` |
| Attribution | Long copied selections carry source + license | `SinglePost.astro` |
| Citability | Person + BlogPosting JSON-LD, `sameAs` identity graph, hreflang | `index.astro`, `SinglePost.astro` |

The deliberate policy split: **block trainers, welcome citers.** OAI-SearchBot,
Claude-SearchBot, PerplexityBot etc. link back to the site — that's the new
search traffic. GPTBot, CCBot, ClaudeBot, Bytespider etc. only take.

## Step 1 — Put Cloudflare in front (only you can do this, ~20 min)

UA-based blocking stops honest bots only. Cloudflare fingerprints and blocks
the dishonest ones network-wide, and is free.

1. Create a free account at [dash.cloudflare.com](https://dash.cloudflare.com)
   → **Add a site** → `furkaneyazici.com` → Free plan.
2. Cloudflare scans existing DNS records and shows the two nameservers to use.
   Verify the imported records match what your registrar currently has
   (the A/CNAME records pointing at Netlify).
3. At your **domain registrar** (wherever furkaneyazici.com was bought),
   replace the nameservers with the two Cloudflare gave you. Propagation:
   minutes to a few hours. The site keeps working throughout — Netlify serves
   it the whole time; only the DNS route changes.
4. In Cloudflare, make sure the DNS records for the site have the **orange
   cloud (proxied)** enabled — that's what puts Cloudflare in the path.
5. **SSL/TLS → Full (strict)** (Netlify has its own cert, so strict works).
6. **AI Crawl Control** (formerly "AI Audit" / Bots section):
   - Enable **Block AI training crawlers**. Keep AI *search* crawlers allowed,
     matching robots.txt policy.
   - Optional: enable **AI Labyrinth** (feeds misbehaving crawlers generated
     decoy pages instead of your content).
7. Check Netlify still deploys fine (it will — Netlify doesn't care about DNS
   as long as the records point at it).

Later, when Cloudflare's **Pay Per Crawl / Pay Per Use** marketplace opens up
for small publishers, you can flip blocked crawlers to "charge" instead.

## Step 2 — Writing habits that survive summarization

An LLM summary strips explanations but keeps named entities and artifacts:

- **Write in first person** ("in my experiments…", "when I trained…") —
  summaries tend to keep the subject; encyclopedic prose gets absorbed
  anonymously.
- **Anchor posts to artifacts that live on your domains**: your measurement
  results, your GitHub repos, your interactive demos, your illustrations.
  A summary of "his results + his figures" is an advertisement, not a
  replacement.
- **Sign your illustrations** — a small visible signature/watermark in the
  corner of every figure you draw. Your art is the most theft-resistant
  asset you have; make sure it carries your name wherever it's pasted.

## Step 3 — Channels no LLM can intercept

- **Email list** (Substack, free tier): every post also goes out as a
  newsletter issue. The list is portable and yours; nothing can sit between
  you and a subscriber's inbox.
- Cross-post to Medium/dev.to **with canonical links**, share on LinkedIn/X —
  see the platform strategy discussion for the full hub-and-spoke setup.

## Verifying the edge function after deploy

```bash
# Should return 403:
curl -si -A "GPTBot/1.0" https://furkaneyazici.com/ | head -1
curl -si -A "Bytespider" https://furkaneyazici.com/ | head -1

# Should return 200 (citing bots and humans are welcome):
curl -si -A "OAI-SearchBot/1.0" https://furkaneyazici.com/ | head -1
curl -si -A "Mozilla/5.0" https://furkaneyazici.com/ | head -1
```
