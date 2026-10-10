# Cut to Ribbons

- **slug:** shoosting-73-cut-to-ribbons
- **idea:** Soul sample riddim
- **bpm:** 140 (asked) / 139 (measured now, folded into 70-140)
- **key:** F# major (estimated now: the source did not record one)
- **seed:** 400073
- **model:** ACE-Step 1.5 (acestep-v15-xl-sft, 50 steps, CFG 7.0, LM acestep-5Hz-lm-4B)
- **tier:** best   **duration:** 178.4 s as shipped
- **date:** 2026-10-01 (the original render date)
- **rendered_at:** 2026-10-01T12:00:00-04:00 (that date at 12:00 local: no time of day was recorded)
- **project:** shoosting
- **backfill:** true (imported from an earlier soundtrack; it is never new)
- **licence:** generated locally from a text prompt, no samples or reference audio, no third-party rights claimed

## Why

I did not render this one for the station: it was made on 2026-10-01 for an earlier arena shooter soundtrack, and I have brought it in under that date, so it is not new. The ask was "Soul sample riddim": 140 bpm in F# major, one of the tracks the machine chose for itself, on the best tier. The prompt describes soul sample riddim; I have not heard it, and the numbers below were measured now, on the file as it shipped.

## Prompt

> Soul sample riddim, a warm crackly sixties soul vocal phrase looped and pitched up, then cut to ribbons by a robotic vowel-formant wobble bass and a buzzing sawtooth lead that answer each sampled phrase. Half-time dubstep drums, dry and punchy, sparse rhythmic stutters, tight percussive gaps, growling sub bass. Each drop removes more of the sample until only a single chopped syllable is left. Tender and filthy at the same time.

No lyrics recorded: the source kept none for this voiced track.

## Request filter

run on import over the title, idea, prompt and every lyric line; the text above is as the source wrote it
would strip: nothing

## Rejected seeds

- none recorded by the source

## Measured now, on the shipped file (gate profile mellow: the station's default, not what this track was made against)

| gate | measured | limit | passed |
|---|---|---|---|
| tempo | 139 bpm vs asked 140 | within 4 bpm, folds 0.5 / 2 / 4:3 / 3:4 allowed | yes |
| loudness | -20.8 LUFS as shipped | -16 LUFS within 1 dB | **NO** |
| peak | -3.75 dBFS decoded | under -1 dBFS | yes |
| silence | longest 0.10 s under -50 dBFS | under 0.5 s | yes |
| brightness | 1.19 % of power above 6 kHz | under 2.5 % (mellow) | yes |
| boominess | 9.33 % below 60 Hz | under 12 % | yes |
| onset rate | 1.83 per second | 0.3 to 4.5 | yes |
| loop seam | step 0.98x, tail-head -41.8 dB | step under 4.0x, level within 5.0 dB | **NO** |

## Checks

not passed against the station's profile: loudness, loop seam. Reported, not a reason to leave it out: this track shipped before the station existed.

## Backfill

- audio: re-encoded to 128 kbps CBR from an mp3 source, tags stripped
- recipe: `reproducible: false`. The seed and the prompt are recorded; the planner model's audio codes were never kept, so a re-render from them may differ. `recipe_render.py` refuses it.
