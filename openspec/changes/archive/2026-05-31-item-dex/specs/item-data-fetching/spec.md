## ADDED Requirements

### Requirement: Item TypeScript interfaces
The system SHALL define TypeScript interfaces for PokeAPI item responses.

#### Scenario: Type safety
- **WHEN** item data is fetched from PokeAPI
- **THEN** responses are typed with proper interfaces (ItemBasic, ItemDetail, ItemCategory)

### Requirement: Fetch item page
The system SHALL provide a function to fetch a paginated list of items with basic info.

#### Scenario: Fetch first page
- **WHEN** `fetchItemPage(0, 40)` is called
- **THEN** system returns an array of 40 items with id, name, sprite URL, category name, and cost

#### Scenario: Fetch with offset
- **WHEN** `fetchItemPage(40, 40)` is called
- **THEN** system returns the next 40 items starting from offset 40

### Requirement: Fetch item detail
The system SHALL provide a function to fetch full item details by ID.

#### Scenario: Fetch by ID
- **WHEN** `fetchItemDetail(1)` is called
- **THEN** system returns full item data including effect_entries, flavor_text_entries, held_by_pokemon, attributes, sprites, cost, and category

### Requirement: Fetch all item names
The system SHALL provide a cached function that returns all item names for client-side search.

#### Scenario: First call fetches from API
- **WHEN** `fetchAllItemNames()` is called for the first time
- **THEN** system fetches all item names from PokeAPI and caches them in a module-level variable

#### Scenario: Subsequent calls use cache
- **WHEN** `fetchAllItemNames()` is called after initial fetch
- **THEN** system returns the cached name list without making API calls

### Requirement: Fetch item categories
The system SHALL provide a cached function that returns all item categories.

#### Scenario: Category list
- **WHEN** `fetchItemCategories()` is called
- **THEN** system returns all 54 categories with name and URL, cached after first call

### Requirement: Category group mapping
The system SHALL provide a static mapping of API categories to user-friendly super-categories.

#### Scenario: Category lookup
- **WHEN** an item has category "standard-balls"
- **THEN** system maps it to the "Poke Balls" super-category group
