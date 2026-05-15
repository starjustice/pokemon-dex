"use client";

import { createContext, useContext, useState, useCallback, type ReactNode } from "react";

interface SidebarContextValue {
  isDrawerOpen: boolean;
  openDrawer: () => void;
  closeDrawer: () => void;
}

const SidebarContext = createContext<SidebarContextValue>({
  isDrawerOpen: false,
  openDrawer: () => {},
  closeDrawer: () => {},
});

export function useSidebar() {
  return useContext(SidebarContext);
}

export default function SidebarProvider({ children }: { children: ReactNode }) {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const openDrawer = useCallback(() => setIsDrawerOpen(true), []);
  const closeDrawer = useCallback(() => setIsDrawerOpen(false), []);

  return (
    <SidebarContext.Provider value={{ isDrawerOpen, openDrawer, closeDrawer }}>
      {children}
    </SidebarContext.Provider>
  );
}
