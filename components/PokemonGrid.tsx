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
import {
  PAGE_SIZE,
  TOTAL_POKEMON,
  fetchMegaForms,
  fetchFilteredPokemonIds,
  fetchPokemonByIds,
} from "@/lib/pokemon";
import { getCache, setCache } from "@/lib/pokemon-cache";
import PokemonCard from "./PokemonCard";
import PokemonGridSkeleton from "./PokemonGridSkeleton";
import SearchBar from "./SearchBar";
import FilterPanel from "./FilterPanel";
import ActiveFilterChips from "./ActiveFilterChips";
import LoadMoreTrigger from "./LoadMoreTrigger";
import FilterFAB from "./FilterFAB";
import FilterSheet from "./FilterSheet";
import { MEGA_IDS, MEGA_MAP } from "@/lib/mega-ids";

/** Sort key: base Pokemon first by dex number, then megas after their base by form ID */
function pokemonSortKey(p: Pokemon): number {
  const baseId = p.basePokemonId ?? p.id;
  return baseId * 100000 + (p.isMega ? 50000 + p.id : 0);
}

/** Merge megas into an existing sorted array, maintaining sort order */
function mergeWithMegas(base: Pokemon[], megas: Pokemon[]): Pokemon[] {
  return [...base, ...megas].sort((a, b) => pokemonSortKey(a) - pokemonSortKey(b));
}

