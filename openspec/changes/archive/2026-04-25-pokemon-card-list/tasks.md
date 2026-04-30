## 1. Data Layer Setup

- [x] 1.1 Create `lib/pokemon.ts` with TypeScript types for Pokemon data (PokemonBasic, PokemonDetail, PokemonType, etc.)
- [x] 1.2 Implement `fetchAllPokemon()` function that fetches the full Pokemon list from PokeAPI with detail data (types, abilities, sprites, species/generation) using batched parallel requests
- [x] 1.3 Create type color mapping utility (`lib/type-colors.ts`) for all 18 Pokemon types

## 2. Pokemon Card Component

- [x] 2.1 Create `components/PokemonCard.tsx` — displays image (with fallback), name, formatted Pokedex number (#0001), color-coded type badges, abilities, and generation
- [x] 2.2 Style the card with Tailwind: rounded corners, shadow, hover effects, responsive sizing

## 3. Card Grid Layout

- [x] 3.1 Create `components/PokemonGrid.tsx` — client component that renders a responsive grid of PokemonCard components (1 col mobile, 2 tablet, 3-4 desktop)
- [x] 3.2 Add loading skeleton placeholder component for initial data fetch

## 4. Search and Filter Controls

- [x] 4.1 Create `components/SearchBar.tsx` — text input with debounce that filters by name or Pokedex number
- [x] 4.2 Create `components/FilterPanel.tsx` — type filter (multi-select toggle buttons) and generation filter (dropdown or buttons)
- [x] 4.3 Implement combined filter logic in PokemonGrid: search text AND type filter AND generation filter applied together

## 5. Page Integration

- [x] 5.1 Update `app/page.tsx` as Server Component that fetches all Pokemon data and passes to client components
- [x] 5.2 Compose the full page layout: header/title, search bar + filters above the grid, card grid below
- [x] 5.3 Add "No Pokemon found" empty state when filters return zero results

## 6. Polish and Verification

- [x] 6.1 Verify responsive layout across mobile, tablet, and desktop breakpoints
- [x] 6.2 Run `npm run build` and `npm run lint` to ensure no errors
