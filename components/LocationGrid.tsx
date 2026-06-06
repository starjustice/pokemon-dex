"use client";

import { useState, useEffect, useRef, useTransition, useCallback } from "react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import {
  type LocationBasic,
  type VersionGroup,
  fetchLocationPage,
  fetchAllLocationNames,
  fetchRegionMap,
  fetchVersionGroups,
  getLocationIdsForGame,
} from "@/lib/locations";
import {
  getVersionGroupMeta,
  getGenerationColors,
  GENERATION_ORDER,
  GENERATION_LABELS,
} from "@/lib/version-groups";
import LocationCard from "./LocationCard";
import LocationFilterFAB from "./LocationFilterFAB";
import LocationFilterSheet from "./LocationFilterSheet";

const PAGE_SIZE = 40;

export default function LocationGrid() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const [locations, setLocations] = useState<LocationBasic[]>([]);
  const [total, setTotal] = useState(0);
  const [offset, setOffset] = useState(0);
  const [loading, setLoading] = useState(true);
  const [hasMore, setHasMore] = useState(true);
  const [, startTransition] = useTransition();
  const loaderRef = useRef<HTMLDivElement>(null);

  // Filters
  const [search, setSearch] = useState("");
  const [selectedGame, setSelectedGame] = useState("");
  const [hasEncountersOnly, setHasEncountersOnly] = useState(false);

  // Version-groups data
  const [versionGroups, setVersionGroups] = useState<VersionGroup[]>([]);

  // Filtered state
  const [filteredLocations, setFilteredLocations] = useState<LocationBasic[]>([]);
  const [filteredLoading, setFilteredLoading] = useState(false);
  const [isSheetOpen, setIsSheetOpen] = useState(false);

  const isFiltered = search !== "" || selectedGame !== "" || hasEncountersOnly;
  const activeFilterCount = (search ? 1 : 0) + (selectedGame ? 1 : 0) + (hasEncountersOnly ? 1 : 0);

  // Read game from URL on mount + load version groups
  useEffect(() => {
    fetchVersionGroups().then((vgs) => {
      setVersionGroups(vgs);
      const gameParam = searchParams.get("game");
      if (gameParam && vgs.some((v) => v.name === gameParam)) {
        setSelectedGame(gameParam);
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Sync selectedGame → URL
  useEffect(() => {
    const params = new URLSearchParams(searchParams.toString());
    if (selectedGame) {
      params.set("game", selectedGame);
    } else {
      params.delete("game");
    }
    const newUrl = params.toString() ? `${pathname}?${params.toString()}` : pathname;
    router.replace(newUrl, { scroll: false });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedGame]);

  // Initial load
  useEffect(() => {
    setLoading(true);
    fetchLocationPage(0, PAGE_SIZE).then(({ locations: fetched, total: t }) => {
      setLocations(fetched);
      setTotal(t);
      setOffset(PAGE_SIZE);
      setHasMore(PAGE_SIZE < t);
      setLoading(false);
    });
  }, []);

  // Infinite scroll (unfiltered mode)
  useEffect(() => {
    if (isFiltered) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore && !loading) {
          setLoading(true);
          fetchLocationPage(offset, PAGE_SIZE).then(({ locations: fetched, total: t }) => {
            startTransition(() => {
              setLocations((prev) => [...prev, ...fetched]);
              setOffset((prev) => prev + PAGE_SIZE);
              setHasMore(offset + PAGE_SIZE < t);
              setLoading(false);
            });
          });
        }
      },
      { rootMargin: "200px" }
    );

    const el = loaderRef.current;
    if (el) observer.observe(el);
    return () => { if (el) observer.unobserve(el); };
  }, [offset, hasMore, loading, isFiltered, startTransition]);

  // Filter logic
  const applyFilters = useCallback(async () => {
    if (!isFiltered) return;
    setFilteredLoading(true);

    try {
      const [allNames, regionMap] = await Promise.all([
        fetchAllLocationNames(),
        fetchRegionMap(),
      ]);

      let filtered = allNames;

      // Search filter
      if (search) {
        const q = search.toLowerCase();
        filtered = filtered.filter((l) => l.name.includes(q));
      }

      // Game filter — intersect with location IDs for the game
      if (selectedGame) {
        const gameIds = await getLocationIdsForGame(selectedGame);
        filtered = filtered.filter((l) => gameIds.has(l.id));
      }

      // Now fetch details for filtered locations (limit to first 100 for performance)
      const toFetch = filtered.slice(0, 100);
      const details: LocationBasic[] = await Promise.all(
        toFetch.map(async (l) => {
          const res = await fetch(`https://pokeapi.co/api/v2/location/${l.id}/`);
          const data = await res.json();
          return {
            id: data.id,
            name: data.name,
            region: data.region?.name ?? regionMap.get(data.id) ?? "unknown",
            areaCount: data.areas?.length ?? 0,
          };
        })
      );

      // Has encounters filter
      const finalFiltered = hasEncountersOnly
        ? details.filter((l) => l.areaCount > 0)
        : details;

      setFilteredLocations(finalFiltered);
    } catch (err) {
      console.error("Filter error:", err);
      setFilteredLocations([]);
    } finally {
      setFilteredLoading(false);
    }
  }, [search, selectedGame, hasEncountersOnly, isFiltered]);

  useEffect(() => {
    if (isFiltered) {
      const timer = setTimeout(applyFilters, 300);
      return () => clearTimeout(timer);
    }
  }, [isFiltered, applyFilters]);

  function clearAllFilters() {
    setSearch("");
    setSelectedGame("");
    setHasEncountersOnly(false);
  }

  const displayLocations = isFiltered ? filteredLocations : locations;
  const showLoading = isFiltered ? filteredLoading : loading;

  // Selected game info for disclaimer
  const selectedGameMeta = selectedGame ? getVersionGroupMeta(selectedGame) : null;
  const selectedGameRegions = selectedGame
    ? versionGroups.find((v) => v.name === selectedGame)?.regions ?? []
    : [];

  // Group version-groups by generation for desktop chips
  const groupedByGen = new Map<string, VersionGroup[]>();
  for (const vg of versionGroups) {
    const list = groupedByGen.get(vg.generation) ?? [];
    list.push(vg);
    groupedByGen.set(vg.generation, list);
  }

  return (
    <>
      {/* Desktop inline filters */}
      <div className="mb-6 hidden lg:block">
        <div className="space-y-4">
          {/* Top row: search + has encounters + clear */}
          <div className="flex flex-wrap items-center gap-3">
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search locations..."
              className="w-64 rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 placeholder-gray-400 focus:border-teal-500 focus:outline-none focus:ring-1 focus:ring-teal-500 dark:border-gray-600 dark:bg-gray-800 dark:text-white dark:placeholder-gray-500"
            />

            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={hasEncountersOnly}
                onChange={(e) => setHasEncountersOnly(e.target.checked)}
                className="h-4 w-4 rounded border-gray-300 text-teal-600 focus:ring-teal-500 dark:border-gray-600"
              />
              <span className="text-xs font-medium text-gray-600 dark:text-gray-400">
                Has encounters
              </span>
            </label>

            {isFiltered && (
              <button
                onClick={clearAllFilters}
                className="rounded-lg px-3 py-1.5 text-xs font-medium text-gray-500 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800"
              >
                Clear all
              </button>
            )}
          </div>

          {/* Game chips grouped by generation */}
          {versionGroups.length > 0 && (
            <div>
              <p className="mb-2 text-xs font-medium text-gray-500 dark:text-gray-400">
                Filter by game
              </p>
              <div className="space-y-2">
                {GENERATION_ORDER.map((gen) => {
                  const groups = groupedByGen.get(gen);
                  if (!groups || groups.length === 0) return null;
                  return (
                    <div key={gen} className="flex flex-wrap items-center gap-1.5">
                      <span className="mr-1 min-w-[5rem] text-[10px] font-semibold uppercase tracking-wider text-gray-400 dark:text-gray-500">
                        {GENERATION_LABELS[gen]}
                      </span>
                      {groups.map((vg) => {
                        const meta = getVersionGroupMeta(vg.name);
                        const colors = getGenerationColors(vg.generation);
                        const isActive = selectedGame === vg.name;
                        return (
                          <button
                            key={vg.name}
                            onClick={() => setSelectedGame(isActive ? "" : vg.name)}
                            className={`rounded-full px-2.5 py-1 text-xs font-semibold transition-colors ${
                              isActive
                                ? `${colors.activeBg} ${colors.activeText} ${colors.darkActiveBg} ${colors.darkActiveText}`
                                : `${colors.bg} ${colors.text} ${colors.darkBg} ${colors.darkText} hover:opacity-80`
                            }`}
                          >
                            {meta.displayName}
                          </button>
                        );
                      })}
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Disclaimer when game filter active */}
      {selectedGameMeta && selectedGameRegions.length > 0 && (
        <p className="mb-4 text-xs italic text-gray-500 dark:text-gray-400">
          Showing all locations in {selectedGameRegions.map((r) => r.charAt(0).toUpperCase() + r.slice(1)).join(", ")}.
          {" "}Some locations may be exclusive to specific games within this generation.
        </p>
      )}

      {/* Results count */}
      {!showLoading && (
        <p className="mb-4 text-xs text-gray-500 dark:text-gray-400">
          {isFiltered
            ? `${displayLocations.length} location${displayLocations.length !== 1 ? "s" : ""} found`
            : `${locations.length} of ${total} locations`}
        </p>
      )}

      {/* Grid */}
      {showLoading && displayLocations.length === 0 ? (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 12 }).map((_, i) => (
            <div
              key={i}
              className="h-24 animate-pulse rounded-xl border border-gray-200 bg-gray-100 dark:border-gray-700 dark:bg-gray-800"
            />
          ))}
        </div>
      ) : displayLocations.length === 0 ? (
        <div className="py-16 text-center">
          <p className="text-gray-500 dark:text-gray-400">No locations found</p>
          {isFiltered && (
            <button
              onClick={clearAllFilters}
              className="mt-2 text-sm font-medium text-teal-600 hover:text-teal-700 dark:text-teal-400"
            >
              Clear filters
            </button>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {displayLocations.map((loc) => (
            <LocationCard key={loc.id} location={loc} />
          ))}
        </div>
      )}

      {/* Infinite scroll trigger */}
      {!isFiltered && hasMore && (
        <div ref={loaderRef} className="flex justify-center py-8">
          {loading && (
            <div className="h-6 w-6 animate-spin rounded-full border-2 border-gray-300 border-t-teal-500" />
          )}
        </div>
      )}

      {/* Mobile FAB + Sheet */}
      <LocationFilterFAB activeCount={activeFilterCount} onClick={() => setIsSheetOpen(true)} />
      <LocationFilterSheet
        isOpen={isSheetOpen}
        onClose={() => setIsSheetOpen(false)}
        search={search}
        onSearchChange={setSearch}
        selectedGame={selectedGame}
        onGameChange={setSelectedGame}
        hasEncountersOnly={hasEncountersOnly}
        onHasEncountersChange={setHasEncountersOnly}
        onClearAll={clearAllFilters}
        versionGroups={versionGroups}
      />
    </>
  );
}
