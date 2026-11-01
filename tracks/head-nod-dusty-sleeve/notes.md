# Dusty Sleeve

- **slug:** head-nod-dusty-sleeve
- **idea:** slow head-nod boom bap after dark
- **mood:** laid back, dark and warm
- **bpm:** 72 (asked) / 72 (measured, folded into 70-140)
- **key:** G minor (asked) / C major (estimated)
- **seed:** 4410261
- **model:** ACE-Step 1.5, acestep-v15-turbo, 8 steps, guidance 7.0, shift 3.0, LM None
- **tier:** fast   **gate profile:** mellow   **duration:** 125 s rendered, 120.2 s installed (one-shot, nothing baked)
- **date:** 2026-11-01
- **render time:** None s per seed, model load None s
- **licence:** generated locally from a text prompt, no samples or reference audio, no third-party rights claimed
- project: head-nod-preview
- **album:** Head Nod After Dark: C, Jazz Crate, track 6
- **submitter:** the owner
- **tags:** boom bap, instrumental, preview, prompt C
- **loop:** no, a one-shot
- **length:** 5299767 samples at 44.1 kHz (120.18 s), about 36.1 bars of 4/4 at 72 bpm (the MP3 adds encoder padding; the length is of the PCM)

## Why

You asked for "the owner's preview: forty slow boom bap instrumentals for the owner and a friend". The style was written by the station's writers from the owner's ask, in sound words only. So I wrote it at 72 bpm in G minor, 125 seconds, with no voice, under the mellow gates. It is a one-shot: nothing is baked and the ending is the model's own. I rendered 2 seeds and threw away 1: 4410262 (passed, but outranked by the kept takes). Seed 4410261 is the take.

## Prompt

> Dusty jazz-sample boom bap, chopped jazz piano phrases, a walking upright bass line, upright-style round bass, lazy swung drums with a big reverb tail on the snare, crackly old-record texture, a breakdown without drums near the end, warm, dark and nostalgic, no vocals, no singing, no speech, no drops, no trap hi-hats

No lyrics: instrumental.

## Request filter

stripped: nothing

## Rejected seeds

- 4410262: passed, but outranked by the kept takes

## Measured (the kept take, after the 60 Hz high-pass, before the loudness gain unless noted)

| gate | measured | limit | passed |
|---|---|---|---|
| tempo | 72 bpm vs asked 72 | within 4 bpm, folds 0.5 / 2 / 4:3 / 3:4 allowed | yes |
| loudness | -16.0 LUFS installed (decoded MP3 -16.4); candidate was -19.1, gain +3.1 dB | -16 LUFS within 1 dB | yes |
| peak after encode | -1.98 dBFS decoded (pre-encode -3.01) | under -1 dBFS | yes |
| silence | longest 0.25 s under -50 dBFS | under 0.5 s (mellow) | yes |
| brightness | 0.45 % of power above 6 kHz | under 2.5 % (mellow) | yes |
| boominess | 6.10 % below 60 Hz (raw render 12.7 %) | under 12 % | yes |
| onset rate | 1.30 per second | 0.3 to 4.5 | yes |
| loop seam | step 0.00x, tail-head -64.7 dB | not applied: a one-shot, not a loop | yes |

## Heard by a model, not a person

Not listened to: listening is off, or there is no GEMINI_API_KEY in the environment. Nobody on the machine can hear.

## Checks

all automatic checks passed. These are numbers, not hearing: nobody on the machine can hear, the owner listens.
