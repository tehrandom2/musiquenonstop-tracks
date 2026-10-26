/* nobody fm, the phosphor visualiser as an embeddable module (issue #247): the CRT's typed-cell bars, the scope and the waterfall,
   drawn into whatever 2D context the caller hands it. the caller owns the loop (the studio game at 15 to 30 fps, the phosphor
   theme's hidden mode at the page's rate): no requestAnimationFrame, no DOM, no audio, no network. every cell is a rectangle,
   so it looks the same without the theme's font. freqBytes and timeBytes are an analyser's byte arrays; all zeros is the radio
   off, and gets the idle look: NO CARRIER, a slow sweep, the cursor. MIT, like the rest of the site. nobody who built it can hear. */
export const info = { context: '2d', w: 512, h: 288 };

const INK = { glass: '#050705', p1: '#41FF6A', mid: '#22B04A', dim: '#146A2E', ghost: '#0C3A1B', hot: '#D9FFE0', amber: '#FFB000' };
const AMBER = { glass: '#070502', p1: '#FFB000', mid: '#B27B00', dim: '#6A4A06', ghost: '#3A2A08', hot: '#FFE6A8', amber: '#41FF6A' };

// the 5 x 8 dot font for the few words it writes (upper case, digits, a few marks), rows top to bottom, # lit: its own
const GLYPH = {
  A: '.###.#...##...#######...##...##...##...#', B: '####.#...##...#####.#...##...##...#####.', C: '.###.#...##....#....#....#....#...#.###.',
  D: '####.#...##...##...##...##...##...#####.', E: '######....#....####.#....#....#....#####', F: '######....#....####.#....#....#....#....',
  G: '.###.#...##....#.####...##...##...#.####', H: '#...##...##...#######...##...##...##...#', I: '.###...#....#....#....#....#....#...###.',
  J: '..###...#....#....#....#.#..#.#..#..##..', K: '#...##..#.#.#..##...#.#..#..#.#...##...#', L: '#....#....#....#....#....#....#....#####',
  M: '#...###.###.#.##...##...##...##...##...#', N: '#...###..##.#.##..###...##...##...##...#', O: '.###.#...##...##...##...##...##...#.###.',
  P: '####.#...##...#####.#....#....#....#....', Q: '.###.#...##...##...##.#.##..#.#..#..##.#', R: '####.#...##...#####.#.#..#..#.#...##...#',
  S: '.#####....#.....###.....#....#....#####.', T: '#####..#....#....#....#....#....#....#..', U: '#...##...##...##...##...##...##...#.###.',
  V: '#...##...##...##...##...##...#.#.#...#..', W: '#...##...##...##...##.#.##.#.###.###...#', X: '#...##...#.#.#...#...#.#.#...##...##...#',
  Y: '#...##...#.#.#...#....#....#....#....#..', Z: '#####....#...#...#...#...#....#....#####', '0': '.###.#...##..###.#.###..##...##...#.###.',
  '1': '..#...##....#....#....#....#....#...###.', '2': '.###.#...#....#...#...#...#...#....#####', '3': '#####...#...#.....#.....##...##...#.###.',
  '4': '...#...##..#.#.#..#.#####...#....#....#.', '5': '######....####.....#....#....##...#.###.', '6': '..##..#...#....####.#...##...##...#.###.',
  '7': '#####....#...#...#...#....#....#....#...', '8': '.###.#...##...#.###.#...##...##...#.###.', '9': '.###.#...##...#.####....#....#...#..##..',
  '.': '...............................##...##..', '-': '...............#####....................', ':': '......##...##.........##...##...........',
  '>': '#.....#.....#.....#...#...#...#.........', '/': '....#...#....#...#...#....#...#.........', ' ': '........................................'
};

