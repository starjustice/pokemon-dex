## ADDED Requirements

### Requirement: Search Pokemon by name or number
The system SHALL provide a debounced search bar (200ms delay) that filters the Pokemon list by name or Pokedex number client-side. Search is case-insensitive. State updates use React `useTransition` for non-blocking UI.

#### Scenario: Search by name
- **WHEN** the user types "pika" in the search bar
- **THEN** the grid filters to show only Pokemon whose names contain "pika" (e.g. Pikachu, Pikachu-like forms)

#### Scenario: Search by number
- **WHEN** the user types "25" in the search bar
- **THEN** the grid filters to show Pokemon whose Pokedex number matches "25"

#### Scenario: No results found
- **WHEN** the user searches for a term with no matching Pokemon
- **THEN** the system displays a "No Pokemon found" message

#### Scenario: Clear search
- **WHEN** the user clears the search bar
- **THEN** the full Pokemon list is displayed again

### Requirement: Filter by Pokemon type
The system SHALL provide type filter toggle buttons for all 18 Pokemon types. Multiple types can be selected simultaneously (OR logic — Pokemon matching any selected type are shown). Active type buttons SHALL display with their type-specific color and a ring indicator.

#### Scenario: Single type filter
- **WHEN** the user selects "Fire" from the type filter
- **THEN** only Pokemon with the Fire type are displayed

#### Scenario: Multiple type filter
- **WHEN** the user selects "Fire" and "Flying" from the type filter
- **THEN** Pokemon that have Fire OR Flying type are displayed

#### Scenario: Clear type filter
- **WHEN** the user deselects all type filters
- **THEN** the full Pokemon list is displayed

### Requirement: Filter by generation
The system SHALL provide a generation dropdown select to filter Pokemon by generation (Gen I through Gen IX). Only single generation selection is supported at a time.

#### Scenario: Filter by single generation
- **WHEN** the user selects "Generation I"
- **THEN** only Pokemon from Generation I (Kanto, #1-151) are displayed

### Requirement: Combined search and filters
Search and filters SHALL work together using AND logic — results MUST match all active criteria (search term AND selected types AND selected generation). A results count ("Showing X of Y Pokemon") and "Clear all filters" button SHALL be displayed when any filter is active.

#### Scenario: Search with active filter
- **WHEN** the user has "Fire" type filter active and types "char" in search
- **THEN** only Fire-type Pokemon whose names contain "char" are shown (e.g. Charmander, Charmeleon, Charizard)

#### Scenario: Results count displayed
- **WHEN** any filter or search is active
- **THEN** the system displays "Showing X of Y Pokemon" with a "Clear all filters" link

### Requirement: No results empty state
The system SHALL display a "No Pokemon found" message with a "Clear all filters" button when the combination of search and filters returns zero results.

#### Scenario: Empty state display
- **WHEN** the active filters and search produce zero results
- **THEN** a centered empty state is shown with a sad face, "No Pokemon found" heading, helpful message, and a "Clear all filters" button

### Requirement: Filter controls layout
The search bar and filter controls SHALL be positioned above the card grid. On desktop, search and filters are side-by-side (flex-row). On mobile, they stack vertically (flex-col).

#### Scenario: Controls visibility
- **WHEN** the user views the Pokemon list page
- **THEN** the search bar and filter controls are visible without scrolling
