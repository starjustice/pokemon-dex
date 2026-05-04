"use client";

import type { PokemonStat } from "@/lib/pokemon";
import { useState } from "react";

const STAT_COLORS: Record<string, { bg: string; glow: string }> = {
  hp:                { bg: "#22c55e", glow: "rgba(34,197,94,0.4)" },
  attack:            { bg: "#ef4444", glow: "rgba(239,68,68,0.4)" },
  defense:           { bg: "#f97316", glow: "rgba(249,115,22,0.4)" },
  "special-attack":  { bg: "#3b82f6", glow: "rgba(59,130,246,0.4)" },
  "special-defense": { bg: "#a855f7", glow: "rgba(168,85,247,0.4)" },
  speed:             { bg: "#ec4899", glow: "rgba(236,72,153,0.4)" },
};

const STAT_LABELS: Record<string, string> = {
  hp: "HP",
  attack: "Attack",
  defense: "Defense",
  "special-attack": "Sp. Atk",
  "special-defense": "Sp. Def",
  speed: "Speed",
};

interface StatBarProps {
  stat: { name: string; value: number };
  index?: number;
}

export default function StatBar({ stat, index = 0 }: StatBarProps) {
  const percentage = Math.min((stat.value / 255) * 100, 100);
  const colors = STAT_COLORS[stat.name] ?? { bg: "#6b7280", glow: "rgba(107,114,128,0.4)" };
  const label = STAT_LABELS[stat.name] ?? stat.name;
  const delay = `${index * 60}ms`;
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className="flex items-center gap-3"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Label */}
      <span className="w-20 shrink-0 text-sm font-medium text-gray-600 dark:text-gray-400">
        {label}
      </span>
      {/* Value */}
      <span className="w-8 shrink-0 text-right text-sm font-bold tabular-nums text-gray-900 dark:text-gray-100">
        {stat.value}
      </span>

      {/* Track */}
      <div className="relative h-3 flex-1 overflow-hidden rounded-full bg-gray-200 dark:bg-gray-700">
        {/* Fill */}
        <div
          className="absolute inset-y-0 left-0 rounded-full"
          style={{
            ["--fill" as string]: `${percentage}%`,
            animation: `fillBar 0.7s cubic-bezier(0.22, 1, 0.36, 1) ${delay} both`,
            backgroundColor: colors.bg,
            // Subtle shine on top half only — doesn't extend to the right edge visually
            backgroundImage: `linear-gradient(
              to bottom,
              rgba(255,255,255,0.30) 0%,
              rgba(255,255,255,0.10) 50%,
              transparent 50%
            )`,
            boxShadow: hovered
              ? `0 0 8px ${colors.glow}, 0 1px 3px rgba(0,0,0,0.15)`
              : `0 0 4px ${colors.glow}`,
            transition: "box-shadow 0.2s ease",
          }}
        />
      </div>
    </div>
  );
}
