import { MEGA_MAP } from "@/lib/mega-ids";
import { GMAX_MAP, GMAX_MOVES, type GMaxMove } from "@/lib/gmax-ids";

export interface PokemonType {
  name: string;
  slot: number;
}

export interface PokemonAbility {
  name: string;
  isHidden: boolean;
}

export interface Pokemon {
  id: number;
  name: string;
  types: PokemonType[];
  abilities: PokemonAbility[];
  generation: string;
  image: string;
  fallbackImage: string;
  /** True if this is a mega evolution form */
  isMega?: boolean;
  /** National dex ID of the base form (for sorting megas after their base) */
  basePokemonId?: number;
  /** PokeAPI name of the mega form (e.g. "charizard-mega-x") used in URL routing */
  megaName?: string;
}

export interface PokemonPage {
  pokemon: Pokemon[];
  total: number;
  hasMore: boolean;
  nextOffset: number;
}

interface PokeAPIListResponse {
  count: number;
  results: { name: string; url: string }[];
}

interface PokeAPIPokemonResponse {
  id: number;
  name: string;
  types: { slot: number; type: { name: string } }[];
  abilities: { ability: { name: string }; is_hidden: boolean }[];
  sprites: {
    front_default: string | null;
    other: {
      "official-artwork": {
        front_default: string | null;
      };
    };
  };
}

const POKEAPI_BASE = "https://pokeapi.co/api/v2";
export const PAGE_SIZE = 40;
export const TOTAL_POKEMON = 1025;

// Static generation ranges — avoids fetching species data for each Pokemon
const GENERATION_RANGES: [number, number, string][] = [
  [1, 151, "Gen I"],
  [152, 251, "Gen II"],
  [252, 386, "Gen III"],
  [387, 493, "Gen IV"],
  [494, 649, "Gen V"],
  [650, 721, "Gen VI"],
  [722, 809, "Gen VII"],
  [810, 905, "Gen VIII"],
  [906, 1025, "Gen IX"],
];

function getGeneration(id: number): string {
  for (const [min, max, gen] of GENERATION_RANGES) {
    if (id >= min && id <= max) return gen;
  }
  return "Unknown";
}

function parsePokemonResponse(data: PokeAPIPokemonResponse): Pokemon {
  const id = data.id;
  return {
    id,
    name: data.name,
    types: data.types.map((t) => ({ name: t.type.name, slot: t.slot })),
    abilities: data.abilities.map((a) => ({
      name: a.ability.name,
      isHidden: a.is_hidden,
    })),
    generation: getGeneration(id),
    image:
      data.sprites.other["official-artwork"].front_default ??
      data.sprites.front_default ??
      `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`,
    fallbackImage:
      data.sprites.front_default ??
      `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`,
  };
}

/**
 * Fetch mega evolution forms for the given base Pokemon IDs.
 * Uses MEGA_MAP to look up mega form IDs, fetches them in parallel,
 * and returns Pokemon objects with mega fields set.
 * Failed fetches are silently skipped.
 */
export async function fetchMegaForms(baseIds: number[]): Promise<Pokemon[]> {
  const megaFetches: { baseId: number; megaId: number }[] = [];
  for (const baseId of baseIds) {
    const megaIds = MEGA_MAP[baseId];
    if (megaIds) {
      for (const megaId of megaIds) {
        megaFetches.push({ baseId, megaId });
      }
    }
  }

  if (megaFetches.length === 0) return [];

  const results = await Promise.allSettled(
    megaFetches.map(async ({ baseId, megaId }): Promise<Pokemon> => {
      const res = await fetch(`${POKEAPI_BASE}/pokemon/${megaId}`);
      if (!res.ok) throw new Error(`Failed to fetch mega ${megaId}`);
      const data: PokeAPIPokemonResponse = await res.json();
      const base = parsePokemonResponse(data);
      return {
        ...base,
        // Override generation to match the base form (megas share their base's generation)
        generation: getGeneration(baseId),
        isMega: true,
        basePokemonId: baseId,
        megaName: data.name,
      };
    })
  );

  return results
    .filter(
      (r): r is PromiseFulfilledResult<Pokemon> => r.status === "fulfilled"
    )
    .map((r) => r.value);
}

