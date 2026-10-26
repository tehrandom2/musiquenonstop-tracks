# Sir Brickalot

- **slug:** sir-brickalot
- **idea:** the anthem of the brick knight on the white horse who defends Joe's castle: building is the battle
- **mood:** epic and funny at once
- **bpm:** 132 (asked) / 134 (measured, folded into 70-140)
- **key:** D minor (asked) / D minor (estimated)
- **seed:** 3380103
- **model:** ACE-Step 1.5, acestep-v15-turbo, 8 steps, guidance 7.0, shift 3.0, LM acestep-5Hz-lm-1.7B
- **tier:** fast   **gate profile:** mellow   **duration:** 170 s rendered, 167.5 s installed (one-shot, nothing baked)
- **date:** 2026-10-26
- **render time:** 24.9 s per seed, model load 23.2 s
- **licence:** generated locally from a text prompt, no samples or reference audio, no third-party rights claimed
- project: joes-castle
- **loop:** no, a one-shot
- **length:** 7388530 samples at 44.1 kHz (167.54 s), about 92.1 bars of 6/4 at 132 bpm (the MP3 adds encoder padding; the length is of the PCM)

## Why

You asked for "the anthem of the brick knight on the white horse who defends Joe's castle: building is the battle". The anthem for Joe's castle: the front desk wrote the words from the game's own details (the knight, the drawbridge, the market square, the seventh-wave ladder), and the style line is used word for word. So I wrote it at 132 bpm in D minor, 170 seconds, with a voice, in words I wrote myself, under the mellow gates. It has no beat to hold, so 132 bpm is only the grid I gave the model and the tempo gate is not applied. It is a one-shot: nothing is baked and the ending is the model's own. I rendered 4 seeds and threw away 3: 3380101 (0.9s of near-silence (limit 0.5) and others); 3380102 (4.3s of near-silence (limit 0.5) and others); 3380104 (harsh: 2.7% above 6 kHz (ceiling 2.5) and others). Seed 3380103 is the take, but it did not clear every gate: 0.9s of near-silence (limit 0.5); harsh: 3.2% above 6 kHz (ceiling 2.5).

## Prompt

> triumphant medieval power-folk anthem, galloping 6/8 drive at 132 bpm, D minor lifting to D major in the chorus, a big gang-vocal chorus, a heroic male lead, pipes-style synth lead, war drums, galloping bass, bright brass fanfares, a crowd that sings along, epic and funny at once, instrumental break with a fanfare duel, tight lean bass under the mids, no harsh highs, D minor verses, no wobble bass

## Lyrics (original, written for this track by the project; the model was given only these words)

```
[Intro: fanfare, hooves on the baseplate]

[Verse 1]
White horse, twelve studs high, he don't hurry, he don't flinch
Red plume on a silver lid, a lance that's built an inch
The grey come up the drawbridge like they own the market square
But nobody owns the market square when Brickalot is there

[Verse 2]
He was step forty-seven in a booklet by the bed
A kid pressed every piece in place and here is what it said:
"Hold the gate, hold the keep, hold the line that holds the town"
And a knight who's been clicked together does not come apart that easily

[Pre-Chorus]
He's slow, yeah, he's slow, he's a horse made of bricks
But the gap between his charges is the time it takes to fix

[Chorus]
Sir Brickalot! Level the lance and ride!
Sir Brickalot! One hit, one grey, one side!
Snap, click, the kingdom stands
Built by small and stubborn hands
Sir Brickalot! The castle's on your side

[Verse 3]
They brought a ladder up the north wall on the seventh wave
The archers turned to plastic and the trebuchet was brave
But the stone falls long and the stone falls far and the close ones slip on through
So who's gonna meet them at the keep? I think you know who

[Bridge: half time, the gang hums]
Every brick they knock off, he can click back on
Every night they take the wall, by breakfast it's rebuilt and gone
You can melt a little soldier, you can scatter him like grain
But you can't unbuild a story once a kid has built it plain

[Final Chorus: key up, everyone]
Sir Brickalot! Level the lance and ride!
Sir Brickalot! One hit, one grey, one side!
Snap, click, the kingdom stands
Built by small and stubborn hands
Sir Brickalot! The castle's on your side

[Outro: one last fanfare]
[a single brick clicks into place]
```

## Request filter

stripped: nothing

## Rejected seeds

- 3380101: 0.9s of near-silence (limit 0.5); harsh: 2.8% above 6 kHz (ceiling 2.5)
- 3380102: 4.3s of near-silence (limit 0.5); harsh: 2.9% above 6 kHz (ceiling 2.5)
- 3380104: harsh: 2.7% above 6 kHz (ceiling 2.5); 20 of 195 heard words are not ours (10 %; limit 10 %, at least 40 heard): stunts rip bloom lip great lawd key key log log play size

## Measured (the kept take, after the 60 Hz high-pass, before the loudness gain unless noted)

| gate | measured | limit | passed |
|---|---|---|---|
| tempo | 134 bpm vs asked 132 | not applied: no beat was asked for | yes |
| loudness | -16.0 LUFS installed (decoded MP3 -16.4); candidate was -14.6, gain -1.4 dB | -16 LUFS within 1 dB | yes |
| peak after encode | -3.18 dBFS decoded (pre-encode -3.41) | under -1 dBFS | yes |
| silence | longest 0.85 s under -50 dBFS | under 0.5 s (mellow) | **NO** |
| brightness | 3.17 % of power above 6 kHz | under 2.5 % (mellow) | **NO** |
| boominess | 6.62 % below 60 Hz (raw render 20.0 %) | under 12 % | yes |
| onset rate | 2.94 per second | 0.3 to 4.5 | yes |
| loop seam | step 0.00x, tail-head -59.4 dB | not applied: a one-shot, not a loop | yes |

## Words (Demucs voice stem, Whisper large-v3-turbo)

heard: White horse 12 studs high | He don't hurry, he don't flinch. Red plume on a silver lid, a lance that's built an inch. The great come up the drawbridge like they own the market square, but nobody | He was step 47 in a booklet by the bed. A kid pressed | Every piece in place. And here is what it said. Hold the gate. Hold the keep. Hold the line that holds the town. And the night who's been clicked together. Dot come apart that easily. | Sir. | Sir Brickalons! Level the lance and ride Sir Brickalons! One hit, one, one grave, one scythe Snap, click, the kingdom stands Built by small and stubborn | The castle's on your side. They brought a ladder up the north wall on the seventh wave. Beyond | I think you | Every brick they knock off, he can click back on. Every night they take the wall by breakfast, it's rebuilt. | Sir, break a lot. Level. | The kingdom stands Built by small and stubborn hands Sir Brickle Hutt | The castle's on your side.

173 words heard, 11 not in our lyrics: great dot brickalons brickalons grave scythe beyond break lot brickle hutt (limit 10 % of the words heard, at least 40 heard)

## Heard by a model, not a person

Not listened to: listening is off, or there is no GEMINI_API_KEY in the environment. Nobody on the machine can hear.

## Checks

kept despite failing: 0.9s of near-silence (limit 0.5); harsh: 3.2% above 6 kHz (ceiling 2.5)
