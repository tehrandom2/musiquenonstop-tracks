# Low Setting

- **slug:** greytide-bed-low-setting
- **idea:** Wave three: the big light flickers and settles on its low setting, the shadows run long, and the night light, a tower that never fires a shot, makes every grey dude in its glow easier to hit.
- **mood:** tender, glowing, quietly fierce
- **bpm:** 132 (asked) / 131 (measured, folded into 70-140)
- **key:** F# minor (asked) / F# minor (estimated)
- **seed:** 3930400
- **model:** ACE-Step 1.5, acestep-v15-turbo, 8 steps, guidance 7.0, shift 3.0, LM acestep-5Hz-lm-1.7B
- **tier:** fast   **gate profile:** mellow   **duration:** 160 s rendered, 155.1 s installed (one-shot, nothing baked)
- **date:** 2026-10-26
- **render time:** 23.4 s per seed, model load 24.6 s
- **licence:** generated locally from a text prompt, no samples or reference audio, no third-party rights claimed
- project: greytide
- **album:** Greytide, track 4
- **submitter:** the radio, for greytide
- **tags:** table:bed, pov:the night light
- **loop:** no, a one-shot
- **length:** 6838249 samples at 44.1 kHz (155.06 s), about 85.3 bars of 4/4 at 132 bpm (the MP3 adds encoder padding; the length is of the PCM)

## Why

You asked for "Wave three: the big light flickers and settles on its low setting, the shadows run long, and the night light, a tower that never fires a shot, makes every grey dude in its glow easier to hit.". The words and the style were written for this song by the station's writers and reviewed by the conductor. So I wrote it at 132 bpm in F# minor, 160 seconds, with a voice, in words I wrote myself, under the mellow gates. It has no beat to hold, so 132 bpm is only the grid I gave the model and the tempo gate is not applied. It is a one-shot: nothing is baked and the ending is the model's own. I rendered 2 seeds and threw away 1: 3930401 (0.7s of near-silence (limit 0.5) and others). Seed 3930400 is the take.

## Prompt

> Dream-pop with drive, 132 bpm, F# minor. The band: a shimmering chorused guitar playing a ringing figure, a second guitar in soft swells, a steady motorik drum groove with brushed snare, a round, lean bass walking under the mids, a high synth pad like a glow. An airy, tender female lead, double-tracked on the chorus. Mood: tender, glowing, quietly fierce. Arc: the shimmer alone, the groove in by verse one, the chorus opening wide, a half-time bridge of voice and pad, the final chorus lifted and fuller. F# minor throughout, no harsh highs.

## Lyrics (original, written for this track by the project; the model was given only these words)

```
[Intro: shimmering guitar and pad]

[Verse 1]
The big light flickered twice and settled low
the shadows ran out long across the folds
they made me for a hallway in the night
to keep the dark from being what it was
I've never fired a single shot
I don't own a bolt or blade
I only stand and softly glow
so every shot finds where it's aimed

[Pre-Chorus]
Low setting, warmer, darker
come a little closer, grey

[Chorus]
Walk into my glow
where the dark can't hide you
walk into my glow
I don't strike, I just find you

[Verse 2]
I was the thing a small kid needed once
a moon you plugged into the wall
now I'm painted, chipped along one shoulder
proud of every brush mark, flaws and all
the cannon thanks me with its noise
the ballista doesn't say a thing
but every bolt that lands tonight
lands a little brighter in my ring

[Pre-Chorus]
Low setting, warmer, darker
come a little closer, grey

[Chorus]
Walk into my glow
where the dark can't hide you
walk into my glow
I don't strike, I just find you

[Bridge: half-time, voice and pad]
Everything is easier to love when it's lit
everything is easier to stop
I'm not the hero, I'm the reason they can see
I'm the reason they can see

[Final Chorus: lifted, fuller]
Walk into my glow
where the dark can't hide you
walk into my glow
I don't strike, I just find you

[Outro: shimmer alone]
I just find you.
```

