# Show Your Working

- **slug:** greytide-schooldesk-show-your-working
- **idea:** the calculator never shoots: it rolls a digit and the towers beside it hit harder on the high numbers; it sings about luck you can read
- **mood:** glossy, cocky, a gamble
- **bpm:** 138 (asked) / 134 (measured, folded into 70-140)
- **key:** F sharp minor (asked) / D minor (estimated)
- **seed:** 4010701
- **model:** ACE-Step 1.5, acestep-v15-turbo, 8 steps, guidance 7.0, shift 3.0, LM acestep-5Hz-lm-1.7B
- **tier:** fast   **gate profile:** mellow   **duration:** 160 s rendered, 156.3 s installed (one-shot, nothing baked)
- **date:** 2026-10-26
- **render time:** 23.5 s per seed, model load 24.6 s
- **licence:** generated locally from a text prompt, no samples or reference audio, no third-party rights claimed
- project: greytide
- **album:** Greytide, track 7
- **submitter:** the radio, for greytide
- **tags:** table:schooldesk, pov:calculator
- **loop:** no, a one-shot
- **length:** 6891215 samples at 44.1 kHz (156.26 s), about 89.9 bars of 4/4 at 138 bpm (the MP3 adds encoder padding; the length is of the PCM)

## Why

You asked for "the calculator never shoots: it rolls a digit and the towers beside it hit harder on the high numbers; it sings about luck you can read". The words and the style were written for this song by the station's writers and reviewed by the conductor. So I wrote it at 138 bpm in F sharp minor, 160 seconds, with a voice, in words I wrote myself, under the mellow gates. It has no beat to hold, so 138 bpm is only the grid I gave the model and the tempo gate is not applied. It is a one-shot: nothing is baked and the ending is the model's own. I rendered 2 seeds and threw away 1: 4010700 (1.7s of near-silence (limit 0.5) and others). Seed 4010701 is the take, but it did not clear every gate: harsh: 2.9% above 6 kHz (ceiling 2.5).

## Prompt

> Glossy electro-pop, 138 bpm, F sharp minor, a synth band with clear roles: a pulsing sequenced synth bass in a tight lean line, bass well under the mids, a bright plucked arpeggio flickering like a digit, a punchy four-on-the-floor kick with crisp claps, a wide chord pad in the chorus, a smooth confident female lead, a stacked vocal on the hook, in F sharp minor, cocky and playful, mid start, a long high plateau, a dip to the arpeggio and voice, a lifted last chorus, no harsh highs

## Lyrics (original, written for this track by the project; the model was given only these words)

```
[Intro - the arpeggio flickers alone, then the kick]

[Verse 1]
I don't shoot, honey, I just do the sums
Park your big gun next to me and see what comes
My screen flicks over every couple of seconds
Four per cent for every point, if you're reckoning

[Pre-Chorus]
Watch the flicker, wait for it, wait
Fire on the big one, don't be late

[Chorus - stacked vocal]
Roll me a seven, roll me a nine
Never a zero, never the same twice
Show your working, show your working
Roll me a seven, roll me a nine

[Verse 2]
Lesson fourteen, fractions on the board
A half and a quarter of the horde is what you can afford
The cannon's on my left side and it's waiting on a high
And when the screen says eight, oh, watch the grey ones fly

[Pre-Chorus]
Watch the flicker, wait for it, wait
Fire on the big one, don't be late

[Chorus - stacked vocal]
Roll me a seven, roll me a nine
Never a zero, never the same twice
Show your working, show your working
Roll me a seven, roll me a nine

[Bridge - arpeggio and voice]
A gamble you can read is the only kind worth taking
Some nights it's a two and the whole lid's shaking
Some nights it's a nine and the horde is mistaken

[Final Chorus - lifted, the pad opens wide]
Roll me a seven, roll me a nine
Never a zero, never the same twice
Show your working, show your working
Roll me a seven, roll me a nine

[Outro - the arpeggio slows to one digit]
Nine.
```

## Request filter

stripped: nothing

## Rejected seeds

- 4010700: 1.7s of near-silence (limit 0.5); harsh: 2.8% above 6 kHz (ceiling 2.5); boomy: 14.7% below 60 Hz (ceiling 12); 25 of 199 heard words are not ours (13 %; limit 10 %, at least 40 heard): songs rock focusing in say workin' workin' less than hardest but can't

## Measured (the kept take, after the 60 Hz high-pass, before the loudness gain unless noted)

| gate | measured | limit | passed |
|---|---|---|---|
| tempo | 134 bpm vs asked 138 | not applied: no beat was asked for | yes |
| loudness | -16.0 LUFS installed (decoded MP3 -16.4); candidate was -14.9, gain -1.1 dB | -16 LUFS within 1 dB | yes |
| peak after encode | -3.78 dBFS decoded (pre-encode -3.55) | under -1 dBFS | yes |
| silence | longest 0.20 s under -50 dBFS | under 0.5 s (mellow) | yes |
| brightness | 2.91 % of power above 6 kHz | under 2.5 % (mellow) | **NO** |
| boominess | 8.40 % below 60 Hz (raw render 24.3 %) | under 12 % | yes |
| onset rate | 3.76 per second | 0.3 to 4.5 | yes |
| loop seam | step 0.01x, tail-head -47.9 dB | not applied: a one-shot, not a loop | yes |

## Words (Demucs voice stem, Whisper large-v3-turbo)

heard: I don't shoot 100 | I just do the songs. Hark your big gun looks to me and see what comes. My screen flicks over every | Don't be late. Roll me seven. | Never zero never the same twice Show you can show you | Roll me a seven, roll me a nine Less than fourteen Fractions on the board A half and a quarter of the heart is what you can afford Your cannon's on my left side | And it's waiting on a high And when the screen says, hey, oh, watch the grey one slide Watch the flicker, wait for it, wait for it | Fire on the big one. Don't be late. Roll me seven, roll me nine. Never zero. Never the same twice. | Show your workin', show your workin', roll me seven, roll me nine. | A gamble you can read is the only kind worth taking. Some nights it's a two and the whole lid's shaking. Some nights it's a nine and the hardest night. | Never the same twice. Show you. | Show your working, show your working Roll me a seven, roll me a nine

184 words heard, 12 not in our lyrics: songs hark looks less than heart hey slide workin' workin' hardest night (limit 10 % of the words heard, at least 40 heard)

## Heard by a model, not a person

Not listened to: listening is off, or there is no GEMINI_API_KEY in the environment. Nobody on the machine can hear.

## Checks

kept despite failing: harsh: 2.9% above 6 kHz (ceiling 2.5)
