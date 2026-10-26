# The Snail's Trail

- **slug:** greytide-picnic-the-snails-trail
- **idea:** Wave ten, the boss: the snail that crossed one corner all table long sums up the evening; the sandwich survives and its silver trail is the record of the night
- **mood:** kind, slow, swelling
- **bpm:** 128 (asked) / 127 (measured, folded into 70-140)
- **key:** A minor (asked) / A major (estimated)
- **seed:** 4001001
- **model:** ACE-Step 1.5, acestep-v15-turbo, 8 steps, guidance 7.0, shift 3.0, LM acestep-5Hz-lm-1.7B
- **tier:** fast   **gate profile:** mellow   **duration:** 180 s rendered, 175.0 s installed (one-shot, nothing baked)
- **date:** 2026-10-26
- **render time:** 28.2 s per seed, model load 24.6 s
- **licence:** generated locally from a text prompt, no samples or reference audio, no third-party rights claimed
- project: greytide
- **album:** Greytide, track 10
- **submitter:** the radio, for greytide
- **tags:** table:picnic, pov:the snail
- **loop:** no, a one-shot
- **length:** 7716670 samples at 44.1 kHz (174.98 s), about 93.3 bars of 4/4 at 128 bpm (the MP3 adds encoder padding; the length is of the PCM)

## Why

You asked for "Wave ten, the boss: the snail that crossed one corner all table long sums up the evening; the sandwich survives and its silver trail is the record of the night". The words and the style were written for this song by the station's writers and reviewed by the conductor. So I wrote it at 128 bpm in A minor, 180 seconds, with a voice, in words I wrote myself, under the mellow gates. It has no beat to hold, so 128 bpm is only the grid I gave the model and the tempo gate is not applied. It is a one-shot: nothing is baked and the ending is the model's own. I rendered 2 seeds and threw away 1: 4001000 (1.0s of near-silence (limit 0.5)). Seed 4001001 is the take.

## Prompt

> Folk rock building to a gospel lift, 128 bpm, A minor: a fingerpicked acoustic guitar, a tight lean bass, bass under the mids, entering in the second verse, a drummer building from brushes to a full kit with a tambourine, a harmonium holding chords, a gospel choir for the final chorus, a warm, slow-voiced male lead, unhurried and kind; warm, no harsh highs; starts quiet on guitar and voice, builds verse by verse to a long high plateau, one dip to harmonium, a final lift with the choir, A minor, ends on one held chord

## Lyrics (original, written for this track by the project; the model was given only these words)

```
[Intro: fingerpicked guitar alone]
All table long

[Verse 1]
I started at the corner when the first wave came
I'm the snail on the gingham and I'm going all the same
I never drafted, never fired, never stood my ground
I just kept on crossing while the war went round

[Verse 2]
I saw the sprinkler waking and the ants on the bread
The gnome take a beating with a smile on his head
I saw the sun go under and the fairy lights come on
And a ball the size of heaven roll the bravest ones along

[Pre-Chorus]
Nobody painted me, I came this way
A shell and a slowness and the end of the day

[Chorus]
Look at the trail
Shining all the way
Look at the trail
Everything we did today
Look at the trail

[Verse 3]
The last box came out of the grass in the dark
The towers gave it everything, every single mark
The sandwich is still there, a little bit chewed
And the grey who got through only wanted some food

[Chorus]
Look at the trail
Shining all the way
Look at the trail
Everything we did today
Look at the trail

[Bridge: harmonium and voice only]
In the morning they'll fold up the checks and the lawn
Will be just a lawn, and the giants all gone
But I'll have gone over from one side to the other
And the silver will shine where we stood together

[Final Chorus: lifted, the choir singing with me]
Look at the trail
Shining all the way
Look at the trail
Everything we did today
Look at the trail

[Outro: one held chord]
All table long
```

## Request filter

stripped: nothing

## Rejected seeds

- 4001000: 1.0s of near-silence (limit 0.5)

## Measured (the kept take, after the 60 Hz high-pass, before the loudness gain unless noted)

| gate | measured | limit | passed |
|---|---|---|---|
| tempo | 127 bpm vs asked 128 | not applied: no beat was asked for | yes |
| loudness | -16.0 LUFS installed (decoded MP3 -16.4); candidate was -14.9, gain -1.1 dB | -16 LUFS within 1 dB | yes |
| peak after encode | -3.26 dBFS decoded (pre-encode -3.35) | under -1 dBFS | yes |
| silence | longest 0.10 s under -50 dBFS | under 0.5 s (mellow) | yes |
| brightness | 1.44 % of power above 6 kHz | under 2.5 % (mellow) | yes |
| boominess | 3.33 % below 60 Hz (raw render 9.9 %) | under 12 % | yes |
| onset rate | 2.65 per second | 0.3 to 4.5 | yes |
| loop seam | step 0.03x, tail-head -50.8 dB | not applied: a one-shot, not a loop | yes |

## Words (Demucs voice stem, Whisper large-v3-turbo)

heard: I started at the corner when the first wave came on the snow | I saw the spirit of the | Yeah. | Nobody painted me. I came this way. A shell and a slowness and the end of the day. Look at the trail shining all the way. | Look at the trail. Everything we did today, look at the trail. The last box came out of the trail. | Look at the trail | Shining all the way. Look at the trail. Everything we did today. Look at the trail. | . | In the morning they'll fold up the checks and the lawn We'll be just alone and the giants all gone But all have gone over from one side to the other | Look at the trail, shining all the way. Look at the trail, shining all the way. | Oh! | table long.

136 words heard, 6 not in our lyrics: snow spirit yeah we'll alone oh (limit 10 % of the words heard, at least 40 heard)

## Heard by a model, not a person

Not listened to: listening is off, or there is no GEMINI_API_KEY in the environment. Nobody on the machine can hear.

## Checks

all automatic checks passed. These are numbers, not hearing: nobody on the machine can hear, the owner listens.
