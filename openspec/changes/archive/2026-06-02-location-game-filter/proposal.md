## Why

The current Location Dex groups locations by region (Kanto, Johto, etc.), but most players think about locations in terms of the **game they played**: "Where can I find this in Pokemon X?" or "What's in Fire Red?". Region grouping conflates 9 different Kanto games into one list. A game-based filter aligns the UX with how players actually navigate Pokemon content.

PokeAPI provides 32 `version-groups` (paired releases like Red/Blue, X/Y, Sword/Shield) — each mapped to one or more regions, which in turn list their locations. This lets us offer game-based filtering with only ~42 cached API calls.

## What Changes

- **Replace the region chips filter** with a **game selector** that lists all 32 game version-groups
- Use generation-based colors for game chips (Gen I=red, Gen II=gold, Gen III=emerald, …)
- Game selector shows display names like "Pokémon X & Y", "FireRed & LeafGreen", "Sword & Shield"
- Selecting a game filters locations to that game's region(s)
- Keep search by name and "has encounters" toggle
- Add a secondary game badge on location detail page showing which games it's available in
- Add a brief disclaimer noting that some locations may be game-version-specific within a region (e.g., Sevii Islands only in FR/LG)
- Region info preserved as secondary metadata on cards (smaller badge alongside game info)

## Capabilities

### Modified Capabilities
- `location-list`: Replace region filter with game/version-group filter
- `location-detail`: Add "Available in" section listing games
- `location-data-fetching`: Add version-group fetching and game→region→location mapping

### New Capabilities
- (none — extends existing location-dex)

## Impact

- **New files**: `lib/version-groups.ts` (game metadata, colors, display names)
- **Modified files**:
  - `lib/locations.ts` — add `fetchVersionGroups()`, `fetchLocationsForGame(versionGroup)`, expose game→region map
  - `components/LocationGrid.tsx` — replace region state with `selectedGame` state
  - `components/LocationFilterSheet.tsx` — replace region chips with game chips
  - `components/LocationCard.tsx` — keep region badge, smaller styling
  - `app/locations/[id]/page.tsx` — add "Available in" section
- **No breaking changes** to URL or routes
- **No new API dependencies** — same PokeAPI, new endpoints (`/version-group/`)
