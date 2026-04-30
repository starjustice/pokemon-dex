## 1. Layout Restructure

- [x] 1.1 Update `PokemonGrid.tsx` layout: search bar full-width on its own row, filter controls on a separate row below
- [x] 1.2 Add section labels ("Filter by Type", "Generation") to the filter panel

## 2. Filter Panel Improvements

- [x] 2.1 Increase type toggle button tap targets (minimum `px-3 py-1.5`) and improve active/inactive visual states with clear hover effects
- [x] 2.2 Add collapsible filter panel on mobile: "Filters" toggle button visible below `lg`, filters always visible on `lg+`
- [x] 2.3 Make generation dropdown consistent height with other controls

## 3. Active Filter Chips

- [x] 3.1 Create `ActiveFilterChips` component: horizontal row of dismissible chips showing each active filter (type names, generation, search term) with individual "x" dismiss buttons
- [x] 3.2 Integrate chips into `PokemonGrid.tsx` between filter controls and card grid

## 4. Clear All Button

- [x] 4.1 Replace "Clear all filters" text link with a styled button (background color, rounded, hover state) in both the filter status bar and empty state
- [x] 4.2 Show "Clear all" button at the end of the active filter chips row

## 5. Polish and Verification

- [x] 5.1 Verify no overlap between search and filters on all breakpoints (mobile, tablet, desktop)
- [x] 5.2 Run `npm run build` and `npm run lint` to ensure no errors
