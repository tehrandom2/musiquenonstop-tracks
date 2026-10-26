# One Thick Coat

- **slug:** greytide-desk-one-thick-coat
- **idea:** The burst caster tower on the cork, who never did highlights: one thick coat, one shot from a thousand yards, then a long wait, while the old varnish argues about sheen.
- **mood:** cool, patient, menacing
- **bpm:** 136 (asked) / 137 (measured, folded into 70-140)
- **key:** A minor (asked) / A minor (estimated)
- **seed:** 3910501
- **model:** ACE-Step 1.5, acestep-v15-turbo, 8 steps, guidance 7.0, shift 3.0, LM acestep-5Hz-lm-1.7B
- **tier:** fast   **gate profile:** mellow   **duration:** 165 s rendered, 160.8 s installed (one-shot, nothing baked)
- **date:** 2026-10-26
- **render time:** 24.1 s per seed, model load 24.6 s
- **licence:** generated locally from a text prompt, no samples or reference audio, no third-party rights claimed
- project: greytide
- **album:** Greytide, track 5
- **submitter:** the radio, for greytide
- **tags:** table:desk, pov:the burst caster tower
- **loop:** no, a one-shot
- **length:** 7090536 samples at 44.1 kHz (160.78 s), about 91.1 bars of 4/4 at 136 bpm (the MP3 adds encoder padding; the length is of the PCM)

## Why

You asked for "The burst caster tower on the cork, who never did highlights: one thick coat, one shot from a thousand yards, then a long wait, while the old varnish argues about sheen.". The words and the style were written for this song by the station's writers and reviewed by the conductor. So I wrote it at 136 bpm in A minor, 165 seconds, with a voice, in words I wrote myself, under the mellow gates. It has no beat to hold, so 136 bpm is only the grid I gave the model and the tempo gate is not applied. It is a one-shot: nothing is baked and the ending is the model's own. I rendered 2 seeds and threw away 1: 3910500 (0.7s of near-silence (limit 0.5)). Seed 3910501 is the take.

## Prompt

> Desert western rock, 136 bpm, A minor. A four-piece and a whistle: a twangy baritone guitar with tremolo playing the hook, a nylon guitar strumming fast minor triplets, a tight lean bass on root-fifth well under the mids, a galloping kit with a dry snare, a lonely whistle between verses. A cool, low female alto lead, half-spoken verses, full chorus, a low male choir. Patient and menacing. Starts mid, a long chorus plateau, one dip to guitar and stomp, a lifted final chorus. A minor, no harsh highs.

## Lyrics (original, written for this track by the project; the model was given only these words)

```
[Intro: the whistle over the gallop]

[Verse 1]
They told me thin your paints, they told me two thin coats
I put on one, and I put it on thick
I don't do edges and I don't do highlights
I take one shot and I make it stick

[Pre-Chorus]
Old varnish up on the cork talking sheen
Gloss or matte or satin, he can't decide

[Chorus]
One thick coat, one long wait
One clean shot from a thousand yards
One thick coat, one long wait
Never needed the highlights

[Verse 2]
A grunt on the switchback, a shield bearer behind
With a shield from a kit that he's never met
I count to forty while the cooldown crawls
Then I'm the loudest thing he'll never forget

[Pre-Chorus]
Old varnish up on the cork talking sheen
I just talk once, and then I let it ride

[Chorus]
One thick coat, one long wait
One clean shot from a thousand yards
One thick coat, one long wait
Never needed the highlights

[Breakdown: guitar and stomp only]
Patience is a colour too
Darker than the rest
I wear it to the shoulder
I wear it on my chest

[Final Chorus: lifted, the choir doubles]
One thick coat, one long wait
One clean shot from a thousand yards
One thick coat, one long wait
Never needed the highlights

[Outro: the whistle alone]
One long wait
```

## Request filter

stripped: nothing

## Rejected seeds

- 3910500: 0.7s of near-silence (limit 0.5)

## Measured (the kept take, after the 60 Hz high-pass, before the loudness gain unless noted)

| gate | measured | limit | passed |
|---|---|---|---|
| tempo | 137 bpm vs asked 136 | not applied: no beat was asked for | yes |
| loudness | -16.0 LUFS installed (decoded MP3 -16.4); candidate was -16.2, gain +0.2 dB | -16 LUFS within 1 dB | yes |
| peak after encode | -2.39 dBFS decoded (pre-encode -3.16) | under -1 dBFS | yes |
| silence | longest 0.10 s under -50 dBFS | under 0.5 s (mellow) | yes |
| brightness | 1.61 % of power above 6 kHz | under 2.5 % (mellow) | yes |
| boominess | 8.22 % below 60 Hz (raw render 25.6 %) | under 12 % | yes |
| onset rate | 3.49 per second | 0.3 to 4.5 | yes |
| loop seam | step 0.02x, tail-head -34.8 dB | not applied: a one-shot, not a loop | yes |

## Words (Demucs voice stem, Whisper large-v3-turbo)

heard: . | . | They told me thin your paints, they told me two thin coats, I put on one, and I put it on thick, I don't do edges, and I don't do highlights, I take one shot, and I don't do it. | One thick coat, one long way, one clean shot from a thousand yards, one thick coat. | One long way. Never needed the highlights. A gun on the switchback. A shield buried behind with a shield from a kit that has never met. I count to 40. While the | I just talked once and then I let it rise. One big coat, one long wait. | One clean shot from a thousand yards. One thick coat, one long wait. | Patience is a color too Darker than the rest How airy to the shore | I wear it on my chest. One thick coat, one long weight, one clean shot from a thousand yards. | One thing go one long way. Never needed the highlights. | One long way

162 words heard, 16 not in our lyrics: way way gun buried has talked rise big color how airy shore weight go way way (limit 10 % of the words heard, at least 40 heard)

## Heard by a model, not a person

Not listened to: listening is off, or there is no GEMINI_API_KEY in the environment. Nobody on the machine can hear.

## Checks

all automatic checks passed. These are numbers, not hearing: nobody on the machine can hear, the owner listens.
