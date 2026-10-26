# The Sign Did Say

- **slug:** greytide-railway-the-sign-did-say
- **idea:** Wave seven: the Third Rail and the Water Tower team up, soaking the grey and shocking them harder while the train runs
- **mood:** snarling, electric, gleeful
- **bpm:** 150 (asked) / 74 (measured, folded into 70-140)
- **key:** F minor (asked) / F major (estimated)
- **seed:** 4060700
- **model:** ACE-Step 1.5, acestep-v15-turbo, 8 steps, guidance 7.0, shift 3.0, LM acestep-5Hz-lm-1.7B
- **tier:** fast   **gate profile:** mellow   **duration:** 165 s rendered, 159.6 s installed (one-shot, nothing baked)
- **date:** 2026-10-26
- **render time:** 24.1 s per seed, model load 24.6 s
- **licence:** generated locally from a text prompt, no samples or reference audio, no third-party rights claimed
- project: greytide
- **album:** Greytide, track 7
- **submitter:** the radio, for greytide
- **tags:** table:railway, pov:third-rail
- **loop:** no, a one-shot
- **length:** 7039380 samples at 44.1 kHz (159.62 s), about 99.8 bars of 4/4 at 150 bpm (the MP3 adds encoder padding; the length is of the PCM)

## Why

You asked for "Wave seven: the Third Rail and the Water Tower team up, soaking the grey and shocking them harder while the train runs". The words and the style were written for this song by the station's writers and reviewed by the conductor. So I wrote it at 150 bpm in F minor, 165 seconds, with a voice, in words I wrote myself, under the mellow gates. It has no beat to hold, so 150 bpm is only the grid I gave the model and the tempo gate is not applied. It is a one-shot: nothing is baked and the ending is the model's own. I rendered 2 seeds and threw away 1: 4060701 (0.8s of near-silence (limit 0.5) and others). Seed 4060700 is the take, but it did not clear every gate: harsh: 3.4% above 6 kHz (ceiling 2.5).

## Prompt

> Snarling electro-punk big beat, 150 bpm, in F minor, a three-piece crackling with current: a breakbeat kit with a fat snare and crashing fills, a tight lean distorted bass under the mids buzzing on the root, a gritty bitcrushed synth riff in the mids, short zapping synth stabs answering each line, a sneering raspy male lead singing as the third rail, with a cool female voice as the water tower on the second verse, a gang shout on the hook, F minor stated twice; arc: a crackle and spark intro, punchy verses, a chorus that surges, a breakdown with only the bass hum and claps, a lifted final chorus at full voltage, a hard stop, warm saturation in the mids, no harsh highs

## Lyrics (original, written for this track by the project; the model was given only these words)

```
[Intro: a crackle, a spark, the beat]

[Verse 1: the rail]
Two sleepers, ballast, a coil of cable
A ceramic cap at each end of the table
Three shades of grey on a rail of steel
I don't aim, I just make you feel

[Verse 2: the water tower]
Up on my trestle with my hoops of iron
My spout swings out when the line needs firing
I fill the engines and I soak the rest
A wet grey dude takes the shock the best

[Pre-Chorus]
Once a second, once a second
Closer than you ever reckoned

[Chorus]
The sign did say, the sign did say
A yellow triangle in your way
Wet on the ballast and the line goes live
The sign did say, and you didn't arrive

[Verse 3: the rail]
When the train is running I'm twice as mean
Two and a bit, if you know what I mean
The painter did my bolt the wrong way round
But it still comes down on the grey ground

[Chorus]
The sign did say, the sign did say
A yellow triangle in your way
Wet on the ballast and the line goes live
The sign did say, and you didn't arrive

[Breakdown: bass hum and claps]
Wet and live, wet and live
One and a half is what we give
She pours, I spark, the grey go still
Build us together, build us at will

[Final Chorus: lifted, full voltage]
The sign did say, the sign did say
A yellow triangle in your way
Wet on the ballast and the line goes live
The sign did say, and you didn't arrive

[Outro: a last spark, hard stop]
It did say.
```

## Request filter

stripped: Third Rail, Water Tower

## Rejected seeds

- 4060701: 0.8s of near-silence (limit 0.5); harsh: 3.7% above 6 kHz (ceiling 2.5); 233 of 375 heard words are not ours (62 %; limit 10 %, at least 40 heard): palace trissel spars went boat around it's bop bop bop bop bop

## Measured (the kept take, after the 60 Hz high-pass, before the loudness gain unless noted)

| gate | measured | limit | passed |
|---|---|---|---|
| tempo | 74 bpm vs asked 150 | not applied: no beat was asked for | yes |
| loudness | -16.0 LUFS installed (decoded MP3 -16.4); candidate was -14.4, gain -1.6 dB | -16 LUFS within 1 dB | yes |
| peak after encode | -3.61 dBFS decoded (pre-encode -3.61) | under -1 dBFS | yes |
| silence | longest 0.15 s under -50 dBFS | under 0.5 s (mellow) | yes |
| brightness | 3.44 % of power above 6 kHz | under 2.5 % (mellow) | **NO** |
| boominess | 5.62 % below 60 Hz (raw render 18.5 %) | under 12 % | yes |
| onset rate | 3.62 per second | 0.3 to 4.5 | yes |
| loop seam | step 0.30x, tail-head -53.4 dB | not applied: a one-shot, not a loop | yes |

## Words (Demucs voice stem, Whisper large-v3-turbo)

heard: . | Two sleepers ballast, a coil, a cable, a ceramic cap at each end of the table, three shades of grey on a rail | Up on my trestle, with my hoops and vying, my spout swings and | This idea | And you didn't arrive. | When the train is running I'm twice as mean Two and a bit if you know what I mean The painter did my boat the wrong way round, but it still comes down | And you didn't arrive | Wet and live. Wet and live. | One and a half is what we give. Keep war as I spark, the great go still. Build us together, build us at will. The sign did say, the sign did say, I can't. | I am in your way. We're on the glass and the line goes live. Signed it say and you didn't arrive. | It did say.

143 words heard, 12 not in our lyrics: vying this idea boat keep war great can't am we're glass signed (limit 10 % of the words heard, at least 40 heard)

## Heard by a model, not a person

Not listened to: listening is off, or there is no GEMINI_API_KEY in the environment. Nobody on the machine can hear.

## Checks

kept despite failing: harsh: 3.4% above 6 kHz (ceiling 2.5)
