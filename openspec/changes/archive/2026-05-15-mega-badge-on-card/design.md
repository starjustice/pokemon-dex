## Context

The home grid uses `PokemonCard` for each Pokemon. Cards show ID, name, types, abilities, and generation. The PokeAPI list endpoint (`/pokemon?offset=X&limit=Y`) returns only name + URL — no species data. Fetching species per card to check for megas would cost 40 extra API calls per page load.

## Goals / Non-Goals

**Goals:**
- Show a "Mega" badge on cards for Pokemon that have at least one mega form
- Zero extra API calls — static lookup only
- Badge should be visually clear but not dominate the card

**Non-Goals:**
- Filtering the grid by mega-capable Pokemon
- Showing the actual mega forms as separate cards
- Fetching mega data at list time

## Decisions

### 1. Static ID set in `lib/mega-ids.ts`

There are exactly 46 Pokemon with mega evolutions (all from Gen 6-7, introduced in X/Y and ORAS). This list is fixed — Game Freak has not introduced new megas since Sun/Moon. A hardcoded `Set<number>` is the right tool:

```ts
export const MEGA_IDS = new Set<number>([3, 6, 9, 15, 18, ...]);
```

- **Why not fetch at runtime?** The list endpoint doesn't include species data. Fetching species for each card would be 40+ parallel requests per page.
- **Why not a server-side pass?** The grid is a client component with infinite scroll — adding a server fetch for species data would complicate the architecture significantly.

### 2. Badge placement: top-left, below the number badge

The number badge (e.g., `#0006`) sits top-right. The mega badge goes top-left to avoid conflict. A small purple pill with "MEGA" in all-caps, matching the style of the hidden-ability badge used on the detail page.

### 3. Badge style

Matches the existing design language: small rounded-full pill, purple gradient, white text, similar to the `Hidden` badge in `AbilityList`. No animation needed — it's a static indicator.

## Risks / Trade-offs

- **Static list maintenance**: If future games add new megas, `mega-ids.ts` needs updating. Extremely low risk given the franchise direction.
- **No badge for Gigantamax**: This change is mega-only. Gmax forms exist but are a different concept and out of scope.
