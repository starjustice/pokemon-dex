## Context

The current search/filter UI has several usability problems:
1. Search bar and type filter buttons share a single row (`flex-row` on desktop), causing overlap — the search input crowds the 18 type toggle buttons making them hard to click
2. "Clear all filters" is a plain text link (`text-blue-500`) with no button affordance — users can't tell it's clickable
3. No visual summary of which filters are active — users lose track of what's filtered
4. On mobile, all 18 type buttons + search + generation dropdown stack in a long vertical column

All changes are CSS/layout and component restructuring — no data model or API changes.

## Goals / Non-Goals

**Goals:**
- Search bar and filters never overlap — each gets its own visual row
- All interactive elements look obviously clickable (buttons, not text links)
- Active filters are summarized as dismissible chips/tags
- Type filter buttons are large enough to tap on mobile
- Filter section is collapsible on mobile to save vertical space
- Clear visual hierarchy with section labels

**Non-Goals:**
- Changing filter logic (AND/OR behavior stays the same)
- Adding new filter types (e.g. ability filter)
- Changing the search debounce or data fetching

## Decisions

### 1. Stacked layout: search on top, filters below

Place the search bar full-width on its own row. Below it, a filter bar with type toggles and generation dropdown. This eliminates the overlap issue entirely.

**Alternative considered:** Side-by-side with fixed widths — rejected because 18 type buttons need significant horizontal space and would still overflow on smaller screens.

### 2. Collapsible filter panel on mobile

Wrap the filter section in a disclosure/toggle on screens below `lg`. A "Filters" button toggles visibility. On desktop (`lg+`), filters are always visible.

**Why:** 18 type buttons take up a lot of vertical space on mobile and push the card grid far down the page.

### 3. Active filter chips with dismiss buttons

When filters are active, show a horizontal row of chips (e.g. "Fire x", "Gen I x", "search: pika x") between the filter controls and the grid. Each chip has an "x" dismiss button. A "Clear all" button (styled as a real button) appears at the end.

**Why:** Gives users clear visibility into what's filtered and a quick way to remove individual filters.

### 4. Improved button sizing and visual affordance

- Type toggle buttons: larger tap targets (`px-3 py-1.5` minimum), clear active/inactive visual states
- "Clear all filters": styled as a visible button with background color, not a text link
- Generation dropdown: consistent height with search bar

## Risks / Trade-offs

- **[More vertical space used on desktop]** → Acceptable trade-off for clarity; the stacked layout is only ~40px taller
- **[Collapsible filters hide controls on mobile]** → Mitigated by showing active filter chips even when panel is collapsed, so user always sees what's filtered
