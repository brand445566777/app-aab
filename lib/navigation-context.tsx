import React, { createContext, useContext, useState } from "react";

interface NavigationContextType {
  activeRegion: string;
  setActiveRegion: (region: string) => void;
}

const NavigationContext = createContext<NavigationContextType | undefined>(undefined);

export function NavigationProvider({ children }: { children: React.ReactNode }) {
  const [activeRegion, setActiveRegion] = useState("home");

  return (
    <NavigationContext.Provider value={{ activeRegion, setActiveRegion }}>
      {children}
    </NavigationContext.Provider>
  );
}

export function useNavigation() {
  const context = useContext(NavigationContext);
  if (!context) {
    throw new Error("useNavigation must be used within NavigationProvider");
  }
  return context;
}
