import React, { useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Platform,
  ActivityIndicator,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import NativeAdView, {
  CallToActionView,
  HeadlineView,
  BodyView,
  IconView,
  MediaView,
  AdvertiserView,
} from "react-native-google-mobile-ads";

const NATIVE_AD_UNIT_ID =
  Platform.OS === "android"
    ? "ca-app-pub-3617790148719581/2428090151" // Real Native AdUnit ID for Android
    : "ca-app-pub-3617790148719581/2428090151"; // Real Native AdUnit ID for iOS

/**
 * NativeAdvancedAd Component
 *
 * Displays a real native advanced ad matching the app's theme.
 * Features:
 * - Proper SDK Integration (No more mock/fake data)
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
    const nativeAdRef = useRef<any>(null);

    useEffect(() => {
      // Load native ad on mount
      if (nativeAdRef.current) {
        nativeAdRef.current.loadAd();
      }
    }, []);

    const handleAdLoaded = () => {
      setLoading(false);
      setAdFailed(false);
      onAdLoaded?.();
    };

    const handleAdFailedToLoad = (error: any) => {
      console.warn("Native ad failed to load:", error);
      setLoading(false);
      setAdFailed(true); // Fail hone par component collapse ho jayega
      onAdFailedToLoad?.(error);
    };

    if (adFailed) {
      return null; // Ad fail ho to screen par khali jagah nahi bachegi
    }

    return (
      <View style={styles.adContainer}>
        {/* Real Native Ad View Wrapper */}
        <NativeAdView
          ref={nativeAdRef}
          adUnitId={adUnitId}
          onAdLoaded={handleAdLoaded}
          onAdFailedToLoad={handleAdFailedToLoad}
          requestOptions={{
            keywords: ["emergency", "helpline", "pakistan"],
            contentUrl: "https://pakistan-emergency-helpline.app",
          }}
          style={styles.card}
        >
          {/* Ad Badge */}
          <View style={styles.adBadge}>
            <Text style={styles.adBadgeText}>Ad</Text>
          </View>

          {loading && (
            <View style={styles.loadingContainer}>
              <ActivityIndicator size="small" color="#0A3D62" />
            </View>
          )}

          {/* Header Content */}
          <View style={styles.header}>
            {/* App/Ad Icon */}
            <IconView style={styles.appIcon} />

            <View style={styles.headlineContainer}>
              {/* Real Headline */}
              <HeadlineView style={styles.headline} numberOfLines={2} />
            </View>
          </View>

          {/* Real Description / Body */}
          <BodyView style={styles.description} numberOfLines={3} />

          {/* Real Media View (Image/Video) */}
          <View style={styles.mediaContainer}>
            <MediaView style={styles.media} />
          </View>

          {/* Real Call To Action (CTA) Button */}
          <CallToActionView
            style={styles.ctaButton}
            textStyle={styles.ctaButtonText}
            allowFontScaling={false}
          />

          {/* Real Advertiser info */}
          <AdvertiserView style={styles.advertiser} />
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
    backgroundColor: "#F5F7FA",
  },
  headlineContainer: {
    flex: 1,
    paddingRight: 24, // Badge se overlap na ho
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
