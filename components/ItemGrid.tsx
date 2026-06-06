"use client";

import { useState, useEffect, useRef, useTransition, useCallback } from "react";
import { type ItemBasic, fetchItemPage, fetchAllItemNames } from "@/lib/items";
import { getCategoryGroup, CATEGORY_GROUP_NAMES, CATEGORY_GROUP_ICONS, CATEGORY_GROUP_COLORS } from "@/lib/item-categories";
import ItemCard from "./ItemCard";
import ItemFilterFAB from "./ItemFilterFAB";
import ItemFilterSheet from "./ItemFilterSheet";

const PAGE_SIZE = 40;

export default function ItemGrid() {
  const [items, setItems] = useState<ItemBasic[]>([]);
  const [total, setTotal] = useState(0);
  const [offset, setOffset] = useState(0);
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [allNames, setAllNames] = useState<{ id: number; name: string }[]>([]);
  const [loading, setLoading] = useState(true);
  const [, startTransition] = useTransition();
  const loaderRef = useRef<HTMLDivElement>(null);
  const [hasMore, setHasMore] = useState(true);
  const [isSheetOpen, setIsSheetOpen] = useState(false);

  // Filtered mode: when search or category is active
  const [filteredItems, setFilteredItems] = useState<ItemBasic[]>([]);
  const [filteredLoading, setFilteredLoading] = useState(false);
  const isFiltered = search !== "" || categoryFilter !== "";

  const activeFilterCount = (search ? 1 : 0) + (categoryFilter ? 1 : 0);

  // Load all names for search
  useEffect(() => {
    fetchAllItemNames().then(setAllNames);
  }, []);

  // Initial load
  useEffect(() => {
    setLoading(true);
    fetchItemPage(0, PAGE_SIZE).then(({ items: fetched, total: t }) => {
      setItems(fetched);
      setTotal(t);
      setOffset(PAGE_SIZE);
      setHasMore(PAGE_SIZE < t);
      setLoading(false);
    });
  }, []);

  // Infinite scroll
  useEffect(() => {
    if (isFiltered) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore && !loading) {
          setLoading(true);
          fetchItemPage(offset, PAGE_SIZE).then(({ items: fetched, total: t }) => {
            startTransition(() => {
              setItems((prev) => [...prev, ...fetched]);
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

  // Filtered fetch
  const fetchFiltered = useCallback(async () => {
    if (!isFiltered) return;
    setFilteredLoading(true);

    let matchingNames = allNames;

    if (search) {
      const q = search.toLowerCase();
      matchingNames = matchingNames.filter((n) => n.name.includes(q));
    }

    if (categoryFilter && !search) {
      const results: ItemBasic[] = [];
      let batchOffset = 0;
      const batchSize = 100;
      let done = false;

      while (!done && results.length < 80) {
        const { items: batch, total: t } = await fetchItemPage(batchOffset, batchSize);
        const filtered = batch.filter((item) => item.categoryGroup === categoryFilter);
        results.push(...filtered);
        batchOffset += batchSize;
        if (batchOffset >= t) done = true;
      }

      setFilteredItems(results);
      setFilteredLoading(false);
      return;
    }

    const toFetch = matchingNames.slice(0, 80);
    const results = await Promise.all(
      toFetch.map(async (entry) => {
        try {
          const res = await fetch(`https://pokeapi.co/api/v2/item/${entry.id}`);
          const data = await res.json();
          const item: ItemBasic = {
            id: data.id,
            name: data.name,
            sprite: data.sprites.default,
            category: data.category.name,
            categoryGroup: getCategoryGroup(data.category.name),
            cost: data.cost,
          };
          return item;
        } catch {
          return null;
        }
      })
    );

    let filtered = results.filter((r): r is ItemBasic => r !== null);
    if (categoryFilter) {
      filtered = filtered.filter((item) => item.categoryGroup === categoryFilter);
    }

    setFilteredItems(filtered);
    setFilteredLoading(false);
  }, [search, categoryFilter, allNames, isFiltered]);

  useEffect(() => {
    if (!isFiltered) {
      setFilteredItems([]);
      return;
    }
    const timer = setTimeout(fetchFiltered, 300);
    return () => clearTimeout(timer);
  }, [search, categoryFilter, isFiltered, fetchFiltered]);

  const handleClearAll = () => {
    setSearch("");
    setCategoryFilter("");
  };

  const displayItems = isFiltered ? filteredItems : items;
  const isLoading = isFiltered ? filteredLoading : loading;

  return (
    <div>
      {/* Desktop Inline Filters */}
      <div className="mb-6 hidden lg:block">
        <input
          type="text"
          placeholder="Search items..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="mb-4 w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm text-gray-900 placeholder-gray-400 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-800 dark:text-white dark:placeholder-gray-500"
        />

        {/* Category Chips */}
        <div className="flex gap-2 overflow-x-auto pb-1">
          {CATEGORY_GROUP_NAMES.map((name) => {
            const isActive = categoryFilter === name;
            const colors = CATEGORY_GROUP_COLORS[name];
            const icon = CATEGORY_GROUP_ICONS[name];

            return (
              <button
                key={name}
                onClick={() => setCategoryFilter(isActive ? "" : name)}
                className={`flex shrink-0 items-center gap-1.5 rounded-full px-3.5 py-2 text-sm font-medium transition-all ${
                  isActive
                    ? `${colors.activeBg} ${colors.activeText} ${colors.darkActiveBg} ${colors.darkActiveText} shadow-sm`
                    : `${colors.bg} ${colors.text} ${colors.darkBg} ${colors.darkText} hover:opacity-80`
                }`}
              >
                <span>{icon}</span>
                <span>{name}</span>
              </button>
            );
          })}
        </div>

        {/* Clear filters */}
        {isFiltered && (
          <button
            onClick={handleClearAll}
            className="mt-3 text-sm font-medium text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
          >
            Clear all filters
          </button>
        )}
      </div>

      {/* Grid */}
      {displayItems.length > 0 ? (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {displayItems.map((item) => (
            <ItemCard key={item.id} item={item} />
          ))}
        </div>
      ) : !isLoading ? (
        <div className="py-16 text-center">
          <p className="text-lg font-medium text-gray-500 dark:text-gray-400">
            No items found
          </p>
          <p className="mt-1 text-sm text-gray-400 dark:text-gray-500">
            Try a different search or category
          </p>
        </div>
      ) : null}

      {/* Loading / Scroll trigger */}
      {isLoading && (
        <div className="flex justify-center py-8">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-gray-200 border-t-blue-500" />
        </div>
      )}

      {!isFiltered && hasMore && !loading && (
        <div ref={loaderRef} className="h-10" />
      )}

      {!isFiltered && !hasMore && items.length > 0 && (
        <p className="mt-6 text-center text-sm text-gray-400 dark:text-gray-500">
          Showing all {total.toLocaleString()} items
        </p>
      )}

      {/* Mobile FAB + Sheet */}
      <ItemFilterFAB
        activeCount={activeFilterCount}
        onClick={() => setIsSheetOpen(true)}
      />
      <ItemFilterSheet
        isOpen={isSheetOpen}
        onClose={() => setIsSheetOpen(false)}
        search={search}
        onSearchChange={setSearch}
        selectedCategory={categoryFilter}
        onCategoryChange={setCategoryFilter}
        onClearAll={handleClearAll}
      />
    </div>
  );
}
