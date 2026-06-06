// Region color configuration for Location Dex

export const REGION_NAMES = [
  "kanto",
  "johto",
  "hoenn",
  "sinnoh",
  "unova",
  "kalos",
  "alola",
  "galar",
  "hisui",
  "paldea",
] as const;

export type RegionName = (typeof REGION_NAMES)[number];

export const REGION_COLORS: Record<
  string,
  {
    label: string;
    bg: string;
    text: string;
    darkBg: string;
    darkText: string;
    activeBg: string;
    activeText: string;
    darkActiveBg: string;
    darkActiveText: string;
    iconBg: string;
    darkIconBg: string;
    accent: string;
  }
> = {
  kanto: {
    label: "Kanto",
    bg: "bg-red-100",
    text: "text-red-700",
    darkBg: "dark:bg-red-900/30",
    darkText: "dark:text-red-300",
    activeBg: "bg-red-500",
    activeText: "text-white",
    darkActiveBg: "dark:bg-red-600",
    darkActiveText: "dark:text-white",
    iconBg: "bg-red-200",
    darkIconBg: "dark:bg-red-900/50",
    accent: "from-red-400 to-red-600",
  },
  johto: {
    label: "Johto",
    bg: "bg-amber-100",
    text: "text-amber-700",
    darkBg: "dark:bg-amber-900/30",
    darkText: "dark:text-amber-300",
    activeBg: "bg-amber-500",
    activeText: "text-white",
    darkActiveBg: "dark:bg-amber-600",
    darkActiveText: "dark:text-white",
    iconBg: "bg-amber-200",
    darkIconBg: "dark:bg-amber-900/50",
    accent: "from-amber-400 to-amber-600",
  },
  hoenn: {
    label: "Hoenn",
    bg: "bg-emerald-100",
    text: "text-emerald-700",
    darkBg: "dark:bg-emerald-900/30",
    darkText: "dark:text-emerald-300",
    activeBg: "bg-emerald-500",
    activeText: "text-white",
    darkActiveBg: "dark:bg-emerald-600",
    darkActiveText: "dark:text-white",
    iconBg: "bg-emerald-200",
    darkIconBg: "dark:bg-emerald-900/50",
    accent: "from-emerald-400 to-emerald-600",
  },
  sinnoh: {
    label: "Sinnoh",
    bg: "bg-indigo-100",
    text: "text-indigo-700",
    darkBg: "dark:bg-indigo-900/30",
    darkText: "dark:text-indigo-300",
    activeBg: "bg-indigo-500",
    activeText: "text-white",
    darkActiveBg: "dark:bg-indigo-600",
    darkActiveText: "dark:text-white",
    iconBg: "bg-indigo-200",
    darkIconBg: "dark:bg-indigo-900/50",
    accent: "from-indigo-400 to-indigo-600",
  },
  unova: {
    label: "Unova",
    bg: "bg-slate-100",
    text: "text-slate-700",
    darkBg: "dark:bg-slate-800/50",
    darkText: "dark:text-slate-300",
    activeBg: "bg-slate-500",
    activeText: "text-white",
    darkActiveBg: "dark:bg-slate-600",
    darkActiveText: "dark:text-white",
    iconBg: "bg-slate-200",
    darkIconBg: "dark:bg-slate-800",
    accent: "from-slate-400 to-slate-600",
  },
  kalos: {
    label: "Kalos",
    bg: "bg-sky-100",
    text: "text-sky-700",
    darkBg: "dark:bg-sky-900/30",
    darkText: "dark:text-sky-300",
    activeBg: "bg-sky-500",
    activeText: "text-white",
    darkActiveBg: "dark:bg-sky-600",
    darkActiveText: "dark:text-white",
    iconBg: "bg-sky-200",
    darkIconBg: "dark:bg-sky-900/50",
    accent: "from-sky-400 to-sky-600",
  },
  alola: {
    label: "Alola",
    bg: "bg-orange-100",
    text: "text-orange-700",
    darkBg: "dark:bg-orange-900/30",
    darkText: "dark:text-orange-300",
    activeBg: "bg-orange-500",
    activeText: "text-white",
    darkActiveBg: "dark:bg-orange-600",
    darkActiveText: "dark:text-white",
    iconBg: "bg-orange-200",
    darkIconBg: "dark:bg-orange-900/50",
    accent: "from-orange-400 to-orange-600",
  },
  galar: {
    label: "Galar",
    bg: "bg-purple-100",
    text: "text-purple-700",
    darkBg: "dark:bg-purple-900/30",
    darkText: "dark:text-purple-300",
    activeBg: "bg-purple-500",
    activeText: "text-white",
    darkActiveBg: "dark:bg-purple-600",
    darkActiveText: "dark:text-white",
    iconBg: "bg-purple-200",
    darkIconBg: "dark:bg-purple-900/50",
    accent: "from-purple-400 to-purple-600",
  },
  hisui: {
    label: "Hisui",
    bg: "bg-teal-100",
    text: "text-teal-700",
    darkBg: "dark:bg-teal-900/30",
    darkText: "dark:text-teal-300",
    activeBg: "bg-teal-500",
    activeText: "text-white",
    darkActiveBg: "dark:bg-teal-600",
    darkActiveText: "dark:text-white",
    iconBg: "bg-teal-200",
    darkIconBg: "dark:bg-teal-900/50",
    accent: "from-teal-400 to-teal-600",
  },
  paldea: {
    label: "Paldea",
    bg: "bg-rose-100",
    text: "text-rose-700",
    darkBg: "dark:bg-rose-900/30",
    darkText: "dark:text-rose-300",
    activeBg: "bg-rose-500",
    activeText: "text-white",
    darkActiveBg: "dark:bg-rose-600",
    darkActiveText: "dark:text-white",
    iconBg: "bg-rose-200",
    darkIconBg: "dark:bg-rose-900/50",
    accent: "from-rose-400 to-rose-600",
  },
};

export const ENCOUNTER_METHOD_ICONS: Record<string, string> = {
  walk: "\u{1F6B6}",
  surf: "\u{1F3C4}",
  "old-rod": "\u{1F3A3}",
  "good-rod": "\u{1F3A3}",
  "super-rod": "\u{1F3A3}",
  "rock-smash": "\u{1FAA8}",
  headbutt: "\u{1F333}",
};

export const ENCOUNTER_METHOD_DEFAULT_ICON = "\u{1F4CD}";

export function getEncounterMethodIcon(method: string): string {
  return ENCOUNTER_METHOD_ICONS[method] ?? ENCOUNTER_METHOD_DEFAULT_ICON;
}

export function getEncounterMethodLabel(method: string): string {
  const labels: Record<string, string> = {
    walk: "Walking",
    surf: "Surfing",
    "old-rod": "Old Rod",
    "good-rod": "Good Rod",
    "super-rod": "Super Rod",
    "rock-smash": "Rock Smash",
    headbutt: "Headbutt",
    "grass-pokemon": "Grass",
    "cave-pokemon": "Cave",
    "yellow-flowers": "Yellow Flowers",
    "purple-flowers": "Purple Flowers",
    "red-flowers": "Red Flowers",
    "rough-terrain": "Rough Terrain",
    "dark-grass": "Dark Grass",
  };
  return labels[method] ?? method.split("-").map((w) => w.charAt(0).toUpperCase() + w.slice(1)).join(" ");
}
