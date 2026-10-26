# You Are On Your Own

- **slug:** greytide-treehouse-you-are-on-your-own
- **idea:** After wave two a gust snatches the guide's signposts and tape arrows off the floor and out over the doorway: you are on your own; the table's point of view.
- **mood:** wide, restless, gusting
- **bpm:** 138 (asked) / 134 (measured, folded into 70-140)
- **key:** E minor (asked) / A minor (estimated)
- **seed:** 4040300
- **model:** ACE-Step 1.5, acestep-v15-turbo, 8 steps, guidance 7.0, shift 3.0, LM acestep-5Hz-lm-1.7B
- **tier:** fast   **gate profile:** mellow   **duration:** 136 s rendered, 121.5 s installed (one-shot, nothing baked)
- **date:** 2026-10-26
- **render time:** 19.9 s per seed, model load 24.6 s
- **licence:** generated locally from a text prompt, no samples or reference audio, no third-party rights claimed
- project: greytide
- **album:** Greytide, track 3
- **submitter:** the radio, for greytide
- **tags:** table:treehouse, pov:the table
- **loop:** no, a one-shot
- **length:** 5359983 samples at 44.1 kHz (121.54 s), about 69.9 bars of 4/4 at 138 bpm (the MP3 adds encoder padding; the length is of the PCM)

## Why

You asked for "After wave two a gust snatches the guide's signposts and tape arrows off the floor and out over the doorway: you are on your own; the table's point of view.". The words and the style were written for this song by the station's writers and reviewed by the conductor. So I wrote it at 138 bpm in E minor, 136 seconds, with no voice, under the mellow gates. It has no beat to hold, so 138 bpm is only the grid I gave the model and the tempo gate is not applied. It is a one-shot: nothing is baked and the ending is the model's own. I rendered 2 seeds and threw away 1: 4040301 (1.1s of near-silence (limit 0.5)). Seed 4040300 is the take, but it did not clear every gate: 0.6s of near-silence (limit 0.5); boomy: 13.1% below 60 Hz (ceiling 12).

## Prompt

> Gusting post-rock, 138 bpm, E minor, wide and restless. A four-piece with every part in its lane: two electric guitars, one tremolo-picking a high figure and one ringing open chords with long delay, tight lean bass under the mids holding root notes, driving floor-tom drums building to full kit, a breathy wind texture in the gaps. Arc: wind and one guitar, the band joins at mid energy, a long high plateau as the gust takes everything, a dip to bass and wind, a final surging lift, then it lets go into wind. E minor, no harsh highs, instrumental, no vocals.

No lyrics: instrumental.

## Request filter

stripped: nothing

## Rejected seeds

- 4040301: 1.1s of near-silence (limit 0.5)

## Measured (the kept take, after the 60 Hz high-pass, before the loudness gain unless noted)

| gate | measured | limit | passed |
|---|---|---|---|
| tempo | 134 bpm vs asked 138 | not applied: no beat was asked for | yes |
| loudness | -16.0 LUFS installed (decoded MP3 -16.4); candidate was -13.3, gain -2.7 dB | -16 LUFS within 1 dB | yes |
| peak after encode | -3.36 dBFS decoded (pre-encode -3.76) | under -1 dBFS | yes |
| silence | longest 0.55 s under -50 dBFS | under 0.5 s (mellow) | **NO** |
| brightness | 1.25 % of power above 6 kHz | under 2.5 % (mellow) | yes |
| boominess | 13.10 % below 60 Hz (raw render 30.0 %) | under 12 % | **NO** |
| onset rate | 3.89 per second | 0.3 to 4.5 | yes |
| loop seam | step 0.04x, tail-head -35.5 dB | not applied: a one-shot, not a loop | yes |

## Heard by a model, not a person

Not listened to: listening is off, or there is no GEMINI_API_KEY in the environment. Nobody on the machine can hear.

## Checks

kept despite failing: 0.6s of near-silence (limit 0.5); boomy: 13.1% below 60 Hz (ceiling 12)
