/* nobody fm: the audio chain and everything synthesised in the browser (design 5.1, 5.4).
   nothing here is fetched; nobody who built it could hear it. the graph is:
   deck -> MediaElementSource -> Analyser (fft 2048, smoothing .82) -> Gain -> destination
   the analyser sits before the gain, so a muted page (gain 0) still feeds it the full signal. */
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
  S.create = function (deck, connectDeck, mute) {
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
      S.analyser.connect(S.gain);
      S.gain.connect(S.ctx.destination);
      if (connectDeck) {
        S.source = S.ctx.createMediaElementSource(deck);
        S.source.connect(S.analyser);
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

  // tuning static (5.4): looped white noise through a bandpass (Q .7) sweeping 400 Hz -> 3.2 kHz -> 400 Hz
  // over the 1.2 s, with a sine heterodyne whistle gliding 1.8 kHz -> 300 Hz at a quarter of the noise gain.
  // envelope 0 -> .35 in 80 ms, hold, -> 0 in 150 ms. returns a function that ends the burst now.
  S.tuning = function (seconds) {
    if (!S.ctx) return function () {};
    const ctx = S.ctx, t0 = ctx.currentTime, dur = Math.max(1.2, seconds || 1.2);
    const src = ctx.createBufferSource();
    src.buffer = S.noise; src.loop = true;
    const bp = ctx.createBiquadFilter();
    bp.type = 'bandpass'; bp.Q.value = 0.7;
    bp.frequency.setValueAtTime(400, t0);
    bp.frequency.exponentialRampToValueAtTime(3200, t0 + dur / 2);
    bp.frequency.exponentialRampToValueAtTime(400, t0 + dur);
    const ng = ctx.createGain();
    ng.gain.setValueAtTime(0, t0);
    ng.gain.linearRampToValueAtTime(0.35, t0 + 0.08);
    const osc = ctx.createOscillator();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(1800, t0);
    osc.frequency.exponentialRampToValueAtTime(300, t0 + dur);
    const og = ctx.createGain();
    og.gain.value = 0.25;
    src.connect(bp); bp.connect(ng); ng.connect(S.analyser);
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
