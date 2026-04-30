## 1. Add Back Sprite Data

- [x] 1.1 Update `PokemonDetail` type in `lib/pokemon.ts` to include `backImage: string | null`. Populate from `sprites.back_default` in `fetchPokemonDetail`.

## 2. Refactor ImageModal as Dialog

- [x] 2.1 Rewrite `components/ImageModal.tsx` to render as a centered card (90vw mobile, max 600px desktop) instead of fullscreen. Image area is a fixed-size square frame with `overflow: hidden`. Backdrop dims background.
- [x] 2.2 Add `frontSrc` + `backSrc` props. Internal state `view: 'front' | 'back'`. Render Front/Back label between left/right arrow buttons below the image. Clicking arrows or label-side toggles view.
- [x] 2.3 Reset zoom + pan when view changes. Hide toggle controls when `backSrc` is null/empty.
- [x] 2.4 Keep scroll/pinch zoom (1x-4x) and pan within frame. Update transforms to clip via frame's `overflow: hidden`.
- [x] 2.5 Keep close handlers: Escape, backdrop click (outside card), X button.

## 3. Wire Through Detail Page

- [x] 3.1 Update `HeroImage.tsx` to accept `frontSrc` + `backSrc` props and pass to ImageModal.
- [x] 3.2 Update `app/pokemon/[id]/page.tsx` to pass `pokemon.image` and `pokemon.backImage` to HeroImage.

## 4. Verify

- [x] 4.1 Run build and confirm no errors.
