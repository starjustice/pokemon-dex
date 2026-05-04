## ADDED Requirements

### Requirement: Cry button plays Pokemon audio
The detail page SHALL display a "Cry" button that plays the Pokemon's cry audio when clicked.

#### Scenario: Play cry audio
- **WHEN** user clicks the "Cry" button on a Pokemon detail page
- **THEN** the Pokemon's cry audio plays using the `cries.latest` OGG URL from PokeAPI

#### Scenario: Fallback to legacy cry
- **WHEN** `cries.latest` is null
- **THEN** the system SHALL use `cries.legacy` URL instead

#### Scenario: Browser does not support OGG
- **WHEN** the browser cannot play `audio/ogg` (detected via `canPlayType`)
- **THEN** the Cry button SHALL be hidden or disabled with a tooltip explaining lack of support

#### Scenario: No cry URL available
- **WHEN** both `cries.latest` and `cries.legacy` are null
- **THEN** the Cry button SHALL not be rendered
