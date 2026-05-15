## ADDED Requirements

### Requirement: Mega badge on capable Pokemon cards
Pokemon cards on the home grid SHALL display a small "Mega" badge for Pokemon that have at least one mega evolution form.

#### Scenario: Pokemon with mega shows badge
- **WHEN** a Pokemon card is rendered for a Pokemon that has a mega form (e.g., Charizard #6, Blastoise #9)
- **THEN** a small "MEGA" badge SHALL be visible on the card

#### Scenario: Pokemon without mega shows no badge
- **WHEN** a Pokemon card is rendered for a Pokemon with no mega form (e.g., Rattata #19, Pidgey #16)
- **THEN** no mega badge SHALL appear on the card

#### Scenario: Badge uses static lookup — no extra API calls
- **WHEN** the home grid loads a page of 40 Pokemon
- **THEN** mega badge visibility SHALL be determined from a static ID set with no additional network requests
