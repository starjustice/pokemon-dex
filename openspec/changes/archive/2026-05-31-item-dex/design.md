## Context

The app has an established pattern for browsing entities: a client component grid with search/filter, pagination via offset/limit, and detail pages via dynamic routes. The Pokemon grid (`PokemonGrid.tsx`) uses client-side fetching with infinite scroll and category filtering. We'll follow the same patterns for items.

PokeAPI exposes 2,176 items across 54 categories. Items have sprites (single `default` PNG), cost, effect text, flavor text, category, attributes, and held-by-pokemon references. The API supports standard offset/limit pagination.

## Goals / Non-Goals

**Goals:**
- Browsable item grid with sprites, name, category badge, and cost
- Search by item name (client-side against cached name list, same as Pokemon)
- Filter by category (grouped into logical super-categories for UX)
- Item detail page with full info (effect, flavor text, held-by-pokemon links)
- Consistent with existing app patterns (sidebar nav, responsive design, dark mode)
- Performant: paginated loading, no loading all 2,176 items at once

**Non-Goals:**
- Berry-specific detail pages (complex berry data like firmness, growth — future change)
- TM/HM move associations (covered by future Skills/Moves dex)
- Item pocket grouping UI (too game-specific)
- Comparison features between items

## Decisions

### 1. Data Layer (`lib/items.ts`)

Follow the same pattern as `lib/pokemon.ts`:
- `fetchItemPage(offset, limit)` — returns basic item list with sprites
- `fetchItemDetail(id)` — returns full item data
- `fetchAllItemNames()` — cached name list for search
- `fetchItemCategories()` — cached category list for filter dropdown
- Module-level caches for names and categories (same as Pokemon name cache)

**Why**: Proven pattern, consistent codebase, minimal new abstractions.

### 2. Category Grouping

The 54 raw API categories are too granular for filtering UX. Group them into ~8 super-categories:
- **Poke Balls** (standard-balls, special-balls, apricorn-balls)
- **Medicine** (medicine, healing, revival, status-cures, pp-recovery, vitamins)
- **Held Items** (held-items, choice, type-enhancement, plates, mega-stones, z-crystals, memories)
- **Evolution** (evolution)
- **TMs** (all-machines, all-mail)
- **Berries** (in-a-pinch, picky-healing, type-protection, baking-only)
- **Battle** (stat-boosts, flutes, bad-held-items)
- **Other** (loot, collectibles, event-items, gameplay, training, nature-mints, etc.)

Store as a static `ITEM_CATEGORY_GROUPS` map in `lib/item-categories.ts`.

**Why**: Better UX than 54 options in a dropdown. Users think in terms of "balls", "medicine", not "standard-balls" vs "special-balls".

### 3. Grid Component (`ItemGrid.tsx`)

Client component, same architecture as `PokemonGrid.tsx`:
- Infinite scroll (40 items per page)
- Search input (filters against cached all-names list)
- Category group dropdown filter
- Uses `useTransition` for non-blocking UI

**Why**: Consistent with existing Pokemon grid. Users already understand the interaction.

### 4. Item Detail Page (`app/items/[id]/page.tsx`)

Server Component with SSR (same as Pokemon detail):
- Hero section: large sprite + name + category badge + cost
- Effect section: short_effect + full effect text
- Flavor text: latest version-group entry
- Held by Pokemon: links back to Pokemon detail pages
- Attributes: badges (countable, consumable, holdable, etc.)

**Why**: SEO-friendly, fast initial paint, consistent with Pokemon detail pages.

### 5. Navigation Integration

Add "Items" to `NAV_ITEMS` in `AppSidebar.tsx` with a backpack/bag icon. Place between Pokemon and Skills.

**Why**: Items is a primary section of the Pokedex, deserves top-level nav.

### 6. Item Sprites

Use `sprites.default` from PokeAPI (hosted on GitHub raw):
```
https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/{name}.png
```
Fallback: show a placeholder icon if sprite is null.

**Why**: Only one sprite variant exists for items (no shiny/back/etc).

## Risks / Trade-offs

- **2,176 items is large for name cache** → Same approach as Pokemon (1,025 names). 2x the size but still <100KB JSON. Acceptable.
- **Some items have no sprite** → Use a generic placeholder (package icon). Not all items have visual assets.
- **Category grouping is opinionated** → Some items could fit multiple groups. We pick the primary category from the API and map it. Users can always search by name.
- **PokeAPI rate limits** → Same risk as Pokemon fetching. Module-level caches mitigate repeated calls.
- **Items 1000+ may be obscure/incomplete** → Some newer items have sparse data. Show what's available, gracefully handle missing fields.
