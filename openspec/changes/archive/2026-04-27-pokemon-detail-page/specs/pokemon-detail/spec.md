## ADDED Requirements

### Requirement: Pokemon detail page
The system SHALL display a full detail page at `/pokemon/[id]` when a user navigates to it. The page SHALL be server-side rendered and show: official artwork (large), Pokemon name, Pokedex number, types, height, weight, base stats, flavor text, evolution chain, abilities with descriptions, and encounter locations.

#### Scenario: Navigate to detail page
- **WHEN** a user navigates to `/pokemon/25`
- **THEN** the system displays Pikachu's full detail page with all sections populated

#### Scenario: Back navigation
- **WHEN** the user clicks the back button on the detail page
- **THEN** the user is navigated back to the grid page

### Requirement: Base stats display
The system SHALL display all 6 base stats (HP, Attack, Defense, Sp. Atk, Sp. Def, Speed) as horizontal bars with color coding and numeric values. Bars SHALL be scaled relative to a maximum of 255.

#### Scenario: Stat bars rendered
- **WHEN** the detail page loads for a Pokemon
- **THEN** 6 horizontal stat bars are shown with their numeric values and proportional fill

### Requirement: Evolution chain visualization
The system SHALL display the full evolution chain as a visual flow diagram. Each stage SHALL show the Pokemon sprite and name. Connections between stages SHALL display the evolution condition (e.g., "Level 16", "Use Thunder Stone", "Trade", "Friendship").

#### Scenario: Linear evolution chain
- **WHEN** viewing Charmander's detail page
- **THEN** the evolution chain shows: Charmander → (Lv. 16) → Charmeleon → (Lv. 36) → Charizard

#### Scenario: Branching evolution
- **WHEN** viewing Eevee's detail page
- **THEN** the evolution chain shows Eevee with multiple branches to all eeveelutions, each with its condition

#### Scenario: No evolution
- **WHEN** viewing a Pokemon with no evolution (e.g., Tauros)
- **THEN** the evolution section shows the single Pokemon with "Does not evolve" message

### Requirement: Abilities with descriptions
The system SHALL list all abilities the Pokemon can have (including hidden abilities marked as such) with their English effect description.

#### Scenario: Abilities displayed
- **WHEN** the detail page loads
- **THEN** each ability is shown with its name and short effect description, hidden abilities marked with a badge

### Requirement: Encounter locations
The system SHALL display where the Pokemon can be found in the wild, grouped by game version. If the Pokemon has no wild encounters, a "Not available in the wild" message SHALL be shown.

#### Scenario: Pokemon with encounters
- **WHEN** viewing a Pokemon that can be found in the wild
- **THEN** encounter locations are listed grouped by game version with location names

#### Scenario: Pokemon without encounters
- **WHEN** viewing a Pokemon with no wild encounters (e.g., starters, legendaries)
- **THEN** the system displays "Not available in the wild"

### Requirement: Flavor text display
The system SHALL display the most recent English Pokedex entry (flavor text) for the Pokemon.

#### Scenario: Flavor text shown
- **WHEN** the detail page loads
- **THEN** the most recent English flavor text entry is displayed

### Requirement: Physical measurements
The system SHALL display the Pokemon's height (in meters) and weight (in kilograms).

#### Scenario: Height and weight shown
- **WHEN** the detail page loads
- **THEN** height and weight are displayed in metric units

### Requirement: Loading state
The system SHALL display a skeleton loading UI while the detail page data is being fetched.

#### Scenario: Loading skeleton shown
- **WHEN** the user navigates to a detail page
- **THEN** a skeleton placeholder is shown until data loads
