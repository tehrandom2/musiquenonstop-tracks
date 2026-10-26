# Pack Away

- **slug:** greytide-schooldesk-pack-away
- **idea:** wave 9: the bell is about to go, the row sits up and packs away, the lunchbox lid swings open and the horde pours for it
- **mood:** rising, frantic, glorious
- **bpm:** 150 (asked) / 74 (measured, folded into 70-140)
- **key:** G minor (asked) / G major (estimated)
- **seed:** 4010901
- **model:** ACE-Step 1.5, acestep-v15-turbo, 8 steps, guidance 7.0, shift 3.0, LM acestep-5Hz-lm-1.7B
- **tier:** fast   **gate profile:** mellow   **duration:** 142 s rendered, 135.5 s installed (one-shot, nothing baked)
- **date:** 2026-10-26
- **render time:** 21.1 s per seed, model load 24.6 s
- **licence:** generated locally from a text prompt, no samples or reference audio, no third-party rights claimed
- project: greytide
- **album:** Greytide, track 9
- **submitter:** the radio, for greytide
- **tags:** table:schooldesk, pov:the-row
- **loop:** no, a one-shot
- **length:** 5977299 samples at 44.1 kHz (135.54 s), about 84.7 bars of 4/4 at 150 bpm (the MP3 adds encoder padding; the length is of the PCM)

## Why

You asked for "wave 9: the bell is about to go, the row sits up and packs away, the lunchbox lid swings open and the horde pours for it". The words and the style were written for this song by the station's writers and reviewed by the conductor. So I wrote it at 150 bpm in G minor, 142 seconds, with no voice, under the mellow gates. It has no beat to hold, so 150 bpm is only the grid I gave the model and the tempo gate is not applied. It is a one-shot: nothing is baked and the ending is the model's own. I rendered 2 seeds and threw away 1: 4010900 (3.7s of near-silence (limit 0.5)). Seed 4010901 is the take.

## Prompt

> Brass-funk big-band build, 150 bpm, G minor, a horn section with roles: trumpets on a rising fanfare riff, trombones answering low, a baritone sax pumping the bass figure with a tight lean bass, bass well under the mids, a busy funk drum kit with snare rolls into every section, a stabbing organ, in G minor, frantic and glorious, mid start with drums and bari, a long climbing plateau, a short dip to drums alone, then the whole band lifted to the end, no harsh highs, instrumental, no vocals

No lyrics: instrumental.

## Request filter

stripped: nothing

## Rejected seeds

- 4010900: 3.7s of near-silence (limit 0.5)

## Measured (the kept take, after the 60 Hz high-pass, before the loudness gain unless noted)

| gate | measured | limit | passed |
|---|---|---|---|
| tempo | 74 bpm vs asked 150 | not applied: no beat was asked for | yes |
| loudness | -16.0 LUFS installed (decoded MP3 -16.4); candidate was -14.1, gain -1.9 dB | -16 LUFS within 1 dB | yes |
| peak after encode | -2.99 dBFS decoded (pre-encode -3.59) | under -1 dBFS | yes |
| silence | longest 0.20 s under -50 dBFS | under 0.5 s (mellow) | yes |
| brightness | 2.30 % of power above 6 kHz | under 2.5 % (mellow) | yes |
| boominess | 5.42 % below 60 Hz (raw render 18.7 %) | under 12 % | yes |
| onset rate | 3.82 per second | 0.3 to 4.5 | yes |
| loop seam | step 6.42x, tail-head -69.2 dB | not applied: a one-shot, not a loop | yes |

## Heard by a model, not a person

Not listened to: listening is off, or there is no GEMINI_API_KEY in the environment. Nobody on the machine can hear.

## Checks

all automatic checks passed. These are numbers, not hearing: nobody on the machine can hear, the owner listens.
