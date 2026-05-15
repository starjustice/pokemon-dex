## 1. API Fetch Functions

- [x] 1.1 In `lib/pokemon.ts`, add a module-level `let pokemonNameCache: { id: number; name: string }[] | null = null` for caching the full name list
- [x] 1.2 In `lib/pokemon.ts`, add a module-level `const typeIdCache = new Map<string, number[]>()` for caching type → Pokemon ID lookups
- [x] 1.3 Create `fetchAllPokemonNames(): Promise<{ id: number; name: string }[]>` that fetches `/pokemon?limit=1025` and returns an array of `{ id, name }` (parsed from URL for id). Cache in `pokemonNameCache` after first call.
- [x] 1.4 Create `fetchPokemonIdsByType(type: string): Promise<number[]>` that fetches `/type/{name}`, extracts Pokemon IDs (parse from URL, filter to ≤ 1025), caches in `typeIdCache`, and returns sorted ID array
- [x] 1.5 Create `fetchFilteredPokemonIds(filters: { types: string[]; generation: string; search: string }): Promise<number[]>` that: (a) if types set → fetch each type's IDs, take union (OR); (b) if generation set → compute ID range from GENERATION_RANGES; (c) if search set → fetch all names, filter by search term; (d) intersect all active filter sets (AND); (e) return sorted array of matching IDs
- [x] 1.6 Create `fetchPokemonByIds(ids: number[]): Promise<Pokemon[]>` that fetches `/pokemon/{id}` for each ID in parallel, parses into `Pokemon[]`, and returns sorted results

## 2. PokemonGrid State Refactor

- [x] 2.1 Add new state: `filteredIds: number[] | null` (null = no filter active), `filteredPokemon: Pokemon[]`, `filteredPage: number`, `filteredTotal: number`, `isFilterLoading: boolean`
- [x] 2.2 Add a request counter ref `filterRequestId` to handle race conditions (only apply results from the latest filter request)
- [x] 2.3 Add a `useEffect` that watches `search`, `selectedTypes`, `selectedGeneration`, `hasMega`: when any filter is active, call `fetchFilteredPokemonIds()` to get the filtered ID list, then fetch the first page of details. Increment `filterRequestId` on each call; discard stale results.
- [x] 2.4 When filters are cleared (all empty), reset `filteredIds` to `null` and show the standard `allPokemon` view

## 3. Filtered Infinite Scroll

- [x] 3.1 Update `LoadMoreTrigger` usage: when `filteredIds` is not null, use a filtered `fetchNextPage` that takes the next slice of `filteredIds` and fetches their details, appending to `filteredPokemon`
- [x] 3.2 Show `LoadMoreTrigger` in filtered mode when `filteredPokemon.length < filteredTotal`

## 4. Mega Form Handling in Filtered View

- [x] 4.1 In `fetchFilteredPokemonIds`, after computing the base ID set, also include mega form IDs from `MEGA_MAP` for any base ID in the set
- [x] 4.2 When `hasMega` filter is active, filter the ID set to only include IDs present in `MEGA_IDS` (bases) and their mega forms

## 5. UI Cleanup

- [x] 5.1 Remove the manual "Load all Pokemon for complete results" `<button>` block
- [x] 5.2 Remove the `loadAllPokemon` function
- [x] 5.3 Update the results count to show "Showing X of Y" where Y is `filteredTotal` (total matching count), not loaded count
- [x] 5.4 When `isFilterLoading` is true (filter IDs being resolved), show a loading skeleton or spinner in place of the grid
- [x] 5.5 When `filteredIds` is not null and `filteredIds.length === 0` (no matches after API resolution), show the "No Pokemon found" empty state

## 6. Verification

- [x] 6.1 Run `npm run build` and confirm zero type errors
- [x] 6.2 Verify: select "Fighting" type with initial page loaded → Fighting Pokemon appear immediately without needing "Load all"
- [x] 6.3 Verify: select "Fighting" + Gen I → shows only Gen I Fighting Pokemon (Mankey, Primeape, Poliwrath, Machop, Machoke, Machamp, Hitmonlee, Hitmonchan)
- [x] 6.4 Verify: search "char" → shows Charmander, Charmeleon, Charizard + megas immediately
- [x] 6.5 Verify: clear all filters → returns to normal infinite scroll pagination
