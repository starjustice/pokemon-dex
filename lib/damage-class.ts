export interface DamageClassConfig {
  icon: string;
  label: string;
  bg: string;
  text: string;
  darkBg: string;
  darkText: string;
  activeBg: string;
  activeText: string;
  darkActiveBg: string;
  darkActiveText: string;
  border: string;
}

export const DAMAGE_CLASS_CONFIG: Record<string, DamageClassConfig> = {
  physical: {
    icon: "⚔️",
    label: "Physical",
    bg: "bg-orange-100",
    text: "text-orange-700",
    darkBg: "dark:bg-orange-900/30",
    darkText: "dark:text-orange-300",
    activeBg: "bg-orange-500",
    activeText: "text-white",
    darkActiveBg: "dark:bg-orange-600",
    darkActiveText: "dark:text-white",
    border: "border-l-orange-400",
  },
  special: {
    icon: "✦",
    label: "Special",
    bg: "bg-indigo-100",
    text: "text-indigo-700",
    darkBg: "dark:bg-indigo-900/30",
    darkText: "dark:text-indigo-300",
    activeBg: "bg-indigo-500",
    activeText: "text-white",
    darkActiveBg: "dark:bg-indigo-600",
    darkActiveText: "dark:text-white",
    border: "border-l-indigo-400",
  },
  status: {
    icon: "◉",
    label: "Status",
    bg: "bg-emerald-100",
    text: "text-emerald-700",
    darkBg: "dark:bg-emerald-900/30",
    darkText: "dark:text-emerald-300",
    activeBg: "bg-emerald-500",
    activeText: "text-white",
    darkActiveBg: "dark:bg-emerald-600",
    darkActiveText: "dark:text-white",
    border: "border-l-emerald-400",
  },
};

export const DAMAGE_CLASS_NAMES = ["physical", "special", "status"] as const;
