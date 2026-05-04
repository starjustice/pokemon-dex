## ADDED Requirements

### Requirement: Shiny toggle button on hero image
The detail page SHALL display a sparkle toggle button near the hero image when a shiny artwork is available. Clicking it SHALL swap between normal and shiny artwork.

#### Scenario: Toggle to shiny
- **WHEN** the user clicks the shiny toggle button
- **THEN** the hero image SHALL switch to the shiny official artwork, and the button SHALL display an active/gold state

#### Scenario: Toggle back to normal
- **WHEN** the user clicks the shiny toggle button while in shiny mode
- **THEN** the hero image SHALL switch back to the normal official artwork

#### Scenario: No shiny available
- **WHEN** the Pokemon has no shiny artwork (null from PokeAPI)
- **THEN** the shiny toggle button SHALL NOT be displayed

### Requirement: Shiny state applies to zoom modal
When shiny mode is active, the zoom modal (HeroImage/ImageModal) SHALL show the shiny front and shiny back sprites.

#### Scenario: Open zoom modal in shiny mode
- **WHEN** the user is in shiny mode and clicks the hero image to open the zoom modal
- **THEN** the modal SHALL display the shiny front sprite, and the front/back toggle SHALL switch to the shiny back sprite

### Requirement: Shiny state applies to animated sprite
When shiny mode is active, the Showdown animated sprite SHALL swap to its shiny variant.

#### Scenario: Animated sprite in shiny mode
- **WHEN** shiny mode is active
- **THEN** the AnimatedSprite SHALL display the shiny Showdown GIF

### Requirement: Shiny toggle works on mega detail pages
The shiny toggle SHALL function identically on the mega detail page at `/pokemon/mega/[name]`.

#### Scenario: Mega page shiny toggle
- **WHEN** the user visits a mega detail page and clicks the shiny toggle
- **THEN** the mega form's shiny artwork SHALL be displayed
