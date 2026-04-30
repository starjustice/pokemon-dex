## Why

The site currently only supports dark mode via OS-level `prefers-color-scheme`. Users have no way to manually toggle between light and dark themes. Adding an explicit theme toggle gives users control over their viewing preference, persists their choice across sessions, and is a standard UX expectation for modern web apps.

## What Changes

- Add a theme toggle button (sun/moon icon) to the page header
- Implement theme state management using `next-themes` (or a lightweight context) to switch Tailwind's `dark` class on `<html>`
- Configure Tailwind CSS 4 to use class-based dark mode instead of (or in addition to) `prefers-color-scheme`
- Persist theme preference in `localStorage` with system preference as default
- Ensure all existing `dark:` variants continue to work correctly

## Capabilities

### New Capabilities
- `dark-theme-toggle`: Manual theme switching (light/dark/system) with persistent preference and a toggle UI in the page header

### Modified Capabilities
_(none — existing components already have `dark:` variants; no spec-level behavior changes needed)_

## Impact

- **`app/globals.css`**: Switch from `prefers-color-scheme` media query to class-based dark mode via Tailwind v4 `@custom-variant`
- **`app/layout.tsx`**: Add theme provider wrapper and suppress hydration warning on `<html>`
- **`app/page.tsx`**: Add theme toggle button to header area
- **Dependencies**: Potentially `next-themes` package (or hand-rolled context)
- **No breaking changes** — all existing `dark:` classes continue to work
