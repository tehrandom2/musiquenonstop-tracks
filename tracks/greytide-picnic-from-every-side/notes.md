# From Every Side

- **slug:** greytide-picnic-from-every-side
- **idea:** Wave one: the sandwich on the plate, the thing being defended, watches the grass shudder as the horde comes from every side of the gingham
- **mood:** sunny, worried, funny
- **bpm:** 138 (asked) / 134 (measured, folded into 70-140)
- **key:** A minor (asked) / A minor (estimated)
- **seed:** 4000101
- **model:** ACE-Step 1.5, acestep-v15-turbo, 8 steps, guidance 7.0, shift 3.0, LM acestep-5Hz-lm-1.7B
- **tier:** fast   **gate profile:** mellow   **duration:** 165 s rendered, 154.6 s installed (one-shot, nothing baked)
- **date:** 2026-10-26
- **render time:** 24.1 s per seed, model load 24.6 s
- **licence:** generated locally from a text prompt, no samples or reference audio, no third-party rights claimed
- project: greytide
- **album:** Greytide, track 1
- **submitter:** the radio, for greytide
- **tags:** table:picnic, pov:the sandwich
- **loop:** no, a one-shot
- **length:** 6817047 samples at 44.1 kHz (154.58 s), about 88.9 bars of 4/4 at 138 bpm (the MP3 adds encoder padding; the length is of the PCM)

## Why

You asked for "Wave one: the sandwich on the plate, the thing being defended, watches the grass shudder as the horde comes from every side of the gingham". The words and the style were written for this song by the station's writers and reviewed by the conductor. So I wrote it at 138 bpm in A minor, 165 seconds, with a voice, in words I wrote myself, under the mellow gates. It has no beat to hold, so 138 bpm is only the grid I gave the model and the tempo gate is not applied. It is a one-shot: nothing is baked and the ending is the model's own. I rendered 2 seeds and threw away 1: 4000100 (1.2s of near-silence (limit 0.5)). Seed 4000101 is the take, but it did not clear every gate: 1.1s of near-silence (limit 0.5).

## Prompt

> Highlife indie rock, 138 bpm, A minor: two clean interlocking guitars playing bright looping highlife lines, a tight lean bass, bass under the mids, bouncing on a melodic figure, a drummer on a busy snare and shaker with a talking drum answering, a warm male lead with a wry, worried voice and a call-and-response chorus of friends; sunny but tense, no harsh highs; starts mid on the guitars, a long dancing plateau, one dip to bass and talking drum, a final lift with the whole chorus, A minor throughout

## Lyrics (original, written for this track by the project; the model was given only these words)

```
[Intro: the two guitars, then the talking drum]
The grass is moving, the grass is moving

[Verse 1]
I'm the sandwich on the plate in the middle of the checks
Cheese and a pickle and a bite out of the edge
The gingham's laid out like a map of a war
And the lawn all round me goes on forever and more

[Pre-Chorus]
They're not coming down a road
They're not coming through a door

[Chorus]
From every side (from every side)
Through the grass they come
From every side (from every side)
And I can't even run

[Verse 2]
The ballista's on the corner where the red squares meet
The Hot Sauce Bottle's got a red line at its feet
The blades of grass lean over when a grey goes by
I can see them coming in the shiver from the side

[Pre-Chorus]
They're not coming down a road
They're not coming through a door

[Chorus]
From every side (from every side)
Through the grass they come
From every side (from every side)
And I can't even run

[Breakdown: bass and talking drum, voice close]
I'm only bread, and I know what I am
A lunch left out by a careless hand
But the painted ones are standing round
And that's more than a sandwich ever had

[Final Chorus: lifted, the whole chorus answering]
From every side (from every side)
Through the grass they come
From every side (from every side)
And I can't even run

[Outro: the guitars alone]
The grass is moving
```

## Request filter

stripped: nothing

## Rejected seeds

- 4000100: 1.2s of near-silence (limit 0.5)

## Measured (the kept take, after the 60 Hz high-pass, before the loudness gain unless noted)

| gate | measured | limit | passed |
|---|---|---|---|
| tempo | 134 bpm vs asked 138 | not applied: no beat was asked for | yes |
| loudness | -16.0 LUFS installed (decoded MP3 -16.4); candidate was -13.5, gain -2.5 dB | -16 LUFS within 1 dB | yes |
| peak after encode | -3.93 dBFS decoded (pre-encode -3.72) | under -1 dBFS | yes |
| silence | longest 1.10 s under -50 dBFS | under 0.5 s (mellow) | **NO** |
| brightness | 1.66 % of power above 6 kHz | under 2.5 % (mellow) | yes |
| boominess | 6.48 % below 60 Hz (raw render 15.2 %) | under 12 % | yes |
| onset rate | 3.09 per second | 0.3 to 4.5 | yes |
| loop seam | step 0.04x, tail-head -24.1 dB | not applied: a one-shot, not a loop | yes |

## Words (Demucs voice stem, Whisper large-v3-turbo)

heard: The grass is moving. The grass is moving. I'm the sandwich on the plate in the middle. | They're not coming down alone. | They're not coming through a door. They're not coming through a door. From every side and every side. Through the grass they come. | From every side, every side And I can even run The balistas on the corner where the red squares meet | The hot sauce bottle's got a red line at its feet. The blades of grass lean over when a prey goes by. I can see them coming in the shiver from the side. They're not coming down the road. They're not coming down the road. | From every side. From every side. Through the grass they come. From every side. | I'm every side And I can't even run | I'm only bread and I know what I am A lunch left out by a careless hand But the painted ones are standing | From every side | Through the grass they come From every side Every side And I can't even run | The curse is moving.

177 words heard, 4 not in our lyrics: alone balistas prey curse (limit 10 % of the words heard, at least 40 heard)

## Heard by a model, not a person

Not listened to: listening is off, or there is no GEMINI_API_KEY in the environment. Nobody on the machine can hear.

## Checks

kept despite failing: 1.1s of near-silence (limit 0.5)
