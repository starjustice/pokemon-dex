import type { PokemonStat } from "@/lib/pokemon";

const STAT_COLORS: Record<string, string> = {
  hp: "bg-green-500",
  attack: "bg-red-500",
  defense: "bg-orange-500",
  "special-attack": "bg-blue-500",
  "special-defense": "bg-purple-500",
  speed: "bg-pink-500",
};

const STAT_LABELS: Record<string, string> = {
  hp: "HP",
  attack: "Attack",
  defense: "Defense",
  "special-attack": "Sp. Atk",
  "special-defense": "Sp. Def",
  speed: "Speed",
};

export default function StatBar({ stat }: { stat: PokemonStat }) {
  const percentage = Math.min((stat.value / 255) * 100, 100);
  const color = STAT_COLORS[stat.name] ?? "bg-gray-500";
  const label = STAT_LABELS[stat.name] ?? stat.name;

  return (
    <div className="flex items-center gap-3">
      <span className="w-20 shrink-0 text-sm font-medium text-gray-600 dark:text-gray-400">
        {label}
      </span>
      <span className="w-8 shrink-0 text-right text-sm font-bold text-gray-900 dark:text-gray-100">
        {stat.value}
      </span>
      <div className="h-3 flex-1 overflow-hidden rounded-full bg-gray-200 dark:bg-gray-700">
        <div
          className={`h-full rounded-full ${color} transition-all duration-500`}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}
