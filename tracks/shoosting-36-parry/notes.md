# Parry

- **slug:** shoosting-36-parry
- **idea:** Riddim dubstep
- **bpm:** 140 (asked) / 139 (measured now, folded into 70-140)
- **key:** F major (estimated now: the source did not record one)
- **seed:** 100036
- **model:** ACE-Step 1.5 (acestep-v15-turbo, LM acestep-5Hz-lm-1.7B)
- **tier:** fast   **duration:** 175.3 s as shipped
- **date:** 2026-09-08 (the original render date)
- **rendered_at:** 2026-09-08T12:00:00-04:00 (that date at 12:00 local: no time of day was recorded)
- **project:** shoosting
- **backfill:** true (imported from an earlier soundtrack; it is never new)
- **licence:** generated locally from a text prompt, no samples or reference audio, no third-party rights claimed

## Why

I did not render this one for the station: it was made on 2026-09-08 for an earlier arena shooter soundtrack, and I have brought it in under that date, so it is not new. The ask was "Riddim dubstep": 140 bpm in F major. The prompt describes riddim dubstep with half-time drop every 32 bars, call-and-answer wobble bass phrases and snappy snare; I have not heard it, and the numbers below were measured now, on the file as it shipped.

## Prompt

> Riddim dubstep, 140 bpm, half-time drop every 32 bars, call-and-answer wobble bass phrases, snappy snare, tight and mechanical, punchy sidechained kick, aggressive but readable arrangement with clear build and drop sections, instrumental, no vocals

No lyrics recorded: instrumental.

## Request filter

run on import over the title, idea, prompt and every lyric line; the text above is as the source wrote it
would strip: nothing

## Rejected seeds

- none recorded by the source

## Measured now, on the shipped file (gate profile mellow: the station's default, not what this track was made against)

| gate | measured | limit | passed |
|---|---|---|---|
| tempo | 139 bpm vs asked 140 | within 4 bpm, folds 0.5 / 2 / 4:3 / 3:4 allowed | yes |
| loudness | -18.1 LUFS as shipped | -16 LUFS within 1 dB | **NO** |
| peak | -3.12 dBFS decoded | under -1 dBFS | yes |
| silence | longest 3.30 s under -50 dBFS | under 0.5 s | **NO** |
| brightness | 1.62 % of power above 6 kHz | under 2.5 % (mellow) | yes |
| boominess | 68.23 % below 60 Hz | under 12 % | **NO** |
| onset rate | 3.54 per second | 0.3 to 4.5 | yes |
| loop seam | step 2.93x, tail-head -52.7 dB | step under 4.0x, level within 5.0 dB | **NO** |

## Checks

not passed against the station's profile: loudness, silence, boominess, loop seam. Reported, not a reason to leave it out: this track shipped before the station existed.

## Backfill

- audio: re-encoded to 128 kbps CBR from an mp3 source, tags stripped
- recipe: `reproducible: false`. The seed and the prompt are recorded; the planner model's audio codes were never kept, so a re-render from them may differ. `recipe_render.py` refuses it.
