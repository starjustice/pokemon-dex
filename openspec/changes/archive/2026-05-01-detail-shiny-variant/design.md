## Context

The detail page hero section currently displays the Pokemon's official artwork as a static image, with a `HeroImage` wrapper that opens an `ImageModal` (zoom/pan, front/back toggle). An `AnimatedSprite` shows the Showdown GIF below. PokeAPI's `/pokemon/{id}` response already includes shiny sprites at `sprites.front_shiny`, `sprites.back_shiny`, `sprites.other['official-artwork'].front_shiny`, and Showdown shiny GIFs at a predictable URL pattern. No additional API calls are needed.

The detail page is a Server Component. Interactivity (toggling shiny) requires a client wrapper around the hero section.

## Goals / Non-Goals

**Goals:**
- Toggle between normal and shiny artwork on the detail page hero image
- Shiny state carries through to the zoom modal (front + back shiny) and animated sprite
- Works on both base Pokemon and mega detail pages
- Zero additional API calls — all shiny URLs extracted from existing response

**Non-Goals:**
- Shiny variants on grid cards (only on the detail page)
- Persisting shiny preference across navigation or sessions
- Shiny availability indicators (all Pokemon have shiny sprites in PokeAPI)

## Decisions

### 1. Client wrapper: `ShinyToggleHero` component

Create a new client component that wraps the hero image area. It holds `isShiny` state and conditionally passes normal or shiny image URLs to `HeroImage` and `AnimatedSprite`. The toggle is a small sparkle button positioned near the image.

**Alternative considered**: Making the entire hero section a client component — rejected because it would unnecessarily client-render static content (name, types, physical stats).

### 2. Shiny sprite URLs as props from server

`PokemonDetail` gains three new optional fields: `shinyImage: string | null`, `shinyBackImage: string | null`, `shinyAnimatedSprite: string`. These are extracted from the existing PokeAPI response in `fetchPokemonDetail` and `fetchMegaDetail`. The server passes them to the client toggle component.

### 3. Toggle button style

A small sparkle/star icon button positioned top-right of the hero image area. When active, it glows yellow/gold to indicate shiny mode. Uses CSS transition for smooth state change.

## Risks / Trade-offs

- [Some shiny artworks missing in PokeAPI] → Fallback: if `front_shiny` is null, hide the toggle button entirely for that Pokemon.
- [Adds ~3 new string fields to PokemonDetail] → Minimal memory impact; same PokeAPI response, just extracting more fields.
