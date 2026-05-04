## Why

Mega evolutions are currently only visible on a base Pokemon's detail page. Users who want to browse or compare mega forms have no way to discover them from the grid. Showing mega forms as distinct cards in the grid — with their own detail pages — makes them first-class citizens in the Pokedex.

## What Changes

- Fetch mega form data (IDs 10000+) from PokeAPI for all 46 mega-capable Pokemon and insert them as separate cards in the grid, positioned immediately after their base form.
- Mega cards get a distinct visual treatment: purple gradient border/glow to differentiate them from regular cards.
- Each mega card links to a dedicated detail page at `/pokemon/mega/[name]` (e.g., `/pokemon/mega/charizard-x`) with full stats, types, abilities, and artwork.
- The existing "Has Mega" filter toggle now also controls visibility of these mega cards in the grid.
- Update `PokemonGrid` to handle mixed base + mega Pokemon in the list, search, and filter logic.

## Capabilities

### New Capabilities
- `mega-grid-cards`: Mega evolution cards displayed in the home grid with distinct styling, sorted after their base form.
- `mega-detail-page`: Dedicated detail pages for mega evolutions at `/pokemon/mega/[name]` with full Pokemon detail (stats, types, abilities, artwork).

### Modified Capabilities
- `pokemon-search-filter`: Search and filter logic must include mega forms (searchable by name, filterable by type/generation of base form).
- `pokemon-card-list`: Grid must support interleaving mega cards after their base form.

## Impact

- **Data fetching** (`lib/pokemon.ts`): New fetch functions for mega form data from PokeAPI `/pokemon/<mega-id>` endpoints.
- **Grid component** (`components/PokemonGrid.tsx`): Must merge base + mega Pokemon, update filter/search logic.
- **Card component** (`components/PokemonCard.tsx`): Needs variant styling for mega cards (purple border/glow).
- **Routing** (`app/pokemon/mega/[name]/page.tsx`): New dynamic route for mega detail pages.
- **Cache** (`lib/pokemon-cache.ts`): Cache type must accommodate mega Pokemon in the list.
- **Types** (`lib/pokemon.ts`): `Pokemon` type may need a `isMega` / `basePokemonId` field to distinguish mega entries.
