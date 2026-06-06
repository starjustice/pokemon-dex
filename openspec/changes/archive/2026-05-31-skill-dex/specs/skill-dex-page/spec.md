## MODIFIED Requirements

### Requirement: Skills page content
The `/skills` route SHALL display a functional moves browser instead of a placeholder.

#### Scenario: Page loads with moves
- **WHEN** user navigates to `/skills`
- **THEN** system displays a moves grid with filter controls instead of the "Coming Soon" placeholder

#### Scenario: SiteHeader
- **WHEN** skills page loads
- **THEN** SiteHeader shows subtitle "Browse Pokemon moves and skills"
