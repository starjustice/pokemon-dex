import { notFound } from "next/navigation";
import Link from "next/link";
import { fetchLocationDetail, formatLocationName, getVersionGroupsForRegion } from "@/lib/locations";
import { REGION_COLORS, getEncounterMethodIcon, getEncounterMethodLabel } from "@/lib/region-colors";
import { getVersionGroupMeta, getGenerationColors } from "@/lib/version-groups";

interface LocationPageProps {
  params: Promise<{ id: string }>;
}

export default async function LocationDetailPage({ params }: LocationPageProps) {
  const { id } = await params;
  const locationId = parseInt(id, 10);
  if (isNaN(locationId)) notFound();

  let location: Awaited<ReturnType<typeof fetchLocationDetail>>;
  try {
    location = await fetchLocationDetail(locationId);
  } catch {
    notFound();
  }

  const colors = REGION_COLORS[location.region] ?? REGION_COLORS.kanto;
  const totalEncounters = location.areas.reduce((sum, a) => sum + a.encounters.length, 0);

  // Get version-groups for this location's region
  const availableGames =
    location.region && location.region !== "unknown"
      ? await getVersionGroupsForRegion(location.region)
      : [];

  // Group encounters by method within each area
  function groupByMethod(encounters: typeof location.areas[0]["encounters"]) {
    const groups = new Map<string, typeof encounters>();
    for (const enc of encounters) {
      const existing = groups.get(enc.method) ?? [];
      existing.push(enc);
      groups.set(enc.method, existing);
    }
    return groups;
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Back Link */}
        <Link
          href="/locations"
          className="mb-6 inline-flex items-center gap-1 text-sm font-medium text-gray-500 transition-colors hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
        >
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
          Back to Locations
        </Link>

        {/* Hero */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white sm:text-3xl">
            {formatLocationName(location.name)}
          </h1>
          <div className="mt-2 flex items-center gap-3">
            <span
              className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${colors.bg} ${colors.text} ${colors.darkBg} ${colors.darkText}`}
            >
              {colors.label}
            </span>
            <span className="text-sm text-gray-500 dark:text-gray-400">
              {location.areaCount} area{location.areaCount !== 1 ? "s" : ""}
              {totalEncounters > 0 && ` \u00B7 ${totalEncounters} encounter${totalEncounters !== 1 ? "s" : ""}`}
            </span>
          </div>
        </div>

        {/* Available in games */}
        {availableGames.length > 0 && (
          <div className="mb-8">
            <h2 className="mb-2 text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
              Available in
            </h2>
            <div className="flex flex-wrap gap-1.5">
              {availableGames.map((vg) => {
                const meta = getVersionGroupMeta(vg.name);
                const gColors = getGenerationColors(vg.generation);
                return (
                  <Link
                    key={vg.name}
                    href={`/locations?game=${vg.name}`}
                    className={`rounded-full px-2.5 py-1 text-xs font-semibold transition-opacity hover:opacity-80 ${gColors.bg} ${gColors.text} ${gColors.darkBg} ${gColors.darkText}`}
                  >
                    {meta.displayName}
                  </Link>
                );
              })}
            </div>
          </div>
        )}

        {/* Areas */}
        {location.areas.length === 0 ? (
          <div className="rounded-xl border border-gray-200 bg-white p-8 text-center dark:border-gray-700 dark:bg-gray-800">
            <p className="text-gray-500 dark:text-gray-400">
              No encounter data available for this location
            </p>
          </div>
        ) : (
          <div className="space-y-6">
            {location.areas.map((area) => {
              const methodGroups = groupByMethod(area.encounters);
              return (
                <div
                  key={area.areaName}
                  className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-800"
                >
                  {/* Area header */}
                  <div className={`border-b border-gray-200 px-5 py-3 dark:border-gray-700`}>
                    <h2 className="text-sm font-semibold text-gray-900 dark:text-white">
                      {formatLocationName(area.areaName)}
                    </h2>
                  </div>

                  {area.encounters.length === 0 ? (
                    <div className="px-5 py-4">
                      <p className="text-xs text-gray-400 dark:text-gray-500">No encounters</p>
                    </div>
                  ) : (
                    <div className="divide-y divide-gray-100 dark:divide-gray-700/50">
                      {Array.from(methodGroups.entries()).map(([method, encounters]) => (
                        <div key={method} className="px-5 py-3">
                          {/* Method header */}
                          <div className="mb-2 flex items-center gap-2">
                            <span className="text-base">{getEncounterMethodIcon(method)}</span>
                            <span className="text-xs font-semibold text-gray-700 dark:text-gray-300">
                              {getEncounterMethodLabel(method)}
                            </span>
                          </div>

                          {/* Encounter rows */}
                          <div className="space-y-1">
                            {encounters.map((enc) => (
                              <div
                                key={`${enc.pokemonName}-${enc.method}`}
                                className="flex items-center justify-between rounded-md px-2 py-1.5 text-sm hover:bg-gray-50 dark:hover:bg-gray-700/50"
                              >
                                <Link
                                  href={`/pokemon/${enc.pokemonId}`}
                                  className="font-medium text-gray-900 hover:text-teal-600 dark:text-white dark:hover:text-teal-400"
                                >
                                  {formatLocationName(enc.pokemonName)}
                                </Link>
                                <div className="flex items-center gap-3 text-xs text-gray-500 dark:text-gray-400">
                                  <span>
                                    Lv.{enc.minLevel}
                                    {enc.minLevel !== enc.maxLevel && `-${enc.maxLevel}`}
                                  </span>
                                  {enc.chance > 0 && <span>{enc.chance}%</span>}
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
