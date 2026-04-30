## Context

EncounterList currently receives `EncounterLocation[]` with `{ locationName, versionName, conditions }`. It groups by version, shows first 5 versions with first 5 locations each, then truncates. No interactivity — it's a server component.

Version names from PokeAPI correspond to game versions (e.g., "platinum", "gold", "crystal", "diamond"). These can be mapped to regions.

## Goals / Non-Goals

**Goals:**
- Make all truncated content expandable via click
- Group game versions by region for better organization
- Show a small decorative region map image as a visual header per region group
- Smooth expand/collapse animations

**Non-Goals:**
- Interactive/clickable maps with location pins
- Additional API calls for region data
- Routing to location-specific pages

## Decisions

1. **Region mapping**: Static lookup object mapping version names to regions (e.g., `{ gold: "Johto", platinum: "Sinnoh" }`). This avoids extra API calls. Unmapped versions go under "Other".

2. **Region map images**: Use simple stylized region silhouette images stored in `public/images/regions/`. These are small decorative headers (~200px wide) showing the region outline. Source: create simple colored SVG silhouettes inline (no external images needed — use inline SVGs or colored placeholder divs with region name if images aren't available).

3. **Component structure**: Single client component `EncounterList` with internal state:
   - `expandedRegions: Set<string>` — which region accordions are open
   - `expandedVersions: Set<string>` — which version location lists are fully expanded
   - Default: first region expanded, rest collapsed

4. **Expand/collapse UI**:
   - Region header: clickable row with region name + map thumbnail + chevron. Click toggles accordion.
   - Version within region: shows first 5 locations, "+N more" is a clickable button that reveals all.
   - No "16 more game versions" text — all versions visible under their region accordion.

5. **Animation**: Use CSS `max-height` transition or `grid-template-rows: 0fr → 1fr` for smooth expand/collapse.

## Risks / Trade-offs

- [Incomplete mapping] Some obscure versions may not map to a region → "Other" group handles this
- [No real maps] Using decorative region silhouettes rather than actual location maps — acceptable given scope
- [Bundle size] Inline SVGs keep it lightweight vs external images
