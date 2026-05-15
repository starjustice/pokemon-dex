## ADDED Requirements

### Requirement: Desktop fixed sidebar
On desktop (`lg+`), the system SHALL display a fixed left sidebar with: the app title/logo at top, navigation links with icons in the middle, and the theme toggle at the bottom. The sidebar SHALL be `w-64` (256px) wide, full viewport height, and have a right border.

#### Scenario: Sidebar visible on desktop
- **WHEN** viewing any page on desktop (lg+)
- **THEN** a fixed left sidebar is visible with app title, nav links, and theme toggle

#### Scenario: Active link highlighted
- **WHEN** the current URL matches a nav link
- **THEN** that link is highlighted with a colored background and bold text

#### Scenario: Sidebar persists across routes
- **WHEN** the user navigates between pages
- **THEN** the sidebar remains visible without re-mounting

### Requirement: Mobile slide-in drawer
On mobile (< `lg`), the sidebar SHALL be hidden. A hamburger menu button SHALL be displayed in the page header. Tapping it SHALL open a slide-in drawer from the left with the same navigation content as the desktop sidebar. The drawer SHALL have a backdrop overlay that closes it on tap. Body scroll SHALL be locked when the drawer is open.

#### Scenario: Drawer opens on hamburger tap
- **WHEN** the user taps the hamburger menu button on mobile
- **THEN** a drawer slides in from the left with navigation links

#### Scenario: Drawer closes on backdrop tap
- **WHEN** the user taps the backdrop overlay
- **THEN** the drawer slides out and closes

#### Scenario: Drawer closes on navigation
- **WHEN** the user taps a nav link in the drawer
- **THEN** the drawer closes and the app navigates to the selected page

#### Scenario: Drawer slide animation
- **WHEN** the drawer opens
- **THEN** it slides from `translateX(-100%)` to `translateX(0)` over 300ms ease-out

### Requirement: Main content offset on desktop
On desktop, the main page content SHALL be offset by the sidebar width (`ml-64`) so it does not overlap with the sidebar. On mobile, no offset is applied.

#### Scenario: Content offset on desktop
- **WHEN** viewing any page on desktop
- **THEN** the main content area starts after the sidebar (margin-left: 256px)

#### Scenario: No offset on mobile
- **WHEN** viewing any page on mobile
- **THEN** the main content uses full width with no left margin

### Requirement: Extensible nav configuration
The sidebar navigation SHALL be defined as a static array of items, each with a label, href, and icon. Adding a new section SHALL only require adding an entry to this array.

#### Scenario: Adding a new nav item
- **WHEN** a developer adds a new entry to the NAV_ITEMS array
- **THEN** the new link appears in both the desktop sidebar and mobile drawer
