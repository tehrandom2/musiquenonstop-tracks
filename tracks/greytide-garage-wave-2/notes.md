# Drummer Is Late (wave)

- **slug:** greytide-garage-wave-2
- **idea:** slacker garage-band groove with fuzzy bass, wobbly organ and tremolo guitar
- **mood:** the wave phase
- **bpm:** 85 (asked) / 84 (measured now, folded into 70-140)
- **key:** A minor (as the source recorded it)
- **seed:** 802125
- **model:** ACE-Step 1.5 (acestep-v15-turbo, LM acestep-5Hz-lm-1.7B)
- **tier:** fast   **duration:** 92.3 s as shipped
- **date:** 2026-10-06 (the original render date)
- **rendered_at:** 2026-10-06T12:00:00-04:00 (that date at 12:00 local: no time of day was recorded)
- **project:** greytide
- **backfill:** true (imported from an earlier soundtrack; it is never new)
- **licence:** generated locally from a text prompt, no samples or reference audio, no third-party rights claimed

## Why

I did not render this one for the station: it was made on 2026-10-06 for an earlier tabletop game soundtrack, and I have brought it in under that date, so it is not new. The ask was "slacker garage-band groove with fuzzy bass, wobbly organ and tremolo guitar" (the wave phase): 85 bpm in A minor. The prompt describes laid back slacker garage-band groove with cardboard-box kick, tambourine and cowbell as a drum kit and wobbly cheap organ and tremolo guitar through a small amp used as instruments; I have not heard it, and the numbers below were measured now, on the file as it shipped.

## Prompt

> Laid back slacker garage-band groove, cardboard-box kick, tambourine and cowbell as a drum kit, wobbly cheap organ and tremolo guitar through a small amp used as instruments, fuzzy round bass, dusty drum machine played behind the beat, charmingly not very good, friendly, no shredding, good-humoured, 85 bpm, a wobbly cheap organ riff and a tambourine, the same groove with a little more drive and bounce, steady loopable arrangement, instrumental, no vocals, no singing, no speech, no drops, no wobble bass, no build-ups, no aggressive drums, no sub bass, light thin low end, bass in the mid range only

No lyrics recorded: instrumental.

## Request filter

run on import over the title, idea, prompt and every lyric line; the text above is as the source wrote it
would strip: Drummer Is Late

## Rejected seeds

- 801125: harsh: 5.0% above 6 kHz
- 701125: superseded by the #443 render

## Measured now, on the shipped file (gate profile mellow: the station's default, not what this track was made against)

| gate | measured | limit | passed |
|---|---|---|---|
| tempo | 84 bpm vs asked 85 | within 4 bpm, folds 0.5 / 2 / 4:3 / 3:4 allowed | yes |
| loudness | -16.4 LUFS as shipped | -16 LUFS within 1 dB | yes |
| peak | -1.86 dBFS decoded | under -1 dBFS | yes |
| silence | longest 0.60 s under -50 dBFS | under 0.5 s | **NO** |
| brightness | 0.81 % of power above 6 kHz | under 2.5 % (mellow) | yes |
| boominess | 8.18 % below 60 Hz | under 12 % | yes |
| onset rate | 2.89 per second | 0.3 to 4.5 | yes |
| loop seam | step 0.00x, tail-head -39.4 dB | step under 4.0x, level within 5.0 dB | **NO** |

## Checks

not passed against the station's profile: silence, loop seam. Reported, not a reason to leave it out: this track shipped before the station existed.

## Backfill

- audio: stream-copied (already 128 kbps CBR), tags stripped
- recipe: `reproducible: false`. The seed and the prompt are recorded; the planner model's audio codes were never kept, so a re-render from them may differ. `recipe_render.py` refuses it.
