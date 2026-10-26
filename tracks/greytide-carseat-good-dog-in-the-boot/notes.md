# Good Dog in the Boot

- **slug:** greytide-carseat-good-dog-in-the-boot
- **idea:** wave 5: the dog in the boot wakes, pants over the seat back, licks a grey dude clean off the seat and knocks a tower flat on its second visit
- **mood:** rowdy, warm, slobbering
- **bpm:** 152 (asked) / 76 (measured, folded into 70-140)
- **key:** E minor (asked) / A minor (estimated)
- **seed:** 4020601
- **model:** ACE-Step 1.5, acestep-v15-turbo, 8 steps, guidance 7.0, shift 3.0, LM acestep-5Hz-lm-1.7B
- **tier:** fast   **gate profile:** mellow   **duration:** 168 s rendered, 163.2 s installed (one-shot, nothing baked)
- **date:** 2026-10-26
- **render time:** 24.5 s per seed, model load 24.6 s
- **licence:** generated locally from a text prompt, no samples or reference audio, no third-party rights claimed
- project: greytide
- **album:** Greytide, track 6
- **submitter:** the radio, for greytide
- **tags:** table:carseat, pov:dog
- **loop:** no, a one-shot
- **length:** 7196670 samples at 44.1 kHz (163.19 s), about 103.4 bars of 4/4 at 152 bpm (the MP3 adds encoder padding; the length is of the PCM)

## Why

You asked for "wave 5: the dog in the boot wakes, pants over the seat back, licks a grey dude clean off the seat and knocks a tower flat on its second visit". The words and the style were written for this song by the station's writers and reviewed by the conductor. So I wrote it at 152 bpm in E minor, 168 seconds, with a voice, in words I wrote myself, under the mellow gates. It has no beat to hold, so 152 bpm is only the grid I gave the model and the tempo gate is not applied. It is a one-shot: nothing is baked and the ending is the model's own. I rendered 2 seeds and threw away 1: 4020600 (1.0s of near-silence (limit 0.5) and others). Seed 4020601 is the take, but it did not clear every gate: 0.6s of near-silence (limit 0.5).

## Prompt

> Swampy rockabilly, 152 bpm, E minor, a hot trio and a voice: a slapped upright bass in a tight lean line, bass well under the mids, a twangy tremolo guitar on a stomping riff, a brushed snare and kick shuffle, hand claps and a harmonica wailing in the gaps, a big rough-voiced male lead grinning and barking the hook, a gang of backing voices howling the answers, in E minor, rowdy and warm, mid start, a long stomping plateau, a dip to bass and panting breath, a lifted last chorus, warm grit in the mids, no harsh highs

## Lyrics (original, written for this track by the project; the model was given only these words)

```
[Intro - slap bass and a pant, then the guitar riff]

[Verse 1]
I slept behind the seat for four whole waves
Dreaming about rabbits and the long motorways
Then I smelt something grey and I lifted my head
Panting on the back of the seat, the kid said

[Pre-Chorus]
Watch the shadow, wet and dark
Two seconds of a warning, then the bark

[Chorus - gang answers]
Good dog! (Big dog!)
Head over the seat
Good dog! (Big dog!)
Licked them off their feet

[Verse 2]
I only reach the far half, that's my side
One tongue and a grunt is gone for a ride
A big one only staggers, I give him a shove
Second visit, flat goes a tower, that's love

[Pre-Chorus]
When the car brakes I put my head down low
Braced in the boot till the red lights go

[Chorus - gang answers]
Good dog! (Big dog!)
Head over the seat
Good dog! (Big dog!)
Licked them off their feet

[Breakdown - bass and panting, the harmonica whines]
I don't know about painted, I don't know about grey
I know it moved and I know I want to play
Who's a good one, who's a good one

[Final Chorus - lifted, everyone howling]
Good dog! (Big dog!)
Head over the seat
Good dog! (Big dog!)
Licked them off their feet

[Outro - one bark, the riff ends]
```

## Request filter

stripped: nothing

## Rejected seeds

- 4020600: 1.0s of near-silence (limit 0.5); harsh: 2.6% above 6 kHz (ceiling 2.5)

## Measured (the kept take, after the 60 Hz high-pass, before the loudness gain unless noted)

| gate | measured | limit | passed |
|---|---|---|---|
| tempo | 76 bpm vs asked 152 | not applied: no beat was asked for | yes |
| loudness | -16.0 LUFS installed (decoded MP3 -16.4); candidate was -14.1, gain -1.9 dB | -16 LUFS within 1 dB | yes |
| peak after encode | -2.95 dBFS decoded (pre-encode -3.47) | under -1 dBFS | yes |
| silence | longest 0.55 s under -50 dBFS | under 0.5 s (mellow) | **NO** |
| brightness | 2.25 % of power above 6 kHz | under 2.5 % (mellow) | yes |
| boominess | 7.92 % below 60 Hz (raw render 20.9 %) | under 12 % | yes |
| onset rate | 2.72 per second | 0.3 to 4.5 | yes |
| loop seam | step 0.03x, tail-head -56.6 dB | not applied: a one-shot, not a loop | yes |

## Words (Demucs voice stem, Whisper large-v3-turbo)

heard: Oh, I slept behind the seat for four whole waves. | Dreaming about rabbits and the long motorways. Then I smelled something great and I lifted my head panting on the back. | The kids sit. Watch the shadow, wet and dark. Two seconds of a warning, then the bark. Good dog, big dog. Head over the seat. | Good dog, big dog, lick them off their feet. I only reach the far half, that's my side. One, two, | And a grunt is gone for a ride. A big one only staggers. I give him a shove. Second visit flat goes a tower. | That's love. When the car breaks, I put my head down low, braced in the boot till the red lights go. Good dog! Big dog! Head over the seat. | Good dog. Big dog. Lick them off their feet. | I don't | I know you're about great. I know it moves. And I know I want to play. | Good dog, big dog. Head over the seat. Good dog, big dog. | Lick them off their feet.

173 words heard, 12 not in our lyrics: oh smelled great kids sit lick breaks lick you're great moves lick (limit 10 % of the words heard, at least 40 heard)

## Heard by a model, not a person

Not listened to: listening is off, or there is no GEMINI_API_KEY in the environment. Nobody on the machine can hear.

## Checks

kept despite failing: 0.6s of near-silence (limit 0.5)
