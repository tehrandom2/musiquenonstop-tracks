# Popcorn Over The Board

- **slug:** greytide-couch-popcorn-over-the-board
- **idea:** Wave seven: a handful of popcorn rains over the board, soft boulders the grey ones kick and stumble on, some rolling off the edge; the table's point of view.
- **mood:** playful, frantic, bouncing
- **bpm:** 146 (asked) / 97 (measured, folded into 70-140)
- **key:** F sharp minor (asked) / F major (estimated)
- **seed:** 4030700
- **model:** ACE-Step 1.5, acestep-v15-turbo, 8 steps, guidance 7.0, shift 3.0, LM acestep-5Hz-lm-1.7B
- **tier:** fast   **gate profile:** mellow   **duration:** 132 s rendered, 128.8 s installed (one-shot, nothing baked)
- **date:** 2026-10-26
- **render time:** 19.4 s per seed, model load 24.6 s
- **licence:** generated locally from a text prompt, no samples or reference audio, no third-party rights claimed
- project: greytide
- **album:** Greytide, track 7
- **submitter:** the radio, for greytide
- **tags:** table:couch, pov:the table
- **loop:** no, a one-shot
- **length:** 5680979 samples at 44.1 kHz (128.82 s), about 78.4 bars of 4/4 at 146 bpm (the MP3 adds encoder padding; the length is of the PCM)

## Why

You asked for "Wave seven: a handful of popcorn rains over the board, soft boulders the grey ones kick and stumble on, some rolling off the edge; the table's point of view.". The words and the style were written for this song by the station's writers and reviewed by the conductor. So I wrote it at 146 bpm in F sharp minor, 132 seconds, with no voice, under the mellow gates. It has no beat to hold, so 146 bpm is only the grid I gave the model and the tempo gate is not applied. It is a one-shot: nothing is baked and the ending is the model's own. I rendered 2 seeds and threw away 1: 4030701 (0.7s of near-silence (limit 0.5)). Seed 4030700 is the take.

## Prompt

> Bouncing surf rock with marimba, 146 bpm, F sharp minor, playful and frantic. A tight quartet with every part in its lane: a twangy reverb lead guitar playing the tune, a marimba popping short kernels of notes on the offbeat, a rhythm guitar chopping, tight lean bass under the mids, quick tom-heavy drums. Arc: drums alone then a scatter of marimba like kernels landing, the band at mid energy, a long high plateau with lead and marimba in unison, a dip where kernels roll off one by one on lone marimba notes, a lifted final run, a stop. F sharp minor, no harsh highs, instrumental, no vocals.

No lyrics: instrumental.

## Request filter

stripped: nothing

## Rejected seeds

- 4030701: 0.7s of near-silence (limit 0.5)

## Measured (the kept take, after the 60 Hz high-pass, before the loudness gain unless noted)

| gate | measured | limit | passed |
|---|---|---|---|
| tempo | 97 bpm vs asked 146 | not applied: no beat was asked for | yes |
| loudness | -16.0 LUFS installed (decoded MP3 -16.4); candidate was -16.2, gain +0.2 dB | -16 LUFS within 1 dB | yes |
| peak after encode | -2.15 dBFS decoded (pre-encode -3.11) | under -1 dBFS | yes |
| silence | longest 0.30 s under -50 dBFS | under 0.5 s (mellow) | yes |
| brightness | 1.54 % of power above 6 kHz | under 2.5 % (mellow) | yes |
| boominess | 5.53 % below 60 Hz (raw render 13.6 %) | under 12 % | yes |
| onset rate | 3.53 per second | 0.3 to 4.5 | yes |
| loop seam | step 0.02x, tail-head -42.9 dB | not applied: a one-shot, not a loop | yes |

## Heard by a model, not a person

Not listened to: listening is off, or there is no GEMINI_API_KEY in the environment. Nobody on the machine can hear.

## Checks

all automatic checks passed. These are numbers, not hearing: nobody on the machine can hear, the owner listens.
