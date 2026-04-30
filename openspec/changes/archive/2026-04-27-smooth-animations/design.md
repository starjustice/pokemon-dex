## Context

The Pokemon Dex currently renders filter results, chips, and loading states with no transitions. When filters change, the entire card grid re-renders instantly causing a visual "blink." Filter chips appear/disappear without animation. The scroll loading spinner is functional but plain. All styling uses Tailwind CSS 4 with no animation library.

## Goals / Non-Goals

**Goals:**
- Smooth fade+scale entrance for cards when filter results change
- Animated enter/exit for filter chips
- Fade-in for scroll loading indicator
- Keep animations performant (CSS-only, GPU-accelerated `transform`/`opacity`)
- No new dependencies

**Non-Goals:**
- Complex staggered animations or page transitions
- Animation library (framer-motion, react-spring, etc.)
- Animating card removal (cards simply disappear when filtered out — animating exit requires layout animation which adds complexity for little gain)

## Decisions

### 1. CSS `@keyframes` + Tailwind `animate-*` classes

**Choice:** Define custom `@keyframes` in `globals.css` and reference via Tailwind `@theme` or inline `animate-[name]` classes.
**Alternatives:** framer-motion (heavy, 30KB+), react-spring (complex API), `useLayoutEffect` FLIP animations (fragile with React 19 concurrent rendering).
**Rationale:** Pure CSS animations are the lightest approach, GPU-accelerated, and work with SSR. Tailwind v4 `@theme` lets us register custom animation names.

### 2. Card entrance via `animate-fadeIn` on each card

**Choice:** Apply a `fadeIn` animation (opacity 0→1 + slight scale 0.95→1) to each `PokemonCard` wrapper. Use a staggered delay based on index within the visible page to create a cascade effect.
**Rationale:** Prevents the "blink" by smoothly fading cards in. Stagger gives a polished waterfall feel without being slow (50ms increments, capped).

### 3. Chip animations via CSS transitions on wrapper

**Choice:** Chips animate in with `fadeIn` scale+opacity. No exit animation — chips simply unmount when removed.
**Rationale:** Exit animations require deferred unmounting (keeping the element in DOM during animation) which adds state complexity. The enter animation alone is enough to feel smooth — removal is instant and feels responsive.

### 4. Loading indicator fade-in

**Choice:** Add `animate-fadeIn` to the loading trigger container so the spinner fades in smoothly rather than popping in.
**Rationale:** Simple, single animation that softens the appearance of the loading state.

## Risks / Trade-offs

- **[Stagger performance with many cards]** → Cap stagger delay at 20 items (1 second max). Cards beyond that get no additional delay.
- **[No exit animation on cards/chips]** → Acceptable trade-off. Exit animations require significant complexity (deferred unmount, layout measurement). Enter-only animation handles the main "blink" complaint.
- **[Animation on every re-render]** → Use CSS `animation-fill-mode: both` so animation only plays once per mount. React's `key` prop ensures cards re-animate only when the card identity changes.
