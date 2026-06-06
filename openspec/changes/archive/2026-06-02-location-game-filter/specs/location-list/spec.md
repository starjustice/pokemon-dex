## MODIFIED Requirements

### Requirement: Game filter
The system SHALL allow filtering locations by Pokemon game (version-group) using colored chip buttons grouped by generation.

#### Scenario: Filter by game
- **WHEN** user selects "FireRed & LeafGreen" chip
- **THEN** grid shows only locations belonging to the Kanto region (mapped from the FR/LG version-group)

#### Scenario: Deselect game
- **WHEN** user clicks active game chip
- **THEN** filter clears, showing all locations

#### Scenario: Game chip display
- **WHEN** game chips are rendered
- **THEN** each chip shows the game display name with a background color matching its generation, and chips are visually grouped by generation in the filter sheet

#### Scenario: Game inclusion disclaimer
- **WHEN** a game filter is active
- **THEN** a subtle disclaimer is shown noting that some locations may be exclusive to specific games within the same region/generation

## REMOVED Requirements

### Requirement: Region filter
**Reason**: Replaced by the more user-friendly game filter. Region info is preserved as a secondary badge on cards and on the detail page, but is no longer the primary filter mechanism.

**Migration**: Users who want to filter by region can select any game from that region — all games within a region map to the same location set.
