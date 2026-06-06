## ADDED Requirements

### Requirement: Move detail hero
The system SHALL display a hero section with damage class icon, move name, type badge, class badge, and large stat numbers.

#### Scenario: Display hero
- **WHEN** user navigates to `/skills/{id}`
- **THEN** system displays a hero with: large damage class icon (colored), formatted move name, type badge (colored chip), damage class badge, and three stat blocks showing Power, Accuracy, and PP as large numbers

#### Scenario: Null stats
- **WHEN** a move has null power or accuracy
- **THEN** system displays "—" in the corresponding stat block

### Requirement: Effect description
The system SHALL display the move's effect text.

#### Scenario: Display effect
- **WHEN** move detail page loads
- **THEN** system shows the short_effect and/or full effect from effect_entries (English), with effect_chance values interpolated

### Requirement: Flavor text
The system SHALL display the most recent flavor text.

#### Scenario: Display flavor text
- **WHEN** move has flavor_text_entries
- **THEN** system displays the English entry from the latest version group in italics

### Requirement: Move metadata
The system SHALL display additional move data in a key-value format.

#### Scenario: Display metadata
- **WHEN** detail page loads
- **THEN** system shows: generation introduced, priority, target, and any relevant meta info (drain, healing, multi-hit)

### Requirement: Learned by Pokemon
The system SHALL display which Pokemon can learn this move.

#### Scenario: Display learned-by list
- **WHEN** move has learned_by_pokemon entries
- **THEN** system displays Pokemon names as clickable links to `/pokemon/{id}`, capped at 30 visible with "Show all X" expand

#### Scenario: No Pokemon learn this move
- **WHEN** learned_by_pokemon is empty
- **THEN** system hides the learned-by section

### Requirement: Navigation and dark mode
The detail page SHALL have back navigation and dark mode support.

#### Scenario: Back link
- **WHEN** user clicks back
- **THEN** system navigates to `/skills`

#### Scenario: SSR
- **WHEN** user navigates directly to `/skills/{id}`
- **THEN** page is server-rendered

#### Scenario: Dark mode
- **WHEN** dark mode is active
- **THEN** all sections use dark variants
