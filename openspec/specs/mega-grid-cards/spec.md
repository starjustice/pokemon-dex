## Requirements

### Requirement: Mega Pokemon cards in grid
The system SHALL display mega evolution forms as individual cards in the home page grid. Each mega-capable base Pokemon SHALL have its mega form card(s) inserted immediately after the base form card in grid order.

#### Scenario: Grid displays mega cards after base form
- **WHEN** the grid loads a page containing Charizard (#6)
- **THEN** the grid SHALL display Charizard, then Mega Charizard X, then Mega Charizard Y as three consecutive cards

#### Scenario: Mega cards show correct data
- **WHEN** a mega card is rendered
- **THEN** it SHALL display the mega form's name, official artwork, and types from PokeAPI

### Requirement: Mega cards have distinct visual style
Mega evolution cards SHALL have a visually distinct appearance using a purple gradient border/glow to differentiate them from base form cards.

#### Scenario: Mega card purple styling
- **WHEN** a mega card is rendered in the grid
- **THEN** it SHALL display a purple ring/border and a subtle purple gradient background, in both light and dark modes

### Requirement: Mega data fetched incrementally
The system SHALL fetch mega form data alongside base Pokemon data during pagination. When a page of base Pokemon is loaded, mega forms for any mega-capable Pokemon in that page SHALL be fetched in parallel.

#### Scenario: Incremental mega loading
- **WHEN** a new page of 40 Pokemon is fetched and contains 3 mega-capable Pokemon
- **THEN** the system SHALL also fetch the mega form data for those 3 Pokemon in the same loading cycle

#### Scenario: Failed mega fetch does not break grid
- **WHEN** a mega form fetch fails
- **THEN** the base Pokemon card SHALL still display, and the failed mega card SHALL be silently omitted
