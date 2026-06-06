## ADDED Requirements

### Requirement: Move grid display
The system SHALL display moves in a responsive grid of wide horizontal cards showing type color border, damage class icon, name, type/class label, and stats.

#### Scenario: Initial page load
- **WHEN** user navigates to `/skills`
- **THEN** system displays the first 40 moves as horizontal cards with left type-color border, damage class icon, name, type·class text, and PWR/ACC/PP stats

#### Scenario: Responsive grid columns
- **WHEN** viewport is mobile (<640px)
- **THEN** grid displays 1 column of full-width cards
- **WHEN** viewport is tablet (640-1023px)
- **THEN** grid displays 2 columns
- **WHEN** viewport is desktop (1024px+)
- **THEN** grid displays 3 columns

### Requirement: Move search
The system SHALL allow searching moves by name in real-time.

#### Scenario: Search by name
- **WHEN** user types "flame" in the search input
- **THEN** grid displays only moves whose names contain "flame"

#### Scenario: No results
- **WHEN** search matches no moves
- **THEN** system displays "No moves found" message

### Requirement: Damage class filter
The system SHALL allow filtering by damage class (Physical, Special, Status).

#### Scenario: Filter by class
- **WHEN** user selects "Physical"
- **THEN** grid displays only physical moves

#### Scenario: Deselect class
- **WHEN** user clicks the active class pill again
- **THEN** filter resets to show all damage classes

### Requirement: Type filter
The system SHALL allow filtering moves by Pokemon type.

#### Scenario: Filter by type
- **WHEN** user selects "Fire" type chip
- **THEN** grid displays only Fire-type moves

### Requirement: Generation filter
The system SHALL allow filtering moves by generation introduced.

#### Scenario: Filter by generation
- **WHEN** user selects "Gen III"
- **THEN** grid displays only moves introduced in generation III

### Requirement: Sort options
The system SHALL allow sorting moves by name, power, or accuracy.

#### Scenario: Sort by power
- **WHEN** user selects "Power (high to low)"
- **THEN** grid reorders moves by descending power, with null-power moves at the end

### Requirement: Infinite scroll
The system SHALL load more moves as user scrolls.

#### Scenario: Scroll to load more
- **WHEN** user scrolls to the bottom of visible moves
- **THEN** system loads and appends the next 40 matching moves

### Requirement: Mobile FAB and filter sheet
The system SHALL show a FAB on mobile that opens a bottom-sheet with all filter controls.

#### Scenario: FAB visible on mobile
- **WHEN** viewport is below lg breakpoint
- **THEN** inline filters are hidden and a filter FAB is visible at bottom-right

#### Scenario: Sheet opens
- **WHEN** user taps the FAB
- **THEN** a bottom-sheet slides up with search, damage class, type, and generation filters

### Requirement: Dark mode
All components SHALL support dark mode.

#### Scenario: Dark mode
- **WHEN** dark mode is active
- **THEN** cards, filters, backgrounds, and text use dark color variants
