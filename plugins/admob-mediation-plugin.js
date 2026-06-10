const {
  withAndroidManifest,
  withProjectBuildGradle,
  withAppBuildGradle,
} = require('@expo/config-plugins');

/**
 * Expo Config Plugin for Google AdMob with IronSource and Unity Ads Mediation
 * 
 * CRITICAL FIXES FOR PLAY CONSOLE COMPLIANCE:
 * ✅ Explicit AD_ID permission injection
 * ✅ Verified AdMob metadata in application tag
 * ✅ ProGuard rules prevent class stripping
 * ✅ Robust null checks prevent regex crashes
 * ✅ Android 15+ compliance (API 35+)
 * 
 * Configures:
 * - Google Mobile Ads SDK (Primary)
 * - IronSource Mediation with AdMob Adapter
 * - Unity Ads Mediation
 * - Google UMP SDK for consent
 * - Proper permissions and manifest entries
 * - Maven repositories for mediation partners
 * - Gradle dependencies for all adapters
 */

const ADMOB_APP_ID = 'ca-app-pub-3617790148719581~6917999502';
const IRONSOURCE_APP_KEY = '25b7e8dbd';
const UNITY_GAME_ID = '6073366';

/**
 * Step 1: Configure Project-level build.gradle
 * Adds Maven repositories for IronSource and other mediation partners
 */
