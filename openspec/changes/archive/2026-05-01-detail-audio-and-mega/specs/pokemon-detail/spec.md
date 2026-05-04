## MODIFIED Requirements

### Requirement: Pokemon detail page
The system SHALL display a full detail page at `/pokemon/[id]` when a user navigates to it. The page SHALL be server-side rendered and show: official artwork (large), Pokemon name, Pokedex number, types, height, weight, base stats, flavor text, evolution chain, abilities with descriptions, encounter locations, cry audio button, dex voice button, and mega evolution section (when applicable).

#### Scenario: Navigate to detail page
- **WHEN** a user navigates to `/pokemon/25`
- **THEN** the system displays Pikachu's full detail page with all sections populated, including cry and dex voice buttons

#### Scenario: Back navigation
- **WHEN** the user clicks the back button on the detail page
- **THEN** the user is navigated back to the grid page
