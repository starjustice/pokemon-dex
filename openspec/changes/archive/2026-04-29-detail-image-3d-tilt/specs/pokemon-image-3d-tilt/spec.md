## ADDED Requirements

### Requirement: Hero image has 3D tilt effect on hover
The detail page hero Pokemon image SHALL rotate in 3D (rotateX/Y up to ±15deg) following the user's cursor position relative to the image container.

#### Scenario: Mouse moves over image
- **WHEN** user hovers and moves cursor over the Pokemon image
- **THEN** the image tilts toward the cursor with perspective-based 3D rotation

#### Scenario: Mouse leaves image
- **WHEN** user moves cursor away from the Pokemon image
- **THEN** the image smoothly animates back to its neutral (flat) position

### Requirement: Shine overlay responds to tilt
A semi-transparent gradient overlay SHALL shift position based on the current tilt angle, simulating a holographic light reflection.

#### Scenario: Shine follows cursor
- **WHEN** user moves cursor over the image
- **THEN** a subtle light gradient shifts across the image surface matching the tilt direction

### Requirement: Touch support for mobile
The tilt effect SHALL work on touch devices using touch position within the image area.

#### Scenario: Touch drag tilts image
- **WHEN** user touches and drags within the image on mobile
- **THEN** the image tilts following the touch position

#### Scenario: Touch end resets tilt
- **WHEN** user lifts finger from the image
- **THEN** the image smoothly returns to neutral position

### Requirement: Animated sprite displayed
The detail page SHALL show an animated Showdown sprite (GIF) as a secondary image near the hero artwork.

#### Scenario: Animated sprite loads successfully
- **WHEN** the Pokemon has an available Showdown animated sprite
- **THEN** a small animated GIF is displayed with an "Animated" label

#### Scenario: Animated sprite unavailable
- **WHEN** the Showdown sprite returns a 404 or fails to load
- **THEN** the animated sprite section is hidden gracefully (no broken image)
