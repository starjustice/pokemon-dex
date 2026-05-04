## ADDED Requirements

### Requirement: ShinyComparison component
A static server component `ShinyComparison` SHALL display normal and shiny official artwork side-by-side for a given Pokemon.

#### Scenario: Side-by-side display
- **WHEN** `ShinyComparison` is rendered with `normalImage` and `shinyImage` props
- **THEN** both images are shown in a two-column grid with "Normal" and "Shiny" labels, and the shiny column has a distinct golden/sparkle heading

#### Scenario: Used on base detail page
- **WHEN** the base Pokemon detail page loads and `shinyImage` is not null
- **THEN** the `ShinyComparison` section is rendered between the Stats and Evolution Chain sections

#### Scenario: Used on mega detail page
- **WHEN** the mega detail page loads and `shinyImage` is not null
- **THEN** the `ShinyComparison` section is rendered between the Stats and Evolution Chain sections

#### Scenario: Section not shown when no shiny
- **WHEN** `shinyImage` is null
- **THEN** the `ShinyComparison` section is not rendered on the page
