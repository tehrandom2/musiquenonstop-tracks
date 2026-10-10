# Dusk In The Branches (wave)

- **slug:** greytide-treehouse-wave-1
- **idea:** creaking-wood dusk groove with a kid's whistle
- **mood:** the wave phase
- **bpm:** 81 (asked) / 80 (measured now, folded into 70-140)
- **key:** G major (as the source recorded it)
- **seed:** 802215
- **model:** ACE-Step 1.5 (acestep-v15-turbo, LM acestep-5Hz-lm-1.7B)
- **tier:** fast   **duration:** 93.2 s as shipped
- **date:** 2026-10-07 (the original render date)
- **rendered_at:** 2026-10-07T12:00:00-04:00 (that date at 12:00 local: no time of day was recorded)
- **project:** greytide
- **backfill:** true (imported from an earlier soundtrack; it is never new)
- **licence:** generated locally from a text prompt, no samples or reference audio, no third-party rights claimed

## Why

I did not render this one for the station: it was made on 2026-10-07 for an earlier tabletop game soundtrack, and I have brought it in under that date, so it is not new. The ask was "creaking-wood dusk groove with a kid's whistle" (the wave phase): 81 bpm in G major. The prompt describes laid back dusk treehouse groove with creaking plank taps, rope-knot thumps and a tin-can tick as a drum kit and wind-in-leaves shaker; I have not heard it, and the numbers below were measured now, on the file as it shipped.

## Prompt

> Laid back dusk treehouse groove, creaking plank taps, rope-knot thumps and a tin-can tick as a drum kit, wind-in-leaves shaker, a kid's whistle used as an instrument, soft marimba, warm pads, fuzzy round bass, dusty drum machine, back-garden treehouse at dusk daydream, good-humoured, 81 bpm, an easy whistled tune and a wooden flute-like synth, the same groove with a little more drive and bounce, steady loopable arrangement, instrumental, no vocals, no singing, no speech, no drops, no wobble bass, no build-ups, no aggressive drums, no sub bass, light thin low end, bass in the mid range only

No lyrics recorded: instrumental.

## Request filter

run on import over the title, idea, prompt and every lyric line; the text above is as the source wrote it
would strip: Dusk In The Branches

## Rejected seeds

- 801215: not kept

## Measured now, on the shipped file (gate profile mellow: the station's default, not what this track was made against)

| gate | measured | limit | passed |
|---|---|---|---|
| tempo | 80 bpm vs asked 81 | within 4 bpm, folds 0.5 / 2 / 4:3 / 3:4 allowed | yes |
| loudness | -16.4 LUFS as shipped | -16 LUFS within 1 dB | yes |
| peak | -2.09 dBFS decoded | under -1 dBFS | yes |
| silence | longest 0.30 s under -50 dBFS | under 0.5 s | yes |
| brightness | 1.78 % of power above 6 kHz | under 2.5 % (mellow) | yes |
| boominess | 17.02 % below 60 Hz | under 12 % | **NO** |
| onset rate | 2.46 per second | 0.3 to 4.5 | yes |
| loop seam | step 0.31x, tail-head +10.1 dB | step under 4.0x, level within 5.0 dB | **NO** |

## Checks

not passed against the station's profile: boominess, loop seam. Reported, not a reason to leave it out: this track shipped before the station existed.

## Backfill

- audio: stream-copied (already 128 kbps CBR), tags stripped
- recipe: `reproducible: false`. The seed and the prompt are recorded; the planner model's audio codes were never kept, so a re-render from them may differ. `recipe_render.py` refuses it.
