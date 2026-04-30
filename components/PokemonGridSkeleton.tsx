export default function PokemonGridSkeleton() {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {Array.from({ length: 20 }).map((_, i) => (
        <div
          key={i}
          className="animate-pulse rounded-2xl border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-900"
        >
          <div className="flex justify-end">
            <div className="h-4 w-12 rounded bg-gray-200 dark:bg-gray-700" />
          </div>
          <div className="flex items-center justify-center py-6">
            <div className="h-32 w-32 rounded-full bg-gray-200 dark:bg-gray-700" />
          </div>
          <div className="space-y-2">
            <div className="h-5 w-24 rounded bg-gray-200 dark:bg-gray-700" />
            <div className="flex gap-1.5">
              <div className="h-5 w-14 rounded-full bg-gray-200 dark:bg-gray-700" />
              <div className="h-5 w-14 rounded-full bg-gray-200 dark:bg-gray-700" />
            </div>
            <div className="h-3 w-32 rounded bg-gray-200 dark:bg-gray-700" />
            <div className="h-3 w-12 rounded bg-gray-200 dark:bg-gray-700" />
          </div>
        </div>
      ))}
    </div>
  );
}
