import React from "react";
import { Pressable, Text, View, Linking, Alert, Share, Platform } from "react-native";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { Helpline } from "@/lib/helplines";
import { useHelplines } from "@/lib/helpline-context";
import { useColors } from "@/hooks/use-colors";
import { getHelplineIcon } from "@/lib/icon-mapping";

interface HelplineCardProps {
  helpline: Helpline;
  onFavoriteToggle?: () => void;
}

// Professional government-utility color mapping
const professionalColorMap: Record<string, string> = {
  red: "#DC2626",      // Emergency Red
  blue: "#0A3D62",     // Deep Blue - Primary
  green: "#059669",    // Professional Green
  purple: "#7C3AED",   // Professional Purple
  orange: "#EA580C",   // Professional Orange
  white: "#0891B2",    // Cyan for neutral
};

const professionalColorMapDark: Record<string, string> = {
  red: "#EF4444",
  blue: "#1A5F8F",
  green: "#10B981",
  purple: "#A78BFA",
  orange: "#FB923C",
  white: "#06B6D4",
};

export function HelplineCard({ helpline, onFavoriteToggle }: HelplineCardProps) {
  const colors = useColors();
  const { isFavorite, addFavorite, removeFavorite } = useHelplines();
  const favorited = isFavorite(helpline.id);

  const handleCall = async () => {
    try {
      const phoneNumber = `tel:${helpline.number}`;
      const canOpen = await Linking.canOpenURL(phoneNumber);
      if (canOpen) {
        await Linking.openURL(phoneNumber);
      } else {
        Alert.alert("Error", "Unable to make call on this device");
      }
    } catch (error) {
      Alert.alert("Error", "Failed to initiate call");
    }
  };

  const handleToggleFavorite = async () => {
    try {
      if (favorited) {
        await removeFavorite(helpline.id);
      } else {
        await addFavorite(helpline);
      }
      onFavoriteToggle?.();
    } catch (error) {
      Alert.alert("Error", "Failed to update favorite");
    }
  };

  const handleShare = async () => {
    try {
      const shareMessage = `${helpline.name}\n${helpline.nameUrdu}\nPhone: ${helpline.number}`;
      
      if (Platform.OS === "web") {
        // For web, copy to clipboard
        try {
          await navigator.clipboard.writeText(shareMessage);
          Alert.alert("Success", "Contact details copied to clipboard");
        } catch (err) {
          Alert.alert("Info", shareMessage);
        }
      } else {
        // For native platforms, use Share API
        await Share.share({
          message: shareMessage,
          title: helpline.name,
          url: undefined,
        });
      }
    } catch (error) {
      Alert.alert("Error", "Failed to share contact");
    }
  };

  const isDark = colors.background === "#0F1419";
  const categoryColor = isDark
    ? professionalColorMapDark[helpline.categoryColor]
    : professionalColorMap[helpline.categoryColor];

  return (
    <Pressable
      onPress={handleCall}
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
        {/* Icon Container - Professional Circular Design */}
        <View
          className="w-14 h-14 rounded-full items-center justify-center flex-shrink-0"
          style={{ backgroundColor: categoryColor + "15" }}
        >
          <MaterialIcons 
            name={getHelplineIcon(helpline) as any} 
            size={28} 
            color={categoryColor} 
          />
        </View>

        {/* Content Section */}
        <View className="flex-1 min-w-0">
          {/* Service Name - Bold, Category Color */}
          <Text
            className="font-bold text-base leading-tight"
            style={{ color: categoryColor }}
            numberOfLines={1}
          >
            {helpline.name}
          </Text>

          {/* Urdu Name - Category Color */}
          <Text
            className="text-xs mt-1"
            style={{ color: categoryColor }}
            numberOfLines={1}
          >
            {helpline.nameUrdu}
          </Text>

          {/* Phone Number - Prominent in Category Color */}
          <Text
            className="font-bold text-base mt-2"
            style={{ color: categoryColor }}
          >
            {helpline.number}
          </Text>
        </View>

        {/* Action Buttons Container */}
        <View className="flex-row gap-2 items-center flex-shrink-0">
          {/* Share Button - Subtle */}
          <Pressable
            onPress={handleShare}
            style={({ pressed }) => [
              {
                opacity: pressed ? 0.6 : 1,
              },
            ]}
            hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
          >
            <MaterialIcons
              name="share"
              size={24}
              color={colors.muted}
            />
          </Pressable>

          {/* Favorite Button - Subtle */}
          <Pressable
            onPress={handleToggleFavorite}
            style={({ pressed }) => [
              {
                opacity: pressed ? 0.6 : 1,
              },
            ]}
            hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
          >
            <MaterialIcons
              name={favorited ? "star" : "star-outline"}
              size={24}
              color={favorited ? "#F59E0B" : colors.muted}
            />
          </Pressable>

          {/* Call Button - Prominent with Category Color */}
          <Pressable
            onPress={handleCall}
            style={({ pressed }) => [
              {
                backgroundColor: categoryColor,
                opacity: pressed ? 0.85 : 1,
                transform: [{ scale: pressed ? 0.95 : 1 }],
              },
            ]}
            className="w-11 h-11 rounded-full items-center justify-center"
            hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
          >
            <MaterialIcons name="call" size={20} color="white" />
          </Pressable>
        </View>
      </View>
    </Pressable>
  );
}
