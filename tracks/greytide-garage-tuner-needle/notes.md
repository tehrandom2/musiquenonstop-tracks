# Tuner Needle

- **slug:** greytide-garage-tuner-needle
- **idea:** Between waves: the tuner pedal's needle swings and settles to in tune while the hand builds; a breather that still gallops
- **mood:** bright, restless, between songs
- **bpm:** 136 (asked) / 134 (measured, folded into 70-140)
- **key:** D minor (asked) / D major (estimated)
- **seed:** 3990300
- **model:** ACE-Step 1.5, acestep-v15-turbo, 8 steps, guidance 7.0, shift 3.0, LM acestep-5Hz-lm-1.7B
- **tier:** fast   **gate profile:** mellow   **duration:** 135 s rendered, 131.3 s installed (one-shot, nothing baked)
- **date:** 2026-10-26
- **render time:** 19.6 s per seed, model load 24.6 s
- **licence:** generated locally from a text prompt, no samples or reference audio, no third-party rights claimed
- project: greytide
- **album:** Greytide, track 3
- **submitter:** the radio, for greytide
- **tags:** table:garage, pov:the tuner pedal
- **loop:** no, a one-shot
- **length:** 5788651 samples at 44.1 kHz (131.26 s), about 74.4 bars of 4/4 at 136 bpm (the MP3 adds encoder padding; the length is of the PCM)

## Why

You asked for "Between waves: the tuner pedal's needle swings and settles to in tune while the hand builds; a breather that still gallops". The words and the style were written for this song by the station's writers and reviewed by the conductor. So I wrote it at 136 bpm in D minor, 135 seconds, with no voice, under the mellow gates. It has no beat to hold, so 136 bpm is only the grid I gave the model and the tempo gate is not applied. It is a one-shot: nothing is baked and the ending is the model's own. I rendered 2 seeds and threw away 1: 3990301 (0.6s of near-silence (limit 0.5)). Seed 3990300 is the take.

## Prompt

> Surf rock instrumental, 136 bpm, D minor: a reverb-drenched lead guitar picking a fast tremolo melody, a rhythm guitar chopping offbeat chords, a tight lean bass, bass under the mids, galloping on the root, a drummer on toms and a rolling snare, a small organ holding long chords underneath; spring reverb, no harsh highs; starts mid on the gallop, a long bright plateau of the tremolo melody, one dip to bass and toms, a final lift with both guitars in octaves, D minor, instrumental, no vocals

No lyrics: instrumental.

## Request filter

stripped: nothing

## Rejected seeds

- 3990301: 0.6s of near-silence (limit 0.5)

## Measured (the kept take, after the 60 Hz high-pass, before the loudness gain unless noted)

| gate | measured | limit | passed |
|---|---|---|---|
| tempo | 134 bpm vs asked 136 | not applied: no beat was asked for | yes |
| loudness | -16.0 LUFS installed (decoded MP3 -16.4); candidate was -14.3, gain -1.7 dB | -16 LUFS within 1 dB | yes |
| peak after encode | -3.36 dBFS decoded (pre-encode -3.55) | under -1 dBFS | yes |
| silence | longest 0.10 s under -50 dBFS | under 0.5 s (mellow) | yes |
| brightness | 0.56 % of power above 6 kHz | under 2.5 % (mellow) | yes |
| boominess | 3.83 % below 60 Hz (raw render 18.3 %) | under 12 % | yes |
| onset rate | 2.99 per second | 0.3 to 4.5 | yes |
| loop seam | step 0.02x, tail-head -51.0 dB | not applied: a one-shot, not a loop | yes |

## Heard by a model, not a person

Not listened to: listening is off, or there is no GEMINI_API_KEY in the environment. Nobody on the machine can hear.

## Checks

all automatic checks passed. These are numbers, not hearing: nobody on the machine can hear, the owner listens.
