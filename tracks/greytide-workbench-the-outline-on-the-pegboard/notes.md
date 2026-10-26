# The Outline on the Pegboard

- **slug:** greytide-workbench-the-outline-on-the-pegboard
- **idea:** Mid-night quiet: the painted outline of the good hammer on the pegboard, empty while the hammer is out, sees the grey horde as outlines waiting to be filled in
- **mood:** tender, aching, hopeful
- **bpm:** 88 (asked) / 88 (measured, folded into 70-140)
- **key:** B minor (asked) / D major (estimated)
- **seed:** 3960601
- **model:** ACE-Step 1.5, acestep-v15-turbo, 8 steps, guidance 7.0, shift 3.0, LM acestep-5Hz-lm-1.7B
- **tier:** fast   **gate profile:** mellow   **duration:** 170 s rendered, 163.9 s installed (one-shot, nothing baked)
- **date:** 2026-10-26
- **render time:** 24.9 s per seed, model load 24.6 s
- **licence:** generated locally from a text prompt, no samples or reference audio, no third-party rights claimed
- project: greytide
- **album:** Greytide, track 6
- **submitter:** the radio, for greytide
- **tags:** table:workbench, pov:pegboard-outline
- **loop:** no, a one-shot
- **length:** 7229823 samples at 44.1 kHz (163.94 s), about 60.1 bars of 4/4 at 88 bpm (the MP3 adds encoder padding; the length is of the PCM)

## Why

You asked for "Mid-night quiet: the painted outline of the good hammer on the pegboard, empty while the hammer is out, sees the grey horde as outlines waiting to be filled in". The words and the style were written for this song by the station's writers and reviewed by the conductor. So I wrote it at 88 bpm in B minor, 170 seconds, with a voice, in words I wrote myself, under the mellow gates. It has no beat to hold, so 88 bpm is only the grid I gave the model and the tempo gate is not applied. It is a one-shot: nothing is baked and the ending is the model's own. I rendered 2 seeds and threw away 1: 3960600 (passed, but outranked by the kept takes). Seed 3960601 is the take.

## Prompt

> Tender alt-folk ballad at 88 bpm in B minor, a small night ensemble: a fingerpicked acoustic guitar in a rocking pattern, a soft lean upright bass, bass under the mids, brushed snare, a slow pedal steel sighing under the chorus, a warm low string pair in the last chorus; an intimate, weathered male lead, close and unhurried, with a soft female harmony on the hook; starts quiet, grows over two choruses, a near-silent bridge, a lifted final chorus, B minor, gentle, no harsh highs

## Lyrics (original, written for this track by the project; the model was given only these words)

```
[Intro - guitar alone]

[Verse 1]
On the pegboard wall there's a black painted shape
The size of the good hammer, plus a centimetre and a half
Someone drew around it so they'd know where it belongs
THE GOOD HAMMER, says the label, NOT THE OTHER ONE
The hammer's out tonight, it's somewhere on the bench
And the outline hangs there empty, waiting, patient as a fence

[Pre-Chorus]
Every tool has a place
(Every place has a shape)

[Chorus]
I'm the outline of the thing that's gone
Hold the shape and the shape holds on
Come back home, come back home
I'm the outline, I'm the outline

[Verse 2]
I look down at the belt and I see them going by
Every grey one is an outline of a colour in the sky
Nobody's filled them in yet, nobody drew around their place
They're walking to be finished, and I know that empty space
SPANNERS (SOME) beside me, DRIVERS, ALL FLAT
MEASURE TWICE, CUT ONCE, and underneath it, SHRUG, like that

[Pre-Chorus]
Every tool has a place
(Every place has a shape)

[Chorus]
I'm the outline of the thing that's gone
Hold the shape and the shape holds on
Come back home, come back home
I'm the outline, I'm the outline

[Bridge - near silence, voice and pedal steel]
A shape is just a promise
Somebody meant to keep
Paint is just a promise
Somebody makes in their sleep

[Final Chorus - lifted, strings in]
I'm the outline of the thing that's gone
Hold the shape and the shape holds on
Come back home, come back home
I'm the outline, I'm the outline

[Outro - guitar alone]
Come back home.
```

## Request filter

stripped: nothing

## Rejected seeds

- 3960600: passed, but outranked by the kept takes

## Measured (the kept take, after the 60 Hz high-pass, before the loudness gain unless noted)

| gate | measured | limit | passed |
|---|---|---|---|
| tempo | 88 bpm vs asked 88 | not applied: no beat was asked for | yes |
| loudness | -16.0 LUFS installed (decoded MP3 -16.4); candidate was -14.7, gain -1.2 dB | -16 LUFS within 1 dB | yes |
| peak after encode | -3.07 dBFS decoded (pre-encode -3.27) | under -1 dBFS | yes |
| silence | longest 0.35 s under -50 dBFS | under 0.5 s (mellow) | yes |
| brightness | 1.22 % of power above 6 kHz | under 2.5 % (mellow) | yes |
| boominess | 4.10 % below 60 Hz (raw render 14.2 %) | under 12 % | yes |
| onset rate | 3.09 per second | 0.3 to 4.5 | yes |
| loop seam | step 0.17x, tail-head -65.0 dB | not applied: a one-shot, not a loop | yes |

## Words (Demucs voice stem, Whisper large-v3-turbo)

heard: On the pegboard wall, there's a black painted shape | The size of the good hammer plus a centimeter and a half Someone drew around it so they know where it belongs The good hammer says the label not the other | The hammer's out tonight, it's somewhere on the bench, and the outline hangs there empty, waiting, patient as a fence. Every tool has a place. | Every place has a shape. I'm the outline of the thing that's wrong. Hold the shape and the shape holds on. Come back home. Come back home. I'm the outline. I'm the outline. | I look down at the belt and I see them going by Every grey one is an outline of a colour in the sky Nobody's filled them in yet | Nobody drew around their place. They're walking to be finished. And I know that empty space banner. Some beside me. Drivers all flat. Measure tweets cut on seeing underneath. | I'm the outline of the thing that's gone, hold the shape and the shape holds up. | Come back home, come back home I'm the outline and I'm the outline A shape is just a promise Somebody meant to keep | Paint is just a promise Somebody makes in their sleep | I'm the outline of the thing that's gone. Hold the shape and the shape holds on. Come back home. Come back home. I'm the outline. I'm the outline. | Come back home.

236 words heard, 7 not in our lyrics: centimeter they wrong banner tweets seeing up (limit 10 % of the words heard, at least 40 heard)

## Heard by a model, not a person

Not listened to: listening is off, or there is no GEMINI_API_KEY in the environment. Nobody on the machine can hear.

## Checks

all automatic checks passed. These are numbers, not hearing: nobody on the machine can hear, the owner listens.
