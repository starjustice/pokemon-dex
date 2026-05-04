import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { fetchPokemonDetail } from "@/lib/pokemon";
import { TYPE_COLORS } from "@/lib/type-colors";
import HeroImage from "@/components/HeroImage";
import AnimatedSprite from "@/components/AnimatedSprite";
import StatBar from "@/components/StatBar";
import EvolutionChain from "@/components/EvolutionChain";
import AbilityList from "@/components/AbilityList";
import EncounterList from "@/components/EncounterList";
import SiteHeader from "@/components/SiteHeader";
import CryButton from "@/components/CryButton";
import DexVoice from "@/components/DexVoice";
import MegaEvolution from "@/components/MegaEvolution";
import ShinyComparison from "@/components/ShinyComparison";
import DynamaxSection from "@/components/DynamaxSection";

function formatName(name: string): string {
  return name
    .split("-")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
}

function formatNumber(id: number): string {
  return `#${id.toString().padStart(4, "0")}`;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const numId = parseInt(id, 10);
  if (isNaN(numId)) return { title: "Pokemon Not Found" };

  try {
    const pokemon = await fetchPokemonDetail(numId);
    return {
      title: `${formatName(pokemon.name)} ${formatNumber(pokemon.id)} - Pokemon Dex`,
      description: pokemon.flavorText || `Details for ${formatName(pokemon.name)}`,
    };
  } catch {
    return { title: "Pokemon Not Found" };
  }
}

