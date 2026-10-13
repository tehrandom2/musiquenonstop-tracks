/* nobody fm: the audio chain and everything synthesised in the browser (design 5.1, 5.4).
   nothing here is fetched; nobody who built it could hear it. the graph is:
   deck  -> MediaElementSource -> channel Gain -+
   deckB -> MediaElementSource -> channel Gain -+-> Analyser (fft 2048, smoothing .82) -> duck Gain -> Gain -> destination
   the analyser sits before the gain, so a muted page (gain 0) still feeds it the full signal. the two channel gains are the
   crossfade (issue #87): the element on air sits at 1, the other at 0 until the next track crosses in. */
window.NOBODY = window.NOBODY || {};
NOBODY.synth = (function () {
  const S = {
    ctx: null,
    analyser: null,
    gain: null,
    source: null,
    deckConnected: false,
    muted: false,
    volume: 7,
    noise: null,      // the looped 2 s white-noise buffer
    bed: null,        // dead-air nodes
    clicks: false
  };

  function curve(v) { return Math.pow(Math.max(0, Math.min(10, v)) / 10, 2); }

  // built inside the first human act (4.1). connectDeck is false from a file URL (the file-URL rule, 5.1).
  S.create = function (deck, connectDeck, mute, deckB) {
    if (S.ctx) return true;
    try {
      const AC = window.AudioContext || window.webkitAudioContext;
      if (!AC) return false;
      S.ctx = new AC();
      S.analyser = S.ctx.createAnalyser();
      S.analyser.fftSize = 2048;
      S.analyser.smoothingTimeConstant = 0.82;
      S.gain = S.ctx.createGain();
      S.muted = !!mute;
      S.gain.gain.value = S.muted ? 0 : curve(S.volume);
      // the duck (design 12.0, issue #64): 1 unless a theme lowers the deck under something of its own (the campfire's scope)
      S.duckGain = S.ctx.createGain();
      S.analyser.connect(S.duckGain);
      S.duckGain.connect(S.gain);
      S.gain.connect(S.ctx.destination);
      if (connectDeck) {
        S.chans = [deck, deckB].filter(Boolean).map(function (el, i) {
          const src = S.ctx.createMediaElementSource(el), g = S.ctx.createGain();
          g.gain.value = i ? 0 : 1;
          src.connect(g); g.connect(S.analyser);
          return { el: el, source: src, gain: g };
        });
        S.source = S.chans[0].source;
        S.deckConnected = true;
      }
      // the noise buffer, 2 s of Math.random, shared by the tuning static and the dead-air bed
      const len = S.ctx.sampleRate * 2;
      S.noise = S.ctx.createBuffer(1, len, S.ctx.sampleRate);
      const d = S.noise.getChannelData(0);
      for (let i = 0; i < len; i++) d[i] = Math.random() * 2 - 1;
      if (S.ctx.state === 'suspended') S.ctx.resume().catch(function () {});
      return true;
    } catch (e) {
      S.ctx = null;
      return false;
    }
  };

  S.setVolume = function (v, deck, fileMode) {
    S.volume = Math.max(0, Math.min(10, v));
    const g = S.muted ? 0 : curve(S.volume);
    if (S.gain) {
      S.gain.gain.cancelScheduledValues(S.ctx.currentTime);
      S.gain.gain.setTargetAtTime(g, S.ctx.currentTime, 0.02);
    }
    if (deck && (fileMode || !S.deckConnected)) deck.volume = g;
    try { localStorage.setItem('nobody.vol', String(S.volume)); } catch (e) {}
  };

  // lowers the deck to `level` (0..1) after the analyser and before the volume, so the analyser still reads the whole
  // signal and the mute still wins; a theme calls duck(1) to give it back, and on dispose
  S.duck = function (level, seconds) {
    if (!S.duckGain) return;
    const t = S.ctx.currentTime;
    S.duckGain.gain.cancelScheduledValues(t);
    S.duckGain.gain.setTargetAtTime(Math.max(0, Math.min(1, level)), t, Math.max(0.01, seconds || 0.15) / 3);
  };

  // the crossfade (issue #87). chan(el) is an element's channel gain; level(el, v) sets it now, cancelling any curve;
  // crossfade(out, in, seconds) runs the equal-power pair (cos and sin of the same quarter turn, so the power sums to 1
  // all the way across) and returns when it ends, in the context's clock
  function chan(el) { return (S.chans || []).find(function (c) { return c.el === el; }) || null; }
  S.chan = function (el) { const c = chan(el); return c ? c.gain : null; };
  S.level = function (el, v) {
    const c = chan(el); if (!c) return;
    const t = S.ctx.currentTime;
    c.gain.gain.cancelScheduledValues(t);
    c.gain.gain.setValueAtTime(v, t);
  };
  S.crossfade = function (outEl, inEl, seconds) {
    const a = chan(outEl), b = chan(inEl); if (!a || !b) return 0;
    const n = 64, down = new Float32Array(n), up = new Float32Array(n), t = S.ctx.currentTime, dur = Math.max(0.02, seconds);
    for (let i = 0; i < n; i++) { const x = i / (n - 1) * Math.PI / 2; down[i] = Math.cos(x); up[i] = Math.sin(x); }
    [a, b].forEach(function (c) { c.gain.gain.cancelScheduledValues(t); });
    a.gain.gain.setValueCurveAtTime(down, t, dur);
    b.gain.gain.setValueCurveAtTime(up, t, dur);
    return t + dur;
  };

  S.setMuted = function (m, deck, fileMode) {
    S.muted = !!m;
    S.setVolume(S.volume, deck, fileMode);
  };

  // the deck gain crossing in from 0 over the last 150 ms of the tuning burst (5.4)
  S.rampIn = function () {
    if (!S.gain || S.muted) return;
    const t = S.ctx.currentTime;
    S.gain.gain.cancelScheduledValues(t);
    S.gain.gain.setValueAtTime(0.0001, t);
    S.gain.gain.exponentialRampToValueAtTime(Math.max(0.0001, curve(S.volume)), t + 0.15);
  };

  // tuning static (5.4), softened: looped white noise through a bandpass (Q .7) sweeping 300 Hz -> 1.4 kHz
  // -> 300 Hz over the 1.2 s, then a lowpass at 2.2 kHz to take the hiss off, with a faint sine whistle gliding
  // 900 Hz -> 250 Hz. envelope 0 -> .09 in 250 ms, hold, -> 0 in 150 ms. returns a function that ends the burst now.
  S.tuning = function (seconds) {
    if (!S.ctx) return function () {};
    const ctx = S.ctx, t0 = ctx.currentTime, dur = Math.max(1.2, seconds || 1.2);
    const src = ctx.createBufferSource();
    src.buffer = S.noise; src.loop = true;
    const bp = ctx.createBiquadFilter();
    bp.type = 'bandpass'; bp.Q.value = 0.7;
    bp.frequency.setValueAtTime(300, t0);
    bp.frequency.exponentialRampToValueAtTime(1400, t0 + dur / 2);
    bp.frequency.exponentialRampToValueAtTime(300, t0 + dur);
    const lp = ctx.createBiquadFilter();
    lp.type = 'lowpass'; lp.frequency.value = 2200;
    const ng = ctx.createGain();
    ng.gain.setValueAtTime(0, t0);
    ng.gain.linearRampToValueAtTime(0.09, t0 + 0.25);
    const osc = ctx.createOscillator();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(900, t0);
    osc.frequency.exponentialRampToValueAtTime(250, t0 + dur);
    const og = ctx.createGain();
    og.gain.value = 0.1;
    src.connect(bp); bp.connect(lp); lp.connect(ng); ng.connect(S.analyser);
    osc.connect(og); og.connect(ng);
    src.start(t0); osc.start(t0);
    let ended = false;
    function stop() {
      if (ended) return; ended = true;
      const t = ctx.currentTime;
      ng.gain.cancelScheduledValues(t);
      ng.gain.setValueAtTime(ng.gain.value, t);
      ng.gain.linearRampToValueAtTime(0, t + 0.15);
      try { src.stop(t + 0.2); osc.stop(t + 0.2); } catch (e) {}
    }
    return stop;
  };

  // a theme's own switch sound (issue #103). the station calls theme.transitionSound(seconds, info) where it called tuning,
  // and tuning when the theme has none. build(ctx, out, t0, dur, k) schedules its nodes into `out`, which feeds the analyser;
  // k.noise() and k.osc(type) make a source that starts now and stops with the sound, k.env(param, [[s, v], ...]) ramps a
  // param linearly through points given in seconds from now (the first point is set, not ramped). returns stop(): a 150 ms
  // fade like the static's, then every source stops.
  S.sound = function (seconds, build) {
    if (!S.ctx) return function () {};
    const ctx = S.ctx, t0 = ctx.currentTime, dur = Math.max(1.2, seconds || 1.2), srcs = [];
    const out = ctx.createGain(); out.connect(S.analyser);
    const k = {
      noise: function () { const s = ctx.createBufferSource(); s.buffer = S.noise; s.loop = true; s.start(t0, Math.random() * 1.9); srcs.push(s); return s; },
      osc: function (type) { const o = ctx.createOscillator(); o.type = type || 'sine'; o.start(t0); srcs.push(o); return o; },
      env: function (p, pts) { pts.forEach(function (q, i) { if (i) p.linearRampToValueAtTime(q[1], t0 + q[0]); else p.setValueAtTime(q[1], t0 + q[0]); }); return p; }
    };
    build(ctx, out, t0, dur, k);
    let ended = false;
    return function stop() {
      if (ended) return; ended = true;
      const t = ctx.currentTime;
      out.gain.cancelScheduledValues(t);
      out.gain.setValueAtTime(out.gain.value, t);
      out.gain.linearRampToValueAtTime(0, t + 0.15);
      srcs.forEach(function (s) { try { s.stop(t + 0.2); } catch (e) {} });
    };
  };

  // the ident (4.5): three square notes 880, 1174.7, 1760 Hz, 120 ms each, 20 ms gaps, lowpass 4 kHz, gain .15
  S.ident = function () {
    if (!S.ctx) return false;
    const ctx = S.ctx, lp = ctx.createBiquadFilter();
    lp.type = 'lowpass'; lp.frequency.value = 4000;
    const g = ctx.createGain(); g.gain.value = 0.15;
    lp.connect(g); g.connect(S.analyser);
    let t = ctx.currentTime + 0.02;
    [880, 1174.7, 1760].forEach(function (f) {
      const o = ctx.createOscillator();
      o.type = 'square'; o.frequency.value = f;
      o.connect(lp);
      o.start(t); o.stop(t + 0.12);
      t += 0.14;
    });
    return true;
  };

  // dead-air bed (5.4): the noise through a lowpass at 900 Hz, gain .04, a .1 Hz LFO on the cutoff
  S.bedStart = function () {
    if (!S.ctx || S.bed) return;
    const ctx = S.ctx;
    const src = ctx.createBufferSource(); src.buffer = S.noise; src.loop = true;
    const lp = ctx.createBiquadFilter(); lp.type = 'lowpass'; lp.frequency.value = 900;
    const g = ctx.createGain(); g.gain.value = 0.04;
    const lfo = ctx.createOscillator(); lfo.frequency.value = 0.1;
    const lfoG = ctx.createGain(); lfoG.gain.value = 400;
    lfo.connect(lfoG); lfoG.connect(lp.frequency);
    src.connect(lp); lp.connect(g); g.connect(S.analyser);
    src.start(); lfo.start();
    S.bed = { src: src, lfo: lfo, g: g };
  };
  S.bedStop = function () {
    if (!S.bed) return;
    const t = S.ctx.currentTime;
    S.bed.g.gain.setTargetAtTime(0, t, 0.1);
    try { S.bed.src.stop(t + 0.5); S.bed.lfo.stop(t + 0.5); } catch (e) {}
    S.bed = null;
  };

  // key click (5.4): a 6 ms noise burst at gain .08, off by default
  S.click = function () {
    if (!S.ctx || !S.clicks) return;
    const ctx = S.ctx, src = ctx.createBufferSource();
    src.buffer = S.noise;
    const g = ctx.createGain(); g.gain.value = 0.08;
    src.connect(g); g.connect(S.gain);
    const t = ctx.currentTime;
    src.start(t, Math.random() * 1.5, 0.006);
  };

  return S;
})();
