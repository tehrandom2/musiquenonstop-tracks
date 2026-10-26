# Under the Lens

- **slug:** greytide-workbench-under-the-lens
- **idea:** Wave nine, the magnifier swings over the middle of the bench: everything under its ring light takes more, and painted and grey look the same up close
- **mood:** intense, widescreen, revealing
- **bpm:** 140 (asked) / 138 (measured, folded into 70-140)
- **key:** C minor (asked) / C major (estimated)
- **seed:** 3960900
- **model:** ACE-Step 1.5, acestep-v15-turbo, 8 steps, guidance 7.0, shift 3.0, LM acestep-5Hz-lm-1.7B
- **tier:** fast   **gate profile:** mellow   **duration:** 165 s rendered, 160.1 s installed (one-shot, nothing baked)
- **date:** 2026-10-26
- **render time:** 24.5 s per seed, model load 24.6 s
- **licence:** generated locally from a text prompt, no samples or reference audio, no third-party rights claimed
- project: greytide
- **album:** Greytide, track 9
- **submitter:** the radio, for greytide
- **tags:** table:workbench, pov:the-magnifier
- **loop:** no, a one-shot
- **length:** 7058784 samples at 44.1 kHz (160.06 s), about 93.4 bars of 4/4 at 140 bpm (the MP3 adds encoder padding; the length is of the PCM)

## Why

You asked for "Wave nine, the magnifier swings over the middle of the bench: everything under its ring light takes more, and painted and grey look the same up close". The words and the style were written for this song by the station's writers and reviewed by the conductor. So I wrote it at 140 bpm in C minor, 165 seconds, with a voice, in words I wrote myself, under the mellow gates. It has no beat to hold, so 140 bpm is only the grid I gave the model and the tempo gate is not applied. It is a one-shot: nothing is baked and the ending is the model's own. I rendered 2 seeds and threw away 1: 3960901 (22 of 183 heard words are not ours (12 %; limit 10 %, at least 40 heard): singer life grad). Seed 3960900 is the take, but it did not clear every gate: harsh: 3.2% above 6 kHz (ceiling 2.5).

## Prompt

> Dark cinematic rock at 140 bpm in C minor, a big widescreen band: a driving palm-muted guitar with warm saturation in the mids, a tight lean pick bass, bass under the mids, pounding tom-led drums, a slow-building string ostinato, a creaking metallic percussion before each chorus like an arm swinging; an intense, soaring female lead with a low male voice doubling the hook; starts mid, a long rising plateau, a quiet held bridge, a lifted final chorus, C minor, no harsh highs

## Lyrics (original, written for this track by the project; the model was given only these words)

```
[Intro - strings, a long creak]
Swing it over.

[Verse 1]
Wave nine, the magnifier arm begins to creak
Two bones and a spring and a ring of light that seems to speak
It swings out over the sander and the middle of the board
And everything beneath it is a story, magnified, adored
Every seam on every grey dude, every mould line, every flaw
Seven centimetres wide, a circle of the law

[Pre-Chorus]
Hold them there, hold them there
(Where the light is everywhere)

[Chorus]
Under the lens, you can't hide
Every hit lands twice the size
Under the lens, I see you true
Grey as the morning, coming through

[Verse 2]
The painted ones look up and see themselves in giant scale
Every wobble of the brush, every highlight, every tale
The Spirit Level steadies everyone who stands beside
The rotary tool throws a disc that cuts and comes back with the tide
And down the line the multimeter's needle swings to red
The leader's nearly at the end and nobody's ahead

[Pre-Chorus]
Hold them there, hold them there
(Where the light is everywhere)

[Chorus]
Under the lens, you can't hide
Every hit lands twice the size
Under the lens, I see you true
Grey as the morning, coming through

[Bridge - quiet, strings held]
The owner used to look at us like this
Close enough to see the little things he'd missed
Now the light's on all of us, the painted and the plain
Under the lens we look the same

[Final Chorus - lifted, the whole band and the low voice]
Under the lens, you can't hide
Every hit lands twice the size
Under the lens, I see you true
Grey as the morning, coming through

[Outro - one last creak]
Swing it back.
```

## Request filter

stripped: nothing

## Rejected seeds

- 3960901: 22 of 183 heard words are not ours (12 %; limit 10 %, at least 40 heard): singer life grade mold far centimeters can headland too great commences tail

## Measured (the kept take, after the 60 Hz high-pass, before the loudness gain unless noted)

| gate | measured | limit | passed |
|---|---|---|---|
| tempo | 138 bpm vs asked 140 | not applied: no beat was asked for | yes |
| loudness | -16.0 LUFS installed (decoded MP3 -16.4); candidate was -13.5, gain -2.5 dB | -16 LUFS within 1 dB | yes |
| peak after encode | -3.58 dBFS decoded (pre-encode -3.59) | under -1 dBFS | yes |
| silence | longest 0.25 s under -50 dBFS | under 0.5 s (mellow) | yes |
| brightness | 3.18 % of power above 6 kHz | under 2.5 % (mellow) | **NO** |
| boominess | 7.84 % below 60 Hz (raw render 18.9 %) | under 12 % | yes |
| onset rate | 3.00 per second | 0.3 to 4.5 | yes |
| loop seam | step 0.00x, tail-head -13.7 dB | not applied: a one-shot, not a loop | yes |

## Words (Demucs voice stem, Whisper large-v3-turbo)

heard: Swing it over. | Magnified. | Every seam on every grade dude, every mole line, every flaw. Seven centimeters wide, a circle of the law. Oh, | Pull them there, pull them there, where the light is everywhere. Under the lens, you can't hide. Every hit that's twice the size. Under the lens, I see you true. | Grey as the morning coming through. The painted ones look up and see themselves in giant scales. | Every wobble of the brush Every highlight, every tail The spirit level steadies everyone who stands beside The rotary tool throws a disc that cuts and comes back with the tide And down the line, the multimeter's needle swings to red | The leader's nearly at the end and nobody's ahead. Hold them there, hold them there, where the light is set. | You can't hide every hitman twice the size under the lens. I see you true. There's the morning coming through. | The owner used to look at us like this Close enough to see the little things he'd missed Now the light's on all of us | The painted and the plain Under the lens we look the same Under the lens, you can't hide Every hit that's twice the size | Under the lens I see you too. There's the morning coming through.

213 words heard, 15 not in our lyrics: grade mole centimeters oh pull pull that's scales tail set hitman there's that's too there's (limit 10 % of the words heard, at least 40 heard)

## Heard by a model, not a person

Not listened to: listening is off, or there is no GEMINI_API_KEY in the environment. Nobody on the machine can hear.

## Checks

kept despite failing: harsh: 3.2% above 6 kHz (ceiling 2.5)
