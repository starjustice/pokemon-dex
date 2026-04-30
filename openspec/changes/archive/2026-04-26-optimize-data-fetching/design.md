## Context

Currently `fetchAllPokemon()` makes 1 list request + 1025 detail requests at runtime. Even with 250 parallel requests, PokeAPI latency and rate limiting make this take ~40 seconds. The user sees a skeleton the entire time.

The PokeAPI list endpoint (`/api/v2/pokemon?limit=40&offset=0`) supports pagination natively and returns URLs for each Pokemon's detail endpoint. Detail endpoints return types, abilities, and sprites in a single call.

## Goals / Non-Goals

**Goals:**
- Initial page load in under 3 seconds (fetch only first page: ~40 Pokemon)
- Seamless infinite scroll that loads more Pokemon as user scrolls down
- Loading indicator at the bottom while fetching next page
- Search and filters work on loaded data

**Non-Goals:**
- Server-side search/filter against PokeAPI (PokeAPI has no search endpoint)
- Pre-generating or caching data in a database
- Changing the card UI or data shape

## Decisions

### 1. Paginated fetching: 40 Pokemon per page

Fetch 40 Pokemon detail records per page. The server fetches page 1 and passes it as initial data. The client uses IntersectionObserver to detect when the user scrolls near the bottom, then fetches the next 40.

**Why 40:** Balances between fast page loads (~40 concurrent requests complete in 1-2s) and not requiring too many scroll triggers to browse. 1025 / 40 = ~26 pages total.

**Why not PokeAPI pagination directly:** The list endpoint only returns names and URLs, not types/abilities/sprites. We need to fetch each detail endpoint. So "pagination" means: get 40 URLs from the list, fetch their details in parallel.

### 2. Client-side infinite scroll with IntersectionObserver

Use a sentinel `<div>` at the bottom of the grid. When it enters the viewport, trigger the next page fetch. Use React state to accumulate loaded Pokemon across pages.

**Why over "Load More" button:** Infinite scroll provides a smoother browsing experience. The user doesn't need to click anything.

### 3. Server-side first page, client-side subsequent pages

The first page is fetched in a Server Component (SSR) for fast initial render. Subsequent pages are fetched client-side via a fetch function exposed from `lib/pokemon.ts`.

**Why hybrid:** SSR first page means the user sees real content immediately (no skeleton for first 40 Pokemon). Client-side pagination for the rest keeps subsequent loads fast and interactive.

### 4. Search and filters on loaded data

Filters apply to all currently loaded Pokemon. When a user searches or filters, results come from the in-memory loaded set. A "Load all" fallback fetches remaining data if the user wants comprehensive search results.

**Trade-off:** Users won't find Pokemon they haven't scrolled to yet. This is acceptable because most users browse sequentially. A note like "Showing results from loaded Pokemon. Load all for complete search." addresses this.

## Risks / Trade-offs

- **[Search only works on loaded data]** → Mitigated with "Load all" option. Most users browse sequentially anyway.
- **[PokeAPI rate limiting on rapid scroll]** → Fetch next page only when current fetch completes. One page at a time prevents overwhelming the API.
- **[Memory grows as user scrolls]** → 1025 Pokemon objects is ~200KB, well within acceptable limits.
