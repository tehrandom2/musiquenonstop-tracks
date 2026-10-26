# Sulk for Two

- **slug:** greytide-garage-sulk-for-two
- **idea:** Wave eight: the big amp tells it: stand a tower in its cone and it howls, stunning the grey for a second while the tower sulks for two
- **mood:** dreamy, dry, mischievous
- **bpm:** 136 (asked) / 137 (measured, folded into 70-140)
- **key:** F sharp minor (asked) / F# minor (estimated)
- **seed:** 3990801
- **model:** ACE-Step 1.5, acestep-v15-turbo, 8 steps, guidance 7.0, shift 3.0, LM acestep-5Hz-lm-1.7B
- **tier:** fast   **gate profile:** mellow   **duration:** 170 s rendered, 166.9 s installed (one-shot, nothing baked)
- **date:** 2026-10-26
- **render time:** 24.7 s per seed, model load 24.6 s
- **licence:** generated locally from a text prompt, no samples or reference audio, no third-party rights claimed
- project: greytide
- **album:** Greytide, track 8
- **submitter:** the radio, for greytide
- **tags:** table:garage, pov:the big amp
- **loop:** no, a one-shot
- **length:** 7359974 samples at 44.1 kHz (166.89 s), about 94.6 bars of 4/4 at 136 bpm (the MP3 adds encoder padding; the length is of the PCM)

## Why

You asked for "Wave eight: the big amp tells it: stand a tower in its cone and it howls, stunning the grey for a second while the tower sulks for two". The words and the style were written for this song by the station's writers and reviewed by the conductor. So I wrote it at 136 bpm in F sharp minor, 170 seconds, with a voice, in words I wrote myself, under the mellow gates. It has no beat to hold, so 136 bpm is only the grid I gave the model and the tempo gate is not applied. It is a one-shot: nothing is baked and the ending is the model's own. I rendered 2 seeds and threw away 1: 3990800 (0.8s of near-silence (limit 0.5) and others). Seed 3990801 is the take.

## Prompt

> Shoegaze noise-pop, 136 bpm, F sharp minor: walls of warm chorused guitar in the mids, a tight lean bass, bass under the mids, carrying a simple bright melody, a driving drummer on toms and a steady snare, a swelling feedback drone that rises before each chorus, a breathy female lead with a dry wit, doubled an octave up in the hooks; warm, no harsh highs; starts mid on the drone and bass, a long dreamy loud plateau, one dip to bass and voice, a final lift where the feedback peaks and cuts, F sharp minor

## Lyrics (original, written for this track by the project; the model was given only these words)

```
[Intro: a feedback drone swelling]
Stand in front of me. Go on.

[Verse 1]
I'm the big valve amp with the jewel on my face
The dust on my cones is a quiet disgrace
Put a tower in front where my speakers can see
And count to a few, and then listen to me

[Pre-Chorus]
The valves are glowing
The dust is jumping
The cones are shaking
Here it comes

[Chorus]
Feedback, feedback
Everybody stunned for one
Feedback, feedback
And the tower sulks for two

[Verse 2]
The Mage stood still with its staff in the air
Too proud to move, so I gave it a scare
The grey in my cone all froze where they stood
The Mage wouldn't fire, it went off in a mood

[Pre-Chorus]
The valves are glowing
The dust is jumping
The cones are shaking
Here it comes

[Chorus]
Feedback, feedback
Everybody stunned for one
Feedback, feedback
And the tower sulks for two

[Bridge: bass and voice only]
I'm not cruel, I'm just loud
I can't tell a hero from a crowd
Move it a step and I'll let it be
Nobody stands too close to me

[Final Chorus: lifted, feedback peaking]
Feedback, feedback
Everybody stunned for one
Feedback, feedback
And the tower sulks for two

[Outro: the drone cuts to silence]
Stand in front of me. Go on.
```

## Request filter

stripped: nothing

## Rejected seeds

- 3990800: 0.8s of near-silence (limit 0.5); 15 of 145 heard words are not ours (10 %; limit 10 %, at least 40 heard): bell bell chew everybody's done soaks back gray everybody's done soaks soaks

## Measured (the kept take, after the 60 Hz high-pass, before the loudness gain unless noted)

| gate | measured | limit | passed |
|---|---|---|---|
| tempo | 137 bpm vs asked 136 | not applied: no beat was asked for | yes |
| loudness | -16.0 LUFS installed (decoded MP3 -16.4); candidate was -13.8, gain -2.2 dB | -16 LUFS within 1 dB | yes |
| peak after encode | -3.62 dBFS decoded (pre-encode -3.70) | under -1 dBFS | yes |
| silence | longest 0.50 s under -50 dBFS | under 0.5 s (mellow) | yes |
| brightness | 2.34 % of power above 6 kHz | under 2.5 % (mellow) | yes |
| boominess | 5.45 % below 60 Hz (raw render 17.4 %) | under 12 % | yes |
| onset rate | 3.27 per second | 0.3 to 4.5 | yes |
| loop seam | step 0.01x, tail-head -25.1 dB | not applied: a one-shot, not a loop | yes |

## Words (Demucs voice stem, Whisper large-v3-turbo)

heard: Stand in front of me, go on. Stand in front of me. | friendly. | I'm the valve amp with the jewel on my face, the dust on the cones is a quiet disgrace. Put a tower in front where my speakers can see and count to a few and then listen to me. | The vowels are glowing, dust is jumping, cones are shaking, here it comes, feedback. | Feedback Everybody's done for one Feedback Feedback And the tower stops for two | The mage stood still with its staff in the air, too proud to move, so I gave it a scare. The gray in my cone all froze where they stood, but mage wouldn't fall. | It went off in a mood. The clouds are glowing. The dust is jumping. Combs are shaking. Here it comes. | Feedback, feedback, everybody stands for one. Feedback, feedback, and the town we smoke is for. | I'm not cruel, I'm just loud. I can't tell a hero from a crowd. | Move it a step and not let it be Nobody stands too close to me Feedback Feedback Everybody's time for one | Stand in front of me. | Go on.

190 words heard, 15 not in our lyrics: friendly vowels everybody's done stops gray but fall clouds combs town we smoke everybody's time (limit 10 % of the words heard, at least 40 heard)

## Heard by a model, not a person

Not listened to: listening is off, or there is no GEMINI_API_KEY in the environment. Nobody on the machine can hear.

## Checks

all automatic checks passed. These are numbers, not hearing: nobody on the machine can hear, the owner listens.
