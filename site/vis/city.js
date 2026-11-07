/* nobody fm, the city visualiser as an embeddable module (issue #247): the city of data at night, seen from the street, drawn into
   whatever 2D context the caller hands it. the playing tower stands in the middle and is the meter: each floor reads the band at its
   height (lows at the foot, highs at the crown), its crown flares on a kick, three searchlights on it sweep the sky and flare on an
   onset. the front row of buildings is the spectrum (32 bands, windows lit up to the level, a beacon on the roof at the held peak),
   a far skyline is drawn from the track (the same track, the same skyline), the street grid runs to a horizon the bass lights, and
   the wave rides above the street. the caller owns the loop (the studio game at 15 to 30 fps, the city theme when its 3D scene is
   not there): no requestAnimationFrame, no DOM, no audio, no network. freqBytes and timeBytes are an analyser's byte arrays; all
   zeros is the radio off, and gets the idle look: the city asleep, a window or two changing, the beacon blinking, the lights
   drifting low. skyline() is the front row on its own, which the city theme also draws as its card's analyser. MIT, like the rest
   of the site. nobody who built it can hear: every line here is a picture of numbers. */
export const info = { context: '2d', w: 512, h: 288 };

const NIGHT = { bg0: '#020309', bg1: '#070A1C', haze: '#2A0F4A', cyan: '#19F0FF', magenta: '#FF2BD6', violet: '#8B5CF6', green: '#B4FF39', ink: '#E8F1FF', panel: '#080B1A' };
// the second scheme (the cheat code's sunset): amber and magenta over violet
const SUNSET = { bg0: '#0B0410', bg1: '#24092A', haze: '#5A1A3A', cyan: '#FFB020', magenta: '#FF2BD6', violet: '#FF6A3D', green: '#19F0FF', ink: '#FFF1E0', panel: '#140812' };

function hash(n) { const s = Math.sin(n * 12.9898) * 43758.5453; return s - Math.floor(s); }
function seedOf(text) { let h = 2166136261; const s = String(text || 'nobody'); for (let i = 0; i < s.length; i++) { h ^= s.charCodeAt(i); h = Math.imul(h, 16777619); } return (h >>> 0) / 4294967296; }
function rgba(hex, a) { const n = parseInt(hex.slice(1), 16); return 'rgba(' + (n >> 16) + ',' + ((n >> 8) & 255) + ',' + (n & 255) + ',' + a + ')'; }

/* the front row: one building per band, its windows lit up to the level, a mast and a beacon at the held peak. vals and peaks are
   0..1 per band; box is { x, y, w, h } (the street line is y + h); opts: { scheme, now (s), still, flip }. returns nothing */
export function skyline(g, vals, peaks, box, opts) {
  opts = opts || {};
  const P = opts.scheme === 'sunset' ? SUNSET : NIGHT, n = vals.length, per = box.w / n, bw = Math.max(3, per * 0.72);
  const tick = opts.still ? 0 : Math.floor((opts.now || 0) * 4);
  const grad = g.createLinearGradient(0, box.y + box.h, 0, box.y); grad.addColorStop(0, P.cyan); grad.addColorStop(0.55, P.violet); grad.addColorStop(1, P.magenta);
  const cols = bw >= 12 ? 3 : bw >= 7 ? 2 : 1, ww = Math.max(1.5, bw / (cols * 2 + 1)), wh = Math.max(2, Math.min(4, box.h / 40)), step = wh * 2;
  const base = box.y + box.h;
  g.save();
  if (opts.flip) { g.translate(0, 2 * box.y + box.h); g.scale(1, -1); }
  for (let b = 0; b < n; b++) {
    const hgt = Math.max(0, Math.pow(vals[b], 0.8) * box.h), x = box.x + b * per + (per - bw) / 2;
    if (hgt > 2) {
      g.fillStyle = rgba(P.panel, 0.92); g.fillRect(x, base - hgt, bw, hgt);
      g.shadowColor = rgba(P.cyan, 0.6); g.shadowBlur = 8;
      g.strokeStyle = grad; g.lineWidth = 1; g.strokeRect(x + 0.5, base - hgt + 0.5, bw - 1, hgt - 1);
      g.shadowBlur = 0; g.fillStyle = grad;
      let row = 0;
      for (let y = base - step; y > base - hgt + 2; y -= step, row++) {
        for (let k = 0; k < cols; k++) { if (hash(b * 31 + row * 7 + k * 13 + tick * 3) < 0.28) continue; g.fillRect(x + ww * (1 + k * 2), y, ww, wh); }
      }
    }
    const pk = peaks ? peaks[b] : 0;
    if (pk * box.h > hgt + 3) {
      const y = base - pk * box.h;
      g.shadowColor = rgba(P.magenta, 0.9); g.shadowBlur = 8; g.fillStyle = P.magenta;
      g.fillRect(x + bw / 2 - 1.5, y - 3, 3, 3); g.fillRect(x + bw / 2 - 0.5, y, 1, Math.max(0, base - hgt - y));
      g.shadowBlur = 0;
    }
  }
  g.restore();
}

