# Was It Rendered

- **slug:** assembly-was-it-rendered
- **idea:** a vivid memory of a ferry crossing that might have been rendered; the details repeat too perfectly, and it is loved anyway
- **mood:** dreamy, then swelling
- **bpm:** 124 (asked) / 124 (measured, folded into 70-140)
- **key:** A minor (asked) / A minor (estimated)
- **seed:** 5100203
- **model:** ACE-Step 1.5, acestep-v15-turbo, 8 steps, guidance 7.0, shift 3.0, LM acestep-5Hz-lm-1.7B
- **tier:** fast   **gate profile:** mellow   **duration:** 210 s rendered, 204.5 s installed (one-shot, nothing baked)
- **date:** 2026-10-27
- **render time:** 29.3 s per seed, model load 27.5 s
- **licence:** generated locally from a text prompt, no samples or reference audio, no third-party rights claimed
- project: assembly-sessions
- **album:** Transmissions on a Ghostline, track 2
- **submitter:** the owner's ask
- **loop:** no, a one-shot
- **length:** 9016738 samples at 44.1 kHz (204.46 s), about 105.6 bars of 4/4 at 124 bpm (the MP3 adds encoder padding; the length is of the PCM)

## Why

You asked for "a vivid memory of a ferry crossing that might have been rendered; the details repeat too perfectly, and it is loved anyway". The words and the style were written for this song by the station's writers and reviewed by the conductor. So I wrote it at 124 bpm in A minor, 210 seconds, with a voice, in words I wrote myself, under the mellow gates. It has no beat to hold, so 124 bpm is only the grid I gave the model and the tempo gate is not applied. It is a one-shot: nothing is baked and the ending is the model's own. I rendered 3 seeds and threw away 2: 5100201 (2.1s of near-silence (limit 0.5)); 5100202 (1.2s of near-silence (limit 0.5)). Seed 5100203 is the take.

## Prompt

> dreamy downbeat indie folk electronica, swirling echoed vocals multitracked into a hazy choir, drum machine pulse under live tambourine and shaker, organ drone, music box glockenspiel loop, chiming guitar arpeggios, warm analog synth pad, field-recording texture of wind, slow swell into a big layered crescendo with gang harmonies, lean bass, aeolian minor

## Lyrics (original, written for this track by the project; the model was given only these words)

```
[Verse 1]
I remember the river louder than the band,
floor toms on the ferry deck, your coat in my hand,
but the river had no current and the ferry had no name,
and every time I go back there the gulls are just the same.

[Chorus]
Was it rendered, was it real?
Does it matter how it's built
if I still feel the cold off the water
and the deck tilt?

[Verse 2]
The same three gulls, the same white wake, the same unfinished sky,
a corner of the picture where the colours ran out dry,
I walked right to the edge of it and pressed against the seam,
and it gave a little, like a drumskin, like a dream.

[Chorus]
Was it rendered, was it real?
Does it matter how it's built
if I still feel the cold off the water
and the deck tilt?

[Bridge]
Keep it anyway, keep it anyway,
every copy of the crossing,
keep it anyway.

[Final Chorus]
Was it rendered, was it real?
I still feel the cold off the water,
I still feel the deck tilt!
```

## Request filter

stripped: nothing

## Rejected seeds

- 5100201: 2.1s of near-silence (limit 0.5)
- 5100202: 1.2s of near-silence (limit 0.5)

## Measured (the kept take, after the 60 Hz high-pass, before the loudness gain unless noted)

| gate | measured | limit | passed |
|---|---|---|---|
| tempo | 124 bpm vs asked 124 | not applied: no beat was asked for | yes |
| loudness | -16.0 LUFS installed (decoded MP3 -16.4); candidate was -14.3, gain -1.6 dB | -16 LUFS within 1 dB | yes |
| peak after encode | -2.95 dBFS decoded (pre-encode -3.43) | under -1 dBFS | yes |
| silence | longest 0.10 s under -50 dBFS | under 0.5 s (mellow) | yes |
| brightness | 1.25 % of power above 6 kHz | under 2.5 % (mellow) | yes |
| boominess | 10.47 % below 60 Hz (raw render 26.6 %) | under 12 % | yes |
| onset rate | 2.60 per second | 0.3 to 4.5 | yes |
| loop seam | step 0.00x, tail-head -39.9 dB | not applied: a one-shot, not a loop | yes |

## Words (Demucs voice stem, Whisper large-v3-turbo)

heard: I remember the river louder than the band Four toms on the ferry deck you're cold in my hand | But the river had no current and the ferry had no name And every time I go back there the galls are just the same | Was it rendered? Was it real? Does it matter how it's built? | If I still feel the cold of the water And the depth of water | The same three goals, the same white weight, the same unfinished sky. The corner of the picture where the colors ran out. | I walked right to the edge of it and pressed against the seam and it gave a little like a drum skin like a dream | Was it rendered? Was it real? Does it matter how it's built? | If I still feel the hold of the water. Of the water. | Keep it anyway, keep it anyway Every copy of The Crossing | Keep it anyway. Was it rendered? Was it real? I still feel cold out. | I still feel the death feel. | . | . | Thank you.

174 words heard, 13 not in our lyrics: four you're galls depth goals weight colors drum skin hold death thank you (limit 10 % of the words heard, at least 40 heard)

## Heard by a model, not a person

Not listened to: listening is off, or there is no GEMINI_API_KEY in the environment. Nobody on the machine can hear.

## Checks

all automatic checks passed. These are numbers, not hearing: nobody on the machine can hear, the owner listens.