export async function fetchPokemonPage(
  offset: number = 0,
  limit: number = PAGE_SIZE
): Promise<PokemonPage> {
  // Clamp to total
  const clampedLimit = Math.min(limit, TOTAL_POKEMON - offset);
  if (clampedLimit <= 0) {
    return { pokemon: [], total: TOTAL_POKEMON, hasMore: false, nextOffset: offset };
  }

  // Step 1: Get list page
  const listRes = await fetch(
    `${POKEAPI_BASE}/pokemon?limit=${clampedLimit}&offset=${offset}`
  );
  if (!listRes.ok) throw new Error("Failed to fetch Pokemon list");
  const listData: PokeAPIListResponse = await listRes.json();

  // Step 2: Fetch all detail data in parallel
  const results = await Promise.allSettled(
    listData.results.map(async (p) => {
      const res = await fetch(p.url);
      if (!res.ok) throw new Error(`Failed: ${p.url}`);
      const data: PokeAPIPokemonResponse = await res.json();
      return parsePokemonResponse(data);
    })
  );

  const pokemon = results
    .filter(
      (r): r is PromiseFulfilledResult<Pokemon> => r.status === "fulfilled"
    )
    .map((r) => r.value)
    .sort((a, b) => a.id - b.id);

  const nextOffset = offset + clampedLimit;

  return {
    pokemon,
    total: TOTAL_POKEMON,
    hasMore: nextOffset < TOTAL_POKEMON,
    nextOffset,
  };
}

export const ALL_TYPES = [
  "normal",
  "fire",
  "water",
  "electric",
  "grass",
  "ice",
  "fighting",
  "poison",
  "ground",
  "flying",
  "psychic",
  "bug",
  "rock",
  "ghost",
  "dragon",
  "dark",
  "steel",
  "fairy",
] as const;

export const ALL_GENERATIONS = [
  "Gen I",
  "Gen II",
  "Gen III",
  "Gen IV",
  "Gen V",
  "Gen VI",
  "Gen VII",
  "Gen VIII",
  "Gen IX",
] as const;

// ===== Detail Page Types =====

export interface PokemonDetail {
  id: number;
  name: string;
  types: PokemonType[];
  abilities: PokemonAbility[];
  stats: PokemonStat[];
  height: number; // decimetres
  weight: number; // hectograms
  image: string;
  fallbackImage: string;
  backImage: string | null;
  generation: string;
  flavorText: string;
  genus: string;
  evolutionChain: EvolutionStage[];
  abilityDetails: AbilityDetail[];
  encounters: EncounterLocation[];
  animatedSprite: string;
  shinyImage: string | null;
  shinyBackImage: string | null;
  shinyAnimatedSprite: string;
  cryUrl: string | null;
  cryLegacyUrl: string | null;
  megaEvolutions: MegaEvolution[];
  canGmax: boolean;
  gmaxImage: string | null;
  gmaxMove: GMaxMove | null;
}

export interface PokemonStat {
  name: string;
  value: number;
}

export interface MegaEvolution {
  name: string;
  image: string;
  types: PokemonType[];
  stats: PokemonStat[];
}

export interface EvolutionStage {
  id: number;
  name: string;
  sprite: string;
  conditions: string[];
  evolvesTo: EvolutionStage[];
}

export interface AbilityDetail {
  name: string;
  isHidden: boolean;
  shortEffect: string;
}

export interface EncounterLocation {
  locationName: string;
  versionName: string;
}

// ===== Detail Page Fetchers =====

interface PokeAPISpeciesResponse {
  evolution_chain: { url: string };
  flavor_text_entries: { flavor_text: string; language: { name: string }; version: { name: string } }[];
  genera: { genus: string; language: { name: string } }[];
  varieties: { is_default: boolean; pokemon: { name: string; url: string } }[];
}

interface PokeAPIEvolutionChain {
  chain: PokeAPIChainLink;
}

interface PokeAPIChainLink {
  species: { name: string; url: string };
  evolution_details: {
    trigger: { name: string } | null;
    min_level: number | null;
    item: { name: string } | null;
    held_item: { name: string } | null;
    known_move: { name: string } | null;
    known_move_type: { name: string } | null;
    min_happiness: number | null;
    min_affection: number | null;
    time_of_day: string;
    location: { name: string } | null;
    trade_species: { name: string } | null;
    turn_upside_down: boolean;
    needs_overworld_rain: boolean;
  }[];
  evolves_to: PokeAPIChainLink[];
}

interface PokeAPIAbilityResponse {
  name: string;
  effect_entries: { short_effect: string; language: { name: string } }[];
}

