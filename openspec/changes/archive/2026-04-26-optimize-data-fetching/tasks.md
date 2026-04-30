## 1. Paginated Data Fetching

- [x] 1.1 Rewrite `lib/pokemon.ts`: replace `fetchAllPokemon()` with `fetchPokemonPage(offset, limit)` that fetches a single page of Pokemon from PokeAPI (list + detail calls in parallel)
- [x] 1.2 Keep the existing types (`Pokemon`, `PokemonType`, etc.) and static generation lookup unchanged

## 2. Server-Side Initial Page

- [x] 2.1 Update `app/page.tsx` to fetch only the first page (~40 Pokemon) server-side and pass as initial data to the client component

## 3. Infinite Scroll

- [x] 3.1 Create `components/LoadMoreTrigger.tsx`: a sentinel div using IntersectionObserver that triggers a callback when it enters the viewport, with a loading spinner and error/retry state
- [x] 3.2 Update `PokemonGrid.tsx`: add state to accumulate pages, integrate `LoadMoreTrigger` at the bottom of the grid, fetch next page when triggered, stop when all Pokemon are loaded
- [x] 3.3 Prevent concurrent fetches — only allow one page fetch at a time

## 4. Search and Filter Adjustments

- [x] 4.1 Update filter logic to work on currently loaded Pokemon, show "Showing X of Y loaded" count
- [x] 4.2 Add "Load all Pokemon for complete results" button when filters are active and not all Pokemon are loaded

## 5. Verification

- [x] 5.1 Run `npm run build` and `npm run lint` to ensure no errors
- [x] 5.2 Verify initial page loads in under 3 seconds in dev mode
