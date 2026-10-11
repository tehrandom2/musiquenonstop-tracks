/* nobody fm, theme "city": the cyberspace look (design 12.1 to 12.13) and, since issue #53, the fly-through
   (docs/city-flythrough.md): the catalogue is a street city built from the index's measured numbers, the camera is the
   cursor. the page background is a three.js scene: a street grid, towers of glowing translucent blocks (one per track,
   the rest anonymous filler), a ring of bars and a ribbon around the playing tower, a beam over it, the queue drawn as
   a route on the street, a wireframe tunnel for the long jumps, bloom and chromatic fringing on top; glass cards, a
   display face, HUD rings and a strip of frequencies in front of it. a classic script on purpose (design 5.7): the one
   inline module in index.html imports three.js and its passes from the CDN into NOBODY.libs; makeCityScene below is
   plain code against them. without the CDN there is no scene and the page runs on the CSS gradient (12.11), the list is
   the city. the theme owns the browsing paradigm through the hooks of 12.0 (interface, keys, commands, highlight, queue,
   filter, hidden, layout) and asks the station for everything through ctx; it never writes the station's state.
   nobody who built this can hear; nothing here listens, it only reads numbers. */
window.NOBODY = window.NOBODY || {};
NOBODY.themes = NOBODY.themes || {};
function makeCityScene(THREE, P) {
  const C = {
    ok: true, running: false, bloomOn: true, chromaOn: true, frames: 0, ms: 0, view: 'standby', playing: null,
    phone: false, reduced: false, probed: false, tunnelOn: false, flying: false, levels: null, layout: 'deck', ladder: 0
  };
  const reduced = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  C.reduced = reduced;
  const qs = new URLSearchParams(location.search);
  const NOPROBE = qs.get('probe') === '0'; // harness only: keep the designed look whatever the frame time

  /* ---- tokens: the scene reads the same custom properties as the CSS (12.1) ---- */
  const tok = {};
  function readTokens() {
    const cs = getComputedStyle(document.documentElement);
    ['cyan', 'magenta', 'violet', 'green', 'amber', 'bg-0', 'bg-1', 'haze', 'ink-dim', 'ink'].forEach(function (k) {
      const v = cs.getPropertyValue('--' + k).trim() || '#ffffff';
      tok[k] = new THREE.Color(v);
    });
  }
  readTokens();

  /* ---- the renderer, the scene, the camera ---- */
  let renderer, scene, camera, composer, bloom, chroma, canvas, W = 2, H = 2, pr = 1, prBase = 1;
  const clock = { last: 0, t: 0 };
  const settings = { fillers: 360, fog: 0.02, bloom: [0.55, 0.4, 0.5], bars: 64, flight: 900 };
  const PHONE = { fillers: 120, fog: 0.03, bloom: [0.5, 0.35, 0.5], bars: 32, flight: 500 };

  const CHROMA = {
    uniforms: { tDiffuse: { value: null }, uAmount: { value: 0.0022 } },
    vertexShader: 'varying vec2 vUv; void main(){ vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }',
    fragmentShader: [
      'uniform sampler2D tDiffuse; uniform float uAmount; varying vec2 vUv;',
      'void main(){',
      '  vec2 d = vUv - 0.5; float r2 = dot(d, d);',
      '  vec2 off = d * (uAmount * (0.4 + 2.0 * r2));',
      '  float r = texture2D(tDiffuse, vUv + off).r;',
      '  float g = texture2D(tDiffuse, vUv).g;',
      '  float b = texture2D(tDiffuse, vUv - off).b;',
      '  float vig = 1.0 - r2 * 0.55;',
      '  gl_FragColor = vec4(vec3(r, g, b) * vig, 1.0);',
      '}'
    ].join('\n')
  };

  /* ---- the block shader (12.3): translucent body, bright edges, instanced, rising and pulsing; aLit is a find (12.0, #53) ---- */
  const BLOCK_VERT = [
    'attribute float aRise; attribute float aTower; attribute float aTop; attribute float aLit;',
    'uniform float uRise, uTime, uFog, uPlaying, uPulse, uFilter;',
    'varying vec2 vUv; varying vec3 vCol; varying float vFade; varying float vLit;',
    'void main(){',
    '  vUv = uv;',
    '  vec4 wp = modelMatrix * instanceMatrix * vec4(position, 1.0);',
    '  float s = clamp((uRise - aRise * 0.6) / 0.4, 0.0, 1.0);',
    '  s = s * s * (3.0 - 2.0 * s);',
    '  wp.y *= s;',
    '  vec4 mv = viewMatrix * wp;',
    '  float d = length(mv.xyz);',
    '  float fog = exp(-pow(d * uFog, 2.0)) * smoothstep(1.2, 4.5, d);',
    '  float playing = step(abs(aTower - uPlaying), 0.5);',
    '  float top = step(0.5, aTop) * step(aTop, 1.5);',
    '  float gain = 1.0 + playing * uPulse * 0.7 * (1.0 + top);',
    '  float blink = mix(1.0, 0.5 + 0.5 * sin(uTime * 3.14159), step(1.5, aTop));',
    '  vCol = instanceColor * gain * blink;',
    '  vLit = mix(1.0, aLit, uFilter);',
    '  vFade = fog * s;',
    '  gl_Position = projectionMatrix * mv;',
    '}'
  ].join('\n');
  const BLOCK_FRAG = [
    'varying vec2 vUv; varying vec3 vCol; varying float vFade; varying float vLit; uniform float uGain;',
    'void main(){',
    '  vec2 e = min(vUv, 1.0 - vUv);',
    '  float edge = 1.0 - smoothstep(0.0, 0.05, min(e.x, e.y));',
    '  vec3 c = vCol * (0.07 + 1.3 * edge * vLit) * vFade * uGain * vLit;',
    '  gl_FragColor = vec4(c, 1.0);',
    '}'
  ].join('\n');
  const blockUniforms = { uRise: { value: 0 }, uTime: { value: 0 }, uFog: { value: settings.fog }, uPlaying: { value: -99 }, uPulse: { value: 0 }, uGain: { value: 1 }, uFilter: { value: 0 } };
  function blockMaterial() {
    return new THREE.ShaderMaterial({ uniforms: blockUniforms, vertexShader: BLOCK_VERT, fragmentShader: BLOCK_FRAG, transparent: true, depthWrite: false, blending: THREE.AdditiveBlending });
  }
  const blockGeo = new THREE.BoxGeometry(0.94, 0.44, 0.94);

  /* ---- the grid (12.3): lines every 2 units in cyan, every 10 in violet, drawn outward from the camera ---- */
  const gridUniforms = { uCyan: { value: tok.cyan }, uViolet: { value: tok.violet }, uDraw: { value: 0 }, uFog: { value: settings.fog }, uCam: { value: new THREE.Vector2() } };
  const GRID_VERT = 'varying vec3 vW; varying float vD; void main(){ vec4 wp = modelMatrix * vec4(position, 1.0); vW = wp.xyz; vec4 mv = viewMatrix * wp; vD = length(mv.xyz); gl_Position = projectionMatrix * mv; }';
  const GRID_FRAG = [
    'uniform vec3 uCyan, uViolet; uniform float uDraw, uFog; uniform vec2 uCam; varying vec3 vW; varying float vD;',
    'float gridLine(vec2 p, float size){ vec2 q = p / size; vec2 g = abs(fract(q - 0.5) - 0.5) / fwidth(q); return 1.0 - min(min(g.x, g.y), 1.0); }',
    'void main(){',
    '  float minor = gridLine(vW.xz, 2.0), major = gridLine(vW.xz, 10.0);',
    '  float fog = exp(-pow(vD * uFog, 2.0));',
    '  float reach = uDraw * 240.0;',
    '  float dd = length(vW.xz - uCam);',
    '  float drawn = 1.0 - smoothstep(reach - 3.0, reach, dd);',
    '  float front = exp(-abs(dd - reach) * 0.6) * step(uDraw, 0.999);',
    '  vec3 c = (uCyan * minor * 0.5 + uViolet * major * 0.85 + uViolet * 0.04) * fog * drawn + uCyan * front * 0.9 * fog;',
    '  gl_FragColor = vec4(c, 1.0);',
    '}'
  ].join('\n');

  /* ---- the sky (12.3): the gradient of 12.1 as a dome, with the horizon pulsing on the bass ---- */
  const skyUniforms = { uBg0: { value: tok['bg-0'] }, uBg1: { value: tok['bg-1'] }, uHaze: { value: tok.haze }, uMagenta: { value: tok.magenta }, uBass: { value: 0 } };
  const SKY_VERT = 'varying vec3 vDir; void main(){ vDir = normalize(position); gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }';
  const SKY_FRAG = [
    'uniform vec3 uBg0, uBg1, uHaze, uMagenta; uniform float uBass; varying vec3 vDir;',
    'void main(){',
    '  float y = vDir.y;',
    '  vec3 c = mix(uBg0, uBg1, smoothstep(-0.1, 0.6, y));',
    '  float hz = exp(-abs(y) * 24.0);',
    '  c += uMagenta * hz * (0.05 + 0.16 * uBass);',
    '  float haze = pow(max(0.0, dot(vDir, normalize(vec3(0.6, 0.35, -0.7)))), 3.0);',
    '  c += uHaze * haze * 0.9;',
    '  gl_FragColor = vec4(c, 1.0);',
    '}'
  ].join('\n');

  /* ---- the route (city-flythrough 6): a flat ribbon on the street with chevrons running toward the next stop ---- */
  const routeUniforms = { uTime: { value: 0 }, uFog: { value: settings.fog }, uStill: { value: reduced ? 1 : 0 } };
  const ROUTE_VERT = 'attribute float aT; attribute vec3 aCol; varying float vT; varying vec3 vC; varying float vD; void main(){ vT = aT; vC = aCol; vec4 wp = modelMatrix * vec4(position, 1.0); vec4 mv = viewMatrix * wp; vD = length(mv.xyz); gl_Position = projectionMatrix * mv; }';
  const ROUTE_FRAG = [
    'uniform float uTime, uFog, uStill; varying float vT; varying vec3 vC; varying float vD;',
    'void main(){',
    '  float fog = exp(-pow(vD * uFog, 2.0));',
    '  float k = fract((vT - uTime * 4.0 * (1.0 - uStill)) / 2.0);',
    '  float chev = 0.45 + 0.55 * step(k, 0.4);',
    '  gl_FragColor = vec4(vC * chev * fog, 1.0);',
    '}'
  ].join('\n');
  /* ---- the beam (city-flythrough 8): the landmark over the playing tower, no fog, fading up ---- */
  const beamUniforms = { uColor: { value: tok.magenta }, uPulse: { value: 0 } };
  const BEAM_VERT = 'varying vec2 vUv; void main(){ vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }';
  const BEAM_FRAG = 'uniform vec3 uColor; uniform float uPulse; varying vec2 vUv; void main(){ float a = pow(1.0 - vUv.y, 2.2) * (0.35 + 0.25 * uPulse); gl_FragColor = vec4(uColor * a, 1.0); }';

  /* ---- state ---- */
  let grid, sky, filler, cat, dead, bars, barsMirror, ribbon, tunnel, horizon, route, beam, bridges;
  const towers = []; // {id, slug, x, z, blocks, kind, voice, foot, gain, crown, base, age, fails, cx, cz, district, day, street}
  const city = { cells: {}, walk: {}, signs: [], districts: [], days: [], bounds: { cx0: 0, cx1: 0, cz0: 0, cz1: 0 }, newest: 0 };
  let barCount = 64, barColors = [];
  const ribbonN = 160, ribbonWave = new Float32Array(ribbonN);
  // side: how far the camera pans sideways so the playing tower sits beside the card column, not behind it (issue #43); 0 on the phone
  const cam = { target: new THREE.Vector3(0, 2, 0), r: 24, h: 18, speed: 0.02, angle: 0.6, side: 0, sideNow: 0 };
  const pose = { pos: new THREE.Vector3(), look: new THREE.Vector3() };
  let flight = null, tunnelUntil = 0, tunnelFade = 0, parallax = { x: 0, y: 0, tx: 0, ty: 0 };
  let bootT = null, deadBlocks = 0, deadAt = 0, pulse = 0, bass = 0, chromaAmt = 0.0022, filterK = 0, filterOn = 0;
  // the camera on rails (city-flythrough 4): street, flight or orbit; every value a damped spring with a 220 ms time constant
  const NAV = { mode: 'orbit', x: 1, z: 1, y: 2.6, h: 0, hv: 0, speed: 0, tspeed: 0, lat: 0, tlat: 0, turn: 0, turnAt: 0, path: null, pathLen: 0, pathT: 0, pathDur: 0, onLand: null, cruise: false, cruiseAt: 0, cruising: false, lastInput: 0, endSaid: 0, flightSlug: null };
  const routeState = { stops: [], points: [], len: 0, list: [] };
  const perf = { ring: new Float32Array(120), n: 0, at: 0, p50: 0, p95: 0, checkedAt: 0, over: 0, under: 0 };
  let cursor = null; // the cursor tower (a tower object) or null
  let say = function () {}; // the terminal, handed in by the theme
  const TC = 0.22; // the spring's time constant
  function spring(dt) { return 1 - Math.exp(-dt / TC); }

  function rng(seed) { return function () { seed |= 0; seed = seed + 0x6D2B79F5 | 0; let t = Math.imul(seed ^ seed >>> 15, 1 | seed); t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t; return ((t ^ t >>> 14) >>> 0) / 4294967296; }; }
  function clamp(v, a, b) { return Math.max(a, Math.min(b, v)); }

  function kindColour(kind) {
    switch (kind) {
      case 'fast': return tok.cyan.clone().multiplyScalar(1.0);
      case 'best': return tok.magenta.clone().multiplyScalar(1.0);
      case 'beacon': return tok.green.clone().multiplyScalar(1.4);
      case 'filler-c': return tok.cyan.clone().multiplyScalar(0.4);
      case 'filler-v': return tok.violet.clone().multiplyScalar(0.45);
      case 'dead': return tok['ink-dim'].clone().multiplyScalar(1.3);
      case 'fail': return tok.amber.clone().multiplyScalar(1.2);
      default: return tok.violet.clone().multiplyScalar(1.0);
    }
  }
  // the colour of one block of a tower (city-flythrough 2): the tier's hue, the loudness gain, the age, the crown, the base, a failed gate
  function blockColour(t, k) {
    if (t.fails && t.fails.indexOf(k) >= 0) return kindColour('fail');
    const c = kindColour(t.kind).multiplyScalar((t.gain || 1) * (t.age || 1));
    if (t.crown && k >= t.blocks - t.crown) c.lerp(tok.ink, 0.45);
    if (t.base && k < t.base) { c.lerp(tok.violet, 0.6); c.multiplyScalar(0.7); }
    return c;
  }

  /* ---- the city from the numbers (city-flythrough 2) ---- */
  const FAMILIES = [
    ['night', /night|tired|sleepy|awake|late|2 a\.m/i], ['fair', /playful|mischievous|good-humoured|fun|cheeky/i],
    ['quiet', /quiet|calm|hopeful|wistful|awed|unhurried|absent-minded/i], ['wave', /wave phase/i], ['build', /build phase/i], ['title', /title tune/i]
  ];
  const FAMILY_ORDER = { night: 0, fair: 1, quiet: 2, build: 3, wave: 4, title: 5, other: 6 };
  function familyOf(t) { const m = String(t.mood || ''); for (let i = 0; i < FAMILIES.length; i++) if (FAMILIES[i][1].test(m)) return FAMILIES[i][0]; return 'other'; }
  function districtOf(t) { if (t.project) return String(t.project); const f = familyOf(t); return f === 'other' ? 'downtown' : f; }
  function num(v, d) { return typeof v === 'number' && isFinite(v) ? v : d; }
  function measure(t, newestMs) {
    const n = t.numbers || {}, ch = t.checks || {};
    const tempo = num(n.tempo_bpm, num(t.bpm, 90));
    const blocks = clamp(Math.round(6 + (tempo - 60) * 0.3), 6, 36);
    const bright = num(n.brightness_pct, 1), boom = num(n.boominess_pct, 10), lufs = num(n.lufs, -16.5);
    const when = Date.parse(t.rendered_at || ((t.date || '') + 'T00:00:00'));
    const days = isNaN(when) ? 90 : Math.max(0, (newestMs - when) / 86400000);
    let age = clamp(0.55 + 0.45 * (1 - days / 90), 0.55, 1); if (t.backfill) age *= 0.85;
    const fails = [];
    const mid = Math.floor(blocks / 2);
    if (ch.tempo === false) fails.push(blocks - 1);
    if (ch.loudness === false || ch.peak === false) fails.push(mid);
    if (ch.boominess === false) fails.push(0);
    ['silence', 'brightness', 'onsets', 'seam', 'words'].forEach(function (g, i) { if (ch[g] === false) fails.push(clamp(mid + 1 + i, 0, blocks - 1)); });
    return {
      blocks: blocks, foot: clamp(num(t.duration, 100) / 100, 0.7, 1.6), gain: clamp(0.6 + (lufs + 21) / 6 * 0.8, 0.5, 1.5),
      crown: Math.round(blocks * clamp(Math.log10(1 + bright) / Math.log10(9), 0, 1) * 0.4), base: Math.round(blocks * clamp(boom / 70, 0, 1) * 0.5),
      age: age, fails: fails
    };
  }
  const BW = 8; // cells per block, east to west
  function key(cx, cz) { return cx + ',' + cz; }
  function wx(cx) { return cx * 2 + 1; }
  function wz(cz) { return cz * 2 + 1; }
  // the street grid: districts as strips either side of the avenue, days as rows of blocks, newest at the south (city-flythrough 2)
  function layoutCity(tracks) {
    towers.length = 0; city.cells = {}; city.walk = {}; city.signs = []; city.districts = []; city.days = [];
    const byD = {};
    tracks.forEach(function (t) { const d = districtOf(t); (byD[d] = byD[d] || []).push(t); });
    const dnames = Object.keys(byD).sort(function (a, b) { return byD[b].length - byD[a].length || a.localeCompare(b); });
    const strips = dnames.map(function (name, k) {
      const order = Math.floor(k / 2), east = k % 2 === 0;
      const cx0 = east ? 2 + order * (BW + 1) : -3 - order * (BW + 1) - (BW - 1);
      return { name: name, east: east, cx0: cx0, cx1: cx0 + BW - 1, count: byD[name].length, cz: 0 };
    });
    let newest = 0;
    tracks.forEach(function (t) { const w = Date.parse(t.rendered_at || ((t.date || '') + 'T00:00:00')); if (!isNaN(w) && w > newest) newest = w; });
    city.newest = newest || Date.now();
    const when = function (t) { const v = Date.parse(t.rendered_at || ((t.date || '') + 'T00:00:00')); return isNaN(v) ? 0 : v; };
    const days = Array.from(new Set(tracks.map(function (t) { return t.date || 'undated'; }))).sort().reverse();
    let cz = 1, id = 0;
    const minCx = strips.length ? Math.min.apply(null, strips.map(function (s) { return s.cx0; })) - 1 : -2;
    const maxCx = strips.length ? Math.max.apply(null, strips.map(function (s) { return s.cx1; })) + 1 : 1;
    days.forEach(function (day) {
      let depth = 1;
      const perStrip = strips.map(function (s) {
        const list = byD[s.name].filter(function (t) { return (t.date || 'undated') === day; });
        list.sort(function (a, b) { return (when(b) - when(a)) || ((FAMILY_ORDER[familyOf(a)] || 0) - (FAMILY_ORDER[familyOf(b)] || 0)) || String(a.slug).localeCompare(String(b.slug)); });
        depth = Math.max(depth, Math.ceil(list.length / BW));
        return list;
      });
      strips.forEach(function (s, si) {
        perStrip[si].forEach(function (t, i) {
          const col = i % BW, row = Math.floor(i / BW);
          const cx = s.east ? s.cx0 + col : s.cx1 - col, tz = cz + row;
          const m = measure(t, city.newest);
          const tw = { id: id++, slug: t.slug, x: wx(cx), z: wz(tz), cx: cx, cz: tz, kind: t.model === 'fast' ? 'fast' : t.model === 'best' ? 'best' : 'other', voice: !!t.voice,
            blocks: m.blocks, foot: m.foot, gain: m.gain, crown: m.crown, base: m.base, age: m.age, fails: m.fails, district: s.name, day: day, parent: t.lineage && t.lineage.parent || null };
          towers.push(tw); city.cells[key(cx, tz)] = tw;
        });
      });
      city.days.push({ day: day, cz0: cz, cz1: cz + depth - 1 });
      city.signs.push({ x: wx(0) + 2.2, z: wz(cz - 1), text: day, kind: 'day' });
      cz += depth + 1;
    });
    const cz1 = cz - 1; // the north street
    city.bounds = { cx0: minCx, cx1: maxCx, cz0: 0, cz1: cz1 };
    // the walkable cells: the avenue (cx 0, cx -1 kept empty beside it), every day street, every strip boundary street
    for (let z = 0; z <= cz1; z++) city.walk[key(0, z)] = true;
    city.days.forEach(function (d) { for (let x = minCx; x <= maxCx; x++) { city.walk[key(x, d.cz0 - 1)] = true; } });
    for (let x = minCx; x <= maxCx; x++) city.walk[key(x, cz1)] = true;
    strips.forEach(function (s) { for (let z = 0; z <= cz1; z++) { city.walk[key(s.cx0 - 1, z)] = true; city.walk[key(s.cx1 + 1, z)] = true; } });
    strips.forEach(function (s) { city.signs.push({ x: wx(s.east ? s.cx0 : s.cx1) + (s.east ? 1 : -1) * 2, z: wz(0), text: s.name, kind: 'district' }); });
    city.districts = strips;
    // a tower's street-side cell: the nearest walkable cell, ring by ring
    towers.forEach(function (t) {
      let best = null, bd = 99;
      for (let r = 1; r <= 4 && !best; r++) for (let dx = -r; dx <= r; dx++) for (let dz = -r; dz <= r; dz++) {
        if (Math.max(Math.abs(dx), Math.abs(dz)) !== r) continue;
        const k = key(t.cx + dx, t.cz + dz);
        if (city.walk[k]) { const d = Math.abs(dx) + Math.abs(dz); if (d < bd) { bd = d; best = { cx: t.cx + dx, cz: t.cz + dz }; } }
      }
      t.street = best || { cx: 0, cz: 0 };
    });
  }
  function towerOf(slug) { return towers.find(function (t) { return t.slug === slug; }) || null; }
  function cellOf(x, z) { return { cx: Math.floor(x / 2), cz: Math.floor(z / 2) }; }
  function walkable(cx, cz) { return !!city.walk[key(cx, cz)]; }
  function nearestWalk(x, z) {
    const c = cellOf(x, z);
    if (walkable(c.cx, c.cz)) return c;
    let best = null, bd = 1e9;
    for (let r = 1; r <= 6 && !best; r++) for (let dx = -r; dx <= r; dx++) for (let dz = -r; dz <= r; dz++) {
      if (Math.max(Math.abs(dx), Math.abs(dz)) !== r) continue;
      if (walkable(c.cx + dx, c.cz + dz)) { const d = dx * dx + dz * dz; if (d < bd) { bd = d; best = { cx: c.cx + dx, cz: c.cz + dz }; } }
    }
    return best || { cx: 0, cz: 0 };
  }
  // the Manhattan route along the streets, breadth first; returns the cells
  function routeCells(a, b) {
    if (a.cx === b.cx && a.cz === b.cz) return [a];
    const prev = {}, q = [a]; prev[key(a.cx, a.cz)] = null;
    const dirs = [[1, 0], [-1, 0], [0, 1], [0, -1]];
    let found = false;
    for (let qi = 0; qi < q.length && !found; qi++) {
      const c = q[qi];
      for (let i = 0; i < 4; i++) {
        const nx = c.cx + dirs[i][0], nz = c.cz + dirs[i][1], k = key(nx, nz);
        if (!walkable(nx, nz) || k in prev) continue;
        prev[k] = c; const n = { cx: nx, cz: nz }; q.push(n);
        if (nx === b.cx && nz === b.cz) { found = true; break; }
      }
    }
    if (!found) return [a, b];
    const out = []; let c = b;
    while (c) { out.unshift(c); c = prev[key(c.cx, c.cz)]; }
    return out;
  }
  function corners(cells) {
    const pts = [];
    cells.forEach(function (c, i) {
      if (i > 0 && i < cells.length - 1) { const p = cells[i - 1], n = cells[i + 1]; if ((p.cx === n.cx) || (p.cz === n.cz)) return; }
      pts.push(new THREE.Vector3(wx(c.cx), 0, wz(c.cz)));
    });
    return pts;
  }
  function polyLen(pts) { let l = 0; for (let i = 1; i < pts.length; i++) l += pts[i].distanceTo(pts[i - 1]); return l; }
  function pointAlong(pts, d, out, dir) {
    let acc = 0;
    for (let i = 1; i < pts.length; i++) {
      const seg = pts[i].distanceTo(pts[i - 1]);
      if (acc + seg >= d || i === pts.length - 1) {
        const k = seg > 0 ? clamp((d - acc) / seg, 0, 1) : 1;
        out.lerpVectors(pts[i - 1], pts[i], k);
        if (dir) dir.subVectors(pts[i], pts[i - 1]).normalize();
        return out;
      }
      acc += seg;
    }
    out.copy(pts[0]); if (dir) dir.set(0, 0, 1); return out;
  }
  function blocksBetween(a, b) { return Math.abs(a.cx - b.cx) + Math.abs(a.cz - b.cz); }
  function legWords(a, b) {
    const dx = b.cx - a.cx, dz = b.cz - a.cz, parts = [];
    if (dz) parts.push(Math.abs(dz) + (Math.abs(dz) === 1 ? ' block ' : ' blocks ') + (dz > 0 ? 'north' : 'south'));
    if (dx) parts.push(Math.abs(dx) + (Math.abs(dx) === 1 ? ' block ' : ' blocks ') + (dx > 0 ? 'east' : 'west'));
    return parts.length ? parts.join(', ') : 'here';
  }

  // builds one InstancedMesh from a list of towers; each block carries its rise delay, its tower id and whether it is the top
  function buildBlocks(list, camXZ) {
    let n = 0; list.forEach(function (t) { n += t.blocks + (t.voice ? 1 : 0); });
    const mesh = new THREE.InstancedMesh(blockGeo, blockMaterial(), Math.max(1, n));
    const rise = new Float32Array(Math.max(1, n)), tid = new Float32Array(Math.max(1, n)), top = new Float32Array(Math.max(1, n)), lit = new Float32Array(Math.max(1, n)).fill(1);
    const m = new THREE.Matrix4(), p = new THREE.Vector3(), q = new THREE.Quaternion(), s = new THREE.Vector3();
    let i = 0, maxD = 1;
    list.forEach(function (t) { maxD = Math.max(maxD, Math.hypot(t.x - camXZ.x, t.z - camXZ.y)); });
    list.forEach(function (t) {
      const d = Math.hypot(t.x - camXZ.x, t.z - camXZ.y) / maxD;
      const f = t.foot || 1;
      for (let k = 0; k < t.blocks; k++) {
        p.set(t.x, 0.25 + k * 0.5, t.z); s.set(f, 1, f); m.compose(p, q, s);
        mesh.setMatrixAt(i, m); mesh.setColorAt(i, t.id >= 0 ? blockColour(t, k) : kindColour(t.kind));
        rise[i] = d; tid[i] = t.id; top[i] = k === t.blocks - 1 ? 1 : 0; i++;
      }
      if (t.voice) { p.set(t.x, 0.25 + t.blocks * 0.5, t.z); s.set(f, 1, f); m.compose(p, q, s); mesh.setMatrixAt(i, m); mesh.setColorAt(i, kindColour('beacon')); rise[i] = d; tid[i] = t.id; top[i] = 2; i++; }
    });
    mesh.count = n;
    if (!mesh.instanceColor) mesh.setColorAt(0, new THREE.Color(0, 0, 0)); // an empty catalogue still needs the colour attribute the shader reads
    mesh.geometry = blockGeo.clone();
    mesh.geometry.setAttribute('aRise', new THREE.InstancedBufferAttribute(rise, 1));
    mesh.geometry.setAttribute('aTower', new THREE.InstancedBufferAttribute(tid, 1));
    mesh.geometry.setAttribute('aTop', new THREE.InstancedBufferAttribute(top, 1));
    mesh.geometry.setAttribute('aLit', new THREE.InstancedBufferAttribute(lit, 1));
    mesh.instanceMatrix.needsUpdate = true; if (mesh.instanceColor) mesh.instanceColor.needsUpdate = true;
    mesh.frustumCulled = false;
    mesh.userData.list = list;
    return mesh;
  }
  function recolour(mesh) {
    if (!mesh || !mesh.instanceColor) return;
    let i = 0;
    mesh.userData.list.forEach(function (t) {
      for (let k = 0; k < t.blocks; k++) mesh.setColorAt(i++, t.id >= 0 ? blockColour(t, k) : kindColour(t.kind));
      if (t.voice) mesh.setColorAt(i++, kindColour('beacon'));
    });
    mesh.instanceColor.needsUpdate = true;
  }
  // filler (12.3, city-flythrough 2): the empty lots inside the city and the dark beyond it, never on a street, never in a track's cell
  function buildFiller(count) {
    const r = rng(888), list = [];
    const b = city.bounds, lots = [];
    for (let x = b.cx0; x <= b.cx1; x++) for (let z = b.cz0; z <= b.cz1; z++) if (!walkable(x, z) && !city.cells[key(x, z)] && x !== -1) lots.push({ cx: x, cz: z });
    lots.forEach(function (c) { if (r() < 0.55 && list.length < count * 0.6) list.push({ id: -1, x: wx(c.cx), z: wz(c.cz), blocks: 2 + Math.floor(r() * 13), kind: r() < 0.5 ? 'filler-c' : 'filler-v', voice: false, foot: 0.8 + r() * 0.5 }); });
    let tries = 0;
    const midZ = (b.cz0 + b.cz1) / 2;
    while (list.length < count && tries++ < count * 20) {
      const rad = 14 + 76 * Math.sqrt(r()), a = r() * Math.PI * 2;
      const cx = Math.round(Math.cos(a) * rad / 2), cz = Math.round(midZ + Math.sin(a) * rad / 2);
      if (cx >= b.cx0 && cx <= b.cx1 && cz >= b.cz0 && cz <= b.cz1) continue;
      if (list.some(function (t) { return t.x === wx(cx) && t.z === wz(cz); })) continue;
      list.push({ id: -1, x: wx(cx), z: wz(cz), blocks: 2 + Math.floor(r() * 13), kind: r() < 0.5 ? 'filler-c' : 'filler-v', voice: false, foot: 0.8 + r() * 0.5 });
    }
    return buildBlocks(list, new THREE.Vector2(0, 0));
  }
  // lineage bridges (city-flythrough 2): a thin violet line from a child tower to its parent at the parent's half height
  function buildBridges() {
    if (bridges) { scene.remove(bridges); bridges.geometry.dispose(); bridges = null; }
    const pts = [];
    towers.forEach(function (t) { if (!t.parent) return; const p = towerOf(t.parent); if (!p) return; pts.push(t.x, p.blocks * 0.25, t.z, p.x, p.blocks * 0.25, p.z); });
    if (!pts.length) return;
    const g = new THREE.BufferGeometry(); g.setAttribute('position', new THREE.BufferAttribute(new Float32Array(pts), 3));
    bridges = new THREE.LineSegments(g, new THREE.LineBasicMaterial({ color: tok.violet, transparent: true, opacity: 0.6, blending: THREE.AdditiveBlending, depthWrite: false }));
    bridges.frustumCulled = false; scene.add(bridges);
  }

  function build() {
    scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(tok['bg-1'].getHex(), settings.fog);
    camera = new THREE.PerspectiveCamera(55, W / H, 0.1, 400);
    scene.add(camera);
    sky = new THREE.Mesh(new THREE.SphereGeometry(300, 32, 16), new THREE.ShaderMaterial({ uniforms: skyUniforms, vertexShader: SKY_VERT, fragmentShader: SKY_FRAG, side: THREE.BackSide, depthWrite: false, fog: false }));
    scene.add(sky);
    grid = new THREE.Mesh(new THREE.PlaneGeometry(400, 400), new THREE.ShaderMaterial({ uniforms: gridUniforms, vertexShader: GRID_VERT, fragmentShader: GRID_FRAG, transparent: true, depthWrite: false, blending: THREE.AdditiveBlending }));
    grid.rotation.x = -Math.PI / 2;
    grid.frustumCulled = false;
    scene.add(grid);
    // the horizon strip (12.3): a far flat ring in magenta that the bass lights
    horizon = new THREE.Mesh(new THREE.RingGeometry(60, 90, 64), new THREE.MeshBasicMaterial({ color: tok.magenta, transparent: true, opacity: 0.04, blending: THREE.AdditiveBlending, depthWrite: false, side: THREE.DoubleSide }));
    horizon.rotation.x = -Math.PI / 2; horizon.position.y = 0.02;
    scene.add(horizon);
    filler = buildFiller(settings.fillers);
    scene.add(filler);
    cat = buildBlocks([], new THREE.Vector2()); scene.add(cat);
    dead = buildBlocks([{ id: -1, x: 0, z: 0, blocks: 18, kind: 'dead', voice: false }], new THREE.Vector2()); dead.count = 0; dead.visible = false; scene.add(dead);
    // the ring of bars (12.4) and its mirror under the floor
    buildBars();
    // the ribbon (12.4)
    const rg = new THREE.BufferGeometry();
    rg.setAttribute('position', new THREE.BufferAttribute(new Float32Array(ribbonN * 3), 3));
    rg.setAttribute('color', new THREE.BufferAttribute(new Float32Array(ribbonN * 3), 3));
    ribbon = new THREE.Line(rg, new THREE.LineBasicMaterial({ vertexColors: true, transparent: true, blending: THREE.AdditiveBlending, depthWrite: false }));
    ribbon.frustumCulled = false;
    scene.add(ribbon);
    // the route (city-flythrough 6): an empty ribbon until the queue arrives
    route = new THREE.Mesh(new THREE.BufferGeometry(), new THREE.ShaderMaterial({ uniforms: routeUniforms, vertexShader: ROUTE_VERT, fragmentShader: ROUTE_FRAG, transparent: true, depthWrite: false, blending: THREE.AdditiveBlending, side: THREE.DoubleSide }));
    route.frustumCulled = false; route.visible = false;
    scene.add(route);
    // the beam (city-flythrough 8)
    const bg = new THREE.CylinderGeometry(0.2, 0.2, 60, 12, 1, true); bg.translate(0, 30, 0);
    beam = new THREE.Mesh(bg, new THREE.ShaderMaterial({ uniforms: beamUniforms, vertexShader: BEAM_VERT, fragmentShader: BEAM_FRAG, transparent: true, depthWrite: false, blending: THREE.AdditiveBlending, side: THREE.DoubleSide, fog: false }));
    beam.frustumCulled = false; beam.visible = false;
    scene.add(beam);
    // the tunnel (12.5), parented to the camera along its forward axis
    const tg = new THREE.WireframeGeometry(new THREE.CylinderGeometry(3, 3, 60, 24, 20, true));
    const tc = new Float32Array(tg.attributes.position.count * 3);
    for (let i = 0; i < tg.attributes.position.count; i++) {
      const y = tg.attributes.position.getY(i); const band = Math.floor((y + 30) / 3) % 2;
      const c = band ? tok.cyan : tok.violet; tc[i * 3] = c.r; tc[i * 3 + 1] = c.g; tc[i * 3 + 2] = c.b;
    }
    tg.setAttribute('color', new THREE.BufferAttribute(tc, 3));
    tunnel = new THREE.LineSegments(tg, new THREE.LineBasicMaterial({ vertexColors: true, transparent: true, opacity: 0, blending: THREE.AdditiveBlending, depthWrite: false }));
    tunnel.rotation.x = Math.PI / 2; tunnel.position.z = -25; tunnel.visible = false; tunnel.frustumCulled = false;
    camera.add(tunnel);
    // post: render, bloom (half resolution), fringing, output
    composer = new P.EffectComposer(renderer);
    composer.addPass(new P.RenderPass(scene, camera));
    bloom = new P.UnrealBloomPass(new THREE.Vector2(Math.max(1, W / 2), Math.max(1, H / 2)), settings.bloom[0], settings.bloom[1], settings.bloom[2]);
    composer.addPass(bloom);
    chroma = new P.ShaderPass(CHROMA);
    composer.addPass(chroma);
    composer.addPass(new P.OutputPass());
    C.bloom = bloom; C.chroma = chroma;
    applyView('standby', 0);
    orbitPose(pose.pos, pose.look);
  }
  function buildBars() {
    if (bars) { scene.remove(bars); scene.remove(barsMirror); }
    barCount = settings.bars;
    const g = new THREE.BoxGeometry(0.12, 1, 0.12); g.translate(0, 0.5, 0);
    const mat = new THREE.MeshBasicMaterial({ transparent: true, blending: THREE.AdditiveBlending, depthWrite: false });
    bars = new THREE.InstancedMesh(g, mat, barCount);
    barsMirror = new THREE.InstancedMesh(g, new THREE.MeshBasicMaterial({ transparent: true, opacity: 0.35, blending: THREE.AdditiveBlending, depthWrite: false }), barCount);
    barColors = [];
    for (let i = 0; i < barCount; i++) {
      const k = i / (barCount - 1);
      const c = k < 0.5 ? tok.cyan.clone().lerp(tok.violet, k * 2) : tok.violet.clone().lerp(tok.magenta, (k - 0.5) * 2);
      c.multiplyScalar(1.4); barColors.push(c);
      bars.setColorAt(i, c); barsMirror.setColorAt(i, c);
    }
    bars.frustumCulled = false; barsMirror.frustumCulled = false;
    scene.add(bars); scene.add(barsMirror);
  }
  // the route ribbon from the queue (city-flythrough 6)
  function buildRoute(list, current) {
    routeState.list = list.slice(); routeState.stops = []; routeState.points = []; routeState.len = 0;
    const from = towerOf(current);
    if (!from || !list.length) { route.visible = false; return; }
    let at = from.street;
    const pts = [new THREE.Vector3(wx(at.cx), 0, wz(at.cz))], colsAt = [0];
    list.forEach(function (slug, i) {
      const t = towerOf(slug); if (!t) return;
      const cells = routeCells(at, t.street);
      const seg = corners(cells);
      for (let k = 1; k < seg.length; k++) { pts.push(seg[k]); colsAt.push(i + 1); }
      routeState.stops.push({ slug: slug, n: i + 1, x: wx(t.street.cx), z: wz(t.street.cz), tower: t, blocks: blocksBetween(at, t.street), words: legWords(at, t.street) });
      at = t.street;
    });
    routeState.points = pts; routeState.len = polyLen(pts);
    // a flat ribbon 0.3 wide, a quad per segment, colour from magenta at the head to violet by the last stop, aT the distance along it
    const pos = [], col = [], aT = [], idx = [];
    let acc = 0;
    for (let i = 1; i < pts.length; i++) {
      const a = pts[i - 1], b = pts[i], d = b.distanceTo(a);
      const dir = new THREE.Vector3().subVectors(b, a).normalize(), n = new THREE.Vector3(-dir.z, 0, dir.x).multiplyScalar(0.15);
      const base = pos.length / 3;
      [a.clone().add(n), a.clone().sub(n), b.clone().add(n), b.clone().sub(n)].forEach(function (p, j) {
        pos.push(p.x, 0.03, p.z);
        const k = Math.min(1, (colsAt[j < 2 ? i - 1 : i]) / Math.max(1, list.length));
        const c = tok.magenta.clone().lerp(tok.violet, k).multiplyScalar(1.3);
        col.push(c.r, c.g, c.b); aT.push(acc + (j < 2 ? 0 : d));
      });
      idx.push(base, base + 1, base + 2, base + 1, base + 3, base + 2);
      acc += d;
    }
    const g = new THREE.BufferGeometry();
    g.setAttribute('position', new THREE.BufferAttribute(new Float32Array(pos), 3));
    g.setAttribute('aCol', new THREE.BufferAttribute(new Float32Array(col), 3));
    g.setAttribute('aT', new THREE.BufferAttribute(new Float32Array(aT), 1));
    g.setIndex(idx);
    route.geometry.dispose(); route.geometry = g; route.visible = pts.length > 1;
  }

  /* ---- the camera (12.3, 12.5, city-flythrough 4) ---- */
  function orbitPose(pos, look) {
    pos.set(cam.target.x + Math.cos(cam.angle) * cam.r, cam.target.y + cam.h, cam.target.z + Math.sin(cam.angle) * cam.r);
    look.copy(cam.target);
  }
  const fwd = new THREE.Vector3(), rgt = new THREE.Vector3();
  function streetPose(pos, look) {
    fwd.set(Math.sin(NAV.h), 0, Math.cos(NAV.h)); rgt.set(fwd.z, 0, -fwd.x);
    pos.set(NAV.x, NAV.y, NAV.z).addScaledVector(rgt, NAV.lat);
    look.copy(pos).addScaledVector(fwd, 8); look.y -= 0.6;
  }
  function wantedPose(pos, look) { if (NAV.mode === 'street' || NAV.mode === 'flight') streetPose(pos, look); else orbitPose(pos, look); }
  function fly(ms, bump) {
    if (reduced) { ms = 0; }
    if (ms <= 0) { flight = null; return; }
    flight = { from: { pos: pose.pos.clone(), look: pose.look.clone() }, t0: performance.now(), ms: ms, bump: bump || 0 };
    C.flying = true;
  }
  function targetFor(slug) {
    const t = towerOf(slug);
    if (!t) return new THREE.Vector3(0, 2, 0);
    return new THREE.Vector3(t.x, Math.max(1.5, t.blocks * 0.25), t.z);
  }
  // orbits wider than 12.3 wrote (9 / 4.5 and 5.5 / 2.2): at those radii the neighbouring towers' blocks filled the frame;
  // 13 / 6.5 and 7.5 / 3 keep the playing tower large and the city readable around it (departure, noted in 12.13). air is the
  // orbit of the fly-through's home view (city-flythrough 5): the page's radius, the tower left of centre, the rail on the right
  const VIEWS = { standby: { r: 26, h: 19, speed: 0.02 }, home: { r: 13, h: 6.5, speed: 0.045 }, air: { r: 7.5, h: 3, speed: 0.045 }, page: { r: 7.5, h: 3, speed: 0.045 }, guestbook: { r: 15, h: 8, speed: 0.03 }, dead: { r: 12, h: 5, speed: 0.04 } };
  function homeView() { return C.layout === 'air' ? 'air' : 'home'; }
  function applyView(view, ms) {
    if (view === 'home') view = homeView();
    const v = VIEWS[view] || VIEWS.home;
    C.view = view;
    cam.r = v.r; cam.h = v.h; cam.speed = reduced ? 0 : v.speed;
    // on air the tower is panned to about 87 % of the width on desktop: the halo lands beside the cards, the cards' panels carry the rest.
    // in the air the tower sits left of centre, beside the rail
    cam.side = C.phone ? 0 : (view === 'home' || view === 'page' || view === 'guestbook') ? v.r * 0.7 : view === 'air' ? -v.r * 0.22 : 0;
    cam.target.copy(view === 'standby' || view === 'dead' ? new THREE.Vector3(0, 2, 0) : targetFor(C.playing));
    dead.visible = view === 'dead';
    filler.visible = view !== 'dead';
    cat.visible = view !== 'dead';
    if (NAV.mode !== 'orbit') { NAV.mode = 'orbit'; NAV.path = null; }
    fly(ms, view === 'page' ? 0 : 1.5);
  }
  function inAir() { return C.layout === 'air' && C.view === 'air'; }
  // the orbit's current angle, so leaving or entering it never jumps
  function angleFrom(px, pz) { cam.angle = Math.atan2(pz - cam.target.z, px - cam.target.x); }
  // leave the orbit onto the nearest street, heading the way the camera already looks
  function toStreet() {
    if (NAV.mode === 'street') return;
    const c = nearestWalk(pose.pos.x, pose.pos.z);
    NAV.x = wx(c.cx); NAV.z = wz(c.cz);
    const dx = pose.look.x - pose.pos.x, dz = pose.look.z - pose.pos.z;
    const h = Math.atan2(dx, dz);
    NAV.hv = Math.round(h / (Math.PI / 2)) * (Math.PI / 2);
    // a heading with no street that way turns to one that has
    if (!aheadWalkable(NAV.hv, c)) { for (let i = 1; i < 4; i++) { const hh = NAV.hv + i * Math.PI / 2; if (aheadWalkable(hh, c)) { NAV.hv = hh; break; } } }
    NAV.h = NAV.hv; NAV.speed = 0; NAV.tspeed = 0; NAV.lat = 0; NAV.tlat = 0; NAV.turn = 0;
    NAV.mode = 'street'; NAV.path = null;
    fly(reduced ? 0 : 500, 0);
  }
  function headCell(h) { const sx = Math.round(Math.sin(h)), sz = Math.round(Math.cos(h)); return { dx: sx, dz: sz }; }
  function aheadWalkable(h, c) { const d = headCell(h); return walkable(c.cx + d.dx, c.cz + d.dz); }
  function wrapAngle(a) { while (a > Math.PI) a -= 2 * Math.PI; while (a < -Math.PI) a += 2 * Math.PI; return a; }
  // a flight along the streets to a tower's street-side cell (city-flythrough 5); lands in the orbit, or on the street without playing
  function streetFlight(slug, opts) {
    const t = towerOf(slug); if (!t) return false;
    opts = opts || {};
    const from = NAV.mode === 'street' ? cellOf(NAV.x, NAV.z) : nearestWalk(pose.pos.x, pose.pos.z);
    const cells = routeCells(from, t.street), pts = corners(cells);
    const len = polyLen(pts);
    if (len > 60 && !opts.cruise) return false; // too far: the tunnel
    if (NAV.mode !== 'street') { NAV.x = wx(from.cx); NAV.z = wz(from.cz); const dx = pose.look.x - pose.pos.x, dz = pose.look.z - pose.pos.z; NAV.h = NAV.hv = Math.atan2(dx, dz); }
    let speed = opts.speed || Math.max(12, len / 2.4);
    let dur = len / speed; if (!opts.cruise) dur = Math.max(1.2, Math.min(2.4, dur || 1.2));
    NAV.path = pts; NAV.pathLen = len; NAV.pathT = 0; NAV.pathDur = Math.max(0.2, dur); NAV.flightSlug = slug;
    NAV.onLand = opts.land || 'orbit';
    NAV.mode = 'flight'; NAV.speed = 0; NAV.tspeed = 0; NAV.lat = 0; NAV.tlat = 0; NAV.turn = 0;
    C.flying = true;
    fly(reduced ? 0 : 400, 0);
    return true;
  }
  function landFlight() {
    const slug = NAV.flightSlug, land = NAV.onLand;
    NAV.path = null; NAV.flightSlug = null; C.flying = false;
    if (land === 'orbit') {
      const t = towerOf(slug);
      if (t) { cam.target.copy(targetFor(slug)); angleFrom(pose.pos.x, pose.pos.z); }
      NAV.mode = 'orbit';
      fly(reduced ? 0 : 600, 0);
    } else {
      // on the street in front of the tower, facing it
      NAV.mode = 'street'; NAV.speed = 0; NAV.tspeed = 0;
      const t = towerOf(slug); if (t) { NAV.hv = Math.atan2(t.x - NAV.x, t.z - NAV.z); NAV.hv = Math.round(NAV.hv / (Math.PI / 2)) * (Math.PI / 2); }
    }
    if (C.onLand) C.onLand(slug, land);
  }
  // one frame of the street mode: the springs, the rail, the turns, the end of the street
  function stepStreet(dt) {
    const k = spring(dt);
    NAV.speed += (NAV.tspeed - NAV.speed) * k;
    NAV.lat += (NAV.tlat - NAV.lat) * k;
    NAV.h += wrapAngle(NAV.hv - NAV.h) * k;
    if (Math.abs(NAV.speed) < 0.01) { NAV.speed = 0; return; }
    const d = headCell(NAV.hv);
    const cur = cellOf(NAV.x, NAV.z);
    const cx0 = wx(cur.cx), cz0 = wz(cur.cz);
    const along = d.dx ? (NAV.x - cx0) * d.dx : (NAV.z - cz0) * d.dz; // signed distance past the cell centre
    const step = NAV.speed * dt;
    // an armed turn at this cell's centre, when a street goes that way
    if (NAV.turn && along <= 0 && along + step >= 0) {
      const hh = NAV.hv + NAV.turn * Math.PI / 2;
      if (aheadWalkable(hh, cur)) { NAV.x = cx0; NAV.z = cz0; NAV.hv = hh; NAV.turn = 0; return; }
    }
    // the end of the street: stop at the centre, turn around
    if (!walkable(cur.cx + d.dx, cur.cz + d.dz) && along + step >= 0) {
      NAV.x = cx0; NAV.z = cz0; NAV.speed = 0; NAV.tspeed = 0;
      NAV.hv += Math.PI; NAV.turn = 0;
      const now = performance.now();
      if (now - NAV.endSaid > 2000) { NAV.endSaid = now; say('end of the street. the city is behind you.', 'mid'); }
      return;
    }
    NAV.x += d.dx * step; NAV.z += d.dz * step;
  }
  const tmpP2 = new THREE.Vector3(), tmpD = new THREE.Vector3();
  function stepFlight(dt) {
    NAV.pathT += dt;
    const kk = clamp(NAV.pathT / NAV.pathDur, 0, 1), e = kk < 0.5 ? 2 * kk * kk : 1 - Math.pow(-2 * kk + 2, 2) / 2;
    const p = pointAlong(NAV.path, e * NAV.pathLen, tmpP2, tmpD);
    NAV.x = p.x; NAV.z = p.z;
    if (NAV.pathLen > 0.01) { NAV.hv = Math.atan2(tmpD.x, tmpD.z); NAV.h += wrapAngle(NAV.hv - NAV.h) * Math.min(1, spring(dt) * 1.6); }
    if (kk >= 1) landFlight();
  }

  /* ---- the public face: what the theme drives ---- */
  C.start = function (el, opts) {
    opts = opts || {};
    if (renderer) return true;
    try {
      canvas = el; C.phone = !!opts.phone; say = opts.say || say;
      if (C.phone) Object.assign(settings, PHONE);
      renderer = new THREE.WebGLRenderer({ canvas: canvas, antialias: false, alpha: false, powerPreference: 'high-performance' });
      renderer.toneMapping = THREE.ACESFilmicToneMapping; renderer.toneMappingExposure = 1.1;
      renderer.setClearColor(tok['bg-0'].getHex(), 1);
      renderer.info.autoReset = false; // the counters are read once a frame after every pass (city-flythrough 13), reset by hand
      sizeUp();
      build();
      sizeUp();
      window.addEventListener('resize', sizeUp);
      if (!reduced) {
        // the parallax is a quarter in the air (city-flythrough 5): the pointer picks towers there and a camera that chases it would move the target
        window.addEventListener('pointermove', function (e) { if (NAV.mode === 'flight') return; const k = inAir() ? 0.25 : 1; parallax.tx = (e.clientX / innerWidth - 0.5) * 1.6 * k; parallax.ty = -(e.clientY / innerHeight - 0.5) * 0.8 * k; }, { passive: true });
        if (C.phone) window.addEventListener('deviceorientation', function (e) { if (e.gamma == null) return; parallax.tx = Math.max(-1, Math.min(1, e.gamma / 30)) * 0.8; parallax.ty = Math.max(-1, Math.min(1, (e.beta - 45) / 30)) * 0.4; }, { passive: true });
      }
      C.running = true;
      requestAnimationFrame(frame);
      return true;
    } catch (e) {
      C.ok = false; C.running = false; C.error = String(e && e.message || e);
      return false;
    }
  };
  function sizeUp() {
    if (!renderer) return;
    W = Math.max(2, innerWidth); H = Math.max(2, innerHeight);
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    prBase = C.phone ? Math.max(1, dpr / 2) : dpr;
    pr = Math.max(1, prBase * (C.ladder >= 1 ? 0.75 : 1));
    renderer.setPixelRatio(pr);
    renderer.setSize(W, H, false);
    if (camera) { camera.aspect = W / H; camera.updateProjectionMatrix(); }
    if (composer) { composer.setPixelRatio(pr); composer.setSize(W, H); }
    if (bloom) bloom.resolution.set(Math.max(1, W / (C.ladder >= 2 ? 4 : 2)), Math.max(1, H / (C.ladder >= 2 ? 4 : 2)));
  }
  C.stop = function () { C.running = false; };
  C.resume = function () { if (renderer && !C.running) { C.running = true; clock.last = 0; requestAnimationFrame(frame); } };
  // the catalogue: the city laid out from the index (city-flythrough 2); the camera keeps its street cell across a rebuild
  C.setCatalogue = function (tracks) {
    layoutCity(tracks || []);
    if (!scene) return;
    scene.remove(cat); cat.geometry.dispose();
    const camXZ = new THREE.Vector2(pose.pos.x, pose.pos.z);
    cat = buildBlocks(towers, camXZ);
    cat.visible = C.view !== 'dead';
    scene.add(cat);
    scene.remove(filler); filler.geometry.dispose(); filler = buildFiller(settings.fillers); filler.visible = C.view !== 'dead'; scene.add(filler);
    buildBridges();
    if (C.playing) { const t = towerOf(C.playing); blockUniforms.uPlaying.value = t ? t.id : -99; cam.target.copy(targetFor(C.playing)); placeBeam(); }
    if (cursor) cursor = towerOf(cursor.slug);
    if (NAV.mode === 'street') { const c = nearestWalk(NAV.x, NAV.z); NAV.x = wx(c.cx); NAV.z = wz(c.cz); }
    if (routeState.list.length) buildRoute(routeState.list, C.playing);
    if (C.filterSlugs) C.setFilter(C.filterWords, C.filterSlugs);
  };
  function placeBeam() {
    const t = towerOf(C.playing);
    beam.visible = !!t && C.view !== 'standby' && C.view !== 'dead';
    if (t) beam.position.set(t.x, t.blocks * 0.5, t.z);
  }
  // the playing tower: the camera orbits it; ms > 0 flies there: along the streets when the tower is near, through the tunnel beyond 60 units
  C.setPlaying = function (slug, ms, withTunnel) {
    C.playing = slug;
    const t = towerOf(slug);
    blockUniforms.uPlaying.value = t ? t.id : -99;
    if (!scene) return;
    cam.target.copy(targetFor(slug));
    placeBeam();
    if (ms > 0) {
      if (inAir() && t && streetFlight(slug, { land: 'orbit' })) { const s = routeState.stops; say('flying to ' + slug + '.' + (s.length && s[0].slug === slug ? ' ' + s[0].words + '.' : ''), 'mid'); return; }
      if (inAir() && t) say('too far to fly. the tunnel.', 'mid');
      NAV.mode = 'orbit'; NAV.path = null;
      fly(ms, 3); if (withTunnel && !reduced) C.tunnel(ms);
    }
  };
  C.tunnel = function (ms) { tunnelUntil = performance.now() + (ms || 1200); C.tunnelOn = true; };
  C.setView = function (view, ms) { if (!scene) { C.view = view; return; } applyView(view, ms == null ? settings.flight : ms); };
  C.setLayout = function (name, ms) {
    C.layout = name;
    if (!scene) return;
    if (C.view === 'home' || C.view === 'air') applyView('home', ms == null ? settings.flight : ms);
  };
  // the boot (12.5, 12.10): the grid draws itself, the towers rise. warm is the 900 ms warm start.
  C.boot = function (warm) {
    bootT = { t0: performance.now(), warm: !!warm };
    gridUniforms.uDraw.value = 0; blockUniforms.uRise.value = 0;
  };
  C.scheme = function () {
    readTokens();
    if (!scene) return;
    recolour(filler); recolour(cat); recolour(dead);
    gridUniforms.uCyan.value = tok.cyan; gridUniforms.uViolet.value = tok.violet;
    skyUniforms.uMagenta.value = tok.magenta; skyUniforms.uHaze.value = tok.haze;
    horizon.material.color = tok.magenta; beamUniforms.uColor.value = tok.magenta;
    if (bridges) bridges.material.color = tok.violet;
    buildBars();
    if (routeState.list.length) buildRoute(routeState.list, C.playing);
  };
  C.deadBuild = function (n) { deadBlocks = n; };
  C.postOff = function () {
    C.bloomOn = false; C.chromaOn = false;
    if (bloom) bloom.enabled = false; if (chroma) chroma.enabled = false;
  };
  // the queue as a route (city-flythrough 6)
  C.setQueue = function (list, current) { if (!scene) { routeState.list = list.slice(); return; } buildRoute(list, current || C.playing); };
  C.route = function () { return routeState; };
  // a find lights the matching towers and dims the rest (city-flythrough 7)
  C.setFilter = function (words, slugs) {
    C.filterWords = words; C.filterSlugs = words ? slugs : null;
    if (!scene || !cat.geometry.attributes.aLit) return;
    const a = cat.geometry.attributes.aLit, set = {};
    (slugs || []).forEach(function (s) { set[s] = true; });
    let i = 0;
    cat.userData.list.forEach(function (t) { const v = set[t.slug] ? 1 : 0.25; for (let k = 0; k < t.blocks; k++) a.array[i++] = v; if (t.voice) a.array[i++] = v; });
    a.needsUpdate = true;
    filterOn = words ? 1 : 0;
    if (words && slugs && slugs.length && NAV.mode === 'street') {
      // the city points: the heading turns toward the nearest lit tower, the camera does not move
      let best = null, bd = 1e9;
      slugs.forEach(function (s) { const t = towerOf(s); if (!t) return; const d = Math.hypot(t.x - NAV.x, t.z - NAV.z); if (d < bd) { bd = d; best = t; } });
      if (best) { const h = Math.atan2(best.x - NAV.x, best.z - NAV.z); NAV.hv = Math.round(h / (Math.PI / 2)) * (Math.PI / 2); }
    }
  };
  C.litCount = function () { return C.filterSlugs ? C.filterSlugs.length : null; };
  // the cursor tower (city-flythrough 5): from the pointer or from the station's highlight
  C.setCursor = function (slug) { cursor = slug ? towerOf(slug) : null; };
  C.cursor = function () { return cursor; };
  C.towers = function () { return towers; };
  C.city = function () { return city; };
  C.nav = function () { return NAV; };
  // steering (city-flythrough 4): the station's keys, the wheel and the pointer come through these
  C.input = function () { NAV.lastInput = performance.now(); if (NAV.cruising) { NAV.cruising = false; NAV.cruise = false; if (NAV.mode === 'flight') { NAV.onLand = 'street'; } say('landed. your hands.', 'mid'); } };
  C.accel = function (notches) {
    if (!inAir()) return false;
    C.input();
    if (NAV.mode === 'orbit') toStreet();
    if (NAV.mode === 'flight') return true;
    const want = NAV.tspeed + notches * 2;
    if (want < 0) { if (NAV.tspeed <= 0.01) { NAV.hv += Math.PI; NAV.tspeed = 2; } else NAV.tspeed = 0; }
    else NAV.tspeed = Math.min(16, want);
    return true;
  };
  C.turn = function (dir) {
    if (!inAir()) return false;
    C.input();
    if (NAV.mode === 'orbit') toStreet();
    if (NAV.mode === 'flight') return true;
    const now = performance.now();
    if (NAV.turn === dir && now - NAV.turnAt < 400) { NAV.hv += Math.PI; NAV.turn = 0; return true; } // twice fast: a U-turn
    NAV.turn = NAV.turn === dir ? 0 : dir; NAV.turnAt = now;
    if (NAV.turn && NAV.tspeed < 2) NAV.tspeed = 2;
    return true;
  };
  C.drift = function (k) { NAV.tlat = clamp(k, -1, 1) * 0.6; };
  C.armTurn = function (dir) { if (NAV.mode === 'street' && NAV.turn !== dir) { NAV.turn = dir; NAV.turnAt = performance.now(); } };
  // fly to a tower without playing it: lands on the street in front of it
  C.flyTo = function (slug) {
    if (!inAir()) return 'deck';
    const t = towerOf(slug); if (!t) return 'unknown';
    C.input();
    if (!streetFlight(slug, { land: 'street' })) { NAV.mode = 'orbit'; cam.target.copy(targetFor(slug)); fly(settings.flight, 3); C.tunnel(settings.flight); NAV.flightSlug = slug; return 'tunnel'; }
    return 'street';
  };
  C.flyToCell = function (cx, cz) {
    if (!inAir()) return false;
    C.input();
    const from = NAV.mode === 'street' ? cellOf(NAV.x, NAV.z) : nearestWalk(pose.pos.x, pose.pos.z);
    const to = nearestWalk(wx(cx), wz(cz));
    const pts = corners(routeCells(from, to)), len = polyLen(pts);
    if (NAV.mode !== 'street') { NAV.x = wx(from.cx); NAV.z = wz(from.cz); const dx = pose.look.x - pose.pos.x, dz = pose.look.z - pose.pos.z; NAV.h = NAV.hv = Math.atan2(dx, dz); }
    NAV.path = pts; NAV.pathLen = len; NAV.pathT = 0; NAV.pathDur = Math.max(1.2, Math.min(4, len / 16)); NAV.flightSlug = null; NAV.onLand = 'street'; NAV.mode = 'flight'; C.flying = true;
    fly(reduced ? 0 : 400, 0);
    return true;
  };
  C.back = function () { // esc: back to the orbit of the playing tower
    if (NAV.mode === 'orbit' && !flight) return false;
    C.input();
    NAV.mode = 'orbit'; NAV.path = null; C.flying = false;
    cam.target.copy(targetFor(C.playing)); angleFrom(pose.pos.x, pose.pos.z);
    fly(reduced ? 0 : 700, 1);
    return true;
  };
  // the cruise (city-flythrough 10): armed by the hidden interface, it leaves after 4 s without input and follows the route to the next stop
  C.cruise = function (on) { NAV.cruise = !!on; NAV.cruising = false; NAV.cruiseAt = performance.now() + 4000; if (!on && NAV.mode === 'flight') NAV.onLand = 'orbit'; };
  C.cruising = function () { return NAV.cruising; };
  function startCruise(remaining) {
    const s = routeState.stops[0];
    if (!s || !inAir()) { NAV.cruising = true; return; }
    const from = NAV.mode === 'street' ? cellOf(NAV.x, NAV.z) : nearestWalk(pose.pos.x, pose.pos.z);
    const len = polyLen(corners(routeCells(from, s.tower.street)));
    const speed = clamp(len / Math.max(1, remaining || 60), 1.5, 6);
    NAV.cruising = true;
    streetFlight(s.slug, { land: 'street', cruise: true, speed: speed });
    say('cruise. nobody is flying this.', 'mid');
  }
  C.cruiseTick = function (remaining) {
    if (!NAV.cruise || NAV.cruising || !scene) return;
    if (performance.now() < NAV.cruiseAt || performance.now() - NAV.lastInput < 4000) return;
    startCruise(remaining);
  };
  C.where = function () {
    const c = NAV.mode === 'street' || NAV.mode === 'flight' ? cellOf(NAV.x, NAV.z) : nearestWalk(pose.pos.x, pose.pos.z);
    let day = null; city.days.forEach(function (d) { if (c.cz >= d.cz0 - 1 && c.cz <= d.cz1) day = d.day; });
    let district = null; city.districts.forEach(function (s) { if (c.cx >= s.cx0 - 1 && c.cx <= s.cx1 + 1) district = s.name; });
    const hv = NAV.mode === 'orbit' ? Math.atan2(pose.look.x - pose.pos.x, pose.look.z - pose.pos.z) : NAV.hv;
    const q = Math.round(hv / (Math.PI / 2)) & 3, heading = ['north', 'east', 'south', 'west'][q];
    const off = c.cx === 0 ? 'on the avenue' : Math.abs(c.cx) + (Math.abs(c.cx) === 1 ? ' block ' : ' blocks ') + (c.cx > 0 ? 'east' : 'west') + ' of the avenue';
    return { day: day, district: district, heading: heading, mode: NAV.mode, cell: c, text: (day || 'the edge') + (district ? ' and ' + district : ''), off: off };
  };
  // the screen position of a world point, for the readout, the brackets, the pins and the signs
  const tmpProj = new THREE.Vector3();
  C.project = function (x, y, z) {
    tmpProj.set(x, y, z).project(camera);
    return { x: (tmpProj.x + 1) / 2 * W, y: (1 - tmpProj.y) / 2 * H, behind: tmpProj.z > 1 || tmpProj.z < -1, d: Math.hypot(x - camera.position.x, z - camera.position.z) };
  };
  C.cameraXZ = function () { return { x: camera ? camera.position.x : 0, z: camera ? camera.position.z : 0 }; };
  // picking (city-flythrough 5): the nearest tower centre to the pointer on screen, within a radius and 40 units
  C.pick = function (px, py, radius) {
    let best = null, bd = radius * radius;
    for (let i = 0; i < towers.length; i++) {
      const t = towers[i];
      const p = C.project(t.x, t.blocks * 0.25, t.z);
      if (p.behind || p.d > 40) continue;
      if (C.filterSlugs && C.filterSlugs.indexOf(t.slug) < 0) continue;
      const d = (p.x - px) * (p.x - px) + (p.y - py) * (p.y - py);
      if (d < bd) { bd = d; best = t; }
    }
    return best;
  };
  C.perf = function () { return { p50: +perf.p50.toFixed(1), p95: +perf.p95.toFixed(1), calls: perf.calls || 0, triangles: perf.tris || 0, instances: cat ? cat.count + filler.count : 0, pixelRatio: +pr.toFixed(2), ladder: C.ladder }; };

  /* ---- the frame ---- */
  const tmpV = new THREE.Vector3(), tmpR = new THREE.Vector3(), tmpU = new THREE.Vector3(0, 1, 0), tmpM = new THREE.Matrix4(), tmpS = new THREE.Vector3(), tmpQ = new THREE.Quaternion(), tmpP = new THREE.Vector3();
  function ease(k) { return k < 0.5 ? 4 * k * k * k : 1 - Math.pow(-2 * k + 2, 3) / 2; }
  function frame(now) {
    if (!C.running) return;
    requestAnimationFrame(frame);
    if (document.hidden) { clock.last = 0; return; }
    const dt = clock.last ? Math.min(0.1, (now - clock.last) / 1000) : 0.016;
    clock.last = now; clock.t += dt;
    const t0 = performance.now();
    const A = NOBODY.vis && NOBODY.vis.analyser;
    if (renderer.info) renderer.info.reset();

    // the boot tweens
    if (bootT) {
      const s = (now - bootT.t0) / 1000;
      if (bootT.warm) { gridUniforms.uDraw.value = Math.min(1, s / 0.9); blockUniforms.uRise.value = Math.min(1, s / 0.9); }
      else { gridUniforms.uDraw.value = Math.max(0, Math.min(1, (s - 0.4) / 1.4)); blockUniforms.uRise.value = Math.max(0, Math.min(1, (s - 1.0) / 1.6)); }
      if (s > 3) bootT = null;
    } else if (gridUniforms.uDraw.value < 1) { gridUniforms.uDraw.value = 1; blockUniforms.uRise.value = 1; }

    // the numbers: levels, loudness, bass (from the analyser or the ghost, 12.4)
    let lv = null, loud = 0, wave = 0;
    if (A && A.v64) { lv = A.v64; loud = A.loud || 0; bass = A.bass || 0; wave = A.waveHead || 0; }
    pulse += ((loud || 0) - pulse) * 0.25;
    blockUniforms.uPulse.value = pulse;
    blockUniforms.uTime.value = clock.t;
    skyUniforms.uBass.value = bass;
    horizon.material.opacity = 0.02 + 0.08 * bass;
    filterK += (filterOn - filterK) * Math.min(1, dt / 0.3);
    blockUniforms.uFilter.value = filterK;
    routeUniforms.uTime.value = clock.t;
    beamUniforms.uPulse.value = reduced ? 0 : pulse;
    beam.scale.set(1 + 0.5 * pulse, 1, 1 + 0.5 * pulse);

    // the camera: the orbit turns, the street advances, the flight follows its path
    cam.angle += cam.speed * dt;
    if (NAV.mode === 'street') stepStreet(dt); else if (NAV.mode === 'flight') stepFlight(dt);
    wantedPose(tmpV, tmpP);
    if (flight) {
      const k = Math.min(1, (now - flight.t0) / flight.ms), e = ease(k);
      pose.pos.lerpVectors(flight.from.pos, tmpV, e); pose.pos.y += Math.sin(Math.PI * k) * flight.bump;
      pose.look.lerpVectors(flight.from.look, tmpP, e);
      if (k >= 1) { flight = null; if (NAV.mode !== 'flight') C.flying = false; }
    } else { pose.pos.copy(tmpV); pose.look.copy(tmpP); }
    parallax.x += (parallax.tx - parallax.x) * 0.08; parallax.y += (parallax.ty - parallax.y) * 0.08;
    const wantSide = NAV.mode === 'orbit' ? cam.side : 0;
    cam.sideNow += (wantSide - cam.sideNow) * Math.min(1, dt / 0.6);
    camera.position.copy(pose.pos);
    camera.lookAt(pose.look);
    tmpR.set(1, 0, 0).applyQuaternion(camera.quaternion);
    // the pan: camera and look-at move together along the camera's right axis, so the tower slides to the side of the frame
    const px = NAV.mode === 'flight' ? 0 : parallax.x, py = NAV.mode === 'flight' ? 0 : parallax.y;
    camera.position.addScaledVector(tmpR, px - cam.sideNow).addScaledVector(tmpU, py);
    camera.lookAt(tmpP.copy(pose.look).addScaledVector(tmpR, -cam.sideNow));
    sky.position.copy(camera.position);
    gridUniforms.uCam.value.set(camera.position.x, camera.position.z);

    // the tunnel (12.5)
    if (tunnelUntil > now) { tunnelFade = Math.min(1, tunnelFade + dt / 0.15); } else { tunnelFade = Math.max(0, tunnelFade - dt / 0.25); if (tunnelFade === 0) C.tunnelOn = false; }
    tunnel.visible = tunnelFade > 0;
    if (tunnel.visible) { tunnel.material.opacity = tunnelFade * 0.9; tunnel.position.z += 40 * dt; if (tunnel.position.z > -22) tunnel.position.z -= 3; }
    const wantChroma = (C.phone || reduced || C.ladder >= 3) ? 0 : (0.0022 + tunnelFade * (0.012 - 0.0022));
    chromaAmt += (wantChroma - chromaAmt) * 0.2;
    if (chroma) chroma.uniforms.uAmount.value = chromaAmt;

    // the ring of bars and the ribbon around the playing tower (12.4); hidden in standby and dead air, and when the hidden interface says no visualiser
    const onAir = C.view !== 'standby' && C.view !== 'dead' && C.playing && !(C.noViz && C.noViz());
    bars.visible = barsMirror.visible = ribbon.visible = !!onAir;
    if (onAir) {
      const tg = targetFor(C.playing), base = 0;
      for (let i = 0; i < barCount; i++) {
        const li = lv ? lv[Math.floor(i / barCount * lv.length)] : 0;
        const h = 0.1 + 3.2 * Math.pow(li, 1.2), a = i / barCount * Math.PI * 2 + clock.t * 0.05;
        tmpP.set(tg.x + Math.cos(a) * 2.4, base, tg.z + Math.sin(a) * 2.4);
        tmpS.set(1, h, 1); tmpM.compose(tmpP, tmpQ, tmpS); bars.setMatrixAt(i, tmpM);
        tmpS.set(1, -h * 0.8, 1); tmpM.compose(tmpP, tmpQ, tmpS); barsMirror.setMatrixAt(i, tmpM);
      }
      bars.instanceMatrix.needsUpdate = true; barsMirror.instanceMatrix.needsUpdate = true;
      for (let i = ribbonN - 1; i > 0; i--) ribbonWave[i] = ribbonWave[i - 1];
      ribbonWave[0] = wave;
      const pa = ribbon.geometry.attributes.position, ca = ribbon.geometry.attributes.color;
      for (let i = 0; i < ribbonN; i++) {
        const a = cam.angle - i * (Math.PI * 2 / ribbonN) * 0.9;
        pa.setXYZ(i, tg.x + Math.cos(a) * 3.4, 1.2 + ribbonWave[i] * 1.0, tg.z + Math.sin(a) * 3.4);
        const f = Math.pow(1 - i / ribbonN, 1.5) * 1.6;
        ca.setXYZ(i, tok.magenta.r * f, tok.magenta.g * f, tok.magenta.b * f);
      }
      pa.needsUpdate = true; ca.needsUpdate = true;
    }

    // dead air: the unlit tower builds block by block (12.3)
    if (C.view === 'dead') {
      if (now - deadAt > 1200) { deadAt = now; deadBlocks = deadBlocks >= 18 ? 0 : deadBlocks + 1; }
      dead.count = deadBlocks;
    }

    composer.render();
    if (renderer.info && renderer.info.render) { perf.calls = renderer.info.render.calls; perf.tris = renderer.info.render.triangles; }
    C.frames++;
    if (C.onFrame) C.onFrame(now);
    const ms = performance.now() - t0;
    C.ms += (ms - C.ms) * 0.1;
    // the running probe (city-flythrough 13, a ladder): the 95th percentile of the last 120 frames, checked every 2 s
    perf.ring[perf.n % 120] = ms; perf.n++;
    if (now - perf.checkedAt > 2000 && perf.n >= 60) {
      perf.checkedAt = now;
      const arr = Array.from(perf.ring.subarray(0, Math.min(120, perf.n))).sort(function (a, b) { return a - b; });
      perf.p50 = arr[Math.floor(arr.length * 0.5)]; perf.p95 = arr[Math.min(arr.length - 1, Math.floor(arr.length * 0.95))];
      if (!NOPROBE) {
        if (perf.p95 > 18) { perf.over++; perf.under = 0; if (perf.over >= 2) { perf.over = 0; ladderStep(1); } }
        else if (perf.p95 < 10) { perf.under++; perf.over = 0; if (perf.under >= 5) { perf.under = 0; ladderStep(-1); } }
        else { perf.over = 0; perf.under = 0; }
      }
    }
  }
  // the ladder: 1 pixel ratio x .75, 2 the bloom at a quarter, 3 the bloom and the fringing off (printed once), 4 the filler halved and the chevrons still
  function ladderStep(dir) {
    const next = clamp(C.ladder + dir, 0, 4);
    if (next === C.ladder) return;
    C.ladder = next;
    sizeUp();
    if (bloom) bloom.enabled = next < 3; if (chroma) chroma.enabled = next < 3;
    C.bloomOn = next < 3; C.chromaOn = next < 3;
    if (next === 3 && dir > 0) say('city: bloom off. this machine is slow. nobody minds.', 'mid');
    routeUniforms.uStill.value = (next >= 4 || reduced) ? 1 : 0;
    if (filler) { const all = filler.userData.list.reduce(function (n, t) { return n + t.blocks; }, 0); filler.count = next >= 4 ? Math.floor(all / 2) : all; }
  }

  C.dispose = function () {
    C.running = false;
    window.removeEventListener('resize', sizeUp);
    try { if (composer) composer.dispose(); if (renderer) renderer.dispose(); } catch (e) {}
  };
  return C;
}

