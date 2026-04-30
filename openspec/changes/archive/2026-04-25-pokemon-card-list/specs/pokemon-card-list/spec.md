## ADDED Requirements

### Requirement: Display Pokemon card grid
The system SHALL display all ~1025 Pokemon in a responsive grid of cards. Data is fetched server-side from PokeAPI (`/api/v2/pokemon`) using high-concurrency batched requests (50 per batch x 5 concurrent). Generation data SHALL be derived from a static Pokedex ID-range lookup table, not from species API calls.

#### Scenario: Grid loads with Pokemon data
- **WHEN** a user navigates to the home page
- **THEN** the system displays a grid of all Pokemon cards populated from PokeAPI, streamed via Suspense

#### Scenario: Responsive grid layout
- **WHEN** the user views the grid on different screen sizes
- **THEN** the grid adjusts columns (1 on mobile, 2 on tablet, 3 on desktop, 4 on xl)

#### Scenario: Partial data on API failure
- **WHEN** some individual Pokemon API requests fail
- **THEN** the system gracefully skips failed entries (via Promise.allSettled) and displays the successfully fetched Pokemon

### Requirement: Pokemon card displays key information
Each Pokemon card SHALL display: official artwork image (from `sprites.other['official-artwork'].front_default`), Pokemon name (capitalized, hyphen-separated words split), Pokedex number (formatted as #0001), type badges with type-specific colors, non-hidden abilities list, and generation (derived from static ID-range lookup).

#### Scenario: Card shows complete Pokemon info
- **WHEN** a Pokemon card is rendered
- **THEN** it displays the Pokemon's official artwork, formatted name, number (e.g. #0025), type badges (e.g. Electric), non-hidden abilities, and generation (e.g. Gen I)

#### Scenario: Image fallback
- **WHEN** the official artwork is unavailable for a Pokemon
- **THEN** the card falls back to the default sprite image, or a predictable GitHub-hosted sprite URL

### Requirement: Type badges with color coding
Each type badge on a card SHALL be color-coded to its Pokemon type (e.g. Fire=#EE8130, Water=#6390F0, Grass=#7AC74C). Cards SHALL also display a subtle gradient background based on the primary type color.

#### Scenario: Multi-type Pokemon display
- **WHEN** a Pokemon has multiple types (e.g. Charizard: Fire/Flying)
- **THEN** both type badges are displayed with their respective colors

### Requirement: Loading state with Suspense streaming
The system SHALL use React Suspense to stream a skeleton loading UI immediately while Pokemon data is being fetched server-side.

#### Scenario: Initial page load
- **WHEN** the page is loading Pokemon data from the API
- **THEN** a skeleton grid of 20 placeholder cards (with animated pulse) is shown immediately via Suspense fallback, then replaced with real data when ready
