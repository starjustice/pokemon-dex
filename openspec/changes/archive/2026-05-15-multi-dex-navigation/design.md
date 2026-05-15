## Context

The app is currently structured as a single Pokemon Dex with all routes under `/` and `/pokemon/[id]`. To support multiple dex types, we need a tab-based navigation that sits below the site title. The current `SiteHeader` has a title + back button + theme toggle. We'll add a `DexTabs` component rendered on the home page and integrated into the header area.

## Goals / Non-Goals

**Goals:**
- Add switchable dex tabs (Pokemon, Skills) visible on the home/listing pages
- Keep the current Pokemon Dex functionality at `/` unchanged (default tab)
- Add `/skills` route with a styled placeholder page
- Make the tab system extensible (easy to add Map, Items, etc. later)
- Tabs should highlight the active section

**Non-Goals:**
- No Skill API integration or data fetching
- No changes to the Pokemon detail page flow
- No bottom navigation bar (tabs are in the header area only)
- No persistent tab state across refreshes (URL is the source of truth)

## Decisions

### 1. URL-based routing, not client-side tabs

**Choice:** Each dex section is a separate Next.js route (`/` for Pokemon, `/skills` for Skills). Tabs are just styled `<Link>` elements. The active tab is derived from the current pathname.

**Why over client-side state tabs:**
- URL is the source of truth — bookmarkable, shareable, back-button works
- Server Components render each section independently
- No extra client state to manage
- Next.js App Router already handles this natively

### 2. DexTabs as a client component

**Choice:** Create `components/DexTabs.tsx` as a client component that reads `usePathname()` to determine the active tab and renders styled `<Link>` elements.

**Why client component:** Needs `usePathname()` to highlight the active tab. The tab list itself is static and small.

### 3. Tab configuration as a static array

**Choice:** Define tabs as a const array `DEX_TABS = [{ label, href, icon? }]` inside `DexTabs.tsx`. Adding a new dex is just adding an entry.

### 4. Home page stays at `/`

**Choice:** Keep Pokemon Dex at `/` (the default). Don't move it to `/pokemon`. The tabs show "/" as active when on the Pokemon tab.

**Why:** Avoids breaking existing URLs and bookmarks. Pokemon is the primary content.

### 5. Skills placeholder page design

**Choice:** The `/skills` page renders SiteHeader + DexTabs + a centered placeholder with a Pokeball icon, "Skill Dex" heading, "Coming Soon" subtitle, and a muted description. Styled consistently with the rest of the app, including dark mode.

## Risks / Trade-offs

- **[Tab visibility on detail pages]** Tabs should only show on listing pages (home, skills), not on detail pages like `/pokemon/[id]`. → Mitigation: `DexTabs` is only rendered in listing page layouts, not passed to detail pages.
- **[Mobile tab width]** With 2 tabs it's fine, but 5+ tabs may need horizontal scroll. → Mitigation: Use `flex` with `overflow-x-auto` for future-proofing.
