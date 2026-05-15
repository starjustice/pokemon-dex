## ADDED Requirements

### Requirement: Gigantamax artwork display
The detail page SHALL display the Gigantamax official artwork for Pokemon that have a G-Max form. The artwork SHALL be shown in a Dynamax-themed card with a red/pink border, visually distinct from the Mega Evolution section.

#### Scenario: Pokemon with Gigantamax form
- **WHEN** the detail page loads for a Pokemon that has a Gigantamax form (e.g., Charizard, Pikachu)
- **THEN** a "Dynamax" section SHALL display the G-Max artwork fetched from PokeAPI alongside the base artwork for comparison

#### Scenario: Pokemon without Gigantamax form
- **WHEN** the detail page loads for a Pokemon without a G-Max form
- **THEN** the Dynamax section SHALL still display Max Moves for the Pokemon's types but SHALL NOT show G-Max artwork

#### Scenario: Pokemon not eligible for Dynamax
- **WHEN** the detail page loads for a Pokemon from a generation that cannot Dynamax (all Gen 8 Pokemon can Dynamax, but the section shows Max Moves for any Pokemon with types)
- **THEN** the Dynamax section SHALL display Max Moves relevant to the Pokemon's types

### Requirement: Max Moves by type
The Dynamax section SHALL display the Max Moves corresponding to the Pokemon's types. Each type maps to exactly one Max Move (e.g., Fire → Max Flare, Water → Max Geyser).

#### Scenario: Single-type Pokemon
- **WHEN** viewing a pure Fire-type Pokemon
- **THEN** the section SHALL show Max Flare as the type-based Max Move, plus Max Guard (available to all)

#### Scenario: Dual-type Pokemon
- **WHEN** viewing a Fire/Flying-type Pokemon (e.g., Charizard)
- **THEN** the section SHALL show Max Flare (Fire) and Max Airstream (Flying), plus Max Guard

#### Scenario: Max Move display format
- **WHEN** a Max Move is displayed
- **THEN** it SHALL show the move name, type color badge, power, and secondary effect description

### Requirement: G-Max exclusive move display
For Pokemon with a Gigantamax form, the section SHALL display their exclusive G-Max Move with its name, type, and effect description. This data is static (not from PokeAPI).

#### Scenario: G-Max Move shown
- **WHEN** viewing a Pokemon with a Gigantamax form (e.g., Charizard → G-Max Wildfire)
- **THEN** the G-Max Move SHALL be displayed with a special highlight, showing its name, type badge, and effect

#### Scenario: No G-Max Move
- **WHEN** viewing a Pokemon without a Gigantamax form
- **THEN** no G-Max Move section SHALL be rendered

### Requirement: Static Gigantamax data map
A static map SHALL define which Pokemon have Gigantamax forms (base ID → G-Max form name) and their exclusive G-Max Move data. This avoids API discovery calls.

#### Scenario: G-Max map lookup
- **WHEN** `fetchPokemonDetail` is called for a Pokemon
- **THEN** it SHALL check the static `GMAX_MAP` to determine if the Pokemon has a G-Max form, and only fetch G-Max artwork if present

#### Scenario: Max Move type map
- **WHEN** the Dynamax section needs Max Move data for a type
- **THEN** it SHALL use a static `MAX_MOVES` map (type → move name, power, effect) with no API calls
