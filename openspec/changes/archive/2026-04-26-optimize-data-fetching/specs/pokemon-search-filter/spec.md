## MODIFIED Requirements

### Requirement: Combined search and filters
Search and filters SHALL work together using AND logic on the currently loaded Pokemon. A results count ("Showing X of Y loaded") SHALL be displayed when any filter is active. A "Clear all" button SHALL be styled as a visible button. When filters are active and not all Pokemon are loaded, a "Load all Pokemon for complete results" button SHALL be shown.

#### Scenario: Search with active filter
- **WHEN** the user has "Fire" type filter active and types "char" in search
- **THEN** only Fire-type Pokemon whose names contain "char" from the currently loaded set are shown

#### Scenario: Results count displayed
- **WHEN** any filter or search is active
- **THEN** the system displays "Showing X of Y loaded Pokemon" with a styled "Clear all" button

#### Scenario: Load all for complete search
- **WHEN** filters are active and not all Pokemon are loaded
- **THEN** a "Load all Pokemon for complete results" button is shown, which triggers loading all remaining Pokemon
