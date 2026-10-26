# Night Night

- **slug:** greytide-bed-night-night
- **idea:** Lights out at wave nine, only the moon and the phone's glow left; the hot water bottle, which never fires, keeps every tower beside it warm and fast while the box nobody opened climbs the last hill and a red wedge on the alarm clock thins.
- **mood:** warm, huge, defiant, tender
- **bpm:** 136 (asked) / 137 (measured, folded into 70-140)
- **key:** C minor (asked) / F major (estimated)
- **seed:** 3931001
- **model:** ACE-Step 1.5, acestep-v15-turbo, 8 steps, guidance 7.0, shift 3.0, LM acestep-5Hz-lm-1.7B
- **tier:** fast   **gate profile:** mellow   **duration:** 176 s rendered, 170.1 s installed (one-shot, nothing baked)
- **date:** 2026-10-26
- **render time:** 25.9 s per seed, model load 24.6 s
- **licence:** generated locally from a text prompt, no samples or reference audio, no third-party rights claimed
- project: greytide
- **album:** Greytide, track 10
- **submitter:** the radio, for greytide
- **tags:** table:bed, pov:the hot water bottle
- **loop:** no, a one-shot
- **length:** 7499710 samples at 44.1 kHz (170.06 s), about 96.4 bars of 4/4 at 136 bpm (the MP3 adds encoder padding; the length is of the PCM)

## Why

You asked for "Lights out at wave nine, only the moon and the phone's glow left; the hot water bottle, which never fires, keeps every tower beside it warm and fast while the box nobody opened climbs the last hill and a red wedge on the alarm clock thins.". The words and the style were written for this song by the station's writers and reviewed by the conductor. So I wrote it at 136 bpm in C minor, 176 seconds, with a voice, in words I wrote myself, under the mellow gates. It has no beat to hold, so 136 bpm is only the grid I gave the model and the tempo gate is not applied. It is a one-shot: nothing is baked and the ending is the model's own. I rendered 2 seeds and threw away 1: 3931000 (0.6s of near-silence (limit 0.5)). Seed 3931001 is the take, but it did not clear every gate: 0.6s of near-silence (limit 0.5); boomy: 12.4% below 60 Hz (ceiling 12).

## Prompt

> Cinematic anthem, 136 bpm, C minor. The ensemble: a celesta playing a small lullaby figure, driving toms and a tight kick, a lean bass under the mids, string ostinato in eighths, a low brass swell on the chorus, and a choir of low voices. A warm female lead, steady and close, the choir answering. Mood: warm, huge, defiant and tender. Arc: celesta alone, strings and toms in at verse one, a wide chorus, a bridge of voice and choir with drums out, the final chorus lifted with full choir and brass, a celesta outro. C minor throughout, no harsh highs.

## Lyrics (original, written for this track by the project; the model was given only these words)

```
[Intro: celesta alone]

[Verse 1]
The light went out on wave nine
three, two, one, and then the blue
the moon on the hills, the phone's last glow
and a pile of grey coming through
I'm the bottle at the back of the line
never fired, never will
but every tower I sit beside
fires faster, and it's warm here still

[Pre-Chorus]
Night night, love you
says the screen to someone half awake

[Chorus]
Night night, hold on
keep it warm until the dawn
night night, hold on
every painted one, hold on

[Verse 2]
On the carpet a clock with a red slice
the big one's life is in that wedge
it's the box that was never opened
climbing over the last ridge
cellophane and four hundred pieces
sixty pages, not one read
the scariest thing in the whole wide world
is the kit beside your bed

[Pre-Chorus]
Night night, love you
says the screen to someone half awake

[Chorus]
Night night, hold on
keep it warm until the dawn
night night, hold on
every painted one, hold on

[Bridge: drums out, voice and choir]
Go to bed, properly, love you
(we will, we will)
the wedge goes thin, the wedge goes thin
(we will, we will)

[Final Chorus: lifted, full choir and brass]
Night night, hold on
keep it warm until the dawn
night night, hold on
every painted one, hold on

[Outro: celesta alone]
Night night.
```

## Request filter

stripped: nothing

## Rejected seeds

- 3931000: 0.6s of near-silence (limit 0.5)

## Measured (the kept take, after the 60 Hz high-pass, before the loudness gain unless noted)

| gate | measured | limit | passed |
|---|---|---|---|
| tempo | 137 bpm vs asked 136 | not applied: no beat was asked for | yes |
| loudness | -16.0 LUFS installed (decoded MP3 -16.4); candidate was -15.1, gain -0.9 dB | -16 LUFS within 1 dB | yes |
| peak after encode | -2.89 dBFS decoded (pre-encode -3.30) | under -1 dBFS | yes |
| silence | longest 0.60 s under -50 dBFS | under 0.5 s (mellow) | **NO** |
| brightness | 2.42 % of power above 6 kHz | under 2.5 % (mellow) | yes |
| boominess | 12.37 % below 60 Hz (raw render 29.7 %) | under 12 % | **NO** |
| onset rate | 2.10 per second | 0.3 to 4.5 | yes |
| loop seam | step 0.06x, tail-head -23.7 dB | not applied: a one-shot, not a loop | yes |

## Words (Demucs voice stem, Whisper large-v3-turbo)

heard: The light went out on wave nine three two one and then the blue the moon on the hill | The phone's last glow and a pile of gray coming through I'm the bottle at the back of the line Never fire never will But every tower I sit down | Says the screen to someone | Night, night, hold on. Been warm until the dawn. Night, night, hold on. Everything. | On the carpet a clock with a red slice The big one's life is in that ledge It's the box that was never over | Climbing over the last ridge Cellophane in 400 pieces 60 pages, not one read The scariest thing in the whole wide world | Night | Hold on. | Go to bed, properly love you. We will, we will. The wedge goes thin, the wedge goes thin. | We will. We will. Night, night. Hold on. Keep it warm until the dawn. Night. | Hold on. Every painted one. Hold on. Hold on. | you

158 words heard, 7 not in our lyrics: hill gray fire down been everything ledge (limit 10 % of the words heard, at least 40 heard)

## Heard by a model, not a person

Not listened to: listening is off, or there is no GEMINI_API_KEY in the environment. Nobody on the machine can hear.

## Checks

kept despite failing: 0.6s of near-silence (limit 0.5); boomy: 12.4% below 60 Hz (ceiling 12)
