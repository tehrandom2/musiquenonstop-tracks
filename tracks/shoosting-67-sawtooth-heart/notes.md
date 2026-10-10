# Sawtooth Heart

- **slug:** shoosting-67-sawtooth-heart
- **idea:** Electro house with a broken heart
- **bpm:** 126 (asked) / 123 (measured now, folded into 70-140)
- **key:** A minor (estimated now: the source did not record one)
- **seed:** 400067
- **model:** ACE-Step 1.5 (acestep-v15-xl-sft, 50 steps, CFG 7.0, LM acestep-5Hz-lm-4B)
- **tier:** best   **duration:** 176.6 s as shipped
- **date:** 2026-10-01 (the original render date)
- **rendered_at:** 2026-10-01T12:00:00-04:00 (that date at 12:00 local: no time of day was recorded)
- **project:** shoosting
- **backfill:** true (imported from an earlier soundtrack; it is never new)
- **licence:** generated locally from a text prompt, no samples or reference audio, no third-party rights claimed

## Why

I did not render this one for the station: it was made on 2026-10-01 for an earlier arena shooter soundtrack, and I have brought it in under that date, so it is not new. The ask was "Electro house with a broken heart": 126 bpm in A minor, one of the tracks the machine chose for itself, on the best tier. The prompt describes electro house with a broken heart; I have not heard it, and the numbers below were measured now, on the file as it shipped.

## Prompt

> Electro house with a broken heart, opening on a lonely, slightly detuned upright piano playing four sad minor chords in an empty room. Then a gigantic raw buzzing sawtooth synth bass rips in underneath, unfiltered, gritty and overdriven, playing a stabbing syncopated riff over a hard four-on-the-floor kick, sharp claps and heavy sidechain pumping. The piano keeps playing over the top the whole time. The quiet sections pull back to piano and kick, the loud sections are all sawtooth. Bitter, urgent, danceable, heart on sleeve, instrumental.

No lyrics recorded: instrumental.

## Request filter

run on import over the title, idea, prompt and every lyric line; the text above is as the source wrote it
would strip: nothing

## Rejected seeds

- none recorded by the source

## Measured now, on the shipped file (gate profile mellow: the station's default, not what this track was made against)

| gate | measured | limit | passed |
|---|---|---|---|
| tempo | 123 bpm vs asked 126 | within 4 bpm, folds 0.5 / 2 / 4:3 / 3:4 allowed | yes |
| loudness | -19.0 LUFS as shipped | -16 LUFS within 1 dB | **NO** |
| peak | -2.64 dBFS decoded | under -1 dBFS | yes |
| silence | longest 0.10 s under -50 dBFS | under 0.5 s | yes |
| brightness | 0.63 % of power above 6 kHz | under 2.5 % (mellow) | yes |
| boominess | 2.60 % below 60 Hz | under 12 % | yes |
| onset rate | 3.24 per second | 0.3 to 4.5 | yes |
| loop seam | step 0.01x, tail-head -27.4 dB | step under 4.0x, level within 5.0 dB | **NO** |

## Checks

not passed against the station's profile: loudness, loop seam. Reported, not a reason to leave it out: this track shipped before the station existed.

## Backfill

- audio: re-encoded to 128 kbps CBR from an mp3 source, tags stripped
- recipe: `reproducible: false`. The seed and the prompt are recorded; the planner model's audio codes were never kept, so a re-render from them may differ. `recipe_render.py` refuses it.
