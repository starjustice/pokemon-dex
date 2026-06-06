import { Suspense } from "react";
import SiteHeader from "@/components/SiteHeader";
import LocationGrid from "@/components/LocationGrid";

export default function LocationsPage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <SiteHeader subtitle="Browse Pokemon game locations" />
        <Suspense fallback={<div className="py-8 text-center text-gray-500 dark:text-gray-400">Loading...</div>}>
          <LocationGrid />
        </Suspense>
      </div>
    </div>
  );
}
