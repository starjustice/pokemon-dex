## MODIFIED Requirements

### Requirement: Infinite scroll pagination
The system SHALL automatically fetch and append the next page of Pokemon (~40 per page) when the user scrolls near the bottom of the card grid. When no filters are active, pagination follows sequential dex order. When filters are active, pagination follows the filtered ID list — fetching details for the next page of matching Pokemon IDs. A loading spinner SHALL be displayed at the bottom while the next page is being fetched.

#### Scenario: Scroll triggers next page load (unfiltered)
- **WHEN** no filters are active and the user scrolls to the bottom
- **THEN** the system fetches the next page of ~40 Pokemon in dex order and appends them to the grid

#### Scenario: Scroll triggers next page load (filtered)
- **WHEN** filters are active and the user scrolls to the bottom and more matching Pokemon exist
- **THEN** the system fetches details for the next ~40 Pokemon from the filtered ID list and appends them to the grid

#### Scenario: All filtered results loaded
- **WHEN** filters are active and all matching Pokemon details have been loaded
- **THEN** the infinite scroll stops triggering and the loading indicator is hidden

#### Scenario: Loading indicator during fetch
- **WHEN** the next page is being fetched
- **THEN** a loading spinner fades in smoothly below the current cards

#### Scenario: Fetch error during pagination
- **WHEN** a page fetch fails
- **THEN** the system displays a "Failed to load. Tap to retry." message at the bottom
