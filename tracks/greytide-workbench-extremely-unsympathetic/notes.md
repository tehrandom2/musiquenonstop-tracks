# Extremely Unsympathetic

- **slug:** greytide-workbench-extremely-unsympathetic
- **idea:** The Vice Admiral, a pompous clamp of a tower, leads his crew in a work song about gripping one grey dude and cranking all the way to the crush
- **mood:** pompous, stomping, funny
- **bpm:** 128 (asked) / 127 (measured, folded into 70-140)
- **key:** D minor (asked) / D minor (estimated)
- **seed:** 3960500
- **model:** ACE-Step 1.5, acestep-v15-turbo, 8 steps, guidance 7.0, shift 3.0, LM acestep-5Hz-lm-1.7B
- **tier:** fast   **gate profile:** mellow   **duration:** 155 s rendered, 152.5 s installed (one-shot, nothing baked)
- **date:** 2026-10-26
- **render time:** 22.6 s per seed, model load 24.6 s
- **licence:** generated locally from a text prompt, no samples or reference audio, no third-party rights claimed
- project: greytide
- **album:** Greytide, track 5
- **submitter:** the radio, for greytide
- **tags:** table:workbench, pov:vice-admiral
- **loop:** no, a one-shot
- **length:** 6727099 samples at 44.1 kHz (152.54 s), about 81.4 bars of 4/4 at 128 bpm (the MP3 adds encoder padding; the length is of the PCM)

## Why

You asked for "The Vice Admiral, a pompous clamp of a tower, leads his crew in a work song about gripping one grey dude and cranking all the way to the crush". The words and the style were written for this song by the station's writers and reviewed by the conductor. So I wrote it at 128 bpm in D minor, 155 seconds, with a voice, in words I wrote myself, under the mellow gates. It has no beat to hold, so 128 bpm is only the grid I gave the model and the tempo gate is not applied. It is a one-shot: nothing is baked and the ending is the model's own. I rendered 2 seeds and threw away 1: 3960501 (18 of 159 heard words are not ours (11 %; limit 10 %, at least 40 heard): paul has gray un). Seed 3960500 is the take, but it did not clear every gate: 0.7s of near-silence (limit 0.5); harsh: 3.1% above 6 kHz (ceiling 2.5).

## Prompt

> Stomping industrial sea-shanty at 128 bpm in D minor, a dockyard crew band: a heavy floor-tom stomp and handclaps, a tight lean bowed-and-plucked bass, bass under the mids, a squeezebox drone, a ratcheting metal percussion on the off-beats like a clamp cranking, a fiddle line between the verses; a booming, pompous male lead and a full roaring crew chorus; starts mid, a long rolling plateau, a slow cranked bridge, a lifted final chorus, D minor, no harsh highs

## Lyrics (original, written for this track by the project; the model was given only these words)

```
[Intro - stomp and squeezebox]
All hands. One enemy.

[Verse 1]
I'm the Vice Admiral and I command a single fight
I pick one grey and grip him and I crank him through the night
He walks along the belt, I walk along with him
I tighten every footstep and the outlook's growing grim
I do not care for armour and I do not care for tears
I've been clamping things on workbenches for years

[Pre-Chorus]
Crank it, crank it
(Turn, turn, turn)

[Chorus]
Extremely unsympathetic
Heave and crank and squeeze
Extremely unsympathetic
One more turn, if you please

[Verse 2]
The big vice on the bench, he's my old commanding officer
He takes a crowd, I take a single soul, a little softer
No, that's a lie, I'm not, there's nothing soft in me
I hold him till the end and then I crush him, one, two, three
The painter gave me gold on every button of my coat
I've never had a ship, but I've a very steady throat

[Pre-Chorus]
Crank it, crank it
(Turn, turn, turn)

[Chorus]
Extremely unsympathetic
Heave and crank and squeeze
Extremely unsympathetic
One more turn, if you please

[Bridge - slow, every word a turn of the screw]
One turn for the shield he brought
One turn for the sprue
One turn for the road he walked
And one turn just for you

[Final Chorus - lifted, the whole crew roaring]
Extremely unsympathetic
Heave and crank and squeeze
Extremely unsympathetic
One more turn, if you please

[Outro]
Dismissed.
```

## Request filter

stripped: The Vice Admiral

## Rejected seeds

- 3960501: 18 of 159 heard words are not ours (11 %; limit 10 %, at least 40 heard): paul has gray unfair even i'll until cry time screw unseen even

## Measured (the kept take, after the 60 Hz high-pass, before the loudness gain unless noted)

| gate | measured | limit | passed |
|---|---|---|---|
| tempo | 127 bpm vs asked 128 | not applied: no beat was asked for | yes |
| loudness | -16.0 LUFS installed (decoded MP3 -16.4); candidate was -15.1, gain -0.9 dB | -16 LUFS within 1 dB | yes |
| peak after encode | -2.81 dBFS decoded (pre-encode -3.28) | under -1 dBFS | yes |
| silence | longest 0.70 s under -50 dBFS | under 0.5 s (mellow) | **NO** |
| brightness | 3.13 % of power above 6 kHz | under 2.5 % (mellow) | **NO** |
| boominess | 8.67 % below 60 Hz (raw render 21.9 %) | under 12 % | yes |
| onset rate | 2.65 per second | 0.3 to 4.5 | yes |
| loop seam | step 0.01x, tail-head -67.2 dB | not applied: a one-shot, not a loop | yes |

## Words (Demucs voice stem, Whisper large-v3-turbo)

heard: Oh, hence one at me. Ah. | Okay. | I do not care for armor and I do not care for tears I've been clamping things on work benches for years Crank it, crank it, crank it Turn, turn, turn Extremely unsympathetic | Heave and crank and squeeze, extremely high unsympathetic. One more turn, if you please. The | Big Vice on the bench, he's my old commanding officer. He takes a crowd, I take a single soul, a little softer. No, that's a lie, I'm not. There's nothing soft in me. I hold until the end and then I crush him, one, two, three. The | The painter gave me gold on every button of my coat I've never had a ship but I've a very steady throat Cricket, I'm kit Turn, turn, turn Extremely un-y unsympathetic | He even crank and squeeze extremely, I'm sympathetic. One more turn, if you please. One, two. | One turn for the shield he brought. One turn for the sprue. One turn. | for the road he walked. Turn just for you. Extremely | Unsympathetic. Heave and crank and squeeze. Extremely Unsympathetic. One more turn, if you please. | Is Miss.

190 words heard, 18 not in our lyrics: oh hence at ah okay armor work benches high until cricket kit un y even sympathetic is miss (limit 10 % of the words heard, at least 40 heard)

## Heard by a model, not a person

Not listened to: listening is off, or there is no GEMINI_API_KEY in the environment. Nobody on the machine can hear.

## Checks

kept despite failing: 0.7s of near-silence (limit 0.5); harsh: 3.1% above 6 kHz (ceiling 2.5)
