## ADDED Requirements

### Requirement: Display Pokemon card grid
The system SHALL display Pokemon in a responsive grid of cards. The initial page load SHALL fetch only the first page (~40 Pokemon) server-side for fast rendering. Additional Pokemon SHALL be loaded via client-side infinite scroll as the user scrolls down. Generation data SHALL be derived from a static Pokedex ID-range lookup table. Cards SHALL animate in with a fade+scale entrance transition when they appear in the grid, with a staggered delay for a cascading effect. Each card SHALL be a clickable link that navigates to the Pokemon's detail page at `/pokemon/[id]`.

#### Scenario: Card links to detail page
- **WHEN** the user clicks a Pokemon card
- **THEN** the browser navigates to `/pokemon/{id}` showing the detail page for that Pokemon

#### Scenario: Initial page load
- **WHEN** a user navigates to the home page
- **THEN** the system displays the first ~40 Pokemon cards within 2-3 seconds, fetched server-side

#### Scenario: Cards animate on appearance
- **WHEN** Pokemon cards appear in the grid (initial load or new page loaded)
- **THEN** each card fades in with a slight scale-up transition, staggered by position

#### Scenario: Responsive grid layout
- **WHEN** the user views the grid on different screen sizes
- **THEN** the grid adjusts columns (1 on mobile, 2 on tablet, 3 on desktop, 4 on xl)

#### Scenario: Partial data on API failure
- **WHEN** some individual Pokemon API requests fail during a page fetch
- **THEN** the system gracefully skips failed entries and displays the successfully fetched Pokemon

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
The system SHALL use React Suspense to stream a skeleton loading UI for the initial server-side fetch. Since only ~40 Pokemon are fetched initially, the skeleton displays briefly.

#### Scenario: Initial page load
- **WHEN** the page is loading the first page of Pokemon data
- **THEN** a skeleton grid is shown via Suspense fallback, then replaced with the first page of real data

### Requirement: Grid displays Pokemon cards in Pokedex order
The grid SHALL display Pokemon cards sorted by Pokedex number. Mega form cards SHALL be inserted immediately after their base form card, ordered by mega form ID.

#### Scenario: Mixed base and mega ordering
- **WHEN** the grid displays Pokemon around Charizard (#6)
- **THEN** the order SHALL be: ...Ivysaur, Venusaur, Mega Venusaur, Charmander, Charmeleon, Charizard, Mega Charizard X, Mega Charizard Y, Squirtle...

### Requirement: Pokemon type extended for mega forms
The `Pokemon` interface SHALL include optional fields `isMega: boolean`, `basePokemonId: number`, and `megaName: string` to identify mega form cards in the grid.

#### Scenario: Mega Pokemon object shape
- **WHEN** a mega form Pokemon object is created
- **THEN** it SHALL have `isMega: true`, `basePokemonId` set to the base form's national dex number, and `megaName` set to the PokeAPI form name

### Requirement: Cache includes mega Pokemon
The grid cache SHALL store mega Pokemon alongside base Pokemon, preserving their order across navigation.

#### Scenario: Cache round-trip with megas
- **WHEN** the user navigates to a detail page and returns
- **THEN** the grid SHALL restore from cache with mega cards in their correct positions
