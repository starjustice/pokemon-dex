import Image from "next/image";

interface ShinyComparisonProps {
  name: string;
  normalImage: string;
  shinyImage: string;
}

function formatName(name: string): string {
  return name
    .split("-")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
}

export default function ShinyComparison({
  name,
  normalImage,
  shinyImage,
}: ShinyComparisonProps) {
  return (
    <div>
      <h2 className="mb-4 flex items-center gap-2 text-lg font-bold text-gray-900 dark:text-white">
        <span className="text-yellow-500">✦</span>
        Shiny Form
      </h2>

      <div className="grid grid-cols-2 gap-4">
        {/* Normal */}
        <div className="flex flex-col items-center gap-3 rounded-xl bg-gray-50 p-4 dark:bg-gray-800/50">
          <span className="text-xs font-semibold uppercase tracking-wider text-gray-400 dark:text-gray-500">
            Normal
          </span>
          <div className="relative h-36 w-36">
            <Image
              src={normalImage}
              alt={`${formatName(name)} normal`}
              fill
              sizes="144px"
              className="object-contain drop-shadow-md"
            />
          </div>
        </div>

        {/* Shiny */}
        <div className="flex flex-col items-center gap-3 rounded-xl bg-yellow-50 p-4 ring-1 ring-yellow-200/60 dark:bg-yellow-900/10 dark:ring-yellow-500/20">
          <span className="flex items-center gap-1 text-xs font-semibold uppercase tracking-wider text-yellow-600 dark:text-yellow-400">
            ✦ Shiny
          </span>
          <div className="relative h-36 w-36">
            <Image
              src={shinyImage}
              alt={`${formatName(name)} shiny`}
              fill
              sizes="144px"
              className="object-contain drop-shadow-md"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
