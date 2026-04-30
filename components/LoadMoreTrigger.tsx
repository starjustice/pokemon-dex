"use client";

import { useRef, useEffect } from "react";

interface LoadMoreTriggerProps {
  onLoadMore: () => void;
  isLoading: boolean;
  hasMore: boolean;
  error: string | null;
  onRetry: () => void;
}

export default function LoadMoreTrigger({
  onLoadMore,
  isLoading,
  hasMore,
  error,
  onRetry,
}: LoadMoreTriggerProps) {
  const sentinelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!hasMore || isLoading || error) return;

    const sentinel = sentinelRef.current;
    if (!sentinel) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          onLoadMore();
        }
      },
      { rootMargin: "200px" }
    );

    observer.observe(sentinel);
    return () => observer.disconnect();
  }, [hasMore, isLoading, error, onLoadMore]);

  if (!hasMore && !isLoading && !error) return null;

  return (
    <div ref={sentinelRef} className="flex items-center justify-center py-8">
      {isLoading && (
        <div className="animate-fadeIn flex items-center gap-3 text-gray-500 dark:text-gray-400">
          <svg
            className="h-5 w-5 animate-spin"
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
          <span className="text-sm font-medium">Loading more Pokemon...</span>
        </div>
      )}

      {error && (
        <div className="flex flex-col items-center gap-2 text-center">
          <p className="text-sm text-red-500 dark:text-red-400">{error}</p>
          <button
            onClick={onRetry}
            className="rounded-lg bg-gray-200 px-4 py-2 text-sm font-semibold text-gray-700 transition-colors hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
          >
            Tap to retry
          </button>
        </div>
      )}
    </div>
  );
}
