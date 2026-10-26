# Trestle Over the Gorge

- **slug:** greytide-railway-trestle-over-the-gorge
- **idea:** Wave eight: a breather high on the timber trestle over the river gorge and the footbridge beside it, where grey dudes cross the drop
- **mood:** tender, wide, still
- **bpm:** 124 (asked) / 124 (measured, folded into 70-140)
- **key:** B minor (asked) / B minor (estimated)
- **seed:** 4060801
- **model:** ACE-Step 1.5, acestep-v15-turbo, 8 steps, guidance 7.0, shift 3.0, LM acestep-5Hz-lm-1.7B
- **tier:** fast   **gate profile:** mellow   **duration:** 135 s rendered, 130.4 s installed (one-shot, nothing baked)
- **date:** 2026-10-26
- **render time:** 19.8 s per seed, model load 24.6 s
- **licence:** generated locally from a text prompt, no samples or reference audio, no third-party rights claimed
- project: greytide
- **album:** Greytide, track 8
- **submitter:** the radio, for greytide
- **tags:** table:railway, pov:the-trestle
- **loop:** no, a one-shot
- **length:** 5749766 samples at 44.1 kHz (130.38 s), about 67.4 bars of 4/4 at 124 bpm (the MP3 adds encoder padding; the length is of the PCM)

## Why

You asked for "Wave eight: a breather high on the timber trestle over the river gorge and the footbridge beside it, where grey dudes cross the drop". The words and the style were written for this song by the station's writers and reviewed by the conductor. So I wrote it at 124 bpm in B minor, 135 seconds, with no voice, under the mellow gates. It has no beat to hold, so 124 bpm is only the grid I gave the model and the tempo gate is not applied. It is a one-shot: nothing is baked and the ending is the model's own. I rendered 2 seeds and threw away 1: 4060800 (boomy: 22.9% below 60 Hz (ceiling 12)). Seed 4060801 is the take, but it did not clear every gate: 1.2s of near-silence (limit 0.5).

## Prompt

> Cinematic folk-western instrumental, 124 bpm, in B minor, a small string-band breather: a fingerpicked acoustic guitar ostinato, a cello carrying the long melody, a tight lean upright bass under the mids on a steady two-beat like wheels on timber, brushed snare clicking a train rhythm, a lap steel answering the cello with slow slides, a soft wordless hum of the river as a pad, the key B minor held; arc: a lone guitar intro, the band joins at mid level, a high plateau with cello and lap steel in harmony, a dip to guitar and river hum on the trestle, a final lift as the train crosses, a quiet tail, tender and wide, no harsh highs, instrumental, no vocals

No lyrics: instrumental.

## Request filter

stripped: nothing

## Rejected seeds

- 4060800: boomy: 22.9% below 60 Hz (ceiling 12)

## Measured (the kept take, after the 60 Hz high-pass, before the loudness gain unless noted)

| gate | measured | limit | passed |
|---|---|---|---|
| tempo | 124 bpm vs asked 124 | not applied: no beat was asked for | yes |
| loudness | -16.0 LUFS installed (decoded MP3 -16.4); candidate was -15.4, gain -0.6 dB | -16 LUFS within 1 dB | yes |
| peak after encode | -2.61 dBFS decoded (pre-encode -3.22) | under -1 dBFS | yes |
| silence | longest 1.20 s under -50 dBFS | under 0.5 s (mellow) | **NO** |
| brightness | 0.21 % of power above 6 kHz | under 2.5 % (mellow) | yes |
| boominess | 5.89 % below 60 Hz (raw render 19.5 %) | under 12 % | yes |
| onset rate | 1.67 per second | 0.3 to 4.5 | yes |
| loop seam | step 0.02x, tail-head -36.1 dB | not applied: a one-shot, not a loop | yes |

## Heard by a model, not a person

Not listened to: listening is off, or there is no GEMINI_API_KEY in the environment. Nobody on the machine can hear.

## Checks

kept despite failing: 1.2s of near-silence (limit 0.5)
