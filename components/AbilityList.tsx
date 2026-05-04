"use client";

import { useState } from "react";
import type { AbilityDetail } from "@/lib/pokemon";

function formatName(name: string): string {
  return name
    .split("-")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
}

function AbilityCard({ ability, index }: { ability: AbilityDetail; index: number }) {
  const [open, setOpen] = useState(index === 0);

  return (
    <div className="rounded-xl border border-gray-200 bg-white overflow-hidden dark:border-gray-700 dark:bg-gray-800">
      <button
        onClick={() => setOpen(!open)}
        className="flex w-full items-center gap-2 px-4 py-3 text-left transition-colors hover:bg-gray-50 dark:hover:bg-gray-700/50"
      >
        <span className="flex-1 font-semibold text-gray-900 dark:text-white">
          {formatName(ability.name)}
        </span>
        {ability.isHidden && (
          <span className="rounded-full bg-purple-100 px-2 py-0.5 text-[10px] font-bold uppercase text-purple-700 dark:bg-purple-900/40 dark:text-purple-300">
            Hidden
          </span>
        )}
        <svg
          className={`h-4 w-4 shrink-0 text-gray-400 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {/* Smooth grid expand/collapse */}
      <div
        className="grid transition-[grid-template-rows] duration-200 ease-out"
        style={{ gridTemplateRows: open ? "1fr" : "0fr" }}
      >
        <div className="overflow-hidden">
          <p className="px-4 pb-3 pt-1 text-sm text-gray-600 dark:text-gray-400">
            {ability.shortEffect}
          </p>
        </div>
      </div>
    </div>
  );
}

export default function AbilityList({
  abilities,
}: {
  abilities: AbilityDetail[];
}) {
  return (
    <div className="space-y-3">
      <h2 className="text-lg font-bold text-gray-900 dark:text-white">
        Abilities
      </h2>
      <div className="space-y-2">
        {abilities.map((ability, i) => (
          <AbilityCard key={ability.name} ability={ability} index={i} />
        ))}
      </div>
    </div>
  );
}
