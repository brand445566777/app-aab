import { ScrollView, Text, View } from "react-native";
import { ScreenContainer } from "@/components/screen-container";
import { OfflineIndicator } from "@/components/offline-indicator";
import { CategoryFilterBar } from "@/components/category-filter-bar";
import { RegionalNavigationMenu } from "@/components/regional-navigation-menu";
import { HelplineCard } from "@/components/helpline-card";
import { useColors } from "@/hooks/use-colors";
import { useCategoryFilter } from "@/lib/category-filter-context";
import { useNavigation } from "@/lib/navigation-context";
// Import Banner and Native Ad Components
import { BannerAd } from "@/components/BannerAd";
import { NativeAdvancedAd } from "@/components/NativeAdvancedAd";
import { nationalEmergency, allProvinces, federal , HelplineSection, Helpline } from "@/lib/helplines";
import { useState, useMemo } from "react";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

const REGION_MAP: Record<string, any> = {
  home: nationalEmergency,
  federal: federal,
  punjab: allProvinces.punjab,
  sindh: allProvinces.sindh,
  balochistan: allProvinces.balochistan,
  kpk: allProvinces.kpk,
  gb: allProvinces.gb,
  ajk: allProvinces.ajk,
};

export default function HomeScreen() {
  const colors = useColors();
  const { activeRegion, setActiveRegion } = useNavigation();
  const { selectedCategories } = useCategoryFilter();
  const [refreshKey, setRefreshKey] = useState(0);

  const handleRegionChange = (regionId: string) => {
    setActiveRegion(regionId);
    setRefreshKey((prev) => prev + 1);
  };

  const handleFavoriteToggle = () => {
    setRefreshKey((prev) => prev + 1);
  };

  const currentRegionData = REGION_MAP[activeRegion] || nationalEmergency;

  // Filter helplines by selected categories
  const getFilteredSections = useMemo(() => {
    if (selectedCategories.length === 0) {
      return currentRegionData.sections;
    }

    return currentRegionData.sections
      .map((section: HelplineSection) => ({
        ...section,
        helplines: section.helplines.filter((h: Helpline) =>
          selectedCategories.includes(h.category as any),
        ),
      }))
      .filter((section: any) => section.helplines.length > 0);
  }, [selectedCategories, currentRegionData]);

  const hasResults =
    getFilteredSections.length > 0 &&
    getFilteredSections.some((s: any) => s.helplines.length > 0);

  // Native ad sirf 1 baar show karne ke liye sections ke beech ki middle position nikal rahe hain
  const nativeAdIndex = useMemo(() => {
    if (getFilteredSections.length <= 1) return 0; // Agar 1 hi section hai to pehle ke baad dikhao
    return Math.floor(getFilteredSections.length / 2); // Dynamic mid point
  }, [getFilteredSections]);

  return (
    <ScreenContainer className="p-0">
      <OfflineIndicator />
      <ScrollView contentContainerStyle={{ paddingBottom: 20 }}>
        {/* ===== SECTION 1: HEADER ===== */}
        <View className="px-6 pt-6 pb-4">
          <View className="flex-row items-center gap-3 mb-3">
            <View
              className="w-12 h-12 rounded-full items-center justify-center"
              style={{ backgroundColor: colors.primary + "15" }}
            >
              <MaterialIcons
                name="emergency"
                size={28}
                color={colors.primary}
              />
            </View>
            <View className="flex-1">
              <Text
                className="text-3xl font-bold"
                style={{ color: colors.foreground }}
              >
                Emergency
              </Text>
              <Text className="text-xs" style={{ color: colors.muted }}>
                ایمرجنسی
              </Text>
            </View>
          </View>
          <Text
            className="text-sm leading-relaxed"
            style={{ color: colors.muted }}
          >
            Quick access to national emergency services and helplines
          </Text>
        </View>

        {/* ===== SECTION 2: REGIONAL NAVIGATION TABS ===== */}
        <View className="bg-white dark:bg-slate-900 border-b border-gray-200 dark:border-gray-700">
          <RegionalNavigationMenu
            activeCategory={activeRegion}
            onCategoryChange={handleRegionChange}
          />
        </View>

        {/* ===== SECTION 3: FILTER CATEGORIES ===== */}
        <View className="px-6 pt-6 pb-2">
          <CategoryFilterBar />
        </View>

        {/* ===== MID SCREEN AD PLACEMENT ===== */}
        {/* Header aur options ke baad, cards shuru hone se pehle Mid Banner Ad */}
        <BannerAd />

        {/* ===== SECTION 4: HELPLINE CARDS WITH NATIVE AD ===== */}
        <View className="px-6 pt-4">
          {hasResults ? (
            getFilteredSections.map(
              (section: HelplineSection, sectionIndex: number) => {
                const renderSection = (
                  <View key={`${refreshKey}-${sectionIndex}`} className="mb-8">
                    {/* Section Header */}
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
                    {section.helplines.map((helpline: Helpline) => (
                      <HelplineCard
                        key={helpline.id}
                        helpline={helpline}
                        onFavoriteToggle={handleFavoriteToggle}
                      />
                    ))}
                  </View>
                );

                // Agar yeh dynamic middle index hai, to section ke sath Native Ad render karo (Sirf 1 Baar)
                if (sectionIndex === nativeAdIndex) {
                  return (
                    <View key={`group-${sectionIndex}`}>
                      {renderSection}
                      <NativeAdvancedAd />
                    </View>
                  );
                }

                return renderSection;
              },
            )
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
