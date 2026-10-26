# When The Weight Shifts

- **slug:** greytide-couch-when-the-weight-shifts
- **idea:** Wave three: the unseen sitter shifts and a build pad rises under the ballista; at 3 cm it is an earthquake, and the ballista holds; its point of view.
- **mood:** tense, defiant, steady
- **bpm:** 140 (asked) / 138 (measured, folded into 70-140)
- **key:** G minor (asked) / D minor (estimated)
- **seed:** 4030401
- **model:** ACE-Step 1.5, acestep-v15-turbo, 8 steps, guidance 7.0, shift 3.0, LM acestep-5Hz-lm-1.7B
- **tier:** fast   **gate profile:** mellow   **duration:** 170 s rendered, 162.2 s installed (one-shot, nothing baked)
- **date:** 2026-10-26
- **render time:** 24.7 s per seed, model load 24.6 s
- **licence:** generated locally from a text prompt, no samples or reference audio, no third-party rights claimed
- project: greytide
- **album:** Greytide, track 4
- **submitter:** the radio, for greytide
- **tags:** table:couch, pov:ballista
- **loop:** no, a one-shot
- **length:** 7152370 samples at 44.1 kHz (162.19 s), about 94.6 bars of 4/4 at 140 bpm (the MP3 adds encoder padding; the length is of the PCM)

## Why

You asked for "Wave three: the unseen sitter shifts and a build pad rises under the ballista; at 3 cm it is an earthquake, and the ballista holds; its point of view.". The words and the style were written for this song by the station's writers and reviewed by the conductor. So I wrote it at 140 bpm in G minor, 170 seconds, with a voice, in words I wrote myself, under the mellow gates. It has no beat to hold, so 140 bpm is only the grid I gave the model and the tempo gate is not applied. It is a one-shot: nothing is baked and the ending is the model's own. I rendered 2 seeds and threw away 1: 4030400 (1.0s of near-silence (limit 0.5) and others). Seed 4030401 is the take, but it did not clear every gate: harsh: 3.0% above 6 kHz (ceiling 2.5).

## Prompt

> Dark driving synth rock, 140 bpm, G minor, tense then defiant. A four-piece: a pulsing analogue synth bass arpeggio, tight lean bass guitar doubling it well under the mids, a chorus-laden electric guitar ringing open chords, a polysynth pad swelling at the pre-chorus, punchy live drums with gated toms. A gravelly, steady male lead, a low male choir doubling the hook. Arc: synth pulse alone, a held mid-energy verse, a long high chorus, a breakdown where everything stops for one beat like the ground lurching, then a lifted final chorus and a ringing outro. G minor, warm grit in the mids, no harsh highs.

## Lyrics (original, written for this track by the project; the model was given only these words)

```
[Intro: synth bass pulse alone, a long creak in the low end]

[Verse 1]
I was set down on a pad
With a welted cliff in front
Two waves held and the bolts were good
And the grey ones came in bunches
Then the whole far end went low
And the near end gave a groan
Something huge we never see
Shifted, and it moved my home

[Pre-Chorus]
Hold the string, hold the stock
Hold the line when the ground won't stop

[Chorus]
The weight shifts at the end of the world
And the ground comes up to meet me
A centimetre is a mountain
And the ballista doesn't move

[Verse 2]
Now my pad is higher up
I can see the low road clear
Every road just runs one way
Down and down and never here
Grey ones knocked off of the edge
Fall a level, that is forward
Every shove I give them saves them time
So I aim a little further

[Pre-Chorus]
Hold the string, hold the stock
Hold the line when the ground won't stop

[Chorus]
The weight shifts at the end of the world
And the ground comes up to meet me
A centimetre is a mountain
And the ballista doesn't move

[Breakdown: everything stops for one beat, then bass and toms]
Somebody painted me steady
Somebody gave me a stand
Whatever sits at the end of the world
It doesn't know where I am

[Final Chorus: lifted, the low choir doubling]
The weight shifts at the end of the world
And the ground comes up to meet me
A centimetre is a mountain
And the ballista doesn't move
A centimetre is a mountain
And the ballista doesn't move

[Outro: ringing guitar, the synth pulse fades]
```

## Request filter

stripped: nothing

## Rejected seeds

- 4030400: 1.0s of near-silence (limit 0.5); harsh: 2.6% above 6 kHz (ceiling 2.5); 17 of 160 heard words are not ours (11 %; limit 10 %, at least 40 heard): would sit floor well tid gray body still bed hear once for

## Measured (the kept take, after the 60 Hz high-pass, before the loudness gain unless noted)

| gate | measured | limit | passed |
|---|---|---|---|
| tempo | 138 bpm vs asked 140 | not applied: no beat was asked for | yes |
| loudness | -16.0 LUFS installed (decoded MP3 -16.4); candidate was -13.8, gain -2.2 dB | -16 LUFS within 1 dB | yes |
| peak after encode | -3.07 dBFS decoded (pre-encode -3.85) | under -1 dBFS | yes |
| silence | longest 0.10 s under -50 dBFS | under 0.5 s (mellow) | yes |
| brightness | 3.04 % of power above 6 kHz | under 2.5 % (mellow) | **NO** |
| boominess | 11.08 % below 60 Hz (raw render 29.0 %) | under 12 % | yes |
| onset rate | 3.11 per second | 0.3 to 4.5 | yes |
| loop seam | step 0.26x, tail-head -32.5 dB | not applied: a one-shot, not a loop | yes |

## Words (Demucs voice stem, Whisper large-v3-turbo)

heard: I was set down on a | With a welted cliff in front Two waves held and the boats were good And the grey ones came in bunches And the hole far and went low | Hold the string, hold the stock, hold the line | The | Now my pad is higher up. I can see the low road clear. Every road just runs one way down and down. | down and never hear. Great ones knocked off of the edge for the level that is forward. Every shove I give them saves them time, so I aim a | Hold the line when the ground won't stop. The weight shifts at the end of the world and the ground comes. | . | Somebody painted me steady. Somebody gave me a stand. Whatever sits at the end of the world, it doesn't know where I am. | Wait shifts at the end of the world and the ground comes up to meet me. The Centimetro is a mountain in the police to die. | Doesn't move. A centimeter is a mountain. And the balista doesn't move.

177 words heard, 11 not in our lyrics: boats hole hear great for wait centimetro police die centimeter balista (limit 10 % of the words heard, at least 40 heard)

## Heard by a model, not a person

Not listened to: listening is off, or there is no GEMINI_API_KEY in the environment. Nobody on the machine can hear.

## Checks

kept despite failing: harsh: 3.0% above 6 kHz (ceiling 2.5)
