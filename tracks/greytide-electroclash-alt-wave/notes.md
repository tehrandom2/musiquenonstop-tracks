# Plastic Tournament (wave)

- **slug:** greytide-electroclash-alt-wave
- **idea:** medieval-electroclash
- **mood:** the wave phase
- **bpm:** 132 (asked) / 131 (measured now, folded into 70-140)
- **key:** D minor (estimated now: the source did not record one)
- **seed:** 590008
- **model:** ACE-Step 1.5 (acestep-v15-turbo, LM acestep-5Hz-lm-1.7B)
- **tier:** fast   **duration:** 91.0 s as shipped
- **date:** 2026-10-03 (the original render date)
- **rendered_at:** 2026-10-03T12:00:00-04:00 (that date at 12:00 local: no time of day was recorded)
- **project:** greytide
- **backfill:** true (imported from an earlier soundtrack; it is never new)
- **licence:** generated locally from a text prompt, no samples or reference audio, no third-party rights claimed

## Why

I did not render this one for the station: it was made on 2026-10-03 for an earlier tabletop game soundtrack, and I have brought it in under that date, so it is not new. The ask was "medieval-electroclash" (the wave phase): 132 bpm in D minor. The prompt describes medieval electroclash with relentless pounding drum machine, buzzing acid synth line and trumpet fanfare samples; I have not heard it, and the numbers below were measured now, on the file as it shipped.

## Prompt

> Medieval electroclash, 132 bpm, relentless pounding drum machine, buzzing acid synth line, trumpet fanfare samples, snare rolls like a marching band, distorted lute chords, urgent playful chaos, loopable, instrumental, no vocals

No lyrics recorded: instrumental.

## Request filter

run on import over the title, idea, prompt and every lyric line; the text above is as the source wrote it
would strip: Plastic Tournament

## Rejected seeds

- none recorded by the source

## Measured now, on the shipped file (gate profile mellow: the station's default, not what this track was made against)

| gate | measured | limit | passed |
|---|---|---|---|
| tempo | 131 bpm vs asked 132 | within 4 bpm, folds 0.5 / 2 / 4:3 / 3:4 allowed | yes |
| loudness | -17.2 LUFS as shipped | -16 LUFS within 1 dB | **NO** |
| peak | -2.40 dBFS decoded | under -1 dBFS | yes |
| silence | longest 0.05 s under -50 dBFS | under 0.5 s | yes |
| brightness | 4.29 % of power above 6 kHz | under 2.5 % (mellow) | **NO** |
| boominess | 16.45 % below 60 Hz | under 12 % | **NO** |
| onset rate | 2.94 per second | 0.3 to 4.5 | yes |
| loop seam | step 0.22x, tail-head -0.2 dB | step under 4.0x, level within 5.0 dB | yes |

## Checks

not passed against the station's profile: loudness, brightness, boominess. Reported, not a reason to leave it out: this track shipped before the station existed.

## Backfill

- audio: stream-copied (already 128 kbps CBR), tags stripped
- recipe: `reproducible: false`. The seed and the prompt are recorded; the planner model's audio codes were never kept, so a re-render from them may differ. `recipe_render.py` refuses it.
