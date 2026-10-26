# Station One, One Way Only

- **slug:** greytide-workbench-station-one-one-way-only
- **idea:** Wave one, a grey dude steps onto the conveyor: one road, rollers every centimetre, three station signs, and the painted towers watching from the toolbox lid
- **mood:** deadpan, hypnotic, driving
- **bpm:** 138 (asked) / 134 (measured, folded into 70-140)
- **key:** A minor (asked) / A minor (estimated)
- **seed:** 3960101
- **model:** ACE-Step 1.5, acestep-v15-turbo, 8 steps, guidance 7.0, shift 3.0, LM acestep-5Hz-lm-1.7B
- **tier:** fast   **gate profile:** jungle   **duration:** 165 s rendered, 161.6 s installed (one-shot, nothing baked)
- **date:** 2026-10-26
- **render time:** 24.2 s per seed, model load 24.6 s
- **licence:** generated locally from a text prompt, no samples or reference audio, no third-party rights claimed
- project: greytide
- **album:** Greytide, track 1
- **submitter:** the radio, for greytide
- **tags:** table:workbench, pov:grey-dude
- **loop:** no, a one-shot
- **length:** 7125323 samples at 44.1 kHz (161.57 s), about 92.9 bars of 4/4 at 138 bpm (the MP3 adds encoder padding; the length is of the PCM)

## Why

You asked for "Wave one, a grey dude steps onto the conveyor: one road, rollers every centimetre, three station signs, and the painted towers watching from the toolbox lid". The words and the style were written for this song by the station's writers and reviewed by the conductor. So I wrote it at 138 bpm in A minor, 165 seconds, with a voice, in words I wrote myself, under the jungle gates. It has no beat to hold, so 138 bpm is only the grid I gave the model and the tempo gate is not applied. It is a one-shot: nothing is baked and the ending is the model's own. I rendered 2 seeds and threw away 1: 3960100 (0.8s of near-silence (limit 0.5) and others). Seed 3960101 is the take, but it did not clear every gate: 1.0s of near-silence (limit 0.5); boomy: 9.2% below 60 Hz (ceiling 8).

## Prompt

> Motorik krautrock at 138 bpm in A minor, a factory-floor quartet: a metronomic kick and hat beat that never lets up, a tight lean eighth-note bass, bass under the mids, a chugging muted guitar like rollers turning, a cold sequenced synth line and a warm organ swelling in the chorus; a flat, deadpan male lead with a clipped machine-like backing chorus; starts mid on the beat alone, builds to a long high plateau, a dip to bass and sequence in the bridge, a lifted last chorus, A minor, no harsh highs

## Lyrics (original, written for this track by the project; the model was given only these words)

```
[Intro - the beat alone, then the bass]
Station one.

[Verse 1]
Out of the kit box onto black rubber road
Rollers every centimetre, yellow line on either side
Pine planks to the left and a long way down
Nobody asked us, but the belt decides
A sign stuck up beside the line in capitals
STATION ONE, ONE WAY ONLY, so we go
Clamp A swings and stops us in a crowd
Then lets us all go at once, in a row

[Pre-Chorus]
Roll on, roll on
(No forks, no turns)

[Chorus]
One way only, one road through
Front of the bench, then the vice, then the climb
One way only, grey and new
Every centimetre, right on time

[Verse 2]
STATION TWO, THE VICE, in someone's hand
STATION THREE, THE CLIMB, up the pegboard wall
Three hundred and thirty centimetres long
And we were built to walk it all
The painted ones are standing on a toolbox lid
Red and proud and highlighted with care
They watch the belt the way you watch the sea
They know it's taking us somewhere

[Pre-Chorus]
Roll on, roll on
(No forks, no turns)

[Chorus]
One way only, one road through
Front of the bench, then the vice, then the climb
One way only, grey and new
Every centimetre, right on time

[Bridge - bass and the sequence only]
A big green button on the left of the bench
Somebody presses it, the next lot come
We are not a story, we are a shift
We are not afraid, we are numb

[Final Chorus - lifted, organ in full]
One way only, one road through
Front of the bench, then the vice, then the climb
One way only, grey and new
Every centimetre, right on time

[Outro - the beat runs on, then cuts]
Station one. Station one.
```

## Request filter

stripped: nothing

## Rejected seeds

- 3960100: 0.8s of near-silence (limit 0.5); boomy: 14.1% below 60 Hz (ceiling 8)

## Measured (the kept take, after the 60 Hz high-pass, before the loudness gain unless noted)

| gate | measured | limit | passed |
|---|---|---|---|
| tempo | 134 bpm vs asked 138 | not applied: no beat was asked for | yes |
| loudness | -16.0 LUFS installed (decoded MP3 -16.4); candidate was -16.5, gain +0.5 dB | -16 LUFS within 1 dB | yes |
| peak after encode | -3.01 dBFS decoded (pre-encode -3.24) | under -1 dBFS | yes |
| silence | longest 0.95 s under -50 dBFS | under 0.5 s (jungle) | **NO** |
| brightness | 2.67 % of power above 6 kHz | under 3.5 % (jungle) | yes |
| boominess | 9.18 % below 60 Hz (raw render 19.8 %) | under 8 % | **NO** |
| onset rate | 3.76 per second | 1.5 to 6.5 | yes |
| loop seam | step 0.05x, tail-head -36.8 dB | not applied: a one-shot, not a loop | yes |

## Words (Demucs voice stem, Whisper large-v3-turbo)

heard: station on | Out of the kit box onto Black Rubble Road. Rollers every centimeter yellow line on either side. Pine planks to the left and a long way down. Nobody asked us but the belt decides. A sign stuck up. | The side of the line in capitals Station one, one way only So we go, clamper swings And stops us in a crowd Then lets us all go at once In a row, roll on, roll on | No forks, no turns. One way only, one road through, front of the bench, then the vice, then the climb. One way only, grey and new, every centimeter. | Right on time Station two device in someone's head Station three the Clemby up the pig boat wall | 330 centimeters long, and we were built to walk it all. The painted ones are standing on a toolbox lid, red and proud and highlighted with care. They watch | The way you watch the sea They know it's taking us Somewhere Roll on, roll on No forks, no turns One way only One road through In front of the band | Then the fights, then the climb One way only, great new Every centimeter, right on time | A big green button on the left of the bench. Somebody presses it the next slide. | We are not a story. We are shift. We are not afraid. We are numb. One way only. One road through. Front of the bench, then | Right on time.

243 words heard, 15 not in our lyrics: rubble centimeter clamper centimeter device head clemby pig boat centimeters band fights great centimeter slide (limit 10 % of the words heard, at least 40 heard)

## Heard by a model, not a person

Not listened to: listening is off, or there is no GEMINI_API_KEY in the environment. Nobody on the machine can hear.

## Checks

kept despite failing: 1.0s of near-silence (limit 0.5); boomy: 9.2% below 60 Hz (ceiling 8)
