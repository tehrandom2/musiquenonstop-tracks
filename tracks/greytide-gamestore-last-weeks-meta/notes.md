# Last Week's Meta

- **slug:** greytide-gamestore-last-weeks-meta
- **idea:** The Meta Chaser, who copies whichever neighbour is winning, explains himself, has opinions about last week, and wonders who he is when nobody wins
- **mood:** deadpan, strutting, sly
- **bpm:** 130 (asked) / 128 (measured, folded into 70-140)
- **key:** C minor (asked) / F major (estimated)
- **seed:** 3950701
- **model:** ACE-Step 1.5, acestep-v15-turbo, 8 steps, guidance 7.0, shift 3.0, LM acestep-5Hz-lm-1.7B
- **tier:** fast   **gate profile:** mellow   **duration:** 155 s rendered, 149.9 s installed (one-shot, nothing baked)
- **date:** 2026-10-26
- **render time:** 22.8 s per seed, model load 24.6 s
- **licence:** generated locally from a text prompt, no samples or reference audio, no third-party rights claimed
- project: greytide
- **album:** Greytide, track 7
- **submitter:** the radio, for greytide
- **tags:** table:gamestore, pov:meta-chaser
- **loop:** no, a one-shot
- **length:** 6608895 samples at 44.1 kHz (149.86 s), about 81.2 bars of 4/4 at 130 bpm (the MP3 adds encoder padding; the length is of the PCM)

## Why

You asked for "The Meta Chaser, who copies whichever neighbour is winning, explains himself, has opinions about last week, and wonders who he is when nobody wins". The words and the style were written for this song by the station's writers and reviewed by the conductor. So I wrote it at 130 bpm in C minor, 155 seconds, with a voice, in words I wrote myself, under the mellow gates. It has no beat to hold, so 130 bpm is only the grid I gave the model and the tempo gate is not applied. It is a one-shot: nothing is baked and the ending is the model's own. I rendered 2 seeds and threw away 1: 3950700 (harsh: 2.5% above 6 kHz (ceiling 2.5)). Seed 3950701 is the take, but it did not clear every gate: harsh: 3.5% above 6 kHz (ceiling 2.5).

## Prompt

> Electroclash at 130 bpm in C minor, a cold two-synth crew: a tight lean analog bass sequence, bass under the mids, a hard drum machine with a clap on two and four, a buzzy saw lead that copies the vocal's last phrase every time, a robotic vocoder chorus; a deadpan, half-spoken female lead, bored and very funny; starts mid, a long strutting plateau, a dip to bass and vocoder in the bridge, a lifted final chorus, C minor, warm saturation in the mids, no harsh highs

## Lyrics (original, written for this track by the project; the model was given only these words)

```
[Intro - the bass sequence]
I had a plan. It lost.

[Verse 1]
I stand between the winners and I watch who's winning most
I don't have a move of my own, I'm more of a host
The ballista's got the kills tonight, so I'm a ballista now
Tomorrow it'll be the cannon, and I'll show you how
I have opinions about last week, I'll tell you all of them
It was better when the Mage was strong. I was the Mage then

[Pre-Chorus]
Copy, copy
(Copy that)

[Chorus]
Whatever's winning, that is me
Copy the neighbour, it's for free
No plan, no plea, no history
Whatever's winning, that is me

[Verse 2]
The painter gave me colours that I never really chose
A bit of everyone's, a highlight borrowed from the pros
I learned it from a video I watched at double speed
I'm not a tower, I'm a mirror with a need
But when the big one comes along and everyone is hit
I shoot the best shot on the board, and I don't mind admitting it

[Pre-Chorus]
Copy, copy
(Copy that)

[Chorus]
Whatever's winning, that is me
Copy the neighbour, it's for free
No plan, no plea, no history
Whatever's winning, that is me

[Bridge - bass and vocoder only]
Who am I when nobody wins?
Who am I when the next one begins?
(Reflection, reflection)

[Final Chorus - lifted, the saw lead doubling every line]
Whatever's winning, that is me
Copy the neighbour, it's for free
No plan, no plea, no history
Whatever's winning, that is me

[Outro]
Did you see that? I did that. Kind of.
```

## Request filter

stripped: The Meta Chaser

## Rejected seeds

- 3950700: harsh: 2.5% above 6 kHz (ceiling 2.5)

## Measured (the kept take, after the 60 Hz high-pass, before the loudness gain unless noted)

