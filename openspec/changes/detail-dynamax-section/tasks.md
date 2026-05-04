## 1. Static Data Layer

- [x] 1.1 Create `lib/gmax-ids.ts` with `GMAX_MAP: Record<number, string>` mapping 34 base Pokemon IDs to their G-Max form names (e.g., `6: "charizard-gmax"`)
- [x] 1.2 Add `MAX_MOVES: Record<string, { name: string; power: number; effect: string }>` to `lib/gmax-ids.ts` mapping each of the 18 types to their Max Move (+ Max Guard for Normal/status)
- [x] 1.3 Add `GMAX_MOVES: Record<string, { name: string; type: string; effect: string }>` to `lib/gmax-ids.ts` mapping each G-Max form name to its exclusive G-Max Move

## 2. PokemonDetail Type & Fetchers

- [x] 2.1 Add `canGmax: boolean`, `gmaxImage: string | null`, and `gmaxMove: { name: string; type: string; effect: string } | null` to `PokemonDetail` interface in `lib/pokemon.ts`
- [x] 2.2 Update `fetchPokemonDetail` to check `GMAX_MAP` for the Pokemon's ID; if present, fetch `pokemon/{gmax-name}` for official artwork URL and populate G-Max fields; if absent, set defaults
- [x] 2.3 Update `fetchMegaDetail` to check `GMAX_MAP` for the base Pokemon ID and populate G-Max fields accordingly

## 3. DynamaxSection Component

- [x] 3.1 Create `components/DynamaxSection.tsx` as a server component that accepts `types`, `canGmax`, `gmaxImage`, `gmaxMove`, and `name` props
- [x] 3.2 Render G-Max artwork comparison (base vs G-Max) when `canGmax` is true, with red/pink Dynamax-themed styling
- [x] 3.3 Render Max Moves grid based on the Pokemon's types using `MAX_MOVES` map, showing move name, type badge, power, and effect
- [x] 3.4 Render the exclusive G-Max Move with special highlight when `gmaxMove` is present

## 4. Detail Page Integration

- [x] 4.1 Update `app/pokemon/[id]/page.tsx` to import and render `DynamaxSection` between Mega Evolution (or Shiny) and Abilities sections
- [x] 4.2 Update `app/pokemon/mega/[name]/page.tsx` to import and render `DynamaxSection` between Shiny and Evolution Chain sections

## 5. Verification

- [x] 5.1 Run `npm run build` and confirm zero type errors
- [x] 5.2 Manually verify a G-Max Pokemon (e.g., Charizard #6) shows G-Max artwork + Max Moves + G-Max Wildfire
- [x] 5.3 Manually verify a non-G-Max Pokemon (e.g., Pikachu... wait, Pikachu HAS G-Max) — verify Bulbasaur #1 (no G-Max, but has Mega) shows Max Moves only
