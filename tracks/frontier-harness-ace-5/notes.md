# Frontier Harness 5: Slower In G

- **slug:** frontier-harness-ace-5
- **idea:** swung sawtooth glitch-hop with the words chopped into syllables
- **mood:** neon, swung and punchy
- **bpm:** 87 (asked) / 86 (measured, folded into 70-140)
- **key:** G major (asked) / G major (estimated)
- **seed:** 4430052
- **model:** ACE-Step 1.5, acestep-v15-xl-sft, 50 steps, guidance 7.0, shift 1.0, LM None
- **tier:** best   **gate profile:** mellow   **duration:** 160 s rendered, 158.1 s installed (one-shot, nothing baked)
- **date:** 2026-11-01
- **render time:** None s per seed, model load None s
- **licence:** generated locally from a text prompt, no samples or reference audio, no third-party rights claimed
- project: frontier-harness-ace
- **album:** Frontier Harness: ACE Takes, track 5
- **submitter:** the owner
- **tags:** glitch hop, electro, chopped vocals, change: the tempo and key of your first reference take: 87 bpm, G major
- **loop:** no, a one-shot
- **length:** 6972330 samples at 44.1 kHz (158.10 s), about 57.3 bars of 4/4 at 87 bpm (the MP3 adds encoder padding; the length is of the PCM)

## Why

You asked for "the owner's Frontier Harness, rebuilt on ACE-Step from his own style box and lyrics". The owner's words and style, translated for ACE-Step by the station's writers; one change per take: the tempo and key of your first reference take: 87 bpm, G major. So I wrote it at 87 bpm in G major, 160 seconds, with a voice, in words I wrote myself, under the mellow gates. It is a one-shot: nothing is baked and the ending is the model's own. I rendered 2 seeds and threw away 1: 4430051 (0.9s of near-silence (limit 0.5) and others). Seed 4430052 is the take, but it did not clear every gate: 1.1s of near-silence (limit 0.5); harsh: 3.7% above 6 kHz (ceiling 2.5); 20 of 59 heard words are not ours (34 %; limit 10 %, at least 40 heard): front agent context eval eval eval eval eval sistem eval reasoning into.

## Prompt

> Swung glitch-hop electro, head-nod half-time groove, shuffled sixteenth hi-hats with heavy swing, punchy dry kick and snare, gritty detuned sawtooth lead, fat analog saw stabs, buzzing saw bass with heavy sidechain pumping, arpeggiated square-wave runs, a chopped vocal used as an instrument, single syllables stuttered, pitched and retriggered in the swing, neon arcade energy, wide, bright and punchy, no trap hi-hats, no EDM drop, no four-on-the-floor, no rap verses, no autotune

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

- 4430051: 0.9s of near-silence (limit 0.5); boomy: 13.4% below 60 Hz (ceiling 12); 234 of 684 heard words are not ours (34 %; limit 10 %, at least 40 heard): oh her compact the front rear oh shams oh my god mmm

## Measured (the kept take, after the 60 Hz high-pass, before the loudness gain unless noted)

| gate | measured | limit | passed |
|---|---|---|---|
| tempo | 86 bpm vs asked 87 | within 4 bpm, folds 0.5 / 2 / 4:3 / 3:4 allowed | yes |
| loudness | -16.0 LUFS installed (decoded MP3 -16.4); candidate was -17.3, gain +1.3 dB | -16 LUFS within 1 dB | yes |
| peak after encode | -2.80 dBFS decoded (pre-encode -3.09) | under -1 dBFS | yes |
| silence | longest 1.05 s under -50 dBFS | under 0.5 s (mellow) | **NO** |
| brightness | 3.73 % of power above 6 kHz | under 2.5 % (mellow) | **NO** |
| boominess | 10.45 % below 60 Hz (raw render 33.2 %) | under 12 % | yes |
| onset rate | 2.78 per second | 0.3 to 4.5 | yes |
| loop seam | step 0.89x, tail-head -63.1 dB | not applied: a one-shot, not a loop | yes |

## Words (Demucs voice stem, Whisper large-v3-turbo)

heard: Front frontier, frontier model | model harness harness sub sub sub agent tool tool tool call call context text text com | Compaction. Compaction. E-eval. E-eval. E-eval. E-eval. E-eval. S-e-sistem. E-eval. | Reasoning. | into traces long long horizon. | I'm going to go. | . | Oh, my God. | Shhh. | Frontier harness Frontier harness | Frontier Harness Frontier Harness

59 words heard, 20 not in our lyrics: front agent context eval eval eval eval eval sistem eval reasoning into i'm going to go oh my god shhh (limit 10 % of the words heard, at least 40 heard)

## Heard by a model, not a person

Not listened to: listening is off, or there is no GEMINI_API_KEY in the environment. Nobody on the machine can hear.

## Checks

kept despite failing: 1.1s of near-silence (limit 0.5); harsh: 3.7% above 6 kHz (ceiling 2.5); 20 of 59 heard words are not ours (34 %; limit 10 %, at least 40 heard): front agent context eval eval eval eval eval sistem eval reasoning into
