export default function Loading() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8 animate-pulse">
        {/* Back button placeholder */}
        <div className="mb-6 h-5 w-32 rounded bg-gray-200 dark:bg-gray-800" />

        {/* Hero */}
        <div className="mb-8 rounded-2xl border border-gray-200 bg-white p-6 dark:border-gray-700 dark:bg-gray-900">
          <div className="flex flex-col items-center gap-6 sm:flex-row">
            <div className="h-48 w-48 shrink-0 rounded-xl bg-gray-200 dark:bg-gray-800" />
            <div className="flex-1 space-y-3">
              <div className="h-4 w-16 rounded bg-gray-200 dark:bg-gray-800" />
              <div className="h-8 w-48 rounded bg-gray-200 dark:bg-gray-800" />
              <div className="h-4 w-32 rounded bg-gray-200 dark:bg-gray-800" />
              <div className="flex gap-2">
                <div className="h-7 w-20 rounded-full bg-gray-200 dark:bg-gray-800" />
                <div className="h-7 w-20 rounded-full bg-gray-200 dark:bg-gray-800" />
              </div>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="mb-8 rounded-2xl border border-gray-200 bg-white p-6 dark:border-gray-700 dark:bg-gray-900">
          <div className="h-6 w-24 rounded bg-gray-200 dark:bg-gray-800 mb-4" />
          <div className="space-y-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="flex items-center gap-3">
                <div className="h-4 w-20 rounded bg-gray-200 dark:bg-gray-800" />
                <div className="h-3 flex-1 rounded-full bg-gray-200 dark:bg-gray-800" />
              </div>
            ))}
          </div>
        </div>

        {/* Evolution */}
        <div className="mb-8 rounded-2xl border border-gray-200 bg-white p-6 dark:border-gray-700 dark:bg-gray-900">
          <div className="h-6 w-36 rounded bg-gray-200 dark:bg-gray-800 mb-4" />
          <div className="flex justify-center gap-4">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="h-24 w-24 rounded-xl bg-gray-200 dark:bg-gray-800" />
            ))}
          </div>
        </div>

        {/* Abilities */}
        <div className="mb-8 rounded-2xl border border-gray-200 bg-white p-6 dark:border-gray-700 dark:bg-gray-900">
          <div className="h-6 w-20 rounded bg-gray-200 dark:bg-gray-800 mb-4" />
          <div className="space-y-2">
            <div className="h-16 rounded-xl bg-gray-200 dark:bg-gray-800" />
            <div className="h-16 rounded-xl bg-gray-200 dark:bg-gray-800" />
          </div>
        </div>
      </div>
    </div>
  );
}
