## MODIFIED Requirements

### Requirement: Pokemon detail page
The system SHALL display a full detail page at `/pokemon/[id]` when a user navigates to it. The page SHALL be server-side rendered and show: official artwork (large), Pokemon name, Pokedex number, types, height, weight, base stats, flavor text, evolution chain, abilities with descriptions, encounter locations, cry audio button, dex voice button, mega evolution section (when applicable), shiny comparison (when available), and Dynamax/Gigantamax section.

#### Scenario: Navigate to detail page
- **WHEN** a user navigates to `/pokemon/25`
- **THEN** the system displays Pikachu's full detail page with all sections populated, including the Dynamax section with G-Max artwork (Pikachu has a G-Max form) and Max Moves

#### Scenario: Back navigation
- **WHEN** the user clicks the back button on the detail page
- **THEN** the user is navigated back to the grid page

### Requirement: PokemonDetail includes Gigantamax fields
The `PokemonDetail` interface SHALL include `canGmax: boolean`, `gmaxImage: string | null`, and `gmaxMove: { name: string; type: string; effect: string } | null` fields. The G-Max image SHALL be fetched from PokeAPI only when the Pokemon has a G-Max form.

#### Scenario: G-Max fields populated
- **WHEN** `fetchPokemonDetail` or `fetchMegaDetail` is called for a G-Max-capable Pokemon
- **THEN** `canGmax` SHALL be `true`, `gmaxImage` SHALL contain the official artwork URL from the G-Max form endpoint, and `gmaxMove` SHALL contain the static G-Max Move data

#### Scenario: Non-G-Max Pokemon
- **WHEN** `fetchPokemonDetail` is called for a Pokemon without a G-Max form
- **THEN** `canGmax` SHALL be `false`, `gmaxImage` SHALL be `null`, and `gmaxMove` SHALL be `null`
