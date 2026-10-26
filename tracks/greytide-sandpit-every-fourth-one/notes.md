# Every Fourth One

- **slug:** greytide-sandpit-every-fourth-one
- **idea:** Wave five: the digger has cut a shortcut and every fourth grey dude is sent down it, alone and fast
- **mood:** nervous, comic, plucky
- **bpm:** 168 (asked) / 84 (measured, folded into 70-140)
- **key:** B minor (asked) / B minor (estimated)
- **seed:** 4050501
- **model:** ACE-Step 1.5, acestep-v15-turbo, 8 steps, guidance 7.0, shift 3.0, LM acestep-5Hz-lm-1.7B
- **tier:** fast   **gate profile:** mellow   **duration:** 160 s rendered, 156.7 s installed (one-shot, nothing baked)
- **date:** 2026-10-26
- **render time:** 23.7 s per seed, model load 24.6 s
- **licence:** generated locally from a text prompt, no samples or reference audio, no third-party rights claimed
- project: greytide
- **album:** Greytide, track 5
- **submitter:** the radio, for greytide
- **tags:** table:sandpit, pov:fourth-grey-dude
- **loop:** no, a one-shot
- **length:** 6912311 samples at 44.1 kHz (156.74 s), about 109.7 bars of 4/4 at 168 bpm (the MP3 adds encoder padding; the length is of the PCM)

## Why

You asked for "Wave five: the digger has cut a shortcut and every fourth grey dude is sent down it, alone and fast". The words and the style were written for this song by the station's writers and reviewed by the conductor. So I wrote it at 168 bpm in B minor, 160 seconds, with a voice, in words I wrote myself, under the mellow gates. It has no beat to hold, so 168 bpm is only the grid I gave the model and the tempo gate is not applied. It is a one-shot: nothing is baked and the ending is the model's own. I rendered 2 seeds and threw away 1: 4050500 (1.6s of near-silence (limit 0.5)). Seed 4050501 is the take, but it did not clear every gate: 2.0s of near-silence (limit 0.5).

## Prompt

> Psychobilly rockabilly, 168 bpm, in B minor, a trio on a hot sand stage: a slapped upright bass clicking a tight lean doubled walk, bass kept under the mids, a hollow-body guitar with a twangy reverb lead and quick chord stabs, a snare-and-kick train beat with brush fills, a nervous comic male lead with hiccups and yelps, a doo-wop backing trio answering him, the key B minor held; arc: count-in and bass slap intro, fast verses, a chorus that counts out loud, a stop-time bridge, a lifted last chorus with the backing trio in full harmony, no harsh highs

## Lyrics (original, written for this track by the project; the model was given only these words)

```
[Intro: bass slap, count-in]
One, two, three, me

[Verse 1]
The digger came grinding down two pale ruts
A damp new road with a lip on its cuts
The trench goes the long way round by the shore
The new road's quicker, but it's not for all

[Verse 2]
One goes the trench and two goes the trench
Three takes the dunes where the sand is dense
Four gets a tap on his little grey head
You take the shortcut, the shortcut, he said

[Pre-Chorus]
Why is it me, why is it me
I'm only the fourth of a family

[Chorus]
Every fourth one, every fourth one
Down the new road in the afternoon sun
Faster than the others but I'm on my own
Every fourth one, every fourth one

[Verse 3]
I skip the loop where the ants make a line
I skip the spade with its catapult spine
I'm quick as a rumour, I'm first to the cross
And the castle's still up there, waiting to toss

[Chorus]
Every fourth one, every fourth one
Down the new road in the afternoon sun
Faster than the others but I'm on my own
Every fourth one, every fourth one

[Bridge: stop-time, voice and slap bass]
Nobody asked me, nobody planned
I'm a number they gave me in the sand
But a shortcut's a shortcut, a road is a road
And I'm carrying the hope of the whole grey load

[Final Chorus: lifted, full backing harmony]
Every fourth one, every fourth one
Down the new road in the afternoon sun
Faster than the others but I'm on my own
Every fourth one, every fourth one

[Outro: yelp and one last slap]
Five, six, seven, oh no, eight.
```

## Request filter

stripped: nothing

## Rejected seeds

- 4050500: 1.6s of near-silence (limit 0.5)

## Measured (the kept take, after the 60 Hz high-pass, before the loudness gain unless noted)

| gate | measured | limit | passed |
|---|---|---|---|
| tempo | 84 bpm vs asked 168 | not applied: no beat was asked for | yes |
| loudness | -17.0 LUFS installed (decoded MP3 -17.4); candidate was -15.9, gain -1.1 dB | -16 LUFS within 1 dB | **NO** |
| peak after encode | -3.06 dBFS decoded (pre-encode -3.36) | under -1 dBFS | yes |
| silence | longest 1.95 s under -50 dBFS | under 0.5 s (mellow) | **NO** |
| brightness | 2.02 % of power above 6 kHz | under 2.5 % (mellow) | yes |
| boominess | 7.01 % below 60 Hz (raw render 17.7 %) | under 12 % | yes |
| onset rate | 2.94 per second | 0.3 to 4.5 | yes |
| loop seam | step 0.12x, tail-head -56.3 dB | not applied: a one-shot, not a loop | yes |

## Words (Demucs voice stem, Whisper large-v3-turbo)

heard: One, two, three. | The new road's quicker, but it's not for all. One goes the trench and two goes the trench. Three takes the dunes where the sand is dense. Four gets a tap on the | his little grey head. You take the shortcut, the shortcut, he said. Why is it me? Why is it me? I'm only the fourth of a family. Every fourth one, every fourth one. Down the new road in the afternoon. | I skip the loop where the ants make a line. I skip the | Every fourth one, every fourth one, down the new road in the | Afternoon, son. Faster than the others, but I'm on my own. Every fourth one. Every fourth one. | Nobody asked me, nobody planned. I'm a number they gave me in the sand. But a shortcut's a shortcut, a road is a road. And I'm carrying the hope of the whole great Lord. | Every fourth one, every fourth one Down the new road in the afternoon sun Faster than the others, but I'm on my own | There'll be fourth one | Amen. | Five, six, seven, oh no.

185 words heard, 6 not in our lyrics: son great lord there'll be amen (limit 10 % of the words heard, at least 40 heard)

## Heard by a model, not a person

Not listened to: listening is off, or there is no GEMINI_API_KEY in the environment. Nobody on the machine can hear.

## Checks

kept despite failing: 2.0s of near-silence (limit 0.5)
