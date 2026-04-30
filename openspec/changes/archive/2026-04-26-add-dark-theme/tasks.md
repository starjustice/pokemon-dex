## 1. Setup

- [x] 1.1 Install `next-themes` package
- [x] 1.2 Update `app/globals.css`: add `@custom-variant dark (&:where(.dark *))` and remove the `prefers-color-scheme` media query for CSS variable overrides (let `next-themes` handle it)

## 2. Theme Provider

- [x] 2.1 Create `components/ThemeProvider.tsx`: a `"use client"` wrapper around `next-themes`'s `ThemeProvider` with `attribute="class"`, `defaultTheme="system"`, and `enableSystem`
- [x] 2.2 Update `app/layout.tsx`: wrap `{children}` in `<ThemeProvider>`, add `suppressHydrationWarning` to `<html>`

## 3. Theme Toggle

- [x] 3.1 Create `components/ThemeToggle.tsx`: a `"use client"` button that cycles light → dark → system, showing sun/moon/monitor SVG icons, with a `mounted` guard to prevent hydration mismatch
- [x] 3.2 Add `<ThemeToggle />` to the page header in `app/page.tsx`

## 4. Verification

- [x] 4.1 Run `npm run build` and `npm run lint` to ensure no errors
- [x] 4.2 Verify dark mode toggles correctly in dev (light → dark → system cycle)
