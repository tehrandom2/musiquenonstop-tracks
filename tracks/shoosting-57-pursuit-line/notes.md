# Pursuit Line

- **slug:** shoosting-57-pursuit-line
- **idea:** Dark industrial techno
- **bpm:** 125 (asked) / 126 (measured now, folded into 70-140)
- **key:** F major (estimated now: the source did not record one)
- **seed:** 100057
- **model:** ACE-Step 1.5 (acestep-v15-turbo, LM acestep-5Hz-lm-1.7B)
- **tier:** fast   **duration:** 175.6 s as shipped
- **date:** 2026-09-30 (the original render date)
- **rendered_at:** 2026-09-30T12:00:00-04:00 (that date at 12:00 local: no time of day was recorded)
- **project:** shoosting
- **backfill:** true (imported from an earlier soundtrack; it is never new)
- **licence:** generated locally from a text prompt, no samples or reference audio, no third-party rights claimed

## Why

I did not render this one for the station: it was made on 2026-09-30 for an earlier arena shooter soundtrack, and I have brought it in under that date, so it is not new. The ask was "Dark industrial techno": 125 bpm in F major. The prompt describes dark industrial techno with hard distorted four-on-the-floor kick, cold stabbing analog synth riff in a minor key and metallic clanging percussion; I have not heard it, and the numbers below were measured now, on the file as it shipped.

## Prompt

> Dark industrial techno, 125 bpm, hard distorted four-on-the-floor kick, cold stabbing analog synth riff in a minor key, metallic clanging percussion, tense rising noise sweeps, sparse and menacing arrangement with sudden drops to near silence before the kick returns, black and chrome warehouse atmosphere, instrumental, no vocals

No lyrics recorded: instrumental.

## Request filter

run on import over the title, idea, prompt and every lyric line; the text above is as the source wrote it
would strip: nothing

## Rejected seeds

- none recorded by the source

## Measured now, on the shipped file (gate profile mellow: the station's default, not what this track was made against)

| gate | measured | limit | passed |
|---|---|---|---|
| tempo | 126 bpm vs asked 125 | within 4 bpm, folds 0.5 / 2 / 4:3 / 3:4 allowed | yes |
| loudness | -16.7 LUFS as shipped | -16 LUFS within 1 dB | yes |
| peak | -2.76 dBFS decoded | under -1 dBFS | yes |
| silence | longest 0.10 s under -50 dBFS | under 0.5 s | yes |
| brightness | 2.35 % of power above 6 kHz | under 2.5 % (mellow) | yes |
| boominess | 35.88 % below 60 Hz | under 12 % | **NO** |
| onset rate | 5.18 per second | 0.3 to 4.5 | **NO** |
| loop seam | step 0.21x, tail-head -48.9 dB | step under 4.0x, level within 5.0 dB | **NO** |

## Checks

not passed against the station's profile: boominess, onset rate, loop seam. Reported, not a reason to leave it out: this track shipped before the station existed.

## Backfill

- audio: re-encoded to 128 kbps CBR from an mp3 source, tags stripped
- recipe: `reproducible: false`. The seed and the prompt are recorded; the planner model's audio codes were never kept, so a re-render from them may differ. `recipe_render.py` refuses it.
