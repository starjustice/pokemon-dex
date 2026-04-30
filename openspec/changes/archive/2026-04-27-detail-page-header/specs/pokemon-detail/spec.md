## MODIFIED Requirements

### Requirement: Detail page layout
The detail page SHALL use the SiteHeader component with back navigation instead of an inline back link. The page SHALL be wrapped in the same container pattern as the home page.

#### Scenario: Detail page has site header
- **WHEN** user navigates to `/pokemon/[id]`
- **THEN** the SiteHeader is displayed with a back link to `/` and the theme toggle

#### Scenario: Inline back link removed
- **WHEN** user views the detail page
- **THEN** there is no separate inline "Back to Pokédex" link in the content area (navigation is in the header)
