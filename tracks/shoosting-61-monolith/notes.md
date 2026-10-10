# Monolith

- **slug:** shoosting-61-monolith
- **idea:** Brutalist industrial techno
- **bpm:** 118 (asked) / 116 (measured now, folded into 70-140)
- **key:** C major (estimated now: the source did not record one)
- **seed:** 100061
- **model:** ACE-Step 1.5 (acestep-v15-turbo, LM acestep-5Hz-lm-1.7B)
- **tier:** fast   **duration:** 175.4 s as shipped
- **date:** 2026-09-30 (the original render date)
- **rendered_at:** 2026-09-30T12:00:00-04:00 (that date at 12:00 local: no time of day was recorded)
- **project:** shoosting
- **backfill:** true (imported from an earlier soundtrack; it is never new)
- **licence:** generated locally from a text prompt, no samples or reference audio, no third-party rights claimed

## Why

I did not render this one for the station: it was made on 2026-09-30 for an earlier arena shooter soundtrack, and I have brought it in under that date, so it is not new. The ask was "Brutalist industrial techno": 118 bpm in C major. The prompt describes brutalist industrial techno with enormous distorted kick drum, single low detuned synth note hammered in a slow rhythm and harsh white noise snares; I have not heard it, and the numbers below were measured now, on the file as it shipped.

## Prompt

> Brutalist industrial techno, 118 bpm, enormous distorted kick drum, single low detuned synth note hammered in a slow rhythm, harsh white noise snares, dissonant metallic drones, huge empty reverb space, oppressive and monumental, very few elements each one massive, instrumental, no vocals

No lyrics recorded: instrumental.

## Request filter

run on import over the title, idea, prompt and every lyric line; the text above is as the source wrote it
would strip: nothing

## Rejected seeds

- none recorded by the source

## Measured now, on the shipped file (gate profile mellow: the station's default, not what this track was made against)

| gate | measured | limit | passed |
|---|---|---|---|
| tempo | 116 bpm vs asked 118 | within 4 bpm, folds 0.5 / 2 / 4:3 / 3:4 allowed | yes |
| loudness | -17.2 LUFS as shipped | -16 LUFS within 1 dB | **NO** |
| peak | -3.24 dBFS decoded | under -1 dBFS | yes |
| silence | longest 0.55 s under -50 dBFS | under 0.5 s | **NO** |
| brightness | 1.27 % of power above 6 kHz | under 2.5 % (mellow) | yes |
| boominess | 69.06 % below 60 Hz | under 12 % | **NO** |
| onset rate | 4.23 per second | 0.3 to 4.5 | yes |
| loop seam | step 0.82x, tail-head -44.1 dB | step under 4.0x, level within 5.0 dB | **NO** |

## Checks

not passed against the station's profile: loudness, silence, boominess, loop seam. Reported, not a reason to leave it out: this track shipped before the station existed.

## Backfill

- audio: re-encoded to 128 kbps CBR from an mp3 source, tags stripped
- recipe: `reproducible: false`. The seed and the prompt are recorded; the planner model's audio codes were never kept, so a re-render from them may differ. `recipe_render.py` refuses it.
