# Hot Sauce Line

- **slug:** greytide-picnic-hot-sauce-line
- **idea:** Wave eight in the blue light: the Hot Sauce Bottle draws its burning line, the citronella smoke strips shields and the Fly Swatter smacks a patch flat
- **mood:** hot, strutting, gleeful
- **bpm:** 142 (asked) / 72 (measured, folded into 70-140)
- **key:** C sharp minor (asked) / C major (estimated)
- **seed:** 4000800
- **model:** ACE-Step 1.5, acestep-v15-turbo, 8 steps, guidance 7.0, shift 3.0, LM acestep-5Hz-lm-1.7B
- **tier:** fast   **gate profile:** mellow   **duration:** 165 s rendered, 161.7 s installed (one-shot, nothing baked)
- **date:** 2026-10-26
- **render time:** 24.3 s per seed, model load 24.6 s
- **licence:** generated locally from a text prompt, no samples or reference audio, no third-party rights claimed
- project: greytide
- **album:** Greytide, track 8
- **submitter:** the radio, for greytide
- **tags:** table:picnic, pov:the hot sauce bottle
- **loop:** no, a one-shot
- **length:** 7132803 samples at 44.1 kHz (161.74 s), about 95.7 bars of 4/4 at 142 bpm (the MP3 adds encoder padding; the length is of the PCM)

## Why

You asked for "Wave eight in the blue light: the Hot Sauce Bottle draws its burning line, the citronella smoke strips shields and the Fly Swatter smacks a patch flat". The words and the style were written for this song by the station's writers and reviewed by the conductor. So I wrote it at 142 bpm in C sharp minor, 165 seconds, with a voice, in words I wrote myself, under the mellow gates. It has no beat to hold, so 142 bpm is only the grid I gave the model and the tempo gate is not applied. It is a one-shot: nothing is baked and the ending is the model's own. I rendered 2 seeds and threw away 1: 4000801 (0.6s of near-silence (limit 0.5)). Seed 4000800 is the take, but it did not clear every gate: 0.8s of near-silence (limit 0.5); harsh: 3.1% above 6 kHz (ceiling 2.5).

## Prompt

> Latin boogaloo and funk, 142 bpm, C sharp minor: a montuno piano riff, a tight lean bass, bass under the mids, playing a syncopated tumbao, timbales and congas driving, a drummer on a tight snare, a brass section of two trumpets and a trombone stabbing in strict order, a hand-clap section, a fiery male lead who struts the verses and a gang shouting the hook; hot and dry, no harsh highs; starts mid on piano and congas, a long hot plateau, a timbale break dip, a final lift with the brass, C sharp minor

## Lyrics (original, written for this track by the project; the model was given only these words)

```
[Intro: the montuno, then the brass]
Squeeze! Squeeze!

[Verse 1]
I'm the Hot Sauce Bottle with a cap on my head
I don't shoot a bolt, I just draw it in red
A long hot line right across the trail
You walk in my line and you carry my tale

[Pre-Chorus]
It's on your boots, it's on your base
You drag me with you all over the place

[Chorus]
Hot sauce line, don't you cross it
Hot sauce line, you'll be sorry that you lost it
Hot sauce line, burning slow
Everywhere you walk, there I go

[Verse 2]
The citronella's smoking on the corner of the checks
The grey are coughing, they've got shields round their necks
The smoke takes the shields and the line does the rest
And the Fly Swatter winds for the thing it does best

[Pre-Chorus]
It's on your boots, it's on your base
You drag me with you all over the place

[Chorus]
Hot sauce line, don't you cross it
Hot sauce line, you'll be sorry that you lost it
Hot sauce line, burning slow
Everywhere you walk, there I go

[Breakdown: timbales and congas, the gang counting]
One, two, three and the swatter comes down
A whole patch flat with a terrible sound
Smack! and the grass jumps up off the lawn
And the red line glows till the grey are gone

[Final Chorus: lifted, the brass on top]
Hot sauce line, don't you cross it
Hot sauce line, you'll be sorry that you lost it
Hot sauce line, burning slow
Everywhere you walk, there I go

[Outro: one brass hit]
Squeeze!
```

## Request filter

stripped: Hot Sauce Bottle, Fly Swatter

## Rejected seeds

- 4000801: 0.6s of near-silence (limit 0.5)

## Measured (the kept take, after the 60 Hz high-pass, before the loudness gain unless noted)

| gate | measured | limit | passed |
|---|---|---|---|
| tempo | 72 bpm vs asked 142 | not applied: no beat was asked for | yes |
| loudness | -16.0 LUFS installed (decoded MP3 -16.4); candidate was -14.2, gain -1.8 dB | -16 LUFS within 1 dB | yes |
| peak after encode | -2.94 dBFS decoded (pre-encode -3.43) | under -1 dBFS | yes |
| silence | longest 0.80 s under -50 dBFS | under 0.5 s (mellow) | **NO** |
| brightness | 3.05 % of power above 6 kHz | under 2.5 % (mellow) | **NO** |
| boominess | 4.54 % below 60 Hz (raw render 13.4 %) | under 12 % | yes |
| onset rate | 3.71 per second | 0.3 to 4.5 | yes |
| loop seam | step 0.01x, tail-head -40.3 dB | not applied: a one-shot, not a loop | yes |

## Words (Demucs voice stem, Whisper large-v3-turbo)

heard: Squeeze! Squeeze! Squeeze! | I'm a hot sauce bottle with a cap on my head. I don't shoot a boat, I just throw it in red. Along the hotline, ride across the trail. | You walk in my line and you carry my tail. It's on your boots. It's on your base. You drag me with you all over the place. Hot sauce line. Don't you cross it. | Hot sauce line, you'll be sorry that you lost it. Hot sauce line, burning slow. Everywhere you walk, there I go. | The citronella smoking on the corner of the checks. The grey are coughing, they've got shields round the necks. The smoke takes the shields and the line does the rest. And the flyswatter wins for the thing it is best. It's on your boot. | It's on your base. You drag me with you all over the place. Hot sauce line. Don't you cross it. Hot sauce line. You'll be sorry that you lost it. Hot sauce. | sauce line burning slow everywhere you walk there I go | One, two, three, and the swatter comes down. A whole patch flat with a terrible sound. Smack, and the grass jumps up off the lawn. And the red line comes down. | Till the grey are gone! | Hot sauce line. Don't you cross it. Hot sauce line. You'll be sorry that you lost it. Hot sauce line. Burning slow. Everywhere you walk. There I go. Ooh. | Squeez! Squeez!

240 words heard, 14 not in our lyrics: boat throw along hotline ride tail citronella flyswatter wins is boot ooh squeez squeez (limit 10 % of the words heard, at least 40 heard)

## Heard by a model, not a person

Not listened to: listening is off, or there is no GEMINI_API_KEY in the environment. Nobody on the machine can hear.

## Checks

kept despite failing: 0.8s of near-silence (limit 0.5); harsh: 3.1% above 6 kHz (ceiling 2.5)
