## ADDED Requirements

### Requirement: Location grid display
The system SHALL display locations in a responsive grid of medium landscape cards with region-colored accents.

#### Scenario: Initial page load
- **WHEN** user navigates to `/locations`
- **THEN** system displays the first 40 locations as cards with map-pin icon (region-colored), name, region badge, and area count

#### Scenario: Responsive grid columns
- **WHEN** viewport is mobile (<640px)
- **THEN** grid displays 1 column
- **WHEN** viewport is tablet (640-1023px)
- **THEN** grid displays 2 columns
- **WHEN** viewport is desktop (1024px+)
- **THEN** grid displays 3 columns

### Requirement: Location search
The system SHALL allow searching locations by name.

#### Scenario: Search by name
- **WHEN** user types "cerulean" in search
- **THEN** grid shows only locations containing "cerulean" in name

#### Scenario: No results
- **WHEN** search matches nothing
- **THEN** system displays "No locations found"

### Requirement: Game filter
The system SHALL allow filtering locations by Pokemon game (version-group) using colored chip buttons grouped by generation.

#### Scenario: Filter by game
- **WHEN** user selects "FireRed & LeafGreen" chip
- **THEN** grid shows only locations belonging to the Kanto region (mapped from the FR/LG version-group)

#### Scenario: Deselect game
- **WHEN** user clicks active game chip
- **THEN** filter clears, showing all locations

#### Scenario: Game chip display
- **WHEN** game chips are rendered
- **THEN** each chip shows the game display name with a background color matching its generation, and chips are visually grouped by generation in the filter sheet

#### Scenario: Game inclusion disclaimer
- **WHEN** a game filter is active
- **THEN** a subtle disclaimer is shown noting that some locations may be exclusive to specific games within the same region/generation

### Requirement: Encounters-only toggle
The system SHALL allow filtering to show only locations with encounter data.

#### Scenario: Toggle on
- **WHEN** user enables "Has encounters" toggle
- **THEN** grid hides locations with zero Pokemon encounters

### Requirement: Infinite scroll
The system SHALL load more locations on scroll.

#### Scenario: Scroll to load more
- **WHEN** user scrolls to bottom
- **THEN** next 40 locations load and append

### Requirement: Mobile FAB and filter sheet
The system SHALL provide mobile filter access via FAB + bottom-sheet.

#### Scenario: Mobile filters
- **WHEN** viewport is below lg
- **THEN** inline filters hidden, FAB visible; tapping FAB opens sheet with search, game chips (grouped by generation), encounters toggle

### Requirement: Dark mode
All location list components SHALL support dark mode.

#### Scenario: Dark mode
- **WHEN** dark mode active
- **THEN** cards, filters, backgrounds use dark variants
