const ce = 'modulepreload',
  ue = function (e) {
    return '/' + e;
  },
  J = {},
  ae = function (t, _, r) {
    let o = Promise.resolve();
    if (_ && _.length > 0) {
      const l = document.getElementsByTagName('link'),
        s = document.querySelector('meta[property=csp-nonce]'),
        a = s?.nonce || s?.getAttribute('nonce');
      o = Promise.all(
        _.map((u) => {
          if (((u = ue(u)), u in J)) return;
          J[u] = !0;
          const i = u.endsWith('.css'),
            f = i ? '[rel="stylesheet"]' : '';
          if (!!r)
            for (let c = l.length - 1; c >= 0; c--) {
              const v = l[c];
              if (v.href === u && (!i || v.rel === 'stylesheet')) return;
            }
          else if (document.querySelector(`link[href="${u}"]${f}`)) return;
          const p = document.createElement('link');
          if (
            ((p.rel = i ? 'stylesheet' : ce),
            i || ((p.as = 'script'), (p.crossOrigin = '')),
            (p.href = u),
            a && p.setAttribute('nonce', a),
            document.head.appendChild(p),
            i)
          )
            return new Promise((c, v) => {
              p.addEventListener('load', c),
                p.addEventListener('error', () => v(new Error(`Unable to preload CSS for ${u}`)));
            });
        })
      );
    }
    return o
      .then(() => t())
      .catch((l) => {
        const s = new Event('vite:preloadError', { cancelable: !0 });
        if (((s.payload = l), window.dispatchEvent(s), !s.defaultPrevented)) throw l;
      });
  };
var R,
  d,
  te,
  fe,
  S,
  K,
  _e,
  I,
  C = {},
  j = [],
  pe = /acit|ex(?:s|g|n|p|$)|rph|grid|ows|mnc|ntw|ine[ch]|zoo|^ord|itera/i,
  V = Array.isArray;