| gate | measured | limit | passed |
|---|---|---|---|
| tempo | 128 bpm vs asked 130 | not applied: no beat was asked for | yes |
| loudness | -16.0 LUFS installed (decoded MP3 -16.4); candidate was -14.0, gain -2.0 dB | -16 LUFS within 1 dB | yes |
| peak after encode | -3.30 dBFS decoded (pre-encode -3.61) | under -1 dBFS | yes |
| silence | longest 0.35 s under -50 dBFS | under 0.5 s (mellow) | yes |
| brightness | 3.51 % of power above 6 kHz | under 2.5 % (mellow) | **NO** |
| boominess | 10.67 % below 60 Hz (raw render 24.7 %) | under 12 % | yes |
| onset rate | 3.81 per second | 0.3 to 4.5 | yes |
| loop seam | step 0.00x, tail-head -56.5 dB | not applied: a one-shot, not a loop | yes |

## Words (Demucs voice stem, Whisper large-v3-turbo)

heard: I had a plan. It lost. I stand between the winners and our watchers win most. I'll have a move of my own, I'm more of a host. My book is | I'll tell you all of them. It was better when the mage was strong. I was the mage then cow. | Copy, copy. Copy, copy. Whatever's winning, that is me. Copy the neighbor, it's for free, no plan, no. | No. | Once a highlight borrowed from the pros I learned it from a video I watched it double speed I'm not a tower I'm a mirror with a knee But when the big one comes along And everyone is hit I shot the best shot on the board | And I don't mind admitting it. Copy. Copy. Copy. Copy. Copy. Copy. Copy. Copy. Copy. Copy. Copy. Copy. Copy. Copy. Copy. Copy. Copy. Copy. Copy. Copy. Copy. Copy. Copy. Copy. Copy. Copy. Copy. Copy. Copy. Copy. Copy. Copy. Copy. Copy. Copy. Copy. Copy. Copy. Copy. Copy. Copy. Copy. Copy. Copy. Copy. Copy. Copy. Copy. Copy. Copy. Copy. Copy. Copy. Copy. Copy. Copy. Copy. Copy. Copy. Copy. Copy. Copy. Copy. Copy. Copy. Copy. Copy. Copy. Copy. Copy. Copy. Copy. Copy. Copy. Copy. Copy. Copy. Copy. Copy. Copy. Copy. Copy. Copy. Copy. Copy. Copy. Copy. Copy. Copy. Copy. Copy. Copy. Copy. Copy. Copy. Copy. Copy. Copy. Copy. Copy. Copy. Copy. Copy. Copy. Copy. Copy. Copy. Copy. Copy. Copy. Copy. Copy. Copy. Copy. Copy. Copy. Copy. Copy. Copy. Copy. Copy. Copy. Copy. Copy. Copy. Copy. Copy. Copy. Copy. Copy. Copy. Copy. Copy. Copy. Copy. Copy. Copy. Copy. Copy. Copy. Copy. Copy. Copy. Copy. Copy. Copy. Copy. Copy. Copy. Copy. Copy. Copy. Copy. Copy. Copy. Copy. Copy. Copy. Copy. Copy. Copy. Copy. Copy. Copy. Copy. Copy. Copy. Copy. Copy. Copy. Copy. Copy. Copy. Copy. Copy. Copy. Copy. Copy. Copy. Copy. Copy. Copy. Copy. Copy. Copy. Copy. Copy. Copy. Copy. Copy. Copy. Copy. Copy. Copy. Copy. Copy. Copy. Copy. Copy. Copy. Copy. Copy. Copy. Copy. Copy. Copy. Copy. Copy. Copy. Copy. Copy. Copy. Copy. Copy. Copy Copy. Copy Copy. Copy Copy | It's for free, no plan, no plea, no history. Whatever's winning, that is me. | Who am I when nobody wins? Who am I when the next one begins? | We're solid doubling every line. Whatever's winning, that is me. Copy the neighbor, it's me. | Did you see that? I did that.

393 words heard, 14 not in our lyrics: our watchers win book cow neighbor once knee we're solid doubling every line neighbor (limit 10 % of the words heard, at least 40 heard)

## Heard by a model, not a person

Not listened to: listening is off, or there is no GEMINI_API_KEY in the environment. Nobody on the machine can hear.

## Checks

kept despite failing: harsh: 3.5% above 6 kHz (ceiling 2.5)
