"use client";

import {
  useState,
  useTransition,
  useMemo,
  useCallback,
  useRef,
  useEffect,
} from "react";
import type { Pokemon } from "@/lib/pokemon";
import { PAGE_SIZE, TOTAL_POKEMON } from "@/lib/pokemon";
import { getCache, setCache } from "@/lib/pokemon-cache";
import PokemonCard from "./PokemonCard";
import PokemonGridSkeleton from "./PokemonGridSkeleton";
import SearchBar from "./SearchBar";
import FilterPanel from "./FilterPanel";
import ActiveFilterChips from "./ActiveFilterChips";
import LoadMoreTrigger from "./LoadMoreTrigger";

export default function PokemonGrid() {
  const cached = getCache();
  const hadCache = useRef(!!cached);

  const [allPokemon, setAllPokemon] = useState<Pokemon[]>(
    cached?.pokemon ?? []
  );
  const [hasMore, setHasMore] = useState(cached?.hasMore ?? true);
  const [nextOffset, setNextOffset] = useState(cached?.nextOffset ?? 0);
  const [isInitialLoading, setIsInitialLoading] = useState(!cached);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [loadError, setLoadError] = useState<string | null>(null);
  const isFetchingRef = useRef(false);

  const [search, setSearch] = useState(cached?.search ?? "");
  const [selectedTypes, setSelectedTypes] = useState<string[]>(
    cached?.selectedTypes ?? []
  );
  const [selectedGeneration, setSelectedGeneration] = useState<string>(
    cached?.selectedGeneration ?? ""
  );
  const [, startTransition] = useTransition();

  // Fetch first page on mount if no cache
  useEffect(() => {
    if (hadCache.current) return;

    async function loadFirstPage() {
      try {
        const res = await fetch(
          `https://pokeapi.co/api/v2/pokemon?limit=${PAGE_SIZE}&offset=0`
        );
        if (!res.ok) throw new Error("Failed to fetch list");
        const listData = await res.json();

        const clampedResults = listData.results.slice(
          0,
          Math.min(listData.results.length, TOTAL_POKEMON)
        );

        const details = await Promise.allSettled(
          clampedResults.map(async (p: { url: string }) => {
            const r = await fetch(p.url);
            if (!r.ok) throw new Error(`Failed: ${p.url}`);
            return r.json();
          })
        );

        const pokemon: Pokemon[] = details
          .filter(
            (r): r is PromiseFulfilledResult<Record<string, unknown>> =>
              r.status === "fulfilled"
          )
          .map((r) => {
            const d = r.value as {
              id: number;
              name: string;
              types: { slot: number; type: { name: string } }[];
              abilities: { ability: { name: string }; is_hidden: boolean }[];
              sprites: {
                front_default: string | null;
                other: {
                  "official-artwork": { front_default: string | null };
                };
              };
            };
            return {
              id: d.id,
              name: d.name,
              types: d.types.map((t) => ({ name: t.type.name, slot: t.slot })),
              abilities: d.abilities.map((a) => ({
                name: a.ability.name,
                isHidden: a.is_hidden,
              })),
              generation: getGeneration(d.id),
              image:
                d.sprites.other["official-artwork"].front_default ??
                d.sprites.front_default ??
                `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${d.id}.png`,
              fallbackImage:
                d.sprites.front_default ??
                `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${d.id}.png`,
            };
          })
          .sort((a, b) => a.id - b.id);

        const newOffset = clampedResults.length;
        setAllPokemon(pokemon);
        setNextOffset(newOffset);
        setHasMore(newOffset < TOTAL_POKEMON);
      } catch {
        setLoadError("Failed to load Pokemon. Please refresh.");
      } finally {
        setIsInitialLoading(false);
      }
    }

    loadFirstPage();
  }, []);

  // Sync state to cache
  useEffect(() => {
    if (allPokemon.length > 0) {
      setCache({
        pokemon: allPokemon,
        nextOffset,
        hasMore,
        search,
        selectedTypes,
        selectedGeneration,
      });
    }
  }, [allPokemon, nextOffset, hasMore, search, selectedTypes, selectedGeneration]);

  // Throttled scroll position save
  useEffect(() => {
    let ticking = false;
    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(() => {
          setCache({ scrollY: window.scrollY });
          ticking = false;
        });
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Restore scroll position from cache
  useEffect(() => {
    if (hadCache.current && cached?.scrollY) {
      const targetY = cached.scrollY;
      // Small delay to ensure DOM is laid out after navigation
      const timer = setTimeout(() => window.scrollTo(0, targetY), 50);
      return () => clearTimeout(timer);
    }
    // Only run on mount
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchNextPage = useCallback(async () => {
    if (isFetchingRef.current || !hasMore) return;
    isFetchingRef.current = true;
    setIsLoadingMore(true);
    setLoadError(null);

    try {
      const res = await fetch(
        `https://pokeapi.co/api/v2/pokemon?limit=${PAGE_SIZE}&offset=${nextOffset}`
      );
      if (!res.ok) throw new Error("Failed to fetch list");
      const listData = await res.json();

      const clampedResults = listData.results.slice(
        0,
        Math.min(listData.results.length, TOTAL_POKEMON - nextOffset)
      );

      const details = await Promise.allSettled(
        clampedResults.map(async (p: { url: string }) => {
          const r = await fetch(p.url);
          if (!r.ok) throw new Error(`Failed: ${p.url}`);
          return r.json();
        })
      );

      const newPokemon: Pokemon[] = details
        .filter(
          (r): r is PromiseFulfilledResult<Record<string, unknown>> =>
            r.status === "fulfilled"
        )
        .map((r) => {
          const d = r.value as {
            id: number;
            name: string;
            types: { slot: number; type: { name: string } }[];
            abilities: { ability: { name: string }; is_hidden: boolean }[];
            sprites: {
              front_default: string | null;
              other: { "official-artwork": { front_default: string | null } };
            };
          };
          return {
            id: d.id,
            name: d.name,
            types: d.types.map((t) => ({ name: t.type.name, slot: t.slot })),
            abilities: d.abilities.map((a) => ({
              name: a.ability.name,
              isHidden: a.is_hidden,
            })),
            generation: getGeneration(d.id),
            image:
              d.sprites.other["official-artwork"].front_default ??
              d.sprites.front_default ??
              `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${d.id}.png`,
            fallbackImage:
              d.sprites.front_default ??
              `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${d.id}.png`,
          };
        })
        .sort((a, b) => a.id - b.id);

      const newOffset = nextOffset + clampedResults.length;

      setAllPokemon((prev) => [...prev, ...newPokemon]);
      setNextOffset(newOffset);
      setHasMore(newOffset < TOTAL_POKEMON);
    } catch {
      setLoadError("Failed to load. Tap to retry.");
    } finally {
      setIsLoadingMore(false);
      isFetchingRef.current = false;
    }
  }, [hasMore, nextOffset]);

  const loadAllPokemon = useCallback(async () => {
    if (isFetchingRef.current) return;
    isFetchingRef.current = true;
    setIsLoadingMore(true);
    setLoadError(null);

    try {
      let offset = nextOffset;
      const accumulated: Pokemon[] = [];

      while (offset < TOTAL_POKEMON) {
        const limit = Math.min(PAGE_SIZE, TOTAL_POKEMON - offset);
        const res = await fetch(
          `https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`
        );
        if (!res.ok) throw new Error("Failed to fetch list");
        const listData = await res.json();

        const details = await Promise.allSettled(
          listData.results.map(async (p: { url: string }) => {
            const r = await fetch(p.url);
            if (!r.ok) throw new Error(`Failed: ${p.url}`);
            return r.json();
          })
        );

        const pagePokemon: Pokemon[] = details
          .filter(
            (r): r is PromiseFulfilledResult<Record<string, unknown>> =>
              r.status === "fulfilled"
          )
          .map((r) => {
            const d = r.value as {
              id: number;
              name: string;
              types: { slot: number; type: { name: string } }[];
              abilities: {
                ability: { name: string };
                is_hidden: boolean;
              }[];
              sprites: {
                front_default: string | null;
                other: {
                  "official-artwork": { front_default: string | null };
                };
              };
            };
            return {
              id: d.id,
              name: d.name,
              types: d.types.map((t) => ({
                name: t.type.name,
                slot: t.slot,
              })),
              abilities: d.abilities.map((a) => ({
                name: a.ability.name,
                isHidden: a.is_hidden,
              })),
              generation: getGeneration(d.id),
              image:
                d.sprites.other["official-artwork"].front_default ??
                d.sprites.front_default ??
                `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${d.id}.png`,
              fallbackImage:
                d.sprites.front_default ??
                `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${d.id}.png`,
            };
          });

        accumulated.push(...pagePokemon);
        offset += limit;
      }

      setAllPokemon((prev) =>
        [...prev, ...accumulated].sort((a, b) => a.id - b.id)
      );
      setNextOffset(TOTAL_POKEMON);
      setHasMore(false);
    } catch {
      setLoadError("Failed to load all Pokemon. Tap to retry.");
    } finally {
      setIsLoadingMore(false);
      isFetchingRef.current = false;
    }
  }, [nextOffset]);

  const handleSearch = useCallback(
    (value: string) => {
      startTransition(() => setSearch(value));
    },
    [startTransition]
  );

  const handleTypeToggle = useCallback(
    (type: string) => {
      startTransition(() =>
        setSelectedTypes((prev) =>
          prev.includes(type)
            ? prev.filter((t) => t !== type)
            : [...prev, type]
        )
      );
    },
    [startTransition]
  );

  const handleRemoveType = useCallback(
    (type: string) => {
      startTransition(() =>
        setSelectedTypes((prev) => prev.filter((t) => t !== type))
      );
    },
    [startTransition]
  );

  const handleGenerationChange = useCallback(
    (gen: string) => {
      startTransition(() => setSelectedGeneration(gen));
    },
    [startTransition]
  );

  const handleClearSearch = useCallback(() => {
    startTransition(() => setSearch(""));
  }, [startTransition]);

  const handleClearGeneration = useCallback(() => {
    startTransition(() => setSelectedGeneration(""));
  }, [startTransition]);

  const handleClearAll = useCallback(() => {
    startTransition(() => {
      setSearch("");
      setSelectedTypes([]);
      setSelectedGeneration("");
    });
  }, [startTransition]);

  const filtered = useMemo(() => {
    const term = search.toLowerCase().trim();
    return allPokemon.filter((p) => {
      if (term) {
        const matchesName = p.name.toLowerCase().includes(term);
        const matchesNumber = p.id.toString().includes(term);
        if (!matchesName && !matchesNumber) return false;
      }
      if (selectedTypes.length > 0) {
        const hasType = p.types.some((t) => selectedTypes.includes(t.name));
        if (!hasType) return false;
      }
      if (selectedGeneration && p.generation !== selectedGeneration) {
        return false;
      }
      return true;
    });
  }, [allPokemon, search, selectedTypes, selectedGeneration]);

  const hasActiveFilters =
    search !== "" || selectedTypes.length > 0 || selectedGeneration !== "";

  const allLoaded = !hasMore;

  if (isInitialLoading) {
    return <PokemonGridSkeleton />;
  }

  return (
    <div className="space-y-5">
      <SearchBar value={search} onChange={handleSearch} />

      <FilterPanel
        selectedTypes={selectedTypes}
        onTypeToggle={handleTypeToggle}
        selectedGeneration={selectedGeneration}
        onGenerationChange={handleGenerationChange}
      />

      {hasActiveFilters && (
        <div className="animate-fadeIn flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <ActiveFilterChips
            search={search}
            selectedTypes={selectedTypes}
            selectedGeneration={selectedGeneration}
            onClearSearch={handleClearSearch}
            onRemoveType={handleRemoveType}
            onClearGeneration={handleClearGeneration}
            onClearAll={handleClearAll}
          />
          <span className="shrink-0 text-sm text-gray-500 dark:text-gray-400">
            Showing {filtered.length} of {allPokemon.length} loaded
            {!allLoaded && ` (${TOTAL_POKEMON} total)`}
          </span>
        </div>
      )}

      {/* Load all button when filtering with partial data */}
      {hasActiveFilters && !allLoaded && !isLoadingMore && (
        <button
          onClick={loadAllPokemon}
          className="w-full rounded-xl border border-blue-200 bg-blue-50 px-4 py-3 text-sm font-medium text-blue-700 transition-colors hover:bg-blue-100 dark:border-blue-800 dark:bg-blue-950 dark:text-blue-300 dark:hover:bg-blue-900"
        >
          Load all Pokemon for complete results ({allPokemon.length}/
          {TOTAL_POKEMON} loaded)
        </button>
      )}

      {filtered.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <div className="text-6xl mb-4">:(</div>
          <h3 className="text-xl font-bold text-gray-700 dark:text-gray-300 mb-2">
            No Pokemon found
          </h3>
          <p className="text-gray-500 dark:text-gray-400 max-w-md">
            Try adjusting your search or filters to find what you&apos;re
            looking for.
          </p>
          {hasActiveFilters && (
            <button
              onClick={handleClearAll}
              className="mt-4 rounded-lg bg-blue-500 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-blue-600 active:bg-blue-700"
            >
              Clear all filters
            </button>
          )}
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filtered.map((p, i) => (
              <div
                key={p.id}
                className={hadCache.current ? "" : "animate-fadeIn"}
                style={
                  hadCache.current
                    ? undefined
                    : { animationDelay: `${Math.min(i, 20) * 50}ms` }
                }
              >
                <PokemonCard pokemon={p} />
              </div>
            ))}
          </div>

          {/* Infinite scroll trigger — only when not filtering */}
          {!hasActiveFilters && (
            <LoadMoreTrigger
              onLoadMore={fetchNextPage}
              isLoading={isLoadingMore}
              hasMore={hasMore}
              error={loadError}
              onRetry={fetchNextPage}
            />
          )}

          {/* Show loading for "load all" */}
          {hasActiveFilters && isLoadingMore && (
            <div className="animate-fadeIn flex items-center justify-center gap-3 py-8 text-gray-500 dark:text-gray-400">
              <svg
                className="h-5 w-5 animate-spin"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                />
              </svg>
              <span className="text-sm font-medium">
                Loading all Pokemon...
              </span>
            </div>
          )}
        </>
      )}
    </div>
  );
}

// Inline generation lookup for client-side use
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
