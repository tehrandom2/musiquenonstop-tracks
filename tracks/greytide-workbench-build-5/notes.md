# Hot Glue Boogie (build phase)

- **slug:** greytide-workbench-build-5
- **idea:** clanky found-percussion groove with a talk-box lead
- **mood:** the build phase
- **bpm:** 92 (asked) / 92 (measured now, folded into 70-140)
- **key:** C minor (as the source recorded it)
- **seed:** 700850
- **model:** ACE-Step 1.5 (acestep-v15-turbo, LM acestep-5Hz-lm-1.7B)
- **tier:** fast   **duration:** 91.1 s as shipped
- **date:** 2026-10-05 (the original render date)
- **rendered_at:** 2026-10-05T12:00:00-04:00 (that date at 12:00 local: no time of day was recorded)
- **project:** greytide
- **backfill:** true (imported from an earlier soundtrack; it is never new)
- **licence:** generated locally from a text prompt, no samples or reference audio, no third-party rights claimed

## Why

I did not render this one for the station: it was made on 2026-10-05 for an earlier tabletop game soundtrack, and I have brought it in under that date, so it is not new. The ask was "clanky found-percussion groove with a talk-box lead" (the build phase): 92 bpm in C minor. The prompt describes laid back clanky found-percussion groove with tin cans, wrench and pipe taps and metal tool clinks as a drum kit; I have not heard it, and the numbers below were measured now, on the file as it shipped.

## Prompt

> Laid back clanky found-percussion groove, tin cans, wrench and pipe taps, metal tool clinks as a drum kit, talk-box lead used as an instrument, fuzzy round bass, dusty drum machine, workshop daydream, good-humoured, 92 bpm, drill-like synth buzz and rimshots, calm and spacious, steady loopable arrangement, instrumental, no vocals, no singing, no speech, no drops, no wobble bass, no build-ups, no aggressive drums, no sub bass, light thin low end, bass in the mid range only

No lyrics recorded: instrumental.

## Request filter

run on import over the title, idea, prompt and every lyric line; the text above is as the source wrote it
would strip: Hot Glue Boogie

## Rejected seeds

- none recorded by the source

## Measured now, on the shipped file (gate profile mellow: the station's default, not what this track was made against)

| gate | measured | limit | passed |
|---|---|---|---|
| tempo | 92 bpm vs asked 92 | within 4 bpm, folds 0.5 / 2 / 4:3 / 3:4 allowed | yes |
| loudness | -17.2 LUFS as shipped | -16 LUFS within 1 dB | **NO** |
| peak | -2.55 dBFS decoded | under -1 dBFS | yes |
| silence | longest 0.20 s under -50 dBFS | under 0.5 s | yes |
| brightness | 2.18 % of power above 6 kHz | under 2.5 % (mellow) | yes |
| boominess | 5.63 % below 60 Hz | under 12 % | yes |
| onset rate | 4.38 per second | 0.3 to 4.5 | yes |
| loop seam | step 0.25x, tail-head -0.2 dB | step under 4.0x, level within 5.0 dB | yes |

## Checks

not passed against the station's profile: loudness. Reported, not a reason to leave it out: this track shipped before the station existed.

## Backfill

- audio: stream-copied (already 128 kbps CBR), tags stripped
- recipe: `reproducible: false`. The seed and the prompt are recorded; the planner model's audio codes were never kept, so a re-render from them may differ. `recipe_render.py` refuses it.
