# Staff Pick (Best One. Honest.)

- **slug:** greytide-gamestore-staff-pick-honest
- **idea:** Wave five, a staff hand stands a STAFF PICK card beside the Mage; half price, pinned in place, chosen for the first time and secretly thrilled
- **mood:** smooth, bashful, proud
- **bpm:** 124 (asked) / 124 (measured, folded into 70-140)
- **key:** F minor (asked) / F major (estimated)
- **seed:** 3950600
- **model:** ACE-Step 1.5, acestep-v15-turbo, 8 steps, guidance 7.0, shift 3.0, LM acestep-5Hz-lm-1.7B
- **tier:** fast   **gate profile:** mellow   **duration:** 160 s rendered, 137.6 s installed (one-shot, nothing baked)
- **date:** 2026-10-26
- **render time:** 23.3 s per seed, model load 24.6 s
- **licence:** generated locally from a text prompt, no samples or reference audio, no third-party rights claimed
- project: greytide
- **album:** Greytide, track 6
- **submitter:** the radio, for greytide
- **tags:** table:gamestore, pov:the-mage
- **loop:** no, a one-shot
- **length:** 6067332 samples at 44.1 kHz (137.58 s), about 71.1 bars of 4/4 at 124 bpm (the MP3 adds encoder padding; the length is of the PCM)

## Why

You asked for "Wave five, a staff hand stands a STAFF PICK card beside the Mage; half price, pinned in place, chosen for the first time and secretly thrilled". The words and the style were written for this song by the station's writers and reviewed by the conductor. So I wrote it at 124 bpm in F minor, 160 seconds, with a voice, in words I wrote myself, under the mellow gates. It has no beat to hold, so 124 bpm is only the grid I gave the model and the tempo gate is not applied. It is a one-shot: nothing is baked and the ending is the model's own. I rendered 2 seeds and threw away 1: 3950601 (0.9s of near-silence (limit 0.5) and others). Seed 3950600 is the take, but it did not clear every gate: 0.8s of near-silence (limit 0.5); harsh: 3.2% above 6 kHz (ceiling 2.5).

## Prompt

> Sleek disco-funk at 124 bpm in F minor, a polished shop-floor soul band: a tight syncopated bass guitar, lean, bass well under the mids, a crisp four-on-the-floor kit with open hats, a scratchy rhythm guitar on sixteenths, a string section stabbing the hook, an electric piano filling the gaps; a smooth, slightly embarrassed male falsetto lead with a confident female backing trio answering; mid start, high plateau, a bass-and-claps breakdown, a lifted final chorus, F minor, no harsh highs

## Lyrics (original, written for this track by the project; the model was given only these words)

```
[Intro - strings and guitar]
Ask me.

[Verse 1]
A staff hand came down into the tray at wave five
Put a little card beside me, standing up like it's alive
It says STAFF PICK in marker, BEST ONE, underlined
Then HONEST, in brackets, like they'd almost changed their mind
I'm the Mage, I'm blue and gold, my robes are dry-brushed bright
I have never been anybody's favourite in the light

[Pre-Chorus]
They're pointing at me, pointing at me
(Half price, half price)

[Chorus]
Staff pick, best one, honest
Pin me where you put me down
Staff pick, best one, honest
I'm the only one in town

[Verse 2]
The catch is that I cost you half and I can't move
Not till the next wave comes, I'm pinned into the groove
So put me where it matters, put me on the bend
I'll hold the crossroads like I'm owed it in the end
The other towers look at me and cough a little bit
I'm wearing someone's handwriting, and I'm wearing it

[Pre-Chorus]
They're pointing at me, pointing at me
(Half price, half price)

[Chorus]
Staff pick, best one, honest
Pin me where you put me down
Staff pick, best one, honest
I'm the only one in town

[Breakdown - bass and claps]
Somebody chose me
Somebody chose me
Not for the paint job, for the work
Somebody chose me

[Final Chorus - lifted, strings soaring]
Staff pick, best one, honest
Pin me where you put me down
Staff pick, best one, honest
I'm the only one in town

[Outro - the falsetto alone]
Ask me. Ask me.
```

## Request filter

stripped: nothing

## Rejected seeds

- 3950601: 0.9s of near-silence (limit 0.5); harsh: 2.5% above 6 kHz (ceiling 2.5); 18 of 136 heard words are not ours (13 %; limit 10 %, at least 40 heard): aspenage aspenage yeah stop this moaning air grace grace step step this

## Measured (the kept take, after the 60 Hz high-pass, before the loudness gain unless noted)

| gate | measured | limit | passed |
|---|---|---|---|
| tempo | 124 bpm vs asked 124 | not applied: no beat was asked for | yes |
| loudness | -16.0 LUFS installed (decoded MP3 -16.4); candidate was -16.9, gain +0.9 dB | -16 LUFS within 1 dB | yes |
| peak after encode | -2.51 dBFS decoded (pre-encode -3.12) | under -1 dBFS | yes |
| silence | longest 0.80 s under -50 dBFS | under 0.5 s (mellow) | **NO** |
| brightness | 3.21 % of power above 6 kHz | under 2.5 % (mellow) | **NO** |
| boominess | 6.28 % below 60 Hz (raw render 16.7 %) | under 12 % | yes |
| onset rate | 3.17 per second | 0.3 to 4.5 | yes |
| loop seam | step 0.00x, tail-head -48.7 dB | not applied: a one-shot, not a loop | yes |

## Words (Demucs voice stem, Whisper large-v3-turbo)

heard: Ask me. | It's alive. It says. Picking marker. Best one underlined. Then harvest in brackets like they'd almost changed their mind. I'm a mage. I'm blue and gold. My robes are dry brushed bright. I had never been anybody's favorite. | Staff the best one. | I'm the only one in town. The catch is that I cost you half and I can't move. Not till the next wave comes. I'm pinned into the groove. So put me where it matters. | Put me on the bend. I hope the crossroads like I'm old in the end. The other towers look at me and cough a little bit. I'm wearing someone's handwriting and I'm wearing it. They're pointing at me. | I'm the only one | Somebody chose me. Somebody chose me. Not for the paint job. Somebody chose me. | me | Stop for the page I'm the only one | I need to

147 words heard, 10 not in our lyrics: picking harvest had favorite hope old stop page need to (limit 10 % of the words heard, at least 40 heard)

## Heard by a model, not a person

Not listened to: listening is off, or there is no GEMINI_API_KEY in the environment. Nobody on the machine can hear.

## Checks

kept despite failing: 0.8s of near-silence (limit 0.5); harsh: 3.2% above 6 kHz (ceiling 2.5)
