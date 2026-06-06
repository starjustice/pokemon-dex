## Why

The app now has Pokemon, Items, and Moves dexes but no way to browse game locations. Players frequently need to know "where can I find X Pokemon?" or "what Pokemon are in this area?" — a Location Dex answers both. With 1,096 locations across 10 regions and 1,246 areas with encounter data, this is a significant content addition.

## What Changes

- Add a new `/locations` route with a browsable location grid grouped by region
- Medium landscape cards with region color palette, map-pin icon, location name, and encounter count
- Filter by region (10 regions with distinct colors), search by name, toggle "has encounters only"
- Mobile FAB + bottom-sheet filter pattern
- Location detail page showing areas with Pokemon encounters grouped by method (walking, surfing, fishing)
- Add "Locations" nav link to sidebar
- Create data layer for PokeAPI location/region endpoints

## Capabilities

### New Capabilities
- `location-list`: Browsable grid of locations with region sections, search, region filter, infinite scroll
- `location-detail`: Detail page showing areas with Pokemon encounters grouped by encounter method
- `location-data-fetching`: Data layer for PokeAPI location, location-area, and region endpoints

### Modified Capabilities
- `dex-navigation`: Adding "Locations" nav link to sidebar

## Impact

- **New files**: `app/locations/page.tsx`, `app/locations/[id]/page.tsx`, `components/LocationGrid.tsx`, `components/LocationCard.tsx`, `components/LocationFilterSheet.tsx`, `components/LocationFilterFAB.tsx`, `lib/locations.ts`, `lib/region-colors.ts`
- **Modified files**: `components/AppSidebar.tsx` (add Locations nav link)
- **API dependency**: PokeAPI `/api/v2/location/`, `/api/v2/location-area/`, `/api/v2/region/`
- **No breaking changes**
