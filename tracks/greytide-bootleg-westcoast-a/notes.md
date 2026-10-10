# PRIMED, WASHED, DRY-BRUSHED

- **slug:** greytide-bootleg-westcoast-a
- **idea:** modern West Coast rap with a signature piano loop and a chanted hook (original words)
- **mood:** the title tune
- **bpm:** 102 (asked) / 136 (measured now, folded into 70-140)
- **key:** A minor (as the source recorded it)
- **seed:** 581004
- **model:** ACE-Step 1.5 (acestep-v15-turbo, LM acestep-5Hz-lm-1.7B)
- **tier:** fast   **duration:** 104.3 s as shipped
- **date:** 2026-10-06 (the original render date)
- **rendered_at:** 2026-10-06T12:00:00-04:00 (that date at 12:00 local: no time of day was recorded)
- **project:** greytide
- **backfill:** true (imported from an earlier soundtrack; it is never new)
- **licence:** generated locally from a text prompt, no samples or reference audio, no third-party rights claimed

## Why

I did not render this one for the station: it was made on 2026-10-06 for an earlier tabletop game soundtrack, and I have brought it in under that date, so it is not new. The ask was "modern West Coast rap with a signature piano loop and a chanted hook (original words)" (the title tune): 102 bpm in A minor, with a voice singing words written for it. The prompt describes modern West Coast hip-hop with a round sub-bass 808 that slides, sparse claps and hi-hats with a swung bounce and a hand clap on the backbeat; I have not heard it, and the numbers below were measured now, on the file as it shipped.

## Prompt

> Modern West Coast hip-hop, 102 bpm, a minimal bouncy beat built on one signature loop: a staccato two-note piano stab on the upbeat, a round sub-bass 808 that slides, sparse claps and hi-hats with a swung bounce, a hand clap on the backbeat, a short vocal chop as a texture, a male rapper with a sharp nasal-forward tone, confident and playful, pocketed tight to the beat, a laid-back half-time flow in the verses and a fast double-time run before each hook, internal rhymes, the hook chanted by a small group with the lead on top in call and response, an intro of the loop alone for two bars, a breakdown with the beat dropped to claps under the end of the second verse, then the final hook twice, clean dry mix with a short room on the vocal, loopable

## Lyrics (original, written for this track by the project; the model was given only these words)

4 name(s) of invented characters from the earlier game are shown as [name]; the model was given them.

```
[Intro - the piano loop alone for two bars]
Ayy. Grey plastic. Grey plastic.

[Hook - chanted by a small group with the lead on top, call and response]
They not painted like us, not painted like us
Came out the box in a grey kind of fuss
Sprue on the ankle and a seam on the cheek
We been primed, we been washed, we been dry-brushed all week

[Verse 1 - laid-back half-time flow]
Twenty on the tray and they march in a line
Base coat, wash, then I varnish them fine
Ballista on the ridge got a pin in the spine
Cannon count a crowd like it's quarter past nine
[name] holding, hold up, hold your post
[name] slow 'em, cold, they ghost
[name] brother stick 'em to the board
Every grey dude get a hue he can't afford

[Verse 2 - fast double-time run]
I see 'em coming down the kitchen off the lazy Susan spinning
They thinning, I'm grinning, my minis in the middle of the winning
Night light glowing and the lightbox beaming, [name] gleaming
Wave nine, wave ten, the horde is screaming and I'm dreaming
Of a shelf where they sit, painted, finished, lit
Not a single one of 'em grey, not a bit

[Breakdown - the beat drops to claps only]
Not painted like us. (Grey plastic.) Not painted like us.

[Hook - chanted by a small group with the lead on top, call and response]
They not painted like us, not painted like us
Came out the box in a grey kind of fuss
Sprue on the ankle and a seam on the cheek
We been primed, we been washed, we been dry-brushed all week

[Hook - chanted by a small group with the lead on top, call and response]
They not painted like us, not painted like us
Came out the box in a grey kind of fuss
Sprue on the ankle and a seam on the cheek
We been primed, we been washed, we been dry-brushed all week
```

## Request filter

run on import over the title, idea, prompt and every lyric line; the text above is as the source wrote it
would strip: Modern West Coast, West Coast; lyrics: 4 name(s) elided, shown as [name]

## Rejected seeds

- 581001: thrown away at the time (no reason recorded)
- 581002: thrown away at the time (no reason recorded)
- 581003: thrown away at the time (no reason recorded)
- 581005: thrown away at the time (no reason recorded)
- 581006: thrown away at the time (no reason recorded)
- 581007: thrown away at the time (no reason recorded)
- 581008: thrown away at the time (no reason recorded)
- 581009: thrown away at the time (no reason recorded)
- 581010: thrown away at the time (no reason recorded)
- 581011: thrown away at the time (no reason recorded)
- 581012: thrown away at the time (no reason recorded)
- 581013: thrown away at the time (no reason recorded)
- 581014: thrown away at the time (no reason recorded)
- 581015: thrown away at the time (no reason recorded)

## Measured now, on the shipped file (gate profile mellow: the station's default, not what this track was made against)

| gate | measured | limit | passed |
|---|---|---|---|
| tempo | 136 bpm vs asked 102 | within 4 bpm, folds 0.5 / 2 / 4:3 / 3:4 allowed | yes |
| loudness | -16.9 LUFS as shipped | -16 LUFS within 1 dB | yes |
| peak | -3.09 dBFS decoded | under -1 dBFS | yes |
| silence | longest 0.20 s under -50 dBFS | under 0.5 s | yes |
| brightness | 3.55 % of power above 6 kHz | under 2.5 % (mellow) | **NO** |
| boominess | 8.75 % below 60 Hz | under 12 % | yes |
| onset rate | 3.11 per second | 0.3 to 4.5 | yes |
| loop seam | step 0.08x, tail-head +5.2 dB | step under 4.0x, level within 5.0 dB | **NO** |

## Checks

not passed against the station's profile: brightness, loop seam. Reported, not a reason to leave it out: this track shipped before the station existed.

## Backfill

- audio: stream-copied (already 128 kbps CBR), tags stripped
- recipe: `reproducible: false`. The seed and the prompt are recorded; the planner model's audio codes were never kept, so a re-render from them may differ. `recipe_render.py` refuses it.
