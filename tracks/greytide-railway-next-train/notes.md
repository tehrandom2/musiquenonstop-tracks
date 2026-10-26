# Next Train

- **slug:** greytide-railway-next-train
- **idea:** Wave one: the departure board counts down to the first train, twelve seconds in and every twenty-eight after; the board sings its timetable
- **mood:** mechanical, cool, inevitable
- **bpm:** 140 (asked) / 138 (measured, folded into 70-140)
- **key:** A minor (asked) / A minor (estimated)
- **seed:** 4060101
- **model:** ACE-Step 1.5, acestep-v15-turbo, 8 steps, guidance 7.0, shift 3.0, LM acestep-5Hz-lm-1.7B
- **tier:** fast   **gate profile:** mellow   **duration:** 165 s rendered, 158.1 s installed (one-shot, nothing baked)
- **date:** 2026-10-26
- **render time:** 24.0 s per seed, model load 24.6 s
- **licence:** generated locally from a text prompt, no samples or reference audio, no third-party rights claimed
- project: greytide
- **album:** Greytide, track 1
- **submitter:** the radio, for greytide
- **tags:** table:railway, pov:departure-board
- **loop:** no, a one-shot
- **length:** 6970495 samples at 44.1 kHz (158.06 s), about 92.2 bars of 4/4 at 140 bpm (the MP3 adds encoder padding; the length is of the PCM)

## Why

You asked for "Wave one: the departure board counts down to the first train, twelve seconds in and every twenty-eight after; the board sings its timetable". The words and the style were written for this song by the station's writers and reviewed by the conductor. So I wrote it at 140 bpm in A minor, 165 seconds, with a voice, in words I wrote myself, under the mellow gates. It has no beat to hold, so 140 bpm is only the grid I gave the model and the tempo gate is not applied. It is a one-shot: nothing is baked and the ending is the model's own. I rendered 2 seeds and threw away 1: 4060100 (0.6s of near-silence (limit 0.5) and others). Seed 4060101 is the take, but it did not clear every gate: 1.0s of near-silence (limit 0.5).

## Prompt

> Motorik electro-krautrock, 140 bpm, in A minor, a four-piece machine band on a model railway: a relentless motorik kick and snare pattern with closed hats on every eighth, a tight lean sequenced bass under the mids pulsing on the root, a ringing clean guitar arpeggio like rails humming, analogue synth pads swelling on the chorus, a flat deadpan male lead singing as the station departure board, with a cool female voice answering him on the hook, the key A minor held throughout; arc: a ticking intro of hats and a counting voice, steady verses at mid level, a chorus that widens, a bridge stripped to bass and ticks, a lifted final chorus with every synth in, no harsh highs

## Lyrics (original, written for this track by the project; the model was given only these words)

```
[Intro: hats tick, a voice counts]
Twelve. Eleven. Ten.

[Verse 1]
Two posts high at the back of the board
Yellow letters and a quiet chord
Departures, I say, in a gold that glows
I count the trains and the grey ones go

[Verse 2]
Next wave this, and next train that
Lives in a column, the score is flat
Twelve seconds first, then every twenty-eight
One line of track and it's never late

[Pre-Chorus]
The engine waits in the dark of the hill
The numbers fall and the hex is still

[Chorus]
Next train, next train, the board says so
Out of the tunnel and in we go
Count it down from the dark to the day
Next train, next train, get out of the way

[Verse 3]
I flash my letters when the line is live
Train on the line, and the gates arrive
I cannot shout and I cannot run
I only say what is coming, son

[Chorus]
Next train, next train, the board says so
Out of the tunnel and in we go
Count it down from the dark to the day
Next train, next train, get out of the way

[Bridge: bass and ticks only]
Every minute is a promise kept
Every second is a step they stepped
The grey ones read me but they never learn
A timetable doesn't wait its turn

[Final Chorus: lifted, all synths in]
Next train, next train, the board says so
Out of the tunnel and in we go
Count it down from the dark to the day
Next train, next train, get out of the way

[Outro: the count again, to zero]
Three. Two. One. Train on the line.
```

## Request filter

stripped: nothing

## Rejected seeds

- 4060100: 0.6s of near-silence (limit 0.5); 235 of 361 heard words are not ours (65 %; limit 10 %, at least 40 heard): close court cold clothes trainer who color yeah lit oh oh oh

## Measured (the kept take, after the 60 Hz high-pass, before the loudness gain unless noted)

| gate | measured | limit | passed |
|---|---|---|---|
| tempo | 138 bpm vs asked 140 | not applied: no beat was asked for | yes |
| loudness | -16.0 LUFS installed (decoded MP3 -16.4); candidate was -14.7, gain -1.3 dB | -16 LUFS within 1 dB | yes |
| peak after encode | -3.33 dBFS decoded (pre-encode -3.59) | under -1 dBFS | yes |
| silence | longest 0.95 s under -50 dBFS | under 0.5 s (mellow) | **NO** |
| brightness | 2.24 % of power above 6 kHz | under 2.5 % (mellow) | yes |
| boominess | 7.25 % below 60 Hz (raw render 14.8 %) | under 12 % | yes |
| onset rate | 3.14 per second | 0.3 to 4.5 | yes |
| loop seam | step 0.01x, tail-head -58.3 dB | not applied: a one-shot, not a loop | yes |

## Words (Demucs voice stem, Whisper large-v3-turbo)

heard: To a post high at the back of the board, yellow lettuce. | and a quiet chord. Departures, I say, in the gold that glows. I count the trains and the grey ones glow. | Next wave, this next train lives in a column, the score is flat. Twelve seconds first, then every twenty-eight. One line of track and it's never late. | The engine waits in the dark of the hill. The numbers fall and the hex is still. Next train, next train, the boy. | Out of the tunnel and in we go Count it down from the dark to the day Next train, next train, get out of the way | I flash my letters when the line is lit Train on the line and the gates arrive I cannot shout and I cannot run | I only say what is coming, son. Next train, next train, the board says so. Out of the tunnel and in we go. Count it down from the dark to the day, next train. | next train get out of the way | Every minute is a promise kept Every second is a step they step The grey ones read me but they never learn A time take | Next train, next train, the port says so. Out of the tunnel and then we go. Count it down from the dark to the day. Next train, next train. | train get out of the way three two one train on the

241 words heard, 8 not in our lyrics: post lettuce glow boy lit time take port (limit 10 % of the words heard, at least 40 heard)

## Heard by a model, not a person

Not listened to: listening is off, or there is no GEMINI_API_KEY in the environment. Nobody on the machine can hear.

## Checks

kept despite failing: 1.0s of near-silence (limit 0.5)
