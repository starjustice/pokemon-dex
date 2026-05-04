## Requirements

### Requirement: Mega detail page route
The system SHALL provide a dedicated detail page for each mega evolution at the URL `/pokemon/mega/[name]`, where `[name]` is the PokeAPI form name (e.g., `charizard-mega-x`).

#### Scenario: Navigate to mega detail page
- **WHEN** a user clicks a Mega Charizard X card in the grid
- **THEN** the browser SHALL navigate to `/pokemon/mega/charizard-mega-x`

#### Scenario: Mega detail page displays full data
- **WHEN** the mega detail page loads
- **THEN** it SHALL display the mega form's name, official artwork, types, stats, and abilities fetched from PokeAPI `/pokemon/{name}` endpoint

### Requirement: Mega detail page back navigation
The mega detail page SHALL include a back button that returns the user to the home grid with scroll position and filters preserved.

#### Scenario: Back navigation from mega detail
- **WHEN** the user clicks the back button on a mega detail page
- **THEN** the browser SHALL navigate to the home page and restore the previous scroll position and filter state

### Requirement: Mega detail page server-rendered
The mega detail page SHALL be a Server Component that fetches data at request time (SSR), consistent with the existing base Pokemon detail page pattern.

#### Scenario: Server-side rendering
- **WHEN** a user navigates to `/pokemon/mega/charizard-mega-x`
- **THEN** the page SHALL be server-rendered with data fetched from PokeAPI on the server
