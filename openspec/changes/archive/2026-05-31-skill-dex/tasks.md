## 1. Data Layer

- [x] 1.1 Create `lib/moves.ts` with interfaces: `MoveSummary` (id, name, type, power, accuracy, pp, damageClass, generation), `MoveDetail` (extends with effectShort, effectFull, flavorText, learnedByPokemon, priority, target, meta)
- [x] 1.2 Implement `fetchMovesPage(offset, limit)` — fetches list then individual move details for a page of moves
- [x] 1.3 Implement `fetchAllMoveNames()` with module-level cache — returns all 937 `{id, name}` pairs
- [x] 1.4 Implement `fetchMovesSummary()` — fetches all moves' basic data in parallel batches of 50, caches result for filtering/sorting
- [x] 1.5 Implement `fetchMoveDetail(id)` — full detail fetch for detail page
- [x] 1.6 Add `formatMoveName(name)` helper (kebab-case → Title Case)

## 2. Damage Class Config

- [x] 2.1 Create `lib/damage-class.ts` with `DAMAGE_CLASS_CONFIG` map: physical (icon: ⚔️, colors: orange), special (icon: ✦, colors: indigo), status (icon: ◉, colors: emerald)
- [x] 2.2 Export active/inactive color variants for chip buttons + card accents

## 3. Skill Card Component

- [x] 3.1 Create `components/SkillCard.tsx` — wide horizontal card with `border-l-4` (type color), damage class icon, name, type·class label, PWR/ACC/PP stats
- [x] 3.2 Link entire card to `/skills/{id}`
- [x] 3.3 Show "—" for null power/accuracy (status moves)
- [x] 3.4 Dark mode variants

## 4. Skill Filter Components

- [x] 4.1 Create `components/SkillFilterFAB.tsx` — same pattern as ItemFilterFAB (fixed bottom-right, filter icon, badge)
- [x] 4.2 Create `components/SkillFilterSheet.tsx` — bottom-sheet with: search input, damage class pills, type chips (scrollable), generation pills, sort dropdown, clear all button
- [x] 4.3 Animations: reuse `animate-sheetUp`/`animate-sheetDown`, body scroll lock

## 5. Skill Grid Component

- [x] 5.1 Create `components/SkillGrid.tsx` as client component with state: search, damageClass, type, generation, sort, moves array
- [x] 5.2 Initial load: fetch first 40 moves via `fetchMovesPage(0, 40)`
- [x] 5.3 Desktop inline filters (`hidden lg:block`): search input, damage class pills row, type chips (scrollable, using TYPE_COLORS), generation pills, sort dropdown
- [x] 5.4 Infinite scroll: IntersectionObserver loads next 40 from filtered/sorted results
- [x] 5.5 Filter logic: on first filter interaction, call `fetchMovesSummary()` to get all data, then filter/sort client-side
- [x] 5.6 Mobile: show SkillFilterFAB + SkillFilterSheet, hide inline filters
- [x] 5.7 Loading states, empty state ("No moves found"), clear filters button

## 6. Skills List Page

- [x] 6.1 Rewrite `app/skills/page.tsx` — replace placeholder with SiteHeader (subtitle: "Browse Pokemon moves and skills") + `<SkillGrid />`

## 7. Skill Detail Page

- [x] 7.1 Create `app/skills/[id]/page.tsx` as Server Component — calls `fetchMoveDetail(id)`
- [x] 7.2 Hero section: damage class icon (large, colored), formatted name, type badge + class badge, three stat blocks (PWR/ACC/PP as large numbers with labels)
- [x] 7.3 Effect section: render effect text with `effect_chance` interpolated
- [x] 7.4 Flavor text section: latest English flavor text in italics
- [x] 7.5 Metadata section: generation, priority, target in key-value grid
- [x] 7.6 Learned-by section: Pokemon names as links to `/pokemon/{id}`, capped at 30 with "Show all" expand
- [x] 7.7 Back navigation to `/skills`, dark mode support

## 8. Verification

- [x] 8.1 Run `npm run build` — confirm zero type errors
- [x] 8.2 Verify: `/skills` loads with move cards showing type border, class icon, stats
- [x] 8.3 Verify: damage class pills filter moves correctly
- [x] 8.4 Verify: type chips filter by move type
- [x] 8.5 Verify: search filters by name
- [x] 8.6 Verify: sort reorders (by power, accuracy, name)
- [x] 8.7 Verify: infinite scroll loads more moves
- [x] 8.8 Verify: mobile FAB opens sheet with all filters
- [x] 8.9 Verify: `/skills/{id}` detail page shows full move info
- [x] 8.10 Verify: dark mode works on all components
