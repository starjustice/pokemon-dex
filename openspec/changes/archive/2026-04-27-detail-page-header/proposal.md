## Why

The Pokemon detail page (`/pokemon/[id]`) has no site header or theme toggle. Users navigating from the home page lose the ability to switch between light and dark themes. The page also lacks consistent navigation back to the main listing, requiring the browser back button.

## What Changes

- Add a shared header to the detail page matching the home page style, including the site title, a back link to the listing, and the ThemeToggle component
- Extract a reusable `SiteHeader` component so both pages share the same header

## Capabilities

### New Capabilities
- `site-header`: A reusable header component with site branding, navigation, and theme toggle

### Modified Capabilities
- `pokemon-detail`: Detail page layout updated to include the site header

## Impact

- `app/pokemon/[id]/page.tsx` — wraps content with SiteHeader
- `app/page.tsx` — refactored to use SiteHeader instead of inline header
- New `components/SiteHeader.tsx` component
- No API or dependency changes
