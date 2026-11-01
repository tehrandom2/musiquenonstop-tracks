# Fourth Floor Walkup

- **slug:** head-nod-fourth-floor-walkup
- **idea:** slow head-nod boom bap after dark
- **mood:** laid back, dark and warm
- **bpm:** 70 (asked) / 139 (measured, folded into 70-140)
- **key:** B minor (asked) / C major (estimated)
- **seed:** 4410071
- **model:** ACE-Step 1.5, acestep-v15-turbo, 8 steps, guidance 7.0, shift 3.0, LM None
- **tier:** fast   **gate profile:** mellow   **duration:** 145 s rendered, 144.2 s installed (one-shot, nothing baked)
- **date:** 2026-11-01
- **render time:** None s per seed, model load None s
- **licence:** generated locally from a text prompt, no samples or reference audio, no third-party rights claimed
- project: head-nod-preview
- **album:** Head Nod After Dark: A, Dusty Keys, track 7
- **submitter:** the owner
- **tags:** boom bap, instrumental, preview, prompt A
- **loop:** no, a one-shot
- **length:** 6358280 samples at 44.1 kHz (144.18 s), about 42.1 bars of 4/4 at 70 bpm (the MP3 adds encoder padding; the length is of the PCM)

## Why

You asked for "the owner's preview: forty slow boom bap instrumentals for the owner and a friend". The style was written by the station's writers from the owner's ask, in sound words only. So I wrote it at 70 bpm in B minor, 145 seconds, with no voice, under the mellow gates. It is a one-shot: nothing is baked and the ending is the model's own. I rendered 2 seeds and threw away 1: 4410072 (boomy: 13.7% below 60 Hz (ceiling 12)). Seed 4410071 is the take.

## Prompt

> Slow laid-back instrumental boom bap, head-nod groove, dusty swung drums with a hard crisp snare, soft ghost notes and noisy shuffling hi-hats, a chopped electric piano loop, a low clarinet phrase, a short filtered horn stab with echo, deep round bass line, warm dark muffled mix, wide sample layer, an intro of keys and drums alone before the bass comes in, late-night and melancholic, no vocals, no singing, no speech, no drops, no trap hi-hats

No lyrics: instrumental.

## Request filter

stripped: nothing

## Rejected seeds

- 4410072: boomy: 13.7% below 60 Hz (ceiling 12)

## Measured (the kept take, after the 60 Hz high-pass, before the loudness gain unless noted)

| gate | measured | limit | passed |
|---|---|---|---|
| tempo | 139 bpm vs asked 70 | within 4 bpm, folds 0.5 / 2 / 4:3 / 3:4 allowed | yes |
| loudness | -16.0 LUFS installed (decoded MP3 -16.4); candidate was -15.7, gain -0.3 dB | -16 LUFS within 1 dB | yes |
| peak after encode | -2.84 dBFS decoded (pre-encode -3.14) | under -1 dBFS | yes |
| silence | longest 0.35 s under -50 dBFS | under 0.5 s (mellow) | yes |
| brightness | 0.32 % of power above 6 kHz | under 2.5 % (mellow) | yes |
| boominess | 5.49 % below 60 Hz (raw render 14.6 %) | under 12 % | yes |
| onset rate | 3.70 per second | 0.3 to 4.5 | yes |
| loop seam | step 0.87x, tail-head -54.3 dB | not applied: a one-shot, not a loop | yes |

## Heard by a model, not a person

Not listened to: listening is off, or there is no GEMINI_API_KEY in the environment. Nobody on the machine can hear.

## Checks

all automatic checks passed. These are numbers, not hearing: nobody on the machine can hear, the owner listens.
