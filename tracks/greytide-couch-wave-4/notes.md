# Sitcom Laugh Track Lounge (wave)

- **slug:** greytide-couch-wave-4
- **idea:** daytime-television muzak gone sour
- **mood:** the wave phase
- **bpm:** 99 (asked) / 131 (measured now, folded into 70-140)
- **key:** G major (as the source recorded it)
- **seed:** 801545
- **model:** ACE-Step 1.5 (acestep-v15-turbo, LM acestep-5Hz-lm-1.7B)
- **tier:** fast   **duration:** 91.1 s as shipped
- **date:** 2026-10-06 (the original render date)
- **rendered_at:** 2026-10-06T12:00:00-04:00 (that date at 12:00 local: no time of day was recorded)
- **project:** greytide
- **backfill:** true (imported from an earlier soundtrack; it is never new)
- **licence:** generated locally from a text prompt, no samples or reference audio, no third-party rights claimed

## Why

I did not render this one for the station: it was made on 2026-10-06 for an earlier tabletop game soundtrack, and I have brought it in under that date, so it is not new. The ask was "daytime-television muzak gone sour" (the wave phase): 99 bpm in G major. The prompt describes laid back daytime-television muzak gone slightly sour with remote-button clicks and cushion pats as a drum kit, smooth electric piano and cheesy saxophone-like synth used as an instrument; I have not heard it, and the numbers below were measured now, on the file as it shipped.

## Prompt

> Laid back daytime-television muzak gone slightly sour, remote-button clicks and cushion pats as a drum kit, smooth electric piano, cheesy saxophone-like synth used as an instrument, game-show melody drifting out of tune, fuzzy round bass, dusty brushed drum machine, sofa daydream, warm and tired and good-humoured, 99 bpm, tinny glockenspiel and a smooth bass, the same groove with a little more drive and bounce, steady loopable arrangement, instrumental, no vocals, no singing, no speech, no drops, no wobble bass, no build-ups, no aggressive drums, no sub bass, light thin low end, bass in the mid range only

No lyrics recorded: instrumental.

## Request filter

run on import over the title, idea, prompt and every lyric line; the text above is as the source wrote it
would strip: Sitcom Laugh Track Lounge

## Rejected seeds

- 800545: not kept
- 700545: superseded by the #443 render

## Measured now, on the shipped file (gate profile mellow: the station's default, not what this track was made against)

| gate | measured | limit | passed |
|---|---|---|---|
| tempo | 131 bpm vs asked 99 | within 4 bpm, folds 0.5 / 2 / 4:3 / 3:4 allowed | yes |
| loudness | -18.1 LUFS as shipped | -16 LUFS within 1 dB | **NO** |
| peak | -1.98 dBFS decoded | under -1 dBFS | yes |
| silence | longest 0.20 s under -50 dBFS | under 0.5 s | yes |
| brightness | 2.59 % of power above 6 kHz | under 2.5 % (mellow) | **NO** |
| boominess | 9.75 % below 60 Hz | under 12 % | yes |
| onset rate | 2.77 per second | 0.3 to 4.5 | yes |
| loop seam | step 0.41x, tail-head +1.3 dB | step under 4.0x, level within 5.0 dB | yes |

## Checks

not passed against the station's profile: loudness, brightness. Reported, not a reason to leave it out: this track shipped before the station existed.

## Backfill

- audio: stream-copied (already 128 kbps CBR), tags stripped
- recipe: `reproducible: false`. The seed and the prompt are recorded; the planner model's audio codes were never kept, so a re-render from them may differ. `recipe_render.py` refuses it.
