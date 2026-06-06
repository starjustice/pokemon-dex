## Why

The app currently covers Pokemon, Mega Evolutions, and a placeholder Skills page. Adding an Item Dex expands the encyclopedia to cover the 2,000+ items in the Pokemon universe — Poke Balls, healing items, held items, evolution stones, TMs, berries, and more. Items are a core part of the games and frequently searched by players.

## What Changes

- Add a new `/items` route with a browsable, searchable grid of Pokemon items
- Display item sprites, names, categories, and cost
- Support search by name and filtering by category
- Add item detail view showing full effect text, flavor text, held-by-pokemon, and related info
- Add "Items" nav link to the sidebar
- Create data fetching layer for PokeAPI item endpoints (`/api/v2/item/`, `/api/v2/item-category/`)

## Capabilities

### New Capabilities
- `item-list`: Browsable grid of items with search, category filtering, pagination (similar pattern to Pokemon grid)
- `item-detail`: Detail page for individual items showing sprite, effect, flavor text, category, cost, attributes, held-by-pokemon
- `item-data-fetching`: Data layer for PokeAPI item endpoints — types, fetch functions, caching

### Modified Capabilities
- `dex-navigation`: Adding "Items" nav link to the sidebar NAV_ITEMS array
- `sidebar-layout`: No spec-level change (just adding a nav item, covered by dex-navigation)

## Impact

- **New files**: `app/items/page.tsx`, `app/items/[id]/page.tsx`, `components/ItemGrid.tsx`, `components/ItemCard.tsx`, `lib/items.ts`
- **Modified files**: `components/AppSidebar.tsx` (add Items nav link)
- **API dependency**: PokeAPI `/api/v2/item/` and `/api/v2/item-category/` endpoints
- **No breaking changes** to existing functionality
