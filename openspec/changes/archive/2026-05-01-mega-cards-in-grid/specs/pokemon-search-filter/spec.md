## MODIFIED Requirements

### Requirement: Search matches Pokemon by name or number
The search bar SHALL match Pokemon by name or Pokedex number. Mega forms SHALL be searchable by their full mega name (e.g., searching "mega charizard" matches Mega Charizard X and Y).

#### Scenario: Search by mega name
- **WHEN** the user types "mega charizard" in the search bar
- **THEN** the grid SHALL display Mega Charizard X and Mega Charizard Y cards

#### Scenario: Search by base name includes megas
- **WHEN** the user types "charizard" in the search bar
- **THEN** the grid SHALL display Charizard, Mega Charizard X, and Mega Charizard Y

#### Scenario: Search by number includes megas
- **WHEN** the user types "6" in the search bar
- **THEN** the grid SHALL display Charizard and its mega forms (since megas share the base Pokemon's number for search purposes)

### Requirement: Type filter includes mega forms
The type filter SHALL apply to mega forms using the mega form's own types (which may differ from the base form).

#### Scenario: Filter by mega-specific type
- **WHEN** the user filters by Dragon type
- **THEN** Mega Charizard X (Fire/Dragon) SHALL appear, but regular Charizard (Fire/Flying) SHALL NOT appear

### Requirement: Has Mega filter controls mega card visibility
The "Has Mega" toggle SHALL filter the grid to show only mega-capable base Pokemon AND their mega form cards.

#### Scenario: Has Mega filter active
- **WHEN** the user activates the "Has Mega" filter
- **THEN** the grid SHALL show only base Pokemon that have mega evolutions AND their corresponding mega form cards
