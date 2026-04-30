### Requirement: Encounter locations grouped by region
The EncounterList SHALL group game versions by their Pokemon region (Kanto, Johto, Hoenn, Sinnoh, Unova, Kalos, Alola, Galar, Paldea) using a static version-to-region mapping.

#### Scenario: Versions grouped under regions
- **WHEN** a Pokemon has encounters in Gold, Silver, and Platinum
- **THEN** Gold and Silver appear under "Johto" and Platinum appears under "Sinnoh"

### Requirement: Region accordions are expandable/collapsible
Each region group SHALL be rendered as a collapsible accordion. The first region SHALL be expanded by default, others collapsed.

#### Scenario: User expands a collapsed region
- **WHEN** user clicks a collapsed region header
- **THEN** the region content expands with a smooth animation showing all versions and locations

#### Scenario: User collapses an expanded region
- **WHEN** user clicks an expanded region header
- **THEN** the region content collapses with a smooth animation

### Requirement: Region header shows decorative map
Each region accordion header SHALL display a small inline SVG silhouette or colored icon representing the region alongside the region name.

#### Scenario: Region header visual
- **WHEN** a region accordion is rendered
- **THEN** the header shows a region icon/color, the region name, version count, and a chevron indicator

### Requirement: Location overflow is expandable
When a version has more than 5 locations, a clickable "+N more" badge SHALL be shown. Clicking it reveals all locations for that version.

#### Scenario: Expanding truncated locations
- **WHEN** user clicks "+10 more" on a version with 15 locations
- **THEN** all 15 locations are displayed

### Requirement: All game versions are accessible
The component SHALL NOT permanently hide any game versions. All versions SHALL be accessible within their region accordion.

#### Scenario: Pokemon with many game versions
- **WHEN** a Pokemon has encounters in 21 game versions
- **THEN** all 21 versions are accessible via their respective region accordions (no "And N more game versions" truncation)
