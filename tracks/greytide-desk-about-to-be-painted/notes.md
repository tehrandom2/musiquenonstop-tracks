# About to Be Painted

- **slug:** greytide-desk-about-to-be-painted
- **idea:** Wave 10 and the desk's last stand from a primed-only dude, about to be painted for years: shoved off the desk edge, he looks up at the world from the floor as the board is carried on toward the kitchen.
- **mood:** anthemic, bruised, hopeful
- **bpm:** 142 (asked) / 139 (measured, folded into 70-140)
- **key:** E minor (asked) / E minor (estimated)
- **seed:** 3911000
- **model:** ACE-Step 1.5, acestep-v15-turbo, 8 steps, guidance 7.0, shift 3.0, LM acestep-5Hz-lm-1.7B
- **tier:** fast   **gate profile:** mellow   **duration:** 175 s rendered, 172.1 s installed (one-shot, nothing baked)
- **date:** 2026-10-26
- **render time:** 25.9 s per seed, model load 24.6 s
- **licence:** generated locally from a text prompt, no samples or reference audio, no third-party rights claimed
- project: greytide
- **album:** Greytide, track 10
- **submitter:** the radio, for greytide
- **tags:** table:desk, pov:a primed-only dude
- **loop:** no, a one-shot
- **length:** 7587898 samples at 44.1 kHz (172.06 s), about 101.8 bars of 4/4 at 142 bpm (the MP3 adds encoder padding; the length is of the PCM)

## Why

You asked for "Wave 10 and the desk's last stand from a primed-only dude, about to be painted for years: shoved off the desk edge, he looks up at the world from the floor as the board is carried on toward the kitchen.". The words and the style were written for this song by the station's writers and reviewed by the conductor. So I wrote it at 142 bpm in E minor, 175 seconds, with a voice, in words I wrote myself, under the mellow gates. It has no beat to hold, so 142 bpm is only the grid I gave the model and the tempo gate is not applied. It is a one-shot: nothing is baked and the ending is the model's own. I rendered 2 seeds and threw away 1: 3911001 (0.7s of near-silence (limit 0.5)). Seed 3911000 is the take, but it did not clear every gate: harsh: 2.8% above 6 kHz (ceiling 2.5).

## Prompt

> Arena rock anthem, 142 bpm, E minor. A five-piece: a big minor riff on two overdriven guitars in the mids, one holding chords and one a high counter-melody, a tight lean bass in eighths well under the mids, huge tom-led drums, a piano doubling the chorus melody. A gravelly male lead with a soaring top line and a massive gang chorus. Bruised and hopeful. Starts mid on drums then the riff, a long high chorus plateau, one half-time dip, a lifted final chorus. E minor, warm saturation, no harsh highs.

## Lyrics (original, written for this track by the project; the model was given only these words)

```
[Intro: drums alone, then the riff]

[Verse 1]
They primed me in a spring that nobody remembers
One quick coat outside and then back in the box
I've been about to be painted ever since
Through every promise and every lost weekend

[Pre-Chorus]
Tonight's the tenth wave and the edge is right there
The cannon is counting and the long guns stare

[Chorus]
About to be painted, about to be
Somewhere on the shelf there's a colour for me
Knock me off the edge, I'll fall slow as a seed
About to be painted, about to be

[Verse 2]
The gloss one shoves and I go over the side
Seventy-five centimetres, a mile to me
I land on the floor in the dust and the offcuts
And look up at the world from underneath

[Pre-Chorus]
The tenth wave is breaking on the edge up there
And the painted ones are holding in the air

[Chorus]
About to be painted, about to be
Somewhere on the shelf there's a colour for me
Knock me off the edge, I'll fall slow as a seed
About to be painted, about to be

[Bridge: half-time, bass and toms]
They'll carry the board through to the kitchen soon
Painted and grey in the same tired hands
And the night goes on, and the night goes on
And nobody's finished, and everyone stands

[Final Chorus: lifted, the gang on every line]
About to be painted, about to be
Somewhere on the shelf there's a colour for me
Knock me off the edge, I'll fall slow as a seed
About to be painted, about to be

[Outro: the riff, then one chord ringing]
About to be painted
```

## Request filter

stripped: nothing

## Rejected seeds

- 3911001: 0.7s of near-silence (limit 0.5)

## Measured (the kept take, after the 60 Hz high-pass, before the loudness gain unless noted)

| gate | measured | limit | passed |
|---|---|---|---|
| tempo | 139 bpm vs asked 142 | not applied: no beat was asked for | yes |
| loudness | -16.0 LUFS installed (decoded MP3 -16.4); candidate was -13.8, gain -2.2 dB | -16 LUFS within 1 dB | yes |
| peak after encode | -3.22 dBFS decoded (pre-encode -3.79) | under -1 dBFS | yes |
| silence | longest 0.15 s under -50 dBFS | under 0.5 s (mellow) | yes |
| brightness | 2.82 % of power above 6 kHz | under 2.5 % (mellow) | **NO** |
| boominess | 3.17 % below 60 Hz (raw render 14.5 %) | under 12 % | yes |
| onset rate | 2.84 per second | 0.3 to 4.5 | yes |
| loop seam | step 0.01x, tail-head -48.0 dB | not applied: a one-shot, not a loop | yes |

## Words (Demucs voice stem, Whisper large-v3-turbo)

heard: . | They try me in a spring that nobody remembers. One quick coat outside and then back | in the box I've been about to be painted ever since through every promise and every lost weekend | Tonight's the tenth wave and the edge is right there. The cannon is counting in the long gun stare. | About to be painted, about to be Somewhere on the shelf there's a color for me Knock me off the edge, I'll fall slow as a seed About to be painted, about to be | The gloss one shows and I go over the side 75 centimeters a mile tilt to me I land | Stand on the floor in the dust and the offcuts and look up at the world from underneath. The temp wave is breaking. | on the edge up there and the painted ones are holding in the air about to be painted about to be | Somewhere on the shelf there's a color for me Knock me off the edge, I'll fall slow as a seed About to be painted, about to be | They'll carry the board through to the kitchen soon. They need and gray in the same tired hands. And the night goes on and the night goes on. And nobody's finished and everyone stands. | About to be painted, about to be. Somewhere on the shelf there's a color for me. Knock me off the edge, I'll fall slow as a sea. | about to be painted about to be

244 words heard, 13 not in our lyrics: try gun color shows centimeters tilt stand temp color need gray color sea (limit 10 % of the words heard, at least 40 heard)

## Heard by a model, not a person

Not listened to: listening is off, or there is no GEMINI_API_KEY in the environment. Nobody on the machine can hear.

## Checks

kept despite failing: harsh: 2.8% above 6 kHz (ceiling 2.5)
