## MODIFIED Requirements

### Requirement: SiteHeader simplified
The SiteHeader SHALL no longer render DexTabs or accept a `showTabs` prop. On mobile, the header SHALL include a hamburger menu button (left side) that triggers the mobile drawer. On desktop, the hamburger is hidden (sidebar is always visible). The ThemeToggle SHALL be removed from the header (moved to sidebar).

#### Scenario: Mobile header with hamburger
- **WHEN** viewing any page on mobile
- **THEN** the header shows a hamburger menu button on the left that opens the drawer

#### Scenario: Desktop header without hamburger
- **WHEN** viewing any page on desktop (lg+)
- **THEN** the header does not show a hamburger button

#### Scenario: No theme toggle in header
- **WHEN** viewing the header on any screen size
- **THEN** the ThemeToggle is not in the header (it's in the sidebar)
