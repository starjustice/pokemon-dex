## ADDED Requirements

### Requirement: Available games section
The location detail page SHALL display an "Available in" section listing the Pokemon games (version-groups) where this location appears.

#### Scenario: Display games for location
- **WHEN** user views a location detail page
- **THEN** system shows a section with chips listing all version-groups associated with the location's region, each chip colored by generation

#### Scenario: Game chip is link
- **WHEN** user clicks a game chip on the detail page
- **THEN** system navigates to `/locations?game={version-group}` with that game pre-selected as filter

#### Scenario: Unknown region
- **WHEN** the location's region is unknown or has no associated version-groups
- **THEN** the "Available in" section is hidden
