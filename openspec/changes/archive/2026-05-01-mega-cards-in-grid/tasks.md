## 1. Data Layer

- [x] 1.1 Expand `lib/mega-ids.ts` to export `MEGA_MAP: Record<number, number[]>` mapping base Pokemon ID to array of mega form IDs (e.g., `6 → [10034, 10035]`)
- [x] 1.2 Extend `Pokemon` interface in `lib/pokemon.ts` with optional fields: `isMega?: boolean`, `basePokemonId?: number`, `megaName?: string`
- [x] 1.3 Add `fetchMegaForms(baseIds: number[]): Promise<Pokemon[]>` to `lib/pokemon.ts` that fetches mega form data from PokeAPI and returns `Pokemon` objects with mega fields set
- [x] 1.4 Update `PokemonListCache` in `lib/pokemon-cache.ts` — no schema change needed since mega Pokemon are stored in the same `pokemon` array

## 2. Grid Integration

- [x] 2.1 Update `PokemonGrid.tsx` first-page and next-page fetch logic to also call `fetchMegaForms` for mega-capable Pokemon in each page, then interleave results sorted by `(basePokemonId, isMega, id)`
- [x] 2.2 Update `PokemonGrid.tsx` `loadAllPokemon` to also fetch all mega forms
- [x] 2.3 Update filter logic: search matches mega names, type filter uses mega's own types, "Has Mega" filter shows both base and mega cards, generation filter uses base Pokemon's generation for megas

## 3. Card Styling

- [x] 3.1 Update `PokemonCard.tsx` to accept mega Pokemon and apply distinct purple gradient border/glow styling when `pokemon.isMega` is true
- [x] 3.2 Update card link: mega cards link to `/pokemon/mega/{megaName}` instead of `/pokemon/{id}`

## 4. Mega Detail Page

- [x] 4.1 Create `app/pokemon/mega/[name]/page.tsx` as a Server Component that fetches mega form data from PokeAPI by name and renders the full detail layout
- [x] 4.2 Add `fetchMegaDetail(name: string)` to `lib/pokemon.ts` returning `PokemonDetail` for a mega form
- [x] 4.3 Ensure back navigation from mega detail page preserves grid scroll position and filter state

## 5. Verification

- [x] 5.1 Run `npm run build` and confirm zero type errors
- [x] 5.2 Manually verify: grid shows mega cards after base forms, mega cards have purple styling, clicking mega card navigates to `/pokemon/mega/[name]`, detail page renders correctly, back button restores grid state
