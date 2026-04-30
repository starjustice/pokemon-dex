## 1. Data Fetching

- [x] 1.1 Add `fetchPokemonDetail(id)` to `lib/pokemon.ts`: fetches `/pokemon/{id}`, `/pokemon-species/{id}`, and `/pokemon/{id}/encounters` in parallel, returns typed detail object
- [x] 1.2 Add `fetchEvolutionChain(url)` to `lib/pokemon.ts`: fetches and parses the evolution chain into a flat tree structure with conditions
- [x] 1.3 Add `fetchAbilityDetails(abilities)` to `lib/pokemon.ts`: fetches ability descriptions for a list of ability URLs, returns name + short_effect + is_hidden
- [x] 1.4 Add TypeScript types: `PokemonDetail`, `EvolutionStage`, `AbilityDetail`, `EncounterLocation`

## 2. Detail Page Route

- [x] 2.1 Create `app/pokemon/[id]/page.tsx`: Server Component that fetches all detail data and renders sections (artwork, info, stats, evolution, abilities, encounters)
- [x] 2.2 Create `app/pokemon/[id]/loading.tsx`: Skeleton loading state with placeholder sections
- [x] 2.3 Add dynamic metadata (title, description) using `generateMetadata`

## 3. Detail Page Components

- [x] 3.1 Create `components/StatBar.tsx`: horizontal bar with color coding, label, and numeric value
- [x] 3.2 Create `components/EvolutionChain.tsx`: visual flow diagram showing stages with sprites, names, and condition arrows (responsive: horizontal on desktop, vertical on mobile)
- [x] 3.3 Create `components/AbilityList.tsx`: list of abilities with name, description, and hidden badge
- [x] 3.4 Create `components/EncounterList.tsx`: encounter locations grouped by game version, with "Not available in the wild" fallback

## 4. Card Navigation

- [x] 4.1 Update `components/PokemonCard.tsx`: wrap card in `next/link` to `/pokemon/{id}`

## 5. Verification

- [x] 5.1 Run `npm run build` and `npm run lint` to ensure no errors
