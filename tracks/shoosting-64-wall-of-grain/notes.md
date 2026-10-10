# Wall of Grain

- **slug:** shoosting-64-wall-of-grain
- **idea:** Melancholic dark synth electro
- **bpm:** 105 (asked) / 139 (measured now, folded into 70-140)
- **key:** A major (estimated now: the source did not record one)
- **seed:** 100064
- **model:** ACE-Step 1.5 (acestep-v15-turbo, LM acestep-5Hz-lm-1.7B)
- **tier:** fast   **duration:** 174.3 s as shipped
- **date:** 2026-09-30 (the original render date)
- **rendered_at:** 2026-09-30T12:00:00-04:00 (that date at 12:00 local: no time of day was recorded)
- **project:** shoosting
- **backfill:** true (imported from an earlier soundtrack; it is never new)
- **licence:** generated locally from a text prompt, no samples or reference audio, no third-party rights claimed

## Why

I did not render this one for the station: it was made on 2026-09-30 for an earlier arena shooter soundtrack, and I have brought it in under that date, so it is not new. The ask was "Melancholic dark synth electro": 105 bpm in A major. The prompt describes melancholic dark synth electro with soft muted kick, slow repeating minor-key analog arpeggio and cold wide pads; I have not heard it, and the numbers below were measured now, on the file as it shipped.

## Prompt

> Melancholic dark synth electro, 105 bpm, soft muted kick, slow repeating minor-key analog arpeggio, cold wide pads, distant distorted bass swell, restrained and mournful, steady looping groove with no drop, late-night empty city atmosphere, instrumental, no vocals

No lyrics recorded: instrumental.

## Request filter

run on import over the title, idea, prompt and every lyric line; the text above is as the source wrote it
would strip: nothing

## Rejected seeds

- none recorded by the source

## Measured now, on the shipped file (gate profile mellow: the station's default, not what this track was made against)

| gate | measured | limit | passed |
|---|---|---|---|
| tempo | 139 bpm vs asked 105 | within 4 bpm, folds 0.5 / 2 / 4:3 / 3:4 allowed | yes |
| loudness | -16.9 LUFS as shipped | -16 LUFS within 1 dB | yes |
| peak | -2.63 dBFS decoded | under -1 dBFS | yes |
| silence | longest 0.15 s under -50 dBFS | under 0.5 s | yes |
| brightness | 2.72 % of power above 6 kHz | under 2.5 % (mellow) | **NO** |
| boominess | 33.82 % below 60 Hz | under 12 % | **NO** |
| onset rate | 4.76 per second | 0.3 to 4.5 | **NO** |
| loop seam | step 1.55x, tail-head -52.8 dB | step under 4.0x, level within 5.0 dB | **NO** |

## Checks

not passed against the station's profile: brightness, boominess, onset rate, loop seam. Reported, not a reason to leave it out: this track shipped before the station existed.

## Backfill

- audio: re-encoded to 128 kbps CBR from an mp3 source, tags stripped
- recipe: `reproducible: false`. The seed and the prompt are recorded; the planner model's audio codes were never kept, so a re-render from them may differ. `recipe_render.py` refuses it.
