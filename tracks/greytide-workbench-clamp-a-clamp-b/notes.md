# Clamp A, Clamp B

- **slug:** greytide-workbench-clamp-a-clamp-b
- **idea:** A breather: the two swinging C-clamps on the belt, gate A and gate B, stopping the horde in a bunch and letting it go just as the vice begins to shut
- **mood:** hypnotic, squelching, tense
- **bpm:** 128 (asked) / 127 (measured, folded into 70-140)
- **key:** D minor (asked) / D minor (estimated)
- **seed:** 3960301
- **model:** ACE-Step 1.5, acestep-v15-turbo, 8 steps, guidance 7.0, shift 3.0, LM acestep-5Hz-lm-1.7B
- **tier:** fast   **gate profile:** mellow   **duration:** 135 s rendered, 127.9 s installed (one-shot, nothing baked)
- **date:** 2026-10-26
- **render time:** 20.2 s per seed, model load 24.6 s
- **licence:** generated locally from a text prompt, no samples or reference audio, no third-party rights claimed
- project: greytide
- **album:** Greytide, track 3
- **submitter:** the radio, for greytide
- **tags:** table:workbench, pov:the-clamps
- **loop:** no, a one-shot
- **length:** 5641174 samples at 44.1 kHz (127.92 s), about 68.2 bars of 4/4 at 128 bpm (the MP3 adds encoder padding; the length is of the PCM)

## Why

You asked for "A breather: the two swinging C-clamps on the belt, gate A and gate B, stopping the horde in a bunch and letting it go just as the vice begins to shut". The words and the style were written for this song by the station's writers and reviewed by the conductor. So I wrote it at 128 bpm in D minor, 135 seconds, with no voice, under the mellow gates. It has no beat to hold, so 128 bpm is only the grid I gave the model and the tempo gate is not applied. It is a one-shot: nothing is baked and the ending is the model's own. I rendered 2 seeds and threw away 1: 3960300 (onset rate 5.1/s outside 0.3-4.5). Seed 3960301 is the take.

## Prompt

> Instrumental acid techno at 128 bpm in D minor, a two-machine lane: a dry four-on-the-floor kick, a squelching tight lean acid bass line, bass under the mids, a metallic hat pattern, a swinging percussive clank that stops dead and restarts like a clamp gate, a chord stab that gathers and releases; starts mid, the line builds into a long high plateau, a stop-and-bunch breakdown, a lifted final section, D minor, saturation in the mids, no harsh highs, instrumental, no vocals

No lyrics: instrumental.

## Request filter

stripped: nothing

## Rejected seeds

- 3960300: onset rate 5.1/s outside 0.3-4.5

## Measured (the kept take, after the 60 Hz high-pass, before the loudness gain unless noted)

| gate | measured | limit | passed |
|---|---|---|---|
| tempo | 127 bpm vs asked 128 | not applied: no beat was asked for | yes |
| loudness | -16.0 LUFS installed (decoded MP3 -16.4); candidate was -15.4, gain -0.7 dB | -16 LUFS within 1 dB | yes |
| peak after encode | -2.54 dBFS decoded (pre-encode -3.28) | under -1 dBFS | yes |
| silence | longest 0.25 s under -50 dBFS | under 0.5 s (mellow) | yes |
| brightness | 2.44 % of power above 6 kHz | under 2.5 % (mellow) | yes |
| boominess | 10.21 % below 60 Hz (raw render 19.7 %) | under 12 % | yes |
| onset rate | 3.06 per second | 0.3 to 4.5 | yes |
| loop seam | step 1.43x, tail-head -57.3 dB | not applied: a one-shot, not a loop | yes |

## Heard by a model, not a person

Not listened to: listening is off, or there is no GEMINI_API_KEY in the environment. Nobody on the machine can hear.

## Checks

all automatic checks passed. These are numbers, not hearing: nobody on the machine can hear, the owner listens.
