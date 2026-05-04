"use client";

import { TYPE_COLORS } from "@/lib/type-colors";

interface ActiveFilterChipsProps {
  search: string;
  selectedTypes: string[];
  selectedGeneration: string;
  hasMega: boolean;
  onClearSearch: () => void;
  onRemoveType: (type: string) => void;
  onClearGeneration: () => void;
  onClearMega: () => void;
  onClearAll: () => void;
}

export default function ActiveFilterChips({
  search,
  selectedTypes,
  selectedGeneration,
  hasMega,
  onClearSearch,
  onRemoveType,
  onClearGeneration,
  onClearMega,
  onClearAll,
}: ActiveFilterChipsProps) {
  const hasFilters =
    search !== "" || selectedTypes.length > 0 || selectedGeneration !== "" || hasMega;

  if (!hasFilters) return null;

  return (
    <div className="flex flex-wrap items-center gap-2">
      {/* Search chip */}
      {search && (
        <Chip label={`"${search}"`} onRemove={onClearSearch} />
      )}

      {/* Type chips */}
      {selectedTypes.map((type) => {
        const colors = TYPE_COLORS[type];
        return (
          <Chip
            key={type}
            label={type}
            className={`${colors.bg} ${colors.text} capitalize`}
            onRemove={() => onRemoveType(type)}
          />
        );
      })}

      {/* Generation chip */}
      {selectedGeneration && (
        <Chip label={selectedGeneration} onRemove={onClearGeneration} />
      )}

      {/* Mega chip */}
      {hasMega && (
        <Chip
          label="✦ Has Mega"
          className="bg-purple-100 text-purple-800 dark:bg-purple-900/40 dark:text-purple-300"
          onRemove={onClearMega}
        />
      )}

      {/* Clear all button */}
      <button
        onClick={onClearAll}
        className="rounded-lg bg-gray-200 px-3 py-1 text-xs font-semibold text-gray-700 transition-colors hover:bg-red-100 hover:text-red-700 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-red-900/30 dark:hover:text-red-400"
      >
        Clear all
      </button>
    </div>
  );
}

function Chip({
  label,
  onRemove,
  className = "",
}: {
  label: string;
  onRemove: () => void;
  className?: string;
}) {
  const defaultStyle = className
    ? className
    : "bg-blue-100 text-blue-800 dark:bg-blue-900/40 dark:text-blue-300";

  return (
    <span
      className={`animate-fadeIn inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-semibold ${defaultStyle}`}
    >
      {label}
      <button
        onClick={onRemove}
        className="ml-0.5 inline-flex h-4 w-4 items-center justify-center rounded-full transition-colors hover:bg-black/10 dark:hover:bg-white/10"
        aria-label={`Remove ${label} filter`}
      >
        <svg className="h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </button>
    </span>
  );
}
