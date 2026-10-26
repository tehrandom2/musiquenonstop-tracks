# Last Train

- **slug:** greytide-railway-last-train
- **idea:** Wave ten: the boss stands on the line, the engine only takes a fifth off him, and every railway tower holds together; the green engine sings
- **mood:** anthemic, driving, kind
- **bpm:** 146 (asked) / 72 (measured, folded into 70-140)
- **key:** E minor (asked) / E minor (estimated)
- **seed:** 4061001
- **model:** ACE-Step 1.5, acestep-v15-turbo, 8 steps, guidance 7.0, shift 3.0, LM acestep-5Hz-lm-1.7B
- **tier:** fast   **gate profile:** mellow   **duration:** 178 s rendered, 170.0 s installed (one-shot, nothing baked)
- **date:** 2026-10-26
- **render time:** 25.6 s per seed, model load 24.6 s
- **licence:** generated locally from a text prompt, no samples or reference audio, no third-party rights claimed
- project: greytide
- **album:** Greytide, track 10
- **submitter:** the radio, for greytide
- **tags:** table:railway, pov:the-engine
- **loop:** no, a one-shot
- **length:** 7497070 samples at 44.1 kHz (170.00 s), about 103.4 bars of 4/4 at 146 bpm (the MP3 adds encoder padding; the length is of the PCM)

## Why

You asked for "Wave ten: the boss stands on the line, the engine only takes a fifth off him, and every railway tower holds together; the green engine sings". The words and the style were written for this song by the station's writers and reviewed by the conductor. So I wrote it at 146 bpm in E minor, 178 seconds, with a voice, in words I wrote myself, under the mellow gates. It has no beat to hold, so 146 bpm is only the grid I gave the model and the tempo gate is not applied. It is a one-shot: nothing is baked and the ending is the model's own. I rendered 2 seeds and threw away 1: 4061000 (harsh: 3.0% above 6 kHz (ceiling 2.5)). Seed 4061001 is the take, but it did not clear every gate: harsh: 3.0% above 6 kHz (ceiling 2.5).

## Prompt

> Anthemic motorik rock, 146 bpm, in E minor, the full railway band for the last stand: a pounding motorik kit with tom fills into every chorus, a tight lean driving bass under the mids on eighths, two guitars, one chugging and one ringing a high melody, a synth whistle motif from the departure board song, a horn pair joining from the conductor's band for the last chorus, a powerful male lead singing as the green engine, with a big gang choir of every tower on the hook, E minor stated in the riff; arc: a far whistle and hum intro, mid verses, a huge chorus, a breakdown to bass and wheels where the boss stands on the line, a long high final chorus lifted, an outro that pulls into the tunnel and fades, no harsh highs

## Lyrics (original, written for this track by the project; the model was given only these words)

```
[Intro: a far whistle, the hum of the rails]

[Verse 1]
Green paint, black smokebox, a dome of brass
Six red wheels and a tender of coal
I've run this line since the first wave passed
Tunnel to tunnel and back to the hole

[Verse 2]
I knock the grunts off the ballast bed
I never wished them a moment's harm
They're only plastic that never got read
They're only grey and they mean no alarm

[Pre-Chorus]
Wave ten, wave ten, the board goes red
Something huge is standing on the line ahead

[Chorus]
Last train, last train, through the dark and home
Out of the hill and into the hill
Every tower singing in the painted chrome
Last train, last train, hold the line still

[Verse 3]
I hit the boss and he only shakes
A fifth of him gone and the rest still stands
So it's not on me, it's on what it takes
The signal, the rail, the conductor's hands

[Chorus]
Last train, last train, through the dark and home
Out of the hill and into the hill
Every tower singing in the painted chrome
Last train, last train, hold the line still

[Breakdown: bass and wheels, the boss on the track]
The gates come down, the water pours
The rail goes live, the signal roars
The ballista leans and the cannon booms
And the painted crowd on the platform looms

[Final Chorus: lifted, horns and full choir]
Last train, last train, through the dark and home
Out of the hill and into the hill
Every tower singing in the painted chrome
Last train, last train, hold the line still

[Outro: into the tunnel, fading]
Into the hill. Hold the line still.
```

## Request filter

stripped: nothing

## Rejected seeds

- 4061000: harsh: 3.0% above 6 kHz (ceiling 2.5)

## Measured (the kept take, after the 60 Hz high-pass, before the loudness gain unless noted)

| gate | measured | limit | passed |
|---|---|---|---|
| tempo | 72 bpm vs asked 146 | not applied: no beat was asked for | yes |
| loudness | -16.0 LUFS installed (decoded MP3 -16.4); candidate was -13.1, gain -2.9 dB | -16 LUFS within 1 dB | yes |
| peak after encode | -3.72 dBFS decoded (pre-encode -4.15) | under -1 dBFS | yes |
| silence | longest 0.20 s under -50 dBFS | under 0.5 s (mellow) | yes |
| brightness | 2.96 % of power above 6 kHz | under 2.5 % (mellow) | **NO** |
| boominess | 5.96 % below 60 Hz (raw render 15.4 %) | under 12 % | yes |
| onset rate | 3.49 per second | 0.3 to 4.5 | yes |
| loop seam | step 0.02x, tail-head -41.6 dB | not applied: a one-shot, not a loop | yes |

## Words (Demucs voice stem, Whisper large-v3-turbo)

