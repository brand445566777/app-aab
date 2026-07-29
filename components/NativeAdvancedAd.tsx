// @ts-nocheck
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Platform,
  ActivityIndicator,
  Image,
} from "react-native";
import {
  NativeAd,
  NativeAdView,
  NativeMediaView,
} from "react-native-google-mobile-ads";

const NATIVE_AD_UNIT_ID =
  Platform.OS === "android"
    ? "ca-app-pub-3617790148719581/2428090151" // Real Native AdUnit ID for Android
    : "ca-app-pub-3617790148719581/2428090151"; // Real Native AdUnit ID for iOS

/**
 * NativeAdvancedAd Component (Corrected for react-native-google-mobile-ads v15+)
 *
 * Displays a real native advanced ad matching the app's theme.
 * Features:
 * - Proper SDK Integration (Uses NativeAd.createForAdRequest)
 * - Professional card-style design with color theme #0A3D62
 * - Safe error handling and automatic height collapse on failure
 */

interface NativeAdvancedAdProps {
  adUnitId?: string;
  onAdLoaded?: () => void;
  onAdFailedToLoad?: (error: any) => void;
}

export const NativeAdvancedAd = React.memo(
  ({
    adUnitId = NATIVE_AD_UNIT_ID,
    onAdLoaded,
    onAdFailedToLoad,
  }: NativeAdvancedAdProps) => {
    const [loading, setLoading] = useState(true);
    const [adFailed, setAdFailed] = useState(false);
    const [nativeAd, setNativeAd] = useState<NativeAd | null>(null);

    useEffect(() => {
      let isMounted = true;
      setLoading(true);

      NativeAd.createForAdRequest(adUnitId, {
        keywords: ["emergency", "helpline", "pakistan"],
        contentUrl: "https://pakistan-emergency-helpline.app",
      })
        .then((ad) => {
          if (isMounted) {
            setNativeAd(ad);
            setLoading(false);
            setAdFailed(false);
            onAdLoaded?.();
          }
        })
        .catch((error) => {
          console.warn("Native ad failed to load:", error);
          if (isMounted) {
            setLoading(false);
            setAdFailed(true);
            onAdFailedToLoad?.(error);
          }
        });

      return () => {
        isMounted = false;
        if (nativeAd) {
          nativeAd.destroy();
        }
      };
    }, [adUnitId]);

    if (adFailed) {
      return null;
    }

    if (loading || !nativeAd) {
      return (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="small" color="#0A3D62" />
        </View>
      );
    }

    return (
      <View style={styles.adContainer}>
        <NativeAdView
          nativeAd={nativeAd}
          style={styles.card}
        >
          <View style={styles.adBadge}>
            <Text style={styles.adBadgeText}>Ad</Text>
          </View>

          <View style={styles.header}>
            {nativeAd.icon ? (
              <Image source={{ uri: nativeAd.icon.url }} style={styles.appIcon} />
            ) : (
              <View style={[styles.appIcon, { backgroundColor: "#F5F7FA" }]} />
            )}

            <View style={styles.headlineContainer}>
              <Text style={styles.headline} numberOfLines={2}>
                {nativeAd.headline}
              </Text>
            </View>
          </View>

          {nativeAd.body && (
            <Text style={styles.description} numberOfLines={3}>
              {nativeAd.body}
            </Text>
          )}

          <View style={styles.mediaContainer}>
            <NativeMediaView style={styles.media} resizeMode="cover" />
          </View>

          {nativeAd.callToAction && (
            <View style={styles.ctaButton}>
              <Text style={styles.ctaButtonText}>
                {nativeAd.callToAction}
              </Text>
            </View>
          )}

          {nativeAd.advertiser && (
            <Text style={styles.advertiser}>{nativeAd.advertiser}</Text>
          )}
        </NativeAdView>
      </View>
    );
  },
);

NativeAdvancedAd.displayName = "NativeAdvancedAd";

const styles = StyleSheet.create({
  adContainer: {
    marginVertical: 12,
    marginHorizontal: 12,
  },
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    padding: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
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
  adBadgeText: {
    color: "#FFFFFF",
    fontSize: 10,
    fontWeight: "600",
  },
  loadingContainer: {
    padding: 20,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    marginVertical: 12,
    marginHorizontal: 12,
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  appIcon: {
    width: 40,
    height: 40,
    borderRadius: 8,
    marginRight: 12,
  },
  headlineContainer: {
    flex: 1,
    paddingRight: 24,
  },
  headline: {
    fontSize: 14,
    fontWeight: "700",
    color: "#0A3D62",
  },
  description: {
    fontSize: 12,
    color: "#687076",
    lineHeight: 16,
    marginBottom: 8,
  },
  mediaContainer: {
    marginVertical: 8,
    borderRadius: 8,
    overflow: "hidden",
    backgroundColor: "#F5F7FA",
  },
  media: {
    width: "100%",
    height: 180,
  },
  ctaButton: {
    backgroundColor: "#0A3D62",
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 12,
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 8,
  },
  ctaButtonText: {
    color: "#FFFFFF",
    fontSize: 13,
    fontWeight: "600",
  },
  advertiser: {
    fontSize: 11,
    color: "#9BA1A6",
    marginTop: 6,
  },
});
