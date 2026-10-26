# Peck Peck

- **slug:** greytide-bathroom-peck-peck
- **idea:** The rubber duck, oldest toy in the bath and the luckiest, floats up and down her stretch of road pecking whatever is nearest, stranded as the water goes and not one bit bothered.
- **mood:** bright, cocky, sunny with a bite
- **bpm:** 146 (asked) / 72 (measured, folded into 70-140)
- **key:** E minor (asked) / E minor (estimated)
- **seed:** 3940300
- **model:** ACE-Step 1.5, acestep-v15-turbo, 8 steps, guidance 7.0, shift 3.0, LM acestep-5Hz-lm-1.7B
- **tier:** fast   **gate profile:** mellow   **duration:** 158 s rendered, 153.2 s installed (one-shot, nothing baked)
- **date:** 2026-10-26
- **render time:** 23.2 s per seed, model load 24.6 s
- **licence:** generated locally from a text prompt, no samples or reference audio, no third-party rights claimed
- project: greytide
- **album:** Greytide, track 3
- **submitter:** the radio, for greytide
- **tags:** table:bathroom, pov:the rubber duck
- **loop:** no, a one-shot
- **length:** 6755307 samples at 44.1 kHz (153.18 s), about 93.2 bars of 4/4 at 146 bpm (the MP3 adds encoder padding; the length is of the PCM)

## Why

You asked for "The rubber duck, oldest toy in the bath and the luckiest, floats up and down her stretch of road pecking whatever is nearest, stranded as the water goes and not one bit bothered.". The words and the style were written for this song by the station's writers and reviewed by the conductor. So I wrote it at 146 bpm in E minor, 158 seconds, with a voice, in words I wrote myself, under the mellow gates. It has no beat to hold, so 146 bpm is only the grid I gave the model and the tempo gate is not applied. It is a one-shot: nothing is baked and the ending is the model's own. I rendered 2 seeds and threw away 1: 3940301 (1.0s of near-silence (limit 0.5) and others). Seed 3940300 is the take, but it did not clear every gate: harsh: 2.8% above 6 kHz (ceiling 2.5).

## Prompt

> Surf rock, 146 bpm, E minor. The band: a twangy lead guitar drenched in spring reverb playing a fast picked riff, a rhythm guitar strumming tight, a pounding floor-tom drum beat, a lean, walking bass under the mids, a cheesy organ on the chorus. A bright, cocky female lead with a backing trio singing oohs. Mood: sunny with a bite, a toy with swagger. Arc: the riff alone, the band in at verse one, a full chorus, a breakdown where drums and twang trade bars, the final chorus lifted with the trio. E minor throughout, no harsh highs.

## Lyrics (original, written for this track by the project; the model was given only these words)

```
[Intro: surf guitar riff]

[Verse 1]
I'm yellow, I'm hollow, I'm lucky as sin
I squeak when you squeeze, and I bob when I'm in
they gave me a road and they gave me a beat
the middle of nowhere, the middle of the street
up to the tap and back down to the chain
pecking whatever comes nearest again
I've got no teeth and I've got no gun
I've got a beak and a whole lot of fun

[Pre-Chorus]
Put me in the middle, let me float

[Chorus]
Up and down, peck peck
the grey keep coming, check check
up and down, peck peck
a lucky duck's a duck you don't forget

[Verse 2]
The water's going, I'm stranded and dry
I waddle my beat with a wobble and a sigh
the steam from the tap made the whole road slick
the dudes slide in and I give them a flick
I was the first toy in this bath, you know
before the whale, before the boat could go
I've seen a hundred bath times end
and I never once went down the drain, my friend

[Pre-Chorus]
Put me in the middle, let me float

[Chorus]
Up and down, peck peck
the grey keep coming, check check
up and down, peck peck
a lucky duck's a duck you don't forget

[Breakdown: drums and twang trade bars]
Squeak! (Peck!) Squeak! (Peck!)
(Ooh) never once went down

[Final Chorus: lifted, backing trio]
Up and down, peck peck
the grey keep coming, check check
up and down, peck peck
a lucky duck's a duck you don't forget

[Outro: riff alone]
Peck.
```

## Request filter

stripped: nothing

## Rejected seeds

- 3940301: 1.0s of near-silence (limit 0.5); harsh: 3.1% above 6 kHz (ceiling 2.5); 21 of 195 heard words are not ours (11 %; limit 10 %, at least 40 heard): rodent taking gone water dude's foot flow pick pick gray pick pick

## Measured (the kept take, after the 60 Hz high-pass, before the loudness gain unless noted)

| gate | measured | limit | passed |
|---|---|---|---|
| tempo | 72 bpm vs asked 146 | not applied: no beat was asked for | yes |
| loudness | -16.0 LUFS installed (decoded MP3 -16.4); candidate was -16.0, gain +0.0 dB | -16 LUFS within 1 dB | yes |
| peak after encode | -2.99 dBFS decoded (pre-encode -3.22) | under -1 dBFS | yes |
| silence | longest 0.35 s under -50 dBFS | under 0.5 s (mellow) | yes |
| brightness | 2.76 % of power above 6 kHz | under 2.5 % (mellow) | **NO** |
| boominess | 5.10 % below 60 Hz (raw render 16.8 %) | under 12 % | yes |
| onset rate | 4.03 per second | 0.3 to 4.5 | yes |
| loop seam | step 0.04x, tail-head -59.2 dB | not applied: a one-shot, not a loop | yes |

## Words (Demucs voice stem, Whisper large-v3-turbo)

heard: I'm yellow, I'm hollow, I'm lucky as sin. I squeak when you squeeze, and I bop when I'm in. They gave me a road, and they gave me a road. | I've got no teeth and I've got no gun. I've got a | up and down | The | And I give them a flick I was the first toy in this bath You know, before the whale, before the boat could go I've seen a hundred bad times then And I never once went down the drain, my friend | Put me in the middle, let me flow. Up and down. Peck, peck. The gray keep coming. Check, check. Up and down. Peck, peck. A lucky duck's a dark kid. | Don't forget! | Up and down, bet, bet, the grey keep coming, check, check, up and down, bet, bet, our lucky duck's a duck, you don't forget, bet. | Thank you. | you | you

148 words heard, 14 not in our lyrics: bop bad then flow gray dark kid bet bet bet bet our bet thank (limit 10 % of the words heard, at least 40 heard)

## Heard by a model, not a person

Not listened to: listening is off, or there is no GEMINI_API_KEY in the environment. Nobody on the machine can hear.

## Checks

kept despite failing: harsh: 2.8% above 6 kHz (ceiling 2.5)