export default function PokemonGrid() {
  const cached = getCache();
  const hadCache = useRef(!!cached);

  // === Unfiltered (sequential pagination) state ===
  const [allPokemon, setAllPokemon] = useState<Pokemon[]>(
    cached?.pokemon ?? []
  );
  const [hasMore, setHasMore] = useState(cached?.hasMore ?? true);
  const [nextOffset, setNextOffset] = useState(cached?.nextOffset ?? 0);
  const [isInitialLoading, setIsInitialLoading] = useState(!cached);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [loadError, setLoadError] = useState<string | null>(null);
  const isFetchingRef = useRef(false);

  // === Filter state ===
  const [search, setSearch] = useState(cached?.search ?? "");
  const [selectedTypes, setSelectedTypes] = useState<string[]>(
    cached?.selectedTypes ?? []
  );
  const [selectedGeneration, setSelectedGeneration] = useState<string>(
    cached?.selectedGeneration ?? ""
  );
  const [hasMega, setHasMega] = useState<boolean>(cached?.hasMega ?? false);
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [, startTransition] = useTransition();

  // === Filtered (API-level) state ===
  const [filteredIds, setFilteredIds] = useState<number[] | null>(null);
  const [filteredPokemon, setFilteredPokemon] = useState<Pokemon[]>([]);
  const [filteredPage, setFilteredPage] = useState(0);
  const [isFilterLoading, setIsFilterLoading] = useState(false);
  const [isFilterPageLoading, setIsFilterPageLoading] = useState(false);
  const filterRequestId = useRef(0);

  const hasActiveFilters =
    search !== "" || selectedTypes.length > 0 || selectedGeneration !== "" || hasMega;

  // === Filter effect: resolve filtered IDs from API ===
  useEffect(() => {
    if (!hasActiveFilters) {
      setFilteredIds(null);
      setFilteredPokemon([]);
      setFilteredPage(0);
      return;
    }

    const requestId = ++filterRequestId.current;
    setIsFilterLoading(true);

    async function resolve() {
      try {
        const ids = await fetchFilteredPokemonIds({
          types: selectedTypes,
          generation: selectedGeneration,
          search,
          hasMega,
        });

        if (filterRequestId.current !== requestId) return; // stale

        // Also include mega form IDs for matching base IDs
        const megaIds: number[] = [];
        for (const id of ids) {
          const megas = MEGA_MAP[id];
          if (megas) megaIds.push(...megas);
        }
        const allIds = [...ids, ...megaIds].sort((a, b) => a - b);

        setFilteredIds(allIds);
        setFilteredPage(0);

        // Fetch first page of details
        const firstPageIds = allIds.slice(0, PAGE_SIZE);
        const pokemon = await fetchPokemonByIds(firstPageIds);

        if (filterRequestId.current !== requestId) return; // stale

        // For base Pokemon in results, fetch their mega forms too
        const megaBaseIds = pokemon
          .filter((p) => MEGA_IDS.has(p.id))
          .map((p) => p.id);
        const megaForms = await fetchMegaForms(megaBaseIds);

        if (filterRequestId.current !== requestId) return; // stale

        const merged = mergeWithMegas(pokemon, megaForms);
        setFilteredPokemon(merged);
        setFilteredPage(1);
      } catch {
        if (filterRequestId.current === requestId) {
          setFilteredIds([]);
          setFilteredPokemon([]);
        }
      } finally {
        if (filterRequestId.current === requestId) {
          setIsFilterLoading(false);
        }
      }
    }

    resolve();
  }, [search, selectedTypes, selectedGeneration, hasMega, hasActiveFilters]);

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

        // Fetch mega forms for mega-capable Pokemon in this page
        const megaBaseIds = pokemon.filter((p) => MEGA_IDS.has(p.id)).map((p) => p.id);
        const megaForms = await fetchMegaForms(megaBaseIds);
        const merged = mergeWithMegas(pokemon, megaForms);

        const newOffset = clampedResults.length;
        setAllPokemon(merged);
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
        hasMega,
      });
    }
  }, [allPokemon, nextOffset, hasMore, search, selectedTypes, selectedGeneration, hasMega]);

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
      const timer = setTimeout(() => window.scrollTo(0, targetY), 50);
      return () => clearTimeout(timer);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // === Unfiltered infinite scroll ===
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

      const megaBaseIds = newPokemon.filter((p) => MEGA_IDS.has(p.id)).map((p) => p.id);
      const megaForms = await fetchMegaForms(megaBaseIds);

      const newOffset = nextOffset + clampedResults.length;

      setAllPokemon((prev) => mergeWithMegas([...prev, ...newPokemon], megaForms));
      setNextOffset(newOffset);
      setHasMore(newOffset < TOTAL_POKEMON);
    } catch {
      setLoadError("Failed to load. Tap to retry.");
    } finally {
      setIsLoadingMore(false);
      isFetchingRef.current = false;
    }
  }, [hasMore, nextOffset]);

  // === Filtered infinite scroll ===
  const fetchNextFilteredPage = useCallback(async () => {
    if (!filteredIds || isFetchingRef.current) return;
    const startIdx = filteredPage * PAGE_SIZE;
    if (startIdx >= filteredIds.length) return;

    isFetchingRef.current = true;
    setIsFilterPageLoading(true);

    try {
      const pageIds = filteredIds.slice(startIdx, startIdx + PAGE_SIZE);
      const pokemon = await fetchPokemonByIds(pageIds);

      const megaBaseIds = pokemon.filter((p) => MEGA_IDS.has(p.id)).map((p) => p.id);
      const megaForms = await fetchMegaForms(megaBaseIds);
      const merged = mergeWithMegas(pokemon, megaForms);

      setFilteredPokemon((prev) => mergeWithMegas([...prev, ...merged], []));
      setFilteredPage((prev) => prev + 1);
    } catch {
      setLoadError("Failed to load. Tap to retry.");
    } finally {
      setIsFilterPageLoading(false);
      isFetchingRef.current = false;
    }
  }, [filteredIds, filteredPage]);

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

  const handleHasMegaToggle = useCallback(() => {
    startTransition(() => setHasMega((prev) => !prev));
  }, [startTransition]);

  const handleClearAll = useCallback(() => {
    startTransition(() => {
      setSearch("");
      setSelectedTypes([]);
      setSelectedGeneration("");
      setHasMega(false);
    });
  }, [startTransition]);

  // For unfiltered view, apply client-side filter (just in case of mega filter edge)
  const unfilteredDisplay = useMemo(() => {
    return allPokemon;
  }, [allPokemon]);

  // Determine what to display
  const isFiltered = hasActiveFilters && filteredIds !== null;
  const displayPokemon = isFiltered ? filteredPokemon : unfilteredDisplay;
  const filteredTotal = filteredIds?.length ?? 0;
  const filteredHasMore = isFiltered
    ? filteredPage * PAGE_SIZE < filteredTotal
    : false;

  // Active filter count for FAB badge
  const activeFilterCount =
    selectedTypes.length +
    (selectedGeneration ? 1 : 0) +
    (hasMega ? 1 : 0) +
    (search ? 1 : 0);

  if (isInitialLoading) {
    return <PokemonGridSkeleton />;
  }

  return (
    <div className="space-y-5">
      {/* Desktop: inline search + filters (hidden on mobile) */}
      <div className="hidden lg:block">
        <div className="space-y-5">
          <SearchBar value={search} onChange={handleSearch} />
          <FilterPanel
            selectedTypes={selectedTypes}
            onTypeToggle={handleTypeToggle}
            selectedGeneration={selectedGeneration}
            onGenerationChange={handleGenerationChange}
            hasMega={hasMega}
            onHasMegaToggle={handleHasMegaToggle}
          />
        </div>
      </div>

      {/* Mobile: FAB + bottom sheet */}
      <FilterFAB
        activeCount={activeFilterCount}
        onClick={() => setIsSheetOpen(true)}
      />
      <FilterSheet
        isOpen={isSheetOpen}
        onClose={() => setIsSheetOpen(false)}
        search={search}
        onSearchChange={handleSearch}
        selectedTypes={selectedTypes}
        onTypeToggle={handleTypeToggle}
        selectedGeneration={selectedGeneration}
        onGenerationChange={handleGenerationChange}
        hasMega={hasMega}
        onHasMegaToggle={handleHasMegaToggle}
        onClearAll={handleClearAll}
      />

      {hasActiveFilters && (
        <div className="animate-fadeIn flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <ActiveFilterChips
            search={search}
            selectedTypes={selectedTypes}
            selectedGeneration={selectedGeneration}
            hasMega={hasMega}
            onClearSearch={handleClearSearch}
            onRemoveType={handleRemoveType}
            onClearGeneration={handleClearGeneration}
            onClearMega={() => startTransition(() => setHasMega(false))}
            onClearAll={handleClearAll}
          />
          <span className="shrink-0 text-sm text-gray-500 dark:text-gray-400">
            {isFilterLoading
              ? "Searching..."
              : `Showing ${filteredPokemon.length} of ${filteredTotal}`}
          </span>
        </div>
      )}

      {/* Loading state while filter IDs are being resolved */}
      {hasActiveFilters && isFilterLoading && (
        <div className="animate-fadeIn flex items-center justify-center gap-3 py-16 text-gray-500 dark:text-gray-400">
          <svg
            className="h-6 w-6 animate-spin"
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
          <span className="text-sm font-medium">Searching Pokemon...</span>
        </div>
      )}

      {/* Empty state */}
      {hasActiveFilters && !isFilterLoading && filteredIds !== null && filteredIds.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <div className="text-6xl mb-4">:(</div>
          <h3 className="text-xl font-bold text-gray-700 dark:text-gray-300 mb-2">
            No Pokemon found
          </h3>
          <p className="text-gray-500 dark:text-gray-400 max-w-md">
            Try adjusting your search or filters to find what you&apos;re
            looking for.
          </p>
          <button
            onClick={handleClearAll}
            className="mt-4 rounded-lg bg-blue-500 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-blue-600 active:bg-blue-700"
          >
            Clear all filters
          </button>
        </div>
      ) : !isFilterLoading && displayPokemon.length > 0 ? (
        <>
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-4 lg:grid-cols-3 xl:grid-cols-4">
            {displayPokemon.map((p, i) => (
              <div
                key={`${p.id}-${p.megaName ?? ""}`}
                className={hadCache.current && !isFiltered ? "" : "animate-fadeIn"}
                style={
                  hadCache.current && !isFiltered
                    ? undefined
                    : { animationDelay: `${Math.min(i, 20) * 50}ms` }
                }
              >
                <PokemonCard pokemon={p} />
              </div>
            ))}
          </div>

          {/* Infinite scroll trigger — unfiltered mode */}
          {!hasActiveFilters && (
            <LoadMoreTrigger
              onLoadMore={fetchNextPage}
              isLoading={isLoadingMore}
              hasMore={hasMore}
              error={loadError}
              onRetry={fetchNextPage}
            />
          )}

          {/* Infinite scroll trigger — filtered mode */}
          {isFiltered && filteredHasMore && (
            <LoadMoreTrigger
              onLoadMore={fetchNextFilteredPage}
              isLoading={isFilterPageLoading}
              hasMore={filteredHasMore}
              error={loadError}
              onRetry={fetchNextFilteredPage}
            />
          )}
        </>
      ) : null}
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
