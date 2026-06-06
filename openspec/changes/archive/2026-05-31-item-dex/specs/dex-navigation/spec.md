## MODIFIED Requirements

### Requirement: Navigation items
The sidebar SHALL display navigation links for Pokemon, Items, and Skills sections.

#### Scenario: Items nav link visible
- **WHEN** user views any page on desktop (lg+)
- **THEN** sidebar displays "Items" link between "Pokemon" and "Skills" with a backpack/bag icon

#### Scenario: Items nav active state
- **WHEN** user is on `/items` or `/items/{id}`
- **THEN** the "Items" nav link shows active styling (blue background + bold text)

#### Scenario: Mobile drawer includes Items
- **WHEN** user opens the mobile drawer
- **THEN** "Items" link appears in the nav list between Pokemon and Skills
