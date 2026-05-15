## Why

The current mobile experience is functional but hard to read and navigate. The body font falls back to Arial which is poor for small screens, the filter panel takes up too much vertical space when expanded on mobile, and the detail page sections are cramped on narrow viewports. A floating filter button (FAB) with a bottom sheet modal would be more intuitive on mobile — keeping the grid visible and making filters feel like a native mobile interaction.

## What Changes

- Replace the collapsible filter panel on mobile with a floating action button (FAB) that opens a bottom-sheet modal containing search + all filters
- Keep the inline filter panel on desktop (`lg+`) unchanged
- Switch the body font from Arial fallback to using the loaded Geist font properly via Tailwind's `font-sans` utility
- Improve detail page typography and spacing for mobile readability (larger text, more padding)
- Improve card grid spacing and sizing on mobile (single column with larger cards)
- Add responsive padding/margins throughout for better breathing room on small screens

## Capabilities

### New Capabilities
- `mobile-filter-sheet`: Floating filter button + bottom-sheet modal for mobile filter UX. Search bar, type toggles, generation select, and mega toggle inside a slide-up sheet. Active filter count badge on FAB.

### Modified Capabilities
- `pokemon-search-filter`: On mobile, search bar and filter panel move into the bottom sheet instead of being inline. Desktop layout unchanged.
- `pokemon-card-list`: Improved card sizing, spacing, and font sizes for mobile readability.
- `pokemon-detail`: Better typography scale, section spacing, and padding on mobile viewports.

## Impact

- `components/FilterPanel.tsx` — Major refactor: split into desktop inline panel + mobile bottom sheet
- `components/PokemonGrid.tsx` — Conditional rendering: show FAB on mobile, inline filters on desktop
- `components/PokemonCard.tsx` — Spacing/typography adjustments
- `app/globals.css` — Fix font-family to use `font-sans` (Geist), add bottom-sheet animation keyframes
- `app/pokemon/[id]/page.tsx` — Responsive spacing/typography improvements
- New components: `FilterFAB.tsx`, `FilterSheet.tsx`
