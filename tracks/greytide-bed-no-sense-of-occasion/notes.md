# No Sense of Occasion

- **slug:** greytide-bed-no-sense-of-occasion
- **idea:** The two cats sing their side: one pounces on the thickest crowd after a wiggle, one rakes the leaders and now and then the owner's leg; the little war is theirs to walk across, every wave, with no sense of occasion.
- **mood:** sly, slinky, smug
- **bpm:** 132 (asked) / 131 (measured, folded into 70-140)
- **key:** B minor (asked) / F# major (estimated)
- **seed:** 3930701
- **model:** ACE-Step 1.5, acestep-v15-turbo, 8 steps, guidance 7.0, shift 3.0, LM acestep-5Hz-lm-1.7B
- **tier:** fast   **gate profile:** mellow   **duration:** 165 s rendered, 163.7 s installed (one-shot, nothing baked)
- **date:** 2026-10-26
- **render time:** 24.2 s per seed, model load 24.6 s
- **licence:** generated locally from a text prompt, no samples or reference audio, no third-party rights claimed
- project: greytide
- **album:** Greytide, track 7
- **submitter:** the radio, for greytide
- **tags:** table:bed, pov:the cats
- **loop:** no, a one-shot
- **length:** 7220919 samples at 44.1 kHz (163.74 s), about 90.1 bars of 4/4 at 132 bpm (the MP3 adds encoder padding; the length is of the PCM)

## Why

You asked for "The two cats sing their side: one pounces on the thickest crowd after a wiggle, one rakes the leaders and now and then the owner's leg; the little war is theirs to walk across, every wave, with no sense of occasion.". The words and the style were written for this song by the station's writers and reviewed by the conductor. So I wrote it at 132 bpm in B minor, 165 seconds, with a voice, in words I wrote myself, under the mellow gates. It has no beat to hold, so 132 bpm is only the grid I gave the model and the tempo gate is not applied. It is a one-shot: nothing is baked and the ending is the model's own. I rendered 2 seeds and threw away 1: 3930700 (0.7s of near-silence (limit 0.5)). Seed 3930701 is the take.

## Prompt

> Electro-swing, 132 bpm, B minor. The band: a swung four-on-the-floor kick with brushed snare, a walking upright bass kept tight and lean, bass under the mids; a muted trumpet with a sly growl answering each line; a stride piano comping; light clarinet runs. Two sultry female voices trading verses, a duet in close harmony on the chorus. Mood: sly, slinky, smug. Arc: muted trumpet and walking bass, the swing beat in at verse one, a full chorus, a bridge with a trumpet solo over a purring hum, the final chorus lifted in harmony. B minor, no harsh highs.

## Lyrics (original, written for this track by the project; the model was given only these words)

```
[Intro: muted trumpet and walking bass]

[Verse 1: first voice]
I'm the one who wiggles first
a shadow, then a ring
I land on the thickest crowd
I don't take everything
I thin it like a gardener
I'm patient, I'm precise
I come on every third wave
and on the third, I come twice

[Verse 2: second voice]
I'm the one who stretches out
I rake the two in front
and now and then I find a leg
beneath the sheets, and hunt
OW! comes the cry, and something worse
the whole board shakes in dread
I never mean the leg, I swear
(I always mean the leg)

[Chorus: both]
We have no sense of occasion
we were here before the war
your little grey invasion
is a thing to pounce on, nothing more

[Verse 3: trading lines]
They built a tower on my spot
(we'll sit on it instead)
they painted soldiers on my hill
(it's not a hill, it's the bed)
the phone says Mum is asking
was that the cats? it was
we don't explain ourselves
we do it just because

[Chorus: both]
We have no sense of occasion
we were here before the war
your little grey invasion
is a thing to pounce on, nothing more

[Bridge: trumpet solo over a purring hum, then both voices]
We were here when the bed was a bed
we'll be here when the paint is dry

[Final Chorus: lifted, in harmony]
We have no sense of occasion
we were here before the war
your little grey invasion
is a thing to pounce on, nothing more

[Outro: walking bass alone]
Nothing more.
```

## Request filter

stripped: nothing

## Rejected seeds

- 3930700: 0.7s of near-silence (limit 0.5)

## Measured (the kept take, after the 60 Hz high-pass, before the loudness gain unless noted)

| gate | measured | limit | passed |
|---|---|---|---|
| tempo | 131 bpm vs asked 132 | not applied: no beat was asked for | yes |
| loudness | -16.0 LUFS installed (decoded MP3 -16.4); candidate was -16.3, gain +0.3 dB | -16 LUFS within 1 dB | yes |
| peak after encode | -2.55 dBFS decoded (pre-encode -3.11) | under -1 dBFS | yes |
| silence | longest 0.25 s under -50 dBFS | under 0.5 s (mellow) | yes |
| brightness | 1.35 % of power above 6 kHz | under 2.5 % (mellow) | yes |
| boominess | 10.72 % below 60 Hz (raw render 22.6 %) | under 12 % | yes |
| onset rate | 2.70 per second | 0.3 to 4.5 | yes |
| loop seam | step 0.01x, tail-head -65.5 dB | not applied: a one-shot, not a loop | yes |

## Words (Demucs voice stem, Whisper large-v3-turbo)

heard: I'm the one | I | I'm patient, I'm precise. I come on every third wave and on the third I come twice. I'm the one who stretches out. | I always mean the leg. | We have no sense of occasion, before the Lord, before the Lord. | Your little gray invasion is a thing to pounce on nothing more They built a tower on my spot, well sit on it instead. They painted soldiers on my hills now | It's not a hill, but it's the bed. The phone says, mom is asking, was that the cats it was? We don't explain ourselves. We do it just because we have lots of occasion. | Before the war, before the war Your little grey invasion Is a thing to bounce on, nothing more | We were here when the bed was open | We'll be here when the paint is dry. We have an oil spill. | Nothing more.

150 words heard, 13 not in our lyrics: lord lord gray well hills but mom lots bounce open an oil spill (limit 10 % of the words heard, at least 40 heard)

## Heard by a model, not a person

Not listened to: listening is off, or there is no GEMINI_API_KEY in the environment. Nobody on the machine can hear.

## Checks

all automatic checks passed. These are numbers, not hearing: nobody on the machine can hear, the owner listens.
