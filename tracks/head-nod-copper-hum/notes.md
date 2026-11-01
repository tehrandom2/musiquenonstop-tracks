# Copper Hum

- **slug:** head-nod-copper-hum
- **idea:** slow head-nod boom bap after dark
- **mood:** laid back, dark and warm
- **bpm:** 69 (asked) / 139 (measured, folded into 70-140)
- **key:** G minor (asked) / F major (estimated)
- **seed:** 4410052
- **model:** ACE-Step 1.5, acestep-v15-turbo, 8 steps, guidance 7.0, shift 3.0, LM None
- **tier:** fast   **gate profile:** mellow   **duration:** 135 s rendered, 131.6 s installed (one-shot, nothing baked)
- **date:** 2026-11-01
- **render time:** None s per seed, model load None s
- **licence:** generated locally from a text prompt, no samples or reference audio, no third-party rights claimed
- project: head-nod-preview
- **album:** Head Nod After Dark: A, Dusty Keys, track 5
- **submitter:** the owner
- **tags:** boom bap, instrumental, preview, prompt A
- **loop:** no, a one-shot
- **length:** 5803204 samples at 44.1 kHz (131.59 s), about 37.8 bars of 4/4 at 69 bpm (the MP3 adds encoder padding; the length is of the PCM)

## Why

You asked for "the owner's preview: forty slow boom bap instrumentals for the owner and a friend". The style was written by the station's writers from the owner's ask, in sound words only. So I wrote it at 69 bpm in G minor, 135 seconds, with no voice, under the mellow gates. It is a one-shot: nothing is baked and the ending is the model's own. I rendered 2 seeds and threw away 1: 4410051 (boomy: 13.0% below 60 Hz (ceiling 12) and others). Seed 4410052 is the take.

## Prompt

> Slow laid-back instrumental boom bap, head-nod groove, dusty swung drums with a hard crisp snare, soft ghost notes and noisy shuffling hi-hats, a gritty chopped organ loop, soft electric piano stabs, a short filtered horn stab with echo, deep round bass line, warm dark muffled mix, wide sample layer, an intro of keys and drums alone before the bass comes in, late-night and melancholic, no vocals, no singing, no speech, no drops, no trap hi-hats

No lyrics: instrumental.

## Request filter

stripped: nothing

## Rejected seeds

- 4410051: boomy: 13.0% below 60 Hz (ceiling 12); crest 18.6 dB, too peaky to reach -16 LUFS

## Measured (the kept take, after the 60 Hz high-pass, before the loudness gain unless noted)

| gate | measured | limit | passed |
|---|---|---|---|
| tempo | 139 bpm vs asked 69 | within 4 bpm, folds 0.5 / 2 / 4:3 / 3:4 allowed | yes |
| loudness | -16.0 LUFS installed (decoded MP3 -16.4); candidate was -16.0, gain +0.0 dB | -16 LUFS within 1 dB | yes |
| peak after encode | -2.67 dBFS decoded (pre-encode -3.13) | under -1 dBFS | yes |
| silence | longest 0.35 s under -50 dBFS | under 0.5 s (mellow) | yes |
| brightness | 1.25 % of power above 6 kHz | under 2.5 % (mellow) | yes |
| boominess | 6.82 % below 60 Hz (raw render 29.6 %) | under 12 % | yes |
| onset rate | 2.18 per second | 0.3 to 4.5 | yes |
| loop seam | step 0.01x, tail-head -62.2 dB | not applied: a one-shot, not a loop | yes |

## Heard by a model, not a person

Not listened to: listening is off, or there is no GEMINI_API_KEY in the environment. Nobody on the machine can hear.

## Checks

all automatic checks passed. These are numbers, not hearing: nobody on the machine can hear, the owner listens.
