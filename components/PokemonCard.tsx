"use client";

import Image from "next/image";
import Link from "next/link";
import { TYPE_COLORS, TYPE_CARD_GRADIENTS } from "@/lib/type-colors";
import type { Pokemon } from "@/lib/pokemon";

function formatNumber(id: number): string {
  return `#${id.toString().padStart(4, "0")}`;
}

function formatName(name: string): string {
  return name
    .split("-")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
}

export default function PokemonCard({ pokemon }: { pokemon: Pokemon }) {
  const primaryType = pokemon.types[0]?.name ?? "normal";
  const gradient = TYPE_CARD_GRADIENTS[primaryType] ?? "from-gray-200/20";

  return (
    <Link
      href={`/pokemon/${pokemon.id}`}
      className={`block group relative overflow-hidden rounded-2xl border border-gray-200 bg-gradient-to-br ${gradient} to-white shadow-sm transition-all duration-300 hover:shadow-lg hover:-translate-y-1 dark:border-gray-700 dark:to-gray-900`}
    >
      {/* Number badge */}
      <span className="absolute top-3 right-3 text-sm font-mono font-bold text-gray-400 dark:text-gray-500">
        {formatNumber(pokemon.id)}
      </span>

      {/* Image */}
      <div className="flex items-center justify-center pt-6 pb-2 px-4">
        <div className="relative h-32 w-32">
          <Image
            src={pokemon.image || pokemon.fallbackImage}
            alt={pokemon.name}
            fill
            sizes="128px"
            className="object-contain drop-shadow-md transition-transform duration-300 group-hover:scale-110"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              if (pokemon.fallbackImage && target.src !== pokemon.fallbackImage) {
                target.src = pokemon.fallbackImage;
              }
            }}
          />
        </div>
      </div>

      {/* Info */}
      <div className="px-4 pb-4 space-y-2">
        {/* Name */}
        <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100 truncate">
          {formatName(pokemon.name)}
        </h3>

        {/* Types */}
        <div className="flex gap-1.5 flex-wrap">
          {pokemon.types.map((type) => {
            const colors = TYPE_COLORS[type.name] ?? {
              bg: "bg-gray-400",
              text: "text-white",
            };
            return (
              <span
                key={type.name}
                className={`${colors.bg} ${colors.text} text-xs font-semibold px-2.5 py-0.5 rounded-full capitalize`}
              >
                {type.name}
              </span>
            );
          })}
        </div>

        {/* Abilities */}
        <div className="text-xs text-gray-500 dark:text-gray-400">
          <span className="font-medium text-gray-600 dark:text-gray-300">
            Abilities:{" "}
          </span>
          {pokemon.abilities
            .filter((a) => !a.isHidden)
            .map((a) =>
              a.name
                .split("-")
                .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
                .join(" ")
            )
            .join(", ")}
        </div>

        {/* Generation */}
        <div className="text-xs text-gray-400 dark:text-gray-500 font-medium">
          {pokemon.generation}
        </div>
      </div>
    </Link>
  );
}
