/* nobody fm, theme "tapedeck": a cassette on a painting desk at night (design 12.0, 12.14). the signature widget is
   the cassette in the transmitter card: its reels turn while the deck plays, the tape moves from the left hub to the
   right with the track, the hand-lettered label says what is on. behind the page a canvas of warm bars and one lamp
   that breathes with the loudness. nothing here changes what the station does; it draws what the station tells it,
   and nobody who built it can hear. */
window.NOBODY = window.NOBODY || {};
NOBODY.themes = NOBODY.themes || {};
NOBODY.themes.tapedeck = (function () {
  const TH = { name: 'tapedeck', blurb: 'a cassette on a painting desk. one lamp, warm bars, the reels turn.' };
  const reduced = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  let ctx = null, V = null, A = null, glass = null, power = null, S = null;
  let viz = null, cassette = null, jcard = null, towerCassette = null, scopeCanvas = null, scopeCtx = null, dialStrip = null, knob = null, chipWatch = null;
  let uid = 0;
  function el(id) { return ctx.el[id] || document.getElementById(id); }
  function token(name) { return getComputedStyle(document.documentElement).getPropertyValue(name).trim(); }
  function titleOf(slug) { return String(slug || '').replace(/-/g, ' '); }

  /* ---- strings (12.0): the deck's own eight lines, at the station's times ---- */
  TH.strings = {
    boot: function (n, voices, phone, localOnly, backend) {
      const vtxt = voices === 1 ? '1 with a voice' : voices + ' with a voice';
      const ttxt = n === 1 ? '1 tape' : n + ' tapes';
      if (phone) return [
        ['NOBODY DECK  mk I', ''], ['heads ....... ', 'cleaned'], ['belt ........ ', 'tight'], ['lamp ........ ', 'on'],
        ['aerial ...... ', 'found'], ['shelf ....... ', ttxt + ', ' + voices + ' voice'], ['backend ..... ', localOnly ? 'not on the wire' : 'on the wire'], ['audio ....... ', 'waiting for a human', 'amber']
      ];
      return [
        ['NOBODY DECK  mk I  one lamp on', ''], ['heads .............. ', 'cleaned'], ['belt ............... ', 'tight, no wow, no flutter'],
        ['lamp ............... ', 'on, warm'], ['aerial ............. ', 'found'],
        ['shelf .............. tracks/index.json .... ', ttxt + ', ' + vtxt], ['backend ............ ', localOnly ? 'not on the wire (local mode)' : backend],
        ['audio .............. ', 'waiting for a human', 'amber']
      ];
    },
    wait: function (phone) { return phone ? '[ tap the deck to go on air ]' : '[ press any key, or tap the deck, to go on air ]'; },
    tagline: 'the transmitter nobody can find.',
    licence: 'nobody fm. every track generated locally from a text prompt. no samples, no reference audio, no third-party rights claimed. best played off a tape, in a room with one lamp on.',
    switched: 'theme: tapedeck. one lamp, one cassette. the reels turn.',
    idle: 'idle. paused for ten minutes. the tape waits in the deck.'
  };

  /* ---- lifecycle ---- */
  TH.init = function (c) {
    ctx = c; V = c.V; A = c.A; glass = c.glass; power = c.power; S = c.S;
    viz = makeViz();
    document.body.insertBefore(viz.canvas, document.body.firstChild);
    // the widget slot (12.0): the cassette, inserted after the first row of the transmitter card
    cassette = makeCassette();
    jcard = makeJcard();
    cassette.host.insertBefore(jcard.svg, cassette.svg);
    const tx = el('transmitter');
    tx.insertBefore(cassette.host, tx.querySelector('.np-row'));
    if (c.wantsTower()) cassette.host.hidden = true;
    el('scope').textContent = '';
    scopeCanvas = document.createElement('canvas'); scopeCanvas.setAttribute('aria-label', 'oscilloscope'); el('scope').appendChild(scopeCanvas);
    const lab = document.createElement('span'); lab.className = 'dim scope-label'; lab.textContent = 'scope'; el('scope').appendChild(lab);
    scopeCtx = scopeCanvas.getContext('2d');
    el('licence').textContent = TH.strings.licence;
    el('progress').innerHTML = '<span class="rail"><i class="fill"></i><b class="head"></b></span><span class="time"></span>';
    el('hdrBar').textContent = ''; el('hdrBar').className = 'hdr-rail'; el('hdrBar').appendChild(document.createElement('i'));
    dialStrip = makeDialStrip(el('dial'));
    // the chip is the one place the station says whether the deck plays; the reels follow it
    chipWatch = new MutationObserver(syncPlaying);
    chipWatch.observe(el('chip'), { childList: true, characterData: true, subtree: true });
    syncPlaying();
    if (S.current) TH.playing(S.current);
    TH.resize();
  };
  TH.dispose = function () {
    if (viz) { viz.stop(); viz.canvas.remove(); viz = null; }
    if (cassette) { cassette.host.remove(); cassette = null; jcard = null; }
    coverWant = null; coverState = 'none'; tape = null;
    if (towerCassette) { towerCassette.host.remove(); towerCassette = null; }
    if (chipWatch) { chipWatch.disconnect(); chipWatch = null; }
    document.body.classList.remove('is-playing');
    el('scope').textContent = ''; scopeCanvas = null; scopeCtx = null;
    el('progress').textContent = ''; el('hdrBar').className = 'dim'; el('hdrBar').textContent = '............';
    el('dial').textContent = ''; dialStrip = null; knob = null; el('volDeco').textContent = '';
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
    if (viz) viz.size();
    if (dialStrip && S && S.state === 'tuning') dialStrip.set(88.8, false, '');
  };

  /* ---- the switch sound (issue #103): the cassette. the stop key's clunk, a short fast-forward whir climbing as the reels
     speed up, the play key's click, and a little tape hiss under all of it ---- */
  TH.transitionSound = function (seconds) {
    return NOBODY.synth.sound(seconds, function (c, out, t0, dur, k) {
      const n = k.noise();
      // the keys: a low thump falling in pitch for stop, a higher one for play, each with a filtered knock of noise
      const th = k.osc('sine'), tg = c.createGain();
      th.frequency.setValueAtTime(110, t0); th.frequency.exponentialRampToValueAtTime(60, t0 + 0.12); th.frequency.setValueAtTime(140, t0 + 1.0);
      k.env(tg.gain, [[0, 0], [0.025, 0.016], [0.11, 0.002], [0.15, 0], [1.0, 0], [1.015, 0.012], [1.07, 0]]);
      th.connect(tg); tg.connect(out);
      const kl = c.createBiquadFilter(); kl.type = 'bandpass'; kl.frequency.setValueAtTime(700, t0); kl.frequency.setValueAtTime(2500, t0 + 1.0); kl.Q.value = 1.5;
      const kg = c.createGain(); k.env(kg.gain, [[0, 0], [0.02, 0.01], [0.06, 0], [1.0, 0], [1.006, 0.014], [1.025, 0]]);
      n.connect(kl); kl.connect(kg); kg.connect(out);
      // the whir: the motor's tone climbing as the tape winds, with a flutter, and the tape rushing over the heads
      const wr = k.osc('triangle'); wr.frequency.setValueAtTime(170, t0 + 0.16); wr.frequency.exponentialRampToValueAtTime(560, t0 + 0.9);
      const fl = k.osc('sine'), fg = c.createGain(); fl.frequency.value = 23; fg.gain.value = 12; fl.connect(fg); fg.connect(wr.frequency);
      const wl = c.createBiquadFilter(); wl.type = 'lowpass'; wl.frequency.value = 900;
      const wg = c.createGain(); k.env(wg.gain, [[0, 0], [0.16, 0], [0.3, 0.012], [0.8, 0.012], [0.92, 0]]);
      wr.connect(wl); wl.connect(wg); wg.connect(out);
      const rb = c.createBiquadFilter(); rb.type = 'bandpass'; rb.Q.value = 0.8;
      rb.frequency.setValueAtTime(1200, t0 + 0.16); rb.frequency.exponentialRampToValueAtTime(3000, t0 + 0.9);
      const rg = c.createGain(); k.env(rg.gain, [[0, 0], [0.16, 0], [0.3, 0.006], [0.8, 0.006], [0.92, 0]]);
      n.connect(rb); rb.connect(rg); rg.connect(out);
      // the hiss
      const hp = c.createBiquadFilter(); hp.type = 'highpass'; hp.frequency.value = 5000;
      const hg = c.createGain(); k.env(hg.gain, [[0, 0], [0.1, 0.003], [dur, 0.003]]);
      n.connect(hp); hp.connect(hg); hg.connect(out);
    });
  };

  /* ---- transitions (12.0): the lamp comes on for the boot, goes off for a reboot; the cassette lifts while tuning ---- */
  TH.transition = function (from, to, info) {
    info = info || {};
    if (to === 'boot') {
      glass.classList.remove('closing');
      power.classList.remove('fade'); power.classList.add('on');
      return new Promise(function (res) { setTimeout(function () { glass.classList.remove('off'); power.classList.add('fade'); setTimeout(function () { power.classList.remove('on', 'fade'); settle(); res(); }, 400); }, 60); });
    }
    if (to === 'off') {
      return new Promise(function (res) { glass.classList.add('closing'); setTimeout(function () { glass.classList.add('off'); glass.classList.remove('closing'); res(); }, 380); });
    }
    if (to === 'air') { glass.classList.add('bloom-on'); setTimeout(function () { glass.classList.remove('bloom-on'); }, 300); }
    // dead air: the widget cassette steps aside, the empty one in the tower slot is the picture (one cassette, not two)
    if (to === 'dead') { if (cassette) { cassette.host.hidden = true; cassette.label('no tape', 'nothing on the shelf', 'SIDE A'); if (jcard) jcard.spine('no tape', ''); showCover(null); } }
    else if (cassette && from === 'dead') cassette.host.hidden = false;
    if (to === 'playing' || ((to === 'home' || to === 'page' || to === 'guestbook') && info.slug)) { if (cassette) cassette.host.hidden = false; TH.playing(info.slug || S.current); }
    return Promise.resolve();
  };

  // a compositor fade can freeze when the page is driven by a virtual clock (the harness) and leave the glass half in; once
  // the fade's time has passed the end state is set by hand, with the transition off for a beat so it applies at once
  function settle() { glass.style.transition = 'none'; void glass.offsetWidth; /* a style flush, or the two edits collapse into none */ setTimeout(function () { glass.style.transition = ''; }, 50); }

  /* ---- the cassette (12.14): an SVG, reels that turn, tape that moves hub to hub, a hand-lettered label ---- */
  function svgEl(name, attrs) { const e = document.createElementNS('http://www.w3.org/2000/svg', name); for (const k in attrs) e.setAttribute(k, attrs[k]); return e; }
  // the photocopy (issue #88): the cover as if run through an office copier onto card. nearly grey, the contrast pushed, the tones
  // stepped into a few toner levels, warmed to the card's cream, a grain multiplied over it and a few pale scuffs where it has worn
  function copyFilter(id, seed) {
    return '<filter id="' + id + '" x="0" y="0" width="1" height="1" color-interpolation-filters="sRGB">' +
      '<feColorMatrix in="SourceGraphic" type="saturate" values="0.32" result="grey"/>' +
      '<feComponentTransfer in="grey" result="hard"><feFuncR type="linear" slope="1.45" intercept="-0.16"/><feFuncG type="linear" slope="1.45" intercept="-0.16"/><feFuncB type="linear" slope="1.45" intercept="-0.16"/></feComponentTransfer>' +
      '<feComponentTransfer in="hard" result="toner"><feFuncR type="table" tableValues="0.1 0.2 0.42 0.7 0.9 0.96"/><feFuncG type="table" tableValues="0.08 0.18 0.4 0.67 0.87 0.93"/><feFuncB type="table" tableValues="0.06 0.14 0.33 0.57 0.76 0.83"/></feComponentTransfer>' +
      '<feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" seed="' + seed + '" result="n"/>' +
      '<feColorMatrix in="n" type="matrix" values="0.5 0 0 0 0.66  0.5 0 0 0 0.66  0.5 0 0 0 0.66  0 0 0 0 1" result="grain"/>' +
      '<feBlend in="toner" in2="grain" mode="multiply" result="grained"/>' +
      '<feTurbulence type="fractalNoise" baseFrequency="0.05" numOctaves="3" seed="' + (seed + 7) + '" result="w"/>' +
      '<feColorMatrix in="w" type="matrix" values="0 0 0 0 0.94  0 0 0 0 0.91  0 0 0 0 0.83  3 0 0 0 -2.1" result="scuff"/>' +
      '<feComposite in="scuff" in2="SourceAlpha" operator="in" result="scuffs"/>' +
      '<feMerge><feMergeNode in="grained"/><feMergeNode in="scuffs"/></feMerge></filter>';
  }
  function makeCassette() {
    const id = 'tape' + (++uid);
    const host = document.createElement('div'); host.className = 'tx-widget cassette'; host.setAttribute('aria-hidden', 'true');
    const svg = svgEl('svg', { viewBox: '0 0 420 270', role: 'img', class: 'tape-svg' });
    svg.innerHTML =
      '<defs><clipPath id="' + id + '-well"><rect x="134" y="198" width="152" height="36" rx="18"/></clipPath>' +
      '<clipPath id="' + id + '-art"><rect x="40" y="36" width="116" height="116" rx="4"/></clipPath>' + copyFilter(id + '-copy', 11 + uid) +
      '<linearGradient id="' + id + '-shine" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#fff" stop-opacity=".16"/><stop offset=".5" stop-color="#fff" stop-opacity="0"/><stop offset="1" stop-color="#000" stop-opacity=".3"/></linearGradient></defs>' +
      '<rect class="shell" x="6" y="6" width="408" height="258" rx="18"/>' +
      '<rect x="6" y="6" width="408" height="258" rx="18" fill="url(#' + id + '-shine)"/>' +
      '<g class="screw"><circle cx="24" cy="24" r="5"/><circle cx="396" cy="24" r="5"/><circle cx="24" cy="246" r="5"/><circle cx="396" cy="246" r="5"/></g>' +
      '<rect class="paper" x="34" y="30" width="352" height="128" rx="8"/>' +
      '<rect class="art" x="40" y="36" width="116" height="116" rx="4"/><rect class="art-stripe" x="40" y="118" width="116" height="10"/><rect x="92" y="52" width="14" height="66" fill="#fff" fill-opacity=".28"/><rect x="52" y="80" width="26" height="38" fill="#000" fill-opacity=".25"/>' +
      '<image class="cover" x="40" y="36" width="116" height="116" preserveAspectRatio="xMidYMid slice" clip-path="url(#' + id + '-art)" filter="url(#' + id + '-copy)" visibility="hidden"/>' +
      '<rect class="art-frame" x="40" y="36" width="116" height="116" rx="4"/>' +
      '<text class="side" x="170" y="56">SIDE A</text>' +
      '<text class="title" x="170" y="94">nothing loaded</text>' +
      '<text class="sub" x="170" y="120">insert a tape</text>' +
      '<g class="rule"><line x1="170" y1="132" x2="376" y2="132"/><line x1="170" y1="144" x2="376" y2="144"/></g>' +
      '<path class="window" d="M110 188 L310 188 L330 250 L90 250 Z"/>' +
      '<rect class="well" x="132" y="196" width="156" height="40" rx="20"/>' +
      '<g clip-path="url(#' + id + '-well)"><circle class="tape tape-l" cx="164" cy="216" r="34"/><circle class="tape tape-r" cx="256" cy="216" r="16"/></g>' +
      reel(164, 216) + reel(256, 216);
    host.appendChild(svg);
    const side = svg.querySelector('.side'), title = svg.querySelector('.title'), sub = svg.querySelector('.sub'), tl = svg.querySelector('.tape-l'), tr = svg.querySelector('.tape-r');
    return {
      host: host, svg: svg, titleText: 'nothing loaded', cover: svg.querySelector('.cover'),
      // the marker face is wide: one line holds about 15 characters at 24; a longer title takes two lines at 20, broken at the
      // space nearest the middle, and a line still too wide is drawn narrower, never cut (the polish pass of issue #88)
      label: function (t, s, sd) {
        this.titleText = t;
        title.textContent = '';
        const lines = t.length > 15 ? twoLines(t) : [t];
        lines.forEach(function (l, i) { title.appendChild(svgEl('tspan', { x: 170, dy: i ? 23 : 0 })).textContent = l; });
        title.setAttribute('font-size', lines.length > 1 ? '20' : '24');
        title.setAttribute('y', lines.length > 1 ? '84' : '96');
        sub.setAttribute('y', lines.length > 1 ? '127' : '122');
        sub.textContent = s || '';
        side.textContent = sd;
        fitText(title.querySelectorAll('tspan'), 206); fitText([sub], 206);
      },
      tape: function (f) { f = Math.max(0, Math.min(1, f || 0)); tl.setAttribute('r', (16 + 18 * (1 - f)).toFixed(1)); tr.setAttribute('r', (16 + 18 * f).toFixed(1)); }
    };
  }
  function twoLines(t) {
    const mid = t.length / 2;
    let best = -1;
    for (let i = 0; i < t.length; i++) if (t[i] === ' ' && (best < 0 || Math.abs(i - mid) < Math.abs(best - mid))) best = i;
    return best < 0 ? [t.slice(0, Math.ceil(mid)), t.slice(Math.ceil(mid))] : [t.slice(0, best), t.slice(best + 1)];
  }
  // squeeze a line of the drawing to its box (it is part of the picture, 12.14); past 60 % it is cut instead
  function fitText(nodes, w) {
    [].forEach.call(nodes, function (n) {
      n.removeAttribute('textLength'); n.removeAttribute('lengthAdjust');
      let len = 0; try { len = n.getComputedTextLength(); } catch (e) {}
      if (!len || len <= w) return;
      if (len * 0.6 > w) { const keep = Math.max(4, Math.floor(n.textContent.length * w / (len * 0.6)) - 1); n.textContent = n.textContent.slice(0, keep) + '...'; try { len = n.getComputedTextLength(); } catch (e) {} if (len <= w) return; }
      n.setAttribute('textLength', w); n.setAttribute('lengthAdjust', 'spacingAndGlyphs');
    });
  }

  /* ---- the J-card (issue #88): the paper insert of the tape's case, the cover photocopied onto its front panel, the spine under
     it hand-lettered with what is on the tape. it stands behind the cassette in the widget, slightly turned the other way ---- */
  function makeJcard() {
    const id = 'jcard' + (++uid);
    const svg = svgEl('svg', { viewBox: '0 0 300 352', role: 'img', class: 'jcard' });
    svg.innerHTML =
      '<defs><clipPath id="' + id + '-front"><rect x="14" y="66" width="272" height="272"/></clipPath>' + copyFilter(id + '-copy', 23 + uid) +
      '<filter id="' + id + '-worn" x="0" y="0" width="1" height="1"><feTurbulence type="fractalNoise" baseFrequency="0.02 0.06" numOctaves="3" seed="' + (5 + uid) + '"/>' +
      '<feColorMatrix type="matrix" values="0 0 0 0 0.35  0 0 0 0 0.27  0 0 0 0 0.17  0 0 0 2.2 -1.2"/><feComposite in2="SourceGraphic" operator="in"/></filter></defs>' +
      '<rect class="jc-card" x="2" y="2" width="296" height="348" rx="3"/>' +
      '<text class="jc-spine" x="14" y="36">nothing loaded</text>' +
      '<text class="jc-side" x="286" y="36" text-anchor="end">A/B</text>' +
      '<line class="jc-fold" x1="2" y1="56" x2="298" y2="56"/>' +
      '<g class="jc-paint"><rect class="art" x="14" y="66" width="272" height="272"/><rect class="art-stripe" x="14" y="266" width="272" height="22"/>' +
      '<rect x="136" y="104" width="32" height="160" fill="#fff" fill-opacity=".28"/><rect x="44" y="172" width="60" height="94" fill="#000" fill-opacity=".25"/>' +
      '<text class="jc-hand" x="150" y="322" text-anchor="middle">nobody fm</text></g>' +
      '<image class="cover" x="14" y="66" width="272" height="272" preserveAspectRatio="xMidYMid slice" clip-path="url(#' + id + '-front)" filter="url(#' + id + '-copy)" visibility="hidden"/>' +
      '<rect class="jc-wear" x="2" y="2" width="296" height="348" rx="3" filter="url(#' + id + '-worn)"/>' +
      '<path class="jc-ear" d="M298 2 L298 26 L274 2 Z"/>';
    const spine = svg.querySelector('.jc-spine'), sideT = svg.querySelector('.jc-side');
    return {
      svg: svg, cover: svg.querySelector('.cover'), spineText: '',
      spine: function (t, s) { this.spineText = t; spine.textContent = t; sideT.textContent = s || ''; let sw = 0; try { sw = s ? sideT.getComputedTextLength() : 0; } catch (e) {} fitText([spine], 272 - (sw ? sw + 12 : 0)); }
    };
  }

  // the cover (#73's site API, NOBODY.cover): loaded once per address; while it loads, or if it never does, the painted square of
  // 12.14 stays (the station's placeholder file is the first fallback, this is the second)
  const coverCache = {};
  let coverWant = null, coverState = 'none';
  function coverOf(slug) {
    const t = S.bySlug && S.bySlug[slug];
    if (!t || typeof NOBODY.cover !== 'function') return null;
    try { return NOBODY.cover(t, 400) || null; } catch (e) { return null; }
  }
  function albumOf(slug) {
    const t = S.bySlug && S.bySlug[slug];
    if (!t || typeof NOBODY.albumOf !== 'function') return null;
    try { return NOBODY.albumOf(t) || null; } catch (e) { return null; }
  }
  function showCover(url) {
    coverWant = url;
    const targets = [cassette && cassette.cover, jcard && jcard.cover].filter(Boolean);
    const apply = function (ok) {
      if (coverWant !== url) return;
      coverState = ok ? 'image' : 'painted';
      targets.forEach(function (im) { if (ok) im.setAttribute('href', url); im.setAttribute('visibility', ok ? 'visible' : 'hidden'); });
      if (jcard) jcard.svg.classList.toggle('has-cover', !!ok);
    };
    if (!url) { apply(false); coverState = 'none'; return; }
    const c = coverCache[url];
    if (c && c.done) { apply(c.ok); return; }
    coverState = 'loading';
    if (!c) {
      const rec = coverCache[url] = { done: false, ok: false, wait: [] };
      const img = new Image();
      img.onload = function () { rec.done = true; rec.ok = true; rec.wait.forEach(function (f) { f(true); }); };
      img.onerror = function () { rec.done = true; rec.wait.forEach(function (f) { f(false); }); };
      img.src = url;
    }
    coverCache[url].wait.push(apply);
  }
  function reel(cx, cy) {
    return '<g class="reel"><circle class="hub" cx="' + cx + '" cy="' + cy + '" r="15"/><g class="spoke"><line x1="' + cx + '" y1="' + (cy - 13) + '" x2="' + cx + '" y2="' + (cy + 13) + '"/><line x1="' + (cx - 13) + '" y1="' + cy + '" x2="' + (cx + 13) + '" y2="' + cy + '"/><line x1="' + (cx - 9) + '" y1="' + (cy - 9) + '" x2="' + (cx + 9) + '" y2="' + (cy + 9) + '"/><line x1="' + (cx + 9) + '" y1="' + (cy - 9) + '" x2="' + (cx - 9) + '" y2="' + (cy + 9) + '"/></g><circle class="axle" cx="' + cx + '" cy="' + cy + '" r="4"/></g>';
  }
  function sideName() { return document.documentElement.dataset.phosphor === 'amber' ? 'SIDE B' : 'SIDE A'; }
  // a single's label is the track's: the title in the marker face, bpm and key under it, the side and the number above. an album
  // plays as one tape (issue #88): the label and the spine read the album's title, the first half of its tracks is side A and the
  // rest side B, the number counts within the side, and the track's own title moves to the small print
  let tape = null;
  function tapeOf(slug) {
    const a = albumOf(slug);
    const list = a && Array.isArray(a.tracks) ? a.tracks : [];
    const i = list.indexOf(slug);
    if (!a || i < 0) return null;
    const half = Math.ceil(list.length / 2), b = i >= half;
    return { album: a.slug, title: a.title || titleOf(a.slug), side: b ? 'B' : 'A', no: b ? i - half + 1 : i + 1, of: b ? list.length - half : half, n: list.length };
  }
  TH.playing = function (slug) {
    if (!cassette || !slug) return;
    const t = S.bySlug && S.bySlug[slug];
    if (!t) return;
    tape = tapeOf(slug);
    const meta = (t.bpm ? t.bpm + ' bpm' : '') + (t.key ? '  ' + t.key : '');
    if (tape) {
      const no = String(tape.no).padStart(2, '0');
      cassette.label(tape.title, no + '  ' + titleOf(t.title || slug), 'SIDE ' + tape.side + ' - ' + no + ' of ' + String(tape.of).padStart(2, '0'));
      if (jcard) jcard.spine(tape.title, 'A/B');
    } else {
      const num = S.num && S.num[slug] ? String(S.num[slug]).padStart(2, '0') : '--';
      cassette.label(titleOf(t.title || slug), meta + (t.model ? '  ' + t.model : ''), sideName() + ' - ' + num);
      if (jcard) jcard.spine(titleOf(t.title || slug), 'single');
    }
    showCover(coverOf(slug));
    // the label's lines are measured in the marker face; if it was still loading, measure again once it is in
    if (!fontsFitted && document.fonts && document.fonts.load) { fontsFitted = true; document.fonts.load('24px "Permanent Marker"').then(function () { if (S.current && cassette) TH.playing(S.current); }, function () {}); }
  };
  let fontsFitted = false;
  TH.catalogue = function () {};
  TH.scheme = function () { if (S.current) TH.playing(S.current); };

  /* ---- widgets ---- */
  TH.stationName = function (button) { button.textContent = 'NOBODY FM'; };
  TH.banner = function (bannerEl, phone, scramble) {
    const text = 'NOBODY FM';
    if (scramble) { bannerEl.textContent = V.scrambled(text); V.scramble(bannerEl, text, 900); }
    else bannerEl.textContent = text;
  };
  TH.progress = function (progressEl, hdrBarEl, c, d, phone, view) {
    const fmt = ctx.fmt, pct = d ? Math.max(0, Math.min(100, c / d * 100)) : 0;
    const fill = progressEl.querySelector('.fill'), head = progressEl.querySelector('.head'), time = progressEl.querySelector('.time');
    if (fill) fill.style.width = pct.toFixed(2) + '%';
    if (head) head.style.left = pct.toFixed(2) + '%';
    if (time) time.textContent = phone ? fmt(c) + '/' + fmt(d) : fmt(c) + ' / ' + fmt(d);
    if (cassette) cassette.tape(d ? c / d : 0);
    if (view !== 'home') { const bar = hdrBarEl.querySelector('i'); if (bar) bar.style.width = pct.toFixed(2) + '%'; }
  };
  TH.progressHit = function (progressEl, x) { const rail = progressEl.querySelector('.rail') || progressEl, r = rail.getBoundingClientRect(); return Math.max(0, Math.min(1, (x - r.left) / r.width)); };
  // the dial is a strip of frequencies under a red needle, the radio side of the deck
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
  // the knob of 12.14 stays as decoration beside the shared fader (volume.js, 12.0 controls): ten ticks, a cream pointer
  // that follows the level; it takes no click, the fader does
  function makeKnob(host) {
    host.textContent = '';
    const svg = svgEl('svg', { viewBox: '0 0 100 100', 'aria-hidden': 'true' });
    const ticks = [];
    for (let i = 0; i < 10; i++) {
      const a = angleOf(i + 1);
      const l = svgEl('line', { class: 'knob-tick', x1: 50 + Math.cos(a) * 44, y1: 50 + Math.sin(a) * 44, x2: 50 + Math.cos(a) * 49, y2: 50 + Math.sin(a) * 49 });
      svg.appendChild(l); ticks.push(l);
    }
    svg.appendChild(svgEl('circle', { class: 'knob-body', cx: 50, cy: 50, r: 36 }));
    const pointer = svgEl('line', { class: 'knob-pointer', x1: 50, y1: 50, x2: 50, y2: 20 });
    svg.appendChild(pointer);
    host.appendChild(svg);
    return {
      set: function (v, muted) {
        const a = angleOf(v);
        pointer.setAttribute('x2', (50 + Math.cos(a) * 28).toFixed(1)); pointer.setAttribute('y2', (50 + Math.sin(a) * 28).toFixed(1));
        ticks.forEach(function (t, i) { t.classList.toggle('lit', i < v); });
        host.classList.toggle('muted', !!muted);
      }
    };
  }
  function angleOf(v) { return Math.PI * 0.75 + v / 10 * Math.PI * 1.5; }
  TH.volume = function (decoEl, v, muted) {
    if (!knob || !decoEl.querySelector('svg')) knob = makeKnob(decoEl);
    knob.set(v, muted);
  };
  // dead air: an empty cassette on the shelf, its reels turning slowly (there is nothing on it)
  TH.towerStart = function (hostEl, staticEl) {
    if (!towerCassette || towerCassette.host.parentNode !== hostEl) {
      towerCassette = makeCassette();
      towerCassette.host.classList.remove('tx-widget');
      towerCassette.label('no tape', 'nothing on the shelf yet', 'SIDE A');
      towerCassette.tape(0);
      hostEl.replaceChildren(towerCassette.host);
    }
    staticEl.hidden = true;
    return 'cassette';
  };
  TH.towerStop = function () {};
  TH.towerState = function () { return 'an empty cassette, reels turning slowly'; };

  /* ---- the card's analyser (12.14): warm bars, orange at the foot and lamp at the top, cream peaks; the scope in cream ---- */
  function colours() { return { orange: token('--orange'), lamp: token('--lamp'), cream: token('--cream'), faint: token('--faint'), lampRgb: token('--lamp-rgb') }; }
  function roundRect(g, x, y, w, h, r) {
    r = Math.min(r, w / 2, h / 2);
    g.beginPath(); g.moveTo(x + r, y); g.lineTo(x + w - r, y); g.quadraticCurveTo(x + w, y, x + w, y + r); g.lineTo(x + w, y + h - r); g.quadraticCurveTo(x + w, y + h, x + w - r, y + h); g.lineTo(x + r, y + h); g.quadraticCurveTo(x, y + h, x, y + h - r); g.lineTo(x, y + r); g.quadraticCurveTo(x, y, x + r, y); g.closePath();
  }
  let gainHold = 1;
  function autoGain(s) {
    let m = 0; for (let i = 0; i < s.length; i++) m = Math.max(m, Math.abs(s[i]));
    const want = m > 0.02 ? Math.min(12, 0.8 / m) : gainHold;
    gainHold += (want - gainHold) * 0.05;
    return gainHold;
  }
  TH.frame = function (A_, S_, now) {
    if (!A.ctx2d) return;
    const c = colours(), g = A.ctx2d, W = A.W, H = A.H;
    g.clearRect(0, 0, W, H);
    const phone = V.phone();
    const cellW = V.fontPx() * 0.6, totalCols = Math.floor(W / cellW);
    A.totalCols = totalCols;
    const labelCols = phone ? 10 : 24;
    const areaCols = Math.max(A.bands, totalCols - 2 - labelCols);
    const areaW = Math.min(W - 2 * cellW, areaCols * cellW), x0 = 2 * cellW;
    g.fillStyle = c.faint; g.fillRect(0, 0, 1, H);
    if (A.mode === 'scope5') { drawScope5(g, c, x0, areaW, H); return; }
    const per = areaW / A.bands, bw = Math.max(2, per * 0.66);
    const grad = g.createLinearGradient(0, H, 0, 0); grad.addColorStop(0, c.orange); grad.addColorStop(1, c.lamp);
    const rows = A.rows, cellH = H / rows;
    for (let b = 0; b < A.bands; b++) {
      const v = A.vals[b];
      const cells = Math.min(rows, Math.floor(Math.pow(v, 0.8) * (rows + 0.99)));
      const hgt = Math.max(0, Math.pow(v, 0.8) * H);
      if (cells > A.peaks[b]) { A.peaks[b] = cells; A.peakAt[b] = now; }
      else if (now - A.peakAt[b] > 150 && A.peaks[b] > 0) { A.peaks[b]--; A.peakAt[b] = now; }
      const x = x0 + b * per + (per - bw) / 2;
      g.shadowColor = 'rgb(' + c.lampRgb.replace(/ /g, ',') + ',0.35)'; g.shadowBlur = 6;
      g.fillStyle = grad;
      if (hgt > 1) { if (A.flip) roundRect(g, x, 0, bw, hgt, 2); else roundRect(g, x, H - hgt, bw, hgt, 2); g.fill(); }
      const pk = A.peaks[b];
      if (pk > cells && pk <= rows) {
        const y = A.flip ? pk * cellH - 2 : H - pk * cellH;
        g.shadowBlur = 0; g.fillStyle = c.cream;
        g.fillRect(x, y, bw, 2);
      }
    }
    g.shadowBlur = 0;
    A.baselineText(A.live);
    scopeLine(c);
  };
  function scopeLine(c) {
    if (!scopeCtx) return;
    const W = +scopeCanvas.dataset.w || 500, H = +scopeCanvas.dataset.h || 20, n = Math.max(32, Math.floor(W / 3));
    const s = A.samples(n), gn = autoGain(s), g = scopeCtx;
    g.clearRect(0, 0, W, H);
    g.lineWidth = 1.2; g.strokeStyle = c.cream;
    g.beginPath();
    for (let i = 0; i < n; i++) { const x = i / (n - 1) * W, y = H / 2 - s[i] * gn * (H / 2 - 1); if (i) g.lineTo(x, y); else g.moveTo(x, y); }
    g.stroke();
  }
  function drawScope5(g, c, x0, areaW, H) {
    const n = Math.max(32, Math.floor(areaW / 2)), s = A.samples(n), gn = autoGain(s);
    g.lineWidth = 1.5; g.strokeStyle = c.lamp;
    g.beginPath();
    for (let i = 0; i < n; i++) { const x = x0 + i / (n - 1) * areaW, y = H / 2 - s[i] * gn * (H / 2 - 2); if (i) g.lineTo(x, y); else g.moveTo(x, y); }
    g.stroke();
    A.baselineText(true);
    if (scopeCtx) scopeCtx.clearRect(0, 0, +scopeCanvas.dataset.w || 500, +scopeCanvas.dataset.h || 20);
  }

  /* ---- the picture behind the page (12.14): 48 warm bars along the foot of the desk and the lamp breathing ---- */
  function makeViz() {
    const canvas = document.createElement('canvas'); canvas.className = 'viz'; canvas.id = 'tapeViz'; canvas.setAttribute('aria-hidden', 'true');
    const g = canvas.getContext('2d');
    const Z = { canvas: canvas, frames: 0, ms: 0, raf: 0, scale: 1, cost: 0, w: 0, h: 0, running: true, level: 0 };
    Z.size = function () { const d = Math.min(devicePixelRatio || 1, 1.5) * Z.scale; Z.w = canvas.width = Math.round(innerWidth * d); Z.h = canvas.height = Math.round(innerHeight * d); };
    function frame(now) {
      if (!Z.running) return;
      Z.raf = requestAnimationFrame(frame);
      if (document.hidden) return;
      const t0 = performance.now(), w = Z.w, h = Z.h, rgb = token('--lamp-rgb').replace(/ /g, ',') || '255,180,95', org = token('--orange-rgb').replace(/ /g, ',') || '226,85,59';
      g.clearRect(0, 0, w, h);
      const live = S && S.onAir && A && A.v64, N = 48, bw = w / N;
      let lvl = 0;
      for (let i = 0; i < N; i++) {
        let v = 0.04 + 0.03 * Math.sin(now / 900 + i * 0.5);
        if (live) v = Math.max(v, A.v64[Math.min(63, Math.floor(Math.pow(i / N, 1.4) * 64))]);
        lvl += v;
        const bh = v * h * 0.5, x = i * bw;
        const gr = g.createLinearGradient(0, h, 0, h - bh);
        gr.addColorStop(0, 'rgba(' + org + ',0)'); gr.addColorStop(1, 'rgba(' + rgb + ',' + (0.12 + v * 0.3).toFixed(3) + ')');
        g.fillStyle = gr; g.fillRect(x + bw * 0.14, h - bh, bw * 0.72, bh);
      }
      Z.level += (lvl / N - Z.level) * 0.2;
      const lg = g.createRadialGradient(w * 0.92, 0, 0, w * 0.92, 0, h * (0.9 + Z.level * 0.9));
      lg.addColorStop(0, 'rgba(' + rgb + ',' + (0.12 + Z.level * 0.35).toFixed(3) + ')'); lg.addColorStop(1, 'rgba(' + rgb + ',0)');
      g.fillStyle = lg; g.fillRect(0, 0, w, h);
      Z.frames++;
      const ms = performance.now() - t0; Z.ms += (ms - Z.ms) * 0.1;
      // lower the resolution on a machine that cannot keep up (the work of a frame, not the gap between frames)
      Z.cost = Z.cost * 0.9 + ms * 0.1;
      if (Z.cost > 6 && Z.scale > 0.4) { Z.scale -= 0.15; Z.size(); Z.cost = 0; }
    }
    Z.stop = function () { Z.running = false; cancelAnimationFrame(Z.raf); window.removeEventListener('resize', Z.size); };
    Z.size();
    window.addEventListener('resize', Z.size);
    if (!reduced) Z.raf = requestAnimationFrame(frame);
    return Z;
  }

  /* ---- the artwork for the media session (4.2): the cassette on the desk ---- */
  TH.artwork = function () {
    try {
      const cv = document.createElement('canvas'); cv.width = 512; cv.height = 512;
      const g = cv.getContext('2d');
      g.fillStyle = '#120d0a'; g.fillRect(0, 0, 512, 512);
      const lg = g.createRadialGradient(470, 0, 0, 470, 0, 420); lg.addColorStop(0, 'rgba(255,180,95,.5)'); lg.addColorStop(1, 'rgba(255,180,95,0)');
      g.fillStyle = lg; g.fillRect(0, 0, 512, 512);
      g.save(); g.translate(256, 300); g.rotate(-0.04);
      g.fillStyle = '#2a2119'; roundRect(g, -170, -105, 340, 210, 16); g.fill();
      g.fillStyle = '#f1e8d3'; roundRect(g, -146, -86, 292, 104, 6); g.fill();
      g.fillStyle = '#e2553b'; g.fillRect(-140, -80, 90, 90); g.fillStyle = '#dca834'; g.fillRect(-140, -16, 90, 8);
      g.fillStyle = '#17110c'; g.beginPath(); g.moveTo(-90, 30); g.lineTo(90, 30); g.lineTo(110, 92); g.lineTo(-110, 92); g.closePath(); g.fill();
      g.fillStyle = '#f1e8d3'; g.beginPath(); g.arc(-46, 58, 16, 0, Math.PI * 2); g.fill(); g.beginPath(); g.arc(46, 58, 16, 0, Math.PI * 2); g.fill();
      g.fillStyle = '#2a2118'; g.font = '26px "Permanent Marker", cursive'; g.textBaseline = 'top'; g.fillText('nobody fm', -40, -70);
      g.restore();
      g.fillStyle = '#f1e8d3'; g.font = '800 54px "Barlow Condensed", sans-serif'; g.textBaseline = 'top'; g.fillText('NOBODY FM', 40, 60);
      g.fillStyle = '#ffb45f'; g.font = '700 22px "Barlow Condensed", sans-serif'; g.fillText('88.8  THE TRANSMITTER NOBODY CAN FIND', 40, 122);
      return cv.toDataURL('image/png');
    } catch (e) { return null; }
  };

  /* ---- what a report can read (12.0) ---- */
  TH.widget = function () { return cassette ? { kind: 'cassette', host: cassette.host } : null; };
  TH.state = function () {
    return { widget: 'cassette', reels: document.body.classList.contains('is-playing') ? 'turning' : 'still', label: cassette ? cassette.titleText : '',
      side: cassette ? cassette.svg.querySelector('.side').textContent : '', sub: cassette ? cassette.svg.querySelector('.sub').textContent : '',
      jcard: jcard ? { spine: jcard.spineText, cover: coverState, href: jcard.cover.getAttribute('href') || null } : null, cover: coverWant, tape: tape,
      viz: viz ? { running: viz.running, frames: viz.frames, ms: +viz.ms.toFixed(1), scale: viz.scale } : null };
  };
  return TH;
})();
