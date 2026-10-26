# The Horde's Pulse

- **slug:** greytide-workbench-the-hordes-pulse
- **idea:** A breather: the oscilloscope behind the board draws the horde's heartbeat, faster and taller the more of them are alive, a dip for every one that falls
- **mood:** cold, pulsing, eerie
- **bpm:** 126 (asked) / 83 (measured, folded into 70-140)
- **key:** C minor (asked) / F major (estimated)
- **seed:** 3960801
- **model:** ACE-Step 1.5, acestep-v15-turbo, 8 steps, guidance 7.0, shift 3.0, LM acestep-5Hz-lm-1.7B
- **tier:** fast   **gate profile:** mellow   **duration:** 140 s rendered, 136.5 s installed (one-shot, nothing baked)
- **date:** 2026-10-26
- **render time:** 20.6 s per seed, model load 24.6 s
- **licence:** generated locally from a text prompt, no samples or reference audio, no third-party rights claimed
- project: greytide
- **album:** Greytide, track 8
- **submitter:** the radio, for greytide
- **tags:** table:workbench, pov:the-oscilloscope
- **loop:** no, a one-shot
- **length:** 6019829 samples at 44.1 kHz (136.50 s), about 71.7 bars of 4/4 at 126 bpm (the MP3 adds encoder padding; the length is of the PCM)

## Why

You asked for "A breather: the oscilloscope behind the board draws the horde's heartbeat, faster and taller the more of them are alive, a dip for every one that falls". The words and the style were written for this song by the station's writers and reviewed by the conductor. So I wrote it at 126 bpm in C minor, 140 seconds, with no voice, under the mellow gates. It has no beat to hold, so 126 bpm is only the grid I gave the model and the tempo gate is not applied. It is a one-shot: nothing is baked and the ending is the model's own. I rendered 2 seeds and threw away 1: 3960800 (harsh: 4.9% above 6 kHz (ceiling 2.5) and others). Seed 3960801 is the take, but it did not clear every gate: harsh: 2.8% above 6 kHz (ceiling 2.5).

## Prompt

> Instrumental darkwave synth at 126 bpm in C minor, a cold electronic lab: a heartbeat kick pattern that quickens and thickens, a tight lean arpeggiated bass, bass under the mids, a thin oscilloscope-like sine lead tracing the melody, a soft dropout on each phrase end like a beat skipped, a warm pad rising; starts mid with the heartbeat, a long climbing plateau, a dip to a single slowed pulse, a lifted final section, C minor, no harsh highs, instrumental, no vocals

No lyrics: instrumental.

## Request filter

stripped: nothing

## Rejected seeds

- 3960800: harsh: 4.9% above 6 kHz (ceiling 2.5); boomy: 13.7% below 60 Hz (ceiling 12)

## Measured (the kept take, after the 60 Hz high-pass, before the loudness gain unless noted)

| gate | measured | limit | passed |
|---|---|---|---|
| tempo | 83 bpm vs asked 126 | not applied: no beat was asked for | yes |
| loudness | -16.0 LUFS installed (decoded MP3 -16.4); candidate was -15.7, gain -0.3 dB | -16 LUFS within 1 dB | yes |
| peak after encode | -2.44 dBFS decoded (pre-encode -3.31) | under -1 dBFS | yes |
| silence | longest 0.15 s under -50 dBFS | under 0.5 s (mellow) | yes |
| brightness | 2.82 % of power above 6 kHz | under 2.5 % (mellow) | **NO** |
| boominess | 8.26 % below 60 Hz (raw render 21.0 %) | under 12 % | yes |
| onset rate | 4.43 per second | 0.3 to 4.5 | yes |
| loop seam | step 0.99x, tail-head -64.8 dB | not applied: a one-shot, not a loop | yes |

## Heard by a model, not a person

Not listened to: listening is off, or there is no GEMINI_API_KEY in the environment. Nobody on the machine can hear.

## Checks

kept despite failing: harsh: 2.8% above 6 kHz (ceiling 2.5)
