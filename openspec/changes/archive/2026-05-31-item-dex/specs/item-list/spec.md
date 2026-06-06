## ADDED Requirements

### Requirement: Item grid display
The system SHALL display items in a responsive grid layout showing each item's sprite, name, category badge, and cost.

#### Scenario: Initial page load
- **WHEN** user navigates to `/items`
- **THEN** system displays the first 40 items in a grid with sprite, name, category, and cost for each

#### Scenario: Responsive grid columns
- **WHEN** viewport is mobile (<640px)
- **THEN** grid displays 2 columns
- **WHEN** viewport is tablet (640-1023px)
- **THEN** grid displays 3 columns
- **WHEN** viewport is desktop (1024px+)
- **THEN** grid displays 4 columns

### Requirement: Item search
The system SHALL allow users to search items by name using a text input that filters results in real-time.

#### Scenario: Search by partial name
- **WHEN** user types "potion" in the search input
- **THEN** grid displays only items whose names contain "potion"

#### Scenario: Empty search results
- **WHEN** user types a query that matches no items
- **THEN** system displays "No items found" message

#### Scenario: Clear search
- **WHEN** user clears the search input
- **THEN** grid returns to showing all items with pagination

### Requirement: Category filter
The system SHALL allow users to filter items by category group using a dropdown selector.

#### Scenario: Filter by category group
- **WHEN** user selects "Poke Balls" category
- **THEN** grid displays only items in standard-balls, special-balls, and apricorn-balls categories

#### Scenario: Combined search and filter
- **WHEN** user has "Medicine" category selected AND types "super" in search
- **THEN** grid displays only medicine items with "super" in the name

### Requirement: Infinite scroll pagination
The system SHALL load additional items as the user scrolls to the bottom of the grid.

#### Scenario: Scroll to load more
- **WHEN** user scrolls to the bottom of the visible items
- **THEN** system loads and appends the next 40 items to the grid

#### Scenario: All items loaded
- **WHEN** all matching items have been loaded
- **THEN** no further loading occurs and a "showing all items" indicator appears

### Requirement: Item card interaction
Each item card SHALL be clickable and navigate to the item's detail page.

#### Scenario: Click item card
- **WHEN** user clicks on an item card
- **THEN** system navigates to `/items/{id}` detail page

### Requirement: Dark mode support
The item grid SHALL support dark mode with appropriate color variants.

#### Scenario: Dark mode display
- **WHEN** dark mode is active
- **THEN** grid background, card backgrounds, text colors, and borders use dark variants
