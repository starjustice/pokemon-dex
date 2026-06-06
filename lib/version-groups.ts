// Version-group metadata for Pokemon games

export interface VersionGroupMeta {
  name: string;
  displayName: string;
  shortLabel: string;
  generation: string;
}

export const VERSION_GROUP_META: Record<string, VersionGroupMeta> = {
  "red-blue": { name: "red-blue", displayName: "Red & Blue", shortLabel: "R/B", generation: "generation-i" },
  yellow: { name: "yellow", displayName: "Yellow", shortLabel: "Y", generation: "generation-i" },
  "gold-silver": { name: "gold-silver", displayName: "Gold & Silver", shortLabel: "G/S", generation: "generation-ii" },
  crystal: { name: "crystal", displayName: "Crystal", shortLabel: "C", generation: "generation-ii" },
  "ruby-sapphire": { name: "ruby-sapphire", displayName: "Ruby & Sapphire", shortLabel: "R/S", generation: "generation-iii" },
  emerald: { name: "emerald", displayName: "Emerald", shortLabel: "E", generation: "generation-iii" },
  "firered-leafgreen": { name: "firered-leafgreen", displayName: "FireRed & LeafGreen", shortLabel: "FR/LG", generation: "generation-iii" },
  "diamond-pearl": { name: "diamond-pearl", displayName: "Diamond & Pearl", shortLabel: "D/P", generation: "generation-iv" },
  platinum: { name: "platinum", displayName: "Platinum", shortLabel: "Pt", generation: "generation-iv" },
  "heartgold-soulsilver": { name: "heartgold-soulsilver", displayName: "HeartGold & SoulSilver", shortLabel: "HG/SS", generation: "generation-iv" },
  "black-white": { name: "black-white", displayName: "Black & White", shortLabel: "B/W", generation: "generation-v" },
  "black-2-white-2": { name: "black-2-white-2", displayName: "Black 2 & White 2", shortLabel: "B2/W2", generation: "generation-v" },
  "x-y": { name: "x-y", displayName: "X & Y", shortLabel: "X/Y", generation: "generation-vi" },
  "omega-ruby-alpha-sapphire": { name: "omega-ruby-alpha-sapphire", displayName: "Omega Ruby & Alpha Sapphire", shortLabel: "OR/AS", generation: "generation-vi" },
  "sun-moon": { name: "sun-moon", displayName: "Sun & Moon", shortLabel: "S/M", generation: "generation-vii" },
  "ultra-sun-ultra-moon": { name: "ultra-sun-ultra-moon", displayName: "Ultra Sun & Ultra Moon", shortLabel: "US/UM", generation: "generation-vii" },
  "lets-go-pikachu-lets-go-eevee": { name: "lets-go-pikachu-lets-go-eevee", displayName: "Let's Go Pikachu & Eevee", shortLabel: "LGPE", generation: "generation-vii" },
  "sword-shield": { name: "sword-shield", displayName: "Sword & Shield", shortLabel: "Sw/Sh", generation: "generation-viii" },
  "the-isle-of-armor": { name: "the-isle-of-armor", displayName: "The Isle of Armor", shortLabel: "IoA", generation: "generation-viii" },
  "the-crown-tundra": { name: "the-crown-tundra", displayName: "The Crown Tundra", shortLabel: "CT", generation: "generation-viii" },
  "brilliant-diamond-and-shining-pearl": { name: "brilliant-diamond-and-shining-pearl", displayName: "Brilliant Diamond & Shining Pearl", shortLabel: "BD/SP", generation: "generation-viii" },
  "legends-arceus": { name: "legends-arceus", displayName: "Legends: Arceus", shortLabel: "PLA", generation: "generation-viii" },
  "scarlet-violet": { name: "scarlet-violet", displayName: "Scarlet & Violet", shortLabel: "S/V", generation: "generation-ix" },
  "the-teal-mask": { name: "the-teal-mask", displayName: "The Teal Mask", shortLabel: "TM", generation: "generation-ix" },
  "the-indigo-disk": { name: "the-indigo-disk", displayName: "The Indigo Disk", shortLabel: "ID", generation: "generation-ix" },
  colosseum: { name: "colosseum", displayName: "Colosseum", shortLabel: "Col", generation: "generation-iii" },
  xd: { name: "xd", displayName: "XD: Gale of Darkness", shortLabel: "XD", generation: "generation-iii" },
  "red-green": { name: "red-green", displayName: "Red & Green (JP)", shortLabel: "R/G", generation: "generation-i" },
  "blue-japan": { name: "blue-japan", displayName: "Blue (JP)", shortLabel: "B-JP", generation: "generation-i" },
  "legends-z-a": { name: "legends-z-a", displayName: "Legends: Z-A", shortLabel: "LZA", generation: "generation-ix" },
  "mega-dimension": { name: "mega-dimension", displayName: "Mega Dimension", shortLabel: "MD", generation: "generation-ix" },
  champions: { name: "champions", displayName: "Champions", shortLabel: "Ch", generation: "generation-ix" },
};

