/* nobody fm, theme "tapedeck": a portable cassette player on a workbench in daylight (design 12.0, 12.14, issue #240).
   the transmitter card is the player: a brushed plate in a graphite body, six chunky piano keys on its top edge (four of
   them are the station's own fat buttons), a smoked window with the cassette turning inside, a three-drum counter, a door
   left open on two big D cells, a VU needle, a belt clip on its side. the J-card lies open to its left and is the story of
   the track; an index card to its right is the running order. nothing here changes what the station does: every key and
   every line calls the station's own functions, and nobody who built it can hear. */
window.NOBODY = window.NOBODY || {};
NOBODY.themes = NOBODY.themes || {};
NOBODY.themes.tapedeck = (function () {
  const TH = { name: 'tapedeck', blurb: 'a portable tape player on a bench in daylight. piano keys, a VU needle, two D cells.', swatch: ['#d6d0c2', '#26292d', '#ff5b1a'] };
  const reduced = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  let ctx = null, V = null, A = null, glass = null, power = null, S = null;
  let viz = null, cassette = null, jcard = null, towerCassette = null, scopeCanvas = null, scopeCtx = null, dialStrip = null, wheel = null, chipWatch = null;
  let keys = null, vu = null, counter = null, cells = null, clip = null, story = null, runOrder = null, catGrab = null;
  let uid = 0;
  function el(id) { return ctx.el[id] || document.getElementById(id); }
  function token(name) { return getComputedStyle(document.documentElement).getPropertyValue(name).trim(); }
  function titleOf(slug) { return String(slug || '').replace(/-/g, ' '); }
  function h(tag, cls, text) { const e = document.createElement(tag); if (cls) e.className = cls; if (text != null) e.textContent = text; return e; }
  function btn(text, cls, fn, title) { const b = h('button', 'bk' + (cls ? ' ' + cls : ''), text); b.type = 'button'; if (title) b.title = title; b.addEventListener('click', function (e) { e.stopPropagation(); fn(e, b); }); return b; }
  function playingNow() { return document.body.classList.contains('is-playing'); }

  /* ---- strings (12.0): the player's own eight lines, at the station's times ---- */
  TH.strings = {
    boot: function (n, voices, phone, localOnly, backend) {
      const vtxt = voices === 1 ? '1 with a voice' : voices + ' with a voice';
      const ttxt = n === 1 ? '1 tape' : n + ' tapes';
      if (phone) return [
        ['PORTABLE CASSETTE PLAYER', ''], ['cells ....... ', '2 x D, fresh'], ['heads ....... ', 'cleaned'], ['belt ........ ', 'tight'],
        ['needle ...... ', 'at rest'], ['rack ........ ', ttxt + ', ' + voices + ' voice'], ['backend ..... ', localOnly ? 'not on the wire' : 'on the wire'], ['audio ....... ', 'waiting for a human', 'amber']
      ];
      return [
        ['PORTABLE CASSETTE PLAYER  stereo, auto stop', ''], ['cells .............. ', '2 x D, 1.5 V, fresh'], ['heads .............. ', 'cleaned'],
        ['belt ............... ', 'tight, no wow, no flutter'], ['needle ............. ', 'at rest'],
        ['rack ............... tracks/index.json .... ', ttxt + ', ' + vtxt], ['backend ............ ', localOnly ? 'not on the wire (local mode)' : backend],
        ['audio .............. ', 'waiting for a human', 'amber']
      ];
    },
    wait: function (phone) { return phone ? '[ tap the player to go on air ]' : '[ press any key, or tap the player, to go on air ]'; },
    tagline: 'the transmitter nobody can find.',
    licence: 'nobody fm. every track generated locally from a text prompt. no samples, no reference audio, no third-party rights claimed. best played off a tape, clipped to a belt, on a long walk.',
    switched: 'theme: tapedeck. a tape player on the bench. press play.',
    idle: 'idle. paused for ten minutes. the tape waits behind the window.'
  };

  /* ---- lifecycle ---- */
  TH.init = function (c) {
    ctx = c; V = c.V; A = c.A; glass = c.glass; power = c.power; S = c.S;
    viz = makeViz();
    loadVis();
    document.body.insertBefore(viz.canvas, document.body.firstChild);
    const tx = el('transmitter');
    // the widget slot (12.0): the left column of the player, the window with the cassette, the counter and the battery door
    cassette = makeCassette();
    counter = makeCounter();
    cells = makeCells();
    const win = h('div', 'td-window'); win.appendChild(cassette.svg);
    win.appendChild(h('span', 'td-window-glare'));
    cassette.host.appendChild(win);
    const under = h('div', 'td-under'); under.appendChild(counter.host); under.appendChild(cells.host);
    cassette.host.appendChild(under);
    tx.insertBefore(cassette.host, tx.querySelector('.np-row'));
    vu = makeVu();
    tx.insertBefore(vu.host, tx.querySelector('.np-row'));
    keys = makeKeys();
    tx.appendChild(keys.host);
    clip = makeClip();
    tx.appendChild(clip);
    if (c.wantsTower()) cassette.host.hidden = true;
    // the story (the J-card, opened flat) and the running order (an index card): beside the player, one view (issue #240)
    story = makeStory();
    runOrder = makeRunOrder();
    // after the rack in the markup (MAKE A TRACK stays the card right after the player, 12.0); the CSS puts them beside the player
    const cat = el('catalogue');
    cat.parentNode.insertBefore(story.host, cat.nextSibling);
    cat.parentNode.insertBefore(runOrder.host, story.host.nextSibling);
    jcard = story.jcard;
    // a click on a title in the rack opens its story beside the player instead of a page (12.23's one view; the core does it,
    // the theme only stands in for a station that predates it)
    if (!ctx.inspect) {
      catGrab = function (e) {
        const link = e.target.closest && e.target.closest('.slug-link'); if (!link) return;
        const row = link.closest('.cat-row'); if (!row || !row.dataset.slug) return;
        e.stopPropagation(); e.preventDefault();
        inspect(row.dataset.slug);
      };
      el('catRows').addEventListener('click', catGrab, true);
    }
    el('scope').textContent = '';
    scopeCanvas = document.createElement('canvas'); scopeCanvas.setAttribute('aria-label', 'oscilloscope'); el('scope').appendChild(scopeCanvas);
    const lab = h('span', 'scope-label label', 'scope'); el('scope').appendChild(lab);
    scopeCtx = scopeCanvas.getContext('2d');
    el('licence').textContent = TH.strings.licence;
    el('progress').innerHTML = '<span class="rail"><i class="fill"></i><b class="head"></b></span><span class="time"></span>';
    el('hdrBar').textContent = ''; el('hdrBar').className = 'hdr-rail'; el('hdrBar').appendChild(document.createElement('i'));
    dialStrip = makeDialStrip(el('dial'));
    // the chip is the one place the station says whether the deck plays; the reels, the PLAY key and the needle follow it
    chipWatch = new MutationObserver(syncPlaying);
    chipWatch.observe(el('chip'), { childList: true, characterData: true, subtree: true });
    syncPlaying();
    if (S.current) TH.playing(S.current);
    renderStory();
    renderQueue();
    TH.resize();
  };
  TH.dispose = function () {
    if (viz) { viz.stop(); viz.canvas.remove(); viz = null; }
    if (cassette) { cassette.host.remove(); cassette = null; }
    if (vu) { vu.host.remove(); vu = null; }
    if (keys) { keys.dispose(); keys = null; }
    if (clip) { clip.remove(); clip = null; }
    if (story) { story.host.remove(); story = null; jcard = null; }
    if (runOrder) { runOrder.host.remove(); runOrder = null; }
    if (catGrab) { el('catRows').removeEventListener('click', catGrab, true); catGrab = null; }
    counter = null; cells = null; inspecting = null; queueData = null;
    if (vis) { vis.destroy(); vis = null; }
    coverWant = null; coverState = 'none'; tape = null;
    if (towerCassette) { towerCassette.host.remove(); towerCassette = null; }
    if (chipWatch) { chipWatch.disconnect(); chipWatch = null; }
    document.body.classList.remove('is-playing');
    el('transmitter').classList.remove('td-jolt');
    el('scope').textContent = ''; scopeCanvas = null; scopeCtx = null;
    el('progress').textContent = ''; el('hdrBar').className = 'dim'; el('hdrBar').textContent = '............';
    el('dial').textContent = ''; dialStrip = null; wheel = null; el('volDeco').textContent = '';
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

  /* ---- the switch sound (issue #103): the stop key's clunk, a short fast-forward whir climbing as the reels speed up, the
     play key's click, and a little tape hiss under all of it ---- */
  TH.transitionSound = function (seconds) {
    return NOBODY.synth.sound(seconds, function (c, out, t0, dur, k) {
      const n = k.noise();
      const th = k.osc('sine'), tg = c.createGain();
      th.frequency.setValueAtTime(110, t0); th.frequency.exponentialRampToValueAtTime(60, t0 + 0.12); th.frequency.setValueAtTime(140, t0 + 1.0);
      k.env(tg.gain, [[0, 0], [0.025, 0.016], [0.11, 0.002], [0.15, 0], [1.0, 0], [1.015, 0.012], [1.07, 0]]);
      th.connect(tg); tg.connect(out);
      const kl = c.createBiquadFilter(); kl.type = 'bandpass'; kl.frequency.setValueAtTime(700, t0); kl.frequency.setValueAtTime(2500, t0 + 1.0); kl.Q.value = 1.5;
      const kg = c.createGain(); k.env(kg.gain, [[0, 0], [0.02, 0.01], [0.06, 0], [1.0, 0], [1.006, 0.014], [1.025, 0]]);
      n.connect(kl); kl.connect(kg); kg.connect(out);
      const wr = k.osc('triangle'); wr.frequency.setValueAtTime(170, t0 + 0.16); wr.frequency.exponentialRampToValueAtTime(560, t0 + 0.9);
      const fl = k.osc('sine'), fg = c.createGain(); fl.frequency.value = 23; fg.gain.value = 12; fl.connect(fg); fg.connect(wr.frequency);
      const wl = c.createBiquadFilter(); wl.type = 'lowpass'; wl.frequency.value = 900;
      const wg = c.createGain(); k.env(wg.gain, [[0, 0], [0.16, 0], [0.3, 0.012], [0.8, 0.012], [0.92, 0]]);
      wr.connect(wl); wl.connect(wg); wg.connect(out);
      const rb = c.createBiquadFilter(); rb.type = 'bandpass'; rb.Q.value = 0.8;
      rb.frequency.setValueAtTime(1200, t0 + 0.16); rb.frequency.exponentialRampToValueAtTime(3000, t0 + 0.9);
      const rg = c.createGain(); k.env(rg.gain, [[0, 0], [0.16, 0], [0.3, 0.006], [0.8, 0.006], [0.92, 0]]);
      n.connect(rb); rb.connect(rg); rg.connect(out);
      const hp = c.createBiquadFilter(); hp.type = 'highpass'; hp.frequency.value = 5000;
      const hg = c.createGain(); k.env(hg.gain, [[0, 0], [0.1, 0.003], [dur, 0.003]]);
      n.connect(hp); hp.connect(hg); hg.connect(out);
    });
  };

  /* ---- transitions (12.0): the bench light comes on for the boot; the cassette lifts in its window while tuning ---- */
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
    if (to === 'air') { glass.classList.add('bloom-on'); setTimeout(function () { glass.classList.remove('bloom-on'); }, 300); jolt(); }
    if (to === 'dead') { if (cassette) { cassette.host.hidden = true; cassette.label('no tape', 'nothing in the rack', 'SIDE A'); showCover(null); } renderStory(); }
    else if (cassette && from === 'dead') cassette.host.hidden = false;
    if (to === 'tuning') jolt();
    if (to === 'playing' || ((to === 'home' || to === 'page' || to === 'guestbook') && info.slug)) { if (cassette) cassette.host.hidden = false; TH.playing(info.slug || S.current); }
    return Promise.resolve();
  };
  function settle() { glass.style.transition = 'none'; void glass.offsetWidth; setTimeout(function () { glass.style.transition = ''; }, 50); }
  // a key going down shakes the whole body a little: the clack, drawn
  function jolt() {
    const tx = ctx && el('transmitter'); if (!tx || reduced) return;
    tx.classList.remove('td-jolt'); void tx.offsetWidth; tx.classList.add('td-jolt');
  }

  /* ---- the keys: six chunky piano keys on the top edge. REW, PLAY, FF and CUE are the station's four fat buttons (their
     handlers untouched); STOP is the station's `stop`; REC is a key with a red dot that never records ---- */
  function makeKeys() {
    const host = h('div', 'td-keys');
    const rec = h('span', 'td-key td-rec'); rec.setAttribute('aria-hidden', 'true'); rec.title = 'record: this player only plays';
    rec.appendChild(h('i', 'td-dot'));
    host.appendChild(rec);
    const stop = h('button', 'td-key td-stop'); stop.type = 'button'; stop.setAttribute('aria-label', 'stop'); stop.title = 'stop and rewind';
    stop.addEventListener('click', function () { if (NOBODY.st && NOBODY.st.stop) NOBODY.st.stop(); });
    host.appendChild(stop);
    // the headphone jack on the top edge, to the right of the keys, with its cable running off
    host.appendChild(h('span', 'td-jack'));
    const down = function (e) { if (e.target.closest && e.target.closest('.td-key, .fat .bk')) jolt(); };
    const tx = el('transmitter');
    tx.addEventListener('pointerdown', down);
    return { host: host, dispose: function () { tx.removeEventListener('pointerdown', down); host.remove(); } };
  }

  /* ---- the belt clip: a bent strip of plated steel seen from the side, on the player's right edge ---- */
  function makeClip() {
    const host = h('div', 'td-clip'); host.setAttribute('aria-hidden', 'true');
    host.innerHTML = '<svg viewBox="0 0 40 220" aria-hidden="true"><defs><linearGradient id="tdClipG" x1="0" x2="1"><stop offset="0" stop-color="#7b8188"/><stop offset=".35" stop-color="#eef1f3"/><stop offset=".6" stop-color="#a9afb5"/><stop offset="1" stop-color="#5d6268"/></linearGradient></defs>' +
      '<path d="M8 14 Q8 4 18 4 L24 4 Q32 4 32 14 L32 196 Q32 212 24 214 L20 215" fill="none" stroke="url(#tdClipG)" stroke-width="9" stroke-linecap="round"/>' +
      '<rect x="0" y="18" width="12" height="40" rx="3" fill="#2b2e32"/><rect x="0" y="23" width="12" height="4" fill="#45494e"/><rect x="0" y="31" width="12" height="4" fill="#45494e"/><rect x="0" y="39" width="12" height="4" fill="#45494e"/><rect x="0" y="47" width="12" height="4" fill="#45494e"/></svg>';
    return host;
  }

  /* ---- the VU meter: a cream face, -20 to +3, a red zone, a needle with ballistics and a lamp behind it ---- */
  function makeVu() {
    const host = h('div', 'td-vu'); host.setAttribute('aria-hidden', 'true');
    const W = 300, H = 132, cx = 150, cy = 236, R = 196;
    const marks = [[-20, '20'], [-10, '10'], [-7, '7'], [-5, '5'], [-3, '3'], [-1, '1'], [0, '0'], [1, '1'], [2, '2'], [3, '3']];
    const pt = function (a, r) { return [cx + Math.sin(a) * r, cy - Math.cos(a) * r]; };
    const arc = function (a0, a1, r) { const p0 = pt(a0, r), p1 = pt(a1, r); return 'M' + p0[0].toFixed(1) + ' ' + p0[1].toFixed(1) + ' A' + r + ' ' + r + ' 0 0 1 ' + p1[0].toFixed(1) + ' ' + p1[1].toFixed(1); };
    let s = '<svg viewBox="0 0 ' + W + ' ' + H + '"><defs><radialGradient id="tdVuLamp" cx=".5" cy="1" r="1"><stop offset="0" stop-color="#fff6d8"/><stop offset=".55" stop-color="#f4e5bd"/><stop offset="1" stop-color="#dfca95"/></radialGradient>' +
      '<clipPath id="tdVuClip"><rect x="7" y="7" width="' + (W - 14) + '" height="' + (H - 14) + '" rx="5"/></clipPath></defs>' +
      '<rect class="vu-bezel" x="0" y="0" width="' + W + '" height="' + H + '" rx="9"/>' +
      '<rect class="vu-face" x="7" y="7" width="' + (W - 14) + '" height="' + (H - 14) + '" rx="5" fill="url(#tdVuLamp)"/>' +
      '<rect class="vu-glow" x="7" y="7" width="' + (W - 14) + '" height="' + (H - 14) + '" rx="5"/>' +
      '<g clip-path="url(#tdVuClip)">';
    s += '<path class="vu-arc" d="' + arc(angleOfDb(-20), angleOfDb(0), R - 46) + '"/>';
    s += '<path class="vu-red" d="' + arc(angleOfDb(0), angleOfDb(3), R - 46) + '"/>';
    marks.forEach(function (m) {
      const a = angleOfDb(m[0]), p0 = pt(a, R - 46), p1 = pt(a, R - 37), pl = pt(a, R - 22);
      s += '<line class="vu-tick' + (m[0] >= 0 ? ' red' : '') + '" x1="' + p0[0].toFixed(1) + '" y1="' + p0[1].toFixed(1) + '" x2="' + p1[0].toFixed(1) + '" y2="' + p1[1].toFixed(1) + '"/>';
      s += '<text class="vu-num' + (m[0] > 0 ? ' red' : '') + '" x="' + pl[0].toFixed(1) + '" y="' + (pl[1] + 5).toFixed(1) + '" text-anchor="middle">' + m[1] + '</text>';
    });
    s += '<text class="vu-word" x="' + cx + '" y="' + (H - 22) + '" text-anchor="middle">VU</text>';
    s += '<g class="vu-needle"><line x1="' + cx + '" y1="' + cy + '" x2="' + cx + '" y2="' + (cy - R + 14) + '"/></g>';
    s += '</g><rect class="vu-pivot" x="' + (cx - 40) + '" y="' + (H - 16) + '" width="80" height="16" rx="3"/>';
    s += '<rect class="vu-glass" x="7" y="7" width="' + (W - 14) + '" height="' + ((H - 14) / 2) + '" rx="5"/></svg>';
    host.innerHTML = s;
    const needle = host.querySelector('.vu-needle');
    needle.style.transformOrigin = cx + 'px ' + cy + 'px';
    const M = { host: host, pos: -22, vel: 0, deg: angleOfDb(-22) * 180 / Math.PI };
    M.step = function (db) {
      // a damped spring: the needle swings past and settles, as a real one does
      M.vel += (db - M.pos) * 0.16; M.vel *= 0.74; M.pos += M.vel;
      M.pos = Math.max(-22, Math.min(4.2, M.pos));
      M.deg = angleOfDb(M.pos) * 180 / Math.PI;
      needle.style.transform = 'rotate(' + M.deg.toFixed(2) + 'deg)';
    };
    needle.style.transform = 'rotate(' + M.deg.toFixed(2) + 'deg)';
    return M;
  }
  // the scale is not linear: -20 sits far left, 0 two thirds of the way, +3 at the right stop
  const SCALE = [[-22, -0.04], [-20, 0], [-10, 0.24], [-7, 0.36], [-5, 0.46], [-3, 0.57], [-2, 0.63], [-1, 0.69], [0, 0.76], [1, 0.84], [2, 0.92], [3, 1], [4.2, 1.06]];
  function angleOfDb(db) {
    let f = SCALE[SCALE.length - 1][1];
    for (let i = 1; i < SCALE.length; i++) if (db <= SCALE[i][0]) { const a = SCALE[i - 1], b = SCALE[i]; f = a[1] + (b[1] - a[1]) * Math.max(0, (db - a[0]) / (b[0] - a[0])); break; }
    return (-38 + 76 * f) * Math.PI / 180;
  }

  /* ---- the counter: three white drums on black, the seconds on the tape ---- */
  function makeCounter() {
    const host = h('div', 'td-counter'); host.setAttribute('aria-hidden', 'true');
    const drums = h('span', 'td-drums');
    const cols = [];
    for (let i = 0; i < 3; i++) {
      const d = h('span', 'td-drum'), col = h('span', 'td-col');
      for (let k = 0; k <= 9; k++) col.appendChild(h('span', '', String(k)));
      d.appendChild(col); drums.appendChild(d); cols.push(col);
    }
    host.appendChild(drums);
    host.appendChild(h('span', 'td-legend label', 'COUNTER'));
    let last = -1;
    return {
      host: host, value: 0,
      set: function (n) {
        n = Math.max(0, Math.floor(n)) % 1000; if (n === last) return; last = n; this.value = n;
        const s = String(n).padStart(3, '0');
        cols.forEach(function (c, i) { c.style.transform = 'translateY(' + (-10 * +s[i]) + '%)'; });
      }
    };
  }

  /* ---- the battery door, left open: two big D cells, plain bands, 1.5V, no maker. their charge runs down slowly over a
     listening session (a reload puts fresh ones in), shown by four little bars beside the door ---- */
  function makeCells() {
    const host = h('div', 'td-cells'); host.setAttribute('aria-hidden', 'true');
    const cell = function (y) {
      return '<g transform="translate(14 ' + y + ')"><rect class="cell-body" x="0" y="0" width="150" height="40" rx="7"/>' +
        '<rect class="cell-band" x="96" y="0" width="54" height="40"/><rect class="cell-shine" x="2" y="5" width="146" height="7" rx="3"/>' +
        '<rect class="cell-cap" x="150" y="12" width="8" height="16" rx="2"/>' +
        '<text class="cell-txt" x="12" y="27">1.5V</text><text class="cell-txt big" x="112" y="29">D</text></g>';
    };
    host.innerHTML = '<svg viewBox="0 0 186 112"><rect class="cells-well" x="0" y="0" width="186" height="112" rx="8"/>' + cell(10) + cell(62) +
      '<path class="cells-spring" d="M4 20 l6 4 -6 4 6 4 -6 4 6 4"/><path class="cells-spring" d="M4 72 l6 4 -6 4 6 4 -6 4 6 4"/></svg>' +
      '<span class="td-battrow"><span class="td-batt"><i></i><i></i><i></i><i></i></span><span class="td-legend label">BATT</span></span>';
    const bars = host.querySelectorAll('.td-batt i');
    return {
      host: host, charge: 1,
      set: function (f) { this.charge = f; const lit = Math.max(1, Math.ceil(f * 4)); [].forEach.call(bars, function (b, i) { b.classList.toggle('on', i < lit); b.classList.toggle('low', lit === 1); }); }
    };
  }

  /* ---- the cassette (12.14): an SVG, reels that turn, tape that moves hub to hub, a hand-lettered label ---- */
  function svgEl(name, attrs) { const e = document.createElementNS('http://www.w3.org/2000/svg', name); for (const k in attrs) e.setAttribute(k, attrs[k]); return e; }
  // the photocopy (issue #88): the cover as if run through an office copier onto card
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
    const host = h('div', 'tx-widget cassette'); host.setAttribute('aria-hidden', 'true');
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
    const side = svg.querySelector('.side'), title = svg.querySelector('.title'), sub = svg.querySelector('.sub'), tl = svg.querySelector('.tape-l'), tr = svg.querySelector('.tape-r');
    host.appendChild(svg);
    return {
      host: host, svg: svg, titleText: 'nothing loaded', cover: svg.querySelector('.cover'),
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
  function reel(cx, cy) {
    return '<g class="reel"><circle class="hub" cx="' + cx + '" cy="' + cy + '" r="15"/><g class="spoke"><line x1="' + cx + '" y1="' + (cy - 13) + '" x2="' + cx + '" y2="' + (cy + 13) + '"/><line x1="' + (cx - 13) + '" y1="' + cy + '" x2="' + (cx + 13) + '" y2="' + cy + '"/><line x1="' + (cx - 9) + '" y1="' + (cy - 9) + '" x2="' + (cx + 9) + '" y2="' + (cy + 9) + '"/><line x1="' + (cx + 9) + '" y1="' + (cy - 9) + '" x2="' + (cx - 9) + '" y2="' + (cy + 9) + '"/></g><circle class="axle" cx="' + cx + '" cy="' + cy + '" r="4"/></g>';
  }

  /* ---- the J-card (issue #88, opened flat for #240): the cover photocopied onto its front panel, the spine beside it
     hand-lettered with what is on the tape. it heads the story panel ---- */
  function makeJcard() {
    const id = 'jcard' + (++uid);
    const svg = svgEl('svg', { viewBox: '0 0 320 140', role: 'img', class: 'jcard' });
    svg.setAttribute('aria-hidden', 'true');
    svg.innerHTML =
      '<defs><clipPath id="' + id + '-front"><rect x="10" y="10" width="120" height="120"/></clipPath>' + copyFilter(id + '-copy', 23 + uid) + '</defs>' +
      '<rect class="jc-card" x="1" y="1" width="318" height="138" rx="3"/>' +
      '<g class="jc-paint"><rect class="art" x="10" y="10" width="120" height="120"/><rect class="art-stripe" x="10" y="98" width="120" height="10"/>' +
      '<rect x="64" y="26" width="14" height="72" fill="#fff" fill-opacity=".28"/><rect x="22" y="60" width="26" height="40" fill="#000" fill-opacity=".25"/></g>' +
      '<image class="cover" x="10" y="10" width="120" height="120" preserveAspectRatio="xMidYMid slice" clip-path="url(#' + id + '-front)" filter="url(#' + id + '-copy)" visibility="hidden"/>' +
      '<line class="jc-fold" x1="140" y1="4" x2="140" y2="136"/>' +
      '<text class="jc-spine" x="152" y="56">nothing loaded</text>' +
      '<text class="jc-side" x="152" y="88">A/B</text>' +
      '<text class="jc-small" x="152" y="116"></text>' +
      '<path class="jc-ear" d="M319 1 L319 21 L299 1 Z"/>';
    const spine = svg.querySelector('.jc-spine'), sideT = svg.querySelector('.jc-side'), small = svg.querySelector('.jc-small');
    return {
      svg: svg, cover: svg.querySelector('.cover'), spineText: '',
      spine: function (t, s, sm) { this.spineText = t; spine.textContent = t; sideT.textContent = s || ''; small.textContent = sm || ''; fitText([spine], 158); fitText([small], 158); }
    };
  }

  // the cover (#73's site API, NOBODY.cover): loaded once per address; while it loads, or if it never does, the painted square stays
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
  function loadCover(url, targets, done) {
    const apply = function (ok) { targets.forEach(function (im) { if (ok) im.setAttribute('href', url); im.setAttribute('visibility', ok ? 'visible' : 'hidden'); }); if (done) done(ok); };
    if (!url) { apply(false); return; }
    const c = coverCache[url];
    if (c && c.done) { apply(c.ok); return; }
    if (!c) {
      const rec = coverCache[url] = { done: false, ok: false, wait: [] };
      const img = new Image();
      img.onload = function () { rec.done = true; rec.ok = true; rec.wait.forEach(function (f) { f(true); }); };
      img.onerror = function () { rec.done = true; rec.wait.forEach(function (f) { f(false); }); };
      img.src = url;
    }
    coverCache[url].wait.push(apply);
  }
  // the label in the window follows what plays; the J-card follows the story (what plays, or what is being looked at)
  function showCover(url) {
    coverWant = url;
    if (cassette) loadCover(url, [cassette.cover], null);
  }
  let jcardWant = null;
  function showJcardCover(url) {
    jcardWant = url;
    if (!jcard) return;
    coverState = url ? 'loading' : 'none';
    loadCover(url, [jcard.cover], function (ok) { if (jcardWant !== url || !jcard) return; coverState = url ? (ok ? 'image' : 'painted') : 'none'; jcard.svg.classList.toggle('has-cover', !!ok); });
  }
  function sideName() { return document.documentElement.dataset.phosphor === 'amber' ? 'SIDE B' : 'SIDE A'; }
  // an album plays as one tape (issue #88): the first half of its tracks is side A and the rest side B
  let tape = null;
  function tapeOf(slug) {
    const a = albumOf(slug);
    const list = a && Array.isArray(a.tracks) ? a.tracks : [];
    const i = list.indexOf(slug);
    if (!a || i < 0) return null;
    const half = Math.ceil(list.length / 2), b = i >= half;
    return { album: a.slug, title: a.title || titleOf(a.slug), side: b ? 'B' : 'A', no: b ? i - half + 1 : i + 1, of: b ? list.length - half : half, n: list.length, index: i + 1 };
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
    } else {
      const num = S.num && S.num[slug] ? String(S.num[slug]).padStart(2, '0') : '--';
      cassette.label(titleOf(t.title || slug), meta + (t.model ? '  ' + t.model : ''), sideName() + ' - ' + num);
    }
    showCover(coverOf(slug));
    if (vis) vis.setTrack(t);
    // without the core's story hook the theme follows the deck itself: a track that starts playing is no longer "looked at"
    if (!hasCoreStory() && inspecting === slug) inspecting = null;
    renderStory();
    renderQueue();
    if (!fontsFitted && document.fonts && document.fonts.load) { fontsFitted = true; document.fonts.load('24px "Permanent Marker"').then(function () { if (S.current && cassette) TH.playing(S.current); }, function () {}); }
  };
  let fontsFitted = false;
  TH.catalogue = function () { if (story) { renderQueue(); renderStory(); } };
  TH.scheme = function () { if (visMod) makeVis(); if (S.current) TH.playing(S.current); };

  /* ---- the story (issue #240): the J-card opened flat beside the player. what plays, unless a title was clicked: then that
     one, with play now and play next, and the music does not change. the core's NOBODY.story and ctx.inspect drive it when
     they exist; until then the theme reads the index itself and keeps its own "looking at" ---- */
  let inspecting = null, storyTab = 'story';
  function hasCoreStory() { return typeof NOBODY.story === 'function' && !!(ctx && ctx.inspect); }
  function localStory(slug) {
    const t = S.bySlug && S.bySlug[slug]; if (!t) return null;
    const tp = tapeOf(slug);
    return { slug: slug, title: t.title || titleOf(slug), asked: t.request || t.idea || '', why: t.why || '', prompt: t.prompt || '', lyrics: t.lyrics || null,
      takes: t.takes || [], rejected: t.rejected || [], numbers: t.numbers || {}, checks: t.checks || {}, lineage: t.lineage || null, licence: t.licence || '',
      album: tp ? tp.title : null, n: tp ? tp.index : null, of: tp ? tp.n : null,
      bpm: t.bpm, key: t.key, seed: t.seed, model: t.model, duration: t.duration, project: t.project || '' };
  }
  // the core's story, when there is one, wins field by field; the index fills whatever it leaves out
  function storyOf(slug) {
    const base = localStory(slug); if (!base) return null;
    let core = null;
    if (typeof NOBODY.story === 'function') { try { core = NOBODY.story(slug); } catch (e) { core = null; } }
    if (core) Object.keys(core).forEach(function (k) { if (core[k] != null && k !== 'takes') base[k] = core[k]; });
    if (base.album && typeof base.album === 'object') { const a = base.album; base.album = a.title || titleOf(a.slug); base.n = a.n; base.of = a.of; }
    if (base.lineage && !base.lineage.parent && !base.lineage.changed) base.lineage = null;
    return base;
  }
  // the core's hook: called with the story to show and whether it is a look at another track
  TH.story = function (info, opts) {
    const slug = info && info.slug, was = inspecting;
    inspecting = opts && opts.inspecting ? slug : null;
    storyOpen = !(opts && opts.open === false);
    renderStory();
    renderQueue();
    // on a phone the story is under the player: a look at another track brings it into view
    if (inspecting && inspecting !== was && story && V.phone()) story.host.scrollIntoView({ block: 'start', behavior: reduced ? 'auto' : 'smooth' });
  };
  let storyOpen = true;
  function inspect(slug) {
    if (!slug || !S.bySlug[slug]) return;
    if (ctx.inspect) ctx.inspect(slug);
    else { inspecting = slug === S.current ? null : slug; renderStory(); renderQueue(); }
  }
  function uninspect() {
    if (ctx.inspect) ctx.inspect(null);
    else { inspecting = null; renderStory(); renderQueue(); }
  }
  function playNext(slug) {
    if (ctx.playNext) { ctx.playNext(slug); return; }
    // the old queue: `queue` puts a track at the head, a second time takes it out. never take it out from here
    const q = ctx.queueList();
    if (q[0] !== slug) ctx.queue(slug);
    else ctx.print('already next: ' + slug, 'mid');
  }
  function makeStory() {
    const host = h('section', 'td-side td-story');
    host.setAttribute('aria-label', 'the story of the track');
    const head = h('div', 'td-head');
    const label = h('span', 'td-label label', 'THE STORY');
    const back = btn('back to the tape', 'td-back', function () { uninspect(); }, 'show what is playing');
    head.appendChild(label); head.appendChild(back);
    host.appendChild(head);
    const jc = makeJcard();
    host.appendChild(jc.svg);
    const title = h('div', 'td-story-title');
    host.appendChild(title);
    const facts = h('div', 'td-facts');
    host.appendChild(facts);
    const tabs = h('div', 'td-tabs'); tabs.setAttribute('role', 'tablist');
    host.appendChild(tabs);
    const body = h('div', 'td-tabbody'); body.setAttribute('role', 'tabpanel');
    host.appendChild(body);
    const acts = h('div', 'td-acts');
    host.appendChild(acts);
    return { host: host, label: label, back: back, jcard: jc, title: title, facts: facts, tabs: tabs, body: body, acts: acts, slug: null };
  }
  function renderStory() {
    if (!story || !jcard) return;
    const slug = inspecting || S.current;
    const s = slug && S.state !== 'dead' ? storyOf(slug) : null;
    const looking = !!(inspecting && inspecting !== S.current);
    story.host.classList.toggle('looking', looking);
    story.host.classList.toggle('folded', !storyOpen && !looking);
    story.label.textContent = looking ? 'LOOKING AT' : (S.state === 'dead' ? 'NO TAPE' : 'NOW PLAYING');
    story.back.hidden = !looking;
    story.title.textContent = ''; story.facts.textContent = ''; story.tabs.textContent = ''; story.body.textContent = ''; story.acts.textContent = '';
    if (!s) {
      jcard.spine('no tape', '', ''); showJcardCover(null);
      story.title.textContent = 'nothing in the deck';
      story.body.appendChild(h('p', 'td-why', 'put a tape in: press play, or pick one from the rack.'));
      story.slug = null;
      return;
    }
    if (story.slug !== slug) storyTab = 'story';
    story.slug = slug;
    // the J-card: an album's spine reads the album, a single its own title
    if (s.album) jcard.spine(s.album, 'A/B', String(s.n).padStart(2, '0') + ' of ' + String(s.of).padStart(2, '0'));
    else jcard.spine(s.title, 'single', (s.bpm ? s.bpm + ' bpm' : '') + (s.key ? '  ' + s.key : ''));
    showJcardCover(coverOf(slug));
    story.title.textContent = s.title;
    const fact = function (k, v) { if (v == null || v === '') return; const f = h('span', 'td-fact'); f.appendChild(h('b', 'label', k)); f.appendChild(document.createTextNode(' ' + v)); story.facts.appendChild(f); };
    fact('bpm', s.bpm); fact('key', s.key); fact('len', s.duration ? ctx.fmt(s.duration) : null); fact('seed', s.seed); fact('tier', s.model);
    if (s.album) fact('album', s.album + '  ' + s.n + '/' + s.of);
    if (s.project) fact('project', s.project);
    // paper tabs: the story, the prompt, the lyrics (when there are words), the takes, the numbers, the lineage (when it has one)
    const tabsWanted = [['story', 'STORY'], ['prompt', 'PROMPT']];
    if (s.lyrics) tabsWanted.push(['lyrics', 'LYRICS']);
    tabsWanted.push(['takes', 'TAKES'], ['numbers', 'NUMBERS']);
    if (s.lineage) tabsWanted.push(['lineage', 'LINEAGE']);
    if (!tabsWanted.some(function (t) { return t[0] === storyTab; })) storyTab = 'story';
    tabsWanted.forEach(function (t) {
      const b = h('button', 'td-tab label' + (t[0] === storyTab ? ' on' : ''), t[1]); b.type = 'button'; b.setAttribute('role', 'tab'); b.setAttribute('aria-selected', t[0] === storyTab ? 'true' : 'false');
      b.addEventListener('click', function (e) { e.stopPropagation(); storyTab = t[0]; renderStory(); });
      story.tabs.appendChild(b);
    });
    const p = function (cls, text) { const e = h('p', cls, text); story.body.appendChild(e); return e; };
    if (storyTab === 'story') {
      if (s.asked) { const a = p('td-asked'); a.appendChild(h('b', 'td-k label', 'asked ')); a.appendChild(document.createTextNode(s.asked)); }
      p('td-why', s.why || '(nobody wrote about this one yet.)');
    } else if (storyTab === 'prompt') {
      p('td-prompt', s.prompt || '(no prompt on file.)');
    } else if (storyTab === 'lyrics') {
      p('td-lyrics', s.lyrics);
    } else if (storyTab === 'takes') {
      p('', 'kept: ' + s.seed + ((s.takes || []).filter(function (x) { return x !== s.seed; }).length ? '   other takes: ' + s.takes.filter(function (x) { return x !== s.seed; }).join('  ') : ''));
      if (s.rejected && s.rejected.length) {
        p('td-k label', 'thrown out:');
        s.rejected.forEach(function (r) { p('td-rej', String(r.seed) + '  ' + (r.reason || '')); });
      } else p('', 'nothing thrown out.');
    } else if (storyTab === 'numbers') {
      const n = s.numbers || {}, c = s.checks || {};
      const defs = [['tempo', 'tempo_bpm', ' bpm', 'tempo'], ['loudness', 'lufs', ' LUFS', 'loudness'], ['peak', 'peak_dbfs', ' dBFS', 'peak'], ['silence', 'silence_s', ' s', 'silence'],
        ['brightness', 'brightness_pct', ' %', 'brightness'], ['boominess', 'boominess_pct', ' %', 'boominess'], ['onsets', 'onsets_per_s', '/s', 'onsets'], ['seam', 'seam_db', ' dB', 'seam'], ['words', 'words_pct', ' % read back', 'words']];
      const tb = h('div', 'td-nums');
      defs.forEach(function (d) {
        if (n[d[1]] == null) return;
        const v = typeof n[d[1]] === 'number' ? Math.round(n[d[1]] * 10) / 10 : n[d[1]];
        const r = h('div', 'td-num'); r.appendChild(h('span', 'td-k label', d[0])); r.appendChild(h('span', '', v + d[2]));
        r.appendChild(h('span', c[d[3]] === false ? 'td-bad' : 'td-ok', c[d[3]] === false ? 'over' : c[d[3]] === true ? 'ok' : ''));
        tb.appendChild(r);
      });
      if (!tb.children.length) p('', 'no numbers on file.'); else story.body.appendChild(tb);
    } else if (storyTab === 'lineage') {
      const l = s.lineage || {};
      const a = p('');
      a.appendChild(h('b', 'td-k label', 'from '));
      if (l.parent && S.bySlug[l.parent]) a.appendChild(btn(titleOf(l.parent), 'td-link', function () { inspect(l.parent); }, 'look at ' + l.parent));
      else a.appendChild(document.createTextNode(l.parent || '?'));
      if (l.seed != null) p('', 'same seed: ' + l.seed);
      if (l.changed) p('', 'changed: "' + (l.changed.from || '') + '" to "' + (l.changed.to || '') + '"');
      if (l.request) p('', 'asked: ' + l.request);
    }
    // the actions: a looked-at track offers to play; the playing one offers what the old page did
    if (looking) {
      story.acts.appendChild(btn('play now', 'td-big', function () { ctx.play(slug); }, 'play ' + slug + ' now'));
      story.acts.appendChild(btn('play next', '', function () { playNext(slug); renderQueue(); }, 'put ' + slug + ' next'));
      if (ctx.add) story.acts.appendChild(btn('add to queue', '', function () { ctx.add(slug); }, 'add ' + slug + ' to the end of your side'));
      story.acts.appendChild(btn('remix', '', function () { ctx.remix(slug); }, 'remix ' + slug));
    } else {
      story.acts.appendChild(btn('remix this', 'td-big', function () { ctx.remix(slug); }, 'remix ' + slug));
      story.acts.appendChild(btn('take it home', '', function (e, b) { if (NOBODY.st && NOBODY.st.take) NOBODY.st.take(slug, b); }, 'the recipe and the files'));
      story.acts.appendChild(btn('copy seed', '', function () { if (NOBODY.st && NOBODY.st.copySeed) NOBODY.st.copySeed(slug); }));
      story.acts.appendChild(btn('copy prompt', '', function () { if (NOBODY.st && NOBODY.st.copyPrompt) NOBODY.st.copyPrompt(slug); }));
    }
  }

  /* ---- the running order (issue #240): an index card. side A is yours, in your order; side B is the rotation. with the
     core's queue (S.mine, ctx.move/remove/clear/playNext) lines on side A move up and down, drag, and drop out; until then
     side B is the station's queue and its `+` puts a line next ---- */
  let queueData = null;
  TH.queue = function (list) {
    if (list && (list.mine || list.rotation)) queueData = { mine: (list.mine || []).slice(), rotation: (list.rotation || []).slice(), current: list.current };
    else queueData = null;
    renderQueue();
  };
  function queueNow() {
    if (queueData) return queueData;
    const mine = ctx.mine ? ctx.mine() : [];
    const rot = ctx.rotationList ? ctx.rotationList() : (ctx.queueList ? ctx.queueList() : []).filter(function (s) { return mine.indexOf(s) < 0; });
    return { mine: mine.slice(), rotation: rot.slice(0, 12), current: S.current };
  }
  function makeRunOrder() {
    const host = h('section', 'td-side td-order');
    host.setAttribute('aria-label', 'the running order');
    const head = h('div', 'td-head');
    head.appendChild(h('span', 'td-label label', 'RUNNING ORDER'));
    const clear = btn('clear yours', 'td-clear', function () { if (ctx.clear) ctx.clear(); }, 'take your picks off; the rotation stays');
    head.appendChild(clear);
    host.appendChild(head);
    const now = h('div', 'td-q-now');
    host.appendChild(now);
    const aHead = h('div', 'td-side-head'); aHead.appendChild(h('span', 'td-k label', 'SIDE A')); aHead.appendChild(h('span', '', 'yours'));
    host.appendChild(aHead);
    const a = h('ol', 'td-q td-q-mine');
    host.appendChild(a);
    const bHead = h('div', 'td-side-head'); bHead.appendChild(h('span', 'td-k label', 'SIDE B')); bHead.appendChild(h('span', '', 'then the rotation'));
    host.appendChild(bHead);
    const b = h('ol', 'td-q td-q-rot');
    host.appendChild(b);
    return { host: host, clear: clear, now: now, a: a, b: b };
  }
  function renderQueue() {
    if (!runOrder || !ctx || !S.bySlug) return;
    const q = queueNow();
    const canMove = !!ctx.move, canDrop = !!ctx.remove;
    runOrder.clear.hidden = !(ctx.clear && q.mine.length);
    runOrder.now.textContent = '';
    if (S.current && S.bySlug[S.current]) {
      runOrder.now.appendChild(h('span', 'td-k label', playingNow() ? 'ON' : 'IN'));
      runOrder.now.appendChild(btn(titleOf(S.bySlug[S.current].title || S.current), 'td-link td-q-title', function () { uninspect(); }, 'the story of what plays'));
    }
    const line = function (slug, i, mine) {
      const t = S.bySlug[slug]; if (!t) return null;
      const li = h('li', 'td-qline' + (slug === inspecting ? ' looked' : ''));
      li.dataset.slug = slug;
      li.appendChild(h('span', 'td-qn', String(i + 1).padStart(2, '0')));
      li.appendChild(btn(titleOf(t.title || slug), 'td-link td-q-title', function () { inspect(slug); }, 'the story of ' + slug));
      li.appendChild(h('span', 'td-qlen', ctx.fmt(t.duration)));
      const tools = h('span', 'td-qtools');
      if (mine) {
        if (canMove) {
          const up = btn('↑', 'td-qb', function () { ctx.move(slug, Math.max(0, i - 1)); }, 'move up'); up.disabled = i === 0; tools.appendChild(up);
          const dn = btn('↓', 'td-qb', function () { ctx.move(slug, i + 1); }, 'move down'); dn.disabled = i === q.mine.length - 1; tools.appendChild(dn);
        }
        if (canDrop) tools.appendChild(btn('x', 'td-qb', function () { ctx.remove(slug); }, 'take it off your side'));
      } else {
        tools.appendChild(btn('+', 'td-qb', function () { playNext(slug); renderQueue(); }, 'put it next'));
      }
      li.appendChild(tools);
      if (mine && canMove) dragLine(li, slug);
      return li;
    };
    runOrder.a.textContent = ''; runOrder.b.textContent = '';
    q.mine.forEach(function (s, i) { const l = line(s, i, true); if (l) runOrder.a.appendChild(l); });
    if (!q.mine.length) runOrder.a.appendChild(h('li', 'td-qempty', ctx.playNext ? 'nothing of yours yet. + on side B, or play next on a story, puts it here.' : 'your picks and the rotation share one list for now. + puts a line next.'));
    q.rotation.slice(0, 12).forEach(function (s, i) { const l = line(s, i, false); if (l) runOrder.b.appendChild(l); });
    if (!q.rotation.length) runOrder.b.appendChild(h('li', 'td-qempty', 'the rotation refills itself. nobody stops.'));
  }
  // drag a line of side A by its number: the line lifts, a rule shows where it lands, the drop asks the station to move it
  function dragLine(li, slug) {
    const grip = li.querySelector('.td-qn');
    grip.classList.add('grip'); grip.title = 'drag to move';
    grip.addEventListener('pointerdown', function (e) {
      e.preventDefault();
      const lines = [].slice.call(runOrder.a.querySelectorAll('.td-qline'));
      const from = lines.indexOf(li);
      let to = from;
      li.classList.add('lifted');
      try { grip.setPointerCapture(e.pointerId); } catch (x) {}
      const move = function (ev) {
        to = lines.length - 1;
        for (let i = 0; i < lines.length; i++) { const r = lines[i].getBoundingClientRect(); if (ev.clientY < r.top + r.height / 2) { to = i; break; } }
        lines.forEach(function (l, i) { l.classList.toggle('drop-before', i === to && to < from); l.classList.toggle('drop-after', i === to && to > from); });
      };
      const up = function () {
        grip.removeEventListener('pointermove', move); grip.removeEventListener('pointerup', up); grip.removeEventListener('pointercancel', up);
        li.classList.remove('lifted'); lines.forEach(function (l) { l.classList.remove('drop-before', 'drop-after'); });
        if (to !== from) ctx.move(slug, to);
      };
      grip.addEventListener('pointermove', move); grip.addEventListener('pointerup', up); grip.addEventListener('pointercancel', up);
    });
  }
  TH.nextUp = function () { renderQueue(); };

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
    if (counter) counter.set(c);
    if (view !== 'home') { const bar = hdrBarEl.querySelector('i'); if (bar) bar.style.width = pct.toFixed(2) + '%'; }
  };
  TH.progressHit = function (progressEl, x) { const rail = progressEl.querySelector('.rail') || progressEl, r = rail.getBoundingClientRect(); return Math.max(0, Math.min(1, (x - r.left) / r.width)); };
  // the dial: a strip of frequencies under a red needle, the radio side of the player
  function makeDialStrip(host) {
    host.textContent = '';
    const strip = h('div', 'dial-strip');
    let ticks = '', labels = '';
    for (let i = 0; i <= 110; i++) ticks += (i % 5 === 0) ? '|' : '.';
    for (let k = 0; k <= 22; k++) labels += (86 + k).toFixed(1) + ' ';
    strip.appendChild(h('pre', '', ticks));
    strip.appendChild(h('pre', 'labels', labels));
    host.appendChild(strip);
    const read = h('span', 'dial-read'); host.appendChild(read);
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
  // the thumbwheel beside the shared fader (12.0 controls): a ribbed wheel edge whose ribs roll with the level; it takes no click
  function makeWheel(host) {
    host.textContent = '';
    const svg = svgEl('svg', { viewBox: '0 0 26 44', 'aria-hidden': 'true' });
    svg.innerHTML = '<rect class="wh-slot" x="0" y="0" width="26" height="44" rx="4"/><rect class="wh-body" x="4" y="3" width="18" height="38" rx="7"/><g class="wh-ribs"></g><rect class="wh-shade" x="4" y="3" width="18" height="38" rx="7"/>';
    const ribs = svg.querySelector('.wh-ribs');
    host.appendChild(svg);
    return {
      set: function (v, muted) {
        ribs.textContent = '';
        const off = (v % 1.5) / 1.5 * 6;
        for (let y = 3 + off; y < 41; y += 6) ribs.appendChild(svgEl('line', { x1: 5, x2: 21, y1: y.toFixed(1), y2: y.toFixed(1) }));
        host.classList.toggle('muted', !!muted);
      }
    };
  }
  TH.volume = function (decoEl, v, muted) {
    if (!wheel || !decoEl.querySelector('svg')) wheel = makeWheel(decoEl);
    wheel.set(v, muted);
  };
  // dead air: an empty cassette behind the window, its reels turning slowly (there is nothing on it)
  TH.towerStart = function (hostEl, staticEl) {
    if (!towerCassette || towerCassette.host.parentNode !== hostEl) {
      towerCassette = makeCassette();
      towerCassette.host.classList.remove('tx-widget');
      towerCassette.label('no tape', 'nothing in the rack yet', 'SIDE A');
      towerCassette.tape(0);
      hostEl.replaceChildren(towerCassette.host);
    }
    staticEl.hidden = true;
    return 'cassette';
  };
  TH.towerStop = function () {};
  TH.towerState = function () { return 'an empty cassette, reels turning slowly'; };

  /* ---- the level meter (the card's analyser): a ladder of LEDs per band, green, then amber, then red at the top; the scope
     is a green trace on a black inset ---- */
  function colours() { return { led: token('--led'), amber: token('--led-amber'), red: token('--led-red'), off: token('--led-off'), trace: token('--trace') }; }
  function roundRect(g, x, y, w, h2, r) {
    r = Math.min(r, w / 2, h2 / 2);
    g.beginPath(); g.moveTo(x + r, y); g.lineTo(x + w - r, y); g.quadraticCurveTo(x + w, y, x + w, y + r); g.lineTo(x + w, y + h2 - r); g.quadraticCurveTo(x + w, y + h2, x + w - r, y + h2); g.lineTo(x + r, y + h2); g.quadraticCurveTo(x, y + h2, x, y + h2 - r); g.lineTo(x, y + r); g.quadraticCurveTo(x, y, x + r, y); g.closePath();
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
    const pad = 8, x0 = pad, areaW = W - pad * 2;
    A.totalCols = Math.floor(W / (V.fontPx() * 0.6));
    if (A.mode === 'scope5') { drawScope5(g, c, x0, areaW, H); return; }
    const per = areaW / A.bands, bw = Math.max(2, per * 0.72);
    const segs = 14, segH = (H - pad * 2) / segs, gap = Math.max(1, segH * 0.24);
    for (let b = 0; b < A.bands; b++) {
      const v = A.vals[b];
      const lit = Math.min(segs, Math.floor(Math.pow(v, 0.8) * (segs + 0.99)));
      if (lit > A.peaks[b]) { A.peaks[b] = lit; A.peakAt[b] = now; }
      else if (now - A.peakAt[b] > 180 && A.peaks[b] > 0) { A.peaks[b]--; A.peakAt[b] = now; }
      const x = x0 + b * per + (per - bw) / 2;
      for (let s = 0; s < segs; s++) {
        const on = s < lit || s === Math.min(segs, A.peaks[b]) - 1;
        const col = s >= segs - 2 ? c.red : s >= segs - 5 ? c.amber : c.led;
        const y = A.flip ? pad + s * segH : H - pad - (s + 1) * segH;
        g.fillStyle = on ? col : c.off;
        g.fillRect(x, y + gap / 2, bw, segH - gap);
      }
    }
    A.baselineText(A.live);
    scopeLine(c);
  };
  function scopeLine(c) {
    if (!scopeCtx) return;
    const W = +scopeCanvas.dataset.w || 500, H = +scopeCanvas.dataset.h || 20, n = Math.max(32, Math.floor(W / 3));
    const s = A.samples(n), gn = autoGain(s), g = scopeCtx;
    g.clearRect(0, 0, W, H);
    g.lineWidth = 1.4; g.strokeStyle = c.trace;
    g.beginPath();
    for (let i = 0; i < n; i++) { const x = i / (n - 1) * W, y = H / 2 - s[i] * gn * (H / 2 - 2); if (i) g.lineTo(x, y); else g.moveTo(x, y); }
    g.stroke();
  }
  function drawScope5(g, c, x0, areaW, H) {
    const n = Math.max(32, Math.floor(areaW / 2)), s = A.samples(n), gn = autoGain(s);
    g.lineWidth = 1.6; g.strokeStyle = c.trace;
    g.beginPath();
    for (let i = 0; i < n; i++) { const x = x0 + i / (n - 1) * areaW, y = H / 2 - s[i] * gn * (H / 2 - 4); if (i) g.lineTo(x, y); else g.moveTo(x, y); }
    g.stroke();
    A.baselineText(true);
    if (scopeCtx) scopeCtx.clearRect(0, 0, +scopeCanvas.dataset.w || 500, +scopeCanvas.dataset.h || 20);
  }

  /* ---- the scene behind the page: the bench light, and the needle's ballistics, every frame. under the hidden mode it is
     the close-up: the window, the reels turning large, the VU needle and a row of ten level lamps ---- */
  let listened = 0;
  function makeViz() {
    const canvas = document.createElement('canvas'); canvas.className = 'viz'; canvas.id = 'tapeViz'; canvas.setAttribute('aria-hidden', 'true');
    const g = canvas.getContext('2d');
    const Z = { canvas: canvas, frames: 0, ms: 0, raf: 0, scale: 1, cost: 0, w: 0, h: 0, running: true, level: 0, last: 0, spin: 0 };
    Z.size = function () { const d = Math.min(devicePixelRatio || 1, 1.5) * Z.scale; Z.w = canvas.width = Math.round(innerWidth * d); Z.h = canvas.height = Math.round(innerHeight * d); if (vis) vis.resize(Z.w, Z.h); };
    function frame(now) {
      if (!Z.running) return;
      Z.raf = requestAnimationFrame(frame);
      if (document.hidden) { Z.last = now; return; }
      const t0 = performance.now(), w = Z.w, hh = Z.h;
      const dt = Z.last ? Math.min(0.1, (now - Z.last) / 1000) : 0; Z.last = now;
      const live = !!(S && S.onAir && A && playingNow());
      const loud = live ? (A.loud || 0) : 0;
      Z.level += (loud - Z.level) * 0.2;
      // the needle: the loudness on a dB-like scale; at rest on the left stop when nothing plays
      if (vu) vu.step(live ? Math.max(-20, Math.min(3, -20 + 23 * Math.pow(Math.min(1, loud / 0.5), 0.7))) : -22);
      // the cells: four hours of play runs them down to the last bar; a reload puts fresh ones in
      if (live) listened += dt;
      if (cells) cells.set(Math.max(0.08, 1 - listened / (4 * 3600)));
      if (live && !reduced) Z.spin += dt * 2.6;
      g.clearRect(0, 0, w, hh);
      if (document.body.classList.contains('ui-hidden')) { if (vis) visFrame(g, w, hh, live, now); else closeUp(g, w, hh, live); }
      else {
        // daylight from above: a soft pool that brightens a touch with the loudness
        const lg = g.createRadialGradient(w * 0.5, -hh * 0.15, 0, w * 0.5, -hh * 0.15, hh * 1.1);
        lg.addColorStop(0, 'rgba(255,255,250,' + (0.16 + Z.level * 0.2).toFixed(3) + ')'); lg.addColorStop(1, 'rgba(255,255,250,0)');
        g.fillStyle = lg; g.fillRect(0, 0, w, hh);
      }
      Z.frames++;
      const ms = performance.now() - t0; Z.ms += (ms - Z.ms) * 0.1;
      Z.cost = Z.cost * 0.9 + ms * 0.1;
      if (Z.cost > 6 && Z.scale > 0.4) { Z.scale -= 0.15; Z.size(); Z.cost = 0; }
    }
    // the close-up for the hidden mode: drawn here, on the canvas, because the page itself has faded
    function closeUp(g2, w, hh, live) {
      const u = Math.min(w / 16, hh / 10);
      const cx = w / 2, cy = hh * 0.42;
      g2.fillStyle = '#26292d'; roundRect(g2, cx - 7.6 * u, cy - 3.6 * u, 15.2 * u, 7.4 * u, u * 0.6); g2.fill();
      const pl = g2.createLinearGradient(0, cy - 3.2 * u, 0, cy + 3.4 * u); pl.addColorStop(0, '#dfe2e4'); pl.addColorStop(1, '#b3b8bd');
      g2.fillStyle = pl; roundRect(g2, cx - 7.2 * u, cy - 3.2 * u, 14.4 * u, 6.6 * u, u * 0.4); g2.fill();
      g2.fillStyle = token('--orange') || '#ff5b1a'; g2.fillRect(cx - 7.2 * u, cy + 2.7 * u, 14.4 * u, 0.22 * u);
      // the window and the two reels, the tape packs following the track
      g2.fillStyle = '#1a1c1f'; roundRect(g2, cx - 6.8 * u, cy - 2.1 * u, 7.4 * u, 4.4 * u, u * 0.3); g2.fill();
      const dk = ctx && ctx.deck, f = dk && dk.duration ? Math.max(0, Math.min(1, dk.currentTime / dk.duration)) : 0;
      [[-4.9, 1 - f], [-1.5, f]].forEach(function (r, ri) {
        const rx = cx + r[0] * u, ry = cy + 0.1 * u;
        g2.fillStyle = '#3a2c20'; g2.beginPath(); g2.arc(rx, ry, (0.75 + 0.95 * r[1]) * u, 0, Math.PI * 2); g2.fill();
        g2.fillStyle = '#f1e8d3'; g2.beginPath(); g2.arc(rx, ry, 0.62 * u, 0, Math.PI * 2); g2.fill();
        g2.strokeStyle = '#2a2118'; g2.lineWidth = u * 0.12;
        for (let k = 0; k < 3; k++) { const a = Z.spin * (ri ? 1.2 : 1) + k * Math.PI / 3; g2.beginPath(); g2.moveTo(rx - Math.cos(a) * 0.5 * u, ry - Math.sin(a) * 0.5 * u); g2.lineTo(rx + Math.cos(a) * 0.5 * u, ry + Math.sin(a) * 0.5 * u); g2.stroke(); }
      });
      // the meter, the needle where the card's needle is
      const mx = cx + 1.2 * u, my = cy - 2.1 * u, mw = 5.6 * u, mh = 3.4 * u;
      g2.fillStyle = '#f3e6c4'; roundRect(g2, mx, my, mw, mh, u * 0.2); g2.fill();
      const px = mx + mw / 2, py = my + mh * 1.3, R = mh * 1.15;
      g2.strokeStyle = '#2a2d31'; g2.lineWidth = u * 0.05; g2.beginPath(); g2.arc(px, py, R * 0.8, -Math.PI / 2 + angleOfDb(-20), -Math.PI / 2 + angleOfDb(0)); g2.stroke();
      g2.strokeStyle = '#d6261c'; g2.lineWidth = u * 0.1; g2.beginPath(); g2.arc(px, py, R * 0.8, -Math.PI / 2 + angleOfDb(0), -Math.PI / 2 + angleOfDb(3)); g2.stroke();
      const a = (vu ? vu.deg : -44) * Math.PI / 180;
      g2.save(); g2.beginPath(); g2.rect(mx, my, mw, mh); g2.clip();
      g2.strokeStyle = '#141517'; g2.lineWidth = u * 0.06; g2.beginPath(); g2.moveTo(px, py); g2.lineTo(px + Math.sin(a) * R, py - Math.cos(a) * R); g2.stroke(); g2.restore();
      // ten level lamps over the window, from the 64 bands
      for (let i = 0; i < 10; i++) {
        let v = 0; if (live && A && A.v64) for (let k = 0; k < 6; k++) v = Math.max(v, A.v64[Math.min(63, i * 6 + k)]);
        const on = v > 0.12 + i * 0.015;
        g2.fillStyle = on ? (i > 7 ? '#ff3b2f' : i > 5 ? '#ffb02e' : '#57e36b') : '#4a4e53';
        g2.beginPath(); g2.arc(cx - 6.4 * u + i * 0.66 * u, cy - 2.7 * u, u * 0.17, 0, Math.PI * 2); g2.fill();
      }
    }
    Z.stop = function () { Z.running = false; cancelAnimationFrame(Z.raf); window.removeEventListener('resize', Z.size); };
    Z.size();
    window.addEventListener('resize', Z.size);
    Z.raf = requestAnimationFrame(frame);
    return Z;
  }

  /* ---- the visualiser module (issue #247): site/vis/tapedeck.js, the same face the game projects, draws the hidden mode here.
     a file URL cannot import it; then the canvas's own close-up above stands in ---- */
  let visMod = null, vis = null, visFreq = null, visTime = null;
  function loadVis() {
    if (visMod) { makeVis(); return; }
    let url = null; try { url = new URL('vis/tapedeck.js', document.baseURI).href; } catch (e) { return; }
    if (location.protocol === 'file:') return;
    import(url).then(function (m) { visMod = m; if (viz) makeVis(); }, function () {});
  }
  function makeVis() {
    if (vis) vis.destroy();
    vis = visMod.create({ background: false, accent: token('--orange') || '#ff5b1a' });
    if (viz) vis.resize(viz.w, viz.h);
    if (S && S.current && S.bySlug[S.current]) vis.setTrack(S.bySlug[S.current]);
  }
  // the analyser's numbers as the bytes an AnalyserNode would give (the module takes what the game takes)
  function visFrame(g, w, hh, live, now) {
    if (!visFreq) { visFreq = new Uint8Array(64); visTime = new Uint8Array(256); }
    if (live && A && A.v64) {
      for (let i = 0; i < 64; i++) visFreq[i] = Math.max(0, Math.min(255, Math.round(A.v64[i] * 255)));
      const sm = A.samples(256);
      for (let i = 0; i < 256; i++) visTime[i] = Math.max(0, Math.min(255, 128 + Math.round(sm[i] * 127)));
    } else { visFreq.fill(0); visTime.fill(0); }
    vis.draw(g, visFreq, visTime, now / 1000);
  }

  /* ---- the artwork for the media session (4.2): the player face-on ---- */
  TH.artwork = function () {
    try {
      const cv = document.createElement('canvas'); cv.width = 512; cv.height = 512;
      const g = cv.getContext('2d');
      g.fillStyle = '#d6d0c2'; g.fillRect(0, 0, 512, 512);
      ['#c9cdd1', '#c9cdd1', '#c9cdd1', '#c9cdd1', '#c9cdd1', '#ff5b1a'].forEach(function (c, i) { g.fillStyle = '#17191b'; g.fillRect(64 + i * 66, 96, 58, 40); g.fillStyle = c; g.fillRect(64 + i * 66, 88, 58, 36); });
      g.fillStyle = '#26292d'; roundRect(g, 40, 120, 432, 300, 28); g.fill();
      const pl = g.createLinearGradient(0, 140, 0, 400); pl.addColorStop(0, '#e1e4e6'); pl.addColorStop(1, '#b3b8bd');
      g.fillStyle = pl; roundRect(g, 58, 138, 396, 264, 16); g.fill();
      g.fillStyle = '#ff5b1a'; g.fillRect(58, 376, 396, 10);
      g.fillStyle = '#1a1c1f'; roundRect(g, 80, 166, 200, 150, 10); g.fill();
      g.fillStyle = '#f1e8d3'; g.beginPath(); g.arc(135, 245, 26, 0, Math.PI * 2); g.fill(); g.beginPath(); g.arc(225, 245, 26, 0, Math.PI * 2); g.fill();
      g.fillStyle = '#f3e6c4'; roundRect(g, 300, 166, 136, 84, 6); g.fill();
      g.strokeStyle = '#141517'; g.lineWidth = 3; g.beginPath(); g.moveTo(368, 266); g.lineTo(350, 180); g.stroke();
      g.fillStyle = '#26292d'; g.font = '26px Michroma, sans-serif'; g.textBaseline = 'top'; g.fillText('NOBODY FM', 40, 444);
      return cv.toDataURL('image/png');
    } catch (e) { return null; }
  };

  /* ---- what a report can read (12.0) ---- */
  TH.widget = function () { return cassette ? { kind: 'cassette', host: cassette.host } : null; };
  TH.state = function () {
    return { widget: 'cassette', reels: playingNow() ? 'turning' : 'still', label: cassette ? cassette.titleText : '',
      side: cassette ? cassette.svg.querySelector('.side').textContent : '', sub: cassette ? cassette.svg.querySelector('.sub').textContent : '',
      jcard: jcard ? { spine: jcard.spineText, cover: coverState, href: jcard.cover.getAttribute('href') || null } : null, cover: coverWant, tape: tape,
      needle: vu ? +vu.pos.toFixed(1) : null, counter: counter ? counter.value : null, cells: cells ? +cells.charge.toFixed(3) : null,
      story: story ? { slug: story.slug, looking: !!(inspecting && inspecting !== S.current), tab: storyTab, core: hasCoreStory() } : null,
      order: runOrder ? { mine: [].map.call(runOrder.a.querySelectorAll('.td-qline'), function (l) { return l.dataset.slug; }), rotation: [].map.call(runOrder.b.querySelectorAll('.td-qline'), function (l) { return l.dataset.slug; }) } : null,
      viz: viz ? { running: viz.running, frames: viz.frames, ms: +viz.ms.toFixed(1), scale: viz.scale } : null, vis: vis ? 'module' : (visMod ? 'loaded' : 'canvas') };
  };
  return TH;
})();
