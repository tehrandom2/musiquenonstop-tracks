# Painted Passengers

- **slug:** greytide-railway-painted-passengers
- **idea:** Wave eight into nine: the tiny painted figures at the little halt watch the war and wait for a train that never stops there
- **mood:** tender, patient, quietly brave
- **bpm:** 122 (asked) / 123 (measured, folded into 70-140)
- **key:** A minor (asked) / A minor (estimated)
- **seed:** 4060901
- **model:** ACE-Step 1.5, acestep-v15-turbo, 8 steps, guidance 7.0, shift 3.0, LM acestep-5Hz-lm-1.7B
- **tier:** fast   **gate profile:** mellow   **duration:** 175 s rendered, 170.4 s installed (one-shot, nothing baked)
- **date:** 2026-10-26
- **render time:** 25.3 s per seed, model load 24.6 s
- **licence:** generated locally from a text prompt, no samples or reference audio, no third-party rights claimed
- project: greytide
- **album:** Greytide, track 9
- **submitter:** the radio, for greytide
- **tags:** table:railway, pov:painted-passengers
- **loop:** no, a one-shot
- **length:** 7515591 samples at 44.1 kHz (170.42 s), about 86.6 bars of 4/4 at 122 bpm (the MP3 adds encoder padding; the length is of the PCM)

## Why

You asked for "Wave eight into nine: the tiny painted figures at the little halt watch the war and wait for a train that never stops there". The words and the style were written for this song by the station's writers and reviewed by the conductor. So I wrote it at 122 bpm in A minor, 175 seconds, with a voice, in words I wrote myself, under the mellow gates. It has no beat to hold, so 122 bpm is only the grid I gave the model and the tempo gate is not applied. It is a one-shot: nothing is baked and the ending is the model's own. I rendered 2 seeds and threw away 1: 4060900 (0.6s of near-silence (limit 0.5)). Seed 4060901 is the take.

## Prompt

> Tender chamber-pop ballad with a lift, 122 bpm, in A minor, a small ensemble at a country halt: a soft piano ostinato on eighths, a brushed kit with a gentle backbeat, a tight lean bass under the mids, a string quartet swelling on the chorus, a clarinet answering the vocal lines, a soft clear female lead singing as the tiny painted passengers on the platform, with a hushed small choir of their voices on the hook, the key A minor held in the piano; arc: piano-alone intro, quiet verses, a chorus that opens with the strings, a bridge on piano and voice, the final chorus lifted with choir and full strings, a soft piano outro, warm, no harsh highs

## Lyrics (original, written for this track by the project; the model was given only these words)

```
[Intro: piano alone]

[Verse 1]
Two point two centimetres tall
A coat, a hat, and that is all
We stand on the platform's painted line
The canopy keeps the dark from the sign

[Verse 2]
The waiting room has a door that's shut
The bench is blue with a single cut
We hear the grey come over the hex
We hear the towers, the bolts, the wrecks

[Pre-Chorus]
And every train goes rushing past
The first, the twelfth, the very last

[Chorus]
We're only waiting for a train that stops
Out of the hill and into the hill
Painted and patient, hats and frocks
We're only waiting, we're waiting still

[Verse 3]
Nobody glued us to fight tonight
We're not the towers, we're not the might
We're the ones that make it a place
A little painted crowd, a little painted face

[Chorus]
We're only waiting for a train that stops
Out of the hill and into the hill
Painted and patient, hats and frocks
We're only waiting, we're waiting still

[Bridge: piano and voice]
If the grey get through, if the lives run dry
Who will be left to wave goodbye
So hold, you towers, hold for us
We never asked for any fuss

[Final Chorus: lifted, choir and strings]
We're only waiting for a train that stops
Out of the hill and into the hill
Painted and patient, hats and frocks
We're only waiting, we're waiting still

[Outro: piano alone]
Waiting still.
```

## Request filter

stripped: nothing

## Rejected seeds

- 4060900: 0.6s of near-silence (limit 0.5)

## Measured (the kept take, after the 60 Hz high-pass, before the loudness gain unless noted)

| gate | measured | limit | passed |
|---|---|---|---|
| tempo | 123 bpm vs asked 122 | not applied: no beat was asked for | yes |
| loudness | -16.0 LUFS installed (decoded MP3 -16.4); candidate was -14.3, gain -1.7 dB | -16 LUFS within 1 dB | yes |
| peak after encode | -3.61 dBFS decoded (pre-encode -3.46) | under -1 dBFS | yes |
| silence | longest 0.10 s under -50 dBFS | under 0.5 s (mellow) | yes |
| brightness | 1.80 % of power above 6 kHz | under 2.5 % (mellow) | yes |
| boominess | 4.05 % below 60 Hz (raw render 11.6 %) | under 12 % | yes |
| onset rate | 2.63 per second | 0.3 to 4.5 | yes |
| loop seam | step 0.04x, tail-head -52.9 dB | not applied: a one-shot, not a loop | yes |

## Words (Demucs voice stem, Whisper large-v3-turbo)

heard: . | 2.2 centimeters tall a coat a hat and that is all we stand on the platform's painted line the canopy keeps the dark | from the sign. The waiting room has a door that's shut. The bench is blue with a single cut. We hear the gray come over the hex. We hear the towers | The bolts, the wrecks And every train goes rushing past The first, the twelfth, the very last We're only waiting | We're a train that stops out of the hill and into the hill. Painted in patient hats and frocks. We're only waiting. We're waiting still. | Nobody glued us to fight tonight. We're not the towers. We're not the might. We're the ones that make it a place of love. | Little painted crowd, little painted face We're only waiting for a train that stops Out of the hill and into the hills | Painted in patient hats and frocks We're only waiting, we're waiting still | It's a great get-through | The lives run dry Who will be left to wave goodbye? So hold you towers home for us We never asked for any fight | Painted and patient hats and frocks. We're only | We're waiting still

196 words heard, 9 not in our lyrics: centimeters gray in love hills in it's great home (limit 10 % of the words heard, at least 40 heard)

## Heard by a model, not a person

Not listened to: listening is off, or there is no GEMINI_API_KEY in the environment. Nobody on the machine can hear.

## Checks

all automatic checks passed. These are numbers, not hearing: nobody on the machine can hear, the owner listens.
