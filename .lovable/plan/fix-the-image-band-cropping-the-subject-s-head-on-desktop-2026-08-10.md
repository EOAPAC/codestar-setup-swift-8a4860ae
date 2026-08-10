Fix the image band cropping the subject's head on desktop

The full-bleed image band between the hero and "Why it matters" uses `object-position: center right` and a fixed desktop height of `460px`. Because the uploaded photo is a 1920×1080 landscape shot and the desktop band is very wide relative to its height, the current `center` vertical alignment crops the top of the frame — and the subject's head — out of view.

We will change only the desktop presentation of this single band in `src/routes/index.tsx`:

1. Keep the band full-bleed, the blue wash, and the left fade exactly as they are.
2. Increase the desktop height to give the image more vertical room (e.g., from `lg:h-[460px]` to `lg:h-[540px]`).
3. Change the vertical focal point on desktop so the head stays in frame: use `lg:object-[top_right]` while keeping `object-[center_right]` for tablet and below, so the seated subject remains visible on narrower screens.
4. Leave the mobile and tablet heights unchanged (`h-60 md:h-80`).
5. Verify the fix in the preview by checking the desktop band shows the full head and upper body of the subject.

This is a local styling change to the `ImageBand` component; no other sections, copy, or assets are touched.
