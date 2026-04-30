## Context

The detail page hero uses `TiltImage` wrapping a `next/image` (192px). The full-resolution artwork from PokeAPI is typically 475x475 PNG. The TiltImage already has click/mouse interaction, so we need a separate click trigger (like a small "expand" icon or the image itself on click).

## Goals / Non-Goals

**Goals:**
- Fullscreen modal with dark semi-transparent backdrop
- Display full-resolution Pokemon artwork (use same image URL, larger size)
- Scroll wheel to zoom in/out (1x to 4x)
- Pinch-to-zoom on touch devices
- Click-and-drag to pan when zoomed
- Close on backdrop click, Escape key, or X button
- Smooth transitions for open/close

**Non-Goals:**
- Image gallery/carousel (only one image)
- Downloading the image
- Sharing functionality

## Decisions

1. **Modal component**: Portal-based (`createPortal` to `document.body`) to escape any parent overflow/transforms. Fixed positioning covering viewport.

2. **Zoom implementation**: CSS `transform: scale(N)` on the image. Track zoom level in state (1-4x). `wheel` event increases/decreases by 0.25 per scroll tick. Pinch gesture uses touch distance delta.

3. **Pan implementation**: When zoomed > 1x, track pointer drag (`pointerdown` → `pointermove` → `pointerup`). Apply `translate(X, Y)` alongside scale. Clamp to image bounds so you can't pan past edges.

4. **Trigger**: Clicking the TiltImage area opens the modal. Add a small magnifying glass icon overlay on the image to signal clickability.

5. **Animation**: Scale from 0.9 to 1 + opacity fade on open. Reverse on close. `transition: transform 0.2s, opacity 0.2s`.

6. **Body scroll lock**: Set `document.body.style.overflow = 'hidden'` when modal is open, restore on close.

## Risks / Trade-offs

- [TiltImage conflict] TiltImage uses mouse events for tilting — click on the image should open modal, not conflict. Solution: open modal on `onClick` which fires after `mouseup`, separate from `mousemove` tilt.
- [Touch conflict] Pinch-to-zoom in modal vs browser zoom — use `touch-action: none` on modal content to prevent browser zoom.