export function getVersionGroupMeta(name: string): VersionGroupMeta {
  if (VERSION_GROUP_META[name]) return VERSION_GROUP_META[name];
  // Fallback: title-case
  const displayName = name
    .split("-")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
  return {
    name,
    displayName,
    shortLabel: displayName,
    generation: "generation-ix",
  };
}

export const GENERATION_ORDER = [
  "generation-i",
  "generation-ii",
  "generation-iii",
  "generation-iv",
  "generation-v",
  "generation-vi",
  "generation-vii",
  "generation-viii",
  "generation-ix",
] as const;

export const GENERATION_LABELS: Record<string, string> = {
  "generation-i": "Generation I",
  "generation-ii": "Generation II",
  "generation-iii": "Generation III",
  "generation-iv": "Generation IV",
  "generation-v": "Generation V",
  "generation-vi": "Generation VI",
  "generation-vii": "Generation VII",
  "generation-viii": "Generation VIII",
  "generation-ix": "Generation IX",
};

export const GENERATION_COLORS: Record<
  string,
  {
    bg: string;
    text: string;
    darkBg: string;
    darkText: string;
    activeBg: string;
    activeText: string;
    darkActiveBg: string;
    darkActiveText: string;
  }
> = {
  "generation-i": {
    bg: "bg-red-100", text: "text-red-700",
    darkBg: "dark:bg-red-900/30", darkText: "dark:text-red-300",
    activeBg: "bg-red-500", activeText: "text-white",
    darkActiveBg: "dark:bg-red-600", darkActiveText: "dark:text-white",
  },
  "generation-ii": {
    bg: "bg-amber-100", text: "text-amber-700",
    darkBg: "dark:bg-amber-900/30", darkText: "dark:text-amber-300",
    activeBg: "bg-amber-500", activeText: "text-white",
    darkActiveBg: "dark:bg-amber-600", darkActiveText: "dark:text-white",
  },
  "generation-iii": {
    bg: "bg-emerald-100", text: "text-emerald-700",
    darkBg: "dark:bg-emerald-900/30", darkText: "dark:text-emerald-300",
    activeBg: "bg-emerald-500", activeText: "text-white",
    darkActiveBg: "dark:bg-emerald-600", darkActiveText: "dark:text-white",
  },
  "generation-iv": {
    bg: "bg-indigo-100", text: "text-indigo-700",
    darkBg: "dark:bg-indigo-900/30", darkText: "dark:text-indigo-300",
    activeBg: "bg-indigo-500", activeText: "text-white",
    darkActiveBg: "dark:bg-indigo-600", darkActiveText: "dark:text-white",
  },
  "generation-v": {
    bg: "bg-slate-100", text: "text-slate-700",
    darkBg: "dark:bg-slate-800/50", darkText: "dark:text-slate-300",
    activeBg: "bg-slate-500", activeText: "text-white",
    darkActiveBg: "dark:bg-slate-600", darkActiveText: "dark:text-white",
  },
  "generation-vi": {
    bg: "bg-sky-100", text: "text-sky-700",
    darkBg: "dark:bg-sky-900/30", darkText: "dark:text-sky-300",
    activeBg: "bg-sky-500", activeText: "text-white",
    darkActiveBg: "dark:bg-sky-600", darkActiveText: "dark:text-white",
  },
  "generation-vii": {
    bg: "bg-orange-100", text: "text-orange-700",
    darkBg: "dark:bg-orange-900/30", darkText: "dark:text-orange-300",
    activeBg: "bg-orange-500", activeText: "text-white",
    darkActiveBg: "dark:bg-orange-600", darkActiveText: "dark:text-white",
  },
  "generation-viii": {
    bg: "bg-purple-100", text: "text-purple-700",
    darkBg: "dark:bg-purple-900/30", darkText: "dark:text-purple-300",
    activeBg: "bg-purple-500", activeText: "text-white",
    darkActiveBg: "dark:bg-purple-600", darkActiveText: "dark:text-white",
  },
  "generation-ix": {
    bg: "bg-rose-100", text: "text-rose-700",
    darkBg: "dark:bg-rose-900/30", darkText: "dark:text-rose-300",
    activeBg: "bg-rose-500", activeText: "text-white",
    darkActiveBg: "dark:bg-rose-600", darkActiveText: "dark:text-white",
  },
};

export function getGenerationColors(gen: string) {
  return GENERATION_COLORS[gen] ?? GENERATION_COLORS["generation-ix"];
}
