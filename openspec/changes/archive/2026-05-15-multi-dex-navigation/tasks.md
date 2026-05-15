## 1. DexTabs Component

- [x] 1.1 Create `components/DexTabs.tsx` as a client component (`"use client"`)
- [x] 1.2 Define a `DEX_TABS` const array: `[{ label: "Pokemon", href: "/" }, { label: "Skills", href: "/skills" }]`
- [x] 1.3 Use `usePathname()` from `next/navigation` to determine the active tab
- [x] 1.4 Render tabs as `<Link>` elements with horizontal layout, active tab highlighted (blue underline + bold text), inactive tabs gray with hover state
- [x] 1.5 Style with responsive padding (`py-2 px-4`), `overflow-x-auto` for future extensibility, dark mode variants

## 2. SiteHeader Integration

- [x] 2.1 Add `showTabs?: boolean` prop to `SiteHeaderProps`
- [x] 2.2 When `showTabs` is true, render `<DexTabs />` below the title/subtitle area
- [x] 2.3 Import DexTabs dynamically or directly (it's a client component, SiteHeader is server — use composition)

## 3. Home Page Update

- [x] 3.1 In `app/page.tsx`, pass `showTabs={true}` to `SiteHeader`

## 4. Skills Placeholder Page

- [x] 4.1 Create `app/skills/page.tsx` as a Server Component
- [x] 4.2 Render SiteHeader with `showTabs={true}` and subtitle "Explore Pokemon moves and skills"
- [x] 4.3 Render a centered placeholder: icon (e.g., sparkle/lightning SVG), "Skill Dex" heading (`text-3xl font-extrabold`), "Coming Soon" badge, description text, all with dark mode support
- [x] 4.4 Use the same outer container structure as the home page (`min-h-screen bg-gray-50 dark:bg-gray-950`, `mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8`)

## 5. Verification

- [x] 5.1 Run `npm run build` and confirm zero type errors
- [x] 5.2 Verify: home page shows Pokemon and Skills tabs, Pokemon is active
- [x] 5.3 Verify: clicking Skills tab navigates to `/skills` with Skills tab active
- [x] 5.4 Verify: `/skills` shows styled placeholder with no API calls
- [x] 5.5 Verify: detail pages (`/pokemon/[id]`) do NOT show dex tabs
- [x] 5.6 Verify: dark mode works on both pages including tabs
