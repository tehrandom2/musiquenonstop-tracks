# The Road Forks

- **slug:** greytide-railway-the-road-forks
- **idea:** Wave two: two grey dudes from the same box are split at the fork, one to the level crossing, one down the track bed with no warning; a duet
- **mood:** rough, tender, fatalistic
- **bpm:** 144 (asked) / 70 (measured, folded into 70-140)
- **key:** E minor (asked) / E minor (estimated)
- **seed:** 4060201
- **model:** ACE-Step 1.5, acestep-v15-turbo, 8 steps, guidance 7.0, shift 3.0, LM acestep-5Hz-lm-1.7B
- **tier:** fast   **gate profile:** mellow   **duration:** 165 s rendered, 158.0 s installed (one-shot, nothing baked)
- **date:** 2026-10-26
- **render time:** 24.0 s per seed, model load 24.6 s
- **licence:** generated locally from a text prompt, no samples or reference audio, no third-party rights claimed
- project: greytide
- **album:** Greytide, track 2
- **submitter:** the radio, for greytide
- **tags:** table:railway, pov:two-grey-dudes
- **loop:** no, a one-shot
- **length:** 6966752 samples at 44.1 kHz (157.98 s), about 94.8 bars of 4/4 at 144 bpm (the MP3 adds encoder padding; the length is of the PCM)

## Why

You asked for "Wave two: two grey dudes from the same box are split at the fork, one to the level crossing, one down the track bed with no warning; a duet". The words and the style were written for this song by the station's writers and reviewed by the conductor. So I wrote it at 144 bpm in E minor, 165 seconds, with a voice, in words I wrote myself, under the mellow gates. It has no beat to hold, so 144 bpm is only the grid I gave the model and the tempo gate is not applied. It is a one-shot: nothing is baked and the ending is the model's own. I rendered 2 seeds and threw away 1: 4060200 (0.6s of near-silence (limit 0.5)). Seed 4060201 is the take.

## Prompt

> Freight-train country shuffle, 144 bpm, in E minor, a five-piece honky outfit: a boom-chicka brushed snare train beat, a tight lean upright bass under the mids slapping the root and fifth, a baritone guitar with a twangy low lead, a harmonica wailing like a whistle between lines, a fiddle sawing the chorus, a male and a female lead singing a duet as two grey dudes split at the fork, rough and tender, the key E minor said again by the baritone; arc: harmonica whistle intro, verses that trade, a chorus sung together, a breakdown to bass and brushes, a final chorus lifted with fiddle harmony, no harsh highs

## Lyrics (original, written for this track by the project; the model was given only these words)

```
[Intro: harmonica whistle, the train beat starts]

[Verse 1: male]
We climbed out the box with the same grey face
The same stick bones and the same base
But they number us off at the signpost's word
Odd to the gates and even to the third

[Verse 2: female]
You get the crossing with the red and white
The booms come down and they hold you tight
I get the track bed, the sleepers and stones
No warning for me but the board's cold tones

[Pre-Chorus: together]
The road forks, the road forks
One of us waits and one of us walks

[Chorus: together]
You take the gates and I take the bed
You get a warning, I get the dread
Meet me where the roads join up again
If the train don't find us in between

[Verse 3: trading lines]
I hear the rails start humming at my feet
I hear the bell where the barriers meet
I'm running the ballast, I'm counting the ties
I'm grey all over but I've got good eyes

[Chorus: together]
You take the gates and I take the bed
You get a warning, I get the dread
Meet me where the roads join up again
If the train don't find us in between

[Breakdown: bass and brushes]
If I don't make it, tell the box
I walked the line like the painted clocks
No, tell them nothing, they never ask
The grey just go, and that's the task

[Final Chorus: lifted, fiddle harmony]
You take the gates and I take the bed
You get a warning, I get the dread
Meet me where the roads join up again
If the train don't find us in between

[Outro: harmonica fades down the line]
Roads join. Roads join.
```

## Request filter

stripped: nothing

## Rejected seeds

- 4060200: 0.6s of near-silence (limit 0.5)

## Measured (the kept take, after the 60 Hz high-pass, before the loudness gain unless noted)

| gate | measured | limit | passed |
|---|---|---|---|
| tempo | 70 bpm vs asked 144 | not applied: no beat was asked for | yes |
| loudness | -16.0 LUFS installed (decoded MP3 -16.4); candidate was -15.0, gain -1.0 dB | -16 LUFS within 1 dB | yes |
| peak after encode | -2.47 dBFS decoded (pre-encode -3.28) | under -1 dBFS | yes |
| silence | longest 0.45 s under -50 dBFS | under 0.5 s (mellow) | yes |
| brightness | 1.72 % of power above 6 kHz | under 2.5 % (mellow) | yes |
| boominess | 6.53 % below 60 Hz (raw render 13.9 %) | under 12 % | yes |
| onset rate | 2.77 per second | 0.3 to 4.5 | yes |
| loop seam | step 0.06x, tail-head -54.7 dB | not applied: a one-shot, not a loop | yes |

## Words (Demucs voice stem, Whisper large-v3-turbo)

heard: We climbed out the box with the same gray face, the same stick. | You get the crossin' with the bread | The Booms come down and they hold you tight I get the track bed The sleepers and stones No warning for me But the boards cold tone The Boat Forks | You take the gates and I take the bed. You get a morning. | And I get the dread. Lead me where the roads join up again. If the train don't find us in between. I hear the rails start humming at my feet. | I hear the bell where the barriers meet. I'm running the ballast, I'm counting the ties. I'm gray all over, but I've got good eyes. You take the gates and I take the bed. You get | If I don't make it, tell the truth. | I walk the line like the painted clocks. No, tell them nothing. They never ask. The grade just go, and that's the task. You take the gates, and I take the bed. You get the gates, and I take the bed. | Get a warning, I'd get the trip. Meet me where the roads join up again if the train don't find us in between. | Roles join. Roles join. | Thank you.

207 words heard, 17 not in our lyrics: gray crossin' bread boards tone boat morning lead gray truth walk grade i'd trip roles roles thank (limit 10 % of the words heard, at least 40 heard)

## Heard by a model, not a person

Not listened to: listening is off, or there is no GEMINI_API_KEY in the environment. Nobody on the machine can hear.

## Checks

all automatic checks passed. These are numbers, not hearing: nobody on the machine can hear, the owner listens.