export function create(opts) {
  opts = opts || {};
  let W = info.w, H = info.h, track = null, scheme = opts.scheme === 'amber' ? AMBER : INK;
  const sr = opts.sampleRate || 48000;
  const BANDS = 32, FALL_ROWS = 14;
  const peaks = new Float32Array(BANDS), vals = new Float32Array(BANDS), fall = [];
  let lastT = null, idleSince = null;

  // the bands: log-spaced from 60 Hz to 16 kHz over however many bins the analyser has
  function bands(freq) {
    const n = freq.length, hz = sr / 2 / n;
    let any = false;
    for (let b = 0; b < BANDS; b++) {
      const f0 = 60 * Math.pow(16000 / 60, b / BANDS), f1 = 60 * Math.pow(16000 / 60, (b + 1) / BANDS);
      const i0 = Math.max(0, Math.floor(f0 / hz)), i1 = Math.min(n - 1, Math.max(i0, Math.ceil(f1 / hz)));
      let m = 0; for (let i = i0; i <= i1; i++) if (freq[i] > m) m = freq[i];
      const v = m / 255; if (v > 0) any = true;
      vals[b] = vals[b] + (v - vals[b]) * (v > vals[b] ? 0.6 : 0.25);
    }
    return any;
  }
  function text(ctx, s, x, y, dot, col) {
    ctx.fillStyle = col;
    s = String(s).toUpperCase();
    for (let k = 0; k < s.length; k++) {
      const g = GLYPH[s[k]] || GLYPH[' '];
      for (let r = 0; r < 8; r++) for (let c = 0; c < 5; c++) if (g[r * 5 + c] === '#') ctx.fillRect(x + k * 6 * dot + c * dot, y + r * dot, dot - (dot > 1 ? 0.5 : 0), dot - (dot > 1 ? 0.5 : 0));
    }
  }
  function glow(ctx, on, col, blur) { ctx.shadowColor = on ? col : 'transparent'; ctx.shadowBlur = on ? blur : 0; }

  function draw(ctx, freq, time, t) {
    t = t || 0;
    const dt = lastT == null ? 1 / 30 : Math.min(0.2, Math.max(0, t - lastT)); lastT = t;
    const live = freq && freq.length ? bands(freq) : false;
    const S = scheme;
    // persistence: the last frame thinned, not wiped, so what moves leaves a short trail on the glass
    ctx.save();
    ctx.globalAlpha = 1; ctx.shadowBlur = 0;
    ctx.fillStyle = S.glass; ctx.globalAlpha = live ? 0.55 : 0.35; ctx.fillRect(0, 0, W, H); ctx.globalAlpha = 1;
    const sx = W / info.w, sy = H / info.h; ctx.scale(sx, sy);
    // the header: the station and the track
    text(ctx, 'NOBODY FM 88.8', 12, 10, 1, S.mid);
    const title = track ? String(track.title || track.slug || '').slice(0, 30) : '';
    if (title) text(ctx, title, 500 - title.length * 6, 10, 1, S.p1);
    if (!live) idle(ctx, t, S); else { idleSince = null; meter(ctx, dt, S); scope(ctx, time, S); waterfall(ctx, S); }
    // scanlines, every third row
    ctx.shadowBlur = 0; ctx.fillStyle = 'rgba(0,0,0,0.22)';
    for (let y = 0; y < info.h; y += 3) ctx.fillRect(0, y, info.w, 1);
    ctx.restore();
  }
  function meter(ctx, dt, S) {
    const x0 = 12, top = 30, rows = 14, ch = 7, cw = 12, gap = 3;
    for (let b = 0; b < BANDS; b++) {
      const lit = Math.round(vals[b] * rows);
      peaks[b] = Math.max(lit, peaks[b] - dt * 9);
      const x = x0 + b * (cw + gap);
      for (let r = 0; r < rows; r++) {
        const y = top + (rows - 1 - r) * (ch + 2);
        if (r < lit) { glow(ctx, true, S.p1, 6); ctx.fillStyle = r > rows * 0.8 ? S.hot : S.p1; }
        else { glow(ctx, false); ctx.fillStyle = S.ghost; }
        ctx.fillRect(x, y, cw, ch);
      }
      const pr = Math.min(rows - 1, Math.round(peaks[b]));
      if (pr > 0) { glow(ctx, true, S.hot, 8); ctx.fillStyle = S.hot; ctx.fillRect(x, top + (rows - 1 - pr) * (ch + 2), cw, 2); }
    }
    glow(ctx, false);
  }
  function scope(ctx, time, S) {
    const y0 = 172, amp = 16;
    ctx.strokeStyle = S.p1; ctx.lineWidth = 1.5; glow(ctx, true, S.p1, 6);
    ctx.beginPath();
    const n = time && time.length ? time.length : 0;
    for (let i = 0; i <= 160; i++) {
      const v = n ? (time[Math.floor(i / 160 * (n - 1))] - 128) / 128 : 0;
      const x = 12 + i * (488 / 160), y = y0 + v * amp;
      if (i) ctx.lineTo(x, y); else ctx.moveTo(x, y);
    }
    ctx.stroke(); glow(ctx, false);
  }
  function waterfall(ctx, S) {
    const row = new Float32Array(BANDS); for (let b = 0; b < BANDS; b++) row[b] = vals[b];
    fall.push(row); while (fall.length > FALL_ROWS) fall.shift();
    const top = 196, ch = 5, cw = 15;
    for (let r = 0; r < fall.length; r++) {
      const y = top + (FALL_ROWS - fall.length + r) * (ch + 1);
      for (let b = 0; b < BANDS; b++) {
        const v = Math.pow(fall[r][b], 1.8);
        if (v < 0.05) continue;
        ctx.globalAlpha = Math.min(1, 0.15 + v) * (0.35 + 0.65 * (r + 1) / fall.length);
        ctx.fillStyle = v > 0.7 ? S.hot : v > 0.35 ? S.p1 : S.mid;
        ctx.fillRect(12 + b * cw, y, cw - 2, ch);
      }
    }
    ctx.globalAlpha = 1;
  }
  // the radio is off: NO CARRIER, a slow bright sweep down the glass, the cursor at terminal cadence, the ghost of the meter
  function idle(ctx, t, S) {
    if (idleSince == null) idleSince = t;
    fall.length = 0; for (let b = 0; b < BANDS; b++) { vals[b] *= 0.9; peaks[b] = 0; }
    for (let b = 0; b < BANDS; b++) for (let r = 0; r < 14; r++) { ctx.fillStyle = S.ghost; ctx.fillRect(12 + b * 15, 30 + r * 9, 12, 7); }
    const sweep = ((t * 0.25) % 1) * info.h;
    const g = ctx.createLinearGradient(0, sweep - 30, 0, sweep);
    g.addColorStop(0, 'rgba(65,255,106,0)'); g.addColorStop(1, S === AMBER ? 'rgba(255,176,0,0.10)' : 'rgba(65,255,106,0.10)');
    ctx.fillStyle = g; ctx.fillRect(0, sweep - 30, info.w, 30);
    glow(ctx, true, S.p1, 8);
    text(ctx, 'NO CARRIER', 256 - 30 * 3, 140, 3, S.p1);
    if (Math.floor(t / 0.53) % 2 === 0) { ctx.fillStyle = S.p1; ctx.fillRect(256 + 30 * 3 + 6, 140, 15, 24); }
    glow(ctx, false);
    text(ctx, '> WAITING FOR A SIGNAL', 256 - 22 * 3, 186, 1, S.mid);
  }
  return {
    draw: draw,
    setTrack: function (entry) { track = entry || null; },
    resize: function (w, h) { W = w || info.w; H = h || info.h; },
    setScheme: function (name) { scheme = name === 'amber' ? AMBER : INK; },
    destroy: function () { fall.length = 0; track = null; }
  };
}
