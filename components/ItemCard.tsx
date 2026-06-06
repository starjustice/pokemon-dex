import Link from "next/link";
import Image from "next/image";
import { type ItemBasic, formatItemName } from "@/lib/items";
import { CATEGORY_GROUP_COLORS } from "@/lib/item-categories";

interface ItemCardProps {
  item: ItemBasic;
}

export default function ItemCard({ item }: ItemCardProps) {
  const colors = CATEGORY_GROUP_COLORS[item.categoryGroup] ?? CATEGORY_GROUP_COLORS["Other"];

  return (
    <Link
      href={`/items/${item.id}`}
      className="group flex flex-col items-center rounded-xl border border-gray-200 bg-white p-4 shadow-sm transition-all hover:shadow-md hover:-translate-y-0.5 dark:border-gray-700 dark:bg-gray-800"
    >
      {/* Sprite */}
      <div className="mb-3 flex h-16 w-16 items-center justify-center">
        {item.sprite ? (
          <Image
            src={item.sprite}
            alt={item.name}
            width={48}
            height={48}
            className="pixelated"
            unoptimized
          />
        ) : (
          <svg className="h-10 w-10 text-gray-300 dark:text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
          </svg>
        )}
      </div>

      {/* Name */}
      <p className="text-center text-sm font-semibold text-gray-900 group-hover:text-blue-600 dark:text-white dark:group-hover:text-blue-400">
        {formatItemName(item.name)}
      </p>

      {/* Category Badge */}
      <span className={`mt-2 inline-block rounded-full px-2 py-0.5 text-[10px] font-medium ${colors.bg} ${colors.text} ${colors.darkBg} ${colors.darkText}`}>
        {item.categoryGroup}
      </span>

      {/* Cost */}
      {item.cost > 0 && (
        <p className="mt-1.5 text-xs text-gray-500 dark:text-gray-400">
          ₽{item.cost.toLocaleString()}
        </p>
      )}
    </Link>
  );
}
