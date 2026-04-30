## ADDED Requirements

### Requirement: Infinite scroll pagination
The system SHALL automatically fetch and append the next page of Pokemon (~40 per page) when the user scrolls near the bottom of the card grid. A loading spinner SHALL be displayed at the bottom while the next page is being fetched. The loading indicator SHALL fade in smoothly rather than appearing instantly.

#### Scenario: Scroll triggers next page load
- **WHEN** the user scrolls and the bottom sentinel element enters the viewport
- **THEN** the system fetches the next page of ~40 Pokemon and appends them to the grid

#### Scenario: Loading indicator during fetch
- **WHEN** the next page is being fetched
- **THEN** a loading spinner fades in smoothly below the current cards

#### Scenario: All Pokemon loaded
- **WHEN** all ~1025 Pokemon have been loaded
- **THEN** the infinite scroll stops triggering and the loading indicator is hidden

#### Scenario: Fetch error during pagination
- **WHEN** a page fetch fails
- **THEN** the system displays a "Failed to load. Tap to retry." message at the bottom

### Requirement: No concurrent page fetches
The system SHALL fetch only one page at a time. A new page fetch SHALL NOT start until the current one completes.

#### Scenario: Rapid scrolling
- **WHEN** the user scrolls rapidly past multiple page boundaries
- **THEN** pages are fetched sequentially, one at a time, not in parallel

### Requirement: Scroll position is restored on back navigation
The system SHALL save the current scroll position to the cache continuously (throttled) and restore it when the user returns to the home page from a detail page.

#### Scenario: Scroll restore after back navigation
- **WHEN** user scrolls to position Y, navigates to a detail page, then navigates back
- **THEN** the page scrolls to approximately position Y after the content renders

#### Scenario: No scroll restore on fresh load
- **WHEN** user visits the home page via direct URL or hard refresh
- **THEN** the page starts at the top (scroll position 0)
