# Someone Kicked the Fuzz On

- **slug:** greytide-garage-someone-kicked-the-fuzz
- **idea:** Wave seven: a boot kicks the fuzz pedal on and the rail by the pedalboard shakes; walkers buzz sideways and their shields rattle off
- **mood:** heavy, rattling, gleeful
- **bpm:** 140 (asked) / 138 (measured, folded into 70-140)
- **key:** E minor (asked) / E minor (estimated)
- **seed:** 3990701
- **model:** ACE-Step 1.5, acestep-v15-turbo, 8 steps, guidance 7.0, shift 3.0, LM acestep-5Hz-lm-1.7B
- **tier:** fast   **gate profile:** mellow   **duration:** 140 s rendered, 137.8 s installed (one-shot, nothing baked)
- **date:** 2026-10-26
- **render time:** 20.4 s per seed, model load 24.6 s
- **licence:** generated locally from a text prompt, no samples or reference audio, no third-party rights claimed
- project: greytide
- **album:** Greytide, track 7
- **submitter:** the radio, for greytide
- **tags:** table:garage, pov:the fuzz pedal
- **loop:** no, a one-shot
- **length:** 6076150 samples at 44.1 kHz (137.78 s), about 80.4 bars of 4/4 at 140 bpm (the MP3 adds encoder padding; the length is of the PCM)

## Why

You asked for "Wave seven: a boot kicks the fuzz pedal on and the rail by the pedalboard shakes; walkers buzz sideways and their shields rattle off". The words and the style were written for this song by the station's writers and reviewed by the conductor. So I wrote it at 140 bpm in E minor, 140 seconds, with no voice, under the mellow gates. It has no beat to hold, so 140 bpm is only the grid I gave the model and the tempo gate is not applied. It is a one-shot: nothing is baked and the ending is the model's own. I rendered 2 seeds and threw away 1: 3990700 (0.8s of near-silence (limit 0.5)). Seed 3990701 is the take.

## Prompt

> Stoner fuzz rock instrumental, 140 bpm, E minor: a huge fuzzed baritone guitar riff in the mids, a second guitar with a wah answering it, a tight lean bass, bass under the mids, locked to the riff, a drummer driving on a ride cymbal and a heavy snare, a buzzing organ in the gaps; warm thick saturation in the mids, no harsh highs; starts mid on the riff, a long churning plateau, a dip where only bass and drums shake, then a final lift with both guitars and the organ, E minor, instrumental, no vocals

No lyrics: instrumental.

## Request filter

stripped: nothing

## Rejected seeds

- 3990700: 0.8s of near-silence (limit 0.5)

## Measured (the kept take, after the 60 Hz high-pass, before the loudness gain unless noted)

| gate | measured | limit | passed |
|---|---|---|---|
| tempo | 138 bpm vs asked 140 | not applied: no beat was asked for | yes |
| loudness | -16.0 LUFS installed (decoded MP3 -16.4); candidate was -14.0, gain -2.0 dB | -16 LUFS within 1 dB | yes |
| peak after encode | -3.65 dBFS decoded (pre-encode -3.53) | under -1 dBFS | yes |
| silence | longest 0.10 s under -50 dBFS | under 0.5 s (mellow) | yes |
| brightness | 1.12 % of power above 6 kHz | under 2.5 % (mellow) | yes |
| boominess | 4.94 % below 60 Hz (raw render 21.3 %) | under 12 % | yes |
| onset rate | 2.50 per second | 0.3 to 4.5 | yes |
| loop seam | step 0.00x, tail-head -64.8 dB | not applied: a one-shot, not a loop | yes |

## Heard by a model, not a person

Not listened to: listening is off, or there is no GEMINI_API_KEY in the environment. Nobody on the machine can hear.

## Checks

all automatic checks passed. These are numbers, not hearing: nobody on the machine can hear, the owner listens.
