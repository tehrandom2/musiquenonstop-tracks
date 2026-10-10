# Re-render a musiquenonstop take on your own machine

Every published track has a `recipe.json` next to its MP3. With ACE-Step 1.5 installed you can render the same take.

## 1. Install ACE-Step 1.5

Clone ACE-Step 1.5 and set it up as its own README says (a CUDA PyTorch environment, Python 3.11 works). Download the
checkpoints the recipe names into `<checkout>/checkpoints/`: the `model.dit_config` folder (for example
`acestep-v15-turbo` or `acestep-v15-xl-sft`) and the `model.lm` folder (`acestep-5Hz-lm-1.7B` or `acestep-5Hz-lm-4B`),
plus the shared `vae` and text-encoder folders the ACE-Step downloader fetches. The 4B pair wants a 16 GB card with CPU
offload (the recipe's `offload_to_cpu` says so).

## 2. Run the script

```
python recipe_render.py recipe.json --ace-dir <your ACE-Step checkout> --out take.wav --mp3 take.mp3
```

It needs only the ACE-Step package (taken from `--ace-dir`), numpy, scipy and soundfile (all part of an ACE-Step
environment), and `ffmpeg` if you ask for `--mp3`. It prints the duration and peak of the rendered take next to the
values the recipe expects.

## 3. What to expect

A take is the seed, the settings, the caption the music model was given and the planner model's audio codes. The recipe
carries all four (`audio_codes`, `dit_caption`), so the script runs the music model alone and needs no planner model: same
recipe, same audio. (A seed alone is not enough: the planner samples its codes with its own randomness, so re-rendering
only the caption and seed gives a different song in the same style.) Another GPU or driver stack can drift a little, so
compare duration and peak, not bytes; on the machine that made the take the re-render matched the installed file to a
correlation of 0.99998. The post-processing
(resample to 44.1 kHz, trim, 3 s loop crossfade, 60 Hz high-pass, one gain, soft limiter, MP3 128k CBR) is in the
recipe's `post` block and is applied exactly as published. Change the seed to get a different take of the same prompt.

Licence: generated locally from a text prompt, no samples or reference audio, no third-party rights claimed.
