const VERSION_TO_REGION: Record<string, string> = {
  // Kanto
  red: "Kanto",
  blue: "Kanto",
  yellow: "Kanto",
  firered: "Kanto",
  leafgreen: "Kanto",
  "lets-go-pikachu": "Kanto",
  "lets-go-eevee": "Kanto",
  // Johto
  gold: "Johto",
  silver: "Johto",
  crystal: "Johto",
  heartgold: "Johto",
  soulsilver: "Johto",
  // Hoenn
  ruby: "Hoenn",
  sapphire: "Hoenn",
  emerald: "Hoenn",
  "omega-ruby": "Hoenn",
  "alpha-sapphire": "Hoenn",
  // Sinnoh
  diamond: "Sinnoh",
  pearl: "Sinnoh",
  platinum: "Sinnoh",
  "brilliant-diamond": "Sinnoh",
  "shining-pearl": "Sinnoh",
  // Unova
  black: "Unova",
  white: "Unova",
  "black-2": "Unova",
  "white-2": "Unova",
  // Kalos
  x: "Kalos",
  y: "Kalos",
  // Alola
  sun: "Alola",
  moon: "Alola",
  "ultra-sun": "Alola",
  "ultra-moon": "Alola",
  // Galar
  sword: "Galar",
  shield: "Galar",
  // Paldea
  scarlet: "Paldea",
  violet: "Paldea",
  // Legends
  "legends-arceus": "Hisui",
};

export function getRegionForVersion(version: string): string {
  return VERSION_TO_REGION[version] ?? "Other";
}

export const REGION_COLORS: Record<string, string> = {
  Kanto: "bg-red-500",
  Johto: "bg-amber-500",
  Hoenn: "bg-emerald-500",
  Sinnoh: "bg-blue-500",
  Unova: "bg-gray-700",
  Kalos: "bg-pink-500",
  Alola: "bg-yellow-500",
  Galar: "bg-purple-500",
  Paldea: "bg-orange-500",
  Hisui: "bg-teal-500",
  Other: "bg-gray-400",
};
