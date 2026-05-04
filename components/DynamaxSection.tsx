import Image from "next/image";
import type { PokemonType } from "@/lib/pokemon";
import type { GMaxMove } from "@/lib/gmax-ids";
import { MAX_MOVES } from "@/lib/gmax-ids";
import { TYPE_COLORS } from "@/lib/type-colors";

function formatName(name: string): string {
  return name
    .split("-")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
}

interface DynamaxSectionProps {
  name: string;
  types: PokemonType[];
  canGmax: boolean;
  gmaxImage: string | null;
  baseImage: string;
  gmaxMove: GMaxMove | null;
}

export default function DynamaxSection({
  name,
  types,
  canGmax,
  gmaxImage,
  baseImage,
  gmaxMove,
}: DynamaxSectionProps) {
  // Collect relevant Max Moves based on Pokemon's types
  const maxMovesForTypes = types
    .map((t) => ({ type: t.name, move: MAX_MOVES[t.name] }))
    .filter((m): m is { type: string; move: NonNullable<typeof m.move> } => !!m.move);

  // Always include Max Guard (all Pokemon can use it for status moves)
  const maxGuard = MAX_MOVES["status"];

  return (
    <div>
      <h2 className="mb-4 text-lg font-bold text-gray-900 dark:text-white flex items-center gap-2">
        <span className="inline-block w-3 h-3 rounded-full bg-red-500" />
        Dynamax
      </h2>

      {/* G-Max artwork comparison */}
      {canGmax && gmaxImage && (
        <div className="mb-6">
          <h3 className="mb-3 text-sm font-semibold uppercase tracking-wide text-red-500 dark:text-red-400">
            Gigantamax Form
          </h3>
          <div className="grid grid-cols-2 gap-4">
            {/* Normal */}
            <div className="flex flex-col items-center gap-2">
              <div className="relative h-36 w-36 rounded-xl bg-gray-50 dark:bg-gray-800 p-2">
                <Image
                  src={baseImage}
                  alt={name}
                  fill
                  sizes="144px"
                  className="object-contain"
                />
              </div>
              <span className="text-xs font-semibold text-gray-500 dark:text-gray-400">
                Normal
              </span>
            </div>
            {/* Gigantamax */}
            <div className="flex flex-col items-center gap-2">
              <div className="relative h-36 w-36 rounded-xl bg-red-50 dark:bg-red-950/30 p-2 ring-2 ring-red-400/40 dark:ring-red-500/30">
                <Image
                  src={gmaxImage}
                  alt={`${name} Gigantamax`}
                  fill
                  sizes="144px"
                  className="object-contain"
                />
              </div>
              <span className="text-xs font-semibold text-red-500 dark:text-red-400">
                Gigantamax
              </span>
            </div>
          </div>
        </div>
      )}

      {/* G-Max exclusive move */}
      {gmaxMove && (
        <div className="mb-6">
          <h3 className="mb-3 text-sm font-semibold uppercase tracking-wide text-red-500 dark:text-red-400">
            G-Max Move
          </h3>
          <div className="rounded-xl border border-red-200 bg-red-50 p-4 dark:border-red-800/40 dark:bg-red-950/20">
            <div className="flex items-center gap-3 flex-wrap">
              <span className="font-bold text-gray-900 dark:text-white">
                {gmaxMove.name}
              </span>
              {(() => {
                const colors = TYPE_COLORS[gmaxMove.type] ?? { bg: "bg-gray-400", text: "text-white" };
                return (
                  <span className={`${colors.bg} ${colors.text} rounded-full px-2 py-0.5 text-xs font-semibold capitalize`}>
                    {gmaxMove.type}
                  </span>
                );
              })()}
            </div>
            <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">{gmaxMove.effect}</p>
          </div>
        </div>
      )}

      {/* Max Moves by type */}
      <div>
        <h3 className="mb-3 text-sm font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">
          Max Moves
        </h3>
        <div className="space-y-2">
          {maxMovesForTypes.map(({ type, move }) => {
            const colors = TYPE_COLORS[type] ?? { bg: "bg-gray-400", text: "text-white" };
            return (
              <div
                key={type}
                className="flex items-start gap-3 rounded-lg border border-gray-100 bg-gray-50 p-3 dark:border-gray-800 dark:bg-gray-800/50"
              >
                <span
                  className={`${colors.bg} ${colors.text} shrink-0 rounded-full px-2 py-0.5 text-xs font-semibold capitalize`}
                >
                  {type}
                </span>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-sm text-gray-900 dark:text-white">
                      {move.name}
                    </span>
                    <span className="text-xs text-gray-400 dark:text-gray-500">
                      Pow. {move.power}
                    </span>
                  </div>
                  <p className="mt-0.5 text-xs text-gray-500 dark:text-gray-400">
                    {move.effect}
                  </p>
                </div>
              </div>
            );
          })}
          {/* Max Guard */}
          <div className="flex items-start gap-3 rounded-lg border border-gray-100 bg-gray-50 p-3 dark:border-gray-800 dark:bg-gray-800/50">
            <span className="shrink-0 rounded-full bg-gray-300 px-2 py-0.5 text-xs font-semibold text-gray-700 dark:bg-gray-600 dark:text-gray-200">
              status
            </span>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <span className="font-semibold text-sm text-gray-900 dark:text-white">
                  {maxGuard.name}
                </span>
              </div>
              <p className="mt-0.5 text-xs text-gray-500 dark:text-gray-400">
                {maxGuard.effect}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