heard: . | Green paint black smoke box at Dome of brass six red wheels and a tender of coal from this line since the first way past tunnel tunnel tunnel tunnel tunnel tunnel tunnel tunnel tunnel tunnel tunnel tunnel tunnel tunnel tunnel tunnel tunnel tunnel tunnel tunnel tunnel tunnel tunnel tunnel tunnel tunnel tunnel tunnel tunnel tunnel tunnel tunnel tunnel tunnel tunnel tunnel tunnel tunnel tunnel tunnel tunnel tunnel tunnel tunnel tunnel tunnel tunnel tunnel tunnel tunnel tunnel tunnel tunnel tunnel tunnel tunnel tunnel tunnel tunnel tunnel tunnel tunnel tunnel tunnel tunnel tunnel tunnel tunnel tunnel tunnel tunnel tunnel tunnel tunnel tunnel tunnel tunnel tunnel tunnel tunnel tunnel tunnel tunnel tunnel tunnel tunnel tunnel tunnel tunnel tunnel tunnel tunnel tunnel tunnel tunnel tunnel tunnel tunnel tunnel tunnel tunnel tunnel tunnel tunnel tunnel tunnel tunnel tunnel tunnel tunnel tunnel tunnel tunnel tunnel tunnel tunnel tunnel tunnel tunnel tunnel tunnel tunnel tunnel tunnel tunnel tunnel tunnel tunnel tunnel tunnel tunnel tunnel tunnel tunnel tunnel tunnel tunnel tunnel tunnel tunnel tunnel tunnel tunnel tunnel tunnel tunnel tunnel tunnel tunnel tunnel tunnel tunnel tunnel tunnel tunnel tunnel tunnel tunnel tunnel tunnel tunnel tunnel tunnel tunnel tunnel tunnel tunnel tunnel tunnel tunnel tunnel tunnel tunnel tunnel tunnel tunnel tunnel tunnel tunnel tunnel tunnel tunnel tunnel tunnel tunnel tunnel tunnel tunnel tunnel tunnel tunnel tunnel tunnel tunnel tunnel tunnel tunnel tunnel tunnel tunnel tunnel tunnel tunnel tunnel tunnel tunnel tunnel tunnel tunnel tunnel tunnel tunnel tunnel tunnel tunnel tunnel tunnel tunnel tunnel tunnel tunnel tunnel tunnel tunnel tunnel tunnel tunnel tunnel tunnel tunnel tunnel tunnel tunnel tunnel tunnel tunnel tunnel tunnel tunnel tunnel tunnel tunnel tunnel tunnel tunnel tunnel tunnel tunnel tunnel tunnel tunnel tunnel tunnel tunnel tunnel tunnel tunnel tunnel tunnel tunnel tunnel tunnel tunnel tunnel tunnel tunnel tunnel tunnel tunnel tunnel tunnel tunnel tunnel tunnel tunnel tunnel tunnel tunnel tunnel tunnel tunnel tunnel tunnel tunnel tunnel tunnel tunnel tunnel tunnel tunnel tunnel tunnel tunnel tunnel tunnel tunnel tunnel tunnel tunnel tunnel tunnel tunnel tunnel tunnel tunnel tunnel tunnel tunnel tunnel tunnel tunnel tunnel tunnel tunnel tunnel tunnel tunnel tunnel tunnel tunnel tunnel tunnel tunnel tunnel tunnel tunnel tunnel tunnel tunnel tunnel tunnel tunnel tunnel tunnel tunnel tunnel tunnel tunnel tunnel tunnel tunnel tunnel tunnel tunnel tunnel tunnel tunnel tunnel tunnel tunnel tunnel tunnel tunnel tunnel tunnel tunnel tunnel tunnel tunnel tunnel tunnel tunnel tunnel tunnel tunnel tunnel tunnel tunnel tunnel tunnel tunnel tunnel tunnel tunnel tunnel tunnel tunnel tunnel tunnel tunnel tunnel tunnel tunnel tunnel tunnel tunnel tunnel tunnel tunnel tunnel tunnel tunnel tunnel tunnel tunnel tunnel tunnel tunnel tunnel tunnel tunnel tunnel tunnel tunnel tunnel tunnel tunnel tunnel tunnel tunnel tunnel tunnel tunnel tunnel tunnel tunnel tunnel tunnel | I never wish them a moment's harm. | They're only plastic that never got red. They're only cray and they mean no alarm. Waitin', waitin', board goes red. Something | Out of the hill and into the hill. Everything. | I hit the boss and he | Last train, last train! | through the dark and cold. Out of the hill and into the hill. Every child will sing it in the painted crow. Last train, last train. Hold the lifestyle. | The gates come down, the water pours, the rail goes live, the signal goes. | Oh | Out of the hill and into the hill. Every time I was singing in the painted robe. Last train, last train. Hold the light still. | Into the hill, hold the line still.

566 words heard, 22 not in our lyrics: smoke box at from way past wish cray waitin' waitin' everything cold child will sing crow lifestyle oh time was robe light (limit 10 % of the words heard, at least 40 heard)

## Heard by a model, not a person

Not listened to: listening is off, or there is no GEMINI_API_KEY in the environment. Nobody on the machine can hear.

## Checks

kept despite failing: harsh: 3.0% above 6 kHz (ceiling 2.5)
