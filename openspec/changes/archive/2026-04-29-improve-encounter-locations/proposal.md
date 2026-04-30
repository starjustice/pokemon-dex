## Why

The Encounter Locations section on the detail page truncates locations ("+N more") and game versions ("And 16 more game versions...") with no way to see the full data. Users can't explore where a Pokemon actually appears. The section feels static and uninformative.

## What Changes

- Make "+N more" location badges clickable to expand and show all locations for that version
- Make "And N more game versions..." clickable to reveal all version groups
- Group versions by region (Johto, Sinnoh, Kanto, etc.) with collapsible accordion sections
- Add small static region map images as visual headers for each region group
- Convert EncounterList from server component to client component for interactivity

## Capabilities

### New Capabilities
- `encounter-locations-interactive`: Interactive expandable encounter locations with region grouping and static map images

### Modified Capabilities
- (none — existing pokemon-detail spec doesn't detail encounter UX)

## Impact

- `components/EncounterList.tsx` — rewritten as interactive client component with expand/collapse, region grouping, and map images
- `public/images/regions/` — static region map images (Kanto, Johto, Hoenn, Sinnoh, Unova, Kalos, Alola, Galar, Paldea)
- No API changes — uses existing `EncounterLocation[]` data
