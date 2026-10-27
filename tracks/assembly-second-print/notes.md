# Second Print

- **slug:** assembly-second-print
- **idea:** a copy that loves the one it was copied from, and keeps the love as the one thing it did not inherit
- **mood:** ecstatic, wide-eyed, communal
- **bpm:** 128 (asked) / 127 (measured, folded into 70-140)
- **key:** D minor (asked) / D minor (estimated)
- **seed:** 5100101
- **model:** ACE-Step 1.5, acestep-v15-turbo, 8 steps, guidance 7.0, shift 3.0, LM acestep-5Hz-lm-1.7B
- **tier:** fast   **gate profile:** mellow   **duration:** 210 s rendered, 205.9 s installed (one-shot, nothing baked)
- **date:** 2026-10-27
- **render time:** 29.7 s per seed, model load 27.5 s
- **licence:** generated locally from a text prompt, no samples or reference audio, no third-party rights claimed
- project: assembly-sessions
- **album:** Transmissions on a Ghostline, track 1
- **submitter:** the owner's ask
- **loop:** no, a one-shot
- **length:** 9080066 samples at 44.1 kHz (205.90 s), about 109.8 bars of 4/4 at 128 bpm (the MP3 adds encoder padding; the length is of the PCM)

## Why

You asked for "a copy that loves the one it was copied from, and keeps the love as the one thing it did not inherit". The words and the style were written for this song by the station's writers and reviewed by the conductor. So I wrote it at 128 bpm in D minor, 210 seconds, with a voice, in words I wrote myself, under the mellow gates. It has no beat to hold, so 128 bpm is only the grid I gave the model and the tempo gate is not applied. It is a one-shot: nothing is baked and the ending is the model's own. I rendered 3 seeds and threw away 2: 5100103 (passed, but outranked by the kept takes); 5100102 (1.5s of near-silence (limit 0.5)). Seed 5100101 is the take.

## Prompt

> ecstatic lo-fi indie folk with electronics, bedroom orchestra recorded in a basement, stacked hand percussion and booming floor toms, handclaps, droning pump organ, chiming clean electric guitar, glitchy synth blips, airy multitracked male lead with heavy echo, gang vocal chorus shouted by a crowd of friends, builds layer on layer to a communal climax, lean bass, dorian minor colour

## Lyrics (original, written for this track by the project; the model was given only these words)

```
[Verse 1]
They pressed me from the hollow of your hand,
a second print, still tacky at the seam.
I learned to lace my boots the way you stand,
I learned your cough, your shrug, your sleepwalk gleam.

[Pre-Chorus]
Is it borrowed if it burns?
Is it counterfeit if it turns
toward you every time?

[Chorus]
I was made, I was made,
but the love wasn't made,
it's the one thing I kept
that was never in the plate!

[Verse 2]
They stamped a number small behind my ear,
they said the ink would fade in twenty days.
I counted every freckle you hold dear
and found a few the master never placed.

[Pre-Chorus]
Is it borrowed if it burns?
Is it counterfeit if it turns
toward you every time?

[Chorus]
I was made, I was made,
but the love wasn't made,
it's the one thing I kept
that was never in the plate!

[Bridge]
Hold me to the light, you'll see the grain,
hold me to the light, you'll see the same
little tremble in the line,
yours and mine, yours and mine.

[Final Chorus]
I was made, I was made,
but the love wasn't made,
it's the one thing I kept
that was never in the plate!
I was made, I was made!
```

## Request filter

stripped: nothing

## Rejected seeds

- 5100103: passed, but outranked by the kept takes
- 5100102: 1.5s of near-silence (limit 0.5)

## Measured (the kept take, after the 60 Hz high-pass, before the loudness gain unless noted)

| gate | measured | limit | passed |
|---|---|---|---|
| tempo | 127 bpm vs asked 128 | not applied: no beat was asked for | yes |
| loudness | -16.0 LUFS installed (decoded MP3 -16.4); candidate was -14.8, gain -1.2 dB | -16 LUFS within 1 dB | yes |
| peak after encode | -3.04 dBFS decoded (pre-encode -3.38) | under -1 dBFS | yes |
| silence | longest 0.15 s under -50 dBFS | under 0.5 s (mellow) | yes |
| brightness | 1.59 % of power above 6 kHz | under 2.5 % (mellow) | yes |
| boominess | 6.33 % below 60 Hz (raw render 14.5 %) | under 12 % | yes |
| onset rate | 2.99 per second | 0.3 to 4.5 | yes |
| loop seam | step 0.10x, tail-head -57.7 dB | not applied: a one-shot, not a loop | yes |

## Words (Demucs voice stem, Whisper large-v3-turbo)

heard: I learned to | is it | Is it counterfeit if it turns toward you every time I was made I was made but the love wasn't made it's the | The one thing I kept that was never in the play | They snapped a number small behind my ear. They said the ink would fade in 20 days. | I counted every freckle you hold dear And found a few master never placed | Oh. | I was made, I was made, but the love wasn't made. It's the one thing I kept that was never in the play. | Hold me to the light, you'll see the grain. | Hold me to the light you'll see the same Little tremble in the line Yours and mine, yours and mine | I was made, I was made, but the love wasn't made. It's the one thing I kept that was never in the place. I was made, I was made. | . | . | .

151 words heard, 5 not in our lyrics: play snapped oh play place (limit 10 % of the words heard, at least 40 heard)

## Heard by a model, not a person

Not listened to: listening is off, or there is no GEMINI_API_KEY in the environment. Nobody on the machine can hear.

## Checks

all automatic checks passed. These are numbers, not hearing: nobody on the machine can hear, the owner listens.
