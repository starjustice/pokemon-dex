## Context

The Pokemon Dex currently displays 1025 base-form Pokemon in a client-side grid with search, type, generation, and "Has Mega" filtering. Mega evolutions exist only on detail pages — fetched via the species `varieties` endpoint when viewing a mega-capable base Pokemon. Users cannot browse or compare mega forms from the grid.

PokeAPI assigns mega forms IDs in the 10000+ range (e.g., Mega Venusaur = 10033, Mega Charizard X = 10034). These have full `/pokemon/{id}` endpoints with stats, types, abilities, and sprites — identical structure to base forms.

The existing `MEGA_IDS` map in `lib/mega-ids.ts` maps 46 base Pokemon IDs. The `MegaEvolution` type already holds name/image/types/stats for detail page display.

## Goals / Non-Goals

**Goals:**
- Mega forms appear as distinct cards in the home grid, positioned immediately after their base form
- Each mega card links to a dedicated detail page at `/pokemon/mega/[name]`
- Mega cards have a visually distinct purple gradient border/glow
- Search, type filter, and generation filter all work on mega cards
- Mega form data is fetched alongside base Pokemon data (no extra loading step)

**Non-Goals:**
- Primal reversions, Gigantamax, or other alternate forms (only Mega Evolutions)
- Changing the existing base Pokemon detail page's mega section
- Server-side rendering of mega cards (grid is fully client-side)

## Decisions

### 1. Data model: extend `Pokemon` type with mega fields

Add optional `isMega: boolean`, `basePokemonId: number`, and `megaName: string` to the `Pokemon` interface. This avoids a separate type and lets mega cards flow through the same grid/filter/cache pipeline.

**Alternative considered**: Separate `MegaPokemon` type — rejected because it would require parallel arrays, dual filter logic, and complex interleaving in the grid.

### 2. Fetching strategy: static mega ID mapping + parallel fetch

Expand `lib/mega-ids.ts` to a `MEGA_MAP: Record<number, number[]>` mapping base ID → array of mega form IDs (e.g., `6 → [10034, 10035]` for Charizard X/Y). When a page of base Pokemon loads, also fetch mega forms for any mega-capable Pokemon in that page. This keeps fetching incremental with pagination.

**Alternative considered**: Fetch all megas upfront on mount — rejected because it adds ~48 extra API calls before showing anything.

### 3. Grid ordering: insert megas immediately after base form

After fetching, mega Pokemon are inserted into the `allPokemon` array right after their base form using `basePokemonId` for sorting. The sort key is `(basePokemonId, isMega ? 1 : 0, megaFormId)`.

### 4. Detail page route: `/pokemon/mega/[name]`

A new Next.js dynamic route at `app/pokemon/mega/[name]/page.tsx`. The `[name]` segment is the mega form name from PokeAPI (e.g., `charizard-mega-x`). The page is a Server Component that fetches from `https://pokeapi.co/api/v2/pokemon/{name}` and renders the same detail layout as base Pokemon.

**Alternative considered**: Using mega IDs (`/pokemon/10034`) — rejected because IDs are opaque and not user-friendly.

### 5. Card styling: purple gradient border via Tailwind

Mega cards get a `ring-2 ring-purple-400/60` with a subtle `bg-gradient-to-br from-purple-50 to-white dark:from-purple-950/30 dark:to-gray-900` background. The existing "Mega" badge remains.

## Risks / Trade-offs

- [Extra API calls per page] → Mitigated by fetching megas only for mega-capable Pokemon in each page (~5-8 extra calls per 40-Pokemon page, not 48 all at once).
- [Grid length increases by ~48 cards] → Acceptable; users can filter with "Has Mega" toggle to isolate them, or they blend naturally into the grid.
- [PokeAPI rate limiting] → Already handled by `Promise.allSettled`; failed mega fetches are silently skipped (base cards still show).
- [Cache size increase] → Minimal; each mega Pokemon object is ~200 bytes, adding ~10KB total.
