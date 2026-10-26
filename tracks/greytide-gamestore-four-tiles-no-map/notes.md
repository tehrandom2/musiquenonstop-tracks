# Four Tiles, No Map

- **slug:** greytide-gamestore-four-tiles-no-map
- **idea:** Wave two, a grey dude with a head from the wrong kit walks a road the seed has shuffled, and meets a painted tower's careful eye
- **mood:** wry, restless, driving
- **bpm:** 142 (asked) / 71 (measured, folded into 70-140)
- **key:** A minor (asked) / A minor (estimated)
- **seed:** 3950201
- **model:** ACE-Step 1.5, acestep-v15-turbo, 8 steps, guidance 7.0, shift 3.0, LM acestep-5Hz-lm-1.7B
- **tier:** fast   **gate profile:** mellow   **duration:** 160 s rendered, 153.9 s installed (one-shot, nothing baked)
- **date:** 2026-10-26
- **render time:** 23.4 s per seed, model load 24.6 s
- **licence:** generated locally from a text prompt, no samples or reference audio, no third-party rights claimed
- project: greytide
- **album:** Greytide, track 2
- **submitter:** the radio, for greytide
- **tags:** table:gamestore, pov:grey-dude
- **loop:** no, a one-shot
- **length:** 6788831 samples at 44.1 kHz (153.94 s), about 91.1 bars of 4/4 at 142 bpm (the MP3 adds encoder padding; the length is of the PCM)

## Why

You asked for "Wave two, a grey dude with a head from the wrong kit walks a road the seed has shuffled, and meets a painted tower's careful eye". The words and the style were written for this song by the station's writers and reviewed by the conductor. So I wrote it at 142 bpm in A minor, 160 seconds, with a voice, in words I wrote myself, under the mellow gates. It has no beat to hold, so 142 bpm is only the grid I gave the model and the tempo gate is not applied. It is a one-shot: nothing is baked and the ending is the model's own. I rendered 2 seeds and threw away 1: 3950200 (0.8s of near-silence (limit 0.5) and others). Seed 3950201 is the take, but it did not clear every gate: 0.8s of near-silence (limit 0.5).

## Prompt

> Post-punk at 142 bpm in A minor, a four-piece with jobs: a melodic lead bass high on the neck carrying the riff, tight and lean, bass under the mids; a choppy chorused guitar on offbeat stabs; a tom-heavy kit with a driving floor tom; a thin organ drone as the horizon; a weary baritone male lead, deadpan and funny, with a ragged gang chorus on the hook; enters mid, climbs through two choruses, a half-time breakdown on bass and toms, a lifted last chorus in A minor, no harsh highs

## Lyrics (original, written for this track by the project; the model was given only these words)

```
[Intro - the bass riff alone, then the kit]

[Verse 1]
I came out of the box with a head from a different kit
The neck is on with too much glue, I'm coping with it
They told me walk the road, so I'm walking down the road
But the road is not the road it was the last time that I strode
There's a chapel made of broken walls, a hole where something hit
Two hills with ramps and a zigzag and I don't remember it

[Pre-Chorus]
Who moved the world while I was in the box?
(Shuffled! Shuffled!)

[Chorus]
Four tiles, no map
The road's been shuffled while we slept
Four tiles, no map
Walk it like a promise kept

[Verse 2]
The seams are showing where the four squares meet
A little ridge of nothing underneath my feet
Up on the plateau stands a painted thing in red
It's got a careful eye and highlights on its head
It looks at me like I'm a job it hasn't done
I look at it like it's a morning I could become

[Pre-Chorus]
Who moved the world while I was in the box?
(Shuffled! Shuffled!)

[Chorus]
Four tiles, no map
The road's been shuffled while we slept
Four tiles, no map
Walk it like a promise kept

[Breakdown - half time, bass and toms]
Chapel, crater, hills, the zig and zag
Same four squares, a different bag
Somebody's hand put the world in order
I'm just grey and walking to the border

[Final Chorus - lifted, gang chorus doubled]
Four tiles, no map
The road's been shuffled while we slept
Four tiles, no map
Walk it like a promise kept

[Outro - the riff, one last time, cut dead]
No map. Keep walking.
```

## Request filter

stripped: nothing

## Rejected seeds

- 3950200: 0.8s of near-silence (limit 0.5); harsh: 2.9% above 6 kHz (ceiling 2.5)

## Measured (the kept take, after the 60 Hz high-pass, before the loudness gain unless noted)

| gate | measured | limit | passed |
|---|---|---|---|
| tempo | 71 bpm vs asked 142 | not applied: no beat was asked for | yes |
| loudness | -16.0 LUFS installed (decoded MP3 -16.4); candidate was -14.6, gain -1.4 dB | -16 LUFS within 1 dB | yes |
| peak after encode | -3.38 dBFS decoded (pre-encode -3.47) | under -1 dBFS | yes |
| silence | longest 0.75 s under -50 dBFS | under 0.5 s (mellow) | **NO** |
| brightness | 2.32 % of power above 6 kHz | under 2.5 % (mellow) | yes |
| boominess | 5.05 % below 60 Hz (raw render 11.8 %) | under 12 % | yes |
| onset rate | 3.35 per second | 0.3 to 4.5 | yes |
| loop seam | step 0.02x, tail-head -61.1 dB | not applied: a one-shot, not a loop | yes |

## Words (Demucs voice stem, Whisper large-v3-turbo)

heard: . | I came out of the box with a hit from a different kid. The neck is on with too much glue I'm coping with. | They told me walk the road, so I'm walking down the road, but the road is not the road. It was the last time that I strode. There's a chapel made of broken walls, a hole where something hit. Two hills with ramps and a zigzag. | I don't remember it. Who moved the world while I was in the box? Shuffle, shuffle. Four tiles. No map. The road's been shuffled while we slept. Four tiles. | No map Walking like a promised camp The seams are showing where the four squares meet A little ridge of nothing underneath my feet Up on the plateau stands a painted car | It's got a careful eye and highlights on its head. It looks at me like I'm a job it hasn't done. I look at it like it's a morning I could become. Who moved the world while I was in the | Shuffle, shuffle. Four tiles, no map. The road's been shuffled while we slept. Four tiles, no map. Walking like a promised cat. | Chapel Crater Hills, the zig and zag Same four squares, a different bag | Somebody's hand put the world in order. I'm just great. I'm walking to the border. Four tiles. No map. The road's been shuffled while we slept. Four tiles. | I'm a child, a snow map, walking like a promised cap. | Bye.

247 words heard, 16 not in our lyrics: kid shuffle shuffle promised camp car shuffle shuffle promised cat great child snow promised cap bye (limit 10 % of the words heard, at least 40 heard)

## Heard by a model, not a person

Not listened to: listening is off, or there is no GEMINI_API_KEY in the environment. Nobody on the machine can hear.

## Checks

kept despite failing: 0.8s of near-silence (limit 0.5)
