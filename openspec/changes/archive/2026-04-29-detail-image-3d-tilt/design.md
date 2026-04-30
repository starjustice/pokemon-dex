## Context

The detail page hero section has a 192x192 `next/image` with `object-contain drop-shadow-lg`. It sits inside a flex layout alongside basic info. The Showdown animated sprites are available at `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/showdown/{id}.gif`.

## Goals / Non-Goals

**Goals:**
- 3D tilt effect that follows cursor position relative to the image container
- Smooth transitions (ease-out on move, spring-back on leave)
- Holographic shine overlay that shifts with tilt angle
- Show animated Showdown sprite as a secondary smaller image
- Works on mobile via touch/drag (not device orientation — too unreliable)

**Non-Goals:**
- Device gyroscope/accelerometer integration
- 3D model rendering (WebGL/Three.js)
- Changing the card grid tilt (only detail page)

## Decisions

1. **CSS `perspective` + `rotateX/Y` transform**: Apply `perspective: 1000px` on the container, calculate rotateX/Y from mouse position relative to container center. Max rotation: ±15deg. Use `transform-style: preserve-3d` for depth.

2. **Shine overlay**: Absolute-positioned gradient overlay (`linear-gradient`) that shifts its position based on tilt angle, simulating light reflection. Low opacity (0.15-0.2).

3. **Mouse tracking in client component**: `onMouseMove` calculates normalized position (-1 to 1) from center. `onMouseLeave` resets to (0,0) with a spring transition (0.6s ease-out). Use `requestAnimationFrame` for smooth updates.

4. **Touch support**: `onTouchMove` uses first touch point, same calculation. `onTouchEnd` resets.

5. **Animated sprite placement**: Show as a small (64px) animated GIF below the main image with a label "Animated". Use standard `<img>` tag since it's an external GIF. Fallback: hide if 404.

6. **No library**: Pure React + CSS. No need for react-tilt or similar — the logic is simple enough.

## Risks / Trade-offs

- [Performance] Mouse tracking on every frame → mitigated with rAF throttle
- [GIF availability] Not all Pokemon have Showdown sprites → hide gracefully on error
- [Mobile UX] Touch-based tilt may conflict with scroll → only activate on intentional touch within the image area
