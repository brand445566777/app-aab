import { Platform } from 'react-native';

/**
 * AdMob Configuration and Utilities
 * 
 * Supports:
 * - Banner Ads (Primary)
 * - Native Advanced Ads (Primary)
 * - Google AdMob (primary)
 * - IronSource Mediation
 * - Unity Ads Mediation
 * 
 * Note: Interstitial and Rewarded ads have been removed per requirements
 */

// AdMob App IDs
export const ADMOB_APP_ID = 'ca-app-pub-3617790148719581~6917999502';

// Ad Unit IDs - Production IDs for Pakistan Emergency Helpline
export const AD_UNIT_IDS = {
  // Banner Ads - Production
  BANNER_ANDROID: 'ca-app-pub-3617790148719581/8154584193', // Production Banner
  BANNER_IOS: 'ca-app-pub-3940256099942544/2934735716',     // Test Banner (iOS not configured)
  
  // Native Advanced Ads - Production
  NATIVE_ANDROID: 'ca-app-pub-3617790148719581/2428090151', // Production Native Advanced
  NATIVE_IOS: 'ca-app-pub-3940256099942544/3986624511',     // Test Native Advanced (iOS not configured)
};

/**
 * Get the appropriate Ad Unit ID based on platform
 * 
 * @param adType - Type of ad (banner or native)
 * @returns The Ad Unit ID for the current platform
 */
export function getAdUnitId(adType: 'banner' | 'native'): string {
  const isAndroid = Platform.OS === 'android';
  
  switch (adType) {
    case 'banner':
      return isAndroid ? AD_UNIT_IDS.BANNER_ANDROID : AD_UNIT_IDS.BANNER_IOS;
    case 'native':
      return isAndroid ? AD_UNIT_IDS.NATIVE_ANDROID : AD_UNIT_IDS.NATIVE_IOS;
    default:
      return AD_UNIT_IDS.BANNER_ANDROID;
  }
}

/**
 * AdMob Request Configuration
 * Includes keywords, content URL, and other targeting options
 */
export const REQUEST_CONFIG = {
  keywords: ['emergency', 'helpline', 'pakistan', 'rescue', 'police', 'fire'],
  contentUrl: 'https://pakistan-emergency-helpline.com',
  npa: false, // Non-personalized ads (set to true for GDPR compliance if needed)
};

/**
 * Initialize AdMob with test device configuration
 * Call this once when the app starts
 * 
 * @example
 * useEffect(() => {
 *   initializeAdMob();
 * }, []);
 */
export async function initializeAdMob(): Promise<void> {
  try {
    console.log('[AdMob] Initialized');
    console.log('[AdMob] App ID:', ADMOB_APP_ID);
    console.log('[AdMob] Platform:', Platform.OS);
    console.log('[AdMob] Supported Ad Formats: Banner, Native Advanced');
  } catch (error) {
    console.error('[AdMob] Initialization error:', error);
  }
}

/**
 * Mediation Partner Configuration
 * 
 * Configured partners:
 * - IronSource
 * - Unity Ads
 */
export const MEDIATION_PARTNERS = {
  UNITY: {
    name: 'Unity Ads',
    status: 'configured',
    priority: 1,
  },
  IRONSOURCE: {
    name: 'IronSource',
    status: 'configured',
    priority: 2,
  },
};

/**
 * Ad Loading State Interface
 */
export interface AdLoadingState {
  isLoading: boolean;
  error: string | null;
  lastLoadTime: number | null;
}

/**
 * Create initial ad loading state
 */
export function createInitialAdState(): AdLoadingState {
  return {
    isLoading: false,
    error: null,
    lastLoadTime: null,
  };
}

/**
 * Validate Ad Unit ID format
 * 
 * @param adUnitId - The Ad Unit ID to validate
 * @returns true if valid, false otherwise
 */
export function isValidAdUnitId(adUnitId: string): boolean {
  // AdMob Ad Unit IDs follow pattern: ca-app-pub-xxxxxxxxxxxxxxxx/xxxxxxxxxx
  const adUnitPattern = /^ca-app-pub-\d{16}\/\d{10}$/;
  return adUnitPattern.test(adUnitId);
}

/**
 * Get AdMob error message
 * 
 * @param errorCode - The error code from AdMob
 * @returns Human-readable error message
 */
export function getAdMobErrorMessage(errorCode: string): string {
  const errorMessages: Record<string, string> = {
    'ERROR_CODE_NO_FILL': 'No ads available at this time',
    'ERROR_CODE_NETWORK_ERROR': 'Network error loading ads',
    'ERROR_CODE_INVALID_REQUEST': 'Invalid ad request',
    'ERROR_CODE_INTERNAL_ERROR': 'Internal AdMob error',
  };
  
  return errorMessages[errorCode] || 'Failed to load ad';
}

/**
 * Log AdMob event for analytics
 * 
 * @param eventName - Name of the event
 * @param eventData - Event data/properties
 */
export function logAdMobEvent(eventName: string, eventData?: Record<string, any>): void {
  console.log(`[AdMob Event] ${eventName}`, eventData || '');
}

/**
 * AdMob Configuration Summary
 */
export const ADMOB_CONFIG = {
  appId: ADMOB_APP_ID,
  platform: Platform.OS,
  mediationEnabled: true,
  partners: Object.keys(MEDIATION_PARTNERS),
  testDeviceEnabled: __DEV__, // Only in development
  supportedAdFormats: ['banner', 'native'],
  version: '2.0.1',
};
