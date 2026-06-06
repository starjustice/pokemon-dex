"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { useSidebar } from "./SidebarProvider";
import ThemeToggle from "./ThemeToggle";

const NAV_ITEMS = [
  {
    label: "Pokemon",
    href: "/",
    icon: (
      <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
        <circle cx="12" cy="12" r="10" />
        <circle cx="12" cy="12" r="3" />
        <line x1="2" y1="12" x2="9" y2="12" />
        <line x1="15" y1="12" x2="22" y2="12" />
      </svg>
    ),
  },
  {
    label: "Items",
    href: "/items",
    icon: (
      <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
      </svg>
    ),
  },
  {
    label: "Locations",
    href: "/locations",
    icon: (
      <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
      </svg>
    ),
  },
  {
    label: "Skills",
    href: "/skills",
    icon: (
      <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.455 2.456L21.75 6l-1.036.259a3.375 3.375 0 00-2.455 2.456z"
        />
      </svg>
    ),
  },
] as const;

function NavLinks({ onLinkClick }: { onLinkClick?: () => void }) {
  const pathname = usePathname();

  return (
    <nav className="space-y-1 px-3">
      {NAV_ITEMS.map((item) => {
        const isActive =
          item.href === "/"
            ? pathname === "/"
            : pathname.startsWith(item.href);

        return (
          <Link
            key={item.href}
            href={item.href}
            onClick={onLinkClick}
            className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
              isActive
                ? "bg-blue-50 text-blue-700 dark:bg-blue-950/50 dark:text-blue-300"
                : "text-gray-600 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-gray-100"
            }`}
          >
            <span className={isActive ? "text-blue-500 dark:text-blue-400" : "text-gray-400 dark:text-gray-500"}>
              {item.icon}
            </span>
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}

function SidebarContent({ onLinkClick }: { onLinkClick?: () => void }) {
  return (
    <div className="flex h-full flex-col">
      {/* Logo / Title */}
      <div className="px-6 py-5">
        <Link href="/" onClick={onLinkClick} className="hover:opacity-80 transition-opacity">
          <h1 className="text-xl font-extrabold tracking-tight text-gray-900 dark:text-white">
            Pokemon Dex
          </h1>
        </Link>
        <p className="mt-0.5 text-xs text-gray-500 dark:text-gray-400">
          Encyclopedia
        </p>
      </div>

      {/* Nav Links */}
      <div className="flex-1">
        <NavLinks onLinkClick={onLinkClick} />
      </div>

      {/* Theme Toggle */}
      <div className="border-t border-gray-200 px-6 py-4 dark:border-gray-700">
        <div className="flex items-center justify-between">
          <span className="text-xs font-medium text-gray-500 dark:text-gray-400">Theme</span>
          <ThemeToggle />
        </div>
      </div>
    </div>
  );
}

export default function AppSidebar() {
  const { isDrawerOpen, closeDrawer } = useSidebar();
  const [isClosing, setIsClosing] = useState(false);
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();

  // Auto-close drawer on route change
  useEffect(() => {
    closeDrawer();
  }, [pathname, closeDrawer]);

  // Manage drawer mount/unmount with animation
  useEffect(() => {
    if (isDrawerOpen) {
      setMounted(true);
      setIsClosing(false);
      document.body.style.overflow = "hidden";
    } else if (mounted) {
      setIsClosing(true);
      const timer = setTimeout(() => {
        setMounted(false);
        setIsClosing(false);
      }, 200);
      document.body.style.overflow = "";
      return () => clearTimeout(timer);
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isDrawerOpen, mounted]);

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="fixed left-0 top-0 z-30 hidden h-full w-64 border-r border-gray-200 bg-white lg:flex lg:flex-col dark:border-gray-700 dark:bg-gray-900">
        <SidebarContent />
      </aside>

      {/* Mobile Drawer */}
      {mounted && (
        <div className="fixed inset-0 z-50 lg:hidden">
          {/* Backdrop */}
          <div
            className={`absolute inset-0 bg-black/50 transition-opacity duration-300 ${
              isClosing ? "opacity-0" : "opacity-100"
            }`}
            onClick={closeDrawer}
          />

          {/* Drawer Panel */}
          <aside
            className={`absolute left-0 top-0 h-full w-64 bg-white shadow-xl dark:bg-gray-900 ${
              isClosing ? "animate-drawerOut" : "animate-drawerIn"
            }`}
          >
            {/* Close button */}
            <button
              onClick={closeDrawer}
              className="absolute right-3 top-4 rounded-lg p-1.5 text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800"
              aria-label="Close menu"
            >
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            <SidebarContent onLinkClick={closeDrawer} />
          </aside>
        </div>
      )}
    </>
  );
}
