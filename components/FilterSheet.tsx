"use client";

import { useEffect, useState, useRef } from "react";
import { ALL_TYPES, ALL_GENERATIONS } from "@/lib/pokemon";
import { TYPE_COLORS } from "@/lib/type-colors";

interface FilterSheetProps {
  isOpen: boolean;
  onClose: () => void;
  search: string;
  onSearchChange: (value: string) => void;
  selectedTypes: string[];
  onTypeToggle: (type: string) => void;
  selectedGeneration: string;
  onGenerationChange: (gen: string) => void;
  hasMega: boolean;
  onHasMegaToggle: () => void;
  onClearAll: () => void;
}

export default function FilterSheet({
  isOpen,
  onClose,
  search,
  onSearchChange,
  selectedTypes,
  onTypeToggle,
  selectedGeneration,
  onGenerationChange,
  hasMega,
  onHasMegaToggle,
  onClearAll,
}: FilterSheetProps) {
  const [isClosing, setIsClosing] = useState(false);
  const [mounted, setMounted] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  // Body scroll lock
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      setMounted(true);
      setIsClosing(false);
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  // Focus search on open
  useEffect(() => {
    if (isOpen && mounted) {
      setTimeout(() => inputRef.current?.focus(), 300);
    }
  }, [isOpen, mounted]);

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      setMounted(false);
      setIsClosing(false);
      onClose();
    }, 200);
  };

  if (!isOpen && !mounted) return null;

  const activeCount =
    selectedTypes.length +
    (selectedGeneration ? 1 : 0) +
    (hasMega ? 1 : 0) +
    (search ? 1 : 0);

  return (
    <div className="fixed inset-0 z-50 lg:hidden">
      {/* Backdrop */}
      <div
        className={`absolute inset-0 bg-black/50 transition-opacity duration-300 ${
          isClosing ? "opacity-0" : "opacity-100"
        }`}
        onClick={handleClose}
      />

      {/* Sheet */}
      <div
        className={`absolute bottom-0 left-0 right-0 max-h-[85vh] overflow-y-auto rounded-t-2xl bg-white shadow-2xl dark:bg-gray-900 ${
          isClosing ? "animate-sheetDown" : "animate-sheetUp"
        }`}
      >
        {/* Handle */}
        <div className="sticky top-0 z-10 flex justify-center bg-white pt-3 pb-2 dark:bg-gray-900">
          <div className="h-1.5 w-12 rounded-full bg-gray-300 dark:bg-gray-600" />
        </div>

        <div className="space-y-5 px-5 pb-8">
          {/* Header */}
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-gray-900 dark:text-gray-100">
              Filters
              {activeCount > 0 && (
                <span className="ml-2 text-sm font-normal text-gray-500">
                  ({activeCount} active)
                </span>
              )}
            </h2>
            <button
              onClick={handleClose}
              className="rounded-lg p-2 text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800"
            >
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Search */}
          <div className="relative">
            <svg
              className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              ref={inputRef}
              type="text"
              placeholder="Search Pokemon..."
              value={search}
              onChange={(e) => onSearchChange(e.target.value)}
              className="w-full rounded-xl border border-gray-200 bg-gray-50 py-3 pl-10 pr-4 text-base text-gray-900 placeholder-gray-400 focus:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-100 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100 dark:placeholder-gray-500 dark:focus:border-blue-500 dark:focus:ring-blue-900"
            />
          </div>

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
                    className={`rounded-full px-3 py-2 text-sm font-semibold capitalize transition-all duration-200 ${
                      active
                        ? `${colors.bg} ${colors.text} ring-2 ring-offset-2 ring-gray-400 dark:ring-offset-gray-900`
                        : "bg-gray-100 text-gray-600 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
                    }`}
                  >
                    {type}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Generation */}
          <div className="space-y-2">
            <label className="text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
              Generation
            </label>
            <select
              value={selectedGeneration}
              onChange={(e) => onGenerationChange(e.target.value)}
              className="w-full appearance-none rounded-xl border border-gray-200 bg-white py-3 pl-3 pr-8 text-base text-gray-700 shadow-sm focus:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-100 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200 dark:focus:border-blue-500 dark:focus:ring-blue-900"
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

          {/* Mega toggle */}
          <div className="space-y-2">
            <label className="text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
              Form
            </label>
            <button
              onClick={onHasMegaToggle}
              className={`flex items-center gap-1.5 rounded-full px-4 py-2 text-sm font-bold uppercase tracking-wide transition-all duration-200 ${
                hasMega
                  ? "bg-purple-500 text-white ring-2 ring-purple-300 ring-offset-2 dark:ring-offset-gray-900"
                  : "bg-gray-100 text-gray-600 hover:bg-purple-100 hover:text-purple-700 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-purple-900/30 dark:hover:text-purple-300"
              }`}
            >
              ✦ Has Mega
            </button>
          </div>

          {/* Action buttons */}
          <div className="flex gap-3 pt-2">
            <button
              onClick={onClearAll}
              className="flex-1 rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm font-semibold text-gray-700 transition-colors hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700"
            >
              Clear all
            </button>
            <button
              onClick={handleClose}
              className="flex-1 rounded-xl bg-blue-500 px-4 py-3 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-blue-600 active:bg-blue-700"
            >
              Done
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
