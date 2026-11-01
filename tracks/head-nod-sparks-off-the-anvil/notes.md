# Sparks Off The Anvil

- **slug:** head-nod-sparks-off-the-anvil
- **idea:** slow head-nod boom bap after dark
- **mood:** laid back, dark and warm
- **bpm:** 72 (asked) / 70 (measured, folded into 70-140)
- **key:** D minor (asked) / A major (estimated)
- **seed:** 4410332
- **model:** ACE-Step 1.5, acestep-v15-xl-sft, 50 steps, guidance 7.0, shift 1.0, LM None
- **tier:** best   **gate profile:** mellow   **duration:** 130 s rendered, 128.6 s installed (one-shot, nothing baked)
- **date:** 2026-11-01
- **render time:** None s per seed, model load None s
- **licence:** generated locally from a text prompt, no samples or reference audio, no third-party rights claimed
- project: head-nod-preview
- **album:** Last Rites, track 3
- **submitter:** the owner
- **tags:** boom bap, instrumental, preview, prompt D
- **loop:** no, a one-shot
- **length:** 5670310 samples at 44.1 kHz (128.58 s), about 38.6 bars of 4/4 at 72 bpm (the MP3 adds encoder padding; the length is of the PCM)

## Why

You asked for "the owner's preview: forty slow boom bap instrumentals for the owner and a friend". The style was written by the station's writers from the owner's ask, in sound words only. So I wrote it at 72 bpm in D minor, 130 seconds, with no voice, under the mellow gates. It is a one-shot: nothing is baked and the ending is the model's own. I rendered 3 seeds and threw away 2: 4410333 (1.8s of near-silence (limit 0.5)); 4410331 (1.2s of near-silence (limit 0.5) and others). Seed 4410332 is the take.

## Prompt

> Slow heavy industrial boom bap instrumental, head-nod groove, crushed distorted swung drums with a pounding mechanical kick and a cracking metallic snare, an overdriven electric piano loop, a screaming distorted synth lead used as an instrument, saturated fuzz bass, clanging machine percussion, bitcrushed noise textures, dark muffled top end, distorted grit in the mids, menacing, hypnotic and dusty, no vocals, no singing, no speech, no drops, no trap hi-hats

No lyrics: instrumental.

## Request filter

stripped: nothing

## Rejected seeds

- 4410333: 1.8s of near-silence (limit 0.5)
- 4410331: 1.2s of near-silence (limit 0.5); harsh: 2.9% above 6 kHz (ceiling 2.5)

## Measured (the kept take, after the 60 Hz high-pass, before the loudness gain unless noted)

| gate | measured | limit | passed |
|---|---|---|---|
| tempo | 70 bpm vs asked 72 | within 4 bpm, folds 0.5 / 2 / 4:3 / 3:4 allowed | yes |
| loudness | -16.0 LUFS installed (decoded MP3 -16.4); candidate was -16.4, gain +0.4 dB | -16 LUFS within 1 dB | yes |
| peak after encode | -2.72 dBFS decoded (pre-encode -3.18) | under -1 dBFS | yes |
| silence | longest 0.35 s under -50 dBFS | under 0.5 s (mellow) | yes |
| brightness | 1.25 % of power above 6 kHz | under 2.5 % (mellow) | yes |
| boominess | 6.55 % below 60 Hz (raw render 40.2 %) | under 12 % | yes |
| onset rate | 2.12 per second | 0.3 to 4.5 | yes |
| loop seam | step 0.24x, tail-head -58.1 dB | not applied: a one-shot, not a loop | yes |

## Heard by a model, not a person

Not listened to: listening is off, or there is no GEMINI_API_KEY in the environment. Nobody on the machine can hear.

## Checks

all automatic checks passed. These are numbers, not hearing: nobody on the machine can hear, the owner listens.
