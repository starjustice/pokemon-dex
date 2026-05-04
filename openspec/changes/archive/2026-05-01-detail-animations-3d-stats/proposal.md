## Why

The detail page loads instantly (SSR) but all content appears at once — there's no visual choreography that draws the eye through sections. The stat bars also look flat and static. Adding staggered entrance animations and upgrading stat bars to a 3D interactive style would make the page feel polished and alive.

## What Changes

- Staggered entrance animations on the detail page: hero fades in first, then stats, evolution chain, mega, abilities, and encounters cascade in with slight delays
- Stat bars get animated fill on load (grow from 0% to actual width)
- Stat bars redesigned with a 3D extruded look: depth/shadow giving a raised-bar appearance, with hover interaction that slightly lifts the bar
- Section cards slide up with staggered `animation-delay`
- Type badges pop in with a scale bounce
- Ability accordion and encounter accordion items animate when toggling open/closed

## Capabilities

### New Capabilities
- `detail-entrance-animations`: Staggered section entrance animations on the detail page
- `stat-bar-3d`: 3D interactive stat bars with animated fill, depth effect, and hover interaction

### Modified Capabilities
- (none — these are visual enhancements, no behavioral spec changes)

## Impact

- `app/globals.css` — add new keyframes: `slideUp`, `fillBar`, `popIn`
- `components/StatBar.tsx` — full rewrite as client component with 3D CSS (box-shadow, gradient layers, perspective transform on hover), animated fill via CSS animation
- `app/pokemon/[id]/page.tsx` — add staggered `animate-fadeInUp` with `animation-delay` style on each section wrapper
- `components/AbilityList.tsx` — add CSS grid `0fr→1fr` transition on accordion content (if not already)
- `components/EncounterList.tsx` — same accordion animation treatment
- No external dependencies — pure CSS keyframes + Tailwind utilities