export default async function PokemonDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const numId = parseInt(id, 10);

  if (isNaN(numId) || numId < 1 || numId > 1025) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-950 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Pokemon Not Found
          </h1>
          <Link
            href="/"
            className="mt-4 inline-block text-blue-600 hover:underline dark:text-blue-400"
          >
            Back to Pokedex
          </Link>
        </div>
      </div>
    );
  }

  const pokemon = await fetchPokemonDetail(numId);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
        <SiteHeader backHref="/" backLabel="Back to Pokédex" />

        {/* Hero section */}
        <div
          className="mb-8 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-900 animate-slideUp"
          style={{ animationDelay: "0ms" }}
        >
          <div className="flex flex-col items-center gap-6 sm:flex-row">
            {/* Image */}
            <div className="flex flex-col items-center gap-3 shrink-0">
              <HeroImage frontSrc={pokemon.image} backSrc={pokemon.backImage} alt={pokemon.name}>
                <div className="relative h-48 w-48">
                  <Image
                    src={pokemon.image}
                    alt={pokemon.name}
                    fill
                    sizes="192px"
                    className="object-contain drop-shadow-lg"
                    priority
                  />
                </div>
              </HeroImage>
              <AnimatedSprite src={pokemon.animatedSprite} alt={pokemon.name} />
            </div>

            {/* Basic info */}
            <div className="flex-1 text-center sm:text-left">
              <p className="text-sm font-mono font-bold text-gray-400 dark:text-gray-500">
                {formatNumber(pokemon.id)}
              </p>
              <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white">
                {formatName(pokemon.name)}
              </h1>
              {pokemon.genus && (
                <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                  {pokemon.genus}
                </p>
              )}

              {/* Types */}
              <div className="mt-3 flex flex-wrap justify-center gap-2 sm:justify-start">
                {pokemon.types.map((type, i) => {
                  const colors = TYPE_COLORS[type.name] ?? { bg: "bg-gray-400", text: "text-white" };
                  return (
                    <span
                      key={type.name}
                      className={`${colors.bg} ${colors.text} rounded-full px-3 py-1 text-sm font-semibold capitalize animate-popIn`}
                      style={{ animationDelay: `${80 + i * 80}ms` }}
                    >
                      {type.name}
                    </span>
                  );
                })}
              </div>

              {/* Physical */}
              <div className="mt-4 flex justify-center gap-6 sm:justify-start">
                <div>
                  <span className="text-xs font-bold uppercase text-gray-500 dark:text-gray-400">
                    Height
                  </span>
                  <p className="text-sm font-semibold text-gray-900 dark:text-white">
                    {(pokemon.height / 10).toFixed(1)} m
                  </p>
                </div>
                <div>
                  <span className="text-xs font-bold uppercase text-gray-500 dark:text-gray-400">
                    Weight
                  </span>
                  <p className="text-sm font-semibold text-gray-900 dark:text-white">
                    {(pokemon.weight / 10).toFixed(1)} kg
                  </p>
                </div>
                <div>
                  <span className="text-xs font-bold uppercase text-gray-500 dark:text-gray-400">
                    Generation
                  </span>
                  <p className="text-sm font-semibold text-gray-900 dark:text-white">
                    {pokemon.generation}
                  </p>
                </div>
              </div>

              {/* Audio controls */}
              <div className="mt-4 flex justify-center gap-2 sm:justify-start">
                <CryButton cryUrl={pokemon.cryUrl} cryLegacyUrl={pokemon.cryLegacyUrl} />
                <DexVoice name={pokemon.name} genus={pokemon.genus} flavorText={pokemon.flavorText} />
              </div>

              {/* Flavor text */}
              {pokemon.flavorText && (
                <p className="mt-4 text-sm italic text-gray-600 dark:text-gray-400">
                  &ldquo;{pokemon.flavorText}&rdquo;
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Stats */}
        <div
          className="mb-8 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-900 animate-slideUp"
          style={{ animationDelay: "100ms" }}
        >
          <h2 className="mb-4 text-lg font-bold text-gray-900 dark:text-white">
            Base Stats
          </h2>
          <div className="space-y-3">
            {pokemon.stats.map((stat, i) => (
              <StatBar key={stat.name} stat={stat} index={i} />
            ))}
          </div>
          <div className="mt-3 border-t border-gray-100 pt-3 dark:border-gray-800">
            <div className="flex items-center gap-3">
              <span className="w-20 text-sm font-medium text-gray-600 dark:text-gray-400">
                Total
              </span>
              <span className="w-8 text-right text-sm font-bold text-gray-900 dark:text-gray-100">
                {pokemon.stats.reduce((sum, s) => sum + s.value, 0)}
              </span>
            </div>
          </div>
        </div>

        {/* Shiny Form */}
        {pokemon.shinyImage && (
          <div
            className="mb-8 rounded-2xl border border-yellow-200/60 bg-white p-6 shadow-sm dark:border-yellow-700/30 dark:bg-gray-900 animate-slideUp"
            style={{ animationDelay: "200ms" }}
          >
            <ShinyComparison
              name={pokemon.name}
              normalImage={pokemon.image}
              shinyImage={pokemon.shinyImage}
            />
          </div>
        )}

        {/* Evolution Chain */}
        <div
          className="mb-8 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-900 animate-slideUp"
          style={{ animationDelay: "300ms" }}
        >
          <EvolutionChain chain={pokemon.evolutionChain} />
        </div>

        {/* Mega Evolution */}
        {pokemon.megaEvolutions.length > 0 && (
          <div
            className="mb-8 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-900 animate-slideUp"
            style={{ animationDelay: "400ms" }}
          >
            <MegaEvolution
              baseName={pokemon.name}
              baseImage={pokemon.image}
              baseTypes={pokemon.types}
              megaEvolutions={pokemon.megaEvolutions}
            />
          </div>
        )}

        {/* Dynamax / Gigantamax */}
        <div
          className="mb-8 rounded-2xl border border-red-200/60 bg-white p-6 shadow-sm dark:border-red-800/30 dark:bg-gray-900 animate-slideUp"
          style={{ animationDelay: "450ms" }}
        >
          <DynamaxSection
            name={pokemon.name}
            types={pokemon.types}
            canGmax={pokemon.canGmax}
            gmaxImage={pokemon.gmaxImage}
            baseImage={pokemon.image}
            gmaxMove={pokemon.gmaxMove}
          />
        </div>

        {/* Abilities */}
        <div
          className="mb-8 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-900 animate-slideUp"
          style={{ animationDelay: "500ms" }}
        >
          <AbilityList abilities={pokemon.abilityDetails} />
        </div>

        {/* Encounters */}
        <div
          className="mb-8 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-900 animate-slideUp"
          style={{ animationDelay: "600ms" }}
        >
          <EncounterList encounters={pokemon.encounters} />
        </div>
      </div>
    </div>
  );
}
