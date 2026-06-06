## Context

The Pokemon grid already implements this exact pattern via `FilterFAB.tsx` + `FilterSheet.tsx`. The item grid currently uses inline search + native dropdown. We'll replicate the Pokemon approach: desktop gets colorful inline chips, mobile gets a FAB that opens a slide-up bottom-sheet with the same filter controls.

The existing `FilterSheet` for Pokemon handles types, generations, and mega toggle. The item version is simpler — just search + 8 category groups — but should follow the same animation and layout patterns.

## Goals / Non-Goals

**Goals:**
- Category chips on desktop: horizontal scrollable row of colored pill buttons with emoji/icons
- Mobile FAB with active filter count badge (bottom-right, `z-40`)
- Mobile bottom-sheet with search input + category chips + clear all
- Reuse existing `sheetSlideUp`/`sheetSlideDown` keyframe animations
- Inline filters hidden on mobile, FAB hidden on desktop
- Consistent dark mode support

**Non-Goals:**
- Reusing the actual `FilterSheet.tsx` component (too coupled to Pokemon types/gens)
- Multi-select categories (keep single-select for simplicity)
- Sort options (alphabetical, cost) — separate future change
- Persistent filter state in URL params

## Decisions

### 1. Separate `ItemFilterSheet` and `ItemFilterFAB` Components

Create item-specific filter components rather than making the Pokemon ones generic.

**Why**: The filter content is different (categories vs types+gen+mega). Shared abstraction would add complexity for minimal reuse. Simpler to duplicate the shell pattern.

### 2. Category Chips with Emoji Icons

Each of the 8 super-categories gets a small emoji icon in the chip:
- Poke Balls: 🔴
- Medicine: 💊
- Held Items: 💎
- Evolution: ⚡
- TMs: 💿
- Berries: 🫐
- Battle: ⚔️
- Other: 📦

**Why**: Emojis are universally supported, no SVG complexity needed. Visually distinctive at small sizes. Easy to maintain.

### 3. Single-Select Chips (Toggle Off = All)

Clicking an active chip deselects it (shows all items). Only one category active at a time.

**Why**: Matches current behavior. Multi-select complicates the "AND" logic with search and would show confusing results for items that belong to exactly one category.

### 4. Reuse Existing Animations

Use `animate-sheetUp` / `animate-sheetDown` for the bottom-sheet (already defined in `globals.css`).

**Why**: Consistency with Pokemon filter sheet. No new keyframes needed.

### 5. Desktop Layout: Chips Below Search

On desktop, show search input full-width, then a scrollable row of category chips below it. Active chip gets filled color + white text.

**Why**: Horizontal chip row is more visually scannable than a dropdown. Same pattern used in many filter UIs (Airbnb, Figma, etc).

## Risks / Trade-offs

- **8 chips may overflow on small desktops** → Use `overflow-x-auto` with hidden scrollbar for clean horizontal scroll
- **Emoji rendering varies across OS** → Acceptable; emojis are supplementary, color coding is the primary differentiator
- **Duplicating FAB/Sheet pattern** → Small code duplication but keeps components independent and simple
