# Hits to Kill

- **slug:** shoosting-62-hits-to-kill
- **idea:** Aggressive dark techno
- **bpm:** 128 (asked) / 127 (measured now, folded into 70-140)
- **key:** A minor (estimated now: the source did not record one)
- **seed:** 100062
- **model:** ACE-Step 1.5 (acestep-v15-turbo, LM acestep-5Hz-lm-1.7B)
- **tier:** fast   **duration:** 177.8 s as shipped
- **date:** 2026-09-30 (the original render date)
- **rendered_at:** 2026-09-30T12:00:00-04:00 (that date at 12:00 local: no time of day was recorded)
- **project:** shoosting
- **backfill:** true (imported from an earlier soundtrack; it is never new)
- **licence:** generated locally from a text prompt, no samples or reference audio, no third-party rights claimed

## Why

I did not render this one for the station: it was made on 2026-09-30 for an earlier arena shooter soundtrack, and I have brought it in under that date, so it is not new. The ask was "Aggressive dark techno": 128 bpm in A minor. The prompt describes aggressive dark techno with punishing overdriven kick, serrated distorted synth stabs answering each other and rumbling sub bass; I have not heard it, and the numbers below were measured now, on the file as it shipped.

## Prompt

> Aggressive dark techno, 128 bpm, punishing overdriven kick, serrated distorted synth stabs answering each other, rumbling sub bass, rapid closed hi-hats, alarm-like siren lead, hostile and relentless, tight four-bar phrases with abrupt cuts and hard re-entries, instrumental, no vocals

No lyrics recorded: instrumental.

## Request filter

run on import over the title, idea, prompt and every lyric line; the text above is as the source wrote it
would strip: nothing

## Rejected seeds

- none recorded by the source

## Measured now, on the shipped file (gate profile mellow: the station's default, not what this track was made against)

| gate | measured | limit | passed |
|---|---|---|---|
| tempo | 127 bpm vs asked 128 | within 4 bpm, folds 0.5 / 2 / 4:3 / 3:4 allowed | yes |
| loudness | -16.8 LUFS as shipped | -16 LUFS within 1 dB | yes |
| peak | -2.05 dBFS decoded | under -1 dBFS | yes |
| silence | longest 0.10 s under -50 dBFS | under 0.5 s | yes |
| brightness | 2.20 % of power above 6 kHz | under 2.5 % (mellow) | yes |
| boominess | 47.72 % below 60 Hz | under 12 % | **NO** |
| onset rate | 4.80 per second | 0.3 to 4.5 | **NO** |
| loop seam | step 5.16x, tail-head -52.5 dB | step under 4.0x, level within 5.0 dB | **NO** |

## Checks

not passed against the station's profile: boominess, onset rate, loop seam. Reported, not a reason to leave it out: this track shipped before the station existed.

## Backfill

- audio: re-encoded to 128 kbps CBR from an mp3 source, tags stripped
- recipe: `reproducible: false`. The seed and the prompt are recorded; the planner model's audio codes were never kept, so a re-render from them may differ. `recipe_render.py` refuses it.