interface PokeAPIEncounterResponse {
  location_area: { name: string };
  version_details: { version: { name: string } }[];
}

function parseEvolutionConditions(
  details: PokeAPIChainLink["evolution_details"]
): string[] {
  if (!details || details.length === 0) return [];
  return details.map((d) => {
    const parts: string[] = [];
    if (d.trigger?.name === "level-up") {
      if (d.min_level) parts.push(`Level ${d.min_level}`);
      else if (d.min_happiness) parts.push(`Happiness ${d.min_happiness}`);
      else if (d.min_affection) parts.push(`Affection ${d.min_affection}`);
      else if (d.known_move) parts.push(`Know ${formatName(d.known_move.name)}`);
      else if (d.known_move_type) parts.push(`Know ${formatName(d.known_move_type.name)}-type move`);
      else if (d.location) parts.push(`At ${formatName(d.location.name)}`);
      else if (d.time_of_day) parts.push(`Level up (${d.time_of_day})`);
      else if (d.needs_overworld_rain) parts.push("Level up in rain");
      else if (d.turn_upside_down) parts.push("Level up upside down");
      else parts.push("Level up");
    } else if (d.trigger?.name === "trade") {
      if (d.trade_species) parts.push(`Trade for ${formatName(d.trade_species.name)}`);
      else if (d.held_item) parts.push(`Trade holding ${formatName(d.held_item.name)}`);
      else parts.push("Trade");
    } else if (d.trigger?.name === "use-item" && d.item) {
      parts.push(`Use ${formatName(d.item.name)}`);
    } else if (d.trigger?.name) {
      parts.push(formatName(d.trigger.name));
    }
    if (parts.length === 0) parts.push("Level up");
    return parts.join(", ");
  });
}

function formatName(name: string): string {
  return name
    .split("-")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
}

function getSpeciesId(url: string): number {
  const parts = url.replace(/\/$/, "").split("/");
  return parseInt(parts[parts.length - 1], 10);
}

