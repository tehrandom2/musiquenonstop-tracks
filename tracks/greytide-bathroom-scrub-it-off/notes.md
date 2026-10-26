# Scrub It Off

- **slug:** greytide-bathroom-scrub-it-off
- **idea:** The loofah, painted up as a captain, does none of the killing: it scrubs the borrowed armour and the bits-box shields off the grey so every other tower's hits count.
- **mood:** rowdy, salty, good-humoured
- **bpm:** 138 (asked) / 136 (measured, folded into 70-140)
- **key:** E minor (asked) / D major (estimated)
- **seed:** 3940800
- **model:** ACE-Step 1.5, acestep-v15-turbo, 8 steps, guidance 7.0, shift 3.0, LM acestep-5Hz-lm-1.7B
- **tier:** fast   **gate profile:** mellow   **duration:** 160 s rendered, 152.1 s installed (one-shot, nothing baked)
- **date:** 2026-10-26
- **render time:** 23.4 s per seed, model load 24.6 s
- **licence:** generated locally from a text prompt, no samples or reference audio, no third-party rights claimed
- project: greytide
- **album:** Greytide, track 8
- **submitter:** the radio, for greytide
- **tags:** table:bathroom, pov:the loofah
- **loop:** no, a one-shot
- **length:** 6707599 samples at 44.1 kHz (152.10 s), about 87.5 bars of 4/4 at 138 bpm (the MP3 adds encoder padding; the length is of the PCM)

## Why

You asked for "The loofah, painted up as a captain, does none of the killing: it scrubs the borrowed armour and the bits-box shields off the grey so every other tower's hits count.". The words and the style were written for this song by the station's writers and reviewed by the conductor. So I wrote it at 138 bpm in E minor, 160 seconds, with a voice, in words I wrote myself, under the mellow gates. It has no beat to hold, so 138 bpm is only the grid I gave the model and the tempo gate is not applied. It is a one-shot: nothing is baked and the ending is the model's own. I rendered 2 seeds and threw away 1: 3940801 (3.2s of near-silence (limit 0.5)). Seed 3940800 is the take, but it did not clear every gate: 1.7s of near-silence (limit 0.5).

## Prompt

> Folk-rock sea shanty, 138 bpm, E minor. The band: a stomping kick and handclaps, a driving acoustic guitar strum, a squeezebox playing the tune, a sawing fiddle answering each line, a lean electric bass under the mids. A salty, gravelly male lead and a rowdy gang chorus in call and response. Mood: rowdy, salty, good-humoured. Arc: stomp and claps alone, the band in at verse one, a full shanty chorus, a breakdown of stomp and gang call and response, the final chorus lifted with the gang and fiddle. E minor throughout, no harsh highs.

## Lyrics (original, written for this track by the project; the model was given only these words)

```
[Intro: stomp and claps]

[Verse 1]
I'm rough as a road and I'm proud of the grain
I've scrubbed every back in the house, again and again
now I'm painted a captain, a stripe and a cap
and the grey come marching with their armour strapped
a shield from the bits box, a helmet from a kit
from a war they never fought in, and it doesn't even fit

[Pre-Chorus]
Heave, and scrub, and heave

[Chorus]
Scrub it off, scrub it down
borrowed armour on the ground
scrub it off, scrub it down
every hit will count now

[Verse 2]
I don't do the damage and I don't take the kill
I take away the excuses and the others do the drill
there's a dude with a head from a different army's box
he's coping, I respect it, but I scrub him to his socks
the steam's rolling over and the floor's gone slick
and a grey with no armour is a grey that goes quick

[Pre-Chorus]
Heave, and scrub, and heave

[Chorus]
Scrub it off, scrub it down
borrowed armour on the ground
scrub it off, scrub it down
every hit will count now

[Breakdown: stomp and gang call and response]
Who's got a shield? (Not for long!)
Who's got a helmet? (Not for long!)
Who's got a breastplate? (Not for long!)
Who's still grey? (All night long!)

[Final Chorus: lifted, gang and fiddle]
Scrub it off, scrub it down
borrowed armour on the ground
scrub it off, scrub it down
every hit will count now

[Outro: stomp alone]
Count now.
```

## Request filter

stripped: nothing

## Rejected seeds

- 3940801: 3.2s of near-silence (limit 0.5)

## Measured (the kept take, after the 60 Hz high-pass, before the loudness gain unless noted)

| gate | measured | limit | passed |
|---|---|---|---|
| tempo | 136 bpm vs asked 138 | not applied: no beat was asked for | yes |
| loudness | -16.0 LUFS installed (decoded MP3 -16.4); candidate was -15.9, gain -0.1 dB | -16 LUFS within 1 dB | yes |
| peak after encode | -2.87 dBFS decoded (pre-encode -3.27) | under -1 dBFS | yes |
| silence | longest 1.70 s under -50 dBFS | under 0.5 s (mellow) | **NO** |
| brightness | 2.04 % of power above 6 kHz | under 2.5 % (mellow) | yes |
| boominess | 5.00 % below 60 Hz (raw render 16.2 %) | under 12 % | yes |
| onset rate | 2.70 per second | 0.3 to 4.5 | yes |
| loop seam | step 0.05x, tail-head -70.9 dB | not applied: a one-shot, not a loop | yes |

## Words (Demucs voice stem, Whisper large-v3-turbo)

heard: I'm rough as I rode and I'm proud of the grain I scrubbed every back in the house again and again | Now I'm painted a captain, a stripe and a cap, and the great come marching with their armor strapped. A shield from the bits, box a helmet from the kit, from a war they never fought in and it doesn't even fit. | Scrub it all, scrub it down. Borrowed armor on the ground. Scrub it all, scrub it down. | I take away excuses and the | The others do that drill, there's a dude with a head from a different on his box. He's coping, I respect it, but I scrub into his socks. The steam's rolling over and the floor's gone slick. And a grey with no armor is a grey that goes crazy. | And scrub and he scrub it up scrub it down Borrow armor on the ground scrub it up | scrub it down every hit will count now now who's got a shield not for long who's got a | Not for long. Who's got a breastplate? Not for long. Who's still brave? All night long. Scrub it off. Scrub it down. | Borrowed armor on the ground Scrub it up, scrub it down Every hit will count | Now! Count now! | Thank you.

214 words heard, 17 not in our lyrics: rode great armor armor into armor crazy he up borrow armor up brave armor up thank you (limit 10 % of the words heard, at least 40 heard)

## Heard by a model, not a person

Not listened to: listening is off, or there is no GEMINI_API_KEY in the environment. Nobody on the machine can hear.

## Checks

kept despite failing: 1.7s of near-silence (limit 0.5)
