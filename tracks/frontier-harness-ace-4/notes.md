# Frontier Harness 4: Sampler Chops

- **slug:** frontier-harness-ace-4
- **idea:** swung sawtooth glitch-hop with the words chopped into syllables
- **mood:** neon, swung and punchy
- **bpm:** 92 (asked) / 92 (measured, folded into 70-140)
- **key:** G minor (asked) / G minor (estimated)
- **seed:** 4430042
- **model:** ACE-Step 1.5, acestep-v15-xl-sft, 50 steps, guidance 7.0, shift 1.0, LM None
- **tier:** best   **gate profile:** mellow   **duration:** 160 s rendered, 159.2 s installed (one-shot, nothing baked)
- **date:** 2026-11-01
- **render time:** None s per seed, model load None s
- **licence:** generated locally from a text prompt, no samples or reference audio, no third-party rights claimed
- project: frontier-harness-ace
- **album:** Frontier Harness: ACE Takes, track 4
- **submitter:** the owner
- **tags:** glitch hop, electro, chopped vocals, change: the voice: syllables played like sampler pads
- **loop:** no, a one-shot
- **length:** 7021471 samples at 44.1 kHz (159.22 s), about 61.0 bars of 4/4 at 92 bpm (the MP3 adds encoder padding; the length is of the PCM)

## Why

You asked for "the owner's Frontier Harness, rebuilt on ACE-Step from his own style box and lyrics". The owner's words and style, translated for ACE-Step by the station's writers; one change per take: the voice: syllables played like sampler pads. So I wrote it at 92 bpm in G minor, 160 seconds, with a voice, in words I wrote myself, under the mellow gates. It is a one-shot: nothing is baked and the ending is the model's own. I rendered 2 seeds and threw away 1: 4430041 (1.3s of near-silence (limit 0.5) and others). Seed 4430042 is the take, but it did not clear every gate: 0.6s of near-silence (limit 0.5); 35 of 67 heard words are not ours (52 %; limit 10 %, at least 40 heard): agent agent to context detects combat balsicized temper pom pom pom clear.

## Prompt

> Swung glitch-hop electro, head-nod half-time groove, shuffled sixteenth hi-hats with heavy swing, punchy dry kick and snare, gritty detuned sawtooth lead, fat analog saw stabs, buzzing saw bass with heavy sidechain pumping, arpeggiated square-wave runs, the vocal sliced into single syllables replayed like sampler pads, half-beat silences and rewinds, neon arcade energy, wide, bright and punchy, no trap hi-hats, no EDM drop, no four-on-the-floor, no rap verses, no autotune

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

- 4430041: 1.3s of near-silence (limit 0.5); harsh: 4.9% above 6 kHz (ceiling 2.5)

## Measured (the kept take, after the 60 Hz high-pass, before the loudness gain unless noted)

| gate | measured | limit | passed |
|---|---|---|---|
| tempo | 92 bpm vs asked 92 | within 4 bpm, folds 0.5 / 2 / 4:3 / 3:4 allowed | yes |
| loudness | -16.0 LUFS installed (decoded MP3 -16.4); candidate was -16.2, gain +0.2 dB | -16 LUFS within 1 dB | yes |
| peak after encode | -3.10 dBFS decoded (pre-encode -3.17) | under -1 dBFS | yes |
| silence | longest 0.60 s under -50 dBFS | under 0.5 s (mellow) | **NO** |
| brightness | 2.06 % of power above 6 kHz | under 2.5 % (mellow) | yes |
| boominess | 4.91 % below 60 Hz (raw render 22.2 %) | under 12 % | yes |
| onset rate | 3.82 per second | 0.3 to 4.5 | yes |
| loop seam | step 2.44x, tail-head -55.8 dB | not applied: a one-shot, not a loop | yes |

## Words (Demucs voice stem, Whisper large-v3-turbo)

heard: ... | Frontier, Frontier, Model, Model, Model | A harness. Harness. | Sub sub agent, sub sub agent, to call, call, call. | Context detects combat, com-compaction, compaction. Balsicized temper, pom-pom-pom, clear-eason. Reasoning to trace is long, long, ho-ree-a-horizon. | Drums out, saw pad swells. What did this to want one ties this? | Sand, sand, box, a sandbox. | Oh | Oh. | Oh, yeah. | Frontier Harness Frontier Harness

67 words heard, 35 not in our lyrics: agent agent to context detects combat balsicized temper pom pom pom clear eason reasoning to trace is ree drums out saw pad swells what did this to want one ties this oh oh oh yeah (limit 10 % of the words heard, at least 40 heard)

## Heard by a model, not a person

Not listened to: listening is off, or there is no GEMINI_API_KEY in the environment. Nobody on the machine can hear.

## Checks

kept despite failing: 0.6s of near-silence (limit 0.5); 35 of 67 heard words are not ours (52 %; limit 10 %, at least 40 heard): agent agent to context detects combat balsicized temper pom pom pom clear
