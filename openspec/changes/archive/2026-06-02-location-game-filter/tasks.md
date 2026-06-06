## 1. Version-Group Metadata

- [x] 1.1 Create `lib/version-groups.ts` with `VersionGroupMeta` interface (`name`, `displayName`, `shortLabel`, `generation`)
- [x] 1.2 Export `VERSION_GROUP_META` record for all 32 version-groups with curated display names (e.g., `red-blue → "Red & Blue"`, `firered-leafgreen → "FireRed & LeafGreen"`, `x-y → "X & Y"`, `sword-shield → "Sword & Shield"`, `the-isle-of-armor → "The Isle of Armor"`)
- [x] 1.3 Export `GENERATION_COLORS` record (gen-i through gen-ix + hisui/teal): `{ bg, text, darkBg, darkText, activeBg, activeText, darkActiveBg, darkActiveText }`
- [x] 1.4 Export helper `getVersionGroupMeta(name)` with fallback (title-case the name)
- [x] 1.5 Export `GENERATION_ORDER` array for grouping chips in UI

## 2. Data Layer Extensions

- [x] 2.1 Add `VersionGroup` interface to `lib/locations.ts`: `{ name, versions: string[], regions: string[], generation: string }`
- [x] 2.2 Implement `fetchVersionGroups()` with module-level cache — fetches `/version-group/?limit=50` then each detail
- [x] 2.3 Implement `getLocationIdsForGame(versionGroupName)` — uses cached version-groups + region map to return `Set<number>`
- [x] 2.4 Ensure region map already exposes `region → location IDs` (extend `fetchRegionMap` if needed to return both `locationId→region` and `region→Set<locationId>`)

## 3. Filter Sheet — Replace Region with Game

- [x] 3.1 Modify `components/LocationFilterSheet.tsx` props: remove `region/onRegionChange`, add `selectedGame/onGameChange`, accept `versionGroups: VersionGroup[]` as prop
- [x] 3.2 Replace region chips section with game chips grouped by generation (subheaders "Generation I", "Generation II", …)
- [x] 3.3 Each chip uses `GENERATION_COLORS` styling with active/inactive variants
- [x] 3.4 Display `displayName` on chip, full readable text
- [x] 3.5 Update clear-all logic for new state

## 4. Location Grid — Game Filter Integration

- [x] 4.1 Modify `components/LocationGrid.tsx` state: remove `region`, add `selectedGame` (default `""`)
- [x] 4.2 Load `fetchVersionGroups()` on mount (alongside initial page load), store in state
- [x] 4.3 Replace inline desktop region chips with game chips (2-column grid, grouped by generation header)
- [x] 4.4 Update `applyFilters`: when `selectedGame` set, use `getLocationIdsForGame()` to derive matching IDs, then intersect with name search results
- [x] 4.5 Show disclaimer text below filters when game is selected: "Showing all locations in {Region(s)}. Some locations may be exclusive to specific games."
- [x] 4.6 Update `activeFilterCount` and `isFiltered` checks
- [x] 4.7 Pass `versionGroups` and `selectedGame` to `LocationFilterSheet`

## 5. URL Deep Linking (Optional but Recommended)

- [x] 5.1 Use `useSearchParams` to read `?game=<name>` on mount and initialize `selectedGame`
- [x] 5.2 Use `router.replace` to sync `selectedGame` to URL when changed (preserve other params)
- [x] 5.3 Validate query value against known version-group names; ignore invalid

## 6. Location Card Updates

- [x] 6.1 Modify `components/LocationCard.tsx` — keep region badge but reduce size (smaller px/py, text-[10px])
- [x] 6.2 No structural changes — region badge remains the primary visual identifier per card

## 7. Detail Page "Available In" Section

- [x] 7.1 In `app/locations/[id]/page.tsx`, after hero, fetch version-groups (server-side) and filter to those matching the location's region
- [x] 7.2 Render "Available in" heading + chip row using `GENERATION_COLORS`
- [x] 7.3 Each chip is a `<Link>` to `/locations?game={versionGroupName}`
- [x] 7.4 Hide section entirely if no version-groups match the region (e.g., "unknown" region)
- [x] 7.5 Dark mode styling

## 8. Verification

- [x] 8.1 Run `npm run build` — confirm zero type errors
- [x] 8.2 Verify: `/locations` shows game chips grouped by generation
- [x] 8.3 Verify: selecting "FireRed & LeafGreen" filters to Kanto locations
- [x] 8.4 Verify: selecting "X & Y" filters to Kalos locations
- [x] 8.5 Verify: deep link `/locations?game=sword-shield` pre-selects Sword & Shield
- [x] 8.6 Verify: detail page shows "Available in" with multiple game chips for a Kanto location
- [x] 8.7 Verify: clicking game chip on detail navigates to `/locations?game=<name>`
- [x] 8.8 Verify: disclaimer appears when game filter active
- [x] 8.9 Verify: dark mode works on all new/modified components
- [x] 8.10 Verify: clearing game filter restores all locations
