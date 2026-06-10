/**
 * Offline Data Caching Service
 * Manages caching of helpline data for offline access
 */

import AsyncStorage from '@react-native-async-storage/async-storage';
import { nationalEmergency, federal, punjab, sindh, balochistan, kpk, gb, ajk } from './helplines';

const CACHE_KEY_PREFIX = 'helpline_cache_';
const CACHE_TIMESTAMP_KEY = 'helpline_cache_timestamp';
const CACHE_VERSION_KEY = 'helpline_cache_version';
const CURRENT_CACHE_VERSION = '1.0';

// All province data
const allProvinceData = {
  national: nationalEmergency,
  federal,
  punjab,
  sindh,
  balochistan,
  kpk,
  gb,
  ajk,
};

/**
 * Initialize offline cache by storing all helpline data
 * Call this on app startup
 */
export async function initializeOfflineCache(): Promise<void> {
  try {
    const existingVersion = await AsyncStorage.getItem(CACHE_VERSION_KEY);
    
    // Only cache if version doesn't match or cache doesn't exist
    if (existingVersion !== CURRENT_CACHE_VERSION) {
      console.log('[Offline] Initializing helpline cache...');
      
      // Cache each province's data
      for (const [province, data] of Object.entries(allProvinceData)) {
        const cacheKey = `${CACHE_KEY_PREFIX}${province}`;
        await AsyncStorage.setItem(cacheKey, JSON.stringify(data));
      }
      
      // Update cache version and timestamp
      await AsyncStorage.setItem(CACHE_VERSION_KEY, CURRENT_CACHE_VERSION);
      await AsyncStorage.setItem(CACHE_TIMESTAMP_KEY, Date.now().toString());
      
      console.log('[Offline] Helpline cache initialized successfully');
    }
  } catch (error) {
    console.error('[Offline] Error initializing cache:', error);
  }
}

/**
 * Get cached province data
 */
export async function getCachedProvinceData(province: string): Promise<any | null> {
  try {
    const cacheKey = `${CACHE_KEY_PREFIX}${province}`;
    const cachedJson = await AsyncStorage.getItem(cacheKey);
    
    if (!cachedJson) {
      return null;
    }
    
    return JSON.parse(cachedJson);
  } catch (error) {
    console.error(`[Offline] Error retrieving cache for ${province}:`, error);
    return null;
  }
}

/**
 * Get all cached province data
 */
export async function getAllCachedData(): Promise<Record<string, any>> {
  try {
    const result: Record<string, any> = {};
    
    for (const province of Object.keys(allProvinceData)) {
      const data = await getCachedProvinceData(province);
      if (data) {
        result[province] = data;
      }
    }
    
    return result;
  } catch (error) {
    console.error('[Offline] Error retrieving all cached data:', error);
    return {};
  }
}

/**
 * Check if data is cached
 */
export async function isCached(province: string): Promise<boolean> {
  try {
    const cacheKey = `${CACHE_KEY_PREFIX}${province}`;
    const cached = await AsyncStorage.getItem(cacheKey);
    return cached !== null;
  } catch (error) {
    console.error('[Offline] Error checking cache:', error);
    return false;
  }
}

/**
 * Get cache timestamp
 */
export async function getCacheTimestamp(): Promise<number | null> {
  try {
    const timestamp = await AsyncStorage.getItem(CACHE_TIMESTAMP_KEY);
    return timestamp ? parseInt(timestamp, 10) : null;
  } catch (error) {
    console.error('[Offline] Error getting cache timestamp:', error);
    return null;
  }
}

/**
 * Clear all cached data
 */
export async function clearOfflineCache(): Promise<void> {
  try {
    const keys = await AsyncStorage.getAllKeys();
    const cacheKeys = keys.filter(key => key.startsWith(CACHE_KEY_PREFIX));
    
    if (cacheKeys.length > 0) {
      await AsyncStorage.multiRemove(cacheKeys);
      await AsyncStorage.removeItem(CACHE_VERSION_KEY);
      await AsyncStorage.removeItem(CACHE_TIMESTAMP_KEY);
      console.log('[Offline] Cache cleared');
    }
  } catch (error) {
    console.error('[Offline] Error clearing cache:', error);
  }
}

/**
 * Get cache size in bytes (approximate)
 */
export async function getCacheSize(): Promise<number> {
  try {
    let totalSize = 0;
    const keys = await AsyncStorage.getAllKeys();
    const cacheKeys = keys.filter(key => key.startsWith(CACHE_KEY_PREFIX));
    
    for (const key of cacheKeys) {
      const value = await AsyncStorage.getItem(key);
      if (value) {
        totalSize += value.length;
      }
    }
    
    return totalSize;
  } catch (error) {
    console.error('[Offline] Error calculating cache size:', error);
    return 0;
  }
}
