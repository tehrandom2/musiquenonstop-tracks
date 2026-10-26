# Demo Ends in Sixty

- **slug:** greytide-gamestore-demo-ends-in-sixty
- **idea:** Wave one, the shop is closed and the demo starts: the table's own display (clock, card reader, shelf-talker) calls the night to order
- **mood:** bright, driving, wry
- **bpm:** 138 (asked) / 134 (measured, folded into 70-140)
- **key:** E minor (asked) / E minor (estimated)
- **seed:** 3950110
- **model:** ACE-Step 1.5, acestep-v15-turbo, 8 steps, guidance 7.0, shift 3.0, LM acestep-5Hz-lm-1.7B
- **tier:** fast   **gate profile:** mellow   **duration:** 165 s rendered, 158.7 s installed (one-shot, nothing baked)
- **date:** 2026-10-26
- **render time:** 26.1 s per seed, model load 24.6 s
- **licence:** generated locally from a text prompt, no samples or reference audio, no third-party rights claimed
- project: greytide
- **album:** Greytide, track 1
- **submitter:** the radio, for greytide
- **tags:** table:gamestore, pov:the display
- **loop:** no, a one-shot
- **length:** 7000442 samples at 44.1 kHz (158.74 s), about 91.3 bars of 4/4 at 138 bpm (the MP3 adds encoder padding; the length is of the PCM)

## Why

You asked for "Wave one, the shop is closed and the demo starts: the table's own display (clock, card reader, shelf-talker) calls the night to order". The words and the style were written for this song by the station's writers and reviewed by the conductor. So I wrote it at 138 bpm in E minor, 165 seconds, with a voice, in words I wrote myself, under the mellow gates. It has no beat to hold, so 138 bpm is only the grid I gave the model and the tempo gate is not applied. It is a one-shot: nothing is baked and the ending is the model's own. I rendered 2 seeds and threw away 1: 3950111 (harsh: 3.9% above 6 kHz (ceiling 2.5) and others). Seed 3950110 is the take, but it did not clear every gate: harsh: 3.1% above 6 kHz (ceiling 2.5).

## Prompt

> Driving new-wave synth-pop at 138 bpm in E minor, a late-night shop-floor band: a tight lean bass guitar on eighths with the bass well under the mids, a motorik kit with a dry rimshot that clacks like dice on felt, a staccato synth arpeggio as the countdown, a bright counter-bell ping on each chorus downbeat, a warm pad under it; a crisp, wry female lead with a deadpan male shout on the countdown lines; starts mid, a long high plateau, a dip to bass and bell in the bridge, a lifted final chorus, still in E minor, no harsh highs

## Lyrics (original, written for this track by the project; the model was given only these words)

```
[Intro - arpeggio and the counter bell]
Sixty dots around the clock.
Here we go.

[Verse 1]
Shutter halfway down, the till is counting low
A flock mat on the navy felt, four tiles in a row
Ruined chapel, crater, hills and a zigzag road
Painted ones are on their pegs, waiting to be told
A kit box tipped on its side, the grey come climbing through
Sprue still on their ankles and no idea what to do
The shelf-talker clears its throat in hand-drawn capitals
Tonight's demo: hold the line, whatever falls

[Pre-Chorus]
Ring the bell, ring the bell, the counter calls the time
(Sixty dots around the clock and every one is mine)

[Chorus]
Demo ends in sixty, hold the board
Every dot's a heartbeat on the shop floor
Grey on the green and the painted on the hill
Demo ends in sixty, hold it still

[Verse 2]
The reader says TOTAL three of twelve, and beeps
One gets through, it flashes red, CARD DECLINED, it weeps
A stamp punched out of the loyalty card by the tray
Twenty little circles and we gave one away
The ballista on the plateau has a bolt for every seam
The cannon on the chapel wall is louder than it seems
And somewhere in the shuffle is a road we never knew
The board was not this shape last night, and neither were you

[Pre-Chorus]
Ring the bell, ring the bell, the counter calls the time
(Sixty dots around the clock and every one is mine)

[Chorus]
Demo ends in sixty, hold the board
Every dot's a heartbeat on the shop floor
Grey on the green and the painted on the hill
Demo ends in sixty, hold it still

[Bridge - bass and bell only, then the kit builds back]
Nobody's in the shop but the dice and us
Nobody is watching, so it matters most
Three centimetres tall and the felt goes on for miles
Ring it, ring it, ring it

[Final Chorus - lifted, the whole band and a gang shout]
Demo ends in sixty, hold the board
Every dot's a heartbeat on the shop floor
Grey on the green and the painted on the hill
Demo ends in sixty, hold it still

[Outro - the arpeggio slows to the last few dots]
Ten. Nine. Hold it still.
```

