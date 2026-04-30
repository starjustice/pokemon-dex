"use client";

import { useState } from "react";
import type { EncounterLocation } from "@/lib/pokemon";
import { getRegionForVersion } from "@/lib/region-map";
import RegionIcon from "./RegionIcon";

export default function EncounterList({
  encounters,
}: {
  encounters: EncounterLocation[];
}) {
  if (encounters.length === 0) {
    return (
      <div className="space-y-3">
        <h2 className="text-lg font-bold text-gray-900 dark:text-white">
          Encounter Locations
        </h2>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Not available in the wild
        </p>
      </div>
    );
  }

  // Group by region → version → locations
  const regionMap: Record<string, Record<string, string[]>> = {};
  for (const enc of encounters) {
    const region = getRegionForVersion(enc.versionName);
    if (!regionMap[region]) regionMap[region] = {};
    if (!regionMap[region][enc.versionName])
      regionMap[region][enc.versionName] = [];
    if (!regionMap[region][enc.versionName].includes(enc.locationName)) {
      regionMap[region][enc.versionName].push(enc.locationName);
    }
  }

  const regions = Object.keys(regionMap);

  return (
    <div className="space-y-3">
      <h2 className="text-lg font-bold text-gray-900 dark:text-white">
        Encounter Locations
      </h2>
      <div className="space-y-2">
        {regions.map((region, idx) => (
          <RegionAccordion
            key={region}
            region={region}
            versions={regionMap[region]}
            defaultOpen={idx === 0}
          />
        ))}
      </div>
    </div>
  );
}

function RegionAccordion({
  region,
  versions,
  defaultOpen,
}: {
  region: string;
  versions: Record<string, string[]>;
  defaultOpen: boolean;
}) {
  const [open, setOpen] = useState(defaultOpen);
  const versionCount = Object.keys(versions).length;

  return (
    <div className="rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
      <button
        onClick={() => setOpen(!open)}
        className="flex w-full items-center gap-3 px-4 py-3 text-left transition-colors hover:bg-gray-50 dark:hover:bg-gray-800"
      >
        <RegionIcon region={region} />
        <span className="flex-1 text-sm font-semibold text-gray-900 dark:text-white">
          {region}
        </span>
        <span className="rounded-full bg-gray-100 px-2 py-0.5 text-xs font-medium text-gray-500 dark:bg-gray-800 dark:text-gray-400">
          {versionCount} {versionCount === 1 ? "version" : "versions"}
        </span>
        <svg
          className={`h-4 w-4 text-gray-400 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      <div
        className="grid transition-[grid-template-rows] duration-200 ease-out"
        style={{ gridTemplateRows: open ? "1fr" : "0fr" }}
      >
        <div className="overflow-hidden">
          <div className="px-4 pb-3 pt-1 space-y-3">
            {Object.entries(versions).map(([version, locations]) => (
              <VersionLocations
                key={version}
                version={version}
                locations={locations}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function VersionLocations({
  version,
  locations,
}: {
  version: string;
  locations: string[];
}) {
  const [expanded, setExpanded] = useState(false);
  const limit = 5;
  const hasMore = locations.length > limit;
  const visible = expanded ? locations : locations.slice(0, limit);

  return (
    <div>
      <span className="text-xs font-bold uppercase text-gray-500 dark:text-gray-400">
        {version.replace(/-/g, " ")}
      </span>
      <div className="mt-1 flex flex-wrap gap-1">
        {visible.map((loc) => (
          <span
            key={loc}
            className="rounded-lg bg-gray-100 px-2 py-1 text-xs text-gray-700 dark:bg-gray-800 dark:text-gray-300"
          >
            {loc}
          </span>
        ))}
        {hasMore && !expanded && (
          <button
            onClick={() => setExpanded(true)}
            className="rounded-lg bg-blue-50 px-2 py-1 text-xs font-medium text-blue-600 transition-colors hover:bg-blue-100 dark:bg-blue-900/30 dark:text-blue-400 dark:hover:bg-blue-900/50"
          >
            +{locations.length - limit} more
          </button>
        )}
        {hasMore && expanded && (
          <button
            onClick={() => setExpanded(false)}
            className="rounded-lg bg-gray-50 px-2 py-1 text-xs font-medium text-gray-500 transition-colors hover:bg-gray-100 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700"
          >
            Show less
          </button>
        )}
      </div>
    </div>
  );
}
