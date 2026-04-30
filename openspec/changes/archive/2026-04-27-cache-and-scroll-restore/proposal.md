## Why

When users navigate to a Pokemon detail page and press back, the home page remounts from scratch — showing only the first 40 Pokemon with a loading state. All previously loaded pages, filter state, and scroll position are lost. This creates a poor browsing experience, especially after scrolling through hundreds of Pokemon.

## What Changes

- Cache loaded Pokemon data, pagination state, and filter state in a client-side store that persists across navigations
- Save and restore scroll position when returning to the home page
- Eliminate the re-fetch/loading flash on back navigation

## Capabilities

### New Capabilities
- `list-state-cache`: Client-side caching of Pokemon list data, pagination offset, and filter state across navigations

### Modified Capabilities
- `infinite-scroll`: Scroll position is saved before navigation and restored on return

## Impact

- `components/PokemonGrid.tsx` — use cached state instead of always resetting to initialPokemon
- New `lib/pokemon-cache.ts` — module-level cache store (simple module singleton, no external deps)
- `components/PokemonCard.tsx` — no changes needed (already uses Link)
