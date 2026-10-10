# Plastic Tournament (build phase)

- **slug:** greytide-electroclash-alt-build
- **idea:** medieval-electroclash
- **mood:** the build phase
- **bpm:** 90 (asked) / 92 (measured now, folded into 70-140)
- **key:** A# minor (estimated now: the source did not record one)
- **seed:** 590007
- **model:** ACE-Step 1.5 (acestep-v15-turbo, LM acestep-5Hz-lm-1.7B)
- **tier:** fast   **duration:** 92.0 s as shipped
- **date:** 2026-10-03 (the original render date)
- **rendered_at:** 2026-10-03T12:00:00-04:00 (that date at 12:00 local: no time of day was recorded)
- **project:** greytide
- **backfill:** true (imported from an earlier soundtrack; it is never new)
- **licence:** generated locally from a text prompt, no samples or reference audio, no third-party rights claimed

## Why

I did not render this one for the station: it was made on 2026-10-03 for an earlier tabletop game soundtrack, and I have brought it in under that date, so it is not new. The ask was "medieval-electroclash" (the build phase): 90 bpm in A# minor. The prompt describes medieval electroclash with calm, cheap drum machine groove and bubbly arpeggiated synth; I have not heard it, and the numbers below were measured now, on the file as it shipped.

## Prompt

> Medieval electroclash, calm, 90 bpm, cheap drum machine groove, bubbly arpeggiated synth, shawm and lute counter-melody, quirky playful toy-soldier mood, light and loopable, instrumental, no vocals

No lyrics recorded: instrumental.

## Request filter

run on import over the title, idea, prompt and every lyric line; the text above is as the source wrote it
would strip: Plastic Tournament

## Rejected seeds

- none recorded by the source

## Measured now, on the shipped file (gate profile mellow: the station's default, not what this track was made against)

| gate | measured | limit | passed |
|---|---|---|---|
| tempo | 92 bpm vs asked 90 | within 4 bpm, folds 0.5 / 2 / 4:3 / 3:4 allowed | yes |
| loudness | -16.5 LUFS as shipped | -16 LUFS within 1 dB | yes |
| peak | -3.47 dBFS decoded | under -1 dBFS | yes |
| silence | longest 0.10 s under -50 dBFS | under 0.5 s | yes |
| brightness | 2.59 % of power above 6 kHz | under 2.5 % (mellow) | **NO** |
| boominess | 33.31 % below 60 Hz | under 12 % | **NO** |
| onset rate | 3.38 per second | 0.3 to 4.5 | yes |
| loop seam | step 0.16x, tail-head -1.1 dB | step under 4.0x, level within 5.0 dB | yes |

## Checks

not passed against the station's profile: brightness, boominess. Reported, not a reason to leave it out: this track shipped before the station existed.

## Backfill

- audio: stream-copied (already 128 kbps CBR), tags stripped
- recipe: `reproducible: false`. The seed and the prompt are recorded; the planner model's audio codes were never kept, so a re-render from them may differ. `recipe_render.py` refuses it.
