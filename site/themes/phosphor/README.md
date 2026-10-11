# theme: phosphor

The green CRT of the first build (design sections 3 and 5), kept as a theme by section 12.0 and ADR 0008.
The default look until the owner flips `defaultTheme` in `../../config.js`.

- **Palette.** Phosphor green `#41FF6A` on `#050705`, mid and dim greens, a hot white-green, amber
  `#FFB000` for warnings and the tuning state. The second scheme (`amber`, the cheat code) swaps the ramp to
  amber and the warnings to green. Every text tone reads at 4.5:1 or better on the glass (12.0, legibility).
- **Type.** VT323 as the one face (a terminal has one); IBM Plex Mono for the printouts (`cat`).
- **The widget.** None. The CRT mounts nothing in the transmitter card: the progress bar is typed
  (`####....`), the dial is text ticks, the volume is the shared fader (`volume.js`, design 12.0 controls) in
  the green with a `--hot` handle, the analyser is typed cells and the
  scope a line of glyphs. `widget()` answers `null`.
- **Behind the page.** The glass: a barrel filter (dropped on a slow machine by a twelve-frame probe, read once
  the tube has warmed), scanlines at 10 % that flicker a little, a rolling bar, phosphor noise, a flicker, the
  power line that opens and closes it, a deeper vignette on a near-black bezel, and a still sheen over it all.
- **The materials (issue #54).** Every band is boxed in box-drawing glyphs (`┌─┐ ├─┤ └─┘`, rails down both
  sides); the vendored VT323 is a Latin subset without the U+2500 block, so the frame glyphs come from the
  machine's own monospace, sized to one cell of the band's padding and clipped to the band, so no layout
  depends on them. Phosphor persistence: when a character changes (typing, the dial sweeping, the clock, the
  banner resolving, a line printed) it is struck `--hot` with the full bloom and cools over a quarter of a
  second (the afterglow in `theme.js`: a transparent copy of the block's text in two pseudo-elements, never in
  `textContent`, never a measured text box); the analyser's bars leave a two-frame trail and the scope keeps
  the trace of two frames ago under the live one. The cursor blinks at terminal cadence (530 ms on, 530 ms
  off, a hard step). Power-on warms the tube: a hot bloom at the centre and a degauss wobble, taken off by the
  clock at 800 ms. The playing slug breathes with the bass (`--beat`); the row that starts playing is struck
  hot. All of it stops under `prefers-reduced-motion`. The boot's clock and the typing speeds are the
  station's (section 7, 12.0), not the theme's.
- **Hidden mode (issue #52).** With `ui-hidden` on the body the glass keeps its scanlines, a stronger rolling
  bar and the noise; the ASCII tower that mode mounts in `.hide-tower` gets the full bloom.
- **Dead air.** The ASCII tower: three.js through `AsciiEffect` when the CDN answered, a static drawing
  when it did not.
- **What the harness reads.** `state()` answers `barrel`, `tower`, `frames` and `ms` (the station's frame
  calls while on air, the same read the city reports) and `afterglow` (blocks watched).

Files: `theme.css`, `theme.js`. Fonts: VT323 and IBM Plex Mono, both SIL Open Font License 1.1, in
`../../vendor/` with the licences in `../../vendor/LICENSES.md`.
