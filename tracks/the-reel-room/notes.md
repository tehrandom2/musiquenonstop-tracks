# The Reel Room

- **slug:** the-reel-room
- **idea:** the darkest room: a projector still running, guitars slipping out of tune, wordless voices: a dark cinema with an old film projector whirring, reel flutter and worn-tape warble, nobody in the seats
- **mood:** haunted and tender, a memory playing to an empty room
- **bpm:** 60 (asked) / 120 (measured, folded into 70-140)
- **key:** C minor (asked) / C minor (estimated)
- **seed:** 544771
- **model:** ACE-Step 1.5, acestep-v15-xl-sft, 50 steps, guidance 7.0, shift 1.0, LM acestep-5Hz-lm-4B
- **tier:** best   **gate profile:** ambient   **duration:** 170 s rendered, 170.0 s installed (one-shot, nothing baked)
- **date:** 2026-10-11
- **render time:** 144.8 s per seed, model load 93.1 s
- **licence:** generated locally from a text prompt, no samples or reference audio, no third-party rights claimed
- **album:** interloper ai, track 13
- **submitter:** the machine
- **tags:** detuned guitar, wordless voice, projector, arc:darker
- **loop:** no, a one-shot
- **length:** 7497000 samples at 44.1 kHz (170.00 s), about 42.5 bars of 4/4 at 60 bpm (the MP3 adds encoder padding; the length is of the PCM)

## Why

You asked for "the darkest room: a projector still running, guitars slipping out of tune, wordless voices". The bottom of the album. A plain guitar figure goes out of tune the way old film goes out of focus, and wordless voices come up out of the hum. The projector is my invention, for a world told in slides and reels; it is in the room clause, not the music's history. So I wrote it at 60 bpm in C minor, 170 seconds, with a wordless voice, syllables I invented myself, under the ambient gates. It has no beat to hold, so 60 bpm is only the grid I gave the model and the tempo gate is not applied. I set it to -17 LUFS rather than the station's -16, so it sits quieter beside the rest. It is a one-shot: nothing is baked and the ending is the model's own. I rendered 6 seeds and threw away 4: 544770 (passed, but outranked by the kept takes); 544773 (onset rate 4.4/s outside 0.02-3.5); 544774 (3.7s of near-silence (limit 3.0)); 544769 (boomy: 10.3% below 60 Hz (ceiling 8) and others). Seed 544771 is the take.

## Prompt

> Dark ambient piece, no steady beat, 60 bpm, in C minor, a wordless human voice used as an instrument, open vowels held long and sung low, like a choir of one, no words and no language, with a long echo, a simple clean guitar figure that slowly detunes and dissolves into drone, a dark cinema with an old film projector whirring, reel flutter and worn-tape warble, nobody in the seats, haunted and tender, a memory playing to an empty room, starts simple and familiar, then slowly detunes and fades into dark ambient, the voices rise from inside the drone and fall away, ends on projector hum alone, wordless voices only, no words, no lyrics, no speech, no rap, no drums, no beat, no drops, no stingers, no screaming

## Lyrics (original, written for this track by the project; the model was given only these words)

```
[Chorus - a wordless voice on open vowels, long notes over the whole arrangement, no real words]
neu theu feu yeur rae yei
```

## Request filter

stripped: nothing

## Rejected seeds

- 544770: passed, but outranked by the kept takes
- 544773: onset rate 4.4/s outside 0.02-3.5
- 544774: 3.7s of near-silence (limit 3.0)
- 544769: boomy: 10.3% below 60 Hz (ceiling 8); 5 real English words heard (6 words in all; fails at 5): you new you're right you

## Measured (the kept take, after the 60 Hz high-pass, before the loudness gain unless noted)

| gate | measured | limit | passed |
|---|---|---|---|
| tempo | 120 bpm vs asked 60 | not applied: no beat was asked for | yes |
| loudness | -17.0 LUFS installed (decoded MP3 -17.4); candidate was -16.2, gain -0.8 dB | -17 LUFS within 1 dB | yes |
| peak after encode | -3.65 dBFS decoded (pre-encode -3.38) | under -1 dBFS | yes |
| silence | longest 1.55 s under -50 dBFS | under 3.0 s (ambient) | yes |
| brightness | 0.26 % of power above 6 kHz | under 5.5 % (ambient) | yes |
| boominess | 1.45 % below 60 Hz (raw render 3.9 %) | under 8 % | yes |
| onset rate | 2.18 per second | 0.02 to 3.5 | yes |
| loop seam | step 8.48x, tail-head -55.0 dB | not applied: a one-shot, not a loop | yes |

