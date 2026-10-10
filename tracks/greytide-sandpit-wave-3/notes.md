# Hose Drip Daydream (wave)

- **slug:** greytide-sandpit-wave-3
- **idea:** hot lazy afternoon groove with bees, a hose and a far-off ice-cream van
- **mood:** the wave phase
- **bpm:** 83 (asked) / 82 (measured now, folded into 70-140)
- **key:** F major (as the source recorded it)
- **seed:** 802535
- **model:** ACE-Step 1.5 (acestep-v15-turbo, LM acestep-5Hz-lm-1.7B)
- **tier:** fast   **duration:** 90.8 s as shipped
- **date:** 2026-10-07 (the original render date)
- **rendered_at:** 2026-10-07T12:00:00-04:00 (that date at 12:00 local: no time of day was recorded)
- **project:** greytide
- **backfill:** true (imported from an earlier soundtrack; it is never new)
- **licence:** generated locally from a text prompt, no samples or reference audio, no third-party rights claimed

## Why

I did not render this one for the station: it was made on 2026-10-07 for an earlier tabletop game soundtrack, and I have brought it in under that date, so it is not new. The ask was "hot lazy afternoon groove with bees, a hose and a far-off ice-cream van" (the wave phase): 83 bpm in F major. The prompt describes laid back hot lazy afternoon groove with bucket taps, spade scrapes and a dripping hose as a drum kit and buzzing bee-like synth; I have not heard it, and the numbers below were measured now, on the file as it shipped.

## Prompt

> Laid back hot lazy afternoon groove, bucket taps, spade scrapes and a dripping hose as a drum kit, buzzing bee-like synth, a far-off ice-cream-van chime used as an instrument, soft steel-drum-like plucks, fuzzy round bass, dusty shaker drum machine, sunny sandpit daydream, good-humoured, 83 bpm, steel-drum-like plucks and a warm organ, the same groove with a little more drive and bounce, steady loopable arrangement, instrumental, no vocals, no singing, no speech, no drops, no wobble bass, no build-ups, no aggressive drums, no sub bass, light thin low end, bass in the mid range only

No lyrics recorded: instrumental.

## Request filter

run on import over the title, idea, prompt and every lyric line; the text above is as the source wrote it
would strip: Hose Drip Daydream

## Rejected seeds

- 801535: busy: 4.5 onsets/s

## Measured now, on the shipped file (gate profile mellow: the station's default, not what this track was made against)

| gate | measured | limit | passed |
|---|---|---|---|
| tempo | 82 bpm vs asked 83 | within 4 bpm, folds 0.5 / 2 / 4:3 / 3:4 allowed | yes |
| loudness | -16.4 LUFS as shipped | -16 LUFS within 1 dB | yes |
| peak | -2.01 dBFS decoded | under -1 dBFS | yes |
| silence | longest 0.00 s under -50 dBFS | under 0.5 s | yes |
| brightness | 1.17 % of power above 6 kHz | under 2.5 % (mellow) | yes |
| boominess | 14.54 % below 60 Hz | under 12 % | **NO** |
| onset rate | 3.52 per second | 0.3 to 4.5 | yes |
| loop seam | step 0.13x, tail-head +0.6 dB | step under 4.0x, level within 5.0 dB | yes |

## Checks

not passed against the station's profile: boominess. Reported, not a reason to leave it out: this track shipped before the station existed.

## Backfill

- audio: stream-copied (already 128 kbps CBR), tags stripped
- recipe: `reproducible: false`. The seed and the prompt are recorded; the planner model's audio codes were never kept, so a re-render from them may differ. `recipe_render.py` refuses it.
