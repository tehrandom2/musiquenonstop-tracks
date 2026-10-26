/* nobody fm, the campfire's visualiser as an embeddable module (issue #247). MIT, like the rest of the site.
   the camp at night, flat and painted: a deep blue sky over the curve of a small planet, the low sun's glow on the right, pines, and
   a fire in the middle. it answers the music the way the theme's sky and fire do (design 12.18, issue #240): the low end widens and
   warms the dust band and stands the flames taller, the middle lifts the curtains of light, the highs ripple them and quicken the
   stars' twinkle, a kick throws a burst of sparks and makes the playing signal breathe, and the light on the trees swells with the
   loudness. all-zero bytes are the radio off: the fire burns low on its own, a few embers drift, the sky breathes slowly.
   the caller owns the loop: draw(ctx, freqBytes, timeBytes, t) once a frame (t in seconds). no requestAnimationFrame, no DOM, no
   audio, no network. the campfire theme draws its no-WebGL stand-in with this same module. nobody who built it could hear it. */

export const info = { context: '2d', w: 512, h: 288 };

const W = 512, H = 288;
const FIRE = { x: 256, y: 246 };

// a small seeded generator, so the sky is the same sky every time
function rng(seed) { let s = seed >>> 0 || 1; return function () { s ^= s << 13; s >>>= 0; s ^= s >>> 17; s ^= s << 5; s >>>= 0; return s / 4294967296; }; }
// value noise in one dimension, smooth, -1..1
function noise1(x, seed) {
  const i = Math.floor(x), f = x - i, u = f * f * (3 - 2 * f);
  const h = function (n) { const v = Math.sin((n + seed * 57.13) * 127.1) * 43758.5453; return (v - Math.floor(v)) * 2 - 1; };
  return h(i) * (1 - u) + h(i + 1) * u;
}
function clamp(v, a, b) { return v < a ? a : v > b ? b : v; }
function env(cur, want, dt, up, down) { const tc = want > cur ? up : down; return cur + (want - cur) * (1 - Math.exp(-dt / Math.max(1e-3, tc))); }

/* opts (all optional): { background: false } leaves the canvas clear outside the painted scene's own pixels (it paints the whole
   frame anyway, so this only skips the first clear); { reduced: true } moves much less (no spark bursts, slower everything);
   { caption: false } leaves off the title in the corner (the theme, whose station already shows it). */
