# First One Painted

- **slug:** greytide-attic-first-one-painted
- **idea:** Wave nine: the mouse pushes a forgotten painted mini out of its hole to guard the exit; it is the first mini the painter ever painted, as a child
- **mood:** aching, heroic, tender
- **bpm:** 140 (asked) / 138 (measured, folded into 70-140)
- **key:** B minor (asked) / D major (estimated)
- **seed:** 3980900
- **model:** ACE-Step 1.5, acestep-v15-turbo, 8 steps, guidance 7.0, shift 3.0, LM acestep-5Hz-lm-1.7B
- **tier:** fast   **gate profile:** mellow   **duration:** 178 s rendered, 175.0 s installed (one-shot, nothing baked)
- **date:** 2026-10-26
- **render time:** 25.9 s per seed, model load 24.6 s
- **licence:** generated locally from a text prompt, no samples or reference audio, no third-party rights claimed
- project: greytide
- **album:** Greytide, track 9
- **submitter:** the radio, for greytide
- **tags:** table:attic, pov:forgotten-mini
- **loop:** no, a one-shot
- **length:** 7718367 samples at 44.1 kHz (175.02 s), about 102.1 bars of 4/4 at 140 bpm (the MP3 adds encoder padding; the length is of the PCM)

## Why

You asked for "Wave nine: the mouse pushes a forgotten painted mini out of its hole to guard the exit; it is the first mini the painter ever painted, as a child". The words and the style were written for this song by the station's writers and reviewed by the conductor. So I wrote it at 140 bpm in B minor, 178 seconds, with a voice, in words I wrote myself, under the mellow gates. It has no beat to hold, so 140 bpm is only the grid I gave the model and the tempo gate is not applied. It is a one-shot: nothing is baked and the ending is the model's own. I rendered 2 seeds and threw away 1: 3980901 (passed, but outranked by the kept takes). Seed 3980900 is the take.

## Prompt

> Heartland rock ballad that builds, 140 bpm with a half-time feel in the verses, B minor, aching and heroic: a warm piano leading alone at first, a tight lean bass under the mids, chiming clean electric guitars, a swelling organ, big open drums arriving in the second chorus, a small choir on the final chorus, a warm male tenor lead, plain and true, rising to full voice, in B minor; intro of piano alone, verses tender, choruses rising, a bridge of piano and voice that builds back with the band, the final chorus at full height with choir, the outro back to piano, no harsh highs

## Lyrics (original, written for this track by the project; the model was given only these words)

```
[Intro: piano alone]

[Verse 1]
I was the first one ever, painted at the age of nine
Too much red upon the cloak and the gold outside the line
Thick as jam the colour went, they held me up to see
Then the years went on without me and the cartons covered me

[Pre-Chorus]
Behind the boxes in the dark
A mouse made me a home out of the signs

[Chorus]
Out of the hole and down to the exit
Thick old paint and a crooked shield
They forgot me, I never forgot them
First one painted, last one in the field

[Verse 2]
Wave nine, the carton scratches and the mouse begins to push
Out across the dusty board through the bulb-swung hush
I stand where nothing else would stand, the last one at the end
The paint is old, the hand is grown, but I remember, friend

[Pre-Chorus]
Behind the boxes in the dark
A mouse made me a home out of the signs

[Chorus]
Out of the hole and down to the exit
Thick old paint and a crooked shield
They forgot me, I never forgot them
First one painted, last one in the field

[Bridge: piano and voice, then the band builds back]
That steady hand that paints them now
It practised once on me
Every careful line it draws
Started crooked, started free

[Final Chorus: full height, choir]
Out of the hole and down to the exit
Thick old paint and a crooked shield
They forgot me, I never forgot them
First one painted, last one in the field

[Outro: piano alone]
First one painted
Last one in the field
```

## Request filter

stripped: nothing

## Rejected seeds

- 3980901: passed, but outranked by the kept takes

## Measured (the kept take, after the 60 Hz high-pass, before the loudness gain unless noted)

| gate | measured | limit | passed |
|---|---|---|---|
| tempo | 138 bpm vs asked 140 | not applied: no beat was asked for | yes |
| loudness | -16.0 LUFS installed (decoded MP3 -16.4); candidate was -14.2, gain -1.8 dB | -16 LUFS within 1 dB | yes |
| peak after encode | -3.54 dBFS decoded (pre-encode -3.50) | under -1 dBFS | yes |
| silence | longest 0.15 s under -50 dBFS | under 0.5 s (mellow) | yes |
| brightness | 2.28 % of power above 6 kHz | under 2.5 % (mellow) | yes |
| boominess | 5.26 % below 60 Hz (raw render 13.4 %) | under 12 % | yes |
| onset rate | 2.41 per second | 0.3 to 4.5 | yes |
| loop seam | step 0.01x, tail-head -53.4 dB | not applied: a one-shot, not a loop | yes |

## Words (Demucs voice stem, Whisper large-v3-turbo)

heard: I was the first one ever painted at the age of nine. Too much red upon me. | The cloak and the gold outside the line Thick as jam the color when they held me up to sea Then the years went on without me | And the cartons covered me Behind the boxes in the dark A mouse made me a home out of the side | Out of the hole and down to the exit, fickle planes and a crooked shield. They forgot me, I never forgot them, first one page in the | Last one in the field. Wave nine, the carton scratches and the mouse begins to push. Out across the dusty board, through the | The paint is old, the hand is gone, but I remember... | I'm a friend. Behind the boxes in the dark. A mouse made me a home out of the signs. | Out of the hole and down to the exit, thick old paint and a crooked shield. They forgot me, I never forgot them. First one painted, last one in the heat. | That steady hand that paints them now it practiced once on me every careful line is | Out of the hole and down to the exit, the gold veins and the crooked shield, they forgot the undead. | First one painted. | Last one in the field.

220 words heard, 13 not in our lyrics: color when sea side fickle planes page gone i'm heat practiced veins undead (limit 10 % of the words heard, at least 40 heard)

## Heard by a model, not a person

Not listened to: listening is off, or there is no GEMINI_API_KEY in the environment. Nobody on the machine can hear.

## Checks

all automatic checks passed. These are numbers, not hearing: nobody on the machine can hear, the owner listens.
