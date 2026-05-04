## Why

The detail page is missing audio and advanced form data that other Pokedex apps include. PokeAPI provides cry audio (`.ogg`) and mega evolution varieties, but we don't use either. Users expect to hear a Pokemon's cry and see its mega evolution if one exists. A text-to-speech "Pokedex voice" reading the flavor text would add personality.

## What Changes

- Add a "Cry" button that plays the Pokemon's cry audio from PokeAPI (`cries.latest` / `cries.legacy`)
- Add a "Dex Voice" button that uses the Web Speech API (`SpeechSynthesis`) to read the Pokemon's name, genus, and flavor text aloud
- Add a "Mega Evolution" section on the detail page for Pokemon that have mega forms (fetched via `varieties` on the species endpoint), showing the mega's artwork, name, types, and stats comparison

## Capabilities

### New Capabilities
- `pokemon-cry-audio`: Play Pokemon cry sounds from PokeAPI cries endpoint
- `pokemon-dex-voice`: Text-to-speech reading of Pokemon details using browser SpeechSynthesis API
- `pokemon-mega-evolution`: Display mega evolution forms with artwork, types, and stat comparison

### Modified Capabilities
- `pokemon-detail`: Add cry URLs, dex voice data, and mega evolution varieties to the detail page data model

## Impact

- `lib/pokemon.ts` — extend `PokemonDetail` type with `cryUrl`, `cryLegacyUrl`, and `megaEvolutions` array; update `fetchPokemonDetail` to extract `cries` and fetch mega variety data from `varieties`
- New `components/CryButton.tsx` — client component, plays `.ogg` audio via `<audio>` element
- New `components/DexVoice.tsx` — client component, uses `window.speechSynthesis` to read Pokemon info
- New `components/MegaEvolution.tsx` — client component, displays mega form cards with artwork + stat diff
- `app/pokemon/[id]/page.tsx` — add audio controls section and mega evolution section
- No external dependencies — uses browser-native `<audio>` and `SpeechSynthesis` APIs
