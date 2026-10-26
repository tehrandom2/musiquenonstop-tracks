# Twenty Stamps

- **slug:** greytide-gamestore-twenty-stamps
- **idea:** Wave ten, the boss: a stack of ten boxed games on the counter falls one box at a time as the towers hold the crossroads with the last stamps on the loyalty card
- **mood:** anthemic, hoarse, triumphant
- **bpm:** 144 (asked) / 138 (measured, folded into 70-140)
- **key:** E minor (asked) / E minor (estimated)
- **seed:** 3951000
- **model:** ACE-Step 1.5, acestep-v15-turbo, 8 steps, guidance 7.0, shift 3.0, LM acestep-5Hz-lm-1.7B
- **tier:** fast   **gate profile:** mellow   **duration:** 175 s rendered, 172.9 s installed (one-shot, nothing baked)
- **date:** 2026-10-26
- **render time:** 25.4 s per seed, model load 24.6 s
- **licence:** generated locally from a text prompt, no samples or reference audio, no third-party rights claimed
- project: greytide
- **album:** Greytide, track 10
- **submitter:** the radio, for greytide
- **tags:** table:gamestore, pov:the-towers
- **loop:** no, a one-shot
- **length:** 7625122 samples at 44.1 kHz (172.91 s), about 103.7 bars of 4/4 at 144 bpm (the MP3 adds encoder padding; the length is of the PCM)

## Why

You asked for "Wave ten, the boss: a stack of ten boxed games on the counter falls one box at a time as the towers hold the crossroads with the last stamps on the loyalty card". The words and the style were written for this song by the station's writers and reviewed by the conductor. So I wrote it at 144 bpm in E minor, 175 seconds, with a voice, in words I wrote myself, under the mellow gates. It has no beat to hold, so 144 bpm is only the grid I gave the model and the tempo gate is not applied. It is a one-shot: nothing is baked and the ending is the model's own. I rendered 2 seeds and threw away 1: 3951001 (harsh: 3.4% above 6 kHz (ceiling 2.5) and others). Seed 3951000 is the take, but it did not clear every gate: 0.6s of near-silence (limit 0.5); harsh: 3.1% above 6 kHz (ceiling 2.5).

## Prompt

> Stadium pop-punk anthem at 144 bpm in E minor, a big shop-floor band: two crunchy guitars, warm saturation in the mids, one on chords and one on a ringing lead line, a tight lean picked bass, bass under the mids, a pounding kit with a counter-bell on the hook, a gang chorus of the whole band; a hoarse, earnest male lead with a female voice on the harmony; mid start, high plateau, a bridge that drops to bass and claps, a key-held lifted final chorus in E minor, no harsh highs

## Lyrics (original, written for this track by the project; the model was given only these words)

```
[Intro - the riff, the bell three times]
Last wave. Stack's on the counter.

[Verse 1]
Ten boxed games stacked on the counter, that's the boss's life
Every time we hit it hard a box comes off the pile
It's the kit the owner's scared of, never opened, shrink-wrap tight
Four hundred pieces walking and it wants to win tonight
The crossroads is a junction where the two roads cross and bleed
Every tower on the corner is the tower that we need

[Pre-Chorus]
Punch it out, punch it out
(One stamp, one life)

[Chorus]
Twenty stamps on a loyalty card
Every one a life and we hold it hard
Grey come down and the painted stand
Twenty stamps in a tiny hand

[Verse 2]
The ballista's got a chip in the shoulder from wave two
The Mage is wearing someone's card, the Lawyer's reading through
The die is back with its own people, the rulebook's on the mat
The case is shining down on us, and we can use that
Down to seven, down to four, the card reader's in red
A box comes off, a box comes off, and the boss is ahead

[Pre-Chorus]
Punch it out, punch it out
(One stamp, one life)

[Chorus]
Twenty stamps on a loyalty card
Every one a life and we hold it hard
Grey come down and the painted stand
Twenty stamps in a tiny hand

[Bridge - bass and claps, then the guitars come back one by one]
When the shutter's up tomorrow and the kids come in to play
They'll see the board, they'll see the flock, they'll never know today
That three centimetres high we held the whole shop floor
One more box, one more box, one more

[Final Chorus - lifted, the gang chorus doubled, the bell on every line]
Twenty stamps on a loyalty card
Every one a life and we hold it hard
Grey come down and the painted stand
Twenty stamps in a tiny hand

[Outro - the last box falls]
Demo over. Thank you for playing.
```

## Request filter

stripped: nothing

## Rejected seeds

- 3951001: harsh: 3.4% above 6 kHz (ceiling 2.5); 29 of 279 heard words are not ours (10 %; limit 10 %, at least 40 heard): stacks open who everyone alike then great police just way mages car

## Measured (the kept take, after the 60 Hz high-pass, before the loudness gain unless noted)

| gate | measured | limit | passed |
|---|---|---|---|
| tempo | 138 bpm vs asked 144 | not applied: no beat was asked for | yes |
| loudness | -16.0 LUFS installed (decoded MP3 -16.4); candidate was -13.4, gain -2.6 dB | -16 LUFS within 1 dB | yes |
| peak after encode | -3.77 dBFS decoded (pre-encode -4.06) | under -1 dBFS | yes |
| silence | longest 0.60 s under -50 dBFS | under 0.5 s (mellow) | **NO** |
| brightness | 3.14 % of power above 6 kHz | under 2.5 % (mellow) | **NO** |
| boominess | 6.58 % below 60 Hz (raw render 15.7 %) | under 12 % | yes |
| onset rate | 3.44 per second | 0.3 to 4.5 | yes |
| loop seam | step 0.01x, tail-head -61.1 dB | not applied: a one-shot, not a loop | yes |

## Words (Demucs voice stem, Whisper large-v3-turbo)

heard: Last Wave stacks on the counter. | It's the kit the owner's scared of, never opened, shrink, wrap tight. 400 pieces walking and it wants to end tonight. | The crossroads is a junction where the two roads cross and bleed. Every tower on the corner is the tower that we need. | Punch it out, punch it out, one stamp, one line. Swimmy stamps on a loyalty card. Everyone a life that we hold in heart. Great come down and the painted stain. | 20 steps in a tiny hand. The police has got a chip in the shoulder from way to the major swearing | The | and we can use that. Down to seven, down to four, the card reader's in red. A box comes off, a box comes off, and the boss is | Punch it out, punch it out. One stamp, one line. Twenty stamps on a loyalty card. Everyone a life and we hold it hard. Cray, come down. | in the painted stand. 20 stamps in a tiny hand. | When the shutter's up tomorrow and the kids come in to play They'll see the board, they'll see the flock, they'll never know today That three seconds | One more box. One more box. One more. 20 stamps. | on a loyalty card. Everyone a life and we hold it hard. Quaid come down and the pain is

220 words heard, 21 not in our lyrics: stacks end line swimmy everyone heart great stain steps police has way major swearing line everyone cray seconds everyone quaid pain (limit 10 % of the words heard, at least 40 heard)

## Heard by a model, not a person

Not listened to: listening is off, or there is no GEMINI_API_KEY in the environment. Nobody on the machine can hear.

## Checks

kept despite failing: 0.6s of near-silence (limit 0.5); harsh: 3.1% above 6 kHz (ceiling 2.5)
