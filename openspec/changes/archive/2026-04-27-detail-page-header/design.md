## Context

The home page (`app/page.tsx`) has an inline header with the site title, subtitle, and ThemeToggle. The detail page (`app/pokemon/[id]/page.tsx`) has no header — just a "Back to Pokédex" link inside the content area. Users lose theme switching ability on the detail page.

## Goals / Non-Goals

**Goals:**
- Extract a reusable `SiteHeader` component from the home page's inline header
- Add SiteHeader to the detail page layout
- Maintain consistent look across both pages

**Non-Goals:**
- Creating a full navigation system or layout route
- Adding breadcrumbs or additional nav items
- Changing the ThemeToggle behavior

## Decisions

1. **Shared component vs layout.tsx**: Use a `SiteHeader` component imported by each page rather than a shared layout. The home page header has a subtitle ("Browse and search...") while the detail page needs a back link instead. A component with optional props handles this better than a rigid layout.

2. **SiteHeader props**: Accept optional `subtitle` (string) and `backHref`/`backLabel` (for navigation link). The home page passes subtitle; the detail page passes backHref="/".

3. **Remove inline back link from detail page**: The current "← Back to Pokédex" link inside the detail content becomes redundant once the header provides navigation.

## Risks / Trade-offs

- [Slight duplication] Each page imports SiteHeader separately → acceptable for two pages; if more pages are added, consider moving to a layout
