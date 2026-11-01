# Frontier Harness 2: Heavier Swing

- **slug:** frontier-harness-ace-2
- **idea:** swung sawtooth glitch-hop with the words chopped into syllables
- **mood:** neon, swung and punchy
- **bpm:** 92 (asked) / 92 (measured, folded into 70-140)
- **key:** G minor (asked) / D minor (estimated)
- **seed:** 4430022
- **model:** ACE-Step 1.5, acestep-v15-xl-sft, 50 steps, guidance 7.0, shift 1.0, LM None
- **tier:** best   **gate profile:** mellow   **duration:** 160 s rendered, 158.2 s installed (one-shot, nothing baked)
- **date:** 2026-11-01
- **render time:** None s per seed, model load None s
- **licence:** generated locally from a text prompt, no samples or reference audio, no third-party rights claimed
- project: frontier-harness-ace
- **album:** Frontier Harness: ACE Takes, track 2
- **submitter:** the owner
- **tags:** glitch hop, electro, chopped vocals, change: the drums: drunk, off-grid and behind the beat
- **loop:** no, a one-shot
- **length:** 6977430 samples at 44.1 kHz (158.22 s), about 60.7 bars of 4/4 at 92 bpm (the MP3 adds encoder padding; the length is of the PCM)

## Why

You asked for "the owner's Frontier Harness, rebuilt on ACE-Step from his own style box and lyrics". The owner's words and style, translated for ACE-Step by the station's writers; one change per take: the drums: drunk, off-grid and behind the beat. So I wrote it at 92 bpm in G minor, 160 seconds, with a voice, in words I wrote myself, under the mellow gates. It is a one-shot: nothing is baked and the ending is the model's own. I rendered 2 seeds and threw away 1: 4430021 (0.6s of near-silence (limit 0.5) and others). Seed 4430022 is the take, but it did not clear every gate: 0.7s of near-silence (limit 0.5); harsh: 9.4% above 6 kHz (ceiling 2.5); 34 of 271 heard words are not ours (13 %; limit 10 %, at least 40 heard): agent agent compact re re re re reasoning hurry oh oh my.

## Prompt

> Swung glitch-hop electro, head-nod half-time groove, drunk off-grid drums, heavy shuffled sixteenths behind the beat, a lazy kick, dusty snare, gritty detuned sawtooth lead, fat analog saw stabs, buzzing saw bass with heavy sidechain pumping, arpeggiated square-wave runs, a chopped vocal used as an instrument, single syllables stuttered, pitched and retriggered in the swing, neon arcade energy, wide, bright and punchy, no trap hi-hats, no EDM drop, no four-on-the-floor, no rap verses, no autotune

## Lyrics (original, written for this track by the project; the model was given only these words)

```
[Intro: saw arps and swung drums]
[Vocal Chops]
f-f-fron, fron-tier, f-f-frontier
mo-mo-mo, del, m-m-model
h-h-har, har-ness, h-h-harness
[Beat]
[Vocal Chops]
sub-sub-sub, a-gent, s-s-subagent
t-t-tool, tool-call, c-c-call
con-con-tex, t-t-text, com-pact
com-com-pac, tion, compaction
[Beat]
[Vocal Chops]
e-e-e-val, e-vals, v-v-vals
sys-sys-tem, p-p-prompt
rea-rea-son, reason-ing, t-t-traces
long-long, ho-ri, h-h-horizon
[Breakdown: drums out, saw pad swells, reversed chops]
...fron ...har ...sub ...mm
[Bridge: half-whispered over the arps]
w-w-w-weights, w-w-weights
d-d-dis-till, q-q-quant, quantize
sand-sand, box, s-s-sandbox
[Drop back in: full saws]
a-a-a-gen, a-gen-tic, a-a-agentic
[Outro: filter closes on the saws]
f-f-fron, fron-tier, harness
frontier harness
```

## Request filter

stripped: nothing

## Rejected seeds

- 4430021: 0.6s of near-silence (limit 0.5); harsh: 10.0% above 6 kHz (ceiling 2.5)

## Measured (the kept take, after the 60 Hz high-pass, before the loudness gain unless noted)

| gate | measured | limit | passed |
|---|---|---|---|
| tempo | 92 bpm vs asked 92 | within 4 bpm, folds 0.5 / 2 / 4:3 / 3:4 allowed | yes |
| loudness | -16.0 LUFS installed (decoded MP3 -16.4); candidate was -14.4, gain -1.6 dB | -16 LUFS within 1 dB | yes |
| peak after encode | -3.04 dBFS decoded (pre-encode -3.37) | under -1 dBFS | yes |
| silence | longest 0.70 s under -50 dBFS | under 0.5 s (mellow) | **NO** |
| brightness | 9.39 % of power above 6 kHz | under 2.5 % (mellow) | **NO** |
| boominess | 2.94 % below 60 Hz (raw render 12.3 %) | under 12 % | yes |
| onset rate | 4.25 per second | 0.3 to 4.5 | yes |
| loop seam | step 0.08x, tail-head -41.9 dB | not applied: a one-shot, not a loop | yes |

## Words (Demucs voice stem, Whisper large-v3-turbo)

heard: Frontier Frontier Model Harness Harness | Sub, sub, sub, agent, sub, agent, tool, tool, call, call, con, con, text, text, compact, con, compaction, compaction. E, e, e, e, e, e, e, e, e, e, e, e, e, e, e, e, e, e, e, e, e, e, e, e, e, e, e, e, e, e, e, e, e, e, e, e, e, e, e, e, e, e, e, e, e, e, e, e, e, e, e, e, e, e, e, e, e, e, e, e, e, e, e, e, e, e, e, e, e, e, e, e, e, e, e, e, e, e, e, e, e, e, e, e, e, e, e, e, e, e, e, e, e, e, e, e, e, e, e, e, e, e, e, e, e, e, e, e, e, e, e, e, e, e, e, e, e, e, e, e, e, e, e, e, e, e, e, e, e, e, e, e, e, e, e, e, e, e, e, e, e, e, e, e, e, e, e, e, e, e, e, e, e, e, e, e, e, e, e, e, e, e, e, e, e, e, e, e, e, e, e, e, e, e, e, e, e, e, e, e, e, e, e, e, e, e, e, e, e, e, e, e, e, e, e, e, e, e, e, e, e, e, e, | Re-re-re-re-son reasoning, t-t-traces long, long, hurry. | Oh | Oh, my God. | . | Oh, my God. | Thanks. | Ah-ah-ah-ah-ah-gen-gen-tick, ah-ah-ah-gen-tick. Ah-ah-ah-gen-tick. | Oh, my God. | Frontier Harness Frontier Harness

271 words heard, 34 not in our lyrics: agent agent compact re re re re reasoning hurry oh oh my god oh my god thanks ah ah ah ah ah tick ah ah ah tick ah ah ah tick oh my god (limit 10 % of the words heard, at least 40 heard)

## Heard by a model, not a person

Not listened to: listening is off, or there is no GEMINI_API_KEY in the environment. Nobody on the machine can hear.

## Checks

kept despite failing: 0.7s of near-silence (limit 0.5); harsh: 9.4% above 6 kHz (ceiling 2.5); 34 of 271 heard words are not ours (13 %; limit 10 %, at least 40 heard): agent agent compact re re re re reasoning hurry oh oh my
