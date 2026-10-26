# Find Your Own Way

- **slug:** greytide-sandpit-find-your-own-way
- **idea:** After wave two: the kid's hand plucks the two signposts out of the sand; the signposts sing their goodbye
- **mood:** wry, warm, bittersweet
- **bpm:** 132 (asked) / 134 (measured, folded into 70-140)
- **key:** A minor (asked) / A major (estimated)
- **seed:** 4050200
- **model:** ACE-Step 1.5, acestep-v15-turbo, 8 steps, guidance 7.0, shift 3.0, LM acestep-5Hz-lm-1.7B
- **tier:** fast   **gate profile:** mellow   **duration:** 160 s rendered, 158.0 s installed (one-shot, nothing baked)
- **date:** 2026-10-26
- **render time:** 22.9 s per seed, model load 24.6 s
- **licence:** generated locally from a text prompt, no samples or reference audio, no third-party rights claimed
- project: greytide
- **album:** Greytide, track 2
- **submitter:** the radio, for greytide
- **tags:** table:sandpit, pov:signposts
- **loop:** no, a one-shot
- **length:** 6966747 samples at 44.1 kHz (157.98 s), about 86.9 bars of 4/4 at 132 bpm (the MP3 adds encoder padding; the length is of the PCM)

## Why

You asked for "After wave two: the kid's hand plucks the two signposts out of the sand; the signposts sing their goodbye". The words and the style were written for this song by the station's writers and reviewed by the conductor. So I wrote it at 132 bpm in A minor, 160 seconds, with a voice, in words I wrote myself, under the mellow gates. It has no beat to hold, so 132 bpm is only the grid I gave the model and the tempo gate is not applied. It is a one-shot: nothing is baked and the ending is the model's own. I rendered 2 seeds and threw away 1: 4050201 (2.5s of near-silence (limit 0.5)). Seed 4050200 is the take.

## Prompt

> Dusty desert blues-rock stomp, 132 bpm, in A minor, a trio in the heat: a slide guitar on a resonator carrying the riff, a stomped kick and handclap pattern on every beat with a shaker on the eighths, a tight lean bass under the mids doubling the riff an octave down, a warm baritone female lead, wry and knowing, with a low male harmony on the hook, the key A minor said again in the riff; arc: slide guitar intro, steady verses, a chorus that opens up, a breakdown to claps and voice, the final chorus lifted with a second slide line, warm saturation in the mids, no harsh highs

## Lyrics (original, written for this track by the project; the model was given only these words)

```
[Intro: slide guitar and stomp]

[Verse 1]
We stood two waves in the burning sand
The only words in a lettered hand
We told the grey which way was low
We told them where the water goes

[Verse 2]
Then a blue sleeve blocked out half the sky
A bare arm long as a day goes by
Two fingers pinched me by the post
And lifted me up like a little ghost

[Pre-Chorus]
Up past the castle, up past the flag
Over the rail like a paper rag

[Chorus]
Find your own way, find your own way
The hand takes the signs at the end of the day
What we were for, you know it by heart
Find your own way, now you play your part

[Verse 3]
Down on the sand the towers wait
No one to read and no one to say straight
The ballista squints at the empty dune
The spade digs in and it hums a tune

[Chorus]
Find your own way, find your own way
The hand takes the signs at the end of the day
What we were for, you know it by heart
Find your own way, now you play your part

[Breakdown: claps and voice only]
A lesson's a thing you get to keep
Even when the teacher's gone to sleep
The stick wrote it, the sand still shows
Low and fast is the way it goes

[Final Chorus: lifted, second slide line]
Find your own way, find your own way
The hand takes the signs at the end of the day
What we were for, you know it by heart
Find your own way, now you play your part

[Outro: slide guitar alone]
Now you play your part.
```

## Request filter

stripped: nothing

## Rejected seeds

- 4050201: 2.5s of near-silence (limit 0.5)

## Measured (the kept take, after the 60 Hz high-pass, before the loudness gain unless noted)

| gate | measured | limit | passed |
|---|---|---|---|
| tempo | 134 bpm vs asked 132 | not applied: no beat was asked for | yes |
| loudness | -16.0 LUFS installed (decoded MP3 -16.4); candidate was -15.8, gain -0.2 dB | -16 LUFS within 1 dB | yes |
| peak after encode | -1.63 dBFS decoded (pre-encode -3.20) | under -1 dBFS | yes |
| silence | longest 0.40 s under -50 dBFS | under 0.5 s (mellow) | yes |
| brightness | 1.99 % of power above 6 kHz | under 2.5 % (mellow) | yes |
| boominess | 4.30 % below 60 Hz (raw render 15.7 %) | under 12 % | yes |
| onset rate | 2.80 per second | 0.3 to 4.5 | yes |
| loop seam | step 0.03x, tail-head -66.8 dB | not applied: a one-shot, not a loop | yes |

## Words (Demucs voice stem, Whisper large-v3-turbo)

heard: We stood two waves in the burning sand, the only way | Then a blue sleeve block | half the sky a bare arm long as a day goes by two fingers pinched me by the post and lifted me up like a little ghost up past the castle | The hand takes the signs at the end of the day what we were for you know it by | Find your own way, now you play your part Down on the sand, the towers wait No one to read and no one to see straight | The police just squints at the empty doom The spade digs in and it hums a tune Find your own way, find your own way The hand takes the signs at the end of the day | Lessons a thing you get to keep even when | The hand takes the sign. | at the end of the day. | . | Thank you.

150 words heard, 8 not in our lyrics: block see police just doom lessons sign thank (limit 10 % of the words heard, at least 40 heard)

## Heard by a model, not a person

Not listened to: listening is off, or there is no GEMINI_API_KEY in the environment. Nobody on the machine can hear.

## Checks

all automatic checks passed. These are numbers, not hearing: nobody on the machine can hear, the owner listens.
