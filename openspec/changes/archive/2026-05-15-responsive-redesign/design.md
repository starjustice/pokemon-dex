## Context

The app currently uses a collapsible filter panel that expands inline on mobile, pushing the grid down. The body font falls back to Arial despite Geist being loaded. The detail page uses the same spacing/typography regardless of viewport. Users on mobile find it hard to read details and the filter UX feels clunky.

## Goals / Non-Goals

**Goals:**
- Mobile-first filter UX: FAB + bottom sheet for search/filter on < `lg` screens
- Fix font stack so Geist is actually applied (body uses `font-sans` class)
- Improve mobile readability on detail page (larger base text, more vertical spacing)
- Better card grid density on mobile (breathing room, larger touch targets)

**Non-Goals:**
- Redesigning the desktop layout (keep as-is for `lg+`)
- Adding new features or data
- Changing the color scheme or dark mode behavior
- Tablet-specific breakpoint (`md`) — just phone (`< lg`) vs desktop (`lg+`)

## Decisions

### 1. FAB + Bottom Sheet for Mobile Filters

**Choice:** A floating action button (fixed bottom-right) that opens a full-width bottom sheet with search + filters.

**Why over current collapsible:**
- Bottom sheet is the standard mobile pattern (Maps, Spotify, iOS share)
- Keeps the grid always visible until explicitly opening filters
- Search bar inside the sheet means the grid has maximum vertical space
- Active filter count badge on FAB gives at-a-glance feedback

**Implementation:**
- `FilterFAB.tsx` — Client component, fixed position, shows filter icon + badge count
- `FilterSheet.tsx` — Client component, renders a backdrop + slide-up panel with search, type toggles, generation, mega toggle, and "Apply" / "Clear all" buttons
- On `lg+`, hide FAB and show the existing inline `SearchBar` + `FilterPanel`
- Sheet uses CSS `translate-y` animation (keyframe in globals.css)
- Sheet traps focus and closes on backdrop click or swipe-down

### 2. Font Fix

**Choice:** Add `font-sans` class to `<body>` and remove the explicit `font-family: Arial` from globals.css.

**Why:** Geist is already loaded via `next/font` and the CSS variable `--font-geist-sans` is set on `<html>`. Tailwind's `font-sans` maps to `var(--font-sans)` which maps to `var(--font-geist-sans)`. The explicit `body { font-family: Arial }` in globals.css overrides this.

### 3. Detail Page Mobile Typography

**Choice:** Use responsive Tailwind classes for text size and spacing:
- Section headings: `text-lg sm:text-xl`
- Body text / flavor text: `text-base` (currently likely `text-sm`)
- Section padding: `px-4 sm:px-6 lg:px-8`
- Stat bars and labels: ensure minimum `text-sm` on mobile

### 4. Card Grid Mobile Adjustments

**Choice:** On mobile (`< sm`), show single column with slightly larger card height and more padding. On `sm`, 2 columns. Keep `lg:3` and `xl:4` as-is.

Current: `grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4` — this is fine but cards need more internal padding on mobile.

## Risks / Trade-offs

- **[Duplicate search/filter state]** The sheet and inline filter share the same state in PokemonGrid. The sheet just renders the controls differently. No duplication risk since the sheet receives the same callbacks. → Mitigation: Single source of truth in PokemonGrid, sheet is purely presentational.
- **[Sheet body scroll lock]** When sheet is open, background should not scroll. → Mitigation: `overflow: hidden` on body when sheet open, restore on close.
- **[Animation performance]** Bottom sheet slide uses `transform` (GPU-accelerated), not `height`/`top`. No jank expected.
- **[Two render paths]** Mobile shows FAB, desktop shows inline. Both are conditionally rendered via Tailwind `hidden lg:block` / `lg:hidden`. No JS media queries needed.
