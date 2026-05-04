## Context

The detail page is server-rendered and currently shows all content instantly with no visual choreography. StatBar is a simple server component with a flat colored bar. We already have `fadeIn` and `fadeInUp` keyframes in `globals.css`. The project rule is CSS-only animations (no framer-motion, etc.).

## Goals / Non-Goals

**Goals:**
- Staggered entrance animations for each section on the detail page
- Animated stat bar fill (0% → actual width on load)
- 3D extruded stat bars with depth, highlight gradient, and hover lift
- Type badge pop-in animation
- Smooth accordion open/close for abilities and encounters

**Non-Goals:**
- Page transition animations (between routes)
- Skeleton/loading shimmer (already exists or SSR makes it unnecessary)
- Animation library dependencies
- Reduced-motion media query (could add later)

## Decisions

### 1. Staggered entrance: CSS `animation-delay` on section wrappers

Each section card on the detail page gets `animate-fadeInUp` with incrementing `animation-delay` (0ms, 100ms, 200ms, etc.). Use inline `style={{ animationDelay: 'Xms' }}` since Tailwind can't do arbitrary delays cleanly.

- Sections start with `opacity: 0` via the animation's `from` state and `animation-fill-mode: both`
- No JS needed — pure CSS with the existing `fadeInUp` keyframe
- Hero section: 0ms delay, Stats: 100ms, Evolution: 200ms, Mega: 300ms, Abilities: 400ms, Encounters: 500ms

### 2. StatBar 3D: CSS box-shadow + gradient layers

The 3D look uses layered techniques:
- **Outer trough**: `inset` box-shadow to create a recessed container
- **Fill bar**: Multiple gradients — a main color, a lighter top highlight stripe (simulates light reflection), and a darker bottom edge
- **Depth shadow**: `box-shadow` on the fill bar creating a "raised" 3D extrusion effect below
- **Hover**: On hover, the fill bar shifts up slightly (`translateY(-1px)`) with increased shadow, giving a "lift" feel
- **Needs `"use client"`**: For the hover state interaction and animated fill

### 3. Stat bar fill animation: CSS `@keyframes fillBar`

```css
@keyframes fillBar {
  from { width: 0%; }
  to { width: var(--fill); }
}
```

Each bar uses a CSS custom property `--fill` set via inline style. The animation runs once on mount with staggered delays per stat (HP: 0ms, Attack: 50ms, etc.).

### 4. Type badge pop-in: `@keyframes popIn`

```css
@keyframes popIn {
  0% { transform: scale(0); opacity: 0; }
  70% { transform: scale(1.15); }
  100% { transform: scale(1); opacity: 1; }
}
```

Each type badge gets this animation with slight stagger.

### 5. Accordion animation: CSS grid row transition

AbilityList and EncounterList already use accordion patterns. Enhance with `grid-template-rows: 0fr` → `1fr` transition for smooth height animation (if not already implemented — EncounterList may already have this).

## Risks / Trade-offs

- **SSR + animation-fill-mode `both`** — Sections start invisible (`opacity: 0`) until JS/CSS runs. Since Next.js inlines critical CSS, this should work, but if CSS is delayed, users might see a blank page briefly. Acceptable trade-off for the visual effect.
- **3D stat bar complexity** — Multiple box-shadows and gradients increase paint cost. With only 6 bars, this is negligible.
- **No reduced-motion** — Users who prefer reduced motion won't get a simplified experience. Could add `@media (prefers-reduced-motion: reduce)` later.
