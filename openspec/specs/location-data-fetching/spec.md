## ADDED Requirements

### Requirement: Location TypeScript interfaces
The system SHALL define TypeScript interfaces for location data.

#### Scenario: Type safety
- **WHEN** location data is fetched
- **THEN** responses typed with interfaces (LocationBasic, LocationDetail, AreaEncounter)

### Requirement: Fetch regions
The system SHALL provide a cached function to fetch all regions with their location ID lists.

#### Scenario: Regions cache
- **WHEN** `fetchRegions()` is called
- **THEN** returns all regions with name and location IDs, cached after first call

### Requirement: Fetch location page
The system SHALL provide a function to fetch paginated locations with basic info.

#### Scenario: Fetch page
- **WHEN** `fetchLocationPage(offset, limit)` is called
- **THEN** returns locations with id, name, region, and area count

### Requirement: Fetch location detail
The system SHALL provide a function to fetch full location detail with area encounters.

#### Scenario: Fetch detail
- **WHEN** `fetchLocationDetail(id)` is called
- **THEN** returns location with all areas and their Pokemon encounters (pokemon name+id, method, level range, rate)

### Requirement: Fetch all location names
The system SHALL provide a cached function returning all location names for search.

#### Scenario: Name cache
- **WHEN** `fetchAllLocationNames()` is called
- **THEN** returns all location names with IDs, cached after first call

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
