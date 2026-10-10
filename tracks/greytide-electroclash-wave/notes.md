# Court Jester Electroclash (wave)

- **slug:** greytide-electroclash-wave
- **idea:** medieval-electroclash
- **mood:** the wave phase
- **bpm:** 128 (asked) / 127 (measured now, folded into 70-140)
- **key:** C major (estimated now: the source did not record one)
- **seed:** 590006
- **model:** ACE-Step 1.5 (acestep-v15-turbo, LM acestep-5Hz-lm-1.7B)
- **tier:** fast   **duration:** 94.7 s as shipped
- **date:** 2026-10-03 (the original render date)
- **rendered_at:** 2026-10-03T12:00:00-04:00 (that date at 12:00 local: no time of day was recorded)
- **project:** greytide
- **backfill:** true (imported from an earlier soundtrack; it is never new)
- **licence:** generated locally from a text prompt, no samples or reference audio, no third-party rights claimed

## Why

I did not render this one for the station: it was made on 2026-10-03 for an earlier tabletop game soundtrack, and I have brought it in under that date, so it is not new. The ask was "medieval-electroclash" (the wave phase): 128 bpm in C major. The prompt describes medieval electroclash with driving four-on-the-floor kick, gritty distorted sawtooth synth bass and harpsichord stabs; I have not heard it, and the numbers below were measured now, on the file as it shipped.

## Prompt

> Medieval electroclash, 128 bpm, driving four-on-the-floor kick, gritty distorted sawtooth synth bass, harpsichord stabs, aggressive fuzzy lute riffs, handclaps, cowbell, snarling retro synth lead like a battle march, loopable, instrumental, no vocals

No lyrics recorded: instrumental.

## Request filter

run on import over the title, idea, prompt and every lyric line; the text above is as the source wrote it
would strip: Court Jester Electroclash

## Rejected seeds

- none recorded by the source

## Measured now, on the shipped file (gate profile mellow: the station's default, not what this track was made against)

| gate | measured | limit | passed |
|---|---|---|---|
| tempo | 127 bpm vs asked 128 | within 4 bpm, folds 0.5 / 2 / 4:3 / 3:4 allowed | yes |
| loudness | -17.1 LUFS as shipped | -16 LUFS within 1 dB | **NO** |
| peak | -3.34 dBFS decoded | under -1 dBFS | yes |
| silence | longest 0.05 s under -50 dBFS | under 0.5 s | yes |
| brightness | 5.43 % of power above 6 kHz | under 2.5 % (mellow) | **NO** |
| boominess | 17.88 % below 60 Hz | under 12 % | **NO** |
| onset rate | 4.00 per second | 0.3 to 4.5 | yes |
| loop seam | step 0.00x, tail-head -8.4 dB | step under 4.0x, level within 5.0 dB | **NO** |

## Checks

not passed against the station's profile: loudness, brightness, boominess, loop seam. Reported, not a reason to leave it out: this track shipped before the station existed.

## Backfill

- audio: stream-copied (already 128 kbps CBR), tags stripped
- recipe: `reproducible: false`. The seed and the prompt are recorded; the planner model's audio codes were never kept, so a re-render from them may differ. `recipe_render.py` refuses it.
