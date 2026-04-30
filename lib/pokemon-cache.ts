import type { Pokemon } from "@/lib/pokemon";

interface PokemonListCache {
  pokemon: Pokemon[];
  nextOffset: number;
  hasMore: boolean;
  scrollY: number;
  search: string;
  selectedTypes: string[];
  selectedGeneration: string;
}

let cache: PokemonListCache | null = null;

export function getCache(): PokemonListCache | null {
  return cache;
}

export function setCache(partial: Partial<PokemonListCache>): void {
  if (cache) {
    cache = { ...cache, ...partial };
  } else {
    cache = {
      pokemon: [],
      nextOffset: 0,
      hasMore: true,
      scrollY: 0,
      search: "",
      selectedTypes: [],
      selectedGeneration: "",
      ...partial,
    };
  }
}

export function clearCache(): void {
  cache = null;
}
