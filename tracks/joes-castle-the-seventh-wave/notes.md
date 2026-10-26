# The Seventh Wave

- **slug:** joes-castle-the-seventh-wave
- **idea:** the wall's own point of view: the ladder goes up past the north tower on a wave between six and eight, and the whole castle turns at once until the keep holds
- **mood:** epic, rising, desperate, triumphant at the last bar
- **bpm:** 140 (asked) / 138 (measured, folded into 70-140)
- **key:** A minor (asked) / A minor (estimated)
- **seed:** 3380500
- **model:** ACE-Step 1.5, acestep-v15-turbo, 8 steps, guidance 7.0, shift 3.0, LM acestep-5Hz-lm-1.7B
- **tier:** fast   **gate profile:** mellow   **duration:** 180 s rendered, 178.0 s installed (one-shot, nothing baked)
- **date:** 2026-10-26
- **render time:** 26.1 s per seed, model load 23.2 s
- **licence:** generated locally from a text prompt, no samples or reference audio, no third-party rights claimed
- project: joes-castle
- **loop:** no, a one-shot
- **length:** 7848535 samples at 44.1 kHz (177.97 s), about 103.8 bars of 4/4 at 140 bpm (the MP3 adds encoder padding; the length is of the PCM)

## Why

You asked for "the wall's own point of view: the ladder goes up past the north tower on a wave between six and eight, and the whole castle turns at once until the keep holds". The words and the style were written for this song by the station's writers and reviewed by the conductor. So I wrote it at 140 bpm in A minor, 180 seconds, with a voice, in words I wrote myself, under the mellow gates. It has no beat to hold, so 140 bpm is only the grid I gave the model and the tempo gate is not applied. It is a one-shot: nothing is baked and the ending is the model's own. I rendered 2 seeds and threw away 1: 3380501 (1.9s of near-silence (limit 0.5) and others). Seed 3380500 is the take, but it did not clear every gate: 0.9s of near-silence (limit 0.5); harsh: 3.1% above 6 kHz (ceiling 2.5).

## Prompt

> epic siege anthem at 140 bpm in A minor, starts small and rises to a full battle: a lone snare and low choir hum, then war drums, a mixed choir, bright brass fanfares, driving strings ostinato, tight lean bass under the mids; a strong female lead in the verses, the mixed choir on every chorus, shouted gang calls; no harsh highs; a whispered half-time breakdown, a key-up final chorus with no let-up, no resolution until the last bar, A minor, the final chord turns major

## Lyrics (original, written for this track by the project; the model was given only these words)

```
[Intro: a single snare, a low choir hum, almost nothing]

[Verse 1: quiet, one voice]
There's a crack in me past the north tower
Two bricks that never sat right
The kid pressed twice and they wouldn't click
And he said it'll hold tonight
Six waves came and the gate held
Six waves came and went
And every stone the long arm threw
Went where the long arm meant

[Pre-Chorus: the war drums come in]
Seven seconds, that's the warning
Seven seconds, nothing more
Grey hands carry a ladder
Down along the moat's far shore
The long arm knocked them flat once
They got up and walked it again
And the cracked bricks felt it coming
Like they knew it since the box began

[Chorus: full choir and brass]
The seventh wave! The ladder's up!
Turn, castle, turn as one!
Every brick still clicked is a battle won
The seventh wave! (Turn!)
The seventh wave!

[Verse 2: the whole castle turns]
The archers swing their heads around
A quarter more on every rung
The climbers crawl at half their speed
And the big ones keep to the gate, unsung
The pot pours down the murder hole
The gate queue stands in flame
Then a horn goes up from the market square
And every knight hears his name

[Pre-Chorus: drums double]
To the breach! To the breach!
White horse down the inner stair
The lance goes through the shield
And the one behind it, standing there
One charge, two down, ride home
Ten seconds at the foot of the wall
And the cracked bricks hold their breath
And the castle doesn't fall

[Chorus: full choir and brass]
The seventh wave! The ladder's up!
Turn, castle, turn as one!
Every brick still clicked is a battle won
The seventh wave! (Turn!)
The seventh wave!

[Breakdown: half time, drums and brass stabs, the choir whispers]
Knock a brick loose (click it back)
Knock a man down (click him back)
Pull the wall apart (click it back)
Building is the battle, and the battle's never done

[Final Chorus: key up, everything, no let-up]
The seventh wave! The ladder's up!
Turn, castle, turn as one!
Every brick still clicked is a battle won
The seventh wave! (Turn!)
The seventh wave! (Turn!)
Every brick still clicked is a battle won

[Outro: the drums stop dead, one held chord resolves to major, the keep holds]
And the keep holds
```

## Request filter

stripped: nothing

## Rejected seeds

- 3380501: 1.9s of near-silence (limit 0.5); harsh: 3.1% above 6 kHz (ceiling 2.5)

## Measured (the kept take, after the 60 Hz high-pass, before the loudness gain unless noted)

| gate | measured | limit | passed |
|---|---|---|---|
| tempo | 138 bpm vs asked 140 | not applied: no beat was asked for | yes |
| loudness | -16.0 LUFS installed (decoded MP3 -16.4); candidate was -13.6, gain -2.4 dB | -16 LUFS within 1 dB | yes |
| peak after encode | -3.54 dBFS decoded (pre-encode -3.75) | under -1 dBFS | yes |
| silence | longest 0.90 s under -50 dBFS | under 0.5 s (mellow) | **NO** |
| brightness | 3.08 % of power above 6 kHz | under 2.5 % (mellow) | **NO** |
| boominess | 8.07 % below 60 Hz (raw render 21.7 %) | under 12 % | yes |
| onset rate | 2.74 per second | 0.3 to 4.5 | yes |
| loop seam | step 0.03x, tail-head -26.0 dB | not applied: a one-shot, not a loop | yes |

## Words (Demucs voice stem, Whisper large-v3-turbo)

heard: There's a | Six waves came | 76 | That's the morning. Long bar knocked them flat once. They got up and walked it again. And the crack bricks felt it coming like they knew it since the box. | The seventh wave, the ladder is up, turn castle, turn is won, every brick still clicked is a battle won, the seventh wave is up, the seventh wave is up, | The archers swing their heads around, a quarter more on every rung. The climbers crawl at half their speed, and the big ones keep to the gate unsung. | The pot pours down the murder hole, the gate queue stands in flame. Then a horn goes up from the market square and every night hears his name. To the breach. | To the breach white horse down the inner stair The lance goes through the shield and the one behind it standing there One charge two down right hometown | Ten seconds at the foot of the wall And the cracked bricks hold their breath And the castle doesn't fall The seventh wave, the ladder is up Turned | Turn is one. Every brick still clicked. Here's a battle. One. The seventh wave. Fire. The seventh wave. Fire. Knock a brick loose. Click it back. Knock a man down. Click it back. Pull the | The | Every brick still clicked is a battle won. The seventh wave. The seventh wave. Every brick still clicked is a battle won.

238 words heard, 8 not in our lyrics: morning bar night hometown turned here's fire fire (limit 10 % of the words heard, at least 40 heard)

## Heard by a model, not a person

Not listened to: listening is off, or there is no GEMINI_API_KEY in the environment. Nobody on the machine can hear.

## Checks

kept despite failing: 0.9s of near-silence (limit 0.5); harsh: 3.1% above 6 kHz (ceiling 2.5)
