const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const filePath = path.join(process.cwd(), 'app', '(tabs)', 'health-complaints.tsx');

console.log('⚡ Running Master Refactor for Healthcare Tab & AdMob Compatibility...');
console.log('----------------------------------------------------------------------');

const correctedCode = `import React, { useState, useMemo } from "react";
import { ScrollView, Text, View } from "react-native";
import { ScreenContainer } from "@/components/screen-container";
import { useColors } from "@/hooks/use-colors";
import { useHelplines } from "@/lib/helpline-context";
// Import Banner and Native Advanced Ad Components
import { HelplineCard } from "@/components/helpline-card"; // 👈 Reuse standard HelplineCard
import { NativeAdvancedAd } from "@/components/NativeAdvancedAd";
import { MaterialIcons } from "@expo/vector-icons";
import { getAllHelplines, allProvinces } from "@/lib/helplines";
import { CategoryFilterBar } from "@/components/category-filter-bar";
import { useCategoryFilter } from "@/lib/category-filter-context";

export default function HealthComplaintsScreen() {
  const colors = useColors();
  const { selectedCategories } = useCategoryFilter();
  const [refreshKey, setRefreshKey] = useState(0);

  const handleFavoriteToggle = () => {
    setRefreshKey((prev) => prev + 1);
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

  const provinceEntries = useMemo(
    () => Object.entries(healthByProvince),
    [healthByProvince],
  );

  const midPointAdIndex = useMemo(
    () => Math.floor(provinceEntries.length / 2),
    [provinceEntries],
  );

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
              <MaterialIcons name="local-hospital" size={28} color={colors.primary} />
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

        {/* ===== 1st NATIVE AD PLENT ===== */}
        <View className="px-6 mt-4">
          <NativeAdvancedAd />
        </View>

        {/* Content Section */}
        <View className="px-6 mt-4">
          {hasResults ? (
            provinceEntries.map(([provinceName, complaints], index) => {
              const renderProvinceBlock = (
                <View key={\`\${refreshKey}-\${provinceName}\`} className="mb-8">
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

                  {/* Health Cards using standardized HelplineCard */}
                  {complaints.map((complaint) => (
                    <HelplineCard
                      key={complaint.id}
                      helpline={complaint}
                      onFavoriteToggle={handleFavoriteToggle}
                    />
                  ))}
                </View>
              );

              // ===== 2nd NATIVE AD PLACEMENT (DYNAMIC MID-LIST) =====
              if (index === midPointAdIndex && provinceEntries.length > 1) {
                return (
                  <View key={\`group-\${provinceName}\`}>
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
              <View className="mt-4">
                <NativeAdvancedAd />
              </View>
            </View>
          )}

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
`;

if (fs.existsSync(filePath)) {
  fs.writeFileSync(filePath + '.bak', fs.readFileSync(filePath, 'utf8'), 'utf8');
  console.log('✅ Created backup: health-complaints.tsx.bak');
  fs.writeFileSync(filePath, correctedCode, 'utf8');
  console.log('✅ Success! health-complaints.tsx successfully refactored to reuse HelplineCard.');

  try {
    console.log('Pushing updates to GitHub...');
    execSync('git add app/(tabs)/health-complaints.tsx', { stdio: 'inherit' });
    execSync('git commit -m "fix: refactor healthcare complaints to reuse compact and unblocked HelplineCard"', { stdio: 'inherit' });
    execSync('git push', { stdio: 'inherit' });
    console.log('🚀 Successfully pushed refactored tab code to GitHub!');
  } catch (err) {
    console.warn('⚠️ Git push failed, please push manually.');
  }
} else {
  console.error(`❌ File not found at: \${filePath}`);
}