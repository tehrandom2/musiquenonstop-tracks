/* nobody fm, the arena's show (issues #240 and #247): the engine and the drawing of the halo, the floor and the rig, shared by
   the arena theme (themes/arena/theme.js, which loads this as a plain script, so it works from a file URL too) and the embeddable
   module (vis/arena.js, which imports this file for its side effect). no DOM, no audio, no network, no animation loop: the caller
   hands it the analyser's bytes and a 2D context and says when. it registers itself as globalThis.NOBODY_VIS.arena.

   the engine reads the bytes once a frame: 72 log bands from 40 Hz to 16 kHz straight from the frequency bins (read between two
   bins where a band is narrower than one), an automatic gain and a power curve so a quiet track moves as much as a loud one, peaks
   under gravity, a history of the last 1.8 s of spectra, and the kick from the wave itself (a 140 Hz one-pole low-pass over the
   frame's samples against its own running average; the analyser's frequency data is smoothed and a kick drowns in it). bytes that
   are all zero (the radio off) or a guess (the station's ghost mode) draw a slow idle spectrum instead. the scene (quiet, verse,
   chorus) comes from loudness against its running average, or from the caller (the theme hands in the track's loudness profile).

   nobody who built this can hear. every value is a number from the bytes. MIT, like the site. */
