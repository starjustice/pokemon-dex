## ADDED Requirements

### Requirement: Pokemon list data is cached across navigations
The system SHALL cache all loaded Pokemon data, pagination state (nextOffset, hasMore), and filter state (search, selectedTypes, selectedGeneration) in a module-level singleton that persists across client-side navigations.

#### Scenario: User navigates to detail and back
- **WHEN** user has loaded 120 Pokemon, clicks a card to view detail, then navigates back
- **THEN** all 120 Pokemon are displayed immediately without re-fetching, and filters are restored

### Requirement: Cache falls back to SSR props when empty
The system SHALL use server-rendered initial props when no cache exists (first load or hard refresh).

#### Scenario: First page load
- **WHEN** user visits the home page for the first time
- **THEN** SSR-provided initialPokemon are used and no cache is read

### Requirement: Cache updates on data changes
The system SHALL update the cache whenever new Pokemon pages are loaded or filter state changes.

#### Scenario: Loading more pages updates cache
- **WHEN** user scrolls to load page 2 and page 3
- **THEN** the cache contains all Pokemon from pages 1-3 with the correct nextOffset
