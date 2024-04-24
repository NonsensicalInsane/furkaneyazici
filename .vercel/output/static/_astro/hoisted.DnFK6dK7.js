const Z = 'astro:before-preparation',
  ee = 'astro:after-preparation',
  te = 'astro:before-swap',
  ne = 'astro:after-swap',
  oe = (e) => document.dispatchEvent(new Event(e));
class C extends Event {
  from;
  to;
  direction;
  navigationType;
  sourceElement;
  info;
  newDocument;
  constructor(t, n, o, r, a, u, d, s, m) {
    super(t, n),
      (this.from = o),
      (this.to = r),
      (this.direction = a),
      (this.navigationType = u),
      (this.sourceElement = d),
      (this.info = s),
      (this.newDocument = m),
      Object.defineProperties(this, {
        from: { enumerable: !0 },
        to: { enumerable: !0, writable: !0 },
        direction: { enumerable: !0, writable: !0 },
        navigationType: { enumerable: !0 },
        sourceElement: { enumerable: !0 },
        info: { enumerable: !0 },
        newDocument: { enumerable: !0, writable: !0 },
      });
  }
}
class re extends C {
  formData;
  loader;
  constructor(t, n, o, r, a, u, d, s, m) {
    super(Z, { cancelable: !0 }, t, n, o, r, a, u, d),
      (this.formData = s),
      (this.loader = m.bind(this, this)),
      Object.defineProperties(this, { formData: { enumerable: !0 }, loader: { enumerable: !0, writable: !0 } });
  }
}
class se extends C {
  direction;
  viewTransition;
  swap;
  constructor(t, n, o) {
    super(te, void 0, t.from, t.to, t.direction, t.navigationType, t.sourceElement, t.info, t.newDocument),
      (this.direction = t.direction),
      (this.viewTransition = n),
      (this.swap = o.bind(this, this)),
      Object.defineProperties(this, {
        direction: { enumerable: !0 },
        viewTransition: { enumerable: !0 },
        swap: { enumerable: !0, writable: !0 },
      });
  }
}
async function ie(e, t, n, o, r, a, u, d) {
  const s = new re(e, t, n, o, r, a, window.document, u, d);
  return (
    document.dispatchEvent(s) &&
      (await s.loader(), s.defaultPrevented || (oe(ee), s.navigationType !== 'traverse' && k({ scrollX, scrollY }))),
    s
  );
}
async function ae(e, t, n) {
  const o = new se(e, t, n);
  return document.dispatchEvent(o), o.swap(), o;
}
const ce = history.pushState.bind(history),
  S = history.replaceState.bind(history),
  k = (e) => {
    history.state && ((history.scrollRestoration = 'manual'), S({ ...history.state, ...e }, ''));
  },
  I = !!document.startViewTransition,
  O = () => !!document.querySelector('[name="astro-view-transitions-enabled"]'),
  _ = (e, t) => e.pathname === t.pathname && e.search === t.search;
let D,
  y,
  L = !1,
  q;
const U = (e) => document.dispatchEvent(new Event(e)),
  B = () => U('astro:page-load'),
  le = () => {
    let e = document.createElement('div');
    e.setAttribute('aria-live', 'assertive'),
      e.setAttribute('aria-atomic', 'true'),
      (e.className = 'astro-route-announcer'),
      document.body.append(e),
      setTimeout(() => {
        let t = document.title || document.querySelector('h1')?.textContent || location.pathname;
        e.textContent = t;
      }, 60);
  },
  p = 'data-astro-transition-persist',
  V = 'data-astro-transition',
  W = 'data-astro-transition-fallback';
let N,
  E = 0;
history.state
  ? ((E = history.state.index), scrollTo({ left: history.state.scrollX, top: history.state.scrollY }))
  : O() && (S({ index: E, scrollX, scrollY }, ''), (history.scrollRestoration = 'manual'));
