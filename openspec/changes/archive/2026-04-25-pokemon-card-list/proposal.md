## Why

The application currently has no way to browse or discover Pokemon. Users need a visually appealing, card-based Pokemon listing with search and filtering so they can quickly find and explore Pokemon data from the PokeAPI.

## What Changes

- Add a Pokemon card grid that fetches and displays all ~1025 Pokemon from PokeAPI (https://pokeapi.co/) using high-concurrency server-side fetching
- Each card shows: official artwork image (with fallback), name, Pokedex number (#0001 format), color-coded type badges, abilities, and generation
- Generation data derived from static ID-range lookup (no species API calls) for performance
- Add a debounced search bar to filter Pokemon by name or Pokedex number
- Add filters for type (multi-select toggle) and generation (dropdown)
- All ~1025 Pokemon loaded at once with client-side filtering for instant search UX
- Suspense streaming with skeleton UI for fast perceived load time
- Responsive card layout that works across desktop, tablet, and mobile

## Capabilities

### New Capabilities
- `pokemon-card-list`: Card-based grid display of all ~1025 Pokemon with official artwork, name, number, color-coded types, abilities, and generation. Server-side fetched with Suspense streaming and skeleton loading state.
- `pokemon-search-filter`: Debounced search bar (by name/number) and filter controls (type multi-select toggles, generation dropdown) with combined AND logic for instant client-side filtering.

### Modified Capabilities
<!-- None - this is a greenfield feature -->

## Impact

- New page route using Next.js App Router (`app/page.tsx`)
- External API dependency on PokeAPI (https://pokeapi.co/api/v2/) — Pokemon endpoint only, no species calls
- Next.js image config for `raw.githubusercontent.com` remote patterns
- New UI components: PokemonCard, PokemonGrid, SearchBar, FilterPanel, PokemonGridSkeleton
- New lib modules: `lib/pokemon.ts` (types, fetching, static generation lookup), `lib/type-colors.ts` (color mappings)
- Client-side state for search/filter interactions using React transitions
