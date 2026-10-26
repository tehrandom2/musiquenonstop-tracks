# Nobody Finds the Dead Bulb

- **slug:** greytide-attic-nobody-finds-the-dead-bulb
- **idea:** The Christmas box tower's fairy lights hop from grey dude to grey dude; one of them is the kit a child unwrapped under the tree years ago and never built
- **mood:** wondrous, nostalgic, bittersweet
- **bpm:** 132 (asked) / 131 (measured, folded into 70-140)
- **key:** G minor (asked) / D minor (estimated)
- **seed:** 3980601
- **model:** ACE-Step 1.5, acestep-v15-turbo, 8 steps, guidance 7.0, shift 3.0, LM acestep-5Hz-lm-1.7B
- **tier:** fast   **gate profile:** mellow   **duration:** 172 s rendered, 166.9 s installed (one-shot, nothing baked)
- **date:** 2026-10-26
- **render time:** 24.8 s per seed, model load 24.6 s
- **licence:** generated locally from a text prompt, no samples or reference audio, no third-party rights claimed
- project: greytide
- **album:** Greytide, track 6
- **submitter:** the radio, for greytide
- **tags:** table:attic, pov:tower
- **loop:** no, a one-shot
- **length:** 7361884 samples at 44.1 kHz (166.94 s), about 91.8 bars of 4/4 at 132 bpm (the MP3 adds encoder padding; the length is of the PCM)

## Why

You asked for "The Christmas box tower's fairy lights hop from grey dude to grey dude; one of them is the kit a child unwrapped under the tree years ago and never built". The words and the style were written for this song by the station's writers and reviewed by the conductor. So I wrote it at 132 bpm in G minor, 172 seconds, with a voice, in words I wrote myself, under the mellow gates. It has no beat to hold, so 132 bpm is only the grid I gave the model and the tempo gate is not applied. It is a one-shot: nothing is baked and the ending is the model's own. I rendered 2 seeds and threw away 1: 3980600 (1.1s of near-silence (limit 0.5) and others). Seed 3980601 is the take.

## Prompt

> Glittering synthpop, 132 bpm, G minor, wondrous and nostalgic: a crisp electronic drum kit with a gated snare, a tight lean synth bass pulsing under the mids, twinkling bell arpeggios hopping across the stereo field like lights jumping, soft sleigh-bell shakers in the choruses, warm analog pads in G minor, a clear female lead full of wonder with soft stacked harmonies, in G minor; intro of twinkling arpeggios alone, verses warm and close, the chorus bright and lifted, a bridge that drops to pad and voice, the final chorus with every harmony, the outro back to one twinkle, no harsh highs

## Lyrics (original, written for this track by the project; the model was given only these words)

```
[Intro: twinkling arpeggios alone]

[Verse 1]
Eleven months a tangle in a box beneath the eaves
One month on the branches, then the branches take their leave
Now the grey come up the alleys and I'm plugged into the dark
I leave the star and light the first and leap from spark to spark

[Pre-Chorus]
Red, then green, then gold, then blue

[Chorus]
Hop from one to the next one, light them up in a row
Every colour a memory of a morning in the snow
Five little grey ones glowing like a tree they never had
Nobody finds the dead bulb, nobody ever has

[Verse 2]
Somebody small once sat below me with a box upon their knee
A model kit with painted art, the first they'd ever see
They never built it, it's up here now, it's somewhere in the pile
And now it's coming up the alley, so I light it for a while

[Pre-Chorus]
Red, then green, then gold, then blue

[Chorus]
Hop from one to the next one, light them up in a row
Every colour a memory of a morning in the snow
Five little grey ones glowing like a tree they never had
Nobody finds the dead bulb, nobody ever has

[Bridge: pad and voice]
One bulb in the string is dead, it's always been that way
Every year they try them all and give up on the day
Maybe it's the one that watched them open up that lid
Maybe it's just resting, after everything it did

[Final Chorus: lifted, every harmony]
Hop from one to the next one, light them up in a row
Every colour a memory of a morning in the snow
Five little grey ones glowing like a tree they never had
Nobody finds the dead bulb, nobody ever has

[Outro: one twinkle]
Nobody ever has
```

## Request filter

stripped: The Christmas

## Rejected seeds

- 3980600: 1.1s of near-silence (limit 0.5); 19 of 157 heard words are not ours (12 %; limit 10 %, at least 40 heard): are tangled these leaves great starlight spar love thank you blown color

## Measured (the kept take, after the 60 Hz high-pass, before the loudness gain unless noted)

| gate | measured | limit | passed |
|---|---|---|---|
| tempo | 131 bpm vs asked 132 | not applied: no beat was asked for | yes |
| loudness | -16.0 LUFS installed (decoded MP3 -16.4); candidate was -14.2, gain -1.8 dB | -16 LUFS within 1 dB | yes |
| peak after encode | -3.62 dBFS decoded (pre-encode -3.60) | under -1 dBFS | yes |
| silence | longest 0.35 s under -50 dBFS | under 0.5 s (mellow) | yes |
| brightness | 1.88 % of power above 6 kHz | under 2.5 % (mellow) | yes |
| boominess | 9.66 % below 60 Hz (raw render 23.7 %) | under 12 % | yes |
| onset rate | 2.88 per second | 0.3 to 4.5 | yes |
| loop seam | step 0.02x, tail-head -44.3 dB | not applied: a one-shot, not a loop | yes |

## Words (Demucs voice stem, Whisper large-v3-turbo)

heard: 11 months of tangled in a box beneath the eaves One month on the branches, then the branches take their leave Now the great come up | the alleys and I'm plugged into the dark I leave the star and like a first and leap from spark to spark then green then gold then blue | Every | Glowing like a tree they never had. Nobody finds the dead ball. Nobody ever has. Somebody small once sat below me with a box of | Red and green. | Every | Nobody ever had. | String is dead. It's always been that way Every year they try them all and give up on | Maybe it's just resting after everything | Every color a memory of a morning in the snow. | Five little grey ones Glowing like a tree they never had Nobody finds the dead bone Nobody ever had, no | Nobody ever had

143 words heard, 6 not in our lyrics: tangled great ball color bone no (limit 10 % of the words heard, at least 40 heard)

## Heard by a model, not a person

Not listened to: listening is off, or there is no GEMINI_API_KEY in the environment. Nobody on the machine can hear.

## Checks

all automatic checks passed. These are numbers, not hearing: nobody on the machine can hear, the owner listens.
