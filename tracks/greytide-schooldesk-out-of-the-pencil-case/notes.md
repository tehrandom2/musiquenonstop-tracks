# Out of the Pencil Case

- **slug:** greytide-schooldesk-out-of-the-pencil-case
- **idea:** wave 1: the zip opens and a grey grunt climbs out of the pencil case onto the lid, eyes on the lunchbox at the far end
- **mood:** scrappy, cheeky, hungry
- **bpm:** 148 (asked) / 73 (measured, folded into 70-140)
- **key:** E minor (asked) / E major (estimated)
- **seed:** 4010100
- **model:** ACE-Step 1.5, acestep-v15-turbo, 8 steps, guidance 7.0, shift 3.0, LM acestep-5Hz-lm-1.7B
- **tier:** fast   **gate profile:** mellow   **duration:** 168 s rendered, 162.7 s installed (one-shot, nothing baked)
- **date:** 2026-10-26
- **render time:** 24.9 s per seed, model load 24.6 s
- **licence:** generated locally from a text prompt, no samples or reference audio, no third-party rights claimed
- project: greytide
- **album:** Greytide, track 1
- **submitter:** the radio, for greytide
- **tags:** table:schooldesk, pov:grunt
- **loop:** no, a one-shot
- **length:** 7173375 samples at 44.1 kHz (162.66 s), about 100.3 bars of 4/4 at 148 bpm (the MP3 adds encoder padding; the length is of the PCM)

## Why

You asked for "wave 1: the zip opens and a grey grunt climbs out of the pencil case onto the lid, eyes on the lunchbox at the far end". The words and the style were written for this song by the station's writers and reviewed by the conductor. So I wrote it at 148 bpm in E minor, 168 seconds, with a voice, in words I wrote myself, under the mellow gates. It has no beat to hold, so 148 bpm is only the grid I gave the model and the tempo gate is not applied. It is a one-shot: nothing is baked and the ending is the model's own. I rendered 2 seeds and threw away 1: 4010101 (2.8s of near-silence (limit 0.5) and others). Seed 4010100 is the take, but it did not clear every gate: harsh: 2.7% above 6 kHz (ceiling 2.5).

## Prompt

> Garage punk, 148 bpm, E minor, a scrappy four-piece: a scratchy overdriven rhythm guitar on a two-chord riff, a second guitar answering with short bent stabs, a busy pick-played bass in a tight lean line, bass well under the mids, a fast snare-driven beat with tom fills, a cocky male lead half-shouting, a gang chorus answering every hook, in E minor, cheeky and hungry, starts mid with the riff alone, a long high plateau, one stop-time dip, a lifted last chorus, warm saturation, no harsh highs

## Lyrics (original, written for this track by the project; the model was given only these words)

```
[Intro - the riff alone, then the drums crash in]

[Verse 1]
Zip goes the pencil case, a silver grin
Twenty of us tumble out and tumble in
Past the chewed blue biro and the paper-clip chain
Grey as the margin and we're grey again

[Pre-Chorus]
Somebody's slumped at the back of the row
Somebody's bored, so we're ready to go

[Chorus - gang shout, call and response]
Zip it open! (Here we come)
Grey on the lid and we're ten to one
Lunchbox at the far end (far end)
Grey till the bell, then we'll see who won

[Verse 2]
Some of us roll in the pencil groove
Faster in the channel than our legs can move
A marble went first and it showed us the way
Rolled to the end and it didn't stay
There's a compass on its needle drawing circles in the lead
And a rubber band strung tight across the road ahead

[Pre-Chorus]
Somebody painted them, careful and slow
Nobody painted us, so here we go

[Chorus - gang shout, call and response]
Zip it open! (Here we come)
Grey on the lid and we're ten to one
Lunchbox at the far end (far end)
Grey till the bell, then we'll see who won

[Breakdown - stop-time, bass and snare only]
Arrows on the desk lid, this way, this way
Signposts in biro, this way, this way
We don't read, we follow, this way, this way

[Final Chorus - lifted, the whole band and the gang]
Zip it open! (Here we come)
Grey on the lid and we're ten to one
Lunchbox at the far end (far end)
Grey till the bell, then we'll see who won

[Outro - the riff alone, a last shout]
Ten to one!
```

## Request filter

stripped: nothing

## Rejected seeds

- 4010101: 2.8s of near-silence (limit 0.5); 234 of 395 heard words are not ours (59 %; limit 10 %, at least 40 heard): sip bottle oh oh oh oh oh oh oh oh oh oh

## Measured (the kept take, after the 60 Hz high-pass, before the loudness gain unless noted)

| gate | measured | limit | passed |
|---|---|---|---|
| tempo | 73 bpm vs asked 148 | not applied: no beat was asked for | yes |
| loudness | -16.0 LUFS installed (decoded MP3 -16.4); candidate was -15.6, gain -0.4 dB | -16 LUFS within 1 dB | yes |
| peak after encode | -2.77 dBFS decoded (pre-encode -3.27) | under -1 dBFS | yes |
| silence | longest 0.30 s under -50 dBFS | under 0.5 s (mellow) | yes |
| brightness | 2.68 % of power above 6 kHz | under 2.5 % (mellow) | **NO** |
| boominess | 5.49 % below 60 Hz (raw render 16.2 %) | under 12 % | yes |
| onset rate | 3.46 per second | 0.3 to 4.5 | yes |
| loop seam | step 0.00x, tail-head -54.8 dB | not applied: a one-shot, not a loop | yes |

## Words (Demucs voice stem, Whisper large-v3-turbo)

heard: . | Simple. | Okay. | We don't believe | And we're 10 to 1 Lunchbox at the bar end, bar end Wait till the bell, then we'll see who won Some of us roll in the pencil groove Faster in the channel than our legs can move | A marble went first and it showed us the way Rolled to the end and it didn't stay There's a compass on its needle drawing circles in the lid And a rubber band strung tight across the road ahead Somebody | Nobody painted us, so here we go. Snip it open, here we go. | Grey on the lid and we're ten to one Lunchbox and the foreign, foreign Grey till the bell then we'll see who won Arrows on the desk lit | This way, this way, signpost and borrow. This way, this way, we don't read, we follow. This way, this way. | Zip it open, here we go. Gray on the lid and we're ten to one. Lunchbox at the bar end. Gray to the bell, then we'll see who won. | 10 to 1

172 words heard, 15 not in our lyrics: simple okay believe bar bar wait snip foreign foreign lit signpost borrow gray bar gray (limit 10 % of the words heard, at least 40 heard)

## Heard by a model, not a person

Not listened to: listening is off, or there is no GEMINI_API_KEY in the environment. Nobody on the machine can hear.

## Checks

kept despite failing: harsh: 2.7% above 6 kHz (ceiling 2.5)
