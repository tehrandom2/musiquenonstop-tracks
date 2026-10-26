# Two Leaves at the End of the Line

- **slug:** greytide-sill-two-leaves
- **idea:** The seedling in its pot at the exit, the thing the towers defend, droops a little for every dude that gets past and counts the lives down
- **mood:** brave, aching, rising
- **bpm:** 136 (asked) / 134 (measured, folded into 70-140)
- **key:** F# minor (asked) / F# minor (estimated)
- **seed:** 3970700
- **model:** ACE-Step 1.5, acestep-v15-turbo, 8 steps, guidance 7.0, shift 3.0, LM acestep-5Hz-lm-1.7B
- **tier:** fast   **gate profile:** mellow   **duration:** 176 s rendered, 172.3 s installed (one-shot, nothing baked)
- **date:** 2026-10-26
- **render time:** 25.9 s per seed, model load 24.6 s
- **licence:** generated locally from a text prompt, no samples or reference audio, no third-party rights claimed
- project: greytide
- **album:** Greytide, track 7
- **submitter:** the radio, for greytide
- **tags:** table:sill, pov:seedling
- **loop:** no, a one-shot
- **length:** 7598362 samples at 44.1 kHz (172.30 s), about 97.6 bars of 4/4 at 136 bpm (the MP3 adds encoder padding; the length is of the PCM)

## Why

You asked for "The seedling in its pot at the exit, the thing the towers defend, droops a little for every dude that gets past and counts the lives down". The words and the style were written for this song by the station's writers and reviewed by the conductor. So I wrote it at 136 bpm in F# minor, 176 seconds, with a voice, in words I wrote myself, under the mellow gates. It has no beat to hold, so 136 bpm is only the grid I gave the model and the tempo gate is not applied. It is a one-shot: nothing is baked and the ending is the model's own. I rendered 2 seeds and threw away 1: 3970701 (1.0s of near-silence (limit 0.5) and others). Seed 3970700 is the take, but it did not clear every gate: 1.2s of near-silence (limit 0.5).

## Prompt

> Cinematic post-rock, 136 bpm, F# minor, brave and aching: a heartbeat kick and floor toms that grow into a full driving kit, tremolo-picked electric guitars shimmering in F# minor, a tight lean bass climbing under the mids, a glockenspiel picking out a small fragile melody, a string section swelling in the choruses, a clear high female lead, open and unafraid, with a small choir on the hook, in F# minor; intro of tremolo and heartbeat, verses quiet, the chorus breaking open, a bridge stripped to tremolo and voice that counts down and builds, the final chorus at full height with choir and strings, the outro falling back to glockenspiel, no harsh highs

## Lyrics (original, written for this track by the project; the model was given only these words)

```
[Intro: tremolo guitar and a heartbeat kick]

[Verse 1]
I'm two leaves and a promise in a pot at the end of the road
Everything they're fighting for is green I haven't grown
Every grey that slips past me, I bow a little low
Twenty lives of standing up, and one by one they go

[Pre-Chorus]
Hold them, hold them
Up on the clay, hold them

[Chorus]
Two leaves at the end of the line
Bowing for every one that gets by
Painted on the pots, keep my head up high
Two leaves at the end of the line

[Verse 2]
The watering can is busy with the groove and not with me
It soaks the grey and grows them moss and lets the flowers be
It hasn't watered anyone, the other plants have said
But every dude it slows down is a leaf that keeps its head

[Pre-Chorus]
Hold them, hold them
Up on the clay, hold them

[Chorus]
Two leaves at the end of the line
Bowing for every one that gets by
Painted on the pots, keep my head up high
Two leaves at the end of the line

[Bridge: down to tremolo and voice, then building]
Nineteen, eighteen, I'm still green
Twelve, eleven, somewhere in between
Somebody painted the towers so they'd stand
Nobody painted me, I'm why they stand

[Final Chorus: full height, choir and strings]
Two leaves at the end of the line
Bowing for every one that gets by
Painted on the pots, keep my head up high
Two leaves at the end of the line

[Outro: glockenspiel alone]
Two leaves
Still green
```

## Request filter

stripped: nothing

## Rejected seeds

- 3970701: 1.0s of near-silence (limit 0.5); 17 of 122 heard words are not ours (14 %; limit 10 %, at least 40 heard): promising apart eyes are holding holding holding grain must fly it's to

## Measured (the kept take, after the 60 Hz high-pass, before the loudness gain unless noted)

| gate | measured | limit | passed |
|---|---|---|---|
| tempo | 134 bpm vs asked 136 | not applied: no beat was asked for | yes |
| loudness | -16.0 LUFS installed (decoded MP3 -16.4); candidate was -12.7, gain -3.3 dB | -16 LUFS within 1 dB | yes |
| peak after encode | -3.75 dBFS decoded (pre-encode -4.12) | under -1 dBFS | yes |
| silence | longest 1.20 s under -50 dBFS | under 0.5 s (mellow) | **NO** |
| brightness | 2.20 % of power above 6 kHz | under 2.5 % (mellow) | yes |
| boominess | 5.46 % below 60 Hz (raw render 18.1 %) | under 12 % | yes |
| onset rate | 2.61 per second | 0.3 to 4.5 | yes |
| loop seam | step 0.32x, tail-head -39.9 dB | not applied: a one-shot, not a loop | yes |

## Words (Demucs voice stem, Whisper large-v3-turbo)

heard: I'm to leave send the promise in a pot at the end of the road | Everything they're fighting for is green I haven't grown Every grey that slips past me About a little old twenty lives Of standing up in one by one they | Hold them, hold them up on the clay, hold them. Two leaves at the end of the lighting, bowing forth. | The watering can is | busy with the groove and not with me. It soaks the gray and grows the moss and lets the flowers be. It hasn't watered anyone the other plants have said, but | Every dude it slows down is a leaf that keeps its head. Hold them, hold them up on the clay. Hold them. | New leaves at the end of the line. | 1918, I'm still green. 12, 11, 12. | Somewhere in between Somebody painted the tower so they'd stand Nobody painted me, I'm why they stand | Everyone that gets fired. | Paint it on the pots, keep my head up high. Two leaves at the end of the line. Two leaves. | Still green.

175 words heard, 13 not in our lyrics: to leave send about old lighting forth gray new tower everyone fired paint (limit 10 % of the words heard, at least 40 heard)

## Heard by a model, not a person

Not listened to: listening is off, or there is no GEMINI_API_KEY in the environment. Nobody on the machine can hear.

## Checks

kept despite failing: 1.2s of near-silence (limit 0.5)
