import { notFound } from "next/navigation";
import Link from "next/link";
import { fetchMoveDetail, formatMoveName } from "@/lib/moves";
import { DAMAGE_CLASS_CONFIG } from "@/lib/damage-class";
import { TYPE_COLORS } from "@/lib/type-colors";

interface SkillPageProps {
  params: Promise<{ id: string }>;
}

export default async function SkillDetailPage({ params }: SkillPageProps) {
  const { id } = await params;
  const moveId = parseInt(id, 10);
  if (isNaN(moveId)) notFound();

  let move;
  try {
    move = await fetchMoveDetail(moveId);
  } catch {
    notFound();
  }

  const classConfig = DAMAGE_CLASS_CONFIG[move.damageClass] ?? DAMAGE_CLASS_CONFIG.physical;
  const typeColor = TYPE_COLORS[move.type];

  // Interpolate effect_chance into effect text
  const effectText = move.effectShort
    ? move.effectShort.replace(/\$effect_chance/g, String(move.effectChance ?? "?"))
    : null;
  const effectFull = move.effectFull
    ? move.effectFull.replace(/\$effect_chance/g, String(move.effectChance ?? "?"))
    : null;

  const showLearnedBy = move.learnedByPokemon.length > 0;
  const displayPokemon = move.learnedByPokemon.slice(0, 30);
  const hasMorePokemon = move.learnedByPokemon.length > 30;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Back Link */}
        <Link
          href="/skills"
          className="mb-6 inline-flex items-center gap-1 text-sm font-medium text-gray-500 transition-colors hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
        >
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
          Back to Moves
        </Link>

        {/* Hero */}
        <div className="mb-8 rounded-2xl border border-gray-200 bg-white p-8 text-center shadow-sm dark:border-gray-700 dark:bg-gray-800">
          {/* Damage Class Icon */}
          <div className={`mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-xl ${classConfig.bg} ${classConfig.darkBg}`}>
            <span className="text-3xl">{classConfig.icon}</span>
          </div>

          {/* Name */}
          <h1 className="text-2xl font-extrabold text-gray-900 dark:text-white">
            {formatMoveName(move.name)}
          </h1>

          {/* Type + Class Badges */}
          <div className="mt-3 flex items-center justify-center gap-2">
            <span className={`rounded-full px-3 py-1 text-xs font-medium capitalize ${typeColor?.bg ?? "bg-gray-400"} ${typeColor?.text ?? "text-white"}`}>
              {move.type}
            </span>
            <span className={`rounded-full px-3 py-1 text-xs font-medium ${classConfig.bg} ${classConfig.text} ${classConfig.darkBg} ${classConfig.darkText}`}>
              {classConfig.label}
            </span>
          </div>

          {/* Stat Blocks */}
          <div className="mt-6 flex justify-center gap-8">
            <div className="text-center">
              <p className="text-3xl font-bold text-gray-900 dark:text-white">
                {move.power ?? "—"}
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400">POWER</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold text-gray-900 dark:text-white">
                {move.accuracy ?? "—"}
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400">ACCURACY</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold text-gray-900 dark:text-white">
                {move.pp}
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400">PP</p>
            </div>
          </div>
        </div>

        {/* Effect */}
        {effectText && (
          <section className="mb-6 rounded-xl border border-gray-200 bg-white p-6 dark:border-gray-700 dark:bg-gray-800">
            <h2 className="mb-3 text-lg font-bold text-gray-900 dark:text-white">Effect</h2>
            <p className="text-sm font-medium text-gray-700 dark:text-gray-300">{effectText}</p>
            {effectFull && effectFull !== effectText && (
              <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">{effectFull}</p>
            )}
          </section>
        )}

        {/* Flavor Text */}
        {move.flavorText && (
          <section className="mb-6 rounded-xl border border-gray-200 bg-white p-6 dark:border-gray-700 dark:bg-gray-800">
            <h2 className="mb-3 text-lg font-bold text-gray-900 dark:text-white">Description</h2>
            <p className="text-sm italic text-gray-600 dark:text-gray-400">
              &ldquo;{move.flavorText}&rdquo;
            </p>
          </section>
        )}

        {/* Metadata */}
        <section className="mb-6 rounded-xl border border-gray-200 bg-white p-6 dark:border-gray-700 dark:bg-gray-800">
          <h2 className="mb-3 text-lg font-bold text-gray-900 dark:text-white">Details</h2>
          <dl className="grid grid-cols-2 gap-3 text-sm">
            <div>
              <dt className="text-gray-500 dark:text-gray-400">Generation</dt>
              <dd className="font-medium text-gray-900 dark:text-white">{move.generation}</dd>
            </div>
            <div>
              <dt className="text-gray-500 dark:text-gray-400">Priority</dt>
              <dd className="font-medium text-gray-900 dark:text-white">{move.priority > 0 ? `+${move.priority}` : move.priority}</dd>
            </div>
            <div>
              <dt className="text-gray-500 dark:text-gray-400">Target</dt>
              <dd className="font-medium capitalize text-gray-900 dark:text-white">{move.target}</dd>
            </div>
            {move.meta?.drain !== 0 && move.meta && (
              <div>
                <dt className="text-gray-500 dark:text-gray-400">Drain/Recoil</dt>
                <dd className="font-medium text-gray-900 dark:text-white">{move.meta.drain}%</dd>
              </div>
            )}
            {move.meta?.healing !== 0 && move.meta && (
              <div>
                <dt className="text-gray-500 dark:text-gray-400">Healing</dt>
                <dd className="font-medium text-gray-900 dark:text-white">{move.meta.healing}%</dd>
              </div>
            )}
            {move.meta?.maxHits && (
              <div>
                <dt className="text-gray-500 dark:text-gray-400">Hits</dt>
                <dd className="font-medium text-gray-900 dark:text-white">{move.meta.minHits}–{move.meta.maxHits}</dd>
              </div>
            )}
          </dl>
        </section>

        {/* Learned By Pokemon */}
        {showLearnedBy && (
          <section className="mb-6 rounded-xl border border-gray-200 bg-white p-6 dark:border-gray-700 dark:bg-gray-800">
            <h2 className="mb-3 text-lg font-bold text-gray-900 dark:text-white">
              Learned By ({move.learnedByPokemon.length} Pokemon)
            </h2>
            <div className="flex flex-wrap gap-2">
              {displayPokemon.map((pokemon) => (
                <Link
                  key={pokemon.id}
                  href={`/pokemon/${pokemon.id}`}
                  className="rounded-full bg-blue-50 px-3 py-1 text-xs font-medium capitalize text-blue-700 transition-colors hover:bg-blue-100 dark:bg-blue-900/30 dark:text-blue-300 dark:hover:bg-blue-900/50"
                >
                  {pokemon.name.replace(/-/g, " ")}
                </Link>
              ))}
            </div>
            {hasMorePokemon && (
              <p className="mt-3 text-xs text-gray-500 dark:text-gray-400">
                + {move.learnedByPokemon.length - 30} more Pokemon
              </p>
            )}
          </section>
        )}
      </div>
    </div>
  );
}
