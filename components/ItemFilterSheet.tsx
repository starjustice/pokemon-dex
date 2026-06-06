"use client";

import { useEffect, useState, useRef } from "react";
import { CATEGORY_GROUP_NAMES, CATEGORY_GROUP_ICONS, CATEGORY_GROUP_COLORS } from "@/lib/item-categories";

interface ItemFilterSheetProps {
  isOpen: boolean;
  onClose: () => void;
  search: string;
  onSearchChange: (value: string) => void;
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
  onClearAll: () => void;
}

export default function ItemFilterSheet({
  isOpen,
  onClose,
  search,
  onSearchChange,
  selectedCategory,
  onCategoryChange,
  onClearAll,
}: ItemFilterSheetProps) {
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
    return () => {
      document.body.style.overflow = "";
    };
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

  const hasFilters = search !== "" || selectedCategory !== "";

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
        className={`absolute bottom-0 left-0 right-0 rounded-t-2xl bg-white shadow-2xl dark:bg-gray-900 ${
          isClosing ? "animate-sheetDown" : "animate-sheetUp"
        }`}
      >
        {/* Handle */}
        <div className="flex justify-center pt-3 pb-2">
          <div className="h-1 w-10 rounded-full bg-gray-300 dark:bg-gray-600" />
        </div>

        {/* Header */}
        <div className="flex items-center justify-between px-5 pb-4">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white">
            Filter Items
          </h3>
          <button
            onClick={handleClose}
            className="rounded-lg p-1.5 text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800"
            aria-label="Close"
          >
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Content */}
        <div className="max-h-[60vh] overflow-y-auto px-5 pb-8">
          {/* Search */}
          <input
            ref={inputRef}
            type="text"
            placeholder="Search items..."
            value={search}
            onChange={(e) => onSearchChange(e.target.value)}
            className="mb-5 w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm text-gray-900 placeholder-gray-400 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-800 dark:text-white dark:placeholder-gray-500"
          />

          {/* Category Chips */}
          <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">
            Category
          </p>
          <div className="grid grid-cols-2 gap-2">
            {CATEGORY_GROUP_NAMES.map((name) => {
              const isActive = selectedCategory === name;
              const colors = CATEGORY_GROUP_COLORS[name];
              const icon = CATEGORY_GROUP_ICONS[name];

              return (
                <button
                  key={name}
                  onClick={() => onCategoryChange(isActive ? "" : name)}
                  className={`flex items-center gap-2 rounded-lg px-3 py-2.5 text-sm font-medium transition-all ${
                    isActive
                      ? `${colors.activeBg} ${colors.activeText} ${colors.darkActiveBg} ${colors.darkActiveText}`
                      : `${colors.bg} ${colors.text} ${colors.darkBg} ${colors.darkText}`
                  }`}
                >
                  <span>{icon}</span>
                  <span>{name}</span>
                </button>
              );
            })}
          </div>

          {/* Clear All */}
          {hasFilters && (
            <button
              onClick={onClearAll}
              className="mt-5 w-full rounded-lg border border-gray-300 py-2.5 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-800"
            >
              Clear all filters
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
