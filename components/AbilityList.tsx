import type { AbilityDetail } from "@/lib/pokemon";

function formatName(name: string): string {
  return name
    .split("-")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
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
        {abilities.map((ability) => (
          <div
            key={ability.name}
            className="rounded-xl border border-gray-200 bg-white p-3 dark:border-gray-700 dark:bg-gray-800"
          >
            <div className="flex items-center gap-2">
              <span className="font-semibold text-gray-900 dark:text-white">
                {formatName(ability.name)}
              </span>
              {ability.isHidden && (
                <span className="rounded-full bg-purple-100 px-2 py-0.5 text-[10px] font-bold uppercase text-purple-700 dark:bg-purple-900/40 dark:text-purple-300">
                  Hidden
                </span>
              )}
            </div>
            <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
              {ability.shortEffect}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
