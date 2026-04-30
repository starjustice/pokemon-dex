## Why

The current data fetching makes 1025 individual HTTP requests to PokeAPI on every page load (one per Pokemon for types, abilities, and sprites). Even with batched concurrency, this takes ~40 seconds. Users see a skeleton for far too long, and the page is essentially unusable during this time.

## What Changes

- Replace the "fetch all 1025 Pokemon at once" approach with paginated fetching — load ~20-40 Pokemon at a time
- Initial page load fetches only the first page of Pokemon (fast, just 20-40 API calls)
- Add infinite scroll: when the user scrolls near the bottom, automatically fetch and append the next page
- Show a loading spinner at the bottom while the next page is being fetched
- Search and type/generation filters now work on the loaded data, with the ability to load more results as user scrolls
- Server-side initial page fetch + client-side pagination for subsequent pages

## Capabilities

### New Capabilities
- `infinite-scroll`: Infinite scroll pagination that loads more Pokemon as the user scrolls near the bottom of the page

### Modified Capabilities
- `pokemon-card-list`: Data fetching changes from loading all 1025 Pokemon at once to paginated loading with initial server-side fetch + client-side infinite scroll
- `pokemon-search-filter`: Search and filters work on currently loaded data. When filters are active, fetches are optimized to load filtered results

## Impact

- `lib/pokemon.ts` — Replace `fetchAllPokemon()` with `fetchPokemonPage()` that fetches a single page of Pokemon
- `components/PokemonGrid.tsx` — Add infinite scroll logic with intersection observer
- `components/SearchBar.tsx` / `components/FilterPanel.tsx` — Filters work on loaded data; may trigger full dataset load for accurate filtering
- `app/page.tsx` — Fetch only first page server-side
- No new dependencies (using native IntersectionObserver API)
