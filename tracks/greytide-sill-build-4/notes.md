# Net Curtain Breeze (build phase)

- **slug:** greytide-sill-build-4
- **idea:** wind-chime and rain-stick drift with a wandering slide whistle
- **mood:** the build phase
- **bpm:** 76 (asked) / 76 (measured now, folded into 70-140)
- **key:** C major (as the source recorded it)
- **seed:** 801640
- **model:** ACE-Step 1.5 (acestep-v15-turbo, LM acestep-5Hz-lm-1.7B)
- **tier:** fast   **duration:** 87.0 s as shipped
- **date:** 2026-10-06 (the original render date)
- **rendered_at:** 2026-10-06T12:00:00-04:00 (that date at 12:00 local: no time of day was recorded)
- **project:** greytide
- **backfill:** true (imported from an earlier soundtrack; it is never new)
- **licence:** generated locally from a text prompt, no samples or reference audio, no third-party rights claimed

## Why

I did not render this one for the station: it was made on 2026-10-06 for an earlier tabletop game soundtrack, and I have brought it in under that date, so it is not new. The ask was "wind-chime and rain-stick drift with a wandering slide whistle" (the build phase): 76 bpm in C major. The prompt describes laid back airy drifting groove with wind chimes, rain-stick shakes and soft woodblock taps as a drum kit and wandering slide whistle used as an instrument; I have not heard it, and the numbers below were measured now, on the file as it shipped.

## Prompt

> Laid back airy drifting groove, wind chimes, rain-stick shakes and soft woodblock taps as a drum kit, wandering slide whistle used as an instrument, soft marimba, warm pads, fuzzy round bass, dusty shaker drum machine, sunny window-sill daydream, good-humoured, 76 bpm, ocarina-like lead and soft woodblocks, calm and spacious, steady loopable arrangement, instrumental, no vocals, no singing, no speech, no drops, no wobble bass, no build-ups, no aggressive drums, no sub bass, light thin low end, bass in the mid range only

No lyrics recorded: instrumental.

## Request filter

run on import over the title, idea, prompt and every lyric line; the text above is as the source wrote it
would strip: Net Curtain Breeze

## Rejected seeds

- 800640: harsh: 2.6% above 6 kHz
- 700640: harsh: 2.7% above 6 kHz; superseded by the #443 render
- 701640: crest 18.3 dB, too peaky to match the loudness; superseded by the #443 render
- 702640: 2.1s of near-silence; superseded by the #443 render

## Measured now, on the shipped file (gate profile mellow: the station's default, not what this track was made against)

| gate | measured | limit | passed |
|---|---|---|---|
| tempo | 76 bpm vs asked 76 | within 4 bpm, folds 0.5 / 2 / 4:3 / 3:4 allowed | yes |
| loudness | -17.5 LUFS as shipped | -16 LUFS within 1 dB | **NO** |
| peak | -2.18 dBFS decoded | under -1 dBFS | yes |
| silence | longest 0.15 s under -50 dBFS | under 0.5 s | yes |
| brightness | 0.82 % of power above 6 kHz | under 2.5 % (mellow) | yes |
| boominess | 6.89 % below 60 Hz | under 12 % | yes |
| onset rate | 2.58 per second | 0.3 to 4.5 | yes |
| loop seam | step 0.03x, tail-head -1.2 dB | step under 4.0x, level within 5.0 dB | yes |

## Checks

not passed against the station's profile: loudness. Reported, not a reason to leave it out: this track shipped before the station existed.

## Backfill

- audio: stream-copied (already 128 kbps CBR), tags stripped
- recipe: `reproducible: false`. The seed and the prompt are recorded; the planner model's audio codes were never kept, so a re-render from them may differ. `recipe_render.py` refuses it.
