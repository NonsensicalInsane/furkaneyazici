// Home hero artwork (components/widgets/HomeHero.astro): the hydrogen atom's
// 4f_xyz orbital as a cloud of points drawn from |ψ|². Each point is coloured
// by the sign of ψ, so neighbouring lobes alternate across the nodal planes.
// It slowly precesses and can be dragged around. A bundled module rather
// than an inline script, so the hash-based CSP covers it.

// ψ ∝ r³e^(−r/4) · sin²θ cosθ sin2φ  (∝ xyz·e^(−r/4)), r in Bohr radii
const R_MAX = 38; // the cut-off below keeps everything inside this radius
const radialDensity = (r) => r ** 8 * Math.exp(-r / 2); // r²|R(r)|², for sampling r
const radial = (r) => r ** 6 * Math.exp(-r / 2); // |R(r)|²
const RADIAL_MAX = radial(12);
const angular = (c, phi) => ((1 - c * c) * c * Math.sin(2 * phi)) ** 2; // |Y|², c = cos θ
const ANGULAR_MAX = 4 / 27;
// Only points where |ψ|² is at least this fraction of its peak: crisp lobes, no haze
const CUTOFF = 0.03;

const COLORS = [
  [56, 189, 248], // ψ > 0: sky-400
  [232, 121, 249], // ψ < 0: fuchsia-400
];
const DEPTHS = 8; // brightness levels, back to front
const TILT = 0.5; // the orbital's axis leans this far from vertical (rad)
const PITCH = 0.3; // seen slightly from above (rad)
const PERIOD = 48000; // ms per precession turn

