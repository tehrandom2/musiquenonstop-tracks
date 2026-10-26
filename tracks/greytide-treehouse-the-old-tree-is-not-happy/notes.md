# The Old Tree Is Not Happy

- **slug:** greytide-treehouse-the-old-tree-is-not-happy
- **idea:** The gusts lean the whole treehouse like a ship's deck; the old tree itself warns the little painted ones how to ride its breathing; the tree's point of view.
- **mood:** stormy, big-hearted, rowdy
- **bpm:** 144 (asked) / 70 (measured, folded into 70-140)
- **key:** G minor (asked) / G minor (estimated)
- **seed:** 4040500
- **model:** ACE-Step 1.5, acestep-v15-turbo, 8 steps, guidance 7.0, shift 3.0, LM acestep-5Hz-lm-1.7B
- **tier:** fast   **gate profile:** mellow   **duration:** 170 s rendered, 167.5 s installed (one-shot, nothing baked)
- **date:** 2026-10-26
- **render time:** 25.0 s per seed, model load 24.6 s
- **licence:** generated locally from a text prompt, no samples or reference audio, no third-party rights claimed
- project: greytide
- **album:** Greytide, track 5
- **submitter:** the radio, for greytide
- **tags:** table:treehouse, pov:the old tree
- **loop:** no, a one-shot
- **length:** 7386862 samples at 44.1 kHz (167.50 s), about 100.5 bars of 4/4 at 144 bpm (the MP3 adds encoder padding; the length is of the PCM)

## Why

You asked for "The gusts lean the whole treehouse like a ship's deck; the old tree itself warns the little painted ones how to ride its breathing; the tree's point of view.". The words and the style were written for this song by the station's writers and reviewed by the conductor. So I wrote it at 144 bpm in G minor, 170 seconds, with a voice, in words I wrote myself, under the mellow gates. It has no beat to hold, so 144 bpm is only the grid I gave the model and the tempo gate is not applied. It is a one-shot: nothing is baked and the ending is the model's own. I rendered 2 seeds and threw away 1: 4040501 (3.8s of near-silence (limit 0.5)). Seed 4040500 is the take, but it did not clear every gate: 1.5s of near-silence (limit 0.5).

## Prompt

> Heaving blues-rock sea shanty, 144 bpm, G minor, stormy and big-hearted. A rowdy deck band with every part in its lane: a stomping accordion pumping the chords, a slide guitar moaning between lines with warm grit in the mids, tight lean bass under the mids rolling on the downbeat, a pounding bass drum and tambourine, creaking rope and timber in the gaps. A deep, weathered male lead singing as the tree, a gang chorus heaving the hook. Arc: creak and accordion, verse at mid energy, a long high chorus plateau, a breakdown where the wind holds its breath, a lifted final chorus, a heave and stop. G minor, no harsh highs.

## Lyrics (original, written for this track by the project; the model was given only these words)

```
[Intro: rope and timber creak, the accordion heaves in]
Hold on, little ones

[Verse 1: the tree]
I've held this house for twenty summers
Boards nailed in by a seven-year-old
Every knot in me remembers
Every swing and every hold
Now there's a war up in my branches
Painted soldiers, grey parade
And the wind is coming round the garden
And I've never been afraid

[Pre-Chorus]
Leaves come first, the rope goes high
That's my warning, that's my sigh

[Chorus]
Lean to the low side, lean to the low
The old tree's not happy and the wind's gonna blow
Conkers are rolling and the floor's on the slide
Lean to the low side and hold on tight

[Verse 2: the tree]
When I lean the grey ones hurry
Downhill faster, uphill slow
Every shove the towers give them
Goes on further down below
Bottle caps and marbles skating
Water puddles where it burst
And the loose road in the middle
Always feels the leaning worst

[Pre-Chorus]
Leaves come first, the rope goes high
That's my warning, that's my sigh

[Chorus]
Lean to the low side, lean to the low
The old tree's not happy and the wind's gonna blow
Conkers are rolling and the floor's on the slide
Lean to the low side and hold on tight

[Breakdown: the wind holds its breath, only the creak and a slow drum]
Fourteen seconds, maybe twenty
Then I'll lean the other way
Learn my breathing, little painted ones
And you'll live to see the day

[Final Chorus: lifted, the whole crew heaving]
Lean to the low side, lean to the low
The old tree's not happy and the wind's gonna blow
Conkers are rolling and the floor's on the slide
Lean to the low side and hold on tight
Lean to the low side and hold on tight

[Outro: one great heave and a creak]
```

## Request filter

stripped: nothing

## Rejected seeds

- 4040501: 3.8s of near-silence (limit 0.5)

## Measured (the kept take, after the 60 Hz high-pass, before the loudness gain unless noted)

| gate | measured | limit | passed |
|---|---|---|---|
| tempo | 70 bpm vs asked 144 | not applied: no beat was asked for | yes |
| loudness | -16.0 LUFS installed (decoded MP3 -16.4); candidate was -14.8, gain -1.2 dB | -16 LUFS within 1 dB | yes |
| peak after encode | -3.34 dBFS decoded (pre-encode -3.46) | under -1 dBFS | yes |
| silence | longest 1.45 s under -50 dBFS | under 0.5 s (mellow) | **NO** |
| brightness | 2.33 % of power above 6 kHz | under 2.5 % (mellow) | yes |
| boominess | 3.62 % below 60 Hz (raw render 11.1 %) | under 12 % | yes |
| onset rate | 2.92 per second | 0.3 to 4.5 | yes |
| loop seam | step 0.03x, tail-head -15.9 dB | not applied: a one-shot, not a loop | yes |

## Words (Demucs voice stem, Whisper large-v3-turbo)

heard: I've held at this house for 20 summers, boards nailed in by a seven-year-old | Every night but me remembers every swing and every hole. Now there's a war up in my branches, painted soldiers, great parade. | And the wind is coming round the garden, and I've never been afraid. Leaves come first, the road goes high, that's my warning, that's my sign. | Lean to the low side, lean to the low The old trees are happy and the wind's gonna blow Conquers are rolling and the floor's on the slide Lean to the low side and hold on tight | When I lean the gray ones hurry, downhill faster, uphill slow. Every shove the towers give them, goes on further down below. Bottom | Caps and marble skating Water puddles where it bursts And the loose road in the middle Always feels the lean in worst Please come first | The rope goes high. That's my warning. That's my side. Lean to the low side. Lean to the low. The old tree's not happy and the wind's gonna blow. Conkers are rolling. | 14 seconds, maybe 20, then I'll leave you alone. | Lean to the low side. | Lean to the low, the old tree's not happy and the wind's gonna blow Conquers are rolling and the floor's on the slide Lean to the low side and hold on tight Lean to the low side and hold on tight | Lean to the low, son, lean to the low. The old tree's not happy and the wind's gonna blow. Out there's a wall in everything. | The floor's on the side

263 words heard, 21 not in our lyrics: at night but hole great sign trees conquers gray bottom marble bursts please leave you alone conquers son out wall everything (limit 10 % of the words heard, at least 40 heard)

## Heard by a model, not a person

Not listened to: listening is off, or there is no GEMINI_API_KEY in the environment. Nobody on the machine can hear.

## Checks

kept despite failing: 1.5s of near-silence (limit 0.5)
