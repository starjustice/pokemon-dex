import Link from "next/link";
import { type MoveSummary, formatMoveName } from "@/lib/moves";
import { DAMAGE_CLASS_CONFIG } from "@/lib/damage-class";
import { TYPE_COLORS } from "@/lib/type-colors";

interface SkillCardProps {
  move: MoveSummary;
}

export default function SkillCard({ move }: SkillCardProps) {
  const classConfig = DAMAGE_CLASS_CONFIG[move.damageClass] ?? DAMAGE_CLASS_CONFIG.physical;
  const typeColor = TYPE_COLORS[move.type];
  // Extract the color value for border-l
  const borderColor = typeColor?.bg.replace("bg-", "border-l-") ?? "border-l-gray-400";

  return (
    <Link
      href={`/skills/${move.id}`}
      className={`group block rounded-lg border border-gray-200 bg-white p-3 shadow-sm transition-all hover:shadow-md hover:-translate-y-0.5 dark:border-gray-700 dark:bg-gray-800 border-l-4 ${borderColor}`}
    >
      {/* Row 1: Icon + Name */}
      <div className="flex items-center gap-2">
        <span className="text-lg" aria-hidden="true">{classConfig.icon}</span>
        <p className="text-sm font-semibold text-gray-900 group-hover:text-blue-600 dark:text-white dark:group-hover:text-blue-400 truncate">
          {formatMoveName(move.name)}
        </p>
      </div>

      {/* Row 2: Type · Class */}
      <p className="mt-1 text-xs text-gray-500 dark:text-gray-400 capitalize">
        {move.type} · {classConfig.label}
      </p>

      {/* Row 3: Stats */}
      <div className="mt-2 flex gap-3 text-xs font-mono text-gray-600 dark:text-gray-300">
        <span>PWR {move.power ?? "—"}</span>
        <span>ACC {move.accuracy ?? "—"}</span>
        <span>PP {move.pp}</span>
      </div>
    </Link>
  );
}
