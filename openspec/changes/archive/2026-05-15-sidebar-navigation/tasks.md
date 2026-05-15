## 1. Sidebar Animation Keyframes

- [x] 1.1 In `app/globals.css`, add `@keyframes drawerSlideIn` (`translateX(-100%)` → `translateX(0)`) and `@keyframes drawerSlideOut` (`translateX(0)` → `translateX(-100%)`)
- [x] 1.2 Add Tailwind animation tokens `--animate-drawerIn` (300ms ease-out) and `--animate-drawerOut` (200ms ease-in) to `@theme inline`

## 2. AppSidebar Component

- [x] 2.1 Create `components/AppSidebar.tsx` as a client component
- [x] 2.2 Define `NAV_ITEMS` const array with `{ label, href, icon }` for Pokemon (Pokeball SVG) and Skills (Sparkle SVG)
- [x] 2.3 Create a shared `NavLinks` renderer that maps `NAV_ITEMS` to `<Link>` elements with icon + label, using `usePathname()` for active state (colored bg + bold text on active, gray hover on inactive). Include dark mode variants.
- [x] 2.4 Render the **desktop sidebar**: `fixed left-0 top-0 h-full w-64 border-r hidden lg:flex flex-col`, with app title at top, NavLinks in middle (`flex-1`), ThemeToggle at bottom
- [x] 2.5 Render the **mobile drawer**: when `isOpen` is true, render a fixed overlay with backdrop + slide-in panel (`w-64`) containing same content as desktop sidebar plus a close button
- [x] 2.6 Lock body scroll when drawer is open, restore on close
- [x] 2.7 Auto-close drawer on route change (watch `usePathname()` in a `useEffect`)
- [x] 2.8 Export `onMenuOpen` mechanism: accept `isOpen` and `onClose` props for drawer state (state managed by parent or layout)

## 3. Layout Integration

- [x] 3.1 Create `components/SidebarProvider.tsx` — a client component that manages `isDrawerOpen` state and provides `openDrawer`/`closeDrawer` via React context
- [x] 3.2 In `app/layout.tsx`, wrap children with `SidebarProvider`, render `AppSidebar`, and add `lg:ml-64` to the main content wrapper
- [x] 3.3 Ensure the sidebar background matches the app theme (`bg-white dark:bg-gray-900` with `border-gray-200 dark:border-gray-700`)

## 4. SiteHeader Update

- [x] 4.1 Remove `showTabs` prop and `DexTabs` import from SiteHeader
- [x] 4.2 Remove `ThemeToggle` from SiteHeader
- [x] 4.3 Add a hamburger menu button (`lg:hidden`) that calls `openDrawer` from SidebarProvider context
- [x] 4.4 Adjust header layout: hamburger on left, title center/left, back button when applicable

## 5. Page Updates

- [x] 5.1 In `app/page.tsx`, remove `showTabs` prop from SiteHeader
- [x] 5.2 In `app/skills/page.tsx`, remove `showTabs` prop from SiteHeader

## 6. Cleanup

- [x] 6.1 Delete `components/DexTabs.tsx`

## 7. Verification

- [x] 7.1 Run `npm run build` and confirm zero type errors
- [x] 7.2 Verify: on desktop (lg+), fixed sidebar is visible on left with Pokemon + Skills links and theme toggle
- [x] 7.3 Verify: on mobile, hamburger button opens slide-in drawer with same nav content
- [x] 7.4 Verify: clicking a nav link navigates and auto-closes drawer on mobile
- [x] 7.5 Verify: active link is highlighted in sidebar
- [x] 7.6 Verify: detail pages (`/pokemon/[id]`) also show the sidebar on desktop
- [x] 7.7 Verify: dark mode works on sidebar and drawer
