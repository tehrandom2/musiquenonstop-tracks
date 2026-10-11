# theme: arena

A dark stage for the visualiser. Ported for issue #28 from the look of an earlier project's soundtrack
page (an arena shooter's); the palette, the three faces, the icon buttons, the big scrubber and the stage
behind the page came across, nothing else did. The station's voice, commands and data are untouched.

## The look

- **Palette.** Near-black blue `#06060b`, ink `#f3f2fa`, dim `#a9a8bd`, faint `#6c6c82`, and one accent
  hue per track, `--h`, that the whole page follows through a registered custom property with a 1.4 s
  transition: fast tracks (100 bpm and up) run hot (magenta to orange), slow ones cool (teal to violet),
  neighbours in the catalogue golden-ratio steps apart. The second scheme (`amber`, the cheat code) locks
  the stage on a sunset hue and turns the warnings cold.
- **Type.** Unbounded (variable, 900 for the title) as the display face; Space Grotesk (variable) for the
  readout, the prose, the pills and the hints; JetBrains Mono (variable) for the terminal, the catalogue,
  the times and everything that lines up in columns.
- **Legibility.** The card body is opaque `#0d0e17` inside a translucent ring (the glass is the rim, not
  what the text sits on); the accent `hsl(h 96% 66%)` measures 5.2:1 or better at every hue the station
  can pick, the faint 5.8, the dim 8.3 (`node site/tools/contrast.mjs` prints the pairs); nothing is under
  16 px on desktop or 15 on a phone; played rows carry the word `played` as well as the faint tone.
- **The widget.** The big scrubber in the transmitter card (the widget slot of design 12.0): a canvas of
  3 px bars that is the loudness profile of the playing track, the played part in the track's hue, a white
  head that glows on the kick, the time under the pointer. Over http the file is fetched and decoded once
  into 200 RMS buckets; from a file URL, or until the decode lands, the analyser's loudness is written into
  the bucket under the head as the track plays and the unplayed part is a quiet guess. The four fat buttons
  are shown on every screen as the dock's icon buttons (masks in CSS; the text stays for a reader).
- **Behind the page.** A 2D canvas: three aurora glows on an eighth-size soft layer, a liquid spectrum along
  the floor with a faint mirror at the top, an oscilloscope ribbon across the upper third, drifting dust,
  shockwaves and tracers that fire on the kick (onsets from spectral flux in the lowest eight bands against
  a running average). Nothing snaps: every value is eased with a frame-rate-independent rate, and with no
  signal the page runs on a synthetic spectrum the live one crossfades from. A slow machine draws it
  smaller rather than less often.
- **The card.** Bars in the hue with a hot top and white peaks; a ribbon scope; the dial a strip of
  frequencies under a white needle; the volume the shared fader (`volume.js`, design 12.0 controls) drawn as
  the dock's slider: the speaker glyph mutes, the accent fills the rail, a white handle; the
  counter in glowing display digits; dead air is an empty orbit turning in the card.

## Files

`theme.css` (tokens, faces, glass, the icon buttons), `theme.js` (the scrubber, the profile, the stage,
the strings). The fonts are in `../../vendor/` with their licences in `../../vendor/LICENSES.md`:
Unbounded, Space Grotesk and JetBrains Mono, all SIL Open Font License 1.1, from the Google Fonts builds via
the `@fontsource-variable` 5.2.6 packages.

Nobody who built this can hear. The profile is a number per bucket, the kick is a number per frame.
