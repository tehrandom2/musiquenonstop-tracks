# Hold Still

- **slug:** greytide-desk-hold-still
- **idea:** Wave 9: the painter's hand finishes the half-painted mini in the helping hands, skin and teal sleeves and a gold point on a steel spear, and sets it down at the exit to flick the leakers away.
- **mood:** tender, devoted, rising
- **bpm:** 72 (asked) / 71 (measured, folded into 70-140)
- **key:** C minor (asked) / A# major (estimated)
- **seed:** 3910901
- **model:** ACE-Step 1.5, acestep-v15-turbo, 8 steps, guidance 7.0, shift 3.0, LM acestep-5Hz-lm-1.7B
- **tier:** fast   **gate profile:** mellow   **duration:** 175 s rendered, 169.4 s installed (one-shot, nothing baked)
- **date:** 2026-10-26
- **render time:** 25.4 s per seed, model load 24.6 s
- **licence:** generated locally from a text prompt, no samples or reference audio, no third-party rights claimed
- project: greytide
- **album:** Greytide, track 9
- **submitter:** the radio, for greytide
- **tags:** table:desk, pov:the painter's hand
- **loop:** no, a one-shot
- **length:** 7471407 samples at 44.1 kHz (169.42 s), about 50.8 bars of 3/4 at 72 bpm (the MP3 adds encoder padding; the length is of the PCM)

## Why

You asked for "Wave 9: the painter's hand finishes the half-painted mini in the helping hands, skin and teal sleeves and a gold point on a steel spear, and sets it down at the exit to flick the leakers away.". The words and the style were written for this song by the station's writers and reviewed by the conductor. So I wrote it at 72 bpm in C minor, 175 seconds, with a voice, in words I wrote myself, under the mellow gates. It has no beat to hold, so 72 bpm is only the grid I gave the model and the tempo gate is not applied. It is a one-shot: nothing is baked and the ending is the model's own. I rendered 2 seeds and threw away 1: 3910900 (passed, but outranked by the kept takes). Seed 3910901 is the take.

## Prompt

> Slow-burning gospel soul waltz in 3/4, 72 bpm, C minor. A small band: a warm organ holding long chords, a piano playing rolling triplets, a tight lean bass well under the mids, brushed drums that switch to sticks for the last chorus, a three-voice backing choir. A rich female soul alto lead, intimate in the verses and full on the chorus. Tender and devoted. Starts soft but moving, a long chorus plateau, one dip to voice and organ, a lifted final chorus with the choir. C minor, no harsh highs.

## Lyrics (original, written for this track by the project; the model was given only these words)

```
[Intro: organ alone, then piano]

[Verse 1]
All night you waited in the helping hands
Half a face, a grey arm, a spear with no shine
I kept looking back at you between the waves
Telling you soon now, soon, it's nearly time

[Pre-Chorus]
Skin on the cheek, warm and thin
Teal on the sleeves, let the colour in

[Chorus]
Hold still, hold still
This is the last thing I'll do
A gold point on a steel spear
And then they're counting on you

[Verse 2]
Wave nine, I lift you out of the clips
And set you down where the road runs out
The leakers come and you flick them back
Paint still wet, and not a shadow of doubt

[Pre-Chorus]
Skin on the cheek, warm and thin
Teal on the sleeves, let the colour in

[Chorus]
Hold still, hold still
This is the last thing I'll do
A gold point on a steel spear
And then they're counting on you

[Bridge: voice and organ only]
Nobody sees what you do when I'm gone
Nobody claps on a desk at two
But I'll know by the scuff on the rim of your base
That you stood there all night, that it was you

[Final Chorus: lifted, the choir and the drums in full]
Hold still, hold still
This is the last thing I'll do
A gold point on a steel spear
And then they're counting on you

[Outro: organ and choir]
Hold still
```

## Request filter

stripped: nothing

## Rejected seeds

- 3910900: passed, but outranked by the kept takes

## Measured (the kept take, after the 60 Hz high-pass, before the loudness gain unless noted)

| gate | measured | limit | passed |
|---|---|---|---|
| tempo | 71 bpm vs asked 72 | not applied: no beat was asked for | yes |
| loudness | -16.0 LUFS installed (decoded MP3 -16.4); candidate was -17.3, gain +1.3 dB | -16 LUFS within 1 dB | yes |
| peak after encode | -2.71 dBFS decoded (pre-encode -3.10) | under -1 dBFS | yes |
| silence | longest 0.10 s under -50 dBFS | under 0.5 s (mellow) | yes |
| brightness | 1.54 % of power above 6 kHz | under 2.5 % (mellow) | yes |
| boominess | 4.25 % below 60 Hz (raw render 10.0 %) | under 12 % | yes |
| onset rate | 2.58 per second | 0.3 to 4.5 | yes |
| loop seam | step 0.01x, tail-head -10.8 dB | not applied: a one-shot, not a loop | yes |

## Words (Demucs voice stem, Whisper large-v3-turbo)

heard: All night, you waited in the helping hands. Half a face, a grey on a spear with no shine. | I kept looking back at you between the waves Telling you soon, now soon, it's nearly time Skin on the cheek, whoa | This is the | I'll do a gold coin on a steel spear and then they're counting on you. | The clips and set you down where the road runs out The leakers come and you flip | them back paint still wet and not a shadow of doubt skin on the cheek warm and thin teal on the sleeves let the color | Hold still. Hold still. This is the last thing I'll do. The gold point. | Oh, but I see. | What you do when I'm gone Nobody claps on a desk or two But I'll know by the scuff On the rim of your base That you stood there all night | that it was you. Hold still, hold still, this is the last thing I'll | A cold point on a steel spear And then they're counting on you | Hold still.

179 words heard, 8 not in our lyrics: whoa coin flip color oh see or cold (limit 10 % of the words heard, at least 40 heard)

## Heard by a model, not a person

Not listened to: listening is off, or there is no GEMINI_API_KEY in the environment. Nobody on the machine can hear.

## Checks

all automatic checks passed. These are numbers, not hearing: nobody on the machine can hear, the owner listens.
