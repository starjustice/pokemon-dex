## ADDED Requirements

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

## MODIFIED Requirements

### Requirement: Filter controls layout
The search bar SHALL be placed full-width on its own row. The filter controls (type toggles and generation dropdown) SHALL be on a separate row below the search bar, with section labels ("Filter by Type", "Generation"). On mobile, the filter section SHALL be collapsible. Active filter chips SHALL appear between filters and the grid.

#### Scenario: Controls visibility
- **WHEN** the user views the Pokemon list page
- **THEN** the search bar is full-width on its own row, and filter controls are on a separate row below it, with no overlap

#### Scenario: Section labels displayed
- **WHEN** the filter panel is visible
- **THEN** the type filter section has a "Filter by Type" label and the generation section has a "Generation" label

### Requirement: Combined search and filters
Search and filters SHALL work together using AND logic — results MUST match all active criteria (search term AND selected types AND selected generation). A results count ("Showing X of Y Pokemon") SHALL be displayed when any filter is active. A "Clear all" button SHALL be styled as a visible, clearly clickable button (with background color and hover state), not a text link.

#### Scenario: Search with active filter
- **WHEN** the user has "Fire" type filter active and types "char" in search
- **THEN** only Fire-type Pokemon whose names contain "char" are shown (e.g. Charmander, Charmeleon, Charizard)

#### Scenario: Results count displayed
- **WHEN** any filter or search is active
- **THEN** the system displays "Showing X of Y Pokemon" with a styled "Clear all" button

#### Scenario: Clear all button is visually a button
- **WHEN** filters are active and the "Clear all" action is displayed
- **THEN** it is rendered as a button with background color, rounded corners, and hover effect — not as a plain text link

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
