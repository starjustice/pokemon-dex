## MODIFIED Requirements

### Requirement: PokemonDetail includes shiny sprite URLs
The `PokemonDetail` interface SHALL include `shinyImage: string | null`, `shinyBackImage: string | null`, and `shinyAnimatedSprite: string` fields extracted from the PokeAPI response. No additional API calls SHALL be made.

#### Scenario: Shiny fields populated from PokeAPI
- **WHEN** `fetchPokemonDetail` or `fetchMegaDetail` is called
- **THEN** the returned `PokemonDetail` SHALL include `shinyImage` from `sprites.other['official-artwork'].front_shiny`, `shinyBackImage` from `sprites.back_shiny`, and `shinyAnimatedSprite` from the Showdown shiny GIF URL pattern

#### Scenario: Shiny artwork not available
- **WHEN** PokeAPI returns null for `front_shiny` artwork
- **THEN** `shinyImage` SHALL be `null`
