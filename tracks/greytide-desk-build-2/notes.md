# Primer Coat Groove (build phase)

- **slug:** greytide-desk-build-2
- **idea:** woozy tape-warped analog synth funk
- **mood:** the build phase
- **bpm:** 82 (asked) / 82 (measured now, folded into 70-140)
- **key:** A minor (as the source recorded it)
- **seed:** 801020
- **model:** ACE-Step 1.5 (acestep-v15-turbo, LM acestep-5Hz-lm-1.7B)
- **tier:** fast   **duration:** 90.1 s as shipped
- **date:** 2026-10-06 (the original render date)
- **rendered_at:** 2026-10-06T12:00:00-04:00 (that date at 12:00 local: no time of day was recorded)
- **project:** greytide
- **backfill:** true (imported from an earlier soundtrack; it is never new)
- **licence:** generated locally from a text prompt, no samples or reference audio, no third-party rights claimed

## Why

I did not render this one for the station: it was made on 2026-10-06 for an earlier tabletop game soundtrack, and I have brought it in under that date, so it is not new. The ask was "woozy tape-warped analog synth funk" (the build phase): 82 bpm in A minor. The prompt describes laid back woozy analog synth funk with brush-handle taps, paint-jar clinks and cutting-mat ticks as a drum kit and tape-warped detuned synthesizers drifting slightly out of tune; I have not heard it, and the numbers below were measured now, on the file as it shipped.

## Prompt

> Laid back woozy analog synth funk, brush-handle taps, paint-jar clinks and cutting-mat ticks as a drum kit, tape-warped detuned synthesizers drifting slightly out of tune, vocoder lead used as an instrument, fuzzy round bass, dusty lo-fi drum machine with loose swing, lamp-lit painting desk daydream, good-humoured, 82 bpm, calm and spacious, steady loopable arrangement, instrumental, no vocals, no singing, no speech, no drops, no wobble bass, no build-ups, no aggressive drums, no sub bass, light thin low end, bass in the mid range only

No lyrics recorded: instrumental.

## Request filter

run on import over the title, idea, prompt and every lyric line; the text above is as the source wrote it
would strip: Primer Coat Groove

## Rejected seeds

- 800020: harsh: 3.1% above 6 kHz; busy: 4.6 onsets/s
- 630002: superseded by the #443 render

## Measured now, on the shipped file (gate profile mellow: the station's default, not what this track was made against)

| gate | measured | limit | passed |
|---|---|---|---|
| tempo | 82 bpm vs asked 82 | within 4 bpm, folds 0.5 / 2 / 4:3 / 3:4 allowed | yes |
| loudness | -16.5 LUFS as shipped | -16 LUFS within 1 dB | yes |
| peak | -1.44 dBFS decoded | under -1 dBFS | yes |
| silence | longest 1.20 s under -50 dBFS | under 0.5 s | **NO** |
| brightness | 1.10 % of power above 6 kHz | under 2.5 % (mellow) | yes |
| boominess | 23.82 % below 60 Hz | under 12 % | **NO** |
| onset rate | 2.97 per second | 0.3 to 4.5 | yes |
| loop seam | step 0.16x, tail-head +0.2 dB | step under 4.0x, level within 5.0 dB | yes |

## Checks

not passed against the station's profile: silence, boominess. Reported, not a reason to leave it out: this track shipped before the station existed.

## Backfill

- audio: stream-copied (already 128 kbps CBR), tags stripped
- recipe: `reproducible: false`. The seed and the prompt are recorded; the planner model's audio codes were never kept, so a re-render from them may differ. `recipe_render.py` refuses it.