## Request filter

stripped: nothing

## Rejected seeds

- 3930401: 0.7s of near-silence (limit 0.5); 21 of 208 heard words are not ours (10 %; limit 10 %, at least 40 heard): lights thicker settle falling i'd day grave strive smoke vangs booster boat

## Measured (the kept take, after the 60 Hz high-pass, before the loudness gain unless noted)

| gate | measured | limit | passed |
|---|---|---|---|
| tempo | 131 bpm vs asked 132 | not applied: no beat was asked for | yes |
| loudness | -16.0 LUFS installed (decoded MP3 -16.4); candidate was -15.5, gain -0.5 dB | -16 LUFS within 1 dB | yes |
| peak after encode | -3.25 dBFS decoded (pre-encode -3.24) | under -1 dBFS | yes |
| silence | longest 0.10 s under -50 dBFS | under 0.5 s (mellow) | yes |
| brightness | 1.92 % of power above 6 kHz | under 2.5 % (mellow) | yes |
| boominess | 4.10 % below 60 Hz (raw render 13.0 %) | under 12 % | yes |
| onset rate | 2.84 per second | 0.3 to 4.5 | yes |
| loop seam | step 0.01x, tail-head -56.3 dB | not applied: a one-shot, not a loop | yes |

## Words (Demucs voice stem, Whisper large-v3-turbo)

heard: Big life thicker twice and settled low The shadows ran out long across the folds They made me feel | I only stand | Welcome to my love. | I just find you. | I was the thing a small kid needed once I'm moving you, plugged into the wall Now I'm painted, chipped along one shoulder, proud of every brush, mark flaws and all | The cannon thanks me with its noise The belliest it doesn't say a thing But every bolt that lands tonight Plants a little brighter in my wings | Oh, sit in, warm and darker, come a little circle, walk into my glow, where the dark can't hide you, walk into my glow, where the dark can't hide you, walk into my glow, where the dark can't hide you, walk into my glow, where the dark can't hide you, walk into my glow, where the dark can't hide you, walk into my glow, where the dark can't hide you, walk into my glow, where the dark can't hide you, walk into my glow, where the dark can't hide you, walk into my glow, where the dark can't hide you, walk into my glow, where the dark can't hide you, walk into my glow, where the dark can't hide you, walk into my glow, where the dark can't hide you, walk into my glow, where the dark can't hide you, walk into my glow, where the dark can't hide you, walk into my glow, where the dark can't hide you, walk into my glow, where the dark can't hide you, walk into my glow, where the dark can't hide you, walk into my glow, where the dark can't hide you, walk into my glow, where the dark can't hide you, walk into my glow, where the dark can't hide you, walk into my glow, where the dark can't hide you, walk into my glow, where the dark can't hide you, walk into my glow, where the dark can't hide you, walk into my glow, where the dark can't hide you, walk into my glow, where the dark can't hide you, walk into my glow, where the dark can't hide you, walk into my glow, where the dark can't hide you, walk into my glow, where the dark can't hide you, walk into my glow, where the dark can't hide you, walk into my glow, where the dark can't hide you, walk into my glow, where the dark can't hide you, walk into my glow, where the dark can't hide you, walk into my glow, where the dark can't hide, where the | Everything is easier to love when it's lit. Everything is easier to love when it's lit. | I'm not the hero. I'm the reason they can see. I'm the reason they can see. Walk into my globe. Where the dark | I can't hide you, walking to my glow I don't strike, I just find you I just | Just find you.

488 words heard, 14 not in our lyrics: life thicker feel welcome moving belliest plants wings oh sit warm circle globe walking (limit 10 % of the words heard, at least 40 heard)

## Heard by a model, not a person

Not listened to: listening is off, or there is no GEMINI_API_KEY in the environment. Nobody on the machine can hear.

## Checks

all automatic checks passed. These are numbers, not hearing: nobody on the machine can hear, the owner listens.
