## Context

This is a greenfield Next.js 16 application with no existing pages or components. We need to build the main Pokemon browsing experience — a card grid fetched from PokeAPI with search and filtering. PokeAPI is a free, open REST API with no authentication required.

PokeAPI returns paginated lists at `/api/v2/pokemon?offset=0&limit=20` with basic info, and detailed data (types, abilities, sprites, species/generation) requires per-Pokemon requests.

## Goals / Non-Goals

**Goals:**
- Display Pokemon in a responsive card grid with key info (image, name, number, types, abilities, generation)
- Provide instant client-side search by name/number
- Provide filters by type, generation
- Fast initial load with server-side data fetching
- Modern, polished UI using Tailwind CSS

**Non-Goals:**
- Detailed Pokemon page (individual Pokemon view) — future change
- Evolution chains display
- Offline/PWA support
- User accounts or favorites
- Caching layer or database — rely on PokeAPI directly

## Decisions

### 1. Data fetching strategy: Server-side high-concurrency fetch + client-side filtering

Fetch a full list of Pokemon (up to Gen 9, ~1025) on the server using Next.js Server Components. Fetch detail data (types, abilities, sprites) from the `/pokemon/{id}` endpoint only — species endpoints are **not** called. Generation data is derived from a static ID-range lookup table instead. Requests are made in highly concurrent batches (50 per batch x 5 concurrent = 250 parallel). The page uses Suspense streaming so the skeleton UI shows immediately while data loads.

**Why over pagination from API**: PokeAPI is slow for per-request detail fetching. Batch-fetching all data server-side and filtering client-side gives instant search UX. The full dataset is ~200KB which is acceptable.

**Alternative considered**: Client-side pagination with API calls per page — rejected because filtering across pages would require fetching everything anyway.

**Alternative considered**: Fetching species endpoint per Pokemon for generation data — rejected because it doubles the API calls (2050 instead of 1025) and generation-to-ID mappings are stable/well-known.

### 2. Image source: Official artwork from PokeAPI sprites

Use `sprites.other['official-artwork'].front_default` for card images. Fall back to `sprites.front_default` if unavailable.

### 3. Component architecture

- `app/page.tsx` — Server Component, fetches all Pokemon data
- `components/PokemonGrid.tsx` — Client Component, manages search/filter state and renders grid
- `components/PokemonCard.tsx` — Presentational component for individual card
- `components/SearchBar.tsx` — Search input with debounce
- `components/FilterPanel.tsx` — Type and generation filter controls
- `lib/pokemon.ts` — Data fetching utilities, TypeScript types, and static generation lookup
- `lib/type-colors.ts` — Type color mappings for badges and card gradients
- `components/PokemonGridSkeleton.tsx` — Loading skeleton shown via Suspense while data streams

### 4. Styling approach: Tailwind CSS with type-based color coding

Each Pokemon type gets a distinct color (fire=red, water=blue, etc.) applied to type badges on cards. Cards use subtle shadows, rounded corners, hover effects for a modern feel.

## Risks / Trade-offs

- **[PokeAPI rate limiting]** → Fetch data at build/request time server-side; requests use high concurrency (50 per batch x 5 concurrent) with `Promise.allSettled` to gracefully handle individual failures
- **[Initial load size with ~1025 Pokemon]** → Acceptable trade-off for instant client-side filtering. Suspense streaming shows skeleton UI immediately. Can add pagination later if needed.
- **[PokeAPI downtime]** → No mitigation for now; `Promise.allSettled` ensures partial data still loads. Consider ISR caching in future.
- **[Generation data accuracy]** → Static ID-range lookup is used instead of API calls. If new Pokemon are added beyond Gen IX (#1025), the lookup table needs manual update.
