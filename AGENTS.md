<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# Pokemon Dex — Agent Instructions

## Project Overview
A Pokemon encyclopedia web app that fetches data from [PokeAPI](https://pokeapi.co/). Displays all 1025 Pokemon with search, filtering, detail pages, and interactive UI.

## Tech Stack
- **Next.js 16** (App Router, Server Components by default)
- **React 19** with `useTransition` for non-blocking UI
- **TypeScript 5** (strict mode)
- **Tailwind CSS 4** (no `tailwind.config.ts` — uses `@theme inline` in `globals.css`)
- **next-themes** for dark mode

## Architecture Rules
- Server Components by default. Only add `"use client"` when the component needs interactivity (state, effects, event handlers).
- All styling via Tailwind CSS utility classes. No CSS modules or styled-components.
- Dark mode: every component must include `dark:` variants. Theme is class-based (`@custom-variant dark (&:where(.dark *))`).
- Data fetching: all PokeAPI calls go through `lib/pokemon.ts`. No direct fetch calls in components.
- No external animation libraries — CSS `@keyframes` only (defined in `globals.css`).

## Key Files
| File | Purpose |
|------|---------|
| `lib/pokemon.ts` | All PokeAPI types and fetch functions |
| `lib/pokemon-cache.ts` | Module-level singleton cache for navigation state |
| `lib/type-colors.ts` | Pokemon type → color mappings |
| `lib/region-map.ts` | Game version → region mapping |
| `app/page.tsx` | Home page (Server Component, fetches first 40 Pokemon) |
| `app/pokemon/[id]/page.tsx` | Detail page (Server Component, SSR) |
| `components/PokemonGrid.tsx` | Client component — grid, search, filter, infinite scroll |

## Conventions
- Pokemon images: use `sprites.other['official-artwork'].front_default`, fallback to `sprites.front_default`
- Generation data: derived from static ID ranges in `lib/pokemon.ts`, NOT from species API calls
- Pagination: 40 Pokemon per page via `fetchPokemonPage(offset, limit)`
- Filter logic: search AND types AND generation (types use OR among themselves)
- Component naming: PascalCase files in `components/`, one component per file
- No `any` types — use proper TypeScript interfaces

## Commands
```bash
npm run dev    # Development server
npm run build  # Production build (also type-checks)
npm run lint   # ESLint
npm start      # Start production server
```
