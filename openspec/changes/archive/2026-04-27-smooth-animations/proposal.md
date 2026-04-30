## Why

Interactions in the Pokemon Dex feel jarring — filter results appear/disappear instantly with no transition, filter chips pop in/out without animation, and the scroll loading indicator is a plain spinner. Adding smooth CSS transitions and animations will make the UI feel polished and responsive.

## What Changes

- Add fade/scale entrance animations to Pokemon cards when filter results change (prevent the "blink" effect)
- Add smooth enter/exit transitions to active filter chips (appear/remove with animation)
- Improve the scroll-loading spinner with a more engaging animation and fade-in
- Add transition to filter toggle buttons when selected/deselected
- Use CSS `@keyframes` and Tailwind utilities — no animation library dependency

## Capabilities

### New Capabilities
_(none)_

### Modified Capabilities
- `pokemon-search-filter`: Filter results and chips SHALL animate smoothly on add/remove
- `infinite-scroll`: Loading indicator SHALL fade in with improved animation
- `pokemon-card-list`: Cards SHALL animate in when appearing in filtered results

## Impact

- **`components/PokemonGrid.tsx`**: Add animated wrapper/CSS classes for card grid transitions
- **`components/ActiveFilterChips.tsx`**: Add enter/exit animations to chips
- **`components/LoadMoreTrigger.tsx`**: Improve loading animation with fade-in
- **`components/PokemonCard.tsx`**: Add entrance animation classes
- **`app/globals.css`**: Add `@keyframes` for custom animations
