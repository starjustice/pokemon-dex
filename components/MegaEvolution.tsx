import Image from "next/image";
import type { MegaEvolution as MegaEvolutionType, PokemonType } from "@/lib/pokemon";
import { TYPE_COLORS } from "@/lib/type-colors";
import StatBar from "@/components/StatBar";

function formatName(name: string): string {
  return name
    .split("-")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
}

interface MegaEvolutionProps {
  baseName: string;
  baseImage: string;
  baseTypes: PokemonType[];
  megaEvolutions: MegaEvolutionType[];
}

export default function MegaEvolution({
  baseName,
  baseImage,
  baseTypes,
  megaEvolutions,
}: MegaEvolutionProps) {
  if (megaEvolutions.length === 0) return null;

  return (
    <div>
      <h2 className="mb-4 text-lg font-bold text-gray-900 dark:text-white">
        Mega Evolution
      </h2>
      <div className="space-y-6">
        {megaEvolutions.map((mega) => (
          <div key={mega.name} className="flex flex-col gap-4">
            {/* Cards row */}
            <div className="flex items-center justify-center gap-3 sm:gap-6">
              {/* Base form card */}
              <div className="flex flex-col items-center rounded-xl border border-gray-200 bg-gradient-to-b from-gray-50 to-white p-3 shadow-sm dark:border-gray-700 dark:from-gray-800 dark:to-gray-900 w-36 sm:w-44">
                <div className="relative h-24 w-24 sm:h-28 sm:w-28">
                  <Image
                    src={baseImage}
                    alt={baseName}
                    fill
                    sizes="112px"
                    className="object-contain"
                  />
                </div>
                <p className="mt-1 text-xs font-mono font-bold text-gray-400 dark:text-gray-500">
                  Base
                </p>
                <p className="text-sm font-semibold text-gray-900 dark:text-white capitalize">
                  {formatName(baseName)}
                </p>
                <div className="mt-1 flex flex-wrap justify-center gap-1">
                  {baseTypes.map((type) => {
                    const colors = TYPE_COLORS[type.name] ?? { bg: "bg-gray-400", text: "text-white" };
                    return (
                      <span
                        key={type.name}
                        className={`${colors.bg} ${colors.text} rounded-full px-2 py-0.5 text-[10px] font-semibold capitalize`}
                      >
                        {type.name}
                      </span>
                    );
                  })}
                </div>
              </div>

              {/* Double arrow */}
              <div className="flex flex-col items-center gap-1 text-gray-400 dark:text-gray-500">
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 21L3 16.5m0 0L7.5 12M3 16.5h13.5m0-13.5L21 7.5m0 0L16.5 12M21 7.5H7.5" />
                </svg>
              </div>

              {/* Mega form card */}
              <div className="flex flex-col items-center rounded-xl border border-purple-200 bg-gradient-to-b from-purple-50 to-white p-3 shadow-sm dark:border-purple-800 dark:from-purple-950 dark:to-gray-900 w-36 sm:w-44">
                <div className="relative h-24 w-24 sm:h-28 sm:w-28">
                  {mega.image ? (
                    <Image
                      src={mega.image}
                      alt={mega.name}
                      fill
                      sizes="112px"
                      className="object-contain"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center text-gray-300 dark:text-gray-600">
                      <span className="text-3xl">?</span>
                    </div>
                  )}
                </div>
                <p className="mt-1 text-xs font-mono font-bold text-purple-400 dark:text-purple-500">
                  Mega
                </p>
                <p className="text-sm font-semibold text-gray-900 dark:text-white capitalize">
                  {formatName(mega.name)}
                </p>
                <div className="mt-1 flex flex-wrap justify-center gap-1">
                  {mega.types.map((type) => {
                    const colors = TYPE_COLORS[type.name] ?? { bg: "bg-gray-400", text: "text-white" };
                    return (
                      <span
                        key={type.name}
                        className={`${colors.bg} ${colors.text} rounded-full px-2 py-0.5 text-[10px] font-semibold capitalize`}
                      >
                        {type.name}
                      </span>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Mega stats */}
            <div className="rounded-xl border border-gray-200 bg-white p-4 dark:border-gray-700 dark:bg-gray-900">
              <h3 className="mb-3 text-sm font-semibold text-gray-700 dark:text-gray-300">
                {formatName(mega.name)} Stats
              </h3>
              <div className="space-y-2">
                {mega.stats.map((stat, i) => (
                  <StatBar key={stat.name} stat={stat} index={i} />
                ))}
              </div>
              <div className="mt-2 border-t border-gray-100 pt-2 dark:border-gray-800">
                <div className="flex items-center gap-3">
                  <span className="w-20 text-sm font-medium text-gray-600 dark:text-gray-400">
                    Total
                  </span>
                  <span className="w-8 text-right text-sm font-bold text-gray-900 dark:text-gray-100">
                    {mega.stats.reduce((sum, s) => sum + s.value, 0)}
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
