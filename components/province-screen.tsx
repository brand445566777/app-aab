import { ScrollView, Text, View } from "react-native";
import { useState, useMemo } from "react";
import { ScreenContainer } from "./screen-container";
import HelplineCard from "./helpline-card";
import CategoryFilterBar from "./category-filter-bar";
import { ProvinceData } from "@/lib/helplines";
import { useColors } from "@/hooks/use-colors";
import { useCategoryFilter } from "@/lib/category-filter-context";
import { MaterialIcons } from "@expo/vector-icons";

interface ProvinceScreenProps {
  province: ProvinceData;
}

export function ProvinceScreen({ province }: ProvinceScreenProps) {
  const colors = useColors();
  const { selectedCategories } = useCategoryFilter();
  const [refreshKey, setRefreshKey] = useState(0);

  const handleFavoriteToggle = () => {
    setRefreshKey((prev) => prev + 1);
  };

  // Filter helplines by selected categories
  const getFilteredSections = useMemo(() => {
    if (selectedCategories.length === 0) {
      return province.sections;
    }

    return province.sections
      .map((section) => ({
        ...section,
        helplines: section.helplines.filter((h) =>
          selectedCategories.includes(h.category as any),
        ),
      }))
      .filter((section) => section.helplines.length > 0);
  }, [selectedCategories, province.sections]);

  const filteredSections = getFilteredSections;
  const hasResults =
    filteredSections.length > 0 &&
    filteredSections.some((s) => s.helplines.length > 0);

  return (
    <ScreenContainer className="p-0">
      <ScrollView contentContainerStyle={{ paddingBottom: 20 }}>
        {/* Header Section - Professional Design */}
        <View className="px-6 pt-6 pb-4">
          <View className="flex-row items-center gap-3 mb-2">
            <View
              className="w-12 h-12 rounded-full items-center justify-center"
              style={{ backgroundColor: colors.primary + "15" }}
            >
              <MaterialIcons
                name="location-on"
                size={28}
                color={colors.primary}
              />
            </View>
            <View className="flex-1">
              <Text
                className="text-3xl font-bold"
                style={{ color: colors.foreground }}
              >
                {province.name}
              </Text>
              <Text className="text-xs" style={{ color: colors.muted }}>
                {province.nameUrdu}
              </Text>
            </View>
          </View>
          <Text
            className="text-sm leading-relaxed mt-2"
            style={{ color: colors.muted }}
          >
            Local helplines and emergency services
          </Text>
        </View>

        {/* Category Filter Bar */}
        <View className="px-6 pt-2">
          <CategoryFilterBar />
        </View>

        {/* Content Section */}
        <View className="px-6">
          {hasResults ? (
            filteredSections.map((section, sectionIndex) => (
              <View key={`${refreshKey}-${sectionIndex}`} className="mb-8">
                {/* Section Header - Professional Typography */}
                <View className="mb-4">
                  <Text
                    className="text-lg font-bold"
                    style={{ color: colors.foreground }}
                  >
                    {section.title}
                  </Text>
                  <Text
                    className="text-xs mt-1"
                    style={{ color: colors.muted }}
                  >
                    {section.titleUrdu}
                  </Text>
                  {/* Subtle divider */}
                  <View
                    className="h-0.5 mt-3"
                    style={{ backgroundColor: colors.border }}
                  />
                </View>

                {/* Helpline Cards */}
                {section.helplines.map((helpline) => (
                  <HelplineCard
                    key={helpline.id}
                    helpline={helpline}
                    onFavoriteToggle={handleFavoriteToggle}
                  />
                ))}
              </View>
            ))
          ) : (
            <View className="items-center justify-center py-12">
              <MaterialIcons name="search-off" size={48} color={colors.muted} />
              <Text
                className="text-base font-semibold mt-4"
                style={{ color: colors.foreground }}
              >
                No Results Found
              </Text>
              <Text
                className="text-sm mt-2 text-center"
                style={{ color: colors.muted }}
              >
                Try adjusting your filters or clearing selections
              </Text>
            </View>
          )}
        </View>
      </ScrollView>
    </ScreenContainer>
  );
}
