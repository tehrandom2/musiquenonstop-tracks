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
    [art.np, art.page, art.hero].forEach(function (b) { if (b) b.host.remove(); });
    const ro = el('readout'); if (ro) { ro.classList.remove('has-art'); ro.style.removeProperty('--art-w'); ro.style.removeProperty('--art-h'); }
    art.np = art.page = art.hero = null; art.slug = art.pageSlug = art.url = null; art.state = 'none';
    document.querySelectorAll('#log .art-print').forEach(function (n) { n.remove(); });
  };
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
    // the twelve frames are read once the glass has opened and the tube has warmed (issue #54): a one-off animation is not the machine
    timers.push(setTimeout(function () { requestAnimationFrame(probe); }, 1200));
  }
  /* ---- phosphor noise seed stepping, the 1 in 400 dip; the afterglow and the frame clock (issue #54) start here too ---- */
  function ambient() {
    clock.frames = 0; clock.last = 0; clock.ms = 0;
    // the sheen on the glass, a still layer after it in the body (not inside the barrel filter); removed with the overlays at dispose
    const sheen = document.createElement('div'); sheen.className = 'sheen'; sheen.setAttribute('aria-hidden', 'true');
    glass.parentNode.insertBefore(sheen, glass.nextSibling); overlays.push(sheen);
    afterglow();
    if (reduced) return;
    const turb = document.getElementById('turb');
    let seed = 1;
    timers.push(setInterval(function () { seed = (seed + 1) % 1000; if (turb) turb.setAttribute('seed', String(seed)); }, 120));
    timers.push(setInterval(function () {
      if (Math.random() < 1 / 400) { glass.classList.add('dip'); setTimeout(function () { glass.classList.remove('dip'); }, 60); }
    }, 1000));
  }

  /* ---- the switch sound (issue #103): a quiet tune-in. a narrow band of static slides down as a whistle beats down to
     nothing, and a faint tone says the station is found ---- */
  TH.transitionSound = function (seconds) {
    return NOBODY.synth.sound(seconds, function (c, out, t0, dur, k) {
      const bp = c.createBiquadFilter(); bp.type = 'bandpass'; bp.Q.value = 1.4;
      bp.frequency.setValueAtTime(1100, t0); bp.frequency.exponentialRampToValueAtTime(500, t0 + dur * 0.75);
      const lp = c.createBiquadFilter(); lp.type = 'lowpass'; lp.frequency.value = 1800;
      const ng = c.createGain(); k.env(ng.gain, [[0, 0], [0.3, 0.022], [0.7, 0.016], [1.05, 0.003], [dur, 0.002]]);
      k.noise().connect(bp); bp.connect(lp); lp.connect(ng); ng.connect(out);
      const wh = k.osc('sine'); wh.frequency.setValueAtTime(520, t0); wh.frequency.exponentialRampToValueAtTime(70, t0 + 1.05);
      const wg = c.createGain(); k.env(wg.gain, [[0, 0], [0.3, 0.01], [0.85, 0.005], [1.1, 0]]);
      wh.connect(wg); wg.connect(out);
      const lock = k.osc('sine'); lock.frequency.value = 660;
      const lg = c.createGain(); k.env(lg.gain, [[0, 0], [0.92, 0], [1.0, 0.006], [dur, 0.004]]);
      lock.connect(lg); lg.connect(out);
    });
  };

  /* ---- transitions (12.0): the power line opens and closes the glass; the key blooms it ---- */
  TH.transition = function (from, to, info) {
    // the track page is built after this call; the dithered cover goes in once it is there (issue #88)
    if (to === 'page') setTimeout(mountPage, 0);
    if (to === 'playing' && info && info.slug) mountNp(info.slug);
    if (to === 'boot') {
      return new Promise(function (res) {
        power.classList.remove('fade'); power.classList.add('on');
        setTimeout(function () {
          glass.classList.add('opening');
          glass.classList.remove('off');
          power.classList.add('fade');
          // the tube warms up (issue #54): a hot bloom at the centre and a degauss wobble, taken off by the clock, never left to a frozen animation
          if (!reduced) { glass.classList.add('warm'); setTimeout(function () { glass.classList.remove('warm'); }, 800); }
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
  // the volume is the shared fader (volume.js, 12.0 controls), drawn in this theme's tokens; nothing decorates it here
  TH.volume = function () {};
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
    tick(now);
    cellSetup();
    const c = colours(), g = A.ctx2d, W = A.W, H = A.rows * A.cell.h;
    // persistence (issue #54): the last frame is not wiped but thinned to 45 %, so a falling bar leaves a two-frame trail on the glass
    if (reduced) g.clearRect(0, 0, g.canvas.width, g.canvas.height);
    else { g.shadowBlur = 0; g.globalCompositeOperation = 'destination-out'; g.fillStyle = 'rgb(0 0 0 / .55)'; g.fillRect(0, 0, g.canvas.width, g.canvas.height); g.globalCompositeOperation = 'source-over'; }
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
    // the line plus " scope" fills the band's content: 96 columns on desktop, 38 on the phone (the band pads 2ch and 1ch, issue #54)
    const cols = V.cols();
    const n = Math.max(8, cols - (V.phone() ? 8 : 10));
    const s = A.samples(n), gn = autoGain(s);
    const glyphs = ['_', '-', '~', '^', "'"];
    let line = '';
    for (let i = 0; i < n; i++) line += glyphs[Math.max(0, Math.min(4, Math.floor((s[i] * gn + 1) / 2 * 5)))];
    setScope(scope, line, ' scope');
  }
  // the scope line and, under it, its afterimage from two frames ago (issue #54). the station never writes into #scope; the theme does,
  // so the two children are the theme's and are rebuilt if anything else emptied the element.
  const scopeRing = ['', '', ''];
  function setScope(scope, line, label) {
    let live = scope.firstChild, ghost = scope.lastChild;
    if (!live || !live.classList || !live.classList.contains('scope-line')) {
      scope.textContent = '';
      live = span('', 'scope-line'); ghost = document.createElement('pre'); ghost.className = 'scope-ghost'; ghost.setAttribute('aria-hidden', 'true');
      scope.appendChild(live); scope.appendChild(ghost);
    }
    live.textContent = line + label;
    if (!reduced) { ghost.textContent = scopeRing[0]; scopeRing.shift(); scopeRing.push(line); }
  }
  // the scope's gain follows the wave's peak (issue #88, the polish pass): a quiet track drew one row of the middle glyph, a wall of
  // tildes; now it fills the five glyphs the way the tape deck's line fills its canvas. a picture of the numbers, never a level
  let gainHold = 1;
  function autoGain(s) {
    let m = 0; for (let i = 0; i < s.length; i++) m = Math.max(m, Math.abs(s[i]));
    const want = m > 0.02 ? Math.min(8, 0.9 / m) : gainHold;
    gainHold += (want - gainHold) * 0.15;
    return gainHold;
  }
  function drawScope5(g, c, areaCols) {
    const n = areaCols, raw = A.samples(n), gn = autoGain(raw), s = raw.map(function (v) { return Math.max(-1, Math.min(1, v * gn)); });
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
    const scope = el('scope'); if (scope) setScope(scope, ' '.repeat(Math.max(0, V.cols() - (V.phone() ? 8 : 10))), ' scope');
  }
  TH.scopeRows = function (phone) { return A.mode === 'scope5' ? 5 : (phone ? 4 : 5); };

  /* ---- the frame clock (issue #54): what the harness reads for the city, read here from the station's own frame calls ---- */
  const clock = { frames: 0, last: 0, ms: 0 };
  function tick(now) {
    if (clock.last) { const dt = now - clock.last; clock.ms = clock.ms ? clock.ms + (dt - clock.ms) * 0.1 : dt; }
    clock.last = now; clock.frames++;
  }

  /* ---- the afterglow (issue #54): phosphor persistence on text. a watched block gets a transparent copy of its own text laid over
     it; when the text changes, the characters that changed are drawn --hot with the full bloom in that copy and the copy fades in
     260 ms, so a typed character, a moving dial, a ticking clock or a resolving banner flares and cools the way a struck phosphor
     does. one MutationObserver on the screen routes every change to its block; the terminal input, which mutates nothing, is read
     on its input event. the copies are aria-hidden and never counted as text. off under prefers-reduced-motion. ---- */
  const HOSTS = ['readout', 'bootLines', 'banner', 'bootTagline', 'bootWait', 'progress', 'dial', 'vol', 'npSlug', 'npMeta', 'chip', 'uptime', 'reread', 'hdrTime'];
  const RUNS = 6; // flares per block at once: a resolving banner changes more characters than that, the rest wait for the next tick
  const hosts = new Map(); // element -> { text, amber, layers: [{ div, anim }] }
  // the copies carry their text in attributes drawn by ::before (the unchanged prefix, transparent) and ::after (the changed run, hot):
  // pseudo-element text is not in textContent, so the station, the other themes and the harness read the block as before
  function textOf(node) {
    let s = '';
    for (let c = node.firstChild; c; c = c.nextSibling) {
      if (c.nodeType === 3) s += c.nodeValue;
      else if (c.nodeType === 1 && !c.classList.contains('afterglow') && !c.classList.contains('cursor')) s += textOf(c);
    }
    return s;
  }
  function watch(host, amber) {
    if (!host || hosts.has(host)) return hosts.get(host);
    if (getComputedStyle(host).position === 'static') host.classList.add('afterglow-host');
    const w = { text: textOf(host), amber: !!amber, layers: [] };
    hosts.set(host, w);
    return w;
  }
  function layer(host, w, i) {
    let L = w.layers[i];
    if (!L) {
      const div = document.createElement('div');
      div.className = 'afterglow' + (w.amber ? ' ag-amber' : '');
      div.setAttribute('aria-hidden', 'true');
      L = w.layers[i] = { div: div, anim: null };
    }
    // a block whose textContent the station just replaced has lost the copy; it goes back in
    if (L.div.parentNode !== host) host.appendChild(L.div);
    return L;
  }
  function flare(host, w, text) {
    const old = w.text; w.text = text;
    if (text === old || !text) return;
    const runs = []; // [prefix, lit]
    if (text.length === old.length) {
      let i = 0;
      while (i < text.length && runs.length < RUNS) {
        if (text[i] === old[i]) { i++; continue; }
        let j = i; while (j < text.length && text[j] !== old[j]) j++;
        if (text.slice(i, j).trim()) runs.push([text.slice(0, i), text.slice(i, j)]);
        i = j;
      }
    } else {
      let p = 0; const m = Math.min(text.length, old.length);
      while (p < m && text[p] === old[p]) p++;
      let s = 0;
      while (s < m - p && text[text.length - 1 - s] === old[old.length - 1 - s]) s++;
      if (text.length - p - s <= 0) { if (text.length < old.length) return; s = 0; }
      if (text.slice(p, text.length - s).trim()) runs.push([text.slice(0, p), text.slice(p, text.length - s)]);
    }
    if (!runs.length) return;
    runs.forEach(function (r, i) {
      const L = layer(host, w, i);
      L.div.setAttribute('data-pre', r[0]); L.div.setAttribute('data-lit', r[1]);
      if (L.anim) L.anim.cancel();
      L.anim = L.div.animate([{ opacity: 1 }, { opacity: .85, offset: .3 }, { opacity: 0 }], { duration: 260, easing: 'ease-out', fill: 'forwards' });
    });
  }
  function afterglow() {
    if (reduced) return;
    HOSTS.forEach(function (id) { watch(el(id)); });
    const log = el('log'), cmd = el('cmd'), prompt = el('promptRow'), screen = el('screen');
    const promptW = prompt && cmd ? watch(prompt) : null;
    if (promptW) promptW.text = 'nobody> ';
    const onInput = function () { flare(prompt, promptW, 'nobody> ' + cmd.value); };
    if (promptW) cmd.addEventListener('input', onInput);
    const lineWatch = function (line) {
      if (!line.classList || !line.classList.contains('line') || line.classList.contains('print') || line.classList.contains('err')) return;
      const w = watch(line, line.classList.contains('amber')); w.text = ''; flare(line, w, textOf(line));
    };
    const obs = new MutationObserver(function (records) {
      for (let i = 0; i < records.length; i++) {
        const r = records[i], t = r.target.nodeType === 3 ? r.target.parentElement : r.target;
        if (!t || t.closest('.afterglow')) continue;
        if (log && t === log) { r.addedNodes.forEach(lineWatch); continue; }
        const host = t.closest('.afterglow-host, #readout, #reread');
        const w = host && hosts.get(host);
        if (w) flare(host, w, textOf(host));
      }
    });
    if (screen) obs.observe(screen, { childList: true, characterData: true, subtree: true });
    // dispose() empties `overlays` by calling remove() on each: the observer, the input listener and every copy go with it
    overlays.push({ remove: function () {
      obs.disconnect();
      if (promptW) cmd.removeEventListener('input', onInput);
      hosts.forEach(function (w, host) { w.layers.forEach(function (L) { if (L.anim) L.anim.cancel(); L.div.remove(); }); host.classList.remove('afterglow-host'); });
      hosts.clear();
    } });
  }

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
  /* ---- the cover in phosphor (issue #88): #73's cover (or its placeholder) dithered into the terminal's own glyph cells. every
     cell of the grid holds 2 x 4 dots, as a braille cell does; the picture is sampled at that size, its tones stretched, and
     error-diffused (Floyd and Steinberg, serpentine). a lit dot
     is a block of the phosphor; an unlit cell keeps a faint ghost of the grid; the glow is the CRT's own, on top. three places:
     the now-playing panel (floated in the readout, the prompt wraps around it), the track page, and `art`, full size in the log.
     if the cover never arrives (no file, a refused fetch) the picture is the station's own transmitter, drawn here. ---- */
  const art = { np: null, page: null, url: null, state: 'none', slug: null, pageSlug: null, printed: 0 };
  const coverImgs = {};
  function coverUrl(slug) {
    const t = ctx && ctx.S.bySlug[slug];
    if (!t || typeof NOBODY.cover !== 'function') return null;
    try { return NOBODY.cover(t, 400) || null; } catch (e) { return null; }
  }
  function albumOf(slug) {
    const t = ctx && ctx.S.bySlug[slug];
    if (!t || typeof NOBODY.albumOf !== 'function') return null;
    try { return NOBODY.albumOf(t) || null; } catch (e) { return null; }
  }
  // the picture as luminance at w x h, through a promise: the cover, or the fallback when it cannot be read
  function loadCover(url) {
    if (!url) return Promise.resolve(null);
    if (!coverImgs[url]) coverImgs[url] = new Promise(function (res) {
      const img = new Image();
      img.crossOrigin = 'anonymous';
      img.onload = function () { res(img); };
      img.onerror = function () { res(null); };
      img.src = url;
    });
    return coverImgs[url];
  }
  function fallbackPicture() {
    const cv = document.createElement('canvas'); cv.width = cv.height = 256;
    const g = cv.getContext('2d');
    g.fillStyle = '#000'; g.fillRect(0, 0, 256, 256);
    g.strokeStyle = '#fff'; g.lineCap = 'round';
    for (let i = 1; i <= 5; i++) { g.globalAlpha = 1 - i * 0.15; g.lineWidth = 9 - i; g.beginPath(); g.arc(128, 92, 22 * i, Math.PI * 1.15, Math.PI * 1.85); g.stroke(); }
    g.globalAlpha = 1; g.fillStyle = '#fff';
    g.beginPath(); g.moveTo(128, 84); g.lineTo(104, 214); g.lineTo(152, 214); g.closePath(); g.fill();
    g.fillStyle = '#000'; g.beginPath(); g.moveTo(128, 112); g.lineTo(116, 200); g.lineTo(140, 200); g.closePath(); g.fill();
    g.fillStyle = '#fff'; g.beginPath(); g.arc(128, 86, 9, 0, Math.PI * 2); g.fill();
    g.font = 'bold 34px monospace'; g.textAlign = 'center'; g.fillText('88.8', 128, 248);
    return cv;
  }
  function lumaOf(src, w, h) {
    const cv = document.createElement('canvas'); cv.width = w; cv.height = h;
    const g = cv.getContext('2d', { willReadFrequently: true });
    g.imageSmoothingQuality = 'high';
    // the cover is square and so is every block; anything else is cut to its middle square
    const sw = src.naturalWidth || src.width, sh = src.naturalHeight || src.height, s = Math.min(sw, sh);
    g.drawImage(src, (sw - s) / 2, (sh - s) / 2, s, s, 0, 0, w, h);
    const d = g.getImageData(0, 0, w, h).data, L = new Float32Array(w * h);
    for (let i = 0; i < L.length; i++) L[i] = (0.2126 * d[i * 4] + 0.7152 * d[i * 4 + 1] + 0.0722 * d[i * 4 + 2]) / 255;
    return L;
  }
  // the tones stretched between the 2nd and the 98th percentile, so a dark cover still lights, lifted a little (a phosphor dot is
  // either on or off, and a cover's dark half would go all off), then Floyd and Steinberg's diffusion, serpentine, so the
  // gradients of a sky keep their slope as a thinning of dots instead of a cliff
  function dither(L, w, h) {
    const sorted = Array.from(L).sort(function (a, b) { return a - b; });
    const lo = sorted[Math.floor(sorted.length * 0.02)], hi = sorted[Math.floor(sorted.length * 0.98)], span = Math.max(0.08, hi - lo);
    const e = new Float32Array(L.length), on = new Uint8Array(L.length);
    for (let i = 0; i < L.length; i++) e[i] = Math.pow(Math.max(0, Math.min(1, (L[i] - lo) / span)), 0.8);
    for (let y = 0; y < h; y++) {
      const rtl = y % 2 === 1, dx = rtl ? -1 : 1;
      for (let k = 0; k < w; k++) {
        const x = rtl ? w - 1 - k : k, i = y * w + x, v = e[i], o = v >= 0.5 ? 1 : 0, q = v - o;
        on[i] = o;
        if (x + dx >= 0 && x + dx < w) e[i + dx] += q * 7 / 16;
        if (y + 1 < h) {
          if (x - dx >= 0 && x - dx < w) e[i + w - dx] += q * 3 / 16;
          e[i + w] += q * 5 / 16;
          if (x + dx >= 0 && x + dx < w) e[i + w + dx] += q * 1 / 16;
        }
      }
    }
    return on;
  }
  function cellPx() {
    const fs = V.fontPx(), g = document.createElement('canvas').getContext('2d');
    g.font = fs + 'px "VT323", monospace';
    return { w: g.measureText('0').width || fs * 0.5, h: V.rowPx() };
  }
  function makeBlock(cls) {
    const host = document.createElement('div'); host.className = 'phos-art ' + cls; host.setAttribute('aria-hidden', 'true');
    const cv = document.createElement('canvas'); host.appendChild(cv);
    return { host: host, canvas: cv, cols: 0, rows: 0, on: null, url: undefined, lit: 0 };
  }
  // draws the block at cols x rows cells from a picture (an image, a canvas, or null for the fallback)
  function paint(b, src, cols, rows) {
    const c = cellPx(), dpr = window.devicePixelRatio || 1, W = cols * c.w, H = rows * c.h;
    b.cols = cols; b.rows = rows;
    b.canvas.style.width = W.toFixed(1) + 'px'; b.canvas.style.height = H.toFixed(1) + 'px';
    b.canvas.width = Math.round(W * dpr); b.canvas.height = Math.round(H * dpr);
    const g = b.canvas.getContext('2d'); g.setTransform(dpr, 0, 0, dpr, 0, 0); g.clearRect(0, 0, W, H);
    const sx = cols * 2, sy = rows * 4;
    let L; b.tainted = false;
    try { L = lumaOf(src || fallbackPicture(), sx, sy); } catch (e) { L = lumaOf(fallbackPicture(), sx, sy); b.tainted = true; }
    const on = b.on = dither(L, sx, sy);
    const cs = getComputedStyle(document.documentElement), p1 = cs.getPropertyValue('--p1').trim() || '#41FF6A', ghost = cs.getPropertyValue('--p1-ghost').trim() || '#0C3A1B';
    const dw = c.w / 2, dh = c.h / 4, gx = Math.max(0.6, dw * 0.12), gy = Math.max(0.6, dh * 0.14);
    // the ghost of the mask: an unlit dot stays a faint one, so the picture reads as cells of the screen and not as a photo
    let lit = 0;
    for (let y = 0; y < sy; y++) for (let x = 0; x < sx; x++) {
      const o = on[y * sx + x]; if (o) lit++;
      g.fillStyle = o ? p1 : ghost; g.globalAlpha = o ? 1 : 0.28;
      g.fillRect(x * dw + gx / 2, y * dh + gy / 2, dw - gx, dh - gy);
    }
    g.globalAlpha = 1;
    b.lit = lit;
  }
  function sizeFor(kind) {
    const c = cellPx(), phone = ctx.phone(), squareRows = function (cols) { return Math.max(3, Math.round(cols * c.w / c.h)); };
    if (kind === 'np') { const cols = phone ? 18 : 20; return [cols, squareRows(cols)]; }
    // the track page: the station's cover slot is 6 rows square (5 on a phone, station.css); the album page's hero is 40 cells, or the
    // phone's whole width
    if (kind === 'page') { const rows = phone ? 5 : 6; return [Math.round(rows * c.h / c.w), rows]; }
    if (kind === 'hero') { const cols = phone ? ctx.content() : 40; return [cols, squareRows(cols)]; }
    // `art`: as wide as the terminal, as tall as most of the window allows, square
    const maxRows = Math.max(8, Math.floor(window.innerHeight * 0.72 / c.h)), want = ctx.content();
    const rows = Math.min(maxRows, squareRows(want)), cols = Math.min(want, Math.round(rows * c.h / c.w));
    return [cols, rows];
  }
  function drawInto(b, url, kind) {
    b.url = url;
    return loadCover(url).then(function (img) {
      if (b.url !== url) return b;
      const sz = sizeFor(kind);
      paint(b, img, sz[0], sz[1]);
      b.state = img && !b.tainted ? 'cover' : 'fallback';
      return b;
    });
  }
  // the now-playing panel. desktop: the block stands in the readout's right margin, the prompt keeps its column beside it (a margin,
  // not a float, so the afterglow's copy of the text, which inherits the padding, lines up glyph for glyph). phone: a block of its
  // own between the title and the prompt, where 40 columns leave room for it
  function mountNp(slug) {
    if (!ctx) return;
    const ro = el('readout'); if (!ro) return;
    if (!art.np) art.np = makeBlock('np-art');
    const phone = ctx.phone();
    if (phone) { if (art.np.host.nextSibling !== ro) ro.parentNode.insertBefore(art.np.host, ro); }
    else if (art.np.host.parentNode !== ro) ro.insertBefore(art.np.host, ro.firstChild);
    art.slug = slug;
    const url = coverUrl(slug);
    art.url = url;
    drawInto(art.np, url, 'np').then(function (b) {
      art.state = b.state;
      const on = !phone && b.host.parentNode === ro;
      ro.classList.toggle('has-art', on);
      ro.style.setProperty('--art-w', on ? b.canvas.style.width : '');
      ro.style.setProperty('--art-h', on ? b.canvas.style.height : '');
    });
  }
  // the track page: the block takes the place of the station's cover (#73's album block, the picture beside the album's name and
  // who asked), for the page's own track, not the one on air
  function mountPage() {
    const m = /^#\/track\/([^/?]+)/.exec(location.hash || ''), page = el('page');
    if (!m || !page || page.hidden) return;
    const slug = decodeURIComponent(m[1]);
    if (!ctx.S.bySlug[slug]) return;
    // the station may draw the page twice for one visit (the hash and the route); one picture
    page.querySelectorAll('.page-art').forEach(function (n) { n.remove(); });
    const b = art.page = makeBlock('page-art');
    const slot = page.querySelector('.album-block .cover-art');
    if (slot) slot.parentNode.insertBefore(b.host, slot);
    else { const why = [].find.call(page.querySelectorAll('h2'), function (h) { return /^WHY/.test(h.textContent); }); page.insertBefore(b.host, why || page.firstChild); }
    art.pageSlug = slug;
    drawInto(b, coverUrl(slug), 'page');
  }
  // the album page (#73's optional hook): the hero cover, dithered, in the station's slot
  TH.albumPage = function (a, p) {
    if (!a || !p) return;
    p.querySelectorAll('.hero-art').forEach(function (n) { n.remove(); });
    const b = art.hero = makeBlock('hero-art');
    const slot = p.querySelector('.album-hero .cover-art');
    if (slot) slot.parentNode.insertBefore(b.host, slot); else p.appendChild(b.host);
    let url = null; try { url = NOBODY.cover(a, 400); } catch (e) {}
    art.heroSlug = a.slug;
    drawInto(b, url, 'hero');
  };
  TH.playing = function (slug) { if (slug) mountNp(slug); };
  TH.catalogue = function () { if (ctx && ctx.S.current) mountNp(ctx.S.current); };
  TH.scheme = function () { if (art.np && art.slug) { art.np.url = undefined; mountNp(art.slug); } if (art.page && art.page.host.isConnected) drawInto(art.page, art.page.url, 'page'); if (art.hero && art.hero.host.isConnected) drawInto(art.hero, art.hero.url, 'hero'); };
  let resizeT = 0;
  TH.resize = function () {
    clearTimeout(resizeT);
    resizeT = setTimeout(function () { if (art.np && art.slug) { art.np.url = undefined; mountNp(art.slug); } if (art.page && art.page.host.isConnected) drawInto(art.page, art.page.url, 'page'); if (art.hero && art.hero.host.isConnected) drawInto(art.hero, art.hero.url, 'hero'); }, 120);
  };

  /* ---- `art` (issue #88): the cover full size in the log ---- */
  function cmdArt(arg) {
    const T = ctx.T, S = ctx.S, a = (arg || '').trim();
    let slug = S.current;
    if (a) {
      const al = typeof NOBODY.album === 'function' ? NOBODY.album(a) : null;
      const t = S.bySlug[a] || S.tracks.find(function (x) { return x.slug.indexOf(a) >= 0; });
      if (al && al.tracks && al.tracks.length) slug = al.tracks[0];
      else if (t) slug = t.slug;
      else { T.error('nobody knows "' + a + '". art <slug> or art <album>.'); return; }
    }
    if (!slug) { T.print('nothing on air, nothing to show.', 'amber'); return; }
    const al = albumOf(slug), log = T.log;
    if (T.scrollRestore) { T.scrollRestore(); T.scrollRestore = null; }
    const b = makeBlock('art-print'); b.host.classList.add('line');
    log.appendChild(b.host);
    const keep = T.maxLines; T.maxLines = keep + 1;
    log.style.height = 'auto'; log.style.maxHeight = 'none';
    const restore = function () { obs.disconnect(); T.maxLines = keep; log.style.height = ''; log.style.maxHeight = ''; b.host.remove(); if (T.scrollRestore === restore) T.scrollRestore = null; };
    // the picture scrolls away like any output: when the log trims it, the log gets its height back
    const obs = new MutationObserver(function () { if (!b.host.isConnected) restore(); });
    obs.observe(log, { childList: true });
    T.scrollRestore = restore;
    art.printed++;
    drawInto(b, coverUrl(slug), 'art').then(function () {
      T.print('art: ' + (al ? al.title || al.slug : slug) + (b.state === 'fallback' ? '. no cover yet; the transmitter stands in.' : '.') + ' ' + b.cols + ' x ' + b.rows + ' cells. clear puts it away.', 'mid');
      const term = el('terminal'); if (term && term.scrollIntoView) term.scrollIntoView({ block: 'end' });
    });
  }
  TH.commands = function () {
    // `album` is the station's since #73 (the list, the album page); the CRT adds the picture. a core name always wins
    const own = { art: cmdArt }, out = {};
    Object.keys(own).forEach(function (k) { if (!NOBODY.term.commands[k]) out[k] = own[k]; });
    return out;
  };
  TH.help = function () { return [['art', 'the cover, full size, dithered'], ['art <album>', 'that album\'s cover']]; };

  // the widget slot (12.0, issue #28): the dithered cover is the CRT's one widget in the transmitter card (issue #88)
  TH.widget = function () { return art.np ? { kind: 'dither', host: art.np.host } : null; };
  // frames and ms are the station's frame calls while on air (the same read the harness prints for the city), afterglow the blocks watched
  TH.state = function () {
    const blk = function (b) { return b ? { cols: b.cols, rows: b.rows, lit: b.lit, state: b.state || 'loading', url: b.url || null, mounted: b.host.isConnected } : null; };
    return { widget: art.np ? 'dither' : null, barrel: glass && glass.classList.contains('barrel'), tower: TH.towerState(), frames: clock.frames, ms: +clock.ms.toFixed(1), afterglow: hosts.size,
      art: { np: blk(art.np), page: blk(art.page), pageSlug: art.pageSlug, hero: blk(art.hero), heroSlug: art.heroSlug, printed: art.printed, dither: 'floyd-steinberg, 2 x 4 dots per cell' } };
  };
  return TH;
})();
