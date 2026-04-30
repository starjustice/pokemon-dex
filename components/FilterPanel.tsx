"use client";

import { useState } from "react";
import { ALL_TYPES, ALL_GENERATIONS } from "@/lib/pokemon";
import { TYPE_COLORS } from "@/lib/type-colors";

export default function FilterPanel({
  selectedTypes,
  onTypeToggle,
  selectedGeneration,
  onGenerationChange,
}: {
  selectedTypes: string[];
  onTypeToggle: (type: string) => void;
  selectedGeneration: string;
  onGenerationChange: (gen: string) => void;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const activeCount = selectedTypes.length + (selectedGeneration ? 1 : 0);

  return (
    <div className="space-y-3">
      {/* Mobile toggle button — hidden on lg+ */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm font-medium text-gray-700 shadow-sm transition-colors hover:bg-gray-50 lg:hidden dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700"
      >
        <svg
          className="h-4 w-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"
          />
        </svg>
        Filters
        {activeCount > 0 && (
          <span className="flex h-5 w-5 items-center justify-center rounded-full bg-blue-500 text-xs font-bold text-white">
            {activeCount}
          </span>
        )}
        <svg
          className={`ml-auto h-4 w-4 transition-transform ${isOpen ? "rotate-180" : ""}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>

      {/* Filter content — collapsible on mobile, always visible on lg+ */}
      <div
        className={`space-y-4 ${isOpen ? "block" : "hidden"} lg:block`}
      >
        {/* Type filters */}
        <div className="space-y-2">
          <label className="text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
            Filter by Type
          </label>
          <div className="flex flex-wrap gap-2">
            {ALL_TYPES.map((type) => {
              const active = selectedTypes.includes(type);
              const colors = TYPE_COLORS[type];
              return (
                <button
                  key={type}
                  onClick={() => onTypeToggle(type)}
                  className={`rounded-full px-3 py-1.5 text-xs font-semibold capitalize transition-all duration-200 ${
                    active
                      ? `${colors.bg} ${colors.text} ring-2 ring-offset-2 ring-gray-400 dark:ring-offset-gray-900`
                      : "bg-gray-100 text-gray-600 hover:bg-gray-200 hover:text-gray-800 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700 dark:hover:text-gray-100"
                  }`}
                >
                  {type}
                </button>
              );
            })}
          </div>
        </div>

        {/* Generation filter */}
        <div className="flex items-center gap-3">
          <label className="shrink-0 text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
            Generation
          </label>
          <select
            value={selectedGeneration}
            onChange={(e) => onGenerationChange(e.target.value)}
            className="appearance-none rounded-xl border border-gray-200 bg-white py-2.5 pl-3 pr-8 text-sm text-gray-700 shadow-sm transition-colors focus:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-100 sm:w-auto dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200 dark:focus:border-blue-500 dark:focus:ring-blue-900"
            style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%236b7280'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'/%3E%3C/svg%3E")`, backgroundRepeat: "no-repeat", backgroundPosition: "right 0.5rem center", backgroundSize: "1.25rem" }}
          >
            <option value="">All Generations</option>
            {ALL_GENERATIONS.map((gen) => (
              <option key={gen} value={gen}>
                {gen}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
}
