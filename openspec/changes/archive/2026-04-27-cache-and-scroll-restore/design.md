## Context

PokemonGrid is a client component that receives SSR first-page data as props. All loaded Pokemon, pagination offset, and filter state are held in `useState`. When navigating to `/pokemon/[id]` via `<Link>` and pressing back, PokemonGrid remounts — resetting to the initial 40 Pokemon. Scroll position resets to top.

## Goals / Non-Goals

**Goals:**
- Preserve loaded Pokemon data across client-side navigations
- Restore scroll position when returning to the home page
- Zero external dependencies — use module-level singleton cache

**Non-Goals:**
- Persisting cache across hard refreshes or new tabs (sessionStorage/localStorage not needed)
- Caching detail page data
- Offline support

## Decisions

1. **Module-level singleton cache** over React context or external state library. A simple `lib/pokemon-cache.ts` module exporting getter/setter functions. Module-level variables survive across client navigations in Next.js SPA mode since the JS bundle stays loaded. No providers or context wrappers needed.

2. **Cache structure**: Store `{ pokemon: Pokemon[], nextOffset: number, hasMore: boolean, scrollY: number, search: string, selectedTypes: string[], selectedGeneration: string }`. PokemonGrid reads from cache on mount if available, otherwise falls back to SSR props.

3. **Scroll restore via `window.scrollY`**: Save scrollY to cache before navigation (on card click or beforeunload-like). Restore after mount with `requestAnimationFrame` to ensure DOM is painted. Use Next.js `router.beforePopState` is not available in App Router, so we save scroll position on every scroll event (throttled) to the cache.

4. **Cache invalidation**: Cache is only valid for the current session. On hard refresh, module reloads and cache is empty — SSR props take over naturally.

## Risks / Trade-offs

- [Memory] Caching up to 1025 Pokemon objects in memory → ~1-2MB, acceptable for a SPA
- [Stale data] Cache never refetches — acceptable since PokeAPI data is static
- [Scroll precision] Throttled scroll save may be slightly off → close enough for UX