async function ue(e, t) {
  try {
    const n = await fetch(e, t),
      r = (n.headers.get('content-type') ?? '').split(';', 1)[0].trim();
    return r !== 'text/html' && r !== 'application/xhtml+xml'
      ? null
      : { html: await n.text(), redirected: n.redirected ? n.url : void 0, mediaType: r };
  } catch {
    return null;
  }
}
function j() {
  const e = document.querySelector('[name="astro-view-transitions-fallback"]');
  return e ? e.getAttribute('content') : 'animate';
}
function fe() {
  let e = Promise.resolve();
  for (const t of Array.from(document.scripts)) {
    if (t.dataset.astroExec === '') continue;
    const n = t.getAttribute('type');
    if (n && n !== 'module' && n !== 'text/javascript') continue;
    const o = document.createElement('script');
    o.innerHTML = t.innerHTML;
    for (const r of t.attributes) {
      if (r.name === 'src') {
        const a = new Promise((u) => {
          o.onload = o.onerror = u;
        });
        e = e.then(() => a);
      }
      o.setAttribute(r.name, r.value);
    }
    (o.dataset.astroExec = ''), t.replaceWith(o);
  }
  return e;
}
const K = (e, t, n, o, r) => {
  const a = _(t, e),
    u = document.title;
  document.title = o;
  let d = !1;
  if (e.href !== location.href && !r)
    if (n.history === 'replace') {
      const s = history.state;
      S({ ...n.state, index: s.index, scrollX: s.scrollX, scrollY: s.scrollY }, '', e.href);
    } else ce({ ...n.state, index: ++E, scrollX: 0, scrollY: 0 }, '', e.href);
  if (((document.title = u), (D = e), a || (scrollTo({ left: 0, top: 0, behavior: 'instant' }), (d = !0)), r))
    scrollTo(r.scrollX, r.scrollY);
  else {
    if (e.hash) {
      history.scrollRestoration = 'auto';
      const s = history.state;
      (location.href = e.href), history.state || (S(s, ''), a && window.dispatchEvent(new PopStateEvent('popstate')));
    } else d || scrollTo({ left: 0, top: 0, behavior: 'instant' });
    history.scrollRestoration = 'manual';
  }
};
function de(e) {
  const t = [];
  for (const n of e.querySelectorAll('head link[rel=stylesheet]'))
    if (
      !document.querySelector(`[${p}="${n.getAttribute(p)}"], link[rel=stylesheet][href="${n.getAttribute('href')}"]`)
    ) {
      const o = document.createElement('link');
      o.setAttribute('rel', 'preload'),
        o.setAttribute('as', 'style'),
        o.setAttribute('href', n.getAttribute('href')),
        t.push(
          new Promise((r) => {
            ['load', 'error'].forEach((a) => o.addEventListener(a, r)), document.head.append(o);
          })
        );
    }
  return t;
}
async function M(e, t, n, o) {
  const r = (i, l) => {
      const h = i.getAttribute(p),
        b = h && l.head.querySelector(`[${p}="${h}"]`);
      if (b) return b;
      if (i.matches('link[rel=stylesheet]')) {
        const T = i.getAttribute('href');
        return l.head.querySelector(`link[rel=stylesheet][href="${T}"]`);
      }
      return null;
    },
    a = () => {
      const i = document.activeElement;
      if (i?.closest(`[${p}]`)) {
        if (i instanceof HTMLInputElement || i instanceof HTMLTextAreaElement) {
          const l = i.selectionStart,
            h = i.selectionEnd;
          return { activeElement: i, start: l, end: h };
        }
        return { activeElement: i };
      } else return { activeElement: null };
    },
    u = ({ activeElement: i, start: l, end: h }) => {
      i &&
        (i.focus(),
        (i instanceof HTMLInputElement || i instanceof HTMLTextAreaElement) &&
          ((i.selectionStart = l), (i.selectionEnd = h)));
    },
    d = (i) => {
      const l = i.dataset.astroTransitionPersistProps;
      return l == null || l === 'false';
    },
    s = (i) => {
      const l = document.documentElement,
        h = [...l.attributes].filter(({ name: c }) => (l.removeAttribute(c), c.startsWith('data-astro-')));
      [...i.newDocument.documentElement.attributes, ...h].forEach(({ name: c, value: f }) => l.setAttribute(c, f));
      for (const c of document.scripts)
        for (const f of i.newDocument.scripts)
          if (
            !f.hasAttribute('data-astro-rerun') &&
            ((!c.src && c.textContent === f.textContent) || (c.src && c.type === f.type && c.src === f.src))
          ) {
            f.dataset.astroExec = '';
            break;
          }
      for (const c of Array.from(document.head.children)) {
        const f = r(c, i.newDocument);
        f ? f.remove() : c.remove();
      }
      document.head.append(...i.newDocument.head.children);
      const b = document.body,
        T = a();
      document.body.replaceWith(i.newDocument.body);
      for (const c of b.querySelectorAll(`[${p}]`)) {
        const f = c.getAttribute(p),
          v = document.querySelector(`[${p}="${f}"]`);
        v &&
          (v.replaceWith(c),
          v.localName === 'astro-island' &&
            d(c) &&
            (c.setAttribute('ssr', ''), c.setAttribute('props', v.getAttribute('props'))));
      }
      u(T);
    };
  async function m(i) {
    function l(c) {
      const f = c.effect;
      return !f || !(f instanceof KeyframeEffect) || !f.target
        ? !1
        : window.getComputedStyle(f.target, f.pseudoElement).animationIterationCount === 'infinite';
    }
    const h = document.getAnimations();
    document.documentElement.setAttribute(W, i);
    const T = document.getAnimations().filter((c) => !h.includes(c) && !l(c));
    return Promise.all(T.map((c) => c.finished));
  }
  if (!L) document.documentElement.setAttribute(V, e.direction), o === 'animate' && (await m('old'));
  else throw new DOMException('Transition was skipped');
  const g = document.title,
    w = await ae(e, y, s);
  K(w.to, w.from, t, g, n), U(ne), o === 'animate' && !L && m('new').then(() => q());
}
async function G(e, t, n, o, r) {
  if (!O() || location.origin !== n.origin) {
    location.href = n.href;
    return;
  }
  const a = r ? 'traverse' : o.history === 'replace' ? 'replace' : 'push';
  if (
    (a !== 'traverse' && k({ scrollX, scrollY }), _(t, n) && ((e !== 'back' && n.hash) || (e === 'back' && t.hash)))
  ) {
    K(n, t, o, document.title, r);
    return;
  }
  const u = await ie(t, n, e, a, o.sourceElement, o.info, o.formData, d);
  if (u.defaultPrevented) {
    location.href = n.href;
    return;
  }
  async function d(s) {
    const m = s.to.href,
      g = {};
    if (s.formData) {
      g.method = 'POST';
      const l =
        s.sourceElement instanceof HTMLFormElement
          ? s.sourceElement
          : s.sourceElement instanceof HTMLElement && 'form' in s.sourceElement
            ? s.sourceElement.form
            : s.sourceElement?.closest('form');
      g.body =
        l?.attributes.getNamedItem('enctype')?.value === 'application/x-www-form-urlencoded'
          ? new URLSearchParams(s.formData)
          : s.formData;
    }
    const w = await ue(m, g);
    if (w === null) {
      s.preventDefault();
      return;
    }
    if (
      (w.redirected && (s.to = new URL(w.redirected)),
      (N ??= new DOMParser()),
      (s.newDocument = N.parseFromString(w.html, w.mediaType)),
      s.newDocument.querySelectorAll('noscript').forEach((l) => l.remove()),
      !s.newDocument.querySelector('[name="astro-view-transitions-enabled"]') && !s.formData)
    ) {
      s.preventDefault();
      return;
    }
    const i = de(s.newDocument);
    i.length && (await Promise.all(i));
  }
  if (((L = !1), I)) y = document.startViewTransition(async () => await M(u, o, r));
  else {
    const s = (async () => {
      await new Promise((m) => setTimeout(m)), await M(u, o, r, j());
    })();
    y = {
      updateCallbackDone: s,
      ready: s,
      finished: new Promise((m) => (q = m)),
      skipTransition: () => {
        L = !0;
      },
    };
  }
  y.ready.then(async () => {
    await fe(), B(), le();
  }),
    y.finished.then(() => {
      document.documentElement.removeAttribute(V), document.documentElement.removeAttribute(W);
    }),
    await y.ready;
}
async function F(e, t) {
  await G('forward', D, new URL(e, location.href), t ?? {});
}
function me(e) {
  if (!O() && e.state) {
    location.reload();
    return;
  }
  if (e.state === null) return;
  const t = history.state,
    n = t.index,
    o = n > E ? 'forward' : 'back';
  (E = n), G(o, D, new URL(location.href), {}, t);
}
const X = () => {
  history.state && (scrollX !== history.state.scrollX || scrollY !== history.state.scrollY) && k({ scrollX, scrollY });
};
{
  if (I || j() !== 'none')
    if (
      ((D = new URL(location.href)),
      addEventListener('popstate', me),
      addEventListener('load', B),
      'onscrollend' in window)
    )
      addEventListener('scrollend', X);
    else {
      let e, t, n, o;
      const r = () => {
        if (o !== history.state?.index) {
          clearInterval(e), (e = void 0);
          return;
        }
        if (t === scrollY && n === scrollX) {
          clearInterval(e), (e = void 0), X();
          return;
        } else (t = scrollY), (n = scrollX);
      };
      addEventListener(
        'scroll',
        () => {
          e === void 0 && ((o = history.state.index), (t = scrollY), (n = scrollX), (e = window.setInterval(r, 50)));
        },
        { passive: !0 }
      );
    }
  for (const e of document.scripts) e.dataset.astroExec = '';
}
const z = new Set(),
  P = new WeakSet();