function w(e, t) {
  for (var _ in t) e[_] = t[_];
  return e;
}
function ne(e) {
  var t = e.parentNode;
  t && t.removeChild(e);
}
function x(e, t, _) {
  var r,
    o,
    l,
    s = {};
  for (l in t) l == 'key' ? (r = t[l]) : l == 'ref' ? (o = t[l]) : (s[l] = t[l]);
  if (
    (arguments.length > 2 && (s.children = arguments.length > 3 ? R.call(arguments, 2) : _),
    typeof e == 'function' && e.defaultProps != null)
  )
    for (l in e.defaultProps) s[l] === void 0 && (s[l] = e.defaultProps[l]);
  return M(e, s, r, o, null);
}
function M(e, t, _, r, o) {
  var l = {
    type: e,
    props: t,
    key: _,
    ref: r,
    __k: null,
    __: null,
    __b: 0,
    __e: null,
    __d: void 0,
    __c: null,
    constructor: void 0,
    __v: o ?? ++te,
    __i: -1,
    __u: 0,
  };
  return o == null && d.vnode != null && d.vnode(l), l;
}
function $(e) {
  return e.children;
}
function U(e, t) {
  (this.props = e), (this.context = t);
}
function E(e, t) {
  if (t == null) return e.__ ? E(e.__, e.__i + 1) : null;
  for (var _; t < e.__k.length; t++) if ((_ = e.__k[t]) != null && _.__e != null) return _.__e;
  return typeof e.type == 'function' ? E(e) : null;
}
function de(e, t, _) {
  var r,
    o = e.__v,
    l = o.__e,
    s = e.__P;
  if (s)
    return (
      ((r = w({}, o)).__v = o.__v + 1),
      d.vnode && d.vnode(r),
      q(s, r, o, e.__n, s.ownerSVGElement !== void 0, 32 & o.__u ? [l] : null, t, l ?? E(o), !!(32 & o.__u), _),
      (r.__v = o.__v),
      (r.__.__k[r.__i] = r),
      (r.__d = void 0),
      r.__e != l && oe(r),
      r
    );
}
function oe(e) {
  var t, _;
  if ((e = e.__) != null && e.__c != null) {
    for (e.__e = e.__c.base = null, t = 0; t < e.__k.length; t++)
      if ((_ = e.__k[t]) != null && _.__e != null) {
        e.__e = e.__c.base = _.__e;
        break;
      }
    return oe(e);
  }
}
function Q(e) {
  ((!e.__d && (e.__d = !0) && S.push(e) && !A.__r++) || K !== d.debounceRendering) &&
    ((K = d.debounceRendering) || _e)(A);
}
function A() {
  var e,
    t,
    _,
    r = [],
    o = [];
  for (S.sort(I); (e = S.shift()); )
    e.__d &&
      ((_ = S.length),
      (t = de(e, r, o) || t),
      _ === 0 || S.length > _
        ? (O(r, t, o), (o.length = r.length = 0), (t = void 0), S.sort(I))
        : t && d.__c && d.__c(t, j));
  t && O(r, t, o), (A.__r = 0);
}
function re(e, t, _, r, o, l, s, a, u, i, f) {
  var n,
    p,
    c,
    v,
    k,
    y = (r && r.__k) || j,
    h = t.length;
  for (_.__d = u, he(_, t, y), u = _.__d, n = 0; n < h; n++)
    (c = _.__k[n]) != null &&
      typeof c != 'boolean' &&
      typeof c != 'function' &&
      ((p = c.__i === -1 ? C : y[c.__i] || C),
      (c.__i = n),
      q(e, c, p, o, l, s, a, u, i, f),
      (v = c.__e),
      c.ref && p.ref != c.ref && (p.ref && z(p.ref, null, c), f.push(c.ref, c.__c || v, c)),
      k == null && v != null && (k = v),
      65536 & c.__u || p.__k === c.__k
        ? (u = le(c, u, e))
        : typeof c.type == 'function' && c.__d !== void 0
          ? (u = c.__d)
          : v && (u = v.nextSibling),
      (c.__d = void 0),
      (c.__u &= -196609));
  (_.__d = u), (_.__e = k);
}
function he(e, t, _) {
  var r,
    o,
    l,
    s,
    a,
    u = t.length,
    i = _.length,
    f = i,
    n = 0;
  for (e.__k = [], r = 0; r < u; r++)
    (s = r + n),
      (o = e.__k[r] =
        (o = t[r]) == null || typeof o == 'boolean' || typeof o == 'function'
          ? null
          : typeof o == 'string' || typeof o == 'number' || typeof o == 'bigint' || o.constructor == String
            ? M(null, o, null, null, null)
            : V(o)
              ? M($, { children: o }, null, null, null)
              : o.constructor === void 0 && o.__b > 0
                ? M(o.type, o.props, o.key, o.ref ? o.ref : null, o.__v)
                : o) != null
        ? ((o.__ = e),
          (o.__b = e.__b + 1),
          (a = ve(o, _, s, f)),
          (o.__i = a),
          (l = null),
          a !== -1 && (f--, (l = _[a]) && (l.__u |= 131072)),
          l == null || l.__v === null
            ? (a == -1 && n--, typeof o.type != 'function' && (o.__u |= 65536))
            : a !== s &&
              (a === s + 1
                ? n++
                : a > s
                  ? f > u - s
                    ? (n += a - s)
                    : n--
                  : a < s
                    ? a == s - 1 && (n = a - s)
                    : (n = 0),
              a !== r + n && (o.__u |= 65536)))
        : (l = _[s]) &&
          l.key == null &&
          l.__e &&
          !(131072 & l.__u) &&
          (l.__e == e.__d && (e.__d = E(l)), B(l, l, !1), (_[s] = null), f--);
  if (f) for (r = 0; r < i; r++) (l = _[r]) != null && !(131072 & l.__u) && (l.__e == e.__d && (e.__d = E(l)), B(l, l));
}
function le(e, t, _) {
  var r, o;
  if (typeof e.type == 'function') {
    for (r = e.__k, o = 0; r && o < r.length; o++) r[o] && ((r[o].__ = e), (t = le(r[o], t, _)));
    return t;
  }
  e.__e != t && (_.insertBefore(e.__e, t || null), (t = e.__e));
  do t = t && t.nextSibling;
  while (t != null && t.nodeType === 8);
  return t;
}
function ve(e, t, _, r) {
  var o = e.key,
    l = e.type,
    s = _ - 1,
    a = _ + 1,
    u = t[_];
  if (u === null || (u && o == u.key && l === u.type && !(131072 & u.__u))) return _;
  if (r > (u != null && !(131072 & u.__u) ? 1 : 0))
    for (; s >= 0 || a < t.length; ) {
      if (s >= 0) {
        if ((u = t[s]) && !(131072 & u.__u) && o == u.key && l === u.type) return s;
        s--;
      }
      if (a < t.length) {
        if ((u = t[a]) && !(131072 & u.__u) && o == u.key && l === u.type) return a;
        a++;
      }
    }
  return -1;
}
function X(e, t, _) {
  t[0] === '-'
    ? e.setProperty(t, _ ?? '')
    : (e[t] = _ == null ? '' : typeof _ != 'number' || pe.test(t) ? _ : _ + 'px');
}
function N(e, t, _, r, o) {
  var l;
  e: if (t === 'style')
    if (typeof _ == 'string') e.style.cssText = _;
    else {
      if ((typeof r == 'string' && (e.style.cssText = r = ''), r)) for (t in r) (_ && t in _) || X(e.style, t, '');
      if (_) for (t in _) (r && _[t] === r[t]) || X(e.style, t, _[t]);
    }
  else if (t[0] === 'o' && t[1] === 'n')
    (l = t !== (t = t.replace(/(PointerCapture)$|Capture$/i, '$1'))),
      (t = t.toLowerCase() in e ? t.toLowerCase().slice(2) : t.slice(2)),
      e.l || (e.l = {}),
      (e.l[t + l] = _),
      _
        ? r
          ? (_.u = r.u)
          : ((_.u = Date.now()), e.addEventListener(t, l ? Z : Y, l))
        : e.removeEventListener(t, l ? Z : Y, l);
  else {
    if (o) t = t.replace(/xlink(H|:h)/, 'h').replace(/sName$/, 's');
    else if (
      t !== 'width' &&
      t !== 'height' &&
      t !== 'href' &&
      t !== 'list' &&
      t !== 'form' &&
      t !== 'tabIndex' &&
      t !== 'download' &&
      t !== 'rowSpan' &&
      t !== 'colSpan' &&
      t !== 'role' &&
      t in e
    )
      try {
        e[t] = _ ?? '';
        break e;
      } catch {}
    typeof _ == 'function' || (_ == null || (_ === !1 && t[4] !== '-') ? e.removeAttribute(t) : e.setAttribute(t, _));
  }
}
function Y(e) {
  if (this.l) {
    var t = this.l[e.type + !1];
    if (e.t) {
      if (e.t <= t.u) return;
    } else e.t = Date.now();
    return t(d.event ? d.event(e) : e);
  }
}
function Z(e) {
  if (this.l) return this.l[e.type + !0](d.event ? d.event(e) : e);
}
function q(e, t, _, r, o, l, s, a, u, i) {
  var f,
    n,
    p,
    c,
    v,
    k,
    y,
    h,
    m,
    b,
    T,
    P,
    G,
    D,
    H,
    g = t.type;
  if (t.constructor !== void 0) return null;
  128 & _.__u && ((u = !!(32 & _.__u)), (l = [(a = t.__e = _.__e)])), (f = d.__b) && f(t);
  e: if (typeof g == 'function')
    try {
      if (
        ((h = t.props),
        (m = (f = g.contextType) && r[f.__c]),
        (b = f ? (m ? m.props.value : f.__) : r),
        _.__c
          ? (y = (n = t.__c = _.__c).__ = n.__E)
          : ('prototype' in g && g.prototype.render
              ? (t.__c = n = new g(h, b))
              : ((t.__c = n = new U(h, b)), (n.constructor = g), (n.render = me)),
            m && m.sub(n),
            (n.props = h),
            n.state || (n.state = {}),
            (n.context = b),
            (n.__n = r),
            (p = n.__d = !0),
            (n.__h = []),
            (n._sb = [])),
        n.__s == null && (n.__s = n.state),
        g.getDerivedStateFromProps != null &&
          (n.__s == n.state && (n.__s = w({}, n.__s)), w(n.__s, g.getDerivedStateFromProps(h, n.__s))),
        (c = n.props),
        (v = n.state),
        (n.__v = t),
        p)
      )
        g.getDerivedStateFromProps == null && n.componentWillMount != null && n.componentWillMount(),
          n.componentDidMount != null && n.__h.push(n.componentDidMount);
      else {
        if (
          (g.getDerivedStateFromProps == null &&
            h !== c &&
            n.componentWillReceiveProps != null &&
            n.componentWillReceiveProps(h, b),
          !n.__e &&
            ((n.shouldComponentUpdate != null && n.shouldComponentUpdate(h, n.__s, b) === !1) || t.__v === _.__v))
        ) {
          for (
            t.__v !== _.__v && ((n.props = h), (n.state = n.__s), (n.__d = !1)),
              t.__e = _.__e,
              t.__k = _.__k,
              t.__k.forEach(function (L) {
                L && (L.__ = t);
              }),
              T = 0;
            T < n._sb.length;
            T++
          )
            n.__h.push(n._sb[T]);
          (n._sb = []), n.__h.length && s.push(n);
          break e;
        }
        n.componentWillUpdate != null && n.componentWillUpdate(h, n.__s, b),
          n.componentDidUpdate != null &&
            n.__h.push(function () {
              n.componentDidUpdate(c, v, k);
            });
      }
      if (
        ((n.context = b),
        (n.props = h),
        (n.__P = e),
        (n.__e = !1),
        (P = d.__r),
        (G = 0),
        'prototype' in g && g.prototype.render)
      ) {
        for (
          n.state = n.__s, n.__d = !1, P && P(t), f = n.render(n.props, n.state, n.context), D = 0;
          D < n._sb.length;
          D++
        )
          n.__h.push(n._sb[D]);
        n._sb = [];
      } else
        do (n.__d = !1), P && P(t), (f = n.render(n.props, n.state, n.context)), (n.state = n.__s);
        while (n.__d && ++G < 25);
      (n.state = n.__s),
        n.getChildContext != null && (r = w(w({}, r), n.getChildContext())),
        p || n.getSnapshotBeforeUpdate == null || (k = n.getSnapshotBeforeUpdate(c, v)),
        re(
          e,
          V((H = f != null && f.type === $ && f.key == null ? f.props.children : f)) ? H : [H],
          t,
          _,
          r,
          o,
          l,
          s,
          a,
          u,
          i
        ),
        (n.base = t.__e),
        (t.__u &= -161),
        n.__h.length && s.push(n),
        y && (n.__E = n.__ = null);
    } catch (L) {
      (t.__v = null),
        u || l != null
          ? ((t.__e = a), (t.__u |= u ? 160 : 32), (l[l.indexOf(a)] = null))
          : ((t.__e = _.__e), (t.__k = _.__k)),
        d.__e(L, t, _);
    }
  else l == null && t.__v === _.__v ? ((t.__k = _.__k), (t.__e = _.__e)) : (t.__e = ye(_.__e, t, _, r, o, l, s, u, i));
  (f = d.diffed) && f(t);
}
function O(e, t, _) {
  for (var r = 0; r < _.length; r++) z(_[r], _[++r], _[++r]);
  d.__c && d.__c(t, e),
    e.some(function (o) {
      try {
        (e = o.__h),
          (o.__h = []),
          e.some(function (l) {
            l.call(o);
          });
      } catch (l) {
        d.__e(l, o.__v);
      }
    });
}
function ye(e, t, _, r, o, l, s, a, u) {
  var i,
    f,
    n,
    p,
    c,
    v,
    k,
    y = _.props,
    h = t.props,
    m = t.type;
  if ((m === 'svg' && (o = !0), l != null)) {
    for (i = 0; i < l.length; i++)
      if ((c = l[i]) && 'setAttribute' in c == !!m && (m ? c.localName === m : c.nodeType === 3)) {
        (e = c), (l[i] = null);
        break;
      }
  }
  if (e == null) {
    if (m === null) return document.createTextNode(h);
    (e = o ? document.createElementNS('http://www.w3.org/2000/svg', m) : document.createElement(m, h.is && h)),
      (l = null),
      (a = !1);
  }
  if (m === null) y === h || (a && e.data === h) || (e.data = h);
  else {
    if (((l = l && R.call(e.childNodes)), (y = _.props || C), !a && l != null))
      for (y = {}, i = 0; i < e.attributes.length; i++) y[(c = e.attributes[i]).name] = c.value;
    for (i in y)
      (c = y[i]),
        i == 'children' || (i == 'dangerouslySetInnerHTML' ? (n = c) : i === 'key' || i in h || N(e, i, null, c, o));
    for (i in h)
      (c = h[i]),
        i == 'children'
          ? (p = c)
          : i == 'dangerouslySetInnerHTML'
            ? (f = c)
            : i == 'value'
              ? (v = c)
              : i == 'checked'
                ? (k = c)
                : i === 'key' || (a && typeof c != 'function') || y[i] === c || N(e, i, c, y[i], o);
    if (f) a || (n && (f.__html === n.__html || f.__html === e.innerHTML)) || (e.innerHTML = f.__html), (t.__k = []);
    else if (
      (n && (e.innerHTML = ''),
      re(e, V(p) ? p : [p], t, _, r, o && m !== 'foreignObject', l, s, l ? l[0] : _.__k && E(_, 0), a, u),
      l != null)
    )
      for (i = l.length; i--; ) l[i] != null && ne(l[i]);
    a ||
      ((i = 'value'),
      v !== void 0 &&
        (v !== e[i] || (m === 'progress' && !v) || (m === 'option' && v !== y[i])) &&
        N(e, i, v, y[i], !1),
      (i = 'checked'),
      k !== void 0 && k !== e[i] && N(e, i, k, y[i], !1));
  }
  return e;
}
function z(e, t, _) {
  try {
    typeof e == 'function' ? e(t) : (e.current = t);
  } catch (r) {
    d.__e(r, _);
  }
}
function B(e, t, _) {
  var r, o;
  if (
    (d.unmount && d.unmount(e),
    (r = e.ref) && ((r.current && r.current !== e.__e) || z(r, null, t)),
    (r = e.__c) != null)
  ) {
    if (r.componentWillUnmount)
      try {
        r.componentWillUnmount();
      } catch (l) {
        d.__e(l, t);
      }
    (r.base = r.__P = null), (e.__c = void 0);
  }
  if ((r = e.__k)) for (o = 0; o < r.length; o++) r[o] && B(r[o], t, _ || typeof e.type != 'function');
  _ || e.__e == null || ne(e.__e), (e.__ = e.__e = e.__d = void 0);
}
function me(e, t, _) {
  return this.constructor(e, _);
}
function F(e, t, _) {
  var r, o, l, s;
  d.__ && d.__(e, t),
    (o = (r = typeof _ == 'function') ? null : (_ && _.__k) || t.__k),
    (l = []),
    (s = []),
    q(
      t,
      (e = ((!r && _) || t).__k = x($, null, [e])),
      o || C,
      C,
      t.ownerSVGElement !== void 0,
      !r && _ ? [_] : o ? null : t.firstChild ? R.call(t.childNodes) : null,
      l,
      !r && _ ? _ : o ? o.__e : t.firstChild,
      r,
      s
    ),
    (e.__d = void 0),
    O(l, e, s);
}
function ie(e, t) {
  F(e, t, ie);
}
(R = j.slice),
  (d = {
    __e: function (e, t, _, r) {
      for (var o, l, s; (t = t.__); )
        if ((o = t.__c) && !o.__)
          try {
            if (
              ((l = o.constructor) &&
                l.getDerivedStateFromError != null &&
                (o.setState(l.getDerivedStateFromError(e)), (s = o.__d)),
              o.componentDidCatch != null && (o.componentDidCatch(e, r || {}), (s = o.__d)),
              s)
            )
              return (o.__E = o);
          } catch (a) {
            e = a;
          }
      throw e;
    },
  }),
  (te = 0),
  (fe = function (e) {
    return e != null && e.constructor == null;
  }),
  (U.prototype.setState = function (e, t) {
    var _;
    (_ = this.__s != null && this.__s !== this.state ? this.__s : (this.__s = w({}, this.state))),
      typeof e == 'function' && (e = e(w({}, _), this.props)),
      e && w(_, e),
      e != null && this.__v && (t && this._sb.push(t), Q(this));
  }),
  (U.prototype.forceUpdate = function (e) {
    this.__v && ((this.__e = !0), e && this.__h.push(e), Q(this));
  }),
  (U.prototype.render = $),
  (S = []),
  (_e = typeof Promise == 'function' ? Promise.prototype.then.bind(Promise.resolve()) : setTimeout),
  (I = function (e, t) {
    return e.__v.__b - t.__v.__b;
  }),
  (A.__r = 0);
const se = ({ value: e, name: t, hydrate: _ = !0 }) =>
  e ? x(_ ? 'astro-slot' : 'astro-static-slot', { name: t, dangerouslySetInnerHTML: { __html: e } }) : null;
se.shouldComponentUpdate = () => !1;
var ee = se;
const W = new Map();
var ge =
  (e) =>
  async (t, _, { default: r, ...o }, { client: l }) => {
    if (!e.hasAttribute('ssr')) return;
    for (const [u, i] of Object.entries(o)) _[u] = x(ee, { value: i, name: u });
    if (e.dataset.preactSignals) {
      const { signal: u } = await ae(() => import('./signals.module.DBlfN4BO.js'), []);
      let i = JSON.parse(e.dataset.preactSignals);
      for (const [f, n] of Object.entries(i)) {
        if (!W.has(n)) {
          const p = u(_[f]);
          W.set(n, p);
        }
        _[f] = W.get(n);
      }
    }
    (l !== 'only' ? ie : F)(x(t, _, r != null ? x(ee, { value: r }) : r), e),
      e.addEventListener('astro:unmount', () => F(null, e), { once: !0 });
  };
export { U as b, ge as c, d as l, fe as t };
