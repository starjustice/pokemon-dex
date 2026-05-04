## MODIFIED Requirements

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