// Seeded, so the cloud looks the same on every visit
function mulberry32(seed) {
  return () => {
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

// Rejection sampling, radius and angle separately: [x, y, z, sign of ψ] per
// point, scaled to the unit ball.
function samplePoints(count, random) {
  let peak = 0;
  for (let r = 0; r < R_MAX; r += 0.05) peak = Math.max(peak, radialDensity(r));

  const points = new Float32Array(count * 4);
  for (let i = 0; i < count; ) {
    let r, c, phi;
    do r = random() * R_MAX;
    while (random() * peak > radialDensity(r));
    do {
      c = random() * 2 - 1;
      phi = random() * 2 * Math.PI;
    } while (random() * ANGULAR_MAX > angular(c, phi));
    if (radial(r) * angular(c, phi) < CUTOFF * RADIAL_MAX * ANGULAR_MAX) continue;
    const s = Math.sqrt(1 - c * c);
    points[4 * i] = (r * s * Math.cos(phi)) / R_MAX;
    points[4 * i + 1] = (r * c) / R_MAX;
    points[4 * i + 2] = (r * s * Math.sin(phi)) / R_MAX;
    points[4 * i + 3] = Math.sign(c * Math.sin(2 * phi));
    i++;
  }
  return points;
}

export function initOrbital(canvas) {
  const ctx = canvas.getContext('2d');
  if (!ctx) return;
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

  let points = new Float32Array(0);
  let screenX = new Float32Array(0);
  let screenY = new Float32Array(0);
  let bucket = new Uint8Array(0);
  let width = 0;
  let height = 0;
  let dpr = 1;
  let yaw = 0.8;
  let pitch = PITCH;

  function resize() {
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    width = canvas.clientWidth;
    height = canvas.clientHeight;
    canvas.width = Math.round(width * dpr);
    canvas.height = Math.round(height * dpr);
    // About one point per 30 CSS px², in steps of 500 so small resizes keep the cloud
    const count = Math.max(3000, Math.min(9000, Math.round((width * height) / 30 / 500) * 500));
    if (points.length !== count * 4) {
      points = samplePoints(count, mulberry32(4));
      screenX = new Float32Array(count);
      screenY = new Float32Array(count);
      bucket = new Uint8Array(count);
    }
    draw();
  }

  function draw() {
    const n = bucket.length;
    const scale = Math.min(width, height) * 0.5 * dpr;
    const cx = (width * dpr) / 2;
    const cy = (height * dpr) / 2;
    const [sinT, cosT] = [Math.sin(TILT), Math.cos(TILT)];
    const [sinY, cosY] = [Math.sin(yaw), Math.cos(yaw)];
    const [sinP, cosP] = [Math.sin(pitch), Math.cos(pitch)];

    for (let i = 0; i < n; i++) {
      const x = points[4 * i];
      const y = points[4 * i + 1];
      const z = points[4 * i + 2];
      // Lean the axis sideways, precess it about the vertical, then tip the view
      const x1 = x * cosT - y * sinT;
      const y1 = x * sinT + y * cosT;
      const x2 = x1 * cosY + z * sinY;
      const z2 = z * cosY - x1 * sinY;
      const y3 = y1 * cosP - z2 * sinP;
      const z3 = y1 * sinP + z2 * cosP;
      const perspective = 4 / (4 - z3);
      screenX[i] = cx + x2 * scale * perspective;
      screenY[i] = cy - y3 * scale * perspective;
      const depth = Math.min(DEPTHS - 1, Math.max(0, Math.floor(((z3 + 1) / 2) * DEPTHS)));
      bucket[i] = (points[4 * i + 3] > 0 ? 0 : DEPTHS) + depth;
    }

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    // Additive blending: dense regions glow, and draw order stops mattering
    ctx.globalCompositeOperation = 'lighter';
    for (let b = 0; b < 2 * DEPTHS; b++) {
      const [red, green, blue] = COLORS[b < DEPTHS ? 0 : 1];
      const t = (b % DEPTHS) / (DEPTHS - 1); // 0 at the back, 1 at the front
      ctx.fillStyle = `rgba(${red}, ${green}, ${blue}, ${0.18 + 0.6 * t})`;
      const size = (0.9 + 1.3 * t) * dpr;
      for (let i = 0; i < n; i++) {
        if (bucket[i] === b) ctx.fillRect(screenX[i] - size / 2, screenY[i] - size / 2, size, size);
      }
    }

    // The nucleus, where the nodal planes meet
    const glow = ctx.createRadialGradient(cx, cy, 0, cx, cy, 7 * dpr);
    glow.addColorStop(0, 'rgba(255, 255, 255, 0.9)');
    glow.addColorStop(1, 'rgba(255, 255, 255, 0)');
    ctx.fillStyle = glow;
    ctx.fillRect(cx - 7 * dpr, cy - 7 * dpr, 14 * dpr, 14 * dpr);
    ctx.globalCompositeOperation = 'source-over';
  }

  // Animate only while on screen, in a visible tab, and motion is welcome
  let visible = false;
  let running = false;
  let frameId = 0;
  let last = 0;

  function frame(now) {
    if (last) yaw += ((now - last) / PERIOD) * 2 * Math.PI;
    last = now;
    draw();
    frameId = requestAnimationFrame(frame);
  }

  function update() {
    const shouldRun = visible && !document.hidden && !reducedMotion.matches;
    if (shouldRun && !running) {
      running = true;
      last = 0;
      frameId = requestAnimationFrame(frame);
    } else if (!shouldRun && running) {
      running = false;
      cancelAnimationFrame(frameId);
    }
  }

  new IntersectionObserver(([entry]) => {
    visible = entry.isIntersecting;
    update();
  }).observe(canvas);
  document.addEventListener('visibilitychange', update);
  reducedMotion.addEventListener('change', update);
  new ResizeObserver(resize).observe(canvas);

  // Drag to turn it (with reduced motion too: the reader moves it, not the page)
  let drag = null;
  canvas.addEventListener('pointerdown', (e) => {
    drag = { x: e.clientX, y: e.clientY };
    canvas.setPointerCapture(e.pointerId);
  });
  canvas.addEventListener('pointermove', (e) => {
    if (!drag) return;
    yaw += (e.clientX - drag.x) * 0.008;
    pitch = Math.max(-1.2, Math.min(1.2, pitch + (e.clientY - drag.y) * 0.008));
    drag = { x: e.clientX, y: e.clientY };
    if (!running) draw();
  });
  const endDrag = () => (drag = null);
  canvas.addEventListener('pointerup', endDrag);
  canvas.addEventListener('pointercancel', endDrag);
}
