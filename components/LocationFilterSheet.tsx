"use client";

import { useEffect, useState, useRef } from "react";
import { type VersionGroup } from "@/lib/locations";
import { getVersionGroupMeta, getGenerationColors, GENERATION_ORDER, GENERATION_LABELS } from "@/lib/version-groups";

interface LocationFilterSheetProps {
  isOpen: boolean;
  onClose: () => void;
  search: string;
  onSearchChange: (value: string) => void;
  selectedGame: string;
  onGameChange: (value: string) => void;
  hasEncountersOnly: boolean;
  onHasEncountersChange: (value: boolean) => void;
  onClearAll: () => void;
  versionGroups: VersionGroup[];
}

export default function LocationFilterSheet({
  isOpen,
  onClose,
  search,
  onSearchChange,
  selectedGame,
  onGameChange,
  hasEncountersOnly,
  onHasEncountersChange,
  onClearAll,
  versionGroups,
}: LocationFilterSheetProps) {
  const [isClosing, setIsClosing] = useState(false);
  const [mounted, setMounted] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      setMounted(true);
      setIsClosing(false);
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  useEffect(() => {
    if (isOpen && mounted) {
      setTimeout(() => inputRef.current?.focus(), 300);
    }
  }, [isOpen, mounted]);

  function handleClose() {
    setIsClosing(true);
    setTimeout(() => {
      setMounted(false);
      setIsClosing(false);
      onClose();
    }, 200);
  }

  if (!mounted && !isOpen) return null;

  // Group version-groups by generation
  const groupedByGen = new Map<string, VersionGroup[]>();
  for (const vg of versionGroups) {
    const list = groupedByGen.get(vg.generation) ?? [];
    list.push(vg);
    groupedByGen.set(vg.generation, list);
  }

  return (
    <div className="fixed inset-0 z-50 lg:hidden">
      {/* Backdrop */}
      <div
        className={`absolute inset-0 bg-black/50 transition-opacity duration-200 ${isClosing ? "opacity-0" : "opacity-100"}`}
        onClick={handleClose}
      />

      {/* Sheet */}
      <div
        className={`absolute bottom-0 left-0 right-0 max-h-[85vh] overflow-y-auto rounded-t-2xl bg-white p-6 shadow-xl dark:bg-gray-900 ${
          isClosing ? "animate-sheetDown" : "animate-sheetUp"
        }`}
      >
        {/* Handle */}
        <div className="mx-auto mb-4 h-1 w-10 rounded-full bg-gray-300 dark:bg-gray-600" />

        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white">Filters</h3>
          <button
            onClick={onClearAll}
            className="text-sm font-medium text-teal-600 dark:text-teal-400"
          >
            Clear all
          </button>
        </div>

        {/* Search */}
        <div className="mb-5">
          <label className="mb-1.5 block text-xs font-medium text-gray-500 dark:text-gray-400">
            Search
          </label>
          <input
            ref={inputRef}
            type="text"
            value={search}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search locations..."
            className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 placeholder-gray-400 focus:border-teal-500 focus:outline-none focus:ring-1 focus:ring-teal-500 dark:border-gray-600 dark:bg-gray-800 dark:text-white dark:placeholder-gray-500"
          />
        </div>

        {/* Game chips grouped by generation */}
        <div className="mb-5">
          <label className="mb-2 block text-xs font-medium text-gray-500 dark:text-gray-400">
            Game
          </label>
          <div className="space-y-3">
            {GENERATION_ORDER.map((gen) => {
              const groups = groupedByGen.get(gen);
              if (!groups || groups.length === 0) return null;
              return (
                <div key={gen}>
                  <p className="mb-1.5 text-[10px] font-semibold uppercase tracking-wider text-gray-400 dark:text-gray-500">
                    {GENERATION_LABELS[gen]}
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {groups.map((vg) => {
                      const meta = getVersionGroupMeta(vg.name);
                      const colors = getGenerationColors(vg.generation);
                      const isActive = selectedGame === vg.name;
                      return (
                        <button
                          key={vg.name}
                          onClick={() => onGameChange(isActive ? "" : vg.name)}
                          className={`rounded-full px-3 py-1 text-xs font-semibold transition-colors ${
                            isActive
                              ? `${colors.activeBg} ${colors.activeText} ${colors.darkActiveBg} ${colors.darkActiveText}`
                              : `${colors.bg} ${colors.text} ${colors.darkBg} ${colors.darkText}`
                          }`}
                        >
                          {meta.displayName}
                        </button>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Has encounters toggle */}
        <div className="mb-5">
          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={hasEncountersOnly}
              onChange={(e) => onHasEncountersChange(e.target.checked)}
              className="h-4 w-4 rounded border-gray-300 text-teal-600 focus:ring-teal-500 dark:border-gray-600"
            />
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Has encounters only
            </span>
          </label>
        </div>

        {/* Apply button */}
        <button
          onClick={handleClose}
          className="w-full rounded-lg bg-teal-500 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-teal-600"
        >
          Apply Filters
        </button>
      </div>
    </div>
  );
}
