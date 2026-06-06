## ADDED Requirements

### Requirement: Move TypeScript interfaces
The system SHALL define TypeScript interfaces for move data.

#### Scenario: Type safety
- **WHEN** move data is fetched
- **THEN** responses are typed with interfaces (MoveSummary, MoveDetail)

### Requirement: Fetch moves page
The system SHALL provide a function to fetch a paginated batch of moves with full basic info.

#### Scenario: Fetch first page
- **WHEN** `fetchMovesPage(0, 40)` is called
- **THEN** system returns 40 moves with id, name, type, power, accuracy, pp, damage_class, and generation

### Requirement: Fetch moves summary cache
The system SHALL provide a cached function that returns all moves with basic data for client-side filtering.

#### Scenario: First call builds cache
- **WHEN** `fetchMovesSummary()` is called for the first time
- **THEN** system fetches all 937 moves' basic info in parallel batches and caches the result

#### Scenario: Subsequent calls use cache
- **WHEN** `fetchMovesSummary()` is called again
- **THEN** system returns cached data without API calls

### Requirement: Fetch move detail
The system SHALL provide a function to fetch full move details by ID.

#### Scenario: Fetch by ID
- **WHEN** `fetchMoveDetail(id)` is called
- **THEN** system returns full move data including effect_entries, flavor_text_entries, learned_by_pokemon, meta, priority, target

### Requirement: Fetch all move names
The system SHALL provide a cached function returning all move names for search.

#### Scenario: Name cache
- **WHEN** `fetchAllMoveNames()` is called
- **THEN** system returns all move names with IDs, cached after first call
