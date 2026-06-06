import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { fetchItemDetail, formatItemName } from "@/lib/items";
import { CATEGORY_GROUP_COLORS } from "@/lib/item-categories";

interface ItemPageProps {
  params: Promise<{ id: string }>;
}

export default async function ItemDetailPage({ params }: ItemPageProps) {
  const { id } = await params;
  const itemId = parseInt(id, 10);
  if (isNaN(itemId)) notFound();

  let item;
  try {
    item = await fetchItemDetail(itemId);
  } catch {
    notFound();
  }

  const colors = CATEGORY_GROUP_COLORS[item.categoryGroup] ?? CATEGORY_GROUP_COLORS["Other"];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Back Link */}
        <Link
          href="/items"
          className="mb-6 inline-flex items-center gap-1 text-sm font-medium text-gray-500 transition-colors hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
        >
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
          Back to Items
        </Link>

        {/* Hero */}
        <div className="mb-8 flex flex-col items-center rounded-2xl border border-gray-200 bg-white p-8 shadow-sm dark:border-gray-700 dark:bg-gray-800">
          <div className="mb-4 flex h-24 w-24 items-center justify-center">
            {item.sprite ? (
              <Image
                src={item.sprite}
                alt={item.name}
                width={96}
                height={96}
                className="pixelated"
                unoptimized
              />
            ) : (
              <svg className="h-16 w-16 text-gray-300 dark:text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
              </svg>
            )}
          </div>

          <h1 className="text-2xl font-extrabold text-gray-900 dark:text-white">
            {formatItemName(item.name)}
          </h1>

          <span className={`mt-2 inline-block rounded-full px-3 py-1 text-xs font-medium ${colors.bg} ${colors.text} ${colors.darkBg} ${colors.darkText}`}>
            {item.categoryGroup}
          </span>

          {item.cost > 0 && (
            <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
              Cost: ₽{item.cost.toLocaleString()}
            </p>
          )}
        </div>

        {/* Effect */}
        {(item.effectShort || item.effectFull) && (
          <section className="mb-6 rounded-xl border border-gray-200 bg-white p-6 dark:border-gray-700 dark:bg-gray-800">
            <h2 className="mb-3 text-lg font-bold text-gray-900 dark:text-white">Effect</h2>
            {item.effectShort && (
              <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
                {item.effectShort}
              </p>
            )}
            {item.effectFull && item.effectFull !== item.effectShort && (
              <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                {item.effectFull}
              </p>
            )}
          </section>
        )}

        {/* Flavor Text */}
        {item.flavorText && (
          <section className="mb-6 rounded-xl border border-gray-200 bg-white p-6 dark:border-gray-700 dark:bg-gray-800">
            <h2 className="mb-3 text-lg font-bold text-gray-900 dark:text-white">Description</h2>
            <p className="text-sm italic text-gray-600 dark:text-gray-400">
              &ldquo;{item.flavorText}&rdquo;
            </p>
          </section>
        )}

        {/* Attributes */}
        {item.attributes.length > 0 && (
          <section className="mb-6 rounded-xl border border-gray-200 bg-white p-6 dark:border-gray-700 dark:bg-gray-800">
            <h2 className="mb-3 text-lg font-bold text-gray-900 dark:text-white">Attributes</h2>
            <div className="flex flex-wrap gap-2">
              {item.attributes.map((attr) => (
                <span
                  key={attr}
                  className="rounded-full bg-gray-100 px-3 py-1 text-xs font-medium capitalize text-gray-700 dark:bg-gray-700 dark:text-gray-300"
                >
                  {attr.replace(/-/g, " ")}
                </span>
              ))}
            </div>
          </section>
        )}

        {/* Held By Pokemon */}
        {item.heldByPokemon.length > 0 && (
          <section className="mb-6 rounded-xl border border-gray-200 bg-white p-6 dark:border-gray-700 dark:bg-gray-800">
            <h2 className="mb-3 text-lg font-bold text-gray-900 dark:text-white">Held by Pokemon</h2>
            <div className="flex flex-wrap gap-2">
              {item.heldByPokemon.map((pokemon) => (
                <Link
                  key={pokemon.id}
                  href={`/pokemon/${pokemon.id}`}
                  className="rounded-full bg-blue-50 px-3 py-1 text-xs font-medium capitalize text-blue-700 transition-colors hover:bg-blue-100 dark:bg-blue-900/30 dark:text-blue-300 dark:hover:bg-blue-900/50"
                >
                  {pokemon.name.replace(/-/g, " ")}
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* Fling Power */}
        {item.flingPower && (
          <section className="mb-6 rounded-xl border border-gray-200 bg-white p-6 dark:border-gray-700 dark:bg-gray-800">
            <h2 className="mb-3 text-lg font-bold text-gray-900 dark:text-white">Fling</h2>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Power: <span className="font-semibold text-gray-900 dark:text-white">{item.flingPower}</span>
            </p>
          </section>
        )}
      </div>
    </div>
  );
}
