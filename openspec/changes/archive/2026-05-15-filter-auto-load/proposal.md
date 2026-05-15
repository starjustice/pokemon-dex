## Why

Filtering or searching while only a partial set of Pokemon is loaded produces misleading "No Pokemon found" results. For example, selecting the "Fighting" type with only 46 of 1025 Pokemon loaded shows 0 results — not because no Fighting-type Pokemon exist, but because none of the first 46 happen to be Fighting-type. The existing "Load all Pokemon for complete results" button puts the burden on the user to know they need to click it first. This is confusing and makes the filter feature feel broken.

The root cause is architectural: the grid fetches Pokemon in pages of 40 and applies filters only against loaded data. The fix must happen at the data-fetching level, not as a UI workaround.

## What Changes

- Use PokeAPI's server-side endpoints to build filtered ID sets before fetching Pokemon details:
  - **Type filter**: `/type/{name}` returns all Pokemon of that type (complete list of IDs)
  - **Generation filter**: static `GENERATION_RANGES` already provides ID boundaries
  - **Search by name**: `/pokemon?limit=1025&offset=0` returns a lightweight name-only list (~30KB) that can be filtered by name
- Combine these filtered ID sets (AND logic for type+gen+search), then paginate detail fetches against the filtered list
- Infinite scroll works against the filtered set: page 1 shows the first 40 filtered results, page 2 shows the next 40, etc.
- When no filters are active, behavior is unchanged (standard paginated fetch)
- Add a new `fetchFilteredPokemonIds()` function in `lib/pokemon.ts` that returns filtered+sorted Pokemon IDs
- Remove the manual "Load all Pokemon for complete results" button
- Remove the `loadAllPokemon` function — no longer needed

## Capabilities

### New Capabilities
- (none)

### Modified Capabilities
- `pokemon-search-filter`: Filter logic moves from client-side filtering of loaded data to API-driven ID resolution + paginated detail fetch. Results are always complete from the first page.
- `infinite-scroll`: Infinite scroll now paginates through a filtered ID list when filters are active, not just sequential offsets.

## Impact

- **Modified files**: `lib/pokemon.ts` (new fetch functions), `components/PokemonGrid.tsx` (filter-driven data flow)
- **New API calls**: 1 call to `/type/{name}` per selected type, 1 call to `/pokemon?limit=1025` for search (cached after first call)
- **Removed**: `loadAllPokemon()` function, manual "Load all" button
- **No breaking changes** to types, components, or routes
