## 1. Font Fix

- [x] 1.1 In `app/globals.css`, remove the `body { font-family: Arial, Helvetica, sans-serif; }` rule
- [x] 1.2 In `app/layout.tsx`, add `font-sans` class to the `<body>` element so Geist is applied

## 2. Bottom Sheet Animation

- [x] 2.1 In `app/globals.css`, add `@keyframes sheet-slide-up` (`translateY(100%)` → `translateY(0)`) and `@keyframes sheet-slide-down` (`translateY(0)` → `translateY(100%)`)
- [x] 2.2 Add utility classes `.animate-sheetUp` (300ms ease-out) and `.animate-sheetDown` (200ms ease-in)

## 3. FilterFAB Component

- [x] 3.1 Create `components/FilterFAB.tsx` — client component, fixed `bottom-6 right-6`, filter icon SVG, badge showing active filter count (hidden when 0), `lg:hidden`
- [x] 3.2 FAB onClick opens the filter sheet (calls a prop callback)

## 4. FilterSheet Component

- [x] 4.1 Create `components/FilterSheet.tsx` — client component accepting: `isOpen`, `onClose`, search value/onChange, selectedTypes/onTypeToggle, selectedGeneration/onGenerationChange, hasMega/onHasMegaToggle, onClearAll
- [x] 4.2 Render backdrop overlay (semi-transparent black, closes on tap)
- [x] 4.3 Render slide-up panel with: search input at top, type toggles (reuse existing toggle button styles), generation select, mega toggle, active filter summary, "Clear all" and "Done" buttons at bottom
- [x] 4.4 Lock body scroll when open (`document.body.style.overflow = 'hidden'`), restore on close
- [x] 4.5 Apply `animate-sheetUp` on open, `animate-sheetDown` on close (use state to delay unmount)

## 5. PokemonGrid Integration

- [x] 5.1 Add `isSheetOpen` state to PokemonGrid
- [x] 5.2 On mobile (< lg): hide inline `SearchBar` and `FilterPanel` using `hidden lg:block`
- [x] 5.3 On mobile: render `FilterFAB` (with active filter count) and `FilterSheet` (passing all filter state + callbacks)
- [x] 5.4 Keep `ActiveFilterChips` visible on all screen sizes (above the grid)

## 6. Card Grid Mobile Spacing

- [x] 6.1 In `PokemonGrid.tsx`, update grid classes to `gap-5 sm:gap-4` for more mobile spacing
- [x] 6.2 In `PokemonCard.tsx`, increase mobile padding and name text to `text-base sm:text-sm`

## 7. Detail Page Mobile Typography

- [x] 7.1 In `app/pokemon/[id]/page.tsx`, update section container padding to `px-4 sm:px-6 lg:px-8`
- [x] 7.2 Update section headings to `text-lg sm:text-xl`
- [x] 7.3 Update flavor text / body text to `text-base` (ensure not `text-sm` on mobile)
- [x] 7.4 Update section vertical spacing to `space-y-6 sm:space-y-8`

## 8. Verification

- [x] 8.1 Run `npm run build` and confirm zero type errors
- [x] 8.2 Verify: on mobile viewport, FAB is visible, inline filters are hidden
- [x] 8.3 Verify: tapping FAB opens bottom sheet with search + filters
- [x] 8.4 Verify: on desktop (lg+), inline filters are visible, FAB is hidden
- [x] 8.5 Verify: Geist font is applied (not Arial) on all pages
- [x] 8.6 Verify: detail page text is readable on mobile (text-base, adequate padding)
