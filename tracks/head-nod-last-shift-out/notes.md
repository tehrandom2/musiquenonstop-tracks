# Last Shift Out

- **slug:** head-nod-last-shift-out
- **idea:** slow head-nod boom bap after dark
- **mood:** laid back, dark and warm
- **bpm:** 72 (asked) / 72 (measured, folded into 70-140)
- **key:** D minor (asked) / A major (estimated)
- **seed:** 4410401
- **model:** ACE-Step 1.5, acestep-v15-xl-sft, 50 steps, guidance 7.0, shift 1.0, LM None
- **tier:** best   **gate profile:** mellow   **duration:** 150 s rendered, 146.2 s installed (one-shot, nothing baked)
- **date:** 2026-11-01
- **render time:** None s per seed, model load None s
- **licence:** generated locally from a text prompt, no samples or reference audio, no third-party rights claimed
- project: head-nod-preview
- **album:** Last Rites, track 10
- **submitter:** the owner
- **tags:** boom bap, instrumental, preview, prompt D
- **loop:** no, a one-shot
- **length:** 6446695 samples at 44.1 kHz (146.18 s), about 43.9 bars of 4/4 at 72 bpm (the MP3 adds encoder padding; the length is of the PCM)

## Why

You asked for "the owner's preview: forty slow boom bap instrumentals for the owner and a friend". The style was written by the station's writers from the owner's ask, in sound words only. So I wrote it at 72 bpm in D minor, 150 seconds, with no voice, under the mellow gates. It is a one-shot: nothing is baked and the ending is the model's own. I rendered 3 seeds and threw away 2: 4410403 (1.2s of near-silence (limit 0.5) and others); 4410402 (1.0s of near-silence (limit 0.5) and others). Seed 4410401 is the take, but it did not clear every gate: 1.1s of near-silence (limit 0.5).

## Prompt

> Slow heavy industrial boom bap instrumental, head-nod groove, crushed distorted swung drums with a pounding mechanical kick and a cracking metallic snare, warbly detuned analog synths drifting out of tune, a slow distorted guitar riff, an overdriven piano loop, saturated fuzz bass, clanging machine percussion, bitcrushed noise textures, dark muffled top end, distorted grit in the mids, menacing, hypnotic and dusty, no vocals, no singing, no speech, no drops, no trap hi-hats

No lyrics: instrumental.

## Request filter

stripped: nothing

## Rejected seeds

- 4410403: 1.2s of near-silence (limit 0.5); boomy: 14.5% below 60 Hz (ceiling 12)
- 4410402: 1.0s of near-silence (limit 0.5); boomy: 12.7% below 60 Hz (ceiling 12)

## Measured (the kept take, after the 60 Hz high-pass, before the loudness gain unless noted)

| gate | measured | limit | passed |
|---|---|---|---|
| tempo | 72 bpm vs asked 72 | within 4 bpm, folds 0.5 / 2 / 4:3 / 3:4 allowed | yes |
| loudness | -16.0 LUFS installed (decoded MP3 -16.4); candidate was -15.6, gain -0.4 dB | -16 LUFS within 1 dB | yes |
| peak after encode | -1.92 dBFS decoded (pre-encode -3.14) | under -1 dBFS | yes |
| silence | longest 1.05 s under -50 dBFS | under 0.5 s (mellow) | **NO** |
| brightness | 1.51 % of power above 6 kHz | under 2.5 % (mellow) | yes |
| boominess | 4.58 % below 60 Hz (raw render 20.5 %) | under 12 % | yes |
| onset rate | 2.69 per second | 0.3 to 4.5 | yes |
| loop seam | step 0.08x, tail-head +7.8 dB | not applied: a one-shot, not a loop | yes |

## Heard by a model, not a person

Not listened to: listening is off, or there is no GEMINI_API_KEY in the environment. Nobody on the machine can hear.

## Checks

kept despite failing: 1.1s of near-silence (limit 0.5)
