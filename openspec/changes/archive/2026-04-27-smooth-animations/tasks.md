## 1. Define Animations

- [x] 1.1 Add `@keyframes fadeIn` (opacity 0→1, scale 0.95→1) and `@keyframes fadeInUp` (opacity 0→1, translateY 8px→0) to `app/globals.css`
- [x] 1.2 Register `animate-fadeIn` and `animate-fadeInUp` via Tailwind v4 `@theme` block in `globals.css`

## 2. Card Entrance Animations

- [x] 2.1 Update `PokemonGrid.tsx`: wrap each card in a div with `animate-fadeIn` and a staggered `animation-delay` based on index (capped at 20 items / 1s max)
- [x] 2.2 Ensure cards re-animate when filter results change by using a composite key that includes filter state

## 3. Filter Chip Animations

- [x] 3.1 Update `ActiveFilterChips.tsx`: add `animate-fadeIn` class to each `Chip` component so chips scale+fade in when they appear

## 4. Loading Indicator Animation

- [x] 4.1 Update `LoadMoreTrigger.tsx`: add `animate-fadeIn` to the loading spinner container so it fades in smoothly
- [x] 4.2 Update the "loading all" spinner in `PokemonGrid.tsx` with the same fade-in animation

## 5. Filter Button Transitions

- [x] 5.1 Update type toggle buttons in `FilterPanel.tsx`: ensure `transition-all` and smooth ring/color transitions when toggling active/inactive state

## 6. Verification

- [x] 6.1 Run `npm run build` and `npm run lint` to ensure no errors
