import { l as O, t as oi, b as fi } from './client.DlxrsGz3.js';
var S,
  v,
  N,
  T,
  F = 0,
  L = [],
  m = [],
  u = O,
  z = u.__b,
  B = u.__r,
  G = u.diffed,
  J = u.__c,
  D = u.unmount,
  I = u.__;
function M(t, i) {
  u.__h && u.__h(v, t, F || i), (F = 0);
  var n = v.__H || (v.__H = { __: [], __h: [] });
  return t >= n.__.length && n.__.push({ __V: m }), n.__[t];
}
function ei(t, i) {
  var n = M(S++, 3);
  !u.__s && R(n.__H, i) && ((n.__ = t), (n.i = i), v.__H.__h.push(n));
}
function Q(t) {
  return (
    (F = 5),
    H(function () {
      return { current: t };
    }, [])
  );
}
function H(t, i) {
  var n = M(S++, 7);
  return R(n.__H, i) ? ((n.__V = t()), (n.i = i), (n.__h = t), n.__V) : n.__;
}
function _i() {
  for (var t; (t = L.shift()); )
    if (t.__P && t.__H)
      try {
        t.__H.__h.forEach(b), t.__H.__h.forEach(q), (t.__H.__h = []);
      } catch (i) {
        (t.__H.__h = []), u.__e(i, t.__v);
      }
}
(u.__b = function (t) {
  (v = null), z && z(t);
}),
  (u.__ = function (t, i) {
    t && i.__k && i.__k.__m && (t.__m = i.__k.__m), I && I(t, i);
  }),
  (u.__r = function (t) {
    B && B(t), (S = 0);
    var i = (v = t.__c).__H;
    i &&
      (N === v
        ? ((i.__h = []),
          (v.__h = []),
          i.__.forEach(function (n) {
            n.__N && (n.__ = n.__N), (n.__V = m), (n.__N = n.i = void 0);
          }))
        : (i.__h.forEach(b), i.__h.forEach(q), (i.__h = []), (S = 0))),
      (N = v);
  }),
  (u.diffed = function (t) {
    G && G(t);
    var i = t.__c;
    i &&
      i.__H &&
      (i.__H.__h.length &&
        ((L.push(i) !== 1 && T === u.requestAnimationFrame) || ((T = u.requestAnimationFrame) || ui)(_i)),
      i.__H.__.forEach(function (n) {
        n.i && (n.__H = n.i), n.__V !== m && (n.__ = n.__V), (n.i = void 0), (n.__V = m);
      })),
      (N = v = null);
  }),
  (u.__c = function (t, i) {
    i.some(function (n) {
      try {
        n.__h.forEach(b),
          (n.__h = n.__h.filter(function (r) {
            return !r.__ || q(r);
          }));
      } catch (r) {
        i.some(function (f) {
          f.__h && (f.__h = []);
        }),
          (i = []),
          u.__e(r, n.__v);
      }
    }),
      J && J(t, i);
  }),
  (u.unmount = function (t) {
    D && D(t);
    var i,
      n = t.__c;
    n &&
      n.__H &&
      (n.__H.__.forEach(function (r) {
        try {
          b(r);
        } catch (f) {
          i = f;
        }
      }),
      (n.__H = void 0),
      i && u.__e(i, n.__v));
  });
var K = typeof requestAnimationFrame == 'function';
function ui(t) {
  var i,
    n = function () {
      clearTimeout(r), K && cancelAnimationFrame(i), setTimeout(t);
    },
    r = setTimeout(n, 100);
  K && (i = requestAnimationFrame(n));
}
function b(t) {
  var i = v,
    n = t.__c;
  typeof n == 'function' && ((t.__c = void 0), n()), (v = i);
}
function q(t) {
  var i = v;
  (t.__c = t.__()), (v = i);
}
function R(t, i) {
  return (
    !t ||
    t.length !== i.length ||
    i.some(function (n, r) {
      return n !== t[r];
    })
  );
}
function x() {
  throw new Error('Cycle detected');
}
var si = Symbol.for('preact-signals');
function E() {
  if (h > 1) h--;
  else {
    for (var t, i = !1; p !== void 0; ) {
      var n = p;
      for (p = void 0, C++; n !== void 0; ) {
        var r = n.o;
        if (((n.o = void 0), (n.f &= -3), !(8 & n.f) && Y(n)))
          try {
            n.c();
          } catch (f) {
            i || ((t = f), (i = !0));
          }
        n = r;
      }
    }
    if (((C = 0), h--, i)) throw t;
  }
}
function di(t) {
  if (h > 0) return t();
  h++;
  try {
    return t();
  } finally {
    E();
  }
}
var e = void 0,
  V = 0;
