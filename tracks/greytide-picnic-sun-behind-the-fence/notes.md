# Sun Behind the Fence

- **slug:** greytide-picnic-sun-behind-the-fence
- **idea:** Wave seven: the sun drops behind the fence, the light turns blue and long, and the fairy lights on the washing line come on; a breather
- **mood:** hazy, blue, tender
- **bpm:** 132 (asked) / 132 (measured, folded into 70-140)
- **key:** C minor (asked) / G minor (estimated)
- **seed:** 4000701
- **model:** ACE-Step 1.5, acestep-v15-turbo, 8 steps, guidance 7.0, shift 3.0, LM acestep-5Hz-lm-1.7B
- **tier:** fast   **gate profile:** mellow   **duration:** 140 s rendered, 130.3 s installed (one-shot, nothing baked)
- **date:** 2026-10-26
- **render time:** 20.6 s per seed, model load 24.6 s
- **licence:** generated locally from a text prompt, no samples or reference audio, no third-party rights claimed
- project: greytide
- **album:** Greytide, track 7
- **submitter:** the radio, for greytide
- **tags:** table:picnic, pov:the evening
- **loop:** no, a one-shot
- **length:** 5748132 samples at 44.1 kHz (130.34 s), about 71.7 bars of 4/4 at 132 bpm (the MP3 adds encoder padding; the length is of the PCM)

## Why

You asked for "Wave seven: the sun drops behind the fence, the light turns blue and long, and the fairy lights on the washing line come on; a breather". The words and the style were written for this song by the station's writers and reviewed by the conductor. So I wrote it at 132 bpm in C minor, 140 seconds, with no voice, under the mellow gates. It has no beat to hold, so 132 bpm is only the grid I gave the model and the tempo gate is not applied. It is a one-shot: nothing is baked and the ending is the model's own. I rendered 2 seeds and threw away 1: 4000700 (0.7s of near-silence (limit 0.5) and others). Seed 4000701 is the take.

## Prompt

> Dream-pop instrumental, 132 bpm, C minor: a chorused clean guitar playing a slow shimmering melody, a tight lean bass, bass under the mids, carrying a gentle walking line, a soft drum machine with a steady snare and shaker, a warm analogue synth pad that swells in long blue chords, a glockenspiel answering the guitar in small twinkles; hazy, no harsh highs; starts mid on pad and bass, a long glowing plateau, one dip to pad and glockenspiel, a final lift with every part, C minor, instrumental, no vocals

No lyrics: instrumental.

## Request filter

stripped: nothing

## Rejected seeds

- 4000700: 0.7s of near-silence (limit 0.5); harsh: 3.1% above 6 kHz (ceiling 2.5)

## Measured (the kept take, after the 60 Hz high-pass, before the loudness gain unless noted)

| gate | measured | limit | passed |
|---|---|---|---|
| tempo | 132 bpm vs asked 132 | not applied: no beat was asked for | yes |
| loudness | -16.0 LUFS installed (decoded MP3 -16.4); candidate was -15.6, gain -0.4 dB | -16 LUFS within 1 dB | yes |
| peak after encode | -2.89 dBFS decoded (pre-encode -3.22) | under -1 dBFS | yes |
| silence | longest 0.10 s under -50 dBFS | under 0.5 s (mellow) | yes |
| brightness | 1.52 % of power above 6 kHz | under 2.5 % (mellow) | yes |
| boominess | 7.07 % below 60 Hz (raw render 23.9 %) | under 12 % | yes |
| onset rate | 3.92 per second | 0.3 to 4.5 | yes |
| loop seam | step 0.01x, tail-head -58.1 dB | not applied: a one-shot, not a loop | yes |

## Heard by a model, not a person

Not listened to: listening is off, or there is no GEMINI_API_KEY in the environment. Nobody on the machine can hear.

## Checks

all automatic checks passed. These are numbers, not hearing: nobody on the machine can hear, the owner listens.
