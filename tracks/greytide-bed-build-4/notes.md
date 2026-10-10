# Nightlight Waltz (build phase)

- **slug:** greytide-bed-build-4
- **idea:** sleepy music-box and soft fuzz bass
- **mood:** the build phase
- **bpm:** 70 (asked) / 139 (measured now, folded into 70-140)
- **key:** D major (as the source recorded it)
- **seed:** 800240
- **model:** ACE-Step 1.5 (acestep-v15-turbo, LM acestep-5Hz-lm-1.7B)
- **tier:** fast   **duration:** 93.1 s as shipped
- **date:** 2026-10-06 (the original render date)
- **rendered_at:** 2026-10-06T12:00:00-04:00 (that date at 12:00 local: no time of day was recorded)
- **project:** greytide
- **backfill:** true (imported from an earlier soundtrack; it is never new)
- **licence:** generated locally from a text prompt, no samples or reference audio, no third-party rights claimed

## Why

I did not render this one for the station: it was made on 2026-10-06 for an earlier tabletop game soundtrack, and I have brought it in under that date, so it is not new. The ask was "sleepy music-box and soft fuzz bass" (the build phase): 70 bpm in D major. The prompt describes laid back sleepy lullaby groove with music-box plucks, felt-piano and soft pillow-thump kick and slow shaker and brushed drum machine; I have not heard it, and the numbers below were measured now, on the file as it shipped.

## Prompt

> Laid back sleepy lullaby groove, music-box plucks, felt-piano and soft pillow-thump kick, slow shaker and brushed drum machine, celesta used as an instrument, warm fuzzy round bass, tape hiss, duvet-warm bedroom daydream, good-humoured, 70 bpm, music-box melody over a humming bass, calm and spacious, steady loopable arrangement, instrumental, no vocals, no singing, no speech, no drops, no wobble bass, no build-ups, no aggressive drums, no sub bass, light thin low end, bass in the mid range only

No lyrics recorded: instrumental.

## Request filter

run on import over the title, idea, prompt and every lyric line; the text above is as the source wrote it
would strip: Nightlight Waltz

## Rejected seeds

- 801240: crest 18.6 dB, too peaky to match the loudness
- 700240: superseded by the #443 render

## Measured now, on the shipped file (gate profile mellow: the station's default, not what this track was made against)

| gate | measured | limit | passed |
|---|---|---|---|
| tempo | 139 bpm vs asked 70 | within 4 bpm, folds 0.5 / 2 / 4:3 / 3:4 allowed | yes |
| loudness | -16.4 LUFS as shipped | -16 LUFS within 1 dB | yes |
| peak | -2.50 dBFS decoded | under -1 dBFS | yes |
| silence | longest 0.05 s under -50 dBFS | under 0.5 s | yes |
| brightness | 0.89 % of power above 6 kHz | under 2.5 % (mellow) | yes |
| boominess | 10.59 % below 60 Hz | under 12 % | yes |
| onset rate | 1.93 per second | 0.3 to 4.5 | yes |
| loop seam | step 0.86x, tail-head +2.3 dB | step under 4.0x, level within 5.0 dB | yes |

## Checks

all automatic checks passed. These are numbers, not hearing: nobody on the machine can hear, the owner listens.

## Backfill

- audio: stream-copied (already 128 kbps CBR), tags stripped
- recipe: `reproducible: false`. The seed and the prompt are recorded; the planner model's audio codes were never kept, so a re-render from them may differ. `recipe_render.py` refuses it.
