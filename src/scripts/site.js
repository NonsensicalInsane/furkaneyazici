// Site-wide behaviour shared by every page: header (mobile menu, theme toggle,
// sticky styling), scroll reveal, card spotlight and count-up numbers.
// Loaded by components/common/BasicScripts.astro as a bundled module, so the
// hash-based CSP covers it (inline scripts would need per-page hashes).

// Mobile menu. One place opens/closes it, and the toggle button reports the
// state through aria-expanded so screen readers know whether it's open.
function setMenuOpen(open) {
  const toggle = document.querySelector('[data-aw-toggle-menu]');
  const header = document.getElementById('header');
  toggle?.classList.toggle('expanded', open);
  toggle?.setAttribute('aria-expanded', String(open));
  document.body.classList.toggle('overflow-hidden', open);
  header?.classList.toggle('h-screen', open);
  header?.classList.toggle('expanded', open);
  header?.classList.toggle('bg-page', open);
  document.querySelector('#header nav')?.classList.toggle('hidden', !open);
  document.querySelector('#header > div > div:last-child')?.classList.toggle('hidden', !open);
}

function initHeader() {
  // Sticky-header styling on scroll
  let ticking = false;
  const applyHeaderStylesOnScroll = () => {
    ticking = false;
    document.querySelector('#header[data-aw-sticky-header]')?.classList.toggle('scroll', window.scrollY > 60);
  };
  document.addEventListener(
    'scroll',
    () => {
      if (ticking) return;
      ticking = true;
      window.requestAnimationFrame(applyHeaderStylesOnScroll);
    },
    { passive: true }
  );
  applyHeaderStylesOnScroll();

  // Leaving the mobile breakpoint closes the menu
  window.matchMedia('(max-width: 767px)').addEventListener('change', () => setMenuOpen(false));

  document.querySelector('#header nav')?.addEventListener('click', () => setMenuOpen(false));
  document.addEventListener('keydown', (event) => {
    const toggle = document.querySelector('[data-aw-toggle-menu]');
    if (event.key !== 'Escape' || !toggle?.classList.contains('expanded')) return;
    setMenuOpen(false);
    toggle.focus();
  });
  document.querySelectorAll('[data-aw-toggle-menu]').forEach((button) => {
    button.addEventListener('click', () => setMenuOpen(!button.classList.contains('expanded')));
  });

  // The toggle is only rendered when the theme isn't fixed (see ToggleTheme.astro)
  document.querySelectorAll('[data-aw-toggle-color-scheme]').forEach((button) => {
    button.addEventListener('click', () => {
      document.documentElement.classList.toggle('dark');
      localStorage.theme = document.documentElement.classList.contains('dark') ? 'dark' : 'light';
    });
  });

  // Fires on the first load and when the page comes back from the
  // back/forward cache, where a menu left open would otherwise stay open.
  window.addEventListener('pageshow', () => {
    document.documentElement.classList.add('motion-safe:scroll-smooth');
    setMenuOpen(false);
  });
}

// Reveal .scroll-reveal elements as they enter the viewport. IntersectionObserver
// based (no scroll polling); everything shows at once for reduced motion.
function initScrollReveal() {
  const elements = document.querySelectorAll('.scroll-reveal:not(.revealed)');
  if (!elements.length) return;

  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches || !('IntersectionObserver' in window)) {
    elements.forEach((el) => el.classList.add('revealed'));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          observer.unobserve(entry.target);
        }
      });
    },
    { rootMargin: '0px 0px -80px 0px', threshold: 0.1 }
  );
  elements.forEach((el) => observer.observe(el));
}

// Spotlight hover: track the cursor inside cards via CSS variables.
// One delegated listener for the whole document — no per-card handlers.
function initSpotlight() {
  document.addEventListener(
    'pointermove',
    (e) => {
      const card = e.target instanceof Element && e.target.closest('.project-card, .modern-card');
      if (!card) return;
      const rect = card.getBoundingClientRect();
      card.style.setProperty('--mx', `${e.clientX - rect.left}px`);
      card.style.setProperty('--my', `${e.clientY - rect.top}px`);
    },
    { passive: true }
  );
}

// Count-up: numbers in [data-countup] elements count from 0 when they enter
// the viewport (once, ~1s). Non-numeric suffixes like "+" are kept.
function animateCount(el) {
  const match = el.textContent.trim().match(/^(\d+)(.*)$/);
  if (!match) return;
  const target = parseInt(match[1], 10);
  const suffix = match[2] || '';
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches || target === 0) return; // leave as-is

  const duration = 1000;
  const start = performance.now();
  const tick = (now) => {
    const t = Math.min((now - start) / duration, 1);
    const eased = 1 - Math.pow(1 - t, 3); // ease-out cubic
    el.textContent = Math.round(eased * target) + suffix;
    if (t < 1) requestAnimationFrame(tick);
  };
  el.textContent = '0' + suffix;
  requestAnimationFrame(tick);
}

function initCountUp() {
  const elements = document.querySelectorAll('[data-countup]');
  if (!elements.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          animateCount(entry.target);
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.5 }
  );
  elements.forEach((el) => observer.observe(el));
}

export function initSite() {
  initHeader();
  initScrollReveal();
  initSpotlight();
  initCountUp();
}
