# Streetlights Passing (build phase)

- **slug:** greytide-carseat-build-3
- **idea:** night-drive groove with indicator ticks and a radio between stations
- **mood:** the build phase
- **bpm:** 84 (asked) / 83 (measured now, folded into 70-140)
- **key:** E minor (as the source recorded it)
- **seed:** 801430
- **model:** ACE-Step 1.5 (acestep-v15-turbo, LM acestep-5Hz-lm-1.7B)
- **tier:** fast   **duration:** 89.1 s as shipped
- **date:** 2026-10-07 (the original render date)
- **rendered_at:** 2026-10-07T12:00:00-04:00 (that date at 12:00 local: no time of day was recorded)
- **project:** greytide
- **backfill:** true (imported from an earlier soundtrack; it is never new)
- **licence:** generated locally from a text prompt, no samples or reference audio, no third-party rights claimed

## Why

I did not render this one for the station: it was made on 2026-10-07 for an earlier tabletop game soundtrack, and I have brought it in under that date, so it is not new. The ask was "night-drive groove with indicator ticks and a radio between stations" (the build phase): 84 bpm in E minor. The prompt describes laid back night-drive groove with indicator ticks, windscreen-wiper swishes and seat-belt clicks as a drum kit and a radio drifting between stations; I have not heard it, and the numbers below were measured now, on the file as it shipped.

## Prompt

> Laid back night-drive groove, indicator ticks, windscreen-wiper swishes and seat-belt clicks as a drum kit, a radio drifting between stations, engine hum under warm pads, tape-warped electric piano used as an instrument, fuzzy round bass, dusty drum machine, back-seat streetlight daydream, good-humoured, 84 bpm, a vibraphone-like pluck and a drowsy organ, calm and spacious, steady loopable arrangement, instrumental, no vocals, no singing, no speech, no drops, no wobble bass, no build-ups, no aggressive drums, no sub bass, light thin low end, bass in the mid range only

No lyrics recorded: instrumental.

## Request filter

run on import over the title, idea, prompt and every lyric line; the text above is as the source wrote it
would strip: Streetlights Passing

## Rejected seeds

- 802430: not kept

## Measured now, on the shipped file (gate profile mellow: the station's default, not what this track was made against)

| gate | measured | limit | passed |
|---|---|---|---|
| tempo | 83 bpm vs asked 84 | within 4 bpm, folds 0.5 / 2 / 4:3 / 3:4 allowed | yes |
| loudness | -16.4 LUFS as shipped | -16 LUFS within 1 dB | yes |
| peak | -2.08 dBFS decoded | under -1 dBFS | yes |
| silence | longest 0.00 s under -50 dBFS | under 0.5 s | yes |
| brightness | 0.58 % of power above 6 kHz | under 2.5 % (mellow) | yes |
| boominess | 15.72 % below 60 Hz | under 12 % | **NO** |
| onset rate | 2.88 per second | 0.3 to 4.5 | yes |
| loop seam | step 0.37x, tail-head +3.8 dB | step under 4.0x, level within 5.0 dB | yes |

## Checks

not passed against the station's profile: boominess. Reported, not a reason to leave it out: this track shipped before the station existed.

## Backfill

- audio: stream-copied (already 128 kbps CBR), tags stripped
- recipe: `reproducible: false`. The seed and the prompt are recorded; the planner model's audio codes were never kept, so a re-render from them may differ. `recipe_render.py` refuses it.
