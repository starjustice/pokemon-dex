## ADDED Requirements

### Requirement: Interactive category chip buttons
The system SHALL display category filters as colored pill/chip buttons on desktop.

#### Scenario: Chips displayed on desktop
- **WHEN** user views the items page on desktop (lg+)
- **THEN** a horizontal scrollable row of 8 category chips is visible below the search input, each with emoji icon, label, and category-specific color

#### Scenario: Chip selection
- **WHEN** user clicks an inactive chip
- **THEN** chip becomes active (filled color, white text) and grid filters to that category

#### Scenario: Chip deselection
- **WHEN** user clicks an active chip
- **THEN** chip deactivates and grid shows all items

#### Scenario: Single-select behavior
- **WHEN** user clicks a different chip while one is active
- **THEN** the previous chip deactivates and new one activates

#### Scenario: Chips hidden on mobile
- **WHEN** viewport is below lg breakpoint
- **THEN** category chips are hidden (filters accessible via FAB/sheet instead)

### Requirement: Dark mode chip variants
Category chips SHALL display correctly in dark mode.

#### Scenario: Dark mode active chip
- **WHEN** dark mode is active and a chip is selected
- **THEN** chip uses appropriate dark variant colors (darker filled background)
