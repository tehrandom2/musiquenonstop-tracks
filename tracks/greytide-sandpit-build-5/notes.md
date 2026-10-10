# Sandcastle Slow Jam (build phase)

- **slug:** greytide-sandpit-build-5
- **idea:** hot lazy afternoon groove with bees, a hose and a far-off ice-cream van
- **mood:** the build phase
- **bpm:** 76 (asked) / 76 (measured now, folded into 70-140)
- **key:** A major (as the source recorded it)
- **seed:** 802550
- **model:** ACE-Step 1.5 (acestep-v15-turbo, LM acestep-5Hz-lm-1.7B)
- **tier:** fast   **duration:** 91.2 s as shipped
- **date:** 2026-10-07 (the original render date)
- **rendered_at:** 2026-10-07T12:00:00-04:00 (that date at 12:00 local: no time of day was recorded)
- **project:** greytide
- **backfill:** true (imported from an earlier soundtrack; it is never new)
- **licence:** generated locally from a text prompt, no samples or reference audio, no third-party rights claimed

## Why

I did not render this one for the station: it was made on 2026-10-07 for an earlier tabletop game soundtrack, and I have brought it in under that date, so it is not new. The ask was "hot lazy afternoon groove with bees, a hose and a far-off ice-cream van" (the build phase): 76 bpm in A major. The prompt describes laid back hot lazy afternoon groove with bucket taps, spade scrapes and a dripping hose as a drum kit and buzzing bee-like synth; I have not heard it, and the numbers below were measured now, on the file as it shipped.

## Prompt

> Laid back hot lazy afternoon groove, bucket taps, spade scrapes and a dripping hose as a drum kit, buzzing bee-like synth, a far-off ice-cream-van chime used as an instrument, soft steel-drum-like plucks, fuzzy round bass, dusty shaker drum machine, sunny sandpit daydream, good-humoured, 76 bpm, a ukulele-like pluck and a buzzing synth, calm and spacious, steady loopable arrangement, instrumental, no vocals, no singing, no speech, no drops, no wobble bass, no build-ups, no aggressive drums, no sub bass, light thin low end, bass in the mid range only

No lyrics recorded: instrumental.

## Request filter

run on import over the title, idea, prompt and every lyric line; the text above is as the source wrote it
would strip: Sandcastle Slow Jam

## Rejected seeds

- 801550: crest 18.9 dB, too peaky to match the loudness

## Measured now, on the shipped file (gate profile mellow: the station's default, not what this track was made against)

| gate | measured | limit | passed |
|---|---|---|---|
| tempo | 76 bpm vs asked 76 | within 4 bpm, folds 0.5 / 2 / 4:3 / 3:4 allowed | yes |
| loudness | -16.4 LUFS as shipped | -16 LUFS within 1 dB | yes |
| peak | -2.10 dBFS decoded | under -1 dBFS | yes |
| silence | longest 0.30 s under -50 dBFS | under 0.5 s | yes |
| brightness | 1.74 % of power above 6 kHz | under 2.5 % (mellow) | yes |
| boominess | 11.73 % below 60 Hz | under 12 % | yes |
| onset rate | 4.35 per second | 0.3 to 4.5 | yes |
| loop seam | step 0.23x, tail-head -5.1 dB | step under 4.0x, level within 5.0 dB | **NO** |

## Checks

not passed against the station's profile: loop seam. Reported, not a reason to leave it out: this track shipped before the station existed.

## Backfill

- audio: stream-copied (already 128 kbps CBR), tags stripped
- recipe: `reproducible: false`. The seed and the prompt are recorded; the planner model's audio codes were never kept, so a re-render from them may differ. `recipe_render.py` refuses it.
