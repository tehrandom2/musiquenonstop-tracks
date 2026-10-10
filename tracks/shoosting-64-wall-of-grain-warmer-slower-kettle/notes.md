# Wall of Grain, Warmer Slower Kettle

- **slug:** shoosting-64-wall-of-grain-warmer-slower-kettle
- **idea:** Melancholic dark synth electro
- **mood:** 
- **bpm:** 105 (asked) / 104 (measured, folded into 70-140)
- **key:** A major (asked) / A minor (estimated)
- **seed:** 100064
- **model:** ACE-Step 1.5, acestep-v15-turbo, 8 steps, guidance 7.0, shift 3.0, LM acestep-5Hz-lm-1.7B
- **tier:** fast   **gate profile:** jungle   **duration:** 180 s rendered, 171.3 s installed (loop seam baked)
- **date:** 2026-10-10
- **render time:** 106.4 s per seed, model load 57.0 s
- **licence:** generated locally from a text prompt, no samples or reference audio, no third-party rights claimed
- project: station
- **loop:** yes, the last 3 s are crossfaded onto the first 3 s and removed
- **length:** 7556079 samples at 44.1 kHz (171.34 s), about 75.0 bars of 4/4 at 105 bpm (the MP3 adds encoder padding; the length is of the PCM)
- **parent:** shoosting-64-wall-of-grain (seed 100064 kept)
- **change:** `caption, new clause`: '' -> 'warmer, slower, a kettle in the room'
- **parent was an import:** shoosting-64-wall-of-grain was not rendered by this pipeline; its seed, tempo, key, length, tier and prompt were taken from its entry. Its planner's audio codes were never kept, so the seed reproduces the parent's codes only if the model and settings match; this variation is a new render either way, and its recipe is this render's own (`reproducible: true`).
- **inserted:** `warmer, slower, a kettle in the room` as a new clause, before `instrumental`

## Why

This is a variation of shoosting-64-wall-of-grain, a track I imported rather than rendered. From it I took the seed (100064), the tempo (105 bpm), the key (A major), its length (a 180 s render), the fast tier and its prompt, word for word. You asked for "warmer, slower, a kettle in the room" and none of its words named a clause of the prompt, so I added them as a new clause of their own, before the ending. I do not have the planner codes the original was made from, so the seed brings back the same starting point only if the model and its settings match: this is a new render either way, and nobody has heard how close it is. So I wrote it at 105 bpm in A major, 180 seconds, with no voice, under the jungle gates. It is meant to loop: the last 3 seconds are crossfaded onto the first 3 and removed. I rendered 1 seed and kept it. Seed 100064 is the take, but it did not clear every gate: 0.7s of near-silence; boomy: 19.8% below 60 Hz (ceiling 8).

## Prompt

> Melancholic dark synth electro, 105 bpm, soft muted kick, slow repeating minor-key analog arpeggio, cold wide pads, distant distorted bass swell, restrained and mournful, steady looping groove with no drop, late-night empty city atmosphere, warmer, slower, a kettle in the room, instrumental, no vocals

No lyrics: instrumental.

## Request filter

stripped: nothing

## Rejected seeds

- none

## Measured (the kept take, after the 60 Hz high-pass, before the loudness gain unless noted)

| gate | measured | limit | passed |
|---|---|---|---|
| tempo | 104 bpm vs asked 105 | within 4 bpm, folds 0.5 / 2 / 4:3 / 3:4 allowed | yes |
| loudness | -16.0 LUFS installed (decoded MP3 -16.4); candidate was -17.3, gain +1.3 dB | -16 LUFS within 1 dB | yes |
| peak after encode | -1.51 dBFS decoded (pre-encode -3.06) | under -1 dBFS | yes |
| silence | longest 0.70 s under -50 dBFS | under 0.5 s | **NO** |
| brightness | 1.66 % of power above 6 kHz | under 3.5 % (jungle) | yes |
| boominess | 19.77 % below 60 Hz (raw render 45.5 %) | under 8 % | **NO** |
| onset rate | 2.14 per second | 1.5 to 6.5 | yes |
| loop seam | step 0.15x, tail-head +1.1 dB | step under 4.0x, level within 5.0 dB | yes |

## Checks

kept despite failing: 0.7s of near-silence; boomy: 19.8% below 60 Hz (ceiling 8)
