## 1. Data Layer

- [x] 1.1 Create `lib/items.ts` with TypeScript interfaces: `ItemBasic`, `ItemDetail`, `ItemCategory`, `ItemCategoryGroup`
- [x] 1.2 Implement `fetchItemPage(offset, limit)` — fetches paginated item list, resolves each item's basic info (id, name, sprite, category, cost)
- [x] 1.3 Implement `fetchItemDetail(id)` — fetches full item data from `/api/v2/item/{id}`
- [x] 1.4 Implement `fetchAllItemNames()` with module-level cache — returns all 2,176 item names for search
- [x] 1.5 Implement `fetchItemCategories()` with module-level cache — returns all category names

## 2. Category Mapping

- [x] 2.1 Create `lib/item-categories.ts` with `ITEM_CATEGORY_GROUPS` static map (8 super-categories mapping to raw API category names)
- [x] 2.2 Export helper `getCategoryGroup(apiCategoryName): string` that returns the super-category label
- [x] 2.3 Export `CATEGORY_GROUP_COLORS` map for badge styling per group

## 3. Item Grid Component

- [x] 3.1 Create `components/ItemCard.tsx` — displays item sprite, name, category badge (colored), and cost. Links to `/items/{id}`
- [x] 3.2 Create `components/ItemGrid.tsx` as client component with: search input, category group dropdown, item grid, infinite scroll
- [x] 3.3 Implement search: fetch all names on mount, filter client-side, show matching items via `fetchItemPage` or ID-based fetch
- [x] 3.4 Implement category filter: dropdown with 8 super-categories + "All", filters items by category group
- [x] 3.5 Implement infinite scroll: IntersectionObserver triggers loading next 40 items
- [x] 3.6 Handle loading states, empty states ("No items found"), and dark mode variants

## 4. Items List Page

- [x] 4.1 Create `app/items/page.tsx` as Server Component with SiteHeader (subtitle: "Browse Pokemon items") and `<ItemGrid />`
- [x] 4.2 Ensure static generation works (no dynamic params on list page)

## 5. Item Detail Page

- [x] 5.1 Create `app/items/[id]/page.tsx` as Server Component — calls `fetchItemDetail(id)`
- [x] 5.2 Hero section: large sprite (or placeholder), formatted name, category badge, cost display
- [x] 5.3 Effect section: render short_effect + full effect text (English)
- [x] 5.4 Flavor text section: display latest version-group English flavor text
- [x] 5.5 Attributes section: render attribute badges (countable, consumable, holdable, etc.)
- [x] 5.6 Held-by-Pokemon section: list Pokemon names as links to `/pokemon/{pokemonId}` (extract ID from URL)
- [x] 5.7 Back navigation link to `/items`
- [x] 5.8 Dark mode support for all sections

## 6. Navigation Update

- [x] 6.1 Add "Items" to `NAV_ITEMS` in `components/AppSidebar.tsx` with a backpack SVG icon, placed between Pokemon and Skills
- [x] 6.2 Ensure active state works for `/items` and `/items/[id]` routes (uses `pathname.startsWith('/items')`)

## 7. Verification

- [x] 7.1 Run `npm run build` — confirm zero type errors
- [x] 7.2 Verify: `/items` page loads with grid of items showing sprites and info
- [x] 7.3 Verify: search filters items by name in real-time
- [x] 7.4 Verify: category dropdown filters items by group
- [x] 7.5 Verify: infinite scroll loads more items on scroll
- [x] 7.6 Verify: clicking an item navigates to `/items/{id}` with full detail
- [x] 7.7 Verify: "Items" appears in sidebar nav with correct active state
- [x] 7.8 Verify: dark mode works on both list and detail pages
