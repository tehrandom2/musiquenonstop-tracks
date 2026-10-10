/* nobody fm, theme "phosphor": the green CRT of the first build, moved into a theme module (design 12.0).
   the typed-cell analyser, the glyph scope, the barrel, the scanlines, the noise, the flicker, the power line,
   the ASCII banner, the text progress bar and dial, the ASCII tower for dead air. nothing here changes what the
   station does; it draws what the station tells it. nobody who built this can hear. */
window.NOBODY = window.NOBODY || {};
NOBODY.themes = NOBODY.themes || {};
NOBODY.themes.phosphor = (function () {
  const TH = { name: 'phosphor', blurb: 'green phosphor on curved glass. the first build.' };
  const reduced = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  let ctx = null, V = null, A = null, glass = null, power = null;
  let timers = [], overlays = [], defs = null;
  let tower = null; // the three.js ASCII tower for dead air (5.6)

  const BANNER = [
    '#   #  ###  ####   ###  ####  #   #    ##### #   #',
    '##  # #   # #   # #   # #   #  # #     #     ## ##',
    '# # # #   # ####  #   # #   #   #      ####  # # #',
    '#  ## #   # #   # #   # #   #   #      #     #   #',
    '#   #  ###  ####   ###  ####    #      #     #   #'
  ].join('\n');
  const BANNER_PHONE = [
    '#   #  ###  ####   ###  ####  #   #',
    '##  # #   # #   # #   # #   #  # # ',
    '# # # #   # ####  #   # #   #   #  ',
    '#  ## #   # #   # #   # #   #   #  ',
    '#   #  ###  ####   ###  ####    #  ',
    '                FM   88.8          '
  ].join('\n');
  const TOWER_STATIC = [
    '           .:+#=.           ',
    '           |:+#=|           ',
    '       :---+=##+---:        ',
    '      =:  |:+#=|  :=        ',
    '  .:=#=====+=##+=====#=:.   ',
    '  |::::::::::::::::::::|    ',
    '  |:+:+:+:+:+:+:+:+:+:+|    ',
    '  |::::::::::::::::::::|    ',
    '  |:+:+:+:+:+:+:+:+:+:+|    ',
    '  |::::::::::::::::::::|    ',
    '  |:+:+:+:+:+:+:+:+:+:+|    ',
    '__|::::::::::::::::::::|___ '
  ].join('\n');

  /* ---- strings (12.0): the boot's flavour lines, the wait line, the footer's last words ---- */
  TH.strings = {
    boot: function (n, voices, phone, localOnly, backend) {
      const vtxt = voices === 1 ? '1 with a voice' : voices + ' with a voice';
      const ttxt = n === 1 ? '1 track' : n + ' tracks';
      if (phone) return [
        ['NOBODY BIOS 1.0', ''], ['memory ...... ', '640K ok'], ['phosphor .... ', 'green'], ['transmitter . ', 'rooftop, withheld'],
        ['aerial ...... ', 'found'], ['catalogue ... ', ttxt + ', ' + voices + ' voice'], ['backend ..... ', localOnly ? 'not on the wire' : 'on the wire'], ['audio ....... ', 'waiting for a human', 'amber']
      ];
      return [
        ['NOBODY BIOS 1.0  (c) nobody', ''], ['memory test ........ ', '640K ok'], ['phosphor ........... ', 'green (amber in stock)'],
        ['transmitter ........ ', 'rooftop, location withheld'], ['aerial ............. ', 'found'],
        ['catalogue .......... tracks/index.json .... ', ttxt + ', ' + vtxt], ['backend ............ ', localOnly ? 'not on the wire (local mode)' : backend],
        ['audio .............. ', 'waiting for a human', 'amber']
      ];
    },
    wait: function (phone) { return phone ? '[ tap the glass to go on air ]' : '[ press any key, or tap the glass, to go on air ]'; },
    tagline: 'the transmitter nobody can find.',
    licence: 'nobody fm. every track generated locally from a text prompt. no samples, no reference audio, no third-party rights claimed. best viewed on a curved glass screen at 80x25.',
    switched: 'phosphor: green on black. the glass curves again.',
    idle: 'idle. paused for ten minutes. the tower turns anyway.'
  };

  /* ---- lifecycle ---- */
  TH.init = function (c) {
    ctx = c; V = c.V; A = c.A; glass = c.glass; power = c.power;
    // the SVG filters (barrel, phosphor noise) and the overlays on the glass (scanlines, rolling bar, noise)
    defs = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    defs.setAttribute('class', 'defs'); defs.setAttribute('width', '0'); defs.setAttribute('height', '0'); defs.setAttribute('aria-hidden', 'true');
    defs.innerHTML = '<filter id="barrel" x="0" y="0" width="100%" height="100%" color-interpolation-filters="sRGB"><feImage id="barrelMap" href="" preserveAspectRatio="none" result="map"/><feDisplacementMap in="SourceGraphic" in2="map" scale="14" xChannelSelector="R" yChannelSelector="G"/></filter>' +
      '<filter id="phosphorNoise" x="0" y="0" width="100%" height="100%"><feTurbulence id="turb" type="fractalNoise" baseFrequency="0.9" numOctaves="2" seed="1" result="t"/><feColorMatrix in="t" type="saturate" values="0"/></filter>';
    document.body.insertBefore(defs, document.body.firstChild);
    ['scanlines', 'rollbar', 'noise'].forEach(function (cls) { const d = document.createElement('div'); d.className = cls; d.setAttribute('aria-hidden', 'true'); glass.appendChild(d); overlays.push(d); });
    el('towerStatic').textContent = TOWER_STATIC;
    barrel();
    ambient();
    el('licence').textContent = TH.strings.licence;
  };
  TH.dispose = function () {
    timers.forEach(clearInterval); timers = [];
    overlays.forEach(function (o) { o.remove(); }); overlays = [];
    if (defs) { defs.remove(); defs = null; }
    glass.classList.remove('barrel', 'dip', 'opening', 'closing');
    TH.towerStop();
    if (hideHost) { hideHost.remove(); hideHost = null; }
    if (tower && tower.renderer) { try { tower.renderer.dispose(); } catch (e) {} tower = null; el('tower').textContent = ''; }
    el('towerStatic').textContent = '';
  };
  TH.resize = function () {};
  function el(id) { return ctx.el[id] || document.getElementById(id); }

  /* ---- the barrel (3.2): a displacement map drawn on a canvas, kept if twelve frames stay under 50 ms ---- */
  function barrel() {
    const map = document.getElementById('barrelMap');
    if (!map) return;
    const N = 256, cv = document.createElement('canvas');
    cv.width = N; cv.height = N;
    const g = cv.getContext('2d'), img = g.createImageData(N, N), d = img.data;
    for (let y = 0; y < N; y++) for (let x = 0; x < N; x++) {
      const nx = (x / (N - 1)) * 2 - 1, ny = (y / (N - 1)) * 2 - 1, r2 = nx * nx + ny * ny;
      const i = (y * N + x) * 4;
      d[i] = Math.round(128 - 127 * nx * r2 * 0.9);
      d[i + 1] = Math.round(128 - 127 * ny * r2 * 0.9);
      d[i + 2] = 0; d[i + 3] = 255;
    }
    g.putImageData(img, 0, 0);
    map.setAttribute('href', cv.toDataURL('image/png'));
    const ua = navigator.userAgent;
    const safari = /Safari/.test(ua) && !/Chrome|Chromium|Edg/.test(ua);
    if (safari) return;
    glass.classList.add('barrel');
    let frames = 0, t0 = 0;
    function probe(t) {
      if (!t0) { t0 = t; }
      frames++;
      if (frames < 12) { requestAnimationFrame(probe); return; }
      const avg = (t - t0) / (frames - 1);
      if (avg > 50) { glass.classList.remove('barrel'); TH.barrelDropped = true; }
    }
    requestAnimationFrame(probe);
  }
  /* ---- phosphor noise seed stepping, the 1 in 400 dip ---- */
  function ambient() {
    if (reduced) return;
    const turb = document.getElementById('turb');
    let seed = 1;
    timers.push(setInterval(function () { seed = (seed + 1) % 1000; if (turb) turb.setAttribute('seed', String(seed)); }, 120));
    timers.push(setInterval(function () {
      if (Math.random() < 1 / 400) { glass.classList.add('dip'); setTimeout(function () { glass.classList.remove('dip'); }, 60); }
    }, 1000));
  }

  /* ---- transitions (12.0): the power line opens and closes the glass; the key blooms it ---- */
  TH.transition = function (from, to, info) {
    if (to === 'boot') {
      return new Promise(function (res) {
        power.classList.remove('fade'); power.classList.add('on');
        setTimeout(function () {
          glass.classList.add('opening');
          glass.classList.remove('off');
          power.classList.add('fade');
          setTimeout(function () { glass.classList.remove('opening'); power.classList.remove('on', 'fade'); res(); }, 360);
        }, 40);
      });
    }
    if (to === 'off') {
      return new Promise(function (res) {
        glass.classList.add('closing');
        setTimeout(function () {
          glass.classList.add('off'); glass.classList.remove('closing');
          power.classList.remove('fade'); power.classList.add('on');
          setTimeout(function () { power.classList.add('fade'); setTimeout(res, 250); }, 120);
        }, 360);
      });
    }
    if (to === 'air') { glass.classList.add('bloom-on'); setTimeout(function () { glass.classList.remove('bloom-on'); }, 300); }
    return Promise.resolve();
  };

  /* ---- widgets ---- */
  TH.stationName = function (button) { button.textContent = 'NOBODY FM'; };
  TH.banner = function (bannerEl, phone, scramble) {
    const text = phone ? BANNER_PHONE : BANNER;
    if (scramble) { bannerEl.textContent = V.scrambled(text); V.scramble(bannerEl, text, 900); }
    else bannerEl.textContent = text;
  };
  TH.progress = function (progressEl, hdrBarEl, c, d, phone, view, content) {
    const fmt = ctx.fmt;
    const timeTxt = phone ? fmt(c) + '/' + fmt(d) : fmt(c) + ' / ' + fmt(d);
    const w = Math.max(10, content - timeTxt.length - 2);
    const filled = d ? Math.round(c / d * w) : 0;
    progressEl.textContent = '';
    progressEl.appendChild(span('#'.repeat(filled)));
    progressEl.appendChild(span('.'.repeat(w - filled), 'trk'));
    progressEl.appendChild(span('  ' + timeTxt, 'mid'));
    if (view !== 'home') { const bw = 12, bf = d ? Math.round(c / d * bw) : 0; hdrBarEl.textContent = '#'.repeat(bf) + '.'.repeat(bw - bf); }
  };
  TH.progressHit = function (progressEl, x, content) { const r = progressEl.getBoundingClientRect(); return Math.max(0, Math.min(1, (x - r.left) / (r.width * (content - 14) / content))); };
  TH.dial = function (dialEl, f, locked, note, content) {
    const w = content - 10;
    let ticks = '';
    for (let i = 0; i < w; i++) ticks += (i % 5 === 4) ? '|' : '.';
    const pos = Math.round((f - 86) / (91.6 - 86) * (w - 1));
    dialEl.textContent = '86.0 ' + ticks + ' 91.6\n' + ' '.repeat(Math.max(0, 5 + pos)) + '^ ' + f.toFixed(1) + (note === 'static' ? '  static' : '');
  };
  TH.volume = function (volEl, v, muted, phone) {
    const bars = phone ? 5 : 10, per = 10 / bars, on = Math.round(v / per);
    volEl.textContent = 'vol ' + '#'.repeat(on) + '.'.repeat(bars - on) + (muted ? ' m' : '');
    return {
      hit: function (x, y) {
        const r = volEl.getBoundingClientRect(), chars = volEl.textContent.length, ch = r.width / chars, idx = Math.floor((x - r.left) / ch) - 4;
        if (idx >= 0 && idx < bars) return Math.round((idx + 1) * 10 / bars);
        return 0;
      }
    };
  };
  function span(text, cls) { const s = document.createElement('span'); if (cls) s.className = cls; s.textContent = text; return s; }

  /* ---- the ASCII tower (5.6) for dead air: three.js through AsciiEffect, the static drawing without the CDN ---- */
  function buildTower(host, phone) {
    const L = ctx.libs(); if (!L || !L.THREE || !L.AsciiEffect) return false;
    const THREE = L.THREE;
    const w = Math.max(80, host.clientWidth), h = Math.max(60, host.clientHeight);
    const renderer = new THREE.WebGLRenderer({ antialias: false, alpha: false, powerPreference: 'low-power' });
    renderer.setSize(w, h);
    renderer.setClearColor(0x000000);
    const effect = new L.AsciiEffect(renderer, ' .:-=+*#%@', { invert: true, resolution: phone ? 0.08 : 0.12 });
    effect.setSize(w, h);
    effect.domElement.className = 'tower-ascii';
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(42, w / h, 0.1, 100);
    camera.position.set(0, 1.2, 4.6);
    camera.lookAt(0, 1.0, 0);
    const rig = new THREE.Group();
    const block = new THREE.Mesh(new THREE.BoxGeometry(1, 3, 1), new THREE.MeshPhongMaterial({ color: 0x777777 }));
    rig.add(block);
    rig.add(new THREE.LineSegments(new THREE.EdgesGeometry(block.geometry), new THREE.LineBasicMaterial({ color: 0xffffff })));
    const mast = new THREE.Mesh(new THREE.CylinderGeometry(0.03, 0.03, 1.4, 6), new THREE.MeshPhongMaterial({ color: 0xffffff }));
    mast.position.y = 1.5 + 0.7;
    rig.add(mast);
    for (let i = 0; i < 3; i++) {
      const bar = new THREE.Mesh(new THREE.BoxGeometry(0.5 - i * 0.12, 0.03, 0.03), new THREE.MeshPhongMaterial({ color: 0xffffff }));
      bar.position.y = 2.1 + i * 0.3;
      rig.add(bar);
    }
    for (let f = -1.1; f <= 1.1; f += 0.55) {
      for (const x of [-0.3, 0.3]) {
        const win = new THREE.Mesh(new THREE.PlaneGeometry(0.22, 0.22), new THREE.MeshBasicMaterial({ color: 0xaaaaaa }));
        win.position.set(x, f, 0.505);
        rig.add(win);
      }
    }
    rig.position.y = 0.6;
    scene.add(rig);
    const light = new THREE.PointLight(0xffffff, 60, 0, 2);
    light.position.set(3, 4, 4);
    scene.add(light);
    scene.add(new THREE.AmbientLight(0xffffff, 0.15));
    host.replaceChildren(effect.domElement);
    // one renderer at a time: moving the tower between hosts (dead air, the hidden mode) must not leak a GL context
    if (tower) { if (tower.raf) cancelAnimationFrame(tower.raf); try { tower.renderer.dispose(); tower.renderer.forceContextLoss(); } catch (e) {} }
    tower = { renderer: renderer, effect: effect, scene: scene, camera: camera, rig: rig, host: host, raf: 0, last: 0 };
    return true;
  }
  function towerFrame(t) {
    if (!tower) return;
    tower.raf = requestAnimationFrame(towerFrame);
    const dt = tower.last ? Math.min(0.1, (t - tower.last) / 1000) : 0;
    tower.last = t;
    tower.rig.rotation.y += 0.15 * dt;
    tower.effect.render(tower.scene, tower.camera);
  }
  TH.towerStart = function (hostEl, staticEl, phone) {
    staticEl.textContent = TOWER_STATIC;
    staticEl.hidden = false;
    try {
      if (!tower || tower.host !== hostEl) { if (!buildTower(hostEl, phone)) return 'static'; }
      tower.last = 0;
      if (!tower.raf) tower.raf = requestAnimationFrame(towerFrame);
      staticEl.hidden = true;
      return 'ascii';
    } catch (e) { return 'static'; }
  };
  TH.towerStop = function () {
    // the hidden mode's tower is the picture while the interface is away: dead air ending does not stop it (issue #52)
    if (hideHost && tower && tower.host === hideHost.querySelector('.tower') && document.body.classList.contains('ui-hidden')) return;
    if (tower && tower.raf) { cancelAnimationFrame(tower.raf); tower.raf = 0; }
  };
  TH.towerState = function () { return tower && tower.raf ? 'three.js AsciiEffect rendering' : 'static ASCII drawing'; };
  /* ---- hidden mode (12.0, issue #52): the glass keeps its scanlines and rolling bar; nothing else on it moves, so the dead-air tower
     is mounted behind them for as long as the interface is away, and handed back to dead air (if it is on) when it returns ---- */
  let hideHost = null;
  TH.hidden = function (on) {
    if (on) {
      if (!hideHost) {
        hideHost = document.createElement('div'); hideHost.className = 'tower-wrap hide-tower'; hideHost.setAttribute('aria-hidden', 'true');
        const t = document.createElement('div'); t.className = 'tower';
        const p = document.createElement('pre'); p.className = 'tower-static';
        hideHost.appendChild(t); hideHost.appendChild(p);
        glass.insertBefore(hideHost, glass.firstChild);
      }
      TH.towerStart(hideHost.querySelector('.tower'), hideHost.querySelector('.tower-static'), ctx.phone());
    } else {
      TH.towerStop();
      if (ctx.wantsTower()) TH.towerStart(el('tower'), el('towerStatic'), ctx.phone());
    }
  };
  // the libraries may arrive after dead air began
  TH.libsReady = function () { if (ctx && ctx.wantsTower()) TH.towerStart(el('tower'), el('towerStatic'), ctx.phone()); };

  /* ---- the analyser as typed cells (5.2) and the glyph scope (5.3) ---- */
  function colours() {
    const cs = getComputedStyle(document.documentElement);
    return { p1: cs.getPropertyValue('--p1').trim(), mid: cs.getPropertyValue('--p1-mid').trim(), dim: cs.getPropertyValue('--p1-dim').trim(), rgb: cs.getPropertyValue('--p1-rgb').trim() };
  }
  function cellSetup() {
    const ctx2 = A.ctx2d, fs = V.fontPx();
    ctx2.font = fs + 'px "VT323", monospace';
    ctx2.textBaseline = 'middle';
    A.cell.w = ctx2.measureText('0').width || fs * 0.44;
    A.cell.h = V.rowPx();
    A.totalCols = Math.floor(A.W / A.cell.w);
  }
  TH.frame = function (A_, S, now) {
    if (!A.ctx2d) return;
    cellSetup();
    const c = colours(), g = A.ctx2d, W = A.W, H = A.rows * A.cell.h;
    g.clearRect(0, 0, W, H);
    const phone = V.phone();
    const labelCols = phone ? 10 : 24;
    const areaCols = Math.max(A.bands, A.totalCols - 2 - labelCols);
    const per = Math.max(1, Math.floor(areaCols / A.bands));
    const drawn = per > 1 ? per - 1 : 1;
    g.shadowColor = 'rgb(' + c.rgb.replace(/ /g, ',') + ',0.6)';
    g.shadowBlur = 0; g.fillStyle = c.dim;
    for (let r = 0; r < A.rows; r++) g.fillText('|', 0, r * A.cell.h + A.cell.h / 2);
    if (A.mode === 'scope5') { drawScope5(g, c, areaCols); return; }
    g.shadowBlur = 8;
    for (let b = 0; b < A.bands; b++) {
      const v = A.vals[b];
      let cells = Math.min(A.rows, Math.floor(Math.pow(v, 0.8) * (A.rows + 0.99)));
      if (cells > A.peaks[b]) { A.peaks[b] = cells; A.peakAt[b] = now; }
      else if (now - A.peakAt[b] > 150 && A.peaks[b] > 0) { A.peaks[b]--; A.peakAt[b] = now; }
      const x0 = (2 + b * per) * A.cell.w;
      g.fillStyle = c.p1;
      for (let r = 0; r < cells; r++) {
        const row = A.flip ? r : A.rows - 1 - r;
        for (let k = 0; k < drawn; k++) g.fillText('|', x0 + k * A.cell.w, row * A.cell.h + A.cell.h / 2);
      }
      const pk = A.peaks[b];
      if (pk > cells && pk <= A.rows) {
        const row = A.flip ? pk - 1 : A.rows - pk;
        g.fillStyle = c.mid; g.shadowBlur = 0;
        g.fillText('.', x0, row * A.cell.h + A.cell.h / 2);
        g.shadowBlur = 8;
      }
    }
    A.baselineText(A.live);
    scopeText();
  };
  function scopeText() {
    const scope = el('scope'); if (!scope) return;
    const cols = V.cols();
    const n = Math.max(8, cols - 8);
    const s = A.samples(n);
    const glyphs = ['_', '-', '~', '^', "'"];
    let line = '';
    for (let i = 0; i < n; i++) line += glyphs[Math.max(0, Math.min(4, Math.floor((s[i] + 1) / 2 * 5)))];
    scope.textContent = line + ' scope';
  }
  function drawScope5(g, c, areaCols) {
    const n = areaCols, s = A.samples(n);
    const glyphs = ['_', '-', '~', '^', "'"];
    g.fillStyle = c.p1; g.shadowBlur = 8;
    let prev = -1;
    for (let i = 0; i < n; i++) {
      const pos = (s[i] + 1) / 2 * (A.rows - 0.001);
      const row = A.rows - 1 - Math.floor(pos);
      const sub = Math.floor((pos % 1) * 5);
      const x = (2 + i) * A.cell.w;
      if (prev >= 0 && Math.abs(prev - row) > 1) {
        const a = Math.min(prev, row), b = Math.max(prev, row);
        for (let r = a + 1; r < b; r++) g.fillText('|', x, r * A.cell.h + A.cell.h / 2);
      }
      g.fillText(glyphs[sub], x, row * A.cell.h + A.cell.h / 2);
      prev = row;
    }
    A.baselineText(true);
    const scope = el('scope'); if (scope) scope.textContent = ' '.repeat(Math.max(0, V.cols() - 8)) + ' scope';
  }
  TH.scopeRows = function (phone) { return A.mode === 'scope5' ? 5 : (phone ? 4 : 5); };

  /* ---- the banner as a 512 px PNG for the media session artwork (4.2) ---- */
  TH.artwork = function () {
    try {
      const cv = document.createElement('canvas'); cv.width = 512; cv.height = 512;
      const g = cv.getContext('2d');
      g.fillStyle = '#050705'; g.fillRect(0, 0, 512, 512);
      g.fillStyle = '#41FF6A'; g.font = '22px "VT323", monospace'; g.textBaseline = 'top';
      g.shadowColor = 'rgba(65,255,106,.6)'; g.shadowBlur = 8;
      BANNER.split('\n').forEach(function (l, i) { g.fillText(l, 24, 180 + i * 26); });
      g.font = '28px "VT323", monospace';
      g.fillText('nobody fm   88.8', 24, 360);
      return cv.toDataURL('image/png');
    } catch (e) { return null; }
  };
  TH.catalogue = function () {}; TH.playing = function () {}; TH.scheme = function () {};
  // the widget slot (12.0, issue #28): the CRT mounts nothing in the transmitter card; the text progress bar is the bar
  TH.widget = function () { return null; };
  TH.state = function () { return { widget: null, barrel: glass && glass.classList.contains('barrel'), tower: TH.towerState() }; };
  return TH;
})();
