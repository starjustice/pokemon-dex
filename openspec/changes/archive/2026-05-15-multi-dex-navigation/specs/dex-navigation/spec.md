## ADDED Requirements

### Requirement: Dex section tabs
The system SHALL display a horizontal tab bar on listing pages (home, skills) that allows switching between dex sections. Each tab SHALL be a `<Link>` to its route. The active tab SHALL be visually highlighted (bold text, underline, or colored indicator). The tab bar SHALL be extensible — adding a new dex section requires only adding an entry to the tab configuration.

#### Scenario: Tabs visible on home page
- **WHEN** the user views the home page (`/`)
- **THEN** a tab bar is visible with "Pokemon" (active) and "Skills" tabs

#### Scenario: Tabs visible on skills page
- **WHEN** the user views the skills page (`/skills`)
- **THEN** a tab bar is visible with "Pokemon" and "Skills" (active) tabs

#### Scenario: Tab navigation
- **WHEN** the user clicks the "Skills" tab from the home page
- **THEN** the browser navigates to `/skills`

#### Scenario: Active tab derived from URL
- **WHEN** the current URL is `/skills`
- **THEN** the "Skills" tab is highlighted as active

#### Scenario: Tabs hidden on detail pages
- **WHEN** the user views a Pokemon detail page (`/pokemon/[id]`)
- **THEN** the tab bar is not displayed

### Requirement: Tab bar responsive design
The tab bar SHALL display horizontally with adequate spacing on all screen sizes. On mobile, tabs SHALL have large enough tap targets (minimum `py-2 px-4`). If many tabs exist in the future, the bar SHALL allow horizontal scrolling.

#### Scenario: Mobile tap targets
- **WHEN** viewing the tab bar on mobile
- **THEN** each tab has minimum `py-2 px-4` padding for easy tapping
