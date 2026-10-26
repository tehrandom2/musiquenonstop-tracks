# Hold Them Till the Bell

- **slug:** greytide-schooldesk-hold-them-till-the-bell
- **idea:** wave 10: the lunchbox, the thing they all wanted, sings to the painted towers holding the lid as the bell is about to ring
- **mood:** anthemic, tender, defiant
- **bpm:** 140 (asked) / 139 (measured, folded into 70-140)
- **key:** E minor (asked) / E minor (estimated)
- **seed:** 4011001
- **model:** ACE-Step 1.5, acestep-v15-turbo, 8 steps, guidance 7.0, shift 3.0, LM acestep-5Hz-lm-1.7B
- **tier:** fast   **gate profile:** mellow   **duration:** 178 s rendered, 173.0 s installed (one-shot, nothing baked)
- **date:** 2026-10-26
- **render time:** 25.6 s per seed, model load 24.6 s
- **licence:** generated locally from a text prompt, no samples or reference audio, no third-party rights claimed
- project: greytide
- **album:** Greytide, track 10
- **submitter:** the radio, for greytide
- **tags:** table:schooldesk, pov:lunchbox
- **loop:** no, a one-shot
- **length:** 7629128 samples at 44.1 kHz (173.00 s), about 100.9 bars of 4/4 at 140 bpm (the MP3 adds encoder padding; the length is of the PCM)

## Why

You asked for "wave 10: the lunchbox, the thing they all wanted, sings to the painted towers holding the lid as the bell is about to ring". The words and the style were written for this song by the station's writers and reviewed by the conductor. So I wrote it at 140 bpm in E minor, 178 seconds, with a voice, in words I wrote myself, under the mellow gates. It has no beat to hold, so 140 bpm is only the grid I gave the model and the tempo gate is not applied. It is a one-shot: nothing is baked and the ending is the model's own. I rendered 2 seeds and threw away 1: 4011000 (0.9s of near-silence (limit 0.5) and others). Seed 4011001 is the take, but it did not clear every gate: 0.8s of near-silence (limit 0.5).

## Prompt

> Anthemic indie punk, 140 bpm, E minor, a big five-piece: two driving guitars, one on power chords and one on a ringing melodic lead, a tight lean bass pushing eighths, bass well under the mids, a pounding drum kit with floor toms in the verses, a glockenspiel doubling the hook, a warm raw male lead, a full gang chorus on every hook, in E minor, tender and defiant, mid start, a long high plateau, a dip to glockenspiel and voice, a huge lifted final chorus, warm saturation, no harsh highs

## Lyrics (original, written for this track by the project; the model was given only these words)

```
[Intro - glockenspiel plays the hook, then the band]

[Verse 1]
I'm a lunchbox, a sandwich and an apple and a note
Something someone packed for you, a sum and a joke
All night the grey ones wanted me, I don't know why
Maybe what they wanted was the hand that packed it right

[Pre-Chorus]
And the towers on the lid, with their careful coats of paint
Stood between me and the pencil case, and never once complained

[Chorus - gang chorus]
Hold them till the bell (hold them)
Hold them till the bell
Ten waves of nobody watching
Hold them till the bell

[Verse 2]
The margin's full of ticks and a red cross or two
See me, it says, and I see you
The compass and the glue stick and the band upon its pin
A calculator rolling sevens, letting nobody in

[Pre-Chorus]
And the grey ones at my corner, they are only what they are
Plastic that never had its turn, and they've come so far

[Chorus - gang chorus]
Hold them till the bell (hold them)
Hold them till the bell
Ten waves of nobody watching
Hold them till the bell

[Bridge - glockenspiel and voice, then the drums build]
And when it rings, the kid will lift me up and never know
That a war was fought down here, three centimetres tall
That the smallest things were brave all afternoon
Ring, bell, ring, and make it soon

[Final Chorus - lifted, the whole band and every voice]
Hold them till the bell (hold them)
Hold them till the bell
Ten waves of nobody watching
Hold them till the bell

[Outro - the bell, then the glockenspiel alone]
Ring.
```

## Request filter

stripped: nothing

## Rejected seeds

- 4011000: 0.9s of near-silence (limit 0.5); 233 of 372 heard words are not ours (63 %; limit 10 %, at least 40 heard): coos eyes oh margins oh d*** ways love watch shame centimeters oh

## Measured (the kept take, after the 60 Hz high-pass, before the loudness gain unless noted)

| gate | measured | limit | passed |
|---|---|---|---|
| tempo | 139 bpm vs asked 140 | not applied: no beat was asked for | yes |
| loudness | -16.0 LUFS installed (decoded MP3 -16.4); candidate was -13.3, gain -2.7 dB | -16 LUFS within 1 dB | yes |
| peak after encode | -4.13 dBFS decoded (pre-encode -3.90) | under -1 dBFS | yes |
| silence | longest 0.80 s under -50 dBFS | under 0.5 s (mellow) | **NO** |
| brightness | 2.15 % of power above 6 kHz | under 2.5 % (mellow) | yes |
| boominess | 3.59 % below 60 Hz (raw render 11.3 %) | under 12 % | yes |
| onset rate | 2.90 per second | 0.3 to 4.5 | yes |
| loop seam | step 0.02x, tail-head +6.8 dB | not applied: a one-shot, not a loop | yes |

## Words (Demucs voice stem, Whisper large-v3-turbo)

heard: I'm a lunchbox, a sandwich and an apple and a note Something someone packed for you is something that a joke All night the grey ones won't be | I don't know why. Maybe what they wanted was the hand that packed it right. And the towers on the lid with their careful coats of paint stood between me and the pencil case. And | Hold them till the bell. Hold them till the bell. | Ten waves of nobody watching Hold them till the bell | The margins full of ticks and a red cross or two See me, it sells, and I see you The compass and the glue stick in the band upon its pin A calculator rolling sevens letting nobody in | Oh, baby! | 10 waves of nobody | watching hold them till the bell | And when it rings, the kid will lift me up and never know that a war was fought down here three centimeters tall, that the smallest things were brave all afternoon. Ring, bell, ring, and make it | Hold them till the bell. Hold them. Hold them till the bell. | Ten waves of nobody watching. Hold them to a bell. | you

192 words heard, 9 not in our lyrics: is won't be margins sells oh baby centimeters to (limit 10 % of the words heard, at least 40 heard)

## Heard by a model, not a person

Not listened to: listening is off, or there is no GEMINI_API_KEY in the environment. Nobody on the machine can hear.

## Checks

kept despite failing: 0.8s of near-silence (limit 0.5)
