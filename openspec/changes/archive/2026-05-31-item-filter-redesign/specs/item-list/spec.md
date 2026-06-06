## MODIFIED Requirements

### Requirement: Category filter
The system SHALL allow users to filter items by category group using interactive chip buttons on desktop and a bottom-sheet on mobile.

#### Scenario: Desktop filter via chips
- **WHEN** user clicks a category chip on desktop
- **THEN** grid displays only items in that category group

#### Scenario: Mobile filter via sheet
- **WHEN** user taps a category chip in the mobile filter sheet
- **THEN** grid displays only items in that category group

#### Scenario: FAB with active filter count
- **WHEN** user has an active category or search filter on mobile
- **THEN** the FAB displays a badge with the count of active filters

#### Scenario: Inline filters hidden on mobile
- **WHEN** viewport is below lg breakpoint
- **THEN** the inline search and category chips are hidden, replaced by the FAB

#### Scenario: Combined search and category
- **WHEN** user has a category selected AND types in search
- **THEN** grid displays only items matching both filters
