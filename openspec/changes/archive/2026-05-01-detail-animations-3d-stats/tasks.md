## 1. Add CSS Keyframes

- [x] 1.1 Add `slideUp`, `fillBar`, and `popIn` keyframes to `app/globals.css`. Register corresponding Tailwind animation tokens in the `@theme inline` block (`--animate-slideUp`, `--animate-fillBar`, `--animate-popIn`).

## 2. Rewrite StatBar as 3D Interactive

- [x] 2.1 Rewrite `components/StatBar.tsx` as a `"use client"` component. Replace the flat bar with a 3D extruded design: recessed trough via inset box-shadow, fill bar with top highlight gradient + bottom depth shadow. Add hover interaction that shifts the fill bar up with increased shadow.
- [x] 2.2 Add animated fill: use the `fillBar` keyframe with `--fill` CSS custom property. Stagger each bar with `animation-delay` based on its index (accept `index` prop). Use `animation-fill-mode: both` so bars start at 0%.

## 3. Staggered Section Entrance Animations

- [x] 3.1 Wrap each section card in `app/pokemon/[id]/page.tsx` with `animate-fadeInUp` and incrementing `animation-delay` via inline style (hero=0ms, stats=100ms, evolution=200ms, mega=300ms, abilities=400ms, encounters=500ms). Ensure `animation-fill-mode: both` so sections start hidden.

## 4. Type Badge Pop-In

- [x] 4.1 Apply `animate-popIn` to each type badge in the hero section of the detail page. Stagger with `animation-delay` per badge index.

## 5. Accordion Smooth Transitions

- [x] 5.1 Ensure `AbilityList.tsx` uses CSS grid `grid-template-rows: 0fr/1fr` transition for smooth open/close. Add transition duration if missing.
- [x] 5.2 Ensure `EncounterList.tsx` uses the same CSS grid row transition pattern for accordion open/close.

## 6. Pass Index to StatBar

- [x] 6.1 Update all StatBar usages (detail page stats section and MegaEvolution component) to pass `index` prop for staggered animation delay.

## 7. Verify

- [x] 7.1 Run build and confirm no errors.
