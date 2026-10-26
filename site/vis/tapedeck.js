/* nobody fm, the tape deck's visualiser as an embeddable module (issue #247). MIT, like the rest of the site.
   the face of the portable player (design 12.24): the window with the cassette and its reels, the VU needle on its cream face, a
   scope strip and a ladder of level LEDs, on a brushed plate in a graphite body with the orange stripe. the caller owns the loop:
   draw(ctx, freqBytes, timeBytes, t) once a frame with the analyser's bytes (getByteFrequencyData, getByteTimeDomainData) and the
   time in seconds. all-zero bytes are the radio off: the needle rests, the reels stop, one green lamp walks the ladder slowly.
   no requestAnimationFrame, no DOM, no audio, no network. the theme draws its hidden mode with this same module. */

export const info = { context: '2d', w: 512, h: 288 };

const W = 512, H = 288;
// the VU scale is not linear: -20 far left, 0 three quarters of the way, +3 at the right stop
const SCALE = [[-22, -0.04], [-20, 0], [-10, 0.24], [-7, 0.36], [-5, 0.46], [-3, 0.57], [-2, 0.63], [-1, 0.69], [0, 0.76], [1, 0.84], [2, 0.92], [3, 1], [4.2, 1.06]];
function angleOfDb(db) {
  let f = SCALE[SCALE.length - 1][1];
  for (let i = 1; i < SCALE.length; i++) if (db <= SCALE[i][0]) { const a = SCALE[i - 1], b = SCALE[i]; f = a[1] + (b[1] - a[1]) * Math.max(0, (db - a[0]) / (b[0] - a[0])); break; }
  return (-38 + 76 * f) * Math.PI / 180;
}
function rr(g, x, y, w, h, r) {
  r = Math.min(r, w / 2, h / 2);
  g.beginPath(); g.moveTo(x + r, y); g.arcTo(x + w, y, x + w, y + h, r); g.arcTo(x + w, y + h, x, y + h, r); g.arcTo(x, y + h, x, y, r); g.arcTo(x, y, x + w, y, r); g.closePath();
}

/* opts (all optional): { background: true } paints the whole canvas (the game's case); false leaves the margins around the
   letterboxed player clear (the theme's hidden mode, over its bench). { accent: '#ff5b1a' } the stripe and the cue colour. */
