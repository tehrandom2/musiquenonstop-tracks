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

## The cover (issue #89)

- **The palette comes from the cover.** When the playing track is on an album with art, the cover's 400 px
  webp is read once into a 48 px copy and a 24-bin hue histogram (each pixel weighted by how colourful and
  how lit it is, greys and blacks left out): the heaviest bin is `--h`, the heaviest bin at least 50 degrees
  away is `--h2` (the second hue: the aurora's third glow, the slow horizon layer, the middle lamp, the title's
  last gradient stop). Only the hues move; saturation and lightness stay the tokens', so the contrast the
  accent measured at every hue still holds. A cover with too little colour, a cover that cannot be read (another
  origin without CORS), an album without art, a track on no album and the second scheme all keep the track's
  colour, as before.
- **The cover hangs behind the stage.** Blurred once into a 256 px canvas with feathered edges and stretched to
  the height of the window, centred under the truss: dim on its own, lifted by the bass, fading through black
  when the album changes. Three lamps on the truss sweep pools of light across it and the kick fires them: each
  pool is the banner's own patch, feathered and added back, with a little of the lamp's colour, and a faint
  beam from the lamp. An album without art hangs the station's placeholder (`img/nobody-cover-<size>.webp`);
  a track on no album hangs nothing.
- **The truss.** A rig across the top of the page: a lattice between two rails, seven lamps whose glow follows
  the bass, and the album's title on an opaque plate in the middle while an album plays. It belongs to the
  stage, behind the glass: the screen starts below it and a scrolled card passes over it.
- **The album API** is the station's (issue #73, design 12.19): `NOBODY.albumOf(track)` and `NOBODY.cover(album, 400)`.

## Files

`theme.css` (tokens, faces, glass, the icon buttons, the truss), `theme.js` (the scrubber, the profile, the stage,
the cover's palette and banner, the truss, the strings). The fonts are in `../../vendor/` with their licences in `../../vendor/LICENSES.md`:
Unbounded, Space Grotesk and JetBrains Mono, all SIL Open Font License 1.1, from the Google Fonts builds via
the `@fontsource-variable` 5.2.6 packages.

Nobody who built this can hear. The profile is a number per bucket, the kick is a number per frame.
