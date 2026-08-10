import React from "react";
import {
  Pressable,
  Text,
  View,
  Linking,
  Alert,
  Share,
  Platform,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
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
  red: "#DC2626", // Emergency Red
  blue: "#0A3D62", // Deep Blue - Primary
  green: "#059669", // Professional Green
  purple: "#7C3AED", // Professional Purple
  orange: "#EA580C", // Professional Orange
  white: "#0891B2", // Cyan for neutral
};

const professionalColorMapDark: Record<string, string> = {
  red: "#EF4444",
  blue: "#1A5F8F",
  green: "#10B981",
  purple: "#A78BFA",
  orange: "#FB923C",
  white: "#06B6D4",
};

export function HelplineCard({
  helpline,
  onFavoriteToggle,
}: HelplineCardProps) {
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
        try {
          await navigator.clipboard.writeText(shareMessage);
          Alert.alert("Success", "Contact details copied to clipboard");
        } catch (err) {
          Alert.alert("Info", shareMessage);
        }
      } else {
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
  // Fallback color added to prevent undefined crash
  const baseColor = helpline?.categoryColor || "blue";
  const categoryColor = isDark
    ? professionalColorMapDark[baseColor] || professionalColorMapDark["blue"]
    : professionalColorMap[baseColor] || professionalColorMap["blue"];

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
        style={{
          flexDirection: "row",
          alignItems: "center",
          gap: 16,
          padding: 16,
          marginBottom: 12,
          borderRadius: 16,
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
        {/* Icon Container - Safely injecting color with fallback */}
        <View
          style={{
            width: 56,
            height: 56,
            borderRadius: 28,
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: `${categoryColor}15`,
          }}
        >
          <MaterialIcons
            name={getHelplineIcon(helpline) as any}
            size={28}
            color={categoryColor}
          />
        </View>

        {/* Content Section */}
        <View style={{ flex: 1, minWidth: 0 }}>
          <Text
            numberOfLines={1}
            style={{
              fontWeight: "bold",
              fontSize: 16,
              lineHeight: 20,
              color: categoryColor,
            }}
          >
            {helpline.name}
          </Text>

          <Text
            numberOfLines={1}
            style={{
              fontSize: 12,
              marginTop: 4,
              color: categoryColor,
            }}
          >
            {helpline.nameUrdu}
          </Text>

          <Text
            style={{
              fontWeight: "bold",
              fontSize: 16,
              marginTop: 8,
              color: categoryColor,
            }}
          >
            {helpline.number}
          </Text>
        </View>

        {/* Action Buttons Container */}
        <View style={{ flexDirection: "row", gap: 8, alignItems: "center" }}>
          {/* Share Button */}
          <Pressable
            onPress={handleShare}
            style={({ pressed }) => [{ opacity: pressed ? 0.6 : 1 }]}
            hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
          >
            <MaterialIcons name="share" size={24} color={colors.muted} />
          </Pressable>

          {/* Favorite Button */}
          <Pressable
            onPress={handleToggleFavorite}
            style={({ pressed }) => [{ opacity: pressed ? 0.6 : 1 }]}
            hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
          >
            <MaterialIcons
              name={favorited ? "star" : "star-outline"}
              size={24}
              color={favorited ? "#F59E0B" : colors.muted}
            />
          </Pressable>

          {/* Call Button */}
          <Pressable
            onPress={handleCall}
            style={({ pressed }) => [
              {
                width: 44,
                height: 44,
                borderRadius: 22,
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: categoryColor,
                opacity: pressed ? 0.85 : 1,
                transform: [{ scale: pressed ? 0.95 : 1 }],
              },
            ]}
            hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
          >
            <MaterialIcons name="call" size={20} color="white" />
          </Pressable>
        </View>
      </View>
    </Pressable>
  );
}
