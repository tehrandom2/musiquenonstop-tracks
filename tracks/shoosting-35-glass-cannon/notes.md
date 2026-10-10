# Glass Cannon

- **slug:** shoosting-35-glass-cannon
- **idea:** Melodic dubstep
- **bpm:** 140 (asked) / 138 (measured now, folded into 70-140)
- **key:** A# minor (estimated now: the source did not record one)
- **seed:** 100035
- **model:** ACE-Step 1.5 (acestep-v15-turbo, LM acestep-5Hz-lm-1.7B)
- **tier:** fast   **duration:** 178.1 s as shipped
- **date:** 2026-09-08 (the original render date)
- **rendered_at:** 2026-09-08T12:00:00-04:00 (that date at 12:00 local: no time of day was recorded)
- **project:** shoosting
- **backfill:** true (imported from an earlier soundtrack; it is never new)
- **licence:** generated locally from a text prompt, no samples or reference audio, no third-party rights claimed

## Why

I did not render this one for the station: it was made on 2026-09-08 for an earlier arena shooter soundtrack, and I have brought it in under that date, so it is not new. The ask was "Melodic dubstep": 140 bpm in A# minor. The prompt describes melodic dubstep with half-time drop every 32 bars, bright soaring synth lead over a growling sub bass and fragile crystalline plucks in the breakdown; I have not heard it, and the numbers below were measured now, on the file as it shipped.

## Prompt

> Melodic dubstep, 140 bpm, half-time drop every 32 bars, bright soaring synth lead over a growling sub bass, fragile crystalline plucks in the breakdown, punchy sidechained kick, aggressive but readable arrangement with clear build and drop sections, instrumental, no vocals

No lyrics recorded: instrumental.

## Request filter

run on import over the title, idea, prompt and every lyric line; the text above is as the source wrote it
would strip: nothing

## Rejected seeds

- none recorded by the source

## Measured now, on the shipped file (gate profile mellow: the station's default, not what this track was made against)

| gate | measured | limit | passed |
|---|---|---|---|
| tempo | 138 bpm vs asked 140 | within 4 bpm, folds 0.5 / 2 / 4:3 / 3:4 allowed | yes |
| loudness | -14.9 LUFS as shipped | -16 LUFS within 1 dB | **NO** |
| peak | -2.56 dBFS decoded | under -1 dBFS | yes |
| silence | longest 0.20 s under -50 dBFS | under 0.5 s | yes |
| brightness | 2.12 % of power above 6 kHz | under 2.5 % (mellow) | yes |
| boominess | 35.52 % below 60 Hz | under 12 % | **NO** |
| onset rate | 3.53 per second | 0.3 to 4.5 | yes |
| loop seam | step 0.99x, tail-head -41.6 dB | step under 4.0x, level within 5.0 dB | **NO** |

## Checks

not passed against the station's profile: loudness, boominess, loop seam. Reported, not a reason to leave it out: this track shipped before the station existed.

## Backfill

- audio: re-encoded to 128 kbps CBR from an mp3 source, tags stripped
- recipe: `reproducible: false`. The seed and the prompt are recorded; the planner model's audio codes were never kept, so a re-render from them may differ. `recipe_render.py` refuses it.
