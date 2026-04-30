## Why

The current search and filter UI has usability issues that hurt the user experience. The search bar and type filter buttons are laid out in a single row on desktop, causing the search bar to overlap/crowd the type toggle buttons — making them hard to click. The "Clear all filters" action is plain text that doesn't look clickable, and there's no visual affordance that it's an interactive element. The overall filter area needs a clearer visual hierarchy and better spacing.

## What Changes

- Restructure the search/filter layout: search bar on its own row, type filters and generation dropdown on a separate row below, with clear section labels
- Replace the "Clear all filters" text link with a visible, styled button
- Add active filter summary chips/tags showing what's currently filtered, with individual dismiss (x) buttons
- Improve type filter button sizing and spacing so all 18 types are easily clickable on all screen sizes
- Add a collapsible/expandable filter section on mobile to save vertical space
- Improve overall visual hierarchy with section labels ("Filter by Type", "Generation") and consistent spacing

## Capabilities

### New Capabilities

### Modified Capabilities
- `pokemon-search-filter`: Restructuring layout so search and filters don't overlap, improving clear button visibility, adding active filter chips, and improving mobile UX with collapsible filters

## Impact

- `components/PokemonGrid.tsx` — layout restructure for search/filter section
- `components/SearchBar.tsx` — minor styling adjustments
- `components/FilterPanel.tsx` — major rework: separated rows, section labels, better button sizing, collapsible on mobile
- No API or data model changes
