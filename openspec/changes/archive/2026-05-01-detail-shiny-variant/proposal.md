## Why

The Pokemon detail page currently shows the regular and back sprites but has no way to view shiny variants. Shiny sprites are one of the most sought-after visual elements for Pokemon fans — PokeAPI already provides them via `sprites.front_shiny` and `sprites.other['official-artwork'].front_shiny`. Adding a toggle to switch between normal and shiny artwork on the detail page hero section gives users a quick way to see what the shiny form looks like.

## What Changes

- Add a "Shiny" toggle button in the detail page hero section (next to the existing image)
- When toggled, swap the hero artwork from the normal official artwork to the shiny official artwork
- The HeroImage component (zoom modal) should also reflect the shiny/normal state, showing the shiny front and shiny back sprites when in shiny mode
- Fetch `front_shiny` and `other['official-artwork'].front_shiny` from PokeAPI for both base and mega detail pages
- The animated sprite (Showdown GIF) should also swap to its shiny variant when in shiny mode

## Capabilities

### New Capabilities
- `detail-shiny-toggle`: A toggle on the detail page hero to switch between normal and shiny Pokemon artwork, including the zoom modal and animated sprite.

### Modified Capabilities
- `pokemon-detail`: Extend `PokemonDetail` with shiny image URLs (`shinyImage`, `shinyBackImage`, `shinyAnimatedSprite`).

## Impact

- **Data fetching** (`lib/pokemon.ts`): `fetchPokemonDetail` and `fetchMegaDetail` must extract shiny sprite URLs from the existing PokeAPI response (no extra API calls).
- **Types** (`lib/pokemon.ts`): `PokemonDetail` gains `shinyImage`, `shinyBackImage`, `shinyAnimatedSprite` fields.
- **Detail pages** (`app/pokemon/[id]/page.tsx`, `app/pokemon/mega/[name]/page.tsx`): Hero section needs a client-side toggle to swap image sources.
- **Components**: `HeroImage.tsx` needs shiny front/back props; `AnimatedSprite.tsx` needs a shiny src prop.
