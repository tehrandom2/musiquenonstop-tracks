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
  let viz = null, cassette = null, towerCassette = null, scopeCanvas = null, scopeCtx = null, dialStrip = null, knob = null, chipWatch = null;
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
    if (cassette) { cassette.host.remove(); cassette = null; }
    if (towerCassette) { towerCassette.host.remove(); towerCassette = null; }
    if (chipWatch) { chipWatch.disconnect(); chipWatch = null; }
    document.body.classList.remove('is-playing');
    el('scope').textContent = ''; scopeCanvas = null; scopeCtx = null;
    el('progress').textContent = ''; el('hdrBar').className = 'dim'; el('hdrBar').textContent = '............';
    el('dial').textContent = ''; dialStrip = null; knob = null; el('vol').textContent = '';
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
    if (to === 'dead') { if (cassette) { cassette.host.hidden = true; cassette.label('no tape', 'nothing on the shelf', 'SIDE A'); } }
    else if (cassette && from === 'dead') cassette.host.hidden = false;
    if (to === 'playing' || ((to === 'home' || to === 'page' || to === 'guestbook') && info.slug)) { if (cassette) cassette.host.hidden = false; TH.playing(info.slug || S.current); }
    return Promise.resolve();
  };

  // a compositor fade can freeze when the page is driven by a virtual clock (the harness) and leave the glass half in; once
  // the fade's time has passed the end state is set by hand, with the transition off for a beat so it applies at once
  function settle() { glass.style.transition = 'none'; void glass.offsetWidth; /* a style flush, or the two edits collapse into none */ setTimeout(function () { glass.style.transition = ''; }, 50); }

  /* ---- the cassette (12.14): an SVG, reels that turn, tape that moves hub to hub, a hand-lettered label ---- */
  function svgEl(name, attrs) { const e = document.createElementNS('http://www.w3.org/2000/svg', name); for (const k in attrs) e.setAttribute(k, attrs[k]); return e; }
  function makeCassette() {
    const id = 'tape' + (++uid);
    const host = document.createElement('div'); host.className = 'tx-widget cassette'; host.setAttribute('aria-hidden', 'true');
    const svg = svgEl('svg', { viewBox: '0 0 420 270', role: 'img' });
    svg.innerHTML =
      '<defs><clipPath id="' + id + '-well"><rect x="134" y="198" width="152" height="36" rx="18"/></clipPath>' +
      '<linearGradient id="' + id + '-shine" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#fff" stop-opacity=".16"/><stop offset=".5" stop-color="#fff" stop-opacity="0"/><stop offset="1" stop-color="#000" stop-opacity=".3"/></linearGradient></defs>' +
      '<rect class="shell" x="6" y="6" width="408" height="258" rx="18"/>' +
      '<rect x="6" y="6" width="408" height="258" rx="18" fill="url(#' + id + '-shine)"/>' +
      '<g class="screw"><circle cx="24" cy="24" r="5"/><circle cx="396" cy="24" r="5"/><circle cx="24" cy="246" r="5"/><circle cx="396" cy="246" r="5"/></g>' +
      '<rect class="paper" x="34" y="30" width="352" height="128" rx="8"/>' +
      '<rect class="art" x="40" y="36" width="116" height="116" rx="4"/><rect class="art-stripe" x="40" y="118" width="116" height="10"/><rect x="92" y="52" width="14" height="66" fill="#fff" fill-opacity=".28"/><rect x="52" y="80" width="26" height="38" fill="#000" fill-opacity=".25"/>' +
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
      host: host, svg: svg, titleText: 'nothing loaded',
      // the marker face is wide: 17 characters fill the label; a longer title is cut with an ellipsis and shrinks a step
      label: function (t, s, sd) { this.titleText = t; title.textContent = t.length > 17 ? t.slice(0, 16) + '...' : t; title.setAttribute('font-size', t.length > 12 ? '20' : '24'); sub.textContent = (s || '').slice(0, 34); side.textContent = sd; },
      tape: function (f) { f = Math.max(0, Math.min(1, f || 0)); tl.setAttribute('r', (16 + 18 * (1 - f)).toFixed(1)); tr.setAttribute('r', (16 + 18 * f).toFixed(1)); }
    };
  }
  function reel(cx, cy) {
    return '<g class="reel"><circle class="hub" cx="' + cx + '" cy="' + cy + '" r="15"/><g class="spoke"><line x1="' + cx + '" y1="' + (cy - 13) + '" x2="' + cx + '" y2="' + (cy + 13) + '"/><line x1="' + (cx - 13) + '" y1="' + cy + '" x2="' + (cx + 13) + '" y2="' + cy + '"/><line x1="' + (cx - 9) + '" y1="' + (cy - 9) + '" x2="' + (cx + 9) + '" y2="' + (cy + 9) + '"/><line x1="' + (cx + 9) + '" y1="' + (cy - 9) + '" x2="' + (cx - 9) + '" y2="' + (cy + 9) + '"/></g><circle class="axle" cx="' + cx + '" cy="' + cy + '" r="4"/></g>';
  }
  function sideName() { return document.documentElement.dataset.phosphor === 'amber' ? 'SIDE B' : 'SIDE A'; }
  // the label is the track's: the title in the marker face, bpm and key under it, the side and the number above
  TH.playing = function (slug) {
    if (!cassette || !slug) return;
    const t = S.bySlug && S.bySlug[slug];
    if (!t) return;
    const num = S.num && S.num[slug] ? String(S.num[slug]).padStart(2, '0') : '--';
    cassette.label(titleOf(t.title || slug), (t.bpm ? t.bpm + ' bpm' : '') + (t.key ? '  ' + t.key : '') + (t.model ? '  ' + t.model : ''), sideName() + ' - ' + num);
  };
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
  // the volume is a knob (12.14): ten ticks around it, a cream pointer; a click by angle sets it, the centre mutes
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
    const text = document.createElement('span'); text.className = 'vol-text'; host.appendChild(text);
    return {
      set: function (v, muted) {
        const a = angleOf(v);
        pointer.setAttribute('x2', (50 + Math.cos(a) * 28).toFixed(1)); pointer.setAttribute('y2', (50 + Math.sin(a) * 28).toFixed(1));
        ticks.forEach(function (t, i) { t.classList.toggle('lit', i < v); });
        text.textContent = muted ? 'vol m' : 'vol ' + v;
        host.classList.toggle('muted', !!muted);
      },
      hit: function (x, y) {
        const r = svg.getBoundingClientRect(), px = (x - r.left) / r.width * 100, py = (y - r.top) / r.height * 100;
        if (px < -5 || px > 105) return 0;
        const dx = px - 50, dy = py - 50, d = Math.hypot(dx, dy);
        if (d < 14 || d > 56) return 0;
        let k = (Math.atan2(dy, dx) - angleOf(0)) / (angleOf(10) - angleOf(0));
        if (k < 0) k += 2 * Math.PI / (angleOf(10) - angleOf(0));
        return Math.max(1, Math.min(10, Math.ceil(k * 10)));
      }
    };
  }
  function angleOf(v) { return Math.PI * 0.75 + v / 10 * Math.PI * 1.5; }
  TH.volume = function (volEl, v, muted) {
    if (!knob || !volEl.querySelector('svg')) knob = makeKnob(volEl);
    knob.set(v, muted);
    return { hit: function (x, y) { return knob.hit(x, y); } };
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
      viz: viz ? { running: viz.running, frames: viz.frames, ms: +viz.ms.toFixed(1), scale: viz.scale } : null };
  };
  return TH;
})();
