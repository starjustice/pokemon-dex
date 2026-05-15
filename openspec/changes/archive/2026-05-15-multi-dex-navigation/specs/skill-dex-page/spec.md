## ADDED Requirements

### Requirement: Skill Dex placeholder page
The system SHALL render a page at `/skills` that displays a styled placeholder indicating the Skill Dex is coming soon. The page SHALL include: SiteHeader with dex tabs, a centered placeholder with an icon, "Skill Dex" heading, "Coming Soon" subtitle, and a brief description. The page SHALL support dark mode.

#### Scenario: Skills page renders placeholder
- **WHEN** the user navigates to `/skills`
- **THEN** a styled placeholder page is shown with "Skill Dex" heading and "Coming Soon" message

#### Scenario: Skills page has consistent styling
- **WHEN** viewing the skills placeholder page
- **THEN** the page uses the same background, max-width container, and font styles as the Pokemon home page

#### Scenario: Skills page supports dark mode
- **WHEN** dark mode is active
- **THEN** the skills placeholder page uses appropriate dark theme colors

### Requirement: No API integration for skills
The skills page SHALL NOT fetch any data from PokeAPI or any other API. It is purely a static placeholder.

#### Scenario: No network requests on skills page
- **WHEN** the skills page loads
- **THEN** no API calls are made
