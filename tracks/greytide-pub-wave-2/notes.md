# Last Orders Shuffle (wave)

- **slug:** greytide-pub-wave-2
- **idea:** wonky pub-piano and wheezy accordion shuffle
- **mood:** the wave phase
- **bpm:** 93 (asked) / 92 (measured now, folded into 70-140)
- **key:** G major (as the source recorded it)
- **seed:** 800925
- **model:** ACE-Step 1.5 (acestep-v15-turbo, LM acestep-5Hz-lm-1.7B)
- **tier:** fast   **duration:** 91.8 s as shipped
- **date:** 2026-10-06 (the original render date)
- **rendered_at:** 2026-10-06T12:00:00-04:00 (that date at 12:00 local: no time of day was recorded)
- **project:** greytide
- **backfill:** true (imported from an earlier soundtrack; it is never new)
- **licence:** generated locally from a text prompt, no samples or reference audio, no third-party rights claimed

## Why

I did not render this one for the station: it was made on 2026-10-06 for an earlier tabletop game soundtrack, and I have brought it in under that date, so it is not new. The ask was "wonky pub-piano and wheezy accordion shuffle" (the wave phase): 93 bpm in G major. The prompt describes laid back wonky honky-tonk groove with clinking glasses, beer-mat taps and foot stomps as a drum kit and slightly out-of-tune pub piano; I have not heard it, and the numbers below were measured now, on the file as it shipped.

## Prompt

> Laid back wonky honky-tonk groove, clinking glasses, beer-mat taps and foot stomps as a drum kit, slightly out-of-tune pub piano, wheezy accordion used as an instrument, fuzzy walking bass, dusty brushed drum machine, tipsy after-hours daydream, good-humoured, 93 bpm, banjo-like plucks and a wheezy harmonica-like lead, the same groove with a little more drive and bounce, steady loopable arrangement, instrumental, no vocals, no singing, no speech, no drops, no wobble bass, no build-ups, no aggressive drums, no sub bass, light thin low end, bass in the mid range only

No lyrics recorded: instrumental.

## Request filter

run on import over the title, idea, prompt and every lyric line; the text above is as the source wrote it
would strip: Last Orders Shuffle

## Rejected seeds

- 801925: harsh: 3.2% above 6 kHz
- 700925: superseded by the #443 render

## Measured now, on the shipped file (gate profile mellow: the station's default, not what this track was made against)

| gate | measured | limit | passed |
|---|---|---|---|
| tempo | 92 bpm vs asked 93 | within 4 bpm, folds 0.5 / 2 / 4:3 / 3:4 allowed | yes |
| loudness | -16.9 LUFS as shipped | -16 LUFS within 1 dB | yes |
| peak | -2.00 dBFS decoded | under -1 dBFS | yes |
| silence | longest 0.15 s under -50 dBFS | under 0.5 s | yes |
| brightness | 1.22 % of power above 6 kHz | under 2.5 % (mellow) | yes |
| boominess | 13.68 % below 60 Hz | under 12 % | **NO** |
| onset rate | 3.98 per second | 0.3 to 4.5 | yes |
| loop seam | step 1.57x, tail-head +0.6 dB | step under 4.0x, level within 5.0 dB | yes |

## Checks

not passed against the station's profile: boominess. Reported, not a reason to leave it out: this track shipped before the station existed.

## Backfill

- audio: stream-copied (already 128 kbps CBR), tags stripped
- recipe: `reproducible: false`. The seed and the prompt are recorded; the planner model's audio codes were never kept, so a re-render from them may differ. `recipe_render.py` refuses it.
