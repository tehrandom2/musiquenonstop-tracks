# Rubbed Out

- **slug:** greytide-schooldesk-rubbed-out
- **idea:** after wave 2: a signpost drawn on the lid knows the big pink rubber is coming; it was only ever the lesson, and the towers have learned the way
- **mood:** bittersweet, driving, proud
- **bpm:** 136 (asked) / 134 (measured, folded into 70-140)
- **key:** A minor (asked) / A minor (estimated)
- **seed:** 4010210
- **model:** ACE-Step 1.5, acestep-v15-turbo, 8 steps, guidance 7.0, shift 3.0, LM acestep-5Hz-lm-1.7B
- **tier:** fast   **gate profile:** mellow   **duration:** 162 s rendered, 160.1 s installed (one-shot, nothing baked)
- **date:** 2026-10-26
- **render time:** 23.6 s per seed, model load 68.0 s
- **licence:** generated locally from a text prompt, no samples or reference audio, no third-party rights claimed
- project: greytide
- **album:** Greytide, track 2
- **submitter:** the radio, for greytide
- **tags:** table:schooldesk, pov:signpost
- **loop:** no, a one-shot
- **length:** 7062226 samples at 44.1 kHz (160.14 s), about 90.7 bars of 4/4 at 136 bpm (the MP3 adds encoder padding; the length is of the PCM)

## Why

You asked for "after wave 2: a signpost drawn on the lid knows the big pink rubber is coming; it was only ever the lesson, and the towers have learned the way". The words and the style were written for this song by the station's writers and reviewed by the conductor. So I wrote it at 136 bpm in A minor, 162 seconds, with a voice, in words I wrote myself, under the mellow gates. It has no beat to hold, so 136 bpm is only the grid I gave the model and the tempo gate is not applied. It is a one-shot: nothing is baked and the ending is the model's own. I rendered 2 seeds and threw away 1: 4010211 (1.1s of near-silence (limit 0.5)). Seed 4010210 is the take.

## Prompt

> Driving new wave, 136 bpm, A minor, a four-piece with a job each: a chorused clean guitar picking an eighth-note figure, a melodic tight lean bass, bass well under the mids, a busy straight drum machine with live tom fills, a cold string-synth pad holding the chords, a warm male lead singing low in the verses and opening up in the chorus, a soft female harmony on the hook, in A minor, bittersweet and driving, mid start, a long high middle, a dip to pad and voice, a lifted last chorus, no harsh highs

## Lyrics (original, written for this track by the project; the model was given only these words)

```
[Intro - the guitar figure over the drum machine]

[Verse 1]
I was the arrow drawn in biro on the lid
This way to the lunchbox, that's all I ever did
Mind the pencil groove, the marble rolls you on
Every little painted thing read me and moved along

[Pre-Chorus]
And now the hand is coming, pink and wide
A rubber like a cloud on the far side

[Chorus]
Rub me out, I was only the way in
Rub me out, you know the road by now
Two waves of pointing and that's my whole life
Rub me out, you know the road by now

[Verse 2]
I watched the ballista learn to lead the line
I watched the glue stick swipe a stripe and take its time
The cannon used to ask me, which way do they come?
Now it doesn't look at me, it counts them one by one

[Pre-Chorus]
The crumbs of me are rolling off the edge
A little grey of graphite on the ledge

[Chorus]
Rub me out, I was only the way in
Rub me out, you know the road by now
Two waves of pointing and that's my whole life
Rub me out, you know the road by now

[Bridge - the band drops to pad and voice]
Every lesson's meant to vanish when it's learned
Every arrow points away from where it's turned
If you're good at this, you'll never see me again
That's the kindest thing a signpost ever penned

[Final Chorus - lifted, full band, harmony doubled]
Rub me out, I was only the way in
Rub me out, you know the road by now
Two waves of pointing and that's my whole life
Rub me out, you know the road by now

[Outro - the guitar figure thinning out]
This way. That way. Your way now.
```

## Request filter

stripped: nothing

## Rejected seeds

- 4010211: 1.1s of near-silence (limit 0.5)

## Measured (the kept take, after the 60 Hz high-pass, before the loudness gain unless noted)

| gate | measured | limit | passed |
|---|---|---|---|
| tempo | 134 bpm vs asked 136 | not applied: no beat was asked for | yes |
| loudness | -16.0 LUFS installed (decoded MP3 -16.4); candidate was -14.2, gain -1.8 dB | -16 LUFS within 1 dB | yes |
| peak after encode | -3.00 dBFS decoded (pre-encode -3.46) | under -1 dBFS | yes |
| silence | longest 0.25 s under -50 dBFS | under 0.5 s (mellow) | yes |
| brightness | 2.04 % of power above 6 kHz | under 2.5 % (mellow) | yes |
| boominess | 11.41 % below 60 Hz (raw render 26.3 %) | under 12 % | yes |
| onset rate | 3.73 per second | 0.3 to 4.5 | yes |
| loop seam | step 0.01x, tail-head -60.2 dB | not applied: a one-shot, not a loop | yes |

## Words (Demucs voice stem, Whisper large-v3-turbo)

heard: . | I was the air and fire on the list. | This way to the lunchbox, it's all I ever did. Mind the pencil groove, the marble rolls you on. Every little painted thing read me and moved along. And now the hand's coming deep. | Thank you. | You know the road by now. I watched the police to learn to lead the line. I watched the glue stick swipe a stripe. The cannon used to ask me which way. | Now it doesn't look at me, it counts them one by one. The crumbs of me are rolling off the edge. A little gray of graphite on the left. Run me up, I was only the way you | You know the road by now. | . | Every lesson's meant to vanish me again. Every arrow points your way from where it's turned. If you're good at this, you'll never see me again. That's the kindest thing inside. | I was only the way in | me out in all the road by now.

166 words heard, 12 not in our lyrics: air fire list hand's deep thank police gray left run up inside (limit 10 % of the words heard, at least 40 heard)

## Heard by a model, not a person

Not listened to: listening is off, or there is no GEMINI_API_KEY in the environment. Nobody on the machine can hear.

## Checks

all automatic checks passed. These are numbers, not hearing: nobody on the machine can hear, the owner listens.
