# Two Ways Across

- **slug:** greytide-sandpit-two-ways-across
- **idea:** Wave one: a grey dude climbs out of the kit box at the hose end and reads the two signposts, trench or dunes
- **mood:** reckless, sun-baked, curious
- **bpm:** 152 (asked) / 76 (measured, folded into 70-140)
- **key:** E minor (asked) / E minor (estimated)
- **seed:** 4050101
- **model:** ACE-Step 1.5, acestep-v15-turbo, 8 steps, guidance 7.0, shift 3.0, LM acestep-5Hz-lm-1.7B
- **tier:** fast   **gate profile:** mellow   **duration:** 165 s rendered, 162.3 s installed (one-shot, nothing baked)
- **date:** 2026-10-26
- **render time:** 24.1 s per seed, model load 24.6 s
- **licence:** generated locally from a text prompt, no samples or reference audio, no third-party rights claimed
- project: greytide
- **album:** Greytide, track 1
- **submitter:** the radio, for greytide
- **tags:** table:sandpit, pov:grey-dude
- **loop:** no, a one-shot
- **length:** 7159246 samples at 44.1 kHz (162.34 s), about 102.8 bars of 4/4 at 152 bpm (the MP3 adds encoder padding; the length is of the PCM)

## Why

You asked for "Wave one: a grey dude climbs out of the kit box at the hose end and reads the two signposts, trench or dunes". The words and the style were written for this song by the station's writers and reviewed by the conductor. So I wrote it at 152 bpm in E minor, 165 seconds, with a voice, in words I wrote myself, under the mellow gates. It has no beat to hold, so 152 bpm is only the grid I gave the model and the tempo gate is not applied. It is a one-shot: nothing is baked and the ending is the model's own. I rendered 2 seeds and threw away 1: 4050100 (0.6s of near-silence (limit 0.5) and others). Seed 4050101 is the take, but it did not clear every gate: 1.6s of near-silence (limit 0.5).

## Prompt

> Desert surf-punk, 152 bpm, in E minor, a four-piece garage band on a hot afternoon: a twangy reverb surf guitar playing the staccato tremolo-picked lead line, a second guitar chugging palm-muted eighths, a tight lean picked bass under the mids walking the root, a driving snare-heavy kit with floor-tom rolls into each chorus, a scrappy male lead with a grin in his voice and a shouted gang chorus answering him, sun-baked, reckless, curious, the key E minor held throughout; arc: guitar-only intro, verses at mid level, a big chorus, a dip to bass and tom for the bridge, final chorus lifted with a key-of-E-minor guitar harmony, tight lean bass, no harsh highs

## Lyrics (original, written for this track by the project; the model was given only these words)

```
[Intro: surf guitar alone, then the band crashes in]

[Verse 1]
Tipped on its side at the end of the hose
A kit box mouth and out the grey dude goes
Sand to my knees and the sun on my back
Nobody painted me, nobody looked back

[Verse 2]
Two little signposts stuck in the dune
Painted in letters by a kid at noon
The trench is low and the trench is fast
The dunes are high and they drag you past

[Pre-Chorus]
Left foot, right foot, grain by grain
It floods, it says, it floods again

[Chorus]
Two ways across, two ways across
Low and fast or high and lost
The flag is waving on the big castle
Two ways across, and both cost

[Verse 3]
The castles stare from three centimetres up
A ballista leaning on a bucket's cup
I pick the trench because I'm built to run
I'm grey all over and I want the sun

[Chorus]
Two ways across, two ways across
Low and fast or high and lost
The flag is waving on the big castle
Two ways across, and both cost

[Bridge: bass and floor tom only]
The sand is warm, the sand is deep
A footprint big enough to sleep
Somewhere a giant kneels and grins
And every grain is where it begins

[Final Chorus: lifted, gang vocals doubled]
Two ways across, two ways across
Low and fast or high and lost
The flag is waving on the big castle
Two ways across, and both cost

[Outro: surf guitar tremolo fades on the root]
Both cost. Both cost.
```

## Request filter

stripped: nothing

## Rejected seeds

- 4050100: 0.6s of near-silence (limit 0.5); harsh: 2.7% above 6 kHz (ceiling 2.5)

## Measured (the kept take, after the 60 Hz high-pass, before the loudness gain unless noted)

| gate | measured | limit | passed |
|---|---|---|---|
| tempo | 76 bpm vs asked 152 | not applied: no beat was asked for | yes |
| loudness | -16.0 LUFS installed (decoded MP3 -16.4); candidate was -13.4, gain -2.6 dB | -16 LUFS within 1 dB | yes |
| peak after encode | -3.65 dBFS decoded (pre-encode -3.84) | under -1 dBFS | yes |
| silence | longest 1.60 s under -50 dBFS | under 0.5 s (mellow) | **NO** |
| brightness | 2.03 % of power above 6 kHz | under 2.5 % (mellow) | yes |
| boominess | 4.12 % below 60 Hz (raw render 11.5 %) | under 12 % | yes |
| onset rate | 3.19 per second | 0.3 to 4.5 | yes |
| loop seam | step 0.25x, tail-head -48.9 dB | not applied: a one-shot, not a loop | yes |

## Words (Demucs voice stem, Whisper large-v3-turbo)

heard: . | Tipped on its side at the end of the hose A kit box mouthing out the grey dude goes Sand to my knees and the sun on my back Nobody painted me Nobody looked back | Two little signposts stuck in the dune, painted in letters by a kid at noon. The trench is low and the trench is fast, the dunes are high. | And they drag you past Left foot, right foot, brain by brain It floods, it says it floods again Two ways across, two ways across Low and fast or high and lost | The castle stare from three centimeters | I'm | High and lost. The flag is waving on the big castle. Two ways across. Then both cost. | The sand is warm, the sand is deep, a footprint big enough to sleep. Somewhere a giant kneels and grins and | Every grain is where it begins. Two ways across, two ways across, low and fast or high and lost. The flag is waving on the big castle. | So, two ways cross, and both calls. | .

174 words heard, 8 not in our lyrics: mouthing brain brain centimeters then so cross calls (limit 10 % of the words heard, at least 40 heard)

## Heard by a model, not a person

Not listened to: listening is off, or there is no GEMINI_API_KEY in the environment. Nobody on the machine can hear.

## Checks

kept despite failing: 1.6s of near-silence (limit 0.5)
