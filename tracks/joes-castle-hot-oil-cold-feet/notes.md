# Hot Oil, Cold Feet

- **slug:** joes-castle-hot-oil-cold-feet
- **idea:** the horde's point of view: the oil pot pours a burning patch and the murder hole scalds the gate queue, but they keep coming for the colour in the keep
- **mood:** dark, comic, stubborn
- **bpm:** 100 (asked) / 98 (measured, folded into 70-140)
- **key:** G minor (asked) / F major (estimated)
- **seed:** 3380401
- **model:** ACE-Step 1.5, acestep-v15-turbo, 8 steps, guidance 7.0, shift 3.0, LM acestep-5Hz-lm-1.7B
- **tier:** fast   **gate profile:** mellow   **duration:** 165 s rendered, 162.1 s installed (one-shot, nothing baked)
- **date:** 2026-10-26
- **render time:** 24.1 s per seed, model load 23.2 s
- **licence:** generated locally from a text prompt, no samples or reference audio, no third-party rights claimed
- project: joes-castle
- **loop:** no, a one-shot
- **length:** 7150356 samples at 44.1 kHz (162.14 s), about 67.6 bars of 4/4 at 100 bpm (the MP3 adds encoder padding; the length is of the PCM)

## Why

You asked for "the horde's point of view: the oil pot pours a burning patch and the murder hole scalds the gate queue, but they keep coming for the colour in the keep". The words and the style were written for this song by the station's writers and reviewed by the conductor. So I wrote it at 100 bpm in G minor, 165 seconds, with a voice, in words I wrote myself, under the mellow gates. It has no beat to hold, so 100 bpm is only the grid I gave the model and the tempo gate is not applied. It is a one-shot: nothing is baked and the ending is the model's own. I rendered 2 seeds and threw away 1: 3380400 (1.7s of near-silence (limit 0.5) and others). Seed 3380401 is the take, but it did not clear every gate: harsh: 3.3% above 6 kHz (ceiling 2.5).

## Prompt

> dark comic swamp blues at 100 bpm in G minor, a heavy foot stomp and hand clap on every beat, a gritty slide guitar howling the answers, a dirty rhythm guitar chugging, tight lean bass under the mids, brushed snare, a low hummed crowd; a gravelly male lead singing as a grey foot soldier, wincing and grinning, a rough gang of soldiers shouting the call and response; warm saturation in the mids, no harsh highs; drops to stomp alone in the bridge, the last chorus bigger, G minor

## Lyrics (original, written for this track by the project; the model was given only these words)

```
[Intro: a heavy stomp, slide guitar, a grey crowd humming low]

[Verse 1]
We come up the bank in the morning grey
Unpainted plastic on a pole
A mould line right down the middle of my face
And a hole where the colour should go
Somebody up there's got a black iron pot
On a frame of little red bricks
It don't aim and it don't care who you are
It just waits for your feet, and it tips

[Pre-Chorus]
Three and a half between the pours
Three seconds burning on the road
You could count it if you were clever
But the grey ain't clever, so

[Chorus]
Hot oil! (Hot oil!) Cold feet! (Cold feet!)
A burning patch across the street
Nobody likes it, nobody stops
There's red and gold inside the keep
Hot oil! (Hot oil!) Cold feet!

[Verse 2]
I got froze at the bridge on the second wave
Stood like a statue in the cold
When I thawed, they couldn't freeze me again
For four seconds, so I'm told
Four seconds where nothing can hold me
Four seconds of feeling brave
Then I stepped in a puddle that was on fire
And that's four seconds I didn't save

[Chorus]
Hot oil! (Hot oil!) Cold feet! (Cold feet!)
A burning patch across the street
Nobody likes it, nobody stops
There's red and gold inside the keep
Hot oil! (Hot oil!) Cold feet!

[Bridge: down to the stomp and the hum, the murder hole]
Then there's the gate, the two-hex gate
Where no tower can see you at all
Dark in there, quiet in there
Safe in there, that's what they call it
Till you hear a hiss from the hole in the roof
And the queue don't move, not an inch
And the patch in the passage burns longer
And the grey just stand there and flinch

[Final Chorus: the whole horde, louder, the slide howls]
Hot oil! (Hot oil!) Cold feet! (Cold feet!)
A burning patch across the street
Nobody likes it, nobody stops
There's red and gold inside the keep
Hot oil! (Hot oil!) Cold feet! (Cold feet!)
We're grey to the bone and we're dead on our feet
But somebody painted that keep so sweet
Hot oil! (Hot oil!) Cold feet!

[Outro: slide guitar alone, a hiss, the crowd still shuffling]
Is it colour yet?
(Not yet)
```

