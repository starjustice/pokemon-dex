## 1. Region Colors Config

- [x] 1.1 Create `lib/region-colors.ts` with `REGION_COLORS` map: each region (kanto, johto, hoenn, sinnoh, unova, kalos, alola, galar, hisui, paldea) → color config (badge bg/text, icon bg, accent gradient, chip active/inactive, dark variants)
- [x] 1.2 Export `REGION_NAMES` array and `ENCOUNTER_METHOD_ICONS` map (walk→🚶, surf→🏄, old-rod/good-rod/super-rod→🎣, rock-smash→🪨, headbutt→🌳, default→📍)

## 2. Data Layer

- [x] 2.1 Create `lib/locations.ts` with interfaces: `LocationBasic` (id, name, region, areaCount), `LocationDetail` (extends with areas[]), `AreaEncounter` (areaName, encounters[]), `EncounterEntry` (pokemonName, pokemonId, method, minLevel, maxLevel, chance)
- [x] 2.2 Implement `fetchRegions()` with module-level cache — fetches all regions, builds `locationId → regionName` map
- [x] 2.3 Implement `fetchAllLocationNames()` with cache — returns all 1,096 `{id, name}` pairs
- [x] 2.4 Implement `fetchLocationPage(offset, limit)` — fetches list, resolves each location's basic info using region map
- [x] 2.5 Implement `fetchLocationDetail(id)` — fetches location + all its location-areas with encounter data (merged across versions)
- [x] 2.6 Add `formatLocationName(name)` helper

## 3. Location Card Component

- [x] 3.1 Create `components/LocationCard.tsx` — medium landscape card with: map-pin icon in region-colored circle, location name, region badge (colored), area count meta, bottom gradient accent bar
- [x] 3.2 Link card to `/locations/{id}`
- [x] 3.3 Show reduced opacity + "No encounter data" for locations with 0 areas
- [x] 3.4 Dark mode variants

## 4. Location Filter Components

- [x] 4.1 Create `components/LocationFilterFAB.tsx` — floating button (same pattern, use region-neutral color like teal)
- [x] 4.2 Create `components/LocationFilterSheet.tsx` — bottom-sheet with: search input, region chips (colored per region), "Has encounters" toggle, clear all
- [x] 4.3 Animations: reuse `animate-sheetUp`/`animate-sheetDown`, body scroll lock

## 5. Location Grid Component

- [x] 5.1 Create `components/LocationGrid.tsx` as client component with state: search, region, hasEncountersOnly, locations array
- [x] 5.2 Initial load: fetch first 40 locations via `fetchLocationPage(0, 40)`
- [x] 5.3 Desktop inline filters (`hidden lg:block`): search input, region chips (scrollable, colored), "Has encounters" checkbox
- [x] 5.4 Infinite scroll for unfiltered mode
- [x] 5.5 Filter logic: on filter, use cached name list + region map to filter, then fetch matching locations
- [x] 5.6 Mobile: show LocationFilterFAB + LocationFilterSheet, hide inline filters
- [x] 5.7 Loading/empty states, clear filters button

## 6. Locations List Page

- [x] 6.1 Create `app/locations/page.tsx` — SiteHeader (subtitle: "Browse Pokemon game locations") + `<LocationGrid />`

## 7. Location Detail Page

- [x] 7.1 Create `app/locations/[id]/page.tsx` as Server Component — calls `fetchLocationDetail(id)`
- [x] 7.2 Hero: location name, region badge (colored), area count
- [x] 7.3 Area sections: each area as a card/section with name heading
- [x] 7.4 Encounter method groups within each area: method header with emoji icon
- [x] 7.5 Encounter rows: Pokemon name (capitalized, linked to `/pokemon/{id}`), level range, rate percentage
- [x] 7.6 Handle "no encounter data" gracefully
- [x] 7.7 Back navigation to `/locations`, dark mode

## 8. Navigation Update

- [x] 8.1 Add "Locations" to `NAV_ITEMS` in `components/AppSidebar.tsx` with map-pin SVG icon, between Items and Skills

## 9. Verification

- [x] 9.1 Run `npm run build` — confirm zero type errors
- [x] 9.2 Verify: `/locations` loads with location cards showing region colors and info
- [x] 9.3 Verify: region chips filter locations
- [x] 9.4 Verify: search filters by name
- [x] 9.5 Verify: infinite scroll loads more
- [x] 9.6 Verify: `/locations/{id}` shows areas with encounter data
- [x] 9.7 Verify: "Locations" appears in sidebar with correct active state
- [x] 9.8 Verify: dark mode works on all components
