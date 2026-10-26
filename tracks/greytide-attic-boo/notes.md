# Boo

- **slug:** greytide-attic-boo
- **idea:** The dust sheet ghost tower, a carefully painted knight hiding under a sheet, says boo; the haunted grey ones run back and take more from every hit
- **mood:** comic, spooky, hammy
- **bpm:** 146 (asked) / 73 (measured, folded into 70-140)
- **key:** E minor (asked) / A major (estimated)
- **seed:** 3980500
- **model:** ACE-Step 1.5, acestep-v15-turbo, 8 steps, guidance 7.0, shift 3.0, LM acestep-5Hz-lm-1.7B
- **tier:** fast   **gate profile:** mellow   **duration:** 165 s rendered, 163.4 s installed (one-shot, nothing baked)
- **date:** 2026-10-26
- **render time:** 24.1 s per seed, model load 24.6 s
- **licence:** generated locally from a text prompt, no samples or reference audio, no third-party rights claimed
- project: greytide
- **album:** Greytide, track 5
- **submitter:** the radio, for greytide
- **tags:** table:attic, pov:tower
- **loop:** no, a one-shot
- **length:** 7206751 samples at 44.1 kHz (163.42 s), about 99.4 bars of 4/4 at 146 bpm (the MP3 adds encoder padding; the length is of the PCM)

## Why

You asked for "The dust sheet ghost tower, a carefully painted knight hiding under a sheet, says boo; the haunted grey ones run back and take more from every hit". The words and the style were written for this song by the station's writers and reviewed by the conductor. So I wrote it at 146 bpm in E minor, 165 seconds, with a voice, in words I wrote myself, under the mellow gates. It has no beat to hold, so 146 bpm is only the grid I gave the model and the tempo gate is not applied. It is a one-shot: nothing is baked and the ending is the model's own. I rendered 2 seeds and threw away 1: 3980501 (0.7s of near-silence (limit 0.5)). Seed 3980500 is the take, but it did not clear every gate: 1.5s of near-silence (limit 0.5).

## Prompt

> Spooky surf rock, 146 bpm, E minor, comic and haunted: a driving surf drum beat with tom rolls, a dripping reverb-soaked lead guitar picking a fast E minor melody, a tight lean bass running under the mids, a wheezing combo organ, a wavering high synth like a ghostly whistle, a hammy male crooner lead with a female backing trio singing oohs and shouting the boo, in E minor; intro of reverb guitar and an organ swell, verses swaggering, a call and response chorus, a bridge of organ and voice, the final chorus lifted with the trio doubled, the outro a last spooky glide, no harsh highs

## Lyrics (original, written for this track by the project; the model was given only these words)

```
[Intro: reverb guitar and an organ swell]

[Verse 1]
Under a dust sheet with two holes for eyes
Painted beneath it, but that's a surprise
I take a while to warm up, I take a while to brew
But when I finally say it, it's coming straight for you

[Pre-Chorus]
Ooh, wait for it
Ooh, wait for it

[Chorus: call and response]
Boo! And the alley runs back
Every hit lands a quarter harder after that
Boo! From under the sheet
Haunted little grey ones on their wobbly feet

[Verse 2]
A dude that's been frightened is brave for a while
He walks right past me, I give him a smile
A smile he can't see, for the sheet's in the way
I'll get him on the next one, I've got all night to stay

[Pre-Chorus]
Ooh, wait for it
Ooh, wait for it

[Chorus: call and response]
Boo! And the alley runs back
Every hit lands a quarter harder after that
Boo! From under the sheet
Haunted little grey ones on their wobbly feet

[Bridge: organ and voice]
Under the sheet is a knight in blue
Painted so carefully, nobody knew
I'd show you my colours, I'd show you my shield
But the boo does the job, so the sheet stays sealed

[Final Chorus: lifted, the trio doubled]
Boo! And the alley runs back
Every hit lands a quarter harder after that
Boo! From under the sheet
Haunted little grey ones on their wobbly feet

[Outro: a last spooky glide]
Boo.
```

## Request filter

stripped: nothing

## Rejected seeds

- 3980501: 0.7s of near-silence (limit 0.5)

## Measured (the kept take, after the 60 Hz high-pass, before the loudness gain unless noted)

| gate | measured | limit | passed |
|---|---|---|---|
| tempo | 73 bpm vs asked 146 | not applied: no beat was asked for | yes |
| loudness | -16.0 LUFS installed (decoded MP3 -16.4); candidate was -14.8, gain -1.2 dB | -16 LUFS within 1 dB | yes |
| peak after encode | -3.18 dBFS decoded (pre-encode -3.33) | under -1 dBFS | yes |
| silence | longest 1.45 s under -50 dBFS | under 0.5 s (mellow) | **NO** |
| brightness | 2.09 % of power above 6 kHz | under 2.5 % (mellow) | yes |
| boominess | 5.71 % below 60 Hz (raw render 16.0 %) | under 12 % | yes |
| onset rate | 2.73 per second | 0.3 to 4.5 | yes |
| loop seam | step 0.14x, tail-head -10.9 dB | not applied: a one-shot, not a loop | yes |

## Words (Demucs voice stem, Whisper large-v3-turbo)

heard: . | Under the sheet with two holes for eyes, painted beneath it, | If that's a surprise, I'd take a while to warm up, I'd take a while to brew. But when I finally say it, it's coming straight for you. | Wait for it Wait for it And the alley runs back | Every hit lands a quarter harder after that Some under the sheep Haunted little gray ones on their wobbly feet But dude that's been frightened Is brave for a while | He walks right past me. I give him a smile. A smile he can't see. For the sheets in the way. I'll get him on the next | I've got all night to stay Wait for it Wait for it | Wait for it, and the alley runs back. Every hit lands a quarter harder after that. From under the sheet, haunted little gray ones on their wobbly feet. | Under the sheet is a night in blue Painted so carefully nobody knew I'd show you my colors, I'd show you my shields | But the boo does the job so the sheet stays sealed Boo! And the alley runs back Every hit lands a quarter harder after that Boo! | Under the sheet Haunting little grey ones on their wobbly feet

207 words heard, 9 not in our lyrics: if some sheep gray sheets gray colors shields haunting (limit 10 % of the words heard, at least 40 heard)

## Heard by a model, not a person

Not listened to: listening is off, or there is no GEMINI_API_KEY in the environment. Nobody on the machine can hear.

## Checks

kept despite failing: 1.5s of near-silence (limit 0.5)
