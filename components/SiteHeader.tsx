import Link from "next/link";
import ThemeToggle from "@/components/ThemeToggle";

interface SiteHeaderProps {
  subtitle?: string;
  backHref?: string;
  backLabel?: string;
}

export default function SiteHeader({ subtitle, backHref, backLabel }: SiteHeaderProps) {
  return (
    <header className="mb-8 flex items-start justify-between">
      <div>
        <div className="flex items-center gap-3">
          {backHref && (
            <Link
              href={backHref}
              className="inline-flex items-center gap-1 text-sm font-medium text-gray-500 transition-colors hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
            >
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
              </svg>
              {backLabel ?? "Back"}
            </Link>
          )}
        </div>
        <Link href="/" scroll={false} className="hover:opacity-80 transition-opacity">
          <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 dark:text-white">
            Pokemon Dex
          </h1>
        </Link>
        {subtitle && (
          <p className="mt-2 text-lg text-gray-500 dark:text-gray-400">
            {subtitle}
          </p>
        )}
      </div>
      <ThemeToggle />
    </header>
  );
}
