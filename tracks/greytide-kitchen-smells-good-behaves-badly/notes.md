# Smells Good, Behaves Badly

- **slug:** greytide-kitchen-smells-good-behaves-badly
- **idea:** Instrumental breather: someone is cooking, the pan on the hob boils over every wave and the steam streams across the table onto a jam patch.
- **mood:** hot, simmering, building
- **bpm:** 128 (asked) / 127 (measured, folded into 70-140)
- **key:** E minor (asked) / A minor (estimated)
- **seed:** 3920301
- **model:** ACE-Step 1.5, acestep-v15-turbo, 8 steps, guidance 7.0, shift 3.0, LM acestep-5Hz-lm-1.7B
- **tier:** fast   **gate profile:** mellow   **duration:** 140 s rendered, 135.1 s installed (one-shot, nothing baked)
- **date:** 2026-10-26
- **render time:** 20.5 s per seed, model load 24.6 s
- **licence:** generated locally from a text prompt, no samples or reference audio, no third-party rights claimed
- project: greytide
- **album:** Greytide, track 3
- **submitter:** the radio, for greytide
- **tags:** table:kitchen, pov:the frying pan
- **loop:** no, a one-shot
- **length:** 5959743 samples at 44.1 kHz (135.14 s), about 72.1 bars of 4/4 at 128 bpm (the MP3 adds encoder padding; the length is of the PCM)

## Why

You asked for "Instrumental breather: someone is cooking, the pan on the hob boils over every wave and the steam streams across the table onto a jam patch.". The words and the style were written for this song by the station's writers and reviewed by the conductor. So I wrote it at 128 bpm in E minor, 140 seconds, with no voice, under the mellow gates. It has no beat to hold, so 128 bpm is only the grid I gave the model and the tempo gate is not applied. It is a one-shot: nothing is baked and the ending is the model's own. I rendered 2 seeds and threw away 1: 3920300 (harsh: 2.6% above 6 kHz (ceiling 2.5) and others). Seed 3920301 is the take.

## Prompt

> Hot afrobeat groove, 128 bpm, E minor. A ten-piece: two guitars in tight interlocking single-note patterns, a tight lean bass on a repeating riff well under the mids, a busy kit with a shaker and congas, a baritone sax, tenor sax and trumpet on a punchy unison riff, an organ comping in short stabs. Simmering to a boil. Starts mid on guitars and drums, horns build to a long hot plateau, one dip to bass and percussion, a lifted final horn section. E minor, instrumental, no vocals

No lyrics: instrumental.

## Request filter

stripped: nothing

## Rejected seeds

- 3920300: harsh: 2.6% above 6 kHz (ceiling 2.5); onset rate 4.5/s outside 0.3-4.5

## Measured (the kept take, after the 60 Hz high-pass, before the loudness gain unless noted)

| gate | measured | limit | passed |
|---|---|---|---|
| tempo | 127 bpm vs asked 128 | not applied: no beat was asked for | yes |
| loudness | -16.0 LUFS installed (decoded MP3 -16.4); candidate was -16.4, gain +0.3 dB | -16 LUFS within 1 dB | yes |
| peak after encode | -1.92 dBFS decoded (pre-encode -3.13) | under -1 dBFS | yes |
| silence | longest 0.15 s under -50 dBFS | under 0.5 s (mellow) | yes |
| brightness | 0.90 % of power above 6 kHz | under 2.5 % (mellow) | yes |
| boominess | 7.54 % below 60 Hz (raw render 18.7 %) | under 12 % | yes |
| onset rate | 3.77 per second | 0.3 to 4.5 | yes |
| loop seam | step 0.01x, tail-head -59.9 dB | not applied: a one-shot, not a loop | yes |

## Heard by a model, not a person

Not listened to: listening is off, or there is no GEMINI_API_KEY in the environment. Nobody on the machine can hear.

## Checks

all automatic checks passed. These are numbers, not hearing: nobody on the machine can hear, the owner listens.
