const { getDefaultConfig } = require('expo/metro-config');
const { withNativeWind } = require('nativewind/metro'); // 👈 Added for NativeWind v4 support!

const config = getDefaultConfig(__dirname);

config.transformer.minifierConfig = {
  keep_fnames: true,
  mangle: {
    keep_fnames: true,
  },
};

// 👈 Wrapped config with withNativeWind to compile Tailwind CSS in Production!
module.exports = withNativeWind(config, { input: './global.css' });
