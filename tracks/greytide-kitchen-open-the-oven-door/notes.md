# Open the Oven Door

- **slug:** greytide-kitchen-open-the-oven-door
- **idea:** Wave 9: the cooker tells it; the oven timer rings, the door drops open, gold light floods across the cloth and one hot gust shoves every grey dude back a few centimetres.
- **mood:** brassy, proud, hot
- **bpm:** 128 (asked) / 125 (measured, folded into 70-140)
- **key:** G minor (asked) / C major (estimated)
- **seed:** 3920900
- **model:** ACE-Step 1.5, acestep-v15-turbo, 8 steps, guidance 7.0, shift 3.0, LM acestep-5Hz-lm-1.7B
- **tier:** fast   **gate profile:** mellow   **duration:** 170 s rendered, 165.1 s installed (one-shot, nothing baked)
- **date:** 2026-10-26
- **render time:** 24.7 s per seed, model load 24.6 s
- **licence:** generated locally from a text prompt, no samples or reference audio, no third-party rights claimed
- project: greytide
- **album:** Greytide, track 9
- **submitter:** the radio, for greytide
- **tags:** table:kitchen, pov:the cooker
- **loop:** no, a one-shot
- **length:** 7282663 samples at 44.1 kHz (165.14 s), about 88.1 bars of 4/4 at 128 bpm (the MP3 adds encoder padding; the length is of the PCM)

## Why

You asked for "Wave 9: the cooker tells it; the oven timer rings, the door drops open, gold light floods across the cloth and one hot gust shoves every grey dude back a few centimetres.". The words and the style were written for this song by the station's writers and reviewed by the conductor. So I wrote it at 128 bpm in G minor, 170 seconds, with a voice, in words I wrote myself, under the mellow gates. It has no beat to hold, so 128 bpm is only the grid I gave the model and the tempo gate is not applied. It is a one-shot: nothing is baked and the ending is the model's own. I rendered 2 seeds and threw away 1: 3920901 (0.9s of near-silence (limit 0.5)). Seed 3920900 is the take, but it did not clear every gate: 0.6s of near-silence (limit 0.5).

## Prompt

> Heavy funk soul, 128 bpm, G minor. A nine-piece: a tight lean bass on a syncopated riff well under the mids, a tight kit with a fat snare, a choppy rhythm guitar, an organ swelling under every chorus, a four-horn section of two trumpets, tenor sax and trombone punching the hook, a bell hit on each downbeat of the pre-chorus. A powerful female soul lead with gospel backing singers. Proud and hot. Starts mid, a long horn plateau, one dip to bass and voices, a lifted final chorus. G minor, no harsh highs.

## Lyrics (original, written for this track by the project; the model was given only these words)

```
[Intro: horns and a ringing bell]

[Verse 1]
I stand by the table with a timer on my front
Four rings on top going redder with each loss
Two sausages spitting in a pan on the left
Smells good, behaves badly, that's the cost

[Pre-Chorus]
Ding, ding, ding, wave nine on the dial
Stand back, little ones, give me a while

[Chorus]
Open the door and the light comes through
Gold on the gingham, a hot wind too
Smells good, behaves badly
Smells good, behaves badly

[Verse 2]
The gust goes over and the grey ones skid
A couple of centimetres back where they came
The painted ones squint in a light they don't know
Like the sun came up and called them by name

[Pre-Chorus]
Ding, ding, ding, wave nine on the dial
Stand back, little ones, give me a while

[Chorus]
Open the door and the light comes through
Gold on the gingham, a hot wind too
Smells good, behaves badly
Smells good, behaves badly

[Bridge: bass and voices only]
Someone is cooking, someone is cooking
Nobody's eaten since the painting began
Someone is cooking for the whole of the warband
Bread and a promise and a sausage in a pan

[Final Chorus: lifted, every horn in]
Open the door and the light comes through
Gold on the gingham, a hot wind too
Smells good, behaves badly
Smells good, behaves badly

[Outro: horns, then the bell once]
Smells good
```

## Request filter

stripped: nothing

## Rejected seeds

- 3920901: 0.9s of near-silence (limit 0.5)

## Measured (the kept take, after the 60 Hz high-pass, before the loudness gain unless noted)

| gate | measured | limit | passed |
|---|---|---|---|
| tempo | 125 bpm vs asked 128 | not applied: no beat was asked for | yes |
| loudness | -16.0 LUFS installed (decoded MP3 -16.4); candidate was -14.1, gain -1.9 dB | -16 LUFS within 1 dB | yes |
| peak after encode | -3.07 dBFS decoded (pre-encode -3.50) | under -1 dBFS | yes |
| silence | longest 0.60 s under -50 dBFS | under 0.5 s (mellow) | **NO** |
| brightness | 1.95 % of power above 6 kHz | under 2.5 % (mellow) | yes |
| boominess | 4.01 % below 60 Hz (raw render 16.0 %) | under 12 % | yes |
| onset rate | 2.60 per second | 0.3 to 4.5 | yes |
| loop seam | step 0.01x, tail-head -66.3 dB | not applied: a one-shot, not a loop | yes |

## Words (Demucs voice stem, Whisper large-v3-turbo)

heard: I | I stand by the table with a timer on my front Four rings on top, going redder with each loss Two sausages, bitten in a pan on the left Smells good, behaves badly, that's the cause | Ding, ding, ding, wave blind on the dial Stand back the little ones, give me a while Open the door and the light comes through Hold on the gingham, a hot wing too | Smells good, behaves badly. Smells good, behaves badly. | The dust goes over and the gray ones get a couple of centimeters back where they came. The painted ones squint in a light they don't know, like the sun came up and called them by name. | Ding, ding, ding, wave nine on the dial. Stand back, little ones, give me a while. Open the door and the light comes through. Gold on the ging of a hot wind, too. | Smells good, behaves badly. Smells good, behaves badly. | Someone is cooking, someone is cooking. Nobody's eaten since the painting begun. Someone is cooking for the whole of the war band, bread and a promise and a sign. | Smells good. | Smells good. Behaves badly. Smells good. Behaves badly. | Smells good. | Thank you.

199 words heard, 16 not in our lyrics: bitten cause blind hold wing dust gray get centimeters ging begun war band sign thank you (limit 10 % of the words heard, at least 40 heard)

## Heard by a model, not a person

Not listened to: listening is off, or there is no GEMINI_API_KEY in the environment. Nobody on the machine can hear.

## Checks

kept despite failing: 0.6s of near-silence (limit 0.5)
