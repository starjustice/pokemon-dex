## Why

The current item list page uses a plain text input + native `<select>` dropdown for filtering. This feels disconnected from the Pokemon grid which has colorful type chips, a mobile FAB button, and an animated bottom-sheet filter modal. The item filters need the same level of polish — interactive category chips with colors/icons on desktop, and a mobile-first FAB + bottom-sheet experience.

## What Changes

- Replace the plain category `<select>` dropdown with horizontal scrollable category chip buttons (colored, with icons) on desktop
- Add a mobile FAB (floating action button) that opens a bottom-sheet filter modal on mobile (same pattern as Pokemon grid)
- Hide inline filters on mobile (`hidden lg:block`), show FAB instead
- Add smooth animations to filter transitions (chip active states, sheet slide-up/down)
- Add a "clear all" action when filters are active
- Add active filter count badge on FAB

## Capabilities

### New Capabilities
- `item-filter-sheet`: Mobile bottom-sheet for item filtering (search + category chips), same pattern as Pokemon `FilterSheet`
- `item-filter-chips`: Interactive category chip buttons with color coding and icons for desktop inline filtering

### Modified Capabilities
- `item-list`: Adding FAB integration, hiding inline filters on mobile, showing chip-based filters on desktop

## Impact

- **New files**: `components/ItemFilterSheet.tsx`, `components/ItemFilterFAB.tsx`
- **Modified files**: `components/ItemGrid.tsx` (replace select with chips, add FAB/sheet integration), `lib/item-categories.ts` (add icons per category group)
- **No breaking changes** — purely visual/UX improvements
