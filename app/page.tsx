import PokemonGrid from "@/components/PokemonGrid";
import SiteHeader from "@/components/SiteHeader";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <SiteHeader subtitle="Browse and search through all Pokemon" />
        <PokemonGrid />
      </div>
    </div>
  );
}
