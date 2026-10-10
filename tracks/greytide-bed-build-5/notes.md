# Under The Covers Funk (build phase)

- **slug:** greytide-bed-build-5
- **idea:** sleepy music-box and soft fuzz bass
- **mood:** the build phase
- **bpm:** 76 (asked) / 76 (measured now, folded into 70-140)
- **key:** G major (as the source recorded it)
- **seed:** 801250
- **model:** ACE-Step 1.5 (acestep-v15-turbo, LM acestep-5Hz-lm-1.7B)
- **tier:** fast   **duration:** 94.8 s as shipped
- **date:** 2026-10-06 (the original render date)
- **rendered_at:** 2026-10-06T12:00:00-04:00 (that date at 12:00 local: no time of day was recorded)
- **project:** greytide
- **backfill:** true (imported from an earlier soundtrack; it is never new)
- **licence:** generated locally from a text prompt, no samples or reference audio, no third-party rights claimed

## Why

I did not render this one for the station: it was made on 2026-10-06 for an earlier tabletop game soundtrack, and I have brought it in under that date, so it is not new. The ask was "sleepy music-box and soft fuzz bass" (the build phase): 76 bpm in G major. The prompt describes laid back sleepy lullaby groove with music-box plucks, felt-piano and soft pillow-thump kick and slow shaker and brushed drum machine; I have not heard it, and the numbers below were measured now, on the file as it shipped.

## Prompt

> Laid back sleepy lullaby groove, music-box plucks, felt-piano and soft pillow-thump kick, slow shaker and brushed drum machine, celesta used as an instrument, warm fuzzy round bass, tape hiss, duvet-warm bedroom daydream, good-humoured, 76 bpm, glockenspiel and a drowsy slide guitar-like synth, calm and spacious, steady loopable arrangement, instrumental, no vocals, no singing, no speech, no drops, no wobble bass, no build-ups, no aggressive drums, no sub bass, light thin low end, bass in the mid range only

No lyrics recorded: instrumental.

## Request filter

run on import over the title, idea, prompt and every lyric line; the text above is as the source wrote it
would strip: Under The Covers Funk

## Rejected seeds

- 800250: not kept
- 700250: superseded by the #443 render

## Measured now, on the shipped file (gate profile mellow: the station's default, not what this track was made against)

| gate | measured | limit | passed |
|---|---|---|---|
| tempo | 76 bpm vs asked 76 | within 4 bpm, folds 0.5 / 2 / 4:3 / 3:4 allowed | yes |
| loudness | -16.4 LUFS as shipped | -16 LUFS within 1 dB | yes |
| peak | -1.69 dBFS decoded | under -1 dBFS | yes |
| silence | longest 0.00 s under -50 dBFS | under 0.5 s | yes |
| brightness | 1.64 % of power above 6 kHz | under 2.5 % (mellow) | yes |
| boominess | 5.42 % below 60 Hz | under 12 % | yes |
| onset rate | 1.99 per second | 0.3 to 4.5 | yes |
| loop seam | step 1.06x, tail-head -7.9 dB | step under 4.0x, level within 5.0 dB | **NO** |

## Checks

not passed against the station's profile: loop seam. Reported, not a reason to leave it out: this track shipped before the station existed.

## Backfill

- audio: stream-copied (already 128 kbps CBR), tags stripped
- recipe: `reproducible: false`. The seed and the prompt are recorded; the planner model's audio codes were never kept, so a re-render from them may differ. `recipe_render.py` refuses it.
