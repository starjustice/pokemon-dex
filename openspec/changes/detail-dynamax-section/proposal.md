## Why

The detail page currently shows Mega Evolutions and Shiny forms but has no Dynamax/Gigantamax information. Dynamax is a core Gen 8 (Sword/Shield) mechanic — 34 Pokemon have unique Gigantamax forms with distinct artwork. Adding a Dynamax section completes the "battle form" coverage alongside the existing Mega section. PokeAPI has Gigantamax form data (artwork, types, height/weight) and Max Move data (19 type-based moves + Max Guard) that can be displayed without extra dependencies.

## What Changes

- Add a static map of the 34 Gigantamax-capable Pokemon (base ID → gmax form name) similar to the existing `MEGA_MAP`
- Add a `fetchGmaxDetail` function to retrieve Gigantamax form data from PokeAPI
- Add Gigantamax fields to `PokemonDetail` (gmax artwork, gmax form name, whether the Pokemon can Gigantamax)
- Create a `DynamaxSection` component that shows:
  - Gigantamax artwork (if the Pokemon has a G-Max form) with a red/pink Dynamax-themed border
  - The Pokemon's Max Moves derived from its types (every type maps to one specific Max Move)
  - The exclusive G-Max Move name and description for Gigantamax Pokemon (stored as static data since PokeAPI doesn't have G-Max moves as separate entries)
- Integrate the section into both `app/pokemon/[id]/page.tsx` and `app/pokemon/mega/[name]/page.tsx` detail pages

## Capabilities

### New Capabilities
- `detail-dynamax-section`: Dynamax/Gigantamax display on Pokemon detail pages — G-Max artwork, Max Moves by type, and G-Max exclusive move info

### Modified Capabilities
- `pokemon-detail`: PokemonDetail interface gains Gigantamax fields; detail page renders the new Dynamax section

## Impact

- **New files**: `lib/gmax-ids.ts` (static G-Max map + G-Max move data), `components/DynamaxSection.tsx`
- **Modified files**: `lib/pokemon.ts` (PokemonDetail type + fetchPokemonDetail + fetchMegaDetail), `app/pokemon/[id]/page.tsx`, `app/pokemon/mega/[name]/page.tsx`
- **API calls**: One additional PokeAPI fetch per detail page load for G-Max capable Pokemon only (to get G-Max form artwork). Non-G-Max Pokemon have zero extra calls.
- **No breaking changes**
