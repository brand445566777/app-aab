import React from "react";
import { View, Text, StyleSheet } from "react-native";

/**
 * Web Testing Mock Banner Component (Named Export)
 */
export const BannerAd = () => {
  return (
    <View style={styles.webBannerContainer}>
      <Text style={styles.webBannerText}>
        [Google Banner Ad - Web Test Placeholder]
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  webBannerContainer: {
    padding: 12,
    backgroundColor: "#0A3D62",
    marginVertical: 10,
    marginHorizontal: 12,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    borderStyle: "dashed",
    borderWidth: 1,
    borderColor: "#FFFFFF",
  },
  webBannerText: {
    color: "#FFFFFF",
    fontWeight: "bold",
    fontSize: 12,
  },
});