function pi(t) {
  if (V > 0) return t();
  var i = e;
  (e = void 0), V++;
  try {
    return t();
  } finally {
    V--, (e = i);
  }
}
var p = void 0,
  h = 0,
  C = 0,
  g = 0;
function W(t) {
  if (e !== void 0) {
    var i = t.n;
    if (i === void 0 || i.t !== e)
      return (
        (i = { i: 0, S: t, p: e.s, n: void 0, t: e, e: void 0, x: void 0, r: i }),
        e.s !== void 0 && (e.s.n = i),
        (e.s = i),
        (t.n = i),
        32 & e.f && t.S(i),
        i
      );
    if (i.i === -1)
      return (
        (i.i = 0),
        i.n !== void 0 &&
          ((i.n.p = i.p), i.p !== void 0 && (i.p.n = i.n), (i.p = e.s), (i.n = void 0), (e.s.n = i), (e.s = i)),
        i
      );
  }
}
function s(t) {
  (this.v = t), (this.i = 0), (this.n = void 0), (this.t = void 0);
}
s.prototype.brand = si;
s.prototype.h = function () {
  return !0;
};
s.prototype.S = function (t) {
  this.t !== t && t.e === void 0 && ((t.x = this.t), this.t !== void 0 && (this.t.e = t), (this.t = t));
};
s.prototype.U = function (t) {
  if (this.t !== void 0) {
    var i = t.e,
      n = t.x;
    i !== void 0 && ((i.x = n), (t.e = void 0)),
      n !== void 0 && ((n.e = i), (t.x = void 0)),
      t === this.t && (this.t = n);
  }
};
s.prototype.subscribe = function (t) {
  var i = this;
  return k(function () {
    var n = i.value,
      r = 32 & this.f;
    this.f &= -33;
    try {
      t(n);
    } finally {
      this.f |= r;
    }
  });
};
s.prototype.valueOf = function () {
  return this.value;
};
s.prototype.toString = function () {
  return this.value + '';
};
s.prototype.toJSON = function () {
  return this.value;
};
s.prototype.peek = function () {
  return this.v;
};
Object.defineProperty(s.prototype, 'value', {
  get: function () {
    var t = W(this);
    return t !== void 0 && (t.i = this.i), this.v;
  },
  set: function (t) {
    if (
      (e instanceof c &&
        (function () {
          throw new Error('Computed cannot have side-effects');
        })(),
      t !== this.v)
    ) {
      C > 100 && x(), (this.v = t), this.i++, g++, h++;
      try {
        for (var i = this.t; i !== void 0; i = i.x) i.t.N();
      } finally {
        E();
      }
    }
  },
});
function X(t) {
  return new s(t);
}
function Y(t) {
  for (var i = t.s; i !== void 0; i = i.n) if (i.S.i !== i.i || !i.S.h() || i.S.i !== i.i) return !0;
  return !1;
}
function Z(t) {
  for (var i = t.s; i !== void 0; i = i.n) {
    var n = i.S.n;
    if ((n !== void 0 && (i.r = n), (i.S.n = i), (i.i = -1), i.n === void 0)) {
      t.s = i;
      break;
    }
  }
}
function ii(t) {
  for (var i = t.s, n = void 0; i !== void 0; ) {
    var r = i.p;
    i.i === -1 ? (i.S.U(i), r !== void 0 && (r.n = i.n), i.n !== void 0 && (i.n.p = r)) : (n = i),
      (i.S.n = i.r),
      i.r !== void 0 && (i.r = void 0),
      (i = r);
  }
  t.s = n;
}
function c(t) {
  s.call(this, void 0), (this.x = t), (this.s = void 0), (this.g = g - 1), (this.f = 4);
}
(c.prototype = new s()).h = function () {
  if (((this.f &= -3), 1 & this.f)) return !1;
  if ((36 & this.f) == 32 || ((this.f &= -5), this.g === g)) return !0;
  if (((this.g = g), (this.f |= 1), this.i > 0 && !Y(this))) return (this.f &= -2), !0;
  var t = e;
  try {
    Z(this), (e = this);
    var i = this.x();
    (16 & this.f || this.v !== i || this.i === 0) && ((this.v = i), (this.f &= -17), this.i++);
  } catch (n) {
    (this.v = n), (this.f |= 16), this.i++;
  }
  return (e = t), ii(this), (this.f &= -2), !0;
};
c.prototype.S = function (t) {
  if (this.t === void 0) {
    this.f |= 36;
    for (var i = this.s; i !== void 0; i = i.n) i.S.S(i);
  }
  s.prototype.S.call(this, t);
};
c.prototype.U = function (t) {
  if (this.t !== void 0 && (s.prototype.U.call(this, t), this.t === void 0)) {
    this.f &= -33;
    for (var i = this.s; i !== void 0; i = i.n) i.S.U(i);
  }
};
c.prototype.N = function () {
  if (!(2 & this.f)) {
    this.f |= 6;
    for (var t = this.t; t !== void 0; t = t.x) t.t.N();
  }
};
c.prototype.peek = function () {
  if ((this.h() || x(), 16 & this.f)) throw this.v;
  return this.v;
};
Object.defineProperty(c.prototype, 'value', {
  get: function () {
    1 & this.f && x();
    var t = W(this);
    if ((this.h(), t !== void 0 && (t.i = this.i), 16 & this.f)) throw this.v;
    return this.v;
  },
});
function ti(t) {
  return new c(t);
}
function ni(t) {
  var i = t.u;
  if (((t.u = void 0), typeof i == 'function')) {
    h++;
    var n = e;
    e = void 0;
    try {
      i();
    } catch (r) {
      throw ((t.f &= -2), (t.f |= 8), j(t), r);
    } finally {
      (e = n), E();
    }
  }
}
function j(t) {
  for (var i = t.s; i !== void 0; i = i.n) i.S.U(i);
  (t.x = void 0), (t.s = void 0), ni(t);
}
function vi(t) {
  if (e !== this) throw new Error('Out-of-order effect');
  ii(this), (e = t), (this.f &= -2), 8 & this.f && j(this), E();
}
function l(t) {
  (this.x = t), (this.u = void 0), (this.s = void 0), (this.o = void 0), (this.f = 32);
}
l.prototype.c = function () {
  var t = this.S();
  try {
    if (8 & this.f || this.x === void 0) return;
    var i = this.x();
    typeof i == 'function' && (this.u = i);
  } finally {
    t();
  }
};
l.prototype.S = function () {
  1 & this.f && x(), (this.f |= 1), (this.f &= -9), ni(this), Z(this), h++;
  var t = e;
  return (e = this), vi.bind(this, t);
};
l.prototype.N = function () {
  2 & this.f || ((this.f |= 2), (this.o = p), (p = this));
};
l.prototype.d = function () {
  (this.f |= 8), 1 & this.f || j(this);
};
function k(t) {
  var i = new l(t);
  try {
    i.c();
  } catch (n) {
    throw (i.d(), n);
  }
  return i.d.bind(i);
}
var U, A;
function d(t, i) {
  O[t] = i.bind(null, O[t] || function () {});
}
function w(t) {
  A && A(), (A = t && t.S());
}
function ri(t) {
  var i = this,
    n = t.data,
    r = ci(n);
  r.value = n;
  var f = H(function () {
    for (var o = i.__v; (o = o.__); )
      if (o.__c) {
        o.__c.__$f |= 4;
        break;
      }
    return (
      (i.__$u.c = function () {
        var _;
        !oi(f.peek()) && ((_ = i.base) == null ? void 0 : _.nodeType) === 3
          ? (i.base.data = f.peek())
          : ((i.__$f |= 1), i.setState({}));
      }),
      ti(function () {
        var _ = r.value.value;
        return _ === 0 ? 0 : _ === !0 ? '' : _ || '';
      })
    );
  }, []);
  return f.value;
}
ri.displayName = '_st';
Object.defineProperties(s.prototype, {
  constructor: { configurable: !0, value: void 0 },
  type: { configurable: !0, value: ri },
  props: {
    configurable: !0,
    get: function () {
      return { data: this };
    },
  },
  __b: { configurable: !0, value: 1 },
});
d('__b', function (t, i) {
  if (typeof i.type == 'string') {
    var n,
      r = i.props;
    for (var f in r)
      if (f !== 'children') {
        var o = r[f];
        o instanceof s && (n || (i.__np = n = {}), (n[f] = o), (r[f] = o.peek()));
      }
  }
  t(i);
});
d('__r', function (t, i) {
  w();
  var n,
    r = i.__c;
  r &&
    ((r.__$f &= -2),
    (n = r.__$u) === void 0 &&
      (r.__$u = n =
        (function (f) {
          var o;
          return (
            k(function () {
              o = this;
            }),
            (o.c = function () {
              (r.__$f |= 1), r.setState({});
            }),
            o
          );
        })())),
    (U = r),
    w(n),
    t(i);
});
d('__e', function (t, i, n, r) {
  w(), (U = void 0), t(i, n, r);
});
d('diffed', function (t, i) {
  w(), (U = void 0);
  var n;
  if (typeof i.type == 'string' && (n = i.__e)) {
    var r = i.__np,
      f = i.props;
    if (r) {
      var o = n.U;
      if (o)
        for (var _ in o) {
          var a = o[_];
          a !== void 0 && !(_ in r) && (a.d(), (o[_] = void 0));
        }
      else n.U = o = {};
      for (var y in r) {
        var $ = o[y],
          P = r[y];
        $ === void 0 ? (($ = hi(n, y, P, f)), (o[y] = $)) : $.o(P, f);
      }
    }
  }
  t(i);
});
function hi(t, i, n, r) {
  var f = i in t && t.ownerSVGElement === void 0,
    o = X(n);
  return {
    o: function (_, a) {
      (o.value = _), (r = a);
    },
    d: k(function () {
      var _ = o.value.value;
      r[i] !== _ && ((r[i] = _), f ? (t[i] = _) : _ ? t.setAttribute(i, _) : t.removeAttribute(i));
    }),
  };
}
d('unmount', function (t, i) {
  if (typeof i.type == 'string') {
    var n = i.__e;
    if (n) {
      var r = n.U;
      if (r) {
        n.U = void 0;
        for (var f in r) {
          var o = r[f];
          o && o.d();
        }
      }
    }
  } else {
    var _ = i.__c;
    if (_) {
      var a = _.__$u;
      a && ((_.__$u = void 0), a.d());
    }
  }
  t(i);
});
d('__h', function (t, i, n, r) {
  (r < 3 || r === 9) && (i.__$f |= 2), t(i, n, r);
});
fi.prototype.shouldComponentUpdate = function (t, i) {
  var n = this.__$u;
  if (!((n && n.s !== void 0) || 4 & this.__$f) || 3 & this.__$f) return !0;
  for (var r in i) return !0;
  for (var f in t) if (f !== '__source' && t[f] !== this.props[f]) return !0;
  for (var o in this.props) if (!(o in t)) return !0;
  return !1;
};
function ci(t) {
  return H(function () {
    return X(t);
  }, []);
}
function li(t) {
  var i = Q(t);
  return (
    (i.current = t),
    (U.__$f |= 4),
    H(function () {
      return ti(function () {
        return i.current();
      });
    }, [])
  );
}
function yi(t) {
  var i = Q(t);
  (i.current = t),
    ei(function () {
      return k(function () {
        return i.current();
      });
    }, []);
}
export {
  s as Signal,
  di as batch,
  ti as computed,
  k as effect,
  X as signal,
  pi as untracked,
  li as useComputed,
  ci as useSignal,
  yi as useSignalEffect,
};
