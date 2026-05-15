"use client";

import { useSidebar } from "./SidebarProvider";

export default function MenuButton() {
  const { openDrawer } = useSidebar();

  return (
    <button
      onClick={openDrawer}
      className="mt-1 rounded-lg p-2 text-gray-500 hover:bg-gray-100 lg:hidden dark:text-gray-400 dark:hover:bg-gray-800"
      aria-label="Open menu"
    >
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
      </svg>
    </button>
  );
}
