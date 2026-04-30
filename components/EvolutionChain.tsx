import Image from "next/image";
import Link from "next/link";
import type { EvolutionStage } from "@/lib/pokemon";

function formatName(name: string): string {
  return name
    .split("-")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
}

function EvolutionNode({ stage }: { stage: EvolutionStage }) {
  return (
    <div className="flex flex-col items-center">
      <Link
        href={`/pokemon/${stage.id}`}
        className="group flex flex-col items-center gap-1 rounded-xl p-2 transition-colors hover:bg-gray-100 dark:hover:bg-gray-800"
      >
        <div className="relative h-20 w-20">
          <Image
            src={stage.sprite}
            alt={stage.name}
            fill
            sizes="80px"
            className="object-contain"
          />
        </div>
        <span className="text-xs font-semibold text-gray-700 dark:text-gray-300 group-hover:text-blue-600 dark:group-hover:text-blue-400">
          {formatName(stage.name)}
        </span>
      </Link>
    </div>
  );
}

function Arrow({ conditions }: { conditions: string[] }) {
  return (
    <div className="flex flex-col items-center justify-center px-1">
      <svg
        className="h-5 w-5 text-gray-400 dark:text-gray-500 hidden sm:block"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
      </svg>
      <svg
        className="h-5 w-5 text-gray-400 dark:text-gray-500 sm:hidden"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
      </svg>
      {conditions.length > 0 && (
        <span className="text-center text-[10px] leading-tight text-gray-500 dark:text-gray-400 max-w-[80px]">
          {conditions.join(" / ")}
        </span>
      )}
    </div>
  );
}

function EvolutionBranch({ stage }: { stage: EvolutionStage }) {
  if (stage.evolvesTo.length === 0) {
    return <EvolutionNode stage={stage} />;
  }

  return (
    <>
      <EvolutionNode stage={stage} />
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
        {stage.evolvesTo.map((next) => (
          <div
            key={next.id}
            className="flex flex-col items-center sm:flex-row sm:items-center"
          >
            <Arrow conditions={next.conditions} />
            <EvolutionBranch stage={next} />
          </div>
        ))}
      </div>
    </>
  );
}

export default function EvolutionChain({
  chain,
}: {
  chain: EvolutionStage[];
}) {
  if (chain.length === 0) return null;

  const root = chain[0];
  const hasEvolution = root.evolvesTo.length > 0;

  return (
    <div className="space-y-3">
      <h2 className="text-lg font-bold text-gray-900 dark:text-white">
        Evolution Chain
      </h2>
      {!hasEvolution ? (
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Does not evolve
        </p>
      ) : (
        <div className="flex flex-col items-center gap-1 sm:flex-row sm:items-center sm:gap-2 overflow-x-auto py-2">
          <EvolutionBranch stage={root} />
        </div>
      )}
    </div>
  );
}