function parseChainLink(link: PokeAPIChainLink): EvolutionStage {
  const id = getSpeciesId(link.species.url);
  return {
    id,
    name: link.species.name,
    sprite: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`,
    conditions: parseEvolutionConditions(link.evolution_details),
    evolvesTo: link.evolves_to.map(parseChainLink),
  };
}

export async function fetchEvolutionChain(
  url: string
): Promise<EvolutionStage[]> {
  try {
    const res = await fetch(url);
    if (!res.ok) return [];
    const data: PokeAPIEvolutionChain = await res.json();
    return [parseChainLink(data.chain)];
  } catch {
    return [];
  }
}

export async function fetchAbilityDetails(
  abilities: { name: string; isHidden: boolean; url: string }[]
): Promise<AbilityDetail[]> {
  const results = await Promise.allSettled(
    abilities.map(async (a) => {
      const res = await fetch(a.url);
      if (!res.ok) throw new Error(`Failed: ${a.url}`);
      const data: PokeAPIAbilityResponse = await res.json();
      const english = data.effect_entries.find(
        (e) => e.language.name === "en"
      );
      return {
        name: data.name,
        isHidden: a.isHidden,
        shortEffect: english?.short_effect ?? "No description available.",
      };
    })
  );
  return results
    .filter(
      (r): r is PromiseFulfilledResult<AbilityDetail> =>
        r.status === "fulfilled"
    )
    .map((r) => r.value);
}

export async function fetchPokemonDetail(id: number): Promise<PokemonDetail> {
  // Stage 1: parallel fetches
  const [pokemonRes, speciesRes, encountersRes] = await Promise.all([
    fetch(`${POKEAPI_BASE}/pokemon/${id}`),
    fetch(`${POKEAPI_BASE}/pokemon-species/${id}`),
    fetch(`${POKEAPI_BASE}/pokemon/${id}/encounters`),
  ]);

  if (!pokemonRes.ok) throw new Error(`Failed to fetch pokemon ${id}`);
  if (!speciesRes.ok) throw new Error(`Failed to fetch species ${id}`);

  const pokemonData = await pokemonRes.json();
  const speciesData: PokeAPISpeciesResponse = await speciesRes.json();
  const encountersData: PokeAPIEncounterResponse[] = encountersRes.ok
    ? await encountersRes.json()
    : [];

  // Stage 2: evolution chain + ability details + mega evolutions
  const megaVarieties = speciesData.varieties.filter(
    (v) => !v.is_default && v.pokemon.name.includes("-mega")
  );

  const [evolutionChain, abilityDetails, ...megaResults] = await Promise.all([
    fetchEvolutionChain(speciesData.evolution_chain.url),
    fetchAbilityDetails(
      pokemonData.abilities.map(
        (a: { ability: { name: string; url: string }; is_hidden: boolean }) => ({
          name: a.ability.name,
          isHidden: a.is_hidden,
          url: a.ability.url,
        })
      )
    ),
    ...megaVarieties.map(async (v): Promise<MegaEvolution | null> => {
      try {
        const res = await fetch(v.pokemon.url);
        if (!res.ok) return null;
        const data = await res.json();
        const megaImage =
          data.sprites?.other?.["official-artwork"]?.front_default ??
          data.sprites?.front_default ??
          "";
        return {
          name: data.name,
          image: megaImage,
          types: data.types.map(
            (t: { slot: number; type: { name: string } }) => ({
              name: t.type.name,
              slot: t.slot,
            })
          ),
          stats: data.stats.map(
            (s: { stat: { name: string }; base_stat: number }) => ({
              name: s.stat.name,
              value: s.base_stat,
            })
          ),
        };
      } catch {
        return null;
      }
    }),
  ]);

  const megaEvolutions: MegaEvolution[] = megaResults.filter(
    (m): m is MegaEvolution => m !== null
  );

  // G-Max lookup
  const gmaxFormName = GMAX_MAP[id];
  let gmaxImage: string | null = null;
  if (gmaxFormName) {
    try {
      const gmaxRes = await fetch(`${POKEAPI_BASE}/pokemon/${gmaxFormName}`);
      if (gmaxRes.ok) {
        const gmaxData = await gmaxRes.json();
        gmaxImage =
          gmaxData.sprites?.other?.["official-artwork"]?.front_default ??
          gmaxData.sprites?.front_default ??
          null;
      }
    } catch {
      // silently skip
    }
  }
  const canGmax = !!gmaxFormName;
  const gmaxMove = gmaxFormName ? (GMAX_MOVES[gmaxFormName] ?? null) : null;

  // Parse flavor text (most recent English)
  const flavorEntry = speciesData.flavor_text_entries
    .filter((e) => e.language.name === "en")
    .pop();
  const flavorText = flavorEntry
    ? flavorEntry.flavor_text.replace(/[\n\f\r]/g, " ")
    : "";

  // Parse genus
  const genusEntry = speciesData.genera.find((g) => g.language.name === "en");
  const genus = genusEntry?.genus ?? "";

  // Parse encounters
  const encounters: EncounterLocation[] = encountersData.flatMap((enc) =>
    enc.version_details.map((vd) => ({
      locationName: formatName(enc.location_area.name),
      versionName: formatName(vd.version.name),
    }))
  );

  const image =
    pokemonData.sprites.other["official-artwork"].front_default ??
    pokemonData.sprites.front_default ??
    `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`;

  return {
    id: pokemonData.id,
    name: pokemonData.name,
    types: pokemonData.types.map(
      (t: { slot: number; type: { name: string } }) => ({
        name: t.type.name,
        slot: t.slot,
      })
    ),
    abilities: pokemonData.abilities.map(
      (a: { ability: { name: string }; is_hidden: boolean }) => ({
        name: a.ability.name,
        isHidden: a.is_hidden,
      })
    ),
    stats: pokemonData.stats.map(
      (s: { stat: { name: string }; base_stat: number }) => ({
        name: s.stat.name,
        value: s.base_stat,
      })
    ),
    height: pokemonData.height,
    weight: pokemonData.weight,
    image,
    fallbackImage:
      pokemonData.sprites.front_default ??
      `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`,
    backImage: pokemonData.sprites.back_default ?? null,
    generation: getGeneration(pokemonData.id),
    flavorText,
    genus,
    evolutionChain,
    abilityDetails,
    encounters,
    animatedSprite: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/showdown/${id}.gif`,
    shinyImage:
      pokemonData.sprites.other["official-artwork"].front_shiny ??
      pokemonData.sprites.front_shiny ??
      null,
    shinyBackImage: pokemonData.sprites.back_shiny ?? null,
    shinyAnimatedSprite: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/showdown/shiny/${id}.gif`,
    cryUrl: pokemonData.cries?.latest ?? null,
    cryLegacyUrl: pokemonData.cries?.legacy ?? null,
    megaEvolutions,
    canGmax,
    gmaxImage,
    gmaxMove,
  };
}

/**
 * Fetch full detail for a mega evolution form by its PokeAPI name
 * (e.g. "charizard-mega-x"). Returns a PokemonDetail with the mega's
 * own stats/types/abilities, plus species data (flavor text, genus,
 * evolution chain) from the base species.
 */
export async function fetchMegaDetail(name: string): Promise<PokemonDetail> {
  // Stage 1: fetch the mega form's pokemon data
  const pokemonRes = await fetch(`${POKEAPI_BASE}/pokemon/${name}`);
  if (!pokemonRes.ok) throw new Error(`Failed to fetch mega pokemon ${name}`);
  const pokemonData = await pokemonRes.json();

  // Derive base species ID from the pokemon's species URL
  const speciesUrl: string = pokemonData.species?.url;
  if (!speciesUrl) throw new Error(`No species URL for mega ${name}`);

  // Stage 2: fetch species data for flavor text, genus, evolution chain
  const speciesRes = await fetch(speciesUrl);
  if (!speciesRes.ok) throw new Error(`Failed to fetch species for mega ${name}`);
  const speciesData: PokeAPISpeciesResponse = await speciesRes.json();
  const baseSpeciesId = getSpeciesId(speciesUrl);

  // Stage 3: evolution chain + ability details (no encounters for megas)
  const [evolutionChain, abilityDetails] = await Promise.all([
    fetchEvolutionChain(speciesData.evolution_chain.url),
    fetchAbilityDetails(
      pokemonData.abilities.map(
        (a: { ability: { name: string; url: string }; is_hidden: boolean }) => ({
          name: a.ability.name,
          isHidden: a.is_hidden,
          url: a.ability.url,
        })
      )
    ),
  ]);

  // Parse flavor text (most recent English) from species
  const flavorEntry = speciesData.flavor_text_entries
    .filter((e) => e.language.name === "en")
    .pop();
  const flavorText = flavorEntry
    ? flavorEntry.flavor_text.replace(/[\n\f\r]/g, " ")
    : "";

  const genusEntry = speciesData.genera.find((g) => g.language.name === "en");
  const genus = genusEntry?.genus ?? "";

  const megaId = pokemonData.id;
  const image =
    pokemonData.sprites?.other?.["official-artwork"]?.front_default ??
    pokemonData.sprites?.front_default ??
    `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${megaId}.png`;

  return {
    id: megaId,
    name: pokemonData.name,
    types: pokemonData.types.map(
      (t: { slot: number; type: { name: string } }) => ({
        name: t.type.name,
        slot: t.slot,
      })
    ),
    abilities: pokemonData.abilities.map(
      (a: { ability: { name: string }; is_hidden: boolean }) => ({
        name: a.ability.name,
        isHidden: a.is_hidden,
      })
    ),
    stats: pokemonData.stats.map(
      (s: { stat: { name: string }; base_stat: number }) => ({
        name: s.stat.name,
        value: s.base_stat,
      })
    ),
    height: pokemonData.height,
    weight: pokemonData.weight,
    image,
    fallbackImage:
      pokemonData.sprites?.front_default ??
      `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${megaId}.png`,
    backImage: pokemonData.sprites?.back_default ?? null,
    generation: getGeneration(baseSpeciesId),
    flavorText,
    genus,
    evolutionChain,
    abilityDetails,
    encounters: [], // Mega forms don't have encounter data
    animatedSprite: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/showdown/${megaId}.gif`,
    shinyImage:
      pokemonData.sprites?.other?.["official-artwork"]?.front_shiny ??
      pokemonData.sprites?.front_shiny ??
      null,
    shinyBackImage: pokemonData.sprites?.back_shiny ?? null,
    shinyAnimatedSprite: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/showdown/shiny/${megaId}.gif`,
    cryUrl: pokemonData.cries?.latest ?? null,
    cryLegacyUrl: pokemonData.cries?.legacy ?? null,
    megaEvolutions: [], // Already on the mega page, no nested megas
    canGmax: !!GMAX_MAP[baseSpeciesId],
    gmaxImage: null, // Not fetched for mega detail pages
    gmaxMove: GMAX_MAP[baseSpeciesId] ? (GMAX_MOVES[GMAX_MAP[baseSpeciesId]] ?? null) : null,
  };
}
