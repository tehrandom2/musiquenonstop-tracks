# Slow Rewind

- **slug:** head-nod-slow-rewind
- **idea:** slow head-nod boom bap after dark
- **mood:** laid back, dark and warm
- **bpm:** 69 (asked) / 139 (measured, folded into 70-140)
- **key:** Ab minor (asked) / C major (estimated)
- **seed:** 4410101
- **model:** ACE-Step 1.5, acestep-v15-turbo, 8 steps, guidance 7.0, shift 3.0, LM None
- **tier:** fast   **gate profile:** mellow   **duration:** 150 s rendered, 147.9 s installed (one-shot, nothing baked)
- **date:** 2026-11-01
- **render time:** None s per seed, model load None s
- **licence:** generated locally from a text prompt, no samples or reference audio, no third-party rights claimed
- project: head-nod-preview
- **album:** Head Nod After Dark: A, Dusty Keys, track 10
- **submitter:** the owner
- **tags:** boom bap, instrumental, preview, prompt A
- **loop:** no, a one-shot
- **length:** 6522014 samples at 44.1 kHz (147.89 s), about 42.5 bars of 4/4 at 69 bpm (the MP3 adds encoder padding; the length is of the PCM)

## Why

You asked for "the owner's preview: forty slow boom bap instrumentals for the owner and a friend". The style was written by the station's writers from the owner's ask, in sound words only. So I wrote it at 69 bpm in Ab minor, 150 seconds, with no voice, under the mellow gates. It is a one-shot: nothing is baked and the ending is the model's own. I rendered 2 seeds and threw away 1: 4410102 (2.6s of near-silence (limit 0.5)). Seed 4410101 is the take.

## Prompt

> Slow laid-back instrumental boom bap, head-nod groove, dusty swung drums with a hard crisp snare, soft ghost notes and noisy shuffling hi-hats, a chopped electric piano loop played slightly behind the beat, a soft harp pluck, a short filtered horn stab with echo, deep round bass line, warm dark muffled mix, wide sample layer, an intro of keys and drums alone before the bass comes in, late-night and melancholic, no vocals, no singing, no speech, no drops, no trap hi-hats

No lyrics: instrumental.

## Request filter

stripped: nothing

## Rejected seeds

- 4410102: 2.6s of near-silence (limit 0.5)

## Measured (the kept take, after the 60 Hz high-pass, before the loudness gain unless noted)

| gate | measured | limit | passed |
|---|---|---|---|
| tempo | 139 bpm vs asked 69 | within 4 bpm, folds 0.5 / 2 / 4:3 / 3:4 allowed | yes |
| loudness | -16.0 LUFS installed (decoded MP3 -16.5); candidate was -17.6, gain +1.6 dB | -16 LUFS within 1 dB | yes |
| peak after encode | -1.83 dBFS decoded (pre-encode -3.02) | under -1 dBFS | yes |
| silence | longest 0.30 s under -50 dBFS | under 0.5 s (mellow) | yes |
| brightness | 0.43 % of power above 6 kHz | under 2.5 % (mellow) | yes |
| boominess | 8.40 % below 60 Hz (raw render 24.1 %) | under 12 % | yes |
| onset rate | 1.92 per second | 0.3 to 4.5 | yes |
| loop seam | step 0.12x, tail-head -69.5 dB | not applied: a one-shot, not a loop | yes |

## Heard by a model, not a person

Not listened to: listening is off, or there is no GEMINI_API_KEY in the environment. Nobody on the machine can hear.

## Checks

all automatic checks passed. These are numbers, not hearing: nobody on the machine can hear, the owner listens.
