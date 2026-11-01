# Frontier Harness 3: Raw Saw

- **slug:** frontier-harness-ace-3
- **idea:** swung sawtooth glitch-hop with the words chopped into syllables
- **mood:** neon, swung and punchy
- **bpm:** 92 (asked) / 124 (measured, folded into 70-140)
- **key:** G minor (asked) / D major (estimated)
- **seed:** 4430032
- **model:** ACE-Step 1.5, acestep-v15-xl-sft, 50 steps, guidance 7.0, shift 1.0, LM None
- **tier:** best   **gate profile:** mellow   **duration:** 160 s rendered, 158.7 s installed (one-shot, nothing baked)
- **date:** 2026-11-01
- **render time:** None s per seed, model load None s
- **licence:** generated locally from a text prompt, no samples or reference audio, no third-party rights claimed
- project: frontier-harness-ace
- **album:** Frontier Harness: ACE Takes, track 3
- **submitter:** the owner
- **tags:** glitch hop, electro, chopped vocals, change: the synths: one raw buzzing saw, no supersaw
- **loop:** no, a one-shot
- **length:** 6996838 samples at 44.1 kHz (158.66 s), about 60.8 bars of 4/4 at 92 bpm (the MP3 adds encoder padding; the length is of the PCM)

## Why

You asked for "the owner's Frontier Harness, rebuilt on ACE-Step from his own style box and lyrics". The owner's words and style, translated for ACE-Step by the station's writers; one change per take: the synths: one raw buzzing saw, no supersaw. So I wrote it at 92 bpm in G minor, 160 seconds, with a voice, in words I wrote myself, under the mellow gates. It is a one-shot: nothing is baked and the ending is the model's own. I rendered 2 seeds and threw away 1: 4430031 (0.8s of near-silence (limit 0.5) and others). Seed 4430032 is the take, but it did not clear every gate: harsh: 2.8% above 6 kHz (ceiling 2.5); 352 of 489 heard words are not ours (72 %; limit 10 %, at least 40 heard): agent agent agent agent agent agent agent agent agent agent agent agent.

## Prompt

> Swung glitch-hop electro, head-nod half-time groove, shuffled sixteenth hi-hats with heavy swing, punchy dry kick and snare, a raw buzzing sawtooth bass, unfiltered and overdriven, staccato overdriven saw stabs, heavy sidechain pumping, arpeggiated square-wave runs, a chopped vocal used as an instrument, single syllables stuttered, pitched and retriggered in the swing, neon arcade energy, wide, bright and punchy, no trap hi-hats, no EDM drop, no four-on-the-floor, no rap verses, no autotune

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

- 4430031: 0.8s of near-silence (limit 0.5); harsh: 2.9% above 6 kHz (ceiling 2.5); 594 of 899 heard words are not ours (66 %; limit 10 %, at least 40 heard): mondale oh dresses ree ree ree ree ree ree ree ree ree

## Measured (the kept take, after the 60 Hz high-pass, before the loudness gain unless noted)

| gate | measured | limit | passed |
|---|---|---|---|
| tempo | 124 bpm vs asked 92 | within 4 bpm, folds 0.5 / 2 / 4:3 / 3:4 allowed | yes |
| loudness | -16.0 LUFS installed (decoded MP3 -16.4); candidate was -16.5, gain +0.5 dB | -16 LUFS within 1 dB | yes |
| peak after encode | -2.78 dBFS decoded (pre-encode -3.12) | under -1 dBFS | yes |
| silence | longest 0.40 s under -50 dBFS | under 0.5 s (mellow) | yes |
| brightness | 2.82 % of power above 6 kHz | under 2.5 % (mellow) | **NO** |
| boominess | 2.61 % below 60 Hz (raw render 16.8 %) | under 12 % | yes |
| onset rate | 3.46 per second | 0.3 to 4.5 | yes |
| loop seam | step 0.73x, tail-head -46.8 dB | not applied: a one-shot, not a loop | yes |

## Words (Demucs voice stem, Whisper large-v3-turbo)

