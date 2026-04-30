## ADDED Requirements

### Requirement: Click image opens dialog modal
Clicking the hero Pokemon image on the detail page SHALL open a centered dialog displaying the Pokemon image on a dimmed backdrop. The dialog SHALL be 90vw wide on mobile and capped at 600px on desktop — not fullscreen.

#### Scenario: User clicks Pokemon image
- **WHEN** user clicks the hero Pokemon image
- **THEN** a centered dialog opens with the Pokemon image, sized responsively (90vw / max 600px)

### Requirement: Dialog supports front/back toggle
The dialog SHALL display a Front/Back toggle with arrow buttons that switches between the front (official artwork) and back (back_default sprite) views.

#### Scenario: Switch to back view
- **WHEN** user clicks the right arrow or "Back" toggle
- **THEN** the dialog displays the Pokemon's back sprite and the label updates to "Back"

#### Scenario: Switch to front view
- **WHEN** user clicks the left arrow or "Front" toggle while on back
- **THEN** the dialog displays the front artwork and the label updates to "Front"

#### Scenario: Switching resets zoom
- **WHEN** user switches between front and back
- **THEN** zoom resets to 1x and pan resets to center

#### Scenario: No back sprite available
- **WHEN** Pokemon has no back_default sprite
- **THEN** the toggle controls are hidden and only front view is shown

### Requirement: Dialog supports scroll-to-zoom
The dialog SHALL support zooming the image (1x to 4x) via mouse scroll wheel within the image frame, with overflow clipped to the frame.

#### Scenario: Scroll to zoom in
- **WHEN** user scrolls up/forward over the image
- **THEN** the image scales up within its frame (max 4x)

#### Scenario: Scroll to zoom out
- **WHEN** user scrolls down/backward over the image
- **THEN** the image scales down (min 1x)

### Requirement: Dialog supports pinch-to-zoom
The dialog SHALL support pinch-to-zoom gesture on touch devices.

#### Scenario: Pinch to zoom
- **WHEN** user pinches outward on the image on a touch device
- **THEN** the image zooms in proportionally to the pinch distance

### Requirement: Dialog supports pan when zoomed
When zoom is greater than 1x, the user SHALL be able to drag to pan within the image frame.

#### Scenario: Pan zoomed image
- **WHEN** user drags the image while zoom is greater than 1x
- **THEN** the image pans following the drag direction, clipped to the frame

### Requirement: Dialog can be closed
The dialog SHALL close when the user clicks the backdrop, presses Escape, or clicks the close button.

#### Scenario: Close via Escape
- **WHEN** user presses the Escape key while dialog is open
- **THEN** the dialog closes

#### Scenario: Close via backdrop click
- **WHEN** user clicks the dimmed backdrop outside the dialog card
- **THEN** the dialog closes