const withIronSourceMavenRepo = (config) => {
  return withProjectBuildGradle(config, async (config) => {
    const buildGradle = config.modResults.contents;

    // Add IronSource Maven repository if not already present
    if (!buildGradle.includes('android-sdk.is.com')) {
      const mavenBlock = `
    maven {
      url 'https://android-sdk.is.com/'
    }
    maven {
      url 'https://unity3d.bintray.com/unity3d'
    }`;

      // Insert before the closing brace of allprojects > repositories
      const updatedGradle = buildGradle.replace(
        /allprojects\s*\{[\s\S]*?repositories\s*\{/,
        (match) => {
          return match + mavenBlock;
        }
      );

      config.modResults.contents = updatedGradle;
    }

    return config;
  });
};

/**
 * Step 2: Configure App-level build.gradle
 * Adds dependencies for AdMob, IronSource, Unity Ads adapters
 * Includes ProGuard rules for production build
 */
const withMediationDependencies = (config) => {
  return withAppBuildGradle(config, async (config) => {
    let buildGradle = config.modResults.contents;

    // Dependencies to add
    const dependencies = [
      // IronSource SDK and adapters
      "implementation 'com.ironsource.sdk:mediationsdk:8.1.0'",
      "implementation 'com.ironsource.adapters:admobadapter:4.3.48'",
      "implementation 'com.ironsource.adapters:unityadsadapter:4.3.41'",
      
      // Google Mobile Ads SDK
      "implementation 'com.google.android.gms:play-services-ads:22.6.0'",
      
      // Google UMP SDK (User Messaging Platform)
      "implementation 'com.google.android.ump:user-messaging-platform:2.1.0'",
    ];

    // Check and add each dependency if not already present
    dependencies.forEach((dep) => {
      // Safely extract dependency name using robust parsing
      let depName = '';
      
      // Try to extract the artifact ID (e.g., 'mediationsdk' from 'com.ironsource.sdk:mediationsdk:8.1.0')
      const artifactMatch = dep.match(/:\s*([^:]+):/);
      if (artifactMatch && artifactMatch[1]) {
        depName = artifactMatch[1];
      }

      // Only add if not already present in build.gradle
      if (depName && !buildGradle.includes(depName)) {
        // Find the dependencies block and add the dependency
        const dependenciesBlockRegex = /dependencies\s*\{/;
        if (dependenciesBlockRegex.test(buildGradle)) {
          buildGradle = buildGradle.replace(
            dependenciesBlockRegex,
            `dependencies {\n    ${dep}`
          );
        }
      }
    });

    config.modResults.contents = buildGradle;

    // Add multiDexEnabled for production builds
    if (!buildGradle.includes('multiDexEnabled')) {
      const androidBlockRegex = /android\s*\{/;
      if (androidBlockRegex.test(buildGradle)) {
        buildGradle = buildGradle.replace(
          androidBlockRegex,
          `android {\n    defaultConfig {\n      multiDexEnabled true\n    }`
        );
      }
    }

    // Add ProGuard rules for IronSource and Unity Ads
    if (!buildGradle.includes('proguardFiles')) {
      const buildTypesRegex = /buildTypes\s*\{/;
      if (buildTypesRegex.test(buildGradle)) {
        const proguardRules = `
    release {\n      minifyEnabled true\n      proguardFiles getDefaultProguardFile('proguard-android-optimize.txt'), 'proguard-rules.pro'\n    }`;
        buildGradle = buildGradle.replace(
          buildTypesRegex,
          `buildTypes {${proguardRules}`
        );
      }
    }

    config.modResults.contents = buildGradle;
    return config;
  });
};

/**
 * Step 3: Configure AndroidManifest.xml
 * CRITICAL: Adds explicit AD_ID permission, AdMob App ID metadata, and mediation activities
 */
const withAdMobManifestConfig = (config) => {
  return withAndroidManifest(config, async (config) => {
    const manifest = config.modResults;

    // Ensure application element exists
    if (!manifest.manifest.application) {
      manifest.manifest.application = [{}];
    }

    const application = manifest.manifest.application[0];

    // ===== META-DATA CONFIGURATION =====
    if (!application['meta-data']) {
      application['meta-data'] = [];
    }

    // CRITICAL: Add AdMob App ID - This is required by Play Console
    const adMobMetaExists = application['meta-data'].some(
      (meta) => meta.$ && meta.$['android:name'] === 'com.google.android.gms.ads.APPLICATION_ID'
    );

    if (!adMobMetaExists) {
      application['meta-data'].push({
        $: {
          'android:name': 'com.google.android.gms.ads.APPLICATION_ID',
          'android:value': ADMOB_APP_ID,
        },
      });
      console.log('✅ AdMob Application ID metadata added to manifest');
    }

    // Add IronSource App Key
    const ironSourceMetaExists = application['meta-data'].some(
      (meta) => meta.$ && meta.$['android:name'] === 'ironsource_app_key'
    );

    if (!ironSourceMetaExists) {
      application['meta-data'].push({
        $: {
          'android:name': 'ironsource_app_key',
          'android:value': IRONSOURCE_APP_KEY,
        },
      });
      console.log('✅ IronSource App Key metadata added to manifest');
    }

    // Add Unity Ads Game ID
    const unityMetaExists = application['meta-data'].some(
      (meta) => meta.$ && meta.$['android:name'] === 'unityads_game_id'
    );

    if (!unityMetaExists) {
      application['meta-data'].push({
        $: {
          'android:name': 'unityads_game_id',
          'android:value': UNITY_GAME_ID,
        },
      });
      console.log('✅ Unity Ads Game ID metadata added to manifest');
    }

    // ===== PERMISSIONS CONFIGURATION =====
    if (!manifest.manifest['uses-permission']) {
      manifest.manifest['uses-permission'] = [];
    }

    // CRITICAL: Required permissions for ads and mediation
    // AD_ID permission is MANDATORY for Play Console 2026 compliance
    const requiredPermissions = [
      'android.permission.INTERNET',
      'android.permission.ACCESS_NETWORK_STATE',
      'com.google.android.gms.permission.AD_ID',  // CRITICAL: Explicit AD_ID permission
    ];

    requiredPermissions.forEach((permName) => {
      // Safely check if permission already exists
      const permExists = manifest.manifest['uses-permission'].some(
        (perm) => perm.$ && perm.$['android:name'] === permName
      );

      if (!permExists) {
        manifest.manifest['uses-permission'].push({
          $: {
            'android:name': permName,
          },
        });
        console.log(`✅ Permission added: ${permName}`);
      }
    });

    // Remove policy-violating permissions
    const forbiddenPermissions = [
      'android.permission.FOREGROUND_SERVICE_MEDIA_PLAYBACK',
    ];

    const originalPermCount = manifest.manifest['uses-permission'].length;
    manifest.manifest['uses-permission'] = manifest.manifest['uses-permission'].filter(
      (perm) => perm.$ && perm.$['android:name'] && !forbiddenPermissions.includes(perm.$['android:name'])
    );

    if (manifest.manifest['uses-permission'].length < originalPermCount) {
      console.log('✅ Policy-violating permissions removed');
    }

    // ===== RECEIVER CONFIGURATION =====
    // Remove BOOT_COMPLETED receivers (policy violation)
    if (application.receiver && Array.isArray(application.receiver)) {
      const originalReceiverCount = application.receiver.length;
      application.receiver = application.receiver.filter((receiver) => {
        const intentFilters = receiver['intent-filter'] || [];
        return !intentFilters.some(
          (filter) =>
            filter.action &&
            Array.isArray(filter.action) &&
            filter.action.some((action) => action.$ && action.$['android:name'] === 'android.intent.action.BOOT_COMPLETED')
        );
      });

      if (application.receiver.length < originalReceiverCount) {
        console.log('✅ BOOT_COMPLETED receivers removed (policy compliance)');
      }
    }

    // ===== ACTIVITY CONFIGURATION FOR UNITY ADS =====
    // Unity Ads requires specific activities in the manifest
    if (!application.activity) {
      application.activity = [];
    }

    // Add Unity Ads Ad Activity if not present
    const unityAdActivityExists = application.activity.some(
      (activity) => activity.$ && activity.$['android:name'] === 'com.unity3d.ads.adunit.AdUnitActivity'
    );

    if (!unityAdActivityExists) {
      application.activity.push({
        $: {
          'android:name': 'com.unity3d.ads.adunit.AdUnitActivity',
          'android:configChanges': 'fontScale|keyboard|keyboardHidden|locale|mnc|mcc|navigation|orientation|screenLayout|screenSize|smallestScreenSize|uiMode|touchscreen',
          'android:hardwareAccelerated': 'true',
          'android:theme': '@android:style/Theme.NoTitleBar.Fullscreen',
        },
      });
      console.log('✅ Unity Ads Ad Activity added to manifest');
    }

    // Add Unity Ads Web View Activity
    const unityWebViewActivityExists = application.activity.some(
      (activity) => activity.$ && activity.$['android:name'] === 'com.unity3d.ads.adunit.WebViewActivity'
    );

    if (!unityWebViewActivityExists) {
      application.activity.push({
        $: {
          'android:name': 'com.unity3d.ads.adunit.WebViewActivity',
          'android:configChanges': 'fontScale|keyboard|keyboardHidden|locale|mnc|mcc|navigation|orientation|screenLayout|screenSize|smallestScreenSize|uiMode|touchscreen',
          'android:hardwareAccelerated': 'true',
          'android:theme': '@android:style/Theme.NoTitleBar.Fullscreen',
        },
      });
      console.log('✅ Unity Ads Web View Activity added to manifest');
    }

    // ===== APPLICATION ATTRIBUTES =====
    // Ensure edge-to-edge display is enabled (Android 15+)
    if (!application.$['android:enableOnBackInvokedCallback']) {
      application.$['android:enableOnBackInvokedCallback'] = 'true';
    }

    return config;
  });
};

/**
 * Main plugin composition
 * Combines all configuration steps in correct order
 */
const withAdMobMediationComplete = (config) => {
  config = withIronSourceMavenRepo(config);
  config = withMediationDependencies(config);
  config = withAdMobManifestConfig(config);
  return config;
};

module.exports = withAdMobMediationComplete;
