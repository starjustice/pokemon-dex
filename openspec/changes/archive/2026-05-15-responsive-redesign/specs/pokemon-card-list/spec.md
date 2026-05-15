## MODIFIED Requirements

### Requirement: Card grid responsive layout
The card grid SHALL use responsive spacing and sizing: on mobile (< sm), cards SHALL have increased internal padding (`p-4`) and the grid gap SHALL be `gap-5` for better breathing room. Card text (Pokemon name, number) SHALL use `text-base` on mobile for readability. The grid columns remain: 1 col on mobile, 2 on `sm`, 3 on `lg`, 4 on `xl`.

#### Scenario: Mobile card readability
- **WHEN** viewing the grid on a phone (< sm)
- **THEN** card names are `text-base` (not `text-sm`), cards have `p-4` padding, and grid gap is `gap-5`

#### Scenario: Card touch targets on mobile
- **WHEN** the user taps a card on mobile
- **THEN** the entire card area is easily tappable with adequate spacing between cards
