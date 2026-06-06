## MODIFIED Requirements

### Requirement: Navigation items
The sidebar SHALL display navigation links for Pokemon, Items, Locations, and Skills sections.

#### Scenario: Locations nav link visible
- **WHEN** user views any page on desktop
- **THEN** sidebar displays "Locations" link between "Items" and "Skills" with a map-pin icon

#### Scenario: Locations nav active state
- **WHEN** user is on `/locations` or `/locations/{id}`
- **THEN** the "Locations" nav link shows active styling

#### Scenario: Mobile drawer includes Locations
- **WHEN** user opens mobile drawer
- **THEN** "Locations" link appears between Items and Skills
