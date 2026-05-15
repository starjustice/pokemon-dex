## Context

The app currently uses horizontal DexTabs in the SiteHeader for switching between Pokemon and Skills. This works for 2 tabs but doesn't scale. The user wants a sidebar on desktop and a drawer on mobile — a common pattern in dashboard-style apps (Discord, Notion, Spotify).

## Goals / Non-Goals

**Goals:**
- Fixed left sidebar on desktop (`lg+`) with nav links, icons, app title, theme toggle
- Hamburger menu on mobile that opens a slide-in drawer with the same nav content
- Active link highlighting based on current URL
- Extensible: adding a new section = adding one entry to the nav config
- Dark mode support throughout

**Non-Goals:**
- Collapsible/resizable sidebar on desktop (fixed width)
- Nested navigation or sub-menus
- User profile or auth UI in sidebar
- Changing the detail page layout (`/pokemon/[id]`)

## Decisions

### 1. Single `AppSidebar` client component

**Choice:** One client component that renders both the desktop sidebar and mobile drawer, sharing the same nav config and link rendering logic.

**Why:** Avoids duplicating nav links in two components. The component reads `usePathname()` for active state and manages drawer open/close state.

### 2. Layout-level integration

**Choice:** Render the sidebar in `app/layout.tsx` so it wraps all pages. The sidebar is always present on desktop. On detail pages, the sidebar still shows (user can navigate back to any dex from anywhere).

**Why over per-page rendering:**
- Consistent navigation on every page
- No need for each page to opt-in
- Sidebar persists across route transitions (no re-mount flicker)

### 3. Sidebar width and content offset

**Choice:** Desktop sidebar width: `w-64` (256px). Main content area uses `lg:ml-64` to offset. On mobile, no offset — drawer overlays.

### 4. Mobile drawer with backdrop

**Choice:** Drawer slides in from left with `translateX` animation. Backdrop overlay closes on tap. Body scroll locked when open. Hamburger button in the top-left of the mobile header.

### 5. Nav items config

**Choice:** Static array with icon SVG components:
```ts
const NAV_ITEMS = [
  { label: "Pokemon", href: "/", icon: PokeBallIcon },
  { label: "Skills", href: "/skills", icon: SparkleIcon },
];
```

### 6. SiteHeader simplification

**Choice:** Remove `showTabs` prop, remove DexTabs import. On mobile, add a hamburger button (calls `onMenuOpen` callback or uses context). On desktop, the hamburger is hidden since sidebar is always visible.

### 7. Theme toggle placement

**Choice:** Move ThemeToggle to the bottom of the sidebar. Remove from SiteHeader. This frees up header space and groups "app chrome" in the sidebar.

## Risks / Trade-offs

- **[Detail pages get sidebar too]** The sidebar shows on `/pokemon/[id]` which previously had no tabs. This is actually a UX improvement — users can jump to Skills from any page. → Acceptable.
- **[Content width reduction on desktop]** Main content loses 256px. Current max-width is `max-w-7xl` (1280px). With sidebar, effective content area is 1024px+ which is still plenty. → Acceptable.
- **[Sidebar state across routes]** Drawer open/close state resets on navigation. → Use `usePathname` in useEffect to auto-close drawer on route change.
