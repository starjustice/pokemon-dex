import { REGION_COLORS } from "@/lib/region-map";

export default function RegionIcon({ region }: { region: string }) {
  const color = REGION_COLORS[region] ?? REGION_COLORS.Other;

  return (
    <span
      className={`${color} inline-flex h-7 w-7 items-center justify-center rounded-lg text-xs font-bold text-white shadow-sm`}
    >
      {region.charAt(0)}
    </span>
  );
}
