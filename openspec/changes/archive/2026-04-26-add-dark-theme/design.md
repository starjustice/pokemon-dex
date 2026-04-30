## Context

The Pokemon Dex site already has comprehensive `dark:` Tailwind variants across all components. Dark mode currently activates only via `prefers-color-scheme` media query in `globals.css`. There is no user-facing toggle and no persistence of preference. The site uses Tailwind CSS 4 (no config file — uses `@theme inline` in CSS).

## Goals / Non-Goals

**Goals:**
- Let users manually switch between light, dark, and system-default themes
- Persist choice in `localStorage` across sessions
- Add a toggle button to the page header
- Avoid flash of wrong theme on page load (FOHT)

**Non-Goals:**
- Custom color themes beyond light/dark
- Per-page or per-component theme overrides
- Server-side theme detection (cookie-based SSR theming)

## Decisions

### 1. Use `next-themes` library

**Choice:** Install `next-themes` for theme management.
**Alternatives considered:**
- Hand-rolled React context + `useEffect`: More code, need to handle FOHT manually with a blocking script, need to sync `<html>` class manually. Fragile.
- CSS-only with `prefers-color-scheme`: Already have this — doesn't allow manual override.

**Rationale:** `next-themes` handles `localStorage` persistence, `<html>` class toggling, system preference detection, hydration mismatch avoidance, and FOHT prevention with a small inline script. Well-maintained, ~2KB.

### 2. Class-based dark mode via Tailwind CSS 4

**Choice:** Add `@custom-variant dark (&:where(.dark *))` to `globals.css` and remove the `prefers-color-scheme` media query for CSS variable overrides.
**Rationale:** Tailwind v4 doesn't use `tailwind.config.ts`. The `@custom-variant` directive tells Tailwind to apply `dark:` classes when `.dark` is on an ancestor element. `next-themes` adds/removes `.dark` on `<html>`.

### 3. Three-state toggle: Light / Dark / System

**Choice:** Cycle through light → dark → system with a single button showing sun/moon/monitor icon.
**Rationale:** Keeps UI minimal (one button), respects users who want OS-level control, and covers all preferences.

### 4. Toggle placement in page header

**Choice:** Add the toggle button to the top-right of the existing header in `app/page.tsx`.
**Rationale:** Standard location users expect. No layout changes needed.

## Risks / Trade-offs

- **[FOHT on first load]** → `next-themes` injects a blocking `<script>` in `<head>` to read `localStorage` before paint. Adds ~0.5KB inline JS.
- **[Hydration mismatch]** → `next-themes` requires `suppressHydrationWarning` on `<html>`. The `ThemeToggle` component must not render theme-dependent content until mounted (use `mounted` state guard).
- **[Bundle size]** → `next-themes` is ~2KB gzipped. Negligible.
