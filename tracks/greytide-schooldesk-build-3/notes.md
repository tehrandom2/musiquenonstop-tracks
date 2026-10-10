# Doodle In The Margin (build phase)

- **slug:** greytide-schooldesk-build-3
- **idea:** bored-lesson groove with clock ticks, pencil taps and a hummed tune
- **mood:** the build phase
- **bpm:** 88 (asked) / 87 (measured now, folded into 70-140)
- **key:** G major (as the source recorded it)
- **seed:** 802330
- **model:** ACE-Step 1.5 (acestep-v15-turbo, LM acestep-5Hz-lm-1.7B)
- **tier:** fast   **duration:** 94.4 s as shipped
- **date:** 2026-10-07 (the original render date)
- **rendered_at:** 2026-10-07T12:00:00-04:00 (that date at 12:00 local: no time of day was recorded)
- **project:** greytide
- **backfill:** true (imported from an earlier soundtrack; it is never new)
- **licence:** generated locally from a text prompt, no samples or reference audio, no third-party rights claimed

## Why

I did not render this one for the station: it was made on 2026-10-07 for an earlier tabletop game soundtrack, and I have brought it in under that date, so it is not new. The ask was "bored-lesson groove with clock ticks, pencil taps and a hummed tune" (the build phase): 88 bpm in G major. The prompt describes laid back bored-lesson groove with clock ticks, pencil taps and ruler twangs as a drum kit and a tune hummed under the breath used as an instrument; I have not heard it, and the numbers below were measured now, on the file as it shipped.

## Prompt

> Laid back bored-lesson groove, clock ticks, pencil taps and ruler twangs as a drum kit, a tune hummed under the breath used as an instrument, plinky toy keyboard, fuzzy round bass, dusty drum machine, last-lesson-of-the-day daydream, good-humoured, 88 bpm, a wandering melodica and soft finger taps, calm and spacious, steady loopable arrangement, instrumental, no vocals, no singing, no speech, no drops, no wobble bass, no build-ups, no aggressive drums, no sub bass, light thin low end, bass in the mid range only

No lyrics recorded: instrumental.

## Request filter

run on import over the title, idea, prompt and every lyric line; the text above is as the source wrote it
would strip: Doodle In The Margin

## Rejected seeds

- 801330: harsh: 3.4% above 6 kHz

## Measured now, on the shipped file (gate profile mellow: the station's default, not what this track was made against)

| gate | measured | limit | passed |
|---|---|---|---|
| tempo | 87 bpm vs asked 88 | within 4 bpm, folds 0.5 / 2 / 4:3 / 3:4 allowed | yes |
| loudness | -16.4 LUFS as shipped | -16 LUFS within 1 dB | yes |
| peak | -3.04 dBFS decoded | under -1 dBFS | yes |
| silence | longest 0.10 s under -50 dBFS | under 0.5 s | yes |
| brightness | 0.63 % of power above 6 kHz | under 2.5 % (mellow) | yes |
| boominess | 15.34 % below 60 Hz | under 12 % | **NO** |
| onset rate | 3.25 per second | 0.3 to 4.5 | yes |
| loop seam | step 0.02x, tail-head +16.1 dB | step under 4.0x, level within 5.0 dB | **NO** |

## Checks

not passed against the station's profile: boominess, loop seam. Reported, not a reason to leave it out: this track shipped before the station existed.

## Backfill

- audio: stream-copied (already 128 kbps CBR), tags stripped
- recipe: `reproducible: false`. The seed and the prompt are recorded; the planner model's audio codes were never kept, so a re-render from them may differ. `recipe_render.py` refuses it.
