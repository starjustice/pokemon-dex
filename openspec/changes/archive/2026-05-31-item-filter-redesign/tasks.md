## 1. Category Icons & Colors Update

- [x] 1.1 In `lib/item-categories.ts`, add `CATEGORY_GROUP_ICONS` map with emoji per group (Poke Balls→🔴, Medicine→💊, Held Items→💎, Evolution→⚡, TMs→💿, Berries→🫐, Battle→⚔️, Other→📦)
- [x] 1.2 Add `activeBg`/`activeText`/`darkActiveBg`/`darkActiveText` to `CATEGORY_GROUP_COLORS` for filled chip states

## 2. ItemFilterFAB Component

- [x] 2.1 Create `components/ItemFilterFAB.tsx` — floating action button (`fixed bottom-6 right-6 z-40 lg:hidden`) with filter icon
- [x] 2.2 Accept `activeCount` and `onClick` props; show red badge when `activeCount > 0`
- [x] 2.3 Same styling as existing `FilterFAB.tsx` (blue circle, white icon, shadow)

## 3. ItemFilterSheet Component

- [x] 3.1 Create `components/ItemFilterSheet.tsx` — bottom-sheet modal with backdrop overlay
- [x] 3.2 Props: `isOpen`, `onClose`, `search`, `onSearchChange`, `selectedCategory`, `onCategoryChange`, `onClearAll`
- [x] 3.3 Content: search input (auto-focus on open) + category chips grid (2 cols on mobile) + "Clear all" button
- [x] 3.4 Animations: use `animate-sheetUp` on open, `animate-sheetDown` on close (with mount/unmount timing)
- [x] 3.5 Body scroll lock when open, restore on close
- [x] 3.6 Dark mode: dark backgrounds, borders, text colors

## 4. ItemGrid Redesign

- [x] 4.1 Replace `<select>` dropdown with horizontal scrollable category chips row (`hidden lg:flex`, `overflow-x-auto`, `gap-2`)
- [x] 4.2 Each chip: emoji icon + label, colored border/bg from `CATEGORY_GROUP_COLORS`, active state fills with color
- [x] 4.3 Wrap inline search + chips in a `hidden lg:block` container
- [x] 4.4 Add `ItemFilterFAB` (visible on mobile only) with active filter count
- [x] 4.5 Add `ItemFilterSheet` state management: `isSheetOpen`, open/close handlers
- [x] 4.6 Pass filter state (search, category) to sheet; sync changes back to grid state
- [x] 4.7 Add "Clear filters" button that appears when any filter is active (desktop)

## 5. Verification

- [x] 5.1 Run `npm run build` — confirm zero type errors
- [x] 5.2 Verify: on desktop, category chips display below search with correct colors and emojis
- [x] 5.3 Verify: clicking a chip filters items, clicking again clears filter
- [x] 5.4 Verify: on mobile, inline filters are hidden and FAB is visible
- [x] 5.5 Verify: tapping FAB opens bottom-sheet with search + category chips
- [x] 5.6 Verify: filters in sheet update the grid in real-time
- [x] 5.7 Verify: dark mode works on chips, FAB, and sheet
