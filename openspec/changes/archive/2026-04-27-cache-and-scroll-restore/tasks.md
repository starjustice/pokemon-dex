## 1. Create Cache Module

- [x] 1.1 Create `lib/pokemon-cache.ts` with a module-level singleton storing `{ pokemon, nextOffset, hasMore, scrollY, search, selectedTypes, selectedGeneration }`. Export `getCache()`, `setCache(partial)`, and `clearCache()` functions.

## 2. Integrate Cache in PokemonGrid

- [x] 2.1 On mount in `PokemonGrid`, read from cache. If cache has data, use it instead of `initialPokemon`/`initialHasMore`/`initialNextOffset` for initial state. Also restore search, selectedTypes, selectedGeneration from cache.
- [x] 2.2 Update cache whenever `allPokemon`, `nextOffset`, `hasMore`, or filter state changes (use `useEffect` to sync state to cache).

## 3. Scroll Position Save/Restore

- [x] 3.1 Add a throttled scroll listener in PokemonGrid that saves `window.scrollY` to cache on scroll events.
- [x] 3.2 On mount, if cache exists, restore scroll position using `requestAnimationFrame` after initial render.

## 4. Verify

- [x] 4.1 Run build and confirm no errors.
