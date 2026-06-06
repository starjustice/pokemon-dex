import SiteHeader from "@/components/SiteHeader";
import ItemGrid from "@/components/ItemGrid";

export default function ItemsPage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <SiteHeader subtitle="Browse Pokemon items" />
        <ItemGrid />
      </div>
    </div>
  );
}
