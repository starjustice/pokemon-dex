## 1. Create SiteHeader Component

- [x] 1.1 Create `components/SiteHeader.tsx` with props: `subtitle?: string`, `backHref?: string`, `backLabel?: string`. Render site title linking to `/`, optional subtitle, optional back link, and ThemeToggle.

## 2. Integrate SiteHeader

- [x] 2.1 Refactor `app/page.tsx` to replace inline header with `<SiteHeader subtitle="Browse and search through all Pokemon" />`
- [x] 2.2 Add `<SiteHeader backHref="/" backLabel="Back to Pokédex" />` to `app/pokemon/[id]/page.tsx` and remove the inline back link

## 3. Verify

- [x] 3.1 Run build and confirm no errors
