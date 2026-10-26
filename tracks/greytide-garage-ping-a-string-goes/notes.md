# Ping (A String Goes)

- **slug:** greytide-garage-ping-a-string-goes
- **idea:** Wave five: the guitar's sixth string snaps and the crash cymbal falls on the lead and buries a road; told by the broken string, who'd rather break than never be played
- **mood:** aching, heavy, defiant
- **bpm:** 134 (asked) / 134 (measured, folded into 70-140)
- **key:** C sharp minor (asked) / F# minor (estimated)
- **seed:** 3990510
- **model:** ACE-Step 1.5, acestep-v15-turbo, 8 steps, guidance 7.0, shift 3.0, LM acestep-5Hz-lm-1.7B
- **tier:** fast   **gate profile:** mellow   **duration:** 175 s rendered, 172.3 s installed (one-shot, nothing baked)
- **date:** 2026-10-26
- **render time:** 25.8 s per seed, model load 68.0 s
- **licence:** generated locally from a text prompt, no samples or reference audio, no third-party rights claimed
- project: greytide
- **album:** Greytide, track 5
- **submitter:** the radio, for greytide
- **tags:** table:garage, pov:the broken string
- **loop:** no, a one-shot
- **length:** 7596735 samples at 44.1 kHz (172.26 s), about 96.2 bars of 4/4 at 134 bpm (the MP3 adds encoder padding; the length is of the PCM)

## Why

You asked for "Wave five: the guitar's sixth string snaps and the crash cymbal falls on the lead and buries a road; told by the broken string, who'd rather break than never be played". The words and the style were written for this song by the station's writers and reviewed by the conductor. So I wrote it at 134 bpm in C sharp minor, 175 seconds, with a voice, in words I wrote myself, under the mellow gates. It has no beat to hold, so 134 bpm is only the grid I gave the model and the tempo gate is not applied. It is a one-shot: nothing is baked and the ending is the model's own. I rendered 2 seeds and threw away 1: 3990511 (0.7s of near-silence (limit 0.5) and others). Seed 3990510 is the take, but it did not clear every gate: 0.7s of near-silence (limit 0.5).

## Prompt

> Grunge rock, 134 bpm, C sharp minor: a quiet verse on a clean detuned guitar arpeggio, a heavy fuzzed chorus with two guitars stacked, a tight lean bass, bass under the mids, doubling the riff, a drummer who plays the verses on rims and smashes the chorus on crash and floor tom, a tired male lead who sings the verses low and breaks into a hoarse belt on the hook; warm saturation, no harsh highs; quiet, loud, quiet, loud, a long loud plateau after the bridge, C sharp minor

## Lyrics (original, written for this track by the project; the model was given only these words)

```
[Intro: the clean arpeggio, one high note bending flat]

[Verse 1]
I'm the sixth string on the sunburst neck
I've held this note since the summer we met
Wound round the peg like a promise you keep
Then something gives and I don't make a peep

[Pre-Chorus]
Hum, and then
Hum, and then

[Chorus]
Ping, a string goes
And the crash comes down
Ping, a string goes
And the lead goes underground

[Verse 2]
The crash cymbal wobbles on its long thin arm
The ballista looks up and it rings the alarm
It lands like a moon on the yellow road
Buries the jack where the grey ones go

[Pre-Chorus]
Hum, and then
Hum, and then

[Chorus]
Ping, a string goes
And the crash comes down
Ping, a string goes
And the lead goes underground

[Bridge: quiet, the arpeggio alone, then building]
Now I hang in a curl from the nut
I'm the reason the road got cut
If a thing can break it's a thing that played
I'd rather be snapped than never be made

[Final Chorus: lifted, belted, guitars stacked]
Ping, a string goes
And the crash comes down
Ping, a string goes
And the lead goes underground

[Outro: feedback dying, one muted strum]
Hum, and then
```

## Request filter

stripped: nothing

## Rejected seeds

- 3990511: 0.7s of near-silence (limit 0.5); 20 of 97 heard words are not ours (21 %; limit 10 %, at least 40 heard): thank six sudden burst net well around line yeah clash bills crest

## Measured (the kept take, after the 60 Hz high-pass, before the loudness gain unless noted)

| gate | measured | limit | passed |
|---|---|---|---|
| tempo | 134 bpm vs asked 134 | not applied: no beat was asked for | yes |
| loudness | -16.0 LUFS installed (decoded MP3 -16.4); candidate was -13.5, gain -2.5 dB | -16 LUFS within 1 dB | yes |
| peak after encode | -3.69 dBFS decoded (pre-encode -3.75) | under -1 dBFS | yes |
| silence | longest 0.65 s under -50 dBFS | under 0.5 s (mellow) | **NO** |
| brightness | 1.68 % of power above 6 kHz | under 2.5 % (mellow) | yes |
| boominess | 2.78 % below 60 Hz (raw render 9.7 %) | under 12 % | yes |
| onset rate | 2.33 per second | 0.3 to 4.5 | yes |
| loop seam | step 0.03x, tail-head -35.3 dB | not applied: a one-shot, not a loop | yes |

## Words (Demucs voice stem, Whisper large-v3-turbo)

heard: I'm the sixth string on the string | I've held this note since the summer we met. Round round the peg like a promise you keep. | Then something gives and I don't make a beat. Hum and then. Hum and then. Be a stranger. | And the crash comes down. I'm strangled. | The crash cymbal wobbles on | It's long, thin arm. The police still looks up and it rings the alarm. It lands like a moon on the yellow road. Buries the jack where the gray ones go. And then... | And then. Pink string goes. And the crash goes. | goes underground | You're hanging a curl from the nut on the reason the road got cut if a thing can | It's a thing that played. I'd rather be snapped than never be made. | ............................................................................................................................................................................................................................................................................................................................................................................................................................................................ | Home and ground.

133 words heard, 11 not in our lyrics: beat stranger strangled police still gray pink you're hanging home ground (limit 10 % of the words heard, at least 40 heard)

## Heard by a model, not a person

Not listened to: listening is off, or there is no GEMINI_API_KEY in the environment. Nobody on the machine can hear.

## Checks

kept despite failing: 0.7s of near-silence (limit 0.5)
