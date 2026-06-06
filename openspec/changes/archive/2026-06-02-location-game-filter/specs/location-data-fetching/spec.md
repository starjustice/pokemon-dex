## ADDED Requirements

### Requirement: Fetch version groups
The system SHALL provide a cached function to fetch all Pokemon version-groups with their regions and versions.

#### Scenario: Version-groups cache
- **WHEN** `fetchVersionGroups()` is called
- **THEN** returns all 32 version-groups with `name`, `versions[]`, `regions[]`, and `generation`, cached after first call

### Requirement: Resolve locations for a game
The system SHALL provide a helper that returns the set of location IDs available in a given version-group.

#### Scenario: Get location IDs for game
- **WHEN** `getLocationIdsForGame("firered-leafgreen")` is called
- **THEN** returns a `Set<number>` of all location IDs in the regions associated with that version-group

#### Scenario: Unknown version-group
- **WHEN** `getLocationIdsForGame("invalid-name")` is called
- **THEN** returns an empty `Set<number>`

### Requirement: Version-group metadata
The system SHALL define a static metadata table for version-groups providing display names, generation, and short labels.

#### Scenario: Display name lookup
- **WHEN** version-group "firered-leafgreen" metadata is requested
- **THEN** returns `displayName: "FireRed & LeafGreen"`, `shortLabel: "FR/LG"`, and `generation: "generation-iii"`

#### Scenario: Unknown version-group fallback
- **WHEN** a version-group has no metadata entry
- **THEN** display name falls back to a title-cased version of the API name
