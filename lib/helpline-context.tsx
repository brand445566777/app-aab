import React, { createContext, useContext, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Helpline } from "./helplines";

interface HelplineContextType {
  favorites: Helpline[];
  addFavorite: (helpline: Helpline) => Promise<void>;
  removeFavorite: (helplineId: string) => Promise<void>;
  isFavorite: (helplineId: string) => boolean;
  isLoading: boolean;
}

const HelplineContext = createContext<HelplineContextType | undefined>(undefined);

const FAVORITES_KEY = "emergency_helpline_favorites";

export function HelplineProvider({ children }: { children: React.ReactNode }) {
  const [favorites, setFavorites] = useState<Helpline[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Load favorites from AsyncStorage on mount
  useEffect(() => {
    loadFavorites();
  }, []);

  const loadFavorites = async () => {
    try {
      setIsLoading(true);
      const stored = await AsyncStorage.getItem(FAVORITES_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        setFavorites(parsed);
      }
    } catch (error) {
      console.error("Failed to load favorites:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const addFavorite = async (helpline: Helpline) => {
    try {
      const updated = [...favorites, { ...helpline, isFavorite: true }];
      setFavorites(updated);
      await AsyncStorage.setItem(FAVORITES_KEY, JSON.stringify(updated));
    } catch (error) {
      console.error("Failed to add favorite:", error);
    }
  };

  const removeFavorite = async (helplineId: string) => {
    try {
      const updated = favorites.filter((h) => h.id !== helplineId);
      setFavorites(updated);
      await AsyncStorage.setItem(FAVORITES_KEY, JSON.stringify(updated));
    } catch (error) {
      console.error("Failed to remove favorite:", error);
    }
  };

  const isFavorite = (helplineId: string) => {
    return favorites.some((h) => h.id === helplineId);
  };

  return (
    <HelplineContext.Provider
      value={{
        favorites,
        addFavorite,
        removeFavorite,
        isFavorite,
        isLoading,
      }}
    >
      {children}
    </HelplineContext.Provider>
  );
}

export function useHelplines() {
  const context = useContext(HelplineContext);
  if (!context) {
    throw new Error("useHelplines must be used within HelplineProvider");
  }
  return context;
}
