import React, { useState, useMemo } from "react";
import { ScrollView, Text, View } from "react-native";
import { ScreenContainer } from "@/components/screen-container";
import { HelplineCard } from "@/components/helpline-card";
import { useHelplines } from "@/lib/helpline-context";
import { useColors } from "@/hooks/use-colors";
// Import Native Advanced Ad Component
import { NativeAdvancedAd } from "@/components/NativeAdvancedAd";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

export default function FavoritesScreen() {
  const colors = useColors();
  const { favorites, isLoading } = useHelplines();
  const [refreshKey, setRefreshKey] = useState(0);

  const handleFavoriteToggle = () => {
    setRefreshKey((prev) => prev + 1);
  };

  // List ke darmiyan ya end mein doosra ad place karne ke liye point nikal rahe hain
  const secondAdIndex = useMemo(() => {
    if (favorites.length <= 3) return favorites.length; // Agar kam cards hain to list ke end mein dikhao
    return Math.floor(favorites.length / 2); // Agar zyada cards hain to exact center mein split karo
  }, [favorites]);

  return (
    <ScreenContainer className="p-4">
      <ScrollView contentContainerStyle={{ paddingBottom: 20 }}>
        {/* Header */}
        <View className="mb-6">
          <Text
            className="text-3xl font-bold mb-1"
            style={{ color: colors.foreground }}
          >
            Favorites
          </Text>
          <Text className="text-sm" style={{ color: colors.muted }}>
            پسندیدہ
          </Text>
        </View>

        {/* Loading State */}
        {isLoading && (
          <View className="items-center justify-center py-12">
            <Text style={{ color: colors.muted }}>Loading...</Text>
          </View>
        )}

        {/* Empty State (Favorites nahi hain tab bhi ads safely niche show honge) */}
        {!isLoading && favorites.length === 0 && (
          <View>
            <View className="items-center justify-center py-12">
              <MaterialIcons
                name="star-outline"
                size={48}
                color={colors.muted}
              />
              <Text
                className="text-lg font-semibold mt-4 mb-2"
                style={{ color: colors.foreground }}
              >
                No Favorites Yet
              </Text>
              <Text
                className="text-sm text-center"
                style={{ color: colors.muted }}
              >
                Tap the star icon on any helpline to save it here for quick
                access.
              </Text>
            </View>

            {/* Jab koi favorite nahi hai, tab bhi do alag-alag Native Ads niche show honge */}
            <View className="mt-4">
              <NativeAdvancedAd />
              <View className="my-2" />
              <NativeAdvancedAd />
            </View>
          </View>
        )}

        {/* Favorites List With 2 Separate Native Ads */}
        {!isLoading && favorites.length > 0 && (
          <View key={refreshKey}>
            {/* 1st Native Ad: List ke bilkul shuru (top) par */}
            <NativeAdvancedAd />
            <View className="my-2" />

            {favorites.map((helpline, index) => {
              const renderCard = (
                <HelplineCard
                  key={helpline.id}
                  helpline={helpline}
                  onFavoriteToggle={handleFavoriteToggle}
                />
              );

              // 2nd Native Ad: Agar index secondAdIndex par pohanche to card ke sath doosra ad render karo
              if (index === secondAdIndex - 1) {
                return (
                  <View key={helpline.id}>
                    {renderCard}
                    <View className="my-2" />
                    <NativeAdvancedAd />
                  </View>
                );
              }

              return renderCard;
            })}

            {/* Safety Fallback: Agar items bohat hi kam hon (jaise 1 ya 2), to doosra ad niche list ke end mein load ho jaye */}
            {favorites.length <= 3 && (
              <View className="mt-2">
                <NativeAdvancedAd />
              </View>
            )}
          </View>
        )}
      </ScrollView>
    </ScreenContainer>
  );
}
