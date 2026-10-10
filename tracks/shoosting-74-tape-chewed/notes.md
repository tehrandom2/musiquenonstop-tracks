# Tape Chewed

- **slug:** shoosting-74-tape-chewed
- **idea:** Lo-fi gospel beat
- **bpm:** 80 (asked) / 98 (measured now, folded into 70-140)
- **key:** C major (estimated now: the source did not record one)
- **seed:** 400074
- **model:** ACE-Step 1.5 (acestep-v15-xl-sft, 50 steps, CFG 7.0, LM acestep-5Hz-lm-4B)
- **tier:** best   **duration:** 177.3 s as shipped
- **date:** 2026-10-01 (the original render date)
- **rendered_at:** 2026-10-01T12:00:00-04:00 (that date at 12:00 local: no time of day was recorded)
- **project:** shoosting
- **backfill:** true (imported from an earlier soundtrack; it is never new)
- **licence:** generated locally from a text prompt, no samples or reference audio, no third-party rights claimed

## Why

I did not render this one for the station: it was made on 2026-10-01 for an earlier arena shooter soundtrack, and I have brought it in under that date, so it is not new. The ask was "Lo-fi gospel beat": 80 bpm in C major, one of the tracks the machine chose for itself, on the best tier. The prompt describes lo-fi gospel beat; I have not heard it, and the numbers below were measured now, on the file as it shipped.

## Prompt

> Lo-fi gospel beat, a cassette of a church organ and a small choir that is being chewed by the tape machine: wow and flutter, sagging pitch, dropouts and hiss. A heavy boom-bap kick and a cracking snare pump the whole sample down with every hit. Overdriven sub bass, chopped choir stabs retriggered like a sampler, and a distorted fuzz bass line that takes over in the second half. Nostalgic, woozy, warm, slowly falling apart.

No lyrics recorded: the source kept none for this voiced track.

## Request filter

run on import over the title, idea, prompt and every lyric line; the text above is as the source wrote it
would strip: nothing

## Rejected seeds

- none recorded by the source

## Measured now, on the shipped file (gate profile mellow: the station's default, not what this track was made against)

| gate | measured | limit | passed |
|---|---|---|---|
| tempo | 98 bpm vs asked 80 | within 4 bpm, folds 0.5 / 2 / 4:3 / 3:4 allowed | **NO** |
| loudness | -16.4 LUFS as shipped | -16 LUFS within 1 dB | yes |
| peak | -2.37 dBFS decoded | under -1 dBFS | yes |
| silence | longest 4.00 s under -50 dBFS | under 0.5 s | **NO** |
| brightness | 1.82 % of power above 6 kHz | under 2.5 % (mellow) | yes |
| boominess | 2.74 % below 60 Hz | under 12 % | yes |
| onset rate | 3.50 per second | 0.3 to 4.5 | yes |
| loop seam | step 0.05x, tail-head -46.1 dB | step under 4.0x, level within 5.0 dB | **NO** |

## Checks

not passed against the station's profile: tempo, silence, loop seam. Reported, not a reason to leave it out: this track shipped before the station existed.

## Backfill

- audio: re-encoded to 128 kbps CBR from an mp3 source, tags stripped
- recipe: `reproducible: false`. The seed and the prompt are recorded; the planner model's audio codes were never kept, so a re-render from them may differ. `recipe_render.py` refuses it.
