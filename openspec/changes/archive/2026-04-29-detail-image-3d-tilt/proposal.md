## Why

The Pokemon detail page hero image is static — just a flat 2D artwork with a drop shadow. Adding a 3D tilt effect on hover/touch makes the page feel more interactive and polished, giving the Pokemon image depth and presence. Additionally, showing the animated Showdown sprite alongside the official artwork gives users more visual variety.

## What Changes

- Add a 3D perspective tilt effect to the hero Pokemon image that responds to mouse movement (desktop) and device tilt/touch (mobile)
- Add an animated sprite (from Showdown) below/beside the main artwork as a secondary image
- Add a subtle shine/glare overlay that moves with the tilt for a holographic card effect

## Capabilities

### New Capabilities
- `pokemon-image-3d-tilt`: Interactive 3D tilt effect on the detail page hero image with animated sprite

### Modified Capabilities
- (none)

## Impact

- New `components/TiltImage.tsx` — client component with mouse/touch tracking and CSS 3D transform
- `app/pokemon/[id]/page.tsx` — replace static Image with TiltImage component, add animated sprite
- `lib/pokemon.ts` — add animated sprite URL to PokemonDetail type
- No external dependencies — pure CSS transforms + JS mouse tracking
