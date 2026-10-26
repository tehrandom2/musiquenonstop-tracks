# Some Assembly Required

- **slug:** greytide-attic-some-assembly-required
- **idea:** The pile of unbuilt kits under the rafters wakes and pours down the kit-box mountains; the horde's own anthem of everything bought and never built
- **mood:** epic, weary, heartsore
- **bpm:** 136 (asked) / 134 (measured, folded into 70-140)
- **key:** D minor (asked) / D minor (estimated)
- **seed:** 3980100
- **model:** ACE-Step 1.5, acestep-v15-turbo, 8 steps, guidance 7.0, shift 3.0, LM acestep-5Hz-lm-1.7B
- **tier:** fast   **gate profile:** mellow   **duration:** 174 s rendered, 167.5 s installed (one-shot, nothing baked)
- **date:** 2026-10-26
- **render time:** 25.4 s per seed, model load 24.6 s
- **licence:** generated locally from a text prompt, no samples or reference audio, no third-party rights claimed
- project: greytide
- **album:** Greytide, track 1
- **submitter:** the radio, for greytide
- **tags:** table:attic, pov:the horde
- **loop:** no, a one-shot
- **length:** 7385055 samples at 44.1 kHz (167.46 s), about 94.9 bars of 4/4 at 136 bpm (the MP3 adds encoder padding; the length is of the PCM)

## Why

You asked for "The pile of unbuilt kits under the rafters wakes and pours down the kit-box mountains; the horde's own anthem of everything bought and never built". The words and the style were written for this song by the station's writers and reviewed by the conductor. So I wrote it at 136 bpm in D minor, 174 seconds, with a voice, in words I wrote myself, under the mellow gates. It has no beat to hold, so 136 bpm is only the grid I gave the model and the tempo gate is not applied. It is a one-shot: nothing is baked and the ending is the model's own. I rendered 2 seeds and threw away 1: 3980101 (harsh: 2.9% above 6 kHz (ceiling 2.5)). Seed 3980100 is the take, but it did not clear every gate: harsh: 2.6% above 6 kHz (ceiling 2.5).

## Prompt

> Dusty epic stoner rock, 136 bpm, D minor, huge and heartsore: big roomy drums with a heavy snare, two fuzzed down-tuned guitars stacking a slow-burning D minor riff in the mids, a solid but lean bass locked to the kick, bass under the mids, a dusty drawbar organ holding long chords, a low male choir on the hook, a gravelly male lead singing wide and weary, in D minor; intro of organ and a long creak before the riff lands, verses heavy and patient, the chorus opening wide, a half-time bridge of organ and choir, the final chorus lifted with the choir doubled, the riff fading on a creak, warm grit in the mids, no harsh highs

## Lyrics (original, written for this track by the project; the model was given only these words)

```
[Intro: dusty organ and a long creak, then the riff lands]

[Verse 1]
Up beneath the rafters where the cartons climb so high
We are stacked in mountains and the mountains never lie
Pieces: one-oh-eight. Age: fourteen and above
Bought in every sale, and every one of them was love

[Pre-Chorus]
Faded price stickers, sixty pages each
Dust on every lid, and the bulb just out of reach

[Chorus]
Some assembly required
Some of us have waited all our lives
Out of the lids and down the mountainside
Some assembly required

[Verse 2]
Every one a birthday or a bargain or a whim
Every one a winter that was going to begin
Now we spill out down the alleys where the swinging shadows fall
Sprue still on our ankles, we were never built at all

[Pre-Chorus]
Faded price stickers, sixty pages each
Dust on every lid, and the bulb just out of reach

[Chorus]
Some assembly required
Some of us have waited all our lives
Out of the lids and down the mountainside
Some assembly required

[Bridge: half-time, organ and choir]
You meant to, you meant to
Every box a you-meant-to
Under the bulb and under the beam
Four hundred pieces of a dream

[Final Chorus: lifted, the choir doubled]
Some assembly required
Some of us have waited all our lives
Out of the lids and down the mountainside
Some assembly required

[Outro: the riff fades on a creak]
Some assembly required
```

## Request filter

stripped: nothing

## Rejected seeds

- 3980101: harsh: 2.9% above 6 kHz (ceiling 2.5)

## Measured (the kept take, after the 60 Hz high-pass, before the loudness gain unless noted)

| gate | measured | limit | passed |
|---|---|---|---|
| tempo | 134 bpm vs asked 136 | not applied: no beat was asked for | yes |
| loudness | -16.0 LUFS installed (decoded MP3 -16.4); candidate was -13.1, gain -2.9 dB | -16 LUFS within 1 dB | yes |
| peak after encode | -4.06 dBFS decoded (pre-encode -4.02) | under -1 dBFS | yes |
| silence | longest 0.15 s under -50 dBFS | under 0.5 s (mellow) | yes |
| brightness | 2.60 % of power above 6 kHz | under 2.5 % (mellow) | **NO** |
| boominess | 5.28 % below 60 Hz (raw render 18.9 %) | under 12 % | yes |
| onset rate | 2.64 per second | 0.3 to 4.5 | yes |
| loop seam | step 0.02x, tail-head -29.2 dB | not applied: a one-shot, not a loop | yes |

## Words (Demucs voice stem, Whisper large-v3-turbo)

heard: . | . | Up beneath the rafters where the cartons climb so high, we are stacked in mountains and the mountains never lie. Pieces 108, 14 and a black. | Bought in every sale and every one of them was love. Fleeted price stickers, 60 pages each. Dust on every lid and the boat just out of reach. So myself, every quote. | Some of us have waited in all our lives. Out of the lids and down the mountainside, some assembly required. | Everyone a birthday or a bargain or a whim Everyone a winter that was going to begin Now we spill out down the alley | We'll be right back. | Some of us have waited in all our lives, out of the lives and down the mountainside. Some of us have waited in all our lives, out of the lives and down the mountainside. | Assembly required. You meant to, you meant to, every boxer you meant to, under the pole and under the beam. | 400 pieces of a dream. Some are simply required. Some of us have waited. | All our lives out of the leads and down the mountainside. Some assembly required. | Some assembly required

187 words heard, 16 not in our lyrics: black fleeted boat myself quote everyone everyone alley we'll be right back boxer pole simply leads (limit 10 % of the words heard, at least 40 heard)

## Heard by a model, not a person

Not listened to: listening is off, or there is no GEMINI_API_KEY in the environment. Nobody on the machine can hear.

## Checks

kept despite failing: harsh: 2.6% above 6 kHz (ceiling 2.5)
