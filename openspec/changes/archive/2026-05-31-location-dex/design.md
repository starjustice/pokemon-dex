## Context

The app has 3 established grid patterns (Pokemon, Items, Moves) each with distinct visual identity. Locations have no sprites/images and are hierarchical (Region → Location → Area → Encounters). The primary user goal is "what Pokemon can I find at this location?" The design needs to present this hierarchy clearly without overwhelming the user.

PokeAPI has 1,096 locations across 10 regions. Location-areas contain the actual encounter data (Pokemon, methods, levels, rates). Encounters are version-specific.

## Goals / Non-Goals

**Goals:**
- Medium landscape cards with region-colored accents: map-pin icon, name, region badge, encounter count
- Flat list with region filter chips (not tabs or section headers — simpler for a first version)
- Search by name, filter by region (single-select), toggle "has encounters only"
- Mobile FAB + bottom-sheet filters
- Detail page: location info + collapsible area sections with encounter tables grouped by method
- Encounter rows: Pokemon name (linked), level range, encounter rate
- Dark mode throughout
- Sidebar nav link for Locations

**Non-Goals:**
- Version-specific encounter filtering (show all versions' encounters merged — future enhancement)
- Map visualization or image backgrounds
- Reverse lookup "where to find Pokemon X" (already exists on Pokemon detail page)
- Pokemon sprites in encounter lists (too many API calls per page)
- Route/Cave/City type classification (not in API)

## Decisions

### 1. Region Color Palette (`lib/region-colors.ts`)

Each region gets a distinct Tailwind color:
| Region | Color |
|--------|-------|
| Kanto | red |
| Johto | amber |
| Hoenn | emerald |
| Sinnoh | indigo |
| Unova | slate |
| Kalos | sky |
| Alola | orange |
| Galar | purple |
| Hisui | teal |
| Paldea | rose |

Store as static config with badge, icon background, accent bar, and active/inactive chip variants.

**Why**: Region is the strongest grouping signal for locations. Color per region creates immediate visual orientation.

### 2. Card Design — Medium Landscape

```
┌─────────────────────────────────────┐
│ 📍  Route 1                         │
│     ┌────────┐                      │
│     │ Kanto  │   5 Pokemon · 1 area │
│     └────────┘                      │
│ ░░░░░░░░░░░░░░░░░░░░░░░ (accent)   │
└─────────────────────────────────────┘
```

- Map-pin icon in region-colored circle (left)
- Location name + region badge + meta text
- Bottom gradient accent bar in region color
- Grid: 1 col mobile, 2 cols tablet, 3 cols desktop

**Why**: Distinct from Pokemon (square/type-fill), Items (square/sprites), Moves (wide/border-l). The pin + bottom bar reads as "map index."

### 3. Data Layer (`lib/locations.ts`)

- `fetchRegions()` — cached, returns all 10 regions with their location lists
- `fetchLocationPage(offset, limit)` — paginated list, resolves each location's basic info (name, region, area count)
- `fetchLocationDetail(id)` — full location with all areas and their encounters
- Region assignment: derive from `location.region` field (already in API response)

**Challenge**: The location list endpoint only returns `{name, url}`. We need to fetch each location individually to get its region. 

**Solution**: Fetch regions first (cached) to build a `locationId → region` map from region.locations arrays. Then for the grid we only need the list endpoint + this map for region info. Area count requires individual fetches — defer to detail page.

Simplified approach: Just fetch each location for its basic data (same as items/moves pattern).

**Why**: Consistent with existing fetch-per-page patterns.

### 4. Detail Page Structure

Server Component with:
1. Hero: location name + region badge + area count
2. Areas as sections (all expanded by default if ≤3, collapsed if more)
3. Within each area: encounter method groups (Walking, Surfing, Fishing, etc.)
4. Each encounter row: Pokemon name (linked to `/pokemon/{id}`), level range (Lv.X-Y), encounter rate (X%)

**Why**: Hierarchical data naturally maps to nested sections. Pokemon names link back for cross-referencing.

### 5. Encounter Method Icons

Static map of method → emoji:
- walk → 🚶
- surf → 🏄
- old-rod/good-rod/super-rod → 🎣
- rock-smash → 🪨
- headbutt → 🌳
- Other → 📍

**Why**: Quick visual scanning without needing custom SVGs.

### 6. Navigation

Add "Locations" to sidebar NAV_ITEMS with a map-pin icon, placed between Items and Skills.

## Risks / Trade-offs

- **1,096 locations × individual fetches for grid = slow** → Paginate 40 at a time (same as others). Initial load is fast, filtering requires more thought.
- **Region filtering without full data** → Fetch regions first to build ID→region map (10 API calls, cached). Then filter the name list by matching location IDs before fetching details.
- **Some locations have no encounter data** → Show with reduced opacity + "No encounter data" note. Toggle filter can hide them.
- **Encounter data is version-specific** → Merge all versions for simplicity. Show encounter once per Pokemon per method with the combined level range.
- **Location-area fetch can be large** → Only fetch on detail page. Grid cards show area count without fetching area details.
