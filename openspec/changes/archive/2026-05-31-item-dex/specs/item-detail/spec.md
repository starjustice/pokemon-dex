## ADDED Requirements

### Requirement: Item detail hero section
The system SHALL display a hero section with the item's large sprite, name, category badge, and cost.

#### Scenario: Display item hero
- **WHEN** user navigates to `/items/{id}`
- **THEN** system displays the item sprite (64x64 or larger), formatted name, category badge with color, and cost in Pokedollars

#### Scenario: Missing sprite
- **WHEN** item has no sprite (sprites.default is null)
- **THEN** system displays a placeholder package icon

### Requirement: Effect description
The system SHALL display the item's effect text in English.

#### Scenario: Display effect
- **WHEN** item detail page loads
- **THEN** system shows the short_effect and full effect text from effect_entries (English locale)

#### Scenario: No effect text
- **WHEN** item has no English effect_entries
- **THEN** system shows "No effect description available"

### Requirement: Flavor text
The system SHALL display the most recent flavor text entry for the item.

#### Scenario: Display flavor text
- **WHEN** item has flavor_text_entries
- **THEN** system displays the English entry from the latest version group

### Requirement: Item attributes
The system SHALL display the item's attributes as badges.

#### Scenario: Display attributes
- **WHEN** item has attributes (e.g., countable, consumable, holdable)
- **THEN** system displays each attribute as a styled badge

### Requirement: Held by Pokemon
The system SHALL display which Pokemon can hold this item, with links to their detail pages.

#### Scenario: Display held-by list
- **WHEN** item has held_by_pokemon entries
- **THEN** system displays each Pokemon name as a clickable link to `/pokemon/{id}`

#### Scenario: No Pokemon hold this item
- **WHEN** held_by_pokemon is empty
- **THEN** system hides the held-by section entirely

### Requirement: Navigation
The item detail page SHALL provide a back link to the items list.

#### Scenario: Back navigation
- **WHEN** user clicks the back link on item detail
- **THEN** system navigates to `/items`

### Requirement: SSR and dark mode
The item detail page SHALL be server-side rendered and support dark mode.

#### Scenario: Server rendering
- **WHEN** user navigates directly to `/items/{id}`
- **THEN** page is server-rendered with full content

#### Scenario: Dark mode
- **WHEN** dark mode is active
- **THEN** all text, backgrounds, and borders use dark variants
