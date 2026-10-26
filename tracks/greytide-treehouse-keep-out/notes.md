# Keep Out

- **slug:** greytide-treehouse-keep-out
- **idea:** The secret biscuit tin at the end of both roads, keep-out card on its lid, is the thing being defended; the tin's own fierce point of view.
- **mood:** secretive, fierce, bright
- **bpm:** 136 (asked) / 137 (measured, folded into 70-140)
- **key:** D minor (asked) / D minor (estimated)
- **seed:** 4040201
- **model:** ACE-Step 1.5, acestep-v15-turbo, 8 steps, guidance 7.0, shift 3.0, LM acestep-5Hz-lm-1.7B
- **tier:** fast   **gate profile:** mellow   **duration:** 160 s rendered, 154.8 s installed (one-shot, nothing baked)
- **date:** 2026-10-26
- **render time:** 23.4 s per seed, model load 24.6 s
- **licence:** generated locally from a text prompt, no samples or reference audio, no third-party rights claimed
- project: greytide
- **album:** Greytide, track 2
- **submitter:** the radio, for greytide
- **tags:** table:treehouse, pov:biscuit tin
- **loop:** no, a one-shot
- **length:** 6825814 samples at 44.1 kHz (154.78 s), about 87.7 bars of 4/4 at 136 bpm (the MP3 adds encoder padding; the length is of the PCM)

## Why

You asked for "The secret biscuit tin at the end of both roads, keep-out card on its lid, is the thing being defended; the tin's own fierce point of view.". The words and the style were written for this song by the station's writers and reviewed by the conductor. So I wrote it at 136 bpm in D minor, 160 seconds, with a voice, in words I wrote myself, under the mellow gates. It has no beat to hold, so 136 bpm is only the grid I gave the model and the tempo gate is not applied. It is a one-shot: nothing is baked and the ending is the model's own. I rendered 2 seeds and threw away 1: 4040200 (2.5s of near-silence (limit 0.5) and others). Seed 4040201 is the take.

## Prompt

> Bright urgent indie pop, 136 bpm, D minor, secretive and fierce. A tight band with every part in its lane: a glockenspiel playing the hook melody, a jangling electric guitar in steady eighths, tight lean bass under the mids moving with the kick, a toy-piano counter-line, crisp drums with a tambourine on the backbeat. A clear, fierce young female lead with a whispered double on the verses and a chanted group on the hook. Arc: glockenspiel alone, a whispered verse at mid energy, a long high chorus, a breakdown to voice and toy piano, a lifted final chorus, a sudden lid-snap stop. D minor, no harsh highs.

## Lyrics (original, written for this track by the project; the model was given only these words)

```
[Intro: glockenspiel alone, then the band]

[Verse 1: whispered double]
I'm a tin with a tartan band
And a card in felt-tip, signed by hand
Four round biscuits and one with a bite
Hidden up the tree from the grown-up light
Nobody knows I'm here but the gang
And a squirrel who heard the lid go bang

[Pre-Chorus]
Two roads come and they both end here
Everything grey wants what's in here

[Chorus]
Keep out, keep out, says the card on my lid
Keep out, keep out, it's the best thing we hid
Keep out, keep out, you can climb, you can crawl
But the tin is the treasure and the treasure is all

[Verse 2]
Every grey one that reaches the end
Takes a stroke off the chalk on the bend
Twenty lines on a board by the wall
Four and a slash and they're counting it all
Torch on the floor and the conker's swing
Hold them away from the tin, that's the thing

[Pre-Chorus]
Two roads come and they both end here
Everything grey wants what's in here

[Chorus]
Keep out, keep out, says the card on my lid
Keep out, keep out, it's the best thing we hid
Keep out, keep out, you can climb, you can crawl
But the tin is the treasure and the treasure is all

[Breakdown: voice and toy piano]
A secret's only a secret
While somebody keeps it shut
And the bite out of the last one
Was a promise, not a cut

[Final Chorus: lifted, the group chanting with her]
Keep out, keep out, says the card on my lid
Keep out, keep out, it's the best thing we hid
Keep out, keep out, you can climb, you can crawl
But the tin is the treasure and the treasure is all
The tin is the treasure and the treasure is all

[Outro: one snap of the lid]
```

## Request filter

stripped: nothing

## Rejected seeds

- 4040200: 2.5s of near-silence (limit 0.5); harsh: 2.6% above 6 kHz (ceiling 2.5)

## Measured (the kept take, after the 60 Hz high-pass, before the loudness gain unless noted)

| gate | measured | limit | passed |
|---|---|---|---|
| tempo | 137 bpm vs asked 136 | not applied: no beat was asked for | yes |
| loudness | -16.0 LUFS installed (decoded MP3 -16.4); candidate was -15.7, gain -0.3 dB | -16 LUFS within 1 dB | yes |
| peak after encode | -3.25 dBFS decoded (pre-encode -3.25) | under -1 dBFS | yes |
| silence | longest 0.25 s under -50 dBFS | under 0.5 s (mellow) | yes |
| brightness | 1.89 % of power above 6 kHz | under 2.5 % (mellow) | yes |
| boominess | 6.79 % below 60 Hz (raw render 16.9 %) | under 12 % | yes |
| onset rate | 3.00 per second | 0.3 to 4.5 | yes |
| loop seam | step 2.99x, tail-head -69.5 dB | not applied: a one-shot, not a loop | yes |

## Words (Demucs voice stem, Whisper large-v3-turbo)

heard: . | I'm a tin with a tartan bag and a card and felt tip signed by hand Four round biscuits and one | Two roads coming. | Keep out, keep out, says the card on my lid. Keep out, keep out, it's the best thing we hid. Keep out, keep out. | You can climb you can crawl but the tin is the treasure and the treasure is all Every gray one battery chips the end takes a stroke off the chop | 20 lines on a board by the wall. Four and a slash and they're counting it all. Torch on the floor in the conker swing. Hold them away from the tin, that's the thing. | Two roads come and they both end here Everything grey wants what's in here Keep out, keep out Says the card on my lid Keep out, keep out | The secret's only a secret | While somebody keeps it shut And the bite out of the last one Was a promise Not a cut Keep out, keep out Says the card on Monday | Keep out, keep out, it's the best thing we hit Keep out, keep out, you can climb, you can crawl But the tin is the treasure and the treasure is all The tin is the treasure and the treasure is all | is all

215 words heard, 9 not in our lyrics: bag coming gray battery chips chop conker monday hit (limit 10 % of the words heard, at least 40 heard)

## Heard by a model, not a person

Not listened to: listening is off, or there is no GEMINI_API_KEY in the environment. Nobody on the machine can hear.

## Checks

all automatic checks passed. These are numbers, not hearing: nobody on the machine can hear, the owner listens.