(function (root) {
  'use strict';
  const TAU = Math.PI * 2, NS = 72, HROWS = 36, HSTEP = 0.05, NBAR = 144, NW = 192;
  function clamp(v, a, b) { return Math.max(a, Math.min(b, v)); }
  function ease(dt, rate) { return 1 - Math.exp(-dt * rate); }
  function smooth(a, b, x) { const t = clamp((x - a) / (b - a), 0, 1); return t * t * (3 - 2 * t); }
  function hashStr(s) { let h = 2166136261; for (let i = 0; i < s.length; i++) { h ^= s.charCodeAt(i); h = Math.imul(h, 16777619); } return h >>> 0; }

  function create(opts) {
    opts = opts || {};
    const reduced = !!opts.reducedMotion;
    const S = { spec: new Float32Array(NS), raw: new Float32Array(NS), peak: new Float32Array(NS), fall: new Float32Array(NS), hist: [], head: 0, acc: 0,
      agc: 0.3, src: 'idle', low: 0, lowAvg: 0.02, kicks: 0, rot: 0, wave: new Float32Array(NW), T: 0, mix: 0,
      bass: 0, kick: 0, lastKick: -10, newKick: 0, level: 0.3, levelFrom: 'loudness', loudAvg: 0.2, override: null, drop: 0, drops: 0,
      sampleRate: opts.sampleRate || 48000 };
    for (let i = 0; i < HROWS; i++) S.hist.push(new Float32Array(NS));

    // a slow spectrum for the radio off (or a guess the caller has none for): it breathes, nothing more
    function idleBands(out, T) {
      for (let b = 0; b < NS; b++) { const u = b / NS; out[b] = Math.max(0, (0.22 + 0.1 * Math.sin(T * 0.8 + b * 0.11) + 0.06 * Math.sin(T * 1.7 - b * 0.05)) * (1 - u * 0.6)); }
    }
    function allZero(a) { if (!a) return true; for (let i = 0; i < a.length; i += 7) if (a[i] !== 0) return false; return true; }
    function flatWave(a) { if (!a) return true; for (let i = 0; i < a.length; i += 5) if (a[i] !== 0 && a[i] !== 128) return false; return true; }

    /* feed(freqBytes, timeBytes, dt, guess): once a frame. guess = { bands: 0..1 values (any length), wave: -1..1 values } for a
       caller that has no bytes but a picture of its own (the station's ghost mode); without bytes or a guess the idle look runs */
    function feed(freq, time, dt, guess) {
      dt = clamp(dt || 0, 0, 0.1); S.T += dt;
      const live = !!freq && !allZero(freq), raw = S.raw;
      S.src = live ? 'live' : guess && guess.bands ? 'guess' : 'idle';
      S.mix += ((live || guess ? 1 : 0) - S.mix) * ease(dt, live ? 4 : 1.6);
      idleBands(raw, S.T);
      if (live) {
        const nyq = S.sampleRate / 2, bins = freq.length;
        for (let b = 0; b < NS; b++) {
          const f0 = 40 * Math.pow(400, b / NS), f1 = 40 * Math.pow(400, (b + 1) / NS);
          const k0 = f0 / nyq * bins, k1 = f1 / nyq * bins, i0 = Math.min(bins - 1, Math.floor(k0)), i1 = Math.min(bins - 1, Math.floor(k1));
          let m = 0;
          if (i1 - i0 < 1) { const kc = Math.min(bins - 2, (k0 + k1) / 2), i = Math.floor(kc); m = freq[i] + (freq[i + 1] - freq[i]) * (kc - i); }
          else for (let i = i0; i <= i1; i++) if (freq[i] > m) m = freq[i];
          raw[b] = raw[b] * (1 - S.mix) + (m / 255) * S.mix;
        }
      } else if (guess && guess.bands) {
        const gb = guess.bands, n = gb.length;
        for (let b = 0; b < NS; b++) { const k = b / (NS - 1) * (n - 1), i = Math.floor(k), j = Math.min(n - 1, i + 1); raw[b] = raw[b] * (1 - S.mix) + (gb[i] + (gb[j] - gb[i]) * (k - i)) * S.mix; }
      }
      // the gain follows the loudest band down slowly and up at once; the bytes are decibels, so a power curve pulls the busy
      // middle apart from the quiet floor
      let mx = 0; for (let b = 0; b < NS; b++) mx = Math.max(mx, raw[b]);
      S.agc = Math.max(0.22, mx, S.agc * Math.exp(-dt * 0.3));
      let loud = 0;
      for (let b = 0; b < NS; b++) {
        let v = clamp(raw[b] / S.agc, 0, 1);
        v = Math.min(1, Math.pow(v, live ? 1.9 : 1.4) * (0.78 + 0.55 * b / NS));
        const cur = S.spec[b];
        S.spec[b] = cur + (v - cur) * (v > cur ? ease(dt, 38) : ease(dt, 8));
        if (S.spec[b] >= S.peak[b]) { S.peak[b] = S.spec[b]; S.fall[b] = 0; }
        else { S.fall[b] += dt * 1.8; S.peak[b] = Math.max(S.spec[b], S.peak[b] - S.fall[b] * dt); }
        loud += S.spec[b];
      }
      loud /= NS;
      S.acc += dt;
      while (S.acc >= HSTEP) { S.acc -= HSTEP; S.head = (S.head + 1) % HROWS; S.hist[S.head].set(S.spec); }
      // the wave for the circle inside the ring
      const tw = live && time && !flatWave(time);
      for (let i = 0; i < NW; i++) {
        let t;
        if (tw) t = (time[Math.floor(i / NW * time.length)] - 128) / 128;
        else if (guess && guess.wave) t = guess.wave[Math.floor(i / NW * guess.wave.length)] * 0.6;
        else t = 0.12 * Math.sin(S.T * 1.6 + i * 0.13) * Math.sin(S.T * 0.5 + i * 0.033);
        S.wave[i] += (t - S.wave[i]) * ease(dt, 30);
      }
      let b6 = 0; for (let b = 0; b < 6; b++) b6 += S.spec[b];
      S.bass += (b6 / 6 - S.bass) * ease(dt, 10);
      // the kick: from the wave when there is one; a guess pulses gently; the idle look breathes at a slow walk
      S.newKick = 0;
      if (tw) { const k = waveKick(time, dt); if (k) beat(k); }
      else if (!live && !guess && S.T - S.lastKick > (60 / 70) * 2) beat(0.22);
      S.kick *= Math.exp(-dt * 5.5);
      if (!reduced) S.rot += dt * (0.05 + S.bass * 0.25);
      // the scene: the caller's (the theme hands in the track's profile) or loudness against its own running average
      if (S.override) { S.level += (S.override.level - S.level) * ease(dt, 1.6); S.levelFrom = S.override.from || 'caller'; }
      else {
        S.loudAvg += (loud - S.loudAvg) * ease(dt, 0.15);
        const target = live ? clamp(0.45 + (loud - S.loudAvg) * 5, 0, 1) : 0.25;
        S.level += (target - S.level) * ease(dt, 1.6); S.levelFrom = live ? 'loudness' : 'none';
      }
      S.drop = Math.max(0, S.drop - dt * 6);
    }
    function beat(k) { S.kick = Math.max(S.kick, k); S.lastKick = S.T; S.newKick = Math.max(S.newKick, k); }
    function waveKick(t, dt) {
      const n = t.length, a = 1 - Math.exp(-TAU * 140 / S.sampleRate); // a one-pole low-pass at about 140 Hz
      let lp = 0, e = 0;
      for (let i = 0; i < n; i++) { lp += a * ((t[i] - 128) / 128 - lp); if (i > n / 4) e += lp * lp; }
      const low = Math.sqrt(e / (n * 0.75)), prev = S.low;
      S.low = low;
      S.lowAvg += (low - S.lowAvg) * ease(dt, 2);
      if (low > prev * 1.08 && low > S.lowAvg * 1.3 + 0.008 && S.T - S.lastKick > 0.22) { S.kicks++; return clamp(0.35 + (low / Math.max(0.005, S.lowAvg) - 1) * 0.9, 0.35, 1); }
      return 0;
    }

    /* the rig: lamps along the top throw beams that sweep the floor; loud parts open them, the kick hits them, and in a chorus
       three of them fan lasers to the front edge that strobe with the kick */
    function drawRig(g, w, top, hz, front, hue, hue2, dim) {
      const open = smooth(0.35, 0.8, S.level), laser = smooth(0.62, 0.9, S.level), T = S.T, kick = S.kick;
      g.globalCompositeOperation = 'lighter';
      for (let i = 0; i < 7; i++) {
        const sx = w * (i + 0.5) / 7, sway = reduced ? 0 : Math.sin(T * (0.33 + i * 0.05) + i * 1.7);
        const tx = w / 2 + (i - 3) * w * 0.07 + sway * w * 0.18, ty = hz + (front - hz) * 0.35;
        const a = (0.03 + 0.12 * open + 0.14 * kick * open) * dim, hh = i % 2 ? hue2 : hue;
        if (a < 0.005) continue;
        const gr = g.createLinearGradient(sx, top, tx, ty); gr.addColorStop(0, 'hsla(' + hh + ', 100%, 82%, ' + a * 1.6 + ')'); gr.addColorStop(1, 'hsla(' + hh + ', 100%, 60%, 0)');
        const spread = (30 + 50 * open) * w / 1280 * 1.6;
        g.fillStyle = gr; g.beginPath(); g.moveTo(sx - 4, top); g.lineTo(sx + 4, top); g.lineTo(tx + spread, ty); g.lineTo(tx - spread, ty); g.closePath(); g.fill();
      }
      if (laser > 0.02 && !reduced) {
        g.lineWidth = 1.2;
        for (let i = 1; i < 7; i += 2) {
          const sx = w * (i + 0.5) / 7;
          for (let k = -2; k <= 2; k++) {
            const ang = k * 0.22 + Math.sin(T * 0.9 + i) * 0.35, ex = sx + Math.tan(ang) * (front - top);
            g.strokeStyle = 'hsla(' + (k % 2 ? hue2 : hue) + ', 100%, 75%, ' + laser * (0.12 + 0.6 * kick) * dim + ')';
            g.beginPath(); g.moveTo(sx, top); g.lineTo(ex, front); g.stroke();
          }
        }
      }
      g.globalCompositeOperation = 'source-over';
    }
    /* the floor: the history as rows running at the viewer, lows in the middle and highs out at both edges, each row filled with
       the ground so the rows in front hide the ones behind; hz is the horizon, front the y of the newest row */
    function drawTerrain(g, w, hz, front, amp, halfW, hue, hue2, dim, ground) {
      const N = HROWS, fr = S.acc / HSTEP, P = NS - 1, cx = w / 2, K = 6.5, lw = w < 700 ? 0.8 : 1;
      g.strokeStyle = 'hsla(' + hue2 + ', 100%, 70%, ' + 0.1 * dim + ')'; g.lineWidth = 1; g.beginPath();
      for (let i = -8; i <= 8; i++) { g.moveTo(cx + i / 8 * halfW * 0.2, hz); g.lineTo(cx + i / 8 * halfW * 1.25, front); }
      g.stroke();
      for (let k = N - 1; k >= 0; k--) {
        const row = S.hist[(S.head - k + N) % N], d = (k + fr) / N, p = 1 / (1 + d * K), p0 = 1 / (1 + K);
        const y = hz + (front - hz) * (p - p0) / (1 - p0), a = amp * p, hw = halfW * (0.2 + 0.8 * p);
        g.beginPath(); g.moveTo(cx - hw, y);
        for (let i = -P; i <= P; i++) { const v = row[Math.abs(i)]; g.lineTo(cx + i / P * hw, y - v * a); }
        g.lineTo(cx + hw, y);
        const fade = Math.pow(1 - d, 1.4);
        g.globalCompositeOperation = 'source-over'; g.globalAlpha = 1;
        g.lineTo(cx + hw, y + 2 + a * 0.05); g.lineTo(cx - hw, y + 2 + a * 0.05); g.closePath();
        g.fillStyle = ground; g.fill();
        g.strokeStyle = 'hsla(' + (hue2 + (hue - hue2) * (1 - d)) + ', 100%, ' + (52 + 16 * (1 - d)) + '%, ' + (0.12 + 0.88 * fade) * dim + ')';
        g.lineWidth = (k === 0 ? 2 : 1.1) * lw; g.stroke();
      }
      // the newest spectrum glows: a fat soft stroke under the sharp one, then its peaks as white sparks
      const row = S.spec, p = 1 / (1 + (S.acc / HSTEP / N) * K), p0 = 1 / (1 + K), hw = halfW * (0.2 + 0.8 * p), a = amp * p, fy = hz + (front - hz) * (p - p0) / (1 - p0);
      g.globalCompositeOperation = 'lighter';
      g.beginPath();
      for (let i = -P; i <= P; i++) { const v = row[Math.abs(i)]; const x = cx + i / P * hw, yy = fy - v * a; if (i === -P) g.moveTo(x, yy); else g.lineTo(x, yy); }
      g.strokeStyle = 'hsla(' + hue + ', 100%, 58%, ' + 0.4 * dim + ')'; g.lineWidth = 10 * lw; g.stroke();
      g.strokeStyle = 'hsla(' + (hue + 10) + ', 100%, 74%, ' + dim + ')'; g.lineWidth = 2.4 * lw; g.stroke();
      g.fillStyle = 'rgba(255,255,255,' + 0.85 * dim + ')';
      for (let i = -P; i <= P; i++) { const v = S.peak[Math.abs(i)]; if (v < 0.08) continue; g.fillRect(cx + i / P * hw - 1, fy - v * a - 4, 2, 2); }
      g.globalCompositeOperation = 'source-over';
    }
    function bandAt(arr, i) { const half = i < NBAR / 2 ? i : NBAR - 1 - i; return arr[Math.min(NS - 1, Math.round(half / (NBAR / 2 - 1) * (NS - 1)))]; }
    /* the halo: NBAR bars around a ring (the lows at the crown, mirrored down both sides), a white peak beyond each, the wave as a
       circle inside, the cover turning in the middle when there is one, the core lit by the bass and the kick, and in a loud part
       a faint second ring further out */
    function drawHalo(g, cx, cy, R, len, hue, hue2, dim, cover, echo) {
      const bass = S.bass, kick = S.kick;
      g.globalCompositeOperation = 'lighter'; g.globalAlpha = 1;
      const core = g.createRadialGradient(cx, cy, 0, cx, cy, R * 2.2);
      core.addColorStop(0, 'hsla(' + hue + ', 100%, 60%, ' + (0.1 + 0.3 * bass + 0.35 * kick) * dim + ')'); core.addColorStop(0.45, 'hsla(' + hue2 + ', 100%, 50%, ' + (0.05 + 0.12 * bass) * dim + ')'); core.addColorStop(1, 'hsla(' + hue + ', 100%, 50%, 0)');
      g.fillStyle = core; g.fillRect(cx - R * 2.2, cy - R * 2.2, R * 4.4, R * 4.4);
      g.globalCompositeOperation = 'source-over';
      if (cover) {
        g.save(); g.beginPath(); g.arc(cx, cy, R * 0.74, 0, TAU); g.clip();
        g.translate(cx, cy); g.rotate(S.rot); g.globalAlpha = 0.9 * dim;
        g.drawImage(cover, -R * 0.74, -R * 0.74, R * 1.48, R * 1.48);
        g.restore(); g.globalAlpha = 1;
        g.strokeStyle = 'rgba(0,0,0,.6)'; g.lineWidth = R * 0.06; g.beginPath(); g.arc(cx, cy, R * 0.74, 0, TAU); g.stroke();
      }
      const bw = Math.max(1.2, TAU * R / NBAR * 0.55), groups = 8;
      g.lineCap = 'round';
      for (let pass = 0; pass < 2; pass++) {
        g.globalCompositeOperation = pass ? 'source-over' : 'lighter';
        for (let q = 0; q < groups; q++) {
          g.beginPath();
          for (let i = q; i < NBAR; i += groups) {
            const v = bandAt(S.spec, i), an = -Math.PI / 2 + (i + 0.5) / NBAR * TAU, c = Math.cos(an), s = Math.sin(an), L = 2 + Math.pow(v, 1.1) * len;
            g.moveTo(cx + c * (R + 2), cy + s * (R + 2)); g.lineTo(cx + c * (R + 2 + L), cy + s * (R + 2 + L));
          }
          const hq = hue + (hue2 - hue) * Math.abs(q / (groups - 1) - 0.5) * 2;
          if (pass) { g.strokeStyle = 'hsla(' + hq + ', 100%, ' + (70 + kick * 14) + '%, ' + dim + ')'; g.lineWidth = bw; }
          else { g.strokeStyle = 'hsla(' + hq + ', 100%, 60%, ' + 0.3 * dim + ')'; g.lineWidth = bw * 3.2; }
          g.stroke();
        }
      }
      if (echo > 0.02) {
        g.globalCompositeOperation = 'lighter'; g.lineWidth = bw * 0.8;
        g.strokeStyle = 'hsla(' + hue2 + ', 100%, 70%, ' + 0.35 * echo * dim + ')';
        g.beginPath();
        for (let i = 0; i < NBAR; i += 2) {
          const v = bandAt(S.spec, i), an = -Math.PI / 2 + (i + 0.5) / NBAR * TAU, c = Math.cos(an), s = Math.sin(an), r0 = R + len * 1.15, L = 2 + Math.pow(v, 1.1) * len * 0.8;
          g.moveTo(cx + c * r0, cy + s * r0); g.lineTo(cx + c * (r0 + L), cy + s * (r0 + L));
        }
        g.stroke(); g.globalCompositeOperation = 'source-over';
      }
      g.fillStyle = 'rgba(255,255,255,' + 0.9 * dim + ')';
      const dot = clamp(R / 70 * 2.4, 1.6, 3);
      for (let i = 0; i < NBAR; i++) {
        const v = bandAt(S.peak, i); if (v < 0.05) continue;
        const an = -Math.PI / 2 + (i + 0.5) / NBAR * TAU, r = R + 6 + Math.pow(v, 1.1) * len;
        g.fillRect(cx + Math.cos(an) * r - dot / 2, cy + Math.sin(an) * r - dot / 2, dot, dot);
      }
      const wr = R * 0.86;
      let m = 0.02; for (let i = 0; i < NW; i++) m = Math.max(m, Math.abs(S.wave[i]));
      const gn = Math.min(4, 0.9 / m);
      g.beginPath();
      for (let i = 0; i <= NW; i++) { const an = -Math.PI / 2 + i / NW * TAU, r = wr + S.wave[i % NW] * gn * R * 0.12; const x = cx + Math.cos(an) * r, y = cy + Math.sin(an) * r; if (i) g.lineTo(x, y); else g.moveTo(x, y); }
      g.globalCompositeOperation = 'lighter';
      g.strokeStyle = 'hsla(' + hue2 + ', 100%, 65%, ' + 0.35 * dim + ')'; g.lineWidth = Math.max(2.5, R / 35); g.stroke();
      g.strokeStyle = 'rgba(255,255,255,' + 0.8 * dim + ')'; g.lineWidth = 1.3; g.stroke();
      g.globalCompositeOperation = 'source-over';
    }
    // the horizon: a line of light where the floor meets the sky, brighter on the kick
    function drawHorizon(g, w, hz, hue, dim) {
      const kick = S.kick, bass = S.bass;
      g.globalCompositeOperation = 'lighter';
      const gr = g.createLinearGradient(0, hz - 30, 0, hz + 4); gr.addColorStop(0, 'hsla(' + hue + ', 100%, 60%, 0)'); gr.addColorStop(1, 'hsla(' + hue + ', 100%, 62%, ' + (0.12 + 0.2 * bass + 0.25 * kick) * dim + ')');
      g.fillStyle = gr; g.fillRect(0, hz - 30, w, 34);
      const ln = g.createLinearGradient(0, 0, w, 0); ln.addColorStop(0, 'hsla(' + hue + ', 100%, 70%, 0)'); ln.addColorStop(0.5, 'hsla(' + hue + ', 100%, 82%, ' + (0.5 + 0.5 * kick) * dim + ')'); ln.addColorStop(1, 'hsla(' + hue + ', 100%, 70%, 0)');
      g.fillStyle = ln; g.fillRect(0, hz - 1, w, 1.5);
      g.globalCompositeOperation = 'source-over';
    }
    /* the whole show in a region of the context: o = { w, h (the canvas), y, rh (the region's top and height), cx, rw (its centre
       and width), top (where the rig hangs), show (0..1, more halo with the interface hidden), hue, hue2, dim, cover, ground }.
       returns the halo's place, for a caller that wants to throw shockwaves from it */
    function drawShow(g, o) {
      const w = o.w, phone = w < 700, show = o.show || 0, dim = o.dim == null ? 1 : o.dim;
      const m = Math.min(o.rw * 1.2, o.rh * (phone ? 1.1 : 1.25)), cx = o.cx;
      const cy = o.y + o.rh * (phone ? 0.4 : 0.42), R = m * (0.15 + 0.02 * show) * (1 + 0.05 * S.bass + 0.07 * S.kick), len = m * (0.17 + 0.03 * show);
      const hz = o.y + o.rh * 0.64, front = o.y + o.rh - Math.max(3, o.rh * 0.012), quiet = smooth(0.12, 0.45, S.level);
      drawRig(g, w, o.top || 0, hz, front, o.hue, o.hue2, dim);
      drawHalo(g, cx, cy, R, len, o.hue, o.hue2, dim, o.cover || null, smooth(0.66, 0.92, S.level));
      drawHorizon(g, w, hz, o.hue, dim * (0.4 + 0.6 * quiet));
      drawTerrain(g, w, hz, front, o.rh * 0.3, w * (phone ? 0.8 : 0.72), o.hue, o.hue2, dim * (0.5 + 0.5 * quiet), o.ground || 'rgba(6,6,11,.95)');
      if (S.drop > 0) { g.fillStyle = 'rgba(255,255,255,' + S.drop * 0.55 * dim + ')'; g.fillRect(0, 0, w, o.h); }
      return { cx: cx, cy: cy, R: R, len: len };
    }

    return {
      feed: feed, drawShow: drawShow,
      // the scene from the caller: level 0..1 (how loud this moment is in the track), and a drop (the stage flashes white)
      scene: function (level, from) { S.override = level == null ? null : { level: level, from: from }; },
      drop: function () { if (!reduced) S.drop = 1; S.drops++; },
      get bass() { return S.bass; }, get kick() { return S.kick; }, get newKick() { return S.newKick; }, get level() { return S.level; },
      sceneName: function () { return S.level < 0.3 ? 'quiet' : S.level < 0.66 ? 'verse' : 'chorus'; },
      state: function () {
        let pk = 0; for (let b = 0; b < NS; b++) pk = Math.max(pk, S.spec[b]);
        return { src: S.src, bands: NS, rows: HROWS, kicks: S.kicks, scene: this.sceneName(), level: +S.level.toFixed(2), sceneFrom: S.levelFrom, drops: S.drops, peak: +pk.toFixed(2) };
      },
      setSampleRate: function (sr) { if (sr) S.sampleRate = sr; },
      // a hue for a track the caller has no colour for: fast tracks hot (magenta to orange), slow ones cool (teal to violet)
      hueFor: function (entry) {
        const slug = entry && (entry.slug || entry.title) || 'nobody', u = (hashStr(slug) % 1000) / 1000, slow = entry && entry.bpm && entry.bpm < 100;
        return Math.round(slow ? 170 + u * 105 : 288 + u * 112) % 360;
      }
    };
  }
  root.NOBODY_VIS = root.NOBODY_VIS || {};
  root.NOBODY_VIS.arena = { create: create, NS: NS, HROWS: HROWS };
})(typeof globalThis !== 'undefined' ? globalThis : this);
