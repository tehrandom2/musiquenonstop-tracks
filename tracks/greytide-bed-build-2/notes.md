# Counting Sheep Slowly (build phase)

- **slug:** greytide-bed-build-2
- **idea:** sleepy music-box and soft fuzz bass
- **mood:** the build phase
- **bpm:** 72 (asked) / 72 (measured now, folded into 70-140)
- **key:** C major (as the source recorded it)
- **seed:** 800220
- **model:** ACE-Step 1.5 (acestep-v15-turbo, LM acestep-5Hz-lm-1.7B)
- **tier:** fast   **duration:** 91.1 s as shipped
- **date:** 2026-10-06 (the original render date)
- **rendered_at:** 2026-10-06T12:00:00-04:00 (that date at 12:00 local: no time of day was recorded)
- **project:** greytide
- **backfill:** true (imported from an earlier soundtrack; it is never new)
- **licence:** generated locally from a text prompt, no samples or reference audio, no third-party rights claimed

## Why

I did not render this one for the station: it was made on 2026-10-06 for an earlier tabletop game soundtrack, and I have brought it in under that date, so it is not new. The ask was "sleepy music-box and soft fuzz bass" (the build phase): 72 bpm in C major. The prompt describes laid back sleepy lullaby groove with music-box plucks, felt-piano and soft pillow-thump kick and slow shaker and brushed drum machine; I have not heard it, and the numbers below were measured now, on the file as it shipped.

## Prompt

> Laid back sleepy lullaby groove, music-box plucks, felt-piano and soft pillow-thump kick, slow shaker and brushed drum machine, celesta used as an instrument, warm fuzzy round bass, tape hiss, duvet-warm bedroom daydream, good-humoured, 72 bpm, soft toy xylophone and a breathy flute-like synth, calm and spacious, steady loopable arrangement, instrumental, no vocals, no singing, no speech, no drops, no wobble bass, no build-ups, no aggressive drums, no sub bass, light thin low end, bass in the mid range only

No lyrics recorded: instrumental.

## Request filter

run on import over the title, idea, prompt and every lyric line; the text above is as the source wrote it
would strip: Counting Sheep Slowly

## Rejected seeds

- 801220: not kept
- 700220: superseded by the #443 render

## Measured now, on the shipped file (gate profile mellow: the station's default, not what this track was made against)

| gate | measured | limit | passed |
|---|---|---|---|
| tempo | 72 bpm vs asked 72 | within 4 bpm, folds 0.5 / 2 / 4:3 / 3:4 allowed | yes |
| loudness | -16.5 LUFS as shipped | -16 LUFS within 1 dB | yes |
| peak | -1.73 dBFS decoded | under -1 dBFS | yes |
| silence | longest 0.00 s under -50 dBFS | under 0.5 s | yes |
| brightness | 0.49 % of power above 6 kHz | under 2.5 % (mellow) | yes |
| boominess | 18.64 % below 60 Hz | under 12 % | **NO** |
| onset rate | 1.59 per second | 0.3 to 4.5 | yes |
| loop seam | step 0.34x, tail-head +0.3 dB | step under 4.0x, level within 5.0 dB | yes |

## Checks

not passed against the station's profile: boominess. Reported, not a reason to leave it out: this track shipped before the station existed.

## Backfill

- audio: stream-copied (already 128 kbps CBR), tags stripped
- recipe: `reproducible: false`. The seed and the prompt are recorded; the planner model's audio codes were never kept, so a re-render from them may differ. `recipe_render.py` refuses it.
