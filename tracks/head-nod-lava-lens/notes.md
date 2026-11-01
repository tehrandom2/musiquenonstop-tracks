# Lava Lens

- **slug:** head-nod-lava-lens
- **idea:** slow head-nod boom bap after dark
- **mood:** laid back, dark and warm
- **bpm:** 68 (asked) / 136 (measured, folded into 70-140)
- **key:** C minor (asked) / C major (estimated)
- **seed:** 4410161
- **model:** ACE-Step 1.5, acestep-v15-turbo, 8 steps, guidance 7.0, shift 3.0, LM None
- **tier:** fast   **gate profile:** mellow   **duration:** 145 s rendered, 142.5 s installed (one-shot, nothing baked)
- **date:** 2026-11-01
- **render time:** None s per seed, model load None s
- **licence:** generated locally from a text prompt, no samples or reference audio, no third-party rights claimed
- project: head-nod-preview
- **album:** Head Nod After Dark: B, Woozy Haze, track 6
- **submitter:** the owner
- **tags:** boom bap, instrumental, preview, prompt B
- **loop:** no, a one-shot
- **length:** 6284701 samples at 44.1 kHz (142.51 s), about 40.4 bars of 4/4 at 68 bpm (the MP3 adds encoder padding; the length is of the PCM)

## Why

You asked for "the owner's preview: forty slow boom bap instrumentals for the owner and a friend". The style was written by the station's writers from the owner's ask, in sound words only. So I wrote it at 68 bpm in C minor, 145 seconds, with no voice, under the mellow gates. It is a one-shot: nothing is baked and the ending is the model's own. I rendered 2 seeds and threw away 1: 4410162 (passed, but outranked by the kept takes). Seed 4410161 is the take.

## Prompt

> Woozy psychedelic hip hop instrumental, slow swung boom bap drums with a roomy snare, thick detuned analog brass synth chords, a squelchy synth bass riff, fuzzy saturated bass, wobbly tape wow and flutter, dark low-passed haze, soft vinyl crackle, dreamy and a little strange, laid back, no vocals, no singing, no speech, no drops, no trap hi-hats

No lyrics: instrumental.

## Request filter

stripped: nothing

## Rejected seeds

- 4410162: passed, but outranked by the kept takes

## Measured (the kept take, after the 60 Hz high-pass, before the loudness gain unless noted)

| gate | measured | limit | passed |
|---|---|---|---|
| tempo | 136 bpm vs asked 68 | within 4 bpm, folds 0.5 / 2 / 4:3 / 3:4 allowed | yes |
| loudness | -16.0 LUFS installed (decoded MP3 -16.4); candidate was -14.8, gain -1.2 dB | -16 LUFS within 1 dB | yes |
| peak after encode | -2.42 dBFS decoded (pre-encode -3.26) | under -1 dBFS | yes |
| silence | longest 0.50 s under -50 dBFS | under 0.5 s (mellow) | yes |
| brightness | 1.33 % of power above 6 kHz | under 2.5 % (mellow) | yes |
| boominess | 6.06 % below 60 Hz (raw render 19.4 %) | under 12 % | yes |
| onset rate | 2.13 per second | 0.3 to 4.5 | yes |
| loop seam | step 20.21x, tail-head -55.4 dB | not applied: a one-shot, not a loop | yes |

## Heard by a model, not a person

Not listened to: listening is off, or there is no GEMINI_API_KEY in the environment. Nobody on the machine can hear.

## Checks

all automatic checks passed. These are numbers, not hearing: nobody on the machine can hear, the owner listens.
