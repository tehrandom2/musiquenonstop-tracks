# Cobweb Waltz (build phase)

- **slug:** greytide-attic-build-3
- **idea:** dusty music box and warbling old-tape organ
- **mood:** the build phase
- **bpm:** 80 (asked) / 79 (measured now, folded into 70-140)
- **key:** F major (as the source recorded it)
- **seed:** 701730
- **model:** ACE-Step 1.5 (acestep-v15-turbo, LM acestep-5Hz-lm-1.7B)
- **tier:** fast   **duration:** 93.2 s as shipped
- **date:** 2026-10-05 (the original render date)
- **rendered_at:** 2026-10-05T12:00:00-04:00 (that date at 12:00 local: no time of day was recorded)
- **project:** greytide
- **backfill:** true (imported from an earlier soundtrack; it is never new)
- **licence:** generated locally from a text prompt, no samples or reference audio, no third-party rights claimed

## Why

I did not render this one for the station: it was made on 2026-10-05 for an earlier tabletop game soundtrack, and I have brought it in under that date, so it is not new. The ask was "dusty music box and warbling old-tape organ" (the build phase): 80 bpm in F major. The prompt describes laid back dusty attic groove with warbling old-tape organ, slightly out-of-tune music box and harmonium; I have not heard it, and the numbers below were measured now, on the file as it shipped.

## Prompt

> Laid back dusty attic groove, warbling old-tape organ, slightly out-of-tune music box, harmonium, creaky soft drum machine, warm fuzzy bass, cobweb-soft and nostalgic, never creepy, good-humoured, 80 bpm, faded celesta and a tape-warped electric piano, calm and spacious, steady loopable arrangement, instrumental, no vocals, no singing, no speech, no drops, no wobble bass, no build-ups, no aggressive drums, no sub bass, light thin low end, bass in the mid range only

No lyrics recorded: instrumental.

## Request filter

run on import over the title, idea, prompt and every lyric line; the text above is as the source wrote it
would strip: Cobweb Waltz

## Rejected seeds

- 700730: 9.0s of near-silence

## Measured now, on the shipped file (gate profile mellow: the station's default, not what this track was made against)

| gate | measured | limit | passed |
|---|---|---|---|
| tempo | 79 bpm vs asked 80 | within 4 bpm, folds 0.5 / 2 / 4:3 / 3:4 allowed | yes |
| loudness | -16.5 LUFS as shipped | -16 LUFS within 1 dB | yes |
| peak | -2.92 dBFS decoded | under -1 dBFS | yes |
| silence | longest 0.10 s under -50 dBFS | under 0.5 s | yes |
| brightness | 0.31 % of power above 6 kHz | under 2.5 % (mellow) | yes |
| boominess | 16.74 % below 60 Hz | under 12 % | **NO** |
| onset rate | 1.97 per second | 0.3 to 4.5 | yes |
| loop seam | step 0.35x, tail-head +3.4 dB | step under 4.0x, level within 5.0 dB | yes |

## Checks

not passed against the station's profile: boominess. Reported, not a reason to leave it out: this track shipped before the station existed.

## Backfill

- audio: stream-copied (already 128 kbps CBR), tags stripped
- recipe: `reproducible: false`. The seed and the prompt are recorded; the planner model's audio codes were never kept, so a re-render from them may differ. `recipe_render.py` refuses it.
