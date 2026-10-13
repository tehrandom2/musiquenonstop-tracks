# theme: city

A city of data at night, seen from the air: the second look (design 12.1 to 12.13, ADR 0008), and since issue #53
the fly-through (`docs/city-flythrough.md`, design 12.0 "the interface paradigm", 12.17): the catalogue is a street
city built from the index's measured numbers and the camera is the cursor. Towers of glowing translucent blocks on a
street grid, one per track, the camera flying the streets between them.

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
- **The fly-through.** Two layouts of the home view: the air (the cards folded to the edges, the city in hand) and
  the deck (the cards in their column). Tempo is a tower's height, duration its width, loudness its glow, brightness
  its crown, boominess its base, the tier its hue, a voice its beacon, age its edge light; `project` or a mood family
  is its district, the date its street. In the air it is free flight (issue #110, `docs/city-flythrough.md` section 21):
  a drag aims the view and it stays aimed, `w`/`s` or `up`/`down` fly forward and back along the view, `a`/`d` or
  `left`/`right` slide sideways, `e` rises and `shift` sinks, `z`/`x` turn, the wheel moves along the view; nothing else
  moves the camera, and a track change moves only the beam and the edge marker. A click on a tower glides there and plays
  it (the pointer is a hand there and the tower lifts), `j`/`k` glide to the next tower, `enter` plays the cursor tower,
  `q` queues it, `f` or `esc` the list view (the deck), `h` the hint bar, `t` the themes, `shift`+`left`/`right` the 5 s
  seek, `shift`+`s` the shuffle; space stays the station's pause. On a phone one finger aims, two fingers fly, a tap is
  the hover, a second tap plays. Commands: `fly [slug]`, `deck`, `route`, `cruise`, `land`, `district [name]`, `where`.
  The hidden mode is the auto-fly: a slow glide on a smooth curve round the playing tower, taken back by any camera key
  and picked up again after 20 s without input. Without the scene, or when it stops drawing, the air says so and `f` is
  the list.

Files: `theme.css`, `theme.js`. Fonts: Orbitron and IBM Plex Mono, both SIL Open Font License 1.1, in
`../../vendor/` with the licences in `../../vendor/LICENSES.md`. The harness runs this theme's Chrome on
ANGLE over SwiftShader (software WebGL).
