## Context

The Pokemon Dex is a Next.js 16 App Router project using Tailwind CSS 4. The grid page fetches Pokemon via PokeAPI paginated. We need a detail page at `/pokemon/[id]` that fetches comprehensive data from multiple PokeAPI endpoints and renders it server-side.

## Goals / Non-Goals

**Goals:**
- Show full Pokemon detail: artwork, stats, types, evolution chain with conditions, abilities with descriptions, encounter locations, flavor text, height/weight
- Server-side rendering for SEO and fast initial paint
- Visual evolution chain showing arrows/flow between stages with condition labels
- Responsive layout that works on mobile and desktop
- Back navigation to the grid

**Non-Goals:**
- Static generation of all 1025 detail pages at build time (too slow; use on-demand SSR)
- Move list (too long, adds complexity — future change)
- Competitive tier info or damage calculator
- Shiny sprites toggle

## Decisions

### 1. Dynamic route with on-demand SSR

**Choice:** `app/pokemon/[id]/page.tsx` as a Server Component. No `generateStaticParams` — pages render on demand and cache via Next.js default caching.
**Alternatives:** Static generation (1025 pages at build = slow build, stale data), client-side fetching (no SEO, loading spinner).
**Rationale:** On-demand SSR gives fast initial paint, SEO, and fresh data without blowing up build time.

### 2. Parallel data fetching

**Choice:** Fetch `/pokemon/{id}`, `/pokemon-species/{id}`, and `/pokemon/{id}/encounters` in parallel using `Promise.all`. Then fetch evolution chain URL from species response, and ability details.
**Rationale:** Minimizes waterfall. Evolution chain URL is only available from the species response, so it's a two-stage fetch (parallel first stage, then chain + abilities).

### 3. Evolution chain visualization

**Choice:** Render evolution chain as a horizontal flow on desktop (stage → arrow with condition → stage) and vertical on mobile. Each stage shows the Pokemon sprite, name, and the evolution condition (level, item, trade, etc.) on the connecting arrow.
**Rationale:** Visual chain is the most intuitive way to understand evolution paths, including branching evolutions (e.g., Eevee).

### 4. Stat bars with color coding

**Choice:** Base stats rendered as horizontal bars with percentage fill (relative to max 255). Color coded: HP=green, Attack=red, Defense=orange, Sp.Atk=blue, Sp.Def=purple, Speed=pink.
**Rationale:** Familiar representation from the games. Max of 255 gives consistent scale.

### 5. Card becomes a Link

**Choice:** Wrap `PokemonCard` content in `next/link` pointing to `/pokemon/{id}`.
**Rationale:** Simple navigation, enables prefetching, maintains card styling.

## Risks / Trade-offs

- **[Multiple API calls per detail page]** → 3-5 fetches per page load. Mitigated by `Promise.all` parallelism and Next.js fetch caching (responses cached by default).
- **[Evolution chain branching complexity]** → Eevee has 8 evolutions. Handled by recursively rendering the chain tree, with horizontal scroll on overflow.
- **[Encounter data can be empty]** → Some Pokemon have no wild encounters. Show "Not available in the wild" fallback.
- **[Ability descriptions may be missing in English]** → Filter `effect_entries` for English language, show "No description available" fallback.
