## ADDED Requirements

### Requirement: Display mega evolution forms
The detail page SHALL display a "Mega Evolution" section for Pokemon that have mega forms, showing the mega's artwork, name, types, and stats.

#### Scenario: Pokemon has mega evolution
- **WHEN** user views a Pokemon that has mega evolution(s) (detected from species `varieties` where name contains `-mega`)
- **THEN** the detail page SHALL show a "Mega Evolution" section below the evolution chain with the mega form's official artwork, name, type badges, and base stats

#### Scenario: Pokemon has multiple mega forms
- **WHEN** a Pokemon has two mega forms (e.g., Charizard Mega X and Mega Y)
- **THEN** both mega forms SHALL be displayed side-by-side

#### Scenario: Pokemon has no mega evolution
- **WHEN** a Pokemon has no mega forms in its species `varieties`
- **THEN** no "Mega Evolution" section SHALL be rendered

### Requirement: Mega evolution stat comparison
The mega evolution section SHALL show stats for each mega form to allow comparison with the base form.

#### Scenario: View mega stats
- **WHEN** the mega evolution section is displayed
- **THEN** each mega form card SHALL show its base stats using the same stat bar style as the main stats section
