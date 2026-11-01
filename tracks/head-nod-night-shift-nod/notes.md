# Night Shift Nod

- **slug:** head-nod-night-shift-nod
- **idea:** slow head-nod boom bap after dark
- **mood:** laid back, dark and warm
- **bpm:** 67 (asked) / 134 (measured, folded into 70-140)
- **key:** F# minor (asked) / F# minor (estimated)
- **seed:** 4410081
- **model:** ACE-Step 1.5, acestep-v15-turbo, 8 steps, guidance 7.0, shift 3.0, LM None
- **tier:** fast   **gate profile:** mellow   **duration:** 140 s rendered, 137.7 s installed (one-shot, nothing baked)
- **date:** 2026-11-01
- **render time:** None s per seed, model load None s
- **licence:** generated locally from a text prompt, no samples or reference audio, no third-party rights claimed
- project: head-nod-preview
- **album:** Head Nod After Dark: A, Dusty Keys, track 8
- **submitter:** the owner
- **tags:** boom bap, instrumental, preview, prompt A
- **loop:** no, a one-shot
- **length:** 6074298 samples at 44.1 kHz (137.74 s), about 38.5 bars of 4/4 at 67 bpm (the MP3 adds encoder padding; the length is of the PCM)

## Why

You asked for "the owner's preview: forty slow boom bap instrumentals for the owner and a friend". The style was written by the station's writers from the owner's ask, in sound words only. So I wrote it at 67 bpm in F# minor, 140 seconds, with no voice, under the mellow gates. It is a one-shot: nothing is baked and the ending is the model's own. I rendered 2 seeds and threw away 1: 4410082 (2.4s of near-silence (limit 0.5)). Seed 4410081 is the take.

## Prompt

> Slow laid-back instrumental boom bap, head-nod groove, dusty swung drums with a hard crisp snare, soft ghost notes and noisy shuffling hi-hats, a bitcrushed electric piano loop, soft string swells chopped short, a short filtered horn stab with echo, deep round bass line, warm dark muffled mix, wide sample layer, an intro of keys and drums alone before the bass comes in, late-night and melancholic, no vocals, no singing, no speech, no drops, no trap hi-hats

No lyrics: instrumental.

## Request filter

stripped: nothing

## Rejected seeds

- 4410082: 2.4s of near-silence (limit 0.5)

## Measured (the kept take, after the 60 Hz high-pass, before the loudness gain unless noted)

| gate | measured | limit | passed |
|---|---|---|---|
| tempo | 134 bpm vs asked 67 | within 4 bpm, folds 0.5 / 2 / 4:3 / 3:4 allowed | yes |
| loudness | -16.0 LUFS installed (decoded MP3 -16.5); candidate was -17.2, gain +1.1 dB | -16 LUFS within 1 dB | yes |
| peak after encode | -2.30 dBFS decoded (pre-encode -3.05) | under -1 dBFS | yes |
| silence | longest 0.40 s under -50 dBFS | under 0.5 s (mellow) | yes |
| brightness | 0.24 % of power above 6 kHz | under 2.5 % (mellow) | yes |
| boominess | 5.58 % below 60 Hz (raw render 13.4 %) | under 12 % | yes |
| onset rate | 1.63 per second | 0.3 to 4.5 | yes |
| loop seam | step 0.00x, tail-head -64.8 dB | not applied: a one-shot, not a loop | yes |

## Heard by a model, not a person

Not listened to: listening is off, or there is no GEMINI_API_KEY in the environment. Nobody on the machine can hear.

## Checks

all automatic checks passed. These are numbers, not hearing: nobody on the machine can hear, the owner listens.
