## Context

The app has two established grid patterns: Pokemon (square cards, type-colored) and Items (square cards with sprites, category chips). Moves have no sprites and are more data-dense, requiring a different card approach. The UI/UX research recommends horizontal/wide cards with damage class as the primary visual signal (distinct from type-dominated Pokemon page).

PokeAPI exposes 937 moves. The list endpoint only returns `{name, url}` — individual fetches are needed for type/power/class data. No server-side filtering available, so we need a client-side filtering strategy with cached move data.

## Goals / Non-Goals

**Goals:**
- Wide horizontal move cards with: left border (type color), damage class icon, name, type + class text, stats row (power/accuracy/PP)
- Desktop: 2-3 column grid of wide cards, inline filters (search + damage class pills + type chips + gen pills)
- Mobile: single column cards, FAB + bottom-sheet filters
- Move detail page: hero with large stats, effect text, flavor text, learned-by Pokemon grid
- Sort by: name (default), power, accuracy
- Infinite scroll (40 per page)
- Dark mode throughout

**Non-Goals:**
- Ability browser (separate future change)
- Contest data (too niche)
- Move animations or visual effects
- Comparison between moves
- TM/HM association display (covered in items)

## Decisions

### 1. Data Layer (`lib/moves.ts`)

Two-phase approach:
- **Phase 1**: Fetch all move names (`/move/?limit=937`) — cached in module-level variable
- **Phase 2**: Fetch individual move details on-demand with a batch strategy

For the grid, we need type/power/class for filtering + display. Options:
- Fetch all 937 details upfront → too slow (~937 requests)
- Fetch page-by-page (40 at a time) → fast initial load, but filtering requires all data

**Decision**: Hybrid approach:
1. Load first 40 moves with full detail for immediate display
2. Background-fetch a "summary cache" of all moves (name, type, power, accuracy, pp, damage_class, generation) — store as a single large batch
3. Use the summary cache for client-side filtering and sort
4. Fetch full detail only on detail page navigation

**Implementation**: `fetchMovesSummary()` fetches all 937 moves' basic data in parallel batches of 50, caches the result. This runs once on first filter interaction.

**Why**: Balances fast initial load with complete filtering capability. Same trade-off as the Pokemon name cache.

### 2. Card Design — Wide Horizontal Cards

```
┌─────────────────────────────────────────┐
│▌ ⚔️  Flamethrower                       │
│▌     Fire · Special                     │
│▌     PWR 90 · ACC 100 · PP 15          │
└─────────────────────────────────────────┘
```

- `border-l-4` with type color (reuse `TYPE_COLORS` from existing `lib/type-colors.ts`)
- Damage class icon as visual anchor (orange for physical, indigo for special, emerald for status)
- Stats in monospace for alignment

**Why**: Moves are text+numbers, not visual. Wide cards scan better than square tiles for data-heavy content.

### 3. Damage Class as Primary Visual Signal

Three damage classes get distinct color schemes:
- **Physical**: orange tones (⚔️ sword icon)
- **Special**: indigo tones (✦ sparkle icon)
- **Status**: emerald tones (◉ shield icon)

Stored in `lib/damage-class.ts` as a static config.

**Why**: Creates visual distinction from Pokemon (type-colored) and Items (category emojis). Damage class is the most important tactical categorization.

### 4. Filter Architecture

Desktop inline filters (stacked rows):
1. Search input (full-width)
2. Damage class: 3 toggle pills + "All" (single-select)
3. Type: horizontal scrollable chips (single-select, uses existing type colors)
4. Generation: small pills I-IX (single-select)

Mobile: FAB + bottom-sheet with all filters stacked vertically.

**Why**: Consistent with existing filter patterns. Damage class first because it's the strongest 3-way split.

### 5. Detail Page (`/skills/[id]`)

Server Component (SSR) with:
- Hero: large damage class icon, name, type badge + class badge, stat blocks (PWR/ACC/PP as large numbers)
- Effect section: parsed effect text
- Flavor text: latest version-group entry
- Learned-by: grid of Pokemon mini-links (name only, links to `/pokemon/{id}`)

**Why**: SEO-friendly, consistent with Pokemon/Item detail pages.

### 6. Sort Options

A dropdown with: Name A-Z (default), Power High→Low, Accuracy High→Low.

**Why**: Moves benefit from sorting more than Pokemon/Items. Players often want "strongest fire move" etc.

## Risks / Trade-offs

- **937 moves for summary cache is large** → ~200KB JSON when compressed. Fetch in parallel batches (50 concurrent). Cache in module-level var, loads once per session. Acceptable.
- **Initial filter interaction has latency** → Show loading state while summary cache builds. First 40 moves load immediately.
- **Some moves have null power/accuracy** → Display "—" for nulls. Status moves commonly have null power.
- **learned_by_pokemon can be very large** → Cap display at 30 Pokemon with "Show all X" button.
- **No move sprites** → Damage class icons + type border provide enough visual interest.
