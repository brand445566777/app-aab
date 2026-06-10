import React, { useEffect, useRef, useState } from "react";
import { View, StyleSheet, Platform } from "react-native";
import {
  BannerAd as RNGoogleMobileAdsBanner,
  BannerAdSize,
} from "react-native-google-mobile-ads";

const BANNER_AD_UNIT_ID =
  Platform.OS === "android"
    ? "ca-app-pub-3617790148719581/8154584193" // Real AdUnit ID for Android
    : "ca-app-pub-3617790148719581/8154584193"; // Real AdUnit ID for iOS

/**
 * BannerAd Component
 *
 * Displays a standard banner ad in the layout.
 * Features:
 * - Gracefully collapses if ad fails to load
 * - Prevents UI blocking with proper padding/margins
 * - Handles memory cleanup on unmount
 * - Responsive sizing based on device width
 */

interface BannerAdProps {
  /**
   * Optional custom ad unit ID. If not provided, uses default production ID.
   */
  adUnitId?: string;
  /**
   * Optional callback when ad loads successfully
   */
  onAdLoaded?: () => void;
  /**
   * Optional callback when ad fails to load
   */
  onAdFailedToLoad?: (error: any) => void;
}

export const BannerAd = React.memo(
  ({
    adUnitId = BANNER_AD_UNIT_ID,
    onAdLoaded,
    onAdFailedToLoad,
  }: BannerAdProps) => {
    // Shuru mein height auto/minHeight rakhein ge taake ad request bhej sake
    const [isAdFailed, setIsAdFailed] = useState(false);
    const bannerRef = useRef(null);

    useEffect(() => {
      return () => {
        // Cleanup: destroy ad on unmount to prevent memory leaks
        if (bannerRef.current) {
          try {
            // @ts-ignore - destroy method exists on native side
            bannerRef.current.destroy?.();
          } catch (error) {
            console.warn("Error destroying banner ad:", error);
          }
        }
      };
    }, []);

    const handleAdLoaded = () => {
      setIsAdFailed(false);
      onAdLoaded?.();
    };

    const handleAdFailedToLoad = (error: any) => {
      console.warn("Banner ad failed to load:", error);
      setIsAdFailed(true); // Agar ad fail ho jaye to container gayab karne ke liye
      onAdFailedToLoad?.(error);
    };

    const handleAdOpened = () => {
      console.log("Banner ad opened");
    };

    const handleAdClosed = () => {
      console.log("Banner ad closed");
    };

    // Agar ad load hona fail ho jaye, sirf tab hi screen par se container hatayein (Graceful Collapse)
    if (isAdFailed) {
      return null;
    }

    return (
      <View style={styles.container}>
        <RNGoogleMobileAdsBanner
          ref={bannerRef}
          unitId={adUnitId}
          size={BannerAdSize.ANCHORED_ADAPTIVE_BANNER} // FULL_BANNER se behtar ANCHORED_ADAPTIVE_BANNER hai jo device ki width ke mutabiq fit hota hai
          onAdLoaded={handleAdLoaded}
          onAdFailedToLoad={handleAdFailedToLoad}
          onAdOpened={handleAdOpened}
          onAdClosed={handleAdClosed}
          requestOptions={{
            keywords: ["emergency", "helpline", "pakistan"],
            contentUrl: "https://pakistan-emergency-helpline.app",
          }}
        />
      </View>
    );
  },
);

BannerAd.displayName = "BannerAd";

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#F5F7FA",
    borderTopWidth: 1,
    borderTopColor: "#E5E7EB",
    paddingVertical: 8,
    paddingHorizontal: 8,
    marginBottom: 0,
  },
});
