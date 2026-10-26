# Stretch and Snap

- **slug:** greytide-kitchen-stretch-and-snap
- **idea:** The cling film knight, a kitchen tower, stretches himself across the road, wraps whoever runs through like leftovers, then snaps and makes the wrapped ones pay.
- **mood:** theatrical, sly, taut
- **bpm:** 132 (asked) / 131 (measured, folded into 70-140)
- **key:** D minor (asked) / A major (estimated)
- **seed:** 3920500
- **model:** ACE-Step 1.5, acestep-v15-turbo, 8 steps, guidance 7.0, shift 3.0, LM acestep-5Hz-lm-1.7B
- **tier:** fast   **gate profile:** mellow   **duration:** 165 s rendered, 158.9 s installed (one-shot, nothing baked)
- **date:** 2026-10-26
- **render time:** 24.0 s per seed, model load 24.6 s
- **licence:** generated locally from a text prompt, no samples or reference audio, no third-party rights claimed
- project: greytide
- **album:** Greytide, track 5
- **submitter:** the radio, for greytide
- **tags:** table:kitchen, pov:the cling film knight
- **loop:** no, a one-shot
- **length:** 7007479 samples at 44.1 kHz (158.90 s), about 87.4 bars of 4/4 at 132 bpm (the MP3 adds encoder padding; the length is of the PCM)

## Why

You asked for "The cling film knight, a kitchen tower, stretches himself across the road, wraps whoever runs through like leftovers, then snaps and makes the wrapped ones pay.". The words and the style were written for this song by the station's writers and reviewed by the conductor. So I wrote it at 132 bpm in D minor, 165 seconds, with a voice, in words I wrote myself, under the mellow gates. It has no beat to hold, so 132 bpm is only the grid I gave the model and the tempo gate is not applied. It is a one-shot: nothing is baked and the ending is the model's own. I rendered 2 seeds and threw away 1: 3920501 (1.9s of near-silence (limit 0.5) and others). Seed 3920500 is the take, but it did not clear every gate: 0.9s of near-silence (limit 0.5).

## Prompt

> Dark cabaret tango, 132 bpm, D minor. A six-piece: an accordion carrying the hook in sharp staccato, pizzicato strings tightening each phrase, a tight lean double bass on the tango pulse well under the mids, a piano hammering the off-beats, a snare on the tango rolls, a violin wailing on the bridge. A theatrical baritone male lead with a sly female chorus answering. Taut and sly. Starts mid, a long chorus plateau, one rubato dip to accordion and voice, a lifted final chorus. D minor, no harsh highs.

## Lyrics (original, written for this track by the project; the model was given only these words)

```
[Intro: accordion and pizzicato]

[Verse 1]
I come off a roll with a serrated goodbye
Clear as a promise and thin as a lie
I stretch from the jam jar right over the road
And wait for the weight of the grey to arrive

[Pre-Chorus]
One walks in, then two walk in, then ten
Clinging to each other like old friends

[Chorus]
Stretch, stretch, stretch and snap
Wrap them in a parcel, send them back
Stretch, stretch, stretch and snap
Nobody gets through, nobody gets back

[Verse 2]
I hold them together the way you hold leftovers
Saved for tomorrow and never eaten
Then the tension rises to a note only I hear
And the ones in my parcel pay for the evening

[Pre-Chorus]
One walks in, then two walk in, then ten
Clinging to each other like old friends

[Chorus]
Stretch, stretch, stretch and snap
Wrap them in a parcel, send them back
Stretch, stretch, stretch and snap
Nobody gets through, nobody gets back

[Bridge: accordion and voice, slower]
I never stuck to a thing that I loved
I only stick to the thing that I hold
A knight is whatever goes clear and goes thin
And keeps the whole table from going cold

[Final Chorus: lifted, the violin over everything]
Stretch, stretch, stretch and snap
Wrap them in a parcel, send them back
Stretch, stretch, stretch and snap
Nobody gets through, nobody gets back

[Outro: one long accordion note, then a snap]
Snap
```

## Request filter

stripped: nothing

## Rejected seeds

- 3920501: 1.9s of near-silence (limit 0.5); harsh: 3.0% above 6 kHz (ceiling 2.5)

## Measured (the kept take, after the 60 Hz high-pass, before the loudness gain unless noted)

| gate | measured | limit | passed |
|---|---|---|---|
| tempo | 131 bpm vs asked 132 | not applied: no beat was asked for | yes |
| loudness | -16.0 LUFS installed (decoded MP3 -16.4); candidate was -15.8, gain -0.2 dB | -16 LUFS within 1 dB | yes |
| peak after encode | -3.01 dBFS decoded (pre-encode -3.24) | under -1 dBFS | yes |
| silence | longest 0.85 s under -50 dBFS | under 0.5 s (mellow) | **NO** |
| brightness | 1.72 % of power above 6 kHz | under 2.5 % (mellow) | yes |
| boominess | 4.81 % below 60 Hz (raw render 14.5 %) | under 12 % | yes |
| onset rate | 2.71 per second | 0.3 to 4.5 | yes |
| loop seam | step 0.00x, tail-head -48.2 dB | not applied: a one-shot, not a loop | yes |

## Words (Demucs voice stem, Whisper large-v3-turbo)

heard: I come off a roll with a serrated goodbye, clear as a promise and thin as a lie. I stretch from the jam jar right over the road and wait for | Clinging to each other like old friends. | Stretch, stretch, stretch and snap. Wrap them in a parcel, send them back. Stretch, stretch, stretch and snap. Nobody gets through. | Nobody gets back I Hold them together the way you hold left over safe for tomorrow and never eaten and the tension rises to a note only | I hear no ones in my parcel pay for the evening one walks in then to walk in then 10 Clinging to each other like | stretch stretch stretch and snap wrap them in a car so send them back stretch stretch stretch and snap | Nobody gets through, nobody gets back. | . | I never stuck to a thing that I loved I only stick to the thing that I hold A night is whatever goes clear and goes | stretch stretch stretch and step wrap them in a parcel send them back stretch stretch | stretch stretch and snap nobody gets through nobody gets back

186 words heard, 7 not in our lyrics: left safe no car so night step (limit 10 % of the words heard, at least 40 heard)

## Heard by a model, not a person

Not listened to: listening is off, or there is no GEMINI_API_KEY in the environment. Nobody on the machine can hear.

## Checks

kept despite failing: 0.9s of near-silence (limit 0.5)
