## ADDED Requirements

### Requirement: Location detail hero
The system SHALL display a hero with location name, region badge, and area count.

#### Scenario: Display hero
- **WHEN** user navigates to `/locations/{id}`
- **THEN** system shows location name, region badge (colored), and total area count

### Requirement: Area sections
The system SHALL display each area within the location as a section with encounter data.

#### Scenario: Multiple areas
- **WHEN** location has multiple areas
- **THEN** each area is shown as a distinct section with its name as heading

#### Scenario: No areas
- **WHEN** location has no areas
- **THEN** system shows "No encounter data available for this location"

### Requirement: Encounter method groups
Within each area, the system SHALL group Pokemon encounters by method.

#### Scenario: Grouped encounters
- **WHEN** an area has encounters via walking and surfing
- **THEN** encounters display in separate groups with method headers (🚶 Walking, 🏄 Surfing)

### Requirement: Encounter rows
Each encounter row SHALL show Pokemon name (linked), level range, and encounter rate.

#### Scenario: Display encounter
- **WHEN** a Pokemon encounter exists
- **THEN** row shows Pokemon name as link to `/pokemon/{id}`, level range (Lv.X-Y), and rate (X%)

### Requirement: Back navigation and dark mode
The detail page SHALL have back navigation and dark mode.

#### Scenario: Back link
- **WHEN** user clicks back
- **THEN** system navigates to `/locations`

#### Scenario: SSR
- **WHEN** user navigates directly to `/locations/{id}`
- **THEN** page is server-rendered

#### Scenario: Dark mode
- **WHEN** dark mode active
- **THEN** all sections use dark variants
