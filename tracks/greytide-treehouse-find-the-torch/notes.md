# Find The Torch

- **slug:** greytide-treehouse-find-the-torch
- **idea:** Wave three: the sun goes down and the torch lying on its side comes on; it does no harm, it only lights the grey ones so every tower hits harder; the torch's point of view.
- **mood:** nocturnal, brave, wondering
- **bpm:** 132 (asked) / 131 (measured, folded into 70-140)
- **key:** F minor (asked) / F major (estimated)
- **seed:** 4040401
- **model:** ACE-Step 1.5, acestep-v15-turbo, 8 steps, guidance 7.0, shift 3.0, LM acestep-5Hz-lm-1.7B
- **tier:** fast   **gate profile:** mellow   **duration:** 165 s rendered, 161.5 s installed (one-shot, nothing baked)
- **date:** 2026-10-26
- **render time:** 24.2 s per seed, model load 24.6 s
- **licence:** generated locally from a text prompt, no samples or reference audio, no third-party rights claimed
- project: greytide
- **album:** Greytide, track 4
- **submitter:** the radio, for greytide
- **tags:** table:treehouse, pov:torch tower
- **loop:** no, a one-shot
- **length:** 7123931 samples at 44.1 kHz (161.54 s), about 88.8 bars of 4/4 at 132 bpm (the MP3 adds encoder padding; the length is of the PCM)

## Why

You asked for "Wave three: the sun goes down and the torch lying on its side comes on; it does no harm, it only lights the grey ones so every tower hits harder; the torch's point of view.". The words and the style were written for this song by the station's writers and reviewed by the conductor. So I wrote it at 132 bpm in F minor, 165 seconds, with a voice, in words I wrote myself, under the mellow gates. It has no beat to hold, so 132 bpm is only the grid I gave the model and the tempo gate is not applied. It is a one-shot: nothing is baked and the ending is the model's own. I rendered 2 seeds and threw away 1: 4040400 (harsh: 3.5% above 6 kHz (ceiling 2.5)). Seed 4040401 is the take, but it did not clear every gate: harsh: 2.9% above 6 kHz (ceiling 2.5).

## Prompt

> Shimmering new wave, 132 bpm, F minor, nocturnal and brave. A tight band with every part in its lane: a chiming chorused guitar arpeggio, a warm analogue synth pad opening like a beam, tight lean picked bass under the mids driving eighths, a bright synth lead answering the hook, crisp drum machine and live snare. A clear, earnest male tenor lead, airy female harmonies on the chorus. Arc: pad swelling from dark, verse at mid energy, a long high chorus plateau, a breakdown to pad and voice, a lifted final chorus with the harmonies, a beam-like fade. F minor, no harsh highs.

## Lyrics (original, written for this track by the project; the model was given only these words)

```
[Intro: a pad swells out of the dark]
The sun is going down

[Verse 1]
Lying on my side on the boards
Propped up on a pencil end
Apricot went out of the sky
And the dusk came round the bend
Someone pinned a note on the plank
Find the torch, it said
So I opened up my single eye
And laid a road ahead

[Pre-Chorus]
I don't hit, I don't bite
I just hold them in the light

[Chorus]
Find the torch when the sun goes down
I won't hurt a single one
Find the torch when the sun goes down
I just show you where they run

[Verse 2]
Every grey one in my beam
Stands out sharp and plain
The cannon finds them easier
The ballista takes its aim
Moths come dancing round their heads
Like they're famous for a while
When the floor leans I roll with it
And the beam swings down the aisle

[Pre-Chorus]
I don't hit, I don't bite
I just hold them in the light

[Chorus]
Find the torch when the sun goes down
I won't hurt a single one
Find the torch when the sun goes down
I just show you where they run

[Breakdown: pad and voice alone]
Everybody's braver in the light
Even the ones in grey
I wonder if they like it
Being seen for once, this way

[Final Chorus: lifted, harmonies wide]
Find the torch when the sun goes down
I won't hurt a single one
Find the torch when the sun goes down
I just show you where they run
Find the torch when the sun goes down
I just show you where they run

[Outro: the beam fades out slowly]
```

## Request filter

stripped: nothing

## Rejected seeds

- 4040400: harsh: 3.5% above 6 kHz (ceiling 2.5)

## Measured (the kept take, after the 60 Hz high-pass, before the loudness gain unless noted)

| gate | measured | limit | passed |
|---|---|---|---|
| tempo | 131 bpm vs asked 132 | not applied: no beat was asked for | yes |
| loudness | -16.0 LUFS installed (decoded MP3 -16.4); candidate was -14.6, gain -1.4 dB | -16 LUFS within 1 dB | yes |
| peak after encode | -3.50 dBFS decoded (pre-encode -3.59) | under -1 dBFS | yes |
| silence | longest 0.10 s under -50 dBFS | under 0.5 s (mellow) | yes |
| brightness | 2.86 % of power above 6 kHz | under 2.5 % (mellow) | **NO** |
| boominess | 7.11 % below 60 Hz (raw render 20.4 %) | under 12 % | yes |
| onset rate | 3.14 per second | 0.3 to 4.5 | yes |
| loop seam | step 0.00x, tail-head -31.0 dB | not applied: a one-shot, not a loop | yes |

## Words (Demucs voice stem, Whisper large-v3-turbo)

heard: My son is growing down. Lying on my side on the board. | Propped up on pencil and Apricot went out of the sky And the dust came round the bed Someone pinned a note on the plane | I don't hear, I don't bite | I just hold them in the light. Light the torch when the sun goes down. I won't hurt a single one. Light the torch when the sun goes down. | I just show you where they run. Every gray one in my beam stands out sharp and plain. The camera's | Thank you. | So | Find a torch when the sun goes down. I won't hurt a single one. Find a torch when the sun goes down. I just show you where they run. | Everybody's braver in the light, even the ones in grey. I wonder if they like it, being seen for once this way. | Find the torch when the sun goes down. I won't hurt a single one. Find the torch when the sun goes down. I just show you | where they run. Find the torch when the sun goes down. I just show you where they run.

190 words heard, 10 not in our lyrics: son growing board dust bed plane hear gray camera's thank (limit 10 % of the words heard, at least 40 heard)

## Heard by a model, not a person

Not listened to: listening is off, or there is no GEMINI_API_KEY in the environment. Nobody on the machine can hear.

## Checks

kept despite failing: harsh: 2.9% above 6 kHz (ceiling 2.5)
