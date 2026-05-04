## 1. Data Layer

- [x] 1.1 Add `shinyImage: string | null`, `shinyBackImage: string | null`, `shinyAnimatedSprite: string` to `PokemonDetail` interface in `lib/pokemon.ts`
- [x] 1.2 Update `fetchPokemonDetail` to extract shiny URLs from the existing PokeAPI response
- [x] 1.3 Update `fetchMegaDetail` to extract shiny URLs from the existing PokeAPI response

## 2. Shiny Toggle Component

- [x] 2.1 Create `components/ShinyToggleHero.tsx` client component with `isShiny` state, sparkle toggle button, and conditional image/sprite props
- [x] 2.2 Update `HeroImage.tsx` to accept optional `shinyFrontSrc` and `shinyBackSrc` props, using them when a `isShiny` prop is true
- [x] 2.3 Update `AnimatedSprite.tsx` to accept an optional `shinySrc` prop, displaying it when `isShiny` is true

## 3. Detail Page Integration

- [x] 3.1 Update `app/pokemon/[id]/page.tsx` to pass shiny URLs and wrap hero section with `ShinyToggleHero`
- [x] 3.2 Update `app/pokemon/mega/[name]/page.tsx` to pass shiny URLs and wrap hero section with `ShinyToggleHero`

## 4. Verification

- [x] 4.1 Run `npm run build` and confirm zero type errors