export function create(opts) {
  opts = opts || {};
  let W = info.w, H = info.h, track = null, scheme = opts.scheme === 'sunset' || opts.scheme === 'amber' ? 'sunset' : 'night', seed = seedOf('nobody');
  const still = !!opts.reducedMotion, sr = opts.sampleRate || 48000;
  const FRONT = 32, FLOORS = 16;
  const front = new Float32Array(FRONT), peaks = new Float32Array(FRONT), peakAt = new Float32Array(FRONT), floors = new Float32Array(FLOORS), prev = new Float32Array(64);
  const M = { kick: 0, onset: 0, flux: 0.02, bass: 0, bassMean: 0, sweep: 0, sweepV: 0.25, lastKick: -9, lastOnset: -9, high: 0, live: false, wakeAt: -9 };
  let lastT = null, far = [];

  // the far skyline: the same track, the same skyline (its slug is the seed), so a track change is a change of district
  function district() {
    far = []; let x = -4;
    while (x < info.w + 4) { const w = 10 + hash(seed * 997 + x) * 22, h = 18 + Math.pow(hash(seed * 131 + x * 3.1), 1.6) * 62; far.push({ x: x, w: w, h: h, lit: hash(seed * 71 + x) }); x += w + 1 + hash(x + seed) * 3; }
  }
  district();
  // log-spaced bands from 60 Hz to 16 kHz over however many bins the analyser has, max in each
  function bandsOf(freq, n, out, k) {
    const bins = freq.length, hz = sr / 2 / bins; let any = false;
    for (let b = 0; b < n; b++) {
      const f0 = 60 * Math.pow(16000 / 60, b / n), f1 = 60 * Math.pow(16000 / 60, (b + 1) / n);
      const i0 = Math.max(0, Math.floor(f0 / hz)), i1 = Math.min(bins - 1, Math.max(i0, Math.ceil(f1 / hz)));
      let m = 0; for (let i = i0; i <= i1; i++) if (freq[i] > m) m = freq[i];
      const v = m / 255; if (v > 0) any = true;
      out[b] += (v - out[b]) * (v > out[b] ? k[0] : k[1]);
    }
    return any;
  }
  // the kick (the bass over its running mean) and the onset (the spectral flux over its mean): envelopes, not sounds
  function beats(freq, dt, t) {
    const bins = freq.length, step = Math.max(1, Math.floor(bins / 64));
    let flux = 0, hi = 0, lo = 0;
    for (let i = 0; i < 64; i++) { const v = (freq[Math.min(bins - 1, i * step)] || 0) / 255; const d = v - prev[i]; if (d > 0) flux += d; prev[i] = v; if (i >= 38) hi += v; }
    const loBins = Math.max(1, Math.round(150 / (sr / 2 / bins))); for (let i = 0; i < loBins; i++) lo += (freq[i] || 0) / 255; lo /= loBins;
    M.bass += (lo - M.bass) * 0.5; M.high += (hi / 26 - M.high) * Math.min(1, dt / 0.08);
    M.flux += (flux - M.flux) * Math.min(1, dt / 0.6); M.bassMean += (M.bass - M.bassMean) * Math.min(1, dt / 0.5);
    if (M.bass - M.bassMean > 0.07 && M.bass > 0.25 && t - M.lastKick > 0.18) { M.kick = 1; M.lastKick = t; }
    if (flux > M.flux * 1.7 + 0.15 && t - M.lastOnset > 0.22) { M.onset = 1; M.lastOnset = t; M.sweepV = still ? 0 : 0.25 + 1.2 * Math.min(1, flux / 4); }
    M.kick *= Math.exp(-dt / 0.16); M.onset *= Math.exp(-dt / 0.4);
    M.sweepV += (0.25 - M.sweepV) * Math.min(1, dt / 1.2);
  }

  function draw(ctx, freq, time, t) {
    t = t || 0;
    const dt = lastT == null ? 1 / 30 : Math.min(0.2, Math.max(0, t - lastT)); lastT = t;
    const P = scheme === 'sunset' ? SUNSET : NIGHT;
    const live = !!(freq && freq.length) && bandsOf(freq, FRONT, front, [0.6, 0.25]);
    if (live) { bandsOf(freq, FLOORS, floors, [0.7, 0.2]); beats(freq, dt, t); if (!M.live) M.wakeAt = t; }
    else { for (let i = 0; i < FLOORS; i++) floors[i] *= 0.9; for (let i = 0; i < FRONT; i++) front[i] *= 0.9; M.kick *= 0.9; M.onset *= 0.9; M.high *= 0.9; M.bass *= 0.9; M.sweepV = 0.06; }
    M.live = live;
    if (!still) M.sweep += M.sweepV * dt;
    for (let b = 0; b < FRONT; b++) { if (front[b] > peaks[b]) { peaks[b] = front[b]; peakAt[b] = t; } else if (t - peakAt[b] > 0.15) peaks[b] = Math.max(0, peaks[b] - dt * 0.9); }
    ctx.save();
    ctx.setTransform(1, 0, 0, 1, 0, 0); ctx.globalAlpha = 1; ctx.shadowBlur = 0;
    ctx.scale(W / info.w, H / info.h);
    sky(ctx, P, t);
    lights(ctx, P, live);
    farCity(ctx, P, t, live);
    street(ctx, P, t);
    tower(ctx, P, t, live);
    skyline(ctx, front, peaks, { x: 6, y: 168, w: 500, h: 72 }, { scheme: scheme, now: t, still: still || !live });
    wave(ctx, P, time, live);
    ctx.restore();
  }
  const HORIZON = 186;
  function sky(ctx, P, t) {
    const g = ctx.createLinearGradient(0, 0, 0, HORIZON);
    g.addColorStop(0, P.bg0); g.addColorStop(1, P.bg1);
    ctx.fillStyle = g; ctx.fillRect(0, 0, info.w, info.h);
    // the haze up and to the right, and the horizon band the bass lights
    const hz = ctx.createRadialGradient(380, 40, 0, 380, 40, 260); hz.addColorStop(0, rgba(P.haze, 0.55)); hz.addColorStop(1, rgba(P.haze, 0));
    ctx.fillStyle = hz; ctx.fillRect(0, 0, info.w, HORIZON);
    const hb = ctx.createLinearGradient(0, HORIZON - 26, 0, HORIZON + 4); hb.addColorStop(0, rgba(P.magenta, 0)); hb.addColorStop(1, rgba(P.magenta, 0.10 + 0.32 * M.bass));
    ctx.fillStyle = hb; ctx.fillRect(0, HORIZON - 26, info.w, 30);
  }
  function farCity(ctx, P, t, live) {
    const slow = Math.floor(t / (live ? 1.5 : 4));
    for (let i = 0; i < far.length; i++) {
      const b = far[i], top = HORIZON - b.h;
      ctx.fillStyle = rgba(P.panel, 0.95); ctx.fillRect(b.x, top, b.w, b.h);
      ctx.fillStyle = rgba(P.violet, 0.35); ctx.fillRect(b.x, top, b.w, 1);
      // the windows: a few lit, changing slowly; the ones near the playing tower shimmer with the highs
      const near = Math.max(0, 1 - Math.abs(b.x + b.w / 2 - 256) / 150), shimmer = live && !still ? near * Math.min(1, M.high * 2.4) : 0;
      for (let y = top + 4; y < HORIZON - 3; y += 5) for (let x = b.x + 2; x < b.x + b.w - 2; x += 4) {
        const r = hash(x * 3.7 + y * 1.3 + seed * 50 + slow * (shimmer > 0.05 ? 0 : 1) + (shimmer > 0.05 ? Math.floor(t * 8) : 0));
        const on = r < (live ? 0.16 + b.lit * 0.1 + shimmer * 0.35 : 0.05);
        if (on) { ctx.fillStyle = hash(x + y) < 0.5 ? rgba(P.cyan, 0.55) : rgba(P.violet, 0.6); ctx.fillRect(x, y, 2, 2); }
      }
    }
  }
  // the street grid in perspective from the horizon down, scrolling toward the viewer
  function street(ctx, P, t) {
    ctx.fillStyle = P.bg0; ctx.fillRect(0, HORIZON, info.w, info.h - HORIZON);
    ctx.lineWidth = 1;
    for (let i = -14; i <= 14; i++) { ctx.strokeStyle = rgba(i % 5 === 0 ? P.violet : P.cyan, i % 5 === 0 ? 0.5 : 0.22); ctx.beginPath(); ctx.moveTo(256 + i * 10, HORIZON); ctx.lineTo(256 + i * 70, info.h); ctx.stroke(); }
    const run = still ? 0 : (t * 0.6) % 1;
    for (let k = 0; k < 8; k++) { const z = (k + run) / 8, y = HORIZON + Math.pow(z, 2.2) * (info.h - HORIZON); ctx.strokeStyle = rgba(P.cyan, 0.08 + 0.3 * z); ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(info.w, y); ctx.stroke(); }
  }
  // the playing tower: sixteen floors, each the band at its height; the crown flares and lifts on the kick; the beacon on top
  const TX = 232, TW = 48, FH = 9;
  function tower(ctx, P, t, live) {
    const lift = M.kick * 3, base = HORIZON + 2, top = base - FLOORS * FH - lift;
    ctx.fillStyle = P.panel; ctx.fillRect(TX - 2, top - 2, TW + 4, base - top + 2);
    for (let f = 0; f < FLOORS; f++) {
      const v = floors[f], y = base - (f + 1) * FH - (f === FLOORS - 1 ? lift : 0);
      const lvl = live ? v : 0.06 + 0.04 * Math.sin(t * 0.8 + f);
      const k = Math.min(1, 0.12 + 1.9 * lvl * lvl + (f >= FLOORS - 2 ? M.kick * 0.9 : 0));
      const col = f < FLOORS * 0.4 ? P.cyan : f < FLOORS * 0.75 ? P.violet : P.magenta;
      ctx.fillStyle = rgba(col, 0.08 + 0.3 * k); ctx.fillRect(TX, y, TW, FH - 2);
      ctx.shadowColor = col; ctx.shadowBlur = 10 * k; ctx.strokeStyle = k > 0.75 ? P.ink : rgba(col, 0.35 + 0.65 * k); ctx.lineWidth = 1;
      ctx.strokeRect(TX + 0.5, y + 0.5, TW - 1, FH - 3);
      ctx.shadowBlur = 0;
    }
    const blink = live || Math.floor(t * 1.2) % 2 === 0;
    if (blink) { ctx.shadowColor = P.green; ctx.shadowBlur = 10; ctx.fillStyle = P.green; ctx.fillRect(TX + TW / 2 - 2, top - 8, 4, 4); ctx.shadowBlur = 0; }
    // the beam straight up from the crown
    const bm = ctx.createLinearGradient(0, top - 8, 0, 0); bm.addColorStop(0, rgba(P.magenta, 0.35 + 0.25 * M.bass)); bm.addColorStop(1, rgba(P.magenta, 0));
    ctx.fillStyle = bm; ctx.fillRect(TX + TW / 2 - 1.5, 0, 3, top - 8);
  }
  // three searchlights from the crown: cones that sweep, brighter with an onset; drawn first, so the tower and the city stand in them
  function lights(ctx, P, live) {
    const ox = TX + TW / 2, oy = HORIZON + 2 - FLOORS * FH - 6;
    const amp = live ? 0.1 + 0.2 * M.bass + 0.45 * M.onset : 0.04;
    ctx.save(); ctx.globalCompositeOperation = 'lighter';
    [0, 2.094, 4.189].forEach(function (ph, i) {
      const a = -Math.PI / 2 + 0.75 * Math.sin(M.sweep + ph), len = 330, spread = 0.13;
      const g = ctx.createLinearGradient(ox, oy, ox + Math.cos(a) * len, oy + Math.sin(a) * len);
      const col = i === 1 ? P.magenta : P.cyan;
      g.addColorStop(0, rgba(col, amp)); g.addColorStop(1, rgba(col, 0));
      ctx.fillStyle = g; ctx.beginPath(); ctx.moveTo(ox, oy);
      ctx.lineTo(ox + Math.cos(a - spread) * len, oy + Math.sin(a - spread) * len); ctx.lineTo(ox + Math.cos(a + spread) * len, oy + Math.sin(a + spread) * len);
      ctx.closePath(); ctx.fill();
    });
    ctx.restore();
  }
  // the wave as a ribbon over the street; flat when the radio is off
  function wave(ctx, P, time, live) {
    const n = time && time.length ? time.length : 0, y0 = 258, amp = 14;
    let peak = 0;
    if (live && n) for (let i = 0; i < n; i += 8) peak = Math.max(peak, Math.abs(time[i] - 128));
    const gain = peak > 4 ? Math.min(3, 100 / peak) : 1;
    ctx.strokeStyle = P.magenta; ctx.lineWidth = 1.4; ctx.shadowColor = P.magenta; ctx.shadowBlur = 6;
    ctx.beginPath();
    for (let i = 0; i <= 128; i++) {
      const v = live && n ? (time[Math.floor(i / 128 * (n - 1))] - 128) / 128 * gain : 0;
      const x = 6 + i * (500 / 128), y = y0 - Math.max(-1, Math.min(1, v)) * amp;
      if (i) ctx.lineTo(x, y); else ctx.moveTo(x, y);
    }
    ctx.stroke(); ctx.shadowBlur = 0;
  }
  return {
    draw: draw,
    setTrack: function (entry) { track = entry || null; seed = seedOf(track ? track.slug || track.title : 'nobody'); district(); },
    resize: function (w, h) { W = w || info.w; H = h || info.h; },
    setScheme: function (name) { scheme = name === 'sunset' || name === 'amber' ? 'sunset' : 'night'; },
    state: function () { return { live: M.live, kick: +M.kick.toFixed(3), onset: +M.onset.toFixed(3), floors: Array.from(floors, function (v) { return +v.toFixed(2); }), track: track ? track.slug || null : null }; },
    destroy: function () { far = []; track = null; }
  };
}
