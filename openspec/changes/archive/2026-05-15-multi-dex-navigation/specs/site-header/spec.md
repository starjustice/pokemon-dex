## MODIFIED Requirements

### Requirement: Site header includes dex tabs on listing pages
The SiteHeader SHALL accept an optional `showTabs` prop. When `showTabs` is true, the dex tab bar (DexTabs component) SHALL be rendered below the title. On detail pages, `showTabs` is not passed, so tabs do not appear.

#### Scenario: Header with tabs on home page
- **WHEN** the home page renders SiteHeader with `showTabs={true}`
- **THEN** the dex tabs appear below the title and subtitle

#### Scenario: Header without tabs on detail page
- **WHEN** a detail page renders SiteHeader without `showTabs`
- **THEN** no tab bar is shown, only the title/back button/theme toggle
