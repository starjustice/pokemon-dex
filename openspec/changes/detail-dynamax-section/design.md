## Context

The Pokemon detail page already displays Mega Evolutions (via `MegaEvolution.tsx` and `MEGA_MAP`), shiny forms (via `ShinyComparison.tsx`), and other battle data. Dynamax/Gigantamax is a Gen 8 mechanic where all Pokemon can Dynamax (grow huge, moves become Max Moves), and 34 specific Pokemon have unique Gigantamax forms with distinct artwork and an exclusive G-Max Move.

PokeAPI provides:
- **Gigantamax form data** at `pokemon/{name}-gmax` — artwork, types, height, weight (34 forms, IDs 10364–10397 for forms)
- **Max Moves** at `move/743, 757–774` — 19 type-based moves + Max Guard. Each move has a type, power, and flavor text describing its secondary effect
- **No G-Max exclusive moves** as API entries — these must be stored as static data

Current detail pages fetch `PokemonDetail` from `lib/pokemon.ts`. The pattern established by Mega Evolutions (static ID map + conditional fetch + dedicated component) will be reused.

## Goals / Non-Goals

**Goals:**
- Show Gigantamax artwork for the 34 Pokemon that have G-Max forms
- Display Max Moves relevant to the Pokemon's types (e.g., a Fire-type Pokemon → Max Flare)
- Show the exclusive G-Max Move name and effect for Gigantamax Pokemon
- Follow the same static-map pattern as `mega-ids.ts` to avoid unnecessary API calls
- Work on both base detail pages and mega detail pages

**Non-Goals:**
- Dynamax damage calculation or competitive analysis
- Showing all 19 Max Moves for every Pokemon (only type-relevant ones)
- Adding Gigantamax forms as separate cards in the grid (unlike Mega — Dynamax is a temporary battle state)
- Fetching G-Max move data from API (not available — use static data)

## Decisions

1. **Static G-Max map** (`lib/gmax-ids.ts`): A `GMAX_MAP: Record<number, string>` mapping base Pokemon ID → G-Max form name (e.g., `6 → "charizard-gmax"`). Also includes `GMAX_MOVES: Record<string, { name: string; type: string; effect: string }>` for the 34 exclusive G-Max Moves keyed by form name.

2. **Max Move type map** (`lib/gmax-ids.ts`): A `MAX_MOVES: Record<string, { name: string; power: number; effect: string }>` mapping type name → Max Move info. This is static data (19 entries) to avoid 19 API calls per page load.

3. **Data layer**: Add to `PokemonDetail`:
   - `canGmax: boolean` — whether this Pokemon has a Gigantamax form
   - `gmaxImage: string | null` — G-Max official artwork URL
   - `gmaxMove: { name: string; type: string; effect: string } | null` — exclusive G-Max Move

4. **Component**: `DynamaxSection.tsx` — Server component (no client state needed). Shows:
   - G-Max artwork with a red/pink Dynamax-themed card border (similar to Mega's purple border)
   - Max Moves for the Pokemon's types in a grid
   - G-Max exclusive move (if applicable) with a special highlight

5. **Conditional fetch**: `fetchPokemonDetail` checks `GMAX_MAP` for the base ID. If present, fetches `pokemon/{gmax-name}` for artwork. If not present, sets `canGmax: false` and skips the fetch entirely.

6. **Section placement**: Between Mega Evolution and Abilities sections on the detail page (or after Shiny if no Mega).

## Risks / Trade-offs

- **Static G-Max move data**: G-Max exclusive moves aren't in PokeAPI, so we hardcode 34 entries. If PokeAPI adds them later, we'd need to migrate. Low risk — this data hasn't changed since Gen 8 and won't.
- **Static Max Move data**: We hardcode 19 Max Move entries instead of fetching from API. Saves 19 network requests. The data is fixed and won't change.
- **Extra API call for G-Max Pokemon**: One fetch per G-Max-capable Pokemon detail page. Only 34 of 1025 Pokemon trigger this. Acceptable latency.
- **No G-Max in grid**: Unlike Mega forms, G-Max forms aren't shown as separate grid cards. This is intentional — Dynamax is a temporary battle state, not a permanent form.
