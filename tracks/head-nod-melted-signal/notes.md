# Melted Signal

- **slug:** head-nod-melted-signal
- **idea:** slow head-nod boom bap after dark
- **mood:** laid back, dark and warm
- **bpm:** 70 (asked) / 138 (measured, folded into 70-140)
- **key:** G minor (asked) / C major (estimated)
- **seed:** 4410121
- **model:** ACE-Step 1.5, acestep-v15-turbo, 8 steps, guidance 7.0, shift 3.0, LM None
- **tier:** fast   **gate profile:** mellow   **duration:** 140 s rendered, 137.7 s installed (one-shot, nothing baked)
- **date:** 2026-11-01
- **render time:** None s per seed, model load None s
- **licence:** generated locally from a text prompt, no samples or reference audio, no third-party rights claimed
- project: head-nod-preview
- **album:** Head Nod After Dark: B, Woozy Haze, track 2
- **submitter:** the owner
- **tags:** boom bap, instrumental, preview, prompt B
- **loop:** no, a one-shot
- **length:** 6072578 samples at 44.1 kHz (137.70 s), about 40.2 bars of 4/4 at 70 bpm (the MP3 adds encoder padding; the length is of the PCM)

## Why

You asked for "the owner's preview: forty slow boom bap instrumentals for the owner and a friend". The style was written by the station's writers from the owner's ask, in sound words only. So I wrote it at 70 bpm in G minor, 140 seconds, with no voice, under the mellow gates. It is a one-shot: nothing is baked and the ending is the model's own. I rendered 2 seeds and threw away 1: 4410122 (passed, but outranked by the kept takes). Seed 4410121 is the take.

## Prompt

> Woozy psychedelic hip hop instrumental, slow swung boom bap drums with a roomy snare, a wobbly detuned synth lead used as an instrument that wanders off the tune, soft analog chords, fuzzy saturated bass, wobbly tape wow and flutter, dark low-passed haze, soft vinyl crackle, dreamy and a little strange, laid back, no vocals, no singing, no speech, no drops, no trap hi-hats

No lyrics: instrumental.

## Request filter

stripped: nothing

## Rejected seeds

- 4410122: passed, but outranked by the kept takes

## Measured (the kept take, after the 60 Hz high-pass, before the loudness gain unless noted)

| gate | measured | limit | passed |
|---|---|---|---|
| tempo | 138 bpm vs asked 70 | within 4 bpm, folds 0.5 / 2 / 4:3 / 3:4 allowed | yes |
| loudness | -16.0 LUFS installed (decoded MP3 -16.4); candidate was -16.4, gain +0.4 dB | -16 LUFS within 1 dB | yes |
| peak after encode | -2.74 dBFS decoded (pre-encode -3.15) | under -1 dBFS | yes |
| silence | longest 0.15 s under -50 dBFS | under 0.5 s (mellow) | yes |
| brightness | 1.68 % of power above 6 kHz | under 2.5 % (mellow) | yes |
| boominess | 6.67 % below 60 Hz (raw render 22.6 %) | under 12 % | yes |
| onset rate | 2.96 per second | 0.3 to 4.5 | yes |
| loop seam | step 1.79x, tail-head -60.1 dB | not applied: a one-shot, not a loop | yes |

## Heard by a model, not a person

Not listened to: listening is off, or there is no GEMINI_API_KEY in the environment. Nobody on the machine can hear.

## Checks

all automatic checks passed. These are numbers, not hearing: nobody on the machine can hear, the owner listens.
