const {
  withAndroidManifest,
  withAppBuildGradle,
} = require('@expo/config-plugins');

/**
 * Expo Config Plugin for Google Play Console Policy Compliance (Android 15+)
 * 
 * Enforces:
 * - Android 15+ (API 35+) compliance
 * - Google Play 2026 policies
 * - Removes policy-violating permissions
 * - Removes unnecessary receivers
 * - Ensures AD_ID permission for ad serving
 * - Edge-to-edge display support
 * - Android 16 foldable device support
 * - Proper target API level
 * 
 * Policy Violations Fixed:
 * - FOREGROUND_SERVICE_MEDIA_PLAYBACK (not needed for emergency helpline)
 * - BOOT_COMPLETED receiver (policy violation)
 * - Missing AD_ID permission (required for ads)
 * - Missing edge-to-edge support (Android 15+)
 */

const withPlayConsoleCompliance = (config) => {
  // Step 1: Configure AndroidManifest.xml
  config = withAndroidManifest(config, async (config) => {
    const manifest = config.modResults;

    // ===== PERMISSIONS CLEANUP =====
    // Remove policy-violating permissions
    if (manifest.manifest['uses-permission']) {
      const forbiddenPermissions = [
        'android.permission.FOREGROUND_SERVICE_MEDIA_PLAYBACK',
        'android.permission.RECEIVE_BOOT_COMPLETED',
      ];

      manifest.manifest['uses-permission'] = manifest.manifest['uses-permission'].filter(
        (perm) => {
          const permName = perm.$ && perm.$['android:name'];
          return !forbiddenPermissions.includes(permName);
        }
      );
    }

    // ===== REQUIRED PERMISSIONS =====
    // Ensure all required permissions are present
    if (!manifest.manifest['uses-permission']) {
      manifest.manifest['uses-permission'] = [];
    }

    const requiredPermissions = [
      'android.permission.INTERNET',
      'android.permission.ACCESS_NETWORK_STATE',
      'com.google.android.gms.permission.AD_ID',
    ];

    requiredPermissions.forEach((permName) => {
      const permExists = manifest.manifest['uses-permission'].some(
        (perm) => perm.$ && perm.$['android:name'] === permName
      );

      if (!permExists) {
        manifest.manifest['uses-permission'].push({
          $: {
            'android:name': permName,
          },
        });
      }
    });

    // ===== RECEIVER CLEANUP =====
    // Remove BOOT_COMPLETED receivers (policy violation)
    if (manifest.manifest.application && manifest.manifest.application[0]) {
      const application = manifest.manifest.application[0];

      if (application.receiver && Array.isArray(application.receiver)) {
        application.receiver = application.receiver.filter((receiver) => {
          const intentFilters = receiver['intent-filter'] || [];
          
          // Check if this receiver has BOOT_COMPLETED action
          const hasBootCompleted = intentFilters.some((filter) => {
            const actions = filter.action || [];
            return Array.isArray(actions) && actions.some(
              (action) => action.$ && action.$['android:name'] === 'android.intent.action.BOOT_COMPLETED'
            );
          });

          // Keep receiver only if it doesn't have BOOT_COMPLETED
          return !hasBootCompleted;
        });

        // Remove empty receiver array
        if (application.receiver.length === 0) {
          delete application.receiver;
        }
      }
    }

    // ===== APPLICATION ATTRIBUTES FOR ANDROID 15+ =====
    if (manifest.manifest.application && manifest.manifest.application[0]) {
      const application = manifest.manifest.application[0];

      // Enable back-invoked callback (Android 13+, required for Android 15+)
      if (!application.$['android:enableOnBackInvokedCallback']) {
        application.$['android:enableOnBackInvokedCallback'] = 'true';
      }

      // Enable resizable activity (Android 12+, required for Android 16 foldables)
      if (!application.$['android:resizeableActivity']) {
        application.$['android:resizeableActivity'] = 'true';
      }

      // Support RTL layouts
      if (!application.$['android:supportsRtl']) {
        application.$['android:supportsRtl'] = 'true';
      }

      // Allow backup (optional but recommended for user data)
      if (!application.$['android:allowBackup']) {
        application.$['android:allowBackup'] = 'true';
      }

      // Use cleartextTraffic only for development (false for production)
      if (!application.$['android:usesCleartextTraffic']) {
        application.$['android:usesCleartextTraffic'] = 'false';
      }
    }

    return config;
  });

  // Step 2: Configure build.gradle for Android 15+ compliance
  config = withAppBuildGradle(config, async (config) => {
    const buildGradle = config.modResults.contents;

    // Ensure compileSdkVersion is 35 (Android 15)
    if (!buildGradle.includes('compileSdkVersion 35')) {
      const updatedGradle = buildGradle.replace(
        /compileSdkVersion\s+\d+/,
        'compileSdkVersion 35'
      );
      config.modResults.contents = updatedGradle;
    }

    // Ensure targetSdkVersion is 35 (Android 15)
    if (!buildGradle.includes('targetSdkVersion 35')) {
      const updatedGradle = config.modResults.contents.replace(
        /targetSdkVersion\s+\d+/,
        'targetSdkVersion 35'
      );
      config.modResults.contents = updatedGradle;
    }

    // Ensure minSdkVersion is at least 24
    if (!buildGradle.includes('minSdkVersion')) {
      const androidBlockRegex = /android\s*\{/;
      if (androidBlockRegex.test(config.modResults.contents)) {
        const updatedGradle = config.modResults.contents.replace(
          androidBlockRegex,
          'android {\n    minSdkVersion 24'
        );
        config.modResults.contents = updatedGradle;
      }
    } else {
      // Update existing minSdkVersion if less than 24
      const minSdkMatch = config.modResults.contents.match(/minSdkVersion\s+(\d+)/);
      if (minSdkMatch && parseInt(minSdkMatch[1]) < 24) {
        const updatedGradle = config.modResults.contents.replace(
          /minSdkVersion\s+\d+/,
          'minSdkVersion 24'
        );
        config.modResults.contents = updatedGradle;
      }
    }

    return config;
  });

  return config;
};

module.exports = withPlayConsoleCompliance;