NOBODY.themes.city = (function () {
  const TH = { name: 'city', blurb: 'a city of data at night. neon, glass, bloom. fly it.' };
  let ctx = null, V = null, A = null, glass = null, power = null, S = null;
  let scene = null, canvas = null, cssgrid = null, horizon = null, scanrect = null, odoRing = null, nocityTimer = 0;
  let scopeCanvas = null, scopeCtx = null, dialStrip = null, pendingView = null;
  let gainHold = 1;
  // the fly-through's own elements (city-flythrough 5, 6, 8): one readout, one bracket, one edge marker, a few HUD chips
  const UI = { readout: null, bracket: null, marker: null, hud: null, chips: [], pins: [], flyBtn: null, cursorSlug: null, readoutSlug: null, readoutAt: 0, readoutSettle: 0, readoutAtCursor: null, hover: null, pointerAt: 0, px: null, py: null, edgeAt: 0, edgeDir: 0, hint: 0, layout: 'deck', tap: null };
  function el(id) { return ctx.el[id] || document.getElementById(id); }
  function token(name) { return getComputedStyle(document.documentElement).getPropertyValue(name).trim(); }
  function say(text, cls) { if (ctx && ctx.T) ctx.T.print(text, cls); }
  function clamp(v, a, b) { return Math.max(a, Math.min(b, v)); }

  /* ---- strings (12.10): the connect sequence, the same eight lines at the same times as the BIOS ---- */
  TH.strings = {
    boot: function (n, voices, phone, localOnly, backend) {
      const vtxt = voices === 1 ? '1 with a voice' : voices + ' with a voice';
      const ttxt = n === 1 ? '1 tower' : n + ' towers';
      if (phone) return [
        ['NOBODY NET  88.8', ''], ['link ........ ', 'dialling ... ok'], ['handshake ... ', 'ok'], ['grid ........ ', 'drawn'],
        ['aerial ...... ', 'found'], ['catalogue ... ', ttxt + ', ' + voices + ' voice'], ['backend ..... ', localOnly ? 'not on the wire' : 'on the wire'], ['audio ....... ', 'waiting for a human', 'amber']
      ];
      return [
        ['NOBODY NET  carrier 88.8', ''], ['link ............... ', 'dialling ... 2400 baud ok'], ['handshake .......... ', 'ok'],
        ['grid ............... ', 'drawn'], ['aerial ............. ', 'found'],
        ['catalogue .......... tracks/index.json .... ', ttxt + ', ' + vtxt], ['backend ............ ', localOnly ? 'not on the wire (local mode)' : backend],
        ['audio .............. ', 'waiting for a human', 'amber']
      ];
    },
    wait: function (phone) { return phone ? '[ tap the glass to go on air ]' : '[ press any key, or tap the glass, to go on air ]'; },
    tagline: 'the transmitter nobody can find.',
    licence: 'nobody fm. every track generated locally from a text prompt. no samples, no reference audio, no third-party rights claimed. best watched from the air at night.',
    switched: 'theme: city. the glass goes flat and the city comes up. f flies.',
    idle: 'idle. paused for ten minutes. the city turns anyway.'
  };

  /* ---- the interface paradigm (12.0, the hooks; city-flythrough 14) ---- */
  TH.interface = function () { return { kind: 'flythrough', keys: ['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'f'], layouts: V && V.phone() ? ['deck', 'air'] : ['air', 'deck'] }; };
  TH.help = function () {
    return [['up down', 'fly: speed'], ['left right', 'fly: turn at the next street'], ['f', 'the air or the deck'], ['j k', 'the cursor tower'], ['enter', 'fly in and play'], ['q', 'route it next'], ['esc', 'back to the orbit, then the deck']];
  };
  TH.commands = function () {
    return {
      fly: function (a) {
        if (!scene) { say('no city here. the list is the city.', 'mid'); return; }
        if (!a) { ctx.setLayout('air'); return; }
        const t = ctx.tracks().find(function (x) { return x.slug === a; }) || ctx.tracks().find(function (x) { return x.slug.indexOf(a) >= 0; });
        if (!t) { say('nobody knows "' + a + '".', 'err'); return; }
        if (UI.layout !== 'air') ctx.setLayout('air');
        const how = scene.flyTo(t.slug);
        if (how === 'tunnel') say('too far to fly. the tunnel.', 'mid'); else if (how === 'street') say('flying to ' + t.slug + '.', 'mid');
      },
      deck: function () { ctx.setLayout('deck'); },
      route: function () {
        if (!scene) { say('no city here. the list is the city.', 'mid'); return; }
        const r = scene.route();
        if (!r.stops.length) { say('no route. the queue refills itself. nobody stops.', 'mid'); return; }
        const total = r.stops.reduce(function (n, s) { return n + s.blocks; }, 0);
        const lines = ['route: ' + r.stops.length + (r.stops.length === 1 ? ' stop, ' : ' stops, ') + total + ' blocks.'];
        r.stops.forEach(function (s) { lines.push('  ' + s.n + '  ' + s.slug.padEnd(30).slice(0, 30) + ' ' + s.words); });
        ctx.T.printScroll(lines);
      },
      cruise: function () { if (!scene) { say('no city here. the list is the city.', 'mid'); return; } if (UI.layout !== 'air') ctx.setLayout('air'); scene.cruise(true); scene.nav().cruiseAt = 0; scene.nav().lastInput = 0; scene.cruiseTick(remaining()); },
      land: function () { if (!scene) return; if (scene.cruising()) scene.input(); else say('your hands already.', 'mid'); },
      district: function (a) {
        if (!scene) { say('no city here. the list is the city.', 'mid'); return; }
        const d = scene.city().districts;
        if (!a) { say('districts: ' + d.map(function (s) { return s.name + ' ' + s.count; }).join(', ') + '. district <name> flies there.', 'mid'); return; }
        const s = d.find(function (x) { return x.name === a.toLowerCase(); }) || d.find(function (x) { return x.name.indexOf(a.toLowerCase()) >= 0; });
        if (!s) { say('no district called "' + a + '".', 'err'); return; }
        if (UI.layout !== 'air') ctx.setLayout('air');
        scene.flyToCell(s.east ? s.cx0 - 1 : s.cx1 + 1, 0); say('flying to ' + s.name + '.', 'mid');
      },
      where: function () {
        if (!scene) { say('no city here. the list is the city.', 'mid'); return; }
        const w = scene.where();
        say(w.text + ', ' + w.off + ', heading ' + w.heading + (w.mode === 'orbit' ? ', in the orbit.' : '.'));
      }
    };
  };
  function remaining() { const d = ctx.deck; return d && d.duration ? Math.max(0, d.duration - d.currentTime) : 60; }
  TH.keys = function (e) {
    if (!scene) return false;
    if (UI.layout !== 'air') { if (e.key === 'f' || e.key === 'F') { ctx.setLayout('air'); return true; } return false; }
    switch (e.key) {
      case 'ArrowUp': return scene.accel(1);
      case 'ArrowDown': return scene.accel(-1);
      case 'ArrowLeft': return scene.turn(-1);
      case 'ArrowRight': return scene.turn(1);
      case 'f': case 'F': ctx.setLayout('deck'); return true;
    }
    return false;
  };
  TH.layout = function (name) {
    UI.layout = name;
    if (UI.flyBtn) UI.flyBtn.textContent = name === 'air' ? 'deck' : 'fly';
    if (!scene) return;
    scene.setLayout(name, V.phone() ? 500 : 700);
    if (name !== 'air') hideReadout();
  };
  TH.highlight = function (slug) { if (!scene) return; if (slug !== UI.cursorSlug) { UI.cursorSlug = slug; scene.setCursor(slug); if (UI.hover && UI.hover.slug !== slug) UI.hover = null; } };
  TH.queue = function (list, current) { if (scene) scene.setQueue(list, current); };
  TH.filter = function (words, slugs) {
    if (!scene) return;
    scene.setFilter(words, slugs);
    if (words) say('find: ' + slugs.length + (slugs.length === 1 ? ' tower lit.' : ' towers lit.') + ' the rest went dark.', 'mid'); else say('find cleared. the city is back.', 'mid');
  };
  // the hidden interface (#52) is the cruise (city-flythrough 10)
  TH.hidden = function (on) {
    if (!scene) return;
    if (on) { if (UI.layout !== 'air') ctx.setLayout('air'); scene.cruise(true); }
    else { scene.cruise(false); hideReadout(); }
    document.body.classList.toggle('city-cruise', !!on);
  };

  /* ---- lifecycle ---- */
  TH.init = function (c) {
    ctx = c; V = c.V; A = c.A; glass = c.glass; power = c.power; S = c.S;
    canvas = document.createElement('canvas'); canvas.id = 'cityCanvas'; canvas.className = 'city'; canvas.setAttribute('aria-hidden', 'true');
    cssgrid = document.createElement('div'); cssgrid.className = 'cssgrid'; cssgrid.setAttribute('aria-hidden', 'true');
    document.body.insertBefore(cssgrid, document.body.firstChild);
    document.body.insertBefore(canvas, document.body.firstChild);
    horizon = document.createElement('div'); horizon.className = 'horizon'; horizon.setAttribute('aria-hidden', 'true'); el('header').appendChild(horizon);
    scanrect = document.createElement('i'); scanrect.className = 'scanrect'; scanrect.setAttribute('aria-hidden', 'true'); el('readout').appendChild(scanrect);
    odoRing = document.createElement('span'); odoRing.className = 'odo-ring'; ring(odoRing, { ticks: 0 }); el('odometer').appendChild(odoRing);
    el('scope').textContent = '';
    scopeCanvas = document.createElement('canvas'); scopeCanvas.setAttribute('aria-label', 'oscilloscope'); el('scope').appendChild(scopeCanvas);
    const lab = document.createElement('span'); lab.className = 'dim scope-label'; lab.textContent = 'scope'; el('scope').appendChild(lab);
    scopeCtx = scopeCanvas.getContext('2d');
    el('licence').textContent = TH.strings.licence;
    el('progress').innerHTML = '<span class="rail"><i class="fill"></i><b class="head"></b></span><span class="time mid"></span>';
    el('hdrBar').textContent = ''; el('hdrBar').className = 'hdr-rail'; el('hdrBar').appendChild(document.createElement('i'));
    dialStrip = makeDialStrip(el('dial'));
    UI.layout = V.phone() ? 'deck' : 'air';
    buildUi();
    sceneUp();
    // without the CDN there is no scene within two seconds; the body says so and the CSS gradient carries the page (12.11)
    nocityTimer = setTimeout(function () { if (!scene) document.body.classList.add('nocity'); }, 2000);
    if (window.NOBODY_NOCDN) document.body.classList.add('nocity');
    TH.resize();
  };
  TH.dispose = function () {
    clearTimeout(nocityTimer);
    if (scene) { scene.dispose(); scene = null; }
    [canvas, cssgrid, horizon, scanrect, odoRing, UI.readout, UI.bracket, UI.marker, UI.hud, UI.flyWrap].forEach(function (n) { if (n) n.remove(); });
    canvas = cssgrid = horizon = scanrect = odoRing = null; UI.readout = UI.bracket = UI.marker = UI.hud = UI.flyBtn = UI.flyWrap = null; UI.chips = []; UI.pins = [];
    el('scope').textContent = ''; scopeCanvas = null; scopeCtx = null;
    el('progress').textContent = ''; el('hdrBar').className = 'dim'; el('hdrBar').textContent = '............';
    el('dial').textContent = ''; dialStrip = null;
    el('readout').classList.remove('typing'); el('transmitter').classList.remove('tuning-state');
    document.body.classList.remove('nocity', 'city-cruise');
    glass.classList.remove('closing', 'bloom-on');
    el('towerStatic').textContent = ''; el('towerStatic').hidden = true;
    const hints = el('hints'); if (hints) delete hints.dataset.hover;
    window.removeEventListener('wheel', onWheel); window.removeEventListener('keydown', onAnyKey, true); window.removeEventListener('pointermove', onWindowMove);
  };
  function sceneUp() {
    const L = ctx.libs();
    if (scene || !L || !L.THREE || !L.passes) return;
    try {
      scene = makeCityScene(L.THREE, L.passes);
      if (!scene.start(canvas, { phone: V.phone(), say: say })) { scene = null; document.body.classList.add('nocity'); return; }
      document.body.classList.remove('nocity');
      scene.onFrame = uiFrame;
      scene.onLand = onLand;
      scene.noViz = function () { return document.body.classList.contains('ui-hidden') && document.body.classList.contains('no-hideviz'); };
      scene.setCatalogue(S.tracks);
      scene.setLayout(UI.layout, 0);
      scene.setQueue(ctx.queueList().slice(0, 6), ctx.current());
      if (ctx.filter()) scene.setFilter(ctx.filter(), ctx.visible());
      if (pendingView) { applyPending(); }
    } catch (e) { scene = null; document.body.classList.add('nocity'); }
  }
  function applyPending() {
    const p = pendingView; pendingView = null;
    if (!scene) return;
    if (p.boot) scene.boot(p.warm);
    if (p.playing) scene.setPlaying(p.playing, 0);
    scene.setView(p.view, 0);
  }
  TH.libsReady = function () { sceneUp(); };
  TH.resize = function () {
    if (scopeCanvas && scopeCtx) {
      const dpr = window.devicePixelRatio || 1, sw = scopeCanvas.clientWidth || 500, sh = scopeCanvas.clientHeight || V.rowPx();
      scopeCanvas.width = Math.round(sw * dpr); scopeCanvas.height = Math.round(sh * dpr); scopeCtx.setTransform(dpr, 0, 0, dpr, 0, 0);
      scopeCanvas.dataset.w = sw; scopeCanvas.dataset.h = sh;
    }
    if (dialStrip && S && S.state === 'tuning') dialStrip.set(88.8, false, '');
  };

  /* ---- transitions (12.5): what the camera does when the station changes state ---- */
  function viewOf(to) { return to === 'page' ? 'page' : to === 'guestbook' ? 'guestbook' : to === 'dead' ? 'dead' : to === 'boot' || to === 'off' ? 'standby' : 'home'; }
  TH.transition = function (from, to, info) {
    info = info || {};
    const flightMs = V.phone() ? 500 : (to === 'home' ? 700 : 900);
    if (to === 'boot') {
      glass.classList.remove('closing');
      if (scene) { scene.boot(info.warm); scene.setView('standby', 0); } else pendingView = { boot: true, warm: info.warm, view: 'standby' };
      return new Promise(function (res) { setTimeout(function () { glass.classList.remove('off'); setTimeout(res, 320); }, 100); });
    }
    if (to === 'off') {
      hideReadout();
      return new Promise(function (res) { glass.classList.add('closing'); setTimeout(function () { glass.classList.add('off'); glass.classList.remove('closing'); res(); }, 380); });
    }
    if (to === 'air') {
      flash();
      glass.classList.add('bloom-on'); setTimeout(function () { glass.classList.remove('bloom-on'); }, 300);
      if (scene) scene.setView('home', 0); else pendingView = { view: 'home' };
      if (UI.layout === 'air' && scene) say('on air. the city is in hand: arrows fly, enter lands, q routes. f for the deck.', 'mid');
      return Promise.resolve();
    }
    if (to === 'tuning') {
      hideReadout();
      if (scene) scene.setPlaying(info.slug, info.ms || 1200, true); else pendingView = { view: 'home', playing: info.slug };
      return Promise.resolve();
    }
    if (to === 'playing') {
      if (scene) { scene.setPlaying(info.slug, 0); if (document.body.classList.contains('ui-hidden')) hintReadout(info.slug); }
      return Promise.resolve();
    }
    if (to === 'page' || to === 'guestbook' || to === 'home' || to === 'dead') {
      hideReadout();
      if (scene) { if (info.slug) scene.setPlaying(info.slug, 0); scene.setView(viewOf(to), from === 'switch' ? 0 : flightMs); } else pendingView = { view: viewOf(to), playing: info.slug };
      return Promise.resolve();
    }
    return Promise.resolve();
  };
  function flash() {
    power.classList.remove('fade'); power.classList.add('on');
    setTimeout(function () { power.classList.add('fade'); setTimeout(function () { power.classList.remove('on', 'fade'); }, 140); }, 20);
  }
  function onLand(slug, how) {
    if (!slug || how !== 'orbit') return;
    const t = trackOf(slug), w = scene.where();
    say('landed. ' + slug + '. ' + (t && t.project ? t.project : (w.district || 'downtown')) + (t && t.date ? ', ' + t.date : '') + '.', 'mid');
  }

  /* ---- scene hooks ---- */
  TH.catalogue = function (tracks) { if (scene) scene.setCatalogue(tracks); };
  TH.playing = function (slug) { if (scene) scene.setPlaying(slug, 0); };
  TH.scheme = function () { if (scene) scene.scheme(); };
  // the widget slot (12.0, issue #28): the city mounts nothing in the transmitter card; its signature is the scene behind it
  TH.widget = function () { return null; };
  TH.state = function () {
    if (!scene) return { widget: null, running: false, nocity: document.body.classList.contains('nocity'), layout: UI.layout };
    const nav = scene.nav(), w = scene.where(), r = scene.route();
    return { widget: null, running: scene.running, frames: scene.frames, ms: +scene.ms.toFixed(1), bloom: scene.bloomOn, chroma: scene.chromaOn, view: scene.view, playing: scene.playing, flying: scene.flying, tunnel: scene.tunnelOn, phone: scene.phone, nocity: false,
      layout: UI.layout, camera: { mode: nav.mode, street: w.text, along: w.off, heading: w.heading, speed: +nav.speed.toFixed(2), height: +nav.y.toFixed(2), cell: w.cell },
      cursor: UI.cursorSlug, readout: UI.readout && !UI.readout.hidden ? UI.readoutSlug : null, route: r.stops.map(function (s) { return s.slug; }), lit: scene.litCount(), cruise: scene.cruising(), perf: scene.perf(), towers: scene.towers().length };
  };

  // esc (12.0, the interface hooks): from a flight or the street, back to the orbit; from the orbit in the air, the deck; else not ours
  TH.escape = function () {
    if (!scene || UI.layout !== 'air') return false;
    if (scene.back()) return true;
    ctx.setLayout('deck'); return true;
  };
  TH.pickAt = function (x, y) { const t = scene ? scene.pick(x, y, 48) : null; return t ? t.slug : null; };
  TH.debug = function () { const over = document.elementFromPoint(UI.px || 0, UI.py || 0); return { frames: UI.frames, lastNow: Math.round(UI.lastNow || 0), now: Math.round(performance.now()), pointerAt: Math.round(UI.pointerAt), phone: V.phone(), px: UI.px, py: UI.py, since: Math.round(performance.now() - UI.pointerAt), hover: UI.hover ? UI.hover.slug : null, cursor: UI.cursorSlug, readout: UI.readoutSlug, over: over ? (over.id || over.className || over.tagName) : null, view: scene ? scene.view : null, mode: scene ? scene.nav().mode : null, pick: scene && UI.px != null ? (scene.pick(UI.px, UI.py, 64) || {}).slug : null }; };
  // what the harness reads to aim its pointer: every tower on screen within reach, with its screen position
  TH.screenTowers = function (all) {
    if (!scene) return [];
    return scene.towers().map(function (t) { const p = scene.project(t.x, t.blocks * 0.25, t.z); return { slug: t.slug, x: Math.round(p.x), y: Math.round(p.y), d: +p.d.toFixed(1), behind: p.behind, playing: t.slug === scene.playing }; })
      .filter(function (p) { return all || (!p.behind && p.d <= 40 && p.x > 0 && p.x < innerWidth && p.y > 0 && p.y < innerHeight && document.elementFromPoint(p.x, p.y) === canvas); });
  };

  /* ---- the fly-through's own elements: the readout, the bracket, the marker, the HUD chips, the fly bracket (city-flythrough 3, 5, 8) ---- */
  function buildUi() {
    const ro = document.createElement('div'); ro.id = 'cityReadout'; ro.className = 'card city-readout'; ro.hidden = true;
    ro.innerHTML = '<div class="ro-slug"></div><div class="ro-meta mid"></div><div class="ro-prompt"><span class="mid mark">&gt; </span><span class="ro-line"></span></div><div class="ro-buttons"></div>';
    const bb = ro.querySelector('.ro-buttons');
    const mk = function (label, fn) { const b = document.createElement('button'); b.className = 'bk'; b.textContent = label; b.addEventListener('click', function (e) { e.stopPropagation(); e.preventDefault(); fn(); }); bb.appendChild(b); bb.appendChild(document.createTextNode('  ')); };
    mk('> fly in', function () { if (UI.readoutSlug) ctx.play(UI.readoutSlug); });
    mk('+ route', function () { if (UI.readoutSlug) ctx.queue(UI.readoutSlug); });
    mk('remix', function () { if (UI.readoutSlug) ctx.remix(UI.readoutSlug); });
    document.body.appendChild(ro); UI.readout = ro;
    const br = document.createElement('i'); br.id = 'cityBracket'; br.className = 'city-bracket'; br.setAttribute('aria-hidden', 'true'); br.hidden = true; document.body.appendChild(br); UI.bracket = br;
    const mk2 = document.createElement('button'); mk2.id = 'cityMarker'; mk2.className = 'bare city-marker'; mk2.hidden = true; mk2.addEventListener('click', function () { if (scene) { scene.back(); } }); document.body.appendChild(mk2); UI.marker = mk2;
    const hud = document.createElement('div'); hud.id = 'cityHud'; hud.className = 'city-hud'; hud.setAttribute('aria-hidden', 'true'); document.body.appendChild(hud); UI.hud = hud;
    for (let i = 0; i < 6; i++) { const p = document.createElement('span'); p.className = 'city-pin'; p.hidden = true; hud.appendChild(p); UI.pins.push(p); }
    for (let i = 0; i < 4; i++) { const p = document.createElement('span'); p.className = 'city-sign'; p.hidden = true; hud.appendChild(p); UI.chips.push(p); }
    // the [ fly ] bracket in the catalogue's control row: the air or the deck
    const wrap = document.createElement('span'); wrap.className = 'city-fly-wrap';
    const fb = document.createElement('button'); fb.className = 'bk city-fly'; fb.id = 'cityFly'; fb.textContent = UI.layout === 'air' ? 'deck' : 'fly'; fb.setAttribute('aria-label', 'fly the city, or back to the deck');
    fb.addEventListener('click', function () { ctx.setLayout(UI.layout === 'air' ? 'deck' : 'air'); });
    wrap.appendChild(fb); wrap.appendChild(document.createTextNode('   '));
    const controls = document.querySelector('#catalogue .cat-controls');
    if (controls) controls.insertBefore(wrap, controls.firstChild);
    UI.flyBtn = fb; UI.flyWrap = wrap;
    // the pointer on the scene: a click on the cursor tower flies in; a drag on a phone flies; the wheel is the speed
    canvas.addEventListener('pointerdown', onPointerDown);
    canvas.addEventListener('pointermove', onPointerMove);
    canvas.addEventListener('pointerup', onPointerUp);
    canvas.addEventListener('pointercancel', function () { UI.tap = null; });
    window.addEventListener('wheel', onWheel, { passive: false });
    window.addEventListener('keydown', onAnyKey, true);
    window.addEventListener('pointermove', onWindowMove, { passive: true });
  }
  function onWindowMove(e) { UI.pointerAt = performance.now(); UI.px = e.clientX; UI.py = e.clientY; if (scene && e.target === canvas && scene.nav().mode === 'street') { scene.drift((e.clientX / innerWidth - 0.5) * 2); edgeIntent(e.clientX); } }
  function onAnyKey(e) { if (scene && document.body.classList.contains('ui-hidden') && scene.cruising() && !/^(v|V|`|~|Escape)$/.test(e.key)) scene.input(); }
  function onWheel(e) {
    if (!scene || UI.layout !== 'air') return;
    if (e.target !== canvas) return;
    e.preventDefault();
    scene.accel(e.deltaY < 0 ? 1 : -1);
  }
  function edgeIntent(x) {
    const k = x / innerWidth;
    const dir = k < 1 / 6 ? -1 : k > 5 / 6 ? 1 : 0;
    if (dir !== UI.edgeDir) { UI.edgeDir = dir; UI.edgeAt = performance.now(); }
    else if (dir && performance.now() - UI.edgeAt > 300) scene.armTurn(dir);
  }
  function onPointerDown(e) {
    if (!scene || UI.layout !== 'air') return;
    UI.tap = { x: e.clientX, y: e.clientY, t: performance.now(), moved: false, touch: e.pointerType === 'touch' };
    if (e.pointerType === 'touch') { try { canvas.setPointerCapture(e.pointerId); } catch (err) {} }
  }
  function onPointerMove(e) {
    if (!UI.tap || !scene) return;
    const dx = e.clientX - UI.tap.x, dy = e.clientY - UI.tap.y;
    if (Math.abs(dx) + Math.abs(dy) > 8) UI.tap.moved = true;
    if (UI.tap.touch && UI.tap.moved) {
      // one finger flies (city-flythrough 9): x steers and arms the turn, y is the speed
      scene.input();
      if (scene.nav().mode === 'orbit') scene.accel(0);
      scene.drift(dx / innerWidth * 3);
      if (Math.abs(dx) > innerWidth / 4) scene.armTurn(dx > 0 ? 1 : -1);
      const nav = scene.nav(); if (nav.mode === 'street') nav.tspeed = Math.max(0, Math.min(16, -dy / innerHeight * 24));
    }
  }
  function onPointerUp(e) {
    const tap = UI.tap; UI.tap = null;
    if (!tap || !scene || UI.layout !== 'air') return;
    if (tap.touch) { const nav = scene.nav(); if (nav.mode === 'street') nav.tspeed = 0; }
    if (tap.moved) return;
    scene.input();
    const t = scene.pick(e.clientX, e.clientY, 64);
    if (!t) { if (tap.touch) hideReadout(); return; }
    // a click on the cursor tower flies in and plays; on a phone the first tap is the hover, the second flies
    if (tap.touch && UI.readoutSlug !== t.slug) { ctx.setHighlight(t.slug); UI.cursorSlug = t.slug; scene.setCursor(t.slug); UI.hover = t; showReadout(t); return; }
    ctx.play(t.slug);
  }
  function trackOf(slug) { return ctx.tracks().find(function (x) { return x.slug === slug; }) || null; }
  function showReadout(t) {
    const ro = UI.readout, tr = trackOf(t.slug); if (!ro || !tr) return;
    if (UI.readoutSlug !== t.slug) {
      ro.querySelector('.ro-slug').textContent = t.slug;
      ro.querySelector('.ro-meta').textContent = [tr.bpm != null ? tr.bpm + ' bpm' : null, tr.key, ctx.fmt(tr.duration), tr.model, (tr.date || '').slice(5)].filter(Boolean).join('  ');
      const line = String(tr.prompt || tr.idea || '').replace(/\s+/g, ' ');
      const n = V.phone() ? 44 : 60;
      ro.querySelector('.ro-line').textContent = line.length > n ? line.slice(0, n - 1) + ' ...' : line;
      UI.readoutSlug = t.slug; UI.readoutAt = performance.now();
      const hints = el('hints'); if (hints && !V.phone() && !document.body.classList.contains('ui-hidden')) hints.dataset.hover = 'hover: ' + t.slug + '. enter flies.';
    }
    ro.hidden = false; ro.classList.remove('hint');
  }
  function hideReadout() { if (UI.readout) { UI.readout.hidden = true; UI.readout.classList.remove('hint'); } UI.readoutSlug = null; UI.hover = null; UI.readoutAtCursor = null; if (UI.bracket) UI.bracket.hidden = true; if (ctx) { const hints = el('hints'); if (hints) delete hints.dataset.hover; } }
  // the title hint in the hidden interface (city-flythrough 10): the readout rises from the tower and fades
  function hintReadout(slug) {
    const t = scene.towers().find(function (x) { return x.slug === slug; }); if (!t) return;
    showReadout(t);
    UI.readout.classList.add('hint'); UI.hint = performance.now() + 3000;
  }
  // the open part of the frame in the air: under the header, left of the rail, above the dash
  function sceneArea() {
    const hd = el('header').getBoundingClientRect(), tx = el('transmitter').getBoundingClientRect(), cat = el('catalogue').getBoundingClientRect();
    const hidden = document.body.classList.contains('ui-hidden');
    return { left: 8, top: hidden ? 8 : hd.bottom + 8, right: hidden || V.phone() || cat.width === 0 ? innerWidth - 8 : cat.left - 8, bottom: hidden ? innerHeight - 8 : tx.top - 8 };
  }
  function place(elm, x, y) { elm.style.transform = 'translate(' + Math.round(x) + 'px,' + Math.round(y) + 'px)'; }
  // every frame after the render: the cursor from the pointer, the readout, the bracket, the marker, the pins, the signs, the cruise
  function uiFrame(now) {
    if (!scene) return;
    UI.frames = (UI.frames || 0) + 1; UI.lastNow = now;
    const air = UI.layout === 'air', hidden = document.body.classList.contains('ui-hidden');
    scene.cruiseTick(remaining());
    if (!air && !hidden) { if (!UI.readout.hidden) hideReadout(); UI.marker.hidden = true; UI.pins.forEach(function (p) { p.hidden = true; }); UI.chips.forEach(function (p) { p.hidden = true; }); return; }
    const nav = scene.nav();
    // the cursor follows the pointer when the pointer moves (the keys move it through highlight)
    if (!V.phone() && !hidden && now - UI.pointerAt < 3000 && UI.px != null && scene.view === 'air' && nav.mode !== 'flight') {
      const over = document.elementFromPoint(UI.px, UI.py);
      if (over === canvas) {
        const t = scene.pick(UI.px, UI.py, 64);
        if (t && t !== UI.hover) { UI.hover = t; UI.cursorSlug = t.slug; scene.setCursor(t.slug); ctx.setHighlight(t.slug); }
        else if (!t && UI.hover) { UI.hover = null; }
      }
    }
    const cur = scene.cursor();
    // the readout anchored to the cursor tower, 120 ms after it settles; the hint variant fades on its own
    if (UI.readout.classList.contains('hint')) {
      if (now > UI.hint) hideReadout();
    } else if (cur && !hidden && (UI.hover === cur || UI.cursorSlug === cur.slug)) {
      const top = scene.project(cur.x, cur.blocks * 0.5, cur.z);
      if (top.behind || top.d > 120) { if (!UI.readout.hidden) hideReadout(); }
      else if (UI.readoutSlug !== cur.slug) {
        if (UI.readoutAtCursor !== cur.slug) { UI.readoutAtCursor = cur.slug; UI.readoutSettle = now; }
        if (now - UI.readoutSettle >= 120) showReadout(cur);
      }
    } else if (!UI.readout.hidden) hideReadout();
    if (!UI.readout.hidden) {
      const t = scene.towers().find(function (x) { return x.slug === UI.readoutSlug; });
      if (t) {
        const top = scene.project(t.x, t.blocks * 0.5, t.z), foot = scene.project(t.x, 0, t.z);
        const w = UI.readout.offsetWidth || 320, h = UI.readout.offsetHeight || 120;
        const leftSide = V.phone() ? false : (UI.px != null ? UI.px > top.x : top.x > innerWidth / 2);
        let x = V.phone() ? top.x - w / 2 : (leftSide ? top.x - w - 24 : top.x + 24);
        let y = V.phone() ? (top.y - h - 16 > 8 ? top.y - h - 16 : foot.y + 16) : top.y - 12;
        x = clamp(x, 8, innerWidth - w - 8); y = clamp(y, 8, innerHeight - h - 8);
        place(UI.readout, x, y);
        // the bracket around the tower's screen box
        const bw = Math.max(18, Math.abs(foot.y - top.y) * 0.25 + 12), bh = Math.max(24, foot.y - top.y + 8);
        UI.bracket.hidden = top.behind; place(UI.bracket, top.x - bw / 2, top.y - 4); UI.bracket.style.width = bw + 'px'; UI.bracket.style.height = bh + 'px';
      }
    } else UI.bracket.hidden = true;
    // the edge marker when the playing tower is off screen (city-flythrough 8)
    const pt = scene.playing ? scene.towers().find(function (x) { return x.slug === scene.playing; }) : null;
    if (pt && !hidden && nav.mode !== 'orbit') {
      const p = scene.project(pt.x, pt.blocks * 0.5, pt.z);
      const off = p.behind || p.x < 0 || p.x > innerWidth || p.y < 0 || p.y > innerHeight;
      if (off) {
        // the marker stays inside the scene area: under the header, left of the rail, above the dash (the cards keep their words)
        const sa = sceneArea();
        const cx = (sa.left + sa.right) / 2, cy = (sa.top + sa.bottom) / 2;
        let dx = p.x - cx, dy = p.y - cy; if (p.behind) { dx = -dx; dy = -dy; }
        const ang = Math.atan2(dy, dx), m = UI.marker, mw = m.offsetWidth || 220, mh = m.offsetHeight || 28;
        const rx = Math.max(10, (sa.right - sa.left - mw) / 2 - 12), ry = Math.max(10, (sa.bottom - sa.top - mh) / 2 - 12);
        const sx = Math.cos(ang), sy = Math.sin(ang), k = Math.min(rx / Math.max(1e-6, Math.abs(sx)), ry / Math.max(1e-6, Math.abs(sy)));
        const cxz = scene.cameraXZ(), blocks = Math.round(Math.hypot(pt.x - cxz.x, pt.z - cxz.z) / 2);
        const horiz = Math.abs(sx) > Math.abs(sy);
        m.textContent = (horiz && sx < 0 ? '< ' : !horiz && sy < 0 ? '^ ' : '') + scene.playing + '  ' + blocks + (blocks === 1 ? ' block' : ' blocks') + (horiz && sx > 0 ? ' >' : !horiz && sy > 0 ? ' v' : '');
        m.hidden = false; place(m, cx + sx * k - mw / 2, cy + sy * k - mh / 2);
      } else UI.marker.hidden = true;
    } else UI.marker.hidden = true;
    // the pins on the route's stops and the street signs, within 40 units, with an opaque chip each (12.0, legibility)
    const r = scene.route();
    UI.pins.forEach(function (p, i) {
      const s = r.stops[i];
      if (!s || hidden) { p.hidden = true; return; }
      const q = scene.project(s.x, 0.4, s.z);
      if (q.behind || q.d > 40 || q.x < 0 || q.x > innerWidth || q.y < 0 || q.y > innerHeight) { p.hidden = true; return; }
      p.textContent = String(s.n); p.hidden = false; place(p, q.x - 10, q.y - 10);
    });
    const signs = scene.city().signs, shown = [];
    for (let i = 0; i < signs.length && shown.length < 4; i++) {
      const s = signs[i], q = scene.project(s.x, 0.1, s.z);
      if (hidden || q.behind || q.d > 40 || q.x < 20 || q.x > innerWidth - 20 || q.y < 20 || q.y > innerHeight - 20) continue;
      shown.push({ s: s, q: q });
    }
    UI.chips.forEach(function (c, i) {
      const sh = shown[i];
      if (!sh) { c.hidden = true; return; }
      c.textContent = sh.s.text; c.className = 'city-sign ' + sh.s.kind; c.hidden = false; place(c, sh.q.x - 40, sh.q.y - 10);
    });
  }

  /* ---- widgets ---- */
  // the station name as a 3D object (12.2): fourteen layers, the front with the gradient fill; returns the front layer
  function name3d(host, text, layers) {
    layers = layers || 14;
    host.textContent = '';
    host.classList.add('name3d');
    const g = document.createElement('span'); g.className = 'n3';
    let front = null;
    for (let i = layers - 1; i >= 0; i--) {
      const s = document.createElement('span'); s.textContent = text; s.style.setProperty('--i', String(i));
      if (i === 0) { s.className = 'front'; front = s; } else s.setAttribute('aria-hidden', 'true'); // the depth layers are decoration, not text
      g.appendChild(s);
    }
    host.appendChild(g);
    return front;
  }
  TH.stationName = function (button) { name3d(button, 'NOBODY FM'); };
  TH.banner = function (bannerEl, phone, scramble) {
    bannerEl.classList.remove('in');
    const front = name3d(bannerEl, 'NOBODY FM');
    bannerEl.classList.add('in');
    if (scramble) { front.textContent = V.scrambled('NOBODY FM'); V.scramble(front, 'NOBODY FM', 900); }
  };
  TH.progress = function (progressEl, hdrBarEl, c, d, phone, view) {
    const fmt = ctx.fmt, pct = d ? Math.max(0, Math.min(100, c / d * 100)) : 0;
    const fill = progressEl.querySelector('.fill'), head = progressEl.querySelector('.head'), time = progressEl.querySelector('.time');
    if (fill) fill.style.width = pct.toFixed(2) + '%';
    if (head) head.style.left = pct.toFixed(2) + '%';
    if (time) time.textContent = phone ? fmt(c) + '/' + fmt(d) : fmt(c) + ' / ' + fmt(d);
    if (view !== 'home') { const bar = hdrBarEl.querySelector('i'); if (bar) bar.style.width = pct.toFixed(2) + '%'; }
  };
  TH.progressHit = function (progressEl, x) { const rail = progressEl.querySelector('.rail') || progressEl, r = rail.getBoundingClientRect(); return Math.max(0, Math.min(1, (x - r.left) / r.width)); };
  // the dial is a strip of frequencies flying past a centre marker (12.4)
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
  // the volume is the shared fader (volume.js, 12.0 controls) in the city's tokens; the HUD ring of 12.4 stays on the counter only
  TH.volume = function () {};
  function svgEl(name, attrs) { const e = document.createElementNS('http://www.w3.org/2000/svg', name); for (const k in attrs) e.setAttribute(k, attrs[k]); return e; }
  function ring(host, opts) {
    const cx = 50, cy = 50, ticks = opts.ticks == null ? 10 : opts.ticks;
    host.textContent = '';
    const svg = svgEl('svg', { viewBox: '0 0 100 100', 'aria-hidden': 'true' });
    const outer = svgEl('g', { class: 'ring-outer' });
    outer.appendChild(svgEl('circle', { cx: cx, cy: cy, r: 46, fill: 'none', stroke: 'currentColor', 'stroke-opacity': '.5', 'stroke-width': '1' }));
    for (let i = 0; i < 60; i++) {
      const a = i / 60 * Math.PI * 2, r1 = i % 5 === 0 ? 41 : 43.5;
      outer.appendChild(svgEl('line', { x1: cx + Math.cos(a) * r1, y1: cy + Math.sin(a) * r1, x2: cx + Math.cos(a) * 46, y2: cy + Math.sin(a) * 46, stroke: 'currentColor', 'stroke-opacity': i % 5 === 0 ? '.8' : '.4', 'stroke-width': '1' }));
    }
    svg.appendChild(outer);
    const inner = svgEl('g', { class: 'ring-inner' });
    inner.appendChild(svgEl('circle', { cx: cx, cy: cy, r: 34, fill: 'none', stroke: 'currentColor', 'stroke-opacity': '.35', 'stroke-width': '1', 'stroke-dasharray': '6 4' }));
    svg.appendChild(inner);
    const tickEls = [];
    for (let i = 0; i < ticks; i++) {
      const a = -Math.PI * 1.25 + (i + 0.5) / ticks * Math.PI * 1.5;
      const l = svgEl('line', { class: 'tick', x1: cx + Math.cos(a) * 26, y1: cy + Math.sin(a) * 26, x2: cx + Math.cos(a) * 36, y2: cy + Math.sin(a) * 36 });
      svg.appendChild(l); tickEls.push(l);
    }
    const num = svgEl('text', { class: 'num', x: cx, y: cy + 1, 'text-anchor': 'middle', 'dominant-baseline': 'middle' });
    svg.appendChild(num);
    host.appendChild(svg);
    return {
      set: function (v, muted) { tickEls.forEach(function (t, i) { t.classList.toggle('lit', i < v); }); num.textContent = muted ? 'm' : String(v); host.classList.toggle('muted', !!muted); },
      hit: function (x, y) {
        const r = host.getBoundingClientRect(), px = (x - r.left) / r.width * 100, py = (y - r.top) / r.height * 100;
        const dx = px - cx, dy = py - cy, d = Math.hypot(dx, dy);
        if (d < 18) return 0;
        if (d > 52) return 0;
        let k = (Math.atan2(dy, dx) + Math.PI * 1.25) / (Math.PI * 1.5);
        if (k < 0) k += 2 * Math.PI / (Math.PI * 1.5);
        return Math.max(1, Math.min(ticks, Math.ceil(k * ticks)));
      }
    };
  }
  // dead air: the scene builds its unlit tower (12.3); without the scene a CSS tower appears block by block (12.11)
  TH.towerStart = function (hostEl, staticEl, phone) {
    if (scene && scene.running) { staticEl.hidden = true; return 'city'; }
    if (!staticEl.children.length) for (let i = 0; i < 18; i++) { const b = document.createElement('i'); b.style.setProperty('--i', String(i)); staticEl.appendChild(b); }
    staticEl.hidden = false; return 'css';
  };
  TH.towerStop = function () { el('towerStatic').hidden = true; };
  TH.towerState = function () { return scene && scene.running ? 'the city in its dead-air view' : 'the CSS tower in the card'; };

  /* ---- the card's analyser (12.4): rounded neon bars with a cyan to magenta gradient, peak dots; the ribbon under it ---- */
  function colours() {
    return { cyan: token('--cyan'), magenta: token('--magenta'), violet: token('--violet'), dim: token('--ink-dim'), cyanRgb: token('--cyan-rgb'), magRgb: token('--magenta-rgb') };
  }
  function roundRect(g, x, y, w, h, r) {
    r = Math.min(r, w / 2, h / 2);
    g.beginPath(); g.moveTo(x + r, y); g.lineTo(x + w - r, y); g.quadraticCurveTo(x + w, y, x + w, y + r); g.lineTo(x + w, y + h - r); g.quadraticCurveTo(x + w, y + h, x + w - r, y + h); g.lineTo(x + r, y + h); g.quadraticCurveTo(x, y + h, x, y + h - r); g.lineTo(x, y + r); g.quadraticCurveTo(x, y, x + r, y); g.closePath();
  }
  function autoGain(s) {
    let m = 0; for (let i = 0; i < s.length; i++) m = Math.max(m, Math.abs(s[i]));
    const want = m > 0.02 ? Math.min(12, 0.8 / m) : gainHold;
    gainHold += (want - gainHold) * 0.05;
    return gainHold;
  }
  TH.frame = function (A_, S_, now) {
    if (!A.ctx2d) return;
    const c = colours(), g = A.ctx2d, W = A.W, H = A.H;
    if (!c.cyan || !c.magenta) return; // the stylesheet is being swapped for another theme's: no tokens, no frame
    g.clearRect(0, 0, W, H);
    const phone = V.phone();
    const cellW = V.fontPx() * 0.6, totalCols = Math.floor(W / cellW);
    A.totalCols = totalCols;
    const labelCols = phone ? 10 : 24;
    const areaCols = Math.max(A.bands, totalCols - 2 - labelCols);
    const areaW = areaCols * cellW, x0 = 2 * cellW;
    g.fillStyle = c.dim; g.fillRect(0, 0, 1, H);
    if (A.mode === 'scope5') { drawScope5(g, c, x0, areaW, H); return; }
    const per = areaW / A.bands, bw = Math.max(2, per * 0.62);
    const grad = g.createLinearGradient(0, H, 0, 0); grad.addColorStop(0, c.cyan); grad.addColorStop(0.55, c.violet); grad.addColorStop(1, c.magenta);
    const rows = A.rows, cellH = H / rows;
    for (let b = 0; b < A.bands; b++) {
      const v = A.vals[b];
      const cells = Math.min(rows, Math.floor(Math.pow(v, 0.8) * (rows + 0.99)));
      const hgt = Math.max(0, Math.pow(v, 0.8) * H);
      if (cells > A.peaks[b]) { A.peaks[b] = cells; A.peakAt[b] = now; }
      else if (now - A.peakAt[b] > 150 && A.peaks[b] > 0) { A.peaks[b]--; A.peakAt[b] = now; }
      const x = x0 + b * per + (per - bw) / 2;
      g.shadowColor = 'rgb(' + c.cyanRgb.replace(/ /g, ',') + ',0.7)'; g.shadowBlur = 10;
      g.fillStyle = grad;
      if (hgt > 1) { if (A.flip) roundRect(g, x, 0, bw, hgt, 2); else roundRect(g, x, H - hgt, bw, hgt, 2); g.fill(); }
      const pk = A.peaks[b];
      if (pk > cells && pk <= rows) {
        const y = A.flip ? pk * cellH - 2 : H - pk * cellH;
        g.shadowColor = 'rgb(' + c.magRgb.replace(/ /g, ',') + ',0.9)'; g.shadowBlur = 8; g.fillStyle = c.magenta;
        g.fillRect(x, y, bw, 2);
      }
    }
    g.shadowBlur = 0;
    A.baselineText(A.live);
    scopeRibbon(c);
  };
  function scopeRibbon(c) {
    if (!scopeCtx) return;
    const W = +scopeCanvas.dataset.w || 500, H = +scopeCanvas.dataset.h || 20, n = Math.max(32, Math.floor(W / 3));
    const s = A.samples(n), gn = autoGain(s), g = scopeCtx;
    g.clearRect(0, 0, W, H);
    g.lineWidth = 1.2; g.strokeStyle = c.magenta; g.shadowColor = c.magenta; g.shadowBlur = 6;
    g.beginPath();
    for (let i = 0; i < n; i++) { const x = i / (n - 1) * W, y = H / 2 - s[i] * gn * (H / 2 - 1); if (i) g.lineTo(x, y); else g.moveTo(x, y); }
    g.stroke(); g.shadowBlur = 0;
  }
  function drawScope5(g, c, x0, areaW, H) {
    const n = Math.max(32, Math.floor(areaW / 2)), s = A.samples(n), gn = autoGain(s);
    g.lineWidth = 1.5; g.strokeStyle = c.cyan; g.shadowColor = c.cyan; g.shadowBlur = 10;
    g.beginPath();
    for (let i = 0; i < n; i++) { const x = x0 + i / (n - 1) * areaW, y = H / 2 - s[i] * gn * (H / 2 - 2); if (i) g.lineTo(x, y); else g.moveTo(x, y); }
    g.stroke(); g.shadowBlur = 0;
    A.baselineText(true);
    if (scopeCtx) scopeCtx.clearRect(0, 0, +scopeCanvas.dataset.w || 500, +scopeCanvas.dataset.h || 20);
  }

  /* ---- the artwork for the media session (4.2): the name on the night ---- */
  TH.artwork = function () {
    try {
      const cv = document.createElement('canvas'); cv.width = 512; cv.height = 512;
      const g = cv.getContext('2d');
      const bg = g.createLinearGradient(0, 0, 0, 512); bg.addColorStop(0, '#070A1C'); bg.addColorStop(1, '#020309');
      g.fillStyle = bg; g.fillRect(0, 0, 512, 512);
      g.strokeStyle = 'rgba(25,240,255,.25)'; g.lineWidth = 1;
      for (let i = 0; i < 12; i++) { g.beginPath(); g.moveTo(256 + (i - 6) * 20, 300); g.lineTo(256 + (i - 6) * 90, 512); g.stroke(); }
      for (let y = 300; y < 512; y += 18 + (y - 300) * 0.25) { g.beginPath(); g.moveTo(0, y); g.lineTo(512, y); g.stroke(); }
      const tg = g.createLinearGradient(60, 0, 452, 0); tg.addColorStop(0, '#19F0FF'); tg.addColorStop(1, '#FF2BD6');
      g.fillStyle = tg; g.font = '800 54px "Orbitron", sans-serif'; g.textAlign = 'center'; g.textBaseline = 'middle';
      g.shadowColor = 'rgba(255,43,214,.6)'; g.shadowBlur = 24;
      g.fillText('NOBODY FM', 256, 200);
      g.font = '500 20px "Orbitron", sans-serif'; g.fillStyle = '#9FB3D9'; g.shadowBlur = 0;
      g.fillText('88.8  the transmitter nobody can find', 256, 250);
      return cv.toDataURL('image/png');
    } catch (e) { return null; }
  };
  return TH;
})();
