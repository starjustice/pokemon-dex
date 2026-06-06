import Link from "next/link";
import { type LocationBasic } from "@/lib/locations";
import { formatLocationName } from "@/lib/locations";
import { REGION_COLORS } from "@/lib/region-colors";

interface LocationCardProps {
  location: LocationBasic;
}

export default function LocationCard({ location }: LocationCardProps) {
  const colors = REGION_COLORS[location.region] ?? REGION_COLORS.kanto;
  const hasEncounters = location.areaCount > 0;

  return (
    <Link
      href={`/locations/${location.id}`}
      className={`group relative block overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm transition-all hover:shadow-md hover:-translate-y-0.5 dark:border-gray-700 dark:bg-gray-800 ${
        !hasEncounters ? "opacity-60" : ""
      }`}
    >
      <div className="flex items-center gap-4 p-4">
        {/* Map pin icon */}
        <div
          className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full ${colors.iconBg} ${colors.darkIconBg}`}
        >
          <svg
            className={`h-5 w-5 ${colors.text} ${colors.darkText}`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"
            />
          </svg>
        </div>

        {/* Info */}
        <div className="min-w-0 flex-1">
          <h3 className="truncate text-sm font-semibold text-gray-900 dark:text-white">
            {formatLocationName(location.name)}
          </h3>
          <div className="mt-1 flex items-center gap-2">
            <span
              className={`inline-flex items-center rounded-full px-2 py-0.5 text-[10px] font-semibold ${colors.bg} ${colors.text} ${colors.darkBg} ${colors.darkText}`}
            >
              {colors.label}
            </span>
            <span className="text-xs text-gray-500 dark:text-gray-400">
              {hasEncounters
                ? `${location.areaCount} area${location.areaCount !== 1 ? "s" : ""}`
                : "No encounter data"}
            </span>
          </div>
        </div>
      </div>

      {/* Bottom accent bar */}
      <div
        className={`h-1 w-full bg-gradient-to-r ${colors.accent} opacity-60 transition-opacity group-hover:opacity-100`}
      />
    </Link>
  );
}
