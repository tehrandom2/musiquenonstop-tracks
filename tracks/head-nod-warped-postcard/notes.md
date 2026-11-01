# Warped Postcard

- **slug:** head-nod-warped-postcard
- **idea:** slow head-nod boom bap after dark
- **mood:** laid back, dark and warm
- **bpm:** 69 (asked) / 137 (measured, folded into 70-140)
- **key:** G# minor (asked) / F# minor (estimated)
- **seed:** 4410202
- **model:** ACE-Step 1.5, acestep-v15-turbo, 8 steps, guidance 7.0, shift 3.0, LM None
- **tier:** fast   **gate profile:** mellow   **duration:** 135 s rendered, 132.9 s installed (one-shot, nothing baked)
- **date:** 2026-11-01
- **render time:** None s per seed, model load None s
- **licence:** generated locally from a text prompt, no samples or reference audio, no third-party rights claimed
- project: head-nod-preview
- **album:** Head Nod After Dark: B, Woozy Haze, track 10
- **submitter:** the owner
- **tags:** boom bap, instrumental, preview, prompt B
- **loop:** no, a one-shot
- **length:** 5860898 samples at 44.1 kHz (132.90 s), about 38.2 bars of 4/4 at 69 bpm (the MP3 adds encoder padding; the length is of the PCM)

## Why

You asked for "the owner's preview: forty slow boom bap instrumentals for the owner and a friend". The style was written by the station's writers from the owner's ask, in sound words only. So I wrote it at 69 bpm in G# minor, 135 seconds, with no voice, under the mellow gates. It is a one-shot: nothing is baked and the ending is the model's own. I rendered 2 seeds and threw away 1: 4410201 (boomy: 13.2% below 60 Hz (ceiling 12)). Seed 4410202 is the take.

## Prompt

> Woozy psychedelic hip hop instrumental, slow swung boom bap drums with a roomy snare, a wobbly tape-warped synth flute melody over detuned chords, fuzzy saturated bass, wobbly tape wow and flutter, dark low-passed haze, soft vinyl crackle, dreamy and a little strange, laid back, no vocals, no singing, no speech, no drops, no trap hi-hats

No lyrics: instrumental.

## Request filter

stripped: nothing

## Rejected seeds

- 4410201: boomy: 13.2% below 60 Hz (ceiling 12)

## Measured (the kept take, after the 60 Hz high-pass, before the loudness gain unless noted)

| gate | measured | limit | passed |
|---|---|---|---|
| tempo | 137 bpm vs asked 69 | within 4 bpm, folds 0.5 / 2 / 4:3 / 3:4 allowed | yes |
| loudness | -16.0 LUFS installed (decoded MP3 -16.4); candidate was -15.0, gain -1.0 dB | -16 LUFS within 1 dB | yes |
| peak after encode | -2.56 dBFS decoded (pre-encode -3.51) | under -1 dBFS | yes |
| silence | longest 0.15 s under -50 dBFS | under 0.5 s (mellow) | yes |
| brightness | 0.55 % of power above 6 kHz | under 2.5 % (mellow) | yes |
| boominess | 7.87 % below 60 Hz (raw render 25.8 %) | under 12 % | yes |
| onset rate | 1.58 per second | 0.3 to 4.5 | yes |
| loop seam | step 1.62x, tail-head -62.8 dB | not applied: a one-shot, not a loop | yes |

## Heard by a model, not a person

Not listened to: listening is off, or there is no GEMINI_API_KEY in the environment. Nobody on the machine can hear.

## Checks

all automatic checks passed. These are numbers, not hearing: nobody on the machine can hear, the owner listens.