heard: Frontier, Frontier, Model, Model. Harness, Harness. Harness. | Sub-sub-sub-agent Sub-agent Sub-agent Sub-agent Sub-agent Sub-agent Sub-agent Sub-agent Sub-agent Sub-agent Sub-agent Sub-agent Sub-agent Sub-agent Sub-agent Sub-agent Sub-agent Sub-agent Sub-agent Sub-agent Sub-agent Sub-agent Sub-agent Sub-agent Sub-agent Sub-agent Sub-agent Sub-agent Sub-agent Sub-agent Sub-agent Sub-agent Sub-agent Sub-agent Sub-agent Sub-agent Sub-agent Sub-agent Sub-agent Sub-agent Sub-agent Sub-agent Sub-agent Sub-agent Sub-agent Sub-agent Sub-agent Sub-agent Sub-agent Sub-agent Sub-agent Sub-agent Sub-agent Sub-agent Sub-agent Sub-agent Sub-agent Sub-agent Sub-agent Sub-agent Sub-agent Sub-agent Sub-agent Sub-agent Sub-agent Sub-agent Sub-agent Sub-agent Sub-agent Sub-agent Sub-agent Sub-agent Sub-agent Sub-agent Sub-agent Sub-agent Sub-agent Sub-agent Sub-agent Sub-agent Sub-agent Sub-agent Sub-agent Sub-agent Sub-agent Sub-agent Sub-agent Sub-agent Sub-agent Sub-agent Sub-agent Sub-agent Sub-agent Sub-agent Sub-agent Sub-agent Sub-agent Sub-agent Sub-agent Sub-agent Sub-agent Sub-agent Sub-agent Sub-agent Sub-agent Sub-agent Sub-agent Sub-agent Sub-agent Sub-agent | Compact, comp, comp, comp, comp, comp, comp, comp, comp, comp, comp, comp, comp, comp, comp, comp, comp, comp, comp, comp, comp, comp, comp, comp, comp, comp, comp, comp, comp, comp, comp, comp, comp, comp, comp, comp, comp, comp, comp, comp, comp, comp, comp, comp, comp, comp, comp, comp, comp, comp, comp, comp, comp, comp, comp, comp, comp, comp, comp, comp, comp, comp, comp, comp, comp, comp, comp, comp, comp, comp, comp, comp, comp, comp, comp, comp, comp, comp, comp, comp, comp, comp, comp, comp, comp, comp, comp, comp, comp, comp, comp, comp, comp, comp, comp, comp, comp, comp, comp, comp, comp, comp, comp, comp, comp, comp, comp, comp, comp, comp, comp, comp, comp, comp, comp, comp, comp, comp, comp, comp, comp, comp, comp, comp, comp, comp, comp, comp, comp, comp, comp, comp, comp, comp, comp, comp, comp, comp, comp, comp, comp, comp, comp, comp, comp, comp, comp, comp, comp, comp, comp, comp, comp, comp, comp, comp, comp, comp, comp, comp, comp, comp, comp, comp, comp, comp, comp, comp, comp, comp, comp, comp, comp, comp, comp, comp, comp, comp, comp, comp, comp, comp, comp, comp, comp, comp, comp, comp, comp, comp, comp, comp, comp, comp, comp, comp, comp, comp, comp, comp, comp, comp, comp, comp, comp, comp, comp, comp, comp, comp, comp, comp, comp, comp, comp, comp, comp, comp, comp, comp, comp, comp | C system up front. Rearious unreason to traces. Long, long, hoary house. | Horizon. | Oh | . | Oh, my God. | A-a-a-a-cen, a-cen-tick, a-a-cen-tick. A-a-a-cen, a-cen-tick. | Frontier | Frontier.

489 words heard, 352 not in our lyrics: agent agent agent agent agent agent agent agent agent agent agent agent agent agent agent agent agent agent agent agent agent agent agent agent agent agent agent agent agent agent agent agent agent agent agent agent agent agent agent agent agent agent agent agent agent agent agent agent agent agent agent agent agent agent agent agent agent agent agent agent agent agent agent agent agent agent agent agent agent agent agent agent agent agent agent agent agent agent agent agent agent agent agent agent agent agent agent agent agent agent agent agent agent agent agent agent agent agent agent agent agent agent agent agent agent agent agent agent agent agent compact comp comp comp comp comp comp comp comp comp comp comp comp comp comp comp comp comp comp comp comp comp comp comp comp comp comp comp comp comp comp comp comp comp comp comp comp comp comp comp comp comp comp comp comp comp comp comp comp comp comp comp comp comp comp comp comp comp comp comp comp comp comp comp comp comp comp comp comp comp comp comp comp comp comp comp comp comp comp comp comp comp comp comp comp comp comp comp comp comp comp comp comp comp comp comp comp comp comp comp comp comp comp comp comp comp comp comp comp comp comp comp comp comp comp comp comp comp comp comp comp comp comp comp comp comp comp comp comp comp comp comp comp comp comp comp comp comp comp comp comp comp comp comp comp comp comp comp comp comp comp comp comp comp comp comp comp comp comp comp comp comp comp comp comp comp comp comp comp comp comp comp comp comp comp comp comp comp comp comp comp comp comp comp comp comp comp comp comp comp comp comp comp comp comp comp comp comp comp comp comp comp comp comp comp comp comp comp comp comp comp comp comp comp comp comp comp comp comp comp comp comp system up front rearious unreason to hoary house oh oh my god cen cen tick cen tick cen cen tick (limit 10 % of the words heard, at least 40 heard)

## Heard by a model, not a person

Not listened to: listening is off, or there is no GEMINI_API_KEY in the environment. Nobody on the machine can hear.

## Checks

kept despite failing: harsh: 2.8% above 6 kHz (ceiling 2.5); 352 of 489 heard words are not ours (72 %; limit 10 %, at least 40 heard): agent agent agent agent agent agent agent agent agent agent agent agent
