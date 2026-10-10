# Last Round

- **slug:** shoosting-75-last-round
- **idea:** Three-act finale
- **bpm:** 128 (asked) / 127 (measured now, folded into 70-140)
- **key:** A# major (estimated now: the source did not record one)
- **seed:** 400075
- **model:** ACE-Step 1.5 (acestep-v15-xl-sft, 50 steps, CFG 7.0, LM acestep-5Hz-lm-4B)
- **tier:** best   **duration:** 180.0 s as shipped
- **date:** 2026-10-01 (the original render date)
- **rendered_at:** 2026-10-01T12:00:00-04:00 (that date at 12:00 local: no time of day was recorded)
- **project:** shoosting
- **backfill:** true (imported from an earlier soundtrack; it is never new)
- **licence:** generated locally from a text prompt, no samples or reference audio, no third-party rights claimed

## Why

I did not render this one for the station: it was made on 2026-10-01 for an earlier arena shooter soundtrack, and I have brought it in under that date, so it is not new. The ask was "Three-act finale": 128 bpm in A# major, one of the tracks the machine chose for itself, on the best tier. The prompt describes three-act finale; I have not heard it, and the numbers below were measured now, on the file as it shipped.

## Prompt

> Three-act finale, starting as a quiet wordless hymn for two voices over tape hiss, becoming a pounding electro track when a raw buzzing sawtooth bass and a four-on-the-floor kick crash in, and ending as a blown-out triumphant brass fanfare with chopped vocal shouts over everything. One long climb with no way back down, the distortion increasing section by section until the final chorus is clipping. Cathartic, huge, closing-credits energy.

No lyrics recorded: the source kept none for this voiced track.

## Request filter

run on import over the title, idea, prompt and every lyric line; the text above is as the source wrote it
would strip: nothing

## Rejected seeds

- none recorded by the source

## Measured now, on the shipped file (gate profile mellow: the station's default, not what this track was made against)

| gate | measured | limit | passed |
|---|---|---|---|
| tempo | 127 bpm vs asked 128 | within 4 bpm, folds 0.5 / 2 / 4:3 / 3:4 allowed | yes |
| loudness | -17.0 LUFS as shipped | -16 LUFS within 1 dB | yes |
| peak | -2.78 dBFS decoded | under -1 dBFS | yes |
| silence | longest 1.45 s under -50 dBFS | under 0.5 s | **NO** |
| brightness | 3.99 % of power above 6 kHz | under 2.5 % (mellow) | **NO** |
| boominess | 23.75 % below 60 Hz | under 12 % | **NO** |
| onset rate | 2.29 per second | 0.3 to 4.5 | yes |
| loop seam | step 0.15x, tail-head -10.9 dB | step under 4.0x, level within 5.0 dB | **NO** |

## Checks

not passed against the station's profile: silence, brightness, boominess, loop seam. Reported, not a reason to leave it out: this track shipped before the station existed.

## Backfill

- audio: re-encoded to 128 kbps CBR from an mp3 source, tags stripped
- recipe: `reproducible: false`. The seed and the prompt are recorded; the planner model's audio codes were never kept, so a re-render from them may differ. `recipe_render.py` refuses it.
