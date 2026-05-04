## Context

The detail page currently shows Pokemon image, stats, abilities, evolution chain, and encounter locations. PokeAPI provides additional data we're not using: cry audio (`cries.latest`/`cries.legacy` as `.ogg`), and mega evolution forms via `varieties` on the species endpoint. The browser also provides `SpeechSynthesis` for text-to-speech with no dependencies.

## Goals / Non-Goals

**Goals:**
- Play Pokemon cry audio from PokeAPI on the detail page
- Read Pokemon details aloud using browser text-to-speech
- Show mega evolution forms with artwork, types, and stat comparison

**Non-Goals:**
- Custom audio formats or sound effects beyond what PokeAPI provides
- Other form variants (regional forms, Gigantamax, etc.) — mega only for now
- Custom TTS voices or server-side speech synthesis

## Decisions

### 1. Cry Audio: `<audio>` element with OGG source

Use a hidden `<audio>` element with the PokeAPI `.ogg` URL. Play on button click.

- **Why not Web Audio API?** Overkill for simple playback. `<audio>` is simpler and has broad support.
- **Safari OGG concern**: Safari has limited `.ogg` support. Mitigation: test with `canPlayType('audio/ogg')` and hide the cry button if unsupported, or show a "not supported" tooltip.
- **Fallback**: Try `cries.latest` first, fall back to `cries.legacy` if latest is null.

### 2. Dex Voice: Browser `SpeechSynthesis` API

Use `window.speechSynthesis.speak()` with a `SpeechSynthesisUtterance` that reads: "{name}, the {genus}. {flavorText}".

- **Why browser TTS?** Zero dependencies, works offline, no API keys.
- **Voice selection**: Use default voice. Optionally lower pitch slightly for a "Pokedex" feel.
- **Client-only**: Guard with `typeof window !== 'undefined'` check. The button only renders client-side.
- **Stop on unmount**: Cancel any ongoing speech in cleanup effect.

### 3. Mega Evolution: Fetch in `fetchPokemonDetail`, display as section

The species endpoint already returns `varieties`. Filter for mega forms (`name` contains `-mega`). For each mega, fetch the pokemon endpoint to get artwork, types, and stats.

- **Why fetch at detail time?** We already fetch species data. Mega forms are a small additional fetch (1-2 extra calls only for Pokemon that have megas).
- **Data model**: Add `MegaEvolution` type with `name`, `image`, `types`, `stats`. Store as `megaEvolutions: MegaEvolution[]` on `PokemonDetail`.
- **UI**: Render below evolution chain. Show mega artwork, name, type badges, and a stat comparison bar showing the diff from base form (similar to the reference app's layout with side-by-side cards and a double-arrow icon).

### 4. Audio controls layout

Place cry and dex voice buttons together in a row within the Pokemon header/info area, near the existing Pokemon details (height/weight area or near the hero image). Both are small icon buttons with labels.

## Risks / Trade-offs

- **OGG support on Safari** — Some Safari versions can't play `.ogg`. Mitigate by checking `canPlayType` and gracefully hiding/disabling the button.
- **SpeechSynthesis availability** — Not available in all environments (e.g., some privacy browsers disable it). Hide button if API unavailable.
- **Extra API calls for megas** — Each mega form requires an additional fetch. Most Pokemon have 0-2 megas, so impact is minimal. Pokemon without megas get zero extra calls.
- **Mega form count** — Only ~48 Pokemon have mega evolutions (Gen 6-7). The section will be empty for most Pokemon — display nothing when no megas exist.
