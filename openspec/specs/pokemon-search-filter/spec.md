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
The system SHALL provide type filter toggle buttons for all 18 Pokemon types. Buttons SHALL have large enough tap targets for mobile use (minimum `px-3 py-1.5`). Multiple types can be selected simultaneously (OR logic — Pokemon matching any selected type are shown). Active type buttons SHALL display with their type-specific color and a ring indicator. Inactive buttons SHALL have a clear hover state.

#### Scenario: Single type filter
- **WHEN** the user selects "Fire" from the type filter
- **THEN** only Pokemon with the Fire type are displayed

#### Scenario: Multiple type filter
- **WHEN** the user selects "Fire" and "Flying" from the type filter
- **THEN** Pokemon that have Fire OR Flying type are displayed

#### Scenario: Clear type filter
- **WHEN** the user deselects all type filters
- **THEN** the full Pokemon list is displayed

#### Scenario: Button tap target on mobile
- **WHEN** the user views type filter buttons on mobile
- **THEN** each button has sufficient padding (minimum px-3 py-1.5) for easy tapping

### Requirement: Filter by generation
The system SHALL provide a generation dropdown select to filter Pokemon by generation (Gen I through Gen IX). Only single generation selection is supported at a time.

#### Scenario: Filter by single generation
- **WHEN** the user selects "Generation I"
- **THEN** only Pokemon from Generation I (Kanto, #1-151) are displayed

### Requirement: Combined search and filters
Search and filters SHALL work together using AND logic across ALL Pokemon, not just currently loaded Pokemon. When any filter or search is activated, the system SHALL use PokeAPI endpoints to resolve the complete set of matching Pokemon IDs, then fetch details only for the visible page. Results SHALL be correct and complete from the first page displayed. There is no "Load all" button.

#### Scenario: Type filter returns complete results immediately
- **WHEN** the user selects "Fighting" type with only 40 Pokemon previously loaded
- **THEN** the system SHALL fetch the complete Fighting-type Pokemon list from `/type/fighting`, then fetch details for the first 40 matching Pokemon, displaying correct results immediately

#### Scenario: Search with active filter
- **WHEN** the user has "Fire" type filter active and types "char" in search
- **THEN** only Fire-type Pokemon whose names contain "char" are shown, with results complete from the first page

#### Scenario: Results count displayed
- **WHEN** any filter or search is active
- **THEN** the system displays "Showing X of Y" where Y is the total number of matching Pokemon (not just loaded Pokemon)

#### Scenario: Infinite scroll through filtered results
- **WHEN** the user scrolls to the bottom of filtered results and more matching Pokemon exist beyond the current page
- **THEN** the system SHALL fetch details for the next page of filtered Pokemon IDs and append them to the grid

#### Scenario: Filter cleared returns to normal pagination
- **WHEN** the user clears all filters
- **THEN** the grid returns to standard sequential pagination from where it left off

#### Scenario: Filter chip entrance animation
- **WHEN** a new filter chip appears (type selected, generation chosen, or search entered)
- **THEN** the chip animates in with a fade and scale transition

### Requirement: No results empty state
The system SHALL display a "No Pokemon found" message with a "Clear all filters" button when the API-resolved filtered set contains zero results. A loading state SHALL be shown while the filter resolution is in progress.

#### Scenario: Empty state display
- **WHEN** the API-resolved filtered set contains zero Pokemon
- **THEN** a centered empty state is shown with a sad face, "No Pokemon found" heading, helpful message, and a "Clear all filters" button

#### Scenario: Loading state during filter resolution
- **WHEN** the user activates a filter and the system is fetching the filtered ID list from PokeAPI
- **THEN** a loading indicator is shown in the grid area

### Requirement: Filter controls layout
On mobile (< `lg`), the inline search bar and filter panel SHALL be hidden. Instead, filters are accessed via the floating action button and bottom sheet. On desktop (`lg+`), the search bar and filter panel remain inline above the grid as before. Active filter chips SHALL still appear inline between filters and grid on all screen sizes.

#### Scenario: Mobile hides inline filters
- **WHEN** the user views the home page on mobile (< lg)
- **THEN** the inline SearchBar and FilterPanel are hidden, replaced by the FAB + bottom sheet

#### Scenario: Desktop shows inline filters
- **WHEN** the user views the home page on desktop (lg+)
- **THEN** the inline SearchBar and FilterPanel are visible as before

#### Scenario: Active filter chips visible on mobile
- **WHEN** the user has active filters on mobile
- **THEN** active filter chips are displayed inline above the grid (dismissible)

### Requirement: Active filter chips
The system SHALL display a row of dismissible filter chips between the filter controls and the card grid when any filter is active. Each chip SHALL show the filter value (e.g. "Fire", "Gen I", or the search term) with an "x" dismiss button to remove that individual filter.

#### Scenario: Type filter chip displayed
- **WHEN** the user selects "Fire" type filter
- **THEN** a "Fire" chip with an "x" button appears in the active filters row

#### Scenario: Dismiss individual filter chip
- **WHEN** the user clicks the "x" on a "Fire" chip
- **THEN** the Fire type filter is removed and the chip disappears

#### Scenario: Search term chip displayed
- **WHEN** the user types "pika" in the search bar
- **THEN** a chip showing "pika" with an "x" button appears in the active filters row

### Requirement: Collapsible filter panel on mobile
The filter controls (type toggles and generation dropdown) SHALL be collapsible on mobile/tablet screens (below `lg` breakpoint). A "Filters" toggle button SHALL control visibility. On desktop (`lg+`), filters SHALL always be visible.

#### Scenario: Filters collapsed by default on mobile
- **WHEN** the user views the page on a mobile screen
- **THEN** the type toggles and generation dropdown are hidden behind a "Filters" button

#### Scenario: Expand filters on mobile
- **WHEN** the user taps the "Filters" button on mobile
- **THEN** the type toggles and generation dropdown become visible

#### Scenario: Filters always visible on desktop
- **WHEN** the user views the page on a desktop screen (lg+)
- **THEN** the type toggles and generation dropdown are always visible without a toggle button

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
