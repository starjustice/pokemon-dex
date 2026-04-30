## ADDED Requirements

### Requirement: Site header displays branding
The SiteHeader component SHALL render the site title "Pokemon Dex" as a link to the home page (`/`).

#### Scenario: Header renders on any page
- **WHEN** SiteHeader is rendered
- **THEN** the site title "Pokemon Dex" is visible and links to `/`

### Requirement: Site header displays theme toggle
The SiteHeader component SHALL include the ThemeToggle component.

#### Scenario: Theme toggle present in header
- **WHEN** SiteHeader is rendered
- **THEN** the ThemeToggle is visible and functional

### Requirement: Site header supports optional subtitle
The SiteHeader component SHALL accept an optional `subtitle` prop and render it below the title when provided.

#### Scenario: Subtitle displayed on home page
- **WHEN** SiteHeader is rendered with subtitle="Browse and search through all Pokemon"
- **THEN** the subtitle text is displayed below the title

### Requirement: Site header supports back navigation
The SiteHeader component SHALL accept optional `backHref` and `backLabel` props to render a back link.

#### Scenario: Back link on detail page
- **WHEN** SiteHeader is rendered with backHref="/" and backLabel="Back to Pokédex"
- **THEN** a back navigation link is displayed pointing to `/`
