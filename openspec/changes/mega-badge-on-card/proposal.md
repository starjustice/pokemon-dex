## Why

The home page grid shows 1025 Pokemon but gives no visual indication of which ones have mega evolutions. Users browsing the grid have no way to spot "mega-capable" Pokemon at a glance. A small "Mega" badge on the card communicates this at zero interaction cost.

## What Changes

- Pokemon cards for the ~46 species that have mega evolutions display a small "Mega" badge (e.g., top-left corner, purple/gradient pill)
- Badge is determined by a static lookup of Pokemon IDs — no extra API calls
- Badge is purely cosmetic — clicking the card still navigates to the detail page where megas are shown in full

## Capabilities

### New Capabilities
- `mega-badge-on-card`: Visual badge on Pokemon grid cards indicating mega evolution availability

### Modified Capabilities
- (none)

## Impact

- New `lib/mega-ids.ts` — exports a `Set<number>` of the ~46 Pokemon IDs that have mega forms (static, never changes)
- `components/PokemonCard.tsx` — import `MEGA_IDS`, render badge conditionally when `MEGA_IDS.has(pokemon.id)`
- No changes to data fetching, API calls, or types
