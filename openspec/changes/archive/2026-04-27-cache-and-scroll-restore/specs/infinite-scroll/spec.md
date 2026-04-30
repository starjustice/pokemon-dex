## MODIFIED Requirements

### Requirement: Scroll position is restored on back navigation
The system SHALL save the current scroll position to the cache continuously (throttled) and restore it when the user returns to the home page from a detail page.

#### Scenario: Scroll restore after back navigation
- **WHEN** user scrolls to position Y, navigates to a detail page, then navigates back
- **THEN** the page scrolls to approximately position Y after the content renders

#### Scenario: No scroll restore on fresh load
- **WHEN** user visits the home page via direct URL or hard refresh
- **THEN** the page starts at the top (scroll position 0)
