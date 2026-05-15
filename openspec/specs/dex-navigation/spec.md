## MODIFIED Requirements

### Requirement: Dex section navigation replaces tabs with sidebar
The horizontal DexTabs tab bar SHALL be removed. Navigation between dex sections (Pokemon, Skills) SHALL be handled by the sidebar on desktop and the drawer on mobile. The `DexTabs` component SHALL be deleted.

#### Scenario: No horizontal tabs on any page
- **WHEN** viewing any page
- **THEN** no horizontal tab bar is displayed below the header

#### Scenario: Navigation via sidebar
- **WHEN** the user wants to switch from Pokemon to Skills
- **THEN** they click the "Skills" link in the sidebar (desktop) or drawer (mobile)
