## 1. Extend Data Model

- [x] 1.1 Add `MegaEvolution` type to `lib/pokemon.ts` with fields: `name`, `image`, `types`, `stats` (same shape as `PokemonStat[]`).
- [x] 1.2 Add `cryUrl: string | null`, `cryLegacyUrl: string | null`, and `megaEvolutions: MegaEvolution[]` to `PokemonDetail` interface.
- [x] 1.3 Update `fetchPokemonDetail` to extract `cries.latest` and `cries.legacy` from pokemon data. Filter species `varieties` for mega forms (name includes `-mega`), fetch each mega's pokemon endpoint for artwork/types/stats, and populate `megaEvolutions`.

## 2. Cry Button Component

- [x] 2.1 Create `components/CryButton.tsx` as a client component. Accept `cryUrl` and `cryLegacyUrl` props. Use a hidden `<audio>` element. On click, play the audio. Check `canPlayType('audio/ogg')` and hide button if unsupported. Show speaker icon + "Cry" label. Don't render if both URLs are null.

## 3. Dex Voice Component

- [x] 3.1 Create `components/DexVoice.tsx` as a client component. Accept `name`, `genus`, `flavorText` props. On click, use `window.speechSynthesis.speak()` to read "{name}, the {genus}. {flavorText}". Cancel ongoing speech on second click (toggle behavior). Cancel speech on unmount. Hide button if `speechSynthesis` unavailable. Show microphone icon + "Dex Voice" label.

## 4. Mega Evolution Component

- [x] 4.1 Create `components/MegaEvolution.tsx` as a client component. Accept `megaEvolutions: MegaEvolution[]` prop. For each mega, display a card with official artwork, capitalized name, type badges (using TYPE_COLORS), and stat bars (reuse StatBar style). Show double-arrow icon between base and mega forms similar to the reference app. Don't render section if array is empty.

## 5. Integrate in Detail Page

- [x] 5.1 Add cry and dex voice buttons to the detail page info area (near height/weight or hero image section). Pass appropriate props from `pokemon` data.
- [x] 5.2 Add Mega Evolution section below the evolution chain. Pass `pokemon.megaEvolutions`.

## 6. Verify

- [x] 6.1 Run build and confirm no errors.
