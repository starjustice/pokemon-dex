## Why

The `/skills` page is currently a placeholder. The app covers Pokemon and Items but has no move/skill browser. Moves are a core part of Pokemon — players need to look up power, accuracy, type, damage class, effects, and which Pokemon learn a move. With 937 moves across 9 generations, a Skill Dex fills the biggest remaining gap in the encyclopedia.

## What Changes

- Replace the placeholder `/skills` page with a fully functional moves browser
- Display moves in wide horizontal cards showing type color accent, damage class icon, name, and stats (power/accuracy/PP)
- Support filtering by type (18 types), damage class (physical/special/status), generation, and search by name
- Add mobile FAB + bottom-sheet filter pattern (consistent with Items page)
- Add move detail page showing full effect, flavor text, stats, and learned-by Pokemon list
- Create data layer for PokeAPI move endpoints

## Capabilities

### New Capabilities
- `skill-list`: Browsable grid of moves with search, type/class/generation filtering, infinite scroll, horizontal card layout
- `skill-detail`: Detail page for individual moves showing stats, effect, flavor text, learned-by Pokemon
- `skill-data-fetching`: Data layer for PokeAPI move endpoints — types, fetch functions, caching

### Modified Capabilities
- `skill-dex-page`: Replacing the placeholder with the actual moves browser

## Impact

- **New files**: `app/skills/page.tsx` (rewrite), `app/skills/[id]/page.tsx`, `components/SkillGrid.tsx`, `components/SkillCard.tsx`, `components/SkillFilterSheet.tsx`, `components/SkillFilterFAB.tsx`, `lib/moves.ts`, `lib/damage-class.ts`
- **Modified files**: None beyond the skills page rewrite
- **API dependency**: PokeAPI `/api/v2/move/` and `/api/v2/move/{id}` endpoints
- **No breaking changes** to existing routes or components
