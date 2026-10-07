import { createHash } from 'node:crypto';
import { READING_SCALES, READING_SCALE_KEY } from '../scripts/reading-settings.js';

// Applies the reader's saved text size (scripts/reading-settings.js) before the
// first paint. It has to run inline in <head>, so its hash is added to the page's
// CSP (Astro doesn't hash is:inline scripts); validated, so a tampered value
// can't inject CSS.
const [min, max] = [Math.min(...READING_SCALES), Math.max(...READING_SCALES)];

export const readingScaleHeadScript =
  `try{var s=parseFloat(localStorage.getItem(${JSON.stringify(READING_SCALE_KEY)}));` +
  `if(s>=${min}&&s<=${max})document.documentElement.style.setProperty('--reading-scale',String(s))}catch(e){}`;

export const readingScaleHeadScriptHash =
  `sha256-${createHash('sha256').update(readingScaleHeadScript).digest('base64')}` as const;
