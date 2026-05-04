## ADDED Requirements

### Requirement: 3D extruded stat bars
Stat bars SHALL have a 3D appearance with depth, highlight gradient, and shadow to simulate a raised/extruded bar.

#### Scenario: Stat bar displays with 3D depth
- **WHEN** the stats section loads
- **THEN** each stat bar SHALL render with a recessed trough (inset shadow), a fill bar with a top highlight gradient and bottom shadow creating a 3D extrusion effect

### Requirement: Stat bar hover interaction
Stat bars SHALL respond to hover with a lift effect.

#### Scenario: Hover lifts the bar
- **WHEN** user hovers over a stat bar's fill area
- **THEN** the fill bar SHALL shift up slightly with increased shadow depth, creating a "lift" feel

### Requirement: Animated stat bar fill
Stat bars SHALL animate their fill width from 0% to the actual value on page load.

#### Scenario: Bars fill on load
- **WHEN** the stats section appears on the detail page
- **THEN** each stat bar animates from 0% to its actual percentage width, staggered with approximately 50ms delay between each bar
