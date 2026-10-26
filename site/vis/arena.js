/* nobody fm, the arena's visualiser as an embeddable module (issue #247): the same halo, floor and rig the arena theme draws on the
   radio (the engine and the drawing are ./arena-core.js, which the theme loads too), over the arena's dark stage, for a caller that
   owns the loop and copies the canvas. 2D only. no animation frame, no DOM, no audio; the only network is a track's cover, when the
   entry names one on the station.

   import { info, create } from './arena.js';
   const vis = create({ sampleRate: 48000 });        // the analyser's sample rate, so the bands land on the right bins
   vis.setTrack({ slug, title, bpm, cover });         // cover: a drawable (an image, a bitmap, a canvas) or a URL on the station
   vis.draw(ctx2d, freqBytes, timeBytes, seconds);    // every frame; all-zero bytes (the radio off) draw the idle look
   vis.resize(w, h); vis.destroy();

   MIT, like the site. nobody who built it can hear: every value is a number from the bytes. */
import './arena-core.js';

export const info = { context: '2d', w: 512, h: 288 };

export function create(opts) {
  opts = opts || {};
  const core = globalThis.NOBODY_VIS.arena.create({ sampleRate: opts.sampleRate || 48000, reducedMotion: !!opts.reducedMotion });
  let w = info.w, h = info.h, last = null, hue = 285, hue2 = 323, cover = null, coverFor = null, dead = false, shocks = [];
  const dust = [];
  for (let i = 0; i < 40; i++) dust.push({ x: (i * 97.13) % 1, y: (i * 61.7) % 1, z: 0.2 + ((i * 37) % 10) / 12, ph: i * 1.7 });

  function setTrack(entry) {
    entry = entry || {};
    hue = entry.hue != null ? entry.hue : core.hueFor(entry);
    hue2 = entry.hue2 != null ? entry.hue2 : hue + 38;
    const c = entry.cover || null;
    coverFor = c; cover = null;
    if (!c) return;
    if (typeof c !== 'string') { cover = c; return; }
    // a URL: fetched once and decoded off the page; anything that fails leaves the halo without a cover
    if (typeof fetch !== 'function' || typeof createImageBitmap !== 'function') return;
    fetch(c).then(function (r) { if (!r.ok) throw new Error(r.status); return r.blob(); })
      .then(function (b) { return createImageBitmap(b); })
      .then(function (bm) { if (!dead && coverFor === c) cover = bm; })
      .catch(function () { /* no cover: the halo draws its core only */ });
  }

  function draw(ctx, freqBytes, timeBytes, t) {
    if (dead || !ctx) return;
    const dt = last == null ? 1 / 30 : Math.max(0, Math.min(0.1, t - last)); last = t;
    core.feed(freqBytes, timeBytes, dt);
    if (core.newKick) shocks.push({ r: 0, a: 0.3 + core.newKick * 0.45 });
    const g = ctx;
    g.save();
    g.setTransform(1, 0, 0, 1, 0, 0); g.globalCompositeOperation = 'source-over'; g.globalAlpha = 1;
    // the stage: near black, two slow glows in the track's hues lifted by the bass
    g.fillStyle = '#06060b'; g.fillRect(0, 0, w, h);
    g.globalCompositeOperation = 'lighter';
    for (let k = 0; k < 2; k++) {
      const cx = w * (0.5 + 0.34 * Math.sin(t * 0.05 + k * 2.4)), cy = h * (0.38 + 0.2 * Math.cos(t * 0.04 + k * 1.3)), r = Math.max(w, h) * 0.6;
      const gr = g.createRadialGradient(cx, cy, 0, cx, cy, r), kh = k ? hue2 : hue, a = 0.12 + 0.2 * core.bass;
      gr.addColorStop(0, 'hsla(' + kh + ', 95%, 52%, ' + a + ')'); gr.addColorStop(1, 'hsla(' + kh + ', 95%, 40%, 0)');
      g.fillStyle = gr; g.fillRect(0, 0, w, h);
    }
    // dust, rising faster with the bass
    g.fillStyle = 'hsla(' + (hue + 30) + ', 100%, 85%, .5)'; g.beginPath();
    for (const d of dust) {
      d.y -= (0.01 + core.bass * 0.06) * d.z * dt * 3; if (d.y < -0.02) d.y = 1.02;
      const x = (d.x + 0.01 * Math.sin(t * 0.3 + d.ph)) * w, y = d.y * h, s = 0.4 + d.z * (1 + core.kick);
      g.moveTo(x + s, y); g.arc(x, y, s, 0, Math.PI * 2);
    }
    g.fill();
    g.globalCompositeOperation = 'source-over';
    // the show, the whole canvas its region
    const halo = core.drawShow(g, { w: w, h: h, y: h * 0.03, rh: h * 0.97, cx: w / 2, rw: w, top: 0, show: 0.5, hue: hue, hue2: hue2, dim: 1, cover: cover });
    // a shockwave from the halo on every kick
    g.globalCompositeOperation = 'lighter';
    for (const s of shocks) { s.r += dt * (h * 0.9); s.a -= dt * 0.9; if (s.a <= 0) continue; g.strokeStyle = 'hsla(' + (hue + 20) + ', 100%, 72%, ' + s.a * 0.5 + ')'; g.lineWidth = 1 + s.a * 2; g.beginPath(); g.arc(halo.cx, halo.cy, halo.R + halo.len * 0.4 + s.r, 0, Math.PI * 2); g.stroke(); }
    shocks = shocks.filter(function (s) { return s.a > 0; });
    g.restore();
  }

  return {
    draw: draw,
    setTrack: setTrack,
    resize: function (nw, nh) { if (nw > 0 && nh > 0) { w = nw; h = nh; } },
    destroy: function () { dead = true; cover = null; shocks = []; },
    // beyond the interface, for a curious caller: what the engine read
    state: function () { return core.state(); }
  };
}
