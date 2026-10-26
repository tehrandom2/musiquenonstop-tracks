# A Stack Fell

- **slug:** greytide-attic-a-stack-fell
- **idea:** A grey dude in the alleys watches a leaning stack of kit boxes fall, bury his road and swing the bare bulb; the road is taped down again
- **mood:** heavy, suspenseful, awed
- **bpm:** 132 (asked) / 131 (measured, folded into 70-140)
- **key:** D minor (asked) / D major (estimated)
- **seed:** 3980301
- **model:** ACE-Step 1.5, acestep-v15-turbo, 8 steps, guidance 7.0, shift 3.0, LM acestep-5Hz-lm-1.7B
- **tier:** fast   **gate profile:** mellow   **duration:** 168 s rendered, 160.3 s installed (one-shot, nothing baked)
- **date:** 2026-10-26
- **render time:** 24.9 s per seed, model load 24.6 s
- **licence:** generated locally from a text prompt, no samples or reference audio, no third-party rights claimed
- project: greytide
- **album:** Greytide, track 3
- **submitter:** the radio, for greytide
- **tags:** table:attic, pov:grey-dude
- **loop:** no, a one-shot
- **length:** 7071173 samples at 44.1 kHz (160.34 s), about 88.2 bars of 4/4 at 132 bpm (the MP3 adds encoder padding; the length is of the PCM)

## Why

You asked for "A grey dude in the alleys watches a leaning stack of kit boxes fall, bury his road and swing the bare bulb; the road is taped down again". The words and the style were written for this song by the station's writers and reviewed by the conductor. So I wrote it at 132 bpm in D minor, 168 seconds, with a voice, in words I wrote myself, under the mellow gates. It has no beat to hold, so 132 bpm is only the grid I gave the model and the tempo gate is not applied. It is a one-shot: nothing is baked and the ending is the model's own. I rendered 2 seeds and threw away 1: 3980300 (harsh: 3.8% above 6 kHz (ceiling 2.5)). Seed 3980301 is the take, but it did not clear every gate: harsh: 2.8% above 6 kHz (ceiling 2.5).

## Prompt

> Industrial rock, 132 bpm, D minor, heavy and suspenseful: a pounding drum kit layered with clanking metal and cardboard-thud percussion, a tight lean bass pulsing eighths under the mids, a chugging distorted guitar in the mids, a cold pulsing synth arpeggio in D minor, long creaking textures before each chorus, a commanding male lead, half-spoken in the verses and sung full in the chorus, with a shouted gang answer, in D minor; intro of a creak and the pulse before the drums crash in, tense verses, a crushing chorus, a breakdown to drums and a chant, the final chorus lifted, the outro slowing like a swing coming to rest, no harsh highs

## Lyrics (original, written for this track by the project; the model was given only these words)

```
[Intro: a long creak and the synth pulse, then the drums crash in]

[Verse 1]
Yellow and black at the edge of the top
The stack leans further every wave, it won't stop
It creaked on wave one and it groaned on wave two
The hatching on the shelf says it's coming for you

[Pre-Chorus]
Shudder, shudder
Three seconds long

[Chorus]
A stack fell, the road is redrawn
The alley I walked in is buried and gone
The bulb swings away and the shadows run wild
A stack fell, the road is redrawn

[Verse 2]
Masking tape chevrons go down in the dust
A glowing new ribbon, ten seconds of trust
The towers see further where the boxes once stood
The sight lines are open, and that isn't good

[Pre-Chorus]
Shudder, shudder
Three seconds long

[Chorus]
A stack fell, the road is redrawn
The alley I walked in is buried and gone
The bulb swings away and the shadows run wild
A stack fell, the road is redrawn

[Breakdown: drums and the gang chant]
Two and five and eight
Every stack has got a date
Never random, never late
Two and five and eight

[Final Chorus: lifted, the gang doubled]
A stack fell, the road is redrawn
The alley I walked in is buried and gone
The bulb swings away and the shadows run wild
A stack fell, the road is redrawn

[Outro: the swing slows, the pulse fades]
Redrawn
```

## Request filter

stripped: nothing

## Rejected seeds

- 3980300: harsh: 3.8% above 6 kHz (ceiling 2.5)

## Measured (the kept take, after the 60 Hz high-pass, before the loudness gain unless noted)

| gate | measured | limit | passed |
|---|---|---|---|
| tempo | 131 bpm vs asked 132 | not applied: no beat was asked for | yes |
| loudness | -16.0 LUFS installed (decoded MP3 -16.4); candidate was -14.5, gain -1.5 dB | -16 LUFS within 1 dB | yes |
| peak after encode | -3.33 dBFS decoded (pre-encode -3.54) | under -1 dBFS | yes |
| silence | longest 0.30 s under -50 dBFS | under 0.5 s (mellow) | yes |
| brightness | 2.75 % of power above 6 kHz | under 2.5 % (mellow) | **NO** |
| boominess | 8.96 % below 60 Hz (raw render 31.5 %) | under 12 % | yes |
| onset rate | 2.87 per second | 0.3 to 4.5 | yes |
| loop seam | step 0.02x, tail-head -17.6 dB | not applied: a one-shot, not a loop | yes |

## Words (Demucs voice stem, Whisper large-v3-turbo)

heard: . | Yellow and black | Shudder, shudder. | Three seconds long. | Masking tape, sheathen, stole it down in the dust. A glowing new ribbon, ten seconds of trust. | Shudder, shudder. Three seconds long. | The alley I walked in is buried and gone. The ball swings away and the shadows run wild. A stack fell. The road is redrawn. | Two and five and eight. | Every stack has got a D. Neverland or neverly. Two and five and eight. A stack fell, the road is redrawn. | The alley I walked in is buried and gone. The ball swings away and the shadows run wild. A stack fell. The road is redrawn. | Reach forward.

108 words heard, 10 not in our lyrics: sheathen stole ball d neverland or neverly ball reach forward (limit 10 % of the words heard, at least 40 heard)

## Heard by a model, not a person

Not listened to: listening is off, or there is no GEMINI_API_KEY in the environment. Nobody on the machine can hear.

## Checks

kept despite failing: harsh: 2.8% above 6 kHz (ceiling 2.5)
