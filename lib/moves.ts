// ─── Types ────────────────────────────────────────────────────────

export interface MoveSummary {
  id: number;
  name: string;
  type: string;
  power: number | null;
  accuracy: number | null;
  pp: number;
  damageClass: string;
  generation: string;
}

export interface MoveDetail extends MoveSummary {
  effectShort: string | null;
  effectFull: string | null;
  effectChance: number | null;
  flavorText: string | null;
  priority: number;
  target: string;
  learnedByPokemon: { name: string; id: number }[];
  meta: {
    ailment: string | null;
    drain: number;
    healing: number;
    minHits: number | null;
    maxHits: number | null;
    critRate: number;
    flinchChance: number;
  } | null;
}

interface PokeAPIMoveListResponse {
  count: number;
  results: { name: string; url: string }[];
}

interface PokeAPIMoveResponse {
  id: number;
  name: string;
  accuracy: number | null;
  power: number | null;
  pp: number;
  priority: number;
  type: { name: string };
  damage_class: { name: string };
  generation: { name: string };
  target: { name: string };
  effect_entries: { effect: string; short_effect: string; language: { name: string } }[];
  effect_chance: number | null;
  flavor_text_entries: { flavor_text: string; language: { name: string }; version_group: { name: string } }[];
  learned_by_pokemon: { name: string; url: string }[];
  meta: {
    ailment: { name: string } | null;
    drain: number;
    healing: number;
    min_hits: number | null;
    max_hits: number | null;
    crit_rate: number;
    flinch_chance: number;
  } | null;
}

// ─── Caches ───────────────────────────────────────────────────────

let moveNamesCache: { id: number; name: string }[] | null = null;
let movesSummaryCache: MoveSummary[] | null = null;

// ─── Helpers ──────────────────────────────────────────────────────

function extractIdFromUrl(url: string): number {
  const parts = url.replace(/\/$/, "").split("/");
  return parseInt(parts[parts.length - 1], 10);
}

export function formatMoveName(name: string): string {
  return name
    .split("-")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
}

function parseGeneration(gen: string): string {
  // "generation-iii" → "III"
  const numeral = gen.replace("generation-", "").toUpperCase();
  return numeral;
}

async function fetchMoveBasic(url: string): Promise<MoveSummary | null> {
  try {
    const res = await fetch(url);
    const data: PokeAPIMoveResponse = await res.json();
    return {
      id: data.id,
      name: data.name,
      type: data.type.name,
      power: data.power,
      accuracy: data.accuracy,
      pp: data.pp,
      damageClass: data.damage_class.name,
      generation: parseGeneration(data.generation.name),
    };
  } catch {
    return null;
  }
}

// ─── Fetch Functions ──────────────────────────────────────────────

export async function fetchMovesPage(
  offset: number,
  limit: number
): Promise<{ moves: MoveSummary[]; total: number }> {
  const res = await fetch(
    `https://pokeapi.co/api/v2/move/?offset=${offset}&limit=${limit}`
  );
  const data: PokeAPIMoveListResponse = await res.json();

  const moves = await Promise.all(
    data.results.map((entry) => fetchMoveBasic(entry.url))
  );

  return {
    moves: moves.filter((m): m is MoveSummary => m !== null),
    total: data.count,
  };
}

export async function fetchAllMoveNames(): Promise<{ id: number; name: string }[]> {
  if (moveNamesCache) return moveNamesCache;

  const res = await fetch(`https://pokeapi.co/api/v2/move/?offset=0&limit=1000`);
  const data: PokeAPIMoveListResponse = await res.json();

  moveNamesCache = data.results.map((entry) => ({
    id: extractIdFromUrl(entry.url),
    name: entry.name,
  }));

  return moveNamesCache;
}

export async function fetchMovesSummary(): Promise<MoveSummary[]> {
  if (movesSummaryCache) return movesSummaryCache;

  const names = await fetchAllMoveNames();
  const batchSize = 50;
  const results: MoveSummary[] = [];

  for (let i = 0; i < names.length; i += batchSize) {
    const batch = names.slice(i, i + batchSize);
    const batchResults = await Promise.all(
      batch.map((entry) =>
        fetchMoveBasic(`https://pokeapi.co/api/v2/move/${entry.id}`)
      )
    );
    results.push(...batchResults.filter((m): m is MoveSummary => m !== null));
  }

  movesSummaryCache = results;
  return movesSummaryCache;
}

export async function fetchMoveDetail(id: number): Promise<MoveDetail> {
  const res = await fetch(`https://pokeapi.co/api/v2/move/${id}`);
  const data: PokeAPIMoveResponse = await res.json();

  const englishEffect = data.effect_entries.find(
    (e) => e.language.name === "en"
  );
  const englishFlavor = data.flavor_text_entries
    .filter((f) => f.language.name === "en")
    .pop();

  return {
    id: data.id,
    name: data.name,
    type: data.type.name,
    power: data.power,
    accuracy: data.accuracy,
    pp: data.pp,
    damageClass: data.damage_class.name,
    generation: parseGeneration(data.generation.name),
    effectShort: englishEffect?.short_effect ?? null,
    effectFull: englishEffect?.effect ?? null,
    effectChance: data.effect_chance,
    flavorText: englishFlavor?.flavor_text.replace(/\n/g, " ") ?? null,
    priority: data.priority,
    target: data.target.name.replace(/-/g, " "),
    learnedByPokemon: data.learned_by_pokemon.map((p) => ({
      name: p.name,
      id: extractIdFromUrl(p.url),
    })),
    meta: data.meta
      ? {
          ailment: data.meta.ailment?.name ?? null,
          drain: data.meta.drain,
          healing: data.meta.healing,
          minHits: data.meta.min_hits,
          maxHits: data.meta.max_hits,
          critRate: data.meta.crit_rate,
          flinchChance: data.meta.flinch_chance,
        }
      : null,
  };
}
