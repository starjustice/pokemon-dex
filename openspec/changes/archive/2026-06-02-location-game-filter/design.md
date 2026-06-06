## Context

Current Location Dex uses region as the primary filter. Investigation of PokeAPI confirmed:
- `/version-group/` returns 32 paired-game releases with `regions[]` and `versions[]` fields
- `/region/{id}/` returns `version_groups[]` and `locations[]`
- No direct `version_group` field on `/location/{id}/` — must derive via region

Mapping strategy: **version-group → region(s) → locations** (cheap, complete). Accepts over-inclusion for asymmetric cases (Sevii Islands shown in all Kanto games though only in FR/LG).

## Goals / Non-Goals

**Goals:**
- Game-based filter listing all 32 version-groups with friendly display names
- Color-coded by generation (visual consistency with Pokemon Dex generation grouping)
- Maintain search + has-encounters toggle
- Game info visible on detail page
- Single source of truth for game metadata in `lib/version-groups.ts`

**Non-Goals:**
- Per-location game accuracy beyond region inclusion (would require fetching every location-area, too expensive)
- Per-version filtering (e.g., "X only, not Y") — version-group is the unit
- Removing region info entirely (kept as secondary badge for context)
- Game cover-art imagery (text + color is sufficient and lighter)

## Decisions

### 1. Version-Group Display Names + Colors (`lib/version-groups.ts`)

Static config mapping each version-group `name` (API field) to:
- `displayName`: e.g., `"red-blue"` → `"Red & Blue"`, `"firered-leafgreen"` → `"FireRed & LeafGreen"`
- `generation`: e.g., `"generation-iii"` (used for color)
- `shortLabel`: e.g., `"FR/LG"` (chip text on mobile)

Generation color palette (reuse from Pokemon Dex if possible, else):
| Gen | Color |
|-----|-------|
| I | red |
| II | amber |
| III | emerald |
| IV | indigo |
| V | slate |
| VI | sky |
| VII | orange |
| VIII | purple |
| IX | rose |

Hisui/Legends Arceus uses teal as a "side" indicator.

### 2. Game Chip UI

Game chips are wider than region chips (text like "FireRed & LeafGreen" is longer). Use a 2-column grid in the desktop inline filter and a vertical scrollable list in the bottom sheet on mobile.

Each chip:
- Background = generation color (light bg, dark text in light mode; inverse in dark)
- Active state = solid generation color, white text
- Includes a tiny generation pill (e.g., "Gen III") at the right side for clarity

### 3. Filter State

`LocationGrid` state changes:
- Remove: `region: string`
- Add: `selectedGame: string` (version-group name)
- When `selectedGame` is set, derive `region` from the selected game's region(s), then filter locations by that region(s) using existing region map

For games with multiple regions (none currently in PokeAPI — all version-groups map to 1 region except DLC), use OR matching.

### 4. Data Layer Additions (`lib/locations.ts`)

```ts
fetchVersionGroups(): Promise<VersionGroup[]>  // cached, 32 entries
// Each VersionGroup: { name, versions: string[], regions: string[] }

// Helper that builds game → location IDs map from cached data
getLocationIdsForGame(versionGroupName: string): Promise<Set<number>>
```

### 5. Detail Page "Available In" Section

After the hero, before areas, add a small section listing the game version-groups associated with this location's region. Each game shown as a colored chip linking to `/locations?game=<name>` (deep link).

### 6. URL Deep Linking (optional, nice-to-have)

Support `?game=x-y` query parameter on `/locations` to pre-select a game. Sync state to URL using `useSearchParams` + router. This enables sharing links like "all locations in Pokemon X & Y".

### 7. Disclaimer

Below the filters when a game is selected, show a single-line disclaimer:
> "Showing all locations in {Region}. Some locations may be exclusive to specific games within this generation."

Subtle text, gray-500. Dismissible? No — keep simple.

## Risks / Trade-offs

- **Over-inclusion**: Sevii Islands shown in R/B (incorrect). Mitigated by disclaimer. Could be improved later via manual override map.
- **More API calls on first filter**: First game selection fetches version-groups (32 calls) — but cached after that. Initial page load unaffected.
- **Chip count**: 32 chips is a lot. Mitigation: grouped visually by generation in the sheet (subheaders "Generation I", "Generation II"…).
- **Display name maintenance**: New version-groups (DLC, future games) need manual addition. Acceptable — Pokemon games release ~every 2-3 years.
- **Removing region filter**: Loses ability to filter "all Kanto games at once". Mitigation: region still shown as badge; if someone really wants "all Kanto", they can pick any Kanto-era game.
