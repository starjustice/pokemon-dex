"use client";

import { useState, useEffect, useRef, useTransition, useCallback } from "react";
import { type MoveSummary, fetchMovesPage, fetchMovesSummary } from "@/lib/moves";
import { DAMAGE_CLASS_CONFIG, DAMAGE_CLASS_NAMES } from "@/lib/damage-class";
import { TYPE_COLORS } from "@/lib/type-colors";
import { ALL_TYPES } from "@/lib/pokemon";
import SkillCard from "./SkillCard";
import SkillFilterFAB from "./SkillFilterFAB";
import SkillFilterSheet from "./SkillFilterSheet";

const PAGE_SIZE = 40;
const GENERATIONS = ["I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX"];

export default function SkillGrid() {
  const [moves, setMoves] = useState<MoveSummary[]>([]);
  const [total, setTotal] = useState(0);
  const [offset, setOffset] = useState(0);
  const [loading, setLoading] = useState(true);
  const [hasMore, setHasMore] = useState(true);
  const [, startTransition] = useTransition();
  const loaderRef = useRef<HTMLDivElement>(null);

  // Filters
  const [search, setSearch] = useState("");
  const [damageClass, setDamageClass] = useState("");
  const [selectedType, setSelectedType] = useState("");
  const [generation, setGeneration] = useState("");
  const [sort, setSort] = useState("name");

  // Full data for filtering
  const [allMoves, setAllMoves] = useState<MoveSummary[] | null>(null);
  const [filteredMoves, setFilteredMoves] = useState<MoveSummary[]>([]);
  const [filteredLoading, setFilteredLoading] = useState(false);
  const [isSheetOpen, setIsSheetOpen] = useState(false);

  const isFiltered = search !== "" || damageClass !== "" || selectedType !== "" || generation !== "";
  const activeFilterCount = (search ? 1 : 0) + (damageClass ? 1 : 0) + (selectedType ? 1 : 0) + (generation ? 1 : 0);

  // Initial load
  useEffect(() => {
    setLoading(true);
    fetchMovesPage(0, PAGE_SIZE).then(({ moves: fetched, total: t }) => {
      setMoves(fetched);
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
          fetchMovesPage(offset, PAGE_SIZE).then(({ moves: fetched, total: t }) => {
            startTransition(() => {
              setMoves((prev) => [...prev, ...fetched]);
              setTotal(t);
              setOffset((prev) => prev + PAGE_SIZE);
              setHasMore(offset + PAGE_SIZE < t);
              setLoading(false);
            });
          });
        }
      },
      { threshold: 0.1 }
    );
    if (loaderRef.current) observer.observe(loaderRef.current);
    return () => observer.disconnect();
  }, [offset, hasMore, loading, isFiltered]);

  // Filter logic
  const applyFilters = useCallback(async () => {
    if (!isFiltered && sort === "name") {
      setFilteredMoves([]);
      return;
    }

    setFilteredLoading(true);

    let data = allMoves;
    if (!data) {
      data = await fetchMovesSummary();
      setAllMoves(data);
    }

    let result = [...data];

    if (search) {
      const q = search.toLowerCase();
      result = result.filter((m) => m.name.includes(q));
    }
    if (damageClass) {
      result = result.filter((m) => m.damageClass === damageClass);
    }
    if (selectedType) {
      result = result.filter((m) => m.type === selectedType);
    }
    if (generation) {
      result = result.filter((m) => m.generation === generation);
    }

    // Sort
    if (sort === "power") {
      result.sort((a, b) => (b.power ?? -1) - (a.power ?? -1));
    } else if (sort === "accuracy") {
      result.sort((a, b) => (b.accuracy ?? -1) - (a.accuracy ?? -1));
    } else {
      result.sort((a, b) => a.name.localeCompare(b.name));
    }

    setFilteredMoves(result);
    setFilteredLoading(false);
  }, [search, damageClass, selectedType, generation, sort, allMoves, isFiltered]);

  useEffect(() => {
    if (!isFiltered && sort === "name") {
      setFilteredMoves([]);
      return;
    }
    const timer = setTimeout(applyFilters, 300);
    return () => clearTimeout(timer);
  }, [search, damageClass, selectedType, generation, sort, isFiltered, applyFilters]);

  const handleClearAll = () => {
    setSearch("");
    setDamageClass("");
    setSelectedType("");
    setGeneration("");
    setSort("name");
  };

  const useFiltered = isFiltered || sort !== "name";
  const displayMoves = useFiltered ? filteredMoves : moves;
  const isLoading = useFiltered ? filteredLoading : loading;

  return (
    <div>
      {/* Desktop Inline Filters */}
      <div className="mb-6 hidden space-y-4 lg:block">
        <input
          type="text"
          placeholder="Search moves..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm text-gray-900 placeholder-gray-400 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-800 dark:text-white dark:placeholder-gray-500"
        />

        {/* Damage Class Pills */}
        <div className="flex items-center gap-2">
          <span className="text-xs font-medium text-gray-500 dark:text-gray-400">Class:</span>
          {DAMAGE_CLASS_NAMES.map((cls) => {
            const config = DAMAGE_CLASS_CONFIG[cls];
            const isActive = damageClass === cls;
            return (
              <button
                key={cls}
                onClick={() => setDamageClass(isActive ? "" : cls)}
                className={`flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium transition-all ${
                  isActive
                    ? `${config.activeBg} ${config.activeText} ${config.darkActiveBg} ${config.darkActiveText} shadow-sm`
                    : `${config.bg} ${config.text} ${config.darkBg} ${config.darkText} hover:opacity-80`
                }`}
              >
                <span>{config.icon}</span>
                <span>{config.label}</span>
              </button>
            );
          })}
        </div>

        {/* Type Chips */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1">
          <span className="shrink-0 text-xs font-medium text-gray-500 dark:text-gray-400">Type:</span>
          {ALL_TYPES.map((type) => {
            const colors = TYPE_COLORS[type];
            const isActive = selectedType === type;
            return (
              <button
                key={type}
                onClick={() => setSelectedType(isActive ? "" : type)}
                className={`shrink-0 rounded-full px-2.5 py-1 text-xs font-medium capitalize transition-all ${
                  isActive
                    ? `${colors.bg} ${colors.text} ring-2 ring-offset-1 ring-gray-400 dark:ring-offset-gray-900`
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
                }`}
              >
                {type}
              </button>
            );
          })}
        </div>

        {/* Generation + Sort */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-xs font-medium text-gray-500 dark:text-gray-400">Gen:</span>
            {GENERATIONS.map((gen) => {
              const isActive = generation === gen;
              return (
                <button
                  key={gen}
                  onClick={() => setGeneration(isActive ? "" : gen)}
                  className={`rounded-full px-2.5 py-1 text-xs font-medium transition-all ${
                    isActive
                      ? "bg-gray-800 text-white dark:bg-white dark:text-gray-900"
                      : "bg-gray-100 text-gray-600 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300"
                  }`}
                >
                  {gen}
                </button>
              );
            })}
          </div>

          <select
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            className="rounded-lg border border-gray-300 bg-white px-3 py-1.5 text-xs dark:border-gray-600 dark:bg-gray-800 dark:text-white"
          >
            <option value="name">Name A-Z</option>
            <option value="power">Power ↓</option>
            <option value="accuracy">Accuracy ↓</option>
          </select>
        </div>

        {/* Clear */}
        {(isFiltered || sort !== "name") && (
          <button
            onClick={handleClearAll}
            className="text-sm font-medium text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
          >
            Clear all filters
          </button>
        )}
      </div>

      {/* Grid */}
      {displayMoves.length > 0 ? (
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {displayMoves.map((move) => (
            <SkillCard key={move.id} move={move} />
          ))}
        </div>
      ) : !isLoading ? (
        <div className="py-16 text-center">
          <p className="text-lg font-medium text-gray-500 dark:text-gray-400">No moves found</p>
          <p className="mt-1 text-sm text-gray-400 dark:text-gray-500">Try a different search or filter</p>
        </div>
      ) : null}

      {/* Loading */}
      {isLoading && (
        <div className="flex justify-center py-8">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-gray-200 border-t-indigo-500" />
        </div>
      )}

      {!useFiltered && hasMore && !loading && (
        <div ref={loaderRef} className="h-10" />
      )}

      {!useFiltered && !hasMore && moves.length > 0 && (
        <p className="mt-6 text-center text-sm text-gray-400 dark:text-gray-500">
          Showing all {total} moves
        </p>
      )}

      {/* Mobile FAB + Sheet */}
      <SkillFilterFAB activeCount={activeFilterCount} onClick={() => setIsSheetOpen(true)} />
      <SkillFilterSheet
        isOpen={isSheetOpen}
        onClose={() => setIsSheetOpen(false)}
        search={search}
        onSearchChange={setSearch}
        damageClass={damageClass}
        onDamageClassChange={setDamageClass}
        selectedType={selectedType}
        onTypeChange={setSelectedType}
        generation={generation}
        onGenerationChange={setGeneration}
        sort={sort}
        onSortChange={setSort}
        onClearAll={handleClearAll}
      />
    </div>
  );
}
