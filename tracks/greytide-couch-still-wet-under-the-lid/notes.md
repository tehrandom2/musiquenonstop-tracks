# Still Wet Under The Lid

- **slug:** greytide-couch-still-wet-under-the-lid
- **idea:** After a wave the seam gives up a long-lost paint pot, still wet under its lid; the colour the whole horde wants, picked up for Points instead; its point of view.
- **mood:** tender, aching, wondering
- **bpm:** 96 (asked) / 95 (measured, folded into 70-140)
- **key:** C minor (asked) / F major (estimated)
- **seed:** 4030800
- **model:** ACE-Step 1.5, acestep-v15-turbo, 8 steps, guidance 7.0, shift 3.0, LM acestep-5Hz-lm-1.7B
- **tier:** fast   **gate profile:** mellow   **duration:** 168 s rendered, 167.4 s installed (one-shot, nothing baked)
- **date:** 2026-10-26
- **render time:** 24.3 s per seed, model load 24.6 s
- **licence:** generated locally from a text prompt, no samples or reference audio, no third-party rights claimed
- project: greytide
- **album:** Greytide, track 8
- **submitter:** the radio, for greytide
- **tags:** table:couch, pov:lost paint pot
- **loop:** no, a one-shot
- **length:** 7381474 samples at 44.1 kHz (167.38 s), about 67.0 bars of 4/4 at 96 bpm (the MP3 adds encoder padding; the length is of the PCM)

## Why

You asked for "After a wave the seam gives up a long-lost paint pot, still wet under its lid; the colour the whole horde wants, picked up for Points instead; its point of view.". The words and the style were written for this song by the station's writers and reviewed by the conductor. So I wrote it at 96 bpm in C minor, 168 seconds, with a voice, in words I wrote myself, under the mellow gates. It has no beat to hold, so 96 bpm is only the grid I gave the model and the tempo gate is not applied. It is a one-shot: nothing is baked and the ending is the model's own. I rendered 2 seeds and threw away 1: 4030801 (passed, but outranked by the kept takes). Seed 4030800 is the take.

## Prompt

> Tender folk soul, 96 bpm, C minor, warm and aching. A small late-night band: fingerpicked nylon guitar, a soft felt piano answering each line, a cello holding long notes, tight lean upright bass well under the mids, brushed drums entering at the first chorus. A low, warm female alto lead, close soft harmonies on the hook. Arc: guitar alone, a hushed verse, a chorus that opens with brushes and cello, a fuller second verse, a bridge where it drops to piano and voice, a lifted final chorus with the harmonies wide, a quiet outro. C minor, gentle, no harsh highs.

## Lyrics (original, written for this track by the project; the model was given only these words)

```
[Intro: fingerpicked guitar alone]

[Verse 1]
I rolled off a desk in the summer
Lid tight and a drip down the side
Down past the seam and the piping
Into the dark where the lost things hide
There's a button, a hair grip, a sweet
And a coin that keeps telling the time
And every night the floor above me
Shakes with the grey ones in line

[Chorus]
I've been down here since the summer
Still wet under the lid
Twenty points if the hand comes looking
For the colour that I hid

[Verse 2]
The grey ones walk right over
Never knowing what's below
Every one of them wants painting
Every one of them is slow
And I could be their morning
I could be a coat of red
But the painter's hand is reaching
And it wants a tower instead

[Chorus]
I've been down here since the summer
Still wet under the lid
Twenty points if the hand comes looking
For the colour that I hid

[Bridge: piano and voice alone]
Who gets the colour, who stays grey
Who decides what a pot is for
I was mixed for a cloak on a captain
I'd have given it to anyone poor

[Final Chorus: lifted, harmonies wide, cello swelling]
I've been down here since the summer
Still wet under the lid
Twenty points if the hand comes looking
For the colour that I hid
Twenty points if the hand comes looking
For the colour that I hid

[Outro: guitar and cello fading]
Still wet. Still here.
```

## Request filter

stripped: nothing

## Rejected seeds

- 4030801: passed, but outranked by the kept takes

## Measured (the kept take, after the 60 Hz high-pass, before the loudness gain unless noted)

| gate | measured | limit | passed |
|---|---|---|---|
| tempo | 95 bpm vs asked 96 | not applied: no beat was asked for | yes |
| loudness | -16.0 LUFS installed (decoded MP3 -16.4); candidate was -14.7, gain -1.3 dB | -16 LUFS within 1 dB | yes |
| peak after encode | -3.16 dBFS decoded (pre-encode -3.28) | under -1 dBFS | yes |
| silence | longest 0.10 s under -50 dBFS | under 0.5 s (mellow) | yes |
| brightness | 1.13 % of power above 6 kHz | under 2.5 % (mellow) | yes |
| boominess | 4.54 % below 60 Hz (raw render 14.1 %) | under 12 % | yes |
| onset rate | 3.03 per second | 0.3 to 4.5 | yes |
| loop seam | step 0.01x, tail-head -29.7 dB | not applied: a one-shot, not a loop | yes |

## Words (Demucs voice stem, Whisper large-v3-turbo)

heard: I rolled off a desk in the summer Lit tight and it dripped down the side | Down past the seam and the piping Into the dark where the lost things hide There's a button, a hair grip, a sweep | In a coin that keeps telling the time And every night the floor above me Shakes with the grey ones in line | I've been down here since the summer Still wet under the lid 20 points if the hand comes looking | For the color that I hear The gray ones walk right over Never knowing what's below Every one of them wants paint | Every one of them is slow. And I could be there mourning. I could be a coat of red. But the painter's hand is reaching. And it wants a tower instead. I've been down here. | 20 points if the hand comes looking for the colors. | That I hit Who gets the color who stays gray Who decides what a pot is for | I was mixed for a cloak on a captain I'd have given it to anyone poor I've been down here since the summer | Still wet under the lid 20 points if the hand comes looking For the color that I hit | 20 points if the hand comes looking for the color that I hit. | Thank you.

216 words heard, 19 not in our lyrics: lit dripped sweep color hear gray paint there mourning colors hit color gray color hit color hit thank you (limit 10 % of the words heard, at least 40 heard)

## Heard by a model, not a person

Not listened to: listening is off, or there is no GEMINI_API_KEY in the environment. Nobody on the machine can hear.

## Checks

all automatic checks passed. These are numbers, not hearing: nobody on the machine can hear, the owner listens.
