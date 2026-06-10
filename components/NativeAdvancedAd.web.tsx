import React from "react";
import { View, Text, StyleSheet } from "react-native";

/**
 * Web Testing Mock Component
 * Expo router automatic is file ko browser par load karega.
 * Is se native libraries bundle nahi hongi aur error nahi aayega.
 */
export const NativeAdvancedAd = React.memo(() => {
  return (
    <View style={styles.adContainer}>
      <View style={[styles.card, styles.webBorder]}>
        <View style={styles.adBadge}>
          <Text style={styles.adBadgeText}>Ad Mock</Text>
        </View>
        <View style={styles.header}>
          <View style={styles.appIcon}>
            <Text style={styles.starText}>⭐</Text>
          </View>
          <View style={styles.headlineContainer}>
            <Text style={styles.headline}>
              Pakistan Emergency Helpline (Web Preview)
            </Text>
          </View>
        </View>
        <Text style={styles.description}>
          This is a safe web preview placeholder. The real Google Native
          Advanced Ad will load flawlessly on your Android and iOS mobile builds
          without crashing the Metro server.
        </Text>
        <View style={styles.ctaButton}>
          <Text style={styles.ctaButtonText}>Web Preview Button</Text>
        </View>
      </View>
    </View>
  );
});

NativeAdvancedAd.displayName = "NativeAdvancedAd";

const styles = StyleSheet.create({
  adContainer: { marginVertical: 12, marginHorizontal: 12 },
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    padding: 12,
    elevation: 3,
  },
  webBorder: { borderStyle: "dashed", borderWidth: 1, borderColor: "#0A3D62" },
  adBadge: {
    position: "absolute",
    top: 8,
    right: 8,
    backgroundColor: "#0A3D62",
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
    zIndex: 10,
  },
  adBadgeText: { color: "#FFFFFF", fontSize: 10, fontWeight: "600" },
  header: { flexDirection: "row", alignItems: "center", marginBottom: 8 },
  appIcon: {
    width: 40,
    height: 40,
    borderRadius: 8,
    marginRight: 12,
    backgroundColor: "#0A3D62",
    alignItems: "center",
    justifyContent: "center",
  },
  starText: { color: "#fff", fontWeight: "bold" },
  headlineContainer: { flex: 1, paddingRight: 24 },
  headline: { fontSize: 14, fontWeight: "700", color: "#0A3D62" },
  description: {
    fontSize: 12,
    color: "#687076",
    lineHeight: 16,
    marginBottom: 8,
  },
  ctaButton: {
    backgroundColor: "#0A3D62",
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 12,
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 8,
    opacity: 0.8,
  },
  ctaButtonText: { color: "#FFFFFF", fontSize: 13, fontWeight: "600" },
});