## Request filter

stripped: nothing

## Rejected seeds

- 3950111: harsh: 3.9% above 6 kHz (ceiling 2.5); 30 of 291 heard words are not ours (10 %; limit 10 %, at least 40 heard): dollars or o'clock shut her flop brewing rope heads kickbox great compression

## Measured (the kept take, after the 60 Hz high-pass, before the loudness gain unless noted)

| gate | measured | limit | passed |
|---|---|---|---|
| tempo | 134 bpm vs asked 138 | not applied: no beat was asked for | yes |
| loudness | -16.0 LUFS installed (decoded MP3 -16.4); candidate was -14.8, gain -1.2 dB | -16 LUFS within 1 dB | yes |
| peak after encode | -3.07 dBFS decoded (pre-encode -3.49) | under -1 dBFS | yes |
| silence | longest 0.25 s under -50 dBFS | under 0.5 s (mellow) | yes |
| brightness | 3.08 % of power above 6 kHz | under 2.5 % (mellow) | **NO** |
| boominess | 6.89 % below 60 Hz (raw render 16.6 %) | under 12 % | yes |
| onset rate | 3.98 per second | 0.3 to 4.5 | yes |
| loop seam | step 0.02x, tail-head -60.3 dB | not applied: a one-shot, not a loop | yes |

## Words (Demucs voice stem, Whisper large-v3-turbo)

heard: 60 gods of the clock. Here we go. Should her halfway down? | The till is counting low. A flock mat on the Navy felt, four tiles in a row. A ruined chapel crater, hills and a zigzag road. Painted ones are on their backs, waiting to be told. A kickbox slipped on its side. | Great come climbing through Spruce still on their ankles No idea what to do The shell top who clears his throat In hand-drawn capitals Tonight's demo, hold the line Whatever falls Ring the bell, ring the bell | The counter calls the time. Sixty dots around the clock and everyone is lying. Demo ends in sixty, hold the board. Hippie dots, a heartbeat on the shop floor. Rain on the green and the painted on the | The reader says, Chojo, three of twelve. One gets through, it flashes red card, declined, but leaps are still. | Punched out of the loyalty car by the train 20 little circles and we gave one away The belly still on the plateau has a bolt for every seam The cannon on the chapel wall is louder than it seems And somewhere in the | The shuffle is a road we never knew The board was not the shape last night And neither were you Ring the bell, ring the bell The counter calls the time Sixty dots around the clock And everyone is mine Demo ends in sixty | Hold it still. | Nobody's in the shop but the dice and us Nobody is watching so it matters most Three centimeters tall and the felt goes on for miles Bring it, bring it, bring it | Demo ends in 60, hold the board. Every dot's a heartbeat on the shop floor. Ray on the green and the painted on the hill. Demo ends in 60, hold it still. | Ten, nine, hold still.

304 words heard, 27 not in our lyrics: gods should her backs kickbox slipped great spruce shell top who his everyone lying hippie rain chojo leaps car train belly everyone centimeters bring bring bring ray (limit 10 % of the words heard, at least 40 heard)

## Heard by a model, not a person

Not listened to: listening is off, or there is no GEMINI_API_KEY in the environment. Nobody on the machine can hear.

## Checks

kept despite failing: harsh: 3.1% above 6 kHz (ceiling 2.5)
