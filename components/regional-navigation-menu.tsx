import React, { useRef, useEffect } from "react";
import { ScrollView, Pressable, Text, View, Animated } from "react-native";
import { useColors } from "@/hooks/use-colors";
import { MaterialIcons } from "@expo/vector-icons";

export interface RegionalCategory {
  id: string;
  label: string;
  icon: string;
  description?: string;
}

interface RegionalNavigationMenuProps {
  categories?: RegionalCategory[];
  activeCategory: string;
  onCategoryChange: (categoryId: string) => void;
}

const REGIONAL_CATEGORIES: RegionalCategory[] = [
  { id: "home", label: "Home", icon: "home", description: "Overview" },
  {
    id: "federal",
    label: "Federal",
    icon: "account-balance",
    description: "Islamabad",
  },
  {
    id: "punjab",
    label: "Punjab",
    icon: "location-on",
    description: "Province",
  },
  { id: "sindh", label: "Sindh", icon: "location-on", description: "Province" },
  {
    id: "balochistan",
    label: "Balochistan",
    icon: "location-on",
    description: "Province",
  },
  {
    id: "kpk",
    label: "KPK",
    icon: "location-on",
    description: "Khyber Pakhtunkhwa",
  },
  {
    id: "gb",
    label: "Gilgit-Baltistan",
    icon: "location-on",
    description: "Region",
  },
  {
    id: "ajk",
    label: "Azad Kashmir",
    icon: "location-on",
    description: "Region",
  },
];

export function RegionalNavigationMenu({
  categories = REGIONAL_CATEGORIES,
  activeCategory,
  onCategoryChange,
}: RegionalNavigationMenuProps) {
  const colors = useColors();
  const scrollViewRef = useRef<ScrollView>(null);

  // Auto-scroll to active category
  useEffect(() => {
    const activeIndex = categories.findIndex((c) => c.id === activeCategory);
    if (activeIndex >= 0) {
      // Delay to ensure layout is calculated
      setTimeout(() => {
        const scrollPosition = activeIndex * 120;
        scrollViewRef.current?.scrollTo?.({
          x: Math.max(0, scrollPosition - 50),
          animated: true,
        });
      }, 100);
    }
  }, [activeCategory, categories]);

  return (
    <View className="mb-4">
      {/* Menu Header */}
      <View className="px-6 pb-3">
        <Text
          className="text-xs font-bold uppercase tracking-wide"
          style={{ color: colors.muted }}
        >
          Select Region
        </Text>
      </View>

      {/* Horizontal Scrollable Menu */}
      <ScrollView
        ref={scrollViewRef}
        horizontal
        showsHorizontalScrollIndicator={false}
        scrollEventThrottle={16}
        contentContainerStyle={{
          paddingHorizontal: 24,
          gap: 10,
          paddingBottom: 8,
        }}
      >
        {categories.map((category) => {
          const isActive = category.id === activeCategory;

          return (
            <Pressable
              key={category.id}
              onPress={() => onCategoryChange(category.id)}
              style={({ pressed }) => [
                {
                  opacity: pressed ? 0.8 : 1,
                  transform: [{ scale: pressed ? 0.97 : 1 }],
                },
              ]}
            >
              <View
                className="items-center justify-center px-4 py-3 rounded-2xl border-2 min-w-max"
                style={{
                  backgroundColor: isActive ? colors.primary : colors.surface,
                  borderColor: isActive ? colors.primary : colors.border,
                  borderWidth: isActive ? 0 : 1,
                  shadowColor: isActive ? colors.primary : "transparent",
                  shadowOffset: { width: 0, height: 2 },
                  shadowOpacity: isActive ? 0.2 : 0,
                  shadowRadius: isActive ? 6 : 0,
                  elevation: isActive ? 4 : 0,
                }}
              >
                {/* Icon + Text Container */}
                <View className="items-center gap-1">
                  {/* Icon */}
                  <MaterialIcons
                    name={category.icon as any}
                    size={20}
                    color={isActive ? "white" : colors.foreground}
                  />

                  {/* Label */}
                  <Text
                    className={`text-center ${
                      isActive ? "font-bold" : "font-semibold"
                    }`}
                    style={{
                      fontSize: isActive ? 14 : 13,
                      color: isActive ? "white" : colors.foreground,
                      lineHeight: 16,
                    }}
                    numberOfLines={1}
                  >
                    {category.label}
                  </Text>

                  {/* Description (optional) */}
                  {category.description && (
                    <Text
                      className="text-xs"
                      style={{
                        color: isActive
                          ? "rgba(255,255,255,0.7)"
                          : colors.muted,
                      }}
                      numberOfLines={1}
                    >
                      {category.description}
                    </Text>
                  )}
                </View>
              </View>
            </Pressable>
          );
        })}
      </ScrollView>

      {/* Subtle Divider */}
      <View className="h-0.5 mt-2" style={{ backgroundColor: colors.border }} />
    </View>
  );
}
