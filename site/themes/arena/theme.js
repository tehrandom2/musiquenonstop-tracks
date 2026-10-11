/* nobody fm, theme "arena": a dark stage for the visualiser (design 12.0, 12.15). the signature widget is the big
   scrubber in the transmitter card: a row of bars that is the loudness profile of the playing track (decoded from the
   file over http, recorded from the analyser as it plays otherwise), the played part in the track's hue, a white head,
   the time under the pointer. the four fat buttons become the dock's icon buttons. behind the page a canvas: aurora
   glows, a liquid spectrum along the floor, an oscilloscope ribbon, drifting dust, tracers that fire on the kick. the
   whole page re-tints to the track through --h. nothing here changes what the station does; it draws what the
   station tells it, and nobody who built it can hear. */
window.NOBODY = window.NOBODY || {};
NOBODY.themes = NOBODY.themes || {};
NOBODY.themes.arena = (function () {
  const TH = { name: 'arena', blurb: 'a dark stage. one big scrubber, icon buttons, the page re-tints to the track.' };
  const reduced = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const TAU = Math.PI * 2, BUCKETS = 200;
  let ctx = null, V = null, A = null, glass = null, power = null, S = null;
  let stage = null, vignette = null, grain = null, scrub = null, scopeCanvas = null, scopeCtx = null, dialStrip = null, chipWatch = null, orbit = null;
  const hues = {}, profiles = {};
  function el(id) { return ctx.el[id] || document.getElementById(id); }
  function clamp(v, a, b) { return Math.max(a, Math.min(b, v)); }
  function ease(dt, rate) { return 1 - Math.exp(-dt * rate); }
  function hashStr(s) { let h = 2166136261; for (let i = 0; i < s.length; i++) { h ^= s.charCodeAt(i); h = Math.imul(h, 16777619); } return h >>> 0; }
  function amberLocked() { return document.documentElement.dataset.phosphor === 'amber'; }

  /* ---- strings (12.0): the stage's own eight lines, at the station's times ---- */
  TH.strings = {
    boot: function (n, voices, phone, localOnly, backend) {
      const vtxt = voices === 1 ? '1 with a voice' : voices + ' with a voice';
      const ttxt = n === 1 ? '1 track' : n + ' tracks';
      if (phone) return [
        ['NOBODY STAGE  88.8', ''], ['rig ......... ', 'up'], ['floor ....... ', 'cleared'], ['lights ...... ', 'on'],
        ['aerial ...... ', 'found'], ['setlist ..... ', ttxt + ', ' + voices + ' voice'], ['backend ..... ', localOnly ? 'not on the wire' : 'on the wire'], ['audio ....... ', 'waiting for a human', 'amber']
      ];
      return [
        ['NOBODY STAGE  doors at 88.8', ''], ['rig ................ ', 'up, line checked'], ['floor .............. ', 'cleared'],
        ['lights ............. ', 'on, no colour yet'], ['aerial ............. ', 'found'],
        ['setlist ............ tracks/index.json .... ', ttxt + ', ' + vtxt], ['backend ............ ', localOnly ? 'not on the wire (local mode)' : backend],
        ['audio .............. ', 'waiting for a human', 'amber']
      ];
    },
    wait: function (phone) { return phone ? '[ tap the stage to go on air ]' : '[ press any key, or tap the stage, to go on air ]'; },
    tagline: 'the transmitter nobody can find.',
    licence: 'nobody fm. every track generated locally from a text prompt. no samples, no reference audio, no third-party rights claimed. best watched from the floor, loud.',
    switched: 'theme: arena. the lights come up. the stage takes the colour of the track.',
    idle: 'idle. paused for ten minutes. the stage is lit for nobody.'
  };

  /* ---- lifecycle ---- */
  TH.init = function (c) {
    ctx = c; V = c.V; A = c.A; glass = c.glass; power = c.power; S = c.S;
    grain = document.createElement('div'); grain.className = 'grain'; grain.setAttribute('aria-hidden', 'true');
    vignette = document.createElement('div'); vignette.className = 'vignette'; vignette.setAttribute('aria-hidden', 'true');
    stage = makeStage();
    document.body.insertBefore(grain, document.body.firstChild);
    document.body.insertBefore(vignette, document.body.firstChild);
    document.body.insertBefore(stage.cv, document.body.firstChild);
    // the widget slot (12.0): the scrubber lives in the progress element, which the station hands to progress() anyway
    scrub = makeScrubber(el('progress'));
    el('scope').textContent = '';
    scopeCanvas = document.createElement('canvas'); scopeCanvas.setAttribute('aria-label', 'oscilloscope'); el('scope').appendChild(scopeCanvas);
    const lab = document.createElement('span'); lab.className = 'dim scope-label'; lab.textContent = 'scope'; el('scope').appendChild(lab);
    scopeCtx = scopeCanvas.getContext('2d');
    el('licence').textContent = TH.strings.licence;
    el('hdrBar').textContent = ''; el('hdrBar').className = 'hdr-rail'; el('hdrBar').appendChild(document.createElement('i'));
    dialStrip = makeDialStrip(el('dial'));
    chipWatch = new MutationObserver(syncPlaying);
    chipWatch.observe(el('chip'), { childList: true, characterData: true, subtree: true });
    syncPlaying();
    TH.catalogue(S.tracks);
    TH.scheme();
    TH.resize();
  };
  TH.dispose = function () {
    if (stage) { stage.stop(); stage.cv.remove(); stage = null; }
    [vignette, grain, orbit].forEach(function (n) { if (n) n.remove(); }); vignette = grain = orbit = null;
    if (chipWatch) { chipWatch.disconnect(); chipWatch = null; }
    document.body.classList.remove('is-playing');
    document.documentElement.style.removeProperty('--h');
    el('scope').textContent = ''; scopeCanvas = null; scopeCtx = null;
    el('progress').textContent = ''; scrub = null; el('hdrBar').className = 'dim'; el('hdrBar').textContent = '............';
    el('dial').textContent = ''; dialStrip = null;
    el('towerStatic').textContent = ''; el('towerStatic').hidden = true;
    glass.classList.remove('closing', 'bloom-on');
  };
  function syncPlaying() { document.body.classList.toggle('is-playing', /ON AIR/.test(el('chip').textContent)); }
  TH.resize = function () {
    if (scopeCanvas && scopeCtx) {
      const dpr = window.devicePixelRatio || 1, sw = scopeCanvas.clientWidth || 500, sh = scopeCanvas.clientHeight || V.rowPx();
      scopeCanvas.width = Math.round(sw * dpr); scopeCanvas.height = Math.round(sh * dpr); scopeCtx.setTransform(dpr, 0, 0, dpr, 0, 0);
      scopeCanvas.dataset.w = sw; scopeCanvas.dataset.h = sh;
    }
    if (stage) stage.size();
    if (scrub) scrub.draw();
    if (dialStrip && S && S.state === 'tuning') dialStrip.set(88.8, false, '');
  };

  /* ---- the hue (12.15): every track gets one, fast tracks run hot and slow ones cool, golden-ratio steps apart ---- */
  TH.catalogue = function (tracks) {
    const PHI = 0.6180339887;
    let fast = 0, slow = 0;
    (tracks || []).forEach(function (t) {
      const isSlow = t.bpm && t.bpm < 100;
      const u = ((isSlow ? slow++ : fast++) * PHI + (isSlow ? 0.2 : 0.05)) % 1;
      hues[t.slug] = Math.round(isSlow ? 170 + u * 105 : 288 + u * 112) % 360;
    });
  };
  function hueOf(slug) { if (amberLocked()) return 36; if (slug && hues[slug] != null) return hues[slug]; return slug ? hashStr(slug) % 360 : 285; }
  function setHue(slug) {
    const h = hueOf(slug);
    document.documentElement.style.setProperty('--h', String(h));
    if (stage) stage.targetHue = h;
  }
  TH.playing = function (slug) { setHue(slug); if (scrub) scrub.draw(); };
  // the switch sound (issue #103): a low swell into the next track's colour, no hiss. the hue picks the root, one semitone
  // per 30 degrees up from A1; root, fifth and octave glide up a whole tone into it as a lowpass opens over the triangle
  TH.transitionSound = function (seconds, info) {
    const f = 55 * Math.pow(2, Math.round(hueOf(info && info.slug) / 30) % 12 / 12);
    return NOBODY.synth.sound(seconds, function (c, out, t0, dur, k) {
      const lp = c.createBiquadFilter(); lp.type = 'lowpass'; lp.Q.value = 0.9;
      lp.frequency.setValueAtTime(150, t0); lp.frequency.exponentialRampToValueAtTime(1400, t0 + dur);
      const g = c.createGain(); k.env(g.gain, [[0, 0], [0.25, 0.007], [0.7, 0.012], [dur, 0.019]]);
      lp.connect(g); g.connect(out);
      [[1, 'sine', 1], [1.5, 'sine', 0.6], [2, 'triangle', 0.5]].forEach(function (v) {
        const o = k.osc(v[1]), og = c.createGain(); og.gain.value = v[2];
        o.frequency.setValueAtTime(f * v[0] * 0.8909, t0); o.frequency.exponentialRampToValueAtTime(f * v[0], t0 + dur);
        o.connect(og); og.connect(lp);
      });
    });
  };
  TH.scheme = function () { setHue(S.current); };

  /* ---- transitions (12.0): a flash for the boot and the key, tracers for the tuning, the lights down for a reboot ---- */
  TH.transition = function (from, to, info) {
    info = info || {};
    if (to === 'boot') {
      glass.classList.remove('closing');
      return new Promise(function (res) { flash(); setTimeout(function () { glass.classList.remove('off'); setTimeout(function () { settle(); res(); }, 320); }, 100); });
    }
    if (to === 'off') {
      return new Promise(function (res) { glass.classList.add('closing'); setTimeout(function () { glass.classList.add('off'); glass.classList.remove('closing'); res(); }, 380); });
    }
    if (to === 'air') { flash(); glass.classList.add('bloom-on'); setTimeout(function () { glass.classList.remove('bloom-on'); }, 300); if (stage) stage.beat(1); }
    if (to === 'tuning') { if (stage) { stage.beat(0.9); stage.beat(0.9); } }
    if (to === 'playing') { if (stage) stage.beat(0.7); decodeProfile(info.slug, ctx.deck.currentSrc || ctx.deck.src); if (scrub) scrub.draw(); }
    if (to === 'home' || to === 'page' || to === 'guestbook') { if (scrub) scrub.draw(); }
    return Promise.resolve();
  };
  // a compositor fade can freeze when the page is driven by a virtual clock (the harness) and leave the glass half in; once
  // the fade's time has passed the end state is set by hand, with the transition off for a beat so it applies at once
  function settle() { glass.style.transition = 'none'; void glass.offsetWidth; /* a style flush, or the two edits collapse into none */ setTimeout(function () { glass.style.transition = ''; }, 50); }
  function flash() {
    power.classList.remove('fade'); power.classList.add('on');
    setTimeout(function () { power.classList.add('fade'); setTimeout(function () { power.classList.remove('on', 'fade'); }, 180); }, 20);
  }

  /* ---- the loudness profile (12.15): 200 buckets per track. over http the file is decoded once; otherwise the
     analyser's loudness is written into the bucket under the head as the track plays, and the rest is a guess ---- */
  function profileOf(slug) {
    if (!slug) return null;
    if (!profiles[slug]) profiles[slug] = { data: new Float32Array(BUCKETS), live: new Float32Array(BUCKETS), decoded: false, pending: false, seen: 0 };
    return profiles[slug];
  }
  function decodeProfile(slug, src) {
    const p = profileOf(slug);
    if (!p || p.decoded || p.pending || !src || !/^https?:/.test(src)) return;
    const sctx = NOBODY.synth && NOBODY.synth.ctx;
    if (!sctx || !sctx.decodeAudioData) return;
    p.pending = true;
    fetch(src).then(function (r) { if (!r.ok) throw new Error(r.status); return r.arrayBuffer(); })
      .then(function (buf) { return sctx.decodeAudioData(buf); })
      .then(function (ab) {
        const ch = ab.getChannelData(0), n = ch.length, per = Math.max(1, Math.floor(n / BUCKETS));
        let max = 0;
        for (let b = 0; b < BUCKETS; b++) {
          let s = 0; const i0 = b * per, i1 = Math.min(n, i0 + per);
          for (let i = i0; i < i1; i += 4) s += ch[i] * ch[i];
          const rms = Math.sqrt(s / Math.max(1, (i1 - i0) / 4));
          p.data[b] = rms; if (rms > max) max = rms;
        }
        if (max > 0) for (let b = 0; b < BUCKETS; b++) p.data[b] /= max;
        p.decoded = true; p.pending = false;
        if (scrub && S.current === slug) scrub.draw();
      })
      .catch(function () { p.pending = false; });
  }
  function recordLive(slug, c, d, loud) {
    const p = profileOf(slug);
    if (!p || p.decoded || !d) return;
    const b = clamp(Math.floor(c / d * BUCKETS), 0, BUCKETS - 1);
    if (loud > p.live[b]) p.live[b] = loud;
    if (b + 1 > p.seen) p.seen = b + 1;
  }
  function profileValues(slug) {
    const p = profileOf(slug);
    const out = new Float32Array(BUCKETS);
    if (!p) return out.fill(0.12);
    if (p.decoded) { out.set(p.data); return out; }
    let max = 0; for (let b = 0; b < p.seen; b++) max = Math.max(max, p.live[b]);
    const h = hashStr(slug || 'nobody');
    for (let b = 0; b < BUCKETS; b++) {
      if (b < p.seen && max > 0) out[b] = clamp(p.live[b] / Math.max(0.3, max), 0.05, 1);
      else out[b] = 0.1 + 0.08 * Math.abs(Math.sin(b * 0.37 + h % 97)); // not played yet: a quiet guess
    }
    return out;
  }

  /* ---- the scrubber (12.15): the widget. bars 3 px wide, the played part in the track's hue, a white head ---- */
  function makeScrubber(host) {
    host.textContent = '';
    const t1 = document.createElement('span'); t1.className = 'time cur'; t1.textContent = '0:00';
    const wave = document.createElement('span'); wave.className = 'wave';
    const canvas = document.createElement('canvas'); canvas.setAttribute('aria-hidden', 'true'); wave.appendChild(canvas);
    const hover = document.createElement('span'); hover.className = 'hover'; wave.appendChild(hover);
    const t2 = document.createElement('span'); t2.className = 'time dur'; t2.textContent = '0:00';
    host.appendChild(t1); host.appendChild(wave); host.appendChild(t2);
    const g = canvas.getContext('2d');
    const W = { host: host, wave: wave, canvas: canvas, cur: 0, dur: 0, hoverFrac: -1 };
    W.draw = function () {
      const dpr = Math.min(window.devicePixelRatio || 1, 2), w = canvas.clientWidth, h = canvas.clientHeight;
      if (!w || !h) return;
      if (canvas.width !== Math.round(w * dpr) || canvas.height !== Math.round(h * dpr)) { canvas.width = Math.round(w * dpr); canvas.height = Math.round(h * dpr); }
      g.setTransform(dpr, 0, 0, dpr, 0, 0); g.clearRect(0, 0, w, h);
      const bar = 3, gap = 1.5, n = Math.max(8, Math.floor(w / (bar + gap)));
      const slug = S.current, vals = profileValues(slug), frac = W.dur ? clamp(W.cur / W.dur, 0, 1) : 0, px = frac * w;
      const hue = stage ? stage.hue : hueOf(slug), kick = stage ? stage.kick : 0;
      const grad = g.createLinearGradient(0, 0, w, 0); grad.addColorStop(0, 'hsl(' + (hue - 20) + ', 96%, 62%)'); grad.addColorStop(1, 'hsl(' + (hue + 25) + ', 100%, 78%)');
      for (let i = 0; i < n; i++) {
        const x = i * (bar + gap), near = Math.max(0, 1 - Math.abs(x - px) / 40);
        const v = Math.pow(vals[Math.floor(i / n * BUCKETS)], 1.4);
        const bh = Math.max(2, v * (h - 4) * (1 + near * kick * 0.25));
        const played = x + bar <= px, hov = W.hoverFrac >= 0 && x <= W.hoverFrac * w;
        g.fillStyle = played ? grad : hov ? 'rgba(255,255,255,.42)' : 'rgba(255,255,255,.2)';
        roundRect(g, x, (h - bh) / 2, bar, bh, 1.5); g.fill();
      }
      if (slug) {
        g.fillStyle = '#fff'; g.shadowColor = 'hsl(' + hue + ', 100%, 65%)'; g.shadowBlur = 10 + kick * 14;
        g.fillRect(px - 1, 1, 2, h - 2); g.shadowBlur = 0;
      }
    };
    wave.addEventListener('pointermove', function (e) {
      const r = wave.getBoundingClientRect(), f = clamp((e.clientX - r.left) / r.width, 0, 1);
      W.hoverFrac = f; hover.textContent = ctx.fmt(f * W.dur); hover.style.left = (f * 100).toFixed(2) + '%'; W.draw();
    });
    wave.addEventListener('pointerleave', function () { W.hoverFrac = -1; W.draw(); });
    W.set = function (c, d, phone) { W.cur = c; W.dur = d; t1.textContent = ctx.fmt(c); t2.textContent = ctx.fmt(d); W.draw(); };
    return W;
  }
  function roundRect(g, x, y, w, h, r) {
    r = Math.min(r, w / 2, h / 2);
    g.beginPath(); g.moveTo(x + r, y); g.lineTo(x + w - r, y); g.quadraticCurveTo(x + w, y, x + w, y + r); g.lineTo(x + w, y + h - r); g.quadraticCurveTo(x + w, y + h, x + w - r, y + h); g.lineTo(x + r, y + h); g.quadraticCurveTo(x, y + h, x, y + h - r); g.lineTo(x, y + r); g.quadraticCurveTo(x, y, x + r, y); g.closePath();
  }

  /* ---- widgets ---- */
  TH.stationName = function (button) { button.textContent = 'NOBODY FM'; };
  // the banner is the big title: one span per letter over a stroked ghost that moves with the beat
  TH.banner = function (bannerEl, phone, scramble) {
    const text = 'NOBODY FM';
    bannerEl.textContent = '';
    const title = document.createElement('span'); title.className = 'title';
    const ghost = document.createElement('span'); ghost.className = 'ghost'; ghost.textContent = text; ghost.setAttribute('aria-hidden', 'true');
    const letters = document.createElement('span'); letters.className = 'letters';
    text.split('').forEach(function (ch) { const s = document.createElement('span'); s.textContent = ch; letters.appendChild(s); });
    title.appendChild(ghost); title.appendChild(letters); bannerEl.appendChild(title);
    if (scramble) letters.querySelectorAll('span').forEach(function (s, i) { if (s.textContent !== ' ') { s.textContent = V.scrambled(s.textContent); setTimeout(function () { s.textContent = text[i]; }, 300 + i * 70); } });
  };
  TH.progress = function (progressEl, hdrBarEl, c, d, phone, view) {
    if (!scrub || scrub.host !== progressEl) scrub = makeScrubber(progressEl);
    scrub.set(c, d, phone);
    if (view !== 'home') { const bar = hdrBarEl.querySelector('i'); if (bar) bar.style.width = (d ? clamp(c / d * 100, 0, 100) : 0).toFixed(2) + '%'; }
  };
  TH.progressHit = function (progressEl, x) { const rail = progressEl.querySelector('.wave') || progressEl, r = rail.getBoundingClientRect(); return clamp((x - r.left) / r.width, 0, 1); };
  // the dial is a strip of frequencies under a white needle
  function makeDialStrip(host) {
    host.textContent = '';
    const strip = document.createElement('div'); strip.className = 'dial-strip';
    let ticks = '', labels = '';
    for (let i = 0; i <= 110; i++) ticks += (i % 5 === 0) ? '|' : '.';
    for (let k = 0; k <= 22; k++) labels += (86 + k).toFixed(1) + ' ';
    const t = document.createElement('pre'); t.textContent = ticks; strip.appendChild(t);
    const l = document.createElement('pre'); l.className = 'labels'; l.textContent = labels; strip.appendChild(l);
    host.appendChild(strip);
    const read = document.createElement('span'); read.className = 'dial-read'; host.appendChild(read);
    return {
      set: function (f, locked, note) {
        const ch = V.fontPx() * 0.6, w = host.clientWidth || 600;
        strip.style.transform = 'translateX(' + (w / 2 - (f - 86) / 0.2 * ch - ch / 2).toFixed(1) + 'px)';
        read.textContent = f.toFixed(1) + (note ? '  ' + note : '');
        host.classList.toggle('locked', !!locked);
      }
    };
  }
  TH.dial = function (dialEl, f, locked, note) { if (!dialStrip) dialStrip = makeDialStrip(dialEl); dialStrip.set(f, locked, note); };
  // the icon slider of 12.15 is now the shared fader (volume.js, 12.0 controls): the speaker glyph mutes, the rail sets 0..10;
  // this theme styles it (the glyph instead of the word, the accent fill, the white handle) and decorates nothing
  TH.volume = function () {};
  // dead air: an empty orbit turning in the card, lit for nobody
  TH.towerStart = function (hostEl, staticEl) {
    if (!orbit || orbit.parentNode !== hostEl) {
      orbit = document.createElement('div'); orbit.className = 'orbit'; orbit.setAttribute('aria-hidden', 'true');
      orbit.appendChild(document.createElement('i'));
      const t = document.createElement('span'); t.className = 'orbit-text'; t.textContent = 'no tracks'; orbit.appendChild(t);
      hostEl.replaceChildren(orbit);
    }
    staticEl.hidden = true;
    return 'orbit';
  };
  TH.towerStop = function () {};
  TH.towerState = function () { return 'an empty orbit turning in the card'; };

  /* ---- the card's analyser (12.15): bars in the hue with a hot top, white peaks; the ribbon under it ---- */
  let gainHold = 1;
  function autoGain(s) {
    let m = 0; for (let i = 0; i < s.length; i++) m = Math.max(m, Math.abs(s[i]));
    const want = m > 0.02 ? Math.min(12, 0.8 / m) : gainHold;
    gainHold += (want - gainHold) * 0.05;
    return gainHold;
  }
  TH.frame = function (A_, S_, now) {
    if (!A.ctx2d) return;
    const g = A.ctx2d, W = A.W, H = A.H, hue = stage ? stage.hue : hueOf(S.current);
    g.clearRect(0, 0, W, H);
    const phone = V.phone();
    const cellW = V.fontPx() * 0.6, totalCols = Math.floor(W / cellW);
    A.totalCols = totalCols;
    const labelCols = phone ? 10 : 24;
    const areaCols = Math.max(A.bands, totalCols - 2 - labelCols);
    const areaW = Math.min(W - 2 * cellW, areaCols * cellW), x0 = 2 * cellW;
    g.fillStyle = 'rgba(255,255,255,.2)'; g.fillRect(0, 0, 1, H);
    if (A.mode === 'scope5') { drawScope5(g, hue, x0, areaW, H); return; }
    const per = areaW / A.bands, bw = Math.max(2, per * 0.6);
    const grad = g.createLinearGradient(0, H, 0, 0); grad.addColorStop(0, 'hsl(' + (hue - 20) + ', 96%, 58%)'); grad.addColorStop(0.7, 'hsl(' + hue + ', 96%, 66%)'); grad.addColorStop(1, 'hsl(' + (hue + 18) + ', 100%, 82%)');
    const rows = A.rows, cellH = H / rows;
    for (let b = 0; b < A.bands; b++) {
      const v = A.vals[b];
      const cells = Math.min(rows, Math.floor(Math.pow(v, 0.8) * (rows + 0.99)));
      const hgt = Math.max(0, Math.pow(v, 0.8) * H);
      if (cells > A.peaks[b]) { A.peaks[b] = cells; A.peakAt[b] = now; }
      else if (now - A.peakAt[b] > 150 && A.peaks[b] > 0) { A.peaks[b]--; A.peakAt[b] = now; }
      const x = x0 + b * per + (per - bw) / 2;
      g.shadowColor = 'hsla(' + hue + ', 100%, 62%, .55)'; g.shadowBlur = 10;
      g.fillStyle = grad;
      if (hgt > 1) { if (A.flip) roundRect(g, x, 0, bw, hgt, 1.5); else roundRect(g, x, H - hgt, bw, hgt, 1.5); g.fill(); }
      const pk = A.peaks[b];
      if (pk > cells && pk <= rows) {
        const y = A.flip ? pk * cellH - 2 : H - pk * cellH;
        g.shadowBlur = 0; g.fillStyle = '#fff';
        g.fillRect(x, y, bw, 2);
      }
    }
    g.shadowBlur = 0;
    A.baselineText(A.live);
    scopeRibbon(hue);
    // the profile fills in under the head as the track plays (when it was not decoded)
    if (S.current && ctx.deck && !ctx.deck.paused) recordLive(S.current, ctx.deck.currentTime, ctx.deck.duration, A.loud);
    if (scrub && stage && stage.kick > 0.4) scrub.draw(); // the bars near the head swell on the kick; timeupdate redraws the rest
  };
  function scopeRibbon(hue) {
    if (!scopeCtx) return;
    const W = +scopeCanvas.dataset.w || 500, H = +scopeCanvas.dataset.h || 20, n = Math.max(32, Math.floor(W / 3));
    const s = A.samples(n), gn = autoGain(s), g = scopeCtx;
    g.clearRect(0, 0, W, H);
    g.lineWidth = 1.2; g.strokeStyle = 'hsl(' + (hue + 20) + ', 100%, 75%)'; g.shadowColor = 'hsl(' + hue + ', 100%, 65%)'; g.shadowBlur = 6;
    g.beginPath();
    for (let i = 0; i < n; i++) { const x = i / (n - 1) * W, y = H / 2 - s[i] * gn * (H / 2 - 1); if (i) g.lineTo(x, y); else g.moveTo(x, y); }
    g.stroke(); g.shadowBlur = 0;
  }
  function drawScope5(g, hue, x0, areaW, H) {
    const n = Math.max(32, Math.floor(areaW / 2)), s = A.samples(n), gn = autoGain(s);
    g.lineWidth = 1.5; g.strokeStyle = 'hsl(' + (hue + 18) + ', 100%, 82%)'; g.shadowColor = 'hsl(' + hue + ', 100%, 65%)'; g.shadowBlur = 10;
    g.beginPath();
    for (let i = 0; i < n; i++) { const x = x0 + i / (n - 1) * areaW, y = H / 2 - s[i] * gn * (H / 2 - 2); if (i) g.lineTo(x, y); else g.moveTo(x, y); }
    g.stroke(); g.shadowBlur = 0;
    A.baselineText(true);
    if (scopeCtx) scopeCtx.clearRect(0, 0, +scopeCanvas.dataset.w || 500, +scopeCanvas.dataset.h || 20);
  }

  /* ---- the stage (12.15): layers back to front, aurora glows on a soft eighth-size canvas, a liquid spectrum along
     the floor and a faint mirror at the top, an oscilloscope ribbon, dust, shockwaves and tracers on the kick.
     nothing snaps: every value is eased with a rate that does not depend on the frame rate ---- */
  function makeStage() {
    const cv = document.createElement('canvas'); cv.className = 'stage'; cv.id = 'arenaStage'; cv.setAttribute('aria-hidden', 'true');
    const g = cv.getContext('2d', { alpha: false });
    const soft = document.createElement('canvas'), sg = soft.getContext('2d'), SOFT = 8;
    const NB = 96, NW = 160;
    const Z = { cv: cv, w: 0, h: 0, dpr: 1, scale: 1, running: true, raf: 0, frames: 0, ms: 0, T: 0, last: 0, mix: 0,
      bars: new Float32Array(NB), slow: new Float32Array(NB), wave: new Float32Array(NW), prevLow: new Float32Array(8),
      bass: 0, mid: 0, high: 0, kick: 0, flux: 0, fluxAvg: 0, lastBeat: -10, hue: 285, targetHue: 285, tracers: [], sparks: [], shocks: [], dust: [], work: 0, slowN: 0, quickN: 0, times: [] };
    Z.size = function () {
      Z.dpr = Math.min(window.devicePixelRatio || 1, 1.5) * Z.scale;
      Z.w = innerWidth; Z.h = innerHeight;
      cv.width = Math.round(Z.w * Z.dpr); cv.height = Math.round(Z.h * Z.dpr);
      soft.width = Math.max(2, Math.round(Z.w / SOFT)); soft.height = Math.max(2, Math.round(Z.h / SOFT));
      if (!Z.dust.length) { const n = reduced ? 30 : Math.round(clamp(Z.w * Z.h / 16000, 40, 110)); for (let i = 0; i < n; i++) Z.dust.push({ x: Math.random() * Z.w, y: Math.random() * Z.h, z: 0.15 + Math.random() * 0.85, ph: Math.random() * TAU }); }
    };
    Z.beat = function (strength) {
      Z.kick = Math.max(Z.kick, strength); Z.lastBeat = Z.T;
      if (reduced) return;
      Z.shocks.push({ x: Z.w / 2, y: Z.h * 0.35, r: 40, a: 0.25 + strength * 0.4 });
      const n = strength > 0.75 ? 3 : strength > 0.45 ? 2 : Math.random() < 0.6 ? 1 : 0;
      for (let i = 0; i < n && Z.tracers.length < 24; i++) spawnTracer(strength);
    };
    function spawnTracer(strength) {
      const side = Math.floor(Math.random() * 4);
      const x = side === 0 ? 0 : side === 1 ? Z.w : Math.random() * Z.w, y = side === 2 ? 0 : side === 3 ? Z.h : Math.random() * Z.h;
      const a = Math.atan2(Z.h / 2 - y, Z.w / 2 - x) + (Math.random() - 0.5) * 1.2, sp = 650 + strength * 900 + Math.random() * 300;
      Z.tracers.push({ x: x, y: y, vx: Math.cos(a) * sp, vy: Math.sin(a) * sp, trail: [], maxTrail: Math.round(6 + strength * 10), bounces: 1 + (Math.random() < 0.55 ? 1 : 0), hue: Z.hue + (Math.random() * 50 - 25), w: 1.2 + strength * 1.6, dead: false });
    }
    function burst(x, y, nx, ny, hue) {
      for (let i = 0; i < 9; i++) { const a = Math.atan2(ny, nx) + (Math.random() - 0.5) * 2.2, sp = 120 + Math.random() * 380; Z.sparks.push({ x: x, y: y, vx: Math.cos(a) * sp, vy: Math.sin(a) * sp, life: 0.35 + Math.random() * 0.4, age: 0, hue: hue }); }
    }
    function analyse(dt) {
      const onAir = S && S.onAir, live = onAir && A && A.v64 && (A.live || A.ghost || A.tuning);
      Z.mix += ((live ? 1 : 0) - Z.mix) * ease(dt, live ? 4 : 1.6);
      const T = Z.T;
      for (let i = 0; i < NB; i++) {
        const u = i / NB;
        const idle = (0.2 + 0.1 * Math.sin(T * 0.8 + i * 0.16) + 0.07 * Math.sin(T * 1.7 - i * 0.07) + 0.05 * Math.sin(T * 0.33 + i * 0.41)) * (1 - u * 0.55) + Z.kick * 0.25 * (1 - u);
        let real = 0;
        if (live) { const k = u * 63, a = A.v64[Math.floor(k)], b = A.v64[Math.min(63, Math.floor(k) + 1)]; real = Math.min(1, Math.pow(a + (b - a) * (k % 1), 1.15) * (1 + u * 0.6)); }
        const target = idle * (1 - Z.mix) + real * Z.mix, cur = Z.bars[i];
        Z.bars[i] = cur + (target - cur) * (target > cur ? ease(dt, 26) : ease(dt, 6.5));
        Z.slow[i] += (Z.bars[i] - Z.slow[i]) * ease(dt, 2.2);
      }
      const smp = live ? A.samples(NW) : null;
      for (let j = 0; j < NW; j++) {
        const idle = 0.16 * Math.sin(T * 1.6 + j * 0.085) * Math.sin(T * 0.53 + j * 0.021) + 0.05 * Math.sin(T * 3.1 - j * 0.3);
        const real = smp ? smp[j] : 0;
        const target = idle * (1 - Z.mix) + real * Z.mix * 1.4;
        Z.wave[j] += (target - Z.wave[j]) * ease(dt, 18);
      }
      let b = 0, m = 0, h = 0;
      for (let i = 0; i < 10; i++) b += Z.bars[i];
      for (let i = 22; i < 52; i++) m += Z.bars[i];
      for (let i = 60; i < 90; i++) h += Z.bars[i];
      Z.bass += (b / 10 - Z.bass) * ease(dt, 10); Z.mid += (m / 30 - Z.mid) * ease(dt, 8); Z.high += (h / 30 - Z.high) * ease(dt, 8);
      // onsets from spectral flux in the kick's range against a running average, so a wall of sub bass is not one endless beat
      if (live && A.live) {
        let flux = 0;
        for (let k = 0; k < 8; k++) { const v = A.v64[k], d = v - Z.prevLow[k]; if (d > 0) flux += d; Z.prevLow[k] = v; }
        flux /= 8;
        Z.fluxAvg += (flux - Z.fluxAvg) * ease(dt, 1.5);
        if (flux > Z.fluxAvg * 1.9 + 0.012 && Z.T - Z.lastBeat > 0.2) Z.beat(clamp(0.35 + flux * 7, 0.35, 1));
      } else if (live && Z.T - Z.lastBeat > 60 / (A.bpm || 72)) { Z.beat(0.4); }
      else if (!live && Z.T - Z.lastBeat > (60 / 70) * 2) { Z.beat(0.22); }
      Z.kick *= Math.exp(-dt * 5.5);
      Z.hue += (((((Z.targetHue - Z.hue) % 360) + 540) % 360) - 180) * ease(dt, 1.8);
    }
    function step(dt) {
      for (const t of Z.tracers) {
        t.trail.push(t.x, t.y); if (t.trail.length > t.maxTrail * 2) t.trail.splice(0, 2);
        t.x += t.vx * dt; t.y += t.vy * dt;
        if (t.x < 0 || t.x > Z.w || t.y < 0 || t.y > Z.h) {
          if (t.bounces > 0) {
            t.bounces--; let nx = 0, ny = 0;
            if (t.x < 0) { t.x = 0; t.vx = -t.vx; nx = 1; } if (t.x > Z.w) { t.x = Z.w; t.vx = -t.vx; nx = -1; }
            if (t.y < 0) { t.y = 0; t.vy = -t.vy; ny = 1; } if (t.y > Z.h) { t.y = Z.h; t.vy = -t.vy; ny = -1; }
            burst(t.x, t.y, nx, ny, t.hue);
          } else t.dead = true;
        }
      }
      Z.tracers = Z.tracers.filter(function (t) { return !t.dead; });
      for (const s of Z.sparks) { s.age += dt; s.vy += 900 * dt; s.vx *= Math.exp(-dt * 2); s.x += s.vx * dt; s.y += s.vy * dt; }
      Z.sparks = Z.sparks.filter(function (s) { return s.age < s.life; });
      for (const s of Z.shocks) { s.r += dt * (380 + s.a * 500); s.a -= dt * 0.9; }
      Z.shocks = Z.shocks.filter(function (s) { return s.a > 0; });
      const lift = 10 + Z.bass * 70;
      for (const d of Z.dust) {
        d.y -= lift * d.z * dt; d.x += Math.sin(Z.T * 0.3 + d.ph) * 8 * d.z * dt;
        if (d.y < -10) { d.y = Z.h + 10; d.x = Math.random() * Z.w; }
        if (d.x < -10) d.x = Z.w + 10; if (d.x > Z.w + 10) d.x = -10;
      }
    }
    function smoothPath(c, pts) {
      c.lineTo(pts[0], pts[1]);
      for (let i = 2; i < pts.length - 2; i += 2) { const mx = (pts[i] + pts[i + 2]) / 2, my = (pts[i + 1] + pts[i + 3]) / 2; c.quadraticCurveTo(pts[i], pts[i + 1], mx, my); }
      c.lineTo(pts[pts.length - 2], pts[pts.length - 1]);
    }
    // mirrored: lows in the middle of the screen, highs out at both edges
    function horizonPoints(src, w, baseY, amp, dir) {
      const half = 48, pts = [];
      for (let i = -half; i <= half; i++) { const idx = Math.min(src.length - 1, Math.floor(Math.abs(i) * 1.9)); const v = Math.pow(src[idx], 1.3); pts.push((i + half) / (half * 2) * w, baseY - dir * v * amp); }
      return pts;
    }
    const LAYERS = [['slow', 45, 0.2], ['bars', 0, 0.34]];
    function draw(dim) {
      const w = Z.w, h = Z.h, hue = Z.hue;
      g.setTransform(Z.dpr, 0, 0, Z.dpr, 0, 0); g.globalCompositeOperation = 'source-over'; g.globalAlpha = 1;
      g.fillStyle = '#06060b'; g.fillRect(0, 0, w, h);
      // aurora and the horizon fill on the soft layer
      const k8 = 1 / SOFT;
      sg.setTransform(k8, 0, 0, k8, 0, 0); sg.globalCompositeOperation = 'source-over'; sg.fillStyle = '#06060b'; sg.fillRect(0, 0, w, h);
      sg.globalCompositeOperation = 'lighter';
      const big = Math.max(w, h);
      for (let k = 0; k < 3; k++) {
        const cx = w * (0.5 + 0.38 * Math.sin(Z.T * 0.045 + k * 2.1)), cy = h * (0.42 + 0.32 * Math.cos(Z.T * 0.037 + k * 1.3));
        const rad = big * (0.5 + 0.08 * k + 0.12 * Z.bass), a = (0.12 + 0.2 * Z.bass + Z.kick * 0.06) * dim;
        const gr = g.createRadialGradient(cx, cy, 0, cx, cy, rad);
        gr.addColorStop(0, 'hsla(' + (hue + (k - 1) * 38) + ', 95%, 52%, ' + a + ')'); gr.addColorStop(0.55, 'hsla(' + (hue + (k - 1) * 38 + 20) + ', 95%, 45%, ' + a * 0.35 + ')'); gr.addColorStop(1, 'hsla(' + hue + ', 95%, 40%, 0)');
        sg.fillStyle = gr; sg.fillRect(0, 0, w, h);
      }
      const amp = h * 0.3;
      for (const L of LAYERS) {
        const pts = horizonPoints(Z[L[0]], w, h + 2, amp, 1);
        const gr = g.createLinearGradient(0, h - amp, 0, h); gr.addColorStop(0, 'hsla(' + (hue + L[1]) + ', 100%, 60%, 0)'); gr.addColorStop(1, 'hsla(' + (hue + L[1]) + ', 100%, 58%, ' + L[2] * dim + ')');
        sg.fillStyle = gr; sg.beginPath(); sg.moveTo(0, h + 2); smoothPath(sg, pts); sg.lineTo(w, h + 2); sg.closePath(); sg.fill();
      }
      const top = horizonPoints(Z.slow, w, -2, h * 0.14, -1);
      const tg = g.createLinearGradient(0, 0, 0, h * 0.14); tg.addColorStop(0, 'hsla(' + (hue - 30) + ', 100%, 60%, ' + 0.14 * dim + ')'); tg.addColorStop(1, 'hsla(' + (hue - 30) + ', 100%, 60%, 0)');
      sg.fillStyle = tg; sg.beginPath(); sg.moveTo(0, -2); smoothPath(sg, top); sg.lineTo(w, -2); sg.closePath(); sg.fill();
      g.imageSmoothingEnabled = true; g.imageSmoothingQuality = 'low';
      g.drawImage(soft, 0, 0, w, h);
      g.globalCompositeOperation = 'lighter';
      // the horizon's lines
      g.lineWidth = 1.4;
      for (const L of LAYERS) { const pts = horizonPoints(Z[L[0]], w, h + 2, amp, 1); g.strokeStyle = 'hsla(' + (hue + L[1] + 15) + ', 100%, 78%, ' + L[2] * 1.4 * dim + ')'; g.beginPath(); g.moveTo(pts[0], pts[1]); smoothPath(g, pts); g.stroke(); }
      // the ribbon across the upper third
      const y0 = h * 0.26, ramp = h * (0.05 + Z.bass * 0.09 + Z.kick * 0.03);
      for (let layer = 2; layer >= 0; layer--) {
        g.beginPath();
        for (let j = 0; j < NW; j++) { const u = j / (NW - 1), win = Math.pow(Math.sin(Math.PI * u), 1.6), v = Z.wave[(j + layer * 7) % NW]; const x = u * w, y = y0 + layer * 4 + v * ramp * win * (1 - layer * 0.18); if (j === 0) g.moveTo(x, y); else g.lineTo(x, y); }
        if (layer === 0) { g.strokeStyle = 'hsla(' + hue + ', 100%, 65%, ' + 0.12 * dim + ')'; g.lineWidth = 7; g.stroke(); }
        g.strokeStyle = 'hsla(' + (hue + layer * 28) + ', 100%, ' + (72 - layer * 6) + '%, ' + (0.55 - layer * 0.15) * dim + ')'; g.lineWidth = 1.5; g.stroke();
      }
      // dust in four depth bands
      const pulse = 1 + Z.kick * 0.9 + Z.high * 0.8;
      for (let band = 0; band < 4; band++) {
        const z = 0.15 + (band + 0.5) * 0.2125;
        g.beginPath();
        for (const d of Z.dust) { if (Math.min(3, Math.floor((d.z - 0.15) / 0.2125)) !== band) continue; const size = 0.5 + d.z * 1.5 * pulse; g.moveTo(d.x + size, d.y); g.arc(d.x, d.y, size, 0, TAU); }
        g.fillStyle = 'hsla(' + (hue + 40 * z) + ', 100%, ' + (70 + z * 20) + '%, ' + (0.12 + z * 0.5) * dim + ')'; g.fill();
      }
      for (const s of Z.shocks) { g.strokeStyle = 'hsla(' + (hue + 20) + ', 100%, 72%, ' + s.a * 0.5 + ')'; g.lineWidth = 1 + s.a * 3; g.beginPath(); g.arc(s.x, s.y, s.r, 0, TAU); g.stroke(); }
      // tracers and their sparks
      g.lineCap = 'round'; g.lineJoin = 'round';
      for (const t of Z.tracers) {
        const tr = t.trail, n = tr.length / 2; if (n < 1) continue;
        const tx = tr[0], ty = tr[1];
        g.beginPath(); g.moveTo(tx, ty); for (let i = 1; i < n; i++) g.lineTo(tr[i * 2], tr[i * 2 + 1]); g.lineTo(t.x, t.y);
        const glow = g.createLinearGradient(tx, ty, t.x, t.y); glow.addColorStop(0, 'hsla(' + t.hue + ', 100%, 65%, 0)'); glow.addColorStop(1, 'hsla(' + t.hue + ', 100%, 65%, .16)');
        g.strokeStyle = glow; g.lineWidth = t.w * 4; g.stroke();
        const core = g.createLinearGradient(tx, ty, t.x, t.y); core.addColorStop(0, 'hsla(' + (t.hue + 15) + ', 100%, 70%, 0)'); core.addColorStop(1, 'hsla(' + (t.hue + 15) + ', 100%, 92%, .95)');
        g.strokeStyle = core; g.lineWidth = t.w; g.stroke();
        g.fillStyle = '#fff'; g.beginPath(); g.arc(t.x, t.y, t.w * 1.1, 0, TAU); g.fill();
      }
      for (const s of Z.sparks) { const u = 1 - s.age / s.life; g.strokeStyle = 'hsla(' + (s.hue + 20) + ', 100%, 75%, ' + u + ')'; g.lineWidth = 1.2; g.beginPath(); g.moveTo(s.x, s.y); g.lineTo(s.x - s.vx * 0.025, s.y - s.vy * 0.025); g.stroke(); }
      if (Z.kick > 0.55) { g.fillStyle = 'hsla(' + hue + ', 100%, 60%, ' + (Z.kick - 0.55) * 0.07 * dim + ')'; g.fillRect(0, 0, w, h); }
    }
    // smooth beats sharp: a machine that cannot draw a frame inside its budget draws it smaller, not less often
    function adapt(ms) {
      Z.ms += (ms - Z.ms) * 0.05; Z.frames++;
      if (Z.frames < 60) return;
      Z.times.push(ms); if (Z.times.length < 90) return;
      const avg = Z.times.reduce(function (a, b) { return a + b; }, 0) / Z.times.length; Z.times.length = 0;
      Z.slowN = avg > 9 ? Z.slowN + 1 : 0; Z.quickN = avg < 4 ? Z.quickN + 1 : 0;
      if (Z.slowN >= 2 && Z.scale > 0.5) { Z.scale = Math.max(0.5, Z.scale * 0.8); Z.slowN = 0; Z.size(); }
      else if (Z.quickN >= 3 && Z.scale < 1) { Z.scale = Math.min(1, Z.scale / 0.8); Z.quickN = 0; Z.size(); }
    }
    function frame(now) {
      if (!Z.running) return;
      Z.raf = requestAnimationFrame(frame);
      if (document.hidden) { Z.last = 0; return; }
      const dt = Math.min(0.05, Z.last ? (now - Z.last) / 1000 : 1 / 60); Z.last = now;
      const t0 = performance.now();
      Z.T += dt;
      analyse(dt); step(dt);
      draw(S && S.view === 'home' ? 1 : 0.65);
      adapt(performance.now() - t0);
    }
    Z.stop = function () { Z.running = false; cancelAnimationFrame(Z.raf); window.removeEventListener('resize', Z.size); };
    Z.size();
    window.addEventListener('resize', Z.size);
    Z.raf = requestAnimationFrame(frame);
    return Z;
  }

  /* ---- the artwork for the media session (4.2): the name on the stage ---- */
  TH.artwork = function () {
    try {
      const cv = document.createElement('canvas'); cv.width = 512; cv.height = 512;
      const g = cv.getContext('2d'), hue = hueOf(S.current);
      g.fillStyle = '#06060b'; g.fillRect(0, 0, 512, 512);
      const gr = g.createRadialGradient(300, 180, 0, 300, 180, 380); gr.addColorStop(0, 'hsla(' + hue + ', 95%, 52%, .5)'); gr.addColorStop(1, 'hsla(' + hue + ', 95%, 40%, 0)');
      g.fillStyle = gr; g.fillRect(0, 0, 512, 512);
      g.fillStyle = '#fff'; g.font = '900 64px "Unbounded", sans-serif'; g.textBaseline = 'alphabetic';
      g.shadowColor = 'hsla(' + hue + ', 100%, 60%, .9)'; g.shadowBlur = 24;
      g.fillText('NOBODY', 34, 400); g.fillText('FM', 34, 470);
      g.shadowBlur = 0; g.fillStyle = 'hsl(' + hue + ', 96%, 76%)'; g.font = '600 18px "JetBrains Mono", monospace';
      g.fillText('88.8  THE TRANSMITTER NOBODY CAN FIND', 34, 60);
      return cv.toDataURL('image/png');
    } catch (e) { return null; }
  };

  /* ---- what a report can read (12.0) ---- */
  TH.widget = function () { return scrub ? { kind: 'scrubber', host: scrub.host } : null; };
  TH.state = function () {
    const p = S && S.current ? profileOf(S.current) : null;
    return { widget: 'scrubber', profile: !p ? 'none' : p.decoded ? 'decoded' : p.seen > 0 ? 'live' : 'none', buckets: p ? (p.decoded ? BUCKETS : p.seen) : 0, hue: stage ? Math.round(stage.hue) : null,
      stage: stage ? { running: stage.running, frames: stage.frames, ms: +stage.ms.toFixed(1), scale: stage.scale, kick: +stage.kick.toFixed(2), tracers: stage.tracers.length } : null };
  };
  return TH;
})();