let R,
  J,
  Y = !1;
function he(e) {
  Y || ((Y = !0), (R ??= e?.prefetchAll ?? !1), (J ??= e?.defaultStrategy ?? 'hover'), we(), pe(), ye(), be());
}
function we() {
  for (const e of ['touchstart', 'mousedown'])
    document.body.addEventListener(
      e,
      (t) => {
        A(t.target, 'tap') && x(t.target.href, { with: 'fetch', ignoreSlowConnection: !0 });
      },
      { passive: !0 }
    );
}
function pe() {
  let e;
  document.body.addEventListener(
    'focusin',
    (o) => {
      A(o.target, 'hover') && t(o);
    },
    { passive: !0 }
  ),
    document.body.addEventListener('focusout', n, { passive: !0 }),
    H(() => {
      for (const o of document.getElementsByTagName('a'))
        P.has(o) ||
          (A(o, 'hover') &&
            (P.add(o),
            o.addEventListener('mouseenter', t, { passive: !0 }),
            o.addEventListener('mouseleave', n, { passive: !0 })));
    });
  function t(o) {
    const r = o.target.href;
    e && clearTimeout(e),
      (e = setTimeout(() => {
        x(r, { with: 'fetch' });
      }, 80));
  }
  function n() {
    e && (clearTimeout(e), (e = 0));
  }
}
function ye() {
  let e;
  H(() => {
    for (const t of document.getElementsByTagName('a'))
      P.has(t) || (A(t, 'viewport') && (P.add(t), (e ??= ge()), e.observe(t)));
  });
}
function ge() {
  const e = new WeakMap();
  return new IntersectionObserver((t, n) => {
    for (const o of t) {
      const r = o.target,
        a = e.get(r);
      o.isIntersecting
        ? (a && clearTimeout(a),
          e.set(
            r,
            setTimeout(() => {
              n.unobserve(r), e.delete(r), x(r.href, { with: 'link' });
            }, 300)
          ))
        : a && (clearTimeout(a), e.delete(r));
    }
  });
}
function be() {
  H(() => {
    for (const e of document.getElementsByTagName('a')) A(e, 'load') && x(e.href, { with: 'link' });
  });
}
function x(e, t) {
  const n = t?.ignoreSlowConnection ?? !1;
  if (!Te(e, n)) return;
  if ((z.add(e), (t?.with ?? 'link') === 'link')) {
    const r = document.createElement('link');
    (r.rel = 'prefetch'), r.setAttribute('href', e), document.head.append(r);
  } else
    fetch(e).catch((r) => {
      console.log(`[astro] Failed to prefetch ${e}`), console.error(r);
    });
}
function Te(e, t) {
  if (!navigator.onLine || (!t && Q())) return !1;
  try {
    const n = new URL(e, location.href);
    return (
      location.origin === n.origin && (location.pathname !== n.pathname || location.search !== n.search) && !z.has(e)
    );
  } catch {}
  return !1;
}
function A(e, t) {
  if (e?.tagName !== 'A') return !1;
  const n = e.dataset.astroPrefetch;
  return n === 'false'
    ? !1
    : t === 'tap' && (n != null || R) && Q()
      ? !0
      : (n == null && R) || n === ''
        ? t === J
        : n === t;
}
function Q() {
  if ('connection' in navigator) {
    const e = navigator.connection;
    return e.saveData || /2g/.test(e.effectiveType);
  }
  return !1;
}
function H(e) {
  e();
  let t = !1;
  document.addEventListener('astro:page-load', () => {
    if (!t) {
      t = !0;
      return;
    }
    e();
  });
}
function ve() {
  const e = document.querySelector('[name="astro-view-transitions-fallback"]');
  return e ? e.getAttribute('content') : 'animate';
}
function $(e) {
  return e.dataset.astroReload !== void 0;
}
(I || ve() !== 'none') &&
  (document.addEventListener('click', (e) => {
    let t = e.target;
    if (
      (e.composed && (t = e.composedPath()[0]),
      t instanceof Element && (t = t.closest('a, area')),
      !(t instanceof HTMLAnchorElement) && !(t instanceof SVGAElement) && !(t instanceof HTMLAreaElement))
    )
      return;
    const n = t instanceof HTMLElement ? t.target : t.target.baseVal,
      o = t instanceof HTMLElement ? t.href : t.href.baseVal,
      r = new URL(o, location.href).origin;
    $(t) ||
      t.hasAttribute('download') ||
      !t.href ||
      (n && n !== '_self') ||
      r !== location.origin ||
      e.button !== 0 ||
      e.metaKey ||
      e.ctrlKey ||
      e.altKey ||
      e.shiftKey ||
      e.defaultPrevented ||
      (e.preventDefault(),
      F(o, { history: t.dataset.astroHistory === 'replace' ? 'replace' : 'auto', sourceElement: t }));
  }),
  document.addEventListener('submit', (e) => {
    let t = e.target;
    if (t.tagName !== 'FORM' || e.defaultPrevented || $(t)) return;
    const n = t,
      o = e.submitter,
      r = new FormData(n, o);
    let a = o?.getAttribute('formaction') ?? n.action ?? location.pathname;
    const u = o?.getAttribute('formmethod') ?? n.method;
    if (u === 'dialog' || location.origin !== new URL(a, location.href).origin) return;
    const d = { sourceElement: o ?? n };
    if (u === 'get') {
      const s = new URLSearchParams(r),
        m = new URL(a);
      (m.search = s.toString()), (a = m.toString());
    } else d.formData = r;
    e.preventDefault(), F(a, d);
  }),
  he({ prefetchAll: !0 }));
