## ADDED Requirements

### Requirement: Floating filter button on mobile
The system SHALL display a floating action button (FAB) in the bottom-right corner of the viewport on screens below the `lg` breakpoint. The FAB SHALL show a filter icon and a badge with the count of active filters (hidden when count is 0). The FAB SHALL be hidden on `lg+` screens.

#### Scenario: FAB visible on mobile
- **WHEN** the user views the home page on a mobile device (< lg)
- **THEN** a floating filter button is visible in the bottom-right corner with a filter icon

#### Scenario: FAB shows active filter count
- **WHEN** the user has 3 active filters (e.g., 2 types + 1 generation)
- **THEN** the FAB displays a badge showing "3"

#### Scenario: FAB hidden on desktop
- **WHEN** the user views the home page on a desktop screen (lg+)
- **THEN** the FAB is not rendered

### Requirement: Bottom sheet filter modal
Tapping the FAB SHALL open a bottom sheet modal that slides up from the bottom of the viewport. The sheet SHALL contain: a search input, type filter toggles, generation select, mega toggle, active filter chips, and "Clear all" / "Done" buttons. The sheet SHALL have a backdrop overlay that closes the sheet on tap.

#### Scenario: Sheet opens on FAB tap
- **WHEN** the user taps the FAB
- **THEN** a bottom sheet slides up with a backdrop overlay, containing all filter controls

#### Scenario: Sheet closes on backdrop tap
- **WHEN** the user taps the backdrop overlay
- **THEN** the sheet slides down and closes

#### Scenario: Sheet closes on Done button
- **WHEN** the user taps the "Done" button inside the sheet
- **THEN** the sheet closes and filters are applied to the grid

#### Scenario: Body scroll locked while sheet is open
- **WHEN** the bottom sheet is open
- **THEN** the background page does not scroll

### Requirement: Sheet slide animation
The bottom sheet SHALL animate in with a slide-up transform and animate out with a slide-down transform. The animation SHALL use CSS transforms (GPU-accelerated) for smooth 60fps performance.

#### Scenario: Sheet entrance animation
- **WHEN** the sheet opens
- **THEN** it slides up from `translateY(100%)` to `translateY(0)` over 300ms ease-out

#### Scenario: Sheet exit animation
- **WHEN** the sheet closes
- **THEN** it slides down from `translateY(0)` to `translateY(100%)` over 200ms ease-in
