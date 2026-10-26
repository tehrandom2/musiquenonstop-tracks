# Eighty Percent Flock

- **slug:** greytide-desk-eighty-percent-flock
- **idea:** Instrumental breather: the basing gnome on the cork lobs clumps of flock over the first waves, a cheap little mortar, eighty percent flock.
- **mood:** playful, dusty, bouncing
- **bpm:** 132 (asked) / 132 (measured, folded into 70-140)
- **key:** A minor (asked) / A minor (estimated)
- **seed:** 3910201
- **model:** ACE-Step 1.5, acestep-v15-turbo, 8 steps, guidance 7.0, shift 3.0, LM acestep-5Hz-lm-1.7B
- **tier:** fast   **gate profile:** mellow   **duration:** 135 s rendered, 130.7 s installed (one-shot, nothing baked)
- **date:** 2026-10-26
- **render time:** 20.0 s per seed, model load 24.6 s
- **licence:** generated locally from a text prompt, no samples or reference audio, no third-party rights claimed
- project: greytide
- **album:** Greytide, track 2
- **submitter:** the radio, for greytide
- **tags:** table:desk, pov:the basing gnome
- **loop:** no, a one-shot
- **length:** 5765598 samples at 44.1 kHz (130.74 s), about 71.9 bars of 4/4 at 132 bpm (the MP3 adds encoder padding; the length is of the PCM)

## Why

You asked for "Instrumental breather: the basing gnome on the cork lobs clumps of flock over the first waves, a cheap little mortar, eighty percent flock.". The words and the style were written for this song by the station's writers and reviewed by the conductor. So I wrote it at 132 bpm in A minor, 135 seconds, with no voice, under the mellow gates. It has no beat to hold, so 132 bpm is only the grid I gave the model and the tempo gate is not applied. It is a one-shot: nothing is baked and the ending is the model's own. I rendered 2 seeds and threw away 1: 3910200 (3.2s of near-silence (limit 0.5)). Seed 3910201 is the take, but it did not clear every gate: harsh: 2.5% above 6 kHz (ceiling 2.5).

## Prompt

> Rubbery minor-key funk, 132 bpm, A minor. A five-piece: clavinet stabs on the offbeat, a wah rhythm guitar, a tight lean bass in short syncopated figures well under the mids, a dry breakbeat kit with ghost notes, a baritone sax and a muted trumpet throwing two-note phrases that arc and answer each other like lobbed shells. Playful and dusty. Starts mid on clav and drums, a long horn plateau, one dip to bass and drums, a lifted final horn section. A minor, instrumental, no vocals

No lyrics: instrumental.

## Request filter

stripped: nothing

## Rejected seeds

- 3910200: 3.2s of near-silence (limit 0.5)

## Measured (the kept take, after the 60 Hz high-pass, before the loudness gain unless noted)

| gate | measured | limit | passed |
|---|---|---|---|
| tempo | 132 bpm vs asked 132 | not applied: no beat was asked for | yes |
| loudness | -16.0 LUFS installed (decoded MP3 -16.4); candidate was -15.8, gain -0.2 dB | -16 LUFS within 1 dB | yes |
| peak after encode | -2.74 dBFS decoded (pre-encode -3.15) | under -1 dBFS | yes |
| silence | longest 0.20 s under -50 dBFS | under 0.5 s (mellow) | yes |
| brightness | 2.53 % of power above 6 kHz | under 2.5 % (mellow) | **NO** |
| boominess | 5.19 % below 60 Hz (raw render 17.4 %) | under 12 % | yes |
| onset rate | 3.81 per second | 0.3 to 4.5 | yes |
| loop seam | step 0.10x, tail-head -63.5 dB | not applied: a one-shot, not a loop | yes |

## Heard by a model, not a person

Not listened to: listening is off, or there is no GEMINI_API_KEY in the environment. Nobody on the machine can hear.

## Checks

kept despite failing: harsh: 2.5% above 6 kHz (ceiling 2.5)