## Request filter

stripped: nothing

## Rejected seeds

- 3380400: 1.7s of near-silence (limit 0.5); harsh: 3.1% above 6 kHz (ceiling 2.5)

## Measured (the kept take, after the 60 Hz high-pass, before the loudness gain unless noted)

| gate | measured | limit | passed |
|---|---|---|---|
| tempo | 98 bpm vs asked 100 | not applied: no beat was asked for | yes |
| loudness | -16.0 LUFS installed (decoded MP3 -16.4); candidate was -16.1, gain +0.1 dB | -16 LUFS within 1 dB | yes |
| peak after encode | -2.45 dBFS decoded (pre-encode -3.14) | under -1 dBFS | yes |
| silence | longest 0.45 s under -50 dBFS | under 0.5 s (mellow) | yes |
| brightness | 3.29 % of power above 6 kHz | under 2.5 % (mellow) | **NO** |
| boominess | 5.22 % below 60 Hz (raw render 19.3 %) | under 12 % | yes |
| onset rate | 2.88 per second | 0.3 to 4.5 | yes |
| loop seam | step 0.03x, tail-head -49.1 dB | not applied: a one-shot, not a loop | yes |

## Words (Demucs voice stem, Whisper large-v3-turbo)

heard: Oh | We come up the bank in the morning gray, unpainted plastic on a pole. A mold line right down the middle of my face and a hole where the color should go. Somebody up this guy. | It's got a black iron pot on a frame of little red bricks. It don't aim and it don't care who you are. It just waits for your feet. And it tips three and a half between the pores. Three seconds burning on the road. You could count it if you were clever. | But the gray ain't clever, so hot oil, hot oil, cold feet, cold feet, a burning patch across the street. Nobody likes it, nobody stops, there's red and gold inside the key, hot oil. | I got foes at the bridge on the second wave stood like a statue in the cold when I thought they couldn't freeze me again for four seconds so I'm told four seconds when nothing can hold | Hold me. Four seconds of feeling brave. Then I stepped in a puddle that was on fire. And that's four seconds I didn't see. Hot oil. Hot oil. Cold feet. Cold feet. A burning patch across the street. Nobody likes it. | Nobody stops this red and gold inside the key Hot oil, hot oil, old feet Now to the stomp and the hump, the murder hole Then there's the gate, the two hex gate | Where no tower can see you at all Dark in there, quiet in there, safe in there, that's what they call it Till you hear a hiss from the hole in the roof and the queue don't move Not an itch And the patch in the passage burns longer | And the Grey just stand there and flinch. The whole horde, out of the slide house. Hot oil, hot oil. Go feed, go feed. A burning patch across the street. Nobody likes it, nobody stops, there's red and gold. | Oh | Is it color yet?

328 words heard, 29 not in our lyrics: oh gray mold color this guy it's pores gray key foes thought this key old now stomp hump murder itch whole horde out slide house feed feed oh color (limit 10 % of the words heard, at least 40 heard)

## Heard by a model, not a person

Not listened to: listening is off, or there is no GEMINI_API_KEY in the environment. Nobody on the machine can hear.

## Checks

kept despite failing: harsh: 3.3% above 6 kHz (ceiling 2.5)
