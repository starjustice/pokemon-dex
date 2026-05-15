## Context

The grid currently fetches Pokemon sequentially (`/pokemon?limit=40&offset=N`), appends to `allPokemon` state, and filters client-side via `useMemo`. This means filters only work against whatever is loaded. PokeAPI provides endpoints that return complete filtered lists:

- `/type/{name}` → all Pokemon of that type (names + URLs, no detail)
- `/generation/{id}` → all species in that generation (names + URLs)
- `/pokemon?limit=1025` → all 1025 Pokemon names + URLs (~30KB, no detail)

These return lightweight ID lists. The expensive call is fetching individual Pokemon details (sprites, types, stats). The strategy: use the lightweight endpoints to build filtered ID sets, then paginate detail fetches only for the filtered results.

## Goals / Non-Goals

**Goals:**
- Filters return correct, complete results from the first page — no false "No Pokemon found"
- Infinite scroll paginates through filtered results, not just sequential dex order
- No "load all" button or background mass-fetching required
- Unchanged behavior when no filters are active (standard paginated fetch)
- Combine multiple filters at the API level (type AND generation AND search)

**Non-Goals:**
- Building a custom backend or proxy API
- Caching API responses across sessions (in-memory per-session caching is fine)
- Changing any visual design or component structure

## Decisions

1. **Filtered fetch pipeline**: When filters are active, the grid calls a new `fetchFilteredPokemonIds(filters)` function that:
   a. **Type filter**: For each selected type, fetches `/type/{name}`, extracts Pokemon IDs (parsed from URL). Takes the union (OR) of all type results.
   b. **Generation filter**: Filters by static `GENERATION_RANGES` (no API call needed).
   c. **Search**: Fetches `/pokemon?limit=1025` once (cached in a module variable), then filters the name list by search term.
   d. **Intersection**: AND all active filter sets to get the final filtered ID list.
   e. Returns a sorted array of Pokemon IDs that match all active filters.

2. **Paginated detail fetch against filtered IDs**: The grid takes the filtered ID list and fetches details in pages of 40. Page 1 = IDs[0..39], page 2 = IDs[40..79], etc. Each page fetches `/pokemon/{id}` in parallel for those 40 IDs.

3. **State management**: `PokemonGrid` maintains:
   - `filteredIds: number[] | null` — null when no filter active (use standard pagination), array of IDs when filters are active
   - `filteredPokemon: Pokemon[]` — detail-fetched results for the current filtered view
   - `filteredPage: number` — which page of filtered results we've loaded to
   - The existing `allPokemon` / `nextOffset` / `hasMore` state remains for the unfiltered infinite scroll

4. **Module-level cache for name list**: The `/pokemon?limit=1025` response (all names) is fetched once and stored in a module-level variable. Subsequent search queries filter this cached list without re-fetching.

5. **Module-level cache for type lists**: Each `/type/{name}` response is cached in a `Map<string, number[]>` so selecting the same type again doesn't re-fetch.

6. **Mega form handling in filtered view**: When filters are active, after resolving filtered base IDs, also include mega form IDs for any base ID that has megas (via existing `MEGA_MAP`). Filter the mega forms by the active type filter to avoid showing irrelevant megas.

7. **Transition between filtered and unfiltered**: When the last filter is cleared, the grid switches back to the standard `allPokemon` view (already loaded pages). The `filteredIds` state resets to `null`.

```
FLOW DIAGRAM
════════════

No filters active:
  /pokemon?limit=40&offset=0  →  page 1 details  →  render
  /pokemon?limit=40&offset=40 →  page 2 details  →  append + render
  ... (infinite scroll)

Filters active (e.g. type=Fighting, gen=Gen I):
  /type/fighting              →  [56, 57, 62, 66, 67, 68, 106, 107...]  (109 IDs)
  ∩ Gen I range [1..151]      →  [56, 57, 62, 66, 67, 68, 106, 107]    (8 IDs)
  
  Page 1: fetch /pokemon/56, /pokemon/57, ... /pokemon/107  (8 details, all in one page)
  → render 8 Fighting/Gen I Pokemon immediately ✓
```

## Risks / Trade-offs

- **Extra API call per filter activation**: One call to `/type/{name}` per selected type. These are lightweight (~5KB each) and cached per session. Acceptable.
- **Search requires full name list**: First search triggers a ~30KB fetch of all 1025 names. Cached after that. Comparable to loading one page of detail data.
- **Complexity increase in PokemonGrid**: Two code paths (filtered vs unfiltered). Mitigated by keeping them clearly separated in state and conditionals.
- **Race conditions**: If user changes filter while a previous filter fetch is in flight, the old results could overwrite the new ones. Mitigated by using a request counter/abort controller — only the latest filter request's results are applied.
