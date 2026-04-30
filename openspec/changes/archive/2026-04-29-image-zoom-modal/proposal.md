## Why

The Pokemon detail page hero image is small (192px) and users can't see fine details of the artwork. Users expect to click/tap an image to see it larger and inspect details. Many Pokemon also have distinct back sprites that aren't shown anywhere on the detail page.

## What Changes

- Clicking the hero Pokemon image opens a centered dialog (90vw mobile / 600px desktop) on a dimmed backdrop — not fullscreen
- Dialog shows the Pokemon's image with a Front/Back toggle (arrow buttons + label)
- Front view uses high-res official artwork; Back view uses PokeAPI `back_default` pixel sprite
- Scroll-to-zoom and pinch-to-zoom (1x-4x) within the image frame; pan when zoomed
- Switching front/back resets zoom and pan
- Close via X button, clicking backdrop, or pressing Escape

## Capabilities

### New Capabilities
- `image-zoom-modal`: Centered dialog with front/back sprite toggle and zoom/pan for Pokemon images

### Modified Capabilities
- `pokemon-detail-page`: extend `PokemonDetail` type with `backImage` field

## Impact

- `lib/pokemon.ts` — add `backImage: string | null` to `PokemonDetail`, populate from `sprites.back_default`
- New `components/ImageModal.tsx` — client component with dialog layout, front/back state, zoom/pan
- `components/HeroImage.tsx` — pass `backImage` through to modal
- `app/pokemon/[id]/page.tsx` — pass `pokemon.backImage` to HeroImage
- No external dependencies