## Words (Demucs voice stem, Whisper large-v3-turbo; this voice is wordless)

heard: Mmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmm | Ah, ah, ah, ah | Oh, oh, oh, oh, oh, oh, oh, oh, oh, oh, oh, oh, oh, oh, oh, oh, oh, oh, oh, oh, oh, oh, oh, oh, oh, oh, oh, oh, oh, oh, oh, oh, oh, oh, oh, oh, oh, oh, oh, oh, oh, oh, oh, oh, oh, oh, oh, oh, oh, oh, oh, oh, oh, oh, oh, oh, oh, oh, oh, oh, oh, oh, oh, oh, oh, oh, oh, oh, oh, oh, oh, oh, oh, oh, oh, oh, oh, oh, oh, oh, oh, oh, oh, oh, oh, oh, oh, oh, oh, oh, oh, oh, oh, oh, oh, oh, oh, oh, oh, oh, oh, oh, oh, oh, oh, oh, oh, oh, oh, oh, oh, oh, oh, oh, oh, oh, oh, oh, oh, oh, oh, oh, oh, oh, oh, oh, oh, oh, oh, oh, oh, oh, oh, oh, oh, oh, oh, oh, oh, oh, oh, oh, oh, oh, oh, oh, oh, oh, oh, oh, oh, oh, oh, oh, oh, oh, oh, oh, oh, oh, oh, oh, oh, oh, oh, oh, oh, oh, oh, oh, oh, oh, oh, oh, oh, oh, oh, oh, oh, oh, oh, oh, oh, oh, oh, oh, oh, oh, oh, oh, oh, oh, oh, oh, oh, oh, oh, oh, oh, oh, oh, oh, oh, oh, oh, oh, oh, oh, oh, oh, oh, oh, oh, oh, oh, oh, oh, oh, oh, oh, oh, oh, | . | . | Ah, ah, ah, ah | Ah | Hey. | . | . | . | .

233 words heard, 1 of them real English words: hey (the take fails at 5 real words; fewer are recorded here and pass); the stem carries a voice in 48 % of its half-seconds (need 15 %)

## Second take: seed 544772 (the-reel-room-take2.mp3)

-17.0 LUFS, peak -3.95 dBFS decoded, 0.21 % >6 kHz, 0.76 % <60 Hz, 2.15 onsets/s, seam 12.17x / -40.9 dB, checks: all passed
words: 1 of 3 heard are not ours: so

## Heard by a model, not a person

Nobody on the machine can hear. gemini-3.1-pro-preview listened to seed 544771 and answered the questions below; this is a check, not the owner's ears.

> A dark ambient track with no steady beat, featuring wordless vocals and a drone. The vocals are sustained and atmospheric, with a slightly detuned quality.

| question | answer | what it heard |
|---|---|---|
| Does it match this frame: "Dark ambient piece, no steady beat", with no steady beat? | yes | It is a dark ambient piece with no steady beat. |
| Is the lead what was asked for: "a simple clean guitar figure that slowly detunes and dissolves into drone"? | partly | There is no guitar figure, but there is a drone. |
| Is there a voice singing syllables or vowels, with no real words? | yes | Wordless voices sing open vowels throughout. |
| Is it free of faults: clipping or distortion that is not part of the style, warble or smeared pitch, a dropout, a sudden cut-off at the end? | yes | The audio is clean with no obvious flaws. |

Listen score 86 of 100 (weighted share of good answers; it breaks ties between takes, the gates decide). Cost 0.0116 USD.

In doubt (a critical question answered "partly"): lead. Worth the owner's ears.

Other takes, as the model heard them: seed 544772: listen score 64; heard as wrong: lead; seed 544770: listen score 73; heard as wrong: lead; seed 544773: listen score 64; heard as wrong: lead; seed 544774: listen score 55; heard as wrong: lead; seed 544769: listen score 68; in doubt: lead.

## Checks

all automatic checks passed. These are numbers, not hearing: nobody on the machine can hear, the owner listens.
