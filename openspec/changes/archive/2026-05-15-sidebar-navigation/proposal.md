## Why

The current DexTabs horizontal tab bar works but doesn't scale well as more sections are added. A sidebar provides better navigation for a multi-section app — it's always visible on desktop, gives room for icons + labels, and can be organized into groups. On mobile, a slide-in drawer keeps the screen clean while providing full navigation when needed.

## What Changes

- Replace the horizontal `DexTabs` tab bar with a fixed left sidebar on desktop (`lg+`)
- On mobile (< `lg`), replace with a hamburger menu button that opens a slide-in drawer from the left
- Sidebar contains navigation links (Pokemon, Skills) with icons, active state highlighting, and the app title/logo
- Move `ThemeToggle` into the sidebar (bottom)
- Adjust main content area to account for sidebar width on desktop
- Remove the `showTabs` prop from SiteHeader and the DexTabs component (replaced by sidebar)

## Capabilities

### New Capabilities
- `sidebar-layout`: Fixed left sidebar on desktop with nav links + icons + theme toggle. Slide-in drawer on mobile with backdrop overlay and hamburger trigger.

### Modified Capabilities
- `dex-navigation`: Replace horizontal tabs with sidebar/drawer navigation. Same links (Pokemon, Skills), now in vertical sidebar format with icons.
- `site-header`: Remove `showTabs` prop and DexTabs rendering. Add hamburger button on mobile for opening the drawer. Keep title, subtitle, back button.

## Impact

- `app/layout.tsx` — Wrap children with sidebar layout (flex row on desktop)
- `components/SiteHeader.tsx` — Remove DexTabs, add mobile hamburger button
- `components/DexTabs.tsx` — Remove (replaced by sidebar)
- New components: `Sidebar.tsx`, `MobileDrawer.tsx` (or combined `AppSidebar.tsx`)
- `app/page.tsx`, `app/skills/page.tsx` — Remove `showTabs` prop from SiteHeader
- All page content shifts right on desktop to accommodate sidebar width
