/* nobody fm: the picture's shared parts. typing, scramble, the analyser's numbers (the card's bands, the
   scene's 64 bands, loudness, bass, the wave), the odometer. how it all looks is a theme's job
   (themes/<name>/theme.js, design 12.0): a theme draws from the numbers this file produces once a frame. */
window.NOBODY = window.NOBODY || {};
NOBODY.vis = (function () {
  const V = {};
  const reduced = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  V.reduced = reduced;

  V.cols = function () {
    const c = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--cols'), 10);
    return c === 40 ? 40 : 100;
  };
  V.phone = function () { return V.cols() === 40; };
  V.rowPx = function () { const cs = getComputedStyle(document.body); return parseFloat(cs.lineHeight) || parseFloat(cs.fontSize) * 1.15; };
  V.fontPx = function () { return parseFloat(getComputedStyle(document.body).fontSize); };
  V.token = function (name) { return getComputedStyle(document.documentElement).getPropertyValue(name).trim(); };

  /* ---- typing (5.5): a plain setTimeout loop at N characters per second, the cursor riding the end ---- */
  V.type = function (el, text, cps, opts) {
    opts = opts || {};
    const speed = reduced ? cps * 10 : cps;
    let i = 0, done = false, timer = 0, resolve, acc = 0;
    const p = new Promise(function (r) { resolve = r; });
    el.textContent = '';
    // tick-based rather than clock-based, so the typing is the same under a virtual clock (the screenshot harness)
    const step = Math.max(8, 1000 / speed), perTick = speed * step / 1000;
    function tick() {
      if (done) return;
      acc += perTick;
      const should = Math.min(text.length, Math.floor(acc));
      if (should > i) { i = should; el.textContent = text.slice(0, i); if (opts.onChar) opts.onChar(i); }
      if (i >= text.length) { done = true; resolve(true); return; }
      timer = setTimeout(tick, step);
    }
    timer = setTimeout(tick, step);
    return {
      promise: p,
      finish: function () { if (done) return; done = true; clearTimeout(timer); el.textContent = text; resolve(true); },
      cancel: function () { if (done) return; done = true; clearTimeout(timer); resolve(false); },
      get done() { return done; }
    };
  };

  /* ---- scramble (5.5): baffle when the CDN answered, a 300 ms blink when it did not ---- */
  V.scramble = function (el, newText, ms) {
    ms = ms || 900;
    if (window.baffle && !reduced) {
      try {
        const b = window.baffle(el).set({ characters: '#+=:.-_|', speed: 55 });
        b.start();
        if (newText != null) b.text(function () { return newText; });
        b.reveal(ms);
        return;
      } catch (e) { /* fall through */ }
    }
    if (newText != null) el.textContent = newText;
    if (reduced) return;
    el.style.visibility = 'hidden';
    setTimeout(function () { el.style.visibility = ''; }, 150);
    setTimeout(function () { el.style.visibility = 'hidden'; }, 220);
    setTimeout(function () { el.style.visibility = ''; }, 300);
  };
  // a one-shot scrambled string, for text that is set rather than animated
  V.scrambled = function (text) {
    const g = '#+=:.-_|';
    let s = '';
    for (let i = 0; i < text.length; i++) s += text[i] === ' ' || text[i] === '\n' ? text[i] : g[Math.floor(Math.random() * g.length)];
    return s;
  };

  /* ---- the analyser's numbers (5.2, 12.4): filled once a frame by A.update, drawn by the theme ---- */
  const A = {
    canvas: null, ctx2d: null, baseline: null, scope: null,
    bands: 32, rows: 5, peaks: [], peakAt: [], vals: [], v64: new Float32Array(64), loud: 0, bass: 0, waveHead: 0,
    mode: 'bars', ghost: false, tuning: false, flip: false, flipUntil: 0, live: false,
    freq: null, time: null, zeroFrames: 0, bpm: 72, slugHash: 1, cell: { w: 10, h: 24 }, W: 600, H: 100
  };
  V.analyser = A;

  function hash(s) {
    let h = 2166136261;
    for (let i = 0; i < s.length; i++) { h ^= s.charCodeAt(i); h = Math.imul(h, 16777619); }
    return (h >>> 0) / 4294967295;
  }

  A.init = function (canvas, baseline, scope) {
    A.canvas = canvas; A.ctx2d = canvas.getContext('2d'); A.baseline = baseline; A.scope = scope;
    A.resize();
  };
  // the canvas is sized to its CSS box; rows come from the theme (the typed cells need a whole number of rows)
  A.resize = function () {
    const phone = V.phone();
    A.bands = phone ? 16 : 32;
    const th = NOBODY.theme && NOBODY.theme.current;
    A.rows = th && th.scopeRows ? th.scopeRows(phone) : (A.mode === 'scope5' ? 5 : (phone ? 4 : 5));
    const dpr = window.devicePixelRatio || 1;
    const row = V.rowPx();
    const w = A.canvas.clientWidth || 600;
    const h = (th && th.scopeRows) ? row * A.rows : (A.canvas.clientHeight || row * A.rows);
    A.canvas.width = Math.round(w * dpr);
    A.canvas.height = Math.round(h * dpr);
    A.canvas.style.height = h + 'px';
    A.ctx2d.setTransform(dpr, 0, 0, dpr, 0, 0);
    A.W = w; A.H = h;
    A.cell.w = V.fontPx() * 0.5; A.cell.h = row;
    A.totalCols = Math.floor(w / A.cell.w);
    if (A.peaks.length !== A.bands) { A.peaks = new Array(A.bands).fill(0); A.peakAt = new Array(A.bands).fill(0); A.vals = new Array(A.bands).fill(0); }
    if (th && th.resize) th.resize();
  };
  A.setTrack = function (slug, bpm) { A.slugHash = hash(slug || 'nobody'); A.bpm = bpm || 72; };
  A.setMode = function (m) { A.mode = m; A.resize(); };
  A.dance = function () { A.flip = true; A.flipUntil = performance.now() + 10000; };

  function bandMax(freq, nyq, bins, f0, f1) {
    let i0 = Math.max(0, Math.floor(f0 / nyq * bins)), i1 = Math.min(bins - 1, Math.max(i0, Math.floor(f1 / nyq * bins)));
    let m = 0;
    for (let i = i0; i <= i1; i++) if (freq[i] > m) m = freq[i];
    return m;
  }
  // once a frame: A.vals (the card's bands), A.v64 (the scene's), A.loud, A.bass, A.waveHead, from the analyser or the ghost
  A.update = function (now, deck) {
    const out = A.vals;
    const an = NOBODY.synth && NOBODY.synth.analyser;
    if (A.flip && now > A.flipUntil) A.flip = false;
    let live = false;
    if (an && !A.ghost) {
      if (!A.freq || A.freq.length !== an.frequencyBinCount) { A.freq = new Uint8Array(an.frequencyBinCount); A.time = new Uint8Array(an.fftSize); }
      an.getByteFrequencyData(A.freq);
      an.getByteTimeDomainData(A.time);
      const sr = NOBODY.synth.ctx.sampleRate, nyq = sr / 2, bins = A.freq.length;
      let sum = 0, all = 0;
      for (let b = 0; b < A.bands; b++) {
        const m = bandMax(A.freq, nyq, bins, 60 * Math.pow(20000 / 60, b / A.bands), 60 * Math.pow(20000 / 60, (b + 1) / A.bands));
        sum += m; out[b] = m / 255;
      }
      for (let b = 0; b < 64; b++) {
        const m = bandMax(A.freq, nyq, bins, 40 * Math.pow(18000 / 40, b / 64), 40 * Math.pow(18000 / 40, (b + 1) / 64));
        all += m; A.v64[b] = m / 255;
      }
      live = sum > 0;
      if (!live && deck && !deck.paused && !deck.ended && deck.currentTime > 0.5) A.zeroFrames++; else if (live) A.zeroFrames = 0;
      if (A.zeroFrames > 30 && !A.tuning) { A.ghost = true; A.ghostReason = 'silent graph'; }
      if (A.tuning || live) {
        // while tuning the bars sit near full height, jittering (5.2)
        if (A.tuning) { for (let b = 0; b < A.bands; b++) out[b] = Math.max(out[b], 0.7 + Math.random() * 0.3); for (let b = 0; b < 64; b++) A.v64[b] = Math.max(A.v64[b], 0.5 + Math.random() * 0.5); }
        A.loud = all / 64 / 255; A.bass = (A.v64[0] + A.v64[1] + A.v64[2] + A.v64[3]) / 4;
        A.waveHead = (A.time[0] - 128) / 128;
        A.live = true; setBeat();
        return true;
      }
    }
    // ghost mode: a deterministic function of deck time and the slug, with a pulse at the bpm. it says it is lying.
    const t = deck && deck.currentTime ? deck.currentTime : now / 1000;
    const beat = (t * A.bpm / 60) % 1;
    const pulse = Math.max(0, 1 - beat * 3);
    const playing = deck && !deck.paused && !deck.ended;
    for (let b = 0; b < 64; b++) {
      const h = hash(A.slugHash + ':' + b);
      const base = 0.45 + 0.3 * Math.sin(t * (0.9 + h * 1.6) + h * 9) + 0.15 * Math.sin(t * (2.7 + h * 2) + b);
      const tilt = 1 - b / 64 * 0.55;
      let v = Math.max(0, Math.min(1, base * tilt * (0.7 + 0.3 * pulse) + (b < 6 ? 0.25 * pulse : 0)));
      if (!playing) v *= 0.08;
      if (A.tuning) v = 0.6 + Math.random() * 0.4;
      A.v64[b] = v;
    }
    for (let b = 0; b < A.bands; b++) {
      const h = hash(A.slugHash + ':' + b);
      const base = 0.45 + 0.3 * Math.sin(t * (0.9 + h * 1.6) + h * 9) + 0.15 * Math.sin(t * (2.7 + h * 2) + b);
      const tilt = 1 - b / A.bands * 0.55;
      let v = Math.max(0, Math.min(1, base * tilt * (0.7 + 0.3 * pulse) + (b < 3 ? 0.25 * pulse : 0)));
      if (!playing) v *= 0.08;
      if (A.tuning) v = Math.max(v, 0.7 + Math.random() * 0.3);
      out[b] = v;
    }
    A.loud = playing ? 0.35 + 0.25 * pulse : 0; A.bass = playing ? 0.3 + 0.6 * pulse : 0;
    A.waveHead = playing ? Math.sin(t * 7) * 0.5 * (0.5 + pulse) : 0;
    A.live = false; setBeat();
    return false;
  };
  function setBeat() { document.documentElement.style.setProperty('--beat', A.bass.toFixed(3)); }

  // the baseline under the bars: `+---- 32 bands  60 Hz  20k`, with the amber `ghost` tag when the analyser is guessing
  A.baselineText = function (live) {
    if (!A.baseline) return;
    const cols = A.totalCols || 90, phone = V.phone();
    const label = phone ? (A.bands + ' bands') : (A.bands + ' bands  60 Hz  20k');
    const tag = A.ghost ? ' ghost' : '';
    const dashes = Math.max(4, cols - 2 - label.length - tag.length - 3);
    A.baseline.textContent = '';
    A.baseline.append('+' + '-'.repeat(dashes) + '  ' + label);
    if (tag) { const s = document.createElement('span'); s.className = 'ghost-tag'; s.textContent = tag; A.baseline.append(s); }
  };

  // n samples of the wave, -1..1: from the analyser, or synthesised from the bands when it is guessing
  A.samples = function (n) {
    const out = new Float32Array(n);
    if (A.live && A.time) {
      const step = A.time.length / n;
      for (let i = 0; i < n; i++) out[i] = (A.time[Math.floor(i * step)] - 128) / 128;
      return out;
    }
    const t = performance.now() / 1000;
    for (let i = 0; i < n; i++) {
      let v = 0;
      for (let b = 0; b < Math.min(6, A.bands); b++) v += A.vals[b] * Math.sin(i * (0.15 + b * 0.11) + t * (3 + b)) / 6;
      out[i] = A.tuning ? (Math.random() * 2 - 1) * 0.8 : v * 1.4;
    }
    return out;
  };

  /* ---- the odometer (2.7): six drums, each a reel of ten digits that rolls ---- */
  V.odometer = function (el) {
    const drums = [];
    el.textContent = '';
    for (let i = 0; i < 6; i++) {
      const d = document.createElement('div'); d.className = 'drum';
      const reel = document.createElement('div'); reel.className = 'reel';
      for (let n = 0; n < 10; n++) { const s = document.createElement('span'); s.textContent = String(n); reel.appendChild(s); }
      d.appendChild(reel); el.appendChild(d); drums.push(reel);
    }
    return {
      set: function (n) {
        const str = String(Math.max(0, Math.min(999999, Math.floor(n)))).padStart(6, '0');
        const row = V.rowPx();
        drums.forEach(function (reel, i) { reel.style.transform = 'translateY(' + (-parseInt(str[i], 10) * row) + 'px)'; });
        el.setAttribute('aria-label', 'visitor ' + str);
      }
    };
  };

  return V;
})();
