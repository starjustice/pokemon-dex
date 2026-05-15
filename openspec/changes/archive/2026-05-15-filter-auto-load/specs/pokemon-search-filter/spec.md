## MODIFIED Requirements

### Requirement: Combined search and filters
Search and filters SHALL work together using AND logic across ALL Pokemon, not just currently loaded Pokemon. When any filter or search is activated, the system SHALL use PokeAPI endpoints to resolve the complete set of matching Pokemon IDs, then fetch details only for the visible page. Results SHALL be correct and complete from the first page displayed. There is no "Load all" button.

#### Scenario: Type filter returns complete results immediately
- **WHEN** the user selects "Fighting" type with only 40 Pokemon previously loaded
- **THEN** the system SHALL fetch the complete Fighting-type Pokemon list from `/type/fighting`, then fetch details for the first 40 matching Pokemon, displaying correct results immediately

#### Scenario: Search with active filter
- **WHEN** the user has "Fire" type filter active and types "char" in search
- **THEN** only Fire-type Pokemon whose names contain "char" are shown, with results complete from the first page

#### Scenario: Results count displayed
- **WHEN** any filter or search is active
- **THEN** the system displays "Showing X of Y" where Y is the total number of matching Pokemon (not just loaded Pokemon)

#### Scenario: Infinite scroll through filtered results
- **WHEN** the user scrolls to the bottom of filtered results and more matching Pokemon exist beyond the current page
- **THEN** the system SHALL fetch details for the next page of filtered Pokemon IDs and append them to the grid

#### Scenario: Filter cleared returns to normal pagination
- **WHEN** the user clears all filters
- **THEN** the grid returns to standard sequential pagination from where it left off

#### Scenario: Filter chip entrance animation
- **WHEN** a new filter chip appears (type selected, generation chosen, or search entered)
- **THEN** the chip animates in with a fade and scale transition

### Requirement: No results empty state
The system SHALL display a "No Pokemon found" message with a "Clear all filters" button when the API-resolved filtered set contains zero results. A loading state SHALL be shown while the filter resolution is in progress.

#### Scenario: Empty state display
- **WHEN** the API-resolved filtered set contains zero Pokemon
- **THEN** a centered empty state is shown with a sad face, "No Pokemon found" heading, helpful message, and a "Clear all filters" button

#### Scenario: Loading state during filter resolution
- **WHEN** the user activates a filter and the system is fetching the filtered ID list from PokeAPI
- **THEN** a loading indicator is shown in the grid area

### Requirement: Load all for complete search
**REMOVED** — Replaced by API-level filtering. The system no longer needs a "Load all Pokemon for complete results" button because filters query the complete dataset via PokeAPI endpoints.

#### Scenario: Load all button removed
- **WHEN** the user has filters active
- **THEN** there is no "Load all Pokemon for complete results" button displayed
