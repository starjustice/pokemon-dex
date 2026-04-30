## Why

The Pokemon Dex currently only shows summary info on cards in a grid. Users have no way to see deeper details like evolution chains (with conditions), full ability descriptions, base stats, or in-game encounter locations. A detail page is essential for a Pokemon encyclopedia to be useful beyond browsing.

## What Changes

- Add a dynamic route `/pokemon/[id]` that shows a full detail page when a user clicks a Pokemon card
- Display: large artwork, base stats (HP, Attack, etc.), evolution chain with visual flow and evolution conditions (level, item, trade, etc.), all abilities with descriptions, encounter locations by game version, flavor text/Pokedex entry, physical measurements (height/weight)
- Make Pokemon cards clickable (link to detail page)
- Add a back button to return to the grid
- Fetch data from PokeAPI: `/pokemon/{id}`, `/pokemon-species/{id}`, `/evolution-chain/{id}`, `/ability/{id}`, `/pokemon/{id}/encounters`

## Capabilities

### New Capabilities
- `pokemon-detail`: Full detail page showing evolution chain, abilities, base stats, encounters, and physical info for a single Pokemon

### Modified Capabilities
- `pokemon-card-list`: Cards become clickable links navigating to the detail page

## Impact

- **`app/pokemon/[id]/page.tsx`**: New dynamic route (Server Component)
- **`app/pokemon/[id]/loading.tsx`**: Loading skeleton for detail page
- **`components/PokemonCard.tsx`**: Wrap card in `<Link>` to detail page
- **`lib/pokemon.ts`**: Add functions to fetch species, evolution chain, abilities, encounters
- **No breaking changes** to existing grid functionality
