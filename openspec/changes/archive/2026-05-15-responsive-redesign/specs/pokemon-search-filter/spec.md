## MODIFIED Requirements

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
