import React from "react";
import { ScrollView, Pressable, Text, View } from "react-native";
import { useColors } from "@/hooks/use-colors";
import {
  useCategoryFilter,
  type HelplineCategory,
} from "@/lib/category-filter-context";
import { MaterialIcons } from "@expo/vector-icons";

const PROFESSIONAL_CATEGORIES: {
  key: HelplineCategory;
  label: string;
  icon: string;
}[] = [
  { key: "emergency", label: "Emergency", icon: "warning-amber" },
  { key: "rescue", label: "Rescue", icon: "local-fire-department" },
  { key: "fire", label: "Fire", icon: "fire-extinguisher" },
  { key: "police", label: "Police", icon: "security" },
  { key: "security", label: "Security", icon: "shield" },
  { key: "transport", label: "Transport", icon: "directions-car" },
  { key: "health", label: "Healthcare", icon: "local-hospital" },
  { key: "utility", label: "Utilities", icon: "electrical-services" },
  { key: "government", label: "Government", icon: "account-balance" },
  { key: "welfare", label: "Welfare", icon: "volunteer-activism" },
];

export function CategoryFilterBar() {
  const colors = useColors();
  const { selectedCategories, toggleCategory, clearFilters, isFilterActive } =
    useCategoryFilter();

  return (
    <View className="mb-6">
      {/* Filter Header */}
      <View className="flex-row items-center justify-between mb-4 px-1">
        <Text
          className="text-sm font-bold"
          style={{ color: colors.foreground }}
        >
          Filter by Category
        </Text>
        {isFilterActive && (
          <Pressable
            onPress={clearFilters}
            style={({ pressed }) => [
              {
                opacity: pressed ? 0.6 : 1,
              },
            ]}
            hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
          >
            <Text
              className="text-xs font-bold"
              style={{ color: colors.primary }}
            >
              Clear All
            </Text>
          </Pressable>
        )}
      </View>

      {/* Filter Buttons - Horizontal Scroll */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 0, gap: 8 }}
      >
        {PROFESSIONAL_CATEGORIES.map((category) => {
          const isSelected = selectedCategories.includes(category.key);

          return (
            <Pressable
              key={category.key}
              onPress={() => toggleCategory(category.key)}
              style={({ pressed }) => [
                {
                  opacity: pressed ? 0.7 : 1,
                },
              ]}
            >
              <View
                className="flex-row items-center gap-2 px-4 py-2 rounded-full border"
                style={{
                  backgroundColor: isSelected ? colors.primary : colors.surface,
                  borderColor: isSelected ? colors.primary : colors.border,
                  borderWidth: 1.5,
                  shadowColor: isSelected ? colors.primary : "transparent",
                  shadowOffset: { width: 0, height: 2 },
                  shadowOpacity: isSelected ? 0.15 : 0,
                  shadowRadius: 4,
                  elevation: isSelected ? 2 : 0,
                }}
              >
                <MaterialIcons
                  name={category.icon as any}
                  size={16}
                  color={isSelected ? "white" : colors.foreground}
                />
                <Text
                  className="text-sm font-semibold"
                  style={{
                    color: isSelected ? "white" : colors.foreground,
                  }}
                >
                  {category.label}
                </Text>
              </View>
            </Pressable>
          );
        })}
      </ScrollView>
    </View>
  );
}
