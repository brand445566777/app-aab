import React, { createContext, useContext, useState, useCallback } from "react";

export type HelplineCategory =
  | "emergency"
  | "rescue"
  | "fire"
  | "police"
  | "security"
  | "transport"
  | "health"
  | "utility"
  | "government"
  | "welfare";

interface CategoryFilterContextType {
  selectedCategories: HelplineCategory[];
  toggleCategory: (category: HelplineCategory) => void;
  clearFilters: () => void;
  isFilterActive: boolean;
}

const CategoryFilterContext = createContext<CategoryFilterContextType | undefined>(undefined);

export function CategoryFilterProvider({ children }: { children: React.ReactNode }) {
  const [selectedCategories, setSelectedCategories] = useState<HelplineCategory[]>([]);

  const toggleCategory = useCallback((category: HelplineCategory) => {
    setSelectedCategories((prev) => {
      if (prev.includes(category)) {
        return prev.filter((c) => c !== category);
      } else {
        return [...prev, category];
      }
    });
  }, []);

  const clearFilters = useCallback(() => {
    setSelectedCategories([]);
  }, []);

  const isFilterActive = selectedCategories.length > 0;

  return (
    <CategoryFilterContext.Provider
      value={{
        selectedCategories,
        toggleCategory,
        clearFilters,
        isFilterActive,
      }}
    >
      {children}
    </CategoryFilterContext.Provider>
  );
}

export function useCategoryFilter(): CategoryFilterContextType {
  const context = useContext(CategoryFilterContext);
  if (!context) {
    throw new Error("useCategoryFilter must be used within CategoryFilterProvider");
  }
  return context;
}
