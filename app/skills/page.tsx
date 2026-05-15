import SiteHeader from "@/components/SiteHeader";

export default function SkillsPage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <SiteHeader subtitle="Explore Pokemon moves and skills" />

        <div className="flex flex-col items-center justify-center py-24 text-center">
          {/* Icon */}
          <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-2xl bg-yellow-100 dark:bg-yellow-900/30">
            <svg
              className="h-10 w-10 text-yellow-500 dark:text-yellow-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={1.5}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.455 2.456L21.75 6l-1.036.259a3.375 3.375 0 00-2.455 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z"
              />
            </svg>
          </div>

          {/* Heading */}
          <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white">
            Skill Dex
          </h2>

          {/* Coming Soon badge */}
          <span className="mt-3 inline-block rounded-full bg-yellow-100 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-yellow-700 dark:bg-yellow-900/40 dark:text-yellow-300">
            Coming Soon
          </span>

          {/* Description */}
          <p className="mt-4 max-w-md text-base text-gray-500 dark:text-gray-400">
            Browse all Pokemon moves, abilities, and skills. Search by type,
            power, accuracy, and more. This section is under construction.
          </p>
        </div>
      </div>
    </div>
  );
}
