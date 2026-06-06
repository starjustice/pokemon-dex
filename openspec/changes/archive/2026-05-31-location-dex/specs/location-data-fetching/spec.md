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
