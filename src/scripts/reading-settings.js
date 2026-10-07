// Reader's text size on blog posts (components/blog/ReadingSettings.astro).
// The choice is a multiple of the default size, kept in --reading-scale on
// <html> (which .post-body multiplies its font size by) and in localStorage,
// so it carries over to every post. A small head script (utils/reading-settings.ts)
// applies a saved choice before the first paint, so the text doesn't jump.
// A bundled module rather than an inline script, so the hash-based CSP covers it.

/** The sizes on offer, as multiples of the default; 1 is the default */
export const READING_SCALES = [0.8, 0.9, 1, 1.1, 1.2, 1.3];
export const READING_SCALE_KEY = 'reading-scale';

export function initReadingSettings() {
  const panel = document.getElementById('reading-settings-panel');
  const toggle = document.querySelector('[popovertarget="reading-settings-panel"]');
  if (!panel || !toggle) return;
  const output = panel.querySelector('[data-reading-value]');
  const smaller = panel.querySelector('[data-reading-step="-1"]');
  const larger = panel.querySelector('[data-reading-step="1"]');
  const reset = panel.querySelector('[data-reading-reset]');
  const root = document.documentElement;

  let index = READING_SCALES.indexOf(parseFloat(root.style.getPropertyValue('--reading-scale')) || 1);
  if (index < 0) index = READING_SCALES.indexOf(1);

  function render() {
    const scale = READING_SCALES[index];
    output.textContent = `${Math.round(scale * 100)}%`;
    smaller.disabled = index === 0;
    larger.disabled = index === READING_SCALES.length - 1;
    reset.disabled = scale === 1;
  }

  function choose(newIndex) {
    index = Math.max(0, Math.min(READING_SCALES.length - 1, newIndex));
    const scale = READING_SCALES[index];
    if (scale === 1) root.style.removeProperty('--reading-scale');
    else root.style.setProperty('--reading-scale', String(scale));
    try {
      if (scale === 1) localStorage.removeItem(READING_SCALE_KEY);
      else localStorage.setItem(READING_SCALE_KEY, String(scale));
    } catch {
      // Storage blocked (private mode, site data off): the size still applies to this page
    }
    render();
  }

  smaller.addEventListener('click', () => choose(index - 1));
  larger.addEventListener('click', () => choose(index + 1));
  reset.addEventListener('click', () => choose(READING_SCALES.indexOf(1)));
  render();

  // The panel opens in the top layer; keep it under the button and inside the
  // viewport, and close it once the button scrolls out of sight. (Changing the
  // size can nudge the scroll position, so scrolling alone doesn't close it.)
  function place() {
    const rect = toggle.getBoundingClientRect();
    if (rect.bottom < 0 || rect.top > window.innerHeight) {
      panel.hidePopover();
      return;
    }
    const width = parseFloat(getComputedStyle(panel).width) || 256;
    panel.style.top = `${rect.bottom + 8}px`;
    // Right edges aligned, nudged back in if that runs off either side
    panel.style.left = `${Math.max(8, Math.min(rect.right - width, window.innerWidth - width - 8))}px`;
  }
  panel.addEventListener('beforetoggle', (event) => {
    if (event.newState === 'open') place();
  });
  const follow = () => {
    if (panel.matches(':popover-open')) place();
  };
  window.addEventListener('scroll', follow, { passive: true });
  window.addEventListener('resize', follow);
}
