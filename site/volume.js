/* nobody fm: the volume fader (issue #51, design 12.0 "controls"). one implementation under every theme: the word
   VOL (or a speaker glyph where a theme uses icons) that mutes, a visible track, a bright handle, and a readout of the
   notch (7/10) while the control is touched. drag, click to set, the mouse wheel over it, the arrow keys when it has
   focus; -, = and m keep working from the station's own key table. the markup is in index.html (theme-independent, a
   theme styles it through its tokens and never removes it); this file only wires it and draws the state.
   the station hands it an io: set(v, quiet) and mute(). a drag sets the gain live and prints one line on release. */
window.NOBODY = window.NOBODY || {};
NOBODY.volume = (function () {
  const F = { host: null, rail: null, fill: null, handle: null, read: null, mute: null, deco: null, io: null, v: 7, muted: false, dragging: false, last: -1 };
  const clamp = function (v) { return Math.max(0, Math.min(10, Math.round(v))); };
  function notchAt(x) {
    const r = F.rail.getBoundingClientRect();
    if (!r.width) return F.v;
    return clamp((x - r.left) / r.width * 10);
  }
  function live(v) { if (v === F.last) return; F.last = v; F.io.set(v, true); }
  function commit(v) { F.last = -1; F.io.set(v, false); }

  F.mount = function (host, io) {
    F.host = host; F.io = io;
    F.rail = host.querySelector('.vol-rail'); F.fill = host.querySelector('.vol-fill'); F.handle = host.querySelector('.vol-handle');
    F.read = host.querySelector('.vol-read'); F.mute = host.querySelector('.vol-mute'); F.deco = host.querySelector('.vol-deco');
    if (!F.rail) return;
    // drag and click-to-set: the pointer is captured so the handle follows a finger that leaves the rail
    F.rail.addEventListener('pointerdown', function (e) {
      if (e.button != null && e.button !== 0) return;
      e.preventDefault();
      F.dragging = true; host.classList.add('dragging');
      try { F.rail.setPointerCapture(e.pointerId); } catch (err) {}
      live(notchAt(e.clientX));
    });
    F.rail.addEventListener('pointermove', function (e) { if (F.dragging) live(notchAt(e.clientX)); });
    const up = function (e) {
      if (!F.dragging) return;
      F.dragging = false; host.classList.remove('dragging');
      try { F.rail.releasePointerCapture(e.pointerId); } catch (err) {}
      commit(e.clientX != null ? notchAt(e.clientX) : F.v);
    };
    F.rail.addEventListener('pointerup', up);
    F.rail.addEventListener('pointercancel', up);
    // the wheel over the whole control: up is louder
    host.addEventListener('wheel', function (e) {
      e.preventDefault();
      const d = e.deltaY || -e.deltaX;
      if (!d) return;
      commit(clamp(F.v + (d < 0 ? 1 : -1)));
    }, { passive: false });
    // the arrow keys when the rail has focus; stopped here so the station's own keys (left and right seek) stay out of it
    F.rail.addEventListener('keydown', function (e) {
      let v = null;
      if (e.key === 'ArrowRight' || e.key === 'ArrowUp') v = F.v + 1;
      else if (e.key === 'ArrowLeft' || e.key === 'ArrowDown') v = F.v - 1;
      else if (e.key === 'Home') v = 0;
      else if (e.key === 'End') v = 10;
      else if (e.key === 'Escape') { F.rail.blur(); e.preventDefault(); e.stopPropagation(); return; }
      if (v == null) return;
      e.preventDefault(); e.stopPropagation();
      commit(clamp(v));
    });
    if (F.mute) F.mute.addEventListener('click', function (e) { e.preventDefault(); F.io.mute(); });
    F.draw(F.v, F.muted);
  };

  // draws the state: the fill, the handle, the readout, the struck glyph when muted, the aria values
  F.draw = function (v, muted) {
    F.v = clamp(v); F.muted = !!muted;
    if (!F.rail) return;
    const pct = (F.v * 10) + '%';
    F.fill.style.width = pct;
    F.handle.style.left = pct;
    F.read.textContent = F.v + '/10' + (F.muted ? ' m' : '');
    F.host.classList.toggle('muted', F.muted);
    F.rail.setAttribute('aria-valuenow', String(F.v));
    F.rail.setAttribute('aria-valuetext', F.v + ' of 10' + (F.muted ? ', muted' : ''));
    if (F.mute) { F.mute.setAttribute('aria-pressed', F.muted ? 'true' : 'false'); F.mute.setAttribute('aria-label', F.muted ? 'unmute' : 'mute'); }
  };
  // what the harness reads
  F.state = function () {
    const r = F.rail ? F.rail.getBoundingClientRect() : { width: 0, height: 0 };
    return { v: F.v, muted: F.muted, dragging: F.dragging, railWidth: Math.round(r.width), railHeight: Math.round(r.height), read: F.read ? F.read.textContent : '' };
  };
  return F;
})();
