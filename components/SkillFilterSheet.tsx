"use client";

import { useEffect, useState, useRef } from "react";
import { DAMAGE_CLASS_CONFIG, DAMAGE_CLASS_NAMES } from "@/lib/damage-class";
import { TYPE_COLORS } from "@/lib/type-colors";
import { ALL_TYPES } from "@/lib/pokemon";

const GENERATIONS = ["I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX"];

interface SkillFilterSheetProps {
  isOpen: boolean;
  onClose: () => void;
  search: string;
  onSearchChange: (value: string) => void;
  damageClass: string;
  onDamageClassChange: (value: string) => void;
  selectedType: string;
  onTypeChange: (value: string) => void;
  generation: string;
  onGenerationChange: (value: string) => void;
  sort: string;
  onSortChange: (value: string) => void;
  onClearAll: () => void;
}

export default function SkillFilterSheet({
  isOpen,
  onClose,
  search,
  onSearchChange,
  damageClass,
  onDamageClassChange,
  selectedType,
  onTypeChange,
  generation,
  onGenerationChange,
  sort,
  onSortChange,
  onClearAll,
}: SkillFilterSheetProps) {
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

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      setMounted(false);
      setIsClosing(false);
      onClose();
    }, 200);
  };

  if (!isOpen && !mounted) return null;

  const hasFilters = search || damageClass || selectedType || generation;

  return (
    <div className="fixed inset-0 z-50 lg:hidden">
      <div
        className={`absolute inset-0 bg-black/50 transition-opacity duration-300 ${isClosing ? "opacity-0" : "opacity-100"}`}
        onClick={handleClose}
      />
      <div className={`absolute bottom-0 left-0 right-0 rounded-t-2xl bg-white shadow-2xl dark:bg-gray-900 ${isClosing ? "animate-sheetDown" : "animate-sheetUp"}`}>
        <div className="flex justify-center pt-3 pb-2">
          <div className="h-1 w-10 rounded-full bg-gray-300 dark:bg-gray-600" />
        </div>
        <div className="flex items-center justify-between px-5 pb-4">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white">Filter Moves</h3>
          <button onClick={handleClose} className="rounded-lg p-1.5 text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800" aria-label="Close">
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="max-h-[70vh] overflow-y-auto px-5 pb-8 space-y-5">
          {/* Search */}
          <input
            ref={inputRef}
            type="text"
            placeholder="Search moves..."
            value={search}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm text-gray-900 placeholder-gray-400 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-800 dark:text-white dark:placeholder-gray-500"
          />

          {/* Damage Class */}
          <div>
            <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">Damage Class</p>
            <div className="flex gap-2">
              {DAMAGE_CLASS_NAMES.map((cls) => {
                const config = DAMAGE_CLASS_CONFIG[cls];
                const isActive = damageClass === cls;
                return (
                  <button
                    key={cls}
                    onClick={() => onDamageClassChange(isActive ? "" : cls)}
                    className={`flex items-center gap-1.5 rounded-full px-3 py-2 text-sm font-medium transition-all ${
                      isActive
                        ? `${config.activeBg} ${config.activeText} ${config.darkActiveBg} ${config.darkActiveText}`
                        : `${config.bg} ${config.text} ${config.darkBg} ${config.darkText}`
                    }`}
                  >
                    <span>{config.icon}</span>
                    <span>{config.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Type */}
          <div>
            <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">Type</p>
            <div className="flex flex-wrap gap-2">
              {ALL_TYPES.map((type) => {
                const colors = TYPE_COLORS[type];
                const isActive = selectedType === type;
                return (
                  <button
                    key={type}
                    onClick={() => onTypeChange(isActive ? "" : type)}
                    className={`rounded-full px-2.5 py-1 text-xs font-medium capitalize transition-all ${
                      isActive
                        ? `${colors.bg} ${colors.text} ring-2 ring-offset-1 ring-gray-400`
                        : "bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-300"
                    }`}
                  >
                    {type}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Generation */}
          <div>
            <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">Generation</p>
            <div className="flex flex-wrap gap-2">
              {GENERATIONS.map((gen) => {
                const isActive = generation === gen;
                return (
                  <button
                    key={gen}
                    onClick={() => onGenerationChange(isActive ? "" : gen)}
                    className={`rounded-full px-3 py-1.5 text-xs font-medium transition-all ${
                      isActive
                        ? "bg-gray-800 text-white dark:bg-white dark:text-gray-900"
                        : "bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-300"
                    }`}
                  >
                    {gen}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Sort */}
          <div>
            <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">Sort</p>
            <select
              value={sort}
              onChange={(e) => onSortChange(e.target.value)}
              className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm dark:border-gray-600 dark:bg-gray-800 dark:text-white"
            >
              <option value="name">Name A-Z</option>
              <option value="power">Power (high to low)</option>
              <option value="accuracy">Accuracy (high to low)</option>
            </select>
          </div>

          {/* Clear */}
          {hasFilters && (
            <button
              onClick={onClearAll}
              className="w-full rounded-lg border border-gray-300 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-800"
            >
              Clear all filters
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
