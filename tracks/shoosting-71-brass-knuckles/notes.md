# Brass Knuckles

- **slug:** shoosting-71-brass-knuckles
- **idea:** Maximalist trap anthem
- **bpm:** 140 (asked) / 139 (measured now, folded into 70-140)
- **key:** G major (estimated now: the source did not record one)
- **seed:** 400071
- **model:** ACE-Step 1.5 (acestep-v15-xl-sft, 50 steps, CFG 7.0, LM acestep-5Hz-lm-4B)
- **tier:** best   **duration:** 178.2 s as shipped
- **date:** 2026-10-01 (the original render date)
- **rendered_at:** 2026-10-01T12:00:00-04:00 (that date at 12:00 local: no time of day was recorded)
- **project:** shoosting
- **backfill:** true (imported from an earlier soundtrack; it is never new)
- **licence:** generated locally from a text prompt, no samples or reference audio, no third-party rights claimed

## Why

I did not render this one for the station: it was made on 2026-10-01 for an earlier arena shooter soundtrack, and I have brought it in under that date, so it is not new. The ask was "Maximalist trap anthem": 140 bpm in G major, one of the tracks the machine chose for itself, on the best tier. The prompt describes maximalist trap anthem; I have not heard it, and the numbers below were measured now, on the file as it shipped.

## Prompt

> Maximalist trap anthem, colossal detuned synth-brass fanfares stabbing like a marching band from the future, a sped-up, pitched-high soul singer sample chopped into a looping hook, booming distorted 808 bass slides, half-time drums with rattling triplet hi-hats and a snare like a gunshot, orchestral hits and glittering arpeggios. Every element is too loud and too bright on purpose. Triumphant, ridiculous, euphoric, stadium-sized, a victory lap.

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
| loudness | -18.1 LUFS as shipped | -16 LUFS within 1 dB | **NO** |
| peak | -2.90 dBFS decoded | under -1 dBFS | yes |
| silence | longest 0.15 s under -50 dBFS | under 0.5 s | yes |
| brightness | 2.92 % of power above 6 kHz | under 2.5 % (mellow) | **NO** |
| boominess | 26.76 % below 60 Hz | under 12 % | **NO** |
| onset rate | 2.61 per second | 0.3 to 4.5 | yes |
| loop seam | step 0.06x, tail-head -32.6 dB | step under 4.0x, level within 5.0 dB | **NO** |

## Checks

not passed against the station's profile: loudness, brightness, boominess, loop seam. Reported, not a reason to leave it out: this track shipped before the station existed.

## Backfill

- audio: re-encoded to 128 kbps CBR from an mp3 source, tags stripped
- recipe: `reproducible: false`. The seed and the prompt are recorded; the planner model's audio codes were never kept, so a re-render from them may differ. `recipe_render.py` refuses it.
