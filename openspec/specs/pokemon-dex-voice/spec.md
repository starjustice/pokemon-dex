## ADDED Requirements

### Requirement: Dex Voice reads Pokemon info aloud
The detail page SHALL display a "Dex Voice" button that uses the browser SpeechSynthesis API to read the Pokemon's name, genus, and flavor text aloud.

#### Scenario: Read Pokemon details
- **WHEN** user clicks the "Dex Voice" button
- **THEN** the browser SHALL speak: "{name}, the {genus}. {flavorText}" using `SpeechSynthesis`

#### Scenario: Stop speech on second click
- **WHEN** user clicks "Dex Voice" while speech is already playing
- **THEN** the ongoing speech SHALL be cancelled

#### Scenario: Stop speech on navigation
- **WHEN** user navigates away from the detail page while speech is playing
- **THEN** the speech SHALL be cancelled via cleanup effect

#### Scenario: SpeechSynthesis unavailable
- **WHEN** `window.speechSynthesis` is not available
- **THEN** the Dex Voice button SHALL not be rendered
