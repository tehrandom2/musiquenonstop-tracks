# theme: city

A city of data at night, seen from the air: the second look (design 12.1 to 12.13, ADR 0008). Towers of
glowing translucent blocks on an endless grid, one per track, the camera flying between them.

- **Palette.** Cyan `#19F0FF`, magenta `#FF2BD6`, violet `#8B5CF6`, a green beacon `#B4FF39`, amber
  `#FFB020` for warnings, ink `#E8F1FF` on `#020309`. The second scheme (`amber`, the cheat code) makes it a
  sunset and the warnings go cyan.
- **Type.** Orbitron (variable) as the display face; IBM Plex Mono as the data face.
- **The widget.** None in the transmitter card: the city's signature is the scene behind the page (the
  ring of 64 bars and the ribbon around the playing tower). `widget()` answers `null`. The progress bar is
  a rail with a glowing head, the dial a strip of frequencies, the volume the shared fader (`volume.js`,
  design 12.0 controls) with the deep gradient as its fill and a cyan handle; the HUD ring stays on the counter.
- **Behind the page.** The three.js scene with bloom and chromatic fringing, on `NOBODY.libs` from the
  CDN; without it the body says `nocity` and a CSS perspective grid stands in.
- **Dead air.** The scene's unlit tower building block by block, or a CSS tower in the card without the
  scene.

Files: `theme.css`, `theme.js`. Fonts: Orbitron and IBM Plex Mono, both SIL Open Font License 1.1, in
`../../vendor/` with the licences in `../../vendor/LICENSES.md`. The harness runs this theme's Chrome on
ANGLE over SwiftShader (software WebGL).
