# theme: phosphor

The green CRT of the first build (design sections 3 and 5), kept as a theme by section 12.0 and ADR 0008.
The default look until the owner flips `defaultTheme` in `../../config.js`.

- **Palette.** Phosphor green `#41FF6A` on `#050705`, mid and dim greens, a hot white-green, amber
  `#FFB000` for warnings and the tuning state. The second scheme (`amber`, the cheat code) swaps the ramp to
  amber and the warnings to green.
- **Type.** VT323 as the one face (a terminal has one); IBM Plex Mono for the printouts (`cat`).
- **The widget.** None. The CRT mounts nothing in the transmitter card: the progress bar is typed
  (`####....`), the dial is text ticks, the volume is `vol ####......`, the analyser is typed cells and the
  scope a line of glyphs. `widget()` answers `null`.
- **Behind the page.** The glass: a barrel filter (dropped on a slow machine by a twelve-frame probe),
  scanlines, a rolling bar, phosphor noise, a flicker, the power line that opens and closes it.
- **Dead air.** The ASCII tower: three.js through `AsciiEffect` when the CDN answered, a static drawing
  when it did not.

Files: `theme.css`, `theme.js`. Fonts: VT323 and IBM Plex Mono, both SIL Open Font License 1.1, in
`../../vendor/` with the licences in `../../vendor/LICENSES.md`.
