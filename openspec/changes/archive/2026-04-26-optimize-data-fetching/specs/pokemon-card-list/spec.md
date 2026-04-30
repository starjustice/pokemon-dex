## MODIFIED Requirements

### Requirement: Display Pokemon card grid
The system SHALL display Pokemon in a responsive grid of cards. The initial page load SHALL fetch only the first page (~40 Pokemon) server-side for fast rendering. Additional Pokemon SHALL be loaded via client-side infinite scroll as the user scrolls down. Generation data SHALL be derived from a static Pokedex ID-range lookup table.

#### Scenario: Initial page load
- **WHEN** a user navigates to the home page
- **THEN** the system displays the first ~40 Pokemon cards within 2-3 seconds, fetched server-side

#### Scenario: Responsive grid layout
- **WHEN** the user views the grid on different screen sizes
- **THEN** the grid adjusts columns (1 on mobile, 2 on tablet, 3 on desktop, 4 on xl)

#### Scenario: Partial data on API failure
- **WHEN** some individual Pokemon API requests fail during a page fetch
- **THEN** the system gracefully skips failed entries and displays the successfully fetched Pokemon

### Requirement: Loading state with Suspense streaming
The system SHALL use React Suspense to stream a skeleton loading UI for the initial server-side fetch. Since only ~40 Pokemon are fetched initially, the skeleton displays briefly.

#### Scenario: Initial page load
- **WHEN** the page is loading the first page of Pokemon data
- **THEN** a skeleton grid is shown via Suspense fallback, then replaced with the first page of real data
