## ADDED Requirements

### Requirement: Bottom-sheet filter modal on mobile
The system SHALL display a slide-up bottom-sheet modal on mobile containing item filter controls.

#### Scenario: Sheet opens from FAB
- **WHEN** user taps the filter FAB on mobile
- **THEN** a bottom-sheet slides up with backdrop overlay, containing search input and category chips

#### Scenario: Sheet closes
- **WHEN** user taps the backdrop or close button
- **THEN** the sheet animates down and unmounts

#### Scenario: Body scroll lock
- **WHEN** the filter sheet is open
- **THEN** the page body scroll is locked

#### Scenario: Search in sheet
- **WHEN** user types in the search input within the sheet
- **THEN** the item grid filters by name in real-time

#### Scenario: Category selection in sheet
- **WHEN** user taps a category chip in the sheet
- **THEN** items filter to that category and the chip shows active state

#### Scenario: Clear all filters
- **WHEN** user taps "Clear all" in the sheet
- **THEN** search is cleared and category selection is removed

### Requirement: Dark mode support
The filter sheet SHALL support dark mode with appropriate variants.

#### Scenario: Dark mode sheet
- **WHEN** dark mode is active
- **THEN** sheet background, text, inputs, and chips use dark color variants
