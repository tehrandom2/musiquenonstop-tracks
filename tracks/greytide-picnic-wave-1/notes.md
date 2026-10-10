# Blanket On The Lawn (wave)

- **slug:** greytide-picnic-wave-1
- **idea:** sun-struck back-yard picnic with wrong-note nylon guitar and wheezy melodica
- **mood:** the wave phase
- **bpm:** 83 (asked) / 82 (measured now, folded into 70-140)
- **key:** G major (as the source recorded it)
- **seed:** 803015
- **model:** ACE-Step 1.5 (acestep-v15-turbo, LM acestep-5Hz-lm-1.7B)
- **tier:** fast   **duration:** 89.0 s as shipped
- **date:** 2026-10-06 (the original render date)
- **rendered_at:** 2026-10-06T12:00:00-04:00 (that date at 12:00 local: no time of day was recorded)
- **project:** greytide
- **backfill:** true (imported from an earlier soundtrack; it is never new)
- **licence:** generated locally from a text prompt, no samples or reference audio, no third-party rights claimed

## Why

I did not render this one for the station: it was made on 2026-10-06 for an earlier tabletop game soundtrack, and I have brought it in under that date, so it is not new. The ask was "sun-struck back-yard picnic with wrong-note nylon guitar and wheezy melodica" (the wave phase): 83 bpm in G major. The prompt describes laid back warm lazy summer-evening groove with egg shaker, cricket-like clicks and soft bongo taps as a drum kit and nylon guitar or ukulele played a bit wrong; I have not heard it, and the numbers below were measured now, on the file as it shipped.

## Prompt

> Laid back warm lazy summer-evening groove, egg shaker, cricket-like clicks and soft bongo taps as a drum kit, nylon guitar or ukulele played a bit wrong, wheezy melodica used as an instrument, woozy tape-warped synth underneath, fuzzy round bass, dusty drum machine, picnic blanket daydream, good-humoured, 83 bpm, the same groove with a little more drive and bounce, steady loopable arrangement, instrumental, no vocals, no singing, no speech, no drops, no wobble bass, no build-ups, no aggressive drums, no sub bass, light thin low end, bass in the mid range only

No lyrics recorded: instrumental.

## Request filter

run on import over the title, idea, prompt and every lyric line; the text above is as the source wrote it
would strip: Blanket On The Lawn

## Rejected seeds

- 802015: harsh: 2.7% above 6 kHz
- 701015: superseded by the #443 render
- 801015: busy: 4.6 onsets/s

## Measured now, on the shipped file (gate profile mellow: the station's default, not what this track was made against)

| gate | measured | limit | passed |
|---|---|---|---|
| tempo | 82 bpm vs asked 83 | within 4 bpm, folds 0.5 / 2 / 4:3 / 3:4 allowed | yes |
| loudness | -16.4 LUFS as shipped | -16 LUFS within 1 dB | yes |
| peak | -2.94 dBFS decoded | under -1 dBFS | yes |
| silence | longest 0.15 s under -50 dBFS | under 0.5 s | yes |
| brightness | 1.85 % of power above 6 kHz | under 2.5 % (mellow) | yes |
| boominess | 8.06 % below 60 Hz | under 12 % | yes |
| onset rate | 3.92 per second | 0.3 to 4.5 | yes |
| loop seam | step 0.19x, tail-head +11.2 dB | step under 4.0x, level within 5.0 dB | **NO** |

## Checks

not passed against the station's profile: loop seam. Reported, not a reason to leave it out: this track shipped before the station existed.

## Backfill

- audio: stream-copied (already 128 kbps CBR), tags stripped
- recipe: `reproducible: false`. The seed and the prompt are recorded; the planner model's audio codes were never kept, so a re-render from them may differ. `recipe_render.py` refuses it.