export function create(opts) {
  opts = opts || {};
  const bg = opts.background !== false;
  let accent = opts.accent || '#ff5b1a';
  let cw = W, ch = H, title = 'no tape', sub = '', destroyed = false;
  const st = { pos: -22, vel: 0, spin: 0, last: null, peaks: new Float32Array(24), peakT: new Float32Array(24), level: 0, packs: 0.35 };
  const BANDS = 24, SEGS = 9;

  function bands(freq) {
    // 24 bands from the byte spectrum, spaced logarithmically from the bottom bin to about 0.85 of the range
    const out = new Float32Array(BANDS), n = freq ? freq.length : 0;
    if (!n) return out;
    for (let b = 0; b < BANDS; b++) {
      const a = Math.floor(Math.pow(b / BANDS, 2.2) * n * 0.85), z = Math.max(a + 1, Math.floor(Math.pow((b + 1) / BANDS, 2.2) * n * 0.85));
      let m = 0; for (let i = a; i < z && i < n; i++) m = Math.max(m, freq[i]);
      out[b] = m / 255;
    }
    return out;
  }
  function silent(freq, time) {
    if (freq) for (let i = 0; i < freq.length; i += 7) if (freq[i]) return false;
    if (time) for (let i = 0; i < time.length; i += 7) if (time[i] && time[i] !== 128) return false;
    return true;
  }

  return {
    setTrack(entry) {
      entry = entry || {};
      title = String(entry.title || entry.slug || 'no tape').replace(/-/g, ' ');
      sub = [entry.bpm ? entry.bpm + ' bpm' : '', entry.key || ''].filter(Boolean).join('  ');
      st.packs = 0.2 + 0.6 * ((title.length * 7) % 10) / 10;
    },
    resize(w, h) { cw = w || W; ch = h || H; },
    destroy() { destroyed = true; },
    draw(g, freq, time, t) {
      if (destroyed || !g) return;
      const dt = st.last == null ? 0 : Math.max(0, Math.min(0.1, t - st.last)); st.last = t;
      const off = silent(freq, time);
      const bv = bands(freq);
      let loud = 0; for (let b = 0; b < BANDS; b++) loud += bv[b]; loud /= BANDS;
      st.level += (loud - st.level) * Math.min(1, dt * 12);
      // the needle: a damped spring towards the loudness on the VU scale; at rest on the left stop when the radio is off
      const target = off ? -22 : Math.max(-20, Math.min(3, -20 + 23 * Math.pow(Math.min(1, st.level / 0.45), 0.7)));
      const k = Math.min(1, dt * 30);
      st.vel += (target - st.pos) * 0.16 * k * 2; st.vel *= Math.pow(0.74, k * 2); st.pos += st.vel * k * 2;
      st.pos = Math.max(-22, Math.min(4.2, st.pos));
      if (!off) st.spin += dt * (1.8 + st.level * 2);

      const s = Math.min(cw / W, ch / H), ox = (cw - W * s) / 2, oy = (ch - H * s) / 2;
      g.save();
      g.setTransform(1, 0, 0, 1, 0, 0);
      if (bg) { g.fillStyle = '#d6d0c2'; g.fillRect(0, 0, cw, ch); } else g.clearRect(0, 0, cw, ch);
      g.translate(ox, oy); g.scale(s, s);

      // the body and the plate
      g.fillStyle = '#26292d'; rr(g, 4, 4, W - 8, H - 8, 26); g.fill();
      const pl = g.createLinearGradient(0, 16, 0, H - 16); pl.addColorStop(0, '#e6e9eb'); pl.addColorStop(0.55, '#cdd1d5'); pl.addColorStop(1, '#b1b6bb');
      g.fillStyle = pl; rr(g, 16, 16, W - 32, H - 32, 16); g.fill();
      g.save(); rr(g, 16, 16, W - 32, H - 32, 16); g.clip();
      g.fillStyle = 'rgba(255,255,255,0.07)'; for (let y = 17; y < H - 16; y += 2) g.fillRect(16, y, W - 32, 1);
      const sh = g.createLinearGradient(80, 0, 360, 0); sh.addColorStop(0, 'rgba(255,255,255,0)'); sh.addColorStop(0.5, 'rgba(255,255,255,0.22)'); sh.addColorStop(1, 'rgba(255,255,255,0)');
      g.fillStyle = sh; g.fillRect(16, 16, W - 32, H - 32);
      g.fillStyle = accent; g.fillRect(16, H - 30, W - 32, 5);
      g.restore();

      // the window and the cassette inside it
      g.fillStyle = '#16181a'; rr(g, 30, 30, 226, 146, 10); g.fill();
      g.fillStyle = '#34383e'; rr(g, 40, 38, 206, 130, 9); g.fill();
      g.fillStyle = '#f1e8d3'; rr(g, 54, 46, 178, 56, 4); g.fill();
      g.fillStyle = accent; g.fillRect(58, 50, 48, 48);
      g.fillStyle = '#dca834'; g.fillRect(58, 86, 48, 5);
      g.fillStyle = '#2a2118'; g.font = '15px "Permanent Marker", "Marker Felt", "Comic Sans MS", sans-serif'; g.textBaseline = 'alphabetic';
      let tl = title; while (tl.length > 4 && g.measureText(tl).width > 116) tl = tl.slice(0, -2);
      if (tl !== title) tl = tl.replace(/\s*$/, '') + '...';
      g.fillText(tl, 112, 72);
      g.fillStyle = '#5d4f3a'; g.font = '10px "IBM Plex Mono", monospace'; g.fillText(sub, 112, 90);
      g.fillStyle = '#121315'; g.beginPath(); g.moveTo(92, 112); g.lineTo(196, 112); g.lineTo(206, 160); g.lineTo(82, 160); g.closePath(); g.fill();
      [[118, 1 - st.packs], [170, st.packs]].forEach(function (r, i) {
        const cx = r[0], cy = 136;
        g.fillStyle = '#2a1d14'; g.beginPath(); g.arc(cx, cy, 11 + 12 * r[1], 0, Math.PI * 2); g.fill();
        g.fillStyle = '#f4f5f6'; g.beginPath(); g.arc(cx, cy, 10, 0, Math.PI * 2); g.fill();
        g.strokeStyle = '#26292d'; g.lineWidth = 2.5;
        for (let q = 0; q < 3; q++) { const a = st.spin * (i ? 1.15 : 1) + q * Math.PI / 3; g.beginPath(); g.moveTo(cx - Math.cos(a) * 8, cy - Math.sin(a) * 8); g.lineTo(cx + Math.cos(a) * 8, cy + Math.sin(a) * 8); g.stroke(); }
      });
      const gl = g.createLinearGradient(30, 30, 256, 176); gl.addColorStop(0, 'rgba(255,255,255,0.16)'); gl.addColorStop(0.3, 'rgba(255,255,255,0)'); gl.addColorStop(1, 'rgba(255,255,255,0.04)');
      g.fillStyle = gl; rr(g, 30, 30, 226, 146, 10); g.fill();

      // the VU meter: a lamp behind the face while the radio is on
      g.fillStyle = '#1b1d20'; rr(g, 270, 30, 212, 112, 8); g.fill();
      const face = g.createRadialGradient(376, 150, 10, 376, 150, 170); face.addColorStop(0, off ? '#efe2bf' : '#fff6d8'); face.addColorStop(1, off ? '#d3c194' : '#e3cf9c');
      g.fillStyle = face; rr(g, 276, 36, 200, 100, 5); g.fill();
      g.save(); rr(g, 276, 36, 200, 100, 5); g.clip();
      const px = 376, py = 214, R = 150;
      g.lineWidth = 2; g.strokeStyle = '#26292d'; g.beginPath(); g.arc(px, py, R - 40, -Math.PI / 2 + angleOfDb(-20), -Math.PI / 2 + angleOfDb(0)); g.stroke();
      g.lineWidth = 4; g.strokeStyle = '#d6261c'; g.beginPath(); g.arc(px, py, R - 40, -Math.PI / 2 + angleOfDb(0), -Math.PI / 2 + angleOfDb(3)); g.stroke();
      g.font = '10px sans-serif'; g.textAlign = 'center';
      [[-20, '20'], [-10, '10'], [-5, '5'], [-3, '3'], [0, '0'], [3, '3']].forEach(function (m) {
        const a = angleOfDb(m[0]);
        g.strokeStyle = m[0] >= 0 ? '#d6261c' : '#26292d'; g.lineWidth = 2;
        g.beginPath(); g.moveTo(px + Math.sin(a) * (R - 40), py - Math.cos(a) * (R - 40)); g.lineTo(px + Math.sin(a) * (R - 32), py - Math.cos(a) * (R - 32)); g.stroke();
        g.fillStyle = m[0] > 0 ? '#b71d14' : '#1f2226'; g.fillText(m[1], px + Math.sin(a) * (R - 22), py - Math.cos(a) * (R - 22) + 4);
      });
      g.font = '15px sans-serif'; g.fillStyle = '#1f2226'; g.fillText('VU', px, 122);
      const na = angleOfDb(st.pos);
      g.strokeStyle = '#111214'; g.lineWidth = 1.8; g.beginPath(); g.moveTo(px, py); g.lineTo(px + Math.sin(na) * (R - 18), py - Math.cos(na) * (R - 18)); g.stroke();
      g.restore();
      g.fillStyle = '#1b1d20'; rr(g, 346, 128, 60, 10, 2); g.fill();
      g.textAlign = 'left';

      // the scope: a green trace on a black strip under the meter (flat when the radio is off)
      g.fillStyle = '#0e0f11'; rr(g, 270, 150, 212, 26, 4); g.fill();
      g.strokeStyle = '#7cf08d'; g.lineWidth = 1.4; g.beginPath();
      const tn = time && time.length ? time.length : 0, pts = 96;
      for (let i = 0; i < pts; i++) {
        const v = off || !tn ? 0 : (time[Math.floor(i / pts * tn)] - 128) / 128;
        const x = 274 + i / (pts - 1) * 204, y = 163 - v * 10;
        if (i) g.lineTo(x, y); else g.moveTo(x, y);
      }
      g.stroke();

      // the level meter: a ladder of LEDs per band, green, amber, red; off, one green lamp walks it slowly
      g.fillStyle = '#0e0f11'; rr(g, 30, 186, 452, 60, 6); g.fill();
      const bw = 452 / BANDS, sw = bw * 0.7, segH = 48 / SEGS;
      const walk = Math.floor(t * 3) % BANDS;
      for (let b = 0; b < BANDS; b++) {
        const lit = off ? 0 : Math.min(SEGS, Math.floor(Math.pow(bv[b], 0.8) * (SEGS + 0.99)));
        if (lit >= st.peaks[b]) { st.peaks[b] = lit; st.peakT[b] = t; } else if (t - st.peakT[b] > 0.25 && st.peaks[b] > 0) { st.peaks[b]--; st.peakT[b] = t; }
        const x = 30 + b * bw + (bw - sw) / 2;
        for (let q = 0; q < SEGS; q++) {
          const on = q < lit || (!off && q === st.peaks[b] - 1) || (off && b === walk && q === 0);
          g.fillStyle = on ? (q >= SEGS - 2 ? '#ff3b2f' : q >= SEGS - 4 ? '#ffb02e' : '#57e36b') : '#2c3034';
          g.fillRect(x, 240 - (q + 1) * segH + 1, sw, segH - 2);
        }
      }
      // the power lamp on the plate: green while the radio plays, a slow amber blink when it is off
      g.fillStyle = off ? (Math.floor(t * 1.2) % 2 ? '#7a5a1c' : '#ffb02e') : '#57e36b';
      g.beginPath(); g.arc(263, 23, 3.5, 0, Math.PI * 2); g.fill();
      g.restore();
    }
  };
}
