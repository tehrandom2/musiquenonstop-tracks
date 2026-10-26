# Hot Tap

- **slug:** greytide-bathroom-hot-tap
- **idea:** Wave three: the red handle turns a quarter, the pipe knocks twice, steam at the spout, then the stream runs down the road, slick and hissing; a breather built on the old pipe's rhythm.
- **mood:** steamy, hypnotic, rising heat
- **bpm:** 132 (asked) / 131 (measured, folded into 70-140)
- **key:** F minor (asked) / F major (estimated)
- **seed:** 3940400
- **model:** ACE-Step 1.5, acestep-v15-turbo, 8 steps, guidance 7.0, shift 3.0, LM acestep-5Hz-lm-1.7B
- **tier:** fast   **gate profile:** mellow   **duration:** 135 s rendered, 132.0 s installed (one-shot, nothing baked)
- **date:** 2026-10-26
- **render time:** 20.1 s per seed, model load 24.6 s
- **licence:** generated locally from a text prompt, no samples or reference audio, no third-party rights claimed
- project: greytide
- **album:** Greytide, track 4
- **submitter:** the radio, for greytide
- **tags:** table:bathroom, pov:the hot tap
- **loop:** no, a one-shot
- **length:** 5820060 samples at 44.1 kHz (131.97 s), about 72.6 bars of 4/4 at 132 bpm (the MP3 adds encoder padding; the length is of the PCM)

## Why

You asked for "Wave three: the red handle turns a quarter, the pipe knocks twice, steam at the spout, then the stream runs down the road, slick and hissing; a breather built on the old pipe's rhythm.". The words and the style were written for this song by the station's writers and reviewed by the conductor. So I wrote it at 132 bpm in F minor, 135 seconds, with no voice, under the mellow gates. It has no beat to hold, so 132 bpm is only the grid I gave the model and the tempo gate is not applied. It is a one-shot: nothing is baked and the ending is the model's own. I rendered 2 seeds and threw away 1: 3940401 (harsh: 2.9% above 6 kHz (ceiling 2.5)). Seed 3940400 is the take.

## Prompt

> Dub techno, 132 bpm, F minor. The ensemble: a steady four-on-the-floor kick, a tight, lean bass pulse under the mids, a knocking metallic percussion like an old pipe playing the groove, a chord stab echoing into long delays, a warm hissing steam texture kept soft, a rising filtered pad. Mood: steamy and hypnotic, heat building. Arc: the pipe knocks alone, the kick and bass in, the chord stabs at full height, a breakdown to knocks and steam, the final section lifted with the delays opened wide, a short outro. F minor, no harsh highs, instrumental, no vocals.

No lyrics: instrumental.

## Request filter

stripped: nothing

## Rejected seeds

- 3940401: harsh: 2.9% above 6 kHz (ceiling 2.5)

## Measured (the kept take, after the 60 Hz high-pass, before the loudness gain unless noted)

| gate | measured | limit | passed |
|---|---|---|---|
| tempo | 131 bpm vs asked 132 | not applied: no beat was asked for | yes |
| loudness | -16.0 LUFS installed (decoded MP3 -16.4); candidate was -14.4, gain -1.6 dB | -16 LUFS within 1 dB | yes |
| peak after encode | -2.89 dBFS decoded (pre-encode -3.49) | under -1 dBFS | yes |
| silence | longest 0.15 s under -50 dBFS | under 0.5 s (mellow) | yes |
| brightness | 2.38 % of power above 6 kHz | under 2.5 % (mellow) | yes |
| boominess | 4.28 % below 60 Hz (raw render 12.0 %) | under 12 % | yes |
| onset rate | 3.92 per second | 0.3 to 4.5 | yes |
| loop seam | step 0.01x, tail-head -64.3 dB | not applied: a one-shot, not a loop | yes |

## Heard by a model, not a person

Not listened to: listening is off, or there is no GEMINI_API_KEY in the environment. Nobody on the machine can hear.

## Checks

all automatic checks passed. These are numbers, not hearing: nobody on the machine can hear, the owner listens.
