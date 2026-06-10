import { useMemo } from 'react';
import Constants from 'expo-constants';

/**
 * Hook to get the current app version
 * 
 * Returns the version string from app.json (expo.version)
 * This is automatically synced with the app configuration
 * 
 * @returns The app version string (e.g., "2.0.0")
 * 
 * @example
 * const version = useAppVersion();
 * console.log(version); // "2.0.0"
 */
export function useAppVersion(): string {
  return useMemo(() => {
    // Get version from expo constants (automatically populated from app.json)
    const version = Constants.expoConfig?.version || 'unknown';
    return version;
  }, []);
}

/**
 * Hook to get the current build number (versionCode on Android)
 * 
 * @returns The build number as a string
 * 
 * @example
 * const buildNumber = useAppBuildNumber();
 * console.log(buildNumber); // "18"
 */
export function useAppBuildNumber(): string {
  return useMemo(() => {
    // On Android, this is the versionCode from app.json
    // On iOS, this is the CFBundleVersion from app.json
    const buildNumber = Constants.expoConfig?.android?.versionCode?.toString() || 
                       Constants.expoConfig?.ios?.buildNumber?.toString() || 
                       'unknown';
    return buildNumber;
  }, []);
}

/**
 * Hook to get formatted version display string
 * 
 * @returns Formatted string like "v1.0.18 (build 18)"
 * 
 * @example
 * const versionDisplay = useVersionDisplay();
 * console.log(versionDisplay); // "v1.0.18 (build 18)"
 */
export function useVersionDisplay(): string {
  const version = useAppVersion();
  const buildNumber = useAppBuildNumber();
  
  return useMemo(() => {
    if (buildNumber === 'unknown') {
      return `v${version}`;
    }
    return `v${version} (build ${buildNumber})`;
  }, [version, buildNumber]);
}

/**
 * Hook to get app info including name, version, and build
 * 
 * @returns Object with app metadata
 * 
 * @example
 * const appInfo = useAppInfo();
 * console.log(appInfo);
 * // {
 * //   name: "Pakistan Emergency Helpline",
 * //   version: "1.0.18",
 * //   buildNumber: "18",
 * //   displayVersion: "v1.0.18 (build 18)"
 * // }
 */
export interface AppInfo {
  name: string;
  version: string;
  buildNumber: string;
  displayVersion: string;
}

export function useAppInfo(): AppInfo {
  const version = useAppVersion();
  const buildNumber = useAppBuildNumber();
  const displayVersion = useVersionDisplay();
  
  return useMemo(() => ({
    name: Constants.expoConfig?.name || 'Pakistan Emergency Helpline',
    version,
    buildNumber,
    displayVersion,
  }), [version, buildNumber, displayVersion]);
}
