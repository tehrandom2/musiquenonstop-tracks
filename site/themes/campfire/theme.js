/* nobody fm, theme "campfire" (issue #64, design 12.18): night on a small wooded planet. you sit on a log by a fire at the
   edge of a clearing, the world curving away past the trees, a deep sky turning overhead. every track is a signal out among
   the stars; raise the scope, sweep the sky on a frequency, and the track itself fades in, filtered and distant, clearer as
   you home in; hold steady and it locks on. there are marshmallows.
   everything here is made from scratch: three.js primitives, our own shaders, our own Web Audio synthesis. a classic script
   on purpose (design 5.7): the one inline module in index.html puts three.js in NOBODY.libs; makeCampScene below is plain
   code against it. without the CDN there is no scene and a painted night stands in; the list is the sky.
   the theme owns the browsing paradigm through the hooks of 12.0 and asks the station for everything through ctx; it never
   writes the station's state. nobody who built this can hear; nothing here listens, it only reads the analyser's numbers. */
window.NOBODY = window.NOBODY || {};
NOBODY.themes = NOBODY.themes || {};
(function () {
  'use strict';
  // the credit (issue #64, "the line we hold"): the one place the game this tribute is inspired by is named, shown in the
  // footer and under the camp. nothing of the game is used anywhere; its name appears nowhere else in this theme.
  const CREDIT = 'campfire is a fan tribute inspired by Outer Wilds (Mobius Digital). Not affiliated with or endorsed by its makers. Nothing here is theirs; everything was made from scratch.';

  function clamp(v, a, b) { return Math.max(a, Math.min(b, v)); }
  function smooth(a, b, x) { const t = clamp((x - a) / (b - a), 0, 1); return t * t * (3 - 2 * t); }
  function lerp(a, b, k) { return a + (b - a) * k; }
  function rng(seed) { return function () { seed |= 0; seed = seed + 0x6D2B79F5 | 0; let t = Math.imul(seed ^ seed >>> 15, 1 | seed); t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t; return ((t ^ t >>> 14) >>> 0) / 4294967296; }; }
  function hashStr(s) { let h = 2166136261; for (let i = 0; i < s.length; i++) { h ^= s.charCodeAt(i); h = Math.imul(h, 16777619); } return h >>> 0; }
  const DEG = Math.PI / 180;
  // a damped spring toward a target, frame-rate independent: k = 1 - exp(-dt / tc)
  function ease(dt, tc) { return 1 - Math.exp(-dt / Math.max(1e-4, tc)); }
  function wrapAngle(a) { while (a > Math.PI) a -= 2 * Math.PI; while (a < -Math.PI) a += 2 * Math.PI; return a; }

  /* ---- the frequencies: the catalogue grouped by project, else by a mood family (design 12.18) ---- */
  const FAMILIES = [
    ['night', /night|tired|sleepy|awake|late|2 a\.m/i], ['bright', /playful|mischievous|good-humoured|fun|cheeky/i],
    ['quiet', /quiet|calm|hopeful|wistful|awed|unhurried|absent-minded/i]
  ];
  function freqName(t) {
    if (t.project) return String(t.project).toLowerCase();
    const m = String(t.mood || '');
    for (let i = 0; i < FAMILIES.length; i++) if (FAMILIES[i][1].test(m)) return FAMILIES[i][0];
    return 'drift';
  }
  // frequency colours, all at 4.5:1 or better on the board's panel; the scene uses the same ones
  const FREQ_COLOURS = ['#ffcf6b', '#8fd0ff', '#c6b1ff', '#93ecb4', '#ff9d8a', '#f6a8dc', '#d4ec7a'];
  function groupFrequencies(tracks) {
    const by = {};
    tracks.forEach(function (t) { const n = freqName(t); (by[n] = by[n] || []).push(t); });
    let names = Object.keys(by).sort(function (a, b) { return by[b].length - by[a].length || a.localeCompare(b); });
    if (names.length > 7) {
      const keep = names.slice(0, 6).filter(function (n) { return n !== 'drift'; });
      const rest = names.filter(function (n) { return keep.indexOf(n) < 0; });
      by.drift = rest.reduce(function (a, n) { return a.concat(by[n]); }, []);
      names = keep.concat(['drift']);
    }
    return names.map(function (n, i) { return { name: n, colour: FREQ_COLOURS[i % FREQ_COLOURS.length], slugs: by[n].map(function (t) { return t.slug; }) }; });
  }

  /* ---- GLSL: value noise and fbm, shared by the sky, the fire, the smoke and the marshmallow ---- */
  const NOISE = [
    'float hh(vec3 p){ p = fract(p * 0.3183099 + 0.1); p *= 17.0; return fract(p.x * p.y * p.z * (p.x + p.y + p.z)); }',
    'float n3(vec3 x){ vec3 i = floor(x), f = fract(x); f = f * f * (3.0 - 2.0 * f);',
    '  return mix(mix(mix(hh(i), hh(i + vec3(1,0,0)), f.x), mix(hh(i + vec3(0,1,0)), hh(i + vec3(1,1,0)), f.x), f.y),',
    '             mix(mix(hh(i + vec3(0,0,1)), hh(i + vec3(1,0,1)), f.x), mix(hh(i + vec3(0,1,1)), hh(i + vec3(1,1,1)), f.x), f.y), f.z); }',
    'float fbm(vec3 p){ float a = 0.5, s = 0.0; for (int i = 0; i < 4; i++) { s += a * n3(p); p = p * 2.03 + vec3(1.7, 9.2, 3.1); a *= 0.5; } return s; }'
  ].join('\n');

  function makeCampScene(THREE) {
    const C = { running: false, frames: 0, ms: 0, phone: false, reduced: false, layout: 'camp', hidden: false, scoped: false };
    const reduced = !!(window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches);
    C.reduced = reduced;
    const qs = new URLSearchParams(location.search);
    const NOPROBE = qs.get('probe') === '0';
    const R = 24;                                   // the planet's radius: small enough to see it curve away
    const CENTRE = new THREE.Vector3(0, -R, 0);
    let renderer, scene, camera, canvas, W = 2, H = 2, pr = 1, prBase = 1;
    let raf = 0, last = 0, T = 0;
    const perf = { ring: new Float32Array(120), n: 0, p50: 0, p95: 0, checkedAt: 0, over: 0, under: 0, ladder: 0 };

    /* ---- the ground: a little planet, flat-shaded, with a clearing, a ridge and a gentle lumpiness ---- */
    function vnoise(x, y, z) {
      const h = function (a, b, c) { const s = Math.sin(a * 127.1 + b * 311.7 + c * 74.7) * 43758.5453; return s - Math.floor(s); };
      const ix = Math.floor(x), iy = Math.floor(y), iz = Math.floor(z), fx = x - ix, fy = y - iy, fz = z - iz;
      const ux = fx * fx * (3 - 2 * fx), uy = fy * fy * (3 - 2 * fy), uz = fz * fz * (3 - 2 * fz);
      const l = function (a, b, k) { return a + (b - a) * k; };
      return l(l(l(h(ix, iy, iz), h(ix + 1, iy, iz), ux), l(h(ix, iy + 1, iz), h(ix + 1, iy + 1, iz), ux), uy),
        l(l(h(ix, iy, iz + 1), h(ix + 1, iy, iz + 1), ux), l(h(ix, iy + 1, iz + 1), h(ix + 1, iy + 1, iz + 1), ux), uy), uz);
    }
    const RIDGE = new THREE.Vector3(-0.62, 0.55, -0.56).normalize();
    function height(dir) {
      const arc = Math.acos(clamp(dir.y, -1, 1)) * R;          // the distance from the camp along the surface
      const wild = smooth(4.5, 9, arc);
      let h = (vnoise(dir.x * 6, dir.y * 6, dir.z * 6) - 0.5) * 1.3 * wild + (vnoise(dir.x * 15, dir.y * 15, dir.z * 15) - 0.5) * 0.35 * wild;
      const r = Math.acos(clamp(dir.dot(RIDGE), -1, 1));       // a ridge on the far left
      h += Math.max(0, 1 - r / 0.32) * 3.4 * (0.75 + 0.5 * vnoise(dir.x * 9, dir.y * 9, dir.z * 9));
      return h;
    }
    // a point on the surface from tangent-plane coordinates at the camp (x right, z toward the viewer)
    function dirAt(x, z) { const d = Math.hypot(x, z); if (d < 1e-6) return new THREE.Vector3(0, 1, 0); const a = d / R; return new THREE.Vector3(Math.sin(a) * x / d, Math.cos(a), Math.sin(a) * z / d); }
    function surf(x, z, lift) { const dir = dirAt(x, z); return CENTRE.clone().addScaledVector(dir, R + height(dir) + (lift || 0)); }
    function upAt(x, z) { return dirAt(x, z); }
    function orient(obj, x, z, spin) {
      obj.position.copy(surf(x, z));
      obj.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), upAt(x, z));
      if (spin) obj.rotateY(spin);
    }

    const FZ = -3.3;
    const FIRE = surf(0, FZ);
    const SEAT = surf(0, 0.55, 1.08);
    // leaning in to toast: halfway to the fire and lower, the marshmallow close in front of you
    const LEAN = SEAT.clone().lerp(FIRE, 0.64); LEAN.y = SEAT.y - 0.3;

    /* ---- the sky dome: a deep gradient, the breathing band, curtains of faint light, the warm glow round the low sun ---- */
    const skyU = { uTime: { value: 0 }, uSun: { value: new THREE.Vector3() }, uDawn: { value: 0 }, uBreath: { value: 1 }, uRed: { value: 0 } };
    const SKY_V = 'varying vec3 vL; varying vec3 vW; void main(){ vL = normalize(position); vW = normalize(mat3(modelMatrix) * position); gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }';
    const SKY_F = [
      'uniform float uTime, uDawn, uBreath, uRed; uniform vec3 uSun; varying vec3 vL; varying vec3 vW;', NOISE,
      'void main(){',
      '  vec3 d = normalize(vW), l = normalize(vL); float y = d.y;',
      '  vec3 zen = mix(vec3(0.010,0.016,0.060), vec3(0.030,0.020,0.070), uDawn);',
      '  vec3 mid = mix(vec3(0.028,0.050,0.150), vec3(0.090,0.050,0.140), uDawn);',
      '  vec3 hor = mix(vec3(0.075,0.110,0.250), vec3(0.300,0.140,0.180), uDawn);',
      '  vec3 c = mix(hor, mid, smoothstep(-0.06, 0.22, y)); c = mix(c, zen, smoothstep(0.22, 0.95, y));',
      '  float sd = max(dot(d, uSun), 0.0);',
      '  float above = smoothstep(-0.25, 0.08, y);',
      '  c += mix(vec3(1.0, 0.52, 0.22), vec3(1.0, 0.30, 0.14), uRed) * (pow(sd, 6.0) * 0.30 + pow(sd, 48.0) * 0.55) * (1.0 + 0.5 * uRed) * above;',
      '  c += vec3(0.85, 0.40, 0.20) * exp(-abs(y) * 8.0) * pow(sd, 1.5) * 0.16;',
      // the band, fixed to the turning sky: painterly dust with dark lanes, breathing slowly
      '  float b = l.z * 0.9 + l.x * 0.25;',
      '  float band = exp(-b * b * 9.0);',
      '  float n = fbm(l * 3.2 + vec3(0.0, uTime * 0.006, 0.0));',
      '  float n2 = fbm(l * 8.5 - vec3(uTime * 0.008, 0.0, uTime * 0.004));',
      '  float dust = band * (0.45 + 0.55 * n) * (0.55 + 0.45 * n2);',
      '  c += mix(vec3(0.15, 0.11, 0.30), vec3(0.34, 0.28, 0.46), n2) * dust * 0.62 * uBreath;',
      '  c -= vec3(0.045, 0.045, 0.07) * band * smoothstep(0.52, 0.72, n2);',
      // faint curtains over the far horizon, rising and falling
      '  float az = atan(d.x, -d.z);',
      '  float cur = fbm(vec3(az * 2.6, uTime * 0.035, 3.0));',
      '  float hgt = 0.16 + 0.10 * fbm(vec3(az * 4.0, uTime * 0.05, 7.0));',
      '  float aur = smoothstep(0.03, 0.12, y) * (1.0 - smoothstep(hgt, hgt + 0.22, y)) * smoothstep(0.42, 0.78, cur);',
      '  float side = smoothstep(-0.2, 0.7, -d.z * 0.8 + d.x * 0.5);',
      '  c += (vec3(0.10, 0.50, 0.40) * 0.20 + vec3(0.30, 0.16, 0.48) * 0.10 * smoothstep(0.1, 0.35, y)) * aur * side * uBreath;',
      '  c += (hh(d * 613.0) - 0.5) * 0.010;',
      '  gl_FragColor = vec4(max(c, vec3(0.0)), 1.0);',
      '}'
    ].join('\n');

    /* ---- points: stars, signals, embers, smoke, steam, sugar. one soft-point shader with a few modes ---- */
    const PT_V = [
      'attribute vec3 aCol; attribute float aSize; attribute float aA; attribute float aSeed;',
      'uniform float uTime, uScale, uTwinkle, uFar; varying vec3 vC; varying float vA; varying float vSeed;',
      'void main(){',
      '  vec4 mv = modelViewMatrix * vec4(position, 1.0);',
      '  float tw = 1.0 + uTwinkle * (0.35 * sin(uTime * (1.3 + aSeed * 2.7) + aSeed * 40.0) + 0.2 * sin(uTime * (3.1 + aSeed * 5.0) + aSeed * 13.0));',
      '  vec3 wd = normalize((modelMatrix * vec4(position, 1.0)).xyz - cameraPosition);',
      '  float ext = mix(1.0, smoothstep(-0.02, 0.18, wd.y), uFar);',   // far points dim near the horizon
      '  vC = aCol; vA = aA * ext * tw; vSeed = aSeed;',
      '  gl_PointSize = uFar > 0.5 ? aSize * uScale * (0.85 + 0.15 * tw) : aSize * uScale / max(0.1, -mv.z);',
      '  gl_Position = projectionMatrix * mv;',
      '}'
    ].join('\n');
    // uMode 0: a glowing point (stars, signals, embers); 1: a soft cloud (smoke, steam)
    const PT_F = [
      'uniform float uMode, uTime; varying vec3 vC; varying float vA; varying float vSeed;', NOISE,
      'void main(){',
      '  vec2 p = gl_PointCoord * 2.0 - 1.0; float r = length(p);',
      '  if (r > 1.0) discard;',
      '  if (uMode < 0.5) {',
      '    float core = exp(-r * r * 9.0), halo = exp(-r * 3.2) * 0.35;',
      '    float spark = max(0.0, 1.0 - abs(p.x) * 14.0) * max(0.0, 1.0 - abs(p.y) * 1.4) + max(0.0, 1.0 - abs(p.y) * 14.0) * max(0.0, 1.0 - abs(p.x) * 1.4);',
      '    float a = (core + halo + spark * 0.25 * smoothstep(0.6, 1.4, vA)) * vA;',
      '    gl_FragColor = vec4(vC * a, 1.0);',
      '  } else {',
      '    float n = n3(vec3(p * 2.3 + vSeed * 9.0, uTime * 0.25 + vSeed * 3.0));',
      '    float a = smoothstep(1.0, 0.15, r + (n - 0.5) * 0.55) * vA;',
      '    gl_FragColor = vec4(vC, a);',
      '  }',
      '}'
    ].join('\n');
    function pointsMaterial(mode, far, additive) {
      return new THREE.ShaderMaterial({
        uniforms: { uTime: { value: 0 }, uScale: { value: 1 }, uTwinkle: { value: far ? 1 : 0 }, uFar: { value: far ? 1 : 0 }, uMode: { value: mode } },
        vertexShader: PT_V, fragmentShader: PT_F, transparent: true, depthWrite: false,
        blending: additive ? THREE.AdditiveBlending : THREE.NormalBlending
      });
    }
    // a pool of CPU-driven particles: position, colour, alpha, size, seed; a dead one has alpha 0
    function makePool(n, mode, additive) {
      const g = new THREE.BufferGeometry();
      const pos = new Float32Array(n * 3), col = new Float32Array(n * 3), a = new Float32Array(n), size = new Float32Array(n), seed = new Float32Array(n);
      for (let i = 0; i < n; i++) seed[i] = Math.random();
      g.setAttribute('position', new THREE.BufferAttribute(pos, 3)); g.setAttribute('aCol', new THREE.BufferAttribute(col, 3));
      g.setAttribute('aA', new THREE.BufferAttribute(a, 1)); g.setAttribute('aSize', new THREE.BufferAttribute(size, 1)); g.setAttribute('aSeed', new THREE.BufferAttribute(seed, 1));
      const m = pointsMaterial(mode, false, additive);
      const pts = new THREE.Points(g, m); pts.frustumCulled = false;
      const P = { pts: pts, n: n, pos: pos, col: col, a: a, size: size, seed: seed, life: new Float32Array(n), max: new Float32Array(n), vel: new Float32Array(n * 3), kind: new Uint8Array(n), next: 0 };
      P.spawn = function () { for (let k = 0; k < n; k++) { const i = (P.next + k) % n; if (P.life[i] <= 0) { P.next = (i + 1) % n; return i; } } const i = P.next; P.next = (i + 1) % n; return i; };
      P.flush = function () { g.attributes.position.needsUpdate = true; g.attributes.aCol.needsUpdate = true; g.attributes.aA.needsUpdate = true; g.attributes.aSize.needsUpdate = true; };
      return P;
    }

    /* ---- the flame: a noise-driven teardrop on a billboard, layered several deep; additive, never a looped sprite ---- */
    const FLAME_V = 'varying vec2 vUv; void main(){ vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }';
    const FLAME_F = [
      'uniform float uTime, uSeed, uHeat, uCore, uGain; varying vec2 vUv;', NOISE,
      'void main(){',
      '  float t = uTime * (1.25 + uSeed * 0.35);',
      '  vec2 p = vec2((vUv.x - 0.5) * 2.0, vUv.y);',
      '  float n = fbm(vec3(p.x * 2.1, p.y * 2.6 - t * 2.3, uSeed * 7.0));',
      '  float m = n3(vec3(p.x * 5.0, p.y * 6.5 - t * 4.2, uSeed * 3.0 + 1.0));',
      '  p.x += (n - 0.5) * 0.62 * p.y + (m - 0.5) * 0.18 * p.y;',
      '  float w = mix(0.66, 0.02, pow(clamp(p.y, 0.0, 1.0), 0.75)) * (0.8 + 0.4 * uHeat);',
      '  float body = 1.0 - smoothstep(w * 0.45, w, abs(p.x));',
      '  float top = 1.0 - smoothstep(0.45, 1.0, p.y + (n - 0.5) * 0.55 - uHeat * 0.12);',
      '  float base = smoothstep(0.0, 0.10, p.y);',
      '  float a = body * top * base * smoothstep(0.12, 0.52, n + 0.62 - p.y * 0.62);',
      '  float k = clamp(a * (1.3 - p.y * 0.7), 0.0, 1.0);',
      '  vec3 col = mix(vec3(0.50, 0.05, 0.02), vec3(1.0, 0.36, 0.05), smoothstep(0.08, 0.45, k));',
      '  col = mix(col, vec3(1.0, 0.74, 0.28), smoothstep(0.45, 0.78, k));',
      '  col = mix(col, vec3(1.0, 0.95, 0.80), smoothstep(0.80, 1.0, k) * uCore);',
      '  gl_FragColor = vec4(col * a * uGain, 1.0);',
      '}'
    ].join('\n');
    function flameMaterial(seed, core, gain) {
      return new THREE.ShaderMaterial({ uniforms: { uTime: { value: 0 }, uSeed: { value: seed }, uHeat: { value: 0.5 }, uCore: { value: core }, uGain: { value: gain } },
        vertexShader: FLAME_V, fragmentShader: FLAME_F, transparent: true, depthWrite: false, blending: THREE.AdditiveBlending, side: THREE.DoubleSide });
    }
    // a radial glow texture, drawn once
    function glowTexture(stops) {
      const cv = document.createElement('canvas'); cv.width = cv.height = 128;
      const g = cv.getContext('2d'), gr = g.createRadialGradient(64, 64, 0, 64, 64, 64);
      stops.forEach(function (s) { gr.addColorStop(s[0], s[1]); });
      g.fillStyle = gr; g.fillRect(0, 0, 128, 128);
      const tx = new THREE.CanvasTexture(cv); tx.colorSpace = THREE.SRGBColorSpace; return tx;
    }

    /* ---- the marshmallow: toasts from raw white through golden to charcoal, swells, bubbles, glows in its cracks, is bitten ---- */
    const MALLOW_V = [
      'uniform float uBubble, uTime, uSwell; varying vec3 vL; varying vec3 vN; varying vec3 vW; varying float vSide;', NOISE,
      'uniform vec3 uFireL;',
      'void main(){',
      '  vec3 p = position;',
      '  float b = pow(n3(p * 70.0 + vec3(0.0, uTime * 1.6, 0.0)), 3.0) + 0.6 * pow(n3(p * 140.0 - vec3(uTime * 2.1)), 4.0);',
      '  p += normal * b * uBubble * 0.0075;',
      '  p *= vec3(uSwell, mix(1.0, uSwell, 0.6), uSwell);',
      '  vL = position; vN = normalize(normalMatrix * normal);',
      '  vSide = dot(normal, normalize(uFireL));',
      '  vec4 w = modelMatrix * vec4(p, 1.0); vW = w.xyz;',
      '  gl_Position = projectionMatrix * viewMatrix * w;',
      '}'
    ].join('\n');
    const MALLOW_F = [
      'uniform float uToast, uFire, uHeat, uTime; uniform vec4 uBite1, uBite2; uniform vec3 uLight, uLightCol;', NOISE,
      'varying vec3 vL; varying vec3 vN; varying vec3 vW; varying float vSide;',
      'vec3 ramp(float t){',
      '  vec3 c = mix(vec3(0.96, 0.94, 0.90), vec3(0.95, 0.86, 0.68), smoothstep(0.0, 0.25, t));',
      '  c = mix(c, vec3(0.97, 0.74, 0.36), smoothstep(0.25, 0.50, t));',
      '  c = mix(c, vec3(0.66, 0.38, 0.15), smoothstep(0.52, 0.70, t));',
      '  c = mix(c, vec3(0.30, 0.16, 0.07), smoothstep(0.68, 0.82, t));',
      '  c = mix(c, vec3(0.07, 0.05, 0.04), smoothstep(0.82, 0.96, t));',
      '  return c;',
      '}',
      'void main(){',
      '  if (uBite1.w > 0.0 && distance(vL, uBite1.xyz) < uBite1.w) discard;',
      '  if (uBite2.w > 0.0 && distance(vL, uBite2.xyz) < uBite2.w) discard;',
      '  float spot = n3(vL * 55.0), fine = n3(vL * 150.0);',
      '  float tt = clamp(uToast + (spot - 0.5) * 0.16 * uToast + vSide * 0.07 * uToast, 0.0, 1.0);',
      '  vec3 c = ramp(tt);',
      '  c *= 1.0 - smoothstep(0.55, 0.9, fine) * 0.18 * smoothstep(0.18, 0.6, uToast);',
      '  vec3 N = normalize(vN);',
      '  if (!gl_FrontFacing) { c = mix(vec3(1.0, 0.97, 0.90), vec3(0.99, 0.86, 0.60), smoothstep(0.35, 0.9, uToast)); N = -N; }',
      '  vec3 L = normalize(uLight - vW);',
      '  float d = max(dot(N, L), 0.0);',
      '  vec3 col = c * (0.20 + uLightCol * (0.30 + 0.90 * d)) + c * vec3(0.10, 0.14, 0.30) * max(N.y, 0.0) * 0.6;',
      '  float crack = smoothstep(0.64, 0.72, n3(vL * 95.0 + vec3(0.0, uTime * 0.4, 0.0))) * smoothstep(0.78, 0.95, uToast);',
      '  col += vec3(1.0, 0.33, 0.04) * crack * (0.25 + 1.4 * uFire + 0.6 * uHeat) * (0.65 + 0.35 * sin(uTime * 11.0 + spot * 20.0));',
      '  col += c * vec3(1.0, 0.45, 0.15) * uHeat * 0.35 * (1.0 - tt);',
      '  gl_FragColor = vec4(col, 1.0);',
      '}'
    ].join('\n');

    /* ---- state ---- */
    let sky, skyPivot, stars, signalPts, routeLine, sun, sunGlow, planets = [], orbitLines = [], meteors = [], crosser = null;
    let fireLight, fireLight2, groundGlow, fireHalo, coals, flames = [], embers, smoke, steam, sugar, trees, treeMat;
    let stick, stickMat, mallow, mallowMat, mallowFlame, tallyTex, tallyCtx, bag, targetHalo, playHalo, cursorHalo;
    const SKY = { angle: 0, speed: 2 * Math.PI / 1800, axis: new THREE.Vector3(0.12, 1, 0.05).normalize() };
    const sig = { list: [], bySlug: {}, freqs: [], freq: 0, lit: null, playing: null, queue: [], cursor: null, target: null, strength: 0, angle: 99, dwell: 0, hl: null, nearest: null };
    const look = { lean: 0, yaw: 0, pitch: -1 * DEG, yawT: 0, pitchT: -1 * DEG, cy: 0, cp: -1 * DEG, oy: 0, op: 0, fov: 62, fovT: 62, scopeFov: 13 };
    const fire = { heat: 0.6, flick: 1, pop: 0, nextPop: 1.5, nextCrackle: 0.2, beat: 0, loud: 0 };
    const M = { on: false, toast: 0, heat: 0, fire: 0, fireFor: 0, held: false, ext: 0, eating: -1, scale: 0, bites: 0, appear: 0, caught: false, bend: 0, swayV: 0, sway: 0, tip: new THREE.Vector3(), pos: new THREE.Vector3(), dir: new THREE.Vector3(0, 0, -1), steamFor: 0 };
    const tmp = { v: new THREE.Vector3(), v2: new THREE.Vector3(), v3: new THREE.Vector3(), q: new THREE.Quaternion(), m: new THREE.Matrix4() };
    const hooks = { onFrame: null, onPop: null, onCrackle: null, onLockDwell: null, onMallow: null };
    let sched = { meteorAt: 6 + Math.random() * 6, crossAt: 14, crossKind: 0 };

    /* ---- building ---- */
    function mergeGeoms(parts) {
      // non-indexed concatenation of position, normal and a per-part colour
      let n = 0; const gs = parts.map(function (p) { const g = p.g.index ? p.g.toNonIndexed() : p.g; g.computeVertexNormals(); n += g.attributes.position.count; return { g: g, c: new THREE.Color(p.c) }; });
      const pos = new Float32Array(n * 3), nor = new Float32Array(n * 3), col = new Float32Array(n * 3);
      let o = 0;
      gs.forEach(function (p) {
        const a = p.g.attributes.position.array, b = p.g.attributes.normal.array;
        pos.set(a, o * 3); nor.set(b, o * 3);
        for (let i = 0; i < p.g.attributes.position.count; i++) { col[(o + i) * 3] = p.c.r; col[(o + i) * 3 + 1] = p.c.g; col[(o + i) * 3 + 2] = p.c.b; }
        o += p.g.attributes.position.count;
      });
      const g = new THREE.BufferGeometry();
      g.setAttribute('position', new THREE.BufferAttribute(pos, 3)); g.setAttribute('normal', new THREE.BufferAttribute(nor, 3)); g.setAttribute('color', new THREE.BufferAttribute(col, 3));
      return g;
    }
    function lambert(opts) { const m = new THREE.MeshLambertMaterial(Object.assign({ flatShading: true }, opts || {})); return m; }

    function buildGround() {
      const geo = new THREE.IcosahedronGeometry(R, 14);
      const pos = geo.attributes.position, col = new Float32Array(pos.count * 3), v = new THREE.Vector3(), c = new THREE.Color();
      const grass = new THREE.Color('#1e3a2a'), grass2 = new THREE.Color('#2c4a2c'), dirt = new THREE.Color('#4a3424'), rock = new THREE.Color('#4a4a52');
      for (let i = 0; i < pos.count; i++) {
        v.fromBufferAttribute(pos, i); const dir = v.clone().normalize();
        const h = height(dir); v.copy(dir).multiplyScalar(R + h); pos.setXYZ(i, v.x, v.y, v.z);
        const arc = Math.acos(clamp(dir.y, -1, 1)) * R;
        const k = vnoise(dir.x * 20, dir.y * 20, dir.z * 20);
        c.copy(grass).lerp(grass2, k);
        const ringD = Math.hypot(dir.x * R, dir.z * R - FZ);
        c.lerp(dirt, 1 - smooth(1.6, 3.6, Math.min(ringD, arc + 1.2)));
        c.lerp(rock, smooth(1.4, 2.6, h) * 0.85);
        col[i * 3] = c.r; col[i * 3 + 1] = c.g; col[i * 3 + 2] = c.b;
      }
      geo.setAttribute('color', new THREE.BufferAttribute(col, 3));
      geo.computeVertexNormals();
      const ground = new THREE.Mesh(geo, lambert({ vertexColors: true }));
      ground.position.copy(CENTRE);
      scene.add(ground);
    }
    function buildTrees(count) {
      const r = rng(7);
      const parts = [{ g: new THREE.CylinderGeometry(0.07, 0.11, 0.9, 5).translate(0, 0.45, 0), c: '#3b2616' }];
      [[0.62, 1.1, 0.75], [0.48, 0.95, 1.35], [0.32, 0.8, 1.9]].forEach(function (t) { parts.push({ g: new THREE.ConeGeometry(t[0], t[1], 6).translate(0, t[2], 0), c: '#1d3b2c' }); });
      const geo = mergeGeoms(parts);
      treeMat = lambert({ vertexColors: true });
      treeMat.onBeforeCompile = function (sh) {
        sh.uniforms.uTime = { value: 0 }; treeMat.userData.sh = sh;
        sh.vertexShader = 'uniform float uTime;\n' + sh.vertexShader.replace('#include <begin_vertex>',
          '#include <begin_vertex>\nfloat sw = position.y * position.y * 0.012; transformed.x += sin(uTime * 0.9 + instanceMatrix[3].x * 0.35 + instanceMatrix[3].z * 0.2) * sw; transformed.z += cos(uTime * 0.7 + instanceMatrix[3].z * 0.3) * sw * 0.7;');
      };
      const list = [];
      let tries = 0;
      while (list.length < count && tries++ < count * 30) {
        const a = r() * Math.PI * 2, d = 4.6 + Math.pow(r(), 0.8) * 26;
        const x = Math.cos(a) * d, z = Math.sin(a) * d;
        if (z > 1.5 && Math.abs(x) < 4.5 && d < 9) continue;                      // the camp behind you
        if (Math.hypot(x, z - FZ) < 4.4) continue;                                // the clearing round the fire
        if (list.some(function (t) { return Math.hypot(t.x - x, t.z - z) < 1.0; })) continue;
        list.push({ x: x, z: z, s: 0.8 + r() * 0.9, spin: r() * 6.28, tint: 0.7 + r() * 0.5 });
      }
      trees = new THREE.InstancedMesh(geo, treeMat, list.length);
      const m = new THREE.Matrix4(), q = new THREE.Quaternion(), s = new THREE.Vector3(), o = new THREE.Object3D(), c = new THREE.Color();
      list.forEach(function (t, i) {
        orient(o, t.x, t.z, t.spin); o.position.addScaledVector(upAt(t.x, t.z), -0.05); o.scale.setScalar(t.s * 1.35); o.updateMatrix();
        trees.setMatrixAt(i, o.matrix); trees.setColorAt(i, c.setRGB(t.tint, t.tint, t.tint * 1.05));
      });
      trees.instanceMatrix.needsUpdate = true; if (trees.instanceColor) trees.instanceColor.needsUpdate = true;
      scene.add(trees);
      // rocks on the ridge and round the clearing
      const rg = new THREE.IcosahedronGeometry(1, 0);
      const rocks = new THREE.InstancedMesh(rg, lambert({ color: '#5a5a66' }), 34);
      for (let i = 0; i < 34; i++) {
        const a = -2.35 + (r() - 0.5) * 1.1, d = 7 + r() * 11;
        const x = i < 20 ? Math.cos(a) * d : (r() - 0.5) * 14, z = i < 20 ? Math.sin(a) * d : -5 - r() * 8;
        orient(o, x, z, r() * 6.28); o.scale.set(0.4 + r() * 1.3, 0.3 + r() * 0.9, 0.4 + r() * 1.1); o.updateMatrix(); rocks.setMatrixAt(i, o.matrix);
      }
      rocks.instanceMatrix.needsUpdate = true; scene.add(rocks);
    }
    function log(x, z, len, r, spin, lift) {
      const g = new THREE.CylinderGeometry(r, r * 1.05, len, 9); g.rotateZ(Math.PI / 2);
      const mesh = new THREE.Mesh(g, lambert({ color: '#5a3a24' }));
      orient(mesh, x, z, spin); mesh.position.addScaledVector(upAt(x, z), r * 0.8 + (lift || 0));
      const capG = new THREE.CircleGeometry(r * 0.92, 9);
      [-1, 1].forEach(function (s) { const cap = new THREE.Mesh(capG, lambert({ color: '#b08a5c' })); cap.position.x = s * (len / 2 + 0.002); cap.rotation.y = s * Math.PI / 2; mesh.add(cap); });
      scene.add(mesh); return mesh;
    }
    function buildCamp() {
      // the logs: the one you sit on, one across the fire with the tally carved in it, one to the side
      log(0, 0.75, 2.4, 0.22, 0.05, -0.1);
      const across = log(0.2, FZ - 2.3, 2.6, 0.25, -0.12);
      log(2.6, FZ + 0.2, 2.0, 0.21, 1.25);
      // the tally: a carved strip on the face of the log across the fire, facing you
      const cv = document.createElement('canvas'); cv.width = 512; cv.height = 96; tallyCtx = cv.getContext('2d');
      tallyTex = new THREE.CanvasTexture(cv); tallyTex.colorSpace = THREE.SRGBColorSpace;
      const plate = new THREE.Mesh(new THREE.PlaneGeometry(1.6, 0.3), new THREE.MeshLambertMaterial({ map: tallyTex, transparent: true }));
      plate.position.set(0, 0.02, 0.258); across.add(plate);
      drawTally(0);
      // the fire pit: a ring of stones, a teepee of logs, a bed of coals
      const st = new THREE.InstancedMesh(new THREE.DodecahedronGeometry(0.17, 0), lambert({ color: '#55555e' }), 12);
      const o = new THREE.Object3D(), r = rng(3);
      for (let i = 0; i < 12; i++) { const a = i / 12 * Math.PI * 2; o.position.copy(FIRE).add(new THREE.Vector3(Math.cos(a) * 0.66, 0.06, Math.sin(a) * 0.66)); o.rotation.set(r() * 3, r() * 3, r() * 3); o.scale.set(1.1, 0.75, 1); o.updateMatrix(); st.setMatrixAt(i, o.matrix); }
      st.instanceMatrix.needsUpdate = true; scene.add(st);
      const wood = lambert({ color: '#3a2414' });
      for (let i = 0; i < 5; i++) {
        const a = i / 5 * Math.PI * 2 + 0.94, g = new THREE.CylinderGeometry(0.04, 0.06, 0.78, 6);
        const m = new THREE.Mesh(g, wood); m.position.copy(FIRE).add(new THREE.Vector3(Math.cos(a) * 0.21, 0.26, Math.sin(a) * 0.21));
        m.lookAt(FIRE.clone().add(new THREE.Vector3(0, 0.75, 0))); m.rotateX(Math.PI / 2); scene.add(m);
      }
      coals = new THREE.Mesh(new THREE.CircleGeometry(0.52, 24), new THREE.ShaderMaterial({
        uniforms: { uTime: { value: 0 }, uHeat: { value: 0.6 } }, transparent: true, depthWrite: false, blending: THREE.AdditiveBlending,
        vertexShader: 'varying vec2 vP; void main(){ vP = position.xy; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }',
        fragmentShader: ['uniform float uTime, uHeat; varying vec2 vP;', NOISE, 'void main(){ float r = length(vP) / 0.62; float n = fbm(vec3(vP * 9.0, uTime * 0.35)); float g = smoothstep(0.42, 0.75, n) * (1.0 - smoothstep(0.55, 1.0, r)); vec3 c = mix(vec3(0.6, 0.08, 0.02), vec3(1.0, 0.5, 0.12), smoothstep(0.55, 0.85, n)) * g * (0.6 + 0.6 * uHeat); gl_FragColor = vec4(c, 1.0); }'].join('\n')
      }));
      coals.rotation.x = -Math.PI / 2; coals.position.copy(FIRE).add(new THREE.Vector3(0, 0.03, 0)); scene.add(coals);
      // the cabin behind you: planks, a pitched roof, a warm window, a porch post with a lantern glow
      const cabin = new THREE.Group();
      const body = new THREE.Mesh(new THREE.BoxGeometry(3.4, 2.0, 2.6), lambert({ color: '#5b3b23' })); body.position.y = 1.0; cabin.add(body);
      const roof = new THREE.Mesh(new THREE.CylinderGeometry(0.01, 2.7, 1.4, 4, 1), lambert({ color: '#3d2a1f' })); roof.rotation.y = Math.PI / 4; roof.scale.set(1.25, 1, 0.95); roof.position.y = 2.7; cabin.add(roof);
      const win = new THREE.Mesh(new THREE.PlaneGeometry(0.7, 0.55), new THREE.MeshBasicMaterial({ color: '#ffb35c' })); win.position.set(0.8, 1.2, -1.31); win.rotation.y = Math.PI; cabin.add(win);
      const door = new THREE.Mesh(new THREE.PlaneGeometry(0.75, 1.4), lambert({ color: '#2c1b10' })); door.position.set(-0.7, 0.7, -1.31); door.rotation.y = Math.PI; cabin.add(door);
      orient(cabin, 0.8, 6.4, 0.15); scene.add(cabin);
      const winGlow = new THREE.Sprite(new THREE.SpriteMaterial({ fog: false, map: glowTexture([[0, 'rgba(255,170,80,0.55)'], [1, 'rgba(255,120,40,0)']]), blending: THREE.AdditiveBlending, depthWrite: false }));
      winGlow.scale.setScalar(2.2); cabin.add(winGlow); winGlow.position.set(0.8, 1.2, -1.6);
      // a stump to your right with the bag of marshmallows on it
      const stump = new THREE.Mesh(new THREE.CylinderGeometry(0.3, 0.36, 0.5, 9), lambert({ color: '#4d3220' })); orient(stump, 1.55, -0.7); stump.position.addScaledVector(upAt(1.55, -0.7), 0.25); scene.add(stump);
      const bcv = document.createElement('canvas'); bcv.width = 128; bcv.height = 160; const bg = bcv.getContext('2d');
      bg.fillStyle = '#f2ece2'; bg.fillRect(0, 0, 128, 160); bg.fillStyle = '#e88aa0'; bg.fillRect(0, 54, 128, 46);
      bg.fillStyle = '#fff8ee'; bg.font = '600 19px sans-serif'; bg.textAlign = 'center'; bg.fillText('marsh', 64, 74); bg.fillText('mallows', 64, 94);
      const btx = new THREE.CanvasTexture(bcv); btx.colorSpace = THREE.SRGBColorSpace;
      bag = new THREE.Mesh(new THREE.BoxGeometry(0.34, 0.42, 0.16), new THREE.MeshLambertMaterial({ map: btx }));
      bag.position.copy(stump.position).addScaledVector(upAt(1.55, -0.7), 0.46); bag.rotation.set(-0.12, -0.5, 0.06); scene.add(bag);
    }
    function drawTally(n) {
      if (!tallyCtx) return;
      const g = tallyCtx; g.clearRect(0, 0, 512, 96);
      const marks = Math.min(n, 40);
      g.lineCap = 'round';
      for (let i = 0; i < marks; i++) {
        const grp = Math.floor(i / 5), k = i % 5, x0 = 24 + grp * 62;
        const draw = function (x1, y1, x2, y2) {
          g.strokeStyle = 'rgba(30,16,8,0.95)'; g.lineWidth = 6; g.beginPath(); g.moveTo(x1, y1); g.lineTo(x2, y2); g.stroke();
          g.strokeStyle = 'rgba(210,170,120,0.55)'; g.lineWidth = 2; g.beginPath(); g.moveTo(x1 + 2, y1 + 1); g.lineTo(x2 + 2, y2 + 1); g.stroke();
        };
        if (k < 4) draw(x0 + k * 11, 18, x0 + k * 11 + 2, 78); else draw(x0 - 6, 70, x0 + 44, 26);
      }
      if (tallyTex) tallyTex.needsUpdate = true;
    }
    function buildFire() {
      const seeds = [[0.15, 0.95, 0.72, 0.5, 0.75], [0.62, 0.85, 0.64, 0.45, 0.8], [0.33, 0.72, 0.55, 0.85, 1.0], [0.88, 0.66, 0.5, 0.9, 1.0], [0.47, 0.55, 0.4, 1.0, 1.2], [0.71, 0.46, 0.34, 1.0, 1.3], [0.05, 0.36, 0.27, 1.0, 1.4]];
      seeds.forEach(function (s, i) {
        const m = new THREE.Mesh(new THREE.PlaneGeometry(1, 1).translate(0, 0.5, 0), flameMaterial(s[0], s[3], s[4]));
        m.userData = { h: s[1], w: s[2], a: i / seeds.length * Math.PI * 2, r: i < 2 ? 0.11 : i < 4 ? 0.07 : 0.03, base: s[1] };
        m.renderOrder = 3 + i; scene.add(m); flames.push(m);
      });
      fireLight = new THREE.PointLight('#ff8a3c', 14, 0, 1.25); fireLight.position.copy(FIRE).add(new THREE.Vector3(0, 0.55, 0)); scene.add(fireLight);
      fireLight2 = new THREE.PointLight('#ffb15e', 4, 0, 1.6); fireLight2.position.copy(FIRE).add(new THREE.Vector3(0, 1.2, 0)); scene.add(fireLight2);
      groundGlow = new THREE.Mesh(new THREE.CircleGeometry(4.2, 32), new THREE.MeshBasicMaterial({ map: glowTexture([[0, 'rgba(255,140,60,0.3)'], [0.4, 'rgba(255,100,40,0.09)'], [1, 'rgba(255,80,30,0)']]), transparent: true, blending: THREE.AdditiveBlending, depthWrite: false }));
      groundGlow.rotation.x = -Math.PI / 2; groundGlow.position.copy(FIRE).add(new THREE.Vector3(0, 0.05, 0)); scene.add(groundGlow);
      fireHalo = new THREE.Sprite(new THREE.SpriteMaterial({ fog: false, map: glowTexture([[0, 'rgba(255,170,90,0.55)'], [0.35, 'rgba(255,110,40,0.16)'], [1, 'rgba(255,80,20,0)']]), blending: THREE.AdditiveBlending, depthWrite: false }));
      fireHalo.position.copy(FIRE).add(new THREE.Vector3(0, 0.5, 0)); fireHalo.scale.setScalar(3.2); fireHalo.renderOrder = 2; scene.add(fireHalo);
      embers = makePool(C.phone ? 140 : 240, 0, true); scene.add(embers.pts);
      smoke = makePool(46, 1, false); smoke.pts.renderOrder = 12; scene.add(smoke.pts);
      steam = makePool(40, 1, false); steam.pts.renderOrder = 13; scene.add(steam.pts);
      sugar = makePool(60, 0, true); scene.add(sugar.pts);
    }
    /* ---- the worlds round the low sun (the owner's "gray tier", issue #64): each built from a concept alone, in our own
       shapes and palette, on its own orbit with its own period and spin, lit by the sun. no names anywhere. ---- */
    const SUN_AZ = 38 * DEG, SUN_EL = 2.2 * DEG, WD = 650;
    // sky coordinates round the sun: u degrees to the right, v degrees up
    function skyDir(u, v, out) {
      const el = SUN_EL + v * DEG, az = SUN_AZ + u * DEG / Math.max(0.3, Math.cos(el));
      return (out || new THREE.Vector3()).set(Math.sin(az) * Math.cos(el), Math.sin(el), -Math.cos(az) * Math.cos(el));
    }
    // a Kepler ellipse with the sun at its focus, the far end pointing along w (so the worlds spend most of their year up in the
    // sky and swing fast and low past the sun); the moon instead circles a point high in the sky, round the home world
    function orbitUV(o, t, out) {
      if (o.circle) { const th = o.phase + t / o.period * Math.PI * 2; out.u = o.cu + Math.cos(th) * o.a; out.v = o.cv + Math.sin(th) * o.a * 0.5; return out; }
      const M = o.phase + t / o.period * Math.PI * 2; let E = M;
      for (let i = 0; i < 6; i++) E = E - (E - o.e * Math.sin(E) - M) / (1 - o.e * Math.cos(E));
      const x = o.a * (Math.cos(E) - o.e), y = o.a * Math.sqrt(1 - o.e * o.e) * Math.sin(E) * o.flip;
      const c = Math.cos(o.w), s = Math.sin(o.w);
      out.u = -x * c + y * s; out.v = -x * s - y * c; return out;
    }
    const WORLDS = [
      { id: 'pair', a: 14, e: 0.28, w: 104 * DEG, period: 1100, phase: 2.7, flip: 1, size: 22, spin: 0.05 },
      { id: 'sea', a: 21, e: 0.18, w: 62 * DEG, period: 1700, phase: 2.4, flip: -1, size: 26, spin: 0.03 },
      { id: 'thorns', a: 27, e: 0.30, w: 128 * DEG, period: 2600, phase: 3.3, flip: 1, size: 28, spin: 0.012 },
      { id: 'ice', a: 16, e: 0.78, w: 84 * DEG, period: 1560, phase: 2.9, flip: -1, size: 8, spin: 0.2 },
      { id: 'moon', circle: true, cu: -62, cv: 26, a: 14, period: 720, phase: 0.6, size: 16, spin: 0.02 },
      { id: 'shell', a: 18, e: 0.22, w: 40 * DEG, period: 1400, phase: 3.7, flip: 1, size: 21, spin: 0.025 },
      { id: 'platform', a: 6, e: 0.06, w: 90 * DEG, period: 260, phase: 0.4, flip: -1, size: 7, spin: 0.25 }
    ];
    // which world each frequency lives round, biggest frequency first
    const FREQ_WORLD = [1, 2, 0, 5, 4, 3, 6];
    const WORLD_F = [
      'uniform vec3 uSun, uA, uB, uC; uniform float uKind, uTime; varying vec3 vN; varying vec3 vW; varying vec3 vL;', NOISE,
      'vec3 rot(vec3 p, vec3 k, float a){ return p * cos(a) + cross(k, p) * sin(a) + k * dot(k, p) * (1.0 - cos(a)); }',
      'void main(){',
      '  vec3 n = normalize(vN); vec3 L = normalize(uSun - vW); float d = dot(n, L); float lit = smoothstep(-0.12, 0.42, d);',
      '  vec3 p = normalize(vL); vec3 c; float glow = 0.0;',
      '  if (uKind < 0.5) {',                                         // sand: drifting dunes in bands
      '    float du = sin(p.y * 24.0 + fbm(p * 4.0 + uTime * 0.004) * 7.0) * 0.5 + 0.5;',
      '    c = mix(uA, uB, du * 0.55 + fbm(p * 7.0) * 0.45);',
      '  } else if (uKind < 1.5) {',                                  // a deep sea under turning storms
      '    c = mix(uA, uB, fbm(p * 3.0 + vec3(uTime * 0.01)));',
      '    vec3 q = p; float cl = 0.0;',
      '    vec3 k1 = normalize(vec3(0.5, 0.6, 0.62)), k2 = normalize(vec3(-0.6, -0.2, 0.75)), k3 = normalize(vec3(0.1, -0.7, -0.7));',
      '    float a1 = acos(clamp(dot(p, k1), -1.0, 1.0)), a2 = acos(clamp(dot(p, k2), -1.0, 1.0)), a3 = acos(clamp(dot(p, k3), -1.0, 1.0));',
      '    q = rot(q, k1, max(0.0, 0.7 - a1) * 9.0 + uTime * 0.35);',
      '    q = rot(q, k2, max(0.0, 0.55 - a2) * 10.0 - uTime * 0.3);',
      '    q = rot(q, k3, max(0.0, 0.5 - a3) * 9.0 + uTime * 0.25);',
      '    cl = smoothstep(0.48, 0.72, fbm(q * 5.0 + vec3(0.0, uTime * 0.02, 0.0)));',
      '    cl += (1.0 - smoothstep(0.0, 0.08, a1)) * 0.3;',
      '    c = mix(c, uC, clamp(cl, 0.0, 1.0) * 0.9);',
      '  } else if (uKind < 2.5) {',                                  // a small grey moon, pocked
      '    float cr = smoothstep(0.62, 0.7, n3(p * 9.0)) - smoothstep(0.7, 0.76, n3(p * 9.0)) * 0.6 + smoothstep(0.66, 0.72, n3(p * 21.0 + 4.0)) * 0.5;',
      '    c = mix(uA, uB, fbm(p * 5.0)) * (1.0 - 0.35 * cr);',
      '  } else if (uKind < 3.5) {',                                  // a cracked shell, light in the cracks
      '    float f = fbm(p * 3.6), f2 = fbm(p * 8.0 + 3.0);',
      '    float cr = 1.0 - smoothstep(0.0, 0.03, abs(f - 0.5));',
      '    cr = max(cr, (1.0 - smoothstep(0.0, 0.025, abs(f2 - 0.5))) * 0.7);',
      '    c = mix(uA, uB, fbm(p * 7.0)); glow = cr;',
      '    if (!gl_FrontFacing) { c *= 0.25; glow *= 0.4; }',
      '  } else {',                                                   // ice
      '    c = mix(uA, uB, fbm(p * 5.0)) + uC * pow(max(dot(reflect(-L, n), normalize(cameraPosition - vW)), 0.0), 16.0) * 0.6;',
      '  }',
      '  vec3 V = normalize(cameraPosition - vW); float rim = pow(1.0 - max(dot(n, V), 0.0), 3.0);',
      '  vec3 col = c * (0.035 + 1.05 * lit) + uC * rim * 0.28 * smoothstep(-0.3, 0.2, d) + uC * glow * (0.75 + 0.25 * sin(uTime * 1.1 + p.x * 9.0));',
      '  gl_FragColor = vec4(col, 1.0);',
      '}'
    ].join('\n');
    const WORLD_V = 'varying vec3 vN; varying vec3 vW; varying vec3 vL; void main(){ vN = normalize(mat3(modelMatrix) * normal); vL = position; vec4 w = modelMatrix * vec4(position, 1.0); vW = w.xyz; gl_Position = projectionMatrix * viewMatrix * w; }';
    const worldMats = [];
    function worldMat(kind, a, b, c, S, side) {
      const m = new THREE.ShaderMaterial({ uniforms: { uSun: { value: S }, uA: { value: new THREE.Color(a) }, uB: { value: new THREE.Color(b) }, uC: { value: new THREE.Color(c) }, uKind: { value: kind }, uTime: { value: 0 } }, vertexShader: WORLD_V, fragmentShader: WORLD_F, side: side || THREE.FrontSide });
      worldMats.push(m); return m;
    }
    const W_ = { list: [], uv: { u: 0, v: 0 } };
    const WSCALE = 1.4;
    function buildWorlds(S) {
      // the key light: the sun's own warmth, but placed toward the viewer's side of it, so the worlds read as lit discs and
      // crescents rather than silhouettes against the glow (an artist's sun, not an astronomer's)
      const sunPos = S.clone().add(new THREE.Vector3(-620, 430, 780));
      WORLDS.forEach(function (o, wi) {
        const g = new THREE.Group(); g.renderOrder = -3; scene.add(g);
        const w = { o: o, g: g, parts: {}, uv: { u: 0, v: 0 }, dir: new THREE.Vector3(), radiusDeg: o.size * (o.id === 'pair' ? 1.3 : WSCALE) / WD / DEG };
        if (o.id !== 'pair') g.scale.setScalar(WSCALE);
        if (o.id === 'pair') {
          // two worlds close together, one pouring a stream of sand to the other
          const a = new THREE.Mesh(new THREE.SphereGeometry(11, 32, 20), worldMat(0, '#d79a74', '#9c5f4b', '#ffcf9e', sunPos));
          const b = new THREE.Mesh(new THREE.SphereGeometry(9, 32, 20), worldMat(0, '#cdb88e', '#8f7a5c', '#f6e2b0', sunPos));
          g.add(a); g.add(b); w.parts.a = a; w.parts.b = b;
          const n = 110, sg = new THREE.BufferGeometry();
          const pos = new Float32Array(n * 3), col = new Float32Array(n * 3), al = new Float32Array(n), sz = new Float32Array(n), sd = new Float32Array(n);
          for (let i = 0; i < n; i++) { sd[i] = Math.random(); col[i * 3] = 1.0; col[i * 3 + 1] = 0.82; col[i * 3 + 2] = 0.55; }
          sg.setAttribute('position', new THREE.BufferAttribute(pos, 3)); sg.setAttribute('aCol', new THREE.BufferAttribute(col, 3)); sg.setAttribute('aA', new THREE.BufferAttribute(al, 1)); sg.setAttribute('aSize', new THREE.BufferAttribute(sz, 1)); sg.setAttribute('aSeed', new THREE.BufferAttribute(sd, 1));
          const sm = pointsMaterial(0, false, true); const sand = new THREE.Points(sg, sm); sand.frustumCulled = false; scene.add(sand); w.parts.sand = sand;
        } else if (o.id === 'sea') {
          g.add(new THREE.Mesh(new THREE.SphereGeometry(o.size, 40, 26), worldMat(1, '#0d3f55', '#1c6f73', '#eaf4f1', sunPos)));
        } else if (o.id === 'thorns') {
          // a dark world wrapped in thorns and fog
          g.add(new THREE.Mesh(new THREE.SphereGeometry(15, 28, 18), worldMat(2, '#2a1d27', '#3b2733', '#8c6d8a', sunPos)));
          const cone = new THREE.ConeGeometry(1.3, 13, 5).translate(0, 6.5, 0);
          const th = new THREE.InstancedMesh(cone, worldMat(2, '#24161f', '#3a2431', '#9a7a96', sunPos), 54);
          const o3 = new THREE.Object3D(), r = rng(21);
          for (let i = 0; i < 54; i++) {
            const u = r() * 2 - 1, a = r() * Math.PI * 2, s = Math.sqrt(1 - u * u), d = new THREE.Vector3(s * Math.cos(a), u, s * Math.sin(a));
            o3.position.copy(d).multiplyScalar(13); o3.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), d.clone().add(new THREE.Vector3((r() - 0.5) * 0.7, (r() - 0.5) * 0.7, (r() - 0.5) * 0.7)).normalize());
            o3.scale.set(0.7 + r() * 0.6, 0.6 + r() * 0.9, 0.7 + r() * 0.6); o3.updateMatrix(); th.setMatrixAt(i, o3.matrix);
          }
          th.instanceMatrix.needsUpdate = true; g.add(th);
          const fog = new THREE.Mesh(new THREE.SphereGeometry(23, 36, 22), new THREE.ShaderMaterial({ transparent: true, depthWrite: false,
            uniforms: { uTime: { value: 0 }, uSun: { value: sunPos } },
            vertexShader: WORLD_V,
            fragmentShader: ['uniform float uTime; uniform vec3 uSun; varying vec3 vN; varying vec3 vW; varying vec3 vL;', NOISE,
              'void main(){ vec3 n = normalize(vN); vec3 V = normalize(cameraPosition - vW); float f = fbm(normalize(vL) * 3.2 + vec3(uTime * 0.02, uTime * 0.012, 0.0));',
              '  float edge = 1.0 - max(dot(n, V), 0.0); float lit = 0.25 + 0.75 * smoothstep(-0.3, 0.6, dot(n, normalize(uSun - vW)));',
              '  float a = clamp((0.22 + 0.55 * f) * (0.35 + 0.9 * edge), 0.0, 0.92);',
              '  gl_FragColor = vec4(vec3(0.80, 0.78, 0.86) * lit, a); }'].join('\n') }));
          fog.renderOrder = -2; g.add(fog); w.parts.fog = fog;
        } else if (o.id === 'ice') {
          const ig = new THREE.IcosahedronGeometry(4.5, 1), ip = ig.attributes.position, r = rng(31);
          for (let i = 0; i < ip.count; i++) { const k = 0.8 + r() * 0.35; ip.setXYZ(i, ip.getX(i) * k, ip.getY(i) * k * 1.2, ip.getZ(i) * k); }
          ig.computeVertexNormals();
          g.add(new THREE.Mesh(ig, worldMat(4, '#e2f0fb', '#8fb2cc', '#c7ecff', sunPos)));
          const coma = new THREE.Sprite(new THREE.SpriteMaterial({ fog: false, map: glowTexture([[0, 'rgba(210,240,255,0.7)'], [0.4, 'rgba(150,210,255,0.18)'], [1, 'rgba(120,180,255,0)']]), blending: THREE.AdditiveBlending, depthWrite: false }));
          coma.scale.setScalar(34); g.add(coma);
          const n = 120, tg = new THREE.BufferGeometry();
          const pos = new Float32Array(n * 3), col = new Float32Array(n * 3), al = new Float32Array(n), sz = new Float32Array(n), sd = new Float32Array(n);
          for (let i = 0; i < n; i++) { sd[i] = Math.random(); const ion = i % 3 === 0; col[i * 3] = ion ? 0.6 : 1.0; col[i * 3 + 1] = ion ? 0.85 : 0.88; col[i * 3 + 2] = ion ? 1.0 : 0.7; }
          tg.setAttribute('position', new THREE.BufferAttribute(pos, 3)); tg.setAttribute('aCol', new THREE.BufferAttribute(col, 3)); tg.setAttribute('aA', new THREE.BufferAttribute(al, 1)); tg.setAttribute('aSize', new THREE.BufferAttribute(sz, 1)); tg.setAttribute('aSeed', new THREE.BufferAttribute(sd, 1));
          const tail = new THREE.Points(tg, pointsMaterial(0, false, true)); tail.frustumCulled = false; scene.add(tail); w.parts.tail = tail;
        } else if (o.id === 'moon') {
          g.add(new THREE.Mesh(new THREE.SphereGeometry(o.size, 32, 20), worldMat(2, '#8f8b86', '#5d5a58', '#d6cfc4', sunPos)));
        } else if (o.id === 'shell') {
          // a cracked world, empty inside, with a hole in its crust, shedding pieces into a dark core
          const shell = new THREE.Mesh(new THREE.SphereGeometry(o.size, 40, 26, 0, Math.PI * 2, 0.62, Math.PI - 0.62), worldMat(3, '#3d3644', '#25212c', '#86e3d2', sunPos, THREE.DoubleSide));
          g.add(shell);
          const core = new THREE.Mesh(new THREE.SphereGeometry(6, 20, 14), new THREE.MeshBasicMaterial({ color: '#050409', fog: false })); g.add(core);
          const cg = new THREE.Sprite(new THREE.SpriteMaterial({ fog: false, map: glowTexture([[0, 'rgba(120,90,200,0.35)'], [1, 'rgba(60,40,120,0)']]), blending: THREE.AdditiveBlending, depthWrite: false })); cg.scale.setScalar(20); g.add(cg);
          const bits = new THREE.InstancedMesh(new THREE.DodecahedronGeometry(1.4, 0), worldMat(3, '#3d3644', '#25212c', '#86e3d2', sunPos), 10);
          g.add(bits); w.parts.bits = bits;
          g.rotation.set(0.9, 0, 0.35);
        } else if (o.id === 'platform') {
          // a little station close to the sun: a ring, a hub, two panels, a light that blinks
          const metal = worldMat(4, '#a7afb8', '#5d6670', '#e9eef2', sunPos);
          g.add(new THREE.Mesh(new THREE.TorusGeometry(4.5, 0.55, 6, 28), metal));
          g.add(new THREE.Mesh(new THREE.BoxGeometry(1.8, 1.8, 3.2), metal));
          const panel = worldMat(4, '#2b416e', '#1a2a4a', '#9fc4ff', sunPos);
          [-1, 1].forEach(function (s) { const p = new THREE.Mesh(new THREE.BoxGeometry(7, 0.2, 2.4), panel); p.position.x = s * 8.6; g.add(p); });
          const blink = new THREE.Sprite(new THREE.SpriteMaterial({ fog: false, map: glowTexture([[0, 'rgba(255,190,120,1)'], [1, 'rgba(255,120,60,0)']]), blending: THREE.AdditiveBlending, depthWrite: false }));
          blink.scale.setScalar(5); blink.position.set(0, 1.6, 0); g.add(blink); w.parts.blink = blink;
        }
        // the orbit, drawn faint
        const pts = [], t = { u: 0, v: 0 };
        for (let i = 0; i <= 200; i++) { orbitUV(o, i / 200 * o.period, t); pts.push(skyDir(t.u, t.v).multiplyScalar(WD + 6)); }
        const ol = new THREE.Line(new THREE.BufferGeometry().setFromPoints(pts), new THREE.LineBasicMaterial({ fog: false, color: '#e0c08e', transparent: true, opacity: 0.14, depthWrite: false }));
        ol.renderOrder = -4; scene.add(ol); orbitLines.push(ol);
        W_.list.push(w);
      });
    }
    const tv = new THREE.Vector3(), tv2 = new THREE.Vector3();
    function stepWorlds(dt) {
      // the sun swells and reddens over a long, slow loop and comes back: a quiet nod, nothing more
      const ph = 0.5 - 0.5 * Math.cos((T + 240) / 2700 * Math.PI * 2);
      sun.scale.setScalar(90 * (1 + 0.45 * ph) * (1 + 0.015 * Math.sin(T * 0.7)));
      sun.material.color.setRGB(1, 1 - 0.22 * ph, 1 - 0.42 * ph);
      sunGlow.scale.setScalar(420 * (1 + 0.35 * ph)); sunGlow.material.color.setRGB(1, 1 - 0.3 * ph, 1 - 0.5 * ph);
      skyU.uRed.value = ph;
      worldMats.forEach(function (m) { m.uniforms.uTime.value = T; });
      W_.list.forEach(function (w) {
        const o = w.o;
        orbitUV(o, T, w.uv);
        skyDir(w.uv.u, w.uv.v, w.dir);
        w.g.position.copy(w.dir).multiplyScalar(WD);
        w.g.rotation.y = T * o.spin + (o.id === 'shell' ? 0.3 : 0);
        if (o.id === 'pair') {
          // the two go round each other; the sand pours from the bigger to the smaller along an arc
          const a = T / 95 * Math.PI * 2, ax = tv.set(Math.cos(a), Math.sin(a) * 0.35, Math.sin(a)).multiplyScalar(17);
          w.parts.a.position.copy(ax).multiplyScalar(0.45); w.parts.b.position.copy(ax).multiplyScalar(-0.55);
          const A = tv2.copy(w.parts.a.position).add(w.g.position), B = w.parts.b.position.clone().add(w.g.position);
          const dirAB = B.clone().sub(A).normalize(), mid = A.clone().lerp(B, 0.5).add(new THREE.Vector3(0, 4, 0));
          const P0 = A.clone().addScaledVector(dirAB, 10.5), P1 = B.clone().addScaledVector(dirAB, -8.5);
          const s = w.parts.sand.geometry.attributes, pos = s.position.array, al = s.aA.array, sz = s.aSize.array, sd = s.aSeed.array;
          for (let i = 0; i < sd.length; i++) {
            const k = (sd[i] + T * 0.12) % 1, q = 1 - k;
            const x = q * q * P0.x + 2 * q * k * mid.x + k * k * P1.x, y = q * q * P0.y + 2 * q * k * mid.y + k * k * P1.y, z = q * q * P0.z + 2 * q * k * mid.z + k * k * P1.z;
            const j = Math.sin(sd[i] * 90 + T) * 0.7 * Math.sin(k * Math.PI);
            pos[i * 3] = x + j; pos[i * 3 + 1] = y + j * 0.6; pos[i * 3 + 2] = z;
            al[i] = 0.55 * Math.sin(k * Math.PI); sz[i] = 2.2 + 1.5 * sd[i];
          }
          s.position.needsUpdate = true; s.aA.needsUpdate = true; s.aSize.needsUpdate = true;
          w.parts.sand.material.uniforms.uScale.value = pr; w.parts.sand.material.uniforms.uFar.value = 0; w.parts.sand.material.uniforms.uTwinkle.value = 0;
        } else if (o.id === 'thorns') {
          w.parts.fog.material.uniforms.uTime.value = T;
        } else if (o.id === 'ice') {
          // two tails away from the sun: a straight blue one and a curved warm one, longer near the sun
          const away = tv.copy(w.g.position).sub(sun.position).normalize();
          const near = clamp(1.6 - w.g.position.distanceTo(sun.position) / 300, 0.5, 1.6);
          const side = tv2.set(-away.z, 0.4, away.x).normalize();
          const s = w.parts.tail.geometry.attributes, pos = s.position.array, al = s.aA.array, sz = s.aSize.array, sd = s.aSeed.array;
          for (let i = 0; i < sd.length; i++) {
            const k = (sd[i] + T * 0.05) % 1, ion = i % 3 === 0, L = (ion ? 140 : 95) * near * k;
            const curve = ion ? 0 : k * k * 30 * near, spread = (Math.sin(sd[i] * 77) * (ion ? 1.2 : 3.5)) * (0.3 + k);
            pos[i * 3] = w.g.position.x + away.x * L + side.x * (curve + spread); pos[i * 3 + 1] = w.g.position.y + away.y * L + side.y * (curve + spread) + Math.cos(sd[i] * 51) * spread * 0.5; pos[i * 3 + 2] = w.g.position.z + away.z * L + side.z * (curve + spread);
            al[i] = (ion ? 0.75 : 0.5) * Math.pow(1 - k, 1.3) * Math.min(1, k * 12); sz[i] = (ion ? 2.2 : 3.4) * (1 - k * 0.4);
          }
          s.position.needsUpdate = true; s.aA.needsUpdate = true; s.aSize.needsUpdate = true;
          w.parts.tail.material.uniforms.uScale.value = pr; w.parts.tail.material.uniforms.uFar.value = 0; w.parts.tail.material.uniforms.uTwinkle.value = 0;
        } else if (o.id === 'shell') {
          // pieces leave the rim of the hole and sink into the core, one after another
          const bits = w.parts.bits, o3 = tmp_o3;
          for (let i = 0; i < 10; i++) {
            const k = ((T / 26) + i / 10) % 1, a = i * 2.4;
            const start = tv.set(Math.cos(a) * 11, 17.5, Math.sin(a) * 11);
            o3.position.copy(start).multiplyScalar(1 - smooth(0, 1, k) * 0.92).add(tv2.set(Math.cos(a + 1) * 2 * Math.sin(k * 3), 0, Math.sin(a + 1) * 2 * Math.sin(k * 3)));
            o3.rotation.set(T * 0.3 + i, T * 0.2 + i * 2, 0); o3.scale.setScalar((0.6 + (i % 3) * 0.3) * (1 - smooth(0.75, 1, k)));
            o3.updateMatrix(); bits.setMatrixAt(i, o3.matrix);
          }
          bits.instanceMatrix.needsUpdate = true;
        } else if (o.id === 'platform') {
          w.g.rotation.set(0.4, T * o.spin, 0.2);
          w.parts.blink.material.opacity = (T % 1.6) < 0.18 ? 1 : 0.15;
        }
      });
    }
    const tmp_o3 = new THREE.Object3D();

    function buildSky() {
      sky = new THREE.Mesh(new THREE.SphereGeometry(900, 48, 24), new THREE.ShaderMaterial({ uniforms: skyU, vertexShader: SKY_V, fragmentShader: SKY_F, side: THREE.BackSide, depthWrite: false }));
      sky.renderOrder = -10;
      skyPivot = new THREE.Group(); scene.add(skyPivot); skyPivot.add(sky);
      // the stars: a few thousand, warm and cool, twinkling; they turn with the sky
      const N = C.phone ? 1600 : 2800, r = rng(11);
      const g = new THREE.BufferGeometry(), pos = new Float32Array(N * 3), col = new Float32Array(N * 3), a = new Float32Array(N), size = new Float32Array(N), seed = new Float32Array(N);
      for (let i = 0; i < N; i++) {
        const u = r() * 2 - 1, th = r() * Math.PI * 2, s = Math.sqrt(1 - u * u);
        let x = s * Math.cos(th), y = u, z = s * Math.sin(th);
        // denser along the band
        if (r() < 0.45) { const t = r() * Math.PI * 2, w = (r() - 0.5) * 0.35; x = Math.cos(t); y = Math.sin(t); z = w; const l = Math.hypot(x, y, z); x /= l; y /= l; z /= l; }
        pos[i * 3] = x * 850; pos[i * 3 + 1] = y * 850; pos[i * 3 + 2] = z * 850;
        const k = r(), warm = r() < 0.25;
        col[i * 3] = warm ? 1.0 : 0.75 + 0.25 * k; col[i * 3 + 1] = warm ? 0.82 : 0.85 + 0.1 * k; col[i * 3 + 2] = warm ? 0.62 : 1.0;
        const bright = Math.pow(r(), 6);
        a[i] = 0.25 + 0.9 * bright + 0.2 * r(); size[i] = 1.4 + 4.2 * bright; seed[i] = r();
      }
      g.setAttribute('position', new THREE.BufferAttribute(pos, 3)); g.setAttribute('aCol', new THREE.BufferAttribute(col, 3)); g.setAttribute('aA', new THREE.BufferAttribute(a, 1));
      g.setAttribute('aSize', new THREE.BufferAttribute(size, 1)); g.setAttribute('aSeed', new THREE.BufferAttribute(seed, 1));
      stars = new THREE.Points(g, pointsMaterial(0, true, true)); stars.frustumCulled = false; stars.renderOrder = -5; skyPivot.add(stars);
      // the low sun, the planets on their visible orbits round it
      const sunDir = new THREE.Vector3(Math.sin(38 * DEG), Math.sin(2.2 * DEG), -Math.cos(38 * DEG)).normalize();
      skyU.uSun.value.copy(sunDir);
      const S = sunDir.clone().multiplyScalar(700);
      sun = new THREE.Sprite(new THREE.SpriteMaterial({ fog: false, map: glowTexture([[0, 'rgba(255,250,235,1)'], [0.12, 'rgba(255,220,160,0.95)'], [0.3, 'rgba(255,150,70,0.35)'], [1, 'rgba(255,100,40,0)']]), blending: THREE.AdditiveBlending, depthWrite: false }));
      sun.position.copy(S); sun.scale.setScalar(90); sun.renderOrder = -4; scene.add(sun);
      sunGlow = new THREE.Sprite(new THREE.SpriteMaterial({ fog: false, map: glowTexture([[0, 'rgba(255,170,90,0.22)'], [1, 'rgba(255,110,50,0)']]), blending: THREE.AdditiveBlending, depthWrite: false }));
      sunGlow.position.copy(S); sunGlow.scale.setScalar(420); sunGlow.renderOrder = -4; scene.add(sunGlow);
      buildWorlds(S);
      // shooting stars: a short line strip with a bright head, a few in a pool
      for (let i = 0; i < 3; i++) {
        const n = 14, g2 = new THREE.BufferGeometry();
        g2.setAttribute('position', new THREE.BufferAttribute(new Float32Array(n * 3), 3)); g2.setAttribute('aA', new THREE.BufferAttribute(new Float32Array(n), 1));
        const line = new THREE.Line(g2, new THREE.ShaderMaterial({ transparent: true, depthWrite: false, blending: THREE.AdditiveBlending,
          vertexShader: 'attribute float aA; varying float vA; void main(){ vA = aA; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }',
          fragmentShader: 'varying float vA; void main(){ gl_FragColor = vec4(vec3(1.0, 0.95, 0.85) * vA, 1.0); }' }));
        line.frustumCulled = false; line.visible = false; scene.add(line);
        meteors.push({ line: line, t: 0, life: 0, p: new THREE.Vector3(), v: new THREE.Vector3(), n: n });
      }
      // a comet or a satellite crossing now and then: a point, and for the comet a tail away from the sun
      const cg = new THREE.BufferGeometry(); const cn = 24;
      cg.setAttribute('position', new THREE.BufferAttribute(new Float32Array(cn * 3), 3)); cg.setAttribute('aA', new THREE.BufferAttribute(new Float32Array(cn), 1));
      const tail = new THREE.Line(cg, new THREE.ShaderMaterial({ transparent: true, depthWrite: false, blending: THREE.AdditiveBlending,
        vertexShader: 'attribute float aA; varying float vA; void main(){ vA = aA; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }',
        fragmentShader: 'varying float vA; void main(){ gl_FragColor = vec4(vec3(0.75, 0.9, 1.0) * vA, 1.0); }' }));
      tail.frustumCulled = false; tail.visible = false; scene.add(tail);
      const head = new THREE.Sprite(new THREE.SpriteMaterial({ fog: false, map: glowTexture([[0, 'rgba(235,245,255,1)'], [0.25, 'rgba(180,220,255,0.5)'], [1, 'rgba(120,180,255,0)']]), blending: THREE.AdditiveBlending, depthWrite: false }));
      head.visible = false; head.scale.setScalar(9); scene.add(head);
      crosser = { tail: tail, head: head, n: cn, on: false, t: 0, dur: 40, kind: 0, a: new THREE.Vector3(), b: new THREE.Vector3() };
      // the signal halos: the scope's target, the playing one, the cursor
      targetHalo = haloSprite(); playHalo = haloSprite(); cursorHalo = haloSprite();
      scene.add(targetHalo); scene.add(playHalo); scene.add(cursorHalo);
      routeLine = new THREE.Line(new THREE.BufferGeometry(), new THREE.LineDashedMaterial({ fog: false, color: '#f3dcb0', dashSize: 7, gapSize: 9, transparent: true, opacity: 0.42, depthWrite: false }));
      routeLine.visible = false; routeLine.frustumCulled = false; scene.add(routeLine);
    }
    function haloSprite() {
      const cv = document.createElement('canvas'); cv.width = cv.height = 128; const g = cv.getContext('2d');
      g.strokeStyle = 'rgba(255,255,255,0.95)'; g.lineWidth = 5; g.beginPath(); g.arc(64, 64, 46, 0, Math.PI * 2); g.stroke();
      g.lineWidth = 2; g.strokeStyle = 'rgba(255,255,255,0.5)'; g.beginPath(); g.arc(64, 64, 58, 0, Math.PI * 2); g.stroke();
      const tx = new THREE.CanvasTexture(cv);
      const s = new THREE.Sprite(new THREE.SpriteMaterial({ fog: false, map: tx, blending: THREE.AdditiveBlending, depthWrite: false, transparent: true, opacity: 0, sizeAttenuation: false }));
      s.scale.setScalar(0.05); s.renderOrder = 8; return s;
    }
    function buildMallow() {
      const sg = new THREE.CylinderGeometry(0.006, 0.011, 1, 6, 14).translate(0, 0.5, 0);
      const cols = new Float32Array(sg.attributes.position.count * 3);
      for (let i = 0; i < sg.attributes.position.count; i++) { const y = sg.attributes.position.getY(i), k = smooth(0.82, 1.0, y); cols[i * 3] = lerp(0.55, 0.12, k); cols[i * 3 + 1] = lerp(0.40, 0.08, k); cols[i * 3 + 2] = lerp(0.26, 0.05, k); }
      sg.setAttribute('color', new THREE.BufferAttribute(cols, 3));
      stickMat = new THREE.MeshLambertMaterial({ vertexColors: true });
      stickMat.onBeforeCompile = function (sh) {
        sh.uniforms.uBend = { value: 0 }; sh.uniforms.uBendDir = { value: new THREE.Vector3(1, 0, 0) }; stickMat.userData.sh = sh;
        sh.vertexShader = 'uniform float uBend; uniform vec3 uBendDir;\n' + sh.vertexShader.replace('#include <begin_vertex>', '#include <begin_vertex>\ntransformed += uBendDir * uBend * position.y * position.y;');
      };
      stick = new THREE.Mesh(sg, stickMat); stick.visible = false; stick.renderOrder = 20; scene.add(stick);
      // the marshmallow: a rounded cylinder turned on a lathe, its axis along the stick
      const h = 0.056, r = 0.054, e = 0.016, prof = [new THREE.Vector2(0, -h)];
      for (let i = 0; i <= 4; i++) { const a = -Math.PI / 2 + i / 4 * Math.PI / 2; prof.push(new THREE.Vector2(r - e + Math.cos(a) * e, -h + e + Math.sin(a) * e)); }
      for (let i = 0; i <= 4; i++) { const a = i / 4 * Math.PI / 2; prof.push(new THREE.Vector2(r - e + Math.cos(a) * e, h - e + Math.sin(a) * e)); }
      prof.push(new THREE.Vector2(0, h));
      const mg = new THREE.LatheGeometry(prof, 28);
      // a little more detail along the side for the bubbles
      mallowMat = new THREE.ShaderMaterial({ side: THREE.DoubleSide,
        uniforms: { uToast: { value: 0 }, uFire: { value: 0 }, uHeat: { value: 0 }, uTime: { value: 0 }, uBubble: { value: 0 }, uSwell: { value: 1 }, uBite1: { value: new THREE.Vector4(0, 0, 0, 0) }, uBite2: { value: new THREE.Vector4(0, 0, 0, 0) },
          uLight: { value: FIRE.clone().add(new THREE.Vector3(0, 0.6, 0)) }, uLightCol: { value: new THREE.Color(1.0, 0.68, 0.42) }, uFireL: { value: new THREE.Vector3(0, -1, 0) } },
        vertexShader: MALLOW_V, fragmentShader: MALLOW_F });
      mallow = new THREE.Mesh(mg, mallowMat); mallow.visible = false; mallow.renderOrder = 21; scene.add(mallow);
      mallowFlame = new THREE.Mesh(new THREE.PlaneGeometry(1, 1).translate(0, 0.5, 0), flameMaterial(0.37, 1.0, 1.1));
      mallowFlame.visible = false; mallowFlame.renderOrder = 22; scene.add(mallowFlame);
    }

    /* ---- the signals: one per track, grouped by frequency into regions of the sky ---- */
    // a frequency lives round its world: its signals sit in a spiral round the world and travel its orbit with it
    const SPACING = 0.72, VMIN = 9;
    function setCatalogue(tracks) {
      sig.freqs = groupFrequencies(tracks || []);
      sig.list = []; sig.bySlug = {};
      sig.freqs.forEach(function (f, k) {
        const wi = FREQ_WORLD[k % FREQ_WORLD.length], w = W_.list[wi], col = new THREE.Color(f.colour);
        const r0 = (w ? w.radiusDeg * (w.o.id === 'pair' ? 1.6 : 1.15) : 2) + 1.3;
        const order = f.slugs.slice().sort(function (x, y) { return hashStr(x) - hashStr(y); });
        f.world = wi; f.spacing = SPACING;
        order.forEach(function (slug, i) {
          const r = rng(hashStr(slug));
          const rad = r0 + SPACING * Math.sqrt(i + 0.5), ang = i * 2.39996 + k * 1.3;
          const jit = SPACING * 0.45;
          const s = { slug: slug, freq: k, world: wi, du: Math.cos(ang) * rad * 1.25 + (r() - 0.5) * jit * 2, dv: Math.sin(ang) * rad + (r() - 0.5) * jit * 2, dir: new THREE.Vector3(0, 1, 0), col: col, i: sig.list.length, seed: r(), I: 0.3, size: 5 };
          sig.list.push(s); sig.bySlug[slug] = s;
        });
      });
      if (sig.freq >= sig.freqs.length) sig.freq = 0;
      if (signalPts) { scene.remove(signalPts); signalPts.geometry.dispose(); }
      const N = Math.max(1, sig.list.length), g = new THREE.BufferGeometry();
      const pos = new Float32Array(N * 3), col = new Float32Array(N * 3), a = new Float32Array(N), size = new Float32Array(N), seed = new Float32Array(N);
      sig.list.forEach(function (s, i) { col[i * 3] = s.col.r; col[i * 3 + 1] = s.col.g; col[i * 3 + 2] = s.col.b; seed[i] = s.seed; });
      g.setAttribute('position', new THREE.BufferAttribute(pos, 3)); g.setAttribute('aCol', new THREE.BufferAttribute(col, 3)); g.setAttribute('aA', new THREE.BufferAttribute(a, 1));
      g.setAttribute('aSize', new THREE.BufferAttribute(size, 1)); g.setAttribute('aSeed', new THREE.BufferAttribute(seed, 1));
      const m = pointsMaterial(0, true, true); m.uniforms.uTwinkle.value = 0.6;
      signalPts = new THREE.Points(g, m); signalPts.frustumCulled = false; signalPts.renderOrder = 6; signalPts.visible = sig.list.length > 0;
      scene.add(signalPts);
      placeSignals();
      buildRoute();
    }
    // every frame: each signal follows its world along the orbit (kept a little above the horizon)
    function placeSignals() {
      if (!signalPts) return;
      const pos = signalPts.geometry.attributes.position.array;
      for (let i = 0; i < sig.list.length; i++) {
        const s = sig.list[i], w = W_.list[s.world];
        const u = (w ? w.uv.u : 0) + s.du, v = Math.max(VMIN + (s.seed - 0.5) * 2, (w ? w.uv.v : 30) + s.dv);
        skyDir(u, v, s.dir);
        pos[i * 3] = s.dir.x * 600; pos[i * 3 + 1] = s.dir.y * 600; pos[i * 3 + 2] = s.dir.z * 600;
      }
      signalPts.geometry.attributes.position.needsUpdate = true;
    }
    let routeChain = [];
    function buildRoute() {
      routeChain = [sig.playing].concat(sig.queue).filter(function (s, i, arr) { return s && sig.bySlug[s] && arr.indexOf(s) === i; });
      if (routeChain.length < 2) { routeLine.visible = false; return; }
      routeLine.geometry.dispose();
      routeLine.geometry = new THREE.BufferGeometry(); routeLine.geometry.setAttribute('position', new THREE.BufferAttribute(new Float32Array((routeChain.length - 1) * 17 * 3), 3));
      routeLine.visible = true; updateRoute();
    }
    // the route is a dotted line of gentle arcs between the stops, redrawn as the worlds carry them along
    function updateRoute() {
      if (!routeLine.visible) return;
      const pos = routeLine.geometry.attributes.position.array; let j = 0;
      for (let i = 1; i < routeChain.length; i++) {
        const a = sig.bySlug[routeChain[i - 1]].dir, b = sig.bySlug[routeChain[i]].dir;
        for (let k = 0; k <= 16; k++) { const v = tmp.v.copy(a).lerp(b, k / 16).normalize().multiplyScalar(590); pos[j++] = v.x; pos[j++] = v.y; pos[j++] = v.z; }
      }
      routeLine.geometry.attributes.position.needsUpdate = true; routeLine.computeLineDistances();
    }

    /* ---- the camera: you on the log. yaw and pitch on springs; the scope narrows the field ---- */
    function forward(out) { return out.set(Math.sin(look.yaw) * Math.cos(look.pitch), Math.sin(look.pitch), -Math.cos(look.yaw) * Math.cos(look.pitch)); }
    function yawPitchOf(dir) { return { yaw: Math.atan2(dir.x, -dir.z), pitch: Math.asin(clamp(dir.y, -1, 1)) }; }
    function aimTo(yaw, pitch, snap) {
      look.cy = look.yaw + wrapAngle(yaw - look.oy - look.yaw); look.cp = pitch - look.op;
      if (snap) { look.yaw = look.yawT = look.cy + look.oy; look.pitch = look.pitchT = look.cp + look.op; }
    }
    const FIRE_AIM = (function () { const d = FIRE.clone().add(new THREE.Vector3(0, 0.45, 0)).sub(SEAT).normalize(); return yawPitchOf(d); })();
    const LEAN_AIM = (function () { const tc = LEAN.clone().sub(FIRE).setY(0).normalize(); const d = FIRE.clone().add(new THREE.Vector3(0, 0.36, 0)).addScaledVector(tc, 0.3).sub(LEAN).normalize(); return yawPitchOf(d); })();

    /* ---- per frame ---- */
    const camFwd = new THREE.Vector3(), camRight = new THREE.Vector3(), camUp = new THREE.Vector3();
    function step(now) {
      if (!C.manual) raf = requestAnimationFrame(step);
      const t0 = performance.now();
      // clamped at 100 ms: a slow machine keeps real time, a tab coming back from the background does not leap
      const dt = last ? clamp((now - last) / 1000, 0, 0.1) : 0.016; last = now;
      const slow = reduced ? 0.45 : 1;
      T += dt * slow;
      const A = NOBODY.vis && NOBODY.vis.analyser;
      const loud = A ? A.loud || 0 : 0, bass = A ? A.bass || 0 : 0;
      fire.loud += (loud - fire.loud) * ease(dt, 0.25); fire.beat += (bass - fire.beat) * ease(dt, 0.08);

      // the sky turns on the planet's axis; faster behind the hidden interface
      SKY.angle += dt * SKY.speed * slow * (C.hidden ? 3 : 1);
      skyPivot.quaternion.setFromAxisAngle(SKY.axis, SKY.angle);
      skyU.uTime.value = T; skyU.uBreath.value = 0.86 + 0.14 * Math.sin(T * 0.19) + 0.06 * Math.sin(T * 0.47 + 1.3);
      stars.material.uniforms.uTime.value = T;
      if (signalPts) signalPts.material.uniforms.uTime.value = T;
      stepWorlds(dt);
      stepMeteors(dt);
      stepCrosser(dt);

      // the camera: springs toward the gaze; the scope narrows the field; a slow breath while you sit
      if (C.hidden) { look.yawT = FIRE_AIM.yaw + 0.42 + Math.sin(T * 0.05) * 0.14; look.pitchT = 0.24 + Math.sin(T * 0.07) * 0.05; }
      else { look.yawT = look.cy + look.oy; look.pitchT = clamp(look.cp + look.op, -40 * DEG, 84 * DEG); }
      const tc = C.scoped ? 0.16 : C.hidden ? 1.6 : 0.12;
      look.yaw += wrapAngle(look.yawT - look.yaw) * ease(dt, tc);
      look.pitch += (look.pitchT - look.pitch) * ease(dt, tc);
      look.fovT = C.scoped ? look.scopeFov : (C.phone ? 70 : 62);
      look.fov += (look.fovT - look.fov) * ease(dt, 0.2);
      const breath = reduced ? 0 : Math.sin(T * 1.4) * 0.0018 + Math.sin(T * 0.37) * 0.0012;
      look.lean += ((M.on && M.held && M.eating < 0 ? 1 : 0) - look.lean) * ease(dt, 0.42);
      camera.position.copy(SEAT).lerp(LEAN, smooth(0, 1, look.lean)); camera.position.y += breath * 6;
      camera.rotation.order = 'YXZ'; camera.rotation.set(look.pitch + breath, -look.yaw, Math.sin(T * 0.3) * 0.002 * slow);
      if (Math.abs(camera.fov - look.fov) > 0.01) { camera.fov = look.fov; camera.updateProjectionMatrix(); }
      camera.updateMatrixWorld();
      camFwd.set(0, 0, -1).applyQuaternion(camera.quaternion); camRight.set(1, 0, 0).applyQuaternion(camera.quaternion); camUp.set(0, 1, 0).applyQuaternion(camera.quaternion);

      stepFire(dt, slow);
      stepSignals(dt);
      stepMallow(dt);
      if (treeMat.userData.sh) treeMat.userData.sh.uniforms.uTime.value = T;
      const scale = H / (2 * Math.tan(camera.fov * DEG / 2));     // pixels per unit at one unit's depth
      [embers, smoke, steam, sugar].forEach(function (p) { p.pts.material.uniforms.uScale.value = scale * pr * 0.01; p.pts.material.uniforms.uTime.value = T; });
      stars.material.uniforms.uScale.value = pr * (C.scoped ? 1.25 : 1);
      if (signalPts) signalPts.material.uniforms.uScale.value = pr;

      renderer.render(scene, camera);
      C.frames++;
      const ms = performance.now() - t0; C.ms = C.ms * 0.95 + ms * 0.05;
      perf.ring[perf.n % 120] = ms; perf.n++;
      if (hooks.onFrame) hooks.onFrame(now, dt);
      ladder(now);
    }
    function ladder(now) {
      if (NOPROBE || now - perf.checkedAt < 2000 || perf.n < 120) return;
      perf.checkedAt = now;
      const a = Array.from(perf.ring).sort(function (x, y) { return x - y; });
      perf.p50 = a[60]; perf.p95 = a[114];
      if (perf.p95 > 18) { perf.over++; perf.under = 0; } else if (perf.p95 < 10) { perf.under++; perf.over = 0; } else { perf.over = 0; perf.under = 0; }
      if (perf.over >= 2 && perf.ladder < 2) { perf.ladder++; perf.over = 0; setPixelRatio(); }
      else if (perf.under >= 5 && perf.ladder > 0) { perf.ladder--; perf.under = 0; setPixelRatio(); }
    }
    function setPixelRatio() { pr = prBase * [1, 0.8, 0.62][perf.ladder]; renderer.setPixelRatio(pr); renderer.setSize(W, H, false); }

    function stepFire(dt, slow) {
      const t = T;
      // the flicker: two noises and the playing track's loudness; a pop throws sparks and flares the light for a moment
      const n1 = vnoise(t * 3.1, 0.5, 0.2), n2 = vnoise(t * 9.7, 2.1, 0.7), n3s = vnoise(t * 21.0, 4.3, 1.1);
      fire.flick = 0.78 + 0.18 * n1 + 0.12 * n2 + 0.06 * n3s;
      fire.pop = Math.max(0, fire.pop - dt * 3.2);
      fire.heat = clamp(0.55 + fire.loud * 0.9 + fire.beat * 0.25, 0.4, 1.3);
      const glow = fire.flick * (0.85 + 0.35 * fire.loud + 0.25 * fire.beat) + fire.pop * 0.6;
      fireLight.intensity = 9.5 * glow; fireLight2.intensity = 3.5 * glow * (0.8 + 0.4 * n2);
      fireLight.position.set(FIRE.x + (n1 - 0.5) * 0.14, FIRE.y + 0.55 + (n2 - 0.5) * 0.1, FIRE.z + (n3s - 0.5) * 0.12);
      groundGlow.material.opacity = clamp(0.7 + 0.35 * (glow - 1), 0.4, 1.1);
      fireHalo.material.opacity = clamp(0.55 + 0.45 * (glow - 0.8), 0.3, 1.0); fireHalo.scale.setScalar(2.6 + 0.7 * glow);
      coals.material.uniforms.uTime.value = t; coals.material.uniforms.uHeat.value = glow;
      flames.forEach(function (f, i) {
        const u = f.userData, m = f.material.uniforms;
        m.uTime.value = t; m.uHeat.value = fire.heat;
        const sway = Math.sin(t * (0.9 + i * 0.13) + i) * 0.03;
        f.position.set(FIRE.x + Math.cos(u.a + t * 0.21) * u.r + sway, FIRE.y + 0.05, FIRE.z + Math.sin(u.a + t * 0.21) * u.r);
        const hgt = u.base * (0.82 + 0.28 * fire.flick + 0.22 * fire.loud + 0.18 * fire.beat * (i > 3 ? 1 : 0.4) + fire.pop * 0.3);
        f.scale.set(u.w * (0.9 + 0.12 * fire.flick), hgt, 1);
        f.rotation.set(0, Math.atan2(camera.position.x - f.position.x, camera.position.z - f.position.z), 0);
      });
      // pops: every second or two, more with the beat; the sound comes with them
      fire.nextPop -= dt * (1 + fire.beat * 2.5);
      if (fire.nextPop <= 0) { fire.nextPop = 0.9 + Math.random() * 2.4; pop(0.6 + Math.random() * 0.6); }
      fire.nextCrackle -= dt;
      if (fire.nextCrackle <= 0) { fire.nextCrackle = 0.05 + Math.random() * 0.22; if (hooks.onCrackle) hooks.onCrackle(0.15 + Math.random() * 0.35); }
      // embers: a steady stream that rises, drifts on the wind, curls and fades
      const rate = (C.phone ? 16 : 26) * (0.7 + fire.loud * 0.8 + fire.beat * 1.2) * slow;
      fire.emberAcc = (fire.emberAcc || 0) + rate * dt;
      while (fire.emberAcc >= 1) { fire.emberAcc -= 1; spawnEmber(false); }
      const E = embers, wind = 0.18 + 0.12 * Math.sin(t * 0.13);
      for (let i = 0; i < E.n; i++) {
        if (E.life[i] <= 0) { E.a[i] = 0; continue; }
        E.life[i] -= dt;
        const k = 1 - E.life[i] / E.max[i], spark = E.kind[i] === 1;
        const ix = i * 3;
        if (spark) { E.vel[ix + 1] -= 2.6 * dt; E.vel[ix] *= 0.995; E.vel[ix + 2] *= 0.995; }
        else {
          E.vel[ix] += (Math.sin(t * 1.7 + E.seed[i] * 31 + E.pos[ix + 1] * 2.1) * 0.55 + wind) * dt;
          E.vel[ix + 2] += Math.cos(t * 1.3 + E.seed[i] * 17 + E.pos[ix + 1] * 1.7) * 0.45 * dt;
          E.vel[ix + 1] *= 0.997;
        }
        E.pos[ix] += E.vel[ix] * dt; E.pos[ix + 1] += E.vel[ix + 1] * dt; E.pos[ix + 2] += E.vel[ix + 2] * dt;
        const heat = 1 - k;
        E.col[ix] = 1.0; E.col[ix + 1] = 0.25 + 0.6 * heat * heat; E.col[ix + 2] = 0.05 + 0.3 * Math.pow(heat, 4);
        const tw = 0.75 + 0.25 * Math.sin(t * 23 + E.seed[i] * 50);
        E.a[i] = (spark ? 1.5 : 1.0) * Math.min(1, k * 8) * Math.pow(heat, 0.8) * tw;
        E.size[i] = (spark ? 4.2 : 3.2 + 2.4 * E.seed[i]) * (0.4 + 0.6 * heat);
      }
      E.flush();
      // smoke: curling up, widening, thinning; warm at the base where the fire lights it
      fire.smokeAcc = (fire.smokeAcc || 0) + dt * 5.5 * slow;
      while (fire.smokeAcc >= 1) { fire.smokeAcc -= 1; spawnSmoke(FIRE.x + (Math.random() - 0.5) * 0.25, FIRE.y + 0.75 + Math.random() * 0.25, FIRE.z + (Math.random() - 0.5) * 0.3, 0); }
      stepSmoke(smoke, dt, t, wind);
    }
    function spawnEmber(spark) {
      const E = embers, i = E.spawn(), ix = i * 3;
      const a = Math.random() * Math.PI * 2, r = Math.random() * 0.24;
      E.pos[ix] = FIRE.x + Math.cos(a) * r; E.pos[ix + 1] = FIRE.y + 0.2 + Math.random() * 0.35; E.pos[ix + 2] = FIRE.z + Math.sin(a) * r;
      if (spark) { const s = 1.8 + Math.random() * 2.2, b = Math.random() * Math.PI * 2; E.vel[ix] = Math.cos(b) * s * 0.45; E.vel[ix + 1] = s; E.vel[ix + 2] = Math.sin(b) * s * 0.45; E.max[i] = E.life[i] = 0.5 + Math.random() * 0.5; E.kind[i] = 1; }
      else { E.vel[ix] = (Math.random() - 0.5) * 0.2; E.vel[ix + 1] = 0.65 + Math.random() * 0.95; E.vel[ix + 2] = (Math.random() - 0.5) * 0.2; E.max[i] = E.life[i] = 1.8 + Math.random() * 2.6; E.kind[i] = 0; }
    }
    function pop(strength) {
      fire.pop = Math.max(fire.pop, strength);
      const n = Math.round(6 + strength * 12);
      for (let i = 0; i < n; i++) spawnEmber(true);
      if (hooks.onPop) hooks.onPop(strength);
    }
    // kind 0 is fire smoke, 1 marshmallow smoke (darker), 2 steam (white, quick)
    function spawnSmoke(x, y, z, kind) {
      const P = kind === 2 ? steam : smoke, i = P.spawn(), ix = i * 3;
      P.pos[ix] = x; P.pos[ix + 1] = y; P.pos[ix + 2] = z;
      P.vel[ix] = (Math.random() - 0.5) * 0.1; P.vel[ix + 1] = kind === 2 ? 0.35 + Math.random() * 0.25 : 0.45 + Math.random() * 0.25; P.vel[ix + 2] = (Math.random() - 0.5) * 0.1;
      P.max[i] = P.life[i] = kind === 2 ? 1.0 + Math.random() * 0.6 : kind === 1 ? 2.4 + Math.random() : 5 + Math.random() * 2.5; P.kind[i] = kind;
    }
    function stepSmoke(P, dt, t, wind) {
      for (let i = 0; i < P.n; i++) {
        if (P.life[i] <= 0) { P.a[i] = 0; continue; }
        P.life[i] -= dt;
        const k = 1 - P.life[i] / P.max[i], ix = i * 3, kind = P.kind[i];
        P.vel[ix] += (wind * 0.6 + Math.sin(t * 0.7 + P.seed[i] * 20 + P.pos[ix + 1]) * 0.18) * dt;
        P.vel[ix + 2] += Math.cos(t * 0.5 + P.seed[i] * 13 + P.pos[ix + 1] * 0.8) * 0.12 * dt;
        P.pos[ix] += P.vel[ix] * dt; P.pos[ix + 1] += P.vel[ix + 1] * dt; P.pos[ix + 2] += P.vel[ix + 2] * dt;
        if (kind === 2) {
          P.col[ix] = 0.95; P.col[ix + 1] = 0.93; P.col[ix + 2] = 0.9;
          P.a[i] = 0.22 * Math.min(1, k * 6) * (1 - k); P.size[i] = 6 + 16 * k;
        } else {
          const warm = Math.max(0, 1 - k * 3);
          const base = kind === 1 ? 0.16 : 0.32;
          P.col[ix] = base + 0.35 * warm; P.col[ix + 1] = base + 0.12 * warm + 0.02; P.col[ix + 2] = base + 0.06 + 0.02 * warm;
          P.a[i] = (kind === 1 ? 0.34 : 0.16) * Math.min(1, k * 5) * Math.pow(1 - k, 1.4);
          P.size[i] = (kind === 1 ? 10 : 40) + (kind === 1 ? 40 : 170) * k;
        }
      }
      P.flush();
    }

    function stepMeteors(dt) {
      if (!reduced && !C.noMeteors) {
        sched.meteorAt -= dt;
        if (sched.meteorAt <= 0) {
          sched.meteorAt = 7 + Math.random() * 16;
          const m = meteors.find(function (x) { return x.life <= 0; });
          if (m) {
            const az = Math.random() * Math.PI * 2, el = (22 + Math.random() * 45) * DEG;
            m.p.set(Math.sin(az) * Math.cos(el), Math.sin(el), -Math.cos(az) * Math.cos(el)).multiplyScalar(600);
            const tng = new THREE.Vector3(Math.cos(az), -0.35 - Math.random() * 0.4, Math.sin(az)).multiplyScalar(Math.random() < 0.5 ? 1 : -1);
            tng.y = -Math.abs(tng.y); m.v.copy(tng.normalize()).multiplyScalar(260 + Math.random() * 160);
            m.t = 0; m.life = 0.55 + Math.random() * 0.6; m.line.visible = true;
          }
        }
      }
      meteors.forEach(function (m) {
        if (m.life <= 0) return;
        m.t += dt;
        const k = m.t / m.life;
        if (k >= 1) { m.life = 0; m.line.visible = false; return; }
        const pos = m.line.geometry.attributes.position.array, a = m.line.geometry.attributes.aA.array;
        const fade = Math.sin(Math.PI * k);
        for (let i = 0; i < m.n; i++) {
          const back = i / (m.n - 1) * 0.16;
          const tt = Math.max(0, m.t - back);
          pos[i * 3] = m.p.x + m.v.x * tt; pos[i * 3 + 1] = m.p.y + m.v.y * tt; pos[i * 3 + 2] = m.p.z + m.v.z * tt;
          a[i] = fade * Math.pow(1 - i / (m.n - 1), 1.6) * 1.1;
        }
        m.line.geometry.attributes.position.needsUpdate = true; m.line.geometry.attributes.aA.needsUpdate = true;
      });
    }
    function stepCrosser(dt) {
      const c = crosser;
      if (!c.on) {
        sched.crossAt -= dt;
        if (sched.crossAt > 0) return;
        c.kind = 0; sched.crossAt = 70 + Math.random() * 80;   // a satellite; the comet is one of the worlds now
        const az = Math.random() * Math.PI * 2, span = 1.6 + Math.random() * 0.8;
        const e1 = (18 + Math.random() * 20) * DEG, e2 = (30 + Math.random() * 35) * DEG;
        c.a.set(Math.sin(az) * Math.cos(e1), Math.sin(e1), -Math.cos(az) * Math.cos(e1)).multiplyScalar(650);
        c.b.set(Math.sin(az + span) * Math.cos(e2), Math.sin(e2), -Math.cos(az + span) * Math.cos(e2)).multiplyScalar(650);
        c.dur = c.kind === 0 ? 34 : 60; c.t = 0; c.on = true; c.head.visible = true; c.tail.visible = c.kind === 1;
        c.head.scale.setScalar(c.kind === 0 ? 4.5 : 10);
      }
      c.t += dt * (reduced ? 0.6 : 1);
      const k = c.t / c.dur;
      if (k >= 1) { c.on = false; c.head.visible = false; c.tail.visible = false; return; }
      const p = tmp.v.copy(c.a).lerp(c.b, k).normalize().multiplyScalar(650);
      c.head.position.copy(p);
      const fade = smooth(0, 0.08, k) * (1 - smooth(0.9, 1, k));
      c.head.material.opacity = c.kind === 0 ? fade * (0.55 + 0.45 * (Math.sin(c.t * 4.2) > 0.6 ? 1 : 0.25)) : fade;
      if (c.kind === 1) {
        const away = tmp.v2.copy(p).sub(sun.position).normalize();
        const pos = c.tail.geometry.attributes.position.array, a = c.tail.geometry.attributes.aA.array;
        for (let i = 0; i < c.n; i++) { const q = i / (c.n - 1); pos[i * 3] = p.x + away.x * q * 70 + Math.sin(q * 3 + c.t) * q * 3; pos[i * 3 + 1] = p.y + away.y * q * 70; pos[i * 3 + 2] = p.z + away.z * q * 70; a[i] = fade * 0.55 * Math.pow(1 - q, 1.5); }
        c.tail.geometry.attributes.position.needsUpdate = true; c.tail.geometry.attributes.aA.needsUpdate = true;
      }
    }

    // the signals: brightness by frequency, the scope's homing, a find, the playing one pulsing with the beat
    // homing: a wide pull as the reticle nears a frequency's cluster (the track fades in, muffled) and a narrow one on the signal
    // itself (it comes clear); the target changes only once a new signal has been the nearest for a moment, so a sweep through a
    // dense cluster does not stutter between files
    const FAR = 7 * DEG, NEAR = 1.5 * DEG;
    function stepSignals(dt) {
      if (!signalPts || !sig.list.length) { sig.target = null; sig.strength = 0; return; }
      placeSignals();
      if ((C.frames & 3) === 0) updateRoute();
      const a = signalPts.geometry.attributes.aA.array, size = signalPts.geometry.attributes.aSize.array;
      const fwd = forward(tmp.v3);
      let best = null, bestAng = 99;
      for (let i = 0; i < sig.list.length; i++) {
        const s = sig.list[i];
        if (s.freq !== sig.freq) continue;
        const ang = Math.acos(clamp(s.dir.dot(fwd), -1, 1));
        if (ang < bestAng) { bestAng = ang; best = s; }
      }
      if (!C.scoped || !best || bestAng > FAR * 1.4) { sig.cand = null; sig.target = null; }
      else if (best.slug !== sig.target) {
        if (sig.cand !== best.slug) { sig.cand = best.slug; sig.candFor = 0; }
        sig.candFor += dt;
        if (!sig.target || sig.candFor > 0.22) { sig.target = best.slug; sig.dwell = 0; }
      }
      const tg = sig.target && sig.bySlug[sig.target];
      const tAng = tg ? Math.acos(clamp(tg.dir.dot(fwd), -1, 1)) : 99;
      const far = Math.pow(clamp(1 - tAng / FAR, 0, 1), 1.6), near = clamp(1 - tAng / NEAR, 0, 1);
      const strength = tg ? 0.42 * far + 0.58 * near : 0;
      sig.strength += (strength - sig.strength) * ease(dt, 0.12);
      sig.angle = tAng;
      const lit = sig.lit, beat = fire.beat;
      for (let i = 0; i < sig.list.length; i++) {
        const s = sig.list[i], onF = s.freq === sig.freq;
        let I = onF ? 0.7 : (C.scoped ? 0.16 : 0.34), sz = onF ? 7 : 4.5;
        if (lit) { if (lit[s.slug]) { I = 1.5 + 0.3 * Math.sin(T * 3 + s.seed * 9); sz = 10; } else { I *= 0.18; sz *= 0.7; } }
        if (s.slug === sig.target) { I += sig.strength * 1.6; sz += sig.strength * 9; }
        if (s.slug === sig.playing) { I = Math.max(I, 1.0 + 0.6 * beat); sz = Math.max(sz, 9 + 5 * beat); }
        if (sig.queue.indexOf(s.slug) >= 0) { I = Math.max(I, 0.8); sz = Math.max(sz, 7); }
        s.I += (I - s.I) * ease(dt, 0.18); s.size += (sz - s.size) * ease(dt, 0.18);
        a[i] = s.I; size[i] = s.size * (C.scoped ? 1.8 : 1);
      }
      signalPts.geometry.attributes.aA.needsUpdate = true; signalPts.geometry.attributes.aSize.needsUpdate = true;
      halo(targetHalo, sig.target, sig.strength * 0.9, 0.022 + 0.012 * (1 - sig.strength));
      halo(playHalo, sig.playing, 0.55 + 0.35 * beat, 0.02 + 0.004 * Math.sin(T * 2.4) + 0.006 * beat);
      halo(cursorHalo, sig.cursor && sig.cursor !== sig.target && sig.cursor !== sig.playing ? sig.cursor : null, 0.6, 0.018 + 0.003 * Math.sin(T * 4));
      // hold steady on a strong signal and it locks
      if (sig.target && sig.strength > 0.86) { sig.dwell += dt; if (sig.dwell > 1.5 && hooks.onLockDwell) { sig.dwell = -99; hooks.onLockDwell(sig.target); } }
      else if (sig.dwell >= 0) sig.dwell = Math.max(0, sig.dwell - dt * 2);
    }
    function halo(sp, slug, op, sc) {
      const s = slug && sig.bySlug[slug];
      if (!s) { sp.material.opacity += (0 - sp.material.opacity) * 0.2; if (sp.material.opacity < 0.01) sp.visible = false; return; }
      sp.visible = true; sp.position.copy(s.dir).multiplyScalar(590);
      sp.material.color.copy(s.col); sp.material.opacity += (op - sp.material.opacity) * 0.2;
      sp.scale.setScalar(sc * (C.scoped ? 1.4 : 1));
    }

    // the marshmallow, every frame: the stick from your hand to the rest point or the flame, the heat, the toast, the bite
    const REST = new THREE.Vector3(), HAND = new THREE.Vector3(), FLAMEPT = new THREE.Vector3(), MOUTH = new THREE.Vector3();
    function stepMallow(dt) {
      if (!M.on && M.eating < 0) { stick.visible = false; mallow.visible = false; mallowFlame.visible = false; return; }
      stick.visible = true;
      // where the hand is: low and to the right of your view; the rest point holds the marshmallow up in front of you
      HAND.copy(camera.position).addScaledVector(camRight, 0.30).addScaledVector(camUp, -0.36).addScaledVector(camFwd, 0.22);
      REST.copy(HAND).addScaledVector(camFwd, 0.78).addScaledVector(camRight, -0.16).addScaledVector(camUp, 0.30);
      FLAMEPT.copy(FIRE).add(tmp.v.set(0, 0.46, 0)).addScaledVector(tmp.v2.copy(camera.position).sub(FIRE).setY(0).normalize(), 0.3);
      MOUTH.copy(camera.position).addScaledVector(camFwd, 0.42).addScaledVector(camUp, -0.17);
      M.ext += ((M.held && M.eating < 0 ? 1 : 0) - M.ext) * ease(dt, 0.28);
      const tip = tmp.v3.copy(REST).lerp(FLAMEPT, smooth(0, 1, M.ext));
      if (M.eating >= 0) {
        M.eating += dt;
        const e = M.eating, toMouth = smooth(0, 0.35, e) * (1 - smooth(1.05, 1.4, e));
        tip.lerp(MOUTH, toMouth * 0.92);
        // two bites: the end goes first, then the rest; a puff of sugar when it is gone
        if (e > 0.42 && M.bites === 0) { M.bites = 1; mallowMat.uniforms.uBite1.value.set(0.016, 0.066, 0.03, 0.06); crumbs(4); }
        if (e > 0.78 && M.bites === 1) { M.bites = 2; mallowMat.uniforms.uBite2.value.set(-0.012, -0.006, 0.04, 0.083); crumbs(10); puff(); }
        if (e > 1.45) { M.eating = -1; M.on = false; if (hooks.onMallow) hooks.onMallow('eaten'); }
      }
      // the stick follows the tip with a little lag and a sway, and bends under the weight
      M.tip.lerp(tip, ease(dt, 0.07));
      M.swayV += (-(M.sway) * 40 - M.swayV * 5) * dt; M.sway += M.swayV * dt;
      const dir = tmp.v.copy(M.tip).sub(HAND); const len = dir.length() + 0.08; dir.normalize();
      stick.position.copy(HAND); stick.quaternion.setFromUnitVectors(tmp.v2.set(0, 1, 0), dir); stick.scale.set(1, len, 1);
      const down = tmp.v2.set(0, -1, 0).applyQuaternion(tmp.q.copy(stick.quaternion).invert()); down.y = 0; if (down.lengthSq() > 1e-6) down.normalize();
      M.bend = 0.035 + 0.025 * M.ext + M.sway * 0.03;
      if (stickMat.userData.sh) { stickMat.userData.sh.uniforms.uBend.value = M.bend; stickMat.userData.sh.uniforms.uBendDir.value.copy(down); }
      if (!M.on) { mallow.visible = false; mallowFlame.visible = false; return; }
      // the marshmallow sits near the tip, on the bent stick
      const along = (len - 0.09) / len;
      const worldBend = tmp.v2.copy(down).applyQuaternion(stick.quaternion).multiplyScalar(M.bend * along * along);
      M.pos.copy(HAND).addScaledVector(dir, len - 0.09).add(worldBend);
      M.dir.copy(dir);
      mallow.position.copy(M.pos); mallow.quaternion.setFromUnitVectors(tmp.v.set(0, 1, 0), dir);
      M.appear = Math.min(1, M.appear + dt * 3.5);
      const pop_ = M.appear < 1 ? 1 + Math.sin(M.appear * Math.PI) * 0.15 : 1;
      // heat: how close it is to the flames
      // the heat: how close it is to the flames' axis (it toasts in the hot air at their edge, not in the core)
      const d = M.pos.distanceTo(tmp.v.copy(FIRE).add(tmp.v2.set(0, 0.42, 0)));
      const heat = clamp(1 - (d - 0.24) / 0.4, 0, 1) * clamp(fire.flick, 0.7, 1.15);
      M.heat += (heat - M.heat) * ease(dt, 0.2);
      if (M.eating < 0) M.toast = Math.min(1, M.toast + M.heat * dt / 8.0 + (M.fire > 0 ? dt * 0.07 : 0));
      if (!M.caught && M.toast > 0.9 && M.heat > 0.45) { M.caught = true; M.fire = 1; M.fireFor = 0; if (hooks.onMallow) hooks.onMallow('caught'); }
      if (M.fire > 0) {
        M.fireFor += dt;
        // out of the flames it burns on for a while, then goes out with a breath of smoke
        if (M.heat < 0.15 && M.fireFor > 2.6) { M.fire = Math.max(0, M.fire - dt * 1.5); if (M.fire === 0) { for (let i = 0; i < 10; i++) spawnSmoke(M.pos.x, M.pos.y + 0.03, M.pos.z, 1); if (hooks.onMallow) hooks.onMallow('out'); } }
      }
      const toast = M.toast;
      const swell = 1 + 0.17 * smooth(0.08, 0.6, toast) - 0.07 * smooth(0.82, 1.0, toast) + 0.025 * M.heat * Math.sin(T * 7.0);
      const s = M.appear * pop_;
      mallow.scale.set(s, s * (M.eating > 0.3 ? 1 - 0.18 * Math.sin(Math.min(1, (M.eating - 0.3) / 0.5) * Math.PI) : 1), s);
      const u = mallowMat.uniforms;
      u.uToast.value = toast; u.uFire.value = M.fire; u.uHeat.value = M.heat; u.uTime.value = T; u.uSwell.value = swell;
      u.uBubble.value = M.heat * smooth(0.22, 0.45, toast) * (1 - smooth(0.85, 1.0, toast)) + 0.25 * smooth(0.3, 0.6, toast);
      u.uLightCol.value.setRGB(1.0 * fire.flick, 0.80 * fire.flick, 0.60 * fire.flick);
      u.uFireL.value.copy(FIRE).sub(M.pos).applyQuaternion(tmp.q.copy(mallow.quaternion).invert()).normalize();
      mallow.visible = true;
      // its own little flame
      mallowFlame.visible = M.fire > 0.01;
      if (mallowFlame.visible) {
        const fm = mallowFlame.material.uniforms; fm.uTime.value = T * 1.3; fm.uHeat.value = 0.8;
        mallowFlame.position.copy(M.pos).add(tmp.v.set(0, 0.015, 0));
        mallowFlame.scale.set(0.11 * M.fire, (0.17 + 0.05 * Math.sin(T * 9)) * M.fire, 1);
        mallowFlame.rotation.set(0, Math.atan2(camera.position.x - M.pos.x, camera.position.z - M.pos.z), 0);
      }
      // steam while it toasts and as it cools; smoke when it is burning or black
      M.steamFor = M.heat > 0.3 ? 1.4 : Math.max(0, M.steamFor - dt);
      M.steamAcc = (M.steamAcc || 0) + dt * (M.steamFor > 0 && toast > 0.12 && toast < 0.88 ? 9 * Math.max(M.heat, 0.4) : 0);
      while (M.steamAcc >= 1) { M.steamAcc -= 1; spawnSmoke(M.pos.x + (Math.random() - 0.5) * 0.04, M.pos.y + 0.04, M.pos.z + (Math.random() - 0.5) * 0.04, 2); }
      M.smokeAcc = (M.smokeAcc || 0) + dt * (M.fire > 0 ? 7 : toast > 0.8 && M.heat > 0.2 ? 4 : 0);
      while (M.smokeAcc >= 1) { M.smokeAcc -= 1; spawnSmoke(M.pos.x, M.pos.y + 0.05, M.pos.z, 1); }
      stepSmoke(steam, dt, T, 0.05);
      stepSugar(dt);
    }
    function crumbs(n) {
      for (let k = 0; k < n; k++) {
        const i = sugar.spawn(), ix = i * 3;
        sugar.pos[ix] = M.pos.x; sugar.pos[ix + 1] = M.pos.y + 0.03; sugar.pos[ix + 2] = M.pos.z;
        sugar.vel[ix] = (Math.random() - 0.5) * 0.5; sugar.vel[ix + 1] = Math.random() * 0.4; sugar.vel[ix + 2] = (Math.random() - 0.5) * 0.5;
        sugar.max[i] = sugar.life[i] = 0.5 + Math.random() * 0.4; sugar.kind[i] = 0;
      }
    }
    function puff() {
      for (let k = 0; k < 26; k++) {
        const i = sugar.spawn(), ix = i * 3, a = Math.random() * Math.PI * 2, s = 0.25 + Math.random() * 0.45;
        sugar.pos[ix] = M.pos.x; sugar.pos[ix + 1] = M.pos.y; sugar.pos[ix + 2] = M.pos.z;
        sugar.vel[ix] = Math.cos(a) * s; sugar.vel[ix + 1] = 0.1 + Math.random() * 0.35; sugar.vel[ix + 2] = Math.sin(a) * s;
        sugar.max[i] = sugar.life[i] = 0.6 + Math.random() * 0.5; sugar.kind[i] = 1;
      }
      for (let k = 0; k < 4; k++) spawnSmoke(M.pos.x, M.pos.y, M.pos.z, 2);
    }
    function stepSugar(dt) {
      const P = sugar, toast = M.toast;
      for (let i = 0; i < P.n; i++) {
        if (P.life[i] <= 0) { P.a[i] = 0; continue; }
        P.life[i] -= dt;
        const k = 1 - P.life[i] / P.max[i], ix = i * 3;
        P.vel[ix + 1] -= 0.6 * dt; P.vel[ix] *= 0.96; P.vel[ix + 2] *= 0.96;
        P.pos[ix] += P.vel[ix] * dt; P.pos[ix + 1] += P.vel[ix + 1] * dt; P.pos[ix + 2] += P.vel[ix + 2] * dt;
        const g = P.kind[i] === 1 ? [1.0, 0.95, 0.85] : toast > 0.8 ? [0.25, 0.16, 0.1] : [1.0, 0.85, 0.55];
        P.col[ix] = g[0]; P.col[ix + 1] = g[1]; P.col[ix + 2] = g[2];
        P.a[i] = (1 - k) * 0.8; P.size[i] = P.kind[i] === 1 ? 1.6 + 1.2 * (1 - k) : 1.4;
      }
      P.flush();
    }

    /* ---- the public surface ---- */
    const api = {
      C: C, sig: sig, look: look, M: M, perf: function () { const a = Array.from(perf.ring).sort(function (x, y) { return x - y; }); const info = renderer.info.render; return { p50: +(a[60] || 0).toFixed(2), p95: +(a[114] || 0).toFixed(2), calls: info.calls, triangles: info.triangles, pixelRatio: +pr.toFixed(2), ladder: perf.ladder }; },
      hooks: hooks,
      start: function (cv, opts) {
        canvas = cv; C.phone = !!opts.phone;
        try { renderer = new THREE.WebGLRenderer({ canvas: canvas, antialias: true, powerPreference: 'high-performance' }); } catch (e) { return false; }
        if (!renderer.getContext()) return false;
        prBase = Math.min(window.devicePixelRatio || 1, C.phone ? 2 : 1.5); pr = prBase;
        renderer.setPixelRatio(pr);
        scene = new THREE.Scene();
        scene.fog = new THREE.FogExp2('#0b1430', 0.028);
        camera = new THREE.PerspectiveCamera(62, 1, 0.05, 1400);
        scene.add(new THREE.HemisphereLight('#3a4f8f', '#120c08', 0.9));
        const moon = new THREE.DirectionalLight('#8fa6e0', 0.35); moon.position.set(-0.4, 1, 0.3); scene.add(moon);
        buildSky(); buildGround(); buildTrees(C.phone ? 90 : 140); buildCamp(); buildFire(); buildMallow();
        aimTo(FIRE_AIM.yaw, (C.phone ? -4 : 1) * DEG, true);
        api.resize();
        C.running = true; raf = requestAnimationFrame(step);
        return true;
      },
      resize: function () {
        if (!renderer) return;
        W = canvas.clientWidth || innerWidth; H = canvas.clientHeight || innerHeight;
        renderer.setSize(W, H, false); camera.aspect = W / H; camera.updateProjectionMatrix();
      },
      dispose: function () {
        cancelAnimationFrame(raf); C.running = false;
        if (scene) scene.traverse(function (o) { if (o.geometry) o.geometry.dispose(); if (o.material) { const ms = Array.isArray(o.material) ? o.material : [o.material]; ms.forEach(function (m) { if (m.map) m.map.dispose(); m.dispose(); }); } });
        if (renderer) { renderer.dispose(); renderer.forceContextLoss && renderer.forceContextLoss(); }
        renderer = null; scene = null;
      },
      setCatalogue: setCatalogue,
      setPlaying: function (slug) { sig.playing = slug; buildRoute(); },
      setQueue: function (list, current) { sig.queue = (list || []).slice(0, 6); sig.playing = current || sig.playing; buildRoute(); },
      setFilter: function (words, slugs) { if (!words) { sig.lit = null; return; } sig.lit = {}; (slugs || []).forEach(function (s) { sig.lit[s] = true; }); },
      litCount: function () { return sig.lit ? Object.keys(sig.lit).filter(function (s) { return sig.bySlug[s]; }).length : null; },
      setCursor: function (slug) { sig.cursor = slug; },
      setFreq: function (i) { const n = sig.freqs.length; if (!n) return; sig.freq = ((i % n) + n) % n; sig.dwell = 0; },
      scope: function (on) { C.scoped = !!on; sig.dwell = 0; if (!on) { sig.target = null; } },
      setScopeFov: function (f) { look.scopeFov = clamp(f, 6, 24); },
      // look: a gaze offset from the pointer, the centre moved by drags, the keys and the scope
      gaze: function (oy, op) { look.oy = oy; look.op = op; },
      nudge: function (dy, dp) { look.cy += dy; look.cp = clamp(look.cp + dp, -40 * DEG - look.op, 84 * DEG - look.op); },
      freezeGaze: function () { look.cy += look.oy; look.cp += look.op; look.oy = 0; look.op = 0; },
      aimAt: function (slug, offDeg, snap) { const s = sig.bySlug[slug]; if (!s) return false; placeSignals(); const yp = yawPitchOf(s.dir); aimTo(yp.yaw, yp.pitch + (offDeg || 0) * DEG, snap); return true; },
      aimDir: function (dir, snap) { const yp = yawPitchOf(dir); aimTo(yp.yaw, yp.pitch, snap); },
      aimFire: function () { if (!look.saved) look.saved = { cy: look.cy, cp: look.cp }; aimTo(LEAN_AIM.yaw, LEAN_AIM.pitch, false); },
      aimBack: function () { if (look.saved) { look.cy = look.saved.cy; look.cp = look.saved.cp; look.saved = null; } },
      // raising the scope lifts your eyes to the sky
      lift: function (minDeg) { if (look.cp + look.op < minDeg * DEG) look.cp = minDeg * DEG - look.op; },
      hidden: function (on) { C.hidden = !!on; if (!on) { look.cy = look.yaw - look.oy; look.cp = look.pitch - look.op; } },
      dirAtScreen: function (x, y) { const v = new THREE.Vector3((x / W) * 2 - 1, -(y / H) * 2 + 1, 0.5).unproject(camera).sub(camera.position).normalize(); return v; },
      project: function (slug) {
        const s = sig.bySlug[slug]; if (!s || !camera) return null;
        const p = tmp.v.copy(s.dir).multiplyScalar(600).add(camera.position).project(camera);
        return { x: (p.x + 1) / 2 * W, y: (1 - p.y) / 2 * H, behind: p.z > 1 };
      },
      pick: function (x, y, radius) {
        let best = null, bd = radius || 28;
        for (let i = 0; i < sig.list.length; i++) { const p = api.project(sig.list[i].slug); if (!p || p.behind) continue; const d = Math.hypot(p.x - x, p.y - y); if (d < bd) { bd = d; best = sig.list[i]; } }
        return best;
      },
      yawPitch: function () { return { yaw: look.yaw, pitch: look.pitch, fov: look.fov }; },
      fireAim: function () { return FIRE_AIM; },
      // the marshmallow
      skewer: function () { if (M.on || M.eating >= 0) return false; M.on = true; M.toast = 0; M.heat = 0; M.fire = 0; M.caught = false; M.appear = 0; M.bites = 0; M.ext = 0; M.swayV = 1.5; mallowMat.uniforms.uBite1.value.set(0, 0, 0, 0); mallowMat.uniforms.uBite2.value.set(0, 0, 0, 0); M.tip.copy(camera.position).addScaledVector(camFwd, 0.8); return true; },
      hold: function (on) { M.held = !!on && M.on; if (M.held) M.swayV += 0.8; },
      eat: function () { if (!M.on || M.eating >= 0) return false; M.held = false; M.eating = 0; M.swayV -= 1.2; return true; },
      pop: pop,
      drawTally: drawTally,
      scheme: function (dawn) { skyU.uDawn.value = dawn ? 1 : 0; },
      noMeteors: function (v) { C.noMeteors = !!v; },
      // test only (?mute=1): stop the loop and render on a stepped clock, one exact frame per call, so a recording is smooth
      // whatever the capture costs; the frame-time numbers are always measured on the live loop
      manual: function (on) { if (qs.get('mute') !== '1') return false; C.manual = !!on; if (on) { cancelAnimationFrame(raf); C.manualNow = last || performance.now(); } else { last = 0; raf = requestAnimationFrame(step); } return true; },
      tick: function (ms) { if (!C.manual) return false; C.manualNow += ms || 33.333; step(C.manualNow); return true; },
      meteorNow: function () { sched.meteorAt = 0; },
      crossNow: function () { sched.crossAt = 0; }
    };
    return api;
  }

  /* ================= the theme module ================= */
  NOBODY.themes.campfire = (function () {
    const TH = { name: 'campfire', blurb: 'a fire on a small planet, a sky full of signals, a scope, marshmallows.' };
    let ctx = null, V = null, A = null, glass = null, power = null, S = null;
    let scene = null, canvas = null, painted = null, nocampTimer = 0, scopeCanvas = null, scopeCtx = null, pendingView = null, gainHold = 1;
    const UI = { scopeEl: null, legend: null, bar: null, hint: null, credit: null, journal: null, meterBars: [], lockRing: null, freqBtn: null, targetEl: null, strengthEl: null, mallowBtn: null, mallowChip: null, scopeBtn: null, layout: 'camp', journalSlug: null, journalAt: 0, journalHover: false, lockSlug: null, lockAt: 0, ptr: null, pinch: null, rightScope: false, zDown: 0, hDown: 0, hToast: 0, hKey: false, jkAt: 0, selfHL: false, placeholder: null, hintAt: 0, freqAt: 0, frames: 0, golden: 0, goldenVisit: 0 };
    const AU = { on: false };
    function el(id) { return ctx.el[id] || document.getElementById(id); }
    function say(text, cls) { if (ctx && ctx.T) ctx.T.print(text, cls); }
    function phone() { return V && V.phone(); }
    function SY() { return NOBODY.synth; }

    /* ---- strings (12.0) ---- */
    TH.strings = {
      boot: function (n, voices, phone_, localOnly, backend) {
        const s = n === 1 ? '1 signal' : n + ' signals';
        if (phone_) return [
          ['NOBODY FM  88.8  camp', ''], ['kindling .... ', 'dry'], ['the fire .... ', 'lit'], ['the sky ..... ', 'clear, turning'],
          ['the scope ... ', 'under the log'], ['catalogue ... ', s + ', ' + voices + ' voice'], ['backend ..... ', localOnly ? 'not on the wire' : 'on the wire'], ['audio ....... ', 'waiting for a human', 'amber']
        ];
        return [
          ['NOBODY FM  88.8  a fire on a small planet', ''], ['kindling ........... ', 'dry, stacked'], ['the fire ........... ', 'lit, crackling'],
          ['the sky ............ ', 'clear, turning slowly'], ['the scope .......... ', 'found under the log'],
          ['catalogue .......... tracks/index.json .... ', s + ' in the sky, ' + voices + ' with a voice'], ['backend ............ ', localOnly ? 'not on the wire (local mode)' : backend],
          ['audio .............. ', 'waiting for a human', 'amber']
        ];
      },
      wait: function (phone_) { return phone_ ? '[ tap to sit down by the fire ]' : '[ press any key, or tap, to sit down by the fire ]'; },
      tagline: 'the transmitter nobody can find. tonight it is a fire.',
      licence: 'nobody fm. every track generated locally from a text prompt. no samples, no reference audio, no third-party rights claimed. ' + CREDIT,
      switched: 'theme: campfire. a log, a fire, a sky full of signals. z raises the scope; h for a marshmallow.',
      idle: 'idle. paused for ten minutes. the fire keeps itself going.'
    };
    TH.credit = CREDIT;

    /* ---- the interface paradigm (12.0, the hooks) ---- */
    const KEYS = ['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'f', 'z', 'w', 'e', 'l', 'h', 'x'];
    TH.interface = function () { return { kind: 'camp', keys: KEYS.slice(), layouts: ['camp', 'deck'] }; };
    TH.help = function () {
      return [['arrows', 'look round'], ['z', 'raise or lower the scope (hold it, or tap)'], ['w e', 'the frequency, down or up'], ['l or enter', 'lock on to the signal in the reticle'],
        ['h', 'a marshmallow: tap to skewer, hold to toast, tap to eat'], ['x', 'eat it now'], ['j k', 'the scope onto each match after a find'], ['q', 'the locked signal onto the route'], ['f', 'the camp or the deck'], ['esc', 'the journal, then the scope']];
    };
    TH.commands = function () {
      return {
        scope: function () { toggleScope(); },
        freq: function (a) {
          if (!scene) { say('no sky here. the list is the sky.', 'mid'); return; }
          const fs = scene.sig.freqs;
          if (!a) { say('frequencies: ' + fs.map(function (f, i) { return (i === scene.sig.freq ? '> ' : '') + f.name + ' ' + f.slugs.length; }).join(', ') + '. freq <name> tunes the scope.', 'mid'); return; }
          const i = fs.findIndex(function (f) { return f.name === a.toLowerCase(); }), j = i >= 0 ? i : fs.findIndex(function (f) { return f.name.indexOf(a.toLowerCase()) >= 0; });
          if (j < 0) { say('no frequency called "' + a + '".', 'err'); return; }
          setFreq(j, true);
        },
        lock: function () { lock(); },
        toast: function () { mallowTap(); },
        tally: function () { say('golden ones carved in the log: ' + UI.golden + (UI.goldenVisit ? ', ' + UI.goldenVisit + ' tonight.' : '. none tonight yet.'), 'mid'); },
        camp: function () { ctx.setLayout('camp'); }
      };
    };
    // the camp is the view only on the home screen in the camp layout with no overlay open (issue #77): a track page, the
    // guestbook or help send the camp's boards away, the same way the scope does, and its keys go back to the station
    function inCamp() { return UI.layout === 'camp' && !UI.away; }
    function syncAway() {
      const help = el('help'), away = UI.view !== 'home' || !!(help && !help.hidden);
      document.body.classList.toggle('camp-page', UI.view !== 'home');
      if (away === UI.away) return;
      UI.away = away;
      document.body.classList.toggle('camp-away', away);
      if (away) { closeJournal(); if (scene && scene.C.scoped) setScope(false); if (UI.hDown) mallowUp(); document.body.classList.remove('camp-toasting'); }
      else placeBar();
    }
    TH.keys = function (e) {
      if (!scene) return false;
      const k = e.key.length === 1 ? e.key.toLowerCase() : e.key;
      if (UI.away && k !== 'f') return false;
      if (k === 'f') { ctx.setLayout(inCamp() ? 'deck' : 'camp'); return true; }
      if (!inCamp()) {
        if (k === 'z' || k === 'h' || k === 'l' || k === 'w' || k === 'e' || k === 'x') ctx.setLayout('camp');
        else return false;   // in the deck the arrows are the station's seek again
      }
      if (document.body.classList.contains('ui-hidden')) return false;
      const scoped = scene.C.scoped, step = scoped ? 0.7 * Math.PI / 180 : 2.4 * Math.PI / 180;
      switch (k) {
        case 'ArrowLeft': scene.nudge(-step, 0); hintSeen(); return true;
        case 'ArrowRight': scene.nudge(step, 0); hintSeen(); return true;
        case 'ArrowUp': scene.nudge(0, step); hintSeen(); return true;
        case 'ArrowDown': scene.nudge(0, -step); hintSeen(); return true;
        case 'z': if (!e.repeat) { UI.zDown = performance.now(); UI.zWasScoped = scoped; if (!scoped) setScope(true); } return true;
        case 'w': setFreq(scene.sig.freq - 1, true); return true;
        case 'e': setFreq(scene.sig.freq + 1, true); return true;
        case 'l': lock(); return true;
        case 'x': if (!scene.M.on) say('nothing on the stick. h for a marshmallow.', 'mid'); else eat(); return true;
        case 'h': if (!e.repeat) mallowDown(); return true;
      }
      return false;
    };
    function onKeyUp(e) {
      const k = e.key.length === 1 ? e.key.toLowerCase() : e.key;
      if (k === 'z' && UI.zDown) { const held = performance.now() - UI.zDown; UI.zDown = 0; if (UI.zWasScoped) setScope(false); else if (held > 380) setScope(false); }
      if (k === 'h' && UI.hKey) { UI.hKey = false; mallowUp(); }
    }
    function onKeyCapture(e) { if ((e.key === 'j' || e.key === 'k') && !e.ctrlKey && !e.metaKey) UI.jkAt = performance.now(); }
    TH.layout = function (name) {
      UI.layout = name;
      if (UI.deckBtn) UI.deckBtn.textContent = name === 'camp' ? 'deck' : 'camp';
      if (name !== 'camp' && scene && scene.C.scoped) setScope(false);
      placeBar();
    };
    TH.highlight = function (slug) {
      if (!scene || UI.selfHL) return;
      scene.setCursor(slug);
      // j and k after a find swing the scope onto each match (the station keeps tab for the terminal)
      const cycling = performance.now() - UI.jkAt < 400;
      if (cycling && slug && scene.sig.bySlug[slug] && inCamp() && (ctx.filter() || scene.C.scoped)) {
        setFreq(scene.sig.bySlug[slug].freq, false);
        if (!scene.C.scoped) setScope(true);
        scene.aimAt(slug, 0, false);
      }
    };
    TH.queue = function (list, current) { if (scene) scene.setQueue(list, current); };
    TH.filter = function (words, slugs) {
      if (!scene) return;
      scene.setFilter(words, slugs);
      if (words) { const n = scene.litCount(); say('find: ' + n + (n === 1 ? ' signal blazes.' : ' signals blaze.') + ' the rest went quiet. j and k swing the scope onto each.', 'mid'); }
      else say('find cleared. the whole sky again.', 'mid');
    };
    TH.hidden = function (on) {
      if (!scene) return;
      if (on && scene.C.scoped) setScope(false);
      scene.hidden(on);
      closeJournal();
    };
    TH.escape = function () {
      if (UI.journalSlug) { closeJournal(); return true; }
      if (scene && scene.C.scoped) { setScope(false); return true; }
      return false;
    };

    /* ---- lifecycle ---- */
    TH.init = function (c) {
      ctx = c; V = c.V; A = c.A; glass = c.glass; power = c.power; S = c.S;
      canvas = document.createElement('canvas'); canvas.id = 'campCanvas'; canvas.className = 'camp-canvas'; canvas.setAttribute('aria-hidden', 'true');
      painted = document.createElement('div'); painted.className = 'camp-painted'; painted.setAttribute('aria-hidden', 'true'); painted.innerHTML = '<i class="pf"></i>';
      document.body.insertBefore(painted, document.body.firstChild);
      document.body.insertBefore(canvas, document.body.firstChild);
      try { UI.golden = parseInt(localStorage.getItem('nobody.campfire.golden') || '0', 10) || 0; } catch (e) { UI.golden = 0; }
      el('scope').textContent = '';
      scopeCanvas = document.createElement('canvas'); scopeCanvas.setAttribute('aria-label', 'oscilloscope'); el('scope').appendChild(scopeCanvas);
      const lab = document.createElement('span'); lab.className = 'dim scope-label'; lab.textContent = 'scope'; el('scope').appendChild(lab);
      scopeCtx = scopeCanvas.getContext('2d');
      el('licence').textContent = TH.strings.licence;
      el('progress').innerHTML = '<span class="rail"><i class="fill"></i><b class="head"></b></span><span class="time mid"></span>';
      el('hdrBar').textContent = ''; el('hdrBar').className = 'hdr-rail'; el('hdrBar').appendChild(document.createElement('i'));
      el('dial').innerHTML = '<span class="dial-band"><i></i></span><span class="dial-read"></span>';
      const words = el('makeWords'); if (words) { UI.placeholder = words.getAttribute('placeholder'); words.setAttribute('placeholder', 'ask the sky for a track...'); }
      UI.layout = 'camp'; UI.view = S.view === 'home' ? 'home' : 'page'; UI.away = null;
      buildUi();
      UI.helpWatch = new MutationObserver(syncAway); UI.helpWatch.observe(el('help'), { attributes: true, attributeFilter: ['hidden'] });
      syncAway();
      sceneUp();
      nocampTimer = setTimeout(function () { if (!scene) document.body.classList.add('nocamp'); }, 2000);
      if (window.NOBODY_NOCDN) document.body.classList.add('nocamp');
      TH.resize();
    };
    TH.dispose = function () {
      clearTimeout(nocampTimer);
      audioStop();
      if (scene) { scene.dispose(); scene = null; }
      [canvas, painted, UI.scopeEl, UI.legend, UI.bar, UI.hint, UI.credit, UI.journal, UI.deckWrap].forEach(function (n) { if (n) n.remove(); });
      canvas = painted = null; UI.scopeEl = UI.legend = UI.bar = UI.hint = UI.credit = UI.journal = UI.deckWrap = UI.deckBtn = null; UI.meterBars = [];
      el('scope').textContent = ''; scopeCanvas = null; scopeCtx = null;
      el('progress').textContent = ''; el('hdrBar').className = 'dim'; el('hdrBar').textContent = '............';
      el('dial').textContent = '';
      const words = el('makeWords'); if (words && UI.placeholder) words.setAttribute('placeholder', UI.placeholder);
      document.body.classList.remove('nocamp', 'camp-scoped', 'camp-journal-open', 'camp-toasting', 'camp-away', 'camp-page');
      if (UI.helpWatch) { UI.helpWatch.disconnect(); UI.helpWatch = null; }
      glass.classList.remove('closing', 'bloom-on');
      el('towerStatic').textContent = ''; el('towerStatic').hidden = true;
      window.removeEventListener('keyup', onKeyUp); window.removeEventListener('keydown', onKeyCapture, true); window.removeEventListener('wheel', onWheel); window.removeEventListener('resize', placeBar);
      const scr = document.getElementById('screen'); if (scr) scr.removeEventListener('scroll', placeBar);
    };
    function sceneUp() {
      const L = ctx.libs();
      if (scene || !L || !L.THREE) return;
      try {
        scene = makeCampScene(L.THREE);
        if (!scene.start(canvas, { phone: phone() })) { scene = null; document.body.classList.add('nocamp'); return; }
        document.body.classList.remove('nocamp');
        scene.hooks.onFrame = uiFrame;
        scene.hooks.onPop = function (s) { crackle(0.5 + s * 0.6); };
        scene.hooks.onCrackle = function (s) { crackle(s); };
        scene.hooks.onLockDwell = function () { lock(true); };
        scene.hooks.onMallow = mallowEvent;
        scene.setCatalogue(S.tracks);
        scene.setQueue(ctx.queueList().slice(0, 6), ctx.current());
        if (ctx.filter()) scene.setFilter(ctx.filter(), ctx.visible());
        scene.scheme(document.documentElement.dataset.phosphor === 'amber');
        scene.drawTally(UI.golden);
        drawLegend();
        if (pendingView) { const p = pendingView; pendingView = null; if (p.playing) scene.setPlaying(p.playing); if (p.hidden) scene.hidden(true); }
      } catch (e) { scene = null; document.body.classList.add('nocamp'); if (window.console) console.warn('campfire: no scene', e); }
    }
    TH.libsReady = function () { sceneUp(); };
    TH.resize = function () {
      if (scopeCanvas && scopeCtx) {
        const dpr = window.devicePixelRatio || 1, sw = scopeCanvas.clientWidth || 500, sh = scopeCanvas.clientHeight || V.rowPx();
        scopeCanvas.width = Math.round(sw * dpr); scopeCanvas.height = Math.round(sh * dpr); scopeCtx.setTransform(dpr, 0, 0, dpr, 0, 0);
        scopeCanvas.dataset.w = sw; scopeCanvas.dataset.h = sh;
      }
      if (scene) scene.resize();
      placeBar();
    };

    /* ---- transitions ---- */
    TH.transition = function (from, to, info) {
      info = info || {};
      if (to === 'boot') {
        glass.classList.remove('closing');
        // the fade settles by hand (12.0): a compositor fade can freeze under the harness's virtual clock
        return new Promise(function (res) { setTimeout(function () { glass.classList.remove('off'); setTimeout(function () { glass.style.transition = 'none'; glass.style.opacity = '1'; void glass.offsetWidth; glass.style.transition = ''; glass.style.opacity = ''; res(); }, 320); }, 100); });
      }
      if (to === 'off') {
        closeJournal(); if (scene && scene.C.scoped) setScope(false);
        return new Promise(function (res) { glass.classList.add('closing'); setTimeout(function () { glass.classList.add('off'); glass.classList.remove('closing'); res(); }, 380); });
      }
      if (to === 'air') {
        power.classList.remove('fade'); power.classList.add('on');
        setTimeout(function () { power.classList.add('fade'); setTimeout(function () { power.classList.remove('on', 'fade'); }, 160); }, 20);
        audioStart(); ident();
        if (inCamp()) say('you sit down by the fire. move or drag to look, z or the right button for the scope, w and e the frequency, h for a marshmallow. f for the deck.', 'mid');
        showHint();
        return Promise.resolve();
      }
      if (to === 'tuning') {
        if (scene) {
          // enter on the reticle's signal is a lock too: the station plays the highlight, and the highlight is the target
          if (scene.C.scoped && scene.sig.target === info.slug && UI.lockSlug !== info.slug) lockEffects(info.slug);
          scene.setPlaying(info.slug);
        } else pendingView = { playing: info.slug };
        return Promise.resolve();
      }
      if (to === 'playing') {
        if (scene) scene.setPlaying(info.slug); else pendingView = { playing: info.slug };
        if (UI.lockSlug && UI.lockSlug !== info.slug) UI.lockSlug = null;
        duckFor();
        return Promise.resolve();
      }
      if (to === 'page' || to === 'guestbook' || to === 'home' || to === 'dead') { UI.view = to === 'home' || to === 'dead' ? 'home' : to; syncAway(); }
      if (info.slug && scene) scene.setPlaying(info.slug);
      return Promise.resolve();
    };

    /* ---- scene hooks ---- */
    TH.catalogue = function (tracks) { if (scene) { scene.setCatalogue(tracks); drawLegend(); } };
    TH.playing = function (slug) { if (scene) scene.setPlaying(slug); };
    TH.scheme = function () { if (scene) scene.scheme(document.documentElement.dataset.phosphor === 'amber'); };
    TH.widget = function () { return null; };
    TH.state = function () {
      const base = { widget: null, layout: UI.layout, nocamp: document.body.classList.contains('nocamp'), golden: UI.golden, goldenVisit: UI.goldenVisit, journal: UI.journalSlug };
      if (!scene) return Object.assign(base, { running: false });
      const sg = scene.sig, yp = scene.yawPitch(), M = scene.M, pv = AU.pv;
      return Object.assign(base, {
        running: scene.C.running, frames: scene.C.frames, ms: +scene.C.ms.toFixed(2), perf: scene.perf(), phone: scene.C.phone, hidden: scene.C.hidden,
        signals: sg.list.length, freqs: sg.freqs.map(function (f) { return f.name + ' ' + f.slugs.length; }),
        camera: { yaw: +(yp.yaw / Math.PI * 180).toFixed(1), pitch: +(yp.pitch / Math.PI * 180).toFixed(1), fov: +yp.fov.toFixed(1) },
        scope: { on: scene.C.scoped, freq: sg.freqs[sg.freq] ? sg.freqs[sg.freq].name : null, target: sg.target, strength: +sg.strength.toFixed(3), angle: +(sg.angle / Math.PI * 180).toFixed(2), lock: UI.lockSlug },
        preview: pv ? { slug: AU.pvSlug, gain: +AU.pg.gain.value.toFixed(3), cutoff: Math.round(AU.lp.frequency.value), pan: +AU.pan.pan.value.toFixed(2), t: +pv.currentTime.toFixed(1), dur: +(pv.duration || 0).toFixed(1), paused: pv.paused,
          route: 'preview element -> lowpass -> pan -> gain -> the station gain (the mute) -> speakers; not into the analyser', master: SY().gain ? +SY().gain.gain.value.toFixed(3) : null, duck: SY().duckGain ? +SY().duckGain.gain.value.toFixed(3) : null } : { slug: null, note: AU.on ? 'no preview element' : 'audio not started' },
        lit: scene.litCount(), route: sg.queue.slice(), playing: sg.playing, cursor: sg.cursor,
        mallow: { on: M.on, toast: +M.toast.toFixed(3), state: mallowWord(), heat: +M.heat.toFixed(2), fire: +M.fire.toFixed(2), held: M.held, eating: M.eating >= 0 }
      });
    };
    TH.aimAt = function (slug, off, snap) { if (!scene) return false; setFreq(scene.sig.bySlug[slug] ? scene.sig.bySlug[slug].freq : 0, false); return scene.aimAt(slug, off || 0, snap !== false); };
    TH.screenSignals = function () { if (!scene) return []; return scene.sig.list.map(function (s) { const p = scene.project(s.slug); return { slug: s.slug, freq: s.freq, x: Math.round(p.x), y: Math.round(p.y), behind: p.behind }; }).filter(function (p) { return !p.behind && p.x > 0 && p.y > 0 && p.x < innerWidth && p.y < innerHeight; }); };
    TH.sceneApi = function () { return scene; };

    /* ---- the scope ---- */
    function setScope(on) {
      if (!scene) return;
      on = !!on && inCamp();
      if (on === scene.C.scoped) return;
      if (on) { scene.freezeGaze(); scene.aimBack(); scene.lift(16); closeJournal(); hintSeen(); }
      scene.scope(on);
      document.body.classList.toggle('camp-scoped', on);
      if (UI.scopeBtn) { UI.scopeBtn.setAttribute('aria-pressed', on ? 'true' : 'false'); UI.scopeBtn.textContent = on ? 'lower the scope' : 'scope'; }
      if (on) { const f = scene.sig.freqs[scene.sig.freq]; say('the scope is up. frequency ' + (f ? f.name : 'none') + '. sweep the sky.', 'mid'); }
      duckFor();
      if (!on) preview(null, 0, 0);
    }
    function toggleScope() { if (!scene) { say('no sky here. the list is the sky.', 'mid'); return; } if (!inCamp()) ctx.setLayout('camp'); setScope(!scene.C.scoped); }
    function setFreq(i, speak) {
      if (!scene || !scene.sig.freqs.length) return;
      scene.setFreq(i);
      const f = scene.sig.freqs[scene.sig.freq];
      if (speak) say('frequency: ' + f.name + '. ' + f.slugs.length + (f.slugs.length === 1 ? ' signal.' : ' signals.'), 'mid');
      drawLegend();
    }
    function lock(auto) {
      if (!scene) return;
      const sg = scene.sig;
      if (!scene.C.scoped) { say('raise the scope first: z, or the right button.', 'mid'); return; }
      if (!sg.target || sg.strength < 0.3) { say('nothing under the reticle yet. sweep closer.', 'mid'); return; }
      const slug = sg.target;
      lockEffects(slug, auto);
      ctx.play(slug);
    }
    function lockEffects(slug, auto) {
      UI.lockSlug = slug; UI.lockAt = performance.now();
      chime();
      previewBloom();
      UI.scopeEl && UI.scopeEl.classList.add('locked');
      UI.selfHL = true; ctx.setHighlight(slug); UI.selfHL = false;
      const t = ctx.tracks().find(function (x) { return x.slug === slug; });
      say((auto ? 'held steady. ' : '') + 'locked on: ' + (t ? (t.title || slug) : slug) + '. it comes in clear.', 'mid');
      setTimeout(function () { if (UI.scopeEl) UI.scopeEl.classList.remove('locked'); if (scene && scene.C.scoped) setScope(false); openJournal(slug); }, 1300);
    }
    function duckFor() { const sy = SY(); if (sy && sy.duck && sy.ctx) sy.duck(scene && scene.C.scoped ? 0.2 : 1, scene && scene.C.scoped ? 0.5 : 0.9); }

    /* ---- the marshmallow ---- */
    function mallowWord() {
      if (!scene || !scene.M.on) return 'none';
      const t = scene.M.toast;
      if (scene.M.fire > 0.01) return 'on fire';
      return t < 0.12 ? 'raw' : t < 0.38 ? 'warm' : t < 0.64 && !scene.M.caught ? 'golden' : t < 0.8 ? 'brown' : t < 0.9 ? 'black' : 'charred';
    }
    function mallowDown(fromPointer) {
      if (!scene) return;
      if (!inCamp()) ctx.setLayout('camp');
      if (scene.C.scoped) setScope(false);
      if (!scene.M.on) { if (scene.M.eating < 0 && scene.skewer()) { say(UI.skewered ? 'another one on the stick.' : 'a marshmallow on the stick. hold h (or the button) to hold it in the fire; tap again to eat it.', 'mid'); UI.skewered = true; } return; }
      UI.hDown = performance.now(); UI.hToast = scene.M.toast; UI.hKey = !fromPointer;
      document.body.classList.add('camp-toasting');
      scene.hold(true); scene.aimFire();
    }
    function mallowUp() {
      if (!scene || !UI.hDown) return;
      const held = performance.now() - UI.hDown; UI.hDown = 0;
      scene.hold(false); scene.aimBack(); document.body.classList.remove('camp-toasting');
      if (held < 260 && scene.M.toast - UI.hToast < 0.03) eat();
    }
    function mallowTap() { if (!scene) return; if (!scene.M.on) mallowDown(true); else eat(); }
    function eat() {
      if (!scene || !scene.M.on) return;
      const w = mallowWord(), caught = scene.M.caught, toast = scene.M.toast;
      if (!scene.eat()) return;
      UI.eaten = { word: w, caught: caught, toast: toast };
      biteSound();
    }
    const BURNT = ['charcoal. it tasted of the fire. it always does.', 'black all the way through. the sky pretends it did not see.', 'that one went up. it happens to everybody who waits.', 'a cinder with a soft heart. nobody judges.'];
    function mallowEvent(kind) {
      if (kind === 'caught') { say('it caught. pull it back, or let it burn.', 'amber'); return; }
      if (kind === 'out') { say('it went out on its own, smoking.', 'mid'); return; }
      if (kind === 'eaten' && UI.eaten) {
        const e = UI.eaten; UI.eaten = null;
        if (e.word === 'golden' && !e.caught) {
          UI.golden++; UI.goldenVisit++;
          try { localStorage.setItem('nobody.campfire.golden', String(UI.golden)); } catch (err) {}
          if (scene) scene.drawTally(UI.golden);
          say('golden. that is the one. carved into the log: ' + UI.golden + '.', 'ok');
        } else if (e.word === 'raw') say('raw, straight from the bag. honest.', 'mid');
        else if (e.word === 'warm') say('warm, just. patience is a kind of heat.', 'mid');
        else if (e.word === 'brown') say('brown and crisp. not golden. still good.', 'mid');
        else say(BURNT[Math.floor(Math.random() * BURNT.length)], 'mid');
      }
    }

    /* ---- audio: everything synthesised, all of it quiet, all of it through the station's gain (the mute) ---- */
    function audioStart() {
      const sy = SY();
      if (AU.on || !sy || !sy.ctx || !sy.gain) return;
      const c = sy.ctx; AU.on = true; AU.c = c; AU.nodes = [];
      AU.bus = c.createGain(); AU.bus.gain.value = 0.9; AU.bus.connect(sy.gain);
      const noiseSrc = function () { const s = c.createBufferSource(); s.buffer = sy.noise; s.loop = true; s.start(0, Math.random() * 1.9); AU.nodes.push(s); return s; };
      // the wind: low noise, breathing slowly
      const wl = c.createBiquadFilter(); wl.type = 'lowpass'; wl.frequency.value = 380;
      const wg = c.createGain(); wg.gain.value = 0.011;
      const lfo = c.createOscillator(); lfo.frequency.value = 0.06; const lg = c.createGain(); lg.gain.value = 0.007; lfo.connect(lg); lg.connect(wg.gain); lfo.start(); AU.nodes.push(lfo);
      noiseSrc().connect(wl); wl.connect(wg); wg.connect(AU.bus);
      // the fire's low breath
      const rl = c.createBiquadFilter(); rl.type = 'lowpass'; rl.frequency.value = 240; const rg = c.createGain(); rg.gain.value = 0.016;
      noiseSrc().connect(rl); rl.connect(rg); rg.connect(AU.bus);
      // the scope's static: tightens to a narrow band as the signal grows
      AU.statBp = c.createBiquadFilter(); AU.statBp.type = 'bandpass'; AU.statBp.frequency.value = 1500; AU.statBp.Q.value = 0.7;
      AU.statG = c.createGain(); AU.statG.gain.value = 0;
      noiseSrc().connect(AU.statBp); AU.statBp.connect(AU.statG); AU.statG.connect(AU.bus);
      // the preview: the track's own file through a lowpass, a pan and a gain, into the station's gain (past the duck, not into the analyser)
      if (!ctx.fileMode()) {
        try {
          AU.pv = new Audio(); AU.pv.crossOrigin = 'anonymous'; AU.pv.preload = 'auto';
          AU.pvSrc = c.createMediaElementSource(AU.pv);
          AU.lp = c.createBiquadFilter(); AU.lp.type = 'lowpass'; AU.lp.frequency.value = 220; AU.lp.Q.value = 0.9;
          AU.pan = c.createStereoPanner ? c.createStereoPanner() : c.createGain(); if (!AU.pan.pan) AU.pan.pan = { value: 0, setTargetAtTime: function () {} };
          AU.pg = c.createGain(); AU.pg.gain.value = 0;
          AU.pvSrc.connect(AU.lp); AU.lp.connect(AU.pan); AU.pan.connect(AU.pg); AU.pg.connect(sy.gain);
        } catch (e) { AU.pv = null; }
      }
    }
    function audioStop() {
      if (!AU.on) return;
      try { AU.nodes.forEach(function (n) { try { n.stop(); } catch (e) {} }); AU.bus.disconnect(); if (AU.pg) AU.pg.disconnect(); } catch (e) {}
      if (AU.pv) { try { AU.pv.pause(); AU.pv.removeAttribute('src'); AU.pv.load(); } catch (e) {} }
      const sy = SY(); if (sy && sy.duck) sy.duck(1, 0.3);
      AU.on = false; AU.pv = null; AU.pvSlug = null;
    }
    function crackle(s) {
      if (!AU.on || document.hidden) return;
      const c = AU.c, sy = SY(), t = c.currentTime;
      const src = c.createBufferSource(); src.buffer = sy.noise;
      const hp = c.createBiquadFilter(); hp.type = 'highpass'; hp.frequency.value = 1100 + Math.random() * 2600;
      const g = c.createGain(); g.gain.setValueAtTime(0.0001, t); g.gain.exponentialRampToValueAtTime(0.012 + 0.05 * s, t + 0.002); g.gain.exponentialRampToValueAtTime(0.0001, t + 0.01 + 0.04 * s);
      src.connect(hp); hp.connect(g); g.connect(AU.bus);
      src.start(t, Math.random() * 1.8, 0.07);
    }
    function chime() {
      if (!AU.on) return;
      const c = AU.c, t = c.currentTime + 0.01;
      [[659.25, 0], [987.77, 0.09], [1318.5, 0.18]].forEach(function (n, i) {
        const o = c.createOscillator(); o.type = 'sine'; o.frequency.value = n[0];
        const g = c.createGain(); g.gain.setValueAtTime(0.0001, t + n[1]); g.gain.exponentialRampToValueAtTime(0.05 / (i + 1), t + n[1] + 0.01); g.gain.exponentialRampToValueAtTime(0.0001, t + n[1] + 1.6);
        o.connect(g); g.connect(AU.bus); o.start(t + n[1]); o.stop(t + n[1] + 1.7);
      });
    }
    // the ident: a few plucked notes and a held reed chord, our own short phrase
    function ident() {
      if (!AU.on) return;
      const c = AU.c; let t = c.currentTime + 0.3;
      [293.66, 369.99, 440.0, 587.33, 493.88, 440.0].forEach(function (f, i) {
        const o = c.createOscillator(); o.type = 'triangle'; o.frequency.value = f;
        const o2 = c.createOscillator(); o2.type = 'square'; o2.frequency.value = f * 2;
        const g = c.createGain(), g2 = c.createGain(); g2.gain.value = 0.18;
        g.gain.setValueAtTime(0.0001, t); g.gain.exponentialRampToValueAtTime(0.05, t + 0.004); g.gain.exponentialRampToValueAtTime(0.0001, t + 0.38);
        o.connect(g); o2.connect(g2); g2.connect(g); g.connect(AU.bus); o.start(t); o2.start(t); o.stop(t + 0.4); o2.stop(t + 0.4);
        t += i === 3 ? 0.22 : 0.14;
      });
      const lp = c.createBiquadFilter(); lp.type = 'lowpass'; lp.frequency.value = 1300; lp.connect(AU.bus);
      const vib = c.createOscillator(); vib.frequency.value = 5.2; const vg = c.createGain(); vg.gain.value = 4; vib.connect(vg); vib.start(t); vib.stop(t + 1.2);
      [293.66, 369.99, 440.0].forEach(function (f) {
        const o = c.createOscillator(); o.type = 'square'; o.frequency.value = f; vg.connect(o.frequency);
        const g = c.createGain(); g.gain.setValueAtTime(0.0001, t); g.gain.exponentialRampToValueAtTime(0.012, t + 0.12); g.gain.setValueAtTime(0.012, t + 0.8); g.gain.exponentialRampToValueAtTime(0.0001, t + 1.15);
        o.connect(g); g.connect(lp); o.start(t); o.stop(t + 1.2);
      });
    }
    function biteSound() {
      if (!AU.on) return;
      const c = AU.c, sy = SY(), t = c.currentTime + 0.42;
      [0, 0.36].forEach(function (d) {
        const src = c.createBufferSource(); src.buffer = sy.noise;
        const lp = c.createBiquadFilter(); lp.type = 'lowpass'; lp.frequency.value = 900;
        const g = c.createGain(); g.gain.setValueAtTime(0.0001, t + d); g.gain.exponentialRampToValueAtTime(0.04, t + d + 0.01); g.gain.exponentialRampToValueAtTime(0.0001, t + d + 0.12);
        src.connect(lp); lp.connect(g); g.connect(AU.bus); src.start(t + d, Math.random(), 0.15);
      });
    }
    function preview(slug, s, pan) {
      if (!AU.pv) return;
      const c = AU.c, t = c.currentTime;
      if (slug !== AU.pvSlug && !(UI.lockSlug && performance.now() - UI.lockAt < 2600)) {
        AU.pg.gain.cancelScheduledValues(t); AU.pg.gain.setTargetAtTime(0, t, 0.03);
        AU.pvSlug = slug;
        if (!slug) { clearTimeout(AU.pauseT); AU.pauseT = setTimeout(function () { if (!AU.pvSlug && AU.pv) AU.pv.pause(); }, 500); }
        else {
          const src = ctx.src(slug);
          if (src) {
            AU.pv.src = src;
            AU.pv.onloadedmetadata = function () { if (AU.pvSlug !== slug) return; try { AU.pv.currentTime = (AU.pv.duration || 0) / 2; } catch (e) {} const p = AU.pv.play(); if (p && p.catch) p.catch(function () {}); };
            AU.pv.load();
          }
        }
      }
      if (UI.lockSlug && performance.now() - UI.lockAt < 2600) return;   // the bloom owns the preview for a moment
      const want = slug ? 0.55 * Math.pow(s, 1.5) : 0, cut = 200 + 9000 * Math.pow(s, 2.2);
      AU.pg.gain.setTargetAtTime(want, t, 0.12); AU.lp.frequency.setTargetAtTime(cut, t, 0.1);
      AU.pan.pan.setTargetAtTime(clamp(pan, -1, 1) * (1 - s) * 0.8, t, 0.1);
      const scoped = scene && scene.C.scoped;
      AU.statG.gain.setTargetAtTime(scoped ? 0.004 + 0.03 * Math.pow(1 - s, 0.8) : 0, t, 0.1);
      AU.statBp.Q.setTargetAtTime(0.7 + 10 * s, t, 0.1); AU.statBp.frequency.setTargetAtTime(1300 + 1500 * s, t, 0.1);
    }
    function previewBloom() {
      if (!AU.pv || !AU.pg) return;
      const t = AU.c.currentTime;
      AU.pg.gain.cancelScheduledValues(t); AU.lp.frequency.cancelScheduledValues(t);
      AU.pg.gain.setTargetAtTime(0.85, t, 0.12); AU.lp.frequency.setTargetAtTime(16000, t, 0.15); AU.pan.pan.setTargetAtTime(0, t, 0.1);
      AU.statG.gain.setTargetAtTime(0, t, 0.05);
      // the station tunes in the track itself after its own burst; the preview hands over and fades
      AU.pg.gain.setTargetAtTime(0, t + 1.3, 0.35);
      setTimeout(function () { if (AU.pv) { AU.pv.pause(); AU.pvSlug = null; } }, 2800);
    }

    /* ---- the camp's own elements: the scope's view, the legend, the bar, the hint, the credit, the journal ---- */
    function mk(tag, cls, parent, text) { const e = document.createElement(tag); if (cls) e.className = cls; if (text != null) e.textContent = text; if (parent) parent.appendChild(e); return e; }
    function buildUi() {
      // the scope's view: a dark ring round a circle of sky, a reticle, the frequency, the meter, the lock ring
      const sc = mk('div', 'camp-scope', document.body); sc.id = 'campScope'; sc.setAttribute('aria-hidden', 'true');
      mk('div', 'cs-mask', sc);
      sc.insertAdjacentHTML('beforeend', '<svg class="cs-reticle" viewBox="-100 -100 200 200"><circle r="96" class="rim"/><circle r="90" class="rim2"/><path d="M-60 0H-14M14 0H60M0 -60V-14M0 14V60"/><circle r="3"/><circle r="40" class="dash"/><circle r="74" class="lockring"/></svg>');
      UI.lockRing = sc.querySelector('.lockring');
      const top = mk('div', 'cs-top', sc);
      UI.freqBtn = mk('button', 'bare cs-freq', top, ''); UI.freqBtn.type = 'button'; UI.freqBtn.setAttribute('aria-label', 'next frequency');
      UI.freqBtn.addEventListener('click', function (e) { e.stopPropagation(); setFreq(scene ? scene.sig.freq + 1 : 0, true); });
      const bot = mk('div', 'cs-bottom', sc);
      const meter = mk('div', 'cs-meter', bot); for (let i = 0; i < 14; i++) UI.meterBars.push(mk('i', '', meter));
      UI.strengthEl = mk('span', 'cs-strength', bot, 'no signal');
      UI.targetEl = mk('div', 'cs-target', bot, '');
      UI.scopeEl = sc;
      // the legend of frequencies
      const lg = mk('div', 'card camp-legend', document.body); lg.id = 'campLegend';
      UI.legend = lg;
      // the bar by the fire: the scope, the marshmallow, its state, the deck
      const bar = mk('div', 'camp-bar', document.body); bar.id = 'campBar';
      UI.scopeBtn = mk('button', 'bk camp-btn', bar, 'scope'); UI.scopeBtn.type = 'button'; UI.scopeBtn.setAttribute('aria-pressed', 'false');
      UI.scopeBtn.addEventListener('click', function (e) { e.preventDefault(); toggleScope(); });
      UI.mallowBtn = mk('button', 'bk camp-btn', bar, 'marshmallow'); UI.mallowBtn.type = 'button';
      UI.mallowBtn.setAttribute('aria-label', 'marshmallow: tap to skewer, hold to toast, tap to eat');
      UI.mallowBtn.addEventListener('pointerdown', function (e) { e.preventDefault(); try { UI.mallowBtn.setPointerCapture(e.pointerId); } catch (err) {} mallowDown(true); });
      UI.mallowBtn.addEventListener('pointerup', function (e) { e.preventDefault(); mallowUp(); });
      UI.mallowBtn.addEventListener('pointercancel', function () { mallowUp(); });
      UI.mallowBtn.addEventListener('keydown', function (e) { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); e.stopPropagation(); mallowTap(); } });
      UI.mallowChip = mk('span', 'camp-mallow', bar, '');
      UI.bar = bar;
      // the [ deck ] bracket in the catalogue's control row
      const wrap = document.createElement('span'); wrap.className = 'camp-deck-wrap';
      const db = mk('button', 'bk camp-deck', wrap, 'deck'); db.type = 'button'; db.setAttribute('aria-label', 'the camp or the deck');
      db.addEventListener('click', function () { ctx.setLayout(inCamp() ? 'deck' : 'camp'); });
      wrap.appendChild(document.createTextNode('   '));
      const controls = document.querySelector('#catalogue .cat-controls'); if (controls) controls.insertBefore(wrap, controls.firstChild);
      UI.deckBtn = db; UI.deckWrap = wrap;
      // the hint, the first time; the credit under the camp
      UI.hint = mk('div', 'camp-hint', document.body, ''); UI.hint.hidden = true;
      UI.credit = mk('p', 'camp-credit', document.body, CREDIT);
      // the camp journal
      const j = mk('section', 'card camp-journal', document.body); j.id = 'campJournal'; j.hidden = true; j.setAttribute('aria-label', 'camp journal');
      j.innerHTML = '<div class="row"><span class="label">CAMP JOURNAL</span><button class="bare cj-close" type="button" aria-label="close the journal">close</button></div>' +
        '<div class="cj-when"></div><h3 class="cj-title"></h3><div class="cj-freq"></div><p class="cj-prompt"></p><p class="cj-why"></p><dl class="cj-nums"></dl><div class="cj-buttons"></div>';
      j.querySelector('.cj-close').addEventListener('click', closeJournal);
      const jb = j.querySelector('.cj-buttons');
      [['+ route', function (s) { ctx.queue(s); }], ['remix', function (s) { ctx.remix(s); closeJournal(); }], ['the page', function (s) { ctx.open(s); }]].forEach(function (b) {
        const btn = mk('button', 'bk', jb, b[0]); btn.type = 'button'; btn.addEventListener('click', function (e) { e.stopPropagation(); if (UI.journalSlug) b[1](UI.journalSlug); }); jb.appendChild(document.createTextNode(' '));
      });
      j.addEventListener('pointerenter', function () { UI.journalHover = true; }); j.addEventListener('pointerleave', function () { UI.journalHover = false; });
      UI.journal = j;
      // the pointer on the sky
      canvas.addEventListener('pointerdown', onDown);
      canvas.addEventListener('pointermove', onMove);
      canvas.addEventListener('pointerup', onUp);
      canvas.addEventListener('pointercancel', onCancel);
      canvas.addEventListener('contextmenu', function (e) { e.preventDefault(); });
      window.addEventListener('wheel', onWheel, { passive: false });
      window.addEventListener('keyup', onKeyUp);
      window.addEventListener('keydown', onKeyCapture, true);
      window.addEventListener('resize', placeBar);
      const scr = document.getElementById('screen'); if (scr) scr.addEventListener('scroll', placeBar, { passive: true });
      setTimeout(placeBar, 50);
    }
    function drawLegend() {
      if (!UI.legend || !scene) return;
      const fs = scene.sig.freqs;
      UI.legend.textContent = '';
      mk('div', 'label', UI.legend, 'FREQUENCIES');
      fs.forEach(function (f, i) {
        const b = mk('button', 'bare cl-row' + (i === scene.sig.freq ? ' on' : ''), UI.legend); b.type = 'button';
        const dot = mk('i', 'cl-dot', b); dot.style.background = f.colour; dot.style.boxShadow = '0 0 8px ' + f.colour;
        mk('span', 'cl-name', b, (i === scene.sig.freq ? '> ' : '  ') + f.name);
        mk('span', 'cl-n', b, String(f.slugs.length));
        b.addEventListener('click', function () { setFreq(i, true); if (!scene.C.scoped) setScope(true); });
      });
      if (UI.freqBtn && fs[scene.sig.freq]) { UI.freqBtn.textContent = 'freq ' + (scene.sig.freq + 1) + '/' + fs.length + '  ' + fs[scene.sig.freq].name; UI.freqBtn.style.setProperty('--fc', fs[scene.sig.freq].colour); }
    }
    function placeBar() {
      if (!UI.bar || !ctx) return;
      const ph = phone();
      if (ph) {
        const tx = el('transmitter').getBoundingClientRect();
        const top = inCamp() ? tx.top : innerHeight;
        UI.bar.style.left = '50%'; UI.bar.style.top = Math.round(top - (UI.bar.offsetHeight || 44) - 10) + 'px'; UI.bar.style.bottom = 'auto';
      } else {
        const tx = el('transmitter').getBoundingClientRect(), cat = el('catalogue').getBoundingClientRect();
        const left = tx.right > 0 ? tx.right : 0, right = cat.left > left ? cat.left : innerWidth;
        UI.credit.style.left = Math.round((left + right) / 2) + 'px'; UI.credit.style.maxWidth = Math.max(240, Math.round(right - left - 24)) + 'px';
        UI.bar.style.left = Math.round((left + right) / 2) + 'px'; UI.bar.style.top = 'auto'; UI.bar.style.bottom = Math.round((UI.credit.offsetHeight || 40) + 24) + 'px';
      }
    }
    function showHint() {
      let seen = false; try { seen = localStorage.getItem('nobody.campfire.hint') === '1'; } catch (e) {}
      if (seen || !UI.hint) return;
      UI.hint.textContent = phone() ? 'drag to look. [ scope ], then sweep and tap a signal. [ marshmallow ]: tap, hold, tap.' : 'look: move or drag, or the arrows.  scope: z or the right button.  frequency: w e or the wheel.  lock: l, enter or a click.  marshmallow: h, hold h to toast.  f: the deck.';
      UI.hint.hidden = false; UI.hintAt = performance.now();
    }
    function hintSeen() { if (UI.hint && !UI.hint.hidden && performance.now() - UI.hintAt > 1500) { UI.hint.hidden = true; try { localStorage.setItem('nobody.campfire.hint', '1'); } catch (e) {} } }

    function openJournal(slug) {
      const t = ctx.tracks().find(function (x) { return x.slug === slug; }); if (!t || !UI.journal) return;
      const j = UI.journal, d = new Date();
      j.querySelector('.cj-when').textContent = 'locked on at ' + String(d.getHours()).padStart(2, '0') + ':' + String(d.getMinutes()).padStart(2, '0') + (t.date ? ', made ' + t.date : '');
      j.querySelector('.cj-title').textContent = t.title || t.slug;
      const s = scene && scene.sig.bySlug[slug], f = s ? scene.sig.freqs[s.freq] : null;
      const fe = j.querySelector('.cj-freq'); fe.textContent = f ? 'frequency: ' + f.name : ''; fe.style.setProperty('--fc', f ? f.colour : 'transparent');
      j.querySelector('.cj-prompt').textContent = t.prompt || t.idea || '';
      j.querySelector('.cj-why').textContent = t.why || '';
      const n = t.numbers || {}, dl = j.querySelector('.cj-nums'); dl.textContent = '';
      [['seed', t.seed], ['bpm', t.bpm], ['key', t.key], ['length', t.duration ? ctx.fmt(t.duration) : null], ['tier', t.model], ['loudness', n.lufs != null ? n.lufs + ' LUFS' : null]].forEach(function (r) {
        if (r[1] == null || r[1] === '') return; mk('dt', '', dl, r[0]); mk('dd', '', dl, String(r[1]));
      });
      j.hidden = false; j.classList.remove('in'); void j.offsetWidth; j.classList.add('in');
      document.body.classList.add('camp-journal-open');
      UI.journalSlug = slug; UI.journalAt = performance.now();
    }
    function closeJournal() { if (!UI.journal || UI.journal.hidden) { UI.journalSlug = null; return; } UI.journal.hidden = true; UI.journalSlug = null; document.body.classList.remove('camp-journal-open'); }

    /* ---- the pointer: move to look, drag to turn, the right button raises the scope, a click locks or picks, the wheel tunes ---- */
    const DEGR = Math.PI / 180;
    function onDown(e) {
      if (!scene || !inCamp()) return;
      if (e.pointerType === 'touch') {
        UI.touches = UI.touches || {}; UI.touches[e.pointerId] = { x: e.clientX, y: e.clientY };
        try { canvas.setPointerCapture(e.pointerId); } catch (err) {}
        const ids = Object.keys(UI.touches);
        if (ids.length === 2 && scene.C.scoped) { const a = UI.touches[ids[0]], b = UI.touches[ids[1]]; UI.pinch = { d: Math.hypot(a.x - b.x, a.y - b.y), fov: scene.look.scopeFov }; UI.ptr = null; return; }
      }
      if (e.button === 2) { if (!scene.C.scoped) { UI.rightScope = true; setScope(true); } UI.ptr = { x: e.clientX, y: e.clientY, lx: e.clientX, ly: e.clientY, t: performance.now(), moved: false, right: true }; return; }
      UI.ptr = { x: e.clientX, y: e.clientY, lx: e.clientX, ly: e.clientY, t: performance.now(), moved: false, touch: e.pointerType === 'touch' };
      if (!UI.ptr.touch) { scene.freezeGaze(); try { canvas.setPointerCapture(e.pointerId); } catch (err) {} }
    }
    function onMove(e) {
      if (!scene || !inCamp() || document.body.classList.contains('ui-hidden')) return;
      if (e.pointerType === 'touch' && UI.touches && UI.touches[e.pointerId]) {
        UI.touches[e.pointerId] = { x: e.clientX, y: e.clientY };
        if (UI.pinch) { const ids = Object.keys(UI.touches); if (ids.length >= 2) { const a = UI.touches[ids[0]], b = UI.touches[ids[1]]; scene.setScopeFov(UI.pinch.fov * UI.pinch.d / Math.max(20, Math.hypot(a.x - b.x, a.y - b.y))); } return; }
      }
      const p = UI.ptr, fovV = scene.look.fov * DEGR, k = fovV / innerHeight;
      if (p) {
        const dx = e.clientX - p.lx, dy = e.clientY - p.ly; p.lx = e.clientX; p.ly = e.clientY;
        if (Math.abs(e.clientX - p.x) + Math.abs(e.clientY - p.y) > 6) p.moved = true;
        if (!p.moved) return;
        hintSeen();
        // the scope aims where you push; without it, a drag takes hold of the sky
        if (scene.C.scoped && !p.touch) scene.nudge(dx * k * 0.9, -dy * k * 0.9);
        else scene.nudge(-dx * k * 1.1, dy * k * 1.1);
        return;
      }
      if (e.pointerType === 'mouse') {
        if (scene.C.scoped) { if (UI.mlx != null) scene.nudge((e.clientX - UI.mlx) * k * 0.9, -(e.clientY - UI.mly) * k * 0.9); }
        else scene.gaze((e.clientX / innerWidth - 0.5) * 2 * 24 * DEGR, (0.5 - e.clientY / innerHeight) * 2 * 11 * DEGR);
        UI.mlx = e.clientX; UI.mly = e.clientY;
      }
    }
    function onUp(e) {
      if (UI.touches) delete UI.touches[e.pointerId];
      if (UI.pinch) { if (!UI.touches || Object.keys(UI.touches).length < 2) UI.pinch = null; return; }
      const p = UI.ptr; UI.ptr = null;
      if (!scene || !p || !inCamp()) return;
      if (p.right) { if (UI.rightScope) { UI.rightScope = false; if (!p.moved || performance.now() - p.t > 300) setScope(false); } return; }
      UI.mlx = e.clientX; UI.mly = e.clientY;
      if (p.moved) return;
      // a click: in the scope it locks; outside it, a click near a signal raises the scope on it
      if (scene.C.scoped) { lock(); return; }
      const s = scene.pick(e.clientX, e.clientY, p.touch ? 40 : 28);
      if (s) { setFreq(s.freq, false); setScope(true); scene.aimAt(s.slug, 0, false); UI.selfHL = true; ctx.setHighlight(s.slug); UI.selfHL = false; scene.setCursor(s.slug); }
    }
    function onCancel(e) { if (UI.touches) delete UI.touches[e.pointerId]; UI.ptr = null; UI.pinch = null; }
    function onWheel(e) {
      if (!scene || !inCamp() || e.target !== canvas) return;
      e.preventDefault();
      const now = performance.now(); if (now - UI.freqAt < 160) return; UI.freqAt = now;
      setFreq(scene.sig.freq + (e.deltaY > 0 ? 1 : -1), true);
    }

    /* ---- every frame after the render: the scope's readouts, the preview, the marshmallow's word, the journal's clock ---- */
    function uiFrame(now) {
      if (!scene) return;
      UI.frames++;
      const sg = scene.sig, scoped = scene.C.scoped;
      if (scoped) {
        const s = sg.strength, lit = Math.round(s * UI.meterBars.length);
        UI.meterBars.forEach(function (b, i) { b.className = i < lit ? 'on' : ''; });
        const f = sg.freqs[sg.freq];
        UI.strengthEl.textContent = !sg.target ? 'static' : s > 0.86 ? 'strong. hold steady' : s > 0.5 ? 'clearer' : s > 0.15 ? 'faint' : 'static';
        const t = sg.target && s > 0.55 ? ctx.tracks().find(function (x) { return x.slug === sg.target; }) : null;
        UI.targetEl.textContent = t ? (t.title || t.slug) : '';
        UI.lockRing.style.strokeDashoffset = String(465 * (1 - clamp(sg.dwell / 1.5, 0, 1)));
        UI.scopeEl.style.setProperty('--fc', f ? f.colour : '#fff');
        // the preview: pan by which side the target is on
        let pan = 0;
        if (sg.target) { const p = scene.project(sg.target); if (p) pan = (p.x / innerWidth - 0.5) * 2; }
        preview(sg.target, s, pan);
      }
      // the marshmallow's word
      const M = scene.M;
      if (UI.mallowChip) {
        const w = mallowWord();
        const txt = M.on ? w + (M.held ? ', in the fire' : '') : 'golden: ' + UI.golden;
        if (UI.mallowChip.textContent !== txt) UI.mallowChip.textContent = txt;
        UI.mallowChip.style.setProperty('--toast', String(M.on ? M.toast : 0));
        UI.mallowBtn.textContent = M.on ? (M.eating >= 0 ? 'mm' : 'eat') : 'marshmallow';
      }
      // the journal closes itself after a while unless you are reading it
      if (UI.journalSlug && !UI.journalHover && now - UI.journalAt > 22000) closeJournal();
      if (UI.hint && !UI.hint.hidden && now - UI.hintAt > 16000) hintSeen();
      if (UI.frames % 30 === 1) placeBar();
    }

    /* ---- the station's widgets in the camp's hand ---- */
    TH.stationName = function (button) { button.textContent = ''; const s = mk('span', 'camp-name', button, 'NOBODY FM'); s.setAttribute('aria-hidden', 'false'); };
    TH.banner = function (bannerEl, phone_, scramble) {
      bannerEl.classList.remove('in'); bannerEl.textContent = '';
      const s = mk('span', 'camp-banner', bannerEl, 'NOBODY FM');
      bannerEl.classList.add('in');
      if (scramble) { s.textContent = V.scrambled('NOBODY FM'); V.scramble(s, 'NOBODY FM', 900); }
    };
    TH.progress = function (progressEl, hdrBarEl, c, d, phone_, view) {
      const fmt = ctx.fmt, pct = d ? Math.max(0, Math.min(100, c / d * 100)) : 0;
      const fill = progressEl.querySelector('.fill'), head = progressEl.querySelector('.head'), time = progressEl.querySelector('.time');
      if (fill) fill.style.width = pct.toFixed(2) + '%';
      if (head) head.style.left = pct.toFixed(2) + '%';
      if (time) time.textContent = phone_ ? fmt(c) + '/' + fmt(d) : fmt(c) + ' / ' + fmt(d);
      if (view !== 'home') { const bar = hdrBarEl.querySelector('i'); if (bar) bar.style.width = pct.toFixed(2) + '%'; }
    };
    TH.progressHit = function (progressEl, x) { const rail = progressEl.querySelector('.rail') || progressEl, r = rail.getBoundingClientRect(); return Math.max(0, Math.min(1, (x - r.left) / r.width)); };
    TH.dial = function (dialEl, f, locked, note) {
      if (!dialEl.querySelector('.dial-read')) dialEl.innerHTML = '<span class="dial-band"><i></i></span><span class="dial-read"></span>';
      const i = dialEl.querySelector('.dial-band i'); if (i) i.style.left = clamp((f - 86) / 22 * 100, 0, 100).toFixed(1) + '%';
      dialEl.querySelector('.dial-read').textContent = f.toFixed(1) + ' MHz' + (note ? '  ' + note : '');
      dialEl.classList.toggle('locked', !!locked);
    };
    TH.volume = function () {};
    TH.towerStart = function (hostEl, staticEl) {
      if (scene && scene.C.running) { staticEl.hidden = true; return 'camp'; }
      staticEl.textContent = ''; staticEl.hidden = false; mk('i', 'camp-mini-fire', staticEl); return 'css';
    };
    TH.towerStop = function () { el('towerStatic').hidden = true; };
    TH.towerState = function () { return scene && scene.C.running ? 'the camp at night, the fire going' : 'a small CSS fire in the card'; };

    /* ---- the card's analyser in the deck: warm bars, a gold scope line ---- */
    function token(name) { return getComputedStyle(document.documentElement).getPropertyValue(name).trim(); }
    function autoGain(s) { let m = 0; for (let i = 0; i < s.length; i++) m = Math.max(m, Math.abs(s[i])); const want = m > 0.02 ? Math.min(12, 0.8 / m) : gainHold; gainHold += (want - gainHold) * 0.05; return gainHold; }
    TH.frame = function () {
      if (!A.ctx2d) return;
      const ember = token('--ember'), gold = token('--gold'), dim = token('--ink-dim'), deep = token('--ember-deep');
      if (!ember || !gold) return;
      const g = A.ctx2d, W = A.W, H = A.H;
      g.clearRect(0, 0, W, H);
      const ph = phone(), cellW = V.fontPx() * 0.6, totalCols = Math.floor(W / cellW);
      A.totalCols = totalCols;
      const labelCols = ph ? 10 : 24, areaCols = Math.max(A.bands, totalCols - 2 - labelCols), areaW = areaCols * cellW, x0 = 2 * cellW;
      g.fillStyle = dim; g.fillRect(0, 0, 1, H);
      const n = Math.max(32, Math.floor(areaW / 3));
      if (A.mode === 'scope5') {
        const s = A.samples(n), gn = autoGain(s);
        g.lineWidth = 1.5; g.strokeStyle = gold; g.shadowColor = ember; g.shadowBlur = 8; g.beginPath();
        for (let i = 0; i < n; i++) { const x = x0 + i / (n - 1) * areaW, y = H / 2 - s[i] * gn * (H / 2 - 2); if (i) g.lineTo(x, y); else g.moveTo(x, y); }
        g.stroke(); g.shadowBlur = 0; A.baselineText(true); return;
      }
      const per = areaW / A.bands, bw = Math.max(2, per * 0.62);
      const grad = g.createLinearGradient(0, H, 0, 0); grad.addColorStop(0, deep || ember); grad.addColorStop(0.5, ember); grad.addColorStop(1, gold);
      const rows = A.rows, cellH = H / rows;
      for (let b = 0; b < A.bands; b++) {
        const v = A.vals[b], cells = Math.min(rows, Math.floor(Math.pow(v, 0.8) * (rows + 0.99))), hgt = Math.max(0, Math.pow(v, 0.8) * H);
        if (cells > A.peaks[b]) { A.peaks[b] = cells; A.peakAt[b] = performance.now(); } else if (performance.now() - A.peakAt[b] > 150 && A.peaks[b] > 0) { A.peaks[b]--; A.peakAt[b] = performance.now(); }
        const x = x0 + b * per + (per - bw) / 2;
        g.fillStyle = grad; if (hgt > 1) { if (A.flip) g.fillRect(x, 0, bw, hgt); else g.fillRect(x, H - hgt, bw, hgt); }
        const pk = A.peaks[b]; if (pk > cells && pk <= rows) { g.fillStyle = gold; g.fillRect(x, A.flip ? pk * cellH - 2 : H - pk * cellH, bw, 2); }
      }
      A.baselineText(A.live);
      if (scopeCtx) {
        const SW = +scopeCanvas.dataset.w || 500, SH = +scopeCanvas.dataset.h || 20, m = Math.max(32, Math.floor(SW / 3)), s = A.samples(m), gn = autoGain(s), sc = scopeCtx;
        sc.clearRect(0, 0, SW, SH); sc.lineWidth = 1.2; sc.strokeStyle = gold; sc.beginPath();
        for (let i = 0; i < m; i++) { const x = i / (m - 1) * SW, y = SH / 2 - s[i] * gn * (SH / 2 - 1); if (i) sc.lineTo(x, y); else sc.moveTo(x, y); }
        sc.stroke();
      }
    };
    TH.artwork = function () {
      try {
        const cv = document.createElement('canvas'); cv.width = 512; cv.height = 512; const g = cv.getContext('2d');
        const bg = g.createLinearGradient(0, 0, 0, 512); bg.addColorStop(0, '#060a1c'); bg.addColorStop(0.7, '#141d3e'); bg.addColorStop(1, '#0b0805'); g.fillStyle = bg; g.fillRect(0, 0, 512, 512);
        const r = rng(5); for (let i = 0; i < 160; i++) { g.fillStyle = 'rgba(235,240,255,' + (0.3 + r() * 0.7) + ')'; g.fillRect(r() * 512, r() * 330, r() < 0.1 ? 2 : 1, r() < 0.1 ? 2 : 1); }
        g.fillStyle = '#0b120d'; g.beginPath(); g.ellipse(256, 760, 520, 340, 0, 0, Math.PI * 2); g.fill();
        const fg = g.createRadialGradient(256, 410, 4, 256, 410, 120); fg.addColorStop(0, 'rgba(255,220,140,1)'); fg.addColorStop(0.25, 'rgba(255,140,50,.8)'); fg.addColorStop(1, 'rgba(255,80,20,0)'); g.fillStyle = fg; g.fillRect(100, 260, 312, 252);
        g.fillStyle = '#ffd27a'; g.font = '700 58px "Barlow Condensed", sans-serif'; g.textAlign = 'center'; g.fillText('NOBODY FM', 256, 170);
        g.font = '400 22px "Barlow Condensed", sans-serif'; g.fillStyle = '#d9c3a0'; g.fillText('88.8  a fire, a sky, a scope', 256, 205);
        return cv.toDataURL('image/png');
      } catch (e) { return null; }
    };
    return TH;
  })();
})();
