// Interface text that scripts write into a post (toasts, button labels,
// "3 min left"), in the post's language. SinglePost.astro puts it on the page
// as a JSON block from src/i18n/ui.ts; outside a post the English fallback
// given at the call is used.
let strings;

export function uiText(key, fallback) {
  if (strings === undefined) {
    try {
      strings = JSON.parse(document.getElementById('post-ui-strings')?.textContent || '{}');
    } catch {
      strings = {};
    }
  }
  return strings[key] ?? fallback;
}
