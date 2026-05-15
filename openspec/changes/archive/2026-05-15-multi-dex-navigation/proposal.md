## Why

The app is currently a single-purpose Pokemon Dex. To expand into other content areas (Skills/Moves, Map, Items, etc.), we need a top-level navigation system that lets users switch between different "dex" sections. This change adds the navigation infrastructure and a placeholder Skill Dex page — no API integration for skills yet, just the page shell and the ability to switch between Pokemon Dex and Skill Dex.

## What Changes

- Add a top-level tab/navigation bar to switch between dex sections (Pokemon, Skills)
- Move the current home page content to `/pokemon` (or keep at `/` with tab routing)
- Add a new `/skills` route with a placeholder page (styled, no API data)
- Update SiteHeader to include dex navigation tabs
- The Skill Dex page shows a title, subtitle, and a "Coming Soon" or empty grid placeholder — no PokeAPI calls

## Capabilities

### New Capabilities
- `dex-navigation`: Top-level navigation tabs for switching between dex sections (Pokemon, Skills, and extensible for future sections like Map, Items)
- `skill-dex-page`: Placeholder Skill Dex page at `/skills` with styled empty state, ready for future API integration

### Modified Capabilities
- `site-header`: Add navigation tabs below the title for dex switching
- `pokemon-card-list`: No behavior change, but home page route may shift from `/` to being tab-aware

## Impact

- `components/SiteHeader.tsx` — Add dex navigation tabs
- `app/page.tsx` — Update to show dex selector or redirect
- `app/skills/page.tsx` — New route (placeholder)
- New component: `DexTabs.tsx` (or integrated into SiteHeader)
- No API changes, no data model changes
