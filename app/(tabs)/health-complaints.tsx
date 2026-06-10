import React, { useState, useMemo } from "react";
import { ScrollView, Text, View, Pressable, Linking } from "react-native";
import { ScreenContainer } from "@/components/screen-container";
import { useColors } from "@/hooks/use-colors";
import { useHelplines } from "@/lib/helpline-context";
// Import Native Advanced Ad Component
import { NativeAdvancedAd } from "@/components/NativeAdvancedAd";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { getAllHelplines, allProvinces } from "@/lib/helplines";
import { CategoryFilterBar } from "@/components/category-filter-bar";
import { useCategoryFilter } from "@/lib/category-filter-context";

export default function HealthComplaintsScreen() {
  const colors = useColors();
  const {
    favorites,
    isFavorite: checkFavorite,
    addFavorite,
    removeFavorite,
  } = useHelplines();
  const { selectedCategories } = useCategoryFilter();
  const [refreshKey, setRefreshKey] = useState(0);

  const toggleFavorite = (id: string) => {
    const helpline = getAllHelplines().find((h) => h.id === id);
    if (helpline) {
      if (checkFavorite(id)) {
        removeFavorite(id);
      } else {
        addFavorite(helpline);
      }
      setRefreshKey((prev) => prev + 1);
    }
  };

  // Get all health complaint helplines from all provinces
  const allHealthComplaints = useMemo(() => {
    let complaints = getAllHelplines().filter((h) => h.category === "health");

    // Apply category filter if selected
    if (selectedCategories.length > 0) {
      complaints = complaints.filter((h) =>
        selectedCategories.includes(h.category as any),
      );
    }

    return complaints;
  }, [selectedCategories]);

  // Group by province
  const healthByProvince = useMemo(() => {
    return Object.entries(allProvinces).reduce(
      (acc, [provinceKey, province]) => {
        const provinceHealthComplaints = allHealthComplaints.filter(
          (h) => h.province === provinceKey,
        );
        if (provinceHealthComplaints.length > 0) {
          acc[province.name] = provinceHealthComplaints;
        }
        return acc;
      },
      {} as Record<string, typeof allHealthComplaints>,
    );
  }, [allHealthComplaints]);

  const handleCall = (number: string) => {
    const phoneUrl = `tel:${number}`;
    Linking.openURL(phoneUrl).catch(() => {
      console.log("Failed to open phone dialer");
    });
  };

  // Provinces list ka exact half nikalne ke liye dynamic calculation (for 2nd ad splitting)
  const provinceEntries = useMemo(
    () => Object.entries(healthByProvince),
    [healthByProvince],
  );
  const midPointAdIndex = useMemo(
    () => Math.floor(provinceEntries.length / 2),
    [provinceEntries],
  );

  // Professional color mapping
  const professionalColorMap: Record<string, string> = {
    red: "#DC2626",
    blue: "#0A3D62",
    green: "#059669",
    purple: "#7C3AED",
    orange: "#EA580C",
    white: "#0891B2",
  };

  const HealthCard = ({
    name,
    nameUrdu,
    number,
    icon,
    categoryColor,
    id,
  }: {
    name: string;
    nameUrdu: string;
    number: string;
    icon: string;
    categoryColor: string;
    id: string;
  }) => {
    const bgColor = professionalColorMap[categoryColor] || colors.primary;
    const isFav = checkFavorite(id);

    return (
      <Pressable
        onPress={() => handleCall(number)}
        style={({ pressed }) => [
          {
            opacity: pressed ? 0.85 : 1,
            transform: [{ scale: pressed ? 0.98 : 1 }],
          },
        ]}
      >
        <View
          className="flex-row items-center gap-4 p-4 mb-3 rounded-2xl border"
          style={{
            backgroundColor: colors.surface,
            borderColor: colors.border,
            borderWidth: 1,
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.08,
            shadowRadius: 8,
            elevation: 3,
          }}
        >
          {/* Icon Container */}
          <View
            className="w-14 h-14 rounded-full items-center justify-center flex-shrink-0"
            style={{ backgroundColor: bgColor + "15" }}
          >
            <MaterialIcons name={icon as any} size={28} color={bgColor} />
          </View>

          {/* Content */}
          <View className="flex-1 min-w-0">
            <Text
              className="font-bold text-base leading-tight"
              style={{ color: colors.foreground }}
              numberOfLines={1}
            >
              {name}
            </Text>

            <Text
              className="text-xs mt-1"
              style={{ color: colors.muted }}
              numberOfLines={1}
            >
              {nameUrdu}
            </Text>

            <Text
              className="text-base font-bold mt-2"
              style={{ color: bgColor }}
            >
              {number}
            </Text>
          </View>

          {/* Action Buttons */}
          <View className="flex-row gap-2 items-center flex-shrink-0">
            <Pressable
              onPress={() => toggleFavorite(id)}
              style={({ pressed }) => [
                {
                  opacity: pressed ? 0.6 : 1,
                },
              ]}
              hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
            >
              <MaterialIcons
                name={isFav ? "star" : "star-outline"}
                size={24}
                color={isFav ? "#F59E0B" : colors.muted}
              />
            </Pressable>

            <Pressable
              onPress={() => handleCall(number)}
              style={({ pressed }) => [
                {
                  opacity: pressed ? 0.85 : 1,
                  transform: [{ scale: pressed ? 0.95 : 1 }],
                },
              ]}
              hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
            >
              <View
                className="w-11 h-11 rounded-full items-center justify-center"
                style={{ backgroundColor: bgColor }}
              >
                <MaterialIcons name="call" size={20} color="white" />
              </View>
            </Pressable>
          </View>
        </View>
      </Pressable>
    );
  };

  const hasResults = provinceEntries.length > 0;

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
                name="local-hospital"
                size={28}
                color={colors.primary}
              />
            </View>
            <View className="flex-1">
              <Text
                className="text-3xl font-bold"
                style={{ color: colors.foreground }}
              >
                Healthcare
              </Text>
              <Text className="text-xs" style={{ color: colors.muted }}>
                صحت کی شکایات
              </Text>
            </View>
          </View>
          <Text
            className="text-sm leading-relaxed mt-2"
            style={{ color: colors.muted }}
          >
            Health complaints and medical helplines across all provinces
          </Text>
        </View>

        {/* Category Filter Bar */}
        <View className="px-6 pt-2">
          <CategoryFilterBar />
        </View>

        {/* ===== 1st NATIVE AD PLACEMENT ===== */}
        {/* Filters ke baad aur list shuru hone se pehle pehla Native Ad */}
        <View className="px-6 mt-4">
          <NativeAdvancedAd />
        </View>

        {/* Content Section */}
        <View className="px-6 mt-4">
          {hasResults ? (
            provinceEntries.map(([provinceName, complaints], index) => {
              const renderProvinceBlock = (
                <View key={`${refreshKey}-${provinceName}`} className="mb-8">
                  {/* Province Header */}
                  <View className="mb-4">
                    <Text
                      className="text-lg font-bold"
                      style={{ color: colors.foreground }}
                    >
                      {provinceName}
                    </Text>
                    <View
                      className="h-0.5 mt-3"
                      style={{ backgroundColor: colors.border }}
                    />
                  </View>

                  {/* Health Cards */}
                  {complaints.map((complaint) => (
                    <HealthCard
                      key={complaint.id}
                      name={complaint.name}
                      nameUrdu={complaint.nameUrdu}
                      number={complaint.number}
                      icon={complaint.icon}
                      categoryColor={complaint.categoryColor}
                      id={complaint.id}
                    />
                  ))}
                </View>
              );

              // ===== 2nd NATIVE AD PLACEMENT (DYNAMIC MID-LIST) =====
              // Jab provinces loop ke middle index par pahuchega, to doosra Native Ad render hoga
              if (index === midPointAdIndex && provinceEntries.length > 1) {
                return (
                  <View key={`group-${provinceName}`}>
                    {renderProvinceBlock}
                    <View className="mb-4">
                      <NativeAdvancedAd />
                    </View>
                  </View>
                );
              }

              return renderProvinceBlock;
            })
          ) : (
            <View>
              <View className="items-center justify-center py-12">
                <MaterialIcons
                  name="search-off"
                  size={48}
                  color={colors.muted}
                />
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

              {/* Fallback for 2nd Ad: Agar search filters empty state trigger karein, tab bhi doosra ad niche safely load ho jaye */}
              <View className="mt-4">
                <NativeAdvancedAd />
              </View>
            </View>
          )}

          {/* Fallback for 2nd Ad: Agar total data bohat hi chota ho (sirf 1 province show ho rahi ho) to doosra ad loop khatam hone par niche load hoga */}
          {hasResults && provinceEntries.length <= 1 && (
            <View className="mb-4">
              <NativeAdvancedAd />
            </View>
          )}
        </View>
      </ScrollView>
    </ScreenContainer>
  );
}
