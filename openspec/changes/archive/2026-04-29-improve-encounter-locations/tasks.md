## 1. Create Version-to-Region Mapping

- [x] 1.1 Create `lib/region-map.ts` with a static lookup mapping all PokeAPI version names to their region (e.g., `{ red: "Kanto", gold: "Johto", ruby: "Hoenn", diamond: "Sinnoh", ... }`). Export a `getRegionForVersion(version: string): string` function. Unmapped versions return "Other".

## 2. Create Region Icon Components

- [x] 2.1 Create `components/RegionIcon.tsx` that renders a small colored circle/badge with the first letter of the region or a simple inline SVG silhouette. Each region gets a distinct color. Export `RegionIcon({ region }: { region: string })`.

## 3. Rewrite EncounterList Component

- [x] 3.1 Convert `components/EncounterList.tsx` to a client component. Group encounters by region (using `getRegionForVersion`), then by version within each region.
- [x] 3.2 Implement region accordion UI: clickable headers with RegionIcon, region name, version count badge, and animated chevron. Use `grid-template-rows: 0fr/1fr` transition for smooth expand/collapse. First region expanded by default.
- [x] 3.3 Implement expandable location overflow: show first 5 locations per version, render "+N more" as a clickable button that toggles showing all locations for that version.
- [x] 3.4 Remove the "And N more game versions..." truncation — all versions are now accessible within their region accordion.

## 4. Verify

- [x] 4.1 Run build and confirm no errors.
