import { getCategoryGroup } from "./item-categories";

// ─── Types ────────────────────────────────────────────────────────

export interface ItemBasic {
  id: number;
  name: string;
  sprite: string | null;
  category: string;
  categoryGroup: string;
  cost: number;
}

export interface ItemDetail {
  id: number;
  name: string;
  sprite: string | null;
  category: string;
  categoryGroup: string;
  cost: number;
  effectShort: string | null;
  effectFull: string | null;
  flavorText: string | null;
  attributes: string[];
  heldByPokemon: { name: string; id: number }[];
  flingPower: number | null;
}

interface PokeAPIItemListResponse {
  count: number;
  results: { name: string; url: string }[];
}

interface PokeAPIItemResponse {
  id: number;
  name: string;
  cost: number;
  fling_power: number | null;
  sprites: { default: string | null };
  category: { name: string; url: string };
  effect_entries: { effect: string; short_effect: string; language: { name: string } }[];
  flavor_text_entries: { text: string; language: { name: string }; version_group: { name: string } }[];
  attributes: { name: string }[];
  held_by_pokemon: { pokemon: { name: string; url: string } }[];
}

// ─── Caches ───────────────────────────────────────────────────────

let itemNamesCache: { id: number; name: string }[] | null = null;
let categoriesCache: string[] | null = null;

// ─── Helpers ──────────────────────────────────────────────────────

function extractIdFromUrl(url: string): number {
  const parts = url.replace(/\/$/, "").split("/");
  return parseInt(parts[parts.length - 1], 10);
}

export function formatItemName(name: string): string {
  return name
    .split("-")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
}

// ─── Fetch Functions ──────────────────────────────────────────────

export async function fetchItemPage(
  offset: number,
  limit: number
): Promise<{ items: ItemBasic[]; total: number }> {
  const res = await fetch(
    `https://pokeapi.co/api/v2/item/?offset=${offset}&limit=${limit}`
  );
  const data: PokeAPIItemListResponse = await res.json();

  const items = await Promise.all(
    data.results.map(async (entry) => {
      const id = extractIdFromUrl(entry.url);
      const itemRes = await fetch(entry.url);
      const item: PokeAPIItemResponse = await itemRes.json();
      return {
        id: item.id,
        name: item.name,
        sprite: item.sprites.default,
        category: item.category.name,
        categoryGroup: getCategoryGroup(item.category.name),
        cost: item.cost,
      };
    })
  );

  return { items, total: data.count };
}

export async function fetchItemDetail(id: number): Promise<ItemDetail> {
  const res = await fetch(`https://pokeapi.co/api/v2/item/${id}`);
  const item: PokeAPIItemResponse = await res.json();

  const englishEffect = item.effect_entries.find(
    (e) => e.language.name === "en"
  );
  const englishFlavor = item.flavor_text_entries
    .filter((f) => f.language.name === "en")
    .pop(); // latest version group

  return {
    id: item.id,
    name: item.name,
    sprite: item.sprites.default,
    category: item.category.name,
    categoryGroup: getCategoryGroup(item.category.name),
    cost: item.cost,
    effectShort: englishEffect?.short_effect ?? null,
    effectFull: englishEffect?.effect ?? null,
    flavorText: englishFlavor?.text.replace(/\n/g, " ") ?? null,
    attributes: item.attributes.map((a) => a.name),
    heldByPokemon: item.held_by_pokemon.map((h) => ({
      name: h.pokemon.name,
      id: extractIdFromUrl(h.pokemon.url),
    })),
    flingPower: item.fling_power,
  };
}

export async function fetchAllItemNames(): Promise<
  { id: number; name: string }[]
> {
  if (itemNamesCache) return itemNamesCache;

  const res = await fetch(
    `https://pokeapi.co/api/v2/item/?offset=0&limit=2200`
  );
  const data: PokeAPIItemListResponse = await res.json();

  itemNamesCache = data.results.map((entry) => ({
    id: extractIdFromUrl(entry.url),
    name: entry.name,
  }));

  return itemNamesCache;
}

export async function fetchItemCategories(): Promise<string[]> {
  if (categoriesCache) return categoriesCache;

  const res = await fetch(
    `https://pokeapi.co/api/v2/item-category/?offset=0&limit=100`
  );
  const data: { results: { name: string }[] } = await res.json();

  categoriesCache = data.results.map((c) => c.name);
  return categoriesCache;
}
