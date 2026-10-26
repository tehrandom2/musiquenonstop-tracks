# Dead Zone

- **slug:** joes-castle-dead-zone
- **idea:** the trebuchet's song: it sees the whole road but can't hit what's at the door, so it lobs at bosses and the farthest dude and trusts the wall
- **mood:** brooding, patient, humble, proud
- **bpm:** 90 (asked) / 120 (measured, folded into 70-140)
- **key:** C minor (asked) / F major (estimated)
- **seed:** 3380201
- **model:** ACE-Step 1.5, acestep-v15-turbo, 8 steps, guidance 7.0, shift 3.0, LM acestep-5Hz-lm-1.7B
- **tier:** fast   **gate profile:** mellow   **duration:** 170 s rendered, 164.5 s installed (one-shot, nothing baked)
- **date:** 2026-10-26
- **render time:** 25.1 s per seed, model load 23.2 s
- **licence:** generated locally from a text prompt, no samples or reference audio, no third-party rights claimed
- project: joes-castle
- **loop:** no, a one-shot
- **length:** 7252755 samples at 44.1 kHz (164.46 s), about 61.7 bars of 4/4 at 90 bpm (the MP3 adds encoder padding; the length is of the PCM)

## Why

You asked for "the trebuchet's song: it sees the whole road but can't hit what's at the door, so it lobs at bosses and the farthest dude and trusts the wall". The words and the style were written for this song by the station's writers and reviewed by the conductor. So I wrote it at 90 bpm in C minor, 170 seconds, with a voice, in words I wrote myself, under the mellow gates. It has no beat to hold, so 90 bpm is only the grid I gave the model and the tempo gate is not applied. It is a one-shot: nothing is baked and the ending is the model's own. I rendered 2 seeds and threw away 1: 3380200 (0.9s of near-silence (limit 0.5) and others). Seed 3380201 is the take, but it did not clear every gate: harsh: 2.7% above 6 kHz (ceiling 2.5).

## Prompt

> brooding cinematic orchestral piece at 90 bpm in C minor, a patient slow march: low strings carry a heavy ostinato, big taiko drums on the long counts, a low brass swell under every chorus, a creaking wooden percussion knock on the offbeat, a deep warm baritone narrator, calm and certain, a wordless low choir in the last chorus; tight lean bass, bass under the mids, no harsh highs; starts sparse, builds to a wide final chorus, ends on one low drum, C minor

## Lyrics (original, written for this track by the project; the model was given only these words)

```
[Intro: low strings, one taiko, the long arm creaks back]

[Verse 1]
Long beams from the bottom of the tub
A pin, a sling, a hinge
A box of loose bricks for a heart
That drops when the arm swings
I can see the camp, the broken cart
The grey flag on its pole
But the ground in front of my own two feet
Is ground I can't control

[Pre-Chorus]
One, the arm comes down
Two, the weight goes low
Three, the stone is in the sky
Four and a half, and throw

[Chorus]
Dead zone, dead zone
Too close for me to throw
I send the fire to the far ones
And I trust the ones below
Dead zone, dead zone
Every stone goes long
I can reach the edge of the baseplate
But the door is not my song

[Verse 2]
The big ones first, that's the order
A boss in reach is mine
Then the farthest one still walking
At the back end of the line
Walls don't hide you, roofs don't hide you
I throw it high and steep
Up at sixty, over the stone
And down where the grey ones creep

[Chorus]
Dead zone, dead zone
Too close for me to throw
I send the fire to the far ones
And I trust the ones below
Dead zone, dead zone
Every stone goes long
I can reach the edge of the baseplate
But the door is not my song

[Bridge: half time, the strings fall away, taiko alone]
You build a thing that sees for miles
And it's blind at its own front step
So the kid built a wall, then a knight, then a pot
Click by click, a castle of help
When the ladder crew comes down the bank
I drop one where their boots will be
And the whole wall shouts "siege broken"
And for once, they're shouting for me

[Final Chorus: full strings, the choir hums under]
Dead zone, dead zone
Too close for me to throw
I send the fire to the far ones
And I trust the ones below
Dead zone, dead zone
Every stone goes long
I can reach the edge of the baseplate
But the door is not my song

[Outro: the arm creaks back, one last low drum]
Four and a half
And throw
```

## Request filter

stripped: nothing

## Rejected seeds

- 3380200: 0.9s of near-silence (limit 0.5); harsh: 2.6% above 6 kHz (ceiling 2.5)

## Measured (the kept take, after the 60 Hz high-pass, before the loudness gain unless noted)

| gate | measured | limit | passed |
|---|---|---|---|
| tempo | 120 bpm vs asked 90 | not applied: no beat was asked for | yes |
| loudness | -16.0 LUFS installed (decoded MP3 -16.4); candidate was -14.0, gain -2.0 dB | -16 LUFS within 1 dB | yes |
| peak after encode | -3.37 dBFS decoded (pre-encode -3.62) | under -1 dBFS | yes |
| silence | longest 0.10 s under -50 dBFS | under 0.5 s (mellow) | yes |
| brightness | 2.75 % of power above 6 kHz | under 2.5 % (mellow) | **NO** |
| boominess | 8.10 % below 60 Hz (raw render 24.9 %) | under 12 % | yes |
| onset rate | 3.19 per second | 0.3 to 4.5 | yes |
| loop seam | step 0.00x, tail-head -61.1 dB | not applied: a one-shot, not a loop | yes |

## Words (Demucs voice stem, Whisper large-v3-turbo)

heard: . | Long beams from the bottom of the tub, a pin, a sling, a hinge, a box of loose bricks for a heart that drops from the | One. | Two, the weight goes low. Three, the stone is in the sky. Four and a half and throw. Dead zone, dead zone. Too close for me to throw. I send the fire to the farm. | Big One | First that's the order, a boss in reach is mine Then the farthest one's still walking, at the back end of the line Walls don't hide you, roofs don't hide you, I throw it high and steep | Up at 60 over the stone and down where the gray ones creep. Dead zone, dead zone, too close for me to throw. I send the fire to the far ones and I trust the ones beneath. | Dead song, dead song. Every stone goes long. I can reach the edge of the bass plate, but the door is not my song. | He built a thing that sees for miles and it's blind at its own front step. So the kid built a wall and a knight and a pot click by click, a castle of hell. When the ladder crew comes down the | I | I can reach the edge of the bass plate, but the door is not my song.

220 words heard, 10 not in our lyrics: farm one's gray beneath bass plate he hell bass plate (limit 10 % of the words heard, at least 40 heard)

## Heard by a model, not a person

Not listened to: listening is off, or there is no GEMINI_API_KEY in the environment. Nobody on the machine can hear.

## Checks

kept despite failing: harsh: 2.7% above 6 kHz (ceiling 2.5)