export function create(opts) {
  opts = opts || {};
  const reduced = !!opts.reduced;
  let cw = W, ch = H, destroyed = false, title = '', sub = '', last = null;
  const R = rng(0x6a3f21);
  // the stars: upper three quarters of the sky, a few bright ones
  const stars = [];
  for (let i = 0; i < 150; i++) {
    const y = Math.pow(R(), 1.3) * 200;
    stars.push({ x: R() * W, y: y, r: R() < 0.08 ? 1.6 : R() < 0.3 ? 1.1 : 0.7, ph: R() * 6.28, sp: 0.6 + R() * 1.6, warm: R() < 0.2 });
  }
  // the pines: a row on each side, nearer ones bigger
  const pines = [];
  [[18, 150, 1], [362, 500, 1]].forEach(function (side) {
    for (let x = side[0]; x < side[1]; x += 16 + R() * 22) {
      if (Math.abs(x - FIRE.x) < 70) continue;
      pines.push({ x: x, h: 34 + R() * 46, w: 0.36 + R() * 0.12, d: R() });
    }
  });
  pines.sort(function (a, b) { return a.d - b.d; });
  // sparks and embers: one pool
  const P = []; for (let i = 0; i < 160; i++) P.push({ life: 0, max: 1, x: 0, y: 0, vx: 0, vy: 0, spark: false, seed: R() });
  const m = { low: 0, mid: 0, high: 0, loud: 0, avg: [0, 0, 0], bassSlow: 0, pulse: 0, kickHi: false, kickWait: 0, flow: 0, tw: 0, emberAcc: 0, pop: 0, nextPop: 1.2 };

  function spawn(spark, strength) {
    for (let i = 0; i < P.length; i++) {
      const p = P[i]; if (p.life > 0) continue;
      const a = Math.random() * Math.PI * 2, r = Math.random() * 9;
      p.x = FIRE.x + Math.cos(a) * r; p.y = FIRE.y - 6 - Math.random() * 8; p.spark = spark;
      if (spark) { const s = 70 + Math.random() * 90 * (strength || 1), b = -Math.PI / 2 + (Math.random() - 0.5) * 1.3; p.vx = Math.cos(b) * s; p.vy = Math.sin(b) * s; p.max = p.life = 0.5 + Math.random() * 0.6; }
      else { p.vx = (Math.random() - 0.5) * 8; p.vy = -18 - Math.random() * 26; p.max = p.life = 2 + Math.random() * 2.5; }
      return;
    }
  }
  function silent(freq, time) {
    if (freq) for (let i = 0; i < freq.length; i += 5) if (freq[i]) return false;
    if (time) for (let i = 0; i < time.length; i += 7) if (time[i] && time[i] !== 128) return false;
    return true;
  }
  // three bands from the byte spectrum: the low end (the first 6 % of the bins), the middle (to 30 %), the highs (to 80 %)
  function levels(freq) {
    const n = freq ? freq.length : 0; if (!n) return [0, 0, 0];
    const cut = [0, Math.max(2, Math.round(n * 0.06)), Math.round(n * 0.3), Math.round(n * 0.8)], out = [0, 0, 0];
    for (let k = 0; k < 3; k++) { let s = 0; for (let i = cut[k]; i < cut[k + 1]; i++) s += freq[i]; out[k] = s / Math.max(1, cut[k + 1] - cut[k]) / 255; }
    return out;
  }

  function sky(g, t) {
    const sg = g.createLinearGradient(0, 0, 0, H);
    sg.addColorStop(0, '#04060e'); sg.addColorStop(0.45, '#0b1430'); sg.addColorStop(0.78, '#17224c'); sg.addColorStop(1, '#1d1a2c');
    g.fillStyle = sg; g.fillRect(0, 0, W, H);
    // the low sun's glow on the right, breathing very slowly
    const sb = 0.55 + 0.08 * Math.sin(t * 0.07);
    const gl = g.createRadialGradient(430, 232, 4, 430, 232, 190);
    gl.addColorStop(0, 'rgba(255,190,140,' + (0.55 * sb).toFixed(3) + ')'); gl.addColorStop(0.25, 'rgba(240,110,90,' + (0.22 * sb).toFixed(3) + ')'); gl.addColorStop(1, 'rgba(120,40,80,0)');
    g.fillStyle = gl; g.fillRect(240, 42, W - 240, H - 42);
    g.fillStyle = 'rgba(255,236,200,' + (0.9 * sb).toFixed(3) + ')'; g.beginPath(); g.arc(430, 232, 7, 0, Math.PI * 2); g.fill();
  }
  function dustBand(g) {
    // the low end widens and warms it: two soft ellipses along the diagonal (an inner glow and a wide haze), each one radial
    // gradient stretched, so the band costs two fills
    const w = 1 + 0.6 * m.low, warm = m.low, wob = Math.sin(m.flow * 0.3) * 4;
    const c = 'rgba(' + Math.round(150 + 90 * warm) + ',' + Math.round(150 + 30 * warm) + ',' + Math.round(220 - 90 * warm) + ',';
    g.save(); g.globalCompositeOperation = 'lighter';
    [[1, 0.11, 34], [1.5, 0.05, 62]].forEach(function (L) {
      const gr = g.createRadialGradient(0, 0, 0, 0, 0, 1);
      gr.addColorStop(0, c + (L[1] * (1 + warm)).toFixed(3) + ')'); gr.addColorStop(0.55, c + (L[1] * 0.45 * (1 + warm)).toFixed(3) + ')'); gr.addColorStop(1, c + '0)');
      g.save(); g.translate(256, 92 + wob); g.rotate(0.21); g.scale(300 * L[0], L[2] * w); g.fillStyle = gr; g.fillRect(-1, -1, 2, 2); g.restore();
    });
    g.restore();
  }
  // the many small marks (stars, strips, sparks) go out in a few paths, one per alpha step: a canvas on a GPU pays per fill
  const STEPS = 6;
  function buckets() { const b = []; for (let i = 0; i < STEPS; i++) b.push([]); return b; }
  function step(a) { return clamp(Math.round(a * (STEPS - 1)), 0, STEPS - 1); }
  function curtains(g, t) {
    // the curtains of light, upper left: the middle lifts them, the highs ripple them. one gradient down the whole height,
    // each column a strip of it, the strips grouped by their alpha
    const lift = 0.25 + 0.75 * m.mid, rip = m.high, peak = 0.06 + 0.15 * lift, B = buckets();
    for (let x = 20; x < 300; x += 2) {
      const u = (x - 20) / 280;
      const base = 120 - 40 * Math.sin(u * 3.1 + m.flow * 0.15) + 8 * noise1(u * 6 + m.flow * 0.4, 3);
      const top = base - (40 + 50 * lift) * (0.6 + 0.4 * noise1(u * 9 + m.flow * 0.6, 7)) + rip * 6 * Math.sin(x * 0.35 + t * 9);
      const k = (0.5 + 0.5 * noise1(u * 14 + m.flow, 11)) * Math.sin(Math.PI * u);
      if (k * peak <= 0.005) continue;
      B[step(k)].push(x, top, base - top);
    }
    const gr = g.createLinearGradient(0, 10, 0, 160);
    gr.addColorStop(0, 'rgba(120,200,255,0)'); gr.addColorStop(0.45, 'rgba(110,230,190,.9)'); gr.addColorStop(0.75, 'rgba(90,210,170,.55)'); gr.addColorStop(1, 'rgba(90,200,170,0)');
    g.save(); g.globalCompositeOperation = 'lighter'; g.fillStyle = gr;
    for (let b = 1; b < STEPS; b++) {
      const r = B[b]; if (!r.length) continue;
      g.globalAlpha = peak * b / (STEPS - 1); g.beginPath();
      for (let i = 0; i < r.length; i += 3) g.rect(r[i], r[i + 1], 2.2, r[i + 2]);
      g.fill();
    }
    g.restore();
  }
  function starfield(g, kick) {
    const cold = buckets(), warm = buckets();
    for (let i = 0; i < stars.length; i++) {
      const s = stars[i], tw = 0.55 + 0.45 * Math.sin(s.ph + m.tw * s.sp);
      (s.warm ? warm : cold)[step(tw)].push(s);
    }
    [[cold, '225,235,255', 0.3, 0.65], [warm, '255,226,180', 0.35, 0.6]].forEach(function (set) {
      g.fillStyle = 'rgb(' + set[1] + ')';
      for (let b = 0; b < STEPS; b++) {
        const r = set[0][b]; if (!r.length) continue;
        g.globalAlpha = set[2] + set[3] * b / (STEPS - 1); g.beginPath();
        for (let i = 0; i < r.length; i++) g.rect(r[i].x, r[i].y, r[i].r, r[i].r);
        g.fill();
      }
    });
    g.globalAlpha = 1;
    // the playing signal: a warm star with a ring, breathing on the kick
    const sx = 352, sy = 64, br = 1 + 0.9 * kick;
    const gl = g.createRadialGradient(sx, sy, 0, sx, sy, 16 * br);
    gl.addColorStop(0, 'rgba(255,240,200,.95)'); gl.addColorStop(0.25, 'rgba(255,190,110,.5)'); gl.addColorStop(1, 'rgba(255,150,80,0)');
    g.fillStyle = gl; g.fillRect(sx - 20 * br, sy - 20 * br, 40 * br, 40 * br);
    g.strokeStyle = 'rgba(255,210,122,' + (0.35 + 0.4 * kick).toFixed(3) + ')'; g.lineWidth = 1;
    g.beginPath(); g.arc(sx, sy, 9 + 5 * kick, 0, Math.PI * 2); g.stroke();
  }
  function ground(g, glow) {
    // the curve of the small planet, and the clearing round the fire lit by it
    g.fillStyle = '#0a110c'; g.beginPath(); g.arc(W / 2, H + 900, 960, 0, Math.PI * 2); g.fill();
    const gl = g.createRadialGradient(FIRE.x, FIRE.y + 6, 4, FIRE.x, FIRE.y + 6, 150 + 40 * glow);
    gl.addColorStop(0, 'rgba(255,150,70,' + (0.42 * glow).toFixed(3) + ')'); gl.addColorStop(0.5, 'rgba(200,80,30,' + (0.14 * glow).toFixed(3) + ')'); gl.addColorStop(1, 'rgba(120,40,10,0)');
    g.save(); g.beginPath(); g.arc(W / 2, H + 900, 960, 0, Math.PI * 2); g.clip(); g.fillStyle = gl; g.fillRect(0, 160, W, H - 160); g.restore();
  }
  // the pines in three depths, each depth one path; the firelit sides in three steps of light
  pines.forEach(function (p) { p.yb = H + 900 - Math.sqrt(960 * 960 - Math.pow(p.x - W / 2, 2)) + 3; p.near = clamp(1 - Math.abs(p.x - FIRE.x) / 260, 0, 1); p.depth = Math.min(2, Math.floor(p.d * 3)); });
  const PINE = ['rgb(9,15,13)', 'rgb(12,19,16)', 'rgb(16,24,20)'];
  function trees(g, glow) {
    for (let dpt = 0; dpt < 3; dpt++) {
      g.fillStyle = PINE[dpt]; g.beginPath();
      pines.forEach(function (p) {
        if (p.depth !== dpt) return;
        const hw = p.h * p.w;
        for (let k = 0; k < 3; k++) { const ty = p.yb - p.h * (0.35 + k * 0.3), by = p.yb - p.h * k * 0.27, ww = hw * (1 - k * 0.22); g.moveTo(p.x, ty - p.h * 0.2); g.lineTo(p.x + ww, by); g.lineTo(p.x - ww, by); g.closePath(); }
      });
      g.fill();
      // the side that faces the fire takes its light, more with the loudness
      g.fillStyle = 'rgb(255,140,60)'; g.globalAlpha = clamp((0.1 + 0.4 * glow) * (0.35 + 0.3 * dpt), 0, 1); g.beginPath();
      pines.forEach(function (p) {
        if (p.depth !== dpt || p.near < 0.2) return;
        const hw = p.h * p.w * p.near, side = p.x < FIRE.x ? 1 : -1;
        g.moveTo(p.x, p.yb - p.h * 1.15); g.lineTo(p.x + side * hw, p.yb); g.lineTo(p.x + side * hw * 0.55, p.yb); g.closePath();
      });
      g.fill(); g.globalAlpha = 1;
    }
  }
  function fire(g, t, glow) {
    // the logs, the coals, then the flames: layered teardrops that sway on two noises and stand taller on the low end
    g.fillStyle = '#2a170c';
    g.save(); g.translate(FIRE.x, FIRE.y + 4); g.rotate(0.35); g.fillRect(-26, -3, 52, 6); g.rotate(-0.7); g.fillRect(-26, -3, 52, 6); g.restore();
    const cg = g.createRadialGradient(FIRE.x, FIRE.y + 2, 1, FIRE.x, FIRE.y + 2, 26);
    cg.addColorStop(0, 'rgba(255,210,120,' + (0.9 * glow).toFixed(3) + ')'); cg.addColorStop(1, 'rgba(200,60,10,0)');
    g.fillStyle = cg; g.fillRect(FIRE.x - 30, FIRE.y - 24, 60, 50);
    g.save(); g.globalCompositeOperation = 'lighter';
    const layers = [[1.0, 'rgba(255,80,20,', 0.5, 0], [0.8, 'rgba(255,150,40,', 0.6, 1.7], [0.58, 'rgba(255,215,110,', 0.75, 3.1], [0.34, 'rgba(255,250,220,', 0.9, 4.6]];
    const hgt = 34 + 3 * Math.sin(t * 1.3) + 56 * m.low + 18 * m.pop;
    for (let f = 0; f < 3; f++) {
      const fx = FIRE.x + (f - 1) * 9;
      layers.forEach(function (L) {
        const h = hgt * L[0] * (0.82 + 0.25 * noise1(t * 3.1 + f * 4 + L[3], 5)) * (f === 1 ? 1 : 0.72), w = (12 + 5 * m.low) * L[0] * (f === 1 ? 1 : 0.8);
        const sway = 5 * noise1(t * 1.7 + f * 2.3 + L[3], 9) * L[0];
        const gr = g.createLinearGradient(0, FIRE.y - h, 0, FIRE.y + 4);
        gr.addColorStop(0, L[1] + '0)'); gr.addColorStop(0.5, L[1] + (L[2] * 0.55).toFixed(3) + ')'); gr.addColorStop(1, L[1] + L[2] + ')');
        g.fillStyle = gr;
        g.beginPath(); g.moveTo(fx - w, FIRE.y + 3);
        g.bezierCurveTo(fx - w * 1.1, FIRE.y - h * 0.4, fx + sway - w * 0.3, FIRE.y - h * 0.75, fx + sway, FIRE.y - h);
        g.bezierCurveTo(fx + sway + w * 0.3, FIRE.y - h * 0.75, fx + w * 1.1, FIRE.y - h * 0.4, fx + w, FIRE.y + 3);
        g.closePath(); g.fill();
      });
    }
    g.restore();
  }
  function particles(g, dt, t) {
    const wind = 6 + 4 * Math.sin(t * 0.13), B = buckets();
    for (let i = 0; i < P.length; i++) {
      const p = P[i]; if (p.life <= 0) continue;
      p.life -= dt;
      if (p.spark) { p.vy += 120 * dt; p.vx *= 0.99; }
      else { p.vx += (Math.sin(t * 1.7 + p.seed * 31 + p.y * 0.05) * 14 + wind) * dt; }
      p.x += p.vx * dt; p.y += p.vy * dt;
      B[step(clamp(p.life / p.max, 0, 1))].push(p);
    }
    // hot and bright when young, dimmer and redder as they age: one colour and one alpha per step
    g.save(); g.globalCompositeOperation = 'lighter';
    for (let b = 0; b < STEPS; b++) {
      const r = B[b]; if (!r.length) continue;
      const k = b / (STEPS - 1);
      g.fillStyle = 'rgb(255,' + Math.round(120 + 120 * k * k) + ',' + Math.round(40 + 80 * Math.pow(k, 4)) + ')'; g.globalAlpha = 0.25 + 0.7 * Math.pow(k, 0.8);
      g.beginPath();
      for (let i = 0; i < r.length; i++) { const p = r[i], sz = p.spark ? 1.8 : 1.3; g.rect(p.x - sz / 2, p.y - sz / 2, sz, sz); }
      g.fill();
    }
    g.restore();
  }
  function caption(g) {
    if (!title || opts.caption === false) return;
    g.font = '400 16px "Patrick Hand", "Segoe Print", "Comic Sans MS", cursive';
    const tw = Math.min(300, g.measureText(title).width), sw = sub ? g.measureText(sub).width : 0, w = Math.max(tw, sw) + 18;
    g.fillStyle = 'rgba(11,18,48,.88)'; g.beginPath();
    if (g.roundRect) g.roundRect(10, H - (sub ? 46 : 30), w, sub ? 38 : 22, 10); else g.rect(10, H - (sub ? 46 : 30), w, sub ? 38 : 22);
    g.fill();
    g.fillStyle = '#ffd27a'; g.fillText(title, 19, H - (sub ? 31 : 14), 300);
    if (sub) { g.fillStyle = '#dcc6a2'; g.font = '400 13px "Patrick Hand", "Segoe Print", cursive'; g.fillText(sub, 19, H - 14, 300); }
  }

  return {
    setTrack(entry) {
      entry = entry || {};
      title = String(entry.title || entry.slug || '').replace(/-/g, ' ');
      sub = [entry.bpm ? entry.bpm + ' bpm' : '', entry.key || ''].filter(Boolean).join('  ·  ');
    },
    resize(w, h) { cw = w || W; ch = h || H; },
    destroy() { destroyed = true; },
    draw(g, freq, time, t) {
      if (destroyed || !g) return;
      const dt = last == null ? 1 / 30 : clamp(t - last, 0, 0.1); last = t;
      const off = silent(freq, time), lv = off ? [0, 0, 0] : levels(freq), slow = reduced ? 0.35 : 1;
      // the response is the track moving against its own last few seconds, plus a little of how full it is overall
      const out = [0, 0, 0];
      for (let k = 0; k < 3; k++) { m.avg[k] = env(m.avg[k], lv[k], dt, 4, 4); out[k] = 0.6 * clamp((lv[k] - m.avg[k] - 0.005) / 0.12, 0, 1) + 0.4 * clamp((m.avg[k] - 0.1) / 0.6, 0, 1); }
      const amt = off ? 0 : reduced ? 0.3 : 1;
      m.low = env(m.low, out[0] * amt, dt, 0.35, 1.2); m.mid = env(m.mid, out[1] * amt, dt, 0.45, 1.5); m.high = env(m.high, out[2] * amt, dt, 0.2, 0.8);
      m.loud = env(m.loud, off ? 0 : (lv[0] + lv[1] + lv[2]) / 3, dt, 0.25, 0.8);
      m.bassSlow = env(m.bassSlow, lv[0], dt, 0.6, 0.6);
      const kick = off ? 0 : clamp((lv[0] - m.bassSlow - 0.02) / 0.12, 0, 1);
      m.pulse = env(m.pulse, kick * amt, dt, 0.06, 0.45);
      m.flow += dt * slow * (1 + 1.6 * m.mid); m.tw += dt * slow * (1 + 1.8 * m.high);
      // sparks: a kick throws a burst (at most one every 220 ms); the fire's own pops every second or two; embers all the time
      m.kickWait = Math.max(0, m.kickWait - dt); m.pop = Math.max(0, m.pop - dt * 3);
      if (m.pulse > 0.55 && !m.kickHi && m.kickWait <= 0 && !reduced) { m.kickHi = true; m.kickWait = 0.22; const n = Math.round(5 + m.pulse * 9); for (let i = 0; i < n; i++) spawn(true, 1 + m.pulse); m.pop = Math.max(m.pop, 0.4 * m.pulse); }
      else if (m.pulse < 0.3) m.kickHi = false;
      m.nextPop -= dt; if (m.nextPop <= 0) { m.nextPop = 1 + Math.random() * 2.4; m.pop = Math.max(m.pop, 0.35); for (let i = 0; i < (reduced ? 2 : 6); i++) spawn(true, 0.6); }
      m.emberAcc += dt * slow * (6 + 18 * m.loud + 10 * m.low); while (m.emberAcc >= 1) { m.emberAcc -= 1; spawn(false); }
      const flick = 0.82 + 0.12 * noise1(t * 3.1, 2) + 0.06 * noise1(t * 9.7, 4);
      const glow = clamp(flick * (0.7 + 0.5 * m.loud + 0.35 * m.low) + 0.4 * m.pop, 0.35, 1.4);

      const s = Math.min(cw / W, ch / H), ox = (cw - W * s) / 2, oy = (ch - H * s) / 2;
      g.save();
      g.setTransform(1, 0, 0, 1, 0, 0);
      if (opts.background !== false || ox || oy) { g.fillStyle = '#04060e'; g.fillRect(0, 0, cw, ch); } else g.clearRect(0, 0, cw, ch);
      g.translate(ox, oy); g.scale(s, s);
      g.beginPath(); g.rect(0, 0, W, H); g.clip();
      sky(g, t);
      dustBand(g);
      curtains(g, t);
      starfield(g, m.pulse);
      ground(g, glow);
      trees(g, glow);
      fire(g, t, glow);
      particles(g, dt, t);
      caption(g);
      g.restore();
    }
  };
}
