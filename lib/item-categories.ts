// Category group mapping: raw API category → user-friendly super-category

export const ITEM_CATEGORY_GROUPS: Record<string, string> = {
  // Poke Balls
  "standard-balls": "Poke Balls",
  "special-balls": "Poke Balls",
  "apricorn-balls": "Poke Balls",
  // Medicine
  medicine: "Medicine",
  healing: "Medicine",
  revival: "Medicine",
  "status-cures": "Medicine",
  "pp-recovery": "Medicine",
  vitamins: "Medicine",
  // Held Items
  "held-items": "Held Items",
  choice: "Held Items",
  "type-enhancement": "Held Items",
  plates: "Held Items",
  "mega-stones": "Held Items",
  "z-crystals": "Held Items",
  memories: "Held Items",
  // Evolution
  evolution: "Evolution",
  // TMs & Mail
  "all-machines": "TMs",
  "all-mail": "TMs",
  // Berries
  "in-a-pinch": "Berries",
  "picky-healing": "Berries",
  "type-protection": "Berries",
  "baking-only": "Berries",
  // Battle
  "stat-boosts": "Battle",
  flutes: "Battle",
  "bad-held-items": "Battle",
  // Other (everything else)
  loot: "Other",
  collectibles: "Other",
  "event-items": "Other",
  gameplay: "Other",
  training: "Other",
  "nature-mints": "Other",
  "effort-training": "Other",
  "dex-completion": "Other",
  "curry-ingredients": "Other",
  "sandwich-ingredients": "Other",
  picnic: "Other",
  "tm-materials": "Other",
  "tera-shard": "Other",
  "species-candies": "Other",
  dynamax: "Other",
  "data-cards": "Other",
  plot: "Other",
  unused: "Other",
  "jewels-of-life": "Other",
  miracle: "Other",
  "catching-bonus": "Other",
  "spelling": "Other",
};

export function getCategoryGroup(apiCategoryName: string): string {
  return ITEM_CATEGORY_GROUPS[apiCategoryName] || "Other";
}

export const CATEGORY_GROUP_NAMES = [
  "Poke Balls",
  "Medicine",
  "Held Items",
  "Evolution",
  "TMs",
  "Berries",
  "Battle",
  "Other",
] as const;

export const CATEGORY_GROUP_ICONS: Record<string, string> = {
  "Poke Balls": "🔴",
  Medicine: "💊",
  "Held Items": "💎",
  Evolution: "⚡",
  TMs: "💿",
  Berries: "🫐",
  Battle: "⚔️",
  Other: "📦",
};

export const CATEGORY_GROUP_COLORS: Record<string, {
  bg: string; text: string; darkBg: string; darkText: string;
  activeBg: string; activeText: string; darkActiveBg: string; darkActiveText: string;
}> = {
  "Poke Balls": { bg: "bg-red-100", text: "text-red-700", darkBg: "dark:bg-red-900/30", darkText: "dark:text-red-300", activeBg: "bg-red-500", activeText: "text-white", darkActiveBg: "dark:bg-red-600", darkActiveText: "dark:text-white" },
  Medicine: { bg: "bg-green-100", text: "text-green-700", darkBg: "dark:bg-green-900/30", darkText: "dark:text-green-300", activeBg: "bg-green-500", activeText: "text-white", darkActiveBg: "dark:bg-green-600", darkActiveText: "dark:text-white" },
  "Held Items": { bg: "bg-purple-100", text: "text-purple-700", darkBg: "dark:bg-purple-900/30", darkText: "dark:text-purple-300", activeBg: "bg-purple-500", activeText: "text-white", darkActiveBg: "dark:bg-purple-600", darkActiveText: "dark:text-white" },
  Evolution: { bg: "bg-yellow-100", text: "text-yellow-700", darkBg: "dark:bg-yellow-900/30", darkText: "dark:text-yellow-300", activeBg: "bg-yellow-500", activeText: "text-white", darkActiveBg: "dark:bg-yellow-600", darkActiveText: "dark:text-white" },
  TMs: { bg: "bg-blue-100", text: "text-blue-700", darkBg: "dark:bg-blue-900/30", darkText: "dark:text-blue-300", activeBg: "bg-blue-500", activeText: "text-white", darkActiveBg: "dark:bg-blue-600", darkActiveText: "dark:text-white" },
  Berries: { bg: "bg-pink-100", text: "text-pink-700", darkBg: "dark:bg-pink-900/30", darkText: "dark:text-pink-300", activeBg: "bg-pink-500", activeText: "text-white", darkActiveBg: "dark:bg-pink-600", darkActiveText: "dark:text-white" },
  Battle: { bg: "bg-orange-100", text: "text-orange-700", darkBg: "dark:bg-orange-900/30", darkText: "dark:text-orange-300", activeBg: "bg-orange-500", activeText: "text-white", darkActiveBg: "dark:bg-orange-600", darkActiveText: "dark:text-white" },
  Other: { bg: "bg-gray-100", text: "text-gray-700", darkBg: "dark:bg-gray-800", darkText: "dark:text-gray-300", activeBg: "bg-gray-600", activeText: "text-white", darkActiveBg: "dark:bg-gray-500", darkActiveText: "dark:text-white" },
};
